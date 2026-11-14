# Operational integration checklist

Nothing below is done by the code in this repository. Each item needs a named owner.

## Founder verification
- [ ] Wording of "approximately 30 years" and "approximately $8 billion" in historical transaction volume. If documentation exists, "not independently audited" can be replaced with what it shows
- [ ] "About 200 dials a day, by his own count" in the founder section
- [ ] "Former national industrial team leadership" and "institutional investment sales" claims
- [ ] "Existing infrastructure" label on founder-owned compute
- [ ] "The workspace is built on Mattermost" in the Private AI Office section: confirm against the real deployment, edition and license
- [ ] "Designed as a separate workspace per client" and the Hive separation wording: confirm the actual separation design
- [ ] Agent roster: the system explorer and the contractor example still list different agents. Replace both once the roster is defined
- [ ] Authorized founder photograph (the page shows a reserved frame)
- [x] Public contact details: build@bullnet.ai, 561.532.7120, @bullnetai on X (added 2026-11-13)

## Legal review
- [ ] Footer disclosures: not a brokerage, fund, placement agent or investment adviser
- [ ] Vault wording: "not a regulated escrow service"; contract vs technical policy vs custody
- [ ] Trademark clearance of the B mark and the BULLNET name before filings or print
- [ ] **Privacy notice: now due.** The intake form sends personal contact details by email

## Hive Capital Markets
- [ ] Counsel review: licensing or registration for arranging commercial and equipment financing in each state served, limits on advance fees, and required compensation disclosures
- [ ] Counsel to confirm the lender-fee disclosure now on the site ("A lender may pay BullNet a fee when a financing closes, and we tell you when that applies") and the process for telling each client
- [ ] Confirm no fee depends on a property sale or lease, so "not a broker" holds in practice
- [ ] Cloudflare: add hivecapitalmarkets.com and a 301 Redirect Rule to `https://bullnet.ai/hive-capital-markets/`

## Security and deployment validation
- [x] Intake endpoint built (`/api/intake`, Resend). Needs `RESEND_API_KEY` set as a secret in Cloudflare
- [ ] Rate limiting rule on `/api/intake`; retention policy for intake emails
- [ ] Content-Security-Policy decision (see deployment guide)
- [ ] Cloudflare Access on preview deployments until launch
- [ ] Any Vault, Sovereign ID or Node control is implemented and tested before the site describes it as operational

## Identity
- [ ] ENS names: the site uses `bullnet-example.eth` placeholders. Replace only after ownership and resolver configuration are independently confirmed
- [ ] No keys, wallet material, private endpoints or internal Node addresses in this repository or in any `NEXT_PUBLIC_` variable

## Content still to produce
- [ ] Authorized industrial, cold storage and logistics photography (schematics stand in today)
- [ ] Separate routes listed in the README
- [ ] Remaining brand kit items listed in `docs/brand/asset-manifest.md`
