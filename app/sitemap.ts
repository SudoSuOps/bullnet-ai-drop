import type { MetadataRoute } from 'next';

export const dynamic = 'force-static';

/** Add each route here as it is built. Do not list routes that do not exist. */
export default function sitemap(): MetadataRoute.Sitemap {
  return [{ url: 'https://bullnet.ai/', changeFrequency: 'monthly', priority: 1 }];
}
