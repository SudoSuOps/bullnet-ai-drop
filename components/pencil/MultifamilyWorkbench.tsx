'use client';

import { useState } from 'react';
import { underwrite, dollars, millions, type MultifamilyInputs, type Scenario } from '@/lib/multifamily';
import { buildRecords, type AnalyticalRecord } from '@/lib/pencil-record';

const FIELDS: { key: keyof MultifamilyInputs; label: string; step: string; min: string; max?: string }[] = [
  { key: 'units', label: 'Apartments', step: '1', min: '1' },
  { key: 'avgRent', label: 'Average monthly rent (USD)', step: '25', min: '1' },
  { key: 'occNowPct', label: 'Occupancy today (percent)', step: '1', min: '1', max: '100' },
  { key: 'occStabPct', label: 'Stabilized occupancy (percent)', step: '1', min: '1', max: '100' },
  { key: 'expensePct', label: 'Operating expense ratio (percent)', step: '1', min: '0', max: '99' },
  { key: 'capPct', label: 'Cap rate (percent)', step: '0.25', min: '0.25', max: '25' },
];

const TERMS: [string, string][] = [
  ['Potential gross rent', 'What the property would collect in a year if every apartment were leased at the average rent.'],
  ['Occupancy', 'The share of apartments that are leased. This model uses physical occupancy and does not adjust for unpaid rent or concessions.'],
  ['Effective gross income', 'Potential gross rent multiplied by occupancy.'],
  ['Operating expense ratio', 'Operating expenses as a share of effective gross income. Held fixed here, which is a simplification.'],
  ['NOI', 'Net operating income: income left after operating expenses, before debt payments and capital spending. Here it is modeled, not actual.'],
  ['Cap rate', 'Capitalization rate: NOI divided by value. Dividing NOI by an assumed cap rate gives an implied value.'],
  ['Implied value', 'Modeled NOI divided by the assumed cap rate. A modeled figure, not an appraisal, a price or an offer.'],
];

const V_CLASS: Record<AnalyticalRecord['verification'], string> = {
  'MATHEMATICALLY VERIFIED': 'v-pass', 'EVIDENCE SUPPORTED': 'v-pass', INCONCLUSIVE: 'v-inc', FAILED: 'v-fail', 'REQUIRES HUMAN REVIEW': 'v-rev',
};

const show = (r: AnalyticalRecord): string => {
  switch (r.units) {
    case 'units': return r.value.toLocaleString('en-US');
    case 'percent': return `${r.value}%`;
    case 'USD per month': return `${dollars(r.value)} a month`;
    case 'USD per year': return `${dollars(r.value)} a year`;
    default: return dollars(r.value);
  }
};

function ScenarioCard({ name, basis, s }: { name: string; basis: string; s: Scenario }) {
  const id = `sc-${name.toLowerCase().replace(/[^a-z]/g, '')}`;
  return (
    <div className="scen" role="group" aria-labelledby={id}>
      <p className="mono steel" id={id}>{name}<span> / {basis}</span></p>
      <p className="scen-occ">{s.occupancyPct}% <span>occupancy</span></p>
      <dl>
        <div><dt>Potential gross rent</dt><dd>{dollars(s.potentialGrossRent)}</dd></div>
        <div><dt>Effective gross income</dt><dd>{dollars(s.effectiveGrossIncome)}</dd></div>
        <div><dt>Operating expenses</dt><dd>{dollars(s.operatingExpenses)}</dd></div>
        <div className="hl"><dt>Modeled NOI</dt><dd>{dollars(s.noi)}</dd></div>
        <div className="hl"><dt>Implied value</dt><dd>{dollars(s.impliedValue)}</dd></div>
        <div><dt>Implied value per apartment</dt><dd>{dollars(s.impliedValuePerUnit)}</dd></div>
      </dl>
    </div>
  );
}

/** Browser-side arithmetic on stated inputs. No AI service and no network call. Illustrative only. */
export function MultifamilyWorkbench(start: MultifamilyInputs) {
  const initial = Object.fromEntries(FIELDS.map((f) => [f.key, String(start[f.key])])) as Record<keyof MultifamilyInputs, string>;
  const [v, setV] = useState(initial);
  const inputs = Object.fromEntries(FIELDS.map((f) => [f.key, v[f.key].trim() === '' ? NaN : Number(v[f.key])])) as unknown as MultifamilyInputs;
  const r = underwrite(inputs);
  const records = r.ok ? buildRecords(inputs, r) : [];
  const changed = FIELDS.some((f) => v[f.key] !== initial[f.key]);
  const cap = Number.isFinite(inputs.capPct) ? inputs.capPct : start.capPct;

  return (
    <>
      <div className="gap-s" id="run-the-numbers">
        <p className="mono steel">05</p>
        <h2 className="case-h">Run the numbers</h2>
        <p className="case-p">One set of formulas, run twice: once at today’s occupancy and once at the stabilized assumption. Average rent, the expense ratio and the cap rate are held fixed in both. Change any input and the figures recalculate in your browser.</p>
      </div>
      <div className="panel">
        <div className="ph mono"><span>Workbench</span><span>Illustrative arithmetic</span></div>
        <div className="pb gap">
          <div className="wb-fields">
            {FIELDS.map((f) => (
              <label key={f.key} htmlFor={`mf-${f.key}`}>{f.label}
                <input className="n" id={`mf-${f.key}`} type="number" inputMode="decimal" min={f.min} max={f.max} step={f.step} value={v[f.key]} onChange={(e) => setV({ ...v, [f.key]: e.target.value })} />
              </label>
            ))}
          </div>
          <p className="wb-reset">
            <span className="steel">{changed ? 'You have changed the teaching assumptions.' : 'Showing the Drop 002 teaching assumptions. All fictional.'}</span>
            <button type="button" className="btn ghost" onClick={() => setV(initial)} disabled={!changed}>Reset to Drop 002</button>
          </p>
          <div aria-live="polite" className="gap">
            {!r.ok ? (
              <div className="verdict v-inc">Inconclusive<small>{r.why}</small></div>
            ) : (
              <>
                <div className="scens">
                  <ScenarioCard name="As-is" basis="occupancy today" s={r.asIs} />
                  <ScenarioCard name="Stabilized" basis="assumed" s={r.stabilized} />
                </div>
                <div className="diff">
                  <p className="mono steel">Difference</p>
                  <p className="diff-n">{r.valueDifference < 0 ? 'Approximately −$' : 'Approximately $'}{millions(r.valueDifference)} million in implied capitalized value.</p>
                  <p>That is the gap between two modeled figures at a {cap}% cap rate ({dollars(r.valueDifference)}). It is not profit, an equity gain, realized appreciation or an investment return. Getting from one figure to the other costs money and time this model does not include.</p>
                </div>
              </>
            )}
          </div>
          <details className="terms">
            <summary>The formulas and what the terms mean</summary>
            <div className="gap-s">
              <pre>{`potential gross rent   = apartments x average monthly rent x 12
effective gross income = potential gross rent x occupancy
operating expenses     = effective gross income x expense ratio
modeled NOI            = effective gross income - operating expenses
implied value          = modeled NOI / cap rate
value per apartment    = implied value / apartments`}</pre>
              <dl className="kv">{TERMS.map(([t, d]) => (<div key={t} style={{ display: 'contents' }}><dt>{t}</dt><dd>{d}</dd></div>))}</dl>
            </div>
          </details>
          <p className="steel" style={{ fontSize: '.84rem' }}>
            Simplified, before vacancy and credit loss beyond physical occupancy, other income, capital spending, closing costs, debt and taxes. This is arithmetic on the numbers entered. It is not an appraisal, an offer or investment advice.
          </p>
        </div>
      </div>

      <div className="gap-s" id="defend-the-result">
        <p className="mono steel">06</p>
        <h2 className="case-h">Defend the result</h2>
        <p className="case-p">Every figure carries a record: where it came from, how it was calculated and how far it can be trusted. The arithmetic is recomputed a second way and must agree. That proves the sums. It does not prove the inputs.</p>
      </div>
      {r.ok ? (
        <>
          <div className="legend">
            <div><b className="lime">MATHEMATICALLY VERIFIED</b>The calculation was recomputed independently and agreed. {records.filter((x) => x.verification === 'MATHEMATICALLY VERIFIED').length} of {records.length} records.</div>
            <div><b className="steel">INCONCLUSIVE</b>An assumption with no source document behind it. {records.filter((x) => x.verification === 'INCONCLUSIVE').length} of {records.length} records.</div>
            <div><b>EVIDENCE SUPPORTED</b>Matched to a source document. None in this example, because no documents exist.</div>
          </div>
          <div className="scroll" tabIndex={0} role="region" aria-label="Analytical record. Scroll sideways to see all of it.">
            <table className="rec" style={{ minWidth: 760 }}>
              <caption className="sr">Analytical record for every input and calculated figure</caption>
              <thead><tr><th scope="col">Figure</th><th scope="col">Value</th><th scope="col">Designation</th><th scope="col">Status</th><th scope="col">Exceptions</th></tr></thead>
              <tbody>
                {records.map((x) => (
                  <tr key={x.name}>
                    <th scope="row" className="rowh" style={{ color: 'var(--platinum)' }}>{x.name}</th>
                    <td className="num">{show(x)}</td>
                    <td>{x.designation === 'calculated' ? 'Calculated' : 'Illustrative assumption'}</td>
                    <td><span className={`mono ${V_CLASS[x.verification]}`}>{x.verification}</span></td>
                    <td>{x.exceptions.join('. ')}.</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <details className="terms">
            <summary>Open the full record for each figure</summary>
            <div className="recs">
              {records.map((x) => (
                <dl className="kv" key={x.name}>
                  <dt>Input or output</dt><dd><strong>{x.name}</strong></dd>
                  <dt>Value</dt><dd>{show(x)}</dd>
                  <dt>Units</dt><dd>{x.units}</dd>
                  <dt>Designation</dt><dd>{x.designation === 'calculated' ? 'Calculated' : 'Illustrative assumption'}</dd>
                  <dt>Source</dt><dd>{x.source || (x.designation === 'calculated' ? 'Calculated from the inputs above' : 'None. No source document supplied')}</dd>
                  {x.formula && (<><dt>Formula</dt><dd>{x.formula}</dd></>)}
                  <dt>Verification</dt><dd>{x.verification}</dd>
                  <dt>Exceptions</dt><dd>{x.exceptions.join('. ')}.</dd>
                  <dt>Result</dt><dd>{x.result}.</dd>
                  <dt>Review</dt><dd>{x.review}</dd>
                </dl>
              ))}
            </div>
          </details>
        </>
      ) : (
        <p className="note">Enter valid inputs above to see the record.</p>
      )}
    </>
  );
}
