# Deploying to Cloudflare Pages

The site is a static export. Cloudflare builds it from this repository and serves the `out` directory. No Workers, Functions or bindings are required.

## 1. Create the Pages project

1. Cloudflare dashboard → Workers & Pages → Create → Pages → Connect to Git.
2. Select `SudoSuOps/bullnet-ai-drop`, production branch `main`.
3. Build settings:
   - Framework preset: **Next.js (Static HTML Export)**
   - Build command: `npm run build`
   - Build output directory: `out`
4. Environment variables (Production and Preview): `NODE_VERSION` = `22`.
5. Save and deploy.

## 2. Attach the domain

Pages project → Custom domains → Set up a domain → `bullnet.ai`, then add `www.bullnet.ai`. Because the zone is already in Cloudflare, the DNS records are created for you. Pick one canonical host and redirect the other with a Redirect Rule. The site's canonical URL and sitemap assume `https://bullnet.ai`.

## 3. Headers

`public/_headers` ships with the build and sets `nosniff`, `X-Frame-Options: DENY`, a referrer policy, a permissions policy, HSTS and long-lived caching for hashed assets.

No Content-Security-Policy is set yet. Next.js emits inline bootstrap scripts, so a strict CSP needs hashes or nonces. Decide on this before launch (see the integration checklist).

## 4. Intake form email (Resend)

The form posts to `/api/intake`, a Pages Function in `functions/api/intake.ts`. It validates the request and sends one email through Resend. Cloudflare picks the function up automatically from the `functions` directory.

One-time setup in the Pages project → Settings → Variables and Secrets (Production, and Preview if wanted):

| Name | Type | Value |
| --- | --- | --- |
| `RESEND_API_KEY` | Secret | A Resend API key with sending access for `bullnet.ai` |
| `INTAKE_TO` | Text, optional | Defaults to `build@bullnet.ai` |
| `INTAKE_FROM` | Text, optional | Defaults to `BullNet Flight Sheet <flightsheet@bullnet.ai>` |

Redeploy after adding the secret. Until the key is set the function answers 503 and the form tells the visitor the request was not sent.

The same function receives the Hive Capital Markets intakes (`form: 'hive-cre'` or `'hive-equipment'`), validated against `lib/hive-intake.ts`. Each gets a reference and a timestamp in the email. It is still an email, not a stored case.

Protections in the function: same-origin check, JSON only, size and length limits, required-field and email validation, a honeypot field, and header-injection stripping. It stores nothing.

Recommended next: a Cloudflare rate limiting rule on `/api/intake` (for example 5 requests per minute per IP), and Turnstile if spam appears.

Never put the Resend key in the repository, in `.env.production` or in any `NEXT_PUBLIC_` variable.

## 5. Previews

Every branch and pull request gets a preview URL. Keep previews behind Cloudflare Access until the launch checklist is complete.
