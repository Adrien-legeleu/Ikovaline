'use client';

import React, { useRef } from 'react';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import clsx from 'clsx';
import {
  Cpu,
  Bot,
  Sparkles,
  MapPin,
  LineChart,
  Smartphone,
} from 'lucide-react';

import {
  AcquisitionMock,
  AppsMock,
  AutomationMock,
  GMBMock,
  SaaSMock,
  SitesMock,
} from './ServicesSkeletons';

/* ========================================================================== */
/*                               CardShell                                    */
/* ========================================================================== */
type CardShellProps<As extends React.ElementType = 'article'> = {
  children: React.ReactNode;
  as?: As;
  className?: string;
} & Omit<React.ComponentPropsWithoutRef<As>, 'as' | 'className' | 'children'>;

function CardShell<As extends React.ElementType = 'article'>({
  children,
  as,
  className,
}: CardShellProps<As>) {
  const Comp = (as ?? 'article') as React.ElementType;

  return (
    <Comp
      className={clsx(
        'relative flex h-full flex-col justify-between overflow-hidden rounded-[3rem] p-6 md:p-7 lg:p-5 xl:p-7',
        'bg-white backdrop-blur-sm shadow-[0_40px_120px_-52px_rgba(0,0,0,.35)]',
        'dark:bg-neutral-900/20 dark:shadow-[0_60px_150px_-60px_rgba(0,0,0,.70)]',
        'before:pointer-events-none before:absolute before:inset-0',
        'before:[background:linear-gradient(135deg,rgba(255,255,255,.85),rgba(255,255,255,.85))_padding-box,linear-gradient(135deg,#d4d4d8,#e5e7eb)]',
        'dark:before:[background:linear-gradient(135deg,rgba(0,0,0,.85),rgba(0,0,0,.85))_padding-box,linear-gradient(135deg,#52525b,#71717a)]',
        className
      )}
    >
      {/* Highlight */}
      <span className="pointer-events-none absolute inset-x-6 top-3 h-8 rounded-full bg-black/5 dark:bg-white/5 blur-xl" />
      {/* Hover lift */}
      <style jsx>{`
        :global(a.group:hover article),
        :global(a.group:focus-visible article) {
          transform: translateY(-2px);
        }
      `}</style>
      {children}
    </Comp>
  );
}

/* ========================================================================== */
/*                               Data                                         */
/* ========================================================================== */
const SERVICES = [
  {
    id: 'saas',
    tag: 'SaaS',
    title: 'SaaS sur-mesure',
    desc: 'On crée ton logiciel en ligne de A à Z : connexion des utilisateurs, abonnements, paiements, tout est prêt et simple à utiliser.',
    icon: Cpu,
    href: 'https://ikovaline.com/nos-services/creation-saas-sur-mesure',
    illustration: <SaaSMock />,
  },
  {
    id: 'apps',
    tag: 'Apps',
    title: 'Web & Mobile Apps hautes performances',
    desc: 'On développe ton site ou ton appli mobile rapide, facile à utiliser, qui marche partout et même sans internet.',
    icon: Smartphone,
    href: 'https://ikovaline.com/nos-services/web-apps-applications-mobiles/',
    illustration: <AppsMock />,
  },
  {
    id: 'sites',
    tag: 'Sites & SEO',
    title: 'Sites sur-mesure',
    desc: 'On fait un site beau, rapide, bien référencé sur Google, et optimisé pour que les gens près de chez toi te trouvent facilement.',
    icon: Sparkles,
    href: 'https://ikovaline.com/nos-services#sites-seo-geo',
    illustration: <SitesMock />,
  },
  {
    id: 'automation',
    tag: 'IA & Automation',
    title: 'Automatisation & IA',
    desc: 'On installe des robots et de l’IA pour faire les tâches chiantes à ta place, gagner du temps et être plus efficace.',
    icon: Bot,
    href: 'https://ikovaline.com/nos-services#automatisation-ia',
    illustration: <AutomationMock />,
  },
  {
    id: 'gmb',
    tag: 'Local',
    title: 'Google My Business (GBP) qui convertit',
    desc: 'On règle ta fiche Google pour que tu sois bien vu sur Maps : infos claires, avis clients, photos et appels qui arrivent directement.',
    icon: MapPin,
    href: 'https://ikovaline.com/nos-services#scaling',
    illustration: <GMBMock />,
  },
  {
    id: 'acquisition',
    tag: 'Acquisition',
    title: 'SEA + SEO : acquisition rentable',
    desc: 'On t’amène des clients grâce à la pub Google et au référencement naturel. Tu vois clairement combien ça rapporte.',
    icon: LineChart,
    href: 'https://ikovaline.com/nos-services#scaling',
    illustration: <AcquisitionMock />,
  },
] as const;

/* ========================================================================== */
/*                        Desktop / Tablet Grid (md+)                         */
/* ========================================================================== */
function DesktopGridServices() {
  return (
    <section className="bg-transparent hidden md:block">
      <div className="relative z-10 mx-auto px-4">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 xl:gap-10">
          {SERVICES.map((s, idx) => {
            const Icon = s.icon;
            return (
              <Link
                key={s.id}
                href={s.href}
                prefetch={false}
                aria-label={`${s.title} — en savoir plus`}
                className="group block focus:outline-none"
              >
                <CardShell>
                  <div className="z-20 flex flex-col gap-4">
                    <div className="flex w-full items-center justify-between">
                      <span className="inline-flex w-fit items-center gap-2 rounded-full bg-[hsl(var(--primary)/0.08)] px-3 py-1 text-xs font-semibold text-[hsl(var(--primary))] ring-1 ring-[hsl(var(--primary)/0.25)]">
                        <motion.span
                          className="inline-flex"
                          animate={{ scale: [1, 1.06, 1] }}
                          transition={{
                            duration: 2.2,
                            delay: idx * 0.05,
                            repeat: Infinity,
                          }}
                        >
                          <Icon className="h-4 w-4" />
                        </motion.span>
                        {s.tag}
                      </span>
                      <div className="z-20 inline-flex items-center gap-2 text-sm font-semibold text-primary transition group-hover:translate-x-0.5">
                        En savoir plus
                        <svg
                          aria-hidden
                          viewBox="0 0 24 24"
                          className="h-4 w-4"
                          fill="none"
                          stroke="currentColor"
                        >
                          <path d="M5 12h14" strokeWidth="2" />
                          <path d="M13 5l7 7-7 7" strokeWidth="2" />
                        </svg>
                      </div>
                    </div>

                    <h3 className="text-[clamp(1.25rem,1.6vw,1.8rem)] font-extrabold leading-tight text-neutral-900 dark:text-white">
                      {s.title}
                    </h3>

                    <p className="text-[12px] leading-6 text-neutral-700 dark:text-neutral-300">
                      {s.desc}
                    </p>
                  </div>

                  <div className="mt-2">
                    <div className="relative w-full overflow-hidden rounded-2xl">
                      <motion.div
                        className="pointer-events-none absolute inset-0"
                        initial={{ opacity: 0 }}
                        whileHover={{ opacity: 1 }}
                        transition={{ duration: 0.25 }}
                        style={{
                          background:
                            'radial-gradient(1200px 300px at 50% 0%, rgba(59,130,246,0.07), transparent 60%)',
                        }}
                      />
                      <div className="aspect-[16/10]">{s.illustration}</div>
                    </div>
                  </div>
                </CardShell>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ========================================================================== */
/*                 Mobile Sticky Scroll Stack (< md only)                    */
/* ========================================================================== */
/*
  Le principe :
  - On crée une "track" verticale avec un gros padding bas (pb-[70vh] etc.)
  - Chaque card est rendue dans un wrapper sticky top-0
  - On scale chaque card en fonction du scrollYProgress pour avoir l'effet profondeur
  - On conserve STRICTEMENT le design de CardShell + contenu de la carte
*/

function MobileStickyCard({
  i,
  progress,
  range,
  targetScale,
  service,
  idx,
}: {
  i: number;
  progress: any;
  range: [number, number];
  targetScale: number;
  service: (typeof SERVICES)[number];
  idx: number;
}) {
  const scale = useTransform(progress, range, [1, targetScale]);

  const Icon = service.icon;

  return (
    <div className="sticky top-24 w-[95%]  max-w-[360px] sm:max-w-[400px] flex items-center justify-center">
      <motion.div
        style={{
          scale,
          top: `calc(-5vh + ${i * 15 + 50}px)`,
        }}
        className={clsx(
          'relative -top-1/4 flex origin-top m-0 flex-col overflow-visible',
          'w-full max-w-[360px] sm:max-w-[400px]',
          'md:hidden'
        )}
      >
        <Link
          href={service.href}
          prefetch={false}
          aria-label={`${service.title} — en savoir plus`}
          className="group block focus:outline-none"
        >
          <CardShell>
            <div className="z-20 flex flex-col gap-4">
              <div className="flex w-full items-center justify-between">
                <span className="inline-flex w-fit items-center gap-2 rounded-full bg-[hsl(var(--primary)/0.08)] px-3 py-1 text-xs font-semibold text-[hsl(var(--primary))] ring-1 ring-[hsl(var(--primary)/0.25)]">
                  <motion.span
                    className="inline-flex"
                    animate={{ scale: [1, 1.06, 1] }}
                    transition={{
                      duration: 2.2,
                      delay: idx * 0.05,
                      repeat: Infinity,
                    }}
                  >
                    <Icon className="h-4 w-4" />
                  </motion.span>
                  {service.tag}
                </span>
                <div className="z-20 inline-flex items-center gap-2 text-sm font-semibold text-primary transition group-hover:translate-x-0.5">
                  En savoir plus
                  <svg
                    aria-hidden
                    viewBox="0 0 24 24"
                    className="h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                  >
                    <path d="M5 12h14" strokeWidth="2" />
                    <path d="M13 5l7 7-7 7" strokeWidth="2" />
                  </svg>
                </div>
              </div>

              <h3 className="text-[clamp(1.25rem,1.6vw,1.8rem)] font-extrabold leading-tight text-neutral-900 dark:text-white">
                {service.title}
              </h3>

              <p className="text-[12px] leading-6 text-neutral-700 dark:text-neutral-300">
                {service.desc}
              </p>
            </div>

            <div className="mt-2">
              <div className="relative w-full overflow-hidden rounded-2xl">
                <motion.div
                  className="pointer-events-none absolute inset-0"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.25 }}
                  style={{
                    background:
                      'radial-gradient(1200px 300px at 50% 0%, rgba(59,130,246,0.07), transparent 60%)',
                  }}
                />
                <div className="aspect-[16/10]">{service.illustration}</div>
              </div>
            </div>
          </CardShell>
        </Link>
      </motion.div>
    </div>
  );
}

function MobileStackingServices() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  return (
    <section className="md:hidden  overflow-y-visible bg-transparent">
      <main
        ref={containerRef}
        className={clsx(
          'relative flex w-full flex-col items-center justify-center',
          'pb-[30vh]'
        )}
      >
        {SERVICES.map((service, i) => {
          const targetScale = Math.max(
            0.6,
            1 - (SERVICES.length - i - 1) * 0.08
          );

          return (
            <MobileStickyCard
              key={service.id}
              i={i}
              progress={scrollYProgress}
              range={[i * 0.2, 1]}
              targetScale={targetScale}
              service={service}
              idx={i}
            />
          );
        })}
      </main>
    </section>
  );
}

/* ========================================================================== */
/*                          Main Export                                       */
/* ========================================================================== */
export default function ServicesGridRefined() {
  return (
    <>
      {/* mobile stacking (< md) */}
      <MobileStackingServices />

      {/* desktop grid (md+) */}
      <DesktopGridServices />
    </>
  );
}
