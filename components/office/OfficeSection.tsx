/** Illustrative channel layout. A design concept, not a screenshot of any client office. */
const CHANNELS = [
  { n: 'town-square', t: 'Your team and announcements' },
  { n: 'ask-the-office', t: 'Ask your approved agents a question' },
  { n: 'projects', t: 'Jobs, schedules and documents' },
  { n: 'flight-sheets', t: 'New requests and approved assignments' },
  { n: 'review-desk', t: 'Checked work waiting on a person' },
  { n: 'operations', t: 'Scheduled reports and alerts' },
] as const;

/** The Private AI Office: the premises. The client-facing workspace where people and approved agents work. */
export function OfficeSection() {
  return (
    <section id="office">
      <div className="wrap">
        <header className="sh"><p className="idx mono"><b>04</b> The Private AI Office</p>
          <h2>Open the office.<br />Ask your business a question.</h2>
          <p className="lede">The Private AI Office is where your team works with its approved AI agents. Ask a question about your business. Your approved agents find the relevant information, complete the work they are authorized to do, and return an answer a person can review.</p></header>
        <div className="grid2">
          <div className="gap">
            <div className="panel"><div className="ph mono"><span>Private AI Office / channel layout</span><span className="brass">Design concept</span></div>
              <div className="pb">
                <dl className="kv">
                  {CHANNELS.map((c) => (<div key={c.n} style={{ display: 'contents' }}><dt className="mono">{c.n}</dt><dd>{c.t}</dd></div>))}
                </dl>
              </div></div>
            <p className="steel" style={{ fontSize: '.88rem' }}>Illustrative layout. Each office is laid out for the business it serves. This is not a screenshot of a client office.</p>
            <p className="note">The office is the premises. Where the work runs behind it is a separate choice: a Node on your site, BullNet Infrastructure, or both. That is agreed for each job.</p>
            <p className="steel" style={{ fontSize: '.88rem' }}><span className="tag b">Proposed capability</span> Under the hood, the workspace is built on Mattermost, a collaboration platform that can be self-hosted. Which models answer in an office, and where they run, is set per office.</p>
          </div>
          <div className="gap">
            <ul className="probs" style={{ gridTemplateColumns: 'minmax(0,1fr)' }}>
              <li><span className="mono brass">O-01</span><h3>People and agents in one place</h3><p>Team conversations, project channels, requests, reviews and approvals sit together, so the work and the decision are in the same room.</p></li>
              <li><span className="mono brass">O-02</span><h3>From your desk or your phone</h3><p>The office goes where you go. You reach it the way you already reach your team, so there is no new routine to learn.</p></li>
              <li><span className="mono brass">O-03</span><h3>Beside the way you work today</h3><p>Nothing you rely on is replaced on day one. Each new job runs alongside your current process until you sign off on it.</p></li>
              <li><span className="mono brass">O-04</span><h3>A person approves</h3><p>Agents prepare the work. Nothing consequential is sent, bought or committed until a named person says so.</p></li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
