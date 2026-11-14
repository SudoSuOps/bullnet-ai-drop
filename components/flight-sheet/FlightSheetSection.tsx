'use client';

import { sensitivity, STATUS_CLASS, usd } from '@/lib/validate';
import { useValidator } from '@/components/validation/ValidatorContext';
import { Intake } from '@/components/flight-sheet/Intake';

export function FlightSheetSection() {
  const r = useValidator().result;
  const rows = sensitivity(r);
  return (
    <section id="flight-sheet">
      <div className="wrap">
        <header className="sh"><p className="idx mono"><b>08</b> The Flight Sheet</p>
          <h2>Every mission begins<br />with a Flight Sheet.</h2>
          <p className="lede">The Flight Sheet defines the mandate before work starts and holds the evidence when it ends. On the left is an illustrative completed sheet. On the right you can draft your own request.</p></header>
        <div className="grid2">
          <div className="panel"><div className="ph mono"><span>FS-DEMO-0001 / Industrial underwriting</span><span className="brass">Hypothetical</span></div>
            <div className="pb gap">
              <dl className="kv">
                <dt>Client</dt><dd>Example Distribution Co. (fictional)</dd>
                <dt>Objective</dt><dd>Test a direct-capitalization value for a 250,000 SF distribution building ahead of a purchase decision.</dd>
                <dt>Classification</dt><dd>Confidential, client-owned</dd>
                <dt>Permitted data</dt><dd>Client rent roll and trailing-12 statement; licensed market data; no external transfer</dd>
                <dt>Agents</dt><dd>Lease abstraction, Underwriting, Mathematical validator</dd>
                <dt>Calculations</dt><dd>NOI reconciliation, direct cap value, cap-rate sensitivity at 50 basis points either side</dd>
                <dt>Human review</dt><dd>Assumption sign-off before run; exception review after validation</dd>
                <dt>Acceptance</dt><dd>Every deterministic test passes and every figure traces to a source version</dd>
                <dt>Validation</dt><dd><span className={STATUS_CLASS[r.status]} style={{ fontFamily: 'var(--mono)', fontSize: '.78rem', letterSpacing: '.06em' }}>{r.status}</span> on DEF-CAP-001</dd>
              </dl>
              <div className="scroll" tabIndex={0} role="region" aria-label="Cap rate sensitivity table. Scroll sideways to see all of it."><table style={{ minWidth: '360px' }} aria-label="Cap rate sensitivity, hypothetical"><thead><tr><th scope="col">Scenario</th><th scope="col" className="num">Cap rate</th><th scope="col" className="num">Recomputed value</th></tr></thead><tbody>
    {rows.length === 0 ? (<tr><td colSpan={3}>Enter valid validator inputs to calculate.</td></tr>) : rows.map((x) => (
    <tr key={x.label}><th scope="row" style={{ font: 'inherit', textTransform: 'none', letterSpacing: 0, color: '#AEB6BE' }}>{x.label}</th><td className="num">{x.capPct.toFixed(2)}%</td><td className="num" style={{ color: 'var(--platinum)' }}>{usd(x.value)}</td></tr>
    ))}
    </tbody></table></div>
              <p className="steel" style={{ fontSize: '.84rem' }}>Sensitivity recalculates from the validator inputs in section 12. No figure here is a real property, client or transaction.</p>
            </div></div>

          <Intake />
        </div>
      </div>
    </section>
  );
}
