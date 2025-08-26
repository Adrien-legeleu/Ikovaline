'use client';

import { motion } from 'framer-motion';
import { LiquidLink } from '../ui/liquid-link';

interface ICallToAction {
  title: string;
  desc: string;
  textBtn: string;
}

/** Palettes */
const ELECTRIC = 'rgba(0,168,232'; // #00A8E8
const ROYAL = 'rgba(37,99,235'; // #2563EB

export default function CallToAction({ title, desc, textBtn }: ICallToAction) {
  return (
    <section className="  py-32">
      {/* Backdrop global (halos bleus subtils) */}
      <div
        aria-hidden
        className="pointer-events-none relative mx-auto max-w-5xl"
      >
        <span
          className="absolute -top-28 left-1/2 z-0 h-[22rem] w-[22rem] -translate-x-1/2 rounded-full blur-[140px]"
          style={{
            background: `radial-gradient(closest-side, ${ELECTRIC},.28), ${ELECTRIC},0)`,
          }}
        />
        <span
          className="absolute -bottom-28 right-1/2 z-0 h-[26rem] w-[26rem] translate-x-1/2 rounded-full blur-[160px]"
          style={{
            background: `radial-gradient(closest-side, ${ROYAL},.22), ${ROYAL},0)`,
          }}
        />
      </div>

      {/* Carte “Liquid Glass” */}
      <div
        className={[
          'relative mx-auto max-w-5xl z-10 overflow-hidden rounded-[28px]',
          'px-4 xss:px-8 pt-24 md:pt-36 pb-12 md:pb-24 text-center',
          'backdrop-blur-2xl',
          // teinte base — zéro blanc en dark
          'bg-[radial-gradient(120%_120%_at_50%_0%,rgba(255,255,255,0.92),rgba(244,250,251,0.55))]',
          'dark:bg-[linear-gradient(180deg,rgba(8,12,18,0.90),rgba(8,12,18,0.62))]',
          // profondeur
          'shadow-[0_28px_90px_rgba(6,24,44,0.14),0_6px_16px_rgba(6,24,44,0.08)]',
        ].join(' ')}
        style={{
          // bordure conique façon verre (light)
          border: '1px solid transparent',
          backgroundImage:
            'radial-gradient(120% 120% at 50% 0%, rgba(255,255,255,.92), rgba(244,250,251,.52)),' + // contenu
            `conic-gradient(from 210deg, rgba(255,255,255,.85), ${ELECTRIC},.40), rgba(255,255,255,.55), ${ROYAL},.28), rgba(255,255,255,.85))`, // liseré
          backgroundClip: 'padding-box, border-box',
          // glow externe (plus présent, “brillant”)
          boxShadow: `
            0 0 38px ${ELECTRIC},.22),
            0 0 86px ${ROYAL},.22),
            0 0 140px ${ELECTRIC},.16)
          `,
        }}
      >
        {/* RIM override dark (aucun blanc) */}
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 hidden rounded-[28px] dark:block"
          style={{
            border: '1px solid transparent',
            backgroundImage:
              'linear-gradient(180deg, rgba(8,12,18,0.92), rgba(8,12,18,0.62)),' +
              `conic-gradient(from 210deg, ${ELECTRIC},.28), ${ROYAL},.22), ${ELECTRIC},.26))`,
            backgroundClip: 'padding-box, border-box',
            mixBlendMode: 'normal',
          }}
        />

        {/* Streak haut — bleu faiblement lumineux en dark */}
        <span className="pointer-events-none absolute left-6 right-6 top-3 h-6 rounded-full blur-[10px] bg-black/5 dark:bg-sky-400/12" />

        {/* Glow bas (royal/electric), légèrement plus fort */}
        <span
          aria-hidden
          className="pointer-events-none absolute -bottom-10 left-1/2 h-16 w-[82%] -translate-x-1/2 rounded-full blur-3xl"
          style={{
            background: `radial-gradient(ellipse at center, ${ELECTRIC},.62), ${ROYAL},.42), transparent 70%)`,
          }}
        />

        {/* Inset “liquid” bleu (effet vitre épaisse) */}
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-[28px]"
          style={{
            boxShadow: `
              inset 0 -22px 140px 0 ${ROYAL},.35),
              inset 0 -38px 46px 0 ${ELECTRIC},.40)
            `,
          }}
        />

        {/* Contenu */}
        <div className="relative z-10 mx-auto flex max-w-4xl flex-col items-center gap-6 sm:gap-8">
          <h2 className="text-3xl md:text-4xl lg:text-5xl 2xl:text-6xl font-bold text-neutral-900 dark:text-neutral-100">
            {title}
          </h2>

          <p className="max-w-2xl text-sm xss:text-base md:text-lg xl:text-xl 2xl:text-2xl text-neutral-800 dark:text-neutral-300">
            {desc}
          </p>

          <LiquidLink href="contact" className="z-10">
            {textBtn}
          </LiquidLink>
        </div>

        {/* Glow d’ambiance animé (sans blanchir le dark) */}
        <motion.div
          initial={{ opacity: 0.35 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, ease: 'easeOut', delay: 0.6 }}
          className="pointer-events-none absolute inset-0 rounded-[28px]"
          style={{
            boxShadow: `
              0 0 32px ${ELECTRIC},.28),
              0 0 72px ${ROYAL},.24),
              0 0 120px ${ELECTRIC},.18)
            `,
          }}
        />
      </div>
    </section>
  );
}
