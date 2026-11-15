import test from 'node:test';
import assert from 'node:assert/strict';
import { onRequestPost } from '../functions/api/intake.ts';
import { HIVE_FORMS, makeRef, validateHive } from '../lib/hive-intake.ts';
import { EQUIPMENT_SNAPSHOTS, fleetTotal, financed, residual } from '../content/hive.ts';

/** Synthetic test data. No real person, company or transaction. */
const contact = { 'Contact name': 'Test Person', Company: 'Example Contracting LLC', 'Business email': 'test@example.com', Phone: '555-0100' };
const cre = { form: 'hive-cre', ...contact, 'Property type': 'Multifamily', 'Transaction type': 'Acquisition', 'Requested analysis': 'Occupancy-adjusted NOI.', Consent: 'Yes' };
const equipment = { form: 'hive-equipment', ...contact, 'Business state': 'FL', 'Equipment category': 'Excavators', 'New or used': 'Used', 'Purchase price': '$240,000', 'Lease, purchase, or unsure': 'Unsure', Consent: 'Yes' };

const req = (body: unknown) =>
  new Request('https://bullnet.ai/api/intake', { method: 'POST', headers: { 'content-type': 'application/json', origin: 'https://bullnet.ai' }, body: JSON.stringify(body) });

function stubFetch(status: number) {
  const calls: { url: string; init: RequestInit }[] = [];
  globalThis.fetch = (async (url: string, init: RequestInit) => { calls.push({ url, init }); return new Response('{}', { status }); }) as typeof fetch;
  return calls;
}
const env = { RESEND_API_KEY: 'k' };

test('a CRE intake reaches the CRE workflow: one email, tagged, with a reference and the consent record', async () => {
  const calls = stubFetch(200);
  const res = await onRequestPost({ request: req(cre), env });
  assert.equal(res.status, 200);
  const body = (await res.json()) as { ok: boolean; ref: string; received: string };
  assert.match(body.ref, /^HCM-\d{8}-[A-Z2-9]{6}$/);
  assert.equal(calls.length, 1);
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
