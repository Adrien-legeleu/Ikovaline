'use client';

import * as React from 'react';
import Link from 'next/link';
import { IconArrowRight } from '@tabler/icons-react';

type Feature = { title: string; slug: string; description: React.ReactNode };

const GRID: Feature[] = [
  {
    title: 'IA & Marketing',
    slug: 'automatisation-solutions-ia-marketing',
    description: (
      <ul className="list-disc pl-4 space-y-2">
        <li>
          CRM intelligent, segmentation automatisée et{' '}
          <b>scénarios de conversion</b>.
        </li>
      </ul>
    ),
  },
  {
    title: 'Prospection Téléphonique',
    slug: 'prospection-telephone-ia',
    description: (
      <ul className="list-disc pl-4 space-y-2">
        <li>
          Assistant vocal : <b>appels automatisés</b>, suivi et relances
          optimisées.
        </li>
      </ul>
    ),
  },
  {
    title: 'Emailing Automatisé',
    slug: 'automatisation-ia-emailing',
    description: (
      <ul className="list-disc pl-4 space-y-2">
        <li>
          Augmentez vos conversions grâce à l’<b>emailing piloté par IA</b>.
        </li>
      </ul>
    ),
  },
];

/* Mini mockups */
const Chip = ({ label }: { label: string }) => (
  <span className="inline-flex items-center rounded-full border border-black/[0.04] dark:border-white/[0.04] px-1.5 py-[2px] text-[8px] leading-none text-neutral-600 dark:text-neutral-400 bg-white/70 dark:bg-neutral-900/70 whitespace-nowrap">
    {label}
  </span>
);

function CardShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative min-h-[56px]  w-full rounded-3xl h-20 bg-white/65 dark:bg-black shadow-2xl shadow-black/[0.05] px-2 py-2 overflow-hidden">
      {children}
    </div>
  );
}

function MockIAMarketing() {
  return (
    <CardShell>
      <div className="flex flex-wrap items-center gap-1.5" aria-hidden>
        {['Segment A', 'Segment B'].map((t) => (
          <Chip key={t} label={t} />
        ))}
      </div>
      <div
        className="mt-1.5 flex items-center gap-1.5 text-[10px] leading-none text-neutral-500 dark:text-neutral-400"
        aria-hidden
      >
        <span className="h-[1px] w-5 bg-neutral-300 dark:bg-neutral-700" />
        Lead
        <span className="h-[1px] w-5 bg-neutral-300 dark:bg-neutral-700" />
        MQL
        <span className="h-[1px] w-5 bg-neutral-300 dark:bg-neutral-700" />
        SQL
        <span className="h-[1px] w-5 bg-neutral-300 dark:bg-neutral-700" />
        Client
      </div>
    </CardShell>
  );
}

function MockProspection() {
  return (
    <CardShell>
      <div className="flex items-center gap-2" aria-hidden>
        <div className="h-7 w-7 rounded-full bg-neutral-100 dark:bg-neutral-800" />
        <div className="flex-1">
          <div className="h-2 w-24 rounded bg-neutral-200 dark:bg-neutral-700" />
          <div className="mt-1 h-2 w-16 rounded bg-neutral-100 dark:bg-neutral-800" />
        </div>
      </div>
      <svg
        viewBox="0 0 160 28"
        className="mt-1.5 h-5 w-full text-neutral-400 dark:text-neutral-500"
        aria-hidden
      >
        {Array.from({ length: 20 }).map((_, i) => {
          const x = i * 8 + 2;
          const h = i % 4 === 0 ? 14 : i % 3 === 0 ? 10 : 6;
          return (
            <rect
              key={i}
              x={x}
              y={14 - h / 2}
              width="3"
              height={h}
              rx="1"
              fill="currentColor"
            />
          );
        })}
      </svg>
    </CardShell>
  );
}

function MockEmailing() {
  return (
    <CardShell>
      <div className="flex items-center gap-1.5" aria-hidden>
        <div className="h-3 w-20 rounded bg-neutral-100 dark:bg-neutral-800" />
        <div className="h-3 w-12 rounded bg-neutral-100 dark:bg-neutral-800" />
        <Chip label="A/B" />
      </div>
      <div className="mt-1.5 grid grid-cols-3 gap-1.5" aria-hidden>
        <div className="col-span-2 space-y-1">
          <div className="h-3 rounded bg-neutral-100 dark:bg-neutral-800" />
          <div className="h-3 rounded bg-neutral-100 dark:bg-neutral-800" />
        </div>
        <div className="flex flex-wrap items-center gap-1.5">
          <Chip label="Open" />
          <Chip label="Click" />
        </div>
      </div>
    </CardShell>
  );
}

const MOCKMAP: Record<number, React.ReactNode> = {
  0: <MockIAMarketing />,
  1: <MockProspection />,
  2: <MockEmailing />,
};

export function Service2() {
  return (
    <section className="relative pb-20 pt-14 md:pt-20">
      <div className="relative mx-auto max-w-6xl px-6" id="automatisation-ia">
        <h2 className="text-center text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight bg-gradient-to-t from-neutral-900 via-neutral-700 to-neutral-500 dark:from-neutral-100 dark:via-neutral-300 dark:to-neutral-400 bg-clip-text text-transparent">
          Automatisation &{' '}
          <span className="text-sky-500 dark:text-sky-400">IA</span> au service
          de votre efficacité
        </h2>

        <p className="mx-auto mt-4 max-w-3xl text-center text-neutral-700 dark:text-neutral-300 text-base md:text-lg">
          Libérez du temps et <b>optimisez vos conversions</b> grâce à nos{' '}
          <b>solutions d’automatisation</b> et d’
          <b>intelligence artificielle</b>. Du CRM intelligent aux assistants
          vocaux, nous intégrons des outils qui travaillent pour vous.
        </p>

        <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {GRID.map((feature, idx) => (
            <Link
              key={feature.title}
              href={`/nos-services/${feature.slug}`}
              prefetch={false}
              className="group"
            >
              <article
                className="relative justify-between h-full overflow-hidden rounded-[3rem] 
                backdrop-blur-sm
                  bg-[linear-gradient(135deg,rgba(255,255,255,.96),rgba(239,244,252,.32))]
                  dark:bg-[linear-gradient(135deg,rgba(12,16,24,.92),rgba(12,16,24,.86))]
                  shadow-[0_20px_60px_-24px_rgba(0,0,0,0.25),inset_0_1px_0_rgba(255,255,255,.35)]
                  dark:shadow-[0_18px_60px_-22px_rgba(0,0,0,.6),inset_0_1px_0_rgba(59,130,246,.12)]
                  p-6 md:p-7 lg:p-8 flex flex-col transition-transform duration-300 will-change-transform hover:-translate-y-0.5"
              >
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0 rounded-xl bg-[radial-gradient(120%_90%_at_20%_0%,rgba(2,132,199,.06),transparent_60%)] dark:bg-[radial-gradient(120%_90%_at_20%_0%,rgba(59,130,246,.10),transparent_60%)]"
                />

                <div className="relative z-10">
                  <h3 className="text-xl font-extrabold tracking-tight text-neutral-900 dark:text-white">
                    {feature.title}
                  </h3>
                  <div className="mt-4 text-neutral-700 dark:text-neutral-300 text-[15px] leading-relaxed">
                    {feature.description}
                  </div>
                </div>

                <div className="relative z-10 mt-5 flex items-end justify-between gap-4">
                  <div className="w-[68%] sm:w-[64%] md:w-[60%] max-w-[260px]">
                    {MOCKMAP[idx] ?? <MockIAMarketing />}
                  </div>

                  <span
                    className="inline-flex h-11 w-11 items-center justify-center rounded-[1.2rem] bg-white/90 dark:bg-neutral-900/85 ring-1 ring-black/[0.02] dark:ring-white/[0.02] shadow-[0_10px_28px_-14px_rgba(0,0,0,0.25)] group-hover:translate-x-0.5 transition-transform"
                    aria-hidden
                  >
                    <IconArrowRight className="h-5 w-5 text-primary dark:text-primary" />
                  </span>
                </div>

                <span
                  aria-hidden
                  className="pointer-events-none absolute -bottom-10 left-1/2 h-16 w-[80%] -translate-x-1/2 rounded-full blur-2xl bg-[radial-gradient(ellipse_at_center,rgba(0,168,232,.30),rgba(37,99,235,.18),transparent_70%)] dark:bg-[radial-gradient(ellipse_at_center,rgba(59,130,246,.20),rgba(37,99,235,.14),transparent_70%)]"
                />
              </article>
            </Link>
          ))}
        </div>

        <div className="mt-10 flex justify-center">
          <Link
            href="/contact"
            prefetch={false}
            className="inline-flex items-center justify-center rounded-3xl px-5 py-3 text-[15px] font-semibold bg-sky-500 text-white shadow-[0_12px_30px_-10px_rgba(2,132,199,.65)] hover:bg-sky-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400/70"
          >
            Demander une démo
          </Link>
        </div>
      </div>
    </section>
  );
}
