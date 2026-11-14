/**
 * The walkthrough on the home page: one fictional operating company and the office BullNet would build for it.
 * This is a made-up company. Do not turn it into a case study, add a real name, or add results.
 * Agents support the work. They do not perform licensed professional services, commit the company to a purchase,
 * or deliver a financial conclusion without source data and a person's review. Every desk ends with who decides.
 */
export const scenario = {
  /**
   * Optional photograph shown beside the opening. Leave null until an image BullNet has the right to publish
   * is added under public/assets/scenario/. The section is laid out to work without it.
   */
  photo: null as null | { src: string; alt: string; width: number; height: number },
  facts: [
    { value: '15', label: 'Employees', note: 'Five years in business' },
    { value: '600', label: 'New units', note: 'One development contract' },
    { value: '2,000 SF', label: 'Current facility', note: 'Industrial flex space, outgrown' },
    { value: '1', label: 'Private AI office', note: 'Built to suit' },
  ],
  pressure: [
    { name: 'Staffing', text: 'Ten electricians and a project manager, hired and onboarded fast.' },
    { name: 'Facilities', text: 'The 2,000 SF industrial flex space cannot hold the crews, trucks and material.' },
    { name: 'Vehicles', text: 'Three more trucks, bought or financed, insured and kept on the road.' },
    { name: 'Suppliers', text: 'Bigger orders, longer lead times, supplier credit and warranties to track.' },
    { name: 'Cash flow', text: 'Payroll and materials go out before progress payments come in.' },
    { name: 'The existing business', text: 'The residential customers who built the company still expect a call back.' },
  ],
  flightSheet: [
    { q: 'What the contract requires', a: 'People, trucks, space, materials, insurance and working capital, on the developer’s schedule.' },
    { q: 'What the business supports today', a: 'Taken from the owner’s own records and numbers, not from assumptions.' },
    { q: 'Where the gaps are', a: 'The list the office is designed around. No gap, no desk.' },
  ],
  desks: [
    {
      name: 'Hiring',
      need: 'Ten electricians and a project manager',
      supports: 'Organizes applicants, credentials, interview schedules and onboarding checklists.',
      human: 'The owner and hiring manager approve every job offer.',
    },
    {
      name: 'Project',
      need: 'Run the 600-unit job without losing the thread',
      supports: 'Keeps submittals, requests for information, change orders, material takeoffs and the schedule in one place, and flags what is late.',
      human: 'The project manager approves anything that goes to the developer.',
    },
    {
      name: 'Fleet',
      need: 'Three more trucks',
      supports: 'Lays out the purchase math from the owner’s own numbers: payment, coverage and how busy each truck has to be to pay for itself. Tracks registration, insurance and maintenance dates.',
      human: 'The owner approves the purchase and signs for it. A lender sets the terms. BullNet is not a lender.',
    },
    {
      name: 'Facilities',
      need: 'More room than the 2,000 SF flex space',
      supports: 'Turns headcount, trucks and inventory into a space requirement, and compares the cost of staying against moving.',
      human: 'The owner approves the building and the lease. A licensed broker handles the lease. BullNet does not.',
    },
    {
      name: 'Operations',
      need: 'The front desk, suppliers and warranties',
      supports: 'Routes calls and web requests, keeps the schedule, and tracks supplier quotes, lead times and warranty dates.',
      human: 'The owner approves purchase orders and warranty commitments. Staff take anything the desk hands off.',
    },
    {
      name: 'Finance',
      need: 'More risk on the books',
      supports: 'Tracks insurance certificates, bonding, licence renewals and contract deadlines, and prepares progress billing and lien waiver paperwork for review. Figures come from source records and are recomputed by code.',
      human: 'The owner approves what is filed and sent, after his accountant, insurer and attorney have reviewed it.',
    },
    {
      name: 'Residential',
      need: 'Keep the customers who built the company',
      supports: 'Follows up on estimates, asks finished customers for reviews, and drafts local marketing for the service area.',
      human: 'The owner approves what goes out under the company name.',
    },
  ],
  /** Illustrative exchange in the office workspace. A concept, not a transcript and not a live product screen. */
  workspace: {
    channels: ['town-square', 'hiring-desk', 'project-desk', 'fleet-desk', 'finance-desk', 'flight-sheets'],
    active: 'hiring-desk',
    ask: 'What do we need to get the 600-unit job staffed?',
    reply: [
      'From the approved Flight Sheet: ten electricians and one project manager.',
      'Candidate tracking is set up, with applicants, licences and interview times in one list.',
      'Draft job postings are ready for your review. Nothing is posted until you approve it.',
    ],
    waiting: 'Waiting on: owner approval of the draft postings',
  },
} as const;
