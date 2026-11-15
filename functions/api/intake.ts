/**
 * Cloudflare Pages Function: POST /api/intake
 * Receives a Flight Sheet request from the site and emails it to BullNet through Resend.
 *
 * Secrets and settings live in Cloudflare (Pages project → Settings → Variables and Secrets), never in this repo:
 *   RESEND_API_KEY  required, secret
 *   INTAKE_TO       optional, defaults to build@bullnet.ai
 *   INTAKE_FROM     optional, defaults to "BullNet Flight Sheet <flightsheet@bullnet.ai>" (must be on the verified domain)
 *
 * Nothing is stored here. The request is validated, forwarded as one email and discarded.
 *
 * Two kinds of request share this endpoint:
 *   - the Flight Sheet form on the home page (no `form` key), unchanged;
 *   - the Hive Capital Markets intakes (`form: 'hive-cre' | 'hive-equipment'`), validated against lib/hive-intake.ts.
 * A Hive intake gets a reference and a timestamp so the visitor and the inbox can refer to the same email.
 * That reference identifies an email. It is not a case record: no database exists yet.
 */
import { CONSENT_TEXT, CONSENT_VERSION, HIVE_FORMS, isHiveForm, makeRef, validateHive, type HiveForm } from '../../lib/hive-intake.ts';

interface Env { RESEND_API_KEY?: string; INTAKE_TO?: string; INTAKE_FROM?: string }
interface Context { request: Request; env: Env }

const FIELDS = [
  'Organization', 'Contact name', 'Business email', 'Role', 'Industry focus',
  'Primary problem', 'Desired environment', 'Confidentiality requirements', 'Preferred contact method',
] as const;
const MAX_BODY = 10_000;
const MAX_FIELD = 200;
const MAX_PROBLEM = 4_000;
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const json = (status: number, body: Record<string, unknown>): Response =>
  new Response(JSON.stringify(body), { status, headers: { 'content-type': 'application/json', 'cache-control': 'no-store' } });

/** Collapse whitespace so user input cannot break out of an email header. */
const oneLine = (s: string): string => s.replace(/[\r\n\t]+/g, ' ').trim();

export async function onRequestPost({ request, env }: Context): Promise<Response> {
  // Same-origin only: the form on this site is the only intended caller.
  const origin = request.headers.get('origin');
  if (!origin || new URL(origin).host !== new URL(request.url).host) return json(403, { ok: false, error: 'forbidden' });
  if (!(request.headers.get('content-type') ?? '').includes('application/json')) return json(415, { ok: false, error: 'unsupported' });

  const raw = await request.text();
  if (raw.length > MAX_BODY) return json(413, { ok: false, error: 'too_large' });
  let data: Record<string, unknown>;
  try {
    data = JSON.parse(raw);
  } catch {
    return json(400, { ok: false, error: 'invalid_json' });
  }
  if (typeof data !== 'object' || data === null || Array.isArray(data)) return json(400, { ok: false, error: 'invalid_json' });

  // Honeypot: real visitors never see or fill this field. Answer 200 so bots learn nothing.
  if (typeof data.website === 'string' && data.website.trim() !== '') return json(200, { ok: true });

  if ('form' in data) return isHiveForm(data.form) ? hiveIntake(data.form, data, env) : json(400, { ok: false, error: 'invalid_field', field: 'form' });

  const clean: Record<string, string> = {};
  for (const name of FIELDS) {
    const value = data[name];
    const limit = name === 'Primary problem' ? MAX_PROBLEM : MAX_FIELD;
    if (typeof value !== 'string' || value.trim() === '' || value.length > limit) return json(400, { ok: false, error: 'invalid_field', field: name });
    clean[name] = name === 'Primary problem' ? value.trim() : oneLine(value);
  }
  if (!EMAIL.test(clean['Business email'])) return json(400, { ok: false, error: 'invalid_field', field: 'Business email' });

  if (!env.RESEND_API_KEY) return json(503, { ok: false, error: 'not_configured' });

  const text = [
    'New Flight Sheet request from bullnet.ai',
    '',
    ...FIELDS.map((name) => (name === 'Primary problem' ? `${name}:\n${clean[name]}` : `${name}: ${clean[name]}`)),
    '',
    'Sent by the site intake form. Reply to this email to answer the requester.',
  ].join('\n');

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { authorization: `Bearer ${env.RESEND_API_KEY}`, 'content-type': 'application/json' },
    body: JSON.stringify({
      from: env.INTAKE_FROM ?? 'BullNet Flight Sheet <flightsheet@bullnet.ai>',
      to: [env.INTAKE_TO ?? 'build@bullnet.ai'],
      reply_to: clean['Business email'],
      subject: `Flight Sheet request: ${clean.Organization}`.slice(0, 150),
      text,
    }),
  });
  // Only report success when the mail provider accepted the message.
  return res.ok ? json(200, { ok: true }) : json(502, { ok: false, error: 'send_failed' });
}

/** Hive Capital Markets intake: validate, stamp, email. Reports success only when the mail provider accepted the message. */
async function hiveIntake(form: HiveForm, data: Record<string, unknown>, env: Env): Promise<Response> {
  const checked = validateHive(form, data);
  if (!checked.ok) return json(400, { ok: false, error: checked.error, field: checked.field });
  if (!env.RESEND_API_KEY) return json(503, { ok: false, error: 'not_configured' });

  const { title, tag, fields } = HIVE_FORMS[form];
  const { clean } = checked;
  const now = new Date();
  const ref = makeRef(now, crypto.getRandomValues(new Uint8Array(6)));
  const text = [
    `New Hive Capital Markets intake: ${title}`,
    `Reference: ${ref}`,
    `Received (UTC): ${now.toISOString()}`,
    '',
    ...fields.filter((f) => f.kind !== 'consent' && clean[f.name] !== undefined).map((f) => (f.kind === 'text' ? `${f.name}:\n${clean[f.name]}` : `${f.name}: ${clean[f.name]}`)),
    '',
    `Consent given: Yes (${CONSENT_VERSION})`,
    `Consent wording: ${CONSENT_TEXT}`,
    '',
    'Research and review only. Nothing here authorizes contact with a lender or any other third party.',
    'Sent by the site intake form. No documents were collected. Reply to this email to answer the requester.',
  ].join('\n');

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { authorization: `Bearer ${env.RESEND_API_KEY}`, 'content-type': 'application/json' },
    body: JSON.stringify({
      from: env.INTAKE_FROM ?? 'BullNet Flight Sheet <flightsheet@bullnet.ai>',
      to: [env.INTAKE_TO ?? 'build@bullnet.ai'],
      reply_to: clean['Business email'],
      subject: `[Hive ${tag}] ${ref}: ${clean.Company}`.slice(0, 150),
      text,
    }),
  });
  return res.ok ? json(200, { ok: true, ref, received: now.toISOString() }) : json(502, { ok: false, error: 'send_failed' });
}

/** Any other method on this path. */
export async function onRequest(): Promise<Response> {
  return json(405, { ok: false, error: 'method_not_allowed' });
}
