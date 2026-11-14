/** Two further illustrative builds. Made-up companies: not clients, not case studies, no results claimed. */
const CASES = [
  {
    k: 'U-01',
    who: 'An industrial asset owner',
    problem: 'Several warehouse properties, and years of leases, operating statements and loan documents spread across folders and inboxes.',
    office: 'The office organizes the approved records, abstracts each lease, answers document questions with a page reference, and flags expirations and other risks to review. Net operating income is recomputed by code, not taken from a model.',
    limit: 'The output is only as good as the sourced documents and the assumptions the owner approves.',
    human: 'The owner decides what to buy, sell, renew or refinance.',
  },
  {
    k: 'U-02',
    who: 'A cold-chain operator',
    problem: 'A temperature-controlled warehouse, and no clear view across equipment maintenance, operating records and risk.',
    office: 'Approved maintenance logs and operating records feed local analysis on site, an exceptions report and a review queue for the people who run the plant.',
    limit: 'No live sensor integration and no predictive accuracy is claimed. Those are built and tested per facility before anyone relies on them.',
    human: 'The operator decides on repairs, spend and priorities.',
  },
] as const;

export function UseCases() {
  return (
    <section id="more-examples">
      <div className="wrap">
        <header className="sh"><p className="idx mono"><b>Examples</b> Two more illustrative builds</p>
          <h2>Same office.<br />Different business.</h2>
          <p className="lede">Every build starts with a business problem, not a hardware specification.</p></header>
        <div className="grid2">
          {CASES.map((c) => (
            <div className="panel" key={c.k}><div className="ph mono"><span>{c.k} / {c.who}</span><span className="brass">Illustrative</span></div>
              <div className="pb"><dl className="kv">
                <dt>The problem</dt><dd>{c.problem}</dd>
                <dt>What the office does</dt><dd>{c.office}</dd>
                <dt>The boundary</dt><dd>{c.limit}</dd>
                <dt>Final approval</dt><dd style={{ color: 'var(--platinum)' }}>{c.human}</dd>
              </dl></div></div>
          ))}
        </div>
        <p className="steel" style={{ marginTop: 18, fontSize: '.88rem' }}><span className="tag b">Illustrative scenario</span> These companies are made up. They are not clients, and no results are claimed.</p>
      </div>
    </section>
  );
}
