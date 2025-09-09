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

/* ===================== Decorative SVGs ===================== */
function TopLines() {
  return (
    <svg
      width="166"
      height="298"
      viewBox="0 0 166 298"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="pointer-events-none absolute inset-x-0 top-0 h-[150px] w-full md:h-[200px]"
    >
      {[1, 34, 67, 100, 133, 166].map((x, i) => (
        <line
          key={i}
          y1="-0.5"
          x2="406"
          y2="-0.5"
          transform={`matrix(0 1 1 0 ${x} -108)`}
          stroke="url(#gTop)"
        />
      ))}
      <defs>
        <linearGradient
          id="gTop"
          x1="0"
          y1="0.5"
          x2="405"
          y2="0.5"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="white" />
          <stop offset="1" stopOpacity="0" />
        </linearGradient>
      </defs>
    </svg>
  );
}

function BottomLines() {
  return (
    <svg
      width="445"
      height="418"
      viewBox="0 0 445 418"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="pointer-events-none absolute inset-x-0 -bottom-20 z-20 h-[240px] w-full md:h-[300px]"
    >
      {[139.5, 172.5, 205.5, 238.5, 271.5, 304.5].map((x, i) => (
        <line key={i} x1={x} y1="418" x2={x} y2="12" stroke="url(#gVertical)" />
      ))}
      <path
        d="M1 149L109 236C112.8 239 115 243.5 115 248.36V417"
        stroke="url(#gArcL)"
        strokeOpacity="0.1"
        strokeWidth="1.5"
      />
      <path
        d="M444 149L336 236C332.2 239 330 243.5 330 248.36V417"
        stroke="url(#gArcR)"
        strokeOpacity="0.1"
        strokeWidth="1.5"
      />
      <defs>
        <linearGradient
          id="gVertical"
          x1="0"
          y1="418"
          x2="0"
          y2="13"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="white" />
          <stop offset="1" stopOpacity="0" />
        </linearGradient>
        <linearGradient
          id="gArcL"
          x1="115"
          y1="390.6"
          x2="-59.17"
          y2="205.67"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0.48" stopColor="#F8F8F8" />
          <stop offset="1" stopColor="#F8F8F8" stopOpacity="0" />
        </linearGradient>
        <linearGradient
          id="gArcR"
          x1="330"
          y1="390.6"
          x2="504.17"
          y2="205.67"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0.48" stopColor="#F8F8F8" />
          <stop offset="1" stopColor="#F8F8F8" stopOpacity="0" />
        </linearGradient>
      </defs>
    </svg>
  );
}

function SideLines() {
  return (
    <svg
      width="1382"
      height="370"
      viewBox="0 0 1382 370"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="pointer-events-none absolute inset-0 z-30 h-full w-full"
    >
      <path
        d="M268 115L181.106 6.97176C178.069 3.19599 173.485 1 168.639 1H0"
        stroke="url(#sl1)"
        strokeOpacity="0.1"
        strokeWidth="1.5"
      />
      <path
        d="M1114 115L1200.89 6.97176C1203.93 3.19599 1208.52 1 1213.36 1H1382"
        stroke="url(#sl2)"
        strokeOpacity="0.1"
        strokeWidth="1.5"
      />
      <path
        d="M268 255L181.106 363.028C178.069 366.804 173.485 369 168.639 369H0"
        stroke="url(#sl3)"
        strokeOpacity="0.1"
        strokeWidth="1.5"
      />
      <path
        d="M1114 255L1200.89 363.028C1203.93 366.804 1208.52 369 1213.36 369H1382"
        stroke="url(#sl4)"
        strokeOpacity="0.1"
        strokeWidth="1.5"
      />
      <defs>
        <linearGradient
          id="sl1"
          x1="26.41"
          y1="1"
          x2="211.33"
          y2="175.17"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0.48" stopColor="#F8F8F8" />
          <stop offset="1" stopColor="#F8F8F8" stopOpacity="0" />
        </linearGradient>
        <linearGradient
          id="sl2"
          x1="1355.59"
          y1="1"
          x2="1170.67"
          y2="175.17"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0.48" stopColor="#F8F8F8" />
          <stop offset="1" stopColor="#F8F8F8" stopOpacity="0" />
        </linearGradient>
        <linearGradient
          id="sl3"
          x1="26.41"
          y1="369"
          x2="211.33"
          y2="194.83"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0.48" stopColor="#F8F8F8" />
          <stop offset="1" stopColor="#F8F8F8" stopOpacity="0" />
        </linearGradient>
        <linearGradient
          id="sl4"
          x1="1355.59"
          y1="369"
          x2="1170.67"
          y2="194.83"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0.48" stopColor="#F8F8F8" />
          <stop offset="1" stopColor="#F8F8F8" stopOpacity="0" />
        </linearGradient>
      </defs>
    </svg>
  );
}
