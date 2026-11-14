'use client';

import { useState } from 'react';
import { site } from '@/content/site';
import { node, type HardwareStatus } from '@/content/node';
import { Picker } from '@/components/Picker';
import { NodeDiagram } from '@/components/architecture/NodeDiagram';

type Hardware = (typeof node.hardware)[number];

/** Cards for a group of hardware. Each card carries its own status label. */
function HardwareList({ items }: { items: readonly Hardware[] }) {
  return (
    <ul className="gear">
      {items.map((g) => (
        <li key={g.id} className={g.img ? 'has-img' : undefined}>
          {g.img && (<figure className="shot"><img src={g.img.src} alt={g.img.alt} width={g.img.width} height={g.img.height} decoding="async" /><figcaption className="mono">{g.caption}</figcaption></figure>)}
          <div className="gap-s"><span className="tag b">{g.status}</span><h3>{g.name}</h3><p>{g.what}</p></div>
        </li>
      ))}
    </ul>
  );
}

/** The Node: optional on-site compute. Product, equipment, functions, an illustrative workflow, where work runs, control, and the next step. */
export function NodeSection() {
  const [fi, setFi] = useState(0);
  const [di, setDi] = useState(0);
  const [ci, setCi] = useState(0);
  const c = node.configs[ci];
  // Status is widened so the 'In operation' group works the day an item is upgraded in content/node.ts.
  const status = (h: Hardware): HardwareStatus => h.status;
  const operating = node.hardware.filter((h) => status(h) === 'In operation');
  const developing = node.hardware.filter((h) => status(h) === 'In development' || status(h) === 'Design concept');
  const f = node.functions[fi];
  const d = site.deploy[di];
  return (
    <section id="node">
      <div className="wrap">
        {/* 01 The product */}
        <header className="sh"><p className="idx mono"><b>05</b> The Node</p>
          <h2>Your business. Your data.<br />Your compute.</h2>
          <p className="hero-tag" style={{ fontSize: 'clamp(.95rem,1.9vw,1.4rem)' }}>Private AI computing. Right where you work.</p>
          <p className="lede">The BullNet Node brings private AI processing into your business. It works with approved information, runs supported models and specialized agents, and connects to your private AI office. When more computing power is needed, authorized workloads can connect to BullNet Infrastructure.</p>
          <p className="lede">A Node is optional. Many offices run entirely on compute BullNet hosts privately. We recommend one only when keeping the work on your premises earns its cost.</p></header>
        <p className="pull" style={{ maxWidth: '30ch' }}>The Node is where the work runs. The Office is where your people work.</p>

        {/* 02 The equipment: what we operate (shown only when evidenced), what we are developing, and what we configure to suit */}
        <div className="journey">
          <div className="gap-s"><p className="mono brass">02 The equipment</p><h3>One business. The right Node.</h3>
            <p>We pencil the equipment before we prescribe it. The Node is not a fixed product. It is a deployment configuration designed around your business’s requirements: it could be built from the hardware below, something larger, or equipment you already own.</p></div>

          {operating.length > 0 && (
            <div className="gap-s">
              <h3 className="grp">Hardware we operate</h3>
              <HardwareList items={operating} />
            </div>
          )}

          <div className="gap-s">
            <h3 className="grp">Hardware and enclosures we’re developing</h3>
            <HardwareList items={developing} />
            <p className="steel">“In development” means we are building and testing it. It is not yet documented as in operation, and it is not a customer deployment. Renders are captioned as renders.</p>
          </div>

          <div className="gap-s">
            <h3 className="grp">Solutions we configure to suit</h3>
            <p>Four example configurations. None is a finished or certified product.</p>
            <Picker label="Node configurations" value={ci} onChange={setCi} items={node.configs.map((x) => x.name)} />
            <div className="grid2">
              <div className="panel"><div className="ph mono"><span>{c.name}</span><span className="brass">Proposed configuration</span></div>
                <div className="pb gap-s" aria-live="polite">
                  <p className="cfg-line">{c.line}</p>
                  <dl className="kv">
                    <dt>What it does</dt><dd>{c.does}</dd>
                    <dt>Who needs it</dt><dd>{c.who}</dd>
                    <dt>Designed to run locally</dt><dd>{c.local}</dd>
                    <dt>Needs more compute</dt><dd>{c.more}</dd>
                    <dt>BullNet manages</dt><dd>{c.manages}</dd>
                    <dt>Stays with you</dt><dd>{c.yours}</dd>
                  </dl>
                  {c.note && (<p className="note">{c.note}</p>)}
                </div></div>
              <div className="panel"><div className="ph mono"><span>Could be built from</span><span>Status</span></div>
                <div className="pb" aria-live="polite"><ul className="from">
                  {c.from.map((id) => { const h = node.hardware.find((x) => x.id === id)!; return (<li key={id}><span>{h.name}</span><span className="tag b">{h.status}</span></li>); })}
                </ul></div></div>
            </div>
          </div>
          <p className="steel">No prices, performance figures, certifications or availability dates are stated. Each configuration is specified and tested for the customer before it is relied on. Product names belong to their makers.</p>
        </div>

        {/* 03 What it does */}
        <div className="journey">
          <div className="gap-s"><p className="mono brass">03 What it does</p><h3>Five jobs, in plain terms.</h3></div>
          <div className="grid2">
            <div className="gap">
              <Picker label="What the Node does" value={fi} onChange={setFi} items={node.functions.map((x) => x.name)} />
              <div className="panel"><div className="ph mono"><span>{f.name}</span><span>0{fi + 1} / 05</span></div>
                <div className="pb" aria-live="polite"><dl className="kv">
                  <dt>What it means</dt><dd>{f.means}</dd>
                  <dt>Why it matters</dt><dd>{f.why}</dd>
                  <dt>Example</dt><dd>{f.example}</dd>
                  <dt className="approve">What you approve</dt><dd className="approve">{f.approve}</dd>
                </dl></div></div>
            </div>
            <div className="gap">
              <div className="panel"><div className="ph mono"><span>FIG. 05 / Internal layers</span><span className="brass">Design concept</span></div>
                <div className="pb scroll" tabIndex={0} role="region" aria-label="Node diagram. Scroll sideways to see all of it."><NodeDiagram layer={f.layer} /></div>
                <p className="swipe mono" aria-hidden="true">Swipe sideways to see the full diagram</p></div>
              <p className="steel">Design concept of the layers inside a Node. What a given unit can run depends on its hardware.</p>
            </div>
          </div>
        </div>

        {/* 04 See it work */}
        <div className="journey">
          <div className="gap-s"><p className="mono brass">04 See it work</p><h3>A project document arrives.</h3>
            <p>The electrical contractor from our example is managing drawings, submittals, requests for information, supplier documents and deadlines on a 600-unit project. This is how a Node is meant to help.</p></div>
          <ol className="steps five">
            {node.workflow.steps.map((x, k) => (<li key={x.t}><span className="mono brass">0{k + 1}</span><h3>{x.t}</h3><p>{x.d}</p></li>))}
          </ol>
          <p className="note">At step three the project manager might ask: “{node.workflow.ask}”</p>
          <p className="steel"><span className="tag b">Illustrative demonstration</span> Illustrative workflow; actual functionality depends on the configured and verified system. Comparing documents does not replace engineering review.</p>
        </div>

        {/* 05 Where the work runs */}
        <div className="journey">
          <div className="gap-s"><p className="mono brass">05 Where the work runs</p><h3>On site, hosted, or both.</h3></div>
          <Picker label="Where the work runs" value={di} onChange={setDi} items={site.deploy.map((x) => x.n)} />
          <div className="panel"><div className="pb" aria-live="polite"><dl className="kv"><dt>Runs on</dt><dd>{d.kind}</dd><dt>Hardware</dt><dd>{d.hw}</dd><dt>Data at rest</dt><dd>{d.data}</dd><dt>Connectivity</dt><dd>{d.link}</dd><dt>Agreed in writing</dt><dd>{d.agree}</dd></dl></div></div>
        </div>
        <div style={{ marginTop: 'clamp(28px,4vw,48px)' }} className="gap">
          <div className="gap-s"><p className="mono brass">BullNet Infrastructure / the utility</p><h3 style={{ fontSize: 'clamp(1.2rem,2.4vw,1.8rem)' }}>Not a hyperscaler. A specialized intelligence operation.</h3><p className="steel">Private compute BullNet owns and operates, for the jobs an on-site Node cannot carry. <span className="tag b">Existing infrastructure</span></p></div>
          <div className="scroll" tabIndex={0} role="region" aria-label="From compute to work product. Scroll sideways to see all six steps."><ol className="mono" style={{ display: 'flex', minWidth: '860px', border: '1px solid var(--line)' }} aria-label="From compute to work product">
            <li style={{ flex: '1', padding: '14px', borderRight: '1px solid var(--line)' }}><span className="brass">A</span><br />Physical compute</li>
            <li style={{ flex: '1', padding: '14px', borderRight: '1px solid var(--line)' }}><span className="brass">B</span><br />Local model inference</li>
            <li style={{ flex: '1', padding: '14px', borderRight: '1px solid var(--line)' }}><span className="brass">C</span><br />Domain-specific intelligence</li>
            <li style={{ flex: '1', padding: '14px', borderRight: '1px solid var(--line)' }}><span className="brass">D</span><br />Authorized agent execution</li>
            <li style={{ flex: '1', padding: '14px', borderRight: '1px solid var(--line)' }}><span className="brass">E</span><br />Mathematical validation</li>
            <li style={{ flex: '1', padding: '14px' }}><span className="brass">F</span><br />Auditable work product</li>
          </ol></div>
          <p className="steel">Owning compute is not a security certification. Not every deployment is isolated or offline, and a connected job is not automatically private. Availability depends on the redundancy, monitoring and support agreed for each engagement.</p>
        </div>
        {/* 06 Your control */}
        <div className="journey">
          <div className="gap-s"><p className="mono brass">06 Your control</p><h3>Owning the box is not the control. The rules are.</h3></div>
          <div className="stages" style={{ marginBottom: 0 }}>
            {node.control.map((c) => (<div key={c.name}><h3>{c.name}</h3><p>{c.text}</p></div>))}
          </div>
          <p className="steel"><span className="tag b">Proposed capability</span> These are commitments set for each engagement. Each control is implemented and tested for a deployment before it is relied on. Having hardware on your premises does not by itself make a system private or compliant.</p>
        </div>

        {/* 07 The BullNet connection */}
        <div className="journey">
          <div className="gap-s"><p className="mono brass">07 The BullNet connection</p><h3>One part of the office, not the whole of it.</h3></div>
          <div className="panel"><div className="pb"><dl className="kv">
            {node.connection.map((c) => (<div key={c.name} style={{ display: 'contents' }}><dt>{c.name}</dt><dd>{c.text}</dd></div>))}
          </dl></div></div>
        </div>

        {/* 08 The next step */}
        <div className="convert">
          <h3>Do you need a Node? Maybe not.</h3>
          <p>The Flight Sheet answers that before any equipment is ordered. We look at what you are trying to do, what information is involved and where it should run. Then we pencil it.</p>
          <div className="cta"><a className="btn" href="#flight-sheet">Start Your Flight Sheet</a></div>
        </div>
      </div>
    </section>
  );
}
