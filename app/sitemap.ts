import type { MetadataRoute } from 'next';
import { drops } from '@/content/drops';

export const dynamic = 'force-static';

/** Add each route here as it is built. Do not list routes that do not exist. */
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: 'https://bullnet.ai/', lastModified: '2026-11-14', changeFrequency: 'monthly', priority: 1 },
    { url: 'https://bullnet.ai/hive-capital-markets/', lastModified: '2026-11-13', changeFrequency: 'monthly', priority: 0.9 },
    { url: 'https://bullnet.ai/does-it-pencil/', lastModified: drops[0]?.date, changeFrequency: 'daily', priority: 0.8 },
    ...drops.map((d) => ({ url: `https://bullnet.ai/does-it-pencil/${d.slug}/`, lastModified: d.date, priority: 0.7 })),
  ];
}
