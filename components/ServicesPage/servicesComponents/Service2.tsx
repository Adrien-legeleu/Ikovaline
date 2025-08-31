// components/ServicesPage/servicesComponents/Service2.tsx
'use client';

import * as React from 'react';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { LiquidLink } from '@/components/ui/liquid-link';
import { IconArrowRight } from '@tabler/icons-react';

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

export function Service2() {
  const { isEN } = useLocale();

  const TITLE = isEN ? (
    <>
      Automation & <span className="text-sky-500 dark:text-sky-400">AI</span> to
      power your efficiency
    </>
  ) : (
    <>
      Automatisation &{' '}
      <span className="text-sky-500 dark:text-sky-400">IA</span> au service de
      votre efficacité
    </>
  );

  const INTRO = isEN ? (
    <>
      Free up time and <b>improve conversions</b> with our <b>automation</b> and{' '}
      <b>artificial intelligence</b> solutions. From smart CRMs to voice
      assistants, we integrate tools that work for you.
    </>
  ) : (
    <>
      Libérez du temps et <b>optimisez vos conversions</b> grâce à nos{' '}
      <b>solutions d’automatisation</b> et d’<b>intelligence artificielle</b>.
      Du CRM intelligent aux assistants vocaux, nous intégrons des outils qui
      travaillent pour vous.
    </>
  );

  const gridFR = [
    {
      title: 'IA & Marketing',
      slug: 'automatisation-solutions-ia-marketing',
      description: (
        <ul className="list-disc pl-4 space-y-3">
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
        <ul className="list-disc pl-4 space-y-3">
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
        <ul className="list-disc pl-4 space-y-3">
          <li>
            Augmentez vos conversions grâce à l’<b>emailing piloté par IA</b>.
          </li>
        </ul>
      ),
    },
  ];

  const gridEN = [
    {
      title: 'AI & Marketing',
      slug: 'automatisation-solutions-ia-marketing',
      description: (
        <ul className="list-disc pl-4 space-y-3">
          <li>
            Smart CRM, automated segmentation, and <b>conversion scenarios</b>.
          </li>
        </ul>
      ),
    },
    {
      title: 'Phone Prospecting',
      slug: 'prospection-telephone-ia',
      description: (
        <ul className="list-disc pl-4 space-y-3">
          <li>
            Voice assistant: <b>automated calls</b>, tracking, and optimized
            follow-ups.
          </li>
        </ul>
      ),
    },
    {
      title: 'Automated Emailing',
      slug: 'automatisation-ia-emailing',
      description: (
        <ul className="list-disc pl-4 space-y-3">
          <li>
            Increase conversions with <b>AI-driven emailing</b>.
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
          id="automatisation-ia"
          className="relative mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {GRID.map((feature, idx) => (
            <Link
              href={localizeHref(`/nos-services/${feature.slug}`, isEN)}
              key={feature.title}
              className="group"
            >
              <motion.article
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.55,
                  ease: 'easeOut',
                }}
                className="relative  flex flex-col  justify-between group rounded-[28px] h-full p-8 backdrop-blur-2xl overflow-hidden
                       bg-[linear-gradient(135deg,rgba(255,255,255,.85),rgba(240,245,252,.45))]
                       dark:bg-[linear-gradient(135deg,rgba(10,14,20,.9),rgba(10,14,20,.65))]
                       border border-white/40 dark:border-[rgba(56,130,246,0.2)]
                       shadow-[0_18px_60px_rgba(6,24,44,.12),inset_0_1px_0_rgba(255,255,255,.5)]
                       dark:shadow-[0_18px_60px_rgba(2,6,12,.65),inset_0_1px_0_rgba(59,130,246,.15)]
                       transform transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_30px_90px_rgba(37,99,235,.25)]
                       "
              >
                <span
                  aria-hidden
                  className="absolute -bottom-10 left-1/2 h-20 w-[80%] -translate-x-1/2 rounded-full blur-3xl 
                         bg-[radial-gradient(ellipse_at_center,rgba(0,168,232,.5),rgba(37,99,235,.4),transparent_70%)]"
                />
                <h3 className="relative z-10 text-lg xl:text-xl font-bold text-neutral-900 dark:text-white">
                  {feature.title}
                </h3>
                <div className="relative z-10 mt-4 text-neutral-700 dark:text-neutral-300 text-sm xl:text-[15px] leading-relaxed">
                  {feature.description}
                </div>
                <div className="relative z-10 mt-5 flex justify-end">
                  <span
                    className="inline-flex h-10 w-10 items-center justify-center rounded-full
                                   bg-white/70 dark:bg-neutral-900/60 border border-white/40 dark:border-white/10
                                   shadow-inner group-hover:scale-105 transition"
                  >
                    <IconArrowRight className="h-5 w-5 text-sky-600 dark:text-sky-400" />
                  </span>
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
            {isEN ? 'Explore our AI solutions' : 'Découvrez nos solutions IA'}
          </LiquidLink>
        </div>
      </div>
    </section>
  );
}
