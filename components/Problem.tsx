export function Problem() {
  return (
    <section id="problem">
      <div className="wrap">
        <header className="sh"><p className="idx mono"><b>03</b> The problem</p>
          <h2>The data is confidential.<br />The decision is consequential.</h2>
          <p className="lede">A family office often holds decades of information and has little technical infrastructure for putting AI to work on it safely.</p></header>
        <ul className="probs">
          <li><span className="mono brass">P-01</span><h3>Fragmented documents</h3><p>Leases, rent rolls, appraisals and closing binders sit in separate folders, inboxes and advisor portals.</p></li>
          <li><span className="mono brass">P-02</span><h3>External AI exposure</h3><p>Pasting a confidential offering memorandum into a public assistant may breach the agreement that came with it.</p></li>
          <li><span className="mono brass">P-03</span><h3>Inconsistent assumptions</h3><p>Two analysts underwrite the same building with different vacancy, reserve and exit assumptions, and nobody records why.</p></li>
          <li><span className="mono brass">P-04</span><h3>Unverified model outputs</h3><p>A language model states a valuation with confidence. Confidence is not a calculation.</p></li>
          <li><span className="mono brass">P-05</span><h3>Manual diligence</h3><p>Abstraction, reconciliation and tie-out consume the weeks the investment committee needed for judgment.</p></li>
          <li><span className="mono brass">P-06</span><h3>Disconnected institutional knowledge</h3><p>What the office learned on the last ten deals lives in people's heads and leaves when they do.</p></li>
        </ul>
        <p className="note" style={{ marginTop: '28px' }}>BullNet is the engineering response: one system per mandate, built inside a boundary the client approves, with every figure traceable to a source or a test.</p>
      </div>
    </section>
  );
}
