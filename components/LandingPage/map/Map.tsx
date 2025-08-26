'use client';

import dynamic from 'next/dynamic';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { IconMessage } from '@tabler/icons-react';

import { ContainerScroll, CardSticky } from '../impact/CardStack';
import { LiquidLink } from '@/components/ui/liquid-link';
import { removeAccents } from '@/components/pageSatellite/CityAround';

const FranceMap = dynamic(() => import('@/components/ui/france-map'), {
  ssr: false,
  loading: () => <p>Chargement de la carte...</p>,
});

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

const GlassCard: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className = '' }) => (
  <div
    className={[
      'relative z-10 overflow-hidden rounded-[28px] p-5',
      'backdrop-blur-2xl',

      /* ——— Light (inchangé/clean) ——— */
      'bg-[radial-gradient(120%_120%_at_50%_0%,rgba(255,255,255,0.92),rgba(245,248,252,0.55))]',

      /* ——— Dark = noir fumé (aucun blanc) ——— */
      'dark:bg-[linear-gradient(180deg,rgba(8,12,18,0.80),rgba(8,12,18,0.58))]',
      'border border-black/5 dark:border-[rgba(56,130,246,0.14)]',

      /* profondeur (pas de glow blanc en dark) */
      'shadow-[0_28px_90px_rgba(6,24,44,0.14),0_6px_16px_rgba(6,24,44,0.08)]',
      'dark:shadow-[0_18px_60px_rgba(2,6,12,0.65),inset_0_1px_0_rgba(59,130,246,0.10)]',
      className,
    ].join(' ')}
  >
    {/* RIM & reflets — LIGHT */}
    <span
      className="pointer-events-none absolute inset-0 rounded-[28px] block dark:hidden"
      style={{
        border: '1px solid transparent',
        backgroundImage:
          'linear-gradient(135deg,rgba(255,255,255,.92),rgba(245,248,252,.52)),' +
          'conic-gradient(from 200deg,rgba(255,255,255,.85),rgba(59,130,246,.35),rgba(255,255,255,.55),rgba(59,130,246,.25),rgba(255,255,255,.85))',
        backgroundClip: 'padding-box,border-box',
      }}
    />

    {/* RIM & reflets — DARK (teinte bleue, AUCUN blanc) */}
    <span
      className="pointer-events-none absolute inset-0 hidden rounded-[28px] opacity-90 dark:block"
      style={{
        border: '1px solid transparent',
        backgroundImage:
          'linear-gradient(135deg,rgba(8,12,18,0.92),rgba(8,12,18,0.55)),' + // base noire
          // léger liseré bleu
          'conic-gradient(from 210deg,rgba(37,99,235,.22),rgba(56,189,248,.18),rgba(37,99,235,.22))',
        backgroundClip: 'padding-box,border-box',
        // surtout PAS screen/plus-lighter qui blanchissent sur noir
        mixBlendMode: 'normal',
      }}
    />

    {/* STREAK haut — remplace le blanc par un bleu très faible en dark */}
    <span className="pointer-events-none absolute left-6 right-6 top-2 h-6 rounded-full blur-[10px] bg-white/70 dark:bg-sky-400/15" />

    {/* Glow bas bleu (sans blanc) */}
    <span className="pointer-events-none absolute -bottom-10 left-1/2 h-16 w-[82%] -translate-x-1/2 rounded-full blur-3xl bg-[radial-gradient(ellipse_at_center,rgba(56,189,248,.55),rgba(37,99,235,.38),transparent_70%)] dark:opacity-80" />

    {/* Vignette d’épaisseur (noir en dark) */}
    <span className="pointer-events-none absolute inset-0 rounded-[28px] ring-1 ring-black/0 shadow-[inset_0_1px_0_rgba(255,255,255,.75),inset_0_-1px_0_rgba(0,0,0,.08)] dark:shadow-[inset_0_1px_0_rgba(37,99,235,.14),inset_0_-1px_0_rgba(0,0,0,.6)]" />

    {/* grain subtil (bleuté en dark, pas blanc) */}
    <span
      className="pointer-events-none absolute inset-0 opacity-[.07] dark:opacity-[.05] mix-blend-normal"
      style={{
        background:
          'radial-gradient(120% 120% at 50% 0%, rgba(2,6,12,0), rgba(2,6,12,.08)),' +
          'url("data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 width=%27120%27 height=%27120%27 viewBox=%270 0 120 120%27%3E%3Cfilter id=%27n%27%3E%3CfeTurbulence type=%27fractalNoise%27 baseFrequency=%270.8%27 numOctaves=%272%27 stitchTiles=%27stitch%27/%3E%3C/filter%3E%3Crect width=%27120%27 height=%27120%27 filter=%27url(%23n)%27 fill=%27%230a1220%27 fill-opacity=%270.12%27/%3E%3C/svg%3E")',
      }}
    />

    <div className="relative">{children}</div>
  </div>
);

/* ------------------------------- Composant -------------------------------- */
export default function Map() {
  type Depart = 'essonne' | 'hauts-de-seine' | 'seine-et-marne';
  const [depart, setDepart] = useState<Depart>('essonne');

  const departs: { slug: Depart; name: string }[] = [
    { slug: 'essonne', name: 'Essonne' },
    { slug: 'hauts-de-seine', name: 'Hauts-de-Seine' },
    { slug: 'seine-et-marne', name: 'Seine et Marne' },
  ];

  // refs pour positions des boutons (slider liquide sous l’actif)
  // en haut du composant :
  const groupRef = useRef<HTMLDivElement | null>(null);
  const buttonRefs = useRef<Array<HTMLButtonElement | null>>([]);

  const [slider, setSlider] = useState({ width: 0, left: 0 });

  const computeSlider = () => {
    const index = departs.findIndex((d) => d.slug === depart);
    const el = buttonRefs.current[index];
    const group = groupRef.current;
    if (el && group) {
      const left = el.offsetLeft; // relatif au conteneur
      setSlider({ width: el.offsetWidth, left });
    }
  };

  useLayoutEffect(() => {
    // init après paint
    const id = requestAnimationFrame(computeSlider);
    return () => cancelAnimationFrame(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useLayoutEffect(() => {
    computeSlider();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [depart]);

  useEffect(() => {
    const onResize = () => computeSlider();
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const renderCities = () => {
    const arr =
      depart === 'essonne'
        ? citiesEssonne
        : depart === 'hauts-de-seine'
          ? citiesHautsSeine
          : citiesSeineEtMarne;

    return (
      <div className="flex flex-wrap gap-4 justify-center max-w-2xl">
        {arr.map((c, i) => (
          <Link
            key={i}
            href={`/agence-web-${removeAccents(c)}`}
            className={[
              'px-3 py-1 rounded-full flex items-center gap-2 border shadow-md backdrop-blur-xl transition-shadow',
              'border-white/35 dark:border-white/10',
              'bg-white/75 dark:bg-neutral-900/60',
              'hover:shadow-[0_10px_40px_rgba(59,130,246,.25)]',
            ].join(' ')}
          >
            <span className="h-2 w-2 rounded-full bg-[radial-gradient(circle_at_40%_40%,#22d3ee,#3b82f6_70%)]" />
            {c}
          </Link>
        ))}
      </div>
    );
  };

  return (
    <div className="py-40 w-full space-y-10 place-content-center relative">
      {/* Halo bleu perçant centré (pas en haut) */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background: [
            'radial-gradient(800px 380px at 50% 58%, rgba(62,119,255,.22), rgba(30,144,255,.18), rgba(34,211,238,.12), rgba(12,18,28,0) 70%)',
            'radial-gradient(1200px 600px at 50% 50%, rgba(56,189,248,.10), rgba(59,130,246,.06), rgba(12,18,28,0))',
          ].join(','),
        }}
      />

      <header className="max-w-xl mx-auto px-5 text-center">
        <h2 className="font-bold text-4xl dark:text-white text-black">
          Ikovaline accompagne ses clients partout en France.
        </h2>
        <p className="text-md md:text-lg text-neutral-500 max-w-2xl mx-auto py-4">
          De Paris à Marseille, en passant par Lyon ou Bordeaux, nous aidons les
          entreprises à se rendre visibles, à automatiser, et à mieux convertir.
        </p>
      </header>

      {/* Carte + 4 bulles glass */}
      <div className="relative">
        <div className="max-md:overflow-hidden relative w-full py-20">
          <FranceMap
            dots={[
              { start: { lat: 48.4, lng: 2.3 }, end: { lat: 45.3, lng: 3.8 } },
              { start: { lat: 48.4, lng: 2.3 }, end: { lat: 43, lng: 1.5 } },
              { start: { lat: 48.4, lng: 2.3 }, end: { lat: 44.2, lng: 0.1 } },
              { start: { lat: 48.4, lng: 2.3 }, end: { lat: 47.1, lng: -1.2 } },
            ]}
          />
        </div>

        {/* Mobile cards (déjà glassy) */}
        <BlocContanerScrollMobile />

        {/* Desktop cards : effet liquid glass plus marqué en light */}
        <div className="max-md:hidden">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="md:absolute relative xl:top-5 md:top-10 md:left-5 lg:left-10 xl:left-32 z-20 max-w-[295px] lg:max-w-sm xl:max-w-md"
          >
            <GlassCard>
              <h3 className="text-sm lg:text-md xl:text-xl font-semibold">
                Votre site vous apporte-t-il vraiment des clients ?
              </h3>
              <p className="text-xs xl:text-sm">
                Nous concevons des sites clairs, modernes et pensés pour
                convertir.
              </p>
            </GlassCard>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut', delay: 0.1 }}
            className="md:absolute relative md:top-28 xl:top-32 xl:right-20 md:right-10 lg:right-16 z-20 max-w-[295px] lg:max-w-sm xl:max-w-md"
          >
            <GlassCard>
              <h3 className="text-sm lg:text-md xl:text-xl font-semibold">
                Personne ne vous trouve sur Google ?
              </h3>
              <p className="text-xs xl:text-sm">
                On booste votre visibilité avec des stratégies SEO &amp; SEA
                efficaces.
              </p>
            </GlassCard>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut', delay: 0.2 }}
            className="md:absolute relative md:bottom-20 xl:bottom-40 md:right-16 lg:right-24 xl:right-32 z-20 max-w-[295px] lg:max-w-sm xl:max-w-md"
          >
            <GlassCard>
              <h3 className="text-sm lg:text-md xl:text-xl font-semibold">
                Vous passez trop de temps sur des tâches répétitives ?
              </h3>
              <p className="text-xs xl:text-sm">
                Automatisations sur mesure pour gagner du temps et scaler sans
                stress.
              </p>
            </GlassCard>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut', delay: 0.3 }}
            className="md:absolute relative md:bottom-[35%] lg:bottom-[40%] md:left-12 lg:left-20 z-20 max-w-[295px] lg:max-w-sm xl:max-w-md"
          >
            <GlassCard>
              <h3 className="text-sm lg:text-md xl:text-xl font-semibold">
                Pas de stratégie digitale claire ?
              </h3>
              <p className="text-xs xl:text-sm">
                On vous guide étape par étape, avec des actions concrètes et
                mesurables.
              </p>
            </GlassCard>
          </motion.div>
        </div>
      </div>

      {/* Segmented control : SEUL l’actif a le “liquid glass” qui glisse */}
      <section className="flex items-center justify-center px-5 gap-10 flex-col max-w-2xl mx-auto">
        <h2 className="text-2xl font-semibold text-center bg-clip-text text-transparent bg-gradient-to-b from-neutral-900 via-neutral-800 to-neutral-800 dark:from-neutral-800 dark:via-white dark:to-white  py-2 md:text-3xl lg:text-4xl max-w-4xl mx-auto">
          Nos agences web
        </h2>

        <div className="flex items-center justify-center flex-col gap-5">
          <div
            ref={groupRef}
            className="relative inline-flex items-center rounded-full p-2 overflow-hidden
             border border-white/50 dark:border-white/10
             backdrop-blur-xl
             bg-[linear-gradient(135deg,rgba(255,255,255,.48),rgba(255,255,255,.16))]
             dark:bg-[linear-gradient(135deg,rgba(10,12,16,.70),rgba(10,12,16,.38))]
             shadow-[0_18px_60px_rgba(6,24,44,.10)]"
            style={{ minWidth: 260 }}
          >
            {/* Capsule active — liquid glass */}
            <motion.div
              className={[
                'absolute top-1/2 -translate-y-1/2 rounded-full z-0 overflow-hidden',
                'border border-white/60 dark:border-white/8',
                'shadow-[inset_0_1px_0_rgba(255,255,255,.65),0_14px_46px_rgba(37,99,235,.35)]',
                // light
                'bg-[linear-gradient(135deg,rgba(255,255,255,.86),rgba(255,255,255,.30))]',
                // dark, plus sombre
                'dark:bg-[linear-gradient(135deg,rgba(8,10,14,.92),rgba(8,10,14,.58))]',
                'backdrop-blur-[14px]',
              ].join(' ')}
              animate={{ width: slider.width, left: slider.left }}
              style={{ height: 'calc(100% - 8px)' }}
              transition={{ type: 'spring', stiffness: 520, damping: 40 }}
            >
              {/* cœur bleu — light (bleu plus perçant) */}
              <span
                className="pointer-events-none absolute inset-0 block opacity-95 mix-blend-screen dark:hidden"
                style={{
                  background:
                    'radial-gradient(160px 56px at 50% 50%, rgba(64,156,255,.95), rgba(37,99,235,.85) 40%, rgba(34,211,238,.42) 70%, transparent 78%)',
                }}
              />
              {/* cœur bleu — dark (encore plus saturé, froid) */}
              <span
                className="pointer-events-none absolute inset-0 hidden dark:block opacity-92 mix-blend-screen"
                style={{
                  background:
                    'radial-gradient(160px 56px at 50% 50%, rgba(64,156,255,.95), rgba(37,99,235,.85) 40%, rgba(34,211,238,.42) 70%, transparent 78%)',
                }}
              />
            </motion.div>

            {departs.map((d, i) => {
              const isActive = depart === d.slug;
              return (
                <button
                  key={d.slug}
                  type="button"
                  ref={(el) => {
                    // <-- retourne bien void
                    buttonRefs.current[i] = el; // affecte sans return
                  }}
                  onClick={() => setDepart(d.slug)}
                  className={[
                    'relative z-10 rounded-full px-5 py-2 transition-[color,transform] duration-200',
                    isActive
                      ? 'text-sky-700 dark:text-sky-300 font-semibold'
                      : 'text-neutral-700 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-neutral-100',
                  ].join(' ')}
                >
                  <span
                    className={[
                      'relative',
                      isActive
                        ? 'drop-shadow-[0_0_16px_rgba(37,99,235,.50)]'
                        : '',
                    ].join(' ')}
                  >
                    {d.name}
                  </span>
                </button>
              );
            })}
          </div>

          {renderCities()}
        </div>

        <p className="text-center text-neutral-900 dark:text-neutral-300">
          Ikovaline est une agence web qui accompagne les entreprises dans toute
          la France, avec un ancrage fort en Essonne et en Île-de-France, à
          travers la{' '}
          <Link href="/nos-services/creation-sites-web-vitrine-e-commerce">
            création de sites web
          </Link>{' '}
          et{' '}
          <Link href="/nos-services">
            d&apos;autres solutions digitales sur mesure.
          </Link>
        </p>
      </section>

      {/* CTA */}
      <div className="max-w-7xl px-2 mx-auto text-center flex flex-col items-center justify-center space-y-4 md:space-y-8">
        <h3 className="text-2xl md:text-4xl font-semibold">
          Besoin d’un audit rapide ?
        </h3>

        <LiquidLink href="/contact" className="z-10 ">
          <span className="flex items-center justify-center gap-2">
            <span aria-hidden="true">
              <IconMessage />
            </span>
            Contactez-nous
          </span>
        </LiquidLink>
      </div>

      {/* filtres SVG (liquid) */}
      <GlassDefs />
    </div>
  );
}

/* ------------------------ Mobile sticky (glass) --------------------------- */
const BlocContanerScrollMobile = () => {
  return (
    <ContainerScroll className="min-h-[50vh] md:hidden  max-w-md mx-auto px-5 pb-24  space-y-8">
      {[
        {
          title: 'Votre site vous apporte-t-il vraiment des clients ?',
          text: 'Nous concevons des sites clairs, modernes et pensés pour convertir.',
        },
        {
          title: 'Personne ne vous trouve sur Google ?',
          text: 'On booste votre visibilité avec des stratégies SEO & SEA efficaces.',
        },
        {
          title: 'Vous passez trop de temps sur des tâches répétitives ?',
          text: 'Automatisations sur mesure pour gagner du temps et scaler sans stress.',
        },
        {
          title: 'Pas de stratégie digitale claire ?',
          text: 'On vous guide étape par étape, avec des actions concrètes et mesurables.',
        },
      ].map((item, i) => (
        <GlassCard key={i}>
          <CardSticky index={i + 2}>
            <h3 className=" text-xl md:text-sm lg:text-md xl:text-xl font-semibold">
              {item.title}
            </h3>
            <p className="text-sm md:text-xs xl:text-sm">{item.text}</p>
          </CardSticky>
        </GlassCard>
      ))}
    </ContainerScroll>
  );
};

/* ---------------------------- Filtres SVG -------------------------------- */
function GlassDefs() {
  return (
    <svg className="hidden">
      <defs>
        {/* filtre pour la capsule du segmented control (liquid glass) */}
        <filter id="segment-glass" x="0" y="0" width="100%" height="100%">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.05 0.05"
            numOctaves="1"
            seed="3"
            result="noise"
          />
          <feGaussianBlur in="noise" stdDeviation="2" result="blurred" />
          <feDisplacementMap
            in="SourceGraphic"
            in2="blurred"
            scale="60"
            xChannelSelector="R"
            yChannelSelector="B"
          />
        </filter>
      </defs>
    </svg>
  );
}
