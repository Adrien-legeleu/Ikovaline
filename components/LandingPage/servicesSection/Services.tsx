'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { LiquidLink } from '@/components/ui/liquid-link';
import {
  IconCpu,
  IconDeviceMobileCode,
  IconRobot,
  IconSparkles,
  IconTools,
} from '@tabler/icons-react';

import {
  SaaSConstellation,
  DevicesOrbit,
  AutomationGrid,
  ConversionPulse,
} from './ServicesSkeletons';
import LightBackdrop from '@/components/ui/lightBackdrop';
import UnicornBackdrop from '@/components/ui/unicornBackdrop';

type Card = {
  title: string;
  description: string;
  icon: React.ReactNode;
  header: React.ReactNode;
  href: string;
  className?: string;
};

const cards: Card[] = [
  {
    title: 'SaaS sur-mesure • scalable • sécurisé',
    description:
      'De l’architecture au billing, multi-tenant, RBAC et observabilité. On bâtit une base produit saine pour itérer vite, sans dette.',
    icon: <IconCpu className="size-6 text-cyan-600 dark:text-cyan-300" />,
    header: <SaaSConstellation />,
    href: '/nos-services/creation-saas-sur-mesure',
  },
  {
    title: 'Web Apps & Mobiles • UX produit',
    description:
      'Next.js / Expo, perfs élevées, accessibilité, offline-first. Du PWA au store, du design système au shipping.',
    icon: (
      <IconDeviceMobileCode className="size-6 text-indigo-600 dark:text-indigo-300" />
    ),
    header: <DevicesOrbit />,
    href: '/nos-services/web-apps-applications-mobiles',
  },
  {
    title: 'Automatisation & IA • gains réels',
    description:
      'Workflows no/low-code, intégrations API, agents IA et RAG. On connecte vos outils et supprime les tâches répétitives.',
    icon: <IconRobot className="size-6 text-teal-600 dark:text-teal-300" />,
    header: <AutomationGrid />,
    href: '/nos-services/automatisation-intelligence-artificielle',
  },
  {
    title: 'Sites premium • conversion & SEO',
    description:
      'Design haut de gamme, contenus orientés ROI, vitesse extrême, tracking clean et SEO irréprochable.',
    icon: (
      <IconSparkles className="size-6 text-amber-600 dark:text-amber-300" />
    ),
    header: <ConversionPulse />,
    href: '/nos-services/sites-web-premium-conversion',
  },
];

export default function Services() {
  return (
    <section className="relative isolate py-28 md:py-36">
      {/* Backdrops */}
      <LightBackdrop className="block dark:hidden" />
      <UnicornBackdrop className="hidden dark:block" />

      <div className="mx-auto max-w-6xl px-4">
        <h2 className="text-center text-3xl sm:text-4xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-neutral-900 to-neutral-800 dark:from-neutral-100 dark:to-neutral-200">
          Nos Services
        </h2>
        <p className="mt-3 text-center text-neutral-800 dark:text-neutral-200">
          Du produit au go-to-market, on conçoit des expériences qui
          transforment vraiment.
        </p>

        {/* Grid en staggered layout */}
        <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 gap-7 auto-rows-[minmax(20rem,auto)]">
          {cards.map((card, i) => (
            <motion.a
              key={i}
              href={card.href}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              viewport={{ once: true }}
              className={cn(
                'group relative overflow-hidden rounded-3xl p-1',
                'hover:scale-[1.01] transition-transform duration-300',
                // Staggered layout: décalage vertical
                i % 2 === 1 ? 'sm:translate-y-8' : ''
              )}
            >
              <GlassCard className="h-full flex flex-col">
                <div className="relative h-40 w-full">{card.header}</div>
                <div className="mt-4 flex items-start gap-3">
                  {card.icon}
                  <h3 className="text-lg sm:text-xl font-semibold text-neutral-900 dark:text-neutral-100">
                    {card.title}
                  </h3>
                </div>
                <p className="mt-2 text-sm sm:text-base text-neutral-600 dark:text-neutral-300">
                  {card.description}
                </p>
                <div className="mt-auto pt-5">
                  <span className="inline-flex items-center gap-2 text-sm font-medium text-cyan-700 dark:text-cyan-200">
                    Découvrir →
                  </span>
                </div>
              </GlassCard>
            </motion.a>
          ))}
        </div>

        <div className="mt-14 flex justify-center">
          <LiquidLink href="/nos-services" className="z-10">
            <span className="flex items-center justify-center gap-2">
              <IconTools />
              Voir tous nos services
            </span>
          </LiquidLink>
        </div>
      </div>
    </section>
  );
}

export function GlassCard({
  className,
  children,
}: React.PropsWithChildren<{ className?: string }>) {
  return (
    <div
      className={cn(
        'relative overflow-hidden rounded-3xl',
        'bg-white/10 dark:bg-neutral-900/10',
        'border border-white/30 dark:border-white/10',
        'backdrop-blur-md',
        'transition-transform duration-300 hover:scale-[1.01]',
        className
      )}
    >
      {/* couche “relief” comme LiquidButton */}
      <div
        aria-hidden
        className="absolute inset-0 z-0 rounded-3xl shadow-[0_0_6px_rgba(0,0,0,0.03),0_4px_12px_rgba(0,0,0,0.08),inset_3px_3px_0.5px_-3px_rgba(0,0,0,0.9),inset_-3px_-3px_0.5px_-3px_rgba(0,0,0,0.85),inset_1px_1px_1px_-0.5px_rgba(0,0,0,0.6),inset_-1px_-1px_1px_-0.5px_rgba(0,0,0,0.6),inset_0_0_8px_8px_rgba(0,0,0,0.1),inset_0_0_3px_3px_rgba(0,0,0,0.05),0_0_18px_rgba(255,255,255,0.15)]"
      />

      {/* filtre verre */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 overflow-hidden rounded-3xl"
        style={{ backdropFilter: 'url("#card-glass")' }}
      />

      {/* contenu */}
      <div className="relative z-10 p-6">{children}</div>

      {/* filtre svg */}
      <GlassFilter />
    </div>
  );
}

function GlassFilter() {
  return (
    <svg className="hidden">
      <defs>
        <filter
          id="card-glass"
          x="0%"
          y="0%"
          width="100%"
          height="100%"
          colorInterpolationFilters="sRGB"
        >
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.05 0.05"
            numOctaves="1"
            seed="2"
            result="turbulence"
          />
          <feGaussianBlur
            in="turbulence"
            stdDeviation="2"
            result="blurredNoise"
          />
          <feDisplacementMap
            in="SourceGraphic"
            in2="blurredNoise"
            scale="60"
            xChannelSelector="R"
            yChannelSelector="G"
            result="displaced"
          />
          <feGaussianBlur in="displaced" stdDeviation="3" result="finalBlur" />
          <feComposite in="finalBlur" in2="finalBlur" operator="over" />
        </filter>
      </defs>
    </svg>
  );
}
