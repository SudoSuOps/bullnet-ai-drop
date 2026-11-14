import test from 'node:test';
import assert from 'node:assert/strict';
import { DROP_002, underwrite } from './multifamily.ts';
import { buildRecords, recordsFor } from './pencil-record.ts';

test('no input is ever treated as verified', () => {
  const inputs = recordsFor(DROP_002).filter((r) => r.designation !== 'calculated');
  assert.equal(inputs.length, 6);
  for (const r of inputs) {
    assert.equal(r.designation, 'illustrative assumption');
    assert.equal(r.verification, 'INCONCLUSIVE');
    assert.equal(r.source, '');
    assert.ok(r.exceptions.length > 0);
    assert.equal(r.review, 'Not reviewed');
  }
});

test('calculated outputs are arithmetic-verified and still flag their unverified inputs', () => {
  const outputs = recordsFor(DROP_002).filter((r) => r.designation === 'calculated');
  assert.equal(outputs.length, 5);
  for (const r of outputs) {
    assert.equal(r.verification, 'MATHEMATICALLY VERIFIED');
    assert.ok(r.exceptions.includes('Built on unverified inputs'));
    assert.ok(r.formula.length > 0);
    assert.match(r.result, /scenario analysis only|modeled figures/);
  }
});

test('a result that does not agree with the recomputation is marked FAILED', () => {
  const r = underwrite(DROP_002);
  assert.ok(r.ok);
  const tampered = { ...r, asIs: { ...r.asIs, impliedValue: r.asIs.impliedValue + 5 } };
  const rec = buildRecords(DROP_002, tampered).find((x) => x.name === 'Implied value, as-is');
  assert.equal(rec?.verification, 'FAILED');
  assert.ok(rec?.exceptions.includes('Recomputation did not agree'));
});

test('records carry the published Drop 002 values', () => {
  const by = Object.fromEntries(recordsFor(DROP_002).map((r) => [r.name, r.value]));
  assert.equal(by['Modeled NOI, as-is'], 4_232_250);
  assert.equal(by['Modeled NOI, stabilized'], 5_191_560);
  assert.equal(by['Difference in implied value'], 13_704_428.57);
});

test('inputs that cannot be computed produce no records', () => {
  assert.deepEqual(recordsFor({ ...DROP_002, capPct: 0 }), []);
});
