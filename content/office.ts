/**
 * Content for the Private AI Office section. The office is the customer-facing product.
 * The contractor is the same fictional company used in the growth example. Nothing here is a client or a result.
 * There is no standard agent roster: the desks named below belong to this one fictional configuration.
 * The Chief of Staff and document-grounded answers are proposed, and are labelled that way on the page.
 */
export const office = {
  receive: [
    { name: 'A private workspace', text: 'Channels for your teams and projects, on a desk or a phone.' },
    { name: 'Agents built for your work', text: 'Each one has a single job, a list of what it may read and a list of what it may do.' },
    { name: 'Your information, organized', text: 'The documents and records you approve, in one place the agents can search.' },
    { name: 'A place the work runs', text: 'Compute BullNet hosts privately, an optional Node in your building, or both.' },
    { name: 'A team that stays', text: 'BullNet builds the office, operates it and adjusts it as your business changes.' },
  ],
  moments: [
    {
      time: '7:00 AM',
      who: 'The owner',
      where: 'In the truck, on his phone',
      phone: true,
      channel: 'approvals',
      ask: 'What needs me today?',
      desk: 'Operations desk',
      reply: [
        'Three items are waiting on your approval.',
        'A job offer for an electrician, from the Hiring desk, with the interview notes attached.',
        'A purchase order for conduit, from the Operations desk, with the supplier quotes attached.',
        'A change order response for Building C, from the Project desk, with the developer’s request attached.',
      ],
      gap: 'One of the conduit quotes has expired. A fresh quote is needed before the two can be compared.',
      waiting: 'Waiting on: owner approval',
      work: 'Gathers what each desk has prepared and lists what is waiting on him.',
      evidence: 'Each item carries the documents behind it. One expired supplier quote is flagged.',
      human: 'The owner approves each item or sends it back. Nobody is hired and nothing is bought or sent until he does.',
    },
    {
      time: '10:30 AM',
      who: 'The project manager',
      where: 'At the site',
      phone: false,
      channel: 'project-desk',
      ask: 'What’s holding up Building C?',
      desk: 'Project desk',
      reply: [
        'Two requests for information are open with the developer, both about panel locations. Each links to its entry in the RFI log.',
        'One lighting submittal is past its due date, per the submittal register.',
      ],
      gap: 'No delivery date is on file for the panel order. I could not find one in the supplier documents.',
      waiting: 'Waiting on: project manager review',
      work: 'Searches the approved project records for anything open or late on Building C.',
      evidence: 'Each finding points to the record it came from. A missing delivery date is reported as a gap, not guessed.',
      human: 'The project manager decides what to chase and what goes to the developer. A document search does not replace engineering review.',
    },
    {
      time: '3:00 PM',
      who: 'The office manager',
      where: 'In the office',
      phone: false,
      channel: 'finance-desk',
      ask: 'Is this month’s progress billing ready?',
      desk: 'Finance desk',
      reply: [
        'A draft is ready, built from the approved schedule of values and this month’s completed work.',
        'The totals were recomputed by code and match the draft.',
      ],
      gap: 'Two line items need review: a change order that is not yet approved, and stored materials with no receipt on file.',
      waiting: 'Waiting on: owner and accountant review',
      work: 'Prepares the draft from approved project records and recomputes the totals with code.',
      evidence: 'Figures trace to the records they came from. Two items are marked for review.',
      human: 'The owner and his accountant review it before anything is sent to the developer.',
    },
  ],
  together: [
    { name: 'People ask', text: 'A question goes in the channel where the work lives.' },
    { name: 'Agents prepare', text: 'The agent with that job uses approved information, does its defined work and shows its sources.' },
    { name: 'People approve', text: 'Nothing consequential is sent, bought or committed until a named person says so.' },
  ],
  control: [
    { name: 'What agents can read', text: 'Only the sources you approve. Each agent gets its own list.' },
    { name: 'Who can ask what', text: 'Access is set per person, per channel and per agent.' },
    { name: 'What leaves', text: 'Nothing leaves your office unless that connection was approved first.' },
    { name: 'What is recorded', text: 'Requests and results are kept, so a person can see what was asked and what came back.' },
  ],
  bullnet: [
    { name: 'Build', text: 'We design the office around your Flight Sheet: the channels, the agents and the information they use.' },
    { name: 'Operate', text: 'We run it day to day and watch that it is working.' },
    { name: 'Maintain', text: 'We apply updates, fix what breaks and adjust agents as the work changes.' },
    { name: 'Support', text: 'Your team has people to call.' },
  ],
  /** What stands behind the page, in three classes. Mattermost is named once, here. */
  basis: [
    { name: 'Demonstrated', text: 'The Flight Sheet request form on this site, tested end to end.' },
    { name: 'Documented platform capability', text: 'The workspace is built on Mattermost, a configurable collaboration platform that can be self-hosted. Its documentation describes private channels, desktop and phone apps, AI agents in channels, and access set by person and channel. How those controls are set in a given BullNet office is confirmed for that office.' },
    { name: 'Proposed integration', text: 'Agents answering from your approved documents with references, results held for approval, the Chief of Staff, and the connection between the office and a Node. Each is built and tested for a deployment before it is relied on.' },
  ],
} as const;
