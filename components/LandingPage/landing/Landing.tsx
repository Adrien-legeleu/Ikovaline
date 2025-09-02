'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import StarClientsGoogle from '@/components/StarClientsGoogle';
import Image from 'next/image';
import Link from 'next/link';

export default function HeroNoiseLight() {
  return (
    <section className="relative flex w-full items-center justify-center overflow-hidden bg-white px-4 py-20 md:py-40 dark:bg-black">
      <Background />

      <div className="relative z-10 mx-auto w-full max-w-7xl">
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
          De la stratégie au développement, Ikovaline conçoit des solutions
          digitales sur mesure pour accélérer votre croissance.
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
        <div className="z-40 mt-12 flex w-full bg-white dark:bg-black justify-center">
          <motion.div
            initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 0.35, delay: 0.3 }}
            className="relative w-full overflow-hidden rounded-xl shadow-2xl ring-1 ring-black/5 dark:ring-white/10 [mask-image:linear-gradient(to_bottom,white,white_45%,transparent)]"
          >
            <Image
              src="/heroImage.png" // ← place ton image ici
              alt="Aperçu du produit"
              className="h-auto w-full object-cover"
              width={1280}
              height={720}
              priority
            />
            {/* léger fondu pour la lisibilité (plus marqué en dark) */}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent dark:from-black/40" />
          </motion.div>
        </div>
      </div>
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
      className="absolute inset-0 z-0 flex [mask-image:radial-gradient(circle_at_center,white_0%,white_32%,transparent_70%)]"
    >
      <Noise />
      {strips.map((i) => (
        <div
          key={i}
          className="h-full w-20 bg-gradient-to-r from-slate-100 to-white shadow-[2px_0_0_0_#e5e7eb] dark:from-neutral-900 dark:to-neutral-950 dark:shadow-[2px_0_0_0_#262626]"
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
