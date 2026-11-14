'use client';

import { useState } from 'react';
import { checkExchange, money } from '@/lib/exchange';

interface Props { salePrice: number; debtPayoff: number; replacementPrice: number; ltvPct: number; lead: string }

/** Browser-side arithmetic on stated inputs. Illustrative only: not tax, legal or investment advice. */
export function ExchangeCheck({ salePrice, debtPayoff, replacementPrice, ltvPct, lead }: Props) {
  const [price, setPrice] = useState(String(replacementPrice / 1e6));
  const [ltv, setLtv] = useState(String(ltvPct));
  const r = checkExchange({ salePrice, debtPayoff, replacementPrice: Number(price) * 1e6, ltvPct: Number(ltv) });
  const met = r.ok && r.valueTest && r.equityTest;

  return (
    <div className="panel">
      <div className="ph mono"><span>Exchange check</span><span>Illustrative arithmetic</span></div>
      <div className="pb gap">
        <p className="steel" style={{ fontSize: '.94rem' }}>{lead}</p>
        <div className="grid2" style={{ gap: 16 }}>
          <label htmlFor="xPrice">Replacement price (USD millions)
            <input className="n" id="xPrice" type="number" min="1" step="5" inputMode="decimal" value={price} onChange={(e) => setPrice(e.target.value)} />
          </label>
          <label htmlFor="xLtv">Loan-to-value on replacement (percent)
            <input className="n" id="xLtv" type="number" min="0" max="99" step="1" inputMode="decimal" value={ltv} onChange={(e) => setLtv(e.target.value)} />
          </label>
        </div>
        {!r.ok ? (
          <div className="verdict v-inc" role="status">Inconclusive<small>{r.why}</small></div>
        ) : (
          <>
            <div className={`verdict ${met ? 'v-pass' : 'v-fail'}`} role="status">
              {met ? 'Both tests met' : 'Gap'}
              <small>
                {met
                  ? 'On these inputs the replacement covers the sale price and absorbs all of the equity. Timing, identification and the taxpayer’s own facts still decide the outcome.'
                  : r.equityUnplaced > 0
                    ? `${money(r.equityUnplaced)} of the ${money(r.netEquity)} equity has nowhere to go in this deal. Equity that is not reinvested is generally taxable.`
                    : `The replacement is ${money(r.valueShortfall)} below the sale price. Trading down generally leaves part of the gain taxable.`}
              </small>
            </div>
            <div className="scroll" tabIndex={0} role="region" aria-label="Exchange check results. Scroll sideways to see all of it.">
              <table style={{ minWidth: 420 }} aria-label="Exchange arithmetic">
                <tbody>
                  <tr><th scope="row" className="rowh">Sale equity to place</th><td className="num">{money(r.netEquity)}</td></tr>
                  <tr><th scope="row" className="rowh">New debt at {Number(ltv).toFixed(0)}% loan-to-value</th><td className="num">{money(r.newDebt)}</td></tr>
                  <tr><th scope="row" className="rowh">Equity this deal requires</th><td className="num">{money(r.equityRequired)}</td></tr>
                  <tr><th scope="row" className="rowh">Value test: price at least {money(salePrice)}</th><td className="num">{r.valueTest ? 'MET' : `SHORT ${money(r.valueShortfall)}`}</td></tr>
                  <tr><th scope="row" className="rowh">Equity test: all sale equity placed</th><td className="num">{r.equityTest ? 'MET' : `UNPLACED ${money(r.equityUnplaced)}`}</td></tr>
                  {r.cashToAdd > 0 && (<tr><th scope="row" className="rowh">Fresh cash needed beyond sale equity</th><td className="num">{money(r.cashToAdd)}</td></tr>)}
                  <tr><th scope="row" className="rowh">Price that absorbs all equity at this leverage</th><td className="num" style={{ color: 'var(--platinum)' }}>{money(r.priceToPlaceAllEquity)}</td></tr>
                </tbody>
              </table>
            </div>
          </>
        )}
        <p className="steel" style={{ fontSize: '.84rem' }}>
          Simplified, before closing costs, fees and taxes. This is arithmetic on the numbers you enter. It is not tax, legal or investment advice. A qualified intermediary and tax counsel decide whether an exchange works.
        </p>
      </div>
    </div>
  );
}
