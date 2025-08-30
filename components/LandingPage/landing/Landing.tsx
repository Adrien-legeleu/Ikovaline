'use client';
import { TextAnimate } from '@/components/ui/text-animate';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { IconApps, IconMessage2, IconShieldCheck } from '@tabler/icons-react';
import dynamic from 'next/dynamic';
import { ParticleTextEffect } from '../ParticleWord';
import { LiquidLink } from '@/components/ui/liquid-link';
import { usePathname } from 'next/navigation';
import StarClientsGoogle from '@/components/StarClientsGoogle';

const Glow = dynamic(() => import('@/components/ui/glow'), { ssr: false });

/* -------------------- Dictionnaire inline (FR/EN) -------------------- */
const DICT = {
  fr: {
    guarantee: 'Garantie de résultats',
    headline: 'Boostez votre visibilité digitale',
    subtitle:
      'De la stratégie au développement, Ikovaline conçoit des solutions digitales sur mesure pour accélérer votre croissance.',
    ctaAudit: 'Demander un audit gratuit',
    ctaServices: 'Voir nos services',
  },
  en: {
    guarantee: 'Results guarantee',
    headline: 'Boost your digital visibility',
    subtitle:
      'From strategy to development, Ikovaline designs tailored digital solutions to accelerate your growth.',
    ctaAudit: 'Request a free audit',
    ctaServices: 'See our services',
  },
} as const;

export default function Landing() {
  const pathname = usePathname();
  const isEN = /^\/en(\/|$)/.test(pathname);
  const t = isEN ? DICT.en : DICT.fr;

  return (
    <div className="relative flex flex-col items-center justify-center gap-5 2xl:gap-0 py-20 overflow-hidden">
      {/* Glow décoratif */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <Glow
          variant="above"
          className="animate-appear-zoom opacity-0 [animation-delay:1000ms]"
        />
      </div>

      {/* Badge Garantie */}
      <div className="z-10 flex flex-col -gap-5 2xl:gap-0">
        <Link
          href="/about/#notre-garantie"
          className="mx-auto flex items-center justify-center"
        >
          <motion.div
            className="group relative mx-auto flex items-center justify-center rounded-full px-5 py-2
             shadow-[inset_0_-10px_14px_#8fdfff26,inset_0_2px_6px_#ffffff55,0_6px_20px_rgba(37,99,235,.25)]
             transition-shadow duration-500 ease-out
             hover:shadow-[inset_0_-6px_12px_#8fdfff45,inset_0_2px_6px_#ffffff66,0_10px_28px_rgba(37,99,235,.35)]
             bg-white/70 backdrop-blur-xl dark:bg-transparent"
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
            {/* halo externe bleu */}
            <span
              aria-hidden
              className="absolute -inset-6 rounded-full blur-3xl 
               bg-[radial-gradient(circle_at_center,rgba(0,168,255,.55),rgba(37,99,235,.35),transparent_75%)]
               opacity-50 dark:opacity-40"
            />
            {/* texte garantie */}
            <IconShieldCheck className="ml-1 size-4 stroke-sky-600 dark:stroke-sky-300 drop-shadow-[0_0_6px_rgba(56,130,246,.7)] group-hover:translate-x-0.5 transition-transform duration-300 ease-in-out" />
            <hr className="mx-2 h-4 w-px shrink-0 bg-sky-500/80 dark:bg-sky-300/80" />
            <span className="relative z-10 text-sm font-semibold tracking-wide text-sky-700 dark:text-transparent dark:bg-gradient-to-r dark:from-sky-200 dark:via-sky-100 dark:to-blue-200 dark:bg-clip-text">
              {t.guarantee}
            </span>
          </motion.div>
        </Link>

        {/* Headline */}
        <motion.h1
          initial={false}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2 }}
          className="mx-auto pt-6 text-center font-bold md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl text-4xl xl:!font-semibold leading-[50px] md:leading-[60px] lg:!leading-[70px] xl:!leading-[85px] 2xl:!leading-[115px] max-w-4xl xl:max-w-6xl 2xl:max-w-[1450px] bg-clip-text text-transparent bg-gradient-to-b from-neutral-900 via-neutral-700 to-neutral-800 dark:from-neutral-300 dark:via-white dark:to-white relative z-20"
        >
          {t.headline}{' '}
          <span className="inline-flex p-2 align-middle">
            <ParticleTextEffect />
          </span>
        </motion.h1>
      </div>

      {/* Avis clients */}
      <StarClientsGoogle />

      {/* Sous-titre animé */}
      <TextAnimate
        animation="blurInUp"
        by="word"
        className="max-w-2xl text-center text-muted-foreground dark:text-neutral-400 max-sm:px-2 xs:text-xs md:text-lg"
      >
        {t.subtitle}
      </TextAnimate>

      {/* Boutons CTA */}
      <div className="mt-8 flex items-center justify-center gap-5 max-sm:flex-col-reverse max-sm:gap-3 2xl:mt-8">
        <LiquidLink href="/contact" className="z-10">
          <span className="flex items-center justify-center gap-2">
            <IconMessage2 aria-hidden />
            {t.ctaAudit}
          </span>
        </LiquidLink>
        <LiquidLink href="/nos-services" className="z-10">
          <span className="flex items-center justify-center gap-2">
            <IconApps aria-hidden />
            {t.ctaServices}
          </span>
        </LiquidLink>
      </div>
    </div>
  );
}
