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

export type ParticleTextEffectProps = {
  words?: ReadonlyArray<string>; // ou: readonly string[]
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

/* -------------------- Helpers perf / breakpoints -------------------- */
function usePathLocale() {
  const pathname = usePathname() || '/';
  const isEN = /^\/en(\/|$)/.test(pathname);
  return isEN ? 'en' : 'fr';
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
    const mem = nav.deviceMemory ?? 8;
    const cores = nav.hardwareConcurrency ?? 8;
    const net = nav.connection?.effectiveType ?? '4g';
    setLowEnd(prefersReduced || mem < 4 || cores <= 4 || /2g|3g/.test(net));
  }, [prefersReduced]);
  return { lowEnd, prefersReduced };
}

/* -------------------- Glow optimisé -------------------- */
const GlowLazy = dynamic(() => import('@/components/ui/glow'), {
  ssr: false,
  loading: () => null,
});

/* -------------------- Particle uniquement ≥ lg -------------------- */
const ParticleTextEffect = dynamic<ParticleTextEffectProps>(
  () => import('../ParticleWord').then((m) => m.default),
  {
    ssr: false,
    loading: () => (
      <span
        aria-hidden
        className="inline-block align-middle"
        style={{ width: 260, height: 56 }}
      />
    ),
  }
);
const UnicornBackdrop = dynamic(
  () => import('@/components/ui/unicornBackdrop'),
  {
    ssr: false,
    loading: () => null,
  }
);

/* -------------------- Fallback mobile ultra-léger (CSS only) -------------------- */
function MobileBlueFlipWords({ words }: { words: ReadonlyArray<string> }) {
  const reduce = useReducedMotion();

  return (
    <>
      {/* keyframes locales */}
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
          0% {
            background-position: 0% 50%;
          }
          100% {
            background-position: 200% 50%;
          }
        }
      `}</style>

      <span
        className="relative inline-block h-[1.05em] bottom-1 p overflow-hidden align-baseline ml-1"
        aria-hidden
      >
        <span
          className={cn(
            'flex flex-col leading-none will-change-transform',
            reduce
              ? ''
              : 'motion-safe:animate-[slideWords_4s_ease-in-out_infinite]'
          )}
          style={{ transform: 'translateZ(0)' }}
        >
          {words.slice(0, 2).map((w, i) => (
            <span
              key={i}
              className="font-[900] py-1 tracking-tight bg-clip-text text-transparent"
              style={{
                // dégradé bleu “électrique” + shimmer
                backgroundImage:
                  'linear-gradient(90deg,#00A8E8,#3B82F6,#22D3EE,#00A8E8)',
                backgroundSize: '200% 100%',
                animation: reduce ? undefined : 'shimmer 3.5s linear infinite',
                // glow doux sans coût CPU
                textShadow: '0 0 0 rgba(0,0,0,0), 0 0 .01px rgba(0,0,0,0)', // for subpixel AA
                WebkitTextStroke: '0 transparent',
              }}
            >
              {w}
            </span>
          ))}
        </span>
      </span>
    </>
  );
}

/* -------------------- Page -------------------- */
export default function Landing() {
  const locale = usePathLocale();
  const t = DICT[locale];
  const lgUp = useLgUp();
  const { lowEnd, prefersReduced } = usePerfBudget();

  return (
    <div className="relative flex flex-col items-center justify-center gap-5 py-20 overflow-hidden">
      {/* Glow décoratif performant */}
      <div className="absolute dark:hidden inset-0 pointer-events-none overflow-hidden">
        <GlowLazy variant="above" />
      </div>

      <UnicornBackdrop className="dark:block hidden" />

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
              'shadow-none sm:shadow-[inset_0_-10px_14px_#8fdfff26,inset_0_2px_6px_#ffffff55,0_6px_20px_rgba(37,99,235,.25)]',
              'transition-shadow duration-500 ease-out',
              'sm:hover:shadow-[inset_0_-6px_12px_#8fdfff45,inset_0_2px_6px_#ffffff66,0_10px_28px_rgba(37,99,235,.35)]'
            )}
            initial={prefersReduced ? { opacity: 0 } : { opacity: 0, y: -24 }}
            animate={prefersReduced ? { opacity: 1 } : { opacity: 1, y: 0 }}
            transition={{
              duration: prefersReduced ? 0.25 : 0.5,
              ease: 'easeOut',
            }}
          >
            <span
              className={cn(
                'absolute inset-0 block h-full w-full animate-gradient rounded-[inherit] p-[1px]',
                'bg-gradient-to-r from-[#5faaff]/60 via-[#42b8fd]/60 to-[#00e0ff]/60 bg-[length:300%_100%]'
              )}
              style={{
                WebkitMask:
                  'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                WebkitMaskComposite: 'destination-out',
                mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                maskComposite: 'subtract',
                WebkitClipPath: 'padding-box',
              }}
            />
            <span
              aria-hidden
              className="absolute -inset-6 block rounded-full blur-3xl 
               bg-[radial-gradient(circle_at_center,rgba(0,168,255,.55),rgba(37,99,235,.35),transparent_75%)]
               opacity-50 dark:opacity-40"
            />
            <IconShieldCheck className="ml-1 size-4 stroke-sky-600 dark:stroke-sky-300 drop-shadow-[0_0_6px_rgba(56,130,246,.7)] sm:group-hover:translate-x-0.5 transition-transform duration-300 ease-in-out" />
            <hr className="mx-2 h-4 w-px shrink-0 bg-sky-500/80 dark:bg-sky-300/80" />
            <span className="relative z-10 text-sm font-semibold tracking-wide text-sky-700 dark:text-transparent dark:bg-gradient-to-r dark:from-sky-200 dark:via-sky-100 dark:to-blue-200 dark:bg-clip-text">
              {t.guarantee}
            </span>
          </motion.div>
        </Link>

        {/* Headline : Particle ≥ lg / Fallback mobile CSS */}
        <h1 className="mx-auto pt-6 text-center font-bold md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl text-2xl xl:!font-semibold leading-[50px] md:leading-[60px] lg:!leading-[70px] xl:!leading-[85px] 2xl:!leading-[115px] max-w-4xl xl:max-w-6xl 2xl:max-w-[1450px] bg-clip-text text-transparent bg-gradient-to-b from-neutral-900 via-neutral-700 to-neutral-800 dark:from-neutral-300 dark:via-white dark:to-white relative z-20">
          {t.headline}
          {/* Desktop (≥ lg) : particles */}
          {lgUp && !prefersReduced ? (
            <span className="hidden  lg:inline-flex align-middle">
              <ParticleTextEffect
                words={t.words}
                quality={lowEnd ? 'mid' : 'high'}
                width={520}
                height={120}
                dprCap={lowEnd ? 1.25 : 1.8}
              />
            </span>
          ) : (
            // Mobile (& réduite) : flip + shimmer CSS (super perf)
            <span className="inline-flex text-5xl lg:hidden align-middle">
              <MobileBlueFlipWords words={t.words as unknown as string[]} />
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
        className="max-w-2xl text-center text-muted-foreground dark:text-neutral-200 max-sm:px-2 xs:text-xs md:text-lg"
      >
        {t.subtitle}
      </TextAnimate>

      {/* CTAs */}
      <div className="mt-8 flex items-center justify-center gap-5 max-sm:flex-col-reverse max-sm:gap-3 2xl:mt-8">
        <LiquidLink href="/contact" className="z-10 !backdrop-blur-sm">
          <span className="flex items-center justify-center gap-2">
            <IconMessage2 aria-hidden />
            {t.ctaAudit}
          </span>
        </LiquidLink>
        <LiquidLink href="/nos-services" className="z-10 backdrop-blur-sm">
          <span className="flex items-center justify-center gap-2">
            <IconApps aria-hidden />
            {t.ctaServices}
          </span>
        </LiquidLink>
      </div>
    </div>
  );
}
