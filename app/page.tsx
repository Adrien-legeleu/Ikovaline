import dynamic from 'next/dynamic';
import Head from 'next/head';
import type { Metadata } from 'next';

import InViewLazy from '@/components/ux/InViewLazy';
import PrewarmChunks from '@/components/ux/PrewarmChunks';

import Landing from '@/components/LandingPage/landing/Landing';
import ComponentDemo from '@/components/LandingPage/impact/TextImpact';
import About from '@/components/LandingPage/about/About';
import Services from '@/components/LandingPage/servicesSection/Services';
import ProjectsTeaser from '@/components/Projects/ProjectTeaser';

// Below-the-fold → client-only to avoid heavy SSR HTML
const Map = dynamic(() => import('@/components/LandingPage/map/Map'), {
  ssr: false,
});
const Review = dynamic(() => import('@/components/LandingPage/review/Review'), {
  ssr: false,
});
const Blog = dynamic(
  () => import('@/components/LandingPage/Blog/BlogLanding'),
  { ssr: false }
);
const CTAHome = dynamic(() => import('@/components/LandingPage/CTAHome'), {
  ssr: false,
});
const Methodologie = dynamic(
  () => import('@/components/LandingPage/impact/Impact').then((m) => m.default),
  { ssr: true }
);

export const metadata: Metadata = {
  title: 'Ikovaline – Agence digitale Essonne & partout en France',
  description:
    'Agence digitale à Bailly-Romainvilliers : SEO, sites web, publicité en ligne. Ikovaline propulse votre visibilité en Essonne et dans toute la France.',
  openGraph: {
    title: 'Ikovaline – Agence digitale Essonne & partout en France',
    description:
      'Agence digitale à Bailly-Romainvilliers : SEO, sites web, publicité en ligne.',
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
      'Boostez votre visibilité avec Ikovaline, start-up étudiante experte en marketing digital et transformation numérique.',
    images: ['/images/logo/ikovaline_logo.png'],
  },
};

export default function Home() {
  return (
    <>
      <Head>
        <link rel="canonical" href="https://ikovaline.com/" />
        <meta name="robots" content="index, follow" />
      </Head>

      <div className="max-w-[1450px] mx-auto">
        {/* Above-the-fold (SSR for SEO + fast LCP) */}
        <div className="relative overflow-hidden w-full">
          <Landing />
          <ComponentDemo />
          <ProjectsTeaser />
          <About />
          <section id="services" className="relative">
            <Services />
          </section>
        </div>

        {/* Below-the-fold (lazy render when near viewport) */}
        <InViewLazy rootMargin="1000px">
          <Map />
        </InViewLazy>
        <InViewLazy rootMargin="1000px">
          <Methodologie />
        </InViewLazy>

        <div className="relative w-full overflow-hidden">
          <InViewLazy rootMargin="1000px">
            <Review />
          </InViewLazy>
          <InViewLazy rootMargin="1200px">
            <CTAHome />
          </InViewLazy>
        </div>

        <InViewLazy rootMargin="1000px">
          <Blog />
        </InViewLazy>
      </div>

      {/* Kick off prefetch quietly on the client (no UI) */}
      <PrewarmChunks />
    </>
  );
}
