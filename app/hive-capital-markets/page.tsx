import type { Metadata } from 'next';
import Link from 'next/link';
import { Nav } from '@/components/Nav';
import { Footer } from '@/components/Footer';
import { EquipmentPencil } from '@/components/capital/EquipmentPencil';

const DESCRIPTION =
  'Hive Capital Markets is the capital desk of BullNet. Acquisition math, financing scenarios and operator intelligence for equipment, trucks, machinery and GPU infrastructure.';

export const metadata: Metadata = {
  title: 'Hive Capital Markets: Equipment Acquisition Math',
  description: DESCRIPTION,
  alternates: { canonical: '/hive-capital-markets/' },
  openGraph: { title: 'Hive Capital Markets by BullNet', description: DESCRIPTION, url: '/hive-capital-markets/', type: 'website' },
};

const ROWS = [
  { n: 'Acquire', t: 'Equipment, trucks, trailers, machinery and GPU infrastructure.' },
  { n: 'Pencil', t: 'Scenario math, debt service, utilization and terms.' },
  { n: 'Build', t: 'A private AI office around the asset: workflows, operators and infrastructure.' },
];

const STEPS = [
  { n: 'Send the deal', t: 'What you are buying, the price, and what it earns. General terms only. No documents yet.' },
  { n: 'We pencil it', t: 'Payment, coverage, break-even utilization and the scenarios that break it.' },
  { n: 'We package it', t: 'A lender-ready summary with every figure traced to a source or a test, and introductions to lenders where they fit.' },
  { n: 'You decide', t: 'The lender sets the terms. You decide whether to take them.' },
];

export default function HiveCapitalMarkets() {
  return (
    <>
      <Nav />
      <main>
        <section className="drophead">
          <div className="wrap gap">
            <p className="desk">
              <svg width="44" height="44" viewBox="32 44 420 420" style={{ color: 'var(--platinum)' }} aria-hidden="true"><use href="#mark" /></svg>
              <span><strong>Hive Capital Markets</strong><span className="mono steel">by BullNet</span></span>
            </p>
            <p className="idx mono"><b>Equipment acquisition</b></p>
            <h1>Equipment acquisition.<br />Let&rsquo;s pencil it.</h1>
            <p className="hero-tag">Leverage the private AI office.</p>
            <p className="lede">Acquisition math, financing scenarios and operator intelligence for equipment, hardware and productive assets.</p>
            <div className="cta"><a className="btn" href="#pencil">Pencil a deal</a><Link className="btn ghost" href="/#flight-sheet">Send us the deal</Link></div>
          </div>
        </section>

        <section>
          <div className="wrap gap">
            <ul className="desk-rows">
              {ROWS.map((r) => (<li key={r.n}><h2>{r.n}</h2><p>{r.t}</p></li>))}
            </ul>
            <p className="pull">We build the intelligence behind the asset.</p>
          </div>
        </section>

        <section id="pencil">
          <div className="wrap">
            <header className="sh">
              <p className="idx mono"><b>Pencil it</b> Does the machine pay for itself?</p>
              <h2>A payment is a fact.<br />Utilization is an assumption.</h2>
              <p className="lede">Enter the price, your quoted terms and what the asset earns. The check shows whether it covers its own payment and how busy it has to be to break even.</p>
            </header>
            <EquipmentPencil />
          </div>
        </section>

        <section>
          <div className="wrap">
            <header className="sh">
              <p className="idx mono"><b>How it works</b></p>
              <h2>From a phone call to a package.</h2>
            </header>
            <ol className="probs">
              {STEPS.map((s, i) => (<li key={s.n}><span className="mono steel">0{i + 1}</span><h3>{s.n}</h3><p>{s.t}</p></li>))}
            </ol>
          </div>
        </section>

        <section className="final">
          <div className="wrap gap">
            <p className="idx mono"><b>Start</b></p>
            <h2>Bring the deal. We&rsquo;ll bring the pencil.</h2>
            <div className="cta"><Link className="btn" href="/#flight-sheet">Send us the deal</Link><Link className="btn ghost" href="/does-it-pencil/">Read Does It Pencil?</Link></div>
            <ul className="contact mono" aria-label="Contact">
              <li><span className="steel">Email</span> <a href="mailto:build@bullnet.ai">build@bullnet.ai</a></li>
              <li><span className="steel">Phone</span> <a href="tel:+15615327120">561.532.7120</a></li>
            </ul>
            <p className="steel" style={{ fontSize: '.86rem' }}>
              Hive Capital Markets is a desk of BullNet. BullNet is not a lender and does not make credit decisions. Any financing is provided by third-party lenders on their own terms and is subject to their approval. Nothing on this page is a loan offer, a commitment to lend, a rate quote, or financial, tax or legal advice.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
