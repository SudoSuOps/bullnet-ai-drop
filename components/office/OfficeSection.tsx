'use client';

import { useState } from 'react';
import { office } from '@/content/office';
import { Picker } from '@/components/Picker';

type Moment = (typeof office.moments)[number];

/** One moment in the day: the question, the agent-supported work, the evidence or gaps, and who decides. */
function MomentDetail({ m }: { m: Moment }) {
  return (
    <div className="grid2">
      <dl className="kv">
        <dt>Who and where</dt><dd>{m.who}. {m.where}.</dd>
        <dt>The question</dt><dd>“{m.ask}”</dd>
        <dt>Agent-supported work</dt><dd>{m.work}</dd>
        <dt>Evidence and gaps</dt><dd>{m.evidence}</dd>
        <dt className="approve">Human authority</dt><dd className="approve">{m.human}</dd>
      </dl>
      <figure className={m.phone ? 'ws phone' : 'ws'} aria-label={`Illustrative example: ${m.who.toLowerCase()} asks the ${m.desk} a question`}>
        <div className="ph mono"><span># {m.channel}</span><span className="brass">Illustrative</span></div>
        <div className="ws-thread">
          <div className="ws-msg"><p className="mono ws-who">{m.who.replace('The ', '')}</p><p>{m.ask}</p></div>
          <div className="ws-msg agent"><p className="mono ws-who">{m.desk} <span className="tag">Agent</span></p>
            <ul>{m.reply.map((r) => (<li key={r}>{r}</li>))}</ul>
            <p className="ws-gap"><span className="mono">Gap</span> {m.gap}</p>
            <p className="ws-wait mono">{m.waiting}</p></div>
        </div>
        <figcaption>Illustrative interface concept. Not a screenshot.</figcaption>
      </figure>
    </div>
  );
}

/** The Private AI Office: the premises. The customer-facing workspace where people and approved agents work. */
export function OfficeSection() {
  const [i, setI] = useState(0);
  const m = office.moments[i];
  return (
    <section id="office">
      <div className="wrap">
        {/* 01 The office */}
        <header className="sh"><p className="idx mono"><b>04</b> The Private AI Office</p>
          <h2>Your people. Your agents.<br />One private office.</h2></header>
        <div className="grid2 journey-open">
          <figure className="shot">
            <img src="/assets/office/owner-in-truck.webp" alt="A contractor sits in the cab of his pickup at sunrise, reading his phone, with a hard hat on the dash, rolled drawings on the seat and a steel-framed building going up behind him" width={1600} height={900} loading="lazy" decoding="async" />
            <figcaption className="mono steel">Illustrative image. Not a client.</figcaption>
          </figure>
          <div className="gap">
            <p className="lede">The BullNet Private AI Office gives your team one place to work with the AI agents built for your business.</p>
            <p className="lede">Ask questions, organize projects, prepare reports, and review the work. Each agent has a defined responsibility and access to information you authorize.</p>
            <p className="lede">BullNet builds the environment, connects the right computing resources, and stays to operate and improve it.</p>
            <p className="lede" style={{ color: 'var(--platinum)' }}>The agents do the legwork. Your people make the calls.</p>
          </div>
        </div>
        <p className="pull" style={{ maxWidth: '26ch', marginTop: 'clamp(28px,4vw,48px)' }}>The office is what you get. Everything else is how we deliver it.</p>

        {/* 02 What you receive */}
        <div className="journey">
          <div className="gap-s"><p className="mono brass">02 What you receive</p><h3>Five things, in one office.</h3></div>
          <div className="stages" style={{ marginBottom: 0 }}>
            {office.receive.map((x) => (<div key={x.name}><h3>{x.name}</h3><p>{x.text}</p></div>))}
          </div>
        </div>

        {/* 03 A day in the office */}
        <div className="journey">
          <div className="gap-s"><p className="mono brass">03 A day in the office</p><h3>Three moments in a contractor’s day.</h3>
            <p>The electrical contractor from our example, a few weeks into the 600-unit project. Each moment shows the question, the work an agent supports, the evidence or gaps, and who decides.</p></div>
          {/* Wide screens: one moment at a time. */}
          <div className="desks-tabs gap">
            <Picker label="Moments in the day" value={i} onChange={setI} items={office.moments.map((x) => (<>{x.time} · {x.who.replace('The ', '')}</>))} />
            <div aria-live="polite"><MomentDetail m={m} /></div>
          </div>
          {/* Small screens: an accordion, one section per moment. */}
          <div className="desks-acc">
            {office.moments.map((x, k) => (
              <details key={x.time} open={k === 0}>
                <summary><span className="mono brass">{x.time}</span>{x.who}</summary>
                <div className="pb"><MomentDetail m={x} /></div>
              </details>
            ))}
          </div>
          <p className="steel"><span className="tag b">Illustrative scenario</span> A fictional company. It is not a client, and no results are claimed. What an office can do depends on the configured and verified system.</p>
        </div>

        {/* 04 People and agents */}
        <div className="journey">
          <div className="gap-s"><p className="mono brass">04 People and agents</p><h3>How the work moves.</h3></div>
          <div className="stages" style={{ marginBottom: 0 }}>
            {office.together.map((x, k) => (<div key={x.name}><span className="mono brass">0{k + 1}</span><h3>{x.name}</h3><p>{x.text}</p></div>))}
          </div>
          <p className="note">Every office is staffed differently. There is no standard list of agents. The desks in this example are one fictional configuration; yours is designed around what your business needs.</p>
        </div>

        {/* 05 Your information */}
        <div className="journey">
          <div className="gap-s"><p className="mono brass">05 Your information</p><h3>You decide what the office can see and do.</h3></div>
          <div className="stages" style={{ marginBottom: 0 }}>
            {office.control.map((x) => (<div key={x.name}><h3>{x.name}</h3><p>{x.text}</p></div>))}
          </div>
          <p className="steel"><span className="tag b">Proposed capability</span> These controls are designed for each office and tested before they are relied on.</p>
        </div>

        {/* 06 Chief of Staff */}
        <div className="journey">
          <div className="panel"><div className="ph mono"><span>06 Chief of Staff</span><span className="brass">Proposed</span></div>
            <div className="pb gap-s">
              <h3>A second set of eyes.</h3>
              <p>Some offices will have a Chief of Staff: a senior review agent built on a separate model from the agents whose work it checks. Its intended role is to review agent work against the assignment, identify missing evidence and escalate exceptions to a person.</p>
              <p className="approve-line">It advises and reviews. It does not make final business decisions.</p>
              <p className="steel">Proposed capability, being tested in BullNet’s own office. It is not available as a production feature.</p>
            </div></div>
        </div>

        {/* 07 Where it runs */}
        <div className="journey">
          <div className="gap-s"><p className="mono brass">07 Where it runs</p><h3>One office. The work runs where you choose.</h3></div>
          <ol className="flow" aria-label="How the office connects to compute">
            <li><span className="mono brass">You</span><strong>Your people</strong><span>At a desk or on a phone</span></li>
            <li className="on"><span className="mono brass">The office</span><strong>Private AI Office</strong><span>Where questions, work and approvals meet</span></li>
            <li><span className="mono brass">The work</span><strong>A Node on site, BullNet Infrastructure, or both</strong><span>Chosen for each job and written on the Flight Sheet</span></li>
          </ol>
          <p>The office looks the same wherever the work runs. A Node in your building is optional. <a href="#node">See the Node</a>.</p>
        </div>

        {/* 08 What BullNet does */}
        <div className="journey">
          <div className="gap-s"><p className="mono brass">08 What BullNet does</p><h3>We build it, and we stay.</h3></div>
          <div className="stages" style={{ marginBottom: 0 }}>
            {office.bullnet.map((x) => (<div key={x.name}><h3>{x.name}</h3><p>{x.text}</p></div>))}
          </div>
          <div className="panel"><div className="ph mono"><span>What stands behind this page</span><span>Evidence</span></div>
            <div className="pb"><dl className="kv">
              {office.basis.map((x) => (<div key={x.name} style={{ display: 'contents' }}><dt>{x.name}</dt><dd>{x.text}</dd></div>))}
            </dl></div></div>
        </div>

        <div className="convert">
          <h3>What would your office look like?</h3>
          <p>Tell us how your business runs and what you are working through. The Flight Sheet defines the assignment before anything is built.</p>
          <div className="cta"><a className="btn" href="#flight-sheet">Start Your Flight Sheet</a></div>
        </div>
      </div>
    </section>
  );
}
