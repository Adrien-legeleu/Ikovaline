// components/ServicesPage/servicesComponents/Service3.tsx
'use client';

import * as React from 'react';
import Link from 'next/link';
import { IconArrowRight } from '@tabler/icons-react';
import { motion } from 'framer-motion';

type Feature = {
  title: string;
  slug: string;
  description: React.ReactNode;
};

const GRID: Feature[] = [
  {
    title: 'Études de Marché',
    slug: 'etudes-marche-sur-mesure',
    description: (
      <ul className="list-disc pl-4 space-y-2">
        <li>
          Analyse du marché, identification des cibles et tendances pour
          orienter vos <b>stratégies</b>.
        </li>
      </ul>
    ),
  },
  {
    title: 'Sondages & Enquêtes',
    slug: 'sondages-marche-enquetes-terrain',
    description: (
      <ul className="list-disc pl-4 space-y-2">
        <li>
          Collecte et analyse de données fiables pour des{' '}
          <b>décisions éclairées</b>.
        </li>
      </ul>
    ),
  },
  {
    title: 'Stratégie Commerciale',
    slug: 'strategie-commerciale-developpement-business',
    description: (
      <ul className="list-disc pl-4 space-y-2">
        <li>
          Mise en place de plans performants pour <b>augmenter vos ventes</b>.
        </li>
      </ul>
    ),
  },
  {
    title: 'SEO & Référencement',
    slug: 'seo-referencement-naturel',
    description: (
      <ul className="list-disc pl-4 space-y-2">
        <li>
          Boostez votre visibilité organique avec un <b>SEO optimisé</b>.
        </li>
      </ul>
    ),
  },
  {
    title: 'Campagnes SEA',
    slug: 'gestion-campagnes-sea',
    description: (
      <ul className="list-disc pl-4 space-y-2">
        <li>
          Publicités ciblées et pilotage axé <b>ROI</b>.
        </li>
      </ul>
    ),
  },
  {
    title: 'Développement International',
    slug: 'developpement-international',
    description: (
      <ul className="list-disc pl-4 space-y-2">
        <li>
          Accompagnement pour <b>conquérir de nouveaux marchés</b>.
        </li>
      </ul>
    ),
  },
];

/* --------------------------------- Mini Mockups --------------------------------- */
/* Compactes, “glass”, monochromes, wrap contrôlé, aucune fuite visuelle. */

const Chip = ({ label }: { label: string }) => (
  <span className="inline-flex items-center rounded-full border border-black/10 dark:border-white/10 px-1.5 py-[2px] text-[8px] leading-none text-neutral-600 dark:text-neutral-400 bg-white/70 dark:bg-neutral-900/70 whitespace-nowrap">
    {label}
  </span>
);

function CardShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative min-h-[56px] max-h-[72px] w-full rounded-xl border border-white/60 dark:border-white/15 bg-white/65 dark:bg-black backdrop-blur-md shadow-sm px-2.5 py-2 overflow-hidden">
      {children}
    </div>
  );
}

/** 1) Études de Marché : segments + mini courbe de tendance + tag “Insight” */
function MockEtudes() {
  return (
    <CardShell>
      <div className="flex flex-wrap items-center gap-1.5">
        {['Segment A', 'Segment B', 'TAM/SAM'].map((t) => (
          <Chip key={t} label={t} />
        ))}
      </div>
      <svg
        viewBox="0 0 160 28"
        className="mt-1.5 h-5 w-full text-neutral-400 dark:text-neutral-500"
      >
        <polyline
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
          points="2,22 16,18 30,19 46,14 64,12 86,10 108,12 132,9 156,7"
        />
        <line
          x1="0"
          y1="22"
          x2="160"
          y2="22"
          stroke="currentColor"
          strokeOpacity="0.2"
        />
      </svg>
      <div className="absolute right-2 bottom-2"></div>
    </CardShell>
  );
}

/** 2) Sondages & Enquêtes : barres de réponses + taux de réponse + n */
function MockSondages() {
  return (
    <CardShell>
      <div className="flex items-center gap-1.5">
        <div className="h-3 w-20 rounded bg-neutral-100 dark:bg-neutral-800" />
        <div className="h-3 w-12 rounded bg-neutral-100 dark:bg-neutral-800" />
        <Chip label="n=1 000" />
      </div>
      <div className="mt-1.5 space-y-1">
        <div className="h-2 w-[88%] rounded bg-neutral-200 dark:bg-neutral-700" />
        <div className="h-2 w-[64%] rounded bg-neutral-100 dark:bg-neutral-800" />
        <div className="h-2 w-[40%] rounded bg-neutral-100 dark:bg-neutral-800" />
      </div>
      <div className="absolute right-2 bottom-2">
        <Chip label="Resp. 38%" />
      </div>
    </CardShell>
  );
}

/** 3) Stratégie Commerciale : pipeline Lead→Deal + progression */
function MockStrategie() {
  return (
    <CardShell>
      <div className="flex items-center gap-1.5 text-[10px] text-neutral-500 dark:text-neutral-400">
        Lead
        <span className="h-[1px] w-5 bg-neutral-300 dark:bg-neutral-700" />
        Qualif
        <span className="h-[1px] w-5 bg-neutral-300 dark:bg-neutral-700" />
        Propal
        <span className="h-[1px] w-5 bg-neutral-300 dark:bg-neutral-700" />
        Deal
      </div>
      <div className="mt-2 h-2 w-full rounded bg-neutral-100 dark:bg-neutral-800 overflow-hidden">
        <div className="h-full w-2/3 bg-neutral-300/80 dark:bg-neutral-600/80" />
      </div>
      <div className="absolute right-2 bottom-2"></div>
    </CardShell>
  );
}

/** 4) SEO : snippet SERP (title/url) + positions + tag “Rank↑” */
function MockSEO() {
  return (
    <CardShell>
      <div className="h-3 w-28 rounded bg-neutral-200 dark:bg-neutral-700" />
      <div className="mt-1 h-2 w-20 rounded bg-neutral-100 dark:bg-neutral-800" />
      <div className="mt-1.5 flex items-center gap-1.5 text-[10px] text-neutral-500 dark:text-neutral-400">
        #12 →{' '}
        <span className="font-semibold text-neutral-700 dark:text-neutral-200">
          #5
        </span>
        <span className="h-[1px] w-6 bg-neutral-300 dark:bg-neutral-700" />
        <Chip label="Rank ↑" />
      </div>
    </CardShell>
  );
}

/** 5) SEA : carte “Ad” + CPC/ROAS */
function MockSEA() {
  return (
    <CardShell>
      <div className="flex items-center gap-2">
        <span className="px-1.5 py-[2px] text-[10px] rounded-full border border-black/10 dark:border-white/10 bg-white/70 dark:bg-neutral-900/70 text-neutral-600 dark:text-neutral-400">
          Ad
        </span>
        <div className="h-3 flex-1 rounded bg-neutral-100 dark:bg-neutral-800" />
      </div>
      <div className="mt-1.5 flex items-center gap-2">
        <div className="h-3 w-24 rounded bg-neutral-100 dark:bg-neutral-800" />
        <Chip label="CPC ↓" />
        <Chip label="ROAS ↑" />
      </div>
    </CardShell>
  );
}

/** 6) Développement International : locales + timeline shipping */
function MockIntl() {
  return (
    <CardShell>
      <div className="flex flex-wrap items-center gap-1.5">
        {['FR', 'EU', 'US'].map((t) => (
          <Chip key={t} label={t} />
        ))}
      </div>
      <div className="mt-1.5 flex items-center gap-1.5 text-[10px] text-neutral-500 dark:text-neutral-400">
        <span className="h-[1px] w-8 bg-neutral-300 dark:bg-neutral-700" />
        Localize
        <span className="h-[1px] w-8 bg-neutral-300 dark:bg-neutral-700" />
        Launch
        <span className="h-[1px] w-8 bg-neutral-300 dark:bg-neutral-700" />
        Scale
      </div>
    </CardShell>
  );
}

const MOCKMAP: Record<number, React.ReactNode> = {
  0: <MockEtudes />,
  1: <MockSondages />,
  2: <MockStrategie />,
  3: <MockSEO />,
  4: <MockSEA />,
  5: <MockIntl />,
};

/* --------------------------------- COMPONENT --------------------------------- */

export function Service3() {
  return (
    <section className="relative pb-20 pt-14 md:pt-20">
      <div className="relative mx-auto max-w-6xl px-6" id="scaling">
        <motion.h2
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.45 }}
          className="text-center text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight
                     bg-gradient-to-t from-neutral-900 via-neutral-700 to-neutral-500
                     dark:from-neutral-100 dark:via-neutral-300 dark:to-neutral-400 bg-clip-text text-transparent"
        >
          Stratégies Digitales &{' '}
          <span className="text-sky-500 dark:text-sky-400">Croissance</span>{' '}
          sur-mesure
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.45, delay: 0.05 }}
          className="mx-auto mt-4 max-w-3xl text-center text-neutral-700 dark:text-neutral-300 text-base md:text-lg"
        >
          Nous activons les bons <b>leviers</b> de marketing digital,
          prospection, SEO, campagnes, social pour{' '}
          <b>accélérer votre croissance</b>, générer des leads qualifiés et
          gagner de nouveaux marchés.
        </motion.p>

        {/* GRID — même pattern que S1/S2 (carrées, stables) */}
        <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {GRID.map((feature, idx) => (
            <Link
              href={`/nos-services/${feature.slug}`}
              key={feature.title}
              className="group"
            >
              <motion.article
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.45, delay: idx * 0.04 }}
                className="
                  relative h-full justify-between overflow-hidden
                  rounded-3xl border border-white/60 dark:border-[rgba(56,130,246,0.18)]
                  bg-[linear-gradient(135deg,rgba(255,255,255,.96),rgba(239,244,252,.92))]
                  dark:bg-[linear-gradient(135deg,rgba(12,16,24,.92),rgba(12,16,24,.86))]
                  shadow-[0_20px_60px_-24px_rgba(0,0,0,0.35),inset_0_1px_0_rgba(255,255,255,.55)]
                  dark:shadow-[0_18px_60px_-22px_rgba(0,0,0,.6),inset_0_1px_0_rgba(59,130,246,.12)]
                  p-6 md:p-7 lg:p-8 flex flex-col
                  transition-transform duration-300 will-change-transform
                  hover:-translate-y-0.5
                "
              >
                {/* halo subtil */}
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0 rounded-3xl
                  bg-[radial-gradient(120%_90%_at_20%_0%,rgba(2,132,199,.08),transparent_60%)]
                  dark:bg-[radial-gradient(120%_90%_at_20%_0%,rgba(59,130,246,.10),transparent_60%)]"
                />

                {/* Header */}
                <div className="relative z-10">
                  <h3 className="text-xl font-extrabold tracking-tight text-neutral-900 dark:text-white">
                    {feature.title}
                  </h3>
                  <div className="mt-4 text-neutral-700 dark:text-neutral-300 text-[15px] leading-relaxed">
                    {feature.description}
                  </div>
                </div>

                {/* Footer : mini-mockup (gauche) + CTA (droite) */}
                <div className="relative z-10 mt-5 flex items-end justify-between gap-4">
                  <div className="w-[68%] sm:w-[64%] md:w-[60%] max-w-[260px]">
                    {MOCKMAP[idx] ?? <MockEtudes />}
                  </div>

                  <span
                    className="inline-flex h-10 w-10 items-center justify-center rounded-2xl
                               bg-white/90 dark:bg-neutral-900/85 ring-1 ring-black/10 dark:ring-white/10
                               shadow-[0_10px_28px_-14px_rgba(0,0,0,0.35)]
                               group-hover:translate-x-0.5 transition-transform"
                    aria-hidden
                  >
                    <IconArrowRight className="h-5 w-5 text-sky-600 dark:text-sky-400" />
                  </span>
                </div>

                {/* nappe lumineuse pied */}
                <span
                  aria-hidden
                  className="pointer-events-none absolute -bottom-10 left-1/2 h-16 w-[80%] -translate-x-1/2 rounded-full blur-2xl
                  bg-[radial-gradient(ellipse_at_center,rgba(0,168,232,.30),rgba(37,99,235,.18),transparent_70%)]
                  dark:bg-[radial-gradient(ellipse_at_center,rgba(59,130,246,.20),rgba(37,99,235,.14),transparent_70%)]"
                />
              </motion.article>
            </Link>
          ))}
        </div>

        {/* CTA global */}
        <div className="mt-10 flex justify-center">
          <Link
            href="/contact"
            className="inline-flex items-center justify-center rounded-xl px-5 py-3 text-[15px] font-semibold
                       bg-sky-500 text-white shadow-[0_12px_30px_-10px_rgba(2,132,199,.65)]
                       hover:bg-sky-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400/70"
          >
            Booster ma croissance
          </Link>
        </div>
      </div>
    </section>
  );
}
