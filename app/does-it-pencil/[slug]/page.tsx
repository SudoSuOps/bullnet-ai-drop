import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Nav } from '@/components/Nav';
import { Footer } from '@/components/Footer';
import { DropView } from '@/components/pencil/DropView';
import { drops, getDrop } from '@/content/drops';
import { SITE_URL } from '@/lib/schema';

export const dynamicParams = false;

export function generateStaticParams() {
  return drops.map((d) => ({ slug: d.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const drop = getDrop((await params).slug);
  if (!drop) return {};
  const title = /does it pencil/i.test(drop.title) ? drop.title : `${drop.title}: does it pencil?`;
  const url = `/does-it-pencil/${drop.slug}/`;
  return {
    title,
    description: drop.summary,
    alternates: { canonical: url },
    openGraph: { title, description: drop.summary, url, type: 'article', publishedTime: drop.date },
  };
}

export default async function DropPage({ params }: { params: Promise<{ slug: string }> }) {
  const drop = getDrop((await params).slug);
  if (!drop) notFound();
  const article = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: /does it pencil/i.test(drop.title) ? drop.title : `${drop.title}: does it pencil?`,
    description: drop.summary,
    datePublished: drop.date,
    mainEntityOfPage: `${SITE_URL}/does-it-pencil/${drop.slug}/`,
    author: { '@id': `${SITE_URL}/#organization` },
    publisher: { '@id': `${SITE_URL}/#organization` },
    articleSection: drop.practice,
  };
  return (
    <>
      <Nav />
      <main>
        <DropView drop={drop} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(article) }} />
      </main>
      <Footer />
    </>
  );
}
