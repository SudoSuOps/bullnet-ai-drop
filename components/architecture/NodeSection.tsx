'use client';

import { useState } from 'react';
import { site } from '@/content/site';
import { Picker } from '@/components/Picker';
import { NodeDiagram } from '@/components/architecture/NodeDiagram';

export function NodeSection() {
  const [ti, setTi] = useState(0);
  const [di, setDi] = useState(0);
  const t = site.nodeTabs[ti];
  const d = site.deploy[di];
  return (
    <section id="node">
      <div className="wrap">
        <header className="sh"><p className="idx mono"><b>07</b> The Node</p>
          <h2>Your intelligence.<br />Your environment.</h2>
          <p className="lede">The Node is a localized intelligence appliance. The intelligence comes to you, and the deployment model decides who holds the hardware and where the data rests.</p></header>
        <div className="grid2">
          <div className="gap">
            <div className="panel"><div className="ph mono"><span>FIG. 07 / Front elevation and internal layers</span><span className="brass">Design concept</span></div>
              <div className="pb scroll"><NodeDiagram layer={t.layer} /></div></div>
            <p className="steel" style={{ fontSize: '.88rem' }}>Physical design concept. No hardware specifications, certifications or availability commitments are stated or implied.</p>
          </div>
          <div className="gap">
            <div className="gap-s"><h3>Explore the Node</h3><Picker label="Node capabilities" value={ti} onChange={setTi} items={site.nodeTabs.map((x) => x.name)} /><div className="note" aria-live="polite">{t.text}</div></div>
            <div className="gap-s"><h3>Deployment options</h3><Picker label="Deployment options" value={di} onChange={setDi} items={site.deploy.map((x) => x.n)} />
              <div className="panel"><div className="pb" aria-live="polite"><dl className="kv"><dt>Hardware</dt><dd>{d.hw}</dd><dt>Data at rest</dt><dd>{d.data}</dd><dt>Connectivity</dt><dd>{d.link}</dd><dt>Agreed in writing</dt><dd>{d.agree}</dd></dl></div></div></div>
          </div>
        </div>
        <div style={{ marginTop: 'clamp(40px,6vw,72px)' }} className="gap">
          <div className="gap-s"><p className="mono brass">Sovereign compute</p><h3 style={{ fontSize: 'clamp(1.2rem,2.4vw,1.8rem)' }}>Not a hyperscaler. A specialized intelligence operation.</h3><p className="steel">Purpose-built private compute for consequential commercial real estate workflows. <span className="tag b">Existing infrastructure</span></p></div>
          <div className="scroll"><ol className="mono" style={{ display: 'flex', minWidth: '860px', border: '1px solid var(--line)' }} aria-label="From compute to work product">
            <li style={{ flex: '1', padding: '14px', borderRight: '1px solid var(--line)' }}><span className="brass">A</span><br />Physical compute</li>
            <li style={{ flex: '1', padding: '14px', borderRight: '1px solid var(--line)' }}><span className="brass">B</span><br />Local model inference</li>
            <li style={{ flex: '1', padding: '14px', borderRight: '1px solid var(--line)' }}><span className="brass">C</span><br />Domain-specific intelligence</li>
            <li style={{ flex: '1', padding: '14px', borderRight: '1px solid var(--line)' }}><span className="brass">D</span><br />Authorized agent execution</li>
            <li style={{ flex: '1', padding: '14px', borderRight: '1px solid var(--line)' }}><span className="brass">E</span><br />Mathematical validation</li>
            <li style={{ flex: '1', padding: '14px' }}><span className="brass">F</span><br />Auditable work product</li>
          </ol></div>
          <p className="steel" style={{ fontSize: '.88rem' }}>Owning compute is not a security certification. Not every deployment is isolated or offline. Availability depends on the redundancy, monitoring and support agreed for each engagement.</p>
        </div>
      </div>
    </section>
  );
}
