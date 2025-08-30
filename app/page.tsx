import dynamic from 'next/dynamic';
import Head from 'next/head';
import type { Metadata } from 'next';

import InViewLazy from '@/components/ux/InViewLazy';
import Landing from '@/components/LandingPage/landing/Landing';
import ComponentDemo from '@/components/LandingPage/impact/TextImpact';

// ↓↓↓ HORS ÉCRAN → pas de SSR pour éviter de gonfler l'HTML initial
const Review = dynamic(() => import('@/components/LandingPage/review/Review'), {
  ssr: false,
});
const Services = dynamic(
  () => import('@/components/LandingPage/servicesSection/Services'),
  { ssr: false }
);
const Map = dynamic(() => import('@/components/LandingPage/map/Map'), {
  ssr: false,
});
const Blog = dynamic(
  () => import('@/components/LandingPage/Blog/BlogLanding'),
  { ssr: false }
);
const About = dynamic(() => import('@/components/LandingPage/about/About'), {
  ssr: true,
});
const Methodologie = dynamic(
  () => import('@/components/LandingPage/impact/Impact').then((m) => m.default),
  { ssr: true }
);
const CTAHome = dynamic(() => import('@/components/LandingPage/CTAHome'), {
  ssr: false,
});

export const metadata: Metadata = {
  title: 'Ikovaline – Agence digitale Essonne & partout en France',
  description:
    'Agence digitale à Bailly-Romainvilliers : SEO, sites web, publicité en ligne. Ikovaline propulse votre visibilité en Essonne et dans toute la France.',
  keywords: [
    'agence digitale Essonne',
    'agence web Bailly-Romainvilliers',
    'SEO local Essonne',
    'référencement naturel Essonne',
    'création site web Essonne',
    'publicité en ligne Essonne',
    'marketing digital Essonne',
    'consultant SEO Bailly-Romainvilliers',
    'Google Ads Essonne',
    'agence web Paris',
  ],
  openGraph: {
    title: 'Ikovaline – Agence digitale Essonne & partout en France',
    description:
      'Agence digitale à Bailly-Romainvilliers : SEO, sites web, publicité en ligne. Ikovaline propulse votre visibilité en Essonne et dans toute la France.',
    url: 'https://ikovaline.com',
    type: 'website',
    images: [
      {
        url: '/images/logo/ikovaline_logo.png',
        width: 1200,
        height: 630,
        alt: 'Ikovaline Logo',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ikovaline - Expert Marketing Digital et Transformation',
    description:
      'Boostez votre visibilité avec Ikovaline, start-up étudiante experte en marketing digital et stratégies de transformation numérique.',
    images: ['/images/logo/ikovaline_logo.png'],
  },
};

export default function Home() {
  return (
    <>
      <Head>
        <link rel="canonical" href="https://ikovaline.com/" />
        <meta name="robots" content="index, follow" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              name: 'Ikovaline',
              url: 'https://ikovaline.com',
              logo: 'https://ikovaline.com/images/logo/ikovaline_logo.png',
              contactPoint: {
                '@type': 'ContactPoint',
                telephone: '+33 7 85 90 22 38',
                contactType: 'customer service',
                areaServed: 'FR',
              },
              sameAs: [
                'https://linkedin.com/company/ikovaline',
                'https://instagram.com/ikovaline',
              ],
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebSite',
              name: 'Ikovaline',
              url: 'https://ikovaline.com',
              potentialAction: {
                '@type': 'SearchAction',
                target: 'https://ikovaline.com/search?q={search_term_string}',
                'query-input': 'required name=search_term_string',
              },
            }),
          }}
        />
      </Head>

      <div className="max-w-[1450px] mx-auto">
        {/* Above-the-fold: SSR OK */}
        <div className="relative overflow-hidden">
          <Landing />
          <ComponentDemo />
        </div>

        {/* lazy quand visible */}
        <InViewLazy>
          <About />
        </InViewLazy>

        <section id="services" className="relative">
          <InViewLazy>
            <Services />
          </InViewLazy>
        </section>

        <InViewLazy>
          <Map />
        </InViewLazy>
        <InViewLazy>
          <Methodologie />
        </InViewLazy>

        <div className="relative w-full overflow-hidden">
          <InViewLazy>
            <Review />
          </InViewLazy>
          <InViewLazy rootMargin="400px">
            <CTAHome />
          </InViewLazy>
        </div>

        <InViewLazy>
          <Blog />
        </InViewLazy>
      </div>
    </>
  );
}
