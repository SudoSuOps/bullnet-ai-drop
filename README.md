# BullNet.ai flagship site

Private CRE intelligence infrastructure. This repository is the public marketing site: a statically exported Next.js app with no server, no database and no secrets.

## Quick start

```bash
npm install
npm run dev        # http://localhost:3000
npm run typecheck
npm test           # deterministic validator tests
npm run build      # static site in ./out
```

Requires Node 22 or later (`.nvmrc`).

## Deploy on Cloudflare Pages

| Setting | Value |
| --- | --- |
| Framework preset | Next.js (Static HTML Export) |
| Build command | `npm run build` |
| Build output directory | `out` |
| Environment variable | `NODE_VERSION` = `22` |

Full steps, custom domain and headers: [docs/deployment/cloudflare-pages.md](docs/deployment/cloudflare-pages.md).

## Structure

```
app/                     layout, page, metadata, robots, sitemap, favicon
components/              page sections and shared UI
  architecture/          system explorer, Vault boundary, Node
  validation/            deterministic validator and its shared state
  flight-sheet/          sample Flight Sheet and intake form
  identity/              Sovereign ID hierarchy and evidence receipt
content/site.ts          editable content for every interactive module
lib/validate.ts          pure valuation test (DEF-CAP-001) with unit tests
styles/globals.css       design system: tokens, type, components
public/assets/brand/     master B, wordmark, lockups (SVG)
public/assets/social/    social banners (SVG)
public/_headers          Cloudflare Pages security and cache headers
docs/                    brand, security, deployment, integration checklist
```

## What is real and what is a demonstration

| Area | Status |
| --- | --- |
| Validator (section 08) | Real arithmetic, runs in the browser, unit tested. Not a deployed model evaluator. |
| Evidence receipt (section 06) | Real SHA-256 digest of the payload shown. No signature: the site holds no key. Names are hypothetical. |
| Sample Flight Sheet (section 10) | Hypothetical figures driven by the validator inputs. |
| Intake form | Validates in the browser. Sends nothing until `NEXT_PUBLIC_INTAKE_ENDPOINT` is set to an approved endpoint. |
| Vault, Sovereign ID, Node, Swarm, Hive | Proposed capabilities and design concepts, labelled as such on the page. |

## Before launch

See [docs/integration-checklist.md](docs/integration-checklist.md). The short list: founder sign-off on track-record wording, legal review of disclosures, trademark clearance of the mark, an approved intake endpoint, and an authorized founder photograph.

## Editing rules

Read [docs/security/trust-rules.md](docs/security/trust-rules.md) before changing copy. The mark and palette are locked: [docs/brand/guidelines.md](docs/brand/guidelines.md).

## Not built yet

- Separate routes (`/family-office`, `/industrial`, `/cold-chain`, `/logistics`, `/capital-markets`, `/the-system`, `/the-node`, `/the-vault`, `/sovereign-id`, `/defendable`, `/flight-sheet`, `/about`, `/contact`). Everything is on `/` today.
- Tailwind CSS. The design system is plain CSS with custom properties, which kept the dependency list to Next, React and three font packages.
- Server-backed intake, authorized photography, Node concept views beyond the front elevation.
