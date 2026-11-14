'use client';

import { useState } from 'react';
import { site } from '@/content/site';

export function VaultSection() {
  const steps = site.vault;
  const [s, setS] = useState(0);
  const step = steps[s];
  const last = s === steps.length - 1;
  return (
    <section id="vault">
      <div className="wrap">
        <header className="sh"><p className="idx mono"><b>10</b> The Vault</p>
          <h2>The NDA is not a suggestion.</h2>
          <p className="lede">The Vault is a proposed policy and authorization framework that governs how confidential client information is processed. Follow one confidential asset evaluation through it.</p></header>
        <div className="grid2">
          <div className="panel"><div className="ph mono"><span>FIG. 10 / Trust boundary</span><span>Step 0{s + 1} of 0{steps.length}</span></div>
            <div className="pb scroll"><svg className="dg" viewBox="0 0 760 290" style={{ minWidth: '640px', width: '100%' }} role="img" aria-label="Trust boundary diagram. Public and licensed information and client private data sit outside an authorization gate. Agent processing, local analytical work and verified work products sit inside a governed environment. External transfers are denied by default.">
              <g><rect className="bx" x="16" y="24" width="150" height="48"/><text className="t1" x="28" y="45">PUBLIC INTELLIGENCE</text><text x="28" y="61">open sources</text></g>
              <g><rect className="bx" x="16" y="92" width="150" height="48"/><text className="t1" x="28" y="113">LICENSED INFORMATION</text><text x="28" y="129">per licence terms</text></g>
              <g><rect className="bx" x="16" y="190" width="150" height="60" style={{ stroke: 'var(--brass)' }}/><text className="t1" x="28" y="213">CLIENT PRIVATE DATA</text><text x="28" y="229">client-owned</text><text x="28" y="243">confidential</text></g>
              <rect x="196" y="16" width="20" height="246" fill="#1b1f24" stroke="var(--brass)"/><text transform="translate(210 232) rotate(-90)" style={{ fill: 'var(--brass)' }}>AUTHORIZATION GATE</text>
              <rect className="zone" x="240" y="16" width="372" height="246"/><text x="252" y="34" style={{ fill: 'var(--brass)' }}>GOVERNED ENVIRONMENT</text>
              <g><rect className="bx" x="262" y="52" width="160" height="64"/><text className="t1" x="274" y="76">AUTHORIZED AGENT</text><text className="t1" x="274" y="91">PROCESSING</text><text x="274" y="106">mandate-scoped</text></g>
              <g><rect className="bx" x="262" y="156" width="160" height="64"/><text className="t1" x="274" y="180">LOCAL ANALYTICAL</text><text className="t1" x="274" y="195">WORK</text><text x="274" y="210">logged</text></g>
              <g><rect className="bx" x="446" y="104" width="150" height="64"/><text className="t1" x="458" y="128">VERIFIED WORK</text><text className="t1" x="458" y="143">PRODUCTS</text><text x="458" y="158">tested, reviewed</text></g>
              <g><rect className="bx" x="636" y="104" width="108" height="64" style={{ strokeDasharray: '3 3' }}/><text className="t1" x="646" y="128">EXTERNAL</text><text className="t1" x="646" y="143">TRANSFERS</text><text x="646" y="158" style={{ fill: 'var(--fail)' }}>default: deny</text></g>
              <path className="ar" d="M166 48H196M166 116H196M166 220H196M216 84H262M342 116V156M422 188H434V136H446M596 136H636"/>
              <g id="pkt" transform={`translate(${step.at[0]} ${step.at[1]})`}><rect x="-7" y="-7" width="14" height="14" fill="var(--lime)" transform="rotate(45)"/></g>
            </svg></div>
            <div className="pb" style={{ borderTop: '1px solid var(--line)', display: 'flex', gap: '10px', flexWrap: 'wrap' }}><button className="btn ghost sm" type="button" disabled={s === 0} onClick={() => setS(s - 1)}>Previous</button><button className="btn sm" type="button" onClick={() => setS(last ? 0 : s + 1)}>{last ? 'Restart' : 'Next step'}</button></div>
          </div>
          <div className="gap"><ol className="steps">{steps.map((v, i) => (<li key={v.title}><button type="button" aria-current={i === s ? 'step' : undefined} onClick={() => setS(i)}>{v.title}</button></li>))}</ol><p className="note" aria-live="polite">{step.text}</p></div>
        </div>
        <div className="three" style={{ marginTop: '36px' }}>
          <div><span className="mono brass">Contract</span><h3>What you signed</h3><p>The NDA and engagement agreement state obligations. They create duties. They do not, by themselves, stop a file from moving.</p></div>
          <div><span className="mono brass">Technical policy</span><h3>What the system enforces</h3><p>Classification, role and attribute permissions, restricted agent access, transfer controls, key management, retention, deletion and access logging.</p></div>
          <div><span className="mono brass">Legal custody</span><h3>Who holds the data</h3><p>Set per engagement and written into the custody and processing model. The Vault is not a regulated escrow service.</p></div>
        </div>
        <p className="steel" style={{ marginTop: '18px', fontSize: '.88rem' }}><span className="tag b">Proposed capability</span> Controls shown here are a design framework. Each one is confirmed, implemented and tested per deployment before it is relied on.</p>
      </div>
    </section>
  );
}
