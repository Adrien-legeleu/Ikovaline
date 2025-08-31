import type { Metadata } from 'next';

import InViewLazy from '@/components/ux/InViewLazy';
import PrewarmChunks from '@/components/ux/PrewarmChunks';

import Landing from '@/components/LandingPage/landing/Landing';
import About from '@/components/LandingPage/about/About';
import Services from '@/components/LandingPage/servicesSection/Services';
import dynamic from 'next/dynamic';

const ComponentDemo = dynamic(
  () => import('@/components/LandingPage/impact/TextImpact'),
  {
    ssr: false,
    loading: () => <div style={{ height: 220 }} aria-hidden />,
  }
);
const ProjectsTeaser = dynamic(
  () => import('@/components/Projects/ProjectTeaser'),
  {
    ssr: false,
    loading: () => <div style={{ height: 240 }} aria-hidden />,
  }
);
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
  alternates: { canonical: 'https://ikovaline.com/' },
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
      <div className="max-w-[1450px] mx-auto">
        {/* Above-the-fold (SSR for SEO + fast LCP) */}
        <div className="relative overflow-hidden w-full">
          <Landing />
          <InViewLazy rootMargin="600px" minHeight={220}>
            <ComponentDemo />
          </InViewLazy>

          <InViewLazy rootMargin="700px" minHeight={240}>
            <ProjectsTeaser />
          </InViewLazy>
          <About />
          <section id="services" className="relative">
            <Services />
          </section>
        </div>

        {/* Below-the-fold (lazy render when near viewport) */}
        <InViewLazy
          rootMargin="900px"
          minHeight={520}
          placeholder={<SectionShimmer />}
        >
          <section
            style={{ contentVisibility: 'auto', containIntrinsicSize: '520px' }}
          >
            <Map />
          </section>
        </InViewLazy>
        <InViewLazy
          rootMargin="900px"
          minHeight={560}
          placeholder={<SectionShimmer />}
        >
          <section
            style={{ contentVisibility: 'auto', containIntrinsicSize: '560px' }}
          >
            <Methodologie />
          </section>
        </InViewLazy>

        <div className="relative w-full overflow-hidden">
          <InViewLazy
            rootMargin="900px"
            minHeight={740}
            placeholder={<SectionShimmer />}
          >
            <section
              style={{
                contentVisibility: 'auto',
                containIntrinsicSize: '740px',
              }}
            >
              <Review />
            </section>
          </InViewLazy>
          <InViewLazy rootMargin="1200px">
            <CTAHome />
          </InViewLazy>
        </div>

        <InViewLazy
          rootMargin="900px"
          minHeight={600}
          placeholder={<SectionShimmer />}
        >
          <section
            style={{ contentVisibility: 'auto', containIntrinsicSize: '600px' }}
          >
            <Blog />
          </section>
        </InViewLazy>
      </div>

      {/* Kick off prefetch quietly on the client (no UI) */}
      <PrewarmChunks />
    </>
  );
}
function SectionShimmer() {
  return (
    <div
      className="relative overflow-hidden rounded-3xl"
      style={{ height: '100%' }}
      aria-hidden
    >
      <div className="absolute inset-0 bg-[radial-gradient(1000px_400px_at_50%_-10%,rgba(59,130,246,.12),rgba(56,189,248,.10),transparent_70%)]" />
      <div className="h-[100%] w-full animate-pulse bg-white/40 dark:bg-white/5 backdrop-blur-md" />
    </div>
  );
}
