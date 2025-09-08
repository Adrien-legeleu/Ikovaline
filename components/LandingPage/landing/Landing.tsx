'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import StarClientsGoogle from '@/components/StarClientsGoogle';
import Services from '@/components/LandingPage/servicesSection/Services';
import Link from 'next/link';

export default function HeroNoiseLight() {
  return (
    <section className="relative flex w-full items-center justify-center overflow-hidden bg-white px-4 py-20 md:py-40 dark:bg-black">
      <Background />

      <div className="relative z-10 mx-auto w-full   max-w-[1700px]">
        <StarClientsGoogle />

        <motion.h1
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="mt-2 text-center text-3xl font-extrabold tracking-tight text-slate-900 md:text-5xl lg:text-7xl dark:text-white"
        >
          De l’idée à un <br className="hidden sm:block" />
          projet réussi.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.15 }}
          className="mx-auto mt-4 max-w-xl text-center text-sm text-slate-600 md:text-xl dark:text-slate-300"
        >
          Ikovaline, conçoit des solutions digitales sur mesure pour développer
          vos projets et accélérer votre croissance digital.
        </motion.p>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: 0.25 }}
          className="mt-8 flex w-full flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <Link
            href="/contact"
            className="rounded-lg bg-primary px-6 py-3 text-base font-medium text-white hover:opacity-95"
          >
            Nous contacter
          </Link>
        </motion.div>

        {/* Visuel / screenshot */}
        <div className="z-40 mt-12 flex w-full   justify-center">
          <Services />
        </div>
      </div>
      <div className="absolute bottom-0 h-32  w-full bg-gradient-to-t from-white dark:from-black to-transparent" />
    </section>
  );
}

/* ---------- Fond bandes + bruit (light + dark) ---------- */
function Background() {
  const [strips, setStrips] = useState<number[]>([]);

  useEffect(() => {
    const calc = () => {
      const stripW = 80;
      const n = Math.ceil(window.innerWidth / stripW);
      setStrips(Array.from({ length: n }, (_, i) => i));
    };
    calc();
    window.addEventListener('resize', calc);
    return () => window.removeEventListener('resize', calc);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="absolute inset-0 z-0 flex [mask-image:radial-gradient(circle_at_center,white_0%,white_10%,transparent_90%)]"
    >
      <Noise />
      {strips.map((i) => (
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
      style={{
        backgroundImage: 'url(/noise.webp)',
        backgroundSize: '20%',
      }}
    />
  );
}
