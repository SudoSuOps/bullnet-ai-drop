import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, readFile, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { generateLogKeys, nextEntry, verifyLog, checkpoint, checkAgainst, entriesFor, GENESIS, type LogEntry, type LogEvent } from './log.ts';
import { appendEvent, readLog } from './log-file.ts';

const K = generateLogKeys();
const A = '0x' + 'a'.repeat(64);
const B = '0x' + 'b'.repeat(64);
const T0 = Date.UTC(2026, 10, 1, 12, 0, 0);
const EVENTS: LogEvent[] = [
  { type: 'MANIFEST_SEALED', assetId: A, actor: 'vault', data: { documents: 5 } },
  { type: 'ACCESS_REQUESTED', assetId: A, actor: 'party-0017' },
  { type: 'NDA_VERIFIED', assetId: A, actor: 'ndas', data: { tier: 'full', onFile: true } },
  { type: 'ACCESS_GRANTED', assetId: A, actor: 'ndas', data: { party: 'party-0017' } },
  { type: 'ACCESS_REFUSED', assetId: B, actor: 'ndas', data: { party: 'party-0042', reason: 'NDA MISSING' } },
  { type: 'DOCUMENT_VIEWED', assetId: A, actor: 'party-0017', data: { path: 'rent-roll.csv' } },
];
const build = (events = EVENTS, key = K.privateKey): LogEntry[] => events.reduce<LogEntry[]>((log, e, i) => [...log, nextEntry(log, e, key, new Date(T0 + i * 86_400_000))], []);
const copy = (log: LogEntry[]): LogEntry[] => JSON.parse(JSON.stringify(log));

test('a clean log verifies, is numbered from 1 and chains from the genesis hash', () => {
  const log = build();
  assert.deepEqual(log.map((e) => e.seq), [1, 2, 3, 4, 5, 6]);
  assert.equal(log[0].prev, GENESIS);
  for (let i = 1; i < log.length; i++) assert.equal(log[i].prev, log[i - 1].hash);
  assert.deepEqual(verifyLog(log, K.publicKey), { ok: true, entries: 6, head: log[5].hash });
  assert.deepEqual(verifyLog([], K.publicKey), { ok: true, entries: 0, head: GENESIS });
});

test('editing any field of any entry is caught at that entry', () => {
  const edits: [string, (e: LogEntry) => void][] = [
    ['actor', (e) => { e.actor = 'someone-else'; }], ['type', (e) => { e.type = e.type === 'ACCESS_GRANTED' ? 'ACCESS_REFUSED' : 'ACCESS_GRANTED'; }], ['time', (e) => { e.time = '2026-11-01T00:00:00.000Z'; }],
    ['assetId', (e) => { e.assetId = B === e.assetId ? A : B; }], ['data', (e) => { e.data = { ...e.data, extra: 1 }; }],
  ];
  for (let i = 0; i < EVENTS.length; i++) for (const [name, edit] of edits) {
    const log = copy(build()); edit(log[i]);
    const v = verifyLog(log, K.publicKey);
    assert.equal(v.ok, false, `${name} at ${i + 1}`);
    assert.equal(!v.ok && v.at, i + 1, `${name} at ${i + 1}`);
  }
});

test('deleting, inserting, reordering or duplicating entries is caught', () => {
  const log = build();
  const cases: [string, LogEntry[], number][] = [
    ['delete middle', [...log.slice(0, 2), ...log.slice(3)], 3],
    ['delete first', log.slice(1), 1],
    ['swap', [log[0], log[2], log[1], ...log.slice(3)], 2],
    ['duplicate', [...log.slice(0, 3), log[2], ...log.slice(3)], 4],
  ];
  for (const [name, bad, at] of cases) { const v = verifyLog(bad, K.publicKey); assert.equal(v.ok, false, name); assert.equal(!v.ok && v.at, at, name); }
});

test('an entry rewritten and re-hashed without the private key fails on the signature', () => {
  const forged = build(EVENTS.map((e, i) => (i === 3 ? { ...e, data: { party: 'party-9999' } } : e)), generateLogKeys().privateKey);
  const log = [...build().slice(0, 3), forged[3]];
  const v = verifyLog(log, K.publicKey);
  assert.equal(v.ok, false);
  assert.match(!v.ok ? v.why : '', /link|signature/);
  const whole = verifyLog(forged, K.publicKey);
  assert.deepEqual(whole, { ok: false, at: 1, why: 'The signature does not match the log key.' });
});

test('cutting entries off the end still verifies, and a checkpoint catches it', () => {
  const log = build();
  const cp = checkpoint(log);
  assert.deepEqual(cp, { version: 'bullnet.vault.log.v1', seq: 6, head: log[5].hash });
  const cut = log.slice(0, 4);
  assert.equal(verifyLog(cut, K.publicKey).ok, true);
  assert.equal(checkAgainst(cut, cp), false);
  assert.equal(checkAgainst(log, cp), true);
  const longer = [...log, nextEntry(log, EVENTS[1], K.privateKey, new Date(T0 + 7 * 86_400_000))];
  assert.equal(checkAgainst(longer, cp), true);
  assert.equal(checkAgainst([], checkpoint([])), true);
});

test('the same data in a different key order gives the same entry hash', () => {
  const t = new Date(T0);
  const a = nextEntry([], { type: 'X_EVENT', assetId: A, actor: 'v', data: { b: 2, a: 'one' } }, K.privateKey, t);
  const b = nextEntry([], { type: 'X_EVENT', assetId: A, actor: 'v', data: { a: 'one', b: 2 } }, K.privateKey, t);
  assert.equal(a.hash, b.hash);
});

test('bad events and bad keys are refused', () => {
  const ok: LogEvent = { type: 'ACCESS_GRANTED', assetId: A, actor: 'ndas' };
  assert.throws(() => nextEntry([], { ...ok, type: 'access granted' }, K.privateKey), /Event type/);
  assert.throws(() => nextEntry([], { ...ok, assetId: '0x123' }, K.privateKey), /Asset ID/);
  assert.throws(() => nextEntry([], { ...ok, actor: '  ' }, K.privateKey), /actor/);
  assert.throws(() => nextEntry([], { ...ok, data: { n: NaN } }, K.privateKey), /finite/);
  assert.throws(() => nextEntry([], { ...ok, data: { 'Bad Name': 1 } }, K.privateKey), /field name/);
  assert.throws(() => nextEntry([], { ...ok, data: { o: {} as unknown as string } }, K.privateKey), /must be text/);
  assert.equal(verifyLog(build(), 'not a key').ok, false);
});

test('entries can be pulled for one asset and one week', () => {
  const log = build();
  assert.equal(entriesFor(log, A).length, 5);
  assert.equal(entriesFor(log, B).length, 1);
  const week = entriesFor(log, A, new Date(T0 + 86_400_000), new Date(T0 + 4 * 86_400_000));
  assert.deepEqual(week.map((e) => e.type), ['ACCESS_REQUESTED', 'NDA_VERIFIED', 'ACCESS_GRANTED']);
});

test('the log file only grows, survives a reload, and a hand edit is caught', async () => {
  const file = join(await mkdtemp(join(tmpdir(), 'vlog-')), 'log.jsonl');
  assert.deepEqual(await readLog(file), []);
  for (const [i, e] of EVENTS.entries()) await appendEvent(file, e, K.privateKey, new Date(T0 + i * 1000));
  const first = await readFile(file, 'utf8');
  await appendEvent(file, EVENTS[1], K.privateKey, new Date(T0 + 99_000));
  const second = await readFile(file, 'utf8');
  assert.ok(second.startsWith(first));
  const log = await readLog(file);
  assert.deepEqual(verifyLog(log, K.publicKey), { ok: true, entries: 7, head: log[6].hash });
  await writeFile(file, second.replace('party-0042', 'party-0043'));
  const v = verifyLog(await readLog(file), K.publicKey);
  assert.deepEqual(v, { ok: false, at: 5, why: 'The entry has been changed since it was written.' });
});
