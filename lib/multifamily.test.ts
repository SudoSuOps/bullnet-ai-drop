import test from 'node:test';
import assert from 'node:assert/strict';
import { underwrite, dollars, millions, DROP_002 } from './multifamily.ts';

test('Drop 002 as-is scenario matches the published figures', () => {
  const r = underwrite(DROP_002);
  assert.ok(r.ok);
  assert.equal(r.asIs.potentialGrossRent, 10_260_000);
  assert.equal(r.asIs.effectiveGrossIncome, 7_695_000);
  assert.equal(r.asIs.operatingExpenses, 3_462_750);
  assert.equal(r.asIs.noi, 4_232_250);
  assert.equal(r.asIs.impliedValue, 60_460_714.29);
  assert.equal(dollars(r.asIs.noi), '$4,232,250');
  assert.equal(dollars(r.asIs.impliedValue), '$60,460,714');
});

test('Drop 002 stabilized scenario matches the published figures', () => {
  const r = underwrite(DROP_002);
  assert.ok(r.ok);
  assert.equal(r.stabilized.effectiveGrossIncome, 9_439_200);
  assert.equal(r.stabilized.noi, 5_191_560);
  assert.equal(r.stabilized.impliedValue, 74_165_142.86);
  assert.equal(dollars(r.stabilized.noi), '$5,191,560');
  assert.equal(dollars(r.stabilized.impliedValue), '$74,165,143');
});

test('the difference is about $13.70 million and equals the two values subtracted', () => {
  const r = underwrite(DROP_002);
  assert.ok(r.ok);
  assert.equal(r.valueDifference, 13_704_428.57);
  assert.equal(millions(r.valueDifference), '13.70');
  assert.equal(r.noiDifference, 959_310);
  assert.equal(dollars(r.valueDifference), '$13,704,429');
});

test('independent recomputation: one direct formula agrees with the stepwise result', () => {
  const { units, avgRent, occNowPct, occStabPct, expensePct, capPct } = DROP_002;
  const r = underwrite(DROP_002);
  assert.ok(r.ok);
  for (const [s, occ] of [[r.asIs, occNowPct], [r.stabilized, occStabPct]] as const) {
    const direct = (units * avgRent * 12 * (occ / 100) * (1 - expensePct / 100)) / (capPct / 100);
    assert.ok(Math.abs(direct - s.impliedValue) <= 0.01, `direct ${direct} vs stepwise ${s.impliedValue}`);
    assert.ok(Math.abs(s.impliedValuePerUnit * units - s.impliedValue) <= units * 0.005 + 0.01);
    assert.ok(Math.abs(s.noi / s.impliedValue - capPct / 100) < 1e-9);
  }
});

test('equal occupancy gives no difference; a lower cap rate gives a higher value', () => {
  const same = underwrite({ ...DROP_002, occStabPct: 75 });
  assert.ok(same.ok);
  assert.equal(same.valueDifference, 0);
  const six = underwrite({ ...DROP_002, capPct: 6 });
  const seven = underwrite(DROP_002);
  assert.ok(six.ok && seven.ok);
  assert.ok(six.asIs.impliedValue > seven.asIs.impliedValue);
  assert.equal(six.asIs.noi, seven.asIs.noi);
});

test('refuses inputs it cannot compute instead of guessing', () => {
  for (const bad of [{ units: 0 }, { units: 570.5 }, { avgRent: 0 }, { occNowPct: 0 }, { occStabPct: 101 }, { expensePct: 100 }, { capPct: 0 }, { capPct: NaN }]) {
    const r = underwrite({ ...DROP_002, ...bad });
    assert.equal(r.ok, false, JSON.stringify(bad));
  }
});
