'use client';

import { createContext, useContext, useMemo, useState, type ReactNode } from 'react';
import { EXAMPLE, parseAmount, validate, type Result } from '@/lib/validate';

interface ValidatorState {
  noi: string; cap: string; agent: string;
  setNoi: (v: string) => void; setCap: (v: string) => void; setAgent: (v: string) => void;
  result: Result;
  reset: () => void;
  applyCorrected: () => void;
}

const Ctx = createContext<ValidatorState | null>(null);

/** Shares one set of hypothetical inputs between the validator, the sample Flight Sheet and the receipt. */
export function ValidatorProvider({ children }: { children: ReactNode }) {
  const [noi, setNoi] = useState<string>(EXAMPLE.noi);
  const [cap, setCap] = useState<string>(EXAMPLE.cap);
  const [agent, setAgent] = useState<string>(EXAMPLE.agent);
  const result = useMemo(() => validate(parseAmount(noi), parseAmount(cap), parseAmount(agent)), [noi, cap, agent]);
  const state: ValidatorState = {
    noi, cap, agent, setNoi, setCap, setAgent, result,
    reset: () => { setNoi(EXAMPLE.noi); setCap(EXAMPLE.cap); setAgent(EXAMPLE.agent); },
    applyCorrected: () => { if (result.status !== 'INCONCLUSIVE') setAgent(result.value.toLocaleString('en-US')); },
  };
  return <Ctx.Provider value={state}>{children}</Ctx.Provider>;
}

export function useValidator(): ValidatorState {
  const v = useContext(Ctx);
  if (!v) throw new Error('useValidator must be used inside ValidatorProvider');
  return v;
}
