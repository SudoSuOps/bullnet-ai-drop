'use client';

import { useState } from 'react';
import { site } from '@/content/site';
import { Picker } from '@/components/Picker';

export function Services() {
  const [i, setI] = useState(0);
  const l = site.life[i];
  return (
    <section id="services">
      <div className="wrap">
        <header className="sh"><p className="idx mono"><b>12</b> Services</p>
          <h2>Customization by design.</h2>
          <p className="lede">Every engagement is scoped to one client and one mandate. Scope, timing and fees are set in the engagement agreement.</p></header>
        <div className="stages">
          <div><span className="mono brass">I</span><h3>Design</h3><p>Define the mandate, the data boundary and the tests.</p></div>
          <div><span className="mono brass">II</span><h3>Build</h3><p>Assemble agents, datasets, models and calculation engines.</p></div>
          <div><span className="mono brass">III</span><h3>Deploy</h3><p>Install in the agreed environment under the agreed custody model.</p></div>
          <div><span className="mono brass">IV</span><h3>Validate</h3><p>Run deterministic tests, reconcile sources, record exceptions.</p></div>
          <div><span className="mono brass">V</span><h3>Operate</h3><p>Maintain, monitor and extend the system as mandates change.</p></div>
        </div>
        <h3 style={{ marginBottom: '14px' }}>Engagement lifecycle</h3>
        <Picker className="life" label="Engagement lifecycle" value={i} onChange={setI} items={site.life.map((x, n) => (<><b>0{n + 1}</b>{x.name}</>))} />
        <div className="panel" style={{ borderTop: '0' }}><div className="pb" aria-live="polite"><dl className="kv"><dt>What happens</dt><dd>{l.what}</dd><dt>You provide</dt><dd>{l.you}</dd><dt>BullNet delivers</dt><dd>{l.we}</dd></dl></div></div>
      </div>
    </section>
  );
}
