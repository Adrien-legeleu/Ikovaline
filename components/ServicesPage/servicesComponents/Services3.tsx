// components/ServicesPage/servicesComponents/Service3.tsx
'use client';

import * as React from 'react';
import Link from 'next/link';
import { motion } from 'motion/react';
import { IconArrowRight } from '@tabler/icons-react';

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
      <ul className="list-disc pl-4 space-y-3">
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
      <ul className="list-disc pl-4 space-y-3">
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
      <ul className="list-disc pl-4 space-y-3">
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
      <ul className="list-disc pl-4 space-y-3">
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
      <ul className="list-disc pl-4 space-y-3">
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
      <ul className="list-disc pl-4 space-y-3">
        <li>
          Accompagnement pour <b>conquérir de nouveaux marchés</b>.
        </li>
      </ul>
    ),
  },
];

export function Service3() {
  return (
    <section className="relative pb-20 pt-14 md:pt-20">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <span className="absolute -top-36 left-1/3 h-[34rem] w-[34rem] -translate-x-1/2 rounded-full blur-[200px] bg-[radial-gradient(closest-side,#00A8E8,transparent_70%)] opacity-25 dark:opacity-35" />
        <span className="absolute -bottom-28 right-1/4 h-[32rem] w-[32rem] translate-x-1/4 rounded-full blur-[180px] bg-[radial-gradient(closest-side,#2563EB,transparent_70%)] opacity-20 dark:opacity-30" />
      </div>

      <div className="relative mx-auto max-w-6xl px-6" id="scaling">
        <motion.h2
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="text-center text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight
                     bg-gradient-to-t from-neutral-900 via-neutral-700 to-neutral-500
                     dark:from-neutral-100 dark:via-neutral-300 dark:to-neutral-400 bg-clip-text text-transparent"
        >
          Stratégies Digitales &{' '}
          <span className="text-sky-500 dark:text-sky-400">Croissance</span>{' '}
          sur-mesure
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, ease: 'easeOut', delay: 0.1 }}
          className="mx-auto mt-4 max-w-3xl text-center text-neutral-700 dark:text-neutral-300 text-base md:text-lg"
        >
          Nous activons les bons <b>leviers</b> — marketing digital,
          prospection, SEO, campagnes, social — pour{' '}
          <b>accélérer votre croissance</b>, générer des leads qualifiés et
          gagner de nouveaux marchés.
        </motion.p>

        <div className="relative mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {GRID.map((feature) => (
            <Link
              href={`/nos-services/${feature.slug}`}
              key={feature.title}
              className="group"
            >
              <motion.article
                initial={{ y: 20 }}
                whileInView={{ y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, ease: 'easeInOut' }}
                className="relative overflow-hidden h-full flex flex-col justify-between rounded-2xl p-6 xl:p-7
                     
                           bg-[linear-gradient(135deg,rgba(255,255,255,.86),rgba(240,245,252,.9))]
                           dark:bg-[linear-gradient(135deg,rgba(10,14,20,.92),rgba(10,14,20,.9))]
                           border border-white/50 dark:border-[rgba(56,130,246,0.20)]
                           shadow-[0_18px_60px_rgba(6,24,44,.12),inset_0_1px_0_rgba(255,255,255,.55)]
                           dark:shadow-[0_18px_60px_rgba(2,6,12,.65),inset_0_1px_0_rgba(59,130,246,.12)]
                           transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_30px_90px_rgba(37,99,235,.25)]"
              >
                <span
                  aria-hidden
                  className="pointer-events-none absolute -bottom-12 left-1/2 h-16 w-[78%] -translate-x-1/2 rounded-full blur-3xl
                             bg-[radial-gradient(ellipse_at_center,rgba(0,168,232,.52),rgba(37,99,235,.38),transparent_70%)]"
                />
                <h3 className="relative z-10 text-lg xl:text-xl font-bold text-neutral-900 dark:text-white">
                  {feature.title}
                </h3>
                <div className="relative z-10 mt-4 text-neutral-700 dark:text-neutral-300 text-sm xl:text-[15px] leading-relaxed">
                  {feature.description}
                </div>

                <div className="relative z-10 mt-6 flex justify-end">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-white/80 ring-1 ring-black/10 shadow-md dark:bg-neutral-900/80 dark:ring-white/10">
                    <IconArrowRight className="h-5 w-5 text-sky-600 dark:text-sky-400" />
                  </span>
                </div>
              </motion.article>
            </Link>
          ))}
        </div>

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
