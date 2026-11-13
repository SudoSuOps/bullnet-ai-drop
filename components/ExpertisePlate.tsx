import type { ReactNode } from 'react';
import type { PracticeKey } from '@/content/site';

const S = '#84909C';
const P = '#E5E8EB';

/** Schematic line drawings, one per practice. Placeholders for authorized photography. */
const PLATES: Record<PracticeKey, ReactNode> = {
  ind: (
    <>
      <path className="ar" d="M20 150H500M50 150V70L270 44 490 70V150" />
      <g stroke={S} fill="none">{Array.from({ length: 7 }, (_, i) => (<rect key={i} x={80 + i * 56} y="104" width="36" height="46" />))}</g>
      <text x="50" y="34">ELEVATION / CROSS-DOCK DISTRIBUTION</text>
      <rect x="80" y="104" width="36" height="46" fill={P} opacity=".5" />
    </>
  ),
  cold: (
    <>
      <rect x="60" y="50" width="400" height="100" fill="none" stroke={S} />
      <path className="ar" d="M193 50V150M326 50V150" />
      <text x="72" y="74">{'−20°F FREEZER'}</text><text x="205" y="74">{'34°F COOLER'}</text><text x="338" y="74">DOCK</text>
      <path d="M72 120h108M72 130h108M72 140h108M205 130h108M205 140h108M338 140h108" stroke={P} />
      <text x="60" y="34">PLAN / TEMPERATURE ZONES</text>
      <path className="ar" d="M20 150H500" />
    </>
  ),
  log: (
    <>
      <path className="ar" d="M60 120 180 70 300 110 420 60 470 130M180 70 240 150 300 110M300 110 380 150 470 130" />
      {([[60, 120], [180, 70], [300, 110], [420, 60], [470, 130], [240, 150], [380, 150]] as const).map(([x, y], i) => (
        <rect key={i} x={x - 5} y={y - 5} width="10" height="10" fill={i === 2 ? P : S} />
      ))}
      <text x="60" y="34">NETWORK / DISTRIBUTION DEPENDENCIES</text>
    </>
  ),
  cap: (
    <>
      <rect x="60" y="50" width="130" height="24" fill={P} opacity=".85" />
      <rect x="60" y="76" width="130" height="20" fill="none" stroke={P} />
      <rect x="60" y="98" width="130" height="52" fill="none" stroke={S} />
      <text x="204" y="66">COMMON EQUITY</text><text x="204" y="90">PREFERRED / MEZZANINE</text><text x="204" y="128">SENIOR DEBT</text>
      <text x="60" y="34">CAPITAL STACK / ILLUSTRATIVE PROPORTIONS</text>
      <path className="ar" d="M380 150V60M380 150H490M380 132 410 118 440 124 470 96 490 88" />
    </>
  ),
  fo: (
    <>
      <rect className="zone" x="150" y="46" width="220" height="110" />
      {[0, 1, 2].flatMap((r) => [0, 1, 2, 3].map((c) => (
        <rect key={`${r}-${c}`} x={172 + c * 46} y={62 + r * 30} width="34" height="20" fill="none" stroke={S} />
      )))}
      <rect x="218" y="92" width="34" height="20" fill={P} opacity=".6" />
      <text x="150" y="34">BOUNDARY / PRIVATE PORTFOLIO ENVIRONMENT</text>
      <path className="ar" d="M60 100H150M370 100H460" /><text x="60" y="92">IN</text><text x="430" y="92">OUT</text>
    </>
  ),
};

export function ExpertisePlate({ k, label }: { k: PracticeKey; label: string }) {
  return (
    <svg className="dg" viewBox="0 0 520 170" role="img" aria-label={`${label} schematic`}>
      {PLATES[k]}
    </svg>
  );
}
