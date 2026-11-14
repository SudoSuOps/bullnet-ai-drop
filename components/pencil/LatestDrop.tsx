import Link from 'next/link';
import { drops, formatDate } from '@/content/drops';

/** The newest Does It Pencil? drop, shown directly under the hero. It updates itself when a drop is added. */
export function LatestDrop() {
  const d = drops[0];
  if (!d) return null;
  const href = `/does-it-pencil/${d.slug}/`;
  return (
    <section className="latest" aria-labelledby="latest-title">
      <div className="wrap">
        <p className="idx mono"><b>The latest read</b><span>Does It Pencil?</span><span>Drop {d.number}</span><time dateTime={d.date}>{formatDate(d.date)}</time></p>
        <div className="latest-body">
          <div className="gap-s">
            <h2 id="latest-title"><Link href={href}>{d.title}</Link></h2>
            <p className="lede">{d.summary}</p>
          </div>
          <div className="gap-s">
            <p className="mono steel">Does it pencil?</p>
            <p className="pull">{d.verdict.answer} {d.verdict.line}</p>
            <div className="cta"><Link className="btn" href={href}>Read the drop</Link><Link className="btn ghost" href="/does-it-pencil/">All drops</Link></div>
          </div>
        </div>
      </div>
    </section>
  );
}
