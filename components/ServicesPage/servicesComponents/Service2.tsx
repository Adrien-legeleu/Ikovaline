"use client";
import { Button } from "@/components/ui/button";
import { HeroHighlight } from "@/components/ui/hero-highlight";
import React from "react";
import { useId } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { IconArrowRight } from "@tabler/icons-react";

export function Service2() {
  return (
    <HeroHighlight className="py-16 lg:py-28 max-w-5xl mx-auto md:px-0 px-5 space-y-8 ">
      <h2 className="sm:text-4xl text-3xl items-center justify-center text-center mb-12 font-bold bg-gradient-to-t from-neutral-500 to-neutral-800 dark:to-neutral-500 dark:from-neutral-200 bg-clip-text text-transparent">
        Renforcez votre Visibilité Digitale avec une Présence Stratégique en
        Ligne
      </h2>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: [20, -5, 0] }}
        transition={{ duration: 0.5, ease: [0.4, 0.0, 0.2, 1] }}
        viewport={{ amount: 0.5 }}
        className="text-center max-w-3xl leading-relaxed tracking-wider mx-auto"
      >
        Attirez plus de clients grâce à une stratégie digitale sur-mesure. SEO,
        SEA, réseaux sociaux et contenus : nous activons les bons leviers pour
        améliorer votre visibilité sur Google et renforcer votre image en ligne.
      </motion.p>
      <div
        className="grid grid-cols-1 sm:grid-cols-2 pt-10 md:grid-cols-3 gap-5 md:gap-3 max-w-7xl mx-auto"
        id="developpement-digital"
      >
        {grid.map((feature, index) => (
          <Link href={`nos-services/${feature.slug}`} key={index}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.4, 0.0, 0.2, 1] }}
              viewport={{ amount: 0.5 }}
              key={feature.title}
              className="relative h-full flex flex-col justify-between bg-gradient-to-b dark:from-neutral-900 from-neutral-100 dark:to-neutral-950 to-white p-6 rounded-3xl overflow-hidden"
            >
              <Grid size={20} />
              <p className="text-base font-bold text-neutral-800 dark:text-white relative z-20">
                {feature.title}
              </p>
              <p className="text-neutral-600 dark:text-neutral-400 mt-4 text-base font-normal relative z-20">
                {feature.description}
              </p>
              <Button
                variant={"outline"}
                className="rounded-full  w-12 h-10 mt-4 p-1"
              >
                <IconArrowRight />
              </Button>
            </motion.div>
          </Link>
        ))}
      </div>
      <div className="w-full flex items-center justify-center">
        <Link href="/contact">
          <Button variant={"secondary"} className="text-lg">
            Boostez votre visibilité digitale maintenant
          </Button>
        </Link>
      </div>
    </HeroHighlight>
  );
}

const grid = [
  {
    title: "Optimisation SEO et Référencement Naturel",
    slug: "seo-referencement-naturel",
    description: (
      <ul className="text-neutral-600 space-y-4 list-disc dark:text-neutral-400 mt-4 text-base font-normal relative z-20">
        <li>
          Boostez votre visibilité organique grâce à un audit complet, une
          optimisation technique et une stratégie de contenu SEO performante.
        </li>
      </ul>
    ),
  },
  {
    title: "Gestion de Campagnes SEA Performantes",
    slug: "gestion-campagnes-sea",
    description: (
      <ul className="text-neutral-600 space-y-4 list-disc dark:text-neutral-400 mt-4 text-base font-normal relative z-20">
        <li>
          Générez des leads qualifiés avec des campagnes Google Ads ciblées, une
          optimisation du Quality Score et un pilotage axé sur le ROI.
        </li>
      </ul>
    ),
  },
  {
    title: "E-réputation & Gestion des Avis Google",
    slug: "e-reputation-gestion-avis-google",
    description: (
      <ul className="text-neutral-600 space-y-4 list-disc dark:text-neutral-400 mt-4 text-base font-normal relative z-20">
        <li>
          Renforcez votre image avec une stratégie proactive de gestion des avis
          clients et une présence maîtrisée sur Google My Business.
        </li>
      </ul>
    ),
  },
  {
    title: "Automatisation & Solutions IA pour le Marketing",
    slug: "automatisation-solutions-ia-marketing",
    description: (
      <ul className="text-neutral-600 space-y-4 list-disc dark:text-neutral-400 mt-4 text-base font-normal relative z-20">
        <li>
          Gagnez en efficacité avec des outils d'automatisation et d'IA : CRM
          intelligent, segmentation automatisée et scénarios de conversion.
        </li>
      </ul>
    ),
  },
  {
    title: "Création de Contenus & Supports Marketing",
    slug: "creation-contenus-supports-marketing",
    description: (
      <ul className="text-neutral-600 space-y-4 list-disc dark:text-neutral-400 mt-4 text-base font-normal relative z-20">
        <li>
          Créez des visuels, vidéos et contenus engageants pour améliorer votre
          image de marque et soutenir vos campagnes marketing.
        </li>
      </ul>
    ),
  },
  {
    title: "Étude de Marché & Pilotage de Projet Global",
    slug: "etude-marche-pilotage-projet-global",
    description: (
      <ul className="text-neutral-600 space-y-4 list-disc dark:text-neutral-400 mt-4 text-base font-normal relative z-20">
        <li>
          Identifiez les opportunités de croissance avec une analyse de marché
          précise et un pilotage agile de vos projets digitaux.
        </li>
      </ul>
    ),
  },
  {
    title: "Automatisation IA d'Emailing",
    slug: "automatisation-ia-emailing",
    description: (
      <ul className="text-neutral-600 space-y-4 list-disc dark:text-neutral-400 mt-4 text-base font-normal relative z-20">
        <li>
          Réduisez votre temps de gestion et augmentez vos conversions grâce à
          l’emailing automatisé piloté par l’intelligence artificielle.
        </li>
      </ul>
    ),
  },
  {
    title: "Gestion et Développement de Réseaux Sociaux",
    slug: "gestion-developpement-reseaux-sociaux",
    description: (
      <ul className="text-neutral-600 space-y-4 list-disc dark:text-neutral-400 mt-4 text-base font-normal relative z-20">
        <li>
          Développez votre communauté avec une stratégie éditoriale adaptée à
          chaque plateforme et des publications optimisées pour l’engagement.
        </li>
      </ul>
    ),
  },
  {
    title: "Création de Site Web Sur-Mesure",
    slug: "creation-site-web-sur-mesure",
    description: (
      <ul className="text-neutral-600 space-y-4 list-disc dark:text-neutral-400 mt-4 text-base font-normal relative z-20">
        <li>
          Concevez un site web moderne, responsive et optimisé SEO, aligné sur
          votre image et pensé pour convertir vos visiteurs.
        </li>
      </ul>
    ),
  },
];

export const Grid = ({
  pattern,
  size,
}: {
  pattern?: [number, number][];
  size?: number;
}) => {
  const p = pattern ?? [
    [Math.floor(Math.random() * 4) + 7, Math.floor(Math.random() * 6) + 1],
    [Math.floor(Math.random() * 4) + 7, Math.floor(Math.random() * 6) + 1],
    [Math.floor(Math.random() * 4) + 7, Math.floor(Math.random() * 6) + 1],
    [Math.floor(Math.random() * 4) + 7, Math.floor(Math.random() * 6) + 1],
    [Math.floor(Math.random() * 4) + 7, Math.floor(Math.random() * 6) + 1],
  ];
  return (
    <div className="pointer-events-none absolute left-1/2 top-0 -ml-20 -mt-2 h-full w-full [mask-image:linear-gradient(white,transparent)]">
      <div className="absolute inset-0 bg-gradient-to-r [mask-image:radial-gradient(farthest-side_at_top,white,transparent)] dark:from-zinc-900/30 from-blue-100/30 to-blue-300/30 dark:to-zinc-900/30 opacity-100">
        <GridPattern
          width={size ?? 20}
          height={size ?? 20}
          x="-12"
          y="4"
          squares={p}
          className="absolute inset-0 h-full w-full mix-blend-overlay dark:fill-white/10 dark:stroke-white/10 stroke-black/10 fill-black/10"
        />
      </div>
    </div>
  );
};

export function GridPattern({
  width,
  height,
  x,
  y,
  squares,
  ...props
}: {
  width: number;
  height: number;
  x?: string;
  y?: string;
  squares?: [number, number][];
  [key: string]: unknown;
}) {
  const patternId = useId();

  return (
    <svg aria-hidden="true" {...props}>
      <defs>
        <pattern
          id={patternId}
          width={width}
          height={height}
          patternUnits="userSpaceOnUse"
          x={x}
          y={y}
        >
          <path d={`M.5 ${height}V.5H${width}`} fill="none" />
        </pattern>
      </defs>
      <rect
        width="100%"
        height="100%"
        strokeWidth={0}
        fill={`url(#${patternId})`}
      />
      {squares && (
        <svg x={x} y={y} className="overflow-visible">
          {squares.map(([x, y]) => (
            <rect
              strokeWidth="0"
              key={`${x}-${y}`}
              width={width + 1}
              height={height + 1}
              x={x * width}
              y={y * height}
            />
          ))}
        </svg>
      )}
    </svg>
  );
}
