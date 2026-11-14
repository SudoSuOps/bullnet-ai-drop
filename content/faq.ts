/**
 * Direct answers to the questions people and AI assistants ask about BullNet.
 * Rendered on the page and published as FAQPage structured data, so both always match.
 * Keep each answer factual and self-contained. Follow docs/security/trust-rules.md.
 */
export const faq = [
  {
    q: 'What is BullNet?',
    a: 'BullNet builds private AI offices to suit. It custom-builds AI agents for small and mid-size companies that run on real estate and equipment, such as warehouse operators, contractors and distributors, then manages the infrastructure, organizes the data and works out the math on equipment purchases. It runs on bare-metal compute the founder owns and operates, and it is built on the founder\u2019s approximately 30 years as a commercial real estate broker.',
  },
  {
    q: 'What is a private AI office?',
    a: 'A private AI office is the workspace where one company\u2019s people and its approved AI agents work together. It has a staff of AI agents with written mandates, an organized store of the company\u2019s own information, an agreed place where the work runs, rules for what confidential data may be used, and tests that check each answer before a person relies on it. BullNet designs, builds and operates it.',
  },
  {
    q: 'What is the BullNet Node?',
    a: 'The BullNet Node is a private AI computer that sits inside a client\u2019s business. It runs approved models and agents on the client\u2019s information, on site, and connects to BullNet only when the client authorizes it. The Node is optional: an office can also run on BullNet Infrastructure, the private compute BullNet owns and operates. The Node is a design concept today, and no hardware specifications are published.',
  },
  {
    q: 'Will a private AI office disrupt how my business runs today?',
    a: 'It is designed not to. BullNet works one job at a time. Each build first runs in shadow, beside the current process, where its output is reviewed but not used. It goes live only after it passes its tests and a named person at the company signs off. Nothing the business relies on is replaced on day one.',
  },
  {
    q: 'Does BullNet build its own AI models?',
    a: 'Usually not, and it does not need to. The model is off the shelf and the agent is built to suit. BullNet uses the lowest of four rungs that does the job: a plain script with no AI model, a configured agent on a proven open model, a grounded agent that answers from the client\u2019s approved documents, or a fine-tuned model trained further on approved data. Fine-tuning is used only where the lower rungs test short.',
  },
  {
    q: 'Who does BullNet serve?',
    a: 'BullNet serves small and mid-size companies that operate inside real estate and rely on equipment: warehouse and distribution operators, contractors, logistics and cold storage companies. It also works with property owners, family offices and private capital groups. It is not a product for retail investors.',
  },
  {
    q: 'Why are BullNet\u2019s AI agents custom-built?',
    a: 'The general models are strong. What a business is missing is the fit. BullNet starts from strong models and builds each agent for one need, the way a single-tenant building is built for one occupant, and a business with many needs gets many agents. Each is tuned to the client\u2019s work and data, fitted into existing systems, and then managed, fixed and adjusted over time. A person approves every consequential decision.',
  },
  {
    q: 'What would BullNet build for a growing contractor?',
    a: 'As an illustration: an electrical contractor with 15 employees wins a large new construction job and needs more crew, trucks, space and office staff. BullNet would build one agent per need, such as a hiring desk, a project agent for submittals and change orders, a front desk agent, a supply and warranty agent and a compliance agent, and would pencil the truck purchases. A person at the company approves every consequential decision.',
  },
  {
    q: 'Is BullNet a commercial real estate brokerage?',
    a: 'No. BullNet does not list, market or sell property, and it does not act as an agent in property transactions. It is also not a lender, a fund, a securities placement agent or an investment adviser. BullNet provides analytical infrastructure and decision support, and clients keep authority over their information and their decisions.',
  },
  {
    q: 'How is BullNet different from ChatGPT or another general AI assistant?',
    a: 'A general assistant is one shared model that answers any question. BullNet builds a system for one client and one mandate. Its agents work under written mandates, only on data the client has authorized, in an environment the client approves. Numeric outputs are recomputed by deterministic tests, and judgment calls go to a qualified person.',
  },
  {
    q: 'Where does my data go, and does everything run locally?',
    a: 'That is agreed in writing for each job. Work can run on a BullNet Node inside the client’s business, on BullNet Infrastructure that BullNet owns and operates under a written custody and processing model, or split between the two. Not every deployment is offline, and a connected job is not automatically private: what may leave the client’s environment is listed and approved before the work starts.',
  },
  {
    q: 'What is a Flight Sheet?',
    a: 'A Flight Sheet is BullNet’s standard work specification and evidence package. Before work starts it fixes the objective, scope, permitted data, required calculations, tests and human review points. When work ends it holds the inputs, source versions, validation outcomes, exceptions and reviewer decisions.',
  },
  {
    q: 'How does BullNet check that an AI answer is correct?',
    a: 'BullNet never treats model confidence as proof. Its evaluation layer, called Defendable, recomputes calculations independently, reconciles claims against source documents and routes judgment calls to a person. Every claim gets one of five statuses: mathematically verified, evidence supported, inconclusive, failed, or requires human review.',
  },
  {
    q: 'What kinds of commercial real estate work does BullNet support?',
    a: 'BullNet has five practice areas: industrial, cold chain, logistics and last mile, capital markets, and family office systems. Typical work includes acquisition underwriting, lease abstraction, cap-rate and discounted cash flow analysis, debt and equity sensitivities, due diligence support and investment committee preparation.',
  },
  {
    q: 'What is Hive Capital Markets?',
    a: 'Hive Capital Markets is the capital desk of BullNet. It works out the acquisition math for equipment, trucks, machinery, GPU infrastructure and commercial real estate: payment, coverage, break-even utilization and the scenarios that break a deal. It prepares lender-ready packages and can introduce clients to lenders. BullNet is not a lender, and any financing comes from third-party lenders on their own terms. A lender may pay BullNet a fee when a financing closes, and BullNet tells the client when that applies.',
  },
  {
    q: 'Does BullNet use blockchain or sell tokens?',
    a: 'BullNet does not sell tokens or tokenized investments. It is exploring ENS names as optional public identity anchors for devices and agents, used for authentication only. ENS is not an access-control system, and client transaction details are never written to a public chain.',
  },
  {
    q: 'How do I start working with BullNet?',
    a: 'Start with a Flight Sheet request on bullnet.ai, or email build@bullnet.ai or call 561.532.7120. Describe the problem in general terms. Confidential documents are exchanged only after an agreement and an approved channel are in place.',
  },
] as const;
