'use client';

import Link from 'next/link';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import dynamic from 'next/dynamic';

import { removeAccents } from '@/components/pageSatellite/CityAround';
import { motion } from 'motion/react';
import { cn } from '@/lib/utils';
import { Highlighter } from '@/components/magicui/highlighter';
import { AnimatePresence } from 'framer-motion';

const Globe = dynamic(
  () => import('@/components/magicui/globe').then((m) => m.Globe),
  {
    ssr: false,
    loading: () => (
      <div className="h-[28rem] md:h-[40rem] w-full rounded-none" />
    ),
  }
);

/* ----------------------------- Données villes ----------------------------- */
const citiesEssonne = [
  'Bailly-Romainvilliers',
  'Massy',
  'Evry',
  'Verrières-le-Buisson',
  'Saclay',
  'Courcouronnes',
  'Villeneuve-Saint-Georges',
  'Yerres',
  'Marcoussis',
  'Vauhallan',
  'Wissous',
  'Palaiseau',
  'Corbeil-Essonnes',
  'Savigny-sur-Orge',
  'Sainte-Geneviève-des-Bois',
  'Viry-Châtillon',
  'Athis-Mons',
  'Draveil',
];
const citiesHautsSeine = [
  'Neuilly-sur-Seine',
  'Courbevoie',
  'Levallois-Perret',
  'Nanterre',
  'Suresnes',
  'Clamart',
  'Colombes',
  'Montrouge',
  'Asnières-sur-Seine',
  'Malakoff',
  'Gennevilliers',
  'Clichy',
  'Meudon',
  'Puteaux',
  'Bagneux',
  'Issy-les-Moulineaux',
];
const citiesSeineEtMarne = [
  'Serris',
  'Chessy',
  'Bussy-Saint-Georges',
  'Montévrain',
  'Bailly-Romainvilliers',
  'Lagny-sur-Marne',
  'Torcy',
  'Lognes',
  'Champs-sur-Marne',
  'Meaux',
];

/* ------------------------------- Composant principal ------------------------------- */
export default function Map() {
  type Depart = 'essonne' | 'hauts-de-seine' | 'seine-et-marne';
  const [depart, setDepart] = useState<Depart>('essonne');

  const departs: { slug: Depart; name: string }[] = [
    { slug: 'essonne', name: 'Essonne' },
    { slug: 'hauts-de-seine', name: 'Hauts-de-Seine' },
    { slug: 'seine-et-marne', name: 'Seine-et-Marne' },
  ];

  /* ---------------------- Segmented control slider ---------------------- */
  const groupRef = useRef<HTMLDivElement | null>(null);
  const buttonRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const [slider, setSlider] = useState({ width: 0, left: 0 });

  const computeSlider = () => {
    const index = departs.findIndex((d) => d.slug === depart);
    const el = buttonRefs.current[index];
    if (el) setSlider({ width: el.offsetWidth, left: el.offsetLeft });
  };

  useLayoutEffect(() => {
    computeSlider();
  }, [depart]);

  useEffect(() => {
    const onResize = () => computeSlider();
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  /* ---------------------- Liste villes ---------------------- */

  const renderCities = () => {
    const arr =
      depart === 'essonne'
        ? citiesEssonne
        : depart === 'hauts-de-seine'
          ? citiesHautsSeine
          : citiesSeineEtMarne;

    return (
      <AnimatePresence mode="wait">
        <motion.div
          key={depart} // change l’animation quand on change de département
          initial={{ opacity: 0, y: 30, filter: 'blur(20px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          exit={{ opacity: 0, y: -30, filter: 'blur(20px)' }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="flex flex-wrap gap-5 justify-center max-w-3xl"
        >
          {arr.map((c, i) => (
            <motion.div
              key={c}
              initial={{ opacity: 0, y: 10, filter: 'blur(10px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
              className="my-1"
            >
              <Link
                href={`/agence-web-${removeAccents(c)}`}
                className="px-4 py-2 rounded-xl border text-sm md:text-base
                         border-neutral-100 dark:border-neutral-900
                         bg-white/80 dark:bg-black/80
                         text-neutral-900 dark:text-neutral-100
                         hover:bg-primary/5 dark:hover:bg-primary/10
                         transition-all duration-200"
              >
                {c}
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>
    );
  };

  return (
    <div className="w-full bg-white dark:bg-black">
      {/* Header */}
      <header className="max-w-4xl mx-auto px-6 pt-24 pb-10 text-center">
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
          De Paris à Londres, Dubaï, Kinshasa, Brazzaville et Berne, nous aidons
          les entreprises à gagner en visibilité, automatiser leurs process et
          mieux convertir — avec des sites, applications et produits SaaS conçus
          pour scaler.
        </motion.p>
      </header>

      {/* Globe */}
      <section className="relative max-w-7xl mx-auto px-6">
        <div className="relative w-full h-[28rem] md:h-[32rem]">
          <Globe />
        </div>
      </section>

      {/* Agencies */}
      <section className="relative overflow-hidden z-10 mx-auto max-w-7xl px-4 py-20 md:py-32">
        <Background />
        <div className="">
          {/* Contenu */}
          <div className="relative z-20 flex flex-col items-center gap-8 text-center">
            <h3 className="text-balance pb-1  text-2xl font-semibold  md:text-3xl lg:text-4xl 2xl:text-5xl ">
              <Highlighter action="highlight" color="#87CEFA">
                Nos agences web{' '}
              </Highlighter>
            </h3>

            {/* Segmented control */}
            <div
              ref={groupRef}
              className="relative inline-flex items-center rounded-xl border border-neutral-200 dark:border-neutral-900 bg-white/90 dark:bg-black/70 p-1"
            >
              {/* Slider */}
              <motion.span
                layout
                transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                className="absolute top-1/2 !-translate-y-1/2  rounded-xl bg-primary/10"
                style={{
                  left: slider.left,
                  width: slider.width,
                  height: 'calc(100% - 8px)',
                }}
              />
              {departs.map((d, i) => {
                const isActive = depart === d.slug;
                return (
                  <button
                    key={d.slug}
                    ref={(el) => {
                      buttonRefs.current[i] = el; // ✅ correction : ne rien return
                    }}
                    onClick={() => setDepart(d.slug)}
                    className={cn(
                      'relative z-10 rounded-xl px-5 py-2 text-sm md:text-base transition-colors',
                      isActive
                        ? 'text-primary font-semibold'
                        : 'text-neutral-700 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-neutral-100'
                    )}
                  >
                    {d.name}
                  </button>
                );
              })}
            </div>

            {/* Villes */}
            {renderCities()}

            <p className="text-center text-lg leading-8 text-neutral-900 dark:text-neutral-300 mt-8 max-w-2xl">
              Ikovaline est une agence web qui accompagne les entreprises dans
              toute la France, avec un ancrage fort en Essonne et en
              Île-de-France, à travers la{' '}
              <Link
                href="/nos-services/creation-sites-web-vitrine-e-commerce"
                className="text-primary underline-offset-4 hover:underline"
              >
                création de sites web{' '}
              </Link>{' '}
              et{' '}
              <Link
                href="/nos-services"
                className="text-primary underline-offset-4 hover:underline"
              >
                d&apos;autres solutions digitales sur mesure.
              </Link>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
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
      className="absolute inset-0 z-0 flex [mask-image:radial-gradient(circle_at_center,white_10%,white_32%,transparent_40%)]"
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
