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
import Link from 'next/link';
import WhatsAppButton from '@/components/WhatsappButton';
type DeferredStyle = React.CSSProperties & {
  contentVisibility?: string;
  contain?: string;
  containIntrinsicSize?: string;
};

export default function HeroNoiseLight() {
  const reduce = useReducedMotion();

  return (
    <section className="relative flex w-full items-center justify-center overflow-hidden bg-white px-4 py-20 md:py-40 dark:bg-black">
      <Background reduce={reduce} />

      <div className="relative z-10 mx-auto w-full max-w-[1700px]">
        <StarClientsGoogle />

        <motion.h1
          initial={reduce ? undefined : { opacity: 0, y: 10 }}
          animate={reduce ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="mt-2 text-center text-3xl font-extrabold tracking-tight text-slate-900 md:text-5xl lg:text-7xl dark:text-white"
        >
          De l’idée à un <br className="hidden sm:block" />
          projet réussi.
        </motion.h1>

        <motion.p
          initial={reduce ? undefined : { opacity: 0, y: 10 }}
          animate={reduce ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.15 }}
          className="mx-auto mt-4 max-w-xl text-center text-sm text-slate-600 md:text-xl dark:text-slate-300"
        >
          Ikovaline, conçoit des solutions digitales sur mesure pour développer
          vos projets et accélérer votre croissance digital.
        </motion.p>

        {/* CTA */}
        <motion.div
          initial={reduce ? undefined : { opacity: 0, y: 10 }}
          animate={reduce ? undefined : { opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.25 }}
          className="mt-8 flex w-full flex-col items-center justify-center gap-4 sm:flex-row"
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
      <div className="absolute inset-0 md:bg-primary/30 bg-primary/20" />
      {/* Bruit */}
      <Noise />
      {/* Stripes (DOM minimal, reflow throttlé) */}
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="h-full w-20 bg-gradient-to-r border-primary/30 border-[0.5px] from-slate-100 to-white shadow-[2px_0_0_0_#e5e7eb] dark:from-neutral-900 dark:to-neutral-950 dark:shadow-[2px_0_0_0_#262626]"
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
