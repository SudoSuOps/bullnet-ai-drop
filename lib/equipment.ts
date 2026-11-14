/**
 * Equipment acquisition arithmetic for Hive Capital Markets.
 * Level-payment loan, then a coverage check against what the asset earns at a stated utilization.
 * Arithmetic on the user's own numbers. It is not a loan offer, a rate quote or advice.
 */
export interface EquipmentInputs {
  price: number;
  downPct: number;
  /** Annual rate in percent, as quoted to the buyer. */
  aprPct: number;
  termMonths: number;
  /** Monthly revenue if the asset worked at 100% utilization. */
  revenueFull: number;
  /** Monthly operating cost: operator, fuel or power, maintenance, insurance. */
  opCost: number;
  utilPct: number;
}

export type EquipmentStatus = 'PENCILS' | 'THIN' | 'DOES NOT PENCIL';

export interface EquipmentResult {
  ok: true;
  financed: number;
  payment: number;
  totalInterest: number;
  /** Monthly cash after operating cost, before the loan payment. */
  net: number;
  /** Net divided by the loan payment. */
  coverage: number;
  /** Utilization at which net exactly covers the payment. */
  breakEvenUtilPct: number;
  /** Utilization needed to reach the coverage target. */
  targetUtilPct: number;
  status: EquipmentStatus;
}

export type EquipmentOutcome = EquipmentResult | { ok: false; why: string };

/** A common lender convention, used here only as an illustration. Lenders set their own. */
export const COVERAGE_TARGET = 1.25;

const cents = (n: number): number => Math.round(n * 100) / 100;

export function pencilEquipment(i: EquipmentInputs): EquipmentOutcome {
  if (!Object.values(i).every(Number.isFinite)) return { ok: false, why: 'Enter a number in every field.' };
  if (i.price <= 0 || i.revenueFull <= 0) return { ok: false, why: 'Price and full-utilization revenue must be greater than zero.' };
  if (i.downPct < 0 || i.downPct >= 100) return { ok: false, why: 'Down payment must be at least 0% and below 100%.' };
  if (i.aprPct < 0 || i.aprPct > 60) return { ok: false, why: 'Rate must be between 0% and 60%.' };
  if (!Number.isInteger(i.termMonths) || i.termMonths < 1 || i.termMonths > 360) return { ok: false, why: 'Term must be a whole number of months between 1 and 360.' };
  if (i.opCost < 0 || i.utilPct < 0 || i.utilPct > 100) return { ok: false, why: 'Operating cost cannot be negative and utilization must be between 0% and 100%.' };

  const financed = cents(i.price * (1 - i.downPct / 100));
  const r = i.aprPct / 1200;
  const payment = cents(r === 0 ? financed / i.termMonths : (financed * r) / (1 - (1 + r) ** -i.termMonths));
  const net = cents((i.revenueFull * i.utilPct) / 100 - i.opCost);
  const coverage = net / payment;
  return {
    ok: true,
    financed,
    payment,
    totalInterest: cents(payment * i.termMonths - financed),
    net,
    coverage,
    breakEvenUtilPct: ((payment + i.opCost) / i.revenueFull) * 100,
    targetUtilPct: ((COVERAGE_TARGET * payment + i.opCost) / i.revenueFull) * 100,
    status: coverage >= COVERAGE_TARGET ? 'PENCILS' : coverage >= 1 ? 'THIN' : 'DOES NOT PENCIL',
  };
}

export const dollars = (n: number): string =>
  (n < 0 ? '−' : '') + Math.abs(n).toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });
