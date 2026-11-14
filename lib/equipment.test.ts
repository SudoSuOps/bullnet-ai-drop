import test from 'node:test';
import assert from 'node:assert/strict';
import { pencilEquipment } from './equipment.ts';

const base = { price: 350_000, downPct: 10, aprPct: 9, termMonths: 60, revenueFull: 18_000, opCost: 5_500, utilPct: 65 };

test('computes the level payment and fails coverage at 65% utilization', () => {
  const r = pencilEquipment(base);
  assert.ok(r.ok);
  assert.equal(r.financed, 315_000);
  assert.ok(Math.abs(r.payment - 6538.88) < 0.02, String(r.payment));
  assert.equal(r.net, 6200);
  assert.equal(r.status, 'DOES NOT PENCIL');
  assert.ok(r.breakEvenUtilPct > 66.8 && r.breakEvenUtilPct < 67);
});

test('status moves with utilization', () => {
  const thin = pencilEquipment({ ...base, utilPct: 70 });
  const good = pencilEquipment({ ...base, utilPct: 85 });
  assert.ok(thin.ok && good.ok);
  assert.equal(thin.status, 'THIN');
  assert.equal(good.status, 'PENCILS');
});

test('zero rate divides evenly and has no interest', () => {
  const r = pencilEquipment({ ...base, aprPct: 0 });
  assert.ok(r.ok);
  assert.equal(r.payment, 5250);
  assert.equal(r.totalInterest, 0);
});

test('rejects impossible inputs', () => {
  assert.equal(pencilEquipment({ ...base, price: 0 }).ok, false);
  assert.equal(pencilEquipment({ ...base, downPct: 100 }).ok, false);
  assert.equal(pencilEquipment({ ...base, termMonths: 0 }).ok, false);
  assert.equal(pencilEquipment({ ...base, utilPct: 140 }).ok, false);
  assert.equal(pencilEquipment({ ...base, aprPct: NaN }).ok, false);
});
