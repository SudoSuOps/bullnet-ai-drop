/**
 * Content for the Node section.
 * The Node is optional on-site compute. The equipment listed is what BullNet operates itself, shown as a baseline,
 * not a catalogue. Do not add prices, performance figures, certifications or availability dates here.
 * A developer kit is called a developer kit. A render is captioned as a render.
 */
export type HardwareStatus = 'In operation' | 'In development' | 'Design concept' | 'Proposed configuration';

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
   * Hardware, by evidence. Status is one of:
   *   'In operation'            running in BullNet's own operation, with evidence on file (photo of it running, system output)
   *   'In development'          being built and tested; not yet documented as in operation
   *   'Design concept'          a render or drawing
   *   'Proposed configuration'  not built
   * Owning the hardware, or having a render of it, is not enough for 'In operation'. Upgrade one item at a time as evidence arrives.
   * The page shows a "Hardware we operate" group only when at least one item is 'In operation'.
   */
  hardware: [
    {
      id: 'jetson',
      status: 'In development',
      name: 'Jetson Orin Nano edge box',
      what: 'An NVIDIA Jetson Orin Nano developer kit, intended to run small models on site. It is development hardware, and it does not host the office workspace.',
      img: { src: '/assets/node/jetson-orin-nano-dev-kit.webp', alt: 'Photograph of an NVIDIA Jetson Orin Nano developer kit on a workbench cutting mat: a small circuit board with a fan-cooled module, USB ports, a network port and a display port', width: 1400, height: 1050 },
      caption: 'Photograph of the developer kit on our bench.',
    },
    {
      id: 'edge-case',
      status: 'Design concept',
      name: 'BullNet Edge printed enclosure',
      what: 'An enclosure we are designing to 3D print for the edge unit, with a top fan and an open port bay. The camera and voice add-ons shown are concepts.',
      img: { src: '/assets/node/edge-case-concept.webp', alt: 'Concept render titled BullNet Edge Gold: a 3D-printed case holding a small single-board computer, with a top fan carrying the BullNet B and an open bay showing its USB, network and power ports. Two smaller views show a camera and a microphone attached.', width: 1400, height: 788 },
      caption: 'Concept render. Accessory fit to be verified.',
    },
    {
      id: 'cube',
      status: 'In development',
      name: 'ZimaCube Pro business cube',
      what: 'A six-bay ZimaCube Pro, being configured with a 24GB NVIDIA professional graphics card. The card and its fit, power and drivers in this chassis are being validated.',
      img: { src: '/assets/node/business-cube-concept.webp', alt: 'Illustrative render of a black cube-shaped server with a ribbed front panel, front ports and a BullNet badge', width: 1000, height: 1000 },
      caption: 'Illustrative render. Not a photograph of the unit.',
    },
    {
      id: 'compact',
      status: 'In development',
      name: 'ZimaBoard 2 compact server',
      what: 'A single-board server with drives attached and a low-profile NVIDIA graphics card, being validated for documents, light agents and small models.',
      img: null,
      caption: '',
    },
    {
      id: 'gpu-build',
      status: 'In development',
      name: 'ZimaBoard 2 with a full-size graphics card',
      what: 'The same compact board with an RTX 5080 on separate power. Slot bandwidth, power delivery, cooling, driver and operating system are being validated.',
      img: null,
      caption: '',
    },
    {
      id: 'storage',
      status: 'Proposed configuration',
      name: 'Network storage unit',
      what: 'A multi-drive network storage unit for documents and backups. Not built yet.',
      img: null,
      caption: '',
    },
  ],
  /** Four example configurations. The Node is not a fixed product; each one is designed around the business. */
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
      from: ['jetson', 'edge-case', 'compact'],
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
      from: ['cube'],
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
      from: ['storage'],
    },
    {
      name: 'Node Compute',
      line: 'Dedicated graphics hardware for heavier AI work.',
      does: 'Runs larger models on site.',
      who: 'A business whose document volume or model size is too much for a small box.',
      local: 'Larger models and the agents that use them.',
      more: 'Work beyond what the installed card can carry.',
      manages: 'Setup, model deployment, updates and monitoring.',
      yours: 'Physical security, and power and cooling for the room.',
      note: '',
      from: ['gpu-build'],
    },
  ],
  workflow: {
    ask: 'Which electrical submittals are outstanding, and what changed in the latest drawing revision?',
    steps: [
      { t: 'Files are added', d: 'Approved project files are added to the local document library.' },
      { t: 'The Node processes them', d: 'The Node processes supported content and makes it searchable.' },
      { t: 'A question is asked', d: 'A project manager asks a question through the private AI office.' },
      { t: 'An answer is prepared', d: 'The system prepares an answer with document references and identified exceptions.' },
      { t: 'A person reviews', d: 'A person reviews the findings before acting.' },
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
