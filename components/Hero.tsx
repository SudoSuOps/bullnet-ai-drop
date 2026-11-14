import { HeroNet } from '@/components/HeroNet';

export function Hero() {
  return (
    <section className="hero">
      <div className="wrap hero-head">
        <p className="mono brass">BullNet.ai — Private AI Offices</p>
        <h1>Your business.<br />Your data.<br />Your private AI <em>office.</em></h1>
        <p className="hero-tag">Built to suit. Operated with purpose.</p>
      </div>
      <div className="wrap hero-body">
        <div className="copy">
          <p className="lede">BullNet builds private AI offices for businesses that depend on real estate, equipment, and informed decisions.</p>
          <p className="lede">We bring together specialized AI agents, business data, and private computing infrastructure to help you understand your operations, evaluate opportunities, and make better-informed decisions.</p>
          <p className="lede" style={{ color: 'var(--platinum)' }}>Your intelligence stays under your control. Your decisions stay yours.</p>
          <p className="mono steel">Founded on 30 years of commercial real estate transaction experience.</p>
          <div className="cta"><a className="btn" href="#flight-sheet">Initiate a Flight Sheet</a><a className="btn ghost" href="#example">See an example build</a></div>
        </div>
        <figure className="viz" aria-label="The BullNet mark over a network of connected points">
          <HeroNet />
          <svg className="mark" style={{ color: 'var(--platinum)' }} viewBox="32 44 420 420" aria-hidden="true"><use href="#mark"/></svg>
      
        </figure>
      </div>
    </section>
  );
}
