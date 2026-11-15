/**
 * Hive Capital Markets intake: one field specification shared by the browser form and the server function.
 * The server never trusts the browser: validateHive() runs again in functions/api/intake.ts.
 *
 * Data minimization: the short first step is all that is required. No documents, no Social Security numbers,
 * no tax returns, no bank statements and no government IDs are collected here.
 */
export type HiveForm = 'hive-cre' | 'hive-equipment';
export type FieldKind = 'line' | 'text' | 'email' | 'select' | 'consent';

export interface FieldSpec {
  name: string;
  kind: FieldKind;
  required: boolean;
  /** 1 = short first step. 2 = optional detail the visitor may add now or later. */
  step: 1 | 2;
  max: number;
  options?: readonly string[];
  hint?: string;
  autoComplete?: string;
}

/** Version of the consent wording below. Recorded with every submission. Change the version when the words change. */
export const CONSENT_VERSION = 'hive-intake-consent-v1';
export const CONSENT_TEXT =
  'I authorize BullNet to review this information for an initial assessment and to contact me about it. I understand that BullNet is not a lender or a real estate broker, that this is not an application for credit, and that nothing is sent to a lender or any other third party without my separate written authorization.';

const TIMELINE = ['This week', 'Within 30 days', '30 to 90 days', 'No fixed date'] as const;
const line = (name: string, required: boolean, step: 1 | 2, extra: Partial<FieldSpec> = {}): FieldSpec => ({ name, kind: 'line', required, step, max: 200, ...extra });
const pick = (name: string, required: boolean, step: 1 | 2, options: readonly string[], extra: Partial<FieldSpec> = {}): FieldSpec => ({ name, kind: 'select', required, step, max: 200, options, ...extra });

const CONTACT: FieldSpec[] = [
  line('Contact name', true, 1, { autoComplete: 'name' }),
  line('Company', true, 1, { autoComplete: 'organization' }),
  { name: 'Business email', kind: 'email', required: true, step: 1, max: 200, autoComplete: 'email' },
  line('Phone', true, 1, { max: 40, autoComplete: 'tel' }),
];
const CONSENT: FieldSpec = { name: 'Consent', kind: 'consent', required: true, step: 1, max: 3 };

export const EQUIPMENT_CATEGORIES = [
  'Commercial trucks', 'Dump trucks and vocational vehicles', 'Excavators', 'Bulldozers', 'Wheel loaders', 'Cranes', 'Trailers',
  'Agriculture', 'Manufacturing', 'Material handling', 'Construction machinery', 'Refrigeration and cold chain',
  'Generators and energy equipment', 'AI and data-center infrastructure',
] as const;

export const HIVE_FORMS: Record<HiveForm, { title: string; tag: string; fields: FieldSpec[] }> = {
  'hive-cre': {
    title: 'CRE intelligence',
    tag: 'CRE',
    fields: [
      ...CONTACT,
      pick('Property type', true, 1, ['Industrial and logistics', 'Multifamily', 'Retail and single-tenant net lease', 'Office', 'Hospitality', 'Cold storage', 'Land and development', 'Other']),
      pick('Transaction type', true, 1, ['Acquisition', 'Disposition', 'Refinance or debt', 'Sale-leaseback', '1031 exchange analysis', 'Hold or asset review', 'Other']),
      { name: 'Requested analysis', kind: 'text', required: true, step: 1, max: 2000, hint: 'General terms only. Leave out names, addresses and confidential deal details.' },
      line('Property location', false, 2, { hint: 'A city, state or market is enough.' }),
      pick('Estimated asset value', false, 2, ['Under $5 million', '$5 million to $25 million', '$25 million to $100 million', 'Over $100 million', 'Not sure']),
      line('Current NOI, if known', false, 2, { max: 60 }),
      pick('Target timeline', false, 2, TIMELINE),
      pick('Confidentiality preference', false, 2, ['NDA required before any discussion', 'NDA required before sharing documents', 'Existing agreement in place', 'To be discussed']),
      pick('Supporting documents available', false, 2, ['Yes, once a secure channel is set up', 'Some', 'Not yet'], { hint: 'Tell us what exists. Do not send documents by email.' }),
      CONSENT,
    ],
  },
  'hive-equipment': {
    title: 'Equipment finance',
    tag: 'Equipment',
    fields: [
      ...CONTACT,
      line('Business state', true, 1, { max: 40 }),
      pick('Equipment category', true, 1, EQUIPMENT_CATEGORIES),
      pick('New or used', true, 1, ['New', 'Used', 'Both or unsure']),
      line('Purchase price', true, 1, { max: 60, hint: 'An estimate is fine.' }),
      pick('Lease, purchase, or unsure', true, 1, ['Lease', 'Purchase', 'Unsure']),
      line('Industry and NAICS, if known', false, 2),
      pick('Years in business', false, 2, ['Under 2 years', '2 to 5 years', '5 to 10 years', 'Over 10 years']),
      line('Make, model, and year', false, 2),
      line('Seller or dealer', false, 2),
      line('Requested financing amount', false, 2, { max: 60 }),
      line('Proposed down payment', false, 2, { max: 60 }),
      pick('Preferred term', false, 2, ['24 months', '36 months', '48 months', '60 months', '72 months or longer', 'Unsure']),
      line('Estimated annual equipment utilization', false, 2, { hint: 'Hours, miles or days a year.' }),
      line('Current equipment being replaced', false, 2),
      line('Estimated residual or resale value, if known', false, 2, { max: 60 }),
      pick('Funding timeline', false, 2, TIMELINE),
      pick('Existing financing or liens', false, 2, ['None', 'Yes', 'Not sure']),
      pick('Financial documents available', false, 2, ['Yes, once a secure channel is set up', 'Some', 'Not yet'], { hint: 'Tell us what exists. Do not send documents by email.' }),
      CONSENT,
    ],
  },
};

export const isHiveForm = (v: unknown): v is HiveForm => v === 'hive-cre' || v === 'hive-equipment';

export const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
/** A Social Security number written the usual way. The form refuses it rather than carrying it. */
const SSN = /\b\d{3}-\d{2}-\d{4}\b/;
const oneLine = (s: string): string => s.replace(/[\r\n\t]+/g, ' ').trim();

export type HiveValidation = { ok: true; clean: Record<string, string> } | { ok: false; error: 'invalid_field' | 'sensitive_data'; field: string };

/** Validate one submission against its form. Unknown keys are dropped. Optional fields left empty are dropped. */
export function validateHive(form: HiveForm, data: Record<string, unknown>): HiveValidation {
  const clean: Record<string, string> = {};
  for (const f of HIVE_FORMS[form].fields) {
    const raw = data[f.name];
    if (raw === undefined || raw === null || (typeof raw === 'string' && raw.trim() === '')) {
      if (f.required) return { ok: false, error: 'invalid_field', field: f.name };
      continue;
    }
    if (typeof raw !== 'string' || raw.length > f.max) return { ok: false, error: 'invalid_field', field: f.name };
    const value = f.kind === 'text' ? raw.trim() : oneLine(raw);
    if (SSN.test(value)) return { ok: false, error: 'sensitive_data', field: f.name };
    if (f.kind === 'email' && !EMAIL.test(value)) return { ok: false, error: 'invalid_field', field: f.name };
    if (f.kind === 'select' && !f.options?.includes(value)) return { ok: false, error: 'invalid_field', field: f.name };
    if (f.kind === 'consent' && value !== 'Yes') return { ok: false, error: 'invalid_field', field: f.name };
    clean[f.name] = value;
  }
  return { ok: true, clean };
}

/** Letters and digits that are hard to misread aloud or on paper (no 0/O, 1/I/L). */
const ALPHABET = 'ABCDEFGHJKMNPQRSTUVWXYZ23456789';

/** Reference shown to the visitor and written into the email. It identifies an email, not a case record. */
export function makeRef(now: Date, bytes: Uint8Array): string {
  const day = now.toISOString().slice(0, 10).replaceAll('-', '');
  const tail = Array.from(bytes.slice(0, 6), (b) => ALPHABET[b % ALPHABET.length]).join('');
  return `HCM-${day}-${tail}`;
}
