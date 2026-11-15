/**
 * Content for the Hive Capital Markets page.
 *
 * Every snapshot here is an illustrative example with hypothetical figures. None is a client engagement,
 * a lender quote, a rate, an approval or a completed underwriting. Derived figures are calculated by the
 * functions below from the stated inputs, never typed in by hand, and checked in tests/hive-intake.test.ts.
 */
export const CRE_DOMAINS = [
  'Industrial and logistics', 'Multifamily', 'Retail and single-tenant net lease', 'Office', 'Hospitality', 'Cold storage',
  'Land and development', 'Sale-leaseback', '1031 exchange transaction analysis', 'Debt and capital markets',
] as const;

export const CRE_SERVICES = [
  'Asset intelligence', 'Market research', 'Financial modeling', 'NOI analysis', 'Cap-rate sensitivity', 'Debt-service coverage',
  'Lease analysis', 'Acquisition and disposition scenario analysis', 'Transaction document review', 'Capital-stack analysis',
  'Valuation sensitivity', 'Underwriting support',
] as const;

export const CRE_SNAPSHOT = {
  asset: '570-unit multifamily community',
  occupancy: '75%',
  questions: [
    'What is the occupancy-adjusted NOI?',
    'What is the stabilized value?',
    'What rent-growth assumptions are required?',
    'What capital investment is necessary?',
    'What are the debt constraints?',
    'What happens under downside conditions?',
  ],
  workbench: '/does-it-pencil/570-units-7-cap/',
} as const;

/** Whole dollars. Price less the down payment. */
export const financed = (price: number, downPct: number): number => Math.round(price * (1 - downPct / 100));
/** Whole dollars. The assumed share of the price still there at the end of the term. */
export const residual = (price: number, residualPct: number): number => Math.round((price * residualPct) / 100);

export interface ScheduleRow { quarter: string; what: string; units: number; unitCost: number }
export const rowCost = (r: ScheduleRow): number => r.units * r.unitCost;
export const fleetTotal = (rows: readonly ScheduleRow[]): number => rows.reduce((n, r) => n + rowCost(r), 0);

export const EQUIPMENT_SNAPSHOTS = [
  {
    key: 'A',
    title: 'Contractor truck',
    setup: 'A contractor needs financing to acquire a commercial service truck.',
    price: 92_000,
    downPct: 10,
    termMonths: 60,
    structure: 'Equipment finance agreement: the contractor owns the truck and the lender holds a lien until it is paid',
    checklist: [
      'Dealer quote or buyer’s order',
      'Legal business name, formation date and owners',
      'Truck description, and the VIN once assigned',
      'Insurance agent contact',
      'Financial statements, only if the lender asks, and only through a secure channel',
    ],
  },
  {
    key: 'B',
    title: 'Heavy equipment',
    setup: 'A construction company is acquiring an excavator.',
    price: 240_000,
    age: '4 years old, bought used',
    utilization: '1,200 hours a year, expected',
    residualPct: 45,
    termMonths: 60,
    leaseVsBuy: [
      'Who carries the resale risk at the end: the company if it owns, the lessor on a fair-market-value lease',
      'Whether the term is shorter than the working life left in a four-year-old machine',
      'Hour limits and return conditions written into a lease',
      'Tax treatment, which is a question for the company’s accountant',
    ],
    repayment: 'What the machine earns at 1,200 hours, after operator, fuel and maintenance, has to cover its payment with room to spare.',
  },
  {
    key: 'C',
    title: 'Equipment fleet',
    setup: 'A company is replacing six aging assets over one year.',
    schedule: [
      { quarter: 'Q1', what: 'Service trucks', units: 2, unitCost: 95_000 },
      { quarter: 'Q2', what: 'Wheel loader', units: 1, unitCost: 210_000 },
      { quarter: 'Q3', what: 'Trailers', units: 2, unitCost: 45_000 },
      { quarter: 'Q4', what: 'Service truck', units: 1, unitCost: 95_000 },
    ] as ScheduleRow[],
    alternatives: [
      'One master agreement with a new schedule at each delivery',
      'A separate transaction for each unit',
      'Lease the short-life units and finance the long-life ones',
    ],
    cashFlow: 'Each delivery adds a payment. Quarter by quarter, the test sets those payments against what the new units earn and what the old ones stop costing in repairs and downtime.',
  },
] as const;

export const LABELS = [
  { k: 'FACT', t: 'Checked against a primary source.' },
  { k: 'CALCULATION', t: 'Formula and inputs shown.' },
  { k: 'ASSUMPTION', t: 'Stated, not verified.' },
  { k: 'INFERENCE', t: 'Reasoned from the evidence, and marked as such.' },
  { k: 'QUESTION', t: 'Has to be confirmed.' },
  { k: 'EXCEPTION', t: 'A contradiction, a gap or a concern.' },
  { k: 'CORRECTION', t: 'A revised finding, with the reason. The original stays on the record.' },
] as const;

export const DECISIONS = [
  { k: 'PENCILS', cls: 'v-pass', t: 'On the stated numbers, the math holds.' },
  { k: 'DOES NOT PENCIL', cls: 'v-fail', t: 'On the stated numbers, the math does not hold.' },
  { k: 'INSUFFICIENT EVIDENCE', cls: 'v-inc', t: 'Too much is unknown to say either way. We say so.' },
] as const;

export const OFFICE_STEPS = [
  { n: 'You send the question', t: 'A short intake in general terms. No documents.' },
  { n: 'Research and math', t: 'Sources are gathered and labelled. Calculations run in code, with inputs and formulas kept.' },
  { n: 'Validation', t: 'Figures are recalculated a second way, sources are checked, and exceptions are listed.' },
  { n: 'Senior review', t: 'An experienced person challenges the assumptions, corrects errors, and accepts the work or sends it back.' },
  { n: 'You decide', t: 'You receive the paper. Nothing goes to a lender or anyone else without your written authorization.' },
] as const;

export const SAFEGUARDS = [
  { n: 'Short by design', t: 'The intake asks for the least we need to start. You can add detail later.' },
  { n: 'No documents here', t: 'This site does not accept uploads. Sensitive files move only after an agreement and an approved secure channel are in place.' },
  { n: 'Never on this form', t: 'Social Security numbers, tax returns, bank statements and government IDs.' },
  { n: 'Your authorization first', t: 'Your information is not forwarded to a lender or any third party without your separate written authorization.' },
  { n: 'Research, not a verdict', t: 'An AI answer is not an underwriting conclusion. A person reviews the work and approves every consequential decision.' },
  { n: 'Analysis, not brokerage', t: 'We do not list, market or negotiate property, and we do not represent buyers, sellers, landlords or tenants.' },
] as const;
