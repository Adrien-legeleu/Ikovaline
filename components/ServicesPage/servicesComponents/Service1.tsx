'use client';

import * as React from 'react';
import Link from 'next/link';
import { IconArrowRight } from '@tabler/icons-react';

type Feature = {
  title: string;
  slug: string; // lien à garder
  description: React.ReactNode; // texte à garder
};

const GRID: Feature[] = [
  {
    title: 'Création SaaS sur mesure',
    slug: 'creation-saas-sur-mesure',
    description: (
      <ul className="list-disc pl-4 space-y-2">
        <li>Abonnements, paiements, comptes, analytics — prêt à scaler.</li>
      </ul>
    ),
  },
  {
    title: 'Web Apps & Mobiles',
    slug: 'web-apps-applications-mobiles',
    description: (
      <ul className="list-disc pl-4 space-y-2">
        <li>Apps rapides et fiables (Web · iOS · Android), offline & push.</li>
      </ul>
    ),
  },
  {
    title: 'Sites Vitrine & E-commerce',
    slug: 'creation-sites-web-vitrine-e-commerce',
    description: (
      <ul className="list-disc pl-4 space-y-2">
        <li>SEO + vitesse, pages produits & checkout qui convertissent.</li>
      </ul>
    ),
  },
  {
    title: 'Site Sur-mesure',
    slug: 'creation-site-web-sur-mesure',
    description: (
      <ul className="list-disc pl-4 space-y-2">
        <li>CMS, rôles, workflows et intégrations métier sur mesure.</li>
      </ul>
    ),
  },
];

/* ----------------------------- Mini Mockups ----------------------------- */
function MockSaaS() {
  return (
    <div className="relative h-20 w-full rounded-3xl border border-white/10 dark:border-white/10 bg-white/65 dark:bg-black shadow-2xl shadow-black/[0.05] px-3 py-2">
      <div className="flex items-center gap-1" aria-hidden>
        <span className="h-1.5 w-1.5 rounded-full bg-neutral-300/80 dark:bg-neutral-600" />
        <span className="h-1.5 w-1.5 rounded-full bg-neutral-300/80 dark:bg-neutral-600" />
        <span className="h-1.5 w-1.5 rounded-full bg-neutral-300/80 dark:bg-neutral-600" />
        <div className="ml-2 h-2 flex-1 rounded bg-neutral-100/90 dark:bg-neutral-800/80" />
      </div>
      <div className="mt-1 grid grid-cols-3 gap-2" aria-hidden>
        <div className="space-y-1">
          <div className="h-2 w-14 rounded bg-neutral-200 dark:bg-neutral-700" />
          <div className="h-3 rounded bg-neutral-100 dark:bg-neutral-800" />
        </div>
        <div className="space-y-1">
          <div className="h-2 w-12 rounded bg-neutral-200 dark:bg-neutral-700" />
          <div className="h-3 rounded bg-neutral-100 dark:bg-neutral-800" />
        </div>
        <div className="flex items-end">
          <svg
            viewBox="0 0 70 24"
            className="h-10 w-full text-neutral-400 dark:text-neutral-500"
          >
            <polyline
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              points="2,20 8,17 16,18 26,14 36,12 48,9 60,10 68,7"
            />
          </svg>
        </div>
      </div>
      <div className="absolute right-2 bottom-2 text-[10px] text-neutral-500 dark:text-neutral-400 px-1.5 py-[2px] rounded-full border border-black/[0.04] dark:border-white/[0.04]">
        Plans · Users · MRR
      </div>
    </div>
  );
}

function MockWebApp() {
  return (
    <div className="relative h-20 w-full rounded-3xl border border-white/10 dark:border-white/10 bg-white/65 dark:bg-black shadow-2xl shadow-black/[0.05] px-3 py-2">
      <div className="flex items-center gap-2" aria-hidden>
        <div className="h-10 w-10 rounded-lg bg-neutral-100 dark:bg-neutral-800" />
        <div className="flex-1">
          <div className="h-2 w-24 rounded bg-neutral-200 dark:bg-neutral-700" />
          <div className="mt-1 flex items-center gap-1.5">
            {['Web', 'iOS', 'Android'].map((t) => (
              <span
                key={t}
                className="text-[10px] px-1.5 py-[2px] rounded-full border border-black/[0.04] dark:border-white/[0.04] text-neutral-600 dark:text-neutral-400 bg-white/70 dark:bg-neutral-900/70"
              >
                {t}
              </span>
            ))}
          </div>
        </div>
        <div className="flex flex-col items-center gap-1" aria-hidden>
          <span
            className="h-2.5 w-2.5 rounded-full bg-neutral-300 dark:bg-neutral-600"
            title="Offline"
          />
          <span
            className="h-3 w-3 rounded-full bg-neutral-200 dark:bg-neutral-700 ring-1 ring-black/10 dark:ring-white/10"
            title="Push"
          />
        </div>
      </div>
    </div>
  );
}

function MockSite() {
  return (
    <div className="relative h-20 w-full rounded-3xl border border-white/10 dark:border-white/10 bg-white/65 dark:bg-black shadow-2xl shadow-black/[0.05] px-3 py-2">
      <div
        className="h-3 rounded bg-neutral-100 dark:bg-neutral-800"
        aria-hidden
      />
      <div className="mt-2 grid grid-cols-3 gap-2" aria-hidden>
        <div className="col-span-2 flex items-center gap-2">
          <div className="h-9 flex-1 rounded-md bg-neutral-100 dark:bg-neutral-800" />
          <div className="h-9 flex-1 rounded-md bg-neutral-100 dark:bg-neutral-800" />
        </div>
        <div>
          <div className="h-3 rounded bg-neutral-200 dark:bg-neutral-700" />
          <div className="mt-1 h-5 rounded bg-neutral-100 dark:bg-neutral-800" />
        </div>
      </div>
      <div className="absolute right-2 bottom-2 text-[10px] text-neutral-500 dark:text-neutral-400">
        Cart → Pay
      </div>
    </div>
  );
}

function MockCustom() {
  return (
    <div className="relative h-20 w-full rounded-3xl border border-white/10 dark:border-white/10 bg-white/65 dark:bg-black backdrop-blur-md shadow-2xl shadow-black/[0.05] px-3 py-2">
      <svg
        viewBox="0 0 200 60"
        className="absolute inset-0 text-neutral-300 dark:text-neutral-600"
        aria-hidden
      >
        <path
          d="M12,44 C60,16 140,16 188,44"
          stroke="currentColor"
          strokeWidth="2"
          fill="none"
        />
      </svg>
      {[22, 78, 134, 180].map((x, i) => (
        <div
          key={i}
          className="absolute bottom-[18px] -translate-x-1/2 h-3 w-3 rounded-full bg-neutral-400"
          style={{ left: x }}
        />
      ))}
      <div
        className="absolute right-2 top-2 flex items-center gap-1"
        aria-hidden
      >
        {['CMS', 'Roles', 'Workflow'].map((t) => (
          <span
            key={t}
            className="text-[10px] px-1.5 py-[2px] rounded-full border border-black/[0.04] dark:border-white/[0.04] text-neutral-600 dark:text-neutral-400 bg-white/70 dark:bg-neutral-900/70"
          >
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}

const MOCKMAP: Record<number, React.ReactNode> = {
  0: <MockSaaS />,
  1: <MockWebApp />,
  2: <MockSite />,
  3: <MockCustom />,
};

/* ------------------------------- COMPONENT ------------------------------- */

export function Service1() {
  return (
    <section className="relative pb-20 pt-14 md:pt-20">
      <div className="relative mx-auto max-w-6xl px-6" id="saas-apps">
        <h2 className="text-center text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight bg-gradient-to-t from-neutral-900 via-neutral-700 to-neutral-500 dark:from-neutral-100 dark:via-neutral-300 dark:to-neutral-400 bg-clip-text text-transparent">
          Applications Web, Mobiles &{' '}
          <span className="text-sky-500 dark:text-sky-400">SaaS</span>{' '}
          sur-mesure
        </h2>

        <p className="mx-auto mt-4 max-w-3xl text-center text-neutral-700 dark:text-neutral-300 text-base md:text-lg">
          Des produits <b>robustes</b>, <b>scalables</b> et orientés{' '}
          <b>conversion</b>, avec un soin particulier pour l’UX, la performance
          et la maintenabilité.
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
                backdrop-blur-sm                  bg-[linear-gradient(135deg,rgba(255,255,255,.96),rgba(239,244,252,.32))]
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
                  <div className="w-[72%] sm:w-[70%] md:w-[66%]">
                    {MOCKMAP[idx] ?? <MockCustom />}
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
            Discutons de votre projet
          </Link>
        </div>
      </div>
    </section>
  );
}
