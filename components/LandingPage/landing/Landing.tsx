'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import StarClientsGoogle from '@/components/StarClientsGoogle';
import dynamic from 'next/dynamic';

// skeleton identique en taille → pas de shift, LCP ultra rapide
const Services = dynamic(
  () => import('@/components/LandingPage/servicesSection/Services'),
  {
    ssr: false,
    loading: () => (
      <div className="w-full px-4">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2  lg:grid-cols-3 xl:gap-10">
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className="h-96 rounded-[3rem] bg-white dark:bg-neutral-900 animate-pulse"
            />
          ))}
        </div>
      </div>
    ),
  }
);
import Link from 'next/link';
import WhatsAppButton from '@/components/WhatsappButton';
import { InteractiveHoverButton } from '@/components/ui/interactive-hover-button';

export default function HeroNoiseLight() {
  const reduce = useReducedMotion();

  return (
    <section className="relative flex w-full items-center justify-center bg-white px-4 py-20 md:py-40 dark:bg-black">
      <div
        className="pointer-events-none absolute inset-0 overflow-hidden"
        aria-hidden
      >
        <Background reduce={reduce} />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-[1700px]">
        <StarClientsGoogle />

        <motion.h1
          initial={reduce ? undefined : { opacity: 0, y: 10 }}
          animate={reduce ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="mt-3 text-center sm:text-7xl text-5xl font-bold tracking-[0.02em] text-slate-900 md:text-8xl lg:text-[6.5rem] dark:text-white"
        >
          De l’idée à un <br className="hidden sm:block" />
          projet réussi.
        </motion.h1>

        <motion.p
          initial={reduce ? undefined : { opacity: 0, y: 10 }}
          animate={reduce ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.15 }}
          className="mx-auto mt-8 max-w-xl text-center text-sm text-slate-600 md:text-lg dark:text-slate-300"
        >
          Ikovaline développe vos projets Web, App & SaaS sur mesure, de l’idée
          à la mise en ligne.
        </motion.p>

        {/* CTA */}
        <motion.div
          initial={reduce ? undefined : { opacity: 0, y: 10 }}
          animate={reduce ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.25 }}
          className="mt-8 flex w-full  items-center justify-center gap-4 flex-row"
        >
          <Link href="/signup">
            <InteractiveHoverButton> Lancer mon projet</InteractiveHoverButton>
          </Link>
          <WhatsAppButton
            className="px-6 py-3 sm:hidden gap-2 rounded-lg flex items-center justify-center"
            message="Bonjour, je souhaite échanger avec vous, par messages ou par téléphone. Quand vous convient-il ?"
            label="WhatsApp"
          />
        </motion.div>
        <div className="z-40 my-12 flex w-full justify-center">
          <Services />
        </div>
      </div>

      <div
        className="absolute bottom-0 h-32 w-full bg-gradient-to-t from-white to-transparent dark:from-black"
        aria-hidden
      />
    </section>
  );
}

/* ---------- Fond bandes + bruit (optimisé, même rendu) ---------- */
function Background({ reduce }: { reduce: boolean | null }) {
  const [count, setCount] = useState<number>(0);
  const rafId = useRef<number | null>(null);

  useEffect(() => {
    const calc = () => {
      const stripW = 80;
      const n = Math.ceil(window.innerWidth / stripW);
      setCount(n);
    };
    const onResize = () => {
      if (rafId.current) cancelAnimationFrame(rafId.current);
      rafId.current = requestAnimationFrame(calc);
    };
    calc();
    window.addEventListener('resize', onResize, { passive: true });
    return () => {
      if (rafId.current) cancelAnimationFrame(rafId.current);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return (
    <motion.div
      initial={reduce ? undefined : { opacity: 0 }}
      animate={reduce ? undefined : { opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="absolute inset-0 z-0 flex [mask-image:radial-gradient(circle_at_center,white_0%,black_40%,transparent_90%)]"
      aria-hidden
    >
      {/* Fond bleu */}
      <div className="absolute inset-0 md:bg-primary/70 md:dark:bg-primary/50 bg-primary/40" />
      {/* Bruit */}
      <Noise />
      {/* Stripes (DOM minimal, reflow throttlé) */}
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="h-full w-20 bg-gradient-to-r border-primary/20 dark:border-primary/15 border-[0.5px] from-slate-100 to-white  dark:from-neutral-900 dark:to-neutral-950 shadow-[2px_0_0_0_#262626]"
        />
      ))}
    </motion.div>
  );
}

function Noise() {
  return (
    <div
      className="absolute inset-0 h-full w-full scale-[1.2] opacity-[0.05] [mask-image:radial-gradient(#fff,transparent,75%)] dark:opacity-[0.07]"
      style={{ backgroundImage: 'url(/noise.webp)', backgroundSize: '20%' }}
    />
  );
}
