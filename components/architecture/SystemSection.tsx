'use client';

import { useState } from 'react';
import { site } from '@/content/site';
import { Picker } from '@/components/Picker';
import { ArchDiagram } from '@/components/architecture/ArchDiagram';

export function SystemSection() {
  const [ci, setCi] = useState(0);
  const [ai, setAi] = useState(0);
  const c = site.components[ci];
  const a = site.agents[ai];
  return (
    <section id="system">
      <div className="wrap">
        <header className="sh"><p className="idx mono"><b>06</b> How it connects</p>
          <h2>One mandate.<br />A purpose-built intelligence system.</h2>
          <p className="lede">Think of it as an office. The Private AI Office is the premises. The Node is the power on site, and it is optional. BullNet Infrastructure is the utility behind it. The Swarm is the staff, the Hive is the files, the Vault is the locked room and the Flight Sheet is the work order. Select a component to see what enters it, what leaves it and where its trust boundary sits.</p></header>
        <div className="panel"><div className="ph mono"><span>FIG. 06 / System architecture</span><span>Select a component</span></div>
          <div className="pb scroll" tabIndex={0} role="region" aria-label="System architecture diagram. Scroll sideways to see all of it."><ArchDiagram active={c.k} onPick={(k) => setCi(site.components.findIndex((x) => x.k === k))} /></div>
        </div>
        <div className="grid2" style={{ marginTop: '28px' }}>
          <Picker className="stack" label="Components" value={ci} onChange={setCi} items={site.components.map((x) => (<><span>{x.n}</span><span>{x.name}</span></>))} />
          <div className="gap" aria-live="polite">
    <div className="gap-s"><span className="tag b">{c.st}</span><h3 style={{ fontSize: '1.5rem' }}>{c.name}</h3><p className="mono steel">{c.sub}</p></div>
    <dl className="kv"><dt>Purpose</dt><dd>{c.purpose}</dd><dt>Inputs</dt><dd>{c.inp}</dd><dt>Outputs</dt><dd>{c.out}</dd><dt>In the system</dt><dd>{c.rel}</dd><dt>Trust boundary</dt><dd>{c.tb}</dd></dl>
    </div>
        </div>

        <div style={{ marginTop: 'clamp(40px,6vw,80px)' }} className="gap">
          <div className="gap-s"><h3>The Swarm: select an agent</h3><p className="steel">Each agent is a worker with a written mandate. None is a fiduciary, a licensed professional or an investment decision-maker. Mandates below are representative.</p></div>
          <Picker label="Agents" value={ai} onChange={setAi} items={site.agents.map((x) => x.n)} />
          <div className="panel"><div className="ph mono"><span>Agent identity card</span><span className="brass">Illustrative</span></div><div className="pb" aria-live="polite"><dl className="kv"><dt>Agent</dt><dd><strong>{a.n} agent</strong></dd><dt>Role</dt><dd>{a.role}</dd><dt>Authorized sources</dt><dd>{a.src}</dd><dt>Approved tools</dt><dd>{a.tools}</dd><dt>Testable output</dt><dd>{a.out}</dd><dt>Escalates to a human on</dt><dd>{a.esc}</dd><dt>Not permitted</dt><dd>External transfer, investment recommendations, any action outside the Flight Sheet</dd></dl></div></div>
        </div>
      </div>
    </section>
  );
}
