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
  gear: [
    {
      name: 'Edge box',
      status: 'In use at BullNet',
      what: 'An NVIDIA Jetson Orin Nano developer kit. A small desktop unit that runs small models on site. It is development hardware, and it does not host the office workspace.',
      img: { src: '/assets/node/jetson-orin-nano-dev-kit.webp', alt: 'Photograph of an NVIDIA Jetson Orin Nano developer kit on a workbench cutting mat: a small circuit board with a fan-cooled module, USB ports, a network port and a display port', width: 1400, height: 1050 },
      caption: 'Photograph of the developer kit on our bench.',
    },
    {
      name: 'Printed case',
      status: 'In use at BullNet',
      what: 'A case we design and 3D print for the edge box, with a top fan and an open port bay. The camera and voice add-ons shown are concepts.',
      img: { src: '/assets/node/edge-case-concept.webp', alt: 'Concept render titled BullNet Edge Gold: a 3D-printed case holding a small single-board computer, with a top fan carrying the BullNet B and an open bay showing its USB, network and power ports. Two smaller views show a camera and a microphone attached.', width: 1400, height: 788 },
      caption: 'Concept render of our printed case. Accessory fit to be verified.',
    },
    {
      name: 'Business cube',
      status: 'In use at BullNet',
      what: 'A ZimaCube Pro: six drive bays, with a 24GB NVIDIA professional graphics card fitted. Computing, storage and local models in one box.',
      img: { src: '/assets/node/business-cube-concept.webp', alt: 'Illustrative render of a black cube-shaped server with a ribbed front panel, front ports and the BullNet B', width: 1000, height: 1000 },
      caption: 'Illustrative render. Not a photograph of the unit.',
    },
    {
      name: 'Compact server',
      status: 'In use at BullNet',
      what: 'A ZimaBoard 2 single-board server with drives attached, run with a low-profile NVIDIA graphics card. Documents, light agents and small models for a small team.',
      img: null,
      caption: '',
    },
    {
      name: 'GPU build',
      status: 'In use at BullNet',
      what: 'The same compact board with a full-size RTX 5080 graphics card on its own power supply, for heavier local model work.',
      img: null,
      caption: '',
    },
    {
      name: 'Storage',
      status: 'Proposed configuration',
      what: 'A network storage unit for documents and backups. It stores and protects information. It does not run AI models, and drive redundancy on its own is not a backup.',
      img: null,
      caption: '',
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
