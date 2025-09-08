'use client';

import { motion } from 'motion/react';
import { StickyItem, StickyScroll } from './StickyScroll';

/* ---------- MacWindow (inchangé visuellement, + dark mode) ---------- */

function MacWindow({
  children,
  title = 'ikovaline.app',
}: {
  children: React.ReactNode;
  title?: string;
}) {
  return (
    <div className="h-full w-full overflow-hidden rounded-2xl bg-white dark:bg-neutral-900">
      {/* topbar */}
      <div className="flex items-center gap-2 px-4 py-3">
        <span className="h-3 w-3 rounded-full bg-[#FF5F57]" />
        <span className="h-3 w-3 rounded-full bg-[#FEBB2E]" />
        <span className="h-3 w-3 rounded-full bg-[#28C840]" />
        <div className="mx-auto rounded-full bg-black/5 px-3 py-1 text-xs font-medium text-neutral-600 dark:bg-white/10 dark:text-neutral-300">
          {title}
        </div>
      </div>
      <div className="h-px w-full bg-gradient-to-r from-transparent via-black/10 to-transparent dark:via-white/10" />
      <div className="relative h-[calc(100%-44px)] p-5">{children}</div>
    </div>
  );
}

/* ---------- Mockups premium (dark-ready) ---------- */

function AnalyticsMock() {
  return (
    <MacWindow title="Analytics · Realtime">
      {/* halo header */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-[#2CB7FF1a] to-transparent" />

      {/* KPI cards */}
      <div className="grid grid-cols-3 gap-4">
        {['100', '2.4s', '0.9%'].map((v, i) => (
          <div
            key={i}
            className="rounded-xl bg-white p-4 ring-1 ring-black/5 shadow-[0_18px_40px_-24px_rgba(0,0,0,.25)] dark:bg-neutral-900/90 dark:ring-white/10"
          >
            <div className="text-[11px] uppercase tracking-wide text-neutral-500 dark:text-neutral-400">
              {['Score', 'LCP', 'INP'][i]}
            </div>
            <div className="mt-2 text-2xl font-extrabold text-neutral-900 dark:text-neutral-50">
              {v}
            </div>
            <div className="mt-1 text-xs text-green-600">+ mieux que P75</div>
          </div>
        ))}
      </div>

      {/* line chart */}
      <div className="mt-6 rounded-2xl bg-gradient-to-b from-white to-white/60 p-4 ring-1 ring-black/5 shadow-[0_28px_56px_-28px_rgba(0,0,0,.28)] dark:from-neutral-900 dark:to-neutral-900/60 dark:ring-white/10">
        <div
          className="
            h-40 w-full rounded-lg
            bg-[linear-gradient(to_right,rgba(0,0,0,.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,.06)_1px,transparent_1px)]
            bg-[size:28px_28px]
            dark:bg-[linear-gradient(to_right,rgba(255,255,255,.07)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,.07)_1px,transparent_1px)]
          "
        />
        {/* curve */}
        <motion.div
          initial={{ clipPath: 'inset(0 100% 0 0)' }}
          animate={{ clipPath: 'inset(0 0% 0 0)' }}
          transition={{ duration: 1.2, ease: 'easeInOut' }}
          className="pointer-events-none absolute left-0 right-0 mt-[160px] h-[2px] bg-gradient-to-r from-[#2CB7FF] to-[#00A8FF]"
        />
      </div>
    </MacWindow>
  );
}

function KanbanMock() {
  return (
    <MacWindow title="Plan d’acquisition">
      <div className="grid h-full grid-cols-3 gap-4 max-sm:hidden">
        {['SEO', 'Ads', 'Contenu'].map((col, i) => (
          <div
            key={col}
            className="flex flex-col rounded-xl bg-white/90 p-3 ring-1 ring-black/5 shadow-[0_18px_40px_-24px_rgba(0,0,0,.25)] dark:bg-neutral-900/80 dark:ring-white/10"
          >
            <div className="mb-2 flex items-center justify-between">
              <span className="text-xs font-semibold text-neutral-700 dark:text-neutral-300">
                {col}
              </span>
              <span className="rounded-full bg-[#2CB7FF1a] px-2 py-0.5 text-[10px] font-semibold text-[#2CB7FF]">
                {['To-do', 'Running', 'Review'][i]}
              </span>
            </div>
            <div className="space-y-2">
              {[1, 2, 3].map((k) => (
                <div
                  key={k}
                  className="rounded-lg bg-white p-3 text-xs ring-1 ring-black/5 shadow-[0_14px_28px_-18px_rgba(0,0,0,.3)] dark:bg-neutral-900 dark:ring-white/10"
                >
                  • Task #{k} — {col}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="grid h-full grid-cols-2 sm:hidden gap-4">
        {['SEO', 'Ads'].map((col, i) => (
          <div
            key={col}
            className="flex flex-col rounded-xl bg-white/90 p-3 ring-1 ring-black/5 shadow-[0_18px_40px_-24px_rgba(0,0,0,.25)] dark:bg-neutral-900/80 dark:ring-white/10"
          >
            <div className="mb-2 flex items-center justify-between">
              <span className="text-xs font-semibold text-neutral-700 dark:text-neutral-300">
                {col}
              </span>
              <span className="rounded-full bg-[#2CB7FF1a] px-2 py-0.5 text-[10px] font-semibold text-[#2CB7FF]">
                {['To-do', 'Running', 'Review'][i]}
              </span>
            </div>
            <div className="space-y-2">
              {[1, 2, 3].map((k) => (
                <div
                  key={k}
                  className="rounded-lg bg-white p-3 text-xs ring-1 ring-black/5 shadow-[0_14px_28px_-18px_rgba(0,0,0,.3)] dark:bg-neutral-900 dark:ring-white/10"
                >
                  • Task #{k} — {col}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </MacWindow>
  );
}

function CodeMock() {
  return (
    <MacWindow title="Next.js · components/Home.tsx">
      <div className="grid h-full grid-cols-[1.2fr_.9fr] gap-4">
        {/* Editor */}
        <div className="rounded-xl bg-[#0B1020] p-4 font-mono text-[12px] leading-6 text-slate-200 ring-1 ring-black/20 shadow-[0_24px_48px_-24px_rgba(0,0,0,.45)]">
          <div className="text-[11px] text-slate-400">/components/Hero.tsx</div>
          <div>
            <span className="text-[#60A5FA]">export</span>{' '}
            <span className="text-[#F472B6]">default</span>{' '}
            <span className="text-[#34D399]">function</span>{' '}
            <span className="text-white">Hero</span>() {'{'}
          </div>
          <div className="pl-4 text-slate-300">
            return (<span className="text-[#FDE047]">&lt;section&gt;</span>…
            <span className="text-[#FDE047]">&lt;/section&gt;</span>)
          </div>
          <div>{'}'}</div>
        </div>

        {/* Preview */}
        <div className="relative rounded-xl bg-white p-4 ring-1 ring-black/5 shadow-[0_28px_56px_-28px_rgba(0,0,0,.35)] dark:bg-neutral-950 dark:ring-white/10">
          <div className="h-full rounded-lg bg-gradient-to-br from-[#2CB7FF1a] to-transparent p-4">
            <div className="rounded-xl bg-white/90 p-4 shadow-[0_16px_34px_-20px_rgba(0,0,0,.3)] dark:bg-neutral-900/80">
              <div className="mb-2 h-6 w-40 rounded bg-neutral-200 dark:bg-neutral-800" />
              <div className="space-y-2">
                <div className="h-2 rounded bg-neutral-200 dark:bg-neutral-800" />
                <div className="h-2 w-3/4 rounded bg-neutral-200 dark:bg-neutral-800" />
              </div>
              <div className="mt-4 h-32 rounded-lg bg-neutral-200 dark:bg-neutral-800" />
            </div>
          </div>
        </div>
      </div>
    </MacWindow>
  );
}

function KPIMock() {
  return (
    <MacWindow title="Reporting · KPI hebdo">
      <div className="grid h-full grid-cols-2 gap-4">
        {[
          { label: 'Leads', val: '124', trend: '+18%' },
          { label: 'Taux conv.', val: '6.3%', trend: '+0.8pt' },
          { label: 'CPL', val: '14,20€', trend: '-12%' },
          { label: 'CA', val: '48,6k€', trend: '+22%' },
        ].map((k, i) => (
          <div
            key={i}
            className="rounded-xl bg-white p-4 ring-1 ring-black/5 shadow-[0_24px_48px_-24px_rgba(0,0,0,.28)] dark:bg-neutral-900 dark:ring-white/10"
          >
            <div className="text-[11px] uppercase tracking-wide text-neutral-500 dark:text-neutral-400">
              {k.label}
            </div>
            <div className="mt-2 text-2xl font-extrabold text-neutral-900 dark:text-neutral-50">
              {k.val}
            </div>
            <div
              className={
                k.trend.startsWith('+')
                  ? 'text-emerald-600 text-xs'
                  : 'text-red-600 text-xs'
              }
            >
              {k.trend}
            </div>
          </div>
        ))}
      </div>
    </MacWindow>
  );
}

/* ---------- Section qui utilise StickyScroll ---------- */

const content: StickyItem[] = [
  {
    title: 'Audit & Objectifs',
    description:
      'Audit complet de votre présence en ligne. Forces, freins, opportunités. On pose des objectifs clairs et mesurables.',
    content: <AnalyticsMock />,
  },
  {
    title: 'Stratégie Digitale Personnalisée',
    description:
      'Local SEO, contenu, Google Business Profile, Google Ads : un plan d’acquisition sur-mesure, orienté ROI.',
    content: <KanbanMock />,
  },
  {
    title: 'Conception & Optimisation',
    description:
      'Design system, Next.js, performance, SEO technique. Du pixel au code, tout est pensé conversion.',
    content: <CodeMock />,
  },
  {
    title: 'Suivi & Résultats',
    description:
      'Pilotage continu, reporting transparent, amélioration durable des indicateurs clés.',
    content: <KPIMock />,
  },
];

export default function MethodologieSticky() {
  return (
    <section className="relative mx-auto w-full max-w-7xl px-4 py-16 md:py-24">
      <header className="mx-auto max-w-3xl text-center">
        <span className="inline-flex items-center rounded-full border border-[#2CB7FF]/25 px-3 py-1 text-xs font-semibold text-[#2CB7FF]">
          Méthodologie Ikovaline
        </span>
        <h2 className="mt-4 text-4xl font-extrabold leading-tight tracking-tight text-neutral-900 dark:text-neutral-200 md:text-6xl">
          De l’idée à un <span className="text-[#2CB7FF]">projet réussi</span>.
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-[17px] leading-7 text-neutral-600 dark:text-neutral-300">
          Une progression claire, visuelle, et orientée résultats avec un aperçu
          concret de chaque étape.
        </p>
      </header>

      <div className="mt-10">
        <StickyScroll
          content={content}
          contentClassName="ring-1 ring-black/10 dark:ring-white/10"
          className="rounded-3xl"
        />
      </div>
    </section>
  );
}
