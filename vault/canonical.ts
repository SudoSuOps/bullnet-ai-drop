/**
 * Canonical form for vault records. The same record must always produce the same bytes,
 * whatever order the fields were typed in and however the text was spaced or cased.
 */
export type Fields = Record<string, string>;

/** Unicode-normalize, trim, collapse runs of whitespace, lower-case. */
export const normalize = (s: string): string => s.normalize('NFKC').trim().replace(/\s+/g, ' ').toLowerCase();

/** Field names sorted, names and values normalized, empty values dropped. Throws on a duplicate name after normalizing. */
export function canonicalFields(fields: Fields): [string, string][] {
  const out = new Map<string, string>();
  for (const [k, v] of Object.entries(fields)) {
    if (typeof v !== 'string') throw new TypeError(`Field "${k}" must be text.`);
    const key = normalize(k);
    const value = normalize(v);
    if (!key) throw new Error('A field name cannot be empty.');
    if (!value) continue;
    if (out.has(key)) throw new Error(`Field "${key}" appears more than once.`);
    out.set(key, value);
  }
  return [...out.entries()].sort(([a], [b]) => (a < b ? -1 : a > b ? 1 : 0));
}

/** JSON with a fixed shape and order. Arrays only, so there is no key-order ambiguity. */
export const canonicalJson = (kind: string, fields: Fields): string => JSON.stringify([normalize(kind), canonicalFields(fields)]);
