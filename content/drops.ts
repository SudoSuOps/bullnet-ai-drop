/**
 * "Does It Pencil?" drops. To publish a new one, add an entry at the TOP of this array and push.
 * Every scenario is illustrative unless a source is cited. No client names, no real transactions,
 * no advice. Follow docs/security/trust-rules.md. Verdict status uses the Defendable vocabulary.
 */
export type DropStatus = 'MATHEMATICALLY VERIFIED' | 'EVIDENCE SUPPORTED' | 'INCONCLUSIVE' | 'FAILED' | 'REQUIRES HUMAN REVIEW';

export interface Drop {
  slug: string;
  number: string;
  /** ISO date, YYYY-MM-DD. */
  date: string;
  title: string;
  practice: string;
  /** One or two sentences. Used as the page description and on the index. */
  summary: string;
  setup: { value: string; label: string; note?: string }[];
  move: { headline: string; points: string[] };
  sections: { heading: string; body: string[] }[];
  /** Optional interactive module. Only "exchange" exists today. */
  module?: { kind: 'exchange'; salePrice: number; debtPayoff: number; replacementPrice: number; ltvPct: number; lead: string };
  questions: { ask: string; decides: string }[];
  verdict: { status: DropStatus; answer: string; because: string; line: string };
  source?: { label: string; url: string };
}

export const drops: Drop[] = [
  {
    slug: 'zero-cash-flow-deal',
    number: '001',
    date: '2026-11-11',
    title: 'Zero cash flow deal',
    practice: 'Capital markets',
    summary:
      'A hotel portfolio sells for $85M and the seller wants to exchange into a zero cash flow, single-tenant net lease industrial building. Replacing the $45M of debt does not complete an $85M exchange.',
    setup: [
      { value: '$85M', label: 'Sale price', note: 'Hotel portfolio disposition' },
      { value: '$45M', label: 'Debt payoff' },
      { value: '$40M', label: 'Equity', note: 'Before costs' },
    ],
    move: {
      headline: '1031 into single-tenant net lease industrial',
      points: ['Credit tenant', '20-year lease', 'Zero cash flow: rent equals debt service'],
    },
    sections: [
      {
        heading: 'Why buy something that pays you nothing?',
        body: [
          'Because cash distributions and economic return are different calculations.',
          'The tenant’s rent services the loan. Principal amortization builds equity. A properly structured exchange can defer the gain.',
        ],
      },
      {
        heading: 'Where the pencil gets sharp',
        body: [
          'Replacing $45M of debt alone does not complete an $85M exchange. The $40M of equity has to go somewhere too.',
          'Zero cash flow structures run at high leverage. High leverage needs very little equity. So the question is not whether the debt can be replaced. It is whether the replacement is large enough to absorb the equity.',
          'Zero cash flow can still mean taxable income. As the loan amortizes, more of each rent payment goes to principal, and principal is not deductible. The owner can owe tax in a year with no distribution.',
        ],
      },
    ],
    module: {
      kind: 'exchange',
      salePrice: 85_000_000,
      debtPayoff: 45_000_000,
      replacementPrice: 85_000_000,
      ltvPct: 90,
      lead: 'Change the replacement price and the leverage. The check shows how much of the $40M the deal absorbs.',
    },
    questions: [
      { ask: 'Where does the $40M of equity go?', decides: 'Whether the exchange defers all of the gain or only part of it' },
      { ask: 'What is the replacement purchase price?', decides: 'The value test, and the basis going forward' },
      { ask: 'How much debt amortizes over the lease?', decides: 'How much equity exists at lease expiration' },
      { ask: 'Who guarantees the lease?', decides: 'Whether "credit tenant" means the parent or a subsidiary' },
      { ask: 'What taxes arise without cash distributions?', decides: 'How much outside cash the owner needs each year' },
      { ask: 'What is the building worth when the lease expires?', decides: 'The residual, which is most of the return' },
    ],
    verdict: {
      status: 'INCONCLUSIVE',
      answer: 'Potentially.',
      because: 'Show me the basis, the lease, the debt schedule and the residual.',
      line: 'A 20-year lease is an input. The structure is the deal.',
    },
    source: { label: 'Originally posted on X by @bestinbull', url: 'https://x.com/bestinbull/status/2120716001973059988' },
  },
];

export const getDrop = (slug: string): Drop | undefined => drops.find((d) => d.slug === slug);

export const formatDate = (iso: string): string =>
  new Date(`${iso}T12:00:00Z`).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' });
