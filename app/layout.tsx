import type { Metadata, Viewport } from 'next';
import '@fontsource-variable/archivo/standard.css';
import '@fontsource/ibm-plex-sans/400.css';
import '@fontsource/ibm-plex-sans/500.css';
import '@fontsource/ibm-plex-sans/600.css';
import '@fontsource/ibm-plex-mono/400.css';
import '@fontsource/ibm-plex-mono/500.css';
import '@/styles/globals.css';
import { MarkSprite } from '@/components/MarkSprite';

const SITE_URL = 'https://bullnet.ai';
const DESCRIPTION =
  'BullNet is private commercial real estate intelligence infrastructure: private AI agents, sovereign compute and deterministic evaluation for family offices.';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: 'BullNet | Private CRE Intelligence Infrastructure', template: '%s | BullNet' },
  description: DESCRIPTION,
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    url: SITE_URL,
    siteName: 'BullNet',
    title: 'BullNet | The Last Mile of Intelligence',
    description: DESCRIPTION,
    images: [{ url: '/og.png', width: 1200, height: 630, alt: 'BullNet' }],
  },
  twitter: { card: 'summary_large_image', site: '@bullnetai', title: 'BullNet | The Last Mile of Intelligence', description: DESCRIPTION, images: ['/og.png'] },
};

export const viewport: Viewport = { themeColor: '#0B0F14', colorScheme: 'dark' };

/** Only facts that are true today. No ratings, awards, partners or certifications. */
const ORGANIZATION = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'BullNet',
  url: SITE_URL,
  logo: `${SITE_URL}/assets/brand/bullnet-b-app-icon.svg`,
  description: DESCRIPTION,
  email: 'build@bullnet.ai',
  telephone: '+1-561-532-7120',
  sameAs: ['https://x.com/bullnetai'],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <MarkSprite />
        {children}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(ORGANIZATION) }} />
      </body>
    </html>
  );
}
