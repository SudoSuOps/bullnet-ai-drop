import type { Metadata } from 'next';
import Link from 'next/link';
import { Nav } from '@/components/Nav';
import { Footer } from '@/components/Footer';
import { drops, formatDate } from '@/content/drops';
import { Method } from '@/components/pencil/Method';

const DESCRIPTION = 'Does It Pencil? is BullNet’s market intel series: one commercial real estate deal structure per drop, the arithmetic behind it and the questions that decide it.';

export const metadata: Metadata = {
  title: 'Does It Pencil? CRE Deal Math and Market Intel',
  description: DESCRIPTION,
  alternates: { canonical: '/does-it-pencil/' },
  openGraph: { title: 'Does It Pencil? | BullNet', description: DESCRIPTION, url: '/does-it-pencil/', type: 'website' },
};

export default function DoesItPencil() {
  return (
    <>
      <Nav />
      <main>
        <section className="drophead">
          <div className="wrap gap">
            <p className="idx mono"><b>Market intel</b><span>BullNet</span></p>
            <h1>Does it pencil?</h1>
            <p className="hero-tag">The math. The code. The evidence. Your decision.</p>
            <p className="lede">A good opportunity starts with a question. We work through the information, test the assumptions, run the calculations, and show what supports the result — and what doesn’t.</p>
            <p className="pull" style={{ maxWidth: 'none' }}>An AI answer is not an underwriting conclusion.</p>
          </div>
        </section>
        <section>
          <div className="wrap gap">
            <ol className="droplist">
              {drops.map((d) => (
                <li key={d.slug}>
                  <Link href={`/does-it-pencil/${d.slug}/`}>
                    <span className="mono steel">Drop {d.number}{d.caseBlocks ? ` / ${d.caseBlocks.label}` : ''} / {d.practice} / <time dateTime={d.date}>{formatDate(d.date)}</time></span>
                    <h2>{d.title}</h2>
                    <p>{d.summary}</p>
                    <span className="mono">Read the drop</span>
                  </Link>
                </li>
              ))}
            </ol>
            <Method />
            <p className="steel" style={{ fontSize: '.86rem' }}>Every drop is illustrative underwriting on stated assumptions. None is a real transaction, a market survey or a recommendation. Not investment, tax or legal advice.</p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
