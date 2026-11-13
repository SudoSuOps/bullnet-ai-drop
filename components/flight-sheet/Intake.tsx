'use client';

import { useState, type FormEvent } from 'react';

/** Set only to an approved, server-backed endpoint. Empty means the form never claims delivery. */
const ENDPOINT = process.env.NEXT_PUBLIC_INTAKE_ENDPOINT ?? '';
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
type Control = HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;
type Outcome = { kind: 'draft' | 'sent' | 'error'; text: string };

export function Intake() {
  const [err, setErr] = useState<Record<string, string>>({});
  const [out, setOut] = useState<Outcome | null>(null);
  const [copyMsg, setCopyMsg] = useState('');

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const controls = Array.from(e.currentTarget.querySelectorAll<Control>('input,select,textarea'));
    const errs: Record<string, string> = {};
    let first: Control | null = null;
    for (const el of controls) {
      const value = el.value.trim();
      let m = '';
      if (!value) m = 'Required.';
      else if (el instanceof HTMLInputElement && el.type === 'email' && !EMAIL.test(value)) m = 'Enter a valid business email, such as name@firm.com.';
      if (m) { errs[el.id] = m; first ??= el; }
    }
    setErr(errs);
    setCopyMsg('');
    if (first) { setOut(null); first.focus(); return; }
    const fields = Object.fromEntries(controls.map((el) => [el.name, el.value.trim()]));
    const text = 'BULLNET FLIGHT SHEET REQUEST (DRAFT)\n\n' + Object.entries(fields).map(([k, val]) => `${k}: ${val}`).join('\n');
    if (!ENDPOINT) { setOut({ kind: 'draft', text }); return; }
    try {
      const res = await fetch(ENDPOINT, { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify(fields) });
      setOut({ kind: res.ok ? 'sent' : 'error', text });
    } catch {
      setOut({ kind: 'error', text });
    }
  }

  async function copy() {
    if (!out) return;
    try { await navigator.clipboard.writeText(out.text); setCopyMsg('Copied.'); }
    catch { setCopyMsg('Copy was blocked. Select the text above and copy it manually.'); }
  }
  return (
    <form className="panel" id="intake" noValidate onSubmit={onSubmit}><div className="ph mono"><span>Engagement intake</span><span>Draft only</span></div>
            <div className="pb fields">
              <label htmlFor="fOrg">Organization<input id="fOrg" aria-invalid={!!err.fOrg} name="Organization" required autoComplete="organization" /><span className="err" id="fOrg-e">{err.fOrg}</span></label>
              <label htmlFor="fName">Contact name<input id="fName" aria-invalid={!!err.fName} name="Contact name" required autoComplete="name" /><span className="err" id="fName-e">{err.fName}</span></label>
              <label htmlFor="fEmail">Business email<input id="fEmail" aria-invalid={!!err.fEmail} name="Business email" type="email" required autoComplete="email" /><span className="err" id="fEmail-e">{err.fEmail}</span></label>
              <label htmlFor="fRole">Role<select id="fRole" aria-invalid={!!err.fRole} name="Role" required><option value="">Select</option><option>Principal</option><option>CIO</option><option>CFO</option><option>Investment committee member</option><option>Asset manager</option><option>Operations or technology lead</option><option>Other</option></select><span className="err" id="fRole-e">{err.fRole}</span></label>
              <label htmlFor="fFocus">Industry focus<select id="fFocus" aria-invalid={!!err.fFocus} name="Industry focus" required><option value="">Select</option><option>Industrial</option><option>Cold chain</option><option>Logistics and last mile</option><option>Capital markets</option><option>Family office systems</option></select><span className="err" id="fFocus-e">{err.fFocus}</span></label>
              <label htmlFor="fProb">Primary problem<textarea id="fProb" aria-invalid={!!err.fProb} name="Primary problem" rows={3} required aria-describedby="fProb-h"></textarea><span id="fProb-h" style={{ textTransform: 'none', letterSpacing: '0', fontFamily: 'var(--body)', fontSize: '.82rem' }}>Describe it in general terms. Do not include confidential deal details here.</span><span className="err" id="fProb-e">{err.fProb}</span></label>
              <label htmlFor="fEnv">Desired environment<select id="fEnv" aria-invalid={!!err.fEnv} name="Desired environment" required><option value="">Select</option><option>Node in our office</option><option>Our own controlled environment</option><option>Dedicated private infrastructure</option><option>BullNet-operated bare metal</option><option>Not sure yet</option></select><span className="err" id="fEnv-e">{err.fEnv}</span></label>
              <label htmlFor="fConf">Confidentiality requirements<select id="fConf" aria-invalid={!!err.fConf} name="Confidentiality requirements" required><option value="">Select</option><option>NDA required before any discussion</option><option>NDA required before sharing documents</option><option>Existing agreement in place</option><option>To be discussed</option></select><span className="err" id="fConf-e">{err.fConf}</span></label>
              <label htmlFor="fPref">Preferred contact method<select id="fPref" aria-invalid={!!err.fPref} name="Preferred contact method" required><option value="">Select</option><option>Email</option><option>Phone call</option><option>Video call</option></select><span className="err" id="fPref-e">{err.fPref}</span></label>
              <p className="steel" style={{ fontSize: '.84rem', textTransform: 'none' }}>No document upload is offered here by design. Confidential files move only after an agreement and an approved channel are in place.</p>
              <button className="btn" type="submit">Prepare Flight Sheet request</button>
              <div role="status" className="gap-s">
    {out && (
    <>
    {out.kind === 'draft' && (<p style={{ color: 'var(--review)' }}><strong>Not sent.</strong> This build has no approved submission endpoint, so nothing has left your browser and BullNet has not received this request.</p>)}
    {out.kind === 'error' && (<p style={{ color: 'var(--fail)' }}><strong>Not sent.</strong> The submission endpoint did not accept the request. Your draft is below.</p>)}
    {out.kind === 'sent' && (<p><strong>Submitted.</strong> The intake endpoint accepted this request.</p>)}
    <pre className="receipt">{out.text}</pre>
    <button className="btn ghost sm" type="button" onClick={copy}>Copy draft</button>
    <span className="steel" style={{ fontSize: '.84rem' }}>{copyMsg}</span>
    </>
    )}
    </div>
            </div></form>
  );
}
