import { faq } from '@/content/faq';

export const SITE_URL = 'https://bullnet.ai';
export const DESCRIPTION =
  'BullNet is private commercial real estate intelligence infrastructure: private AI agents, sovereign compute and deterministic evaluation for family offices.';

/**
 * Structured data for search engines and AI assistants.
 * Only facts that are true today: no ratings, awards, partners, certifications, prices or client names.
 */
export const structuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': `${SITE_URL}/#organization`,
      name: 'BullNet',
      alternateName: ['BullNet.ai', 'BullNet AI'],
      url: SITE_URL,
      logo: `${SITE_URL}/assets/brand/bullnet-b-app-icon.svg`,
      description: DESCRIPTION,
      slogan: 'The last mile of intelligence.',
      email: 'build@bullnet.ai',
      telephone: '+1-561-532-7120',
      sameAs: ['https://x.com/bullnetai'],
      contactPoint: { '@type': 'ContactPoint', contactType: 'sales', email: 'build@bullnet.ai', telephone: '+1-561-532-7120' },
      knowsAbout: [
        'Commercial real estate',
        'Industrial real estate',
        'Cold storage and cold chain facilities',
        'Logistics and last-mile real estate',
        'Real estate capital markets',
        'Family office investment operations',
        'Private AI agents',
        'Local model inference',
        'AI output validation',
        'Acquisition underwriting',
        'Lease abstraction',
      ],
    },
    {
      '@type': 'WebSite',
      '@id': `${SITE_URL}/#website`,
      url: SITE_URL,
      name: 'BullNet',
      description: DESCRIPTION,
      publisher: { '@id': `${SITE_URL}/#organization` },
      inLanguage: 'en-US',
    },
    {
      '@type': 'FAQPage',
      '@id': `${SITE_URL}/#faq`,
      isPartOf: { '@id': `${SITE_URL}/#website` },
      mainEntity: faq.map((item) => ({
        '@type': 'Question',
        name: item.q,
        acceptedAnswer: { '@type': 'Answer', text: item.a },
      })),
    },
  ],
};
