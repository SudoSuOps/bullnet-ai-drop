'use client';

import type { KeyboardEvent } from 'react';
import type { ComponentKey } from '@/content/site';

interface Box { k: ComponentKey; x: number; y: number; w: number; h: number; title: string; sub: string }

const BOXES: Box[] = [
  { k: 'capital', x: 16, y: 12, w: 636, h: 44, title: 'CAPITAL INTELLIGENCE', sub: '08 / domain layer' },
  { k: 'flight', x: 16, y: 84, w: 116, h: 100, title: 'FLIGHT SHEET', sub: '06 / mandate' },
  { k: 'vault', x: 146, y: 84, w: 116, h: 100, title: 'THE VAULT', sub: '04 / access' },
  { k: 'hive', x: 276, y: 84, w: 116, h: 100, title: 'THE HIVE', sub: '02 / knowledge' },
  { k: 'swarm', x: 406, y: 84, w: 116, h: 100, title: 'THE SWARM', sub: '01 / agents' },
  { k: 'defend', x: 536, y: 84, w: 116, h: 100, title: 'DEFENDABLE', sub: '07 / testing' },
  { k: 'node', x: 16, y: 212, w: 636, h: 44, title: 'THE NODE', sub: '03 / sovereign compute' },
  { k: 'id', x: 668, y: 12, w: 76, h: 244, title: 'SOVEREIGN ID', sub: '05 / identity' },
];

/** Clickable map of the eight components. Keyboard: Tab to a box, Enter or Space to select. */
export function ArchDiagram({ active, onPick }: { active: ComponentKey; onPick: (k: ComponentKey) => void }) {
  const onKey = (k: ComponentKey) => (e: KeyboardEvent<SVGGElement>) => {
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onPick(k); }
  };
  return (
    <svg className="dg" viewBox="0 0 760 268" style={{ minWidth: 680, width: '100%' }} role="group" aria-label="BullNet system architecture">
      {BOXES.map((b) => {
        const vertical = b.k === 'id';
        const tall = b.h > 60;
        return (
          <g key={b.k} data-k={b.k} className={b.k === active ? 'on' : undefined} tabIndex={0} role="button" aria-label={b.title} aria-pressed={b.k === active} onClick={() => onPick(b.k)} onKeyDown={onKey(b.k)}>
            <rect className="bx" x={b.x} y={b.y} width={b.w} height={b.h} />
            {vertical ? (
              <>
                <text className="t1" transform={`translate(${b.x + 34} ${b.y + b.h - 16}) rotate(-90)`}>{b.title}</text>
                <text transform={`translate(${b.x + 52} ${b.y + b.h - 16}) rotate(-90)`}>{b.sub}</text>
              </>
            ) : (
              <>
                <text className="t1" x={b.x + 12} y={b.y + (tall ? 30 : 20)}>{b.title}</text>
                <text x={b.x + 12} y={b.y + (tall ? 48 : 35)}>{b.sub}</text>
              </>
            )}
          </g>
        );
      })}
      <path className="ar" d="M132 134h14M262 134h14M392 134h14M522 134h14M334 56v28M334 184v28M652 134h16" />
    </svg>
  );
}
