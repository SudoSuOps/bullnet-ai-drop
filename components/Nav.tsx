export function Nav() {
  return (
    <header className="nav">
      <div className="wrap">
        <a className="brand" href="/" aria-label="BullNet home"><svg width="30" height="30" viewBox="32 44 420 420" aria-hidden="true"><use href="#mark"/></svg>BULLNET</a>
        <nav className="mono" aria-label="Primary">
          <a href="/#office">The Office</a><a href="/#node">The Node</a><a href="/#example">Examples</a><a href="/#deeper">Go Deeper</a><a href="/hive-capital-markets/">Capital Markets</a><a href="/does-it-pencil/">Does It Pencil?</a><a href="/#founder">About</a>
        </nav>
        <a className="btn sm" href="/#flight-sheet">Flight Sheet</a>
      </div>
    </header>
  );
}
