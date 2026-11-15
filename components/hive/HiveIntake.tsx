'use client';

import { useEffect, useRef, useState, type FormEvent } from 'react';
import { CONSENT_TEXT, EMAIL, HIVE_FORMS, type FieldSpec, type HiveForm } from '@/lib/hive-intake';

/** Set only to an approved, server-backed endpoint. Empty means the form never claims delivery. */
const ENDPOINT = process.env.NEXT_PUBLIC_INTAKE_ENDPOINT ?? '';
const HASH: Record<string, HiveForm> = { '#intake-cre': 'hive-cre', '#intake-equipment': 'hive-equipment' };
const SERVICES: { form: HiveForm; label: string; blurb: string }[] = [
  { form: 'hive-cre', label: 'CRE intelligence', blurb: 'A property, a market or a transaction to analyze.' },
  { form: 'hive-equipment', label: 'Equipment finance', blurb: 'Equipment to acquire, lease or replace.' },
];
type Control = HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;
type Outcome = { kind: 'draft' | 'sent' | 'error' | 'sensitive'; text: string; ref?: string; ack?: boolean };
const small = { textTransform: 'none', letterSpacing: '0', fontFamily: 'var(--body)', fontSize: '.84rem' } as const;

function Field({ f, id, error }: { f: FieldSpec; id: string; error?: string }) {
  const common = { id, name: f.name, required: f.required, 'aria-invalid': !!error, 'aria-describedby': f.hint ? `${id}-h` : undefined };
  return (
    <label htmlFor={id}>
      {f.name}{!f.required && <span style={small}> (optional)</span>}
      {f.kind === 'select' ? (
        <select {...common}><option value="">Select</option>{f.options?.map((o) => <option key={o}>{o}</option>)}</select>
      ) : f.kind === 'text' ? (
        <textarea {...common} rows={3} maxLength={f.max} />
      ) : (
        <input {...common} type={f.kind === 'email' ? 'email' : f.name === 'Phone' ? 'tel' : 'text'} maxLength={f.max} autoComplete={f.autoComplete} />
      )}
      {f.hint && <span id={`${id}-h`} style={small}>{f.hint}</span>}
      <span className="err">{error}</span>
    </label>
  );
}

/**
 * Staged intake for both Hive Capital Markets services. Pick a service, fill the short first step,
 * optionally add detail. Sends to the same-site function, which validates everything again.
 */
export function HiveIntake() {
  const [form, setForm] = useState<HiveForm | null>(null);
  const [err, setErr] = useState<Record<string, string>>({});
  const [out, setOut] = useState<Outcome | null>(null);
  const [busy, setBusy] = useState(false);
  const [copyMsg, setCopyMsg] = useState('');
  const status = useRef<HTMLDivElement>(null);

  // The form closes once an intake is sent, which moves the page. Bring the result back into view.
  useEffect(() => { if (out) status.current?.scrollIntoView({ block: 'center' }); }, [out]);

  // A link elsewhere on the page can open the form on the right service: #intake-cre or #intake-equipment.
  useEffect(() => {
    const read = () => { const f = HASH[window.location.hash]; if (f) choose(f); };
    // A second click on the same link changes no hash, so listen for the click as well.
    const click = (e: MouseEvent) => {
      const f = HASH[(e.target as Element | null)?.closest?.('a[href^="#intake-"]')?.getAttribute('href') ?? ''];
      if (f) choose(f);
    };
    read();
    window.addEventListener('hashchange', read);
    document.addEventListener('click', click);
    return () => { window.removeEventListener('hashchange', read); document.removeEventListener('click', click); };
  }, []);

  function choose(f: HiveForm) { setForm(f); setErr({}); setOut(null); setCopyMsg(''); }

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!form || busy) return;
    const el = e.currentTarget;
    const controls = Array.from(el.querySelectorAll<Control>('input,select,textarea')).filter((c) => c.name !== 'website');
    const trap = el.querySelector<HTMLInputElement>('input[name="website"]')?.value ?? '';
    const errs: Record<string, string> = {};
    let first: Control | null = null;
    const fields: Record<string, string> = {};
    for (const c of controls) {
      const isBox = c instanceof HTMLInputElement && c.type === 'checkbox';
      const value = isBox ? (c.checked ? 'Yes' : '') : c.value.trim();
      let m = '';
      if (c.required && !value) m = isBox ? 'Your authorization is needed before we can review this.' : 'Required.';
      else if (value && c instanceof HTMLInputElement && c.type === 'email' && !EMAIL.test(value)) m = 'Enter a valid business email, such as name@firm.com.';
      if (m) { errs[c.id] = m; first ??= c; }
      if (value) fields[c.name] = value;
    }
    setErr(errs);
    setCopyMsg('');
    if (first) {
      setOut(null);
      // An error inside the closed optional section must be reachable.
      first.closest('details')?.setAttribute('open', '');
      first.focus();
      return;
    }
    const text = `HIVE CAPITAL MARKETS INTAKE: ${HIVE_FORMS[form].title.toUpperCase()}\n\n` + Object.entries(fields).map(([k, v]) => `${k}: ${v}`).join('\n');
    if (!ENDPOINT) { setOut({ kind: 'draft', text }); return; }
    setBusy(true);
    try {
      const res = await fetch(ENDPOINT, { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ form, ...fields, website: trap }) });
      const body = (await res.json().catch(() => ({}))) as { ok?: boolean; ref?: string; error?: string; acknowledged?: boolean };
      // "Sent" is shown only when the server confirms the message was accepted and returns its reference.
      if (res.ok && body.ok && body.ref) setOut({ kind: 'sent', text, ref: body.ref, ack: body.acknowledged === true });
      else setOut({ kind: body.error === 'sensitive_data' ? 'sensitive' : 'error', text });
    } catch {
      setOut({ kind: 'error', text });
    } finally {
      setBusy(false);
    }
  }

  async function copy() {
    if (!out) return;
    try { await navigator.clipboard.writeText(out.text); setCopyMsg('Copied.'); }
    catch { setCopyMsg('Copy was blocked. Select the text above and copy it manually.'); }
  }

  const spec = form ? HIVE_FORMS[form].fields : [];
  const id = (f: FieldSpec) => `hi-${form}-${spec.indexOf(f)}`;
  const one = spec.filter((f) => f.step === 1 && f.kind !== 'consent');
  const two = spec.filter((f) => f.step === 2);

  return (
    <div className="panel" id="intake">
      <span id="intake-cre" /><span id="intake-equipment" />
      <div className="ph mono"><span>Start here</span><span>No documents</span></div>
      <div className="pb gap">
        <fieldset className="svc">
          <legend className="mono">What can we pencil for you?</legend>
          <div className="svc-pick">
            {SERVICES.map((s) => (
              <button key={s.form} type="button" aria-pressed={form === s.form} onClick={() => choose(s.form)}>
                <strong>{s.label}</strong><span>{s.blurb}</span>
              </button>
            ))}
          </div>
        </fieldset>

        {form && out?.kind !== 'sent' && (
          <form className="fields" key={form} noValidate onSubmit={onSubmit} onChange={(e) => { const changed = (e.target as Element).id; if (err[changed]) setErr(({ [changed]: _fixed, ...rest }) => rest); }}>
            {one.map((f) => <Field key={f.name} f={f} id={id(f)} error={err[id(f)]} />)}
            <details className="more">
              <summary className="mono">Add detail now ({two.length} optional questions)</summary>
              <div className="fields">
                <p className="steel" style={small}>None of this is required to start. You can answer it later, with us.</p>
                {two.map((f) => <Field key={f.name} f={f} id={id(f)} error={err[id(f)]} />)}
              </div>
            </details>
            <label className="consent" htmlFor={`hi-${form}-consent`}>
              <input id={`hi-${form}-consent`} name="Consent" type="checkbox" required aria-invalid={!!err[`hi-${form}-consent`]} />
              <span style={small}>{CONSENT_TEXT}</span>
              <span className="err">{err[`hi-${form}-consent`]}</span>
            </label>
            <p className="steel" style={small}>Do not enter Social Security numbers, tax returns, bank statements or government IDs. No document upload is offered here by design.</p>
            <div aria-hidden="true" style={{ position: 'absolute', left: '-9999px', width: 1, height: 1, overflow: 'hidden' }}>
              <label htmlFor={`hi-${form}-website`}>Leave this field empty<input id={`hi-${form}-website`} name="website" type="text" tabIndex={-1} autoComplete="off" /></label>
            </div>
            {ENDPOINT && <p className="steel" style={small}>Submitting emails these details to BullNet.</p>}
            <div><button className="btn" type="submit" disabled={busy}>{busy ? 'Sending' : ENDPOINT ? 'Send intake' : 'Prepare intake'}</button></div>
          </form>
        )}

        <div role="status" className="gap-s" ref={status}>
          {out && (
            <>
              {out.kind === 'draft' && <p style={{ color: 'var(--review)' }}><strong>Not sent.</strong> This build has no approved submission endpoint, so nothing has left your browser and BullNet has not received this intake.</p>}
              {out.kind === 'error' && <p style={{ color: 'var(--fail)' }}><strong>Not sent.</strong> The intake could not be delivered. Your draft is below. You can copy it and email build@bullnet.ai.</p>}
              {out.kind === 'sensitive' && <p style={{ color: 'var(--fail)' }}><strong>Not sent.</strong> One of the answers looks like a Social Security number. Remove it and send again. We do not collect it here.</p>}
              {out.kind === 'sent' && (
                <>
                  <p><strong>Sent.</strong> Your intake was emailed to BullNet. Reference <strong className="mono">{out.ref}</strong>. Keep it: quote it when you follow up.{out.ack && ' A confirmation with this reference was emailed to the address you gave.'}</p>
                  <p className="steel" style={small}>A person reads every intake. Nothing has been sent to a lender or any other third party, and no documents were collected.</p>
                </>
              )}
              <pre className="copyback">{out.text}</pre>
              <div><button className="btn ghost sm" type="button" onClick={copy}>Copy</button> <span className="steel" style={{ fontSize: '.84rem' }}>{copyMsg}</span></div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
