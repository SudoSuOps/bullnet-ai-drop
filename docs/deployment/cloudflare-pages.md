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

## 4. Intake endpoint (optional, later)

The form reads `NEXT_PUBLIC_INTAKE_ENDPOINT` at build time. Leave it unset until an approved endpoint exists. When it is set, the form sends a JSON POST and reports success only on a 2xx response.

A Pages Function at `functions/api/intake.ts` is one way to provide that endpoint on the same domain. It is not included: it needs a decision on where requests are stored or forwarded, spam protection (for example Turnstile) and a retention policy.

## 5. Previews

Every branch and pull request gets a preview URL. Keep previews behind Cloudflare Access until the launch checklist is complete.
