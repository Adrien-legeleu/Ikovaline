// components/ServicesPage/ServicesHero.tsx
'use client';

import * as React from 'react';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { LiquidLink } from '@/components/ui/liquid-link';
import { IconCpu, IconRobot, IconTrendingUp } from '@tabler/icons-react';

function useLocale() {
  const pathname = usePathname() || '/';
  const isEN = /^\/en(\/|$)/.test(pathname);
  return { isEN };
}
function localizeHref(href: string, isEN: boolean) {
  if (!isEN) return href;
  if (/^(https?:)?\/\//.test(href)) return href;
  if (/^\/en(\/|$)/.test(href)) return href;
  if (href === '/') return '/en';
  if (href.startsWith('/#')) return `/en${href}`;
  return href.startsWith('/') ? `/en${href}` : `/en/${href}`;
}

export default function ServicesHero() {
  const { isEN } = useLocale();

  const TEXTS = isEN
    ? {
        title: (
          <>
            Modern{' '}
            <span className="text-sky-500 dark:text-sky-400">digital</span>{' '}
            solutions to boost your business
          </>
        ),
        subtitle:
          'From idea to production, we build robust, scalable solutions tailored to your needs.',
        cta: 'Discover',
        pillars: [
          {
            id: 'saas-apps',
            icon: (
              <IconCpu className="h-8 w-8 text-sky-500 dark:text-sky-400" />
            ),
            title: 'Applications & SaaS',
            desc: 'Custom-built web, mobile and SaaS applications that perform.',
          },
          {
            id: 'automatisation-ia',
            icon: (
              <IconRobot className="h-8 w-8 text-sky-500 dark:text-sky-400" />
            ),
            title: 'Automation & AI',
            desc: 'Optimize your processes with automation and artificial intelligence.',
          },
          {
            id: 'scaling',
            icon: (
              <IconTrendingUp className="h-8 w-8 text-sky-500 dark:text-sky-400" />
            ),
            title: 'Digital Growth',
            desc: 'Increase visibility, attract more customers, and accelerate results.',
          },
        ],
      }
    : {
        title: (
          <>
            Des solutions{' '}
            <span className="text-sky-500 dark:text-sky-400">digitales</span>{' '}
            modernes pour propulser votre entreprise
          </>
        ),
        subtitle:
          'De l’idée à la mise en production, nous concevons des solutions digitales robustes, évolutives et centrées sur vos besoins.',
        cta: 'Découvrir',
        pillars: [
          {
            id: 'saas-apps',
            icon: (
              <IconCpu className="h-8 w-8 text-sky-500 dark:text-sky-400" />
            ),
            title: 'Applications & SaaS',
            desc: "Conception sur-mesure d'applications web, mobiles et SaaS performantes.",
          },
          {
            id: 'automatisation-ia',
            icon: (
              <IconRobot className="h-8 w-8 text-sky-500 dark:text-sky-400" />
            ),
            title: 'Automatisation & IA',
            desc: "Optimisez vos processus avec l'intelligence artificielle et l'automatisation.",
          },
          {
            id: 'scaling',
            icon: (
              <IconTrendingUp className="h-8 w-8 text-sky-500 dark:text-sky-400" />
            ),
            title: 'Croissance digitale',
            desc: 'Boostez votre visibilité, attirez plus de clients et accélérez vos résultats.',
          },
        ],
      };

  return (
    <section className="relative overflow-hidden flex flex-col items-center justify-center text-center pt-28 pb-32 px-6">
      <div aria-hidden className="absolute inset-0 -z-10">
        <span className="absolute -top-40 left-1/2 h-[40rem] w-[40rem] -translate-x-1/2 rounded-full blur-[200px] bg-[radial-gradient(closest-side,#00A8E8,transparent_70%)] opacity-30 dark:opacity-40" />
        <span className="absolute bottom-0 right-1/2 h-[32rem] w-[32rem] translate-x-1/2 rounded-full blur-[160px] bg-[radial-gradient(closest-side,#2563EB,transparent_70%)] opacity-25 dark:opacity-35" />
      </div>

      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight bg-gradient-to-t from-neutral-900 via-neutral-700 to-neutral-500 dark:from-neutral-100 dark:via-neutral-300 dark:to-neutral-400 bg-clip-text text-transparent max-w-4xl"
      >
        {TEXTS.title}
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: 'easeOut', delay: 0.3 }}
        className="mt-6 max-w-2xl text-lg md:text-xl text-neutral-700 dark:text-neutral-300"
      >
        {TEXTS.subtitle}
      </motion.p>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-16 max-w-6xl">
        {TEXTS.pillars.map((p, i) => (
          <motion.div
            key={p.id}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut', delay: i * 0.2 }}
            viewport={{ once: true }}
            className="relative group overflow-hidden rounded-[28px] p-8 backdrop-blur-2xl
             bg-[linear-gradient(135deg,rgba(255,255,255,.85),rgba(240,245,252,.45))]
             dark:bg-[linear-gradient(135deg,rgba(10,14,20,.9),rgba(10,14,20,.65))]
             border border-white/40 dark:border-[rgba(56,130,246,0.2)]
             shadow-[0_18px_60px_rgba(6,24,44,.12),inset_0_1px_0_rgba(255,255,255,.5)]
             dark:shadow-[0_18px_60px_rgba(2,6,12,.65),inset_0_1px_0_rgba(59,130,246,.15)]
             transform transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_30px_90px_rgba(37,99,235,.25)]
             flex flex-col justify-between h-full"
          >
            <span
              aria-hidden
              className="pointer-events-none absolute -bottom-10 left-1/2 h-20 w-[80%] -translate-x-1/2 rounded-full blur-3xl 
               bg-[radial-gradient(ellipse_at_center,rgba(0,168,232,.5),rgba(37,99,235,.4),transparent_70%)]"
            />
            <div className="relative z-10 flex flex-col gap-4">
              <div className="mx-auto p-3 rounded-2xl bg-white/70 dark:bg-neutral-900/50 shadow-inner">
                {p.icon}
              </div>
              <h3 className="text-center text-xl font-bold text-neutral-900 dark:text-white">
                {p.title}
              </h3>
              <p className="text-center text-neutral-700 dark:text-neutral-300 text-sm">
                {p.desc}
              </p>
            </div>
            <div className="relative z-10 mt-6">
              <div className="flex justify-center">
                <LiquidLink
                  href={localizeHref(`/nos-services/#${p.id}`, isEN)}
                  className="mt-1"
                >
                  {TEXTS.cta}
                </LiquidLink>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
