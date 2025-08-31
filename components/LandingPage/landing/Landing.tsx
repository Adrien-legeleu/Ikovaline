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

/* -------------------- Perf helpers -------------------- */
function usePathLocale() {
  const pathname = usePathname() || '/';
  return /^\/en(\/|$)/.test(pathname) ? 'en' : 'fr';
}
function useLgUp() {
  const [ok, setOk] = React.useState(false);
  React.useEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px)');
    const on = () => setOk(mq.matches);
    on();
    mq.addEventListener('change', on);
    return () => mq.removeEventListener('change', on);
  }, []);
  return ok;
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
function useIdleReady(timeout = 600) {
  const [ready, setReady] = React.useState(false);
  React.useEffect(() => {
    if ('requestIdleCallback' in window) {
      const id = window.requestIdleCallback(() => setReady(true), {
        timeout,
      });
      return () => window.cancelIdleCallback?.(id);
    } else {
      const t = setTimeout(() => setReady(true), timeout);
      return () => clearTimeout(t);
    }
  }, [timeout]);
  return ready;
}

/* -------------------- Lazy heavy components -------------------- */
const GlowLazy = dynamic(() => import('@/components/ui/glow'), { ssr: false });
const UnicornBackdrop = dynamic(
  () => import('@/components/ui/unicornBackdrop'),
  { ssr: false }
);
const ParticleTextEffect = dynamic<ParticleTextEffectProps>(
  () => import('../ParticleWord').then((m) => m.default),
  { ssr: false }
);

/* -------------------- Mobile fallback -------------------- */
function MobileBlueFlipWords({ words }: { words: ReadonlyArray<string> }) {
  return (
    <span
      className="relative inline-block h-[1.05em] bottom-1 ml-1 overflow-hidden align-baseline"
      aria-hidden
    >
      <span className="flex flex-col leading-none motion-safe:animate-[slideWords_4s_ease-in-out_infinite]">
        {words.map((w, i) => (
          <span
            key={i}
            className="font-extrabold py-1 bg-clip-text text-transparent"
            style={{
              backgroundImage:
                'linear-gradient(90deg,#00A8E8,#3B82F6,#22D3EE,#00A8E8)',
              backgroundSize: '200% 100%',
              animation: 'shimmer 3.5s linear infinite',
            }}
          >
            {w}
          </span>
        ))}
      </span>
      <style jsx>{`
        @keyframes slideWords {
          0%,
          40% {
            transform: translateY(0%);
          }
          50%,
          90% {
            transform: translateY(-50%);
          }
          100% {
            transform: translateY(0%);
          }
        }
        @keyframes shimmer {
          from {
            background-position: 0% 50%;
          }
          to {
            background-position: 200% 50%;
          }
        }
      `}</style>
    </span>
  );
}

/* -------------------- Page -------------------- */
export default function Landing() {
  const locale = usePathLocale();
  const t = DICT[locale];
  const lgUp = useLgUp();
  const { lowEnd, prefersReduced } = usePerfBudget();
  const heavyReady = useIdleReady(500); // décalage du gros décor

  return (
    <div className="relative flex flex-col items-center justify-center gap-5 py-20 overflow-hidden">
      {/* Fond Glow + Unicorn → seulement après idle */}
      {heavyReady && (
        <>
          <div className="absolute dark:hidden inset-0 pointer-events-none overflow-hidden">
            <GlowLazy variant="above" />
          </div>
          <UnicornBackdrop className="dark:block hidden" />
        </>
      )}

      {/* Badge garantie */}
      <div className="z-10 flex flex-col">
        <Link
          href="/about/#notre-garantie"
          className="mx-auto flex items-center justify-center"
        >
          <motion.div
            className={cn(
              'group relative border border-blue-500/40 mx-auto flex items-center justify-center rounded-full px-5 py-2',
              'bg-white/30 backdrop-blur-sm dark:bg-transparent'
            )}
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
          >
            <IconShieldCheck className="ml-1 size-4 stroke-sky-600 dark:stroke-sky-300" />
            <span className="ml-2 text-sm font-semibold tracking-wide text-sky-700 dark:text-sky-200">
              {t.guarantee}
            </span>
          </motion.div>
        </Link>

        {/* Headline */}
        <h1 className="mx-auto pt-6 text-center font-bold md:text-5xl lg:text-6xl text-2xl leading-snug max-w-5xl bg-clip-text text-transparent bg-gradient-to-b from-neutral-900 to-neutral-700 dark:from-neutral-300 dark:to-white relative z-20">
          {t.headline}
          {lgUp && !prefersReduced && !lowEnd ? (
            heavyReady ? (
              <span className="inline-flex align-middle ml-2">
                <ParticleTextEffect
                  words={t.words}
                  quality="high"
                  width={500}
                  height={110}
                  dprCap={1.8}
                />
              </span>
            ) : (
              <span className="inline-flex ml-2 text-5xl">{t.words[0]}</span>
            )
          ) : (
            <span className="inline-flex text-5xl ml-2">
              <MobileBlueFlipWords words={t.words} />
            </span>
          )}
        </h1>
      </div>

      <StarClientsGoogle />

      <motion.div className="max-w-2xl text-center text-muted-foreground dark:text-neutral-200 max-sm:px-2 md:text-lg">
        {t.subtitle}
      </motion.div>

      <div className="mt-8 flex items-center justify-center gap-5 max-sm:flex-col">
        <LiquidLink href="/contact" className="backdrop-blur-sm">
          <IconMessage2 aria-hidden className="mr-2 inline-flex" /> {t.ctaAudit}
        </LiquidLink>
        <LiquidLink href="/nos-services" className="backdrop-blur-sm">
          <IconApps aria-hidden className="mr-2 inline-flex" /> {t.ctaServices}
        </LiquidLink>
      </div>
    </div>
  );
}
