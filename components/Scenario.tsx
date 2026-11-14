'use client';

import { useState } from 'react';
import { scenario } from '@/content/scenario';
import { Picker } from '@/components/Picker';

/** An illustrative operating company and the office built for it. Not a client and not a case study. */
export function Scenario() {
  const [i, setI] = useState(0);
  const n = scenario.needs[i];
  return (
    <section id="example">
      <div className="wrap">
        <header className="sh">
          <p className="idx mono"><b>Example</b> Illustrative scenario</p>
          <h2>Growth has requirements.</h2>
          <p className="lede">
            An electrical contractor. Fifteen employees, five years in, a good name in one county. He has just won a 600-unit new construction job for a national developer. It is the biggest commitment he has ever made, and he still has a residential business to keep. His head is spinning.
          </p>
        </header>
        <div className="tiles" aria-label="The company">
          {scenario.facts.map((f) => (
            <div key={f.label}><strong>{f.value}</strong><span className="mono steel">{f.label}</span><span className="steel" style={{ fontSize: '.86rem' }}>{f.note}</span></div>
          ))}
        </div>
        <div className="grid2" style={{ marginTop: 'clamp(28px,4vw,48px)' }}>
          <div className="gap-s">
            <h3>What he needs</h3>
            <Picker className="stack" label="What the contractor needs" value={i} onChange={setI} items={scenario.needs.map((x, k) => (<><span>0{k + 1}</span><span>{x.need}</span></>))} />
          </div>
          <div className="gap">
            <div className="panel">
              <div className="ph mono"><span>What we build</span><span>Built to suit</span></div>
              <div className="pb gap-s" aria-live="polite">
                <h3 style={{ fontSize: '1.5rem' }}>{n.build}</h3>
                <dl className="kv">
                  <dt>The need</dt><dd>{n.need}</dd>
                  <dt>What it does</dt><dd>{n.does}</dd>
                  <dt>Final approval</dt><dd style={{ color: 'var(--platinum)' }}>{n.human}</dd>
                </dl>
              </div>
            </div>
            <p className="note">
              Eight needs, eight agents, one office. We build them, fit them into how he already works, and stay to manage, fix and adjust them. If he needs more, they run on compute we own. If he wants it on site, a Node in his office is an option.
            </p>
          </div>
        </div>
        <p className="steel" style={{ marginTop: 18, fontSize: '.88rem' }}>
          <span className="tag b">Illustrative scenario</span> This company is made up. It is not a client, and no results are claimed. It shows the kind of office BullNet builds.
        </p>
      </div>
    </section>
  );
}
