// components/ServicesPage/servicesComponents/Service3.tsx
'use client';

import * as React from 'react';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { LiquidLink } from '@/components/ui/liquid-link';
import { IconArrowRight } from '@tabler/icons-react';
import { LiquidButton } from '@/components/ui/liquid-glass-button';

function useLocale() {
  const pathname = usePathname() || '/';
  return { isEN: /^\/en(\/|$)/.test(pathname) };
}
function localizeHref(href: string, isEN: boolean) {
  if (!isEN) return href;
  if (/^(https?:)?\/\//.test(href)) return href;
  if (/^\/en(\/|$)/.test(href)) return href;
  if (href === '/') return '/en';
  if (href.startsWith('/#')) return `/en${href}`;
  return href.startsWith('/') ? `/en${href}` : `/en/${href}`;
}

export function Service3() {
  const { isEN } = useLocale();

  const TITLE = isEN ? (
    <>
      Digital Strategies &{' '}
      <span className="text-sky-500 dark:text-sky-400">Growth</span> tailored to
      you
    </>
  ) : (
    <>
      Stratégies Digitales &{' '}
      <span className="text-sky-500 dark:text-sky-400">Croissance</span>{' '}
      sur-mesure
    </>
  );

  const INTRO = isEN ? (
    <>
      We activate the right <b>levers</b> — digital marketing, prospecting, SEO,
      campaigns, social — to <b>accelerate growth</b>, generate qualified leads,
      and win new markets.
    </>
  ) : (
    <>
      Nous activons tous les <b>leviers</b> pertinents — marketing digital,
      prospection, SEO, campagnes, réseaux sociaux — pour{' '}
      <b>accélérer votre croissance</b>, générer des leads qualifiés et
      conquérir de nouveaux marchés.
    </>
  );

  const gridFR = [
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

  const gridEN = [
    {
      title: 'Market Research',
      slug: 'etudes-marche-sur-mesure',
      description: (
        <ul className="list-disc pl-4 space-y-3">
          <li>
            Market analysis, audience & trends to guide your <b>strategies</b>.
          </li>
        </ul>
      ),
    },
    {
      title: 'Surveys & Field Studies',
      slug: 'sondages-marche-enquetes-terrain',
      description: (
        <ul className="list-disc pl-4 space-y-3">
          <li>
            Reliable data collection and analysis for <b>informed decisions</b>.
          </li>
        </ul>
      ),
    },
    {
      title: 'Sales Strategy',
      slug: 'strategie-commerciale-developpement-business',
      description: (
        <ul className="list-disc pl-4 space-y-3">
          <li>
            High-performing plans to <b>increase your sales</b>.
          </li>
        </ul>
      ),
    },
    {
      title: 'SEO',
      slug: 'seo-referencement-naturel',
      description: (
        <ul className="list-disc pl-4 space-y-3">
          <li>
            Boost organic visibility with <b>optimized SEO</b>.
          </li>
        </ul>
      ),
    },
    {
      title: 'SEA Campaigns',
      slug: 'gestion-campagnes-sea',
      description: (
        <ul className="list-disc pl-4 space-y-3">
          <li>
            Targeted ads with <b>ROI-driven</b> management.
          </li>
        </ul>
      ),
    },
    {
      title: 'International Expansion',
      slug: 'developpement-international',
      description: (
        <ul className="list-disc pl-4 space-y-3">
          <li>
            Support to <b>enter new markets</b>.
          </li>
        </ul>
      ),
    },
  ];

  const GRID = isEN ? gridEN : gridFR;

  return (
    <section className="relative pb-20 pt-14 md:pt-20">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <span className="absolute -top-36 left-1/3 h-[34rem] w-[34rem] -translate-x-1/2 rounded-full blur-[200px] bg-[radial-gradient(closest-side,#00A8E8,transparent_70%)] opacity-25 dark:opacity-35" />
        <span className="absolute -bottom-28 right-1/4 h-[32rem] w-[32rem] translate-x-1/4 rounded-full blur-[180px] bg-[radial-gradient(closest-side,#2563EB,transparent_70%)] opacity-20 dark:opacity-30" />
      </div>

      <div className="relative mx-auto max-w-6xl px-6">
        <motion.h2
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="text-center text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight
                     bg-gradient-to-t from-neutral-900 via-neutral-700 to-neutral-500
                     dark:from-neutral-100 dark:via-neutral-300 dark:to-neutral-400 bg-clip-text text-transparent"
        >
          {TITLE}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, ease: 'easeOut', delay: 0.1 }}
          className="mx-auto mt-4 max-w-3xl text-center text-neutral-700 dark:text-neutral-300 text-base md:text-lg"
        >
          {INTRO}
        </motion.p>

        <div
          id="scaling"
          className="relative mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {GRID.map((feature) => (
            <Link
              href={localizeHref(`/nos-services/${feature.slug}`, isEN)}
              key={feature.title}
              className="group"
            >
              <motion.article
                initial={{ y: 20 }}
                whileInView={{ y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.35,
                  ease: 'easeInOut',
                }}
                className="relative overflow-hidden h-full flex flex-col justify-between rounded-3xl p-6 xl:p-7 backdrop-blur-2xl
                           bg-[linear-gradient(135deg,rgba(255,255,255,.86),rgba(240,245,252,.46))]
                           dark:bg-[linear-gradient(135deg,rgba(10,14,20,.92),rgba(10,14,20,.65))]
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
                <div className="relative z-10 mt-5 flex justify-end">
                  <LiquidButton className="!p-5">
                    {' '}
                    <IconArrowRight className="h-5 w-5 text-sky-600 dark:text-sky-400" />
                  </LiquidButton>
                </div>
              </motion.article>
            </Link>
          ))}
        </div>

        <div className="mt-10 flex justify-center">
          <LiquidLink
            href={localizeHref('/contact', isEN)}
            className="text-md dark:backdrop-blur-sm"
          >
            {isEN ? 'Grow your business' : 'Boostez votre business'}
          </LiquidLink>
        </div>
      </div>
    </section>
  );
}
