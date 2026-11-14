/** Marks the line between the plain-language overview and the technical layer below it. */
export function GoDeeper() {
  return (
    <section id="deeper">
      <div className="wrap">
        <header className="sh" style={{ marginBottom: 0 }}><p className="idx mono"><b>Go deeper</b> The technical layer</p>
          <h2>How the controls work.</h2>
          <p className="lede">Everything above is the overview. Below is the detail for the people who will check it: the Vault, Sovereign ID, Defendable and the practice areas. Each part is labelled with what exists today and what is proposed.</p></header>
      </div>
    </section>
  );
}
