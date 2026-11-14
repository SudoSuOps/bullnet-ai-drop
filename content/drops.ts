/**
 * "Does It Pencil?" drops. To publish a new one, add an entry at the TOP of this array and push.
 * Every scenario is illustrative unless a source is cited. No client names, no real transactions,
 * no advice. Follow docs/security/trust-rules.md. Verdict status uses the Defendable vocabulary.
 */
export type DropStatus = 'MATHEMATICALLY VERIFIED' | 'EVIDENCE SUPPORTED' | 'INCONCLUSIVE' | 'FAILED' | 'REQUIRES HUMAN REVIEW';

/** Extra blocks for a full worked case. Used by the multifamily module. */
export interface CaseBlocks {
  /** Shown beside the drop number, for example "Illustrative case". */
  label: string;
  opportunity: string[];
  /** Verified information. Leave empty when nothing has been checked against a source document. */
  verified: string[];
  /** What the model does not establish. Shown prominently. */
  limits: string[];
  /** Documents that would turn assumptions into sourced inputs. */
  needed: { doc: string; settles: string }[];
  capital: { lead: string; adds: string[]; close: string };
  decision: string[];
  /** Optional lead image. Only an image BullNet owns or generated. Always captioned as illustrative. */
  image?: { src: string; width: number; height: number; alt: string };
}

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
  /** Optional interactive module: "exchange" or "multifamily". */
  module?:
    | { kind: 'exchange'; salePrice: number; debtPayoff: number; replacementPrice: number; ltvPct: number; lead: string }
    | { kind: 'multifamily'; units: number; avgRent: number; occNowPct: number; occStabPct: number; expensePct: number; capPct: number };
  /** Required when module.kind is "multifamily". */
  caseBlocks?: CaseBlocks;
  questions: { ask: string; decides: string }[];
  verdict: { status: DropStatus; answer: string; because: string; line: string };
  source?: { label: string; url: string };
}

export const drops: Drop[] = [
  {
    slug: '570-units-7-cap',
    number: '002',
    date: '2026-11-14',
    title: '570 Units. A 7% Cap. Does It Pencil?',
    practice: 'Multifamily',
    summary:
      'A 570-apartment Class B property is 75% occupied. At an assumed 7% cap rate, the math gives one figure at today’s occupancy and a higher one at 92%. Every number here is a fictional teaching assumption.',
    setup: [
      { value: '570', label: 'Apartments', note: 'Class B' },
      { value: '$1,500', label: 'Average monthly rent' },
      { value: '75%', label: 'Occupancy today', note: 'Physical' },
      { value: '92%', label: 'Stabilized occupancy', note: 'Assumed' },
      { value: '45%', label: 'Operating expense ratio' },
      { value: '7.0%', label: 'Cap rate', note: 'Assumed' },
    ],
    move: { headline: 'Test the assumptions before the price.', points: ['Rent roll', 'Trailing statements', 'Lease-up plan', 'Comparable sales'] },
    sections: [],
    module: { kind: 'multifamily', units: 570, avgRent: 1500, occNowPct: 75, occStabPct: 92, expensePct: 45, capPct: 7 },
    caseBlocks: {
      label: 'Illustrative case',
      opportunity: [
        'A 570-apartment Class B property is offered for sale. A quarter of the apartments are empty. The pitch is simple: fill the building and it is worth more.',
        'That may be true. The question is how much of it the numbers support today, and how much depends on things nobody has shown yet.',
      ],
      verified: [],
      limits: [
        'Purchase price',
        'Actual NOI',
        'Renovation cost',
        'Lease-up cost',
        'Financing terms',
        'Hold period',
        'IRR',
        'Equity return',
      ],
      needed: [
        { doc: 'Current rent roll', settles: 'Unit count, rent actually collected and occupancy today' },
        { doc: 'Trailing 12-month operating statements', settles: 'Actual income, actual expenses and actual NOI' },
        { doc: 'Lease-up plan and market study', settles: 'Whether 92% is reachable, how long it takes and what it costs' },
        { doc: 'Property condition report and renovation budget', settles: 'What has to be spent before the empty apartments can be leased' },
        { doc: 'Comparable sales', settles: 'Whether a 7% cap rate fits this property in this market' },
        { doc: 'Asking price and financing terms', settles: 'What the deal costs. Without them no return can be calculated' },
      ],
      capital: {
        lead: 'Does It Pencil? is BullNet’s public teaching series. Hive Capital Markets is BullNet’s capital desk. They are separate, and this page is the series, not the desk.',
        adds: [
          'On a real engagement, capital markets work would bring in a purchase price, lender terms and the cost of the lease-up.',
          'Those inputs are what make coverage, break-even and return questions answerable.',
          'None of that work is in this example, so none of those figures appear here.',
        ],
        close: 'Neither Does It Pencil? nor Hive Capital Markets is a brokerage or an investment advisory service. BullNet is not a lender.',
      },
      decision: [
        'The arithmetic is checked. The inputs are not. That is the difference between a calculation and an underwriting conclusion.',
        'A person decides what happens next: ask for the documents, test the assumptions against them, or walk away. The work shown here is there to inform that decision, not to make it.',
      ],
    },
    questions: [
      { ask: 'Why is a quarter of the building empty?', decides: 'Whether this is a leasing problem, a condition problem or a market problem. Each one costs a different amount to fix.' },
      { ask: 'What does it cost to get to 92%?', decides: 'How much of the gap between the two figures is left after renovation, concessions and time.' },
      { ask: 'Is $1,500 the rent collected or the rent asked?', decides: 'Whether the income in the model exists today.' },
      { ask: 'Does a 45% expense ratio hold at both occupancy levels?', decides: 'Whether modeled NOI is overstated. Many costs do not fall when apartments are empty.' },
      { ask: 'What supports a 7% cap rate?', decides: 'The implied value moves with it. A higher rate gives a lower figure on the same income.' },
      { ask: 'What is the price?', decides: 'Everything about return. Without it, this model can only compare two modeled figures.' },
    ],
    verdict: {
      status: 'INCONCLUSIVE',
      answer: 'Not yet.',
      because:
        'The arithmetic is mathematically verified. Every input is an unverified assumption, and the model has no purchase price, renovation cost, lease-up cost or financing terms. It cannot show whether this pencils.',
      line: 'An AI answer is not an underwriting conclusion.',
    },
  },
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
