'use client';

const FranceMap = dynamic(() => import('@/components/ui/france-map'), {
  ssr: false,
  loading: () => <p>Chargement de la carte...</p>,
});
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { CardSticky, ContainerScroll } from '../impact/CardStack';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { removeAccents } from '@/components/pageSatellite/CityAround';
import { useLayoutEffect, useRef, useState } from 'react';

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
  'Boulogne-Billancourt',
  'Neuilly-sur-Seine',
  'Courbevoie',
  'Levallois-Perret',
  'Nanterre',
  'Suresnes',
  'Clamart',
  'Colombes',
  'Montrouge',
];

export default function Map() {
  const [depart, setDepart] = useState('essonne');

  const departs = [
    {
      slug: 'essonne',
      name: 'Essonne',
    },
    {
      slug: 'hauts-de-seine',
      name: 'Hauts-de-Seine',
    },
  ];
  const buttonRefs = useRef<(HTMLButtonElement | null)[]>([]); // tableau de refs
  const [sliderProps, setSliderProps] = useState({ width: 0, left: 0 });

  useLayoutEffect(() => {
    const index = departs.findIndex((d) => d.slug === depart);
    const el = buttonRefs.current[index];
    if (el) {
      setSliderProps({
        width: el.offsetWidth,
        left: el.offsetLeft,
      });
    }
  }, [depart]);
  const renderCities = () => {
    switch (depart) {
      case 'essonne':
        return (
          <div className="flex flex-wrap gap-4 justify-center max-w-2xl">
            {citiesEssonne.map((c, index) => (
              <Link
                key={index}
                href={`/agence-web-${removeAccents(c)}`}
                className="border-black/10 dark:border-white/10 shadow-md border-[1px] px-2 flex gap-2 bg-white dark:bg-neutral-900 items-center justify-center py-1 rounded-full "
              >
                <div className="h-2 w-2 bg-secondary rounded-full" />
                {c}
              </Link>
            ))}
          </div>
        );
      case 'hauts-de-seine':
        return (
          <div className="flex flex-wrap gap-4 justify-center max-w-2xl">
            {citiesHautsSeine.map((c, index) => (
              <Link
                key={index}
                href={`/agence-web-${removeAccents(c)}`}
                className="border-black/10 dark:border-white/10 shadow-md border-[1px] px-2 flex gap-2 bg-white dark:bg-neutral-900 items-center justify-center py-1 rounded-full "
              >
                <div className="h-2 w-2 bg-secondary rounded-full" />
                {c}
              </Link>
            ))}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="py-40 w-full space-y-10 place-content-center relative ">
      <div className="max-w-xl mx-auto px-5 text-center">
        <h2 className="font-bold text-4xl dark:text-white text-black">
          Ikovaline accompagne ses clients partout en France.
        </h2>
        <p className="text-md md:text-lg text-neutral-500 max-w-2xl mx-auto py-4">
          De Paris à Marseille, en passant par Lyon ou Bordeaux, nous aidons les
          entreprises à se rendre visibles, à automatiser, et à mieux convertir.
        </p>
      </div>

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
        <BlocContanerScrollMobile />
        <div className="max-md:hidden">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="md:absolute relative xl:top-5 md:top-10 md:left-5 lg:left-10 xl:left-32 z-20 max-w-[295px] lg:max-w-sm xl:max-w-md"
          >
            <div className="p-5 bg-transparent backdrop-blur-[4px] bg-white dark:bg-black shadow-md shadow-black/10 rounded-3xl z-10 space-y-2">
              <h3 className="text-sm lg:text-md xl:text-xl font-semibold">
                Votre site vous apporte-t-il vraiment des clients ?
              </h3>
              <p className=" text-xs xl:text-sm">
                Nous concevons des sites clairs, modernes et pensés pour
                convertir.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut', delay: 0.1 }}
            className="md:absolute relative  md:top-28 xl:top-32 xl:right-20 md:right-10 lg:right-16 z-20 max-w-[295px] lg:max-w-sm xl:max-w-md"
          >
            <div className="p-5 bg-transparent backdrop-blur-[4px] bg-white dark:bg-black shadow-md shadow-black/10 rounded-3xl z-10 space-y-2">
              <h3 className="text-sm lg:text-md xl:text-xl font-semibold">
                Personne ne vous trouve sur Google ?
              </h3>
              <p className=" text-xs xl:text-sm">
                On booste votre visibilité avec des stratégies SEO & SEA
                efficaces.
              </p>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut', delay: 0.2 }}
            className="md:absolute relative md:bottom-20 xl:bottom-40 md:right-16 lg:right-24 xl:right-32 z-20 max-w-[295px] lg:max-w-sm xl:max-w-md"
          >
            <div className="p-5 bg-transparent backdrop-blur-[4px] bg-white dark:bg-black shadow-md shadow-black/10 rounded-3xl z-10 space-y-2">
              <h3 className="text-sm lg:text-md xl:text-xl font-semibold">
                Vous passez trop de temps sur des tâches répétitives ?
              </h3>
              <p className=" text-xs xl:text-sm">
                Automatisations sur mesure pour gagner du temps et scaler sans
                stress.
              </p>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut', delay: 0.3 }}
            className="md:absolute relative  md:bottom-[35%] lg:bottom-[40%] md:left-12 lg:left-20 z-20  max-w-[295px] lg:max-w-sm xl:max-w-md"
          >
            <div className="p-5 bg-transparent backdrop-blur-[4px]  bg-white dark:bg-black shadow-md shadow-black/10 rounded-3xl z-10 space-y-2">
              <h3 className="text-sm lg:text-md xl:text-xl font-semibold">
                Pas de stratégie digitale claire ?
              </h3>
              <p className=" text-xs xl:text-sm">
                On vous guide étape par étape, avec des actions concrètes et
                mesurables.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
      <div className="flex items-center justify-center px-5 gap-10 flex-col max-w-2xl mx-auto">
        <h2 className="text-2xl font-semibold text-center bg-clip-text text-transparent bg-gradient-to-b from-neutral-900 via-neutral-800 to-neutral-800 dark:from-neutral-800 dark:via-white dark:to-white  py-2 md:text-3xl lg:text-4xl max-w-4xl mx-auto">
          Nos agences web
        </h2>
        <div className="flex items-center justify-center flex-col gap-5">
          <div
            className="relative flex items-center justify-center bg-white/30 dark:bg-neutral-800/60 shadow-xl dark:shadow-2xl dark:shadow-[#FFFFFF15] border border-[#00000009] dark:border-[#ffffff10] p-2 rounded-full"
            style={{ minWidth: 240 }}
          >
            {/* Slider animé */}
            <motion.div
              className="absolute top-1/2 -translate-y-1/2   bg-white dark:bg-[#0A0D11] rounded-full shadow-lg z-0"
              animate={{
                width: sliderProps.width,
                left: sliderProps.left,
              }}
              style={{ height: 'calc(100% - 8px)' }}
              transition={{ type: 'spring', stiffness: 500, damping: 40 }}
            />
            {departs.map((d, index) => (
              <button
                key={d.slug}
                ref={(el) => {
                  buttonRefs.current[index] = el;
                }}
                className={`relative z-10 py-2 px-6 sm:text-xl text-lg font-semibold rounded-full transition-all duration-300 ${
                  depart === d.slug
                    ? 'text-marcblue'
                    : 'text-neutral-600 dark:text-neutral-200'
                }`}
                onClick={() => setDepart(d.slug)}
                style={{ background: 'transparent' }}
              >
                {d.name}
              </button>
            ))}
          </div>
          {renderCities()}
        </div>
        <p className="text-center text-neutral-900 dark:text-neutral-300">
          Ikovaline est une agence web qui accompagne les entreprises dans toute
          la France, avec un ancrage fort en Essonne et en Île-de-France, à
          travers la{' '}
          <Link href="nos-services/creation-sites-web-vitrine-e-commerce">
            création de sites web
          </Link>{' '}
          et{' '}
          <Link href="/nos-services">
            d&apos;autres solutions digitales sur mesure.
          </Link>
        </p>
      </div>

      <div className="max-w-7xl px-2 mx-auto text-center flex flex-col items-center justify-center space-y-4 md:space-y-8">
        <h3 className="text-2xl md:text-4xl font-semibold">
          Besoin d’un audit rapide ?
        </h3>
        <Button className="max-sm:text-sm md:text-lg py-6">
          Contactez-nous — réponse sous 24h
        </Button>
      </div>
    </div>
  );
}
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
        <CardSticky
          key={i}
          index={i + 2}
          className="rounded-3xl border p-8 mx-auto  shadow-md backdrop-blur-2xl bg-white/20 dark:bg-black/10"
        >
          <h3 className=" text-xl md:text-sm lg:text-md xl:text-xl font-semibold">
            {item.title}
          </h3>
          <p className="text-sm md:text-xs xl:text-sm">{item.text}</p>
        </CardSticky>
      ))}
    </ContainerScroll>
  );
};
