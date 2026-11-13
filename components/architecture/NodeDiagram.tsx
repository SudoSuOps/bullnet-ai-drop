const LAYERS = [
  'COMPUTE / BARE METAL',
  'LOCAL MODEL INFERENCE',
  'PRIVATE KNOWLEDGE RETRIEVAL',
  'AGENT RUNTIME',
  'CALCULATION + VALIDATION',
  'IDENTITY + AUDIT LOG',
];

/** Front elevation of the Node concept above its six internal layers. A design concept, not a hardware specification. */
export function NodeDiagram({ layer }: { layer: number }) {
  return (
    <svg className="dg" viewBox="0 0 520 330" style={{ minWidth: 440, width: '100%' }} role="img" aria-label="Node appliance front elevation with six internal layers from compute up to audit log">
      <rect x="20" y="14" width="480" height="92" fill="#10161d" stroke="#4a4a50" />
      <g stroke="#4a4a50">
        {Array.from({ length: 14 }, (_, i) => (<path key={i} d={`M${40 + i * 10} 30v60`} />))}
      </g>
      <rect x="350" y="38" width="7" height="7" fill="var(--lime)" /><text x="366" y="45">INFERENCE</text>
      <rect x="350" y="56" width="7" height="7" fill="var(--lime)" /><text x="366" y="63">VALIDATION</text>
      <rect x="350" y="74" width="7" height="7" fill="var(--steel)" /><text x="366" y="81">EXT. LINK</text>
      <rect x="50" y="106" width="50" height="6" fill="#4a4a50" /><rect x="420" y="106" width="50" height="6" fill="#4a4a50" />
      <path className="ar" d="M20 122h480M20 118v8M500 118v8" /><text x="212" y="136">FRONT ELEVATION</text>
      {LAYERS.map((name, i) => {
        const y = 150 + (LAYERS.length - 1 - i) * 29;
        return (
          <g key={name} className={i === layer ? 'on' : undefined}>
            <rect className="bx" x="20" y={y} width="480" height="24" />
            <text className="t1" x="32" y={y + 16}>{name}</text>
            <text x="470" y={y + 16}>L{i}</text>
          </g>
        );
      })}
    </svg>
  );
}
