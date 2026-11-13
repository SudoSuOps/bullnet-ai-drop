import test from 'node:test';
import assert from 'node:assert/strict';
import { parseAmount, sensitivity, validate } from './validate.ts';

test('fails the $33M submission against a $30M recomputation', () => {
  const r = validate(1_800_000, 6, 33_000_000);
  assert.equal(r.status, 'FAILED');
  assert.equal(r.value, 30_000_000);
  assert.equal(r.diff, 3_000_000);
  assert.equal(r.pct, 10);
});

test('verifies a matching submission', () => {
  assert.equal(validate(1_800_000, 6, 30_000_000).status, 'MATHEMATICALLY VERIFIED');
  assert.equal(validate(1_234_567, 5.75, 21_470_730.43).status, 'MATHEMATICALLY VERIFIED');
});

test('holds a decimal-entered cap rate for human review', () => {
  assert.equal(validate(1_800_000, 0.06, 30_000_000).status, 'REQUIRES HUMAN REVIEW');
});

test('is inconclusive on missing or non-positive inputs', () => {
  assert.equal(validate(NaN, 6, 1).status, 'INCONCLUSIVE');
  assert.equal(validate(1_800_000, 0, 1).status, 'INCONCLUSIVE');
  assert.equal(validate(-5, 6, 1).status, 'INCONCLUSIVE');
});

test('parses formatted amounts', () => {
  assert.equal(parseAmount('$1,800,000'), 1_800_000);
  assert.equal(parseAmount('6.00%'), 6);
  assert.ok(Number.isNaN(parseAmount('')));
});

test('sensitivity brackets the base case by 50 bps', () => {
  const rows = sensitivity(validate(1_800_000, 6, 30_000_000));
  assert.deepEqual(rows.map((x) => x.capPct), [5.5, 6, 6.5]);
  assert.equal(rows[1].value, 30_000_000);
  assert.equal(rows[0].value, 32_727_272.73);
});
