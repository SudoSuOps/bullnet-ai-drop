# SEO and GEO plan (2026-11-13)

SEO is being found in search engines. GEO (generative engine optimization) is being named and described correctly by AI assistants. Both depend on the same things: crawlable pages, clear factual statements, structured data and mentions on other sites.

## Baseline on launch day

| Check | Result |
| --- | --- |
| Title | "BullNet \| Private AI Offices, Built to Suit" (hero copy approved 2026-11-14). CRE and family office terms now live in the description, FAQ and future vertical pages |
| Meta description | 156 characters |
| Canonical, Open Graph, X card | Present |
| H1 | One. It is the brand tagline, so the keyword work is done by the title, lede and FAQ |
| Structured data | Organization, WebSite, FAQPage |
| robots.txt, sitemap.xml, llms.txt | Present |
| Indexable routes | One (`/`) |
| Brand mentions on other sites | None found. A search for "BullNet" returns unrelated results |

## Shipped in the site

- `content/faq.ts`: ten direct questions and answers, shown on the page and published as FAQPage data
- `lib/schema.ts`: Organization, WebSite and FAQPage graph with contact details and topics
- `public/llms.txt`: a factual summary for AI assistants, including what BullNet is not
- `app/robots.ts`: search and AI crawlers explicitly allowed

## Cloudflare settings to check (owner: founder)

1. **AI bot blocking.** Security → Bots and AI Crawl Control. If "Block AI bots" or a managed robots.txt is on, AI assistants cannot read the site and the work above has no effect.
2. **Email obfuscation.** Scrape Shield → Email Address Obfuscation hides build@bullnet.ai from crawlers and AI assistants. Turn it off if the address should be quotable.
3. **www redirect.** `www.bullnet.ai` serves a second copy of the site. Add a Redirect Rule from `www` to `https://bullnet.ai` (301).

## Register the site (owner: founder)

- Google Search Console: add the domain property, submit `https://bullnet.ai/sitemap.xml`
- Bing Webmaster Tools: same. Bing's index feeds several AI assistants.

## Biggest gap: one URL

A single page can rank for the brand name and little else. Each topic needs its own page with its own title, description and 400 or more words of specific content:

| Route | Target question |
| --- | --- |
| `/family-office` | AI for family offices investing in commercial real estate |
| `/industrial` | AI for industrial real estate underwriting |
| `/cold-chain` | cold storage underwriting and refrigeration infrastructure analysis |
| `/logistics` | last-mile logistics real estate intelligence |
| `/capital-markets` | CRE capital stack, DSCR and refinance modeling with AI |
| `/defendable` | how to verify AI output in real estate underwriting |
| `/the-node` | on-premises AI appliance for a family office |
| `/the-vault` | keeping confidential deal documents out of public AI tools |
| `/flight-sheet`, `/about`, `/contact` | brand and conversion |

## Prompts BullNet should eventually appear in

- "AI for family offices that invest in commercial real estate"
- "private or on-premises AI for commercial real estate underwriting"
- "how do I keep confidential deal documents out of ChatGPT"
- "how to verify an AI-generated cap rate valuation"
- "AI for cold storage or industrial real estate underwriting"

Others already publishing in this space include Lobby CRE, StackAI, CRE Autopilot and several consulting guides on AI for family offices. BullNet's distinct ground is the combination of founder transaction experience, owned compute and deterministic validation.

## Off-site signals (the part code cannot do)

AI assistants learn about a company mostly from other sites. In rough priority:

1. Consistent profiles using the same one-sentence description: X (@bullnetai), LinkedIn company page, founder LinkedIn, Crunchbase. Add each URL to `sameAs` in `lib/schema.ts`.
2. Founder-authored articles with real substance: for example a worked method for checking AI underwriting arithmetic, published on the site and on LinkedIn.
3. Trade coverage and podcasts in CRE and family office media.
4. Answers in communities where the audience asks questions.

Do not buy links, invent reviews or publish unsupported statistics.

## Measuring

- Search Console: impressions and queries, monthly
- Ask the target prompts in ChatGPT, Claude, Gemini and Perplexity monthly and record whether BullNet is named and described correctly
- Expect weeks for search indexing and months for AI assistants
