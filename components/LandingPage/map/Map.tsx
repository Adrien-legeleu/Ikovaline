'use client';
import dynamic from 'next/dynamic';

import { motion } from 'motion/react';

const Globe = dynamic(
  () => import('@/components/magicui/globe').then((m) => m.Globe),
  {
    ssr: false,
    loading: () => (
      <div className="h-[28rem] md:h-[40rem] w-full rounded-none" />
    ),
  }
);

export default function Map() {
  return (
    <div className="w-full bg-white dark:bg-black">
      {/* Header */}
      <section className="max-w-4xl mx-auto px-6 pt-24 pb-10 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25 }}
          className="text-balance  bg-gradient-to-b from-black to-neutral-600 bg-clip-text  text-3xl font-semibold  md:text-4xl lg:text-5xl 2xl:text-6xl text-transparent  dark:from-white dark:to-neutral-400"
        >
          Ikovaline accompagne ses clients en France et à l’international.
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="mt-6 text-lg leading-relaxed text-neutral-700 dark:text-neutral-300"
        >
          De Paris à Londres, Dubaï, Kinshasa, Montréal et Genève, nous aidons
          les entreprises à gagner en visibilité, automatiser leurs process et
          mieux convertir avec des sites, applications et produits SaaS conçus
          pour scaler.
        </motion.p>
      </section>

      {/* Globe */}
      <section className="relative max-w-7xl mx-auto px-6">
        <div className="relative w-full h-[28rem] md:h-[32rem]">
          <Globe />
        </div>
      </section>
    </div>
  );
}
