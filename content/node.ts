/**
 * Content for the Node section.
 * The Node is optional on-site compute. The equipment listed is what BullNet operates itself, shown as a baseline,
 * not a catalogue. Do not add prices, performance figures, certifications or availability dates here.
 * A developer kit is called a developer kit. A render is captioned as a render.
 */
export const node = {
  functions: [
    {
      name: 'Local processing',
      layer: 1,
      means: 'Supported AI work runs on equipment inside your building.',
      why: 'Sensitive documents do not have to leave your premises to be useful.',
      example: 'Searching project files and drafting a summary on site.',
      approve: 'Which jobs may run locally, set on the Flight Sheet.',
    },
    {
      name: 'Private information',
      layer: 2,
      means: 'The Node works only with the documents and records you approve.',
      why: 'You decide what the system can see, keep and share.',
      example: 'Project files approved. Payroll left out.',
      approve: 'Every source that is added or removed.',
    },
    {
      name: 'Specialized agents',
      layer: 3,
      means: 'Each agent has one defined job, such as finding a document, pulling figures out of it, running a calculation or preparing a report.',
      why: 'Routine work gets done the same way every time.',
      example: 'Pulling due dates out of a stack of submittals.',
      approve: 'What each agent is allowed to do.',
    },
    {
      name: 'Private office connectivity',
      layer: 5,
      means: 'The Node answers through your private AI office, where your team already works.',
      why: 'People ask in one place and get one reviewable answer.',
      example: 'A question typed into the project channel.',
      approve: 'Who may ask which agent.',
    },
    {
      name: 'Additional compute',
      layer: 0,
      means: 'When a job is more than the Node can practically carry, it can run on BullNet Infrastructure.',
      why: 'You are not limited by the size of the box in your office.',
      example: 'Processing a large set of drawings overnight.',
      approve: 'Each job that leaves the building, before it leaves.',
    },
  ],
  /**
   * Four proposed configurations. None is a finalized or certified product.
   * Each build carries its own evidence: tested at BullNet (founder-operated equipment), development hardware, or design concept.
   */
  configs: [
    {
      name: 'Node Edge',
      line: 'A compact on-site unit for a small team.',
      does: 'Light local services, approved agents and connectivity.',
      who: 'A small contractor or office that wants its documents and light AI work on its own premises.',
      local: 'Document search, small models and light agents.',
      more: 'Larger models and heavy document processing.',
      manages: 'Setup, updates, monitoring and agent configuration.',
      yours: 'Physical security, power, internet and user approvals.',
      note: '',
      builds: [
        {
          name: 'Jetson Orin Nano developer kit',
          evidence: 'Tested at BullNet',
          what: 'An NVIDIA developer kit that runs small models on site. It is development hardware, and it does not host the office workspace.',
          img: { src: '/assets/node/jetson-orin-nano-dev-kit.webp', alt: 'Photograph of an NVIDIA Jetson Orin Nano developer kit on a workbench cutting mat: a small circuit board with a fan-cooled module, USB ports, a network port and a display port', width: 1400, height: 1050 },
          caption: 'Photograph of the developer kit on our bench.',
        },
        {
          name: 'BullNet Edge printed case',
          evidence: 'Design concept',
          what: 'A case we design and 3D print for the edge unit, with a top fan and an open port bay. The camera and voice add-ons shown are concepts.',
          img: { src: '/assets/node/edge-case-concept.webp', alt: 'Concept render titled BullNet Edge Gold: a 3D-printed case holding a small single-board computer, with a top fan carrying the BullNet B and an open bay showing its USB, network and power ports. Two smaller views show a camera and a microphone attached.', width: 1400, height: 788 },
          caption: 'Concept render. Accessory fit to be verified.',
        },
        {
          name: 'ZimaBoard 2 with a low-profile graphics card',
          evidence: 'Tested at BullNet',
          what: 'A single-board server with drives attached and an NVIDIA T1000 card. Documents, light agents and small models.',
          img: null,
          caption: '',
        },
      ],
    },
    {
      name: 'Node Business',
      line: 'One box for computing, storage and applications.',
      does: 'Brings computing, document storage and applications together in one on-site system.',
      who: 'A growing team that wants one system on its own premises.',
      local: 'Document services, storage, agents and mid-size models.',
      more: 'The largest models and bulk processing.',
      manages: 'Setup, updates, monitoring, storage layout and agent configuration.',
      yours: 'Physical security, power, internet, user approvals and drive replacement decisions.',
      note: '',
      builds: [
        {
          name: 'ZimaCube Pro with a 24GB graphics card',
          evidence: 'Tested at BullNet',
          what: 'Six drive bays and an NVIDIA RTX PRO 4000 Blackwell card in its low-profile SFF form, the version this chassis can power and fit.',
          img: { src: '/assets/node/business-cube-concept.webp', alt: 'Illustrative render of a black cube-shaped server with a ribbed front panel, front ports and a BullNet badge', width: 1000, height: 1000 },
          caption: 'Illustrative render. Not a photograph of the unit.',
        },
      ],
    },
    {
      name: 'Node Vault',
      line: 'Storage for business documents and backups.',
      does: 'Holds documents and backups in one organized place, with controlled access.',
      who: 'A business with years of records that need one protected home.',
      local: 'File storage, backup and access control. It does not run AI models.',
      more: 'All AI work, which runs on another Node or on BullNet Infrastructure.',
      manages: 'Setup, access rules, the backup schedule and restore tests.',
      yours: 'Physical security, and deciding what is kept and for how long.',
      note: 'Drive redundancy is not a backup, so a second copy is kept somewhere else. Node Vault is storage hardware. The Vault is the policy that governs who may use what.',
      builds: [
        {
          name: 'Network storage unit',
          evidence: 'Proposed',
          what: 'A multi-drive network storage unit. No unit has been tested at BullNet yet.',
          img: null,
          caption: '',
        },
      ],
    },
    {
      name: 'Node Compute',
      line: 'Dedicated graphics hardware for heavier AI work.',
      does: 'Runs larger models on site at useful speed.',
      who: 'A business whose document volume or model size is too much for a small box.',
      local: 'Larger models and the agents that use them.',
      more: 'Work beyond what the installed card can carry.',
      manages: 'Setup, model deployment, updates and monitoring.',
      yours: 'Physical security, and power and cooling for the room.',
      note: '',
      builds: [
        {
          name: 'ZimaBoard 2 with an RTX 5080',
          evidence: 'Tested at BullNet',
          what: 'The compact board with a full-size graphics card on its own power supply.',
          img: null,
          caption: '',
        },
      ],
    },
  ],
  workflow: {
    ask: 'Which electrical submittals are outstanding, and what changed in the latest drawing revision?',
    steps: [
      { t: 'He asks', d: 'The project manager asks in the private AI office.' },
      { t: 'Records are retrieved', d: 'The system pulls the project records he is permitted to see.' },
      { t: 'Revisions are compared', d: 'A specialized agent compares the approved document revisions.' },
      { t: 'The Node does the work', d: 'Supported processing runs on site.' },
      { t: 'Sources are attached', d: 'Differences are assembled with a reference to each source.' },
      { t: 'The answer is checked', d: 'Validation flags unsupported claims and missing evidence.' },
      { t: 'He gets a report', d: 'A report he can read, question and review.' },
      { t: 'A person decides', d: 'He decides what to issue or change.' },
    ],
  },
  control: [
    { name: 'Custody', text: 'Where your information is stored, and for how long, is written down before work starts.' },
    { name: 'Authorization', text: 'Nothing connects out of your building unless you have approved that connection.' },
    { name: 'Access', text: 'Who can see which documents and ask which agents is set per person.' },
    { name: 'Human approval', text: 'A person approves every consequential decision.' },
  ],
  connection: [
    { name: 'The Node', text: 'Where supported processing happens locally.' },
    { name: 'The Private AI Office', text: 'Where people work with approved agents, projects, documents, reports and decisions.' },
    { name: 'BullNet Infrastructure', text: 'Where authorized workloads get additional private computing power.' },
    { name: 'The Swarm', text: 'Specialized agents carrying out assigned work.' },
    { name: 'The Hive', text: 'Approved business knowledge and intelligence sources.' },
    { name: 'Defendable', text: 'Evaluation, source checking, calculation verification and exception reporting.' },
    { name: 'The Flight Sheet', text: 'What is authorized, what information can be used, where processing can occur and who approves the result.' },
  ],
} as const;
