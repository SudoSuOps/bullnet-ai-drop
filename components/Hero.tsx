import { HeroNet } from '@/components/HeroNet';

export function Hero() {
  return (
    <section className="hero">
      <div className="wrap hero-head">
        <p className="mono brass">Build-to-Suit Private AI Offices / Owned Compute / Human Final Approval</p>
        <h1>Your private<br />AI <em>office.</em></h1>
        <p className="hero-tag">Your data. Your intelligence. Your next move.</p>
      </div>
      <div className="wrap hero-body">
        <div className="copy">
          <p className="lede">BullNet builds private AI offices to suit, for small and mid-size companies that run on real estate and equipment. We custom-build the agents, organize the data, manage the infrastructure and pencil the equipment. A person gives final approval on every decision. It is built on thirty years in the middle of commercial real estate transactions.</p>
          <div className="cred" aria-label="Founder track record">
            <div><strong>~30 yrs</strong><span className="mono steel">CRE transactions</span></div>
            <div><strong>~$8B</strong><span className="mono steel">Historical volume closed</span></div>
            <div><strong>National</strong><span className="mono steel">Industrial and capital markets</span></div>
          </div>
          <p className="mono steel" style={{ textTransform: 'none', letterSpacing: '.02em' }}>Figures are the founder's approximate historical record in commercial real estate, before BullNet. They are not BullNet transactions and are not independently audited.</p>
          <div className="cta"><a className="btn" href="#flight-sheet">Initiate a Flight Sheet</a><a className="btn ghost" href="#system">Explore the architecture</a></div>
        </div>
        <figure className="viz" aria-label="Intelligence network with the Node appliance concept">
          <HeroNet />
          <span className="cap mono">FIG. 01 / EDGE TOPOLOGY</span>
          <svg className="mark" style={{ color: 'var(--platinum)' }} viewBox="32 44 420 420" aria-hidden="true"><use href="#mark"/></svg>
      
          <svg className="unit dg" viewBox="0 0 360 96" aria-hidden="true">
            <rect x="1" y="8" width="358" height="72" fill="#10161d" stroke="#4a4a50"/>
            <g stroke="#4a4a50"><path d="M18 22v44M26 22v44M34 22v44M42 22v44M50 22v44M58 22v44M66 22v44M74 22v44M82 22v44M90 22v44M98 22v44M106 22v44"/></g>
        
            <g><rect x="250" y="28" width="6" height="6" fill="#8ED13B"/><text x="264" y="34">INFERENCE</text><rect x="250" y="42" width="6" height="6" fill="#8ED13B"/><text x="264" y="48">VALIDATION</text><rect x="250" y="56" width="6" height="6" fill="#84909C"/><text x="264" y="62">EXT. LINK</text></g>
            <rect x="24" y="80" width="40" height="5" fill="#4a4a50"/><rect x="296" y="80" width="40" height="5" fill="#4a4a50"/>
          </svg>
          <span className="cap2 mono">NODE / DESIGN CONCEPT</span>
        </figure>
      </div>
    </section>
  );
}
