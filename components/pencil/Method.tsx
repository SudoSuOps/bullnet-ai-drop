/** The Does It Pencil? method. Shown on the series index and on full worked cases. */
const STEPS = [
  { t: 'Start with the information.', d: 'What was actually provided, and by whom.' },
  { t: 'Test the assumptions.', d: 'Separate what is sourced from what is assumed.' },
  { t: 'Run the math.', d: 'Fixed formulas. Same inputs, same result.' },
  { t: 'Check the evidence.', d: 'What supports the result, and what does not.' },
  { t: 'Let people decide.', d: 'The work informs the decision. It does not make it.' },
];

export function Method({ headingLevel = 2 }: { headingLevel?: 2 | 3 }) {
  const H = headingLevel === 2 ? 'h2' : 'h3';
  return (
    <div className="gap-s method-wrap">
      <p className="mono steel">How every drop works</p>
      <H className="method-h">The math. The code. The evidence. Your decision.</H>
      <ol className="method">
        {STEPS.map((s) => (<li key={s.t}><strong>{s.t}</strong><span>{s.d}</span></li>))}
      </ol>
      <p className="note">Before the recommendation, show the work.</p>
    </div>
  );
}
