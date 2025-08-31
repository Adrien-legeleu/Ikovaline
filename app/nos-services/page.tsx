import FAQ from '@/components/ServicesPage/FAQ/FAQ';
import Landing from '@/components/ServicesPage/landing/Landing';
import { GridOverlay } from '@/components/ServicesPage/servicesComponents/GridOverlay';
import { Service1 } from '@/components/ServicesPage/servicesComponents/Service1';
import { Service2 } from '@/components/ServicesPage/servicesComponents/Service2';
import { Service3 } from '@/components/ServicesPage/servicesComponents/Services3';
import Why from '@/components/ServicesPage/why/Why';
import type { Metadata } from 'next';
import * as React from 'react';

// ⬇️ server-safe FAQ strings for JSON-LD
import { FAQ_SEO_FR } from '@/components/ServicesPage/FAQ/faq-seo.fr';
import CTAServices from '@/components/ServicesPage/CTAServices';
import Glow from '@/components/ui/glow';

export const metadata: Metadata = {
  title: 'Nos Services - Solutions Digitales sur Mesure | Ikovaline',
  description:
    "Découvrez l'ensemble des services proposés par Ikovaline : développement SaaS, applications web & mobiles, automatisation par l'IA, SEO, publicité, stratégie commerciale... Un accompagnement complet pour booster votre croissance.",
  openGraph: {
    title: 'Nos Services - Solutions Digitales sur Mesure | Ikovaline',
    description:
      "Découvrez les expertises d'Ikovaline : développement d'applications sur mesure, automatisation intelligente, marketing digital, stratégie de croissance et plus encore.",
    url: 'https://ikovaline.com/nos-services',
    type: 'website',
    images: [
      {
        url: '/images/logo/ikovaline_logo.png',
        width: 1200,
        height: 630,
        alt: 'Ikovaline Services',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Nos Services - Solutions Digitales sur Mesure | Ikovaline',
    description:
      'Une stratégie digitale sur-mesure avec Ikovaline : développement web, IA, automatisation marketing, visibilité en ligne et croissance commerciale.',
    images: ['/images/logo/ikovaline_logo.png'],
  },
  robots: { index: true, follow: true },
  alternates: { canonical: 'https://ikovaline.com/nos-services' },
};

// —— JSON-LD (utilise la version FR simplifiée, côté serveur) ——
const faqStructuredData = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: FAQ_SEO_FR.map((faq) => ({
    '@type': 'Question',
    name: faq.question,
    acceptedAnswer: { '@type': 'Answer', text: faq.answer },
  })),
};

const webPageStructuredData = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: 'Nos services',
  url: 'https://ikovaline.com/nos-services',
  description:
    "Découvrez les services digitaux proposés par Ikovaline : développement SaaS, création de site web, applications mobiles, automatisation par l'IA, SEO, SEA, réseaux sociaux, stratégie commerciale et plus.",
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(webPageStructuredData),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqStructuredData) }}
      />
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none overflow-hidden ">
          <Glow
            variant="above"
            className="animate-appear-zoom opacity-0 [animation-delay:1000ms]"
          />
        </div>
        <Landing />
        <div className="relative">
          <GridOverlay size={22} />
          <Service1 />
          <Service2 />
          <Service3 />
        </div>
        <Why />
        <CTAServices />
        <FAQ />
      </div>
    </>
  );
}
