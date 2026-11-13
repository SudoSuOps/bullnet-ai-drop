import test from 'node:test';
import assert from 'node:assert/strict';
import { onRequestPost } from '../functions/api/intake.ts';

const valid = {
  Organization: 'Example Family Office', 'Contact name': 'A. Person', 'Business email': 'a@example.com', Role: 'CIO',
  'Industry focus': 'Industrial', 'Primary problem': 'Fragmented diligence.', 'Desired environment': 'Not sure yet',
  'Confidentiality requirements': 'To be discussed', 'Preferred contact method': 'Email',
};
const req = (body: unknown, origin: string | null = 'https://bullnet.ai') =>
  new Request('https://bullnet.ai/api/intake', {
    method: 'POST',
    headers: { 'content-type': 'application/json', ...(origin ? { origin } : {}) },
    body: typeof body === 'string' ? body : JSON.stringify(body),
  });

function stubFetch(status: number) {
  const calls: { url: string; init: RequestInit }[] = [];
  globalThis.fetch = (async (url: string, init: RequestInit) => { calls.push({ url, init }); return new Response('{}', { status }); }) as typeof fetch;
  return calls;
}

test('sends a valid request through Resend and reports success', async () => {
  const calls = stubFetch(200);
  const res = await onRequestPost({ request: req(valid), env: { RESEND_API_KEY: 'k' } });
  assert.equal(res.status, 200);
  assert.equal(calls.length, 1);
  assert.equal(calls[0].url, 'https://api.resend.com/emails');
  const sent = JSON.parse(String(calls[0].init.body));
  assert.deepEqual(sent.to, ['build@bullnet.ai']);
  assert.equal(sent.reply_to, 'a@example.com');
  assert.match(sent.text, /Organization: Example Family Office/);
});

test('does not claim success when the provider rejects the message', async () => {
  stubFetch(422);
  assert.equal((await onRequestPost({ request: req(valid), env: { RESEND_API_KEY: 'k' } })).status, 502);
});

test('refuses to send without a configured key', async () => {
  const calls = stubFetch(200);
  assert.equal((await onRequestPost({ request: req(valid), env: {} })).status, 503);
  assert.equal(calls.length, 0);
});

test('rejects other origins, bad fields and oversized bodies without sending', async () => {
  const calls = stubFetch(200);
  const env = { RESEND_API_KEY: 'k' };
  assert.equal((await onRequestPost({ request: req(valid, 'https://evil.example'), env })).status, 403);
  assert.equal((await onRequestPost({ request: req(valid, null), env })).status, 403);
  assert.equal((await onRequestPost({ request: req({ ...valid, 'Business email': 'nope' }), env })).status, 400);
  assert.equal((await onRequestPost({ request: req({ ...valid, Role: '' }), env })).status, 400);
  assert.equal((await onRequestPost({ request: req('{bad'), env })).status, 400);
  assert.equal((await onRequestPost({ request: req({ ...valid, 'Primary problem': 'x'.repeat(11000) }), env })).status, 413);
  assert.equal(calls.length, 0);
});

test('swallows honeypot submissions and strips header injection', async () => {
  const calls = stubFetch(200);
  const env = { RESEND_API_KEY: 'k' };
  assert.equal((await onRequestPost({ request: req({ ...valid, website: 'http://spam' }), env })).status, 200);
  assert.equal(calls.length, 0);
  await onRequestPost({ request: req({ ...valid, Organization: 'Acme\r\nBcc: x@y.z' }), env });
  assert.ok(!JSON.parse(String(calls[0].init.body)).subject.includes('\n'));
});
