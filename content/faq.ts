/**
 * Direct answers to the questions people and AI assistants ask about BullNet.
 * Rendered on the page and published as FAQPage structured data, so both always match.
 * Keep each answer factual and self-contained. Follow docs/security/trust-rules.md.
 */
export const faq = [
  {
    q: 'What is BullNet?',
    a: 'BullNet is a private AI office. It designs, builds, deploys and evaluates private AI systems for one client and one mandate at a time, on bare-metal compute the founder owns and operates. Commercial real estate (CRE) is its first vertical, built on the founder\u2019s approximately 30 years of transaction experience.',
  },
  {
    q: 'What is a private AI office?',
    a: 'A private AI office is a dedicated AI operation that works for one principal or firm, the way a family office is a dedicated staff for one family\u2019s capital. It has a staff of AI agents with written mandates, a private store of the client\u2019s knowledge, an agreed place where the work runs, rules for what confidential data may be used, and tests that check each answer before a person relies on it.',
  },
  {
    q: 'Who does BullNet serve?',
    a: 'BullNet serves principals and firms who want AI working on their own data under their own control. Today that means family offices, private capital groups, commercial property owners, industrial and cold storage operators, CRE investment firms and asset managers. It is not a product for retail investors.',
  },
  {
    q: 'Is BullNet a commercial real estate brokerage?',
    a: 'No. BullNet does not list, market or sell property. It is also not a fund, a securities placement agent or an investment adviser. BullNet provides analytical infrastructure and decision support, and clients keep authority over their information and their decisions.',
  },
  {
    q: 'How is BullNet different from ChatGPT or another general AI assistant?',
    a: 'A general assistant is one shared model that answers any question. BullNet builds a system for one client and one mandate. Its agents work under written mandates, only on data the client has authorized, in an environment the client approves. Numeric outputs are recomputed by deterministic tests, and judgment calls go to a qualified person.',
  },
  {
    q: 'Where does confidential data go when a family office works with BullNet?',
    a: 'That is agreed in writing for each engagement. A BullNet Node can run in the client’s office, in a client-controlled environment, on dedicated private infrastructure, or on bare-metal hardware BullNet operates under a written custody and processing model. Not every deployment is offline, and connectivity is part of what is agreed.',
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
    q: 'Does BullNet use blockchain or sell tokens?',
    a: 'BullNet does not sell tokens or tokenized investments. It is exploring ENS names as optional public identity anchors for devices and agents, used for authentication only. ENS is not an access-control system, and client transaction details are never written to a public chain.',
  },
  {
    q: 'How do I start working with BullNet?',
    a: 'Start with a Flight Sheet request on bullnet.ai, or email build@bullnet.ai or call 561.532.7120. Describe the problem in general terms. Confidential documents are exchanged only after an agreement and an approved channel are in place.',
  },
] as const;
