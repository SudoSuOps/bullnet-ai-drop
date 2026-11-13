'use client';

import { useState } from 'react';
import { site } from '@/content/site';
import { Picker } from '@/components/Picker';
import { ExpertisePlate } from '@/components/ExpertisePlate';

export function Expertise() {
  const [i, setI] = useState(0);
  const e = site.exp[i];
  return (
    <section id="expertise">
      <div className="wrap">
        <header className="sh"><p className="idx mono"><b>09</b> Industry expertise</p>
          <h2>Five practices.<br />One operating discipline.</h2></header>
        <div className="exp">
          <Picker className="stack" label="Practice areas" value={i} onChange={setI} items={site.exp.map((x, n) => (<><span>0{n + 1}</span><span>{x.n}</span></>))} />
          <div aria-live="polite">
    <div className="plate"><ExpertisePlate k={e.k} label={e.n} /></div>
    <h3 style={{ fontSize: '1.6rem' }}>{e.n}</h3>
    <p className="lede" style={{ marginTop: 8 }}>{e.l}</p>
    <ul className="b">{e.b.map((x) => (<li key={x}>{x}</li>))}</ul>
    </div>
        </div>
      </div>
    </section>
  );
}
