import React from 'react';
import type { Metadata } from 'next';
import Head from 'next/head';
import CallToAction from '@/components/callToAction/CallToAction';
import AboutContent from '@/components/AboutPage/AboutContent';
import CTAABout from '@/components/AboutPage/CTAAbout';

export const metadata: Metadata = {
  title: "À propos d'Ikovaline - Notre Histoire et Équipe",
  description:
    "Découvrez l'histoire, les valeurs et l'équipe passionnée qui se cache derrière Ikovaline, la start-up étudiante experte en marketing digital.",
  openGraph: {
    title: "À propos d'Ikovaline - Notre Histoire et Équipe",
    description:
      "Plongez dans les coulisses d'Ikovaline : notre parcours, notre vision et les personnes qui façonnent l'accompagnement digital de demain.",
    url: 'https://ikovaline.com/about',
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
    title: "À propos d'Ikovaline - Notre Histoire et Équipe",
    description:
      'Découvrez qui se cache derrière Ikovaline et comment notre équipe vous accompagne dans votre transformation digitale.',
    images: ['/images/logo/ikovaline_logo.png'],
  },
};

export default function Page() {
  return (
    <>
      <Head>
        <link rel="canonical" href="https://ikovaline.com/about" />
        <meta name="robots" content="index, follow" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebPage',
              name: "À propos d'Ikovaline",
              url: 'https://ikovaline.com/about',
              description:
                'Découvrez l’histoire, les valeurs et l’équipe qui porte Ikovaline, la start-up étudiante au service de votre visibilité digitale.',
            }),
          }}
        />
      </Head>

      <div className="max-w-[1400px] relative overflow-hidden mx-auto">
        <AboutContent />
        <CTAABout />
      </div>
    </>
  );
}
