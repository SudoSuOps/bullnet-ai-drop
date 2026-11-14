import test from 'node:test';
import assert from 'node:assert/strict';
import { createHmac, createHash } from 'node:crypto';
import { mkdtemp, mkdir, writeFile, symlink } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { assetId, verifyAssetId, generateKey, shortId } from './asset-id.ts';
import { buildManifest, verifyManifest, proveEntry, verifyProof, fingerprint, diffManifests, type Entry } from './manifest.ts';
import { manifestForFolder } from './files.ts';

const KEY = Buffer.alloc(32, 7);
const REC = { kind: 'property', fields: { address: '100 Example Way', city: 'Sampletown', state: 'FL' } };

test('asset ID matches an independent HMAC over the documented canonical form', () => {
  const canonical = '["property",[["address","100 example way"],["city","sampletown"],["state","fl"]]]';
  const expected = '0x' + createHmac('sha256', KEY).update(Buffer.concat([Buffer.from('bullnet.vault.asset-id.v1'), Buffer.from([0]), Buffer.from(canonical)])).digest('hex');
  assert.equal(assetId(KEY, REC), expected);
  assert.match(assetId(KEY, REC), /^0x[0-9a-f]{64}$/);
});

test('field order, spacing and letter case do not change the ID', () => {
  const messy = { kind: ' Property ', fields: { STATE: 'fl', City: '  SAMPLETOWN ', address: '100   Example\tWay', note: '   ' } };
  assert.equal(assetId(KEY, messy), assetId(KEY, REC));
});

test('a different key, kind or fact gives a different ID', () => {
  const base = assetId(KEY, REC);
  assert.notEqual(assetId(Buffer.alloc(32, 8), REC), base);
  assert.notEqual(assetId(KEY, { ...REC, kind: 'company' }), base);
  assert.notEqual(assetId(KEY, { ...REC, fields: { ...REC.fields, address: '101 Example Way' } }), base);
});

test('without the key a guess cannot be confirmed: a plain hash of the record is not the ID', () => {
  const canonical = '["property",[["address","100 example way"],["city","sampletown"],["state","fl"]]]';
  assert.notEqual(assetId(KEY, REC), '0x' + createHash('sha256').update(canonical).digest('hex'));
});

test('verify accepts the right record and rejects everything else', () => {
  const id = assetId(KEY, REC);
  assert.equal(verifyAssetId(KEY, REC, id), true);
  assert.equal(verifyAssetId(Buffer.alloc(32, 8), REC, id), false);
  assert.equal(verifyAssetId(KEY, { ...REC, fields: { ...REC.fields, state: 'GA' } }, id), false);
  assert.equal(verifyAssetId(KEY, REC, 'not-an-id'), false);
  assert.equal(verifyAssetId(KEY, REC, id.toUpperCase()), false);
});

test('bad keys and empty records are refused', () => {
  assert.throws(() => assetId(Buffer.alloc(16), REC), /32 bytes/);
  assert.throws(() => assetId(KEY, { kind: '', fields: REC.fields }), /kind/);
  assert.throws(() => assetId(KEY, { kind: 'property', fields: { a: ' ' } }), /at least one/);
  assert.throws(() => assetId(KEY, { kind: 'property', fields: { City: 'a', city: 'b' } }), /more than once/);
  assert.equal(generateKey().length, 32);
  assert.notDeepEqual(generateKey(), generateKey());
  assert.equal(shortId(assetId(KEY, REC)).length, 15);
});

const E = (path: string, body: string): Entry => ({ path, sha256: fingerprint(body), bytes: Buffer.byteLength(body) });
const DOCS = [E('financials/t12.csv', 'income,expense'), E('leases/unit-1.pdf', 'lease one'), E('rent-roll.csv', 'unit,rent'), E('survey.pdf', 'survey'), E('title/commitment.pdf', 'title')];

test('fingerprint is SHA-256 (known answer)', () => {
  assert.equal(fingerprint('abc'), 'ba7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad');
});

test('manifest root does not depend on input order and matches a hand-built tree', () => {
  const m = buildManifest(DOCS);
  assert.equal(buildManifest([...DOCS].reverse()).root, m.root);
  const leaf = (e: Entry) => createHash('sha256').update(Buffer.concat([Buffer.from([0]), Buffer.from(e.path), Buffer.from([0]), Buffer.from(e.sha256), Buffer.from([0]), Buffer.from(String(e.bytes))])).digest();
  const node = (l: Buffer, r: Buffer) => createHash('sha256').update(Buffer.concat([Buffer.from([1]), l, r])).digest();
  const [a, b, c, d, e] = m.entries.map(leaf);
  assert.equal(m.root, '0x' + node(node(node(a, b), node(c, d)), e).toString('hex'));
  assert.equal(verifyManifest(m), true);
});

test('any change to any document changes the root', () => {
  const m = buildManifest(DOCS);
  const edited = buildManifest(DOCS.map((d) => (d.path === 'rent-roll.csv' ? E(d.path, 'unit,rent,edited') : d)));
  assert.notEqual(edited.root, m.root);
  assert.notEqual(buildManifest(DOCS.slice(1)).root, m.root);
  assert.notEqual(buildManifest([...DOCS, E('new.pdf', 'x')]).root, m.root);
  assert.deepEqual(diffManifests(m, edited), { added: [], removed: [], changed: ['rent-roll.csv'] });
  assert.equal(verifyManifest({ ...m, entries: edited.entries }), false);
});

test('every document can be proven on its own, for 1 to 9 documents', () => {
  for (let n = 1; n <= 9; n++) {
    const m = buildManifest(Array.from({ length: n }, (_, i) => E(`doc-${i}.pdf`, `body ${i}`)));
    for (const e of m.entries) {
      const p = proveEntry(m, e.path);
      assert.equal(verifyProof(m.root, p), true, `n=${n} ${e.path}`);
      assert.equal(verifyProof(m.root, { ...p, entry: { ...e, sha256: fingerprint('forged') } }), false);
      assert.equal(verifyProof(m.root, { ...p, entry: { ...e, bytes: e.bytes + 1 } }), false);
    }
  }
  const m = buildManifest(DOCS);
  assert.equal(verifyProof(buildManifest(DOCS.slice(1)).root, proveEntry(m, 'survey.pdf')), false);
  assert.throws(() => proveEntry(m, 'missing.pdf'), /not in the manifest/);
});

test('bad manifests are refused', () => {
  assert.throws(() => buildManifest([]), /at least one/);
  assert.throws(() => buildManifest([E('a.pdf', '1'), E('a.pdf', '2')]), /twice/);
  for (const p of ['/abs.pdf', '../up.pdf', 'a//b.pdf', 'a\\b.pdf', './a.pdf', '']) assert.throws(() => buildManifest([E(p, 'x')]), /Bad path/, p);
  assert.throws(() => buildManifest([{ path: 'a.pdf', sha256: 'ABC', bytes: 1 }]), /fingerprint/);
  assert.throws(() => buildManifest([{ path: 'a.pdf', sha256: fingerprint('x'), bytes: -1 }]), /size/);
});

test('a folder on disk fingerprints to the same manifest as its contents, and links are refused', async () => {
  const dir = await mkdtemp(join(tmpdir(), 'vault-'));
  await mkdir(join(dir, 'leases'));
  await writeFile(join(dir, 'rent-roll.csv'), 'unit,rent');
  await writeFile(join(dir, 'leases', 'unit-1.pdf'), 'lease one');
  const m = await manifestForFolder(dir);
  assert.deepEqual(m, buildManifest([E('rent-roll.csv', 'unit,rent'), E('leases/unit-1.pdf', 'lease one')]));
  await writeFile(join(dir, 'rent-roll.csv'), 'unit,rent,edited');
  assert.notEqual((await manifestForFolder(dir)).root, m.root);
  await symlink('/etc/hostname', join(dir, 'link'));
  await assert.rejects(manifestForFolder(dir), /Refusing to follow a link/);
});
