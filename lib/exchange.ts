/**
 * Simplified like-kind exchange arithmetic for the "Does It Pencil?" series.
 * Two tests on stated inputs, before closing costs, fees and taxes:
 *   value test:  replacement price is at least the sale price
 *   equity test: all net sale equity is placed into the replacement
 * It is arithmetic, not tax advice. Real exchanges also turn on timing, identification,
 * title, the intermediary and the taxpayer's own facts.
 */
export interface ExchangeInputs {
  salePrice: number;
  debtPayoff: number;
  replacementPrice: number;
  /** Loan-to-value on the replacement, in percent. */
  ltvPct: number;
}

export interface ExchangeResult {
  ok: true;
  netEquity: number;
  newDebt: number;
  equityRequired: number;
  /** Sale price not covered by the replacement price. */
  valueShortfall: number;
  /** Sale equity with nowhere to go in the replacement. */
  equityUnplaced: number;
  /** Fresh cash needed beyond the sale equity. */
  cashToAdd: number;
  debtChange: number;
  /** Replacement price at which this leverage absorbs all the sale equity. */
  priceToPlaceAllEquity: number;
  valueTest: boolean;
  equityTest: boolean;
}

export type ExchangeOutcome = ExchangeResult | { ok: false; why: string };

const cents = (n: number): number => Math.round(n * 100) / 100;

export function checkExchange({ salePrice, debtPayoff, replacementPrice, ltvPct }: ExchangeInputs): ExchangeOutcome {
  if (![salePrice, debtPayoff, replacementPrice, ltvPct].every(Number.isFinite)) return { ok: false, why: 'Enter a number in every field.' };
  if (salePrice <= 0 || replacementPrice <= 0) return { ok: false, why: 'Sale price and replacement price must be greater than zero.' };
  if (debtPayoff < 0 || debtPayoff > salePrice) return { ok: false, why: 'Debt payoff must be between zero and the sale price.' };
  if (ltvPct < 0 || ltvPct >= 100) return { ok: false, why: 'Loan-to-value must be at least 0% and below 100%.' };
  const netEquity = cents(salePrice - debtPayoff);
  const newDebt = cents((replacementPrice * ltvPct) / 100);
  const equityRequired = cents(replacementPrice - newDebt);
  const valueShortfall = Math.max(0, cents(salePrice - replacementPrice));
  const equityUnplaced = Math.max(0, cents(netEquity - equityRequired));
  return {
    ok: true,
    netEquity, newDebt, equityRequired, valueShortfall, equityUnplaced,
    cashToAdd: Math.max(0, cents(equityRequired - netEquity)),
    debtChange: cents(newDebt - debtPayoff),
    priceToPlaceAllEquity: cents(netEquity / (1 - ltvPct / 100)),
    valueTest: valueShortfall === 0,
    equityTest: equityUnplaced === 0,
  };
}

/** Compact dollars: $85.0M, $1.25B, $850K. */
export function money(n: number): string {
  const a = Math.abs(n);
  const sign = n < 0 ? '−' : '';
  if (a >= 1e9) return `${sign}$${(a / 1e9).toFixed(2)}B`;
  if (a >= 1e6) return `${sign}$${(a / 1e6).toFixed(1)}M`;
  if (a >= 1e3) return `${sign}$${(a / 1e3).toFixed(0)}K`;
  return `${sign}$${a.toFixed(0)}`;
}
