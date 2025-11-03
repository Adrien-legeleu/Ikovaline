import { Metadata } from 'next';
import { dataService } from '@/data/data-services';
import ServicePageClient from './ServicePageClient';

type PageProps = { params: { id: string } };

// même type que dans ServicePageClient
type NormalizedService = {
  slug: string;
  seoTitle: string;
  seoDescription: string;
  section1Title: string;
  section1Desc: string;
  section2Title: string;
  section2Desc: string;
  section2NumberImportant: string;
  section2TextImportant: string;
  section3Title: string;
  section3Cards: { text: string; subtext: string }[];
  section4Title: string;
  section4Content: Array<{
    title: string;
    description: string | React.ReactNode;
    icon: React.ReactNode;
  }>;
};

export function generateMetadata({ params }: PageProps): Metadata {
  const svc = dataService.find((d) => d.slug === params.id);
  if (!svc) {
    return {
      title: 'Service non trouvé - Ikovaline',
      description: "Le service demandé n'existe pas ou a été supprimé.",
    };
  }

  return {
    title: svc.seoTitle || svc.section1Title || svc.title || '',
    description:
      svc.seoDescription ||
      svc.section1Desc ||
      svc.section2Desc ||
      'Création web & acquisition client par Ikovaline.',
    openGraph: {
      title: svc.seoTitle || svc.section1Title || svc.title || '',
      description:
        svc.seoDescription ||
        svc.section1Desc ||
        svc.section2Desc ||
        'Création web & acquisition client par Ikovaline.',
      url: `https://ikovaline.com/nos-services/${svc.slug}`,
      type: 'website',
    },
    alternates: {
      canonical: `https://ikovaline.com/nos-services/${svc.slug}`,
    },
    robots: 'index, follow',
  };
}

export default function Page({ params }: PageProps) {
  const raw = dataService.find((s) => s.slug === params.id);

  if (!raw) {
    return (
      <main className="px-6 py-24 text-center">
        <p>Le service demandé n&apos;existe pas.</p>
      </main>
    );
  }

  // 1) ON NORMALISE TOUT
  const normalized: NormalizedService = {
    slug: raw.slug ?? '',
    seoTitle: raw.seoTitle || raw.section1Title || raw.title || '',
    seoDescription:
      raw.seoDescription || raw.section1Desc || raw.section2Desc || '',
    section1Title: raw.section1Title || raw.title || '',
    section1Desc: raw.section1Desc || '',
    section2Title: raw.section2Title || '',
    section2Desc: raw.section2Desc || '',
    section2NumberImportant: raw.section2NumberImportant || '',
    section2TextImportant: raw.section2TextImportant || '',
    section3Title: raw.section3Title || '',
    section3Cards: raw.section3Cards || [],
    section4Title: raw.section4Title || '',
    section4Content: raw.section4Content || [],
  };

  // 2) JSON-LD
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: normalized.section1Title,
    description: normalized.seoDescription || normalized.section1Desc,
    provider: {
      '@type': 'Organization',
      name: 'Ikovaline',
      url: 'https://ikovaline.com',
      logo: {
        '@type': 'ImageObject',
        url: 'https://ikovaline.com/images/logo/ikovaline_logo.png',
      },
      contactPoint: {
        '@type': 'ContactPoint',
        telephone: '+33 7 85 90 22 38',
        contactType: 'customer service',
        areaServed: 'FR',
      },
    },
    url: `https://ikovaline.com/nos-services/${normalized.slug}`,
  };

  // 3) ON PASSE normalized (PAS raw)
  return (
    <>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ServicePageClient service={normalized} />
    </>
  );
}
