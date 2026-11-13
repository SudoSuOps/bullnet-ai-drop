import type { MetadataRoute } from 'next';

export const dynamic = 'force-static';

/**
 * Everything on this site is public marketing content, so search and AI crawlers are welcome.
 * The named agents are listed so the intent is explicit. Remove one here to opt out of it.
 * Cloudflare can override this at the edge: check AI Crawl Control and "Block AI bots" on the zone.
 */
const AI_AGENTS = [
  'GPTBot', 'OAI-SearchBot', 'ChatGPT-User',
  'ClaudeBot', 'Claude-SearchBot', 'Claude-User',
  'PerplexityBot', 'Perplexity-User',
  'Google-Extended', 'Applebot-Extended', 'CCBot',
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: '*', allow: '/' },
      { userAgent: AI_AGENTS, allow: '/' },
    ],
    sitemap: 'https://bullnet.ai/sitemap.xml',
  };
}
