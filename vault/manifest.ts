/**
 * Manifest: the list of documents in a vault, each with its SHA-256 fingerprint, and one root
 * hash that stands for the whole list. Change, add or remove any document and the root changes.
 *
 * The root is a Merkle root, so a single document can be proven to belong to the manifest
 * without showing any of the others.
 *
 *   leaf = SHA-256(0x00 || path || 0x00 || sha256 || 0x00 || bytes)
 *   node = SHA-256(0x01 || left || right)        an unpaired node moves up unchanged
 *
 * The 0x00 / 0x01 prefixes stop a leaf from being passed off as an inner node.
 * Pure functions. Reading files from disk lives in files.ts.
 */
import { createHash } from 'node:crypto';

export const MANIFEST_VERSION = 'bullnet.vault.manifest.v1';
const HEX64 = /^[0-9a-f]{64}$/;

export interface Entry {
  /** Path inside the vault, forward slashes, no leading slash. */
  path: string;
  /** SHA-256 of the file's bytes, 64 lower-case hex characters. */
  sha256: string;
  /** File size in bytes. */
  bytes: number;
}

export interface Manifest {
  version: typeof MANIFEST_VERSION;
  /** Entries sorted by path. */
  entries: Entry[];
  /** Merkle root over the entries, "0x" plus 64 hex characters. */
  root: string;
}

export interface Proof {
  entry: Entry;
  /** Sibling hashes from the leaf up. "L" means the sibling sits on the left. */
  path: { side: 'L' | 'R'; hash: string }[];
}

const sha = (...parts: (string | Uint8Array)[]): Buffer => {
  const h = createHash('sha256');
  for (const p of parts) h.update(p);
  return h.digest();
};

/** SHA-256 fingerprint of a document's bytes. */
export const fingerprint = (data: Uint8Array | string): string => sha(data).toString('hex');

const ZERO = Buffer.from([0]);
const ONE = Buffer.from([1]);
const leafHash = (e: Entry): Buffer => sha(ZERO, e.path, ZERO, e.sha256, ZERO, String(e.bytes));
const nodeHash = (l: Buffer, r: Buffer): Buffer => sha(ONE, l, r);

function checkEntry(e: Entry): void {
  if (!e.path || e.path.startsWith('/') || e.path.includes('\\') || e.path.includes('\0') || e.path.split('/').some((s) => s === '' || s === '.' || s === '..'))
    throw new Error(`Bad path "${e.path}". Use forward slashes, no leading slash, no "." or ".." parts.`);
  if (!HEX64.test(e.sha256)) throw new Error(`Bad fingerprint for "${e.path}".`);
  if (!Number.isSafeInteger(e.bytes) || e.bytes < 0) throw new Error(`Bad size for "${e.path}".`);
}

function levels(entries: Entry[]): Buffer[][] {
  const out: Buffer[][] = [entries.map(leafHash)];
  while (out[out.length - 1].length > 1) {
    const prev = out[out.length - 1];
    const next: Buffer[] = [];
    for (let i = 0; i < prev.length; i += 2) next.push(i + 1 < prev.length ? nodeHash(prev[i], prev[i + 1]) : prev[i]);
    out.push(next);
  }
  return out;
}

export function buildManifest(input: Entry[]): Manifest {
  if (input.length === 0) throw new Error('A manifest needs at least one document.');
  const entries = input.map((e) => ({ path: e.path, sha256: e.sha256, bytes: e.bytes }));
  entries.forEach(checkEntry);
  entries.sort((a, b) => (a.path < b.path ? -1 : a.path > b.path ? 1 : 0));
  for (let i = 1; i < entries.length; i++) if (entries[i].path === entries[i - 1].path) throw new Error(`"${entries[i].path}" is listed twice.`);
  const top = levels(entries);
  return { version: MANIFEST_VERSION, entries, root: `0x${top[top.length - 1][0].toString('hex')}` };
}

/** Recompute the root from the entries and compare. Catches any edit to a stored manifest. */
export function verifyManifest(m: Manifest): boolean {
  try { return m.version === MANIFEST_VERSION && buildManifest(m.entries).root === m.root; } catch { return false; }
}

/** Proof that one document belongs to the manifest. Share it with the entry and the root; nothing else is revealed. */
export function proveEntry(m: Manifest, path: string): Proof {
  let i = m.entries.findIndex((e) => e.path === path);
  if (i < 0) throw new Error(`"${path}" is not in the manifest.`);
  const entry = m.entries[i];
  const steps: Proof['path'] = [];
  for (const level of levels(m.entries).slice(0, -1)) {
    const sib = i % 2 === 0 ? i + 1 : i - 1;
    if (sib < level.length) steps.push({ side: sib < i ? 'L' : 'R', hash: level[sib].toString('hex') });
    i = Math.floor(i / 2);
  }
  return { entry, path: steps };
}

export function verifyProof(root: string, proof: Proof): boolean {
  try {
    checkEntry(proof.entry);
    let h = leafHash(proof.entry);
    for (const s of proof.path) {
      if (!HEX64.test(s.hash) || (s.side !== 'L' && s.side !== 'R')) return false;
      const sib = Buffer.from(s.hash, 'hex');
      h = s.side === 'L' ? nodeHash(sib, h) : nodeHash(h, sib);
    }
    return `0x${h.toString('hex')}` === root;
  } catch { return false; }
}

/** What changed between two manifests, by path. */
export function diffManifests(before: Manifest, after: Manifest): { added: string[]; removed: string[]; changed: string[] } {
  const a = new Map(before.entries.map((e) => [e.path, e.sha256]));
  const b = new Map(after.entries.map((e) => [e.path, e.sha256]));
  return {
    added: [...b.keys()].filter((p) => !a.has(p)),
    removed: [...a.keys()].filter((p) => !b.has(p)),
    changed: [...b.keys()].filter((p) => a.has(p) && a.get(p) !== b.get(p)),
  };
}
