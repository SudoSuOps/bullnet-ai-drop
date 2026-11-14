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
        <header className="sh"><p className="idx mono"><b>09</b> Services</p>
          <h2>Customization by design.</h2>
          <p className="lede">An agent is built like a single-tenant building: one need, one occupant, built to suit. A business has many needs, so it gets many agents. Our job is to build them, fit them in, and then manage, fix and adjust them as the business changes. We go one win at a time, beside the way you already work. Nothing you rely on is replaced on day one. Scope, timing and fees are set in the engagement agreement.</p></header>
        <ul className="probs" style={{ marginBottom: '28px', gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,250px),1fr))' }}>
          <li><span className="mono brass">S-01</span><h3>Custom builds</h3><p>Agents built for your work. Back office: documents, data entry, billing support and reporting. Front end: the questions and requests your own customers bring.</p></li>
          <li><span className="mono brass">S-02</span><h3>Infrastructure management</h3><p>We run what we build: the compute, the models and the updates. When something breaks or the business changes, we fix it or adjust it.</p></li>
          <li><span className="mono brass">S-03</span><h3>Data organization</h3><p>Leases, titles, logs, contracts and financials brought into one private store, with a record of where each figure came from.</p></li>
          <li><span className="mono brass">S-04</span><h3>Hardware and equipment acquisition</h3><p>We pencil the purchase, set out procurement terms and outcomes, and introduce lenders where they fit. <a href="/hive-capital-markets/">Hive Capital Markets</a></p></li>
        </ul>
        <h3 style={{ marginBottom: '6px' }}>The build ladder</h3>
        <p className="steel" style={{ marginBottom: '14px', maxWidth: '70ch' }}>The model is off the shelf. The agent is built to suit. We use the lowest rung that does the job, and the Flight Sheet records which one and why.</p>
        <div className="stages">
          <div><span className="mono brass">Rung 0</span><h3>Script</h3><p>Plain code, no AI model. Calculations, scheduled reports, file handling and checks. Code does the math.</p></div>
          <div><span className="mono brass">Rung 1</span><h3>Configured agent</h3><p>A proven open model given one job, the tools it may use and the limits it must keep.</p></div>
          <div><span className="mono brass">Rung 2</span><h3>Grounded agent</h3><p>The same agent, answering from your approved documents and data.</p></div>
          <div><span className="mono brass">Rung 3</span><h3>Fine-tuned agent</h3><p>A model trained further on approved data. Used only where the lower rungs test short.</p></div>
        </div>
        <h3 style={{ marginBottom: '14px' }}>How a build runs</h3>
        <div className="stages">
          <div><span className="mono brass">I</span><h3>Design</h3><p>Define the job, the measurable win, the data boundary and the tests.</p></div>
          <div><span className="mono brass">II</span><h3>Build</h3><p>Assemble scripts, agents and data, and install them in the agreed environment.</p></div>
          <div><span className="mono brass">III</span><h3>Validate</h3><p>Run deterministic tests, reconcile sources, record exceptions.</p></div>
          <div><span className="mono brass">IV</span><h3>Shadow</h3><p>Run beside your current process. Output is reviewed, not used, until it passes.</p></div>
          <div><span className="mono brass">V</span><h3>Operate</h3><p>Go live on your sign-off. Then maintain, monitor and extend.</p></div>
        </div>
        <h3 style={{ marginBottom: '14px' }}>Engagement lifecycle</h3>
        <Picker className="life" label="Engagement lifecycle" value={i} onChange={setI} items={site.life.map((x, n) => (<><b>0{n + 1}</b>{x.name}</>))} />
        <div className="panel" style={{ borderTop: '0' }}><div className="pb" aria-live="polite"><dl className="kv"><dt>What happens</dt><dd>{l.what}</dd><dt>You provide</dt><dd>{l.you}</dd><dt>BullNet delivers</dt><dd>{l.we}</dd></dl></div></div>
      </div>
    </section>
  );
}
