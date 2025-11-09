'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import clsx from 'clsx';
import {
  Cpu,
  Bot,
  Sparkles,
  MapPin,
  LineChart,
  Smartphone,
} from 'lucide-react';

import {
  AcquisitionMock,
  AppsMock,
  AutomationMock,
  GMBMock,
  SaaSMock,
  SitesMock,
} from './ServicesSkeletons';

/* ============================================================================
   CardShell – carte principale
============================================================================ */

type CardShellProps<As extends React.ElementType = 'article'> = {
  children: React.ReactNode;
  as?: As;
  className?: string;
} & Omit<React.ComponentPropsWithoutRef<As>, 'as' | 'className' | 'children'>;

export function CardShell<As extends React.ElementType = 'article'>({
  children,
  as,
  className,
  ...props
}: CardShellProps<As>) {
  const Comp = (as ?? 'article') as React.ElementType;
  const MotionComp = motion(Comp as React.ElementType);

  return (
    <MotionComp
      initial={{ y: 18, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className={clsx(
        'group h-full flex flex-col justify-between rounded-[3rem]',
        'border border-black/[0.02] dark:border-white/[0.04]',
        'bg-[linear-gradient(135deg,rgba(255,255,255,.92),rgba(240,255,252,.95))]',
        'p-6 md:p-7 text-left',
        'shadow-[0_18px_60px_rgba(6,24,44,.05),inset_0_1px_0_rgba(255,255,255,.04)]',
        'dark:bg-[linear-gradient(135deg,rgba(10,14,20,.92),rgba(10,14,20,.65))]',
        'dark:shadow-[0_18px_60px_rgba(2,6,12,.65),inset_0_1px_0_rgba(59,130,246,.15)]',
        'will-change-transform',
        className
      )}
      {...(props as any)}
    >
      {children}
    </MotionComp>
  );
}

/* ============================================================================
   DATA
============================================================================ */

type Service = {
  id: string;
  tag: string;
  title: string;
  desc: string;
  href: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  Illustration: React.ComponentType;
};

const SERVICES: Service[] = [
  {
    id: 'saas',
    tag: 'SaaS',
    title: 'SaaS sur-mesure',
    desc: 'On crée ton logiciel en ligne de A à Z : connexion des utilisateurs, abonnements, paiements, tout est prêt et simple à utiliser.',
    icon: Cpu,
    href: 'https://ikovaline.com/nos-services/creation-saas-sur-mesure',
    Illustration: SaaSMock,
  },
  {
    id: 'apps',
    tag: 'Apps',
    title: 'Web & Mobile Apps hautes performances',
    desc: 'On développe ton site ou ton appli mobile rapide, facile à utiliser, qui marche partout et même sans internet.',
    icon: Smartphone,
    href: 'https://ikovaline.com/nos-services/web-apps-applications-mobiles/',
    Illustration: AppsMock,
  },
  {
    id: 'sites',
    tag: 'Sites & SEO',
    title: 'Sites sur-mesure • SEO & GEO',
    desc: 'On fait un site beau, rapide, bien référencé sur Google, et optimisé pour que les gens près de chez toi te trouvent facilement.',
    icon: Sparkles,
    href: 'https://ikovaline.com/nos-services#sites-seo-geo',
    Illustration: SitesMock,
  },
  {
    id: 'automation',
    tag: 'IA & Automation',
    title: 'Automatisation & IA',
    desc: 'On installe des robots et de l’IA pour faire les tâches chiantes à ta place, gagner du temps et être plus efficace.',
    icon: Bot,
    href: 'https://ikovaline.com/nos-services#automatisation-ia',
    Illustration: AutomationMock,
  },
  {
    id: 'gmb',
    tag: 'Local',
    title: 'Google My Business (GBP) qui convertit',
    desc: 'On règle ta fiche Google pour que tu sois bien vu sur Maps : infos claires, avis clients, photos et appels qui arrivent directement.',
    icon: MapPin,
    href: 'https://ikovaline.com/nos-services#scaling',
    Illustration: GMBMock,
  },
  {
    id: 'acquisition',
    tag: 'Acquisition',
    title: 'SEA + SEO : acquisition rentable',
    desc: 'On t’amène des clients grâce à la pub Google et au référencement naturel. Tu vois clairement combien ça rapporte.',
    icon: LineChart,
    href: 'https://ikovaline.com/nos-services#scaling',
    Illustration: AcquisitionMock,
  },
];

/* ============================================================================
   GRID DESKTOP / TABLET
============================================================================ */

function DesktopGridServices() {
  return (
    <section className="bg-transparent">
      <div className="relative z-10 mx-auto px-2 sm:px-4">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 xl:gap-10">
          {SERVICES.map((s, idx) => {
            const Icon = s.icon;
            const Illustration = s.Illustration;
            return (
              <Link
                key={s.id}
                href={s.href}
                prefetch={false}
                aria-label={`${s.title} — en savoir plus`}
                className="group block focus:outline-none"
              >
                <CardShell>
                  <div className="z-20 flex flex-col gap-4">
                    <div className="flex w-full items-center justify-between">
                      <span className="inline-flex w-fit items-center gap-2 rounded-full bg-[hsl(var(--primary)/0.08)] px-3 py-1 text-xs font-semibold text-[hsl(var(--primary))] ring-1 ring-[hsl(var(--primary)/0.25)]">
                        <motion.span
                          className="inline-flex"
                          animate={{ scale: [1, 1.06, 1] }}
                          transition={{
                            duration: 2.2,
                            delay: idx * 0.05,
                            repeat: Infinity,
                          }}
                        >
                          <Icon className="h-4 w-4" />
                        </motion.span>
                        {s.tag}
                      </span>
                      <div className="z-20 inline-flex items-center gap-2 text-sm font-semibold text-primary transition group-hover:translate-x-0.5">
                        En savoir plus
                        <svg
                          aria-hidden
                          viewBox="0 0 24 24"
                          className="h-4 w-4"
                          fill="none"
                          stroke="currentColor"
                        >
                          <path d="M5 12h14" strokeWidth="2" />
                          <path d="M13 5l7 7-7 7" strokeWidth="2" />
                        </svg>
                      </div>
                    </div>

                    <h3 className="text-[clamp(1.25rem,1.6vw,1.8rem)] font-extrabold leading-tight text-neutral-900 dark:text-white">
                      {s.title}
                    </h3>

                    <p className="text-[12px] leading-6 text-neutral-700 dark:text-neutral-300">
                      {s.desc}
                    </p>
                  </div>

                  <div className="mt-2">
                    <div className="relative w-full rounded-2xl">
                      <div className="aspect-[16/10]">
                        <Illustration />
                      </div>
                    </div>
                  </div>
                </CardShell>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ============================================================================
   (Optionnel) Mobile list – si tu veux une version mobile différente
============================================================================ */

export default function ServicesGridRefined() {
  return (
    <>
      <DesktopGridServices />
    </>
  );
}
