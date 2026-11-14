/**
 * Asset ID: an opaque identifier for anything a vault holds a file on. A property, a company,
 * a contract, a piece of equipment. The ID is safe to show to outsiders because it is a keyed
 * hash: without the vault's secret key nobody can work back from the ID to the asset, or test
 * a guess ("is this 123 Main St?"). The key holder can prove the link at any time.
 *
 *   id = HMAC-SHA-256(key, "bullnet.vault.asset-id.v1" || 0x00 || canonical(kind, fields))
 *
 * Pure functions. No network, no storage, no model.
 */
import { createHmac, randomBytes, timingSafeEqual } from 'node:crypto';
import { canonicalFields, canonicalJson, type Fields } from './canonical.ts';

export const ASSET_ID_VERSION = 'bullnet.vault.asset-id.v1';
const KEY_BYTES = 32;
const ID_RE = /^0x[0-9a-f]{64}$/;

export interface AssetRecord {
  /** What sort of thing this is, for example "property", "company", "contract". */
  kind: string;
  /** The facts that identify it. Order, spacing and letter case do not matter. */
  fields: Fields;
}

/** A new 32-byte vault key. Store it in the vault. Never publish it and never put it on a chain. */
export const generateKey = (): Buffer => randomBytes(KEY_BYTES);

function checkKey(key: Uint8Array): void {
  if (!(key instanceof Uint8Array) || key.length !== KEY_BYTES) throw new Error(`The vault key must be exactly ${KEY_BYTES} bytes.`);
}

export function assetId(key: Uint8Array, record: AssetRecord): string {
  checkKey(key);
  if (!record.kind.trim()) throw new Error('The record needs a kind.');
  if (canonicalFields(record.fields).length === 0) throw new Error('The record needs at least one identifying field.');
  const mac = createHmac('sha256', key);
  mac.update(ASSET_ID_VERSION);
  mac.update(Buffer.from([0]));
  mac.update(canonicalJson(record.kind, record.fields), 'utf8');
  return `0x${mac.digest('hex')}`;
}

/** True only when this key and this record produce this ID. Constant-time comparison. */
export function verifyAssetId(key: Uint8Array, record: AssetRecord, id: string): boolean {
  if (!ID_RE.test(id)) return false;
  let expected: string;
  try { expected = assetId(key, record); } catch { return false; }
  return timingSafeEqual(Buffer.from(expected.slice(2), 'hex'), Buffer.from(id.slice(2), 'hex'));
}

/** Short display form, for example "0x2939a1c4…9f0e". Not unique enough to look anything up by. */
export const shortId = (id: string): string => (ID_RE.test(id) ? `${id.slice(0, 10)}…${id.slice(-4)}` : id);
