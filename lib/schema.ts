import { faq } from '@/content/faq';

export const SITE_URL = 'https://bullnet.ai';
export const DESCRIPTION =
  'BullNet builds private AI offices for businesses that depend on real estate, equipment and informed decisions: specialized AI agents, organized business data and private computing infrastructure.';

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
      slogan: 'Your business. Your data. Your private AI office.',
      email: 'build@bullnet.ai',
      telephone: '+1-561-532-7120',
      sameAs: ['https://x.com/bullnetai'],
      contactPoint: { '@type': 'ContactPoint', contactType: 'sales', email: 'build@bullnet.ai', telephone: '+1-561-532-7120' },
      knowsAbout: [
        'Private AI office',
        'Custom AI agents for small and mid-size businesses',
        'Equipment acquisition and financing math',
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
