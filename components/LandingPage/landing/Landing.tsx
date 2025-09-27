'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import { motion, useReducedMotion } from 'framer-motion';
import StarClientsGoogle from '@/components/StarClientsGoogle';
import Link from 'next/link';
import WhatsAppButton from '@/components/WhatsappButton';

/* ============================================================================
   1) Services en import dynamique avec skeleton de même taille (zéro CLS)
   -------------------------------------------------------------------------- */
const Services = dynamic(
  () => import('@/components/LandingPage/servicesSection/Services'),
  {
    ssr: false,
    // même emplacement / taille visuelle le temps du chargement
    loading: () => (
      <div className="w-full max-w-[1200px]">
        <div
          className="h-[420px] w-full rounded-2xl border border-black/10 bg-white/70 shadow-[0_10px_30px_-15px_rgba(0,0,0,.25)] 
                     dark:border-white/10 dark:bg-neutral-950/60 dark:shadow-[0_10px_30px_-15px_rgba(0,0,0,.6)]"
          aria-hidden
        />
      </div>
    ),
  }
);

/* ============================================================================
   2) Composant principal (design identique)
   -------------------------------------------------------------------------- */
export default function HeroNoiseLight() {
  const reduce = useReducedMotion();

  return (
    <section
      className="relative flex w-full items-center justify-center overflow-hidden bg-white px-4 py-20 md:py-40 dark:bg-black"
      // évite le coût de layout/painters hors-écran
      style={
        { contain: 'paint layout style', contentVisibility: 'auto' } as any
      }
    >
      <Background reduce={reduce} />

      <div className="relative z-10 mx-auto w-full max-w-[1700px]">
        <StarClientsGoogle />

        {/* Garder l’anim visible mais aucun blocage du paint */}
        <motion.h1
          initial={reduce ? undefined : { opacity: 0, y: 10 }}
          animate={reduce ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="mt-2 text-center text-3xl font-extrabold tracking-tight text-slate-900 md:text-5xl lg:text-7xl dark:text-white will-change-transform"
        >
          De l’idée à un <br className="hidden sm:block" />
          projet réussi.
        </motion.h1>

        <motion.p
          initial={reduce ? undefined : { opacity: 0, y: 10 }}
          animate={reduce ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.15 }}
          className="mx-auto mt-4 max-w-xl text-center text-sm text-slate-600 md:text-xl dark:text-slate-300 will-change-transform"
        >
          Ikovaline, conçoit des solutions digitales sur mesure pour développer
          vos projets et accélérer votre croissance digital.
        </motion.p>

        {/* CTA */}
        <motion.div
          initial={reduce ? undefined : { opacity: 0, y: 10 }}
          animate={reduce ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.25 }}
          className="mt-8 flex w-full flex-col items-center justify-center gap-4 sm:flex-row will-change-transform"
        >
          <Link
            href="/contact"
            className="rounded-lg bg-primary px-6 py-3 text-base font-semibold text-white hover:opacity-95"
          >
            Nous contacter
          </Link>
          <WhatsAppButton
            className="px-6 py-3 gap-2 rounded-lg flex items-center justify-center"
            message="Bonjour, je souhaite échanger avec vous, par messages ou par téléphone. Quand vous convient-il ?"
            label="WhatsApp"
          />
        </motion.div>

        {/* Visuel / screenshot (identique, juste lazy côté JS) */}
        <div className="z-40 my-12 flex w-full justify-center">
          <Services />
        </div>
      </div>

      <div
        className="pointer-events-none absolute bottom-0 h-32 w-full bg-gradient-to-t from-white to-transparent dark:from-black"
        aria-hidden
      />
    </section>
  );
}

/* ============================================================================
   3) Background — même rendu mais 100% CSS (zéro resize, zéro map)
   -------------------------------------------------------------------------- */
function Background({ reduce }: { reduce: boolean | null }) {
  return (
    <motion.div
      initial={reduce ? undefined : { opacity: 0 }}
      animate={reduce ? undefined : { opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="absolute inset-0 -z-10"
      aria-hidden
      style={{
        WebkitMaskImage:
          'radial-gradient(circle at center, white 0%, black 40%, transparent 90%)',
        maskImage:
          'radial-gradient(circle at center, white 0%, black 40%, transparent 90%)',
        willChange: 'opacity, transform',
      }}
    >
      {/* couche light */}
      <div
        className="absolute inset-0 dark:hidden"
        style={{
          backgroundImage:
            'linear-gradient(to bottom, rgba(14,165,233,0.20), rgba(14,165,233,0.20)), ' +
            'repeating-linear-gradient(90deg, #f8fafc 0 30px, #ffffff 80px 40px)',
        }}
      />

      {/* couche dark */}
      <div
        className="absolute inset-0 hidden dark:block"
        style={{
          backgroundImage:
            'linear-gradient(to bottom, rgba(14,165,233,0.12), rgba(14,165,233,0.12)), ' +
            'repeating-linear-gradient(90deg, #0a0a0a 0 20px, #000000 80px 40px)',
        }}
      />

      {/* bruit identique */}
      <div
        className="absolute inset-0 h-full w-full scale-[1.2] opacity-[0.05] dark:opacity-[0.07]"
        style={{ backgroundImage: 'url(/noise.webp)', backgroundSize: '20%' }}
      />
    </motion.div>
  );
}
