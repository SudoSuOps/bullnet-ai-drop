/**
 * Signed append-only log. Every vault event (a manifest sealed, an NDA checked, access granted
 * or refused, a document viewed) becomes one entry. Each entry carries the hash of the entry
 * before it and a signature from the node's log key.
 *
 *   hash = SHA-256("bullnet.vault.log.v1" || 0x00 || canonical(seq, time, type, assetId, actor, data, prev))
 *   sig  = Ed25519(private key, hash)
 *
 * What that gives you:
 *  - Edit, reorder, insert or delete an entry in the middle and verification fails at that entry.
 *  - Nobody without the private key can add an entry that verifies.
 * What it does not give you on its own:
 *  - Whoever holds the private key and the file can drop entries off the END, or rewrite the
 *    whole log. A checkpoint (sequence number plus head hash) handed to a second party, for
 *    example in the seller's weekly report, is what catches that. See checkpoint().
 *
 * Pure functions. Reading and writing the log file lives in log-file.ts.
 */
import { createHash, generateKeyPairSync, sign, verify, createPrivateKey, createPublicKey, type KeyObject } from 'node:crypto';

export const LOG_VERSION = 'bullnet.vault.log.v1';
export const GENESIS = '0'.repeat(64);

export type Value = string | number | boolean;

export interface LogEvent {
  /** Upper-case event name, for example ACCESS_GRANTED. */
  type: string;
  /** Asset ID the event concerns, "0x" plus 64 hex characters. */
  assetId: string;
  /** Who or what acted: a person, a party ID or a skill name. Avoid personal details that are not needed. */
  actor: string;
  /** Small flat facts about the event. No documents, no secrets. */
  data?: Record<string, Value>;
}

export interface LogEntry {
  seq: number;
  /** ISO 8601 UTC time the entry was written. */
  time: string;
  type: string;
  assetId: string;
  actor: string;
  data: Record<string, Value>;
  /** Hash of the previous entry. The first entry points at 64 zeros. */
  prev: string;
  hash: string;
  /** Ed25519 signature over the hash, hex. */
  sig: string;
}

export interface Checkpoint { version: typeof LOG_VERSION; seq: number; head: string }

export type Verdict = { ok: true; entries: number; head: string } | { ok: false; at: number; why: string };

const TYPE_RE = /^[A-Z][A-Z0-9_]{1,63}$/;
const ID_RE = /^0x[0-9a-f]{64}$/;
const HEX64 = /^[0-9a-f]{64}$/;
const TIME_RE = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/;

function cleanData(data: Record<string, Value> | undefined): Record<string, Value> {
  const out: Record<string, Value> = {};
  for (const k of Object.keys(data ?? {}).sort()) {
    const v = (data as Record<string, Value>)[k];
    if (!/^[a-z][a-zA-Z0-9_]{0,63}$/.test(k)) throw new Error(`Bad data field name "${k}".`);
    if (typeof v === 'number' ? !Number.isFinite(v) : typeof v !== 'string' && typeof v !== 'boolean') throw new Error(`Data field "${k}" must be text, a finite number or true/false.`);
    out[k] = v;
  }
  return out;
}

function entryHash(e: Omit<LogEntry, 'hash' | 'sig'>): string {
  const body = JSON.stringify([e.seq, e.time, e.type, e.assetId, e.actor, Object.keys(e.data).sort().map((k) => [k, e.data[k]]), e.prev]);
  return createHash('sha256').update(LOG_VERSION).update(Buffer.from([0])).update(body, 'utf8').digest('hex');
}

/** A new Ed25519 key pair for signing the log, as PEM text. The private key stays on the node. */
export function generateLogKeys(): { privateKey: string; publicKey: string } {
  const { privateKey, publicKey } = generateKeyPairSync('ed25519');
  return { privateKey: privateKey.export({ type: 'pkcs8', format: 'pem' }).toString(), publicKey: publicKey.export({ type: 'spki', format: 'pem' }).toString() };
}

function ed25519(key: KeyObject): KeyObject {
  if (key.asymmetricKeyType !== 'ed25519') throw new Error('The log key must be an Ed25519 key.');
  return key;
}

/** Returns the next entry. Does not change `log`; the caller stores the entry. */
export function nextEntry(log: readonly LogEntry[], event: LogEvent, privateKeyPem: string, now: Date = new Date()): LogEntry {
  if (!TYPE_RE.test(event.type)) throw new Error('Event type must be upper-case letters, digits and underscores, for example ACCESS_GRANTED.');
  if (!ID_RE.test(event.assetId)) throw new Error('Asset ID must be "0x" followed by 64 hex characters.');
  if (!event.actor.trim() || event.actor.length > 200) throw new Error('The event needs an actor.');
  if (Number.isNaN(now.getTime())) throw new Error('Bad time.');
  const last = log[log.length - 1];
  const base = { seq: last ? last.seq + 1 : 1, time: now.toISOString(), type: event.type, assetId: event.assetId, actor: event.actor.trim(), data: cleanData(event.data), prev: last ? last.hash : GENESIS };
  const hash = entryHash(base);
  const sig = sign(null, Buffer.from(hash, 'hex'), ed25519(createPrivateKey(privateKeyPem))).toString('hex');
  return { ...base, hash, sig };
}

/** Checks every entry: numbering, link to the previous entry, hash and signature. Stops at the first problem. */
export function verifyLog(log: readonly LogEntry[], publicKeyPem: string): Verdict {
  let key: KeyObject;
  try { key = ed25519(createPublicKey(publicKeyPem)); } catch { return { ok: false, at: 0, why: 'The public key could not be read.' }; }
  let prev = GENESIS;
  for (let i = 0; i < log.length; i++) {
    const e = log[i];
    const at = i + 1;
    try {
      if (e.seq !== at) return { ok: false, at, why: `Expected entry number ${at}, found ${e.seq}. An entry is missing, added or out of order.` };
      if (!TIME_RE.test(e.time) || !TYPE_RE.test(e.type) || !ID_RE.test(e.assetId) || !HEX64.test(e.hash) || !/^[0-9a-f]{128}$/.test(e.sig)) return { ok: false, at, why: 'The entry is malformed.' };
      if (e.prev !== prev) return { ok: false, at, why: 'The entry does not link to the one before it.' };
      const { hash, sig, ...base } = e;
      if (entryHash({ ...base, data: cleanData(base.data) }) !== hash) return { ok: false, at, why: 'The entry has been changed since it was written.' };
      if (!verify(null, Buffer.from(hash, 'hex'), key, Buffer.from(sig, 'hex'))) return { ok: false, at, why: 'The signature does not match the log key.' };
    } catch { return { ok: false, at, why: 'The entry is malformed.' }; }
    prev = e.hash;
  }
  return { ok: true, entries: log.length, head: prev };
}

/** A receipt to hand to a second party. Later, checkAgainst() shows whether the log still contains everything it did then. */
export function checkpoint(log: readonly LogEntry[]): Checkpoint {
  const last = log[log.length - 1];
  return { version: LOG_VERSION, seq: last ? last.seq : 0, head: last ? last.hash : GENESIS };
}

/** True when the log still holds the checkpointed entry, unchanged, at the same position. Run verifyLog first. */
export function checkAgainst(log: readonly LogEntry[], cp: Checkpoint): boolean {
  if (cp.version !== LOG_VERSION) return false;
  if (cp.seq === 0) return cp.head === GENESIS;
  const e = log[cp.seq - 1];
  return !!e && e.seq === cp.seq && e.hash === cp.head;
}

/** Entries for one asset, optionally within a time window. The weekly seller report reads from this. */
export function entriesFor(log: readonly LogEntry[], assetId: string, from?: Date, to?: Date): LogEntry[] {
  return log.filter((e) => e.assetId === assetId && (!from || e.time >= from.toISOString()) && (!to || e.time < to.toISOString()));
}
