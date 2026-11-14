'use client';

import { useState } from 'react';
import { COVERAGE_TARGET, dollars, pencilEquipment, type EquipmentStatus } from '@/lib/equipment';

const FIELDS = [
  { k: 'price', label: 'Equipment price (USD)', step: 5000 },
  { k: 'downPct', label: 'Down payment (percent)', step: 1 },
  { k: 'aprPct', label: 'Your quoted annual rate (percent)', step: 0.25 },
  { k: 'termMonths', label: 'Term (months)', step: 6 },
  { k: 'revenueFull', label: 'Monthly revenue at full utilization (USD)', step: 500 },
  { k: 'opCost', label: 'Monthly operating cost (USD)', step: 250 },
  { k: 'utilPct', label: 'Expected utilization (percent)', step: 1 },
] as const;
type Key = (typeof FIELDS)[number]['k'];

/** A hypothetical machine. None of these numbers is a quote, a market rate or a real deal. */
const EXAMPLE: Record<Key, string> = { price: '350000', downPct: '10', aprPct: '9', termMonths: '60', revenueFull: '18000', opCost: '5500', utilPct: '65' };
const CLS: Record<EquipmentStatus, string> = { PENCILS: 'v-pass', THIN: 'v-rev', 'DOES NOT PENCIL': 'v-fail' };

export function EquipmentPencil() {
  const [v, setV] = useState(EXAMPLE);
  const n = Object.fromEntries(FIELDS.map((f) => [f.k, v[f.k] === '' ? NaN : Number(v[f.k])])) as Record<Key, number>;
  const r = pencilEquipment(n);

  return (
    <div className="grid2">
      <form className="panel" noValidate onSubmit={(e) => e.preventDefault()}>
        <div className="ph mono"><span>Your numbers</span><span>Example is hypothetical</span></div>
        <div className="pb fields">
          {FIELDS.map((f) => (
            <label key={f.k} htmlFor={`eq-${f.k}`}>{f.label}
              <input className="n" id={`eq-${f.k}`} type="number" min="0" step={f.step} inputMode="decimal" value={v[f.k]} onChange={(e) => setV({ ...v, [f.k]: e.target.value })} />
            </label>
          ))}
          <div><button className="btn ghost sm" type="button" onClick={() => setV(EXAMPLE)}>Reset example</button></div>
        </div>
      </form>
      <div className="gap">
        {!r.ok ? (
          <div className="verdict v-inc" role="status">Inconclusive<small>{r.why}</small></div>
        ) : (
          <>
            <div className={`verdict ${CLS[r.status]}`} role="status">
              {r.status}
              <small>
                {r.status === 'PENCILS' && `At ${n.utilPct}% utilization the machine earns ${r.coverage.toFixed(2)} times its payment.`}
                {r.status === 'THIN' && `At ${n.utilPct}% utilization the machine covers its payment ${r.coverage.toFixed(2)} times. One slow month and it does not.`}
                {r.status === 'DOES NOT PENCIL' && `At ${n.utilPct}% utilization the machine falls ${dollars(r.payment - r.net)} a month short of its payment. It needs ${r.breakEvenUtilPct.toFixed(1)}% to break even.`}
              </small>
            </div>
            <div className="panel">
              <div className="ph mono"><span>The math</span><span>Runs in your browser</span></div>
              <div className="pb scroll" tabIndex={0} role="region" aria-label="Equipment check results. Scroll sideways to see all of it.">
                <table style={{ minWidth: 380 }} aria-label="Equipment acquisition arithmetic">
                  <tbody>
                    <tr><th scope="row" className="rowh">Amount financed</th><td className="num">{dollars(r.financed)}</td></tr>
                    <tr><th scope="row" className="rowh">Monthly payment</th><td className="num" style={{ color: 'var(--platinum)' }}>{dollars(r.payment)}</td></tr>
                    <tr><th scope="row" className="rowh">Total interest over the term</th><td className="num">{dollars(r.totalInterest)}</td></tr>
                    <tr><th scope="row" className="rowh">Monthly cash after operating cost</th><td className="num">{dollars(r.net)}</td></tr>
                    <tr><th scope="row" className="rowh">Coverage (cash divided by payment)</th><td className="num" style={{ color: 'var(--platinum)' }}>{r.coverage.toFixed(2)}x</td></tr>
                    <tr><th scope="row" className="rowh">Break-even utilization</th><td className="num">{r.breakEvenUtilPct.toFixed(1)}%</td></tr>
                    <tr><th scope="row" className="rowh">Utilization for {COVERAGE_TARGET.toFixed(2)}x coverage</th><td className="num">{r.targetUtilPct > 100 ? 'above 100%' : `${r.targetUtilPct.toFixed(1)}%`}</td></tr>
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}
        <p className="steel" style={{ fontSize: '.84rem' }}>
          Level-payment loan, no fees, taxes, residual value or seasonality. The {COVERAGE_TARGET.toFixed(2)}x line is a common convention used here as an illustration. Lenders set their own tests. This is arithmetic on your numbers. It is not a loan offer, a rate quote or advice.
        </p>
      </div>
    </div>
  );
}
