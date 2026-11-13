'use client';

import type { ReactNode } from 'react';

interface PickerProps {
  items: readonly ReactNode[];
  value: number;
  onChange: (index: number) => void;
  /** Accessible name for the group. */
  label: string;
  /** Visual variant: "pick" (chips), "stack" (vertical list) or "life" (stepper). */
  className?: 'pick' | 'stack' | 'life';
}

/** A single-select group of toggle buttons. Selection is exposed with aria-pressed, not colour alone. */
export function Picker({ items, value, onChange, label, className = 'pick' }: PickerProps) {
  return (
    <div className={className} role="group" aria-label={label}>
      {items.map((item, i) => (
        <button key={i} type="button" aria-pressed={i === value} onClick={() => onChange(i)}>
          {item}
        </button>
      ))}
    </div>
  );
}
