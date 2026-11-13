import type { Metadata, Viewport } from 'next';
import '@fontsource-variable/archivo/standard.css';
import '@fontsource/ibm-plex-sans/400.css';
import '@fontsource/ibm-plex-sans/500.css';
import '@fontsource/ibm-plex-sans/600.css';
import '@fontsource/ibm-plex-mono/400.css';
import '@fontsource/ibm-plex-mono/500.css';
import '@/styles/globals.css';
import { MarkSprite } from '@/components/MarkSprite';
import { DESCRIPTION, SITE_URL, structuredData } from '@/lib/schema';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: 'BullNet | Private CRE AI Infrastructure for Family Offices', template: '%s | BullNet' },
  description: DESCRIPTION,
  alternates: { canonical: '/' },
  keywords: ['commercial real estate AI', 'family office AI', 'private AI agents', 'CRE underwriting', 'industrial real estate', 'cold storage', 'sovereign compute'],
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

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <MarkSprite />
        {children}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      </body>
    </html>
  );
}
