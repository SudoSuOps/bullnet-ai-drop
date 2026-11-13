import { faq } from '@/content/faq';

/** Plain, fully visible questions and answers. Kept un-collapsed so people, crawlers and AI assistants read the same text. */
export function Faq() {
  return (
    <section id="faq">
      <div className="wrap">
        <header className="sh">
          <p className="idx mono"><b>13</b> Questions</p>
          <h2>Straight answers.</h2>
          <p className="lede">What BullNet is, who it is for and how it works, in plain terms.</p>
        </header>
        <div className="faq">
          {faq.map((item) => (
            <div key={item.q}>
              <h3>{item.q}</h3>
              <p>{item.a}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
