'use client';

import { useState } from 'react';
import { site } from '@/content/site';
import { Picker } from '@/components/Picker';
import { Receipt } from '@/components/identity/Receipt';

export function IdentitySection() {
  const [i, setI] = useState(0);
  const d = site.ids[i];
  return (
    <section id="sovereign-id">
      <div className="wrap">
        <header className="sh"><p className="idx mono"><b>11</b> Sovereign ID</p>
          <h2>Globally identifiable.<br />Locally executed.</h2>
          <p className="lede">Every device, agent and work product can carry a cryptographic identity. BullNet intends to explore ENS names as optional public anchors for that hierarchy. Confidential identifiers and deal data stay private.</p></header>
        <div className="grid2">
          <div className="gap"><Picker className="stack" label="Identity hierarchy" value={i} onChange={setI} items={site.ids.map((x, n) => (<><span>{n ? '\u2192' : '\u25C6'}</span><span style={{ paddingLeft: n * 10 }}>{x.n}</span></>))} />
            <div className="panel"><div className="pb" aria-live="polite"><dl className="kv"><dt>Example</dt><dd><code className="mono" style={{ textTransform: 'none', letterSpacing: 0, fontSize: '.82rem' }}>{d.ex}</code><br /><span className="steel" style={{ fontSize: '.82rem' }}>Hypothetical. No name ownership or resolver configuration is claimed.</span></dd><dt>Holds</dt><dd>{d.holds}</dd><dt>Proves</dt><dd>{d.proves}</dd><dt>Does not prove</dt><dd>{d.not}</dd></dl></div></div></div>
          <div className="gap">
            <div className="gap-s"><h3>Sample signed Flight Sheet receipt</h3><p className="steel" style={{ fontSize: '.92rem' }}>This receipt reflects the validator inputs in section 12. The SHA-256 digest is computed in your browser from the payload shown. No signing key exists in this page, so no signature is produced.</p></div>
            <div className="receipt"><Receipt /></div>
            <ul className="gap-s steel" style={{ fontSize: '.9rem' }}>
              <li>ENS is a naming and discovery layer. It is not an access-control system.</li>
              <li>Owning a name does not prove device integrity, human authority, confidentiality or agent reliability.</li>
              <li>Public chain publication is optional per workflow. Client transaction details are never written to a public chain.</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
