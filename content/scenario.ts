/**
 * The walkthrough on the home page: one illustrative operating company and the office BullNet would build for it.
 * This is a made-up company. Do not turn it into a case study, add a real name, or add results.
 * Every need ends with what a person approves: agents do the work, people make the decisions.
 */
export const scenario = {
  facts: [
    { value: '15', label: 'Employees', note: 'Five years in business' },
    { value: '2,000 SF', label: 'Industrial flex space', note: 'Outgrown' },
    { value: '600 units', label: 'New construction job', note: 'For a national developer' },
    { value: '1 county', label: 'Service area', note: 'Palm Beach County' },
  ],
  needs: [
    {
      need: 'Hire ten electricians and a project manager',
      build: 'Hiring desk agent',
      does: 'Drafts the job posts, keeps applicants in one list, schedules interviews, and tracks licences, certifications and onboarding paperwork for each new hire.',
      human: 'The owner decides every hire.',
    },
    {
      need: 'Run the 600-unit job',
      build: 'Project agent',
      does: 'Keeps submittals, requests for information, change orders, material takeoffs and the schedule in one place for the project manager, and flags what is late.',
      human: 'The project manager approves anything that goes to the developer.',
    },
    {
      need: 'Three more trucks',
      build: 'Hive Capital Markets',
      does: 'Pencils the trucks: payment, coverage and how busy each one has to be to pay for itself. Sets out procurement terms and introduces lenders where they fit.',
      human: 'The owner signs. The lender sets the terms.',
    },
    {
      need: 'A bigger building',
      build: 'Space intelligence agent',
      does: 'Turns headcount, trucks and inventory into a space requirement, gathers market intel on what is available, and pencils staying against moving.',
      human: 'The owner picks the building. A licensed broker handles the lease. BullNet does not.',
    },
    {
      need: 'Two people on the front desk',
      build: 'Front desk agent',
      does: 'Answers and routes calls and web requests, books estimates and keeps the schedule, so the two new coordinators handle the work that needs a person.',
      human: 'Staff handle anything the agent hands off, and set what it may say.',
    },
    {
      need: 'Suppliers, manufacturers and warranties',
      build: 'Supply agent',
      does: 'Tracks supplier quotes and lead times, manufacturer terms, and warranty registrations and expiry dates for what the company installs.',
      human: 'The owner approves purchase orders and warranty commitments.',
    },
    {
      need: 'More risk on the books',
      build: 'Compliance agent',
      does: 'Tracks insurance certificates, bonding, licence renewals and contract deadlines, and prepares progress billing and lien waiver paperwork.',
      human: 'The owner and his advisers review before anything is filed or sent.',
    },
    {
      need: 'Keep the residential business growing',
      build: 'Service and marketing agent',
      does: 'Follows up on estimates, asks finished customers for reviews, and drafts local marketing for the service area.',
      human: 'The owner approves what goes out under the company name.',
    },
  ],
} as const;
