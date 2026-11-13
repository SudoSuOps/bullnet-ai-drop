import test from 'node:test';
import assert from 'node:assert/strict';
import { checkExchange, money } from './exchange.ts';

const base = { salePrice: 85e6, debtPayoff: 45e6 };

test('same price at 90% leverage leaves most of the equity unplaced', () => {
  const r = checkExchange({ ...base, replacementPrice: 85e6, ltvPct: 90 });
  assert.ok(r.ok);
  assert.equal(r.netEquity, 40e6);
  assert.equal(r.newDebt, 76.5e6);
  assert.equal(r.equityRequired, 8.5e6);
  assert.equal(r.equityUnplaced, 31.5e6);
  assert.equal(r.priceToPlaceAllEquity, 400e6);
  assert.equal(r.valueTest, true);
  assert.equal(r.equityTest, false);
});

test('replacing only the debt fails the value test', () => {
  const r = checkExchange({ ...base, replacementPrice: 45e6, ltvPct: 100 - 1e-9 });
  assert.ok(r.ok);
  assert.equal(r.valueShortfall, 40e6);
  assert.equal(r.valueTest, false);
});

test('equal price and equal debt meets both tests', () => {
  const r = checkExchange({ ...base, replacementPrice: 85e6, ltvPct: (45 / 85) * 100 });
  assert.ok(r.ok);
  assert.equal(r.valueTest && r.equityTest, true);
  assert.equal(r.cashToAdd, 0);
});

test('rejects impossible inputs', () => {
  assert.equal(checkExchange({ ...base, replacementPrice: 0, ltvPct: 50 }).ok, false);
  assert.equal(checkExchange({ ...base, replacementPrice: 85e6, ltvPct: 100 }).ok, false);
  assert.equal(checkExchange({ salePrice: 85e6, debtPayoff: 90e6, replacementPrice: 85e6, ltvPct: 50 }).ok, false);
});

test('formats money compactly', () => {
  assert.equal(money(85e6), '$85.0M');
  assert.equal(money(4e8), '$400.0M');
  assert.equal(money(1.25e9), '$1.25B');
});
