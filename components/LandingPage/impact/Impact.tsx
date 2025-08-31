'use client';

import { useTheme } from 'next-themes';
import { usePathname } from 'next/navigation';
import { CardSticky, ContainerScroll, GlassSticky } from './CardStack';

const TEXTS = {
  fr: {
    headingA: 'Une méthode claire pour',
    headingB: 'booster votre visibilité en ligne',
    intro:
      'Chez Ikovaline, nous accompagnons les entreprises dans leur transformation digitale à travers une méthode structurée, pensée pour des résultats concrets. Chaque étape est optimisée pour le référencement naturel, la visibilité locale et la performance.',
    phases: [
      {
        id: 'phase-1',
        title: 'Audit & Objectifs',
        description:
          "Avant toute action, nous réalisons un audit complet de votre présence en ligne. Nous identifions vos points forts, vos freins et les opportunités d'amélioration. Cette phase stratégique permet de fixer des objectifs clairs pour votre digitalisation.",
      },
      {
        id: 'phase-2',
        title: 'Stratégie Digitale Personnalisée',
        description:
          'SEO local, création de contenu, optimisation Google Business Profile, campagnes Google Ads… nous concevons un plan sur-mesure pour renforcer votre visibilité et attirer des clients qualifiés.',
      },
      {
        id: 'phase-3',
        title: 'Conception & Optimisation',
        description:
          "Nous concevons ou refondons votre site web avec une approche centrée sur l'utilisateur : responsive, rapide, SEO-friendly et pensé pour convertir vos visiteurs en prospects.",
      },
      {
        id: 'phase-4',
        title: 'Suivi & Résultats',
        description:
          'Une fois la stratégie lancée, nous assurons un suivi régulier. Nos actions sont mesurées, ajustées et transparentes, pour garantir des résultats durables en visibilité, trafic et conversions.',
      },
    ],
  },
  en: {
    headingA: 'A clear method to',
    headingB: 'boost your online visibility',
    intro:
      'At Ikovaline, we guide companies through digital transformation with a structured, results-driven method. Every step is optimized for SEO, local visibility, and performance.',
    phases: [
      {
        id: 'phase-1',
        title: 'Audit & Goals',
        description:
          'Before we act, we run a full audit of your online presence. We assess strengths, blockers, and opportunities. This strategic step sets clear goals for your digital rollout.',
      },
      {
        id: 'phase-2',
        title: 'Personalized Digital Strategy',
        description:
          'Local SEO, content creation, Google Business Profile optimization, Google Ads campaigns… we craft a tailored plan to boost visibility and attract qualified customers.',
      },
      {
        id: 'phase-3',
        title: 'Design & Optimization',
        description:
          'We build or revamp your website with a user-first approach: responsive, fast, SEO-friendly, and engineered to turn visitors into leads.',
      },
      {
        id: 'phase-4',
        title: 'Tracking & Results',
        description:
          'Once live, we provide ongoing monitoring. Actions are measured, iterated, and transparent to ensure sustainable gains in visibility, traffic, and conversions.',
      },
    ],
  },
} as const;

/* ------------------------------ UI -------------------------------- */

export default function Methodologie() {
  const { theme } = useTheme();
  const pathname = usePathname() || '/';
  const isEN = /^\/en(\/|$)/.test(pathname);
  const t = isEN ? TEXTS.en : TEXTS.fr;

  return (
    <section className="relative container mx-auto px-6 xl:px-12">
      <div className="grid md:grid-cols-2 md:gap-12 xl:gap-16">
        {/* COL GAUCHE — sticky */}
        <div className="md:sticky md:top-24 md:self-start">
          <h2 className="mb-6 mt-4 text-4xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100 max-md:text-center">
            {t.headingA} <span className="text-primary">{t.headingB}</span>
          </h2>

          <p className="max-w-prose lg:text-base md:text-sm text-neutral-700 dark:text-neutral-300 max-md:text-center">
            {t.intro}
          </p>

          {/* Décor */}
          <div className="relative mt-6 h-32 md:h-96 w-full overflow-hidden [mask-image:radial-gradient(50%_50%,white,transparent)]">
            {/* Halo */}
            <div className="absolute inset-0 before:absolute before:inset-0 before:bg-[radial-gradient(circle_at_bottom_center,#2563EB,#3B82F6_40%,transparent_95%)] before:opacity-60" />
            {/* Base arrondie */}
            <div className="absolute -left-1/2 top-1/2 z-10 aspect-[1/0.7] w-[200%] rounded-[100%] border-t border-zinc-900/20 bg-white dark:border-white/20 dark:bg-zinc-900" />
          </div>
        </div>

        {/* COL DROITE — scroll area */}
        <ContainerScroll
          key={isEN ? 'en' : 'fr'}
          className="min-h-[100vh] space-y-8 py-12"
        >
          {t.phases.map((phase, index) => (
            <CardSticky key={phase.id} index={index + 5}>
              <GlassSticky>
                <div className="flex items-center justify-between gap-4">
                  <h3 className="my-2 text-2xl font-bold tracking-tight text-primary">
                    {phase.title}
                  </h3>
                  <div className="text-2xl font-bold text-primary">
                    {String(index + 1).padStart(2, '0')}
                  </div>
                </div>
                <p className="text-neutral-700 md:text-sm lg:text-base dark:text-neutral-300">
                  {phase.description}
                </p>
              </GlassSticky>
            </CardSticky>
          ))}
        </ContainerScroll>
      </div>
    </section>
  );
}
