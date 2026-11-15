# Hive Capital Markets build

Founder assignment received 2026-11-15: build the Hive Capital Markets client experience first, then connect it to the private back office. This file records what each sprint actually delivered, what is simulated, and what blocks the next one.

Standard: no bluff, no invented capability, no unsupported financial claim.

## Sprint 1: public experience (branch `hive-capital-markets-sprint-1`, not merged)

### Built
- `/hive-capital-markets/` rebuilt with nine sections: hero and founder credibility, two service paths, opportunity snapshots, Does It Pencil? method, how the Private AI Office works, client intake, founder, confidentiality and responsible AI, contact.
- CRE path: ten domains, twelve services, and the 570-unit example shown as research questions only. No underwriting result is displayed.
- Equipment path: fourteen categories and three illustrative snapshots (truck, excavator, fleet). No rate, quote or approval appears. Derived figures are calculated in `content/hive.ts` and tested.
- Staged intake for both paths: service selection, a short required first step, optional detail behind a disclosure, a consent checkbox, and a honeypot. No document upload.
- `/api/intake` now also accepts `form: 'hive-cre' | 'hive-equipment'`. It validates every field on the server against `lib/hive-intake.ts`, refuses anything that looks like a Social Security number, and emails one message through Resend with a reference, a UTC timestamp and the consent wording and version.
- The Flight Sheet form on the home page and its behaviour are unchanged.

### What is real and what is not
| Item | State |
| --- | --- |
| Page, snapshots, calculator | ACTUAL. Built, typechecked, statically exported, viewed at 1440 and 390 pixels wide |
| Server-side validation | ACTUAL. Unit tested and exercised from a browser against the real function code |
| Email delivery through Resend | SIMULATED in testing: the Resend call was stubbed. Not verified against the live key |
| "Case" | NOT BUILT. An intake is an email in an inbox. The reference identifies that email. There is no case record, status or database |
| Save and resume | NOT BUILT. The stack has no storage or sign-in |
| Rate limiting | NOT BUILT in code. Needs a Cloudflare rule (below) |
| Mattermost, agents, dashboard, lender directory | NOT BUILT. Nothing on the page claims they exist; the office workflow is labelled Proposed |

### Departures from the written assignment, and why
- **Gold or brass accents:** not used. The brand lock retired brass; the assignment made it conditional on brand compatibility.
- **The $8 billion figure:** kept in the founder section with its caveat, not the hero, under the approved copy rule.
- **Imagery:** one existing founder-supplied image, labelled illustrative. No stock or generated photography was added.
- **Decision vocabulary:** the page shows PENCILS / DOES NOT PENCIL / INSUFFICIENT EVIDENCE. The existing calculator still reports a fourth state, THIN. Left as is; reconcile in Sprint 4.

## Before Sprint 1 can go to production (founder)
- [ ] Review the Cloudflare preview of the branch on a phone and a desktop.
- [ ] Send one real test intake on the preview and confirm it arrives at build@bullnet.ai with its reference. (Preview needs `RESEND_API_KEY` set for the Preview environment.)
- [ ] Add a Cloudflare rate limiting rule on `/api/intake`, for example 5 requests per minute per IP.
- [ ] Privacy notice: the intake collects contact details. Still open on the integration checklist.
- [ ] Counsel: the consent wording (`hive-intake-consent-v1`) and the lender-fee disclosure.

## Sprint 2: intake persistence. Blocked on configuration

A case record needs somewhere to live. The site is a static export with one function and no storage. The smallest addition that fits the existing stack is a Cloudflare D1 database bound to the Pages project. No new framework or auth platform.

Exact configuration checklist (Cloudflare account owner):
1. Workers & Pages → D1 → Create database, name `bullnet-hive`.
2. Pages project → Settings → Bindings → Add → D1 database. Variable name `HIVE_DB`. Add it to Production and Preview (use a separate database for Preview).
3. Apply the schema migration that Sprint 2 will add under `migrations/`.
4. Redeploy.

Until the binding exists the function must keep answering honestly: emailed, not recorded.

## Sprints 3 to 5: decisions needed first
1. **This repository is public.** The lender directory, case workflow, assignment registry and founder dashboard should not be developed in a public repository. Proposed: a separate private repository for the back office, with this site calling it only through a narrow, authenticated intake hand-off.
2. **Internal routes need sign-in.** Proposed: Cloudflare Access in front of every internal route, so no new auth code is written.
3. **Mattermost.** The office address and bot credentials must never enter this repository. Integration needs a founder-created incoming webhook or bot token stored as a Cloudflare secret, and it stays a labelled stub until tested against the real office.
4. **Licensing and lender relationships** (assignment Phase 8, submission controls 2 and 3) are legal and business facts, not code. No lender is shown as a partner and nothing is submitted to a lender.
