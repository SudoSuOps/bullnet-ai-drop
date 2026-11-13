export function Nav() {
  return (
    <header className="nav">
      <div className="wrap">
        <a className="brand" href="#top" aria-label="BullNet home"><svg width="30" height="30" viewBox="32 44 420 420" aria-hidden="true"><use href="#mark"/></svg>BULLNET</a>
        <nav className="mono" aria-label="Primary">
          <a href="#system">The System</a><a href="#vault">The Vault</a><a href="#sovereign-id">Sovereign ID</a><a href="#node">The Node</a><a href="#defendable">Defendable</a><a href="#expertise">Expertise</a><a href="#founder">About</a>
        </nav>
        <a className="btn sm" href="#flight-sheet">Flight Sheet</a>
      </div>
    </header>
  );
}
