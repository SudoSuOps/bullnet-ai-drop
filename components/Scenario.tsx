'use client';

import { useState } from 'react';
import { scenario } from '@/content/scenario';
import { Picker } from '@/components/Picker';

type Desk = (typeof scenario.desks)[number];

function DeskDetail({ d }: { d: Desk }) {
  return (
    <dl className="kv">
      <dt>The business need</dt><dd>{d.need}</dd>
      <dt>What the agent supports</dt><dd>{d.supports}</dd>
      <dt className="approve">What the human approves</dt><dd className="approve">{d.human}</dd>
    </dl>
  );
}

/** A fictional operating company and the office built for it. Not a client and not a case study. */
export function Scenario() {
  const [i, setI] = useState(0);
  const d = scenario.desks[i];
  const photo = scenario.photo;
  const w = scenario.workspace;
  return (
    <section id="example">
      <div className="wrap">
        <header className="sh">
          <p className="idx mono"><b>Example</b> Fictional scenario</p>
          <h2>Growth changes everything.</h2>
          <p className="lede">Winning the job is one thing. Building the business to deliver it is another.</p>
        </header>

        {/* 01 The opportunity */}
        <div className={photo ? 'grid2 journey-open' : 'journey-open'}>
          {photo && (
            <figure className="shot">
              <img src={photo.src} alt={photo.alt} width={photo.width} height={photo.height} loading="lazy" decoding="async" />
              <figcaption className="mono steel">Illustrative image. Not a client.</figcaption>
            </figure>
          )}
          <div className="gap">
            <p className="mono brass">BullNet / Built-to-suit example</p>
            <p className="pull" style={{ maxWidth: '20ch' }}>One project. A different-sized business.</p>
            <p><span className="mono brass">01 The opportunity</span><br />An electrical contractor in Palm Beach County. Fifteen employees, five years in, working out of 2,000 square feet of industrial flex space. He has just been awarded the electrical work on a 600-unit development. It is the biggest job the company has ever been awarded.</p>
          </div>
        </div>
        <div className="tiles" aria-label="The company and the job" style={{ marginTop: 'clamp(24px,3vw,40px)' }}>
          {scenario.facts.map((f) => (
            <div key={f.label}><strong>{f.value}</strong><span className="mono steel">{f.label}</span><span className="steel" style={{ fontSize: '.86rem' }}>{f.note}</span></div>
          ))}
        </div>

        {/* 02 The pressure */}
        <div className="journey">
          <div className="gap-s"><p className="mono brass">02 The pressure</p><h3>The job is awarded. Now the business has to deliver.</h3>
            <p className="steel">More people, three more trucks and more material than a 2,000 SF building was leased to hold.</p></div>
          <div className="stages" style={{ marginBottom: 0 }}>
            {scenario.pressure.map((p) => (<div key={p.name}><h3>{p.name}</h3><p>{p.text}</p></div>))}
          </div>
        </div>

        {/* 03 The Flight Sheet */}
        <div className="journey grid2">
          <div className="gap-s">
            <p className="mono brass">03 The Flight Sheet</p>
            <h3>First question: does the growth pencil?</h3>
            <p>A 600-unit project is not automatically a profitable one. Before any technology is prescribed, BullNet sits down with the owner and writes a Growth Flight Sheet: what the project requires, what the business can support today, where the gaps are, and whether the timing works. The office is designed around the gaps.</p>
            <p className="steel">The Flight Sheet works from the contractor’s own documents and numbers. It is decision support, reviewed by the owner and his advisers. It is not financial, legal or tax advice.</p>
          </div>
          <div className="panel">
            <div className="ph mono"><span>Growth Flight Sheet</span><span className="brass">Illustrative</span></div>
            <div className="pb"><dl className="kv">
              {scenario.flightSheet.map((f) => (<div key={f.q} style={{ display: 'contents' }}><dt>{f.q}</dt><dd>{f.a}</dd></div>))}
            </dl></div>
          </div>
        </div>

        {/* 04 The office */}
        <div className="journey">
          <div className="gap-s"><p className="mono brass">04 The office</p><h3>Explore the office we’re building.</h3>
            <p className="steel">Seven desks, each supported by specialized agents, working as one office. Every desk shows the need, what the agent supports and what a person approves.</p></div>
          {/* Wide screens: one desk at a time. */}
          <div className="desks-tabs gap">
            <Picker label="Office desks" value={i} onChange={setI} items={scenario.desks.map((x) => x.name)} />
            <div className="panel">
              <div className="ph mono"><span>{d.name} desk</span><span>Built to suit</span></div>
              <div className="pb" aria-live="polite"><DeskDetail d={d} /></div>
            </div>
          </div>
          {/* Small screens: an accordion, one section per desk. */}
          <div className="desks-acc">
            {scenario.desks.map((x, k) => (
              <details key={x.name} open={k === 0}>
                <summary><span className="mono brass">0{k + 1}</span>{x.name} desk</summary>
                <div className="pb"><DeskDetail d={x} /></div>
              </details>
            ))}
          </div>
        </div>

        {/* What using the office looks like. A concept, labelled as one. */}
        <figure className="ws" aria-label="Illustrative example of an owner asking the Hiring desk a question in the private AI office">
          <div className="ph mono"><span>Private AI Office / workspace concept</span><span className="brass">Illustrative</span></div>
          <div className="ws-body">
            <ul className="ws-nav mono" aria-label="Channels">
              {w.channels.map((ch) => (<li key={ch} className={ch === w.active ? 'on' : undefined} aria-current={ch === w.active ? 'true' : undefined}>{ch}</li>))}
            </ul>
            <div className="ws-thread">
              <div className="ws-msg"><p className="mono ws-who">Owner</p><p>{w.ask}</p></div>
              <div className="ws-msg agent"><p className="mono ws-who">Hiring desk <span className="tag">Agent</span></p>
                <ul>{w.reply.map((r) => (<li key={r}>{r}</li>))}</ul>
                <p className="ws-wait mono">{w.waiting}</p></div>
            </div>
          </div>
          <figcaption>Illustrative concept of the office workspace. It is not a screenshot, a live product screen or a customer conversation.</figcaption>
        </figure>
        <p className="ws-line">One approved project record. Specialized agents. Connected workflows. Human authority.</p>
        <p className="steel">Proposed system architecture. It describes how the office is designed to work, not a production integration.</p>

        {/* 05 Human authority, 06 Infrastructure, 07 Built to suit */}
        <div className="journey stages" style={{ marginBottom: 0 }}>
          <div>
            <span className="mono brass">05 Human authority</span>
            <h3>People stay in control.</h3>
            <p>Hiring, spending, commitments and execution stay with people. Agents organize, track, draft and flag. A person decides, signs and sends.</p>
          </div>
          <div>
            <span className="mono brass">06 Infrastructure</span>
            <h3>Where it runs.</h3>
            <p>The office runs on private compute that BullNet hosts and operates. If he wants the work on site, a <a href="#node">BullNet Node</a> in his own building is an option, not a requirement.</p>
          </div>
          <div>
            <span className="mono brass">07 Built to suit</span>
            <h3>It changes when he does.</h3>
            <p>BullNet designs the office, operates it, and adjusts it as the job and the business change. One desk at a time, beside the way he already works.</p>
          </div>
        </div>

        <p className="note" style={{ marginTop: 'clamp(24px,3vw,40px)' }}>One business. Multiple challenges. One private AI office.</p>
        <p className="steel" style={{ marginTop: 18 }}>
          <span className="tag b">Fictional scenario</span> This company is made up. It is not a client, and no results are claimed. Desks and capabilities are illustrative. Agents do not perform licensed professional services or commit the company to anything.
        </p>

        <div className="convert">
          <h3>Your next move starts with a Flight Sheet.</h3>
          <p>Tell us what your business is working through. The people, the equipment, the facilities, the information, and the decisions. We’ll define the assignment, examine what pencils, and determine whether a private AI office makes sense.</p>
          <div className="cta"><a className="btn" href="#flight-sheet">Start Your Flight Sheet</a></div>
        </div>
      </div>
    </section>
  );
}
