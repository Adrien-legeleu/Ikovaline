// components/ServicesPage/ServicesHero.tsx
'use client';

import * as React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  IconCpu,
  IconRobot,
  IconTrendingUp,
  IconStarFilled,
} from '@tabler/icons-react';

/* ---------------------------------- DATA ---------------------------------- */

type Pillar = {
  id: 'saas-apps' | 'automatisation-ia' | 'scaling';
  icon: React.ReactNode;
  title: string;
  desc: string;
  href: string;
  chip: string;
};

const PILLARS: Pillar[] = [
  {
    id: 'saas-apps',
    icon: (
      <IconCpu className="h-[18px] w-[18px] text-sky-500 dark:text-sky-400" />
    ),
    title: 'SaaS sur-mesure',
    desc: 'On crée ton logiciel en ligne de A à Z : connexion des utilisateurs, abonnements, paiements, tout est prêt et simple à utiliser.',
    href: '/nos-services/#saas-apps',
    chip: 'SaaS',
  },
  {
    id: 'automatisation-ia',
    icon: (
      <IconRobot className="h-[18px] w-[18px] text-sky-500 dark:text-sky-400" />
    ),
    title: 'Automatisation & IA',
    desc: 'On installe des robots et de l’IA pour faire les tâches chiantes à ta place, gagner du temps et être plus efficace.',
    href: '/nos-services/#automatisation-ia',
    chip: 'IA',
  },
  {
    id: 'scaling',
    icon: (
      <IconTrendingUp className="h-[18px] w-[18px] text-sky-500 dark:text-sky-400" />
    ),
    title: 'Web & Mobile Apps hautes performances',
    desc: 'On développe ton site ou ton appli mobile rapide, facile à utiliser, qui marche partout et même sans internet.',
    href: '/nos-services/#scaling',
    chip: 'Apps',
  },
];

/* --------------------------------- UTILS ---------------------------------- */

const Card = ({
  children,
  delay = 0,
}: {
  children: React.ReactNode;
  delay?: number;
}) => (
  <motion.div
    initial={{ y: 18, opacity: 0 }}
    whileInView={{ y: 0, opacity: 1 }}
    viewport={{ once: true, amount: 0.3 }}
    transition={{ duration: 0.5, ease: 'easeOut', delay }}
    className="group  h-full justify-between flex flex-col rounded-[28px] border border-white/45
               bg-[linear-gradient(135deg,rgba(255,255,255,.92),rgba(240,245,252,.65))]
               p-7 text-left shadow-[0_18px_60px_rgba(6,24,44,.12),inset_0_1px_0_rgba(255,255,255,.5)]
            
               dark:border-[rgba(56,130,246,0.22)]
               dark:bg-[linear-gradient(135deg,rgba(10,14,20,.92),rgba(10,14,20,.65))]
               dark:shadow-[0_18px_60px_rgba(2,6,12,.65),inset_0_1px_0_rgba(59,130,246,.15)]
               will-change-transform"
  >
    {children}
  </motion.div>
);

const Chip = ({ icon, label }: { icon: React.ReactNode; label: string }) => (
  <span className="inline-flex items-center gap-1.5 rounded-2xl bg-white/70 px-3 py-2 text-sm font-semibold shadow-inner ring-1 ring-black/5 dark:bg-neutral-900/60 dark:text-neutral-200 dark:ring-white/10">
    {icon}
    {label}
  </span>
);

const LearnMore = ({ href }: { href: string }) => (
  <Link
    href={href}
    className="inline-flex items-center gap-1.5 rounded-2xl bg-white/55 px-3 py-2 text-sm font-semibold text-sky-700 ring-1 ring-sky-200/60 shadow-sm
               hover:bg-white/75 dark:bg-sky-900/20 dark:text-sky-300 dark:ring-sky-800/50"
  >
    En savoir plus
    <svg
      viewBox="0 0 24 24"
      className="h-4 w-4"
      fill="none"
      stroke="currentColor"
    >
      <path d="M5 12h14" strokeWidth="2" />
      <path d="M13 5l7 7-7 7" strokeWidth="2" />
    </svg>
  </Link>
);

const BrowserFrame: React.FC<{
  label: string;
  children: React.ReactNode;
}> = ({ label, children }) => (
  <div className="mt-5 rounded-[22px] border border-black/10 bg-white/90 p-4 shadow-[0_20px_60px_-24px_rgba(0,0,0,0.25)] backdrop-blur dark:border-white/10 dark:bg-neutral-950/70">
    <div className="mb-3 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <span className="h-2.5 w-2.5 rounded-full bg-red-300/80" />
        <span className="h-2.5 w-2.5 rounded-full bg-yellow-300/80" />
        <span className="h-2.5 w-2.5 rounded-full bg-green-300/80" />
      </div>
      <span className="rounded-full bg-neutral-100 px-3 py-1 text-xs font-semibold text-neutral-500 ring-1 ring-black/10 dark:bg-neutral-900 dark:text-neutral-400 dark:ring-white/10">
        {label}
      </span>
    </div>

    {/* hauteur unifiée */}
    <div className="relative h-44 w-full overflow-hidden">{children}</div>
  </div>
);

/* Equalizer générique */
const Equalizer = ({
  bars = 24,
  delayStep = 0.04,
}: {
  bars?: number;
  delayStep?: number;
}) => (
  <svg
    aria-hidden
    viewBox="0 0 240 36"
    className="absolute bottom-2 left-1/2 h-9 w-[88%] -translate-x-1/2 text-neutral-300 dark:text-neutral-600"
  >
    {Array.from({ length: bars }).map((_, i) => {
      const x = (i * 240) / bars + 2;
      const base = i % 2 ? 5 : 8;
      return (
        <motion.rect
          key={i}
          x={x}
          y={18 - base / 2}
          width="5"
          height={base}
          rx="2"
          fill="currentColor"
          animate={{ height: [base, base + 8, base] }}
          transition={{
            duration: 1.2,
            repeat: Infinity,
            delay: i * delayStep,
            ease: 'easeInOut',
          }}
        />
      );
    })}
  </svg>
);

/* Sparkline pour SaaS */
const SmoothSparkline = () => (
  <svg
    aria-hidden
    viewBox="0 0 320 100"
    className="absolute inset-x-0 bottom-5  h-24 w-full text-sky-400/75"
  >
    <motion.path
      d="M0,80 C40,60 80,70 120,58 C160,46 200,72 240,62 C270,56 300,52 320,58"
      fill="none"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
      initial={{ pathLength: 0 }}
      animate={{ pathLength: 1 }}
      transition={{ duration: 1.4, ease: 'easeInOut' }}
    />
    <motion.path
      d="M0,80 C40,60 80,70 120,58 C160,46 200,72 240,62 C270,56 300,52 320,58 L320,120 L0,120 Z"
      fill="currentColor"
      opacity="0.08"
      initial={{ opacity: 0 }}
      animate={{ opacity: 0.08 }}
      transition={{ delay: 0.4 }}
    />
  </svg>
);

/* Mockups */
const SaaSMock = () => (
  <BrowserFrame label="SaaS · Dashboard">
    <div className="grid grid-cols-2 gap-4 px-1  pt-1">
      {['MRR', 'ACTIVE USERS'].map((t, i) => (
        <div
          key={t}
          className="rounded-2xl border border-black/10 p-4 dark:border-white/10"
        >
          <div className="text-[11px] font-semibold tracking-wide text-neutral-500 dark:text-neutral-400">
            {t}
          </div>
          <div className="mt-2 h-3 rounded bg-neutral-100 dark:bg-neutral-800" />
          <motion.div
            className="mt-2 h-1.5 origin-left rounded bg-neutral-300/70 dark:bg-neutral-600/80"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1, ease: 'easeOut', delay: 0.15 + i * 0.1 }}
          />
        </div>
      ))}
    </div>
    <SmoothSparkline />
  </BrowserFrame>
);

const AutomationMock = () => (
  <BrowserFrame label="Automation · Workflow">
    {/* Contenu statique : blocs workflow */}
    <div className="relative flex h-full w-full flex-col justify-center gap-3 px-4">
      {/* Ligne 1 */}
      <div className="grid grid-cols-3 gap-3">
        <div className="rounded-lg bg-neutral-100 p-3 shadow-sm dark:bg-neutral-800" />
        <div className="rounded-lg bg-neutral-100 p-3 shadow-sm dark:bg-neutral-800" />
        <div className="rounded-lg bg-neutral-100 p-3 shadow-sm dark:bg-neutral-800" />
      </div>
      {/* Ligne 2 */}
      <div className="grid grid-cols-2 gap-3">
        <div className="rounded-lg bg-gradient-to-br from-sky-400/20 to-sky-600/20 p-3 shadow-md dark:from-sky-600/20 dark:to-sky-400/10" />
        <div className="rounded-lg bg-neutral-100 p-3 shadow-sm dark:bg-neutral-800" />
      </div>
    </div>

    {/* Badge d’état (statique, premium) */}
    <div className="absolute right-4 top-4 rounded-full border px-2.5 py-1 text-[10px] font-semibold text-sky-700 border-sky-200/70 bg-white/70 shadow-sm dark:border-sky-800/40 dark:bg-neutral-900/60 dark:text-sky-300">
      Workflow
    </div>

    {/* Equalizer en pied */}
    <Equalizer bars={24} delayStep={0.04} />
  </BrowserFrame>
);

const AppsMock = () => (
  <BrowserFrame label="Apps · Preview">
    <div className="absolute inset-0 flex items-center justify-center gap-6">
      {/* Carte style iPhone */}
      <motion.div
        className="relative h-32 w-20 rounded-xl border border-black/10 bg-white shadow-[0_8px_24px_-6px_rgba(0,0,0,0.25)] dark:border-white/10 dark:bg-neutral-900"
        initial={{ y: 20, opacity: 0, rotate: -4 }}
        animate={{ y: 0, opacity: 1, rotate: -4 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <div className="mx-auto mt-1.5 h-1 w-6 rounded bg-neutral-300/70 dark:bg-neutral-600" />
        <div className="m-3 space-y-2">
          <div className="h-3 rounded bg-neutral-200/80 dark:bg-neutral-700" />
          <div className="h-3 w-2/3 rounded bg-neutral-200/80 dark:bg-neutral-700" />
          <div className="h-12 rounded-xl bg-gradient-to-br from-sky-400/20 to-sky-600/20 dark:from-sky-600/20 dark:to-sky-400/10" />
        </div>
      </motion.div>

      {/* Carte style Web dashboard */}
      <motion.div
        className="relative h-36 w-48 rounded-xl border border-black/10 bg-white shadow-[0_10px_28px_-8px_rgba(0,0,0,0.25)] dark:border-white/10 dark:bg-neutral-900"
        initial={{ y: 30, opacity: 0, rotate: 6 }}
        animate={{ y: 0, opacity: 1, rotate: 6 }}
        transition={{ duration: 0.6, ease: 'easeOut', delay: 0.1 }}
      >
        {/* Barre top */}
        <div className="flex items-center gap-1.5 px-2 pt-1">
          <span className="h-2 w-2 rounded-full bg-red-300" />
          <span className="h-2 w-2 rounded-full bg-yellow-300" />
          <span className="h-2 w-2 rounded-full bg-green-300" />
          <div className="ml-2 h-2 w-20 rounded bg-neutral-200/80 dark:bg-neutral-700" />
        </div>

        {/* Contenu dashboard */}
        <div className="p-3 space-y-3">
          <div className="h-4 w-1/2 rounded bg-neutral-200/80 dark:bg-neutral-700" />
          <div className="grid grid-cols-2 gap-2">
            <div className="h-16 rounded-lg bg-gradient-to-tr from-sky-500/20 to-sky-700/10 dark:from-sky-600/20 dark:to-sky-400/10" />
            <div className="h-16 rounded-lg bg-neutral-100 dark:bg-neutral-800" />
          </div>
        </div>
      </motion.div>
    </div>
  </BrowserFrame>
);

/* ------------------------------- COMPONENT ------------------------------- */

export default function ServicesHero() {
  return (
    <section className="relative overflow-hidden flex flex-col items-center text-center pt-24 md:pt-28 pb-20 md:pb-28 px-6">
      {/* halos background */}
      <div aria-hidden className="absolute inset-0 -z-10">
        <span className="absolute -top-40 left-1/2 h-[40rem] w-[40rem] -translate-x-1/2 rounded-full blur-[200px] bg-[radial-gradient(closest-side,#00A8E8,transparent_70%)] opacity-30 dark:opacity-40" />
        <span className="absolute bottom-0 right-1/2 h-[32rem] w-[32rem] translate-x-1/2 rounded-full blur-[160px] bg-[radial-gradient(closest-side,#2563EB,transparent_70%)] opacity-25 dark:opacity-35" />
      </div>

      {/* Avis Google */}
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
        <Link
          href="/contact"
          className="inline-flex items-center justify-center rounded-xl px-5 py-3 text-[15px] font-semibold
                     bg-sky-500 text-white shadow-[0_12px_30px_-10px_rgba(2,132,199,.65)]
                     hover:bg-sky-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400/70"
        >
          Nous contacter
        </Link>
      </div>

      {/* Cartes piliers */}
      <div className="mt-16 grid w-full max-w-7xl grid-cols-1 gap-6 sm:grid-cols-2 lgxl:grid-cols-3">
        {PILLARS.map((pillar, i) => (
          <Card key={pillar.id} delay={i * 0.1}>
            <div className="flex justify-between items-center">
              <Chip icon={pillar.icon} label={pillar.chip} />

              <LearnMore href={pillar.href} />
            </div>
            <h3 className="mt-4 text-xl font-bold text-neutral-900 dark:text-white">
              {pillar.title}
            </h3>
            <p className="mt-2 text-[15px] leading-7 text-neutral-700 dark:text-neutral-300">
              {pillar.desc}
            </p>

            <div className="mt-5">
              {pillar.id === 'saas-apps' && <SaaSMock />}
              {pillar.id === 'automatisation-ia' && <AutomationMock />}
              {pillar.id === 'scaling' && <AppsMock />}
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
}
