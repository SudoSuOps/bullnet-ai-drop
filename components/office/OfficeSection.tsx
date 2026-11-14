'use client';

import { useState } from 'react';
import { office } from '@/content/office';
import { Picker } from '@/components/Picker';

type Moment = (typeof office.moments)[number];

/**
 * One moment in the day, drawn as a private office conversation: the person asking, the agent preparing the work,
 * the supporting evidence and any exception, and what needs a person's approval. An illustrative concept, not a screenshot.
 */
function MomentDetail({ m }: { m: Moment }) {
  const role = m.who.replace('The ', '');
  const person = role.charAt(0).toUpperCase() + role.slice(1);
  return (
    <div className="grid2 moment">
      <figure className={m.phone ? 'ws chat phone' : 'ws chat'} aria-label={`Illustrative conversation: ${m.who.toLowerCase()} asks the ${m.desk} a question`}>
        <div className="ph mono"><span># {m.channel}</span><span className="brass">Illustrative</span></div>
        <ol className="chat-thread">
          <li className="chat-msg">
            <span className="av" aria-hidden="true">{m.initials}</span>
            <div><p className="chat-who"><strong>{person}</strong><span className="mono">{m.time}</span></p>
              <p>{m.ask}</p></div>
          </li>
          <li className="chat-status mono"><span className="dot" aria-hidden="true" />{m.desk} is preparing: {m.preparing}</li>
          <li className="chat-msg agent">
            <span className="av" aria-hidden="true">AI</span>
            <div><p className="chat-who"><strong>{m.desk}</strong><span className="tag">Agent</span></p>
              <ul className="chat-list">{m.reply.map((r) => (<li key={r}>{r}</li>))}</ul>
              <div className="chat-block"><p className="chat-label mono">Supporting evidence</p>
                <ul className="chips">{m.sources.map((x) => (<li key={x}>{x}</li>))}</ul></div>
              <div className="chat-block exc"><p className="chat-label mono">Exception</p><p>{m.gap}</p></div>
              <div className="chat-block appr"><p className="chat-label mono">Needs human approval</p><p>{m.approval}</p></div>
            </div>
          </li>
        </ol>
        <figcaption>Illustrative interface concept. Not a screenshot.</figcaption>
      </figure>
      <dl className="kv">
        <dt>Who and where</dt><dd>{m.who}. {m.where}.</dd>
        <dt>The question</dt><dd>“{m.ask}”</dd>
        <dt>Agent-supported work</dt><dd>{m.work}</dd>
        <dt>Evidence and gaps</dt><dd>{m.evidence}</dd>
        <dt className="approve">Human authority</dt><dd className="approve">{m.human}</dd>
      </dl>
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
          <div className="panel cos"><div className="ph mono"><span>06 Chief of Staff</span><span className="tag b big">Proposed</span></div>
            <div className="pb gap-s">
              <h3>A second set of eyes.</h3>
              <p>Before a piece of work reaches you, a second reviewer can check it. The Chief of Staff is a review agent that looks over what the other agents prepared, points out anything missing or unsupported, and flags it for a person.</p>
              <p className="approve-line">It reviews and advises. People make the decisions.</p>
              <p className="steel">Proposed. We are testing it in BullNet’s own office, and it is not yet available to customers.</p>
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
