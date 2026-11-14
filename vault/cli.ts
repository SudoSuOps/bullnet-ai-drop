#!/usr/bin/env node
/**
 * Vault step one, from the command line. Runs on the node. Nothing leaves the machine.
 *
 *   node --experimental-strip-types vault/cli.ts keygen <key-file>
 *   node --experimental-strip-types vault/cli.ts id <key-file> <kind> name=value [name=value ...]
 *   node --experimental-strip-types vault/cli.ts manifest <folder>
 *   node --experimental-strip-types vault/cli.ts verify <manifest.json> <folder>
 */
import { readFile, writeFile } from 'node:fs/promises';
import { assetId, generateKey } from './asset-id.ts';
import { diffManifests, verifyManifest, type Manifest } from './manifest.ts';
import { manifestForFolder } from './files.ts';

const [cmd, ...a] = process.argv.slice(2);
const fail = (m: string): never => { console.error(m); process.exit(1); };

if (cmd === 'keygen' && a[0]) {
  await writeFile(a[0], generateKey().toString('hex') + '\n', { mode: 0o600, flag: 'wx' });
  console.log(`Key written to ${a[0]}. Keep it in the vault. It is not shown here.`);
} else if (cmd === 'id' && a.length >= 3) {
  const key = Buffer.from((await readFile(a[0], 'utf8')).trim(), 'hex');
  const fields = Object.fromEntries(a.slice(2).map((p) => { const i = p.indexOf('='); return i > 0 ? [p.slice(0, i), p.slice(i + 1)] : fail(`Expected name=value, got "${p}".`); }));
  console.log(assetId(key, { kind: a[1], fields }));
} else if (cmd === 'manifest' && a[0]) {
  console.log(JSON.stringify(await manifestForFolder(a[0]), null, 2));
} else if (cmd === 'verify' && a[0] && a[1]) {
  const stored = JSON.parse(await readFile(a[0], 'utf8')) as Manifest;
  if (!verifyManifest(stored)) fail('FAILED: the stored manifest does not match its own root. It has been edited.');
  const now = await manifestForFolder(a[1]);
  if (now.root === stored.root) console.log(`MATCH: ${now.entries.length} documents, root ${now.root}`);
  else { console.log(JSON.stringify({ result: 'CHANGED', ...diffManifests(stored, now) }, null, 2)); process.exit(2); }
} else fail('Usage: keygen <key-file> | id <key-file> <kind> name=value ... | manifest <folder> | verify <manifest.json> <folder>');
