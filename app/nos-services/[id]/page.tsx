import { Metadata } from 'next';
import { cn } from '@/lib/utils';

import { GridPattern } from '@/components/magicui/grid-pattern';
import { NeonGradientCard } from '@/components/magicui/neon-gradient-card';
import ServiceInteractive from '@/components/ServicesPage/servicesComponents/ServiceInteractive';
import CallToAction from '@/components/callToAction/CallToAction';
import { LiquidLink } from '@/components/ui/liquid-link';
import { TextAnimate } from '@/components/ui/text-animate';

import { dataService } from '@/data/data-services';
import { IconRocket, IconTrendingUp } from '@tabler/icons-react';
import { GlassCard } from '@/components/LandingPage/servicesSection/Services';
import {
  CardSticky,
  GlassSticky,
} from '@/components/LandingPage/impact/CardStack';
import { LiquidButton } from '@/components/ui/liquid-glass-button';

type PageProps = { params: { id: string } };

export function generateMetadata({ params }: PageProps): Metadata {
  const service = dataService.find((d) => d.slug === params.id);
  if (!service) {
    return {
      title: 'Service non trouvé - Ikovaline',
      description: "Le service demandé n'existe pas ou a été supprimé.",
    };
  }
  return {
    title: service.seoTitle,
    description: service.seoDescription,
    openGraph: {
      title: service.seoTitle,
      description: service.seoDescription,
      url: `https://ikovaline.com/nos-services/${service.slug}`,
      type: 'website',
    },
    alternates: {
      canonical: `https://ikovaline.com/nos-services/${service.slug}`,
    },
    robots: 'index, follow',
  };
}

export default function Page({ params }: PageProps) {
  const service = dataService.find((s) => s.slug === params.id);
  if (!service) return <p>Le service demandé n'existe pas.</p>;

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.section1Title,
    description: service.seoDescription || service.section1Desc,
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
    url: `https://ikovaline.com/nos-services/${service.slug}`,
  };

  return (
    <>
      {/* JSON-LD SSR */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div>
        {/* HERO — halos bleus + liquid CTA */}
        <section className="relative flex min-h-[92svh] flex-col items-center justify-center rounded-b-3xl px-5 md:px-10 pt-24 overflow-hidden bg-gradient-to-b from-sky-100/60 via-sky-50/20 to-transparent dark:from-[#0a1420] dark:via-[#0d1628] dark:to-transparent">
          {/* Halos bleus intenses */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 -z-10"
          >
            <span className="absolute -top-40 left-1/2 h-[70rem] w-[70rem] -translate-x-1/2 rounded-full blur-[300px] opacity-50 dark:opacity-60 bg-[radial-gradient(closest-side,#00A8E8,transparent_70%)]" />
            <span className="absolute bottom-0 right-[10%] h-[60rem] w-[60rem] translate-x-1/4 rounded-full blur-[280px] opacity-40 dark:opacity-50 bg-[radial-gradient(closest-side,#2563EB,transparent_70%)]" />
            <span className="absolute top-1/3 left-[15%] h-[40rem] w-[40rem] rounded-full blur-[200px] opacity-30 dark:opacity-40 bg-[radial-gradient(closest-side,#3b82f6,transparent_70%)]" />
          </div>

          {/* Grid pattern subtil */}
          <GridPattern
            width={25}
            height={25}
            x={-1}
            y={-1}
            strokeDasharray="4 0"
            className={cn(
              'opacity-70 dark:opacity-30',
              '[mask-image:radial-gradient(600px_circle_at_center,white,transparent)]'
            )}
          />

          {/* Intro */}
          <TextAnimate
            animation="blurInUp"
            by="word"
            className="z-10 mx-auto max-w-2xl text-center text-base md:text-lg text-neutral-700 dark:text-neutral-300"
          >
            {service.section1Desc}
          </TextAnimate>

          {/* Titre flashy bleu */}
          <h1
            className="z-10 mx-auto max-w-4xl py-4 text-center text-4xl sm:text-5xl md:text-6xl font-extrabold
                 bg-gradient-to-r from-sky-600 via-sky-500 to-sky-400
                 dark:from-sky-300 dark:via-sky-400 dark:to-sky-500
                 bg-clip-text text-transparent drop-shadow-[0_0_25px_rgba(0,168,232,0.45)]"
          >
            {service.section1Title}
          </h1>

          {/* Liquid CTA bleu */}
          <div className="z-10 mt-10">
            <LiquidLink href="/contact" className="text-lg px-8 py-4">
              Contactez-nous
            </LiquidLink>
          </div>

          {/* Tuiles vitrées décoratives */}
          <div
            className="absolute left-[10%] top-[14%] hidden sm:flex h-32 w-32 items-center justify-center rounded-3xl 
                  bg-gradient-to-br from-white/70 to-neutral-100/40 dark:from-[#0d1117] dark:to-[#121826] 
                  shadow-[0_0_40px_rgba(0,168,232,0.4)]"
          >
            <IconRocket
              className="h-16 w-16 text-sky-400 drop-shadow-[0_0_20px_rgba(0,168,232,0.7)]"
              stroke={2}
            />
          </div>
          <div
            className="absolute right-[10%] bottom-[16%] hidden sm:flex h-32 w-32 items-center justify-center rounded-3xl 
                  bg-gradient-to-br from-white/70 to-neutral-100/40 dark:from-[#0d1117] dark:to-[#121826] 
                  shadow-[0_0_40px_rgba(37,99,235,0.45)]"
          >
            <IconTrendingUp
              className="h-16 w-16 text-sky-400 drop-shadow-[0_0_20px_rgba(37,99,235,0.7)]"
              stroke={2}
            />
          </div>
        </section>

        {/* SECTION 2 — Stat / argument clé (Neon liquid bleu) */}
        <section className="flex flex-col items-center space-y-10 py-24 px-5 md:px-10 text-center">
          <h2 className="mx-auto max-w-xl bg-gradient-to-t from-neutral-700 to-neutral-900 dark:from-neutral-300 dark:to-neutral-500 bg-clip-text text-transparent text-3xl sm:text-4xl font-bold">
            {service.section2Title}
          </h2>
          <p className="mx-auto max-w-lg text-neutral-600 dark:text-neutral-400 xs:text-sm md:text-lg">
            {service.section2Desc}
          </p>

          <GlassSticky className="max-w-sm mx-auto flex flex-col items-center justify-center text-center">
            <div className="inline-flex items-baseline gap-2">
              <span className="text-6xl md:text-7xl font-extrabold bg-gradient-to-r from-sky-500 via-sky-400 to-sky-300 dark:from-sky-300 dark:via-sky-200 dark:to-sky-100 bg-clip-text text-transparent">
                {service.section2NumberImportant}
              </span>
            </div>
            <span className="mt-1 block text-neutral-600 dark:text-neutral-400">
              {service.section2TextImportant}
            </span>
          </GlassSticky>
        </section>

        {/* SECTION 3 — Cards liquid glass bleues (rims + glow) */}
        <section className="mx-auto max-w-7xl px-5 md:px-10 py-24 space-y-12">
          <h2 className="text-center text-3xl sm:text-4xl font-bold mx-auto max-w-xl bg-gradient-to-t from-neutral-700 to-neutral-900 dark:from-neutral-300 dark:to-neutral-500 bg-clip-text text-transparent">
            {service.section3Title}
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
            {service.section3Cards.map((card, i) => (
              <GlassSticky key={i}>
                {/* Titre de la carte */}
                <div
                  className="mx-[10%] pt-[8%] text-center text-3xl font-bold
                             bg-[linear-gradient(45deg,_#9bc9ff_4%,_#2a3b8f,_#cfe6ff)]
                             dark:bg-[linear-gradient(45deg,_#9bc9ff_4%,_#e6f2ff,_#2a3b8f)]
                             bg-clip-text text-transparent"
                >
                  {card.text}
                </div>

                <p className="mt-6 text-center text-sm text-neutral-700 dark:text-neutral-300">
                  {card.subtext}
                </p>

                {/* glow bas bleu */}
                <span
                  aria-hidden
                  className="pointer-events-none absolute -bottom-6 left-1/2 h-12 w-3/4 -translate-x-1/2 rounded-full blur-3xl bg-[radial-gradient(ellipse_at_center,rgba(0,168,232,.45),rgba(37,99,235,.30),transparent_70%)]"
                />
              </GlassSticky>
            ))}
          </div>
        </section>

        {/* SECTION 4 — Interactif (tabs liquides bleus) */}
        <ServiceInteractive service={service} />

        {/* CTA final (conserve ton composant) */}
        <CallToAction
          title={
            service.section4Title
              ? "Donnez à votre entreprise l'élan qu'elle mérite."
              : ''
          }
          desc={
            service.section4Title
              ? 'Nos solutions sur-mesure transforment vos ambitions en résultats concrets. Parlons de vos objectifs et voyons comment aller plus loin ensemble.'
              : ''
          }
          textBtn="Discutons de votre projet"
        />
      </div>
    </>
  );
}
