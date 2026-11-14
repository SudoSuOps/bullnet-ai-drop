/**
 * Simplified multifamily direct-capitalization arithmetic for the "Does It Pencil?" series.
 * Pure functions only: no model, no network, no state. Same inputs always give the same result.
 *
 * One set of six formulas is run twice, at today's occupancy ("as-is") and at a stabilized occupancy:
 *   potential gross rent   = units x average monthly rent x 12
 *   effective gross income = potential gross rent x occupancy
 *   operating expenses     = effective gross income x expense ratio
 *   modeled NOI            = effective gross income - operating expenses
 *   implied value          = modeled NOI / cap rate
 *   implied value per unit = implied value / units
 *
 * Simplifications, all stated on the page: physical occupancy stands in for economic occupancy; there is no
 * other income; expenses move in proportion to income; average rent, expense ratio and cap rate are held fixed
 * across both scenarios. The implied value is a modeled figure. It is not an appraisal, a price or an offer,
 * and the difference between the two scenarios is not profit, an equity gain or a return.
 */
export interface MultifamilyInputs {
  units: number;
  /** Average monthly rent per unit, USD. */
  avgRent: number;
  /** Physical occupancy today, percent. */
  occNowPct: number;
  /** Assumed stabilized physical occupancy, percent. */
  occStabPct: number;
  /** Operating expenses as a percent of effective gross income. */
  expensePct: number;
  /** Capitalization rate, percent. */
  capPct: number;
}

export interface Scenario {
  occupancyPct: number;
  potentialGrossRent: number;
  effectiveGrossIncome: number;
  operatingExpenses: number;
  noi: number;
  impliedValue: number;
  impliedValuePerUnit: number;
}

export interface MultifamilyResult {
  ok: true;
  asIs: Scenario;
  stabilized: Scenario;
  /** Stabilized implied value minus as-is implied value. A difference between two modeled figures, nothing more. */
  valueDifference: number;
  noiDifference: number;
}

export type MultifamilyOutcome = MultifamilyResult | { ok: false; why: string };

/** The teaching assumptions for Drop 002. Every number is fictional. */
export const DROP_002: MultifamilyInputs = { units: 570, avgRent: 1500, occNowPct: 75, occStabPct: 92, expensePct: 45, capPct: 7 };

const cents = (n: number): number => Math.round(n * 100) / 100;

function scenario(units: number, avgRent: number, occupancyPct: number, expensePct: number, capPct: number): Scenario {
  const potentialGrossRent = cents(units * avgRent * 12);
  const effectiveGrossIncome = cents((potentialGrossRent * occupancyPct) / 100);
  const operatingExpenses = cents((effectiveGrossIncome * expensePct) / 100);
  const noi = cents(effectiveGrossIncome - operatingExpenses);
  const impliedValue = cents((noi * 100) / capPct);
  return { occupancyPct, potentialGrossRent, effectiveGrossIncome, operatingExpenses, noi, impliedValue, impliedValuePerUnit: cents(impliedValue / units) };
}

export function underwrite({ units, avgRent, occNowPct, occStabPct, expensePct, capPct }: MultifamilyInputs): MultifamilyOutcome {
  if (![units, avgRent, occNowPct, occStabPct, expensePct, capPct].every(Number.isFinite)) return { ok: false, why: 'Enter a number in every field.' };
  if (!Number.isInteger(units) || units <= 0) return { ok: false, why: 'Units must be a whole number greater than zero.' };
  if (avgRent <= 0) return { ok: false, why: 'Average monthly rent must be greater than zero.' };
  if (occNowPct <= 0 || occNowPct > 100 || occStabPct <= 0 || occStabPct > 100) return { ok: false, why: 'Occupancy must be above 0% and no more than 100%.' };
  if (expensePct < 0 || expensePct >= 100) return { ok: false, why: 'Operating expense ratio must be at least 0% and below 100%.' };
  if (capPct <= 0 || capPct > 25) return { ok: false, why: 'Cap rate must be above 0% and no more than 25%.' };
  const asIs = scenario(units, avgRent, occNowPct, expensePct, capPct);
  const stabilized = scenario(units, avgRent, occStabPct, expensePct, capPct);
  return { ok: true, asIs, stabilized, valueDifference: cents(stabilized.impliedValue - asIs.impliedValue), noiDifference: cents(stabilized.noi - asIs.noi) };
}

/** Whole dollars with separators: $60,460,714. */
export const dollars = (n: number): string => `${n < 0 ? '−' : ''}$${Math.round(Math.abs(n)).toLocaleString('en-US')}`;

/** Millions to two places, for approximate statements: 13.70. */
export const millions = (n: number): string => (Math.abs(n) / 1e6).toFixed(2);
