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
    icon: <IconCpu className="h-4.5 w-4.5 text-sky-500 dark:text-sky-400" />,
    title: 'SaaS sur-mesure',
    desc: 'On crée ton logiciel en ligne de A à Z : connexion des utilisateurs, abonnements, paiements, tout est prêt et simple à utiliser.',
    href: '/nos-services/#saas-apps',
    chip: 'SaaS',
  },
  {
    id: 'automatisation-ia',
    icon: <IconRobot className="h-4.5 w-4.5 text-sky-500 dark:text-sky-400" />,
    title: 'Automatisation & IA',
    desc: 'On installe des robots et de l’IA pour faire les tâches chiantes à ta place, gagner du temps et être plus efficace.',
    href: '/nos-services/#automatisation-ia',
    chip: 'IA & Automation',
  },
  {
    id: 'scaling',
    icon: (
      <IconTrendingUp className="h-4.5 w-4.5 text-sky-500 dark:text-sky-400" />
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
    className="group block h-full rounded-[28px] border border-white/45
               bg-[linear-gradient(135deg,rgba(255,255,255,.92),rgba(240,245,252,.65))]
               p-7 text-left shadow-[0_18px_60px_rgba(6,24,44,.12),inset_0_1px_0_rgba(255,255,255,.5)]
               transition-all hover:-translate-y-1.5 hover:shadow-[0_30px_90px_rgba(37,99,235,.22)]
               dark:border-[rgba(56,130,246,0.22)]
               dark:bg-[linear-gradient(135deg,rgba(10,14,20,.92),rgba(10,14,20,.65))]
               dark:shadow-[0_18px_60px_rgba(2,6,12,.65),inset_0_1px_0_rgba(59,130,246,.15)]"
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

/* ------------------------------ MOCKUPS UI -------------------------------- */

/** Fenêtre “browser” douce utilisée par les 3 mockups */
const BrowserFrame: React.FC<{ label: string; children: React.ReactNode }> = ({
  label,
  children,
}) => (
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
    {children}
  </div>
);

/* --- SaaS Dashboard (courbe + KPIs animés) --- */
const SaaSMock = () => (
  <BrowserFrame label="SaaS · Dashboard">
    <div className="grid grid-cols-2 gap-4">
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
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{
              duration: 1.1,
              ease: 'easeOut',
              delay: 0.2 + i * 0.1,
            }}
            className="mt-2 h-1.5 origin-left rounded bg-neutral-300/70 dark:bg-neutral-600/80"
          />
        </div>
      ))}
    </div>

    <div className="mt-4 rounded-2xl border border-black/10 p-3 dark:border-white/10">
      <div className="relative h-28 w-full">
        <svg
          viewBox="0 0 300 100"
          className="absolute inset-0 h-full w-full text-sky-400/70"
        >
          <motion.path
            d="M0,70 C40,40 80,50 120,35 C160,20 200,55 240,45 C270,38 290,30 300,35"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.6, ease: 'easeInOut', delay: 0.2 }}
          />
        </svg>
        <motion.div
          className="absolute -top-1 h-3 w-3 rounded-full bg-sky-500/80 shadow"
          initial={{ left: 0 }}
          animate={{ left: ['0%', '30%', '55%', '80%', '100%'] }}
          transition={{
            duration: 2.6,
            ease: 'easeInOut',
            repeat: Infinity,
            repeatDelay: 1,
          }}
          style={{ top: '56%' }}
        />
      </div>
    </div>
  </BrowserFrame>
);

/* --- Apps Preview (cartes inclinées + waveform notifications) --- */
const AppsMock = () => (
  <BrowserFrame label="Apps · Preview">
    <div className="relative h-40">
      {/* Carte 1 */}
      <motion.div
        className="absolute left-6 top-5 h-24 w-40 rounded-3xl bg-neutral-100 shadow-inner dark:bg-neutral-800"
        initial={{ rotate: -6, y: 10, opacity: 0 }}
        animate={{ rotate: -6, y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <div className="m-3 space-y-2">
          <div className="h-3 rounded bg-white/70 dark:bg-neutral-700" />
          <div className="h-3 w-2/3 rounded bg-white/70 dark:bg-neutral-700" />
          <div className="h-14 rounded-xl bg-white/70 dark:bg-neutral-700" />
        </div>
      </motion.div>

      {/* Carte 2 */}
      <motion.div
        className="absolute left-28 top-8 h-28 w-44 rounded-3xl bg-neutral-100 shadow-inner dark:bg-neutral-800"
        initial={{ rotate: 6, y: 14, opacity: 0 }}
        animate={{ rotate: 6, y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut', delay: 0.1 }}
      >
        <div className="m-3 space-y-2">
          <div className="h-3 rounded bg-white/70 dark:bg-neutral-700" />
          <div className="h-3 w-1/2 rounded bg-white/70 dark:bg-neutral-700" />
          <div className="h-16 rounded-xl bg-white/70 dark:bg-neutral-700" />
        </div>
      </motion.div>

      {/* Waveform “push” */}
      <svg
        viewBox="0 0 260 36"
        className="absolute bottom-0 left-0 right-0 mx-auto h-8 w-[85%] text-neutral-300 dark:text-neutral-600"
      >
        {Array.from({ length: 24 }).map((_, i) => {
          const x = i * 11;
          const base = i % 2 ? 4 : 8;
          return (
            <motion.rect
              key={i}
              x={x}
              y={18 - base / 2}
              width="4"
              height={base}
              rx="1.5"
              fill="currentColor"
              animate={{ height: [base, base + 6, base] }}
              transition={{
                duration: 1.2,
                repeat: Infinity,
                delay: i * 0.04,
                ease: 'easeInOut',
              }}
            />
          );
        })}
      </svg>
    </div>
  </BrowserFrame>
);

/* --- Automation Workflow (nœuds + liens animés) --- */
const AutomationMock = () => (
  <BrowserFrame label="Automation · Workflow">
    <div className="relative h-40">
      <svg
        viewBox="0 0 320 120"
        className="absolute inset-0 h-full w-full text-sky-400/70"
      >
        <motion.path
          d="M20,90 C80,30 240,30 300,90"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.2, ease: 'easeInOut' }}
        />
      </svg>
      {[40, 100, 160, 220, 280].map((x, i) => (
        <motion.div
          key={i}
          className="absolute h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-sky-500 shadow"
          style={{ left: x, top: 90 - (i === 2 ? 38 : i % 2 ? 24 : 0) }}
          animate={{ scale: [1, 1.12, 1] }}
          transition={{ duration: 1.4, repeat: Infinity, delay: i * 0.08 }}
        />
      ))}
      <motion.div
        className="absolute right-4 top-4 rounded-full border px-2.5 py-1 text-[10px] font-semibold text-sky-600 border-sky-200/70 bg-white/70 dark:bg-neutral-900/60 dark:text-sky-300 dark:border-sky-800/40"
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        Automation • Workflow
      </motion.div>
    </div>
  </BrowserFrame>
);

/* ------------------------------- COMPONENT ------------------------------- */

export default function ServicesHero() {
  return (
    <section className="relative overflow-hidden flex flex-col items-center text-center pt-24 md:pt-28 pb-20 md:pb-28 px-6">
      {/* halos d’arrière-plan */}
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
        <Link
          href="/contact"
          className="inline-flex items-center justify-center rounded-xl px-5 py-3 text-[15px] font-semibold
                     bg-sky-500 text-white shadow-[0_12px_30px_-10px_rgba(2,132,199,.65)]
                     hover:bg-sky-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400/70"
        >
          Nous contacter
        </Link>
      </div>

      {/* Cartes “piliers” avec vrais mockups animés */}
      <div className="mt-16 grid w-full max-w-6xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 text-left">
        {PILLARS.map((p, i) => (
          <Card key={p.id} delay={i * 0.08}>
            {/* Header de la carte : chip + learn more */}
            <div className="mb-4 flex items-center justify-between">
              <Chip icon={p.icon} label={p.chip} />
              <LearnMore href={p.href} />
            </div>

            <h3 className="text-[28px] md:text-[30px] font-extrabold leading-tight text-neutral-900 dark:text-white">
              {p.title}
            </h3>
            <p className="mt-3 text-[15px] leading-7 text-neutral-700 dark:text-neutral-300">
              {p.desc}
            </p>

            {/* Mockup selon le pilier */}
            {p.id === 'saas-apps' && <SaaSMock />}
            {p.id === 'scaling' && <AppsMock />}
            {p.id === 'automatisation-ia' && <AutomationMock />}
          </Card>
        ))}
      </div>
    </section>
  );
}
