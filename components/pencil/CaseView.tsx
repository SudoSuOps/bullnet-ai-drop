import Link from 'next/link';
import { formatDate, type Drop, type CaseBlocks } from '@/content/drops';
import { MultifamilyWorkbench } from '@/components/pencil/MultifamilyWorkbench';
import { Method } from '@/components/pencil/Method';

type MfModule = Extract<NonNullable<Drop['module']>, { kind: 'multifamily' }>;

/** A full worked case: nine blocks from the question to the Flight Sheet. */
export function CaseView({ drop, mod, c }: { drop: Drop; mod: MfModule; c: CaseBlocks }) {
  const { kind: _kind, ...inputs } = mod;
  void _kind;
  return (
    <article className="case">
      <section className="drophead">
        <div className="wrap gap">
          <p className="idx mono"><Link href="/does-it-pencil/">Does it pencil?</Link><b>Drop {drop.number} / {c.label}</b><span>{drop.practice}</span><time dateTime={drop.date}>{formatDate(drop.date)}</time></p>
          <h1>{drop.title}</h1>
          <p className="lede">{drop.summary}</p>
          <p className="case-flag"><span className="tag b">{c.label}</span><strong>All numbers are fictional teaching assumptions.</strong> Not a real property, offering or transaction.</p>
        </div>
      </section>

      <section>
        <div className="wrap gap case-body">
          <div className="gap-s">
            <p className="mono steel">01</p>
            <h2 className="case-h">Does it pencil?</h2>
            <p className="case-p">A good opportunity starts with a question. We work through the information, test the assumptions, run the calculations, and show what supports the result — and what doesn’t.</p>
          </div>
          <Method headingLevel={3} />

          <div className="gap-s">
            <p className="mono steel">02</p>
            <h2 className="case-h">The opportunity</h2>
            {c.opportunity.map((p) => (<p className="case-p" key={p}>{p}</p>))}
          </div>
          {c.image && (
            <figure className="shot">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={c.image.src} width={c.image.width} height={c.image.height} alt={c.image.alt} loading="lazy" />
              <figcaption className="mono steel">Illustrative image. Not an actual offering or BullNet client property.</figcaption>
            </figure>
          )}

          <div className="gap-s">
            <p className="mono steel">03</p>
            <h2 className="case-h">What we know</h2>
            <p className="case-p">Six numbers were stated. None came with a document. That makes each one an assumption, not a fact.</p>
          </div>
          <div className="tiles" aria-label="Stated assumptions">
            {drop.setup.map((t) => (
              <div key={t.label}><strong>{t.value}</strong><span className="mono steel">{t.label}</span><span className="tag">Illustrative assumption</span></div>
            ))}
          </div>
          <div className="grid2 known">
            <div className="panel"><div className="ph mono"><span>Illustrative assumptions</span><span>{drop.setup.length}</span></div><div className="pb"><p>Everything in the tiles above. Stated for teaching, supported by nothing.</p></div></div>
            <div className="panel"><div className="ph mono"><span>Verified information</span><span>{c.verified.length}</span></div><div className="pb">{c.verified.length ? (<ul className="ticks">{c.verified.map((x) => (<li key={x}>{x}</li>))}</ul>) : (<p>None. No rent roll, operating statement or other source document exists for this example.</p>)}</div></div>
          </div>

          <div className="gap-s">
            <p className="mono steel">04</p>
            <h2 className="case-h">What we don’t know</h2>
          </div>
          <div className="limits" role="note" aria-label="What this model does not establish">
            <p className="limits-h">This model does not establish:</p>
            <ul>{c.limits.map((x) => (<li key={x}>{x}</li>))}</ul>
            <p>It does not calculate IRR, debt coverage, debt yield or any return. Those need a price, financing terms and costs that are not in this example.</p>
          </div>
          <div className="scroll" tabIndex={0} role="region" aria-label="Documents that would settle the open items. Scroll sideways to see all of it.">
            <table>
              <thead><tr><th scope="col">Document needed</th><th scope="col">What it would settle</th></tr></thead>
              <tbody>{c.needed.map((n) => (<tr key={n.doc}><th scope="row" className="rowh" style={{ color: 'var(--platinum)' }}>{n.doc}</th><td>{n.settles}</td></tr>))}</tbody>
            </table>
          </div>

          <MultifamilyWorkbench {...inputs} />

          <div className="gap-s">
            <p className="mono steel">07</p>
            <h2 className="case-h">Capital markets context</h2>
            <p className="case-p">{c.capital.lead}</p>
            <ul className="ticks">{c.capital.adds.map((x) => (<li key={x}>{x}</li>))}</ul>
            <p className="note">{c.capital.close} <Link href="/hive-capital-markets/">About Hive Capital Markets</Link></p>
          </div>

          <div className="gap-s">
            <p className="mono steel">08</p>
            <h2 className="case-h">The human decision</h2>
            {c.decision.map((p) => (<p className="case-p" key={p}>{p}</p>))}
          </div>
          <div className="scroll" tabIndex={0} role="region" aria-label="Questions a person should ask. Scroll sideways to see all of it.">
            <table>
              <thead><tr><th scope="col">The question</th><th scope="col">What it decides</th></tr></thead>
              <tbody>{drop.questions.map((q) => (<tr key={q.ask}><th scope="row" className="rowh" style={{ color: 'var(--platinum)' }}>{q.ask}</th><td>{q.decides}</td></tr>))}</tbody>
            </table>
          </div>
          <div className="gap-s">
            <p className="mono steel">Does it pencil?</p>
            <div className="verdict v-inc" role="status">{drop.verdict.answer}<small><strong>{drop.verdict.status}.</strong> {drop.verdict.because}</small></div>
            <p className="pull">{drop.verdict.line}</p>
          </div>

          <div className="convert">
            <p className="mono steel">09</p>
            <h2 className="case-h">Start a Flight Sheet</h2>
            <p className="case-p">Have a real decision to test? A Flight Sheet sets out the question, the information you have and what a defendable answer would need.</p>
            <div className="cta"><Link className="btn" href="/#flight-sheet">Initiate a Flight Sheet</Link><Link className="btn ghost" href="/does-it-pencil/">All drops</Link></div>
          </div>
          <p className="steel" style={{ fontSize: '.86rem' }}>Illustrative underwriting on stated assumptions. Not a real transaction, a market survey or a recommendation. Not investment, tax or legal advice.</p>
        </div>
      </section>
    </article>
  );
}
