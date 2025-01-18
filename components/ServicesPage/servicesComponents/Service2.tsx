"use client";
import { Button } from "@/components/ui/button";
import { HeroHighlight } from "@/components/ui/hero-highlight";
import React from "react";
import { useId } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

export function Service2() {
  return (
    <HeroHighlight className="py-16 lg:py-28 max-w-4xl mx-auto md:px-0 px-5 space-y-8 ">
      <h2 className=" sm:text-4xl text-3xl items-center justify-center text-center mb-12 font-bold bg-gradient-to-t from-neutral-500 to-neutral-800 bg-clip-text text-transparent">
        Développement de la Présence en Ligne
      </h2>
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: [20, -5, 0] }}
        transition={{ duration: 0.5, ease: [0.4, 0.0, 0.2, 1] }}
        viewport={{ amount: 0.5 }}
        className="text-center max-w-3xl leading-relaxed tracking-wider mx-auto"
      >
        Optimisez votre visibilité et votre image en ligne avec des stratégies
        personnalisées. Notre équipe vous accompagne pour renforcer votre
        présence sur les moteurs de recherche et les réseaux sociaux.
      </motion.p>
      <div
        className="grid grid-cols-1 sm:grid-cols-2 pt-10 md:grid-cols-3 gap-5 md:gap-3 max-w-7xl mx-auto"
        id="developpement-digital"
      >
        {grid.map((feature) => (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.4, 0.0, 0.2, 1] }}
            viewport={{ amount: 0.5 }}
            key={feature.title}
            className="relative bg-gradient-to-b dark:from-neutral-900 from-neutral-100 dark:to-neutral-950 to-white p-6 rounded-3xl overflow-hidden"
          >
            <Grid size={20} />
            <p className="text-base font-bold text-neutral-800 dark:text-white relative z-20">
              {feature.title}
            </p>
            <p className="text-neutral-600 dark:text-neutral-400 mt-4 text-base font-normal relative z-20">
              {feature.description}
            </p>
          </motion.div>
        ))}
      </div>
      <div className="w-full flex items-center justify-center">
        <Link href="/contact">
          {" "}
          <Button variant={"destructive"} className="text-lg">
            Faites le premier pas !
          </Button>
        </Link>
      </div>
    </HeroHighlight>
  );
}

const grid = [
  {
    title: "Gestion de votre image en ligne (Avis Google & Google My Business)",
    description: (
      <ul className="text-neutral-600 space-y-4 list-disc dark:text-neutral-400 mt-4 text-base font-normal relative z-20">
        <li>
          Surveillance et gestion proactive des avis clients, avec des réponses
          personnalisées pour renforcer votre crédibilité.
        </li>
        <li>
          Optimisation de votre fiche Google My Business (photos, horaires,
          informations) pour un meilleur référencement local.
        </li>
      </ul>
    ),
  },
  {
    title: "Stratégie de contenu et gestion des réseaux sociaux",
    description: (
      <ul className="text-neutral-600 space-y-4 list-disc dark:text-neutral-400 mt-4 text-base font-normal relative z-20">
        <li>
          Création de calendriers éditoriaux adaptés à votre stratégie
          marketing.
        </li>
        <li>
          Contenus engageants (posts, stories, vidéos) sur les réseaux sociaux
          tels que Facebook, Instagram, LinkedIn, TikTok.
        </li>
      </ul>
    ),
  },
  {
    title: "Création et optimisation de sites web",
    description: (
      <ul className="text-neutral-600 space-y-4 list-disc dark:text-neutral-400 mt-4 text-base font-normal relative z-20">
        <li>
          Développement de sites vitrine ou e-commerce modernes, responsives et
          centrés sur l’expérience utilisateur.
        </li>
        <li>
          Optimisation SEO avancée pour garantir une meilleure visibilité de
          votre site sur les moteurs de recherche.
        </li>
      </ul>
    ),
  },
  {
    title: "Rédaction et création de contenu",
    description: (
      <ul className="text-neutral-600 space-y-4 list-disc dark:text-neutral-400 mt-4 text-base font-normal relative z-20">
        <li>
          Production d’articles de blog, pages web et newsletters optimisés pour
          le SEO.
        </li>
        <li>
          Création de visuels et vidéos courtes pour enrichir vos réseaux
          sociaux et campagnes publicitaires.
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
