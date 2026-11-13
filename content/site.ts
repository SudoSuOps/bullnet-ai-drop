/**
 * Editable content configuration for the interactive modules.
 * Every entry is illustrative or a proposed capability unless its status says otherwise.
 * Do not add client names, real transactions, certifications or performance figures here.
 */
export const site = {
  "components": [
    {
      "k": "swarm",
      "n": "01",
      "name": "The Swarm",
      "sub": "Specialized agent workforce",
      "st": "Proposed capability",
      "purpose": "Specialized AI agents, each engineered around one defined CRE workflow.",
      "inp": "An approved Flight Sheet; data the Vault has released to that agent; approved tools.",
      "out": "Draft analyses, abstracts and calculations, each tagged with the agent that produced it.",
      "rel": "Reads from the Hive, runs on the Node, and hands every output to Defendable before a human sees it as finished.",
      "tb": "An agent can touch only the data, tools and actions named in its mandate. Anything outside it escalates to a human."
    },
    {
      "k": "hive",
      "n": "02",
      "name": "The Hive",
      "sub": "Private domain intelligence",
      "st": "Proposed capability",
      "purpose": "Organizes knowledge into four separated stores: BullNet datasets, public and licensed information, client confidential information, and generated work products.",
      "inp": "Curated datasets, licensed feeds, client-authorized documents, validated outputs.",
      "out": "Retrieval results with lineage: which source, which version, which store.",
      "rel": "Supplies the Swarm. Receives finished work from Defendable. Access is decided by the Vault.",
      "tb": "Client stores are isolated per client. One client’s information is never pooled with another’s."
    },
    {
      "k": "node",
      "n": "03",
      "name": "The Node",
      "sub": "Sovereign edge AI appliance",
      "st": "Design concept",
      "purpose": "Local infrastructure that runs models, retrieval, agents, calculations and audit logging close to the data.",
      "inp": "Power, an agreed network position, signed software and model packages.",
      "out": "Local inference and a tamper-evident log of what ran.",
      "rel": "The physical layer under every other component.",
      "tb": "The deployment model fixes who holds the hardware and which connections leave the premises."
    },
    {
      "k": "vault",
      "n": "04",
      "name": "The Vault",
      "sub": "Confidential data authorization",
      "st": "Proposed capability",
      "purpose": "A policy and authorization framework that decides which confidential information may be processed, by which agent, for which purpose.",
      "inp": "NDA and engagement references, data classification, human approvals.",
      "out": "Scoped, time-bound permissions and an access log.",
      "rel": "Sits between client data and everything else. The Flight Sheet tells it what the mandate allows.",
      "tb": "Default is deny. Entry and exit each need their own authorization."
    },
    {
      "k": "id",
      "n": "05",
      "name": "Sovereign ID",
      "sub": "Cryptographic identity",
      "st": "Proposed capability",
      "purpose": "Gives BullNet, each Node, each agent, each mandate and each work product a verifiable cryptographic identity.",
      "inp": "Key pairs, device records, credential issuance and revocation.",
      "out": "Signed manifests, document digests and short-lived access tokens.",
      "rel": "Authenticates every participant in the other seven components.",
      "tb": "Identity proves who signed. It does not prove the signer was right, authorized in the real world, or uncompromised."
    },
    {
      "k": "flight",
      "n": "06",
      "name": "The Flight Sheet",
      "sub": "Mandate and evidence",
      "st": "Proposed capability",
      "purpose": "The standard work specification. It fixes objective, scope, data, calculations, tests and review points before work begins.",
      "inp": "Client objective, authorized users, assumptions, acceptance conditions.",
      "out": "A completed evidence package: inputs, source versions, execution records, validation outcomes, exceptions, reviewer decisions.",
      "rel": "Instructs the Vault and the Swarm. Collects results from Defendable.",
      "tb": "Work outside the approved sheet does not run."
    },
    {
      "k": "defend",
      "n": "07",
      "name": "Defendable",
      "sub": "Validate the validator",
      "st": "Proposed capability",
      "purpose": "Tests work products with deterministic calculation, source reconciliation, benchmark questions and human review.",
      "inp": "Agent outputs, source documents, test definitions.",
      "out": "One of five statuses per claim, with reproducible test output.",
      "rel": "Stands between the Swarm and the client. Nothing is marked verified without passing through it.",
      "tb": "Model confidence is never accepted as proof. Judgment calls are routed to a qualified human."
    },
    {
      "k": "capital",
      "n": "08",
      "name": "Capital Intelligence",
      "sub": "Transaction experience in systems",
      "st": "Proposed capability",
      "purpose": "The domain layer: underwriting, capital structure, debt and equity sensitivities, DCF, cap-rate and lease analysis, and investment committee support.",
      "inp": "Deal documents, market data, the client’s own assumptions.",
      "out": "Scenario comparisons and analysis packages for the people who decide.",
      "rel": "Shapes what the Swarm is asked and what Defendable tests.",
      "tb": "Decision support only. BullNet does not operate a fund, commit capital, place securities or give regulated investment advice."
    }
  ],
  "agents": [
    {
      "n": "Industrial intelligence",
      "role": "Assembles a factual profile of a warehouse or distribution asset.",
      "src": "Hive property and market stores; licensed data",
      "tools": "Retrieval, document parser",
      "out": "Profile with a source reference on every field",
      "esc": "Conflicting sources on size, clear height or tenancy"
    },
    {
      "n": "Cold chain infrastructure",
      "role": "Reviews temperature-controlled facilities: refrigeration plant, power exposure, operational resilience.",
      "src": "Client facility documents; utility and equipment records",
      "tools": "Retrieval, energy cost calculator",
      "out": "Infrastructure summary with flagged unknowns",
      "esc": "Missing equipment age or maintenance records"
    },
    {
      "n": "Capital markets",
      "role": "Structures debt and equity scenarios from stated terms.",
      "src": "Client term sheets; licensed rate data",
      "tools": "Capital stack and DSCR calculators",
      "out": "Scenario table with every assumption listed",
      "esc": "Any term not found in a source document"
    },
    {
      "n": "Lease abstraction",
      "role": "Extracts rent, term, options and expense provisions from executed leases.",
      "src": "Client lease files released by the Vault",
      "tools": "Document parser",
      "out": "Abstract with page citation per field",
      "esc": "Ambiguous clause or missing amendment"
    },
    {
      "n": "Underwriting",
      "role": "Builds NOI and valuation from abstracts and operating statements.",
      "src": "Lease abstracts; trailing-12 statement",
      "tools": "Deterministic calculation engine",
      "out": "Underwriting worksheet with formulas exposed",
      "esc": "Any assumption not approved on the Flight Sheet"
    },
    {
      "n": "Mathematical validator",
      "role": "Recomputes every figure independently of the agent that produced it.",
      "src": "Submitted outputs and their stated inputs",
      "tools": "Test suite only; no generative model",
      "out": "Pass or fail per test, with the recomputed value",
      "esc": "Every failure and every scale anomaly"
    },
    {
      "n": "Data provenance",
      "role": "Checks that each figure traces to a source and version.",
      "src": "Lineage records in the Hive",
      "tools": "Lineage graph",
      "out": "Provenance report",
      "esc": "Any figure with no traceable source"
    },
    {
      "n": "Portfolio monitoring",
      "role": "Watches approved portfolio data for defined events such as expirations and covenant thresholds.",
      "src": "Client portfolio store",
      "tools": "Scheduler, threshold rules",
      "out": "Dated alerts with the rule that fired",
      "esc": "Threshold breach"
    }
  ],
  "vault": [
    {
      "title": "Agreement referenced",
      "text": "The NDA and engagement agreement are recorded on the Flight Sheet. The data has not moved. It is still with the client.",
      "at": [
        91,
        268
      ]
    },
    {
      "title": "Data classified",
      "text": "Each item is classified and tied to permitted purposes and permitted agents. Public and licensed information are tracked separately from client data.",
      "at": [
        206,
        220
      ]
    },
    {
      "title": "Human authorization",
      "text": "A named person approves entry for this mandate. Without that approval the gate stays closed.",
      "at": [
        206,
        84
      ]
    },
    {
      "title": "Authorized agent processing",
      "text": "Only the agents named in the mandate receive access, for the stated purpose, with short-lived credentials.",
      "at": [
        406,
        100
      ]
    },
    {
      "title": "Local analytical work",
      "text": "Calculations and drafts are produced inside the boundary. Every access is logged.",
      "at": [
        406,
        204
      ]
    },
    {
      "title": "Verified work product",
      "text": "Defendable tests the output. A reviewer signs off. The result is stored as a work product with its evidence.",
      "at": [
        580,
        152
      ]
    },
    {
      "title": "External transfer request",
      "text": "Release outside the boundary is denied by default. It needs its own authorization, and the decision is logged either way.",
      "at": [
        624,
        136
      ]
    }
  ],
  "ids": [
    {
      "n": "BullNet identity",
      "ex": "bullnet-example.eth",
      "holds": "Root keys and the registry of issued credentials.",
      "proves": "A record was issued under BullNet’s root.",
      "not": "That any device or agent beneath it is currently trustworthy."
    },
    {
      "n": "Node identity",
      "ex": "node-01.bullnet-example.eth",
      "holds": "A signed device identity record for one appliance.",
      "proves": "A message came from a holder of that device key.",
      "not": "That the device is uncompromised or correctly located."
    },
    {
      "n": "Agent identity",
      "ex": "validator.node-01.bullnet-example.eth",
      "holds": "An agent-specific credential, revocable at any time.",
      "proves": "Which agent produced an output.",
      "not": "That the output is correct."
    },
    {
      "n": "Authorized mandate",
      "ex": "FS-DEMO-0001 (private; not published)",
      "holds": "A short-lived token scoping data, tools and purpose.",
      "proves": "The agent was permitted to do this work at that time.",
      "not": "Real-world legal authority, which rests on the engagement agreement."
    },
    {
      "n": "Signed work product",
      "ex": "sha256 digest plus signature (see receipt)",
      "holds": "A manifest of inputs, tests and results with a document digest.",
      "proves": "The content has not changed since signing.",
      "not": "Anything about the confidential content to the public. Only the digest need be shared."
    }
  ],
  "nodeTabs": [
    {
      "name": "Local inference",
      "text": "Models run on the appliance. Prompts and documents for supported workflows are processed locally.",
      "layer": 1
    },
    {
      "name": "Private data processing",
      "text": "Retrieval runs against local, client-scoped stores. What may be indexed is set by the Vault.",
      "layer": 2
    },
    {
      "name": "Agent runtime",
      "text": "Agents execute under their mandates with only the tools the Flight Sheet approves.",
      "layer": 3
    },
    {
      "name": "Validation",
      "text": "The calculation engine and test suite run beside the agents, so checks need no outside service.",
      "layer": 4
    },
    {
      "name": "Governance boundaries",
      "text": "Identity checks at start-up, audit logging throughout, and offline operation for the workflows that support it.",
      "layer": 5
    }
  ],
  "deploy": [
    {
      "n": "Client office",
      "hw": "On your premises",
      "data": "Stays on site",
      "link": "Outbound connections only as agreed",
      "agree": "Physical access, maintenance visits, update process"
    },
    {
      "n": "Client-controlled environment",
      "hw": "Your data room or colocation cage",
      "data": "Within your environment",
      "link": "Your network policy governs",
      "agree": "Remote support access and its logging"
    },
    {
      "n": "Dedicated private infrastructure",
      "hw": "Single-tenant hardware reserved for you",
      "data": "On dedicated systems",
      "link": "Private connection to your office",
      "agree": "Location, custody terms, exit and deletion"
    },
    {
      "n": "BullNet-operated bare metal",
      "hw": "Hardware BullNet owns and operates",
      "data": "In BullNet custody under a written processing model",
      "link": "Authenticated access for your named users",
      "agree": "Custody and processing terms, retention, deletion, incident response"
    }
  ],
  "exp": [
    {
      "k": "ind",
      "n": "Industrial",
      "l": "Warehouse and distribution assets, underwritten the way a buyer’s committee will question them.",
      "b": [
        "Industrial acquisition underwriting",
        "Warehouse and distribution intelligence",
        "Leasing and occupancy analysis",
        "Property operating assumptions",
        "Industrial market research",
        "Transaction diligence",
        "Portfolio analysis"
      ]
    },
    {
      "k": "cold",
      "n": "Cold Chain",
      "l": "Temperature-controlled facilities, where the building is also a machine.",
      "b": [
        "Temperature-controlled facilities",
        "Cold storage underwriting",
        "Refrigeration infrastructure",
        "Energy and power exposure",
        "Operational resilience",
        "Logistics dependencies",
        "Asset-level infrastructure intelligence"
      ]
    },
    {
      "k": "log",
      "n": "Logistics & Last Mile",
      "l": "Assets valued by their position in a network as much as by their walls.",
      "b": [
        "Distribution infrastructure",
        "Transportation connectivity",
        "Supply chain dependencies",
        "Location intelligence",
        "Last-mile logistics assets",
        "Industrial service networks",
        "Network-level risk mapping"
      ]
    },
    {
      "k": "cap",
      "n": "Capital Markets",
      "l": "Structure, yield and refinancing analysis with every assumption on the page.",
      "b": [
        "Acquisition scenarios",
        "Debt structures",
        "Capital stack modeling",
        "Yield analysis",
        "Refinance scenarios",
        "Discounted cash flow",
        "Transaction document review"
      ]
    },
    {
      "k": "fo",
      "n": "Family Office Systems",
      "l": "Private infrastructure that keeps what the office knows inside the office.",
      "b": [
        "Confidential portfolio intelligence",
        "Private agent environments",
        "Sovereign data infrastructure",
        "Specialized datasets",
        "Custom models",
        "Investment committee support",
        "Institutional knowledge retention"
      ]
    }
  ],
  "life": [
    {
      "name": "Discovery",
      "what": "A conversation about the mandate, the data and the constraints.",
      "you": "A general description of the problem. No confidential documents.",
      "we": "A written summary of fit and open questions."
    },
    {
      "name": "Flight Sheet",
      "what": "The mandate is written down and approved.",
      "you": "Objective, authorized users, data classification, acceptance conditions.",
      "we": "A signed-off Flight Sheet."
    },
    {
      "name": "Architecture",
      "what": "The system is designed for this mandate.",
      "you": "Environment and custody preferences.",
      "we": "Architecture, data boundary and test plan."
    },
    {
      "name": "Prototype",
      "what": "A working slice on representative data.",
      "you": "Sample or synthetic data you approve.",
      "we": "A running prototype you can question."
    },
    {
      "name": "Evaluation",
      "what": "The prototype is tested against known answers.",
      "you": "Reviewer time for exceptions and judgment calls.",
      "we": "Validation report with every status recorded."
    },
    {
      "name": "Deployment",
      "what": "Installation in the agreed environment.",
      "you": "Site or environment access.",
      "we": "A deployed system and an operating runbook."
    },
    {
      "name": "Ongoing service",
      "what": "Maintenance, monitoring and extension.",
      "you": "Change requests and new mandates.",
      "we": "Service on the terms in your agreement."
    }
  ]
} as const;

export type ComponentKey = (typeof site.components)[number]['k'];
export type PracticeKey = (typeof site.exp)[number]['k'];
