'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { AnimatePresence, motion } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { IconApps, IconMessage2, IconShieldCheck } from '@tabler/icons-react';

import { cn } from '@/lib/utils';
import { LiquidLink } from '@/components/ui/liquid-link';
import StarClientsGoogle from '@/components/StarClientsGoogle';
import { Component } from '@/components/ui/vaport-text-effect';

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

/* -------------------- Helpers -------------------- */
function usePathLocale() {
  const pathname = usePathname() || '/';
  return /^\/en(\/|$)/.test(pathname) ? 'en' : 'fr';
}
function useIdleReady(timeout = 600) {
  const [ready, setReady] = React.useState(false);
  React.useEffect(() => {
    const t = setTimeout(() => setReady(true), timeout);
    return () => clearTimeout(t);
  }, [timeout]);
  return ready;
}

/* -------------------- Décors lourds (lazy) -------------------- */
const GlowLazy = dynamic(() => import('@/components/ui/glow'), { ssr: false });
const UnicornBackdrop = dynamic(
  () => import('@/components/ui/unicornBackdrop'),
  { ssr: false }
);

export function BlueWordsCycle({
  words,
  interval = 2500,
}: {
  words: ReadonlyArray<string>;
  interval?: number;
}) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % words.length);
    }, interval);
    return () => clearInterval(id);
  }, [words, interval]);

  return (
    <span className="relative ml-2 mt-4 inline-block align-baseline">
      <AnimatePresence mode="wait">
        <motion.span
          key={words[index]}
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -30 }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
          className={cn(
            'font-extrabold bg-clip-text text-transparent',
            'text-4xl md:text-6xl lg:text-8xl xl:text-9xl'
          )}
          style={{
            backgroundImage:
              'linear-gradient(90deg,#00A8E8,#3B82F6,#22D3EE,#00A8E8)',
            backgroundSize: '200% 100%',
          }}
        >
          {words[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

/* -------------------- Page -------------------- */
export default function Landing() {
  const locale = usePathLocale();
  const t = DICT[locale];
  const heavyReady = useIdleReady(500);

  return (
    <div className="relative flex flex-col items-center justify-center gap-5 py-20 overflow-hidden">
      {/* Décors (uniquement après idle) */}
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
            className="group relative mx-auto flex items-center justify-center rounded-full px-5 py-2
                       shadow-[inset_0_-10px_14px_#8fdfff26,inset_0_2px_6px_#ffffff55,0_6px_20px_rgba(37,99,235,.25)]
                       transition-shadow duration-500 ease-out
                       hover:shadow-[inset_0_-6px_12px_#8fdfff45,inset_0_2px_6px_#ffffff66,0_10px_28px_rgba(37,99,235,.35)]
                       bg-white/70  dark:bg-transparent"
            initial={{ y: -40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            {/* glow animé (bordure dégradée) */}
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

            <span className="relative z-10 text-sm font-semibold tracking-wide text-sky-700 dark:text-transparent dark:bg-gradient-to-r dark:from-sky-200 dark:via-sky-100 dark:to-blue-200 dark:bg-clip-text">
              {t.guarantee}
            </span>
          </motion.div>
        </Link>

        {/* Headline + mots flip */}
        <h1 className="mx-auto py-10 text-center font-bold text-2xl md:text-5xl lg:text-6xl xl:text-7xl leading-snug max-w-6xl bg-clip-text text-transparent bg-gradient-to-b from-neutral-900 to-neutral-700 dark:from-neutral-300 dark:to-white relative z-20">
          <span className="lg:block"> {t.headline}</span>

          <Component words={t.words} />
        </h1>
      </div>

      <StarClientsGoogle />

      <motion.p className="max-w-2xl text-center text-muted-foreground dark:text-neutral-200 max-sm:px-2 md:text-lg">
        {t.subtitle}
      </motion.p>

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
