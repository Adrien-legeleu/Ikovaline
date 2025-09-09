'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'motion/react';
import { Button } from '@/components/ui/button';
import { AnimatedTooltip } from '@/components/ui/animated-tooltip';

import Img1 from '@/public/images/About/team-florent-profil.jpg';
import Img2 from '@/public/images/About/team-chiara-profil.jpg';
import Img4 from '@/public/images/About/team-lea-profil.jpg';
import Img5 from '@/public/images/About/team-lucille-profil.jpg';
import Img6 from '@/public/images/About/team-adrien-profil.png';
import Img7 from '@/public/images/About/team-morgan-profil.jpg';
import Img8 from '@/public/images/About/team-victor-profil.jpg';
import Img9 from '@/public/images/About/team-rafeal-profil.jpg';

import type { StaticImageData } from 'next/image';
import { Highlighter } from '@/components/magicui/highlighter';

/* ===================== Team data ===================== */
type Person = {
  id: number;
  name: string;
  designation: string;
  image: StaticImageData;
  alt: string;
};

const TEAM_ROW_1: Person[] = [
  {
    id: 1,
    name: 'Florent Ghizzoni',
    designation: 'PDG Ikovaline',
    image: Img1,
    alt: 'Florent Ghizzoni',
  },
  {
    id: 2,
    name: 'Adrien Legeleux',
    designation: 'Directeur Web Développement',
    image: Img6,
    alt: 'Adrien Legeleux',
  },
  {
    id: 3,
    name: 'Victor Biaujaud',
    designation: 'Manager Principal',
    image: Img8,
    alt: 'Victor Biaujaud',
  },
  {
    id: 4,
    name: 'Morgan Jardin',
    designation: 'Commercial',
    image: Img7,
    alt: 'Morgan Jardin',
  },
];

const TEAM_ROW_2: Person[] = [
  {
    id: 5,
    name: 'Rafeal Bory',
    designation: 'Commercial',
    image: Img9,
    alt: 'Rafeal Bory',
  },
  {
    id: 6,
    name: 'Chiara Pinto Perez',
    designation: 'Directrice Marketing',
    image: Img2,
    alt: 'Chiara Pinto Perez',
  },
  {
    id: 7,
    name: 'Léa Moura Pinto',
    designation: 'Directrice Communication',
    image: Img4,
    alt: 'Léa Moura Pinto',
  },
  {
    id: 8,
    name: 'Lucille Legoaec',
    designation: 'Directrice R&D Technologique',
    image: Img5,
    alt: 'Lucille Legoaec',
  },
];

/* ===================== Hero with beams/lines ===================== */
export default function HeroBeamsTeam() {
  return (
    <section className="relative w-full  ">
      <div className="relative z-10 mx-auto max-w-7xl px-4">
        {/* Beams & gradients (décor) */}
        <div className="relative my-6 overflow-hidden rounded-3xl  pb-10 ">
          {/* Contenu */}
          <div className="relative z-40  mx-auto max-w-5xl px-4 text-center">
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.12 }}
              className=" text-md md:text-lg lg:text-xl 2xl:text-2xl"
            >
              <span className="text-balance font-semibold  bg-gradient-to-b from-black to-neutral-600 bg-clip-text  text-transparent  dark:from-white dark:to-neutral-400">
                Une équipe{' '}
              </span>
              <span>
                {' '}
                <Highlighter
                  action="highlight"
                  className="font-semibold"
                  color="#87CEFA"
                >
                  d’experts
                </Highlighter>{' '}
              </span>
              <span className="text-balance font-semibold  bg-gradient-to-b from-black to-neutral-600 bg-clip-text  text-transparent  dark:from-white dark:to-neutral-400">
                pour concevoir, lancer et faire croître votre SaaS&nbsp;:
                stratégie, design, développement et acquisition — le tout,
                orienté résultats.
              </span>
            </motion.p>

            {/* Avatars + CTA */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.2 }}
              className="mt-8 flex w-full flex-col  items-center justify-center gap-10"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-center gap-5 sm:gap-6">
                  <AnimatedTooltip items={TEAM_ROW_1} />
                </div>
                <div className="flex items-center justify-center gap-4 sm:gap-5">
                  <AnimatedTooltip items={TEAM_ROW_2} />
                </div>
              </div>

              <div className="flex flex-col  items-center gap-3 sm:flex-row">
                <Button
                  asChild
                  className="rounded-xl bg-primary px-6 py-2 text-white hover:opacity-95"
                >
                  <Link href="/contact">Parler à un expert</Link>
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
