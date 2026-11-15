import test from 'node:test';
import assert from 'node:assert/strict';
import { onRequestPost } from '../functions/api/intake.ts';
import { HIVE_FORMS, makeRef, validateHive } from '../lib/hive-intake.ts';
import { ackEmail } from '../lib/hive-ack.ts';
import { EQUIPMENT_SNAPSHOTS, fleetTotal, financed, residual } from '../content/hive.ts';

/** Synthetic test data. No real person, company or transaction. */
const contact = { 'Contact name': 'Test Person', Company: 'Example Contracting LLC', 'Business email': 'test@example.com', Phone: '555-0100' };
const cre = { form: 'hive-cre', ...contact, 'Property type': 'Multifamily', 'Transaction type': 'Acquisition', 'Requested analysis': 'Occupancy-adjusted NOI.', Consent: 'Yes' };
const equipment = { form: 'hive-equipment', ...contact, 'Business state': 'FL', 'Equipment category': 'Excavators', 'New or used': 'Used', 'Purchase price': '$240,000', 'Lease, purchase, or unsure': 'Unsure', Consent: 'Yes' };

const req = (body: unknown) =>
  new Request('https://bullnet.ai/api/intake', { method: 'POST', headers: { 'content-type': 'application/json', origin: 'https://bullnet.ai' }, body: JSON.stringify(body) });

/** Stub Resend. One status answers every call; a list answers call by call, repeating its last entry. 0 means the network failed. */
function stubFetch(status: number | number[]) {
  const calls: { url: string; init: RequestInit }[] = [];
  const list = Array.isArray(status) ? status : [status];
  globalThis.fetch = (async (url: string, init: RequestInit) => {
    const code = list[Math.min(calls.length, list.length - 1)];
    calls.push({ url, init });
    if (code === 0) throw new Error('network down');
    return new Response('{}', { status: code });
  }) as typeof fetch;
  return calls;
}
const sentAt = (calls: { init: RequestInit }[], i: number) => JSON.parse(String(calls[i].init.body));
const env = { RESEND_API_KEY: 'k' };

test('a CRE intake reaches the CRE workflow: an internal notice, tagged, with a reference and the consent record', async () => {
  const calls = stubFetch(200);
  const res = await onRequestPost({ request: req(cre), env });
  assert.equal(res.status, 200);
  const body = (await res.json()) as { ok: boolean; ref: string; received: string };
  assert.match(body.ref, /^HCM-\d{8}-[A-Z2-9]{6}$/);
  assert.equal(calls.length, 2);
  const sent = JSON.parse(String(calls[0].init.body));
  assert.ok(sent.subject.startsWith(`[Hive CRE] ${body.ref}`));
  assert.match(sent.text, new RegExp(`Reference: ${body.ref}`));
  assert.match(sent.text, /Consent given: Yes \(hive-intake-consent-v1\)/);
  assert.match(sent.text, /Property type: Multifamily/);
  assert.equal(sent.reply_to, 'test@example.com');
});

test('an equipment intake reaches the equipment workflow and carries optional detail only when given', async () => {
  const calls = stubFetch(200);
  const res = await onRequestPost({ request: req({ ...equipment, 'Preferred term': '60 months', 'Seller or dealer': '' }), env });
  assert.equal(res.status, 200);
  const sent = JSON.parse(String(calls[0].init.body));
  assert.ok(sent.subject.startsWith('[Hive Equipment] HCM-'));
  assert.match(sent.text, /Preferred term: 60 months/);
  assert.ok(!sent.text.includes('Seller or dealer'));
});

test('invalid Hive intakes are rejected and nothing is sent', async () => {
  const calls = stubFetch(200);
  const bad = [
    { ...cre, Consent: 'No' },
    { ...cre, Consent: undefined },
    { ...cre, 'Business email': 'nope' },
    { ...cre, 'Property type': 'Castle' },
    { ...cre, Phone: '' },
    { ...cre, 'Requested analysis': 'x'.repeat(2001) },
    { ...equipment, 'Equipment category': 'Yachts' },
    { ...equipment, 'Preferred term': '999 months' },
    { ...cre, form: 'hive-other' },
    { ...cre, form: 7 },
  ];
  for (const b of bad) assert.equal((await onRequestPost({ request: req(b), env })).status, 400, JSON.stringify(b).slice(0, 80));
  assert.equal(calls.length, 0);
});

test('a Social Security number is refused, not carried', async () => {
  const calls = stubFetch(200);
  const res = await onRequestPost({ request: req({ ...cre, 'Requested analysis': 'My SSN is 123-45-6789' }), env });
  assert.equal(res.status, 400);
  assert.equal(((await res.json()) as { error: string }).error, 'sensitive_data');
  assert.equal(calls.length, 0);
});

test('no success is reported when the provider rejects the message or no key is configured', async () => {
  stubFetch(422);
  assert.equal((await onRequestPost({ request: req(cre), env })).status, 502);
  const calls = stubFetch(200);
  assert.equal((await onRequestPost({ request: req(cre), env: {} })).status, 503);
  assert.equal(calls.length, 0);
});

test('unknown keys are dropped and header injection is stripped', async () => {
  const calls = stubFetch(200);
  await onRequestPost({ request: req({ ...cre, Company: 'Acme\r\nBcc: x@y.z', ssn: 'should never appear', 'Tax returns': 'nor this' }), env });
  const sent = JSON.parse(String(calls[0].init.body));
  assert.ok(!sent.subject.includes('\n'));
  assert.ok(!sent.text.includes('should never appear'));
  assert.ok(!sent.text.includes('nor this'));
});

test('the short first step is enough, and no form asks for sensitive documents', () => {
  for (const form of ['hive-cre', 'hive-equipment'] as const) {
    const fields = HIVE_FORMS[form].fields;
    assert.ok(fields.filter((f) => f.step === 2).every((f) => !f.required), 'step two is optional');
    assert.ok(fields.filter((f) => f.required).length <= 10, 'short first step');
    for (const f of fields) assert.ok(!/ssn|social security|tax return|bank statement|driver|passport/i.test(f.name), f.name);
  }
  assert.ok(validateHive('hive-cre', cre).ok);
  assert.ok(validateHive('hive-equipment', equipment).ok);
});

test('references are deterministic for the same inputs and avoid look-alike characters', () => {
  const ref = makeRef(new Date('2026-11-15T12:00:00Z'), new Uint8Array([0, 1, 2, 3, 4, 5]));
  assert.equal(ref, 'HCM-20261115-ABCDEF');
  assert.ok(!/[01ILO]/.test(makeRef(new Date('2026-11-15T12:00:00Z'), new Uint8Array([250, 251, 252, 253, 254, 255])).slice(13)));
});

test('snapshot arithmetic is reproducible from its inputs', () => {
  const [truck, excavator, fleet] = EQUIPMENT_SNAPSHOTS;
  assert.equal(financed(truck.price, truck.downPct), 82_800);
  assert.equal(residual(excavator.price, excavator.residualPct), 108_000);
  assert.equal(fleetTotal(fleet.schedule), 585_000);
  assert.equal(fleet.schedule.reduce((n, r) => n + r.units, 0), 6);
});

test('the client is acknowledged from the Hive sender, with the same reference and none of what was typed', async () => {
  for (const [body, kind] of [[cre, 'CRE intelligence'], [equipment, 'Equipment finance']] as const) {
    const calls = stubFetch(200);
    const marked = { ...body, 'Contact name': 'ZZNAME buy now http://spam.example', Company: 'ZZCOMPANY', Phone: 'ZZPHONE' };
    const res = await onRequestPost({ request: req(marked), env });
    const out = (await res.json()) as { ref: string; acknowledged: boolean };
    assert.equal(out.acknowledged, true);
    assert.equal(calls.length, 2);
    const notice = sentAt(calls, 0);
    const ack = sentAt(calls, 1);
    assert.deepEqual(notice.to, ['build@bullnet.ai']);
    assert.deepEqual(ack.to, ['test@example.com']);
    assert.equal(ack.from, 'Hive Capital Markets <hive@bullnet.ai>');
    assert.equal(notice.from, 'Hive Capital Markets <hive@bullnet.ai>');
    assert.equal(ack.reply_to, 'hive@bullnet.ai');
    assert.equal(ack.subject, `We received your intake: ${out.ref}`);
    for (const part of [ack.subject, ack.text, ack.html]) {
      assert.ok(part.includes(out.ref));
      assert.ok(!/ZZNAME|ZZCOMPANY|ZZPHONE|spam\.example/.test(part), 'nothing the visitor typed is mailed back');
    }
    for (const part of [ack.text, ack.html]) {
      assert.ok(part.includes(`Your ${kind} intake reached BullNet.`));
      assert.ok(part.includes('not a lender or a real estate broker'));
      assert.ok(part.includes('Nothing has been sent to a lender'));
      assert.ok(!/\bcase\b/i.test(part), 'no case exists yet');
      assert.ok(!/within \d|business day|hours/i.test(part), 'no turnaround promise');
    }
  }
});

test('the acknowledgment template varies only by reference and form', () => {
  const a = ackEmail('hive-cre', 'HCM-20261115-ABCDEF');
  const b = ackEmail('hive-cre', 'HCM-20261115-GHJKMN');
  assert.equal(a.html.replaceAll('HCM-20261115-ABCDEF', 'X'), b.html.replaceAll('HCM-20261115-GHJKMN', 'X'));
  assert.equal(a.text.replaceAll('HCM-20261115-ABCDEF', 'X'), b.text.replaceAll('HCM-20261115-GHJKMN', 'X'));
  assert.notEqual(a.text, ackEmail('hive-equipment', 'HCM-20261115-ABCDEF').text);
});

test('a failed acknowledgment does not fail the intake, and BullNet is told', async () => {
  for (const failure of [422, 0]) {
    const calls = stubFetch([200, failure, 200]);
    const res = await onRequestPost({ request: req(cre), env });
    assert.equal(res.status, 200);
    const out = (await res.json()) as { ok: boolean; ref: string; acknowledged: boolean };
    assert.equal(out.ok, true);
    assert.equal(out.acknowledged, false);
    assert.equal(calls.length, 3);
    const alert = sentAt(calls, 2);
    assert.deepEqual(alert.to, ['build@bullnet.ai']);
    assert.equal(alert.subject, `[Hive CRE] ${out.ref}: ACKNOWLEDGMENT NOT SENT`);
    assert.equal(alert.reply_to, 'test@example.com');
  }
});

test('no acknowledgment goes out when the internal notice fails, or when it is switched off', async () => {
  let calls = stubFetch([502, 200]);
  assert.equal((await onRequestPost({ request: req(cre), env })).status, 502);
  assert.equal(calls.length, 1);
  calls = stubFetch(0);
  assert.equal((await onRequestPost({ request: req(cre), env })).status, 502);
  assert.equal(calls.length, 1);
  calls = stubFetch(200);
  const res = await onRequestPost({ request: req(cre), env: { ...env, HIVE_ACK: 'off' } });
  assert.equal(((await res.json()) as { acknowledged: boolean }).acknowledged, false);
  assert.equal(calls.length, 1);
  assert.match(sentAt(calls, 0).text, /No acknowledgment was sent to the requester/);
});

test('sender and reply address can be set from the environment', async () => {
  const calls = stubFetch(200);
  await onRequestPost({ request: req(cre), env: { ...env, HIVE_FROM: 'Hive <intake@bullnet.ai>', HIVE_REPLY_TO: 'desk@bullnet.ai', INTAKE_TO: 'ops@bullnet.ai' } });
  assert.deepEqual(sentAt(calls, 0).to, ['ops@bullnet.ai']);
  assert.equal(sentAt(calls, 1).from, 'Hive <intake@bullnet.ai>');
  assert.equal(sentAt(calls, 1).reply_to, 'desk@bullnet.ai');
});
