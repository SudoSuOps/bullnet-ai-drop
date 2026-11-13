/**
 * Deterministic direct-capitalization test (DEF-CAP-001).
 * Pure functions only: no model, no network, no state. Same inputs always give the same result.
 * This proves arithmetic. It does not prove that the inputs are appropriate for an asset.
 */
export type Status = 'MATHEMATICALLY VERIFIED' | 'FAILED' | 'INCONCLUSIVE' | 'REQUIRES HUMAN REVIEW';

export interface Inconclusive { status: 'INCONCLUSIVE'; why: string }
export interface Computed {
  status: Exclude<Status, 'INCONCLUSIVE'>;
  noi: number;
  /** Cap rate in percent, read to 0.01%. */
  capPct: number;
  agent: number;
  /** Independently recomputed value, rounded to cents. */
  value: number;
  diff: number;
  pct: number;
  /** Cap rate implied by the submitted value. */
  implied: number;
  match: boolean;
  /** True when the cap rate is outside 1% to 25% and the unit must be confirmed by a person. */
  scale: boolean;
}
export type Result = Inconclusive | Computed;

export const TOLERANCE_USD = 1;
export const EXAMPLE = { noi: '1,800,000', cap: '6.00', agent: '33,000,000' } as const;
export const TEST_DEFINITION = `TEST DEF-CAP-001  direct capitalization
value     = NOI / (cap_rate / 100)
tolerance = $1.00
cap rate read to 0.01%`;

/** Status is always shown as text. The class only adds colour on top of the words. */
export const STATUS_CLASS: Record<Status, string> = {
  'MATHEMATICALLY VERIFIED': 'v-pass',
  FAILED: 'v-fail',
  'REQUIRES HUMAN REVIEW': 'v-rev',
  INCONCLUSIVE: 'v-inc',
};

export const usd = (n: number): string =>
  n.toLocaleString('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 2, maximumFractionDigits: 2 });

export function parseAmount(s: string): number {
  const t = s.replace(/[$,%\s]/g, '');
  return t === '' ? NaN : Number(t);
}

const cents = (n: number): number => Math.round(n * 100) / 100;
/** Value from NOI and a cap rate in basis points, rounded to cents. */
const capValue = (noi: number, bps: number): number => cents((noi * 1e4) / bps);

export function validate(noi: number, capPct: number, agent: number): Result {
  if (![noi, capPct, agent].every(Number.isFinite)) {
    return { status: 'INCONCLUSIVE', why: 'One or more inputs is missing or is not a number.' };
  }
  if (noi <= 0 || capPct <= 0 || agent <= 0) {
    return { status: 'INCONCLUSIVE', why: 'NOI, cap rate and submitted value must each be greater than zero for this test.' };
  }
  const bps = Math.round(capPct * 100);
  if (bps <= 0) return { status: 'INCONCLUSIVE', why: 'Cap rate is below the 0.01% this test can read.' };
  const value = capValue(noi, bps);
  const diff = cents(agent - value);
  const match = Math.abs(diff) <= TOLERANCE_USD;
  const scale = capPct < 1 || capPct > 25;
  return {
    status: scale ? 'REQUIRES HUMAN REVIEW' : match ? 'MATHEMATICALLY VERIFIED' : 'FAILED',
    noi, capPct: bps / 100, agent, value, diff, pct: (diff / value) * 100, implied: (noi / agent) * 100, match, scale,
  };
}

export interface SensitivityRow { label: string; capPct: number; value: number }

/** Recomputed value at 50 basis points either side of the base cap rate. */
export function sensitivity(r: Result): SensitivityRow[] {
  if (r.status === 'INCONCLUSIVE') return [];
  const base = Math.round(r.capPct * 100);
  return ([[-50, 'Cap rate 50 bps lower'], [0, 'Base case'], [50, 'Cap rate 50 bps higher']] as const)
    .map(([d, label]) => ({ label, bps: base + d }))
    .filter((x) => x.bps > 0)
    .map((x) => ({ label: x.label, capPct: x.bps / 100, value: capValue(r.noi, x.bps) }));
}

const signed = (n: number): string => (n > 0 ? '+' : n < 0 ? '−' : '') + usd(Math.abs(n));

/** Plain-language verdict, reproducible log and Flight Sheet record for a result. */
export function describe(r: Result): { message: string; log: string; record: string } {
  if (r.status === 'INCONCLUSIVE') {
    return {
      message: r.why,
      log: '[1] inputs present and positive ... FAIL\n    Test halted. Nothing was recomputed.',
      record: 'No result recorded. The test could not run on the inputs supplied.',
    };
  }
  const cap = `${r.capPct.toFixed(2)}%`;
  const message =
    r.status === 'MATHEMATICALLY VERIFIED'
      ? `The submitted value matches the independent calculation within ${usd(TOLERANCE_USD)}.`
      : r.status === 'FAILED'
        ? `The submitted value is ${signed(r.diff)} against the independent calculation. The answer fails.`
        : `A cap rate of ${r.capPct}% is outside the plausible range of 1% to 25%. It may have been entered as a decimal. A person must confirm the unit before any result stands.`;
  const log = [
    '[1] inputs present and positive ... PASS',
    `[2] units and scale ............... ${r.scale ? 'REVIEW  cap rate outside 1%–25%' : 'PASS'}`,
    `[3] recompute NOI / cap rate ...... ${usd(r.noi)} / ${cap} = ${usd(r.value)}`,
    `[4] compare with submitted ........ ${r.match ? 'PASS' : 'FAIL'}  ${usd(r.agent)} vs ${usd(r.value)}`,
    `    difference .................... ${signed(r.diff)} (${r.pct >= 0 ? '+' : '−'}${Math.abs(r.pct).toFixed(2)}%)`,
    `[5] cap rate implied by submitted . ${r.implied.toFixed(4)}%`,
  ].join('\n');
  const record =
    r.status === 'FAILED'
      ? `Exception recorded. The agent submitted ${usd(r.agent)}. Test DEF-CAP-001 recomputed ${usd(r.value)} from NOI of ${usd(r.noi)} at a ${cap} cap rate. The submitted figure implies a ${r.implied.toFixed(4)}% cap rate, which no approved assumption supports. Corrected value: ${usd(r.value)}. Assumptions: direct capitalization, inputs as stated, no adjustments.`
      : r.status === 'MATHEMATICALLY VERIFIED'
        ? `Test DEF-CAP-001 passed. Value of ${usd(r.value)} recorded from NOI of ${usd(r.noi)} at a ${cap} cap rate. Whether those inputs are appropriate remains a reviewer decision.`
        : `Held for human review. The cap rate unit must be confirmed before a result is recorded. Arithmetic on the inputs as entered gives ${usd(r.value)}.`;
  return { message, log, record };
}
