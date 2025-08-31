'use client';

import React from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { motion, useReducedMotion } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { IconApps, IconMessage2, IconShieldCheck } from '@tabler/icons-react';

import { cn } from '@/lib/utils';
import { LiquidLink } from '@/components/ui/liquid-link';
import StarClientsGoogle from '@/components/StarClientsGoogle';
import { TextAnimate } from '@/components/ui/text-animate';

/* -------------------- Types -------------------- */
export type ParticleTextEffectProps = {
  words?: ReadonlyArray<string>;
  quality?: 'low' | 'mid' | 'high';
  width?: number;
  height?: number;
  dprCap?: number;
};

/* -------------------- i18n -------------------- */
const DICT = {
  fr: {
    guarantee: 'Garantie de résultats',
    headline: 'De l’idée au SaaS qui ',
    words: ['PROPULSE', 'DÉCUPLE'],
    subtitle:
      'De la stratégie au développement, Ikovaline conçoit des solutions digitales sur mesure pour accélérer votre croissance.',
    ctaAudit: 'Demander un audit gratuit',
    ctaServices: 'Voir nos services',
  },
  en: {
    guarantee: 'Results guarantee',
    headline: 'From idea to a SaaS that ',
    words: ['BOOST', 'SCALE'],
    subtitle:
      'From strategy to development, Ikovaline designs tailored digital solutions to accelerate your growth.',
    ctaAudit: 'Request a free audit',
    ctaServices: 'See our services',
  },
} as const;

/* -------------------- Helpers perf -------------------- */
function usePathLocale() {
  const pathname = usePathname() || '/';
  return /^\/en(\/|$)/.test(pathname) ? 'en' : 'fr';
}
function usePerfBudget() {
  const prefersReduced = useReducedMotion();
  const [lowEnd, setLowEnd] = React.useState(false);
  React.useEffect(() => {
    const nav = navigator as Navigator & {
      deviceMemory?: number;
      connection?: { effectiveType?: string };
      hardwareConcurrency?: number;
    };
    setLowEnd(
      prefersReduced ||
        (nav.deviceMemory ?? 8) < 4 ||
        (nav.hardwareConcurrency ?? 8) <= 4 ||
        /2g|3g/.test(nav.connection?.effectiveType ?? '4g')
    );
  }, [prefersReduced]);
  return { lowEnd, prefersReduced };
}

/* -------------------- Dynamic lazy -------------------- */
const GlowLazy = dynamic(() => import('@/components/ui/glow'), { ssr: false });
const UnicornBackdrop = dynamic(
  () => import('@/components/ui/unicornBackdrop'),
  { ssr: false }
);
const ParticleTextEffect = dynamic<ParticleTextEffectProps>(
  () => import('../ParticleWord').then((m) => m.default),
  { ssr: false, loading: () => null }
);

function useDeferredRender() {
  const [ready, setReady] = React.useState(false);

  React.useEffect(() => {
    if (typeof window !== 'undefined' && window.requestIdleCallback) {
      const id = window.requestIdleCallback(() => setReady(true), {
        timeout: 800,
      });
      return () => {
        if (window.cancelIdleCallback) window.cancelIdleCallback(id);
      };
    } else {
      const t = setTimeout(() => setReady(true), 800);
      return () => clearTimeout(t);
    }
  }, []);

  return ready;
}

/* -------------------- Page -------------------- */
export default function Landing() {
  const locale = usePathLocale();
  const t = DICT[locale];
  const { lowEnd, prefersReduced } = usePerfBudget();
  const heavyReady = useDeferredRender(); // ⬅️ décalage du rendu lourd

  return (
    <div className="relative flex flex-col items-center justify-center gap-5 py-20 overflow-hidden">
      {/* Glow décoratif → différé */}
      {heavyReady && (
        <div className="absolute dark:hidden inset-0 pointer-events-none overflow-hidden">
          <GlowLazy variant="above" />
        </div>
      )}

      {/* Fond Unicorn → différé */}
      {heavyReady && <UnicornBackdrop className="dark:block hidden" />}

      {/* Badge “garantie” */}
      <div className="z-10 flex flex-col">
        <Link
          href="/about/#notre-garantie"
          className="mx-auto flex items-center justify-center"
        >
          <motion.div
            className={cn(
              'group relative mx-auto flex items-center justify-center rounded-full px-5 py-2',
              'bg-white/70 backdrop-blur-xl dark:bg-transparent',
              'shadow-none sm:shadow-[inset_0_-10px_14px_#8fdfff26,inset_0_2px_6px_#ffffff55,0_6px_20px_rgba(37,99,235,.25)]'
            )}
            initial={prefersReduced ? { opacity: 1 } : { opacity: 0, y: -24 }}
            animate={prefersReduced ? {} : { opacity: 1, y: 0 }}
            transition={{
              duration: prefersReduced ? 0.2 : 0.5,
              ease: 'easeOut',
            }}
          >
            <IconShieldCheck className="ml-1 size-4 stroke-sky-600 dark:stroke-sky-300" />
            <span className="ml-2 text-sm font-semibold tracking-wide text-sky-700 dark:text-sky-200">
              {t.guarantee}
            </span>
          </motion.div>
        </Link>

        {/* Headline */}
        <h1 className="mx-auto pt-6 text-center font-bold md:text-5xl lg:text-6xl xl:text-7xl text-2xl leading-snug max-w-5xl bg-clip-text text-transparent bg-gradient-to-b from-neutral-900 to-neutral-700 dark:from-neutral-300 dark:to-white relative z-20">
          {t.headline}
          {/* Toujours rendu, mais effets lourds différés */}
          {heavyReady && !prefersReduced ? (
            <span className="inline-flex align-middle">
              <ParticleTextEffect
                words={t.words}
                quality={lowEnd ? 'mid' : 'high'}
                width={500}
                height={110}
                dprCap={lowEnd ? 1.25 : 1.8}
              />
            </span>
          ) : (
            <span className="inline-flex text-5xl align-middle ml-1">
              {t.words[0]}
            </span>
          )}
        </h1>
      </div>

      {/* Avis clients */}
      <StarClientsGoogle />

      {/* Sous-titre */}
      <TextAnimate
        animation={prefersReduced ? undefined : 'blurInUp'}
        by="word"
        className="max-w-2xl text-center text-muted-foreground dark:text-neutral-200 max-sm:px-2 md:text-lg"
      >
        {t.subtitle}
      </TextAnimate>

      {/* CTAs */}
      <div className="mt-8 flex items-center justify-center gap-5 max-sm:flex-col">
        <LiquidLink href="/contact">
          <IconMessage2 aria-hidden className="inline-flex mr-2" /> {t.ctaAudit}
        </LiquidLink>
        <LiquidLink href="/nos-services">
          <IconApps aria-hidden className="inline-flex mr-2" /> {t.ctaServices}
        </LiquidLink>
      </div>
    </div>
  );
}
