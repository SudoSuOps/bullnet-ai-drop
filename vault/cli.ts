#!/usr/bin/env node
/**
 * Vault step one, from the command line. Runs on the node. Nothing leaves the machine.
 *
 *   node --experimental-strip-types vault/cli.ts keygen <key-file>
 *   node --experimental-strip-types vault/cli.ts id <key-file> <kind> name=value [name=value ...]
 *   node --experimental-strip-types vault/cli.ts manifest <folder>
 *   node --experimental-strip-types vault/cli.ts verify <manifest.json> <folder>
 *   node --experimental-strip-types vault/cli.ts log-keygen <private.pem> <public.pem>
 *   node --experimental-strip-types vault/cli.ts log-append <log.jsonl> <private.pem> <TYPE> <asset-id> <actor> [name=value ...]
 *   node --experimental-strip-types vault/cli.ts log-verify <log.jsonl> <public.pem> [checkpoint.json]
 */
import { readFile, writeFile } from 'node:fs/promises';
import { assetId, generateKey } from './asset-id.ts';
import { diffManifests, verifyManifest, type Manifest } from './manifest.ts';
import { manifestForFolder } from './files.ts';
import { generateLogKeys, verifyLog, checkpoint, checkAgainst, type Checkpoint, type Value } from './log.ts';
import { appendEvent, readLog } from './log-file.ts';

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
} else if (cmd === 'log-keygen' && a[0] && a[1]) {
  const k = generateLogKeys();
  await writeFile(a[0], k.privateKey, { mode: 0o600, flag: 'wx' });
  await writeFile(a[1], k.publicKey, { flag: 'wx' });
  console.log(`Private key written to ${a[0]} (keep it on the node). Public key written to ${a[1]} (safe to share).`);
} else if (cmd === 'log-append' && a.length >= 5) {
  const data: Record<string, Value> = {};
  for (const p of a.slice(5)) { const i = p.indexOf('='); if (i <= 0) fail(`Expected name=value, got "${p}".`); const v = p.slice(i + 1); data[p.slice(0, i)] = v === 'true' ? true : v === 'false' ? false : v !== '' && !Number.isNaN(Number(v)) ? Number(v) : v; }
  const e = await appendEvent(a[0], { type: a[2], assetId: a[3], actor: a[4], data }, await readFile(a[1], 'utf8'));
  console.log(`Entry ${e.seq} written. Head ${e.hash}`);
} else if (cmd === 'log-verify' && a[0] && a[1]) {
  const log = await readLog(a[0]);
  const v = verifyLog(log, await readFile(a[1], 'utf8'));
  if (!v.ok) { console.log(`FAILED at entry ${v.at}: ${v.why}`); process.exit(2); }
  if (a[2] && !checkAgainst(log, JSON.parse(await readFile(a[2], 'utf8')) as Checkpoint)) { console.log('FAILED: the log no longer contains the checkpointed entry. Entries have been removed or replaced.'); process.exit(2); }
  console.log(`VERIFIED: ${v.entries} entries. Checkpoint ${JSON.stringify(checkpoint(log))}`);
} else fail('Usage: keygen | id | manifest | verify | log-keygen | log-append | log-verify. See the top of vault/cli.ts.');
