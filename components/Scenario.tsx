'use client';

import { useState } from 'react';
import { scenario } from '@/content/scenario';
import { Picker } from '@/components/Picker';

type Desk = (typeof scenario.desks)[number];

function DeskDetail({ d }: { d: Desk }) {
  return (
    <dl className="kv">
      <dt>The business need</dt><dd>{d.need}</dd>
      <dt>What the AI supports</dt><dd>{d.supports}</dd>
      <dt>Human authority</dt><dd style={{ color: 'var(--platinum)' }}>{d.human}</dd>
    </dl>
  );
}

/** A fictional operating company and the office built for it. Not a client and not a case study. */
export function Scenario() {
  const [i, setI] = useState(0);
  const d = scenario.desks[i];
  const photo = scenario.photo;
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
            <p className="pull" style={{ maxWidth: '20ch' }}>One contract. A different-sized business.</p>
            <p><span className="mono brass">01 The opportunity</span><br />An electrical contractor in Palm Beach County. Fifteen employees, five years in, a good name in one county. He has just been awarded the electrical work on a 600-unit development. It is the biggest commitment the company has ever made.</p>
          </div>
        </div>
        <div className="tiles" aria-label="The company and the job" style={{ marginTop: 'clamp(24px,3vw,40px)' }}>
          {scenario.facts.map((f) => (
            <div key={f.label}><strong>{f.value}</strong><span className="mono steel">{f.label}</span><span className="steel" style={{ fontSize: '.86rem' }}>{f.note}</span></div>
          ))}
        </div>

        {/* 02 The pressure */}
        <div className="journey">
          <div className="gap-s"><p className="mono brass">02 The pressure</p><h3>The contract is signed. Now everything else has to grow.</h3></div>
          <div className="stages" style={{ marginBottom: 0 }}>
            {scenario.pressure.map((p) => (<div key={p.name}><h3>{p.name}</h3><p>{p.text}</p></div>))}
          </div>
        </div>

        {/* 03 The Flight Sheet */}
        <div className="journey grid2">
          <div className="gap-s">
            <p className="mono brass">03 The Flight Sheet</p>
            <h3>First question: does the growth pencil?</h3>
            <p>A 600-unit contract is not automatically a profitable one. Before any technology is prescribed, BullNet sits down with the owner and writes a Growth Flight Sheet: what the commitment requires, what the business can support today, and where the gaps are. The office is designed around the gaps.</p>
            <p className="steel" style={{ fontSize: '.88rem' }}>The Flight Sheet works from the contractor’s own documents and numbers. It is decision support, reviewed by the owner and his advisers. It is not financial, legal or tax advice.</p>
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
            <p className="steel">Seven desks, each supported by specialized agents, working as one office.</p></div>
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
        <p className="steel" style={{ marginTop: 18, fontSize: '.88rem' }}>
          <span className="tag b">Fictional scenario</span> This company is made up. It is not a client, and no results are claimed. Desks and capabilities are illustrative. Agents do not perform licensed professional services or commit the company to anything.
        </p>
      </div>
    </section>
  );
}
