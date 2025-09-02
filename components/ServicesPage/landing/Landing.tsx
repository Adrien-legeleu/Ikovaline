// components/ServicesPage/ServicesHero.tsx
'use client';

import * as React from 'react';
import Link from 'next/link';
import { motion } from 'motion/react';
import {
  IconCpu,
  IconRobot,
  IconTrendingUp,
  IconStarFilled,
} from '@tabler/icons-react';

type Pillar = {
  id: 'saas-apps' | 'automatisation-ia' | 'scaling';
  icon: React.ReactNode;
  title: string;
  desc: string;
  href: string;
};

const PILLARS: Pillar[] = [
  {
    id: 'saas-apps',
    icon: <IconCpu className="h-7 w-7 text-sky-500 dark:text-sky-400" />,
    title: 'Applications & SaaS',
    desc:
      "Conception sur-mesure d'applications web, mobiles et SaaS performantes.",
    href: '/nos-services/#saas-apps',
  },
  {
    id: 'automatisation-ia',
    icon: <IconRobot className="h-7 w-7 text-sky-500 dark:text-sky-400" />,
    title: 'Automatisation & IA',
    desc:
      "Optimisez vos processus avec l'intelligence artificielle et l'automatisation.",
    href: '/nos-services/#automatisation-ia',
  },
  {
    id: 'scaling',
    icon: <IconTrendingUp className="h-7 w-7 text-sky-500 dark:text-sky-400" />,
    title: 'Croissance digitale',
    desc:
      'Boostez votre visibilité, attirez plus de clients et accélérez vos résultats.',
    href: '/nos-services/#scaling',
  },
];

function PrimaryButton({
  href,
  children,
  className = '',
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <motion.div whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }}>
      <Link
        href={href}
        className={[
          'inline-flex items-center justify-center rounded-xl px-5 py-3 text-[15px] font-semibold',
          'bg-sky-500 text-white shadow-[0_12px_30px_-10px_rgba(2,132,199,.65)]',
          'hover:bg-sky-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400/70',
          className,
        ].join(' ')}
      >
        {children}
      </Link>
    </motion.div>
  );
}

export default function ServicesHero() {
  return (
    <section className="relative overflow-hidden flex flex-col items-center text-center pt-24 md:pt-28 pb-20 md:pb-28 px-6">
      {/* halos d’arrière-plan (comme la home) */}
      <div aria-hidden className="absolute inset-0 -z-10">
        <span className="absolute -top-40 left-1/2 h-[40rem] w-[40rem] -translate-x-1/2 rounded-full blur-[200px] bg-[radial-gradient(closest-side,#00A8E8,transparent_70%)] opacity-30 dark:opacity-40" />
        <span className="absolute bottom-0 right-1/2 h-[32rem] w-[32rem] translate-x-1/2 rounded-full blur-[160px] bg-[radial-gradient(closest-side,#2563EB,transparent_70%)] opacity-25 dark:opacity-35" />
      </div>

      {/* Bande “avis Google” */}
      <div className="mb-6 flex items-center gap-2 text-sky-500">
        {Array.from({ length: 5 }).map((_, i) => (
          <IconStarFilled key={i} className="h-5 w-5" />
        ))}
        <span className="ml-2 text-sm font-semibold text-neutral-600 dark:text-neutral-300">
          +67 avis Google
        </span>
      </div>

      {/* Titre & sous-titre */}
      <motion.h1
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
        className="max-w-4xl text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight bg-gradient-to-t from-neutral-900 via-neutral-800 to-neutral-600 dark:from-neutral-100 dark:via-neutral-300 dark:to-neutral-400 bg-clip-text text-transparent"
      >
        Des solutions digitales modernes pour propulser votre entreprise
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut', delay: 0.15 }}
        className="mt-5 max-w-2xl text-[17px] md:text-lg leading-7 text-neutral-700 dark:text-neutral-300"
      >
        De l’idée à la mise en production, nous concevons des solutions
        robustes, évolutives et centrées sur vos besoins.
      </motion.p>

      {/* CTA principal */}
      <div className="mt-8">
        <PrimaryButton href="/contact">Nous contacter</PrimaryButton>
      </div>

      {/* Cartes “piliers” */}
      <div className="mt-16 grid w-full max-w-6xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {PILLARS.map((p, i) => (
          <motion.div
            key={p.id}
            initial={{ y: 18 }}
            whileInView={{ y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.45, ease: 'easeOut', delay: i * 0.1 }}
          >
            <Link
              href={p.href}
              className="group block h-full rounded-[28px] border border-white/40 bg-[linear-gradient(135deg,rgba(255,255,255,.9),rgba(240,245,252,.55))] p-7 text-left shadow-[0_18px_60px_rgba(6,24,44,.12),inset_0_1px_0_rgba(255,255,255,.5)] backdrop-blur-2xl transition-all hover:-translate-y-1.5 hover:shadow-[0_30px_90px_rgba(37,99,235,.22)] dark:border-[rgba(56,130,246,0.2)] dark:bg-[linear-gradient(135deg,rgba(10,14,20,.9),rgba(10,14,20,.65))] dark:shadow-[0_18px_60px_rgba(2,6,12,.65),inset_0_1px_0_rgba(59,130,246,.15)]"
            >
              <div className="mb-4 inline-flex items-center gap-2 rounded-2xl bg-white/70 px-3 py-2 shadow-inner ring-1 ring-black/5 dark:bg-neutral-900/60 dark:ring-white/10">
                {p.icon}
                <span className="text-sm font-semibold text-neutral-800 dark:text-neutral-200">
                  {p.title}
                </span>
              </div>

              <h3 className="text-xl font-bold leading-tight text-neutral-900 dark:text-white">
                {p.title}
              </h3>
              <p className="mt-2 text-[15px] leading-7 text-neutral-700 dark:text-neutral-300">
                {p.desc}
              </p>

              <div className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-neutral-800 transition group-hover:translate-x-0.5 dark:text-neutral-200">
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
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
