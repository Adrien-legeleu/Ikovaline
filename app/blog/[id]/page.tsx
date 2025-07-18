import Buttons from '@/components/BlogPage/Buttons';

import { ScrollProgress } from '@/components/magicui/scroll-progress';
import { blogMetadata } from '@/lib/blogMetadata';
import { cn } from '@/lib/utils';
import Head from 'next/head';
import { notFound } from 'next/navigation';
import { ComponentType } from 'react';
interface ProductPageProps {
  params: Promise<{ id: string }>;
}

const componentsMap: Record<
  string,
  () => Promise<{ default: ComponentType<unknown> }>
> = {
  'comment-heberger-un-site-web': () => import('@/components/BlogPage/Blog1'),
  'arborescence-site-web': () => import('@/components/BlogPage/Blog2'),
  'comment-etre-reference-sur-google-gratuitement': () =>
    import('@/components/BlogPage/Blog3'),
  'creation-digital-guide': () => import('@/components/BlogPage/Blog4'),
  'definition-site-institutionnel': () => import('@/components/BlogPage/Blog5'),
  'agence-seo-seine-marne': () => import('@/components/BlogPage/Blog6'),
  'agence-sea-expertise': () => import('@/components/BlogPage/Blog7'),
  'etude-marche-methodologie': () => import('@/components/BlogPage/Blog8'),
  'refonte-site-web-guide': () => import('@/components/BlogPage/Blog9'),
};

export async function generateMetadata({ params }: { params: { id: string } }) {
  const { id } = params;
  const meta = blogMetadata[id];
  if (!meta) {
    return {
      title: 'Article de blog | Ikovaline',
      description:
        'Découvrez nos conseils digitaux pour améliorer votre présence en ligne.',
    };
  }

  return {
    title: meta.title,
    description: meta.description,
    alternates: {
      canonical: `htps://ikovaline.com/blog/${id}`,
    },
    robots: 'index , follow',
    openGraph: {
      title: meta.title,
      description: meta.description,
      url: `https://ikovaline.com//blog/${id}`,
      images: [
        {
          url: `https://ikovaline.com${meta.ogImage}`,
          width: 1200,
          height: 630,
        },
      ],
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: meta.title,
      description: meta.description,
      images: [`https://ikovaline.com${meta.ogImage}`],
    },
  };
}

export default async function Blog({ params }: ProductPageProps) {
  const { id } = await params;
  const loader = componentsMap[id];

  if (!loader) {
    notFound();
  }

  const mod = await loader();
  const Component = mod.default;
  const meta = blogMetadata[id];

  return (
    <>
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'BlogPosting',
              headline: meta.title,
              description: meta.description,
              author: {
                '@type': 'Organization',
                name: 'Ikovaline',
              },
              publisher: {
                '@type': 'Organization',
                name: 'Ikovaline',
                logo: {
                  '@type': 'ImageObject',
                  url: 'https://ikovaline.com/images/logo/ikovaline_logo.png',
                },
              },
              datePublished: meta.date, // ex: "2025-05-20"
              image: `https://ikovaline.com${meta.ogImage}`,
              url: `https://ikovaline.com/blog/${id}`,
            }),
          }}
        />
      </Head>
      <div className="lg:py-24 relative py-12  ">
        <Buttons />
        <div
          className={cn(
            'absolute inset-0',
            '[background-size:20px_20px]',
            '[background-image:radial-gradient(#d4d4d4a0_1.2px,transparent_1px)]',
            'dark:[background-image:radial-gradient(#404040da_1.2px,transparent_1px)]'
          )}
        />
        <ScrollProgress />
        <div className="px-2 sm:px-10">
          <Component />
        </div>
      </div>
    </>
  );
}
