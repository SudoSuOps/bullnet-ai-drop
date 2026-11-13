'use client';

import { useEffect, useState } from 'react';
import { useValidator } from '@/components/validation/ValidatorContext';

/**
 * Sample evidence receipt. The SHA-256 digest is computed in the browser from the payload shown.
 * No signing key exists in this site, so no signature is produced or implied.
 * Names are hypothetical: replace only after ownership and resolver configuration are confirmed.
 */
export function Receipt() {
  const r = useValidator().result;
  const computed = r.status !== 'INCONCLUSIVE';
  const body = JSON.stringify(
    {
      flight_sheet: 'FS-DEMO-0001',
      issuer: 'bullnet-example.eth',
      node: 'node-01.bullnet-example.eth',
      agent: 'validator.node-01.bullnet-example.eth',
      mandate: 'direct-cap valuation check',
      test: 'DEF-CAP-001',
      inputs: computed ? { noi_usd: r.noi, cap_rate_pct: r.capPct } : null,
      submitted_value_usd: computed ? r.agent : null,
      recomputed_value_usd: computed ? r.value : null,
      result: r.status,
    },
    null,
    1,
  );
  const [digest, setDigest] = useState('computing');

  useEffect(() => {
    let live = true;
    (async () => {
      try {
        const hash = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(body));
        const hex = Array.from(new Uint8Array(hash), (b) => b.toString(16).padStart(2, '0')).join('');
        if (live) setDigest(hex);
      } catch {
        if (live) setDigest('unavailable in this browser context');
      }
    })();
    return () => { live = false; };
  }, [body]);

  return (
    <pre aria-live="polite">{`FLIGHT SHEET EVIDENCE RECEIPT\n\n${body}\n\nsha256    ${digest}\nsignature none (no signing key in this page)\npublished no (private by default)`}</pre>
  );
}
