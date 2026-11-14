import Link from 'next/link';
import { formatDate, type Drop } from '@/content/drops';
import { ExchangeCheck } from '@/components/pencil/ExchangeCheck';

const STATUS_CLASS: Record<Drop['verdict']['status'], string> = {
  'MATHEMATICALLY VERIFIED': 'v-pass',
  'EVIDENCE SUPPORTED': 'v-pass',
  INCONCLUSIVE: 'v-inc',
  FAILED: 'v-fail',
  'REQUIRES HUMAN REVIEW': 'v-rev',
};

export function DropView({ drop }: { drop: Drop }) {
  return (
    <article>
      <section className="drophead">
        <div className="wrap gap">
          <p className="idx mono"><Link href="/does-it-pencil/">Does it pencil?</Link><b>Drop {drop.number}</b><span>{drop.practice}</span><time dateTime={drop.date}>{formatDate(drop.date)}</time></p>
          <h1>{drop.title}</h1>
          <p className="lede">{drop.summary}</p>
          <p><span className="tag b">Illustrative scenario</span></p>
        </div>
      </section>

      <section>
        <div className="wrap dropgrid">
          <div className="gap">
            <div className="tiles" aria-label="The setup">
              {drop.setup.map((t) => (
                <div key={t.label}><strong>{t.value}</strong><span className="mono steel">{t.label}</span>{t.note && <span className="steel" style={{ fontSize: '.86rem' }}>{t.note}</span>}</div>
              ))}
            </div>
            <div className="panel">
              <div className="ph mono"><span>Next move</span></div>
              <div className="pb gap-s">
                <h2 style={{ fontSize: 'clamp(1.2rem,2.4vw,1.7rem)' }}>{drop.move.headline}</h2>
                <ul className="mono steel" style={{ display: 'flex', flexWrap: 'wrap', gap: '6px 24px' }}>{drop.move.points.map((p) => (<li key={p}>{p}</li>))}</ul>
              </div>
            </div>
            {drop.sections.map((s) => (
              <div className="gap-s" key={s.heading}>
                <h2 style={{ fontSize: 'clamp(1.3rem,2.6vw,1.9rem)' }}>{s.heading}</h2>
                {s.body.map((p) => (<p key={p} style={{ color: '#D3D8DC' }}>{p}</p>))}
              </div>
            ))}
            {drop.module?.kind === 'exchange' && <ExchangeCheck {...drop.module} />}
            <div className="gap-s">
              <h2 style={{ fontSize: 'clamp(1.3rem,2.6vw,1.9rem)' }}>Show me</h2>
              <div className="scroll" tabIndex={0} role="region" aria-label="Deal figures. Scroll sideways to see all of it.">
                <table>
                  <thead><tr><th scope="col">The question</th><th scope="col">What it decides</th></tr></thead>
                  <tbody>{drop.questions.map((q) => (<tr key={q.ask}><th scope="row" className="rowh" style={{ color: 'var(--platinum)' }}>{q.ask}</th><td>{q.decides}</td></tr>))}</tbody>
                </table>
              </div>
            </div>
            <div className="gap-s">
              <p className="mono steel">Does it pencil?</p>
              <div className={`verdict ${STATUS_CLASS[drop.verdict.status]}`} role="status">{drop.verdict.answer}<small><strong>{drop.verdict.status}.</strong> {drop.verdict.because}</small></div>
              <p className="pull">{drop.verdict.line}</p>
            </div>
          </div>
          <aside className="gap">
            <figure className="mascot">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/assets/pencil/bull.jpg" width={328} height={684} alt="The Does It Pencil bull: a bull in a blue suit and aviator sunglasses" loading="lazy" />
              <figcaption className="mono steel">Does it pencil?</figcaption>
            </figure>
            <p className="steel" style={{ fontSize: '.86rem' }}>Illustrative underwriting on stated assumptions. Not a real transaction, a market survey or a recommendation. Not investment, tax or legal advice.</p>
            {drop.source && (<p style={{ fontSize: '.86rem' }}><a href={drop.source.url} rel="noopener">{drop.source.label}</a></p>)}
            <Link className="btn" href="/#flight-sheet">Initiate a Flight Sheet</Link>
          </aside>
        </div>
      </section>
    </article>
  );
}
