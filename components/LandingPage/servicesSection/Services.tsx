// components/skeletons.tsx
'use client';

import React from 'react';
import Link from 'next/link';
import { motion, useAnimationControls } from 'framer-motion';
import {
  IconCpu,
  IconDeviceMobileCode,
  IconRobot,
  IconSparkles,
  IconMapPin,
  IconChartLine,
} from '@tabler/icons-react';
import {
  AcquisitionMock,
  AppsMock,
  AutomationMock,
  GMBMock,
  SaaSMock,
  SitesMock,
} from './ServicesSkeletons';

/* ========================================================================== */
/*                               Shared shells                                */
/* ========================================================================== */

type CardShellProps<As extends React.ElementType = 'article'> = {
  children: React.ReactNode;
  as?: As;
  className?: string;
} & Omit<React.ComponentPropsWithoutRef<As>, 'as' | 'className' | 'children'>;

function CardShell<As extends React.ElementType = 'article'>({
  children,
  as,
  className = '',
}: CardShellProps<As>) {
  const Comp = (as ?? 'article') as React.ElementType;
  return (
    <Comp
      className={[
        'relative flex h-full justify-between flex-col overflow-hidden rounded-2xl p-6 md:p-7 lg:p-5 xl:p-7',
        'bg-white/90 backdrop-blur-sm shadow-[0_40px_120px_-52px_rgba(0,0,0,.35)] border border-black/10 dark:border-white/10',
        'dark:bg-neutral-900/20 dark:ring-white/10 dark:shadow-[0_60px_150px_-60px_rgba(0,0,0,.70)]',
        'before:pointer-events-none before:absolute before:inset-0',
        'before:[background:linear-gradient(135deg,rgba(255,255,255,.85),rgba(255,255,255,.85))_padding-box,linear-gradient(135deg,#d4d4d8,#e5e7eb)]',
        'dark:before:[background:linear-gradient(135deg,rgba(0,0,0,.85),rgba(0,0,0,.85))_padding-box,linear-gradient(135deg,#52525b,#71717a)]',
        className,
      ].join(' ')}
    >
      {/* soft highlight */}
      <span className="pointer-events-none absolute inset-x-6 top-3 h-8 rounded-full bg-black/5 dark:black-white/5 blur-xl" />
      {/* subtle hover lift (sans changer le design) */}
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

const SERVICES = [
  {
    id: 'saas',
    tag: 'SaaS',
    title: 'SaaS sur-mesure',
    desc: 'On crée ton logiciel en ligne de A à Z : connexion des utilisateurs, abonnements, paiements, tout est prêt et simple à utiliser.',
    icon: <IconCpu className="h-5 w-5" />,
    href: 'https://ikovaline.com/nos-services/creation-saas-sur-mesure',
    illustration: <SaaSMock />,
  },
  {
    id: 'apps',
    tag: 'Apps',
    title: 'Web & Mobile Apps hautes performances',
    desc: 'On développe ton site ou ton appli mobile rapide, facile à utiliser, qui marche partout et même sans internet.',
    icon: <IconDeviceMobileCode className="h-5 w-5" />,
    href: 'https://ikovaline.com/nos-services/web-apps-applications-mobiles/',
    illustration: <AppsMock />,
  },
  {
    id: 'automation',
    tag: 'IA & Automation',
    title: 'Automatisation & IA',
    desc: 'On installe des robots et de l’IA pour faire les tâches chiantes à ta place, gagner du temps et être plus efficace.',
    icon: <IconRobot className="h-5 w-5" />,
    href: 'https://ikovaline.com/nos-services#automatisation-ia',
    illustration: <AutomationMock />,
  },
  {
    id: 'sites',
    tag: 'Sites & SEO',
    title: 'Sites sur-mesure • SEO & GEO',
    desc: 'On fait un site beau, rapide, bien référencé sur Google, et optimisé pour que les gens près de chez toi te trouvent facilement.',
    icon: <IconSparkles className="h-5 w-5" />,
    href: 'https://ikovaline.com/nos-services#sites-seo-geo',
    illustration: <SitesMock />,
  },
  {
    id: 'gmb',
    tag: 'Local',
    title: 'Google My Business (GBP) qui convertit',
    desc: 'On règle ta fiche Google pour que tu sois bien vu sur Maps : infos claires, avis clients, photos et appels qui arrivent directement.',
    icon: <IconMapPin className="h-5 w-5" />,
    href: 'https://ikovaline.com/nos-services#scaling',
    illustration: <GMBMock />,
  },
  {
    id: 'acquisition',
    tag: 'Acquisition',
    title: 'SEA + SEO : acquisition rentable',
    desc: 'On t’amène des clients grâce à la pub Google et au référencement naturel. Tu vois clairement combien ça rapporte.',
    icon: <IconChartLine className="h-5 w-5" />,
    href: 'https://ikovaline.com/nos-services#scaling',
    illustration: <AcquisitionMock />,
  },
] as const;

/* ========================================================================== */
/*                         Section 2×3 – export principal                      */
/* ========================================================================== */

export default function ServicesGridRefined() {
  return (
    <section className="bg-transparent">
      <div className="relative z-10 mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 xl:gap-10">
          {SERVICES.map((s, idx) => (
            <Link
              key={s.id}
              href={s.href}
              prefetch={false}
              aria-label={`${s.title} — en savoir plus`}
              className="group block focus:outline-none"
            >
              <CardShell>
                <div className="flex z-20 flex-col gap-4">
                  <div className="w-full items-center flex justify-between">
                    <span className="inline-flex w-fit items-center gap-2 rounded-full bg-[hsl(var(--primary)/0.08)] px-3 py-1 text-xs font-semibold text-[hsl(var(--primary))] ring-1 ring-[hsl(var(--primary)/0.25)]">
                      {/* micro pulse icône seulement, visuel identique */}
                      <motion.span
                        className="inline-flex"
                        animate={{ scale: [1, 1.06, 1] }}
                        transition={{
                          duration: 2.2,
                          delay: idx * 0.05,
                          repeat: Infinity,
                        }}
                      >
                        {s.icon}
                      </motion.span>
                      {s.tag}
                    </span>
                    <div className=" z-20 inline-flex items-center gap-2 text-sm font-semibold text-neutral-800 transition group-hover:translate-x-0.5 text-primary">
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
                    {/* halo discret au survol sans toucher au layout */}
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
          ))}
        </div>
      </div>
    </section>
  );
}

/* ========================================================================== */
/*                       (Optionnel) Anim helpers export                      */
/* ========================================================================== */

export function SaaSConstellation() {
  const stars = Array.from({ length: 18 });
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      {stars.map((_, i) => (
        <motion.span
          key={i}
          className="absolute size-1.5 rounded-full bg-cyan-400/90 shadow-[0_0_10px_rgba(34,211,238,0.9)]"
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: [0.3, 1, 0.3], scale: [0.6, 1.1, 0.6] }}
          transition={{
            duration: 2 + (i % 6) * 0.3,
            repeat: Infinity,
            delay: i * 0.12,
          }}
          style={{
            top: `${15 + (i % 6) * 15}%`,
            left: `${8 + ((i * 19) % 85)}%`,
          }}
        />
      ))}
      <motion.div
        className="h-16 w-16 rounded-xl bg-white/60 dark:bg-neutral-900/60 backdrop-blur-lg border border-white/30 shadow-[0_0_25px_rgba(34,211,238,0.7)]"
        animate={{ scale: [0.9, 1.05, 0.9], opacity: [0.8, 1, 0.8] }}
        transition={{ duration: 2, repeat: Infinity }}
      />
    </div>
  );
}

export function DevicesOrbit() {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="absolute inset-x-12 top-8 bottom-8 rounded-2xl bg-white/40 dark:bg-neutral-900/40 backdrop-blur-md border border-white/20" />
      <motion.div
        className="absolute h-24 w-36 rounded-xl bg-gradient-to-tr from-indigo-200/60 to-indigo-400/40  border border-white/20 backdrop-blur-md shadow-lg"
        animate={{ y: [-10, 0, -10], rotate: [-2, 0, -2] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute bottom-10 right-16 h-28 w-14 rounded-2xl bg-gradient-to-tr from-blue-200/60 to-blue-400/40  border border-white/20 backdrop-blur-md shadow-md"
        animate={{ y: [8, 0, 8], rotate: [3, 0, 3] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute bottom-14 left-20 h-20 w-28 rounded-xl bg-gradient-to-tr from-cyan-200/60 to-cyan-400/40  border border-white/20 backdrop-blur-md"
        animate={{ x: [8, 0, 8], opacity: [0.7, 1, 0.7] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
      />
    </div>
  );
}

export function AutomationGrid() {
  return (
    <div className="relative w-full h-48 flex items-center justify-center">
      <div className="absolute z-20 w-12 h-12 rounded-full bg-gradient-to-br from-teal-400 to-cyan-500 shadow-[0_0_18px_rgba(34,211,238,0.8)] flex items-center justify-center animate-pulse">
        <IconRobot className="size-6 text-white" />
      </div>
      {[
        { top: '15%', left: '50%' },
        { top: '50%', left: '85%' },
        { top: '85%', left: '50%' },
        { top: '50%', left: '15%' },
      ].map((pos, i) => (
        <div
          key={i}
          className="absolute w-4 !-translate-x-1/2 !-translate-y-1/2 h-4 rounded-full bg-cyan-300 shadow-[0_0_10px_rgba(34,211,238,0.7)]"
          style={{ ...pos }}
        />
      ))}
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        <line x1="50" y1="15" x2="50" y2="50" className="automation-line" />
        <line x1="85" y1="50" x2="50" y2="50" className="automation-line" />
        <line x1="50" y1="85" x2="50" y2="50" className="automation-line" />
        <line x1="15" y1="50" x2="50" y2="50" className="automation-line" />
      </svg>
      <style jsx>{`
        .automation-line {
          stroke: rgba(34, 211, 238, 0.5);
          stroke-width: 1.5;
          stroke-linecap: round;
          animation: flow 4s ease-in-out infinite;
        }
        @keyframes flow {
          0% {
            stroke-opacity: 0.2;
          }
          50% {
            stroke-opacity: 0.8;
          }
          100% {
            stroke-opacity: 0.2;
          }
        }
      `}</style>
    </div>
  );
}

export function ConversionPulse() {
  const controls = useAnimationControls();
  React.useEffect(() => {
    controls.start({
      strokeDashoffset: [600, 0],
      transition: { duration: 4, repeat: Infinity, ease: 'easeInOut' },
    });
  }, [controls]);

  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <svg viewBox="0 0 400 200" className="w-full h-full">
        <defs>
          <linearGradient id="gradLine" x1="0" x2="1" y1="0" y2="0">
            <stop offset="0%" stopColor="rgba(71,234,224,1)" />
            <stop offset="100%" stopColor="rgba(59,130,246,1)" />
          </linearGradient>
        </defs>
        <motion.path
          d="M10,150 C70,80 130,120 180,60 C230,20 280,110 340,90 Q370,80 390,100"
          fill="none"
          stroke="url(#gradLine)"
          strokeWidth="12"
          strokeLinecap="round"
          strokeOpacity="0.15"
          filter="blur(12px)"
          animate={{ opacity: [0.1, 0.25, 0.1] }}
          transition={{ duration: 5, repeat: Infinity }}
        />
        <motion.path
          d="M10,150 C70,80 130,120 180,60 C230,20 280,110 340,90 Q370,80 390,100"
          fill="none"
          stroke="url(#gradLine)"
          strokeWidth="4"
          strokeLinecap="round"
          strokeDasharray="600"
          animate={controls}
        />
        <motion.path
          d="M10,150 C70,80 130,120 180,60 C230,20 280,110 340,90 Q370,80 390,100 L390,200 L10,200 Z"
          fill="url(#gradLine)"
          opacity="0.1"
          animate={{ opacity: [0.08, 0.2, 0.08] }}
          transition={{ duration: 5, repeat: Infinity }}
        />
      </svg>
      {[
        { x: 180, y: 60 },
        { x: 280, y: 85 },
      ].map((p, i) => (
        <motion.span
          key={i}
          className="absolute size-3 rounded-full bg-cyan-300 shadow-[0_0_20px_rgba(59,130,246,0.95)]"
          style={{
            left: `${(p.x / 400) * 100}%`,
            top: `${(p.y / 200) * 100}%`,
          }}
          animate={{
            scale: [0.7, 1.6, 0.7],
            opacity: [0.6, 1, 0.6],
            y: [0, -6, 0],
          }}
          transition={{ duration: 2 + i, repeat: Infinity }}
        />
      ))}
    </div>
  );
}
