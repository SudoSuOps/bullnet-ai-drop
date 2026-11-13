'use client';

import { describe, STATUS_CLASS, TEST_DEFINITION } from '@/lib/validate';
import { useValidator } from '@/components/validation/ValidatorContext';

export function ValidatorSection() {
  const v = useValidator();
  const r = v.result;
  const d = describe(r);
  return (
    <section id="defendable">
      <div className="wrap">
        <header className="sh"><p className="idx mono"><b>08</b> Defendable / Validate the validator</p>
          <h2>If the math fails,<br />the answer fails.</h2>
          <p className="lede">The model is not the authority. The evidence is. An agent has submitted a direct-capitalization value for a hypothetical industrial property. Change any input and the check below recomputes it independently in your browser.</p></header>
        <div className="grid2">
          <form className="panel" id="valForm" noValidate onSubmit={(e) => e.preventDefault()}><div className="ph mono"><span>Inputs</span><span className="brass">All figures hypothetical</span></div>
            <div className="pb fields">
              <label htmlFor="vNoi">Net operating income (USD per year)<input className="n" id="vNoi" inputMode="decimal" autoComplete="off" value={v.noi} onChange={(e) => v.setNoi(e.target.value)} /></label>
              <label htmlFor="vCap">Cap rate (percent)<input className="n" id="vCap" inputMode="decimal" autoComplete="off" value={v.cap} onChange={(e) => v.setCap(e.target.value)} /></label>
              <label htmlFor="vAgent">Valuation submitted by agent (USD)<input className="n" id="vAgent" inputMode="decimal" autoComplete="off" value={v.agent} onChange={(e) => v.setAgent(e.target.value)} /></label>
              <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}><button className="btn ghost sm" type="button" onClick={v.reset}>Reset example</button><button className="btn ghost sm" type="button" disabled={r.status !== 'FAILED'} onClick={v.applyCorrected}>Apply corrected value</button></div>
              <pre className="steel" aria-label="Test definition">{TEST_DEFINITION}</pre>
            </div></form>
          <div className="gap">
            <div className={`verdict ${STATUS_CLASS[r.status]}`} role="status">{r.status}<small>{d.message}</small></div>
            <div className="panel"><div className="ph mono"><span>Independent recomputation</span><span>Runs locally</span></div><div className="pb"><pre>{d.log}</pre></div></div>
            <div className="panel"><div className="ph mono"><span>Flight Sheet record</span><span>FS-DEMO-0001</span></div><div className="pb"><p style={{ fontSize: '.94rem', color: '#D3D8DC' }}>{d.record}</p></div></div>
          </div>
        </div>
        <p className="note" style={{ marginTop: '28px' }}>This test proves the arithmetic. It does not prove that the NOI is right or that the cap rate suits the asset. Those are evidence and judgment questions, and they carry a different status.</p>
        <div className="legend" style={{ marginTop: '28px' }}>
          <div><b className="lime">MATHEMATICALLY VERIFIED</b>A calculation satisfies defined deterministic requirements.</div>
          <div><b className="brass">EVIDENCE SUPPORTED</b>A claim is supported by identified and available sources.</div>
          <div><b className="steel">INCONCLUSIVE</b>The available information is insufficient.</div>
          <div><b style={{ color: 'var(--fail)' }}>FAILED</b>The output violates a known requirement or test.</div>
          <div><b style={{ color: 'var(--review)' }}>REQUIRES HUMAN REVIEW</b>The matter needs qualified judgment or authorization.</div>
        </div>
        <p className="steel" style={{ marginTop: '18px', fontSize: '.88rem' }}><span className="tag b">Illustrative demonstration</span> This is a browser-side example of the method. It is not a deployed model evaluator and no AI model is running on this page.</p>
      </div>
    </section>
  );
}
