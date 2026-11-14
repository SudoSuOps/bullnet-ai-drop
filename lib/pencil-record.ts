/**
 * Analytical records for "Does It Pencil?": one per input and per calculated output, so every figure on the
 * page carries where it came from and how far it can be trusted.
 *
 * Rules enforced here and covered by tests:
 *  - An input is never promoted. A stated or assumed input is INCONCLUSIVE until a source document supports it.
 *  - A calculated output can be MATHEMATICALLY VERIFIED: the arithmetic was recomputed a second way and agreed.
 *    That says the sum is right. It does not say the inputs are.
 *  - An output built on any unverified input carries that as an exception.
 */
import { underwrite, type MultifamilyInputs, type MultifamilyResult } from './multifamily.ts';

export type Designation = 'sourced' | 'illustrative assumption' | 'calculated';
export type Verification = 'MATHEMATICALLY VERIFIED' | 'EVIDENCE SUPPORTED' | 'INCONCLUSIVE' | 'FAILED' | 'REQUIRES HUMAN REVIEW';
export type Units = 'units' | 'USD per month' | 'USD per year' | 'USD' | 'percent';

export interface AnalyticalRecord {
  name: string;
  value: number;
  units: Units;
  designation: Designation;
  /** For a sourced input: the document and location. Empty when there is none. */
  source: string;
  /** For a calculated output: the formula in words. Empty for an input. */
  formula: string;
  verification: Verification;
  /** What is missing or limits the figure, in plain words. */
  exceptions: string[];
  /** What the figure may be used for. */
  result: string;
  review: 'Not reviewed' | 'Reviewed' | 'Approved' | 'Rejected';
}

const input = (name: string, value: number, units: Units, missing: string): AnalyticalRecord => ({
  name, value, units,
  designation: 'illustrative assumption',
  source: '',
  formula: '',
  verification: 'INCONCLUSIVE',
  exceptions: [missing],
  result: 'Included for scenario analysis only',
  review: 'Not reviewed',
});

const output = (name: string, value: number, units: Units, formula: string, agrees: boolean, result: string): AnalyticalRecord => ({
  name, value, units,
  designation: 'calculated',
  source: '',
  formula,
  verification: agrees ? 'MATHEMATICALLY VERIFIED' : 'FAILED',
  exceptions: agrees ? ['Built on unverified inputs'] : ['Recomputation did not agree', 'Built on unverified inputs'],
  result,
  review: 'Not reviewed',
});

/** Second, direct calculation of implied value, used to check the stepwise one. */
const directValue = (i: MultifamilyInputs, occPct: number): number =>
  (i.units * i.avgRent * 12 * (occPct / 100) * (1 - i.expensePct / 100)) / (i.capPct / 100);

export function buildRecords(i: MultifamilyInputs, r: MultifamilyResult): AnalyticalRecord[] {
  const okAsIs = Math.abs(directValue(i, i.occNowPct) - r.asIs.impliedValue) <= 0.01;
  const okStab = Math.abs(directValue(i, i.occStabPct) - r.stabilized.impliedValue) <= 0.01;
  const notValue = 'For scenario analysis only. Not an appraised value, a price or an offer';
  return [
    input('Units', i.units, 'units', 'No rent roll or unit mix supplied'),
    input('Average monthly rent', i.avgRent, 'USD per month', 'Not supported by a source rent roll'),
    input('Occupancy today', i.occNowPct, 'percent', 'Not supported by a source rent roll'),
    input('Stabilized occupancy', i.occStabPct, 'percent', 'An assumption about the future. No lease-up plan or market study supplied'),
    input('Operating expense ratio', i.expensePct, 'percent', 'Not supported by trailing operating statements'),
    input('Cap rate', i.capPct, 'percent', 'Stated in the scenario. No comparable sales supplied'),
    output('Modeled NOI, as-is', r.asIs.noi, 'USD per year', 'Units x average rent x 12 x occupancy today, less operating expenses', okAsIs, 'For scenario analysis only. Not an actual NOI'),
    output('Implied value, as-is', r.asIs.impliedValue, 'USD', 'Modeled NOI, as-is, divided by the cap rate', okAsIs, notValue),
    output('Modeled NOI, stabilized', r.stabilized.noi, 'USD per year', 'Units x average rent x 12 x stabilized occupancy, less operating expenses', okStab, 'For scenario analysis only. Not a forecast'),
    output('Implied value, stabilized', r.stabilized.impliedValue, 'USD', 'Modeled NOI, stabilized, divided by the cap rate', okStab, notValue),
    output('Difference in implied value', r.valueDifference, 'USD', 'Implied value, stabilized, minus implied value, as-is', okAsIs && okStab, 'A gap between two modeled figures. Not profit, an equity gain or a return'),
  ];
}

/** Convenience for callers that start from inputs. Returns an empty list when the inputs cannot be computed. */
export function recordsFor(i: MultifamilyInputs): AnalyticalRecord[] {
  const r = underwrite(i);
  return r.ok ? buildRecords(i, r) : [];
}
