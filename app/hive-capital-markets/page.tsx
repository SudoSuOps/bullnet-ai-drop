import type { Metadata } from 'next';
import Link from 'next/link';
import { Nav } from '@/components/Nav';
import { Footer } from '@/components/Footer';
import { Founder } from '@/components/Founder';
import { EquipmentPencil } from '@/components/capital/EquipmentPencil';
import { HiveIntake } from '@/components/hive/HiveIntake';
import { dollars } from '@/lib/equipment';
import { EQUIPMENT_CATEGORIES } from '@/lib/hive-intake';
import {
  CRE_DOMAINS, CRE_SERVICES, CRE_SNAPSHOT, DECISIONS, EQUIPMENT_SNAPSHOTS, LABELS, OFFICE_STEPS, SAFEGUARDS,
  financed, fleetTotal, residual, rowCost,
} from '@/content/hive';

const DESCRIPTION =
  'Hive Capital Markets is the capital desk of BullNet. Commercial real estate intelligence and equipment acquisition analysis, supported by private AI research, financial analysis and experienced human review.';

export const metadata: Metadata = {
  title: 'Hive Capital Markets: CRE Intelligence and Equipment Finance',
  description: DESCRIPTION,
  alternates: { canonical: '/hive-capital-markets/' },
  openGraph: { title: 'Hive Capital Markets by BullNet', description: DESCRIPTION, url: '/hive-capital-markets/', type: 'website' },
};

const [truck, excavator, fleet] = EQUIPMENT_SNAPSHOTS;
const EXAMPLE = <span className="tag b">Illustrative example</span>;

export default function HiveCapitalMarkets() {
  return (
    <>
      <Nav />
      <main>
        {/* 1. Hero and founder credibility */}
        <section className="drophead hive-hero">
          <div className="wrap gap">
            <p className="desk">
              <svg width="44" height="44" viewBox="32 44 420 420" style={{ color: 'var(--platinum)' }} aria-hidden="true"><use href="#mark" /></svg>
              <span><strong>Hive Capital Markets</strong><span className="mono steel">by BullNet</span></span>
            </p>
            <h1>Capital intelligence.<br />Real-world decisions.</h1>
            <p className="hero-tag">Leverage the Private AI Office.</p>
            <p className="lede">Commercial real estate intelligence and equipment acquisition solutions supported by private AI research, financial analysis, and experienced human review.</p>
            <div className="cta"><a className="btn" href="#intake">Let&rsquo;s pencil it ✏️</a><a className="btn ghost" href="#equipment">Explore equipment financing</a></div>
            <p className="note">Founded on 30 years of commercial real estate transaction experience. <a href="#founder">The founder</a></p>
          </div>
        </section>

        {/* 2. Two service paths */}
        <section id="services">
          <div className="wrap">
            <header className="sh"><p className="idx mono"><b>02</b> Two service paths</p>
              <h2>The property.<br />The equipment inside it.</h2></header>
            <div className="paths">
              <article id="cre">
                <p className="mono steel">Path one</p>
                <h3>CRE intelligence</h3>
                <p>Research and financial analysis on a property, a market or a transaction, so the people making the decision can see the work behind the number.</p>
                <p className="mono steel">Where we work</p>
                <ul className="chips">{CRE_DOMAINS.map((d) => <li key={d}>{d}</li>)}</ul>
                <p className="mono steel">What we do</p>
                <ul className="chips">{CRE_SERVICES.map((d) => <li key={d}>{d}</li>)}</ul>
                <p className="note">This is intelligence and analysis. It is not brokerage representation: we do not list, market or negotiate property, and we do not represent buyers, sellers, landlords or tenants.</p>
                <div><a className="btn ghost sm" href="#intake-cre">Start a CRE intake</a></div>
              </article>
              <article>
                <p className="mono steel">Path two</p>
                <h3>Equipment finance</h3>
                <p>From commercial trucks to heavy machinery, evaluate acquisition costs, financing structures, cash-flow requirements, and equipment value before making a capital decision.</p>
                <p className="mono steel">What we pencil</p>
                <ul className="chips">{EQUIPMENT_CATEGORIES.map((d) => <li key={d}>{d}</li>)}</ul>
                <p className="note">BullNet is not a lender and does not make credit decisions. Any financing comes from a third-party lender, on its terms and subject to its approval.</p>
                <div><a className="btn ghost sm" href="#intake-equipment">Start an equipment intake</a></div>
              </article>
            </div>
          </div>
        </section>

        {/* 3. Client opportunity snapshots */}
        <section id="snapshots">
          <div className="wrap gap">
            <header className="sh"><p className="idx mono"><b>03</b> Opportunity snapshots</p>
              <h2>What the question looks like on paper.</h2>
              <p className="lede">Four examples of the questions a client brings. Every figure is hypothetical. None is a client, a completed engagement, a lender quote or an approval.</p></header>

            <div className="panel snap">
              <div className="ph mono"><span>CRE snapshot</span><span>Educational example</span></div>
              <div className="pb">
                {EXAMPLE}
                <h3>{CRE_SNAPSHOT.asset}</h3>
                <dl className="kv"><dt>Asset</dt><dd>{CRE_SNAPSHOT.asset}</dd><dt>Occupancy</dt><dd>{CRE_SNAPSHOT.occupancy}</dd></dl>
                <h4>Research questions</h4>
                <ul className="ck">{CRE_SNAPSHOT.questions.map((q) => <li key={q}>{q}</li>)}</ul>
                <p className="steel" style={{ fontSize: '.9rem' }}>No underwriting result is shown, because none was performed. The answers depend on a rent roll, operating statements and debt terms this example does not have.</p>
                <div><Link className="btn ghost sm" href={CRE_SNAPSHOT.workbench}>Work the assumptions yourself</Link></div>
              </div>
            </div>

            <div id="equipment" className="gap">
              <h2>Equipment acquisition.<br />Let&rsquo;s pencil it. ✏️</h2>
              <div className="snaps">
                <div className="panel snap">
                  <div className="ph mono"><span>Snapshot {truck.key}</span><span>Not a lender quote</span></div>
                  <div className="pb">
                    {EXAMPLE}
                    <h3>{truck.title}</h3>
                    <p>{truck.setup}</p>
                    <dl className="kv">
                      <dt>Purchase amount</dt><dd>{dollars(truck.price)}</dd>
                      <dt>Estimated down payment</dt><dd>{dollars(truck.price - financed(truck.price, truck.downPct))} ({truck.downPct}%)</dd>
                      <dt>Amount to finance</dt><dd>{dollars(financed(truck.price, truck.downPct))}</dd>
                      <dt>Requested term</dt><dd>{truck.termMonths} months</dd>
                      <dt>Financing type</dt><dd>{truck.structure}</dd>
                    </dl>
                    <h4>Document checklist</h4>
                    <ul className="ck">{truck.checklist.map((c) => <li key={c}>{c}</li>)}</ul>
                  </div>
                </div>

                <div className="panel snap">
                  <div className="ph mono"><span>Snapshot {excavator.key}</span><span>Not a lender quote</span></div>
                  <div className="pb">
                    {EXAMPLE}
                    <h3>{excavator.title}</h3>
                    <p>{excavator.setup}</p>
                    <dl className="kv">
                      <dt>Purchase amount</dt><dd>{dollars(excavator.price)}</dd>
                      <dt>Equipment age</dt><dd>{excavator.age}</dd>
                      <dt>Expected utilization</dt><dd>{excavator.utilization}</dd>
                      <dt>Residual value</dt><dd>{dollars(residual(excavator.price, excavator.residualPct))} after {excavator.termMonths} months, assuming {excavator.residualPct}% of price. An assumption, not an appraisal</dd>
                      <dt>Repayment requirement</dt><dd>{excavator.repayment}</dd>
                    </dl>
                    <h4>Lease versus buy</h4>
                    <ul className="ck">{excavator.leaseVsBuy.map((c) => <li key={c}>{c}</li>)}</ul>
                  </div>
                </div>

                <div className="panel snap">
                  <div className="ph mono"><span>Snapshot {fleet.key}</span><span>Not a lender quote</span></div>
                  <div className="pb">
                    {EXAMPLE}
                    <h3>{fleet.title}</h3>
                    <p>{fleet.setup}</p>
                    <h4>Replacement schedule</h4>
                    <div className="scroll">
                      <table>
                        <thead><tr><th scope="col">When</th><th scope="col">What</th><th scope="col">Units</th><th scope="col" className="num">Cost</th></tr></thead>
                        <tbody>{fleet.schedule.map((r) => (<tr key={r.quarter}><td>{r.quarter}</td><td>{r.what}</td><td>{r.units}</td><td className="num">{dollars(rowCost(r))}</td></tr>))}</tbody>
                        <tfoot><tr><td colSpan={2}>Fleet acquisition cost</td><td>{fleet.schedule.reduce((n, r) => n + r.units, 0)}</td><td className="num">{dollars(fleetTotal(fleet.schedule))}</td></tr></tfoot>
                      </table>
                    </div>
                    <h4>Financing alternatives</h4>
                    <ul className="ck">{fleet.alternatives.map((c) => <li key={c}>{c}</li>)}</ul>
                    <h4>Cash-flow analysis</h4>
                    <p>{fleet.cashFlow}</p>
                  </div>
                </div>
              </div>
            </div>

            <div id="pencil" className="gap">
              <header className="sh">
                <p className="idx mono"><b>Pencil it</b> Does the machine pay for itself?</p>
                <h3 style={{ fontSize: 'clamp(1.3rem,2.6vw,2rem)' }}>A payment is a fact. Utilization is an assumption.</h3>
                <p className="lede">Enter the price, your quoted terms and what the asset earns. The check shows whether it covers its own payment and how busy it has to be to break even.</p>
              </header>
              <EquipmentPencil />
            </div>
          </div>
        </section>

        {/* 4. Does It Pencil? methodology */}
        <section id="method">
          <div className="wrap gap">
            <header className="sh"><p className="idx mono"><b>04</b> Does It Pencil?</p>
              <h2>The pencil is the point of truth.</h2>
              <p className="lede">Paper. Pencil. Math. Evidence. Human review. Every line of our work carries a label, so you can tell what was checked from what was assumed.</p></header>
            <div className="legend fill">{LABELS.map((l) => <div key={l.k}><b>{l.k}</b>{l.t}</div>)}</div>
            <div className="three">
              {DECISIONS.map((d) => (<div key={d.k}><strong className={`mono ${d.cls}`}>{d.k}</strong><p>{d.t}</p></div>))}
            </div>
            <p className="note">A result that pencils is arithmetic on stated numbers. It is not a financing approval, and it is not a measure of how much evidence stands behind it. We report those three things separately.</p>
            <p>The eraser is part of the work. When a finding changes, the correction is recorded with its reason and the original stays visible.</p>
            <div><Link className="btn ghost sm" href="/does-it-pencil/">Read Does It Pencil?</Link></div>
          </div>
        </section>

        {/* 5. How the Private AI Office works */}
        <section id="office">
          <div className="wrap gap">
            <header className="sh"><p className="idx mono"><b>05</b> The Private AI Office</p>
              <h2>The agents do the legwork.<br />Your people make the calls.</h2></header>
            <ol className="probs">
              {OFFICE_STEPS.map((s, i) => (<li key={s.n}><span className="mono steel">0{i + 1}</span><h3>{s.n}</h3><p>{s.t}</p></li>))}
            </ol>
            <p className="steel" style={{ fontSize: '.9rem' }}><span className="tag b">Proposed capability</span> This is how the work is designed to move. The agent roles behind steps two and three are being configured and tested. Today, an intake from this page reaches a person by email.</p>
          </div>
        </section>

        {/* 6. Secure client intake */}
        <section id="start">
          <div className="wrap">
            <header className="sh"><p className="idx mono"><b>06</b> Client intake</p>
              <h2>Start with the short version.</h2>
              <p className="lede">Pick a path and answer a few questions in general terms. Add detail now or later. No documents are collected on this page.</p></header>
            <div className="grid2">
              <HiveIntake />
              <figure className="shot">
                <img src="/assets/scenario/contractor-site.webp" alt="Three workers in hard hats and safety vests review drawings on a table beside electrical equipment at a commercial construction site, with work vans parked behind them" width={1600} height={900} loading="lazy" decoding="async" />
                <figcaption className="mono steel">Illustrative image. Not a client or a project under review.</figcaption>
              </figure>
            </div>
          </div>
        </section>

        {/* 7. Founder experience and philosophy */}
        <Founder />

        {/* 8. Confidentiality and responsible AI */}
        <section id="confidentiality">
          <div className="wrap gap">
            <header className="sh"><p className="idx mono"><b>08</b> Confidentiality and responsible AI</p>
              <h2>Your information. Your authorization.</h2></header>
            <div className="three">{SAFEGUARDS.map((s) => (<div key={s.n}><h3>{s.n}</h3><p>{s.t}</p></div>))}</div>
          </div>
        </section>

        {/* 9. Contact and next steps */}
        <section className="final">
          <div className="wrap gap">
            <p className="idx mono"><b>09</b> Next steps</p>
            <h2>Bring the deal. We&rsquo;ll bring the pencil.</h2>
            <div className="cta"><a className="btn" href="#intake">Let&rsquo;s pencil it ✏️</a><Link className="btn ghost" href="/does-it-pencil/">Read Does It Pencil?</Link></div>
            <ul className="contact mono" aria-label="Contact">
              <li><span className="steel">Email</span> <a href="mailto:build@bullnet.ai">build@bullnet.ai</a></li>
              <li><span className="steel">Phone</span> <a href="tel:+15615327120">561.532.7120</a></li>
            </ul>
            <p className="steel" style={{ fontSize: '.86rem' }}>
              Hive Capital Markets is a desk of BullNet. BullNet is not a lender and does not make credit decisions. Any financing is provided by third-party lenders on their own terms and is subject to their approval. A lender may pay BullNet a fee when a financing closes, and we tell you when that applies. BullNet does not act as a real estate broker through this desk. Nothing on this page is a loan offer, a commitment to lend, a rate quote, or financial, tax or legal advice.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
