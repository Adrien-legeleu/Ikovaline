import type { Metadata } from 'next';

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
      <div className="max-w-[1450px] mx-auto ">
        <div className="overflow-hidden">
          <Landing />

          <ComponentDemo />
          <ProjectsTeaser />

          <About />

          <Services />

          <Map />
        </div>
        <Methodologie />

        <div className="overflow-hidden">
          <Review />

          <CTAHome />

          <Blog />
        </div>
      </div>
    </>
  );
}
