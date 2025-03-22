"use client";
import { Button } from "@/components/ui/button";
import { HeroHighlight } from "@/components/ui/hero-highlight";
import React from "react";
import { useId } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

export function Service1() {
  return (
    <HeroHighlight className="pb-16 pt-10 lg:pb-28 max-w-5xl mb-2 md:px-0 px-5 mx-auto space-y-8">
      <h2 className=" sm:text-4xl text-3xl items-center justify-center text-center  mb-12 font-bold bg-gradient-to-t from-neutral-500 to-neutral-800 dark:to-neutral-500 dark:from-neutral-200 bg-clip-text text-transparent">
        Business Développement
      </h2>
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: [20, -5, 0] }}
        transition={{ duration: 0.5, ease: [0.4, 0.0, 0.2, 1] }}
        viewport={{ amount: 0.5 }}
        className="text-center max-w-3xl leading-relaxed tracking-wider mx-auto"
      >
        Notre expertise en développement commercial vous permet de propulser
        votre entreprise à de nouveaux sommets. Grâce à des stratégies sur
        mesure, nous optimisons vos processus pour booster vos ventes et
        améliorer votre rentabilité. Découvrez comment nos solutions peuvent
        transformer vos objectifs en résultats concrets.
      </motion.p>
      <div
        className="grid grid-cols-1 sm:grid-cols-2 pt-10 md:grid-cols-3 gap-5 md:gap-3 max-w-7xl mx-auto"
        id="buisness-developpement"
      >
        {grid.map((feature, index) => (
          <Link href={`nos-services/${feature.slug}`} key={index}>
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

              {feature.description}
            </motion.div>
          </Link>
        ))}
      </div>
      <div className="w-full flex items-center justify-center">
        <Link href="/contact">
          {" "}
          <Button variant={"secondary"} className="text-lg">
            Passez à l’action !
          </Button>
        </Link>
      </div>
    </HeroHighlight>
  );
}

const grid = [
  {
    title: "Études de Marché Sur Mesure",
    slug: "etudes-marche-sur-mesure",
    description: (
      <ul className="text-neutral-600 space-y-4 list-disc dark:text-neutral-400 mt-4 text-base font-normal relative z-20">
        <li>
          Analyse approfondie du marché, segmentation client, étude
          concurrentielle et analyse des tendances sectorielles.
        </li>
      </ul>
    ),
  },
  {
    title: "Sondages de Marché & Enquêtes Terrain",
    slug: "sondages-marche-enquetes-terrain",
    description: (
      <ul className="text-neutral-600 space-y-4 list-disc dark:text-neutral-400 mt-4 text-base font-normal relative z-20">
        <li>
          Collecte et analyse de données qualitatives et quantitatives pour
          obtenir des insights précis (B2B ou B2C).
        </li>
      </ul>
    ),
  },
  {
    title: "Stratégie Commerciale & Développement Business",
    slug: "strategie-commerciale-developpement-business",
    description: (
      <ul className="text-neutral-600 space-y-4 list-disc dark:text-neutral-400 mt-4 text-base font-normal relative z-20">
        <li>
          Définition et déploiement d’une stratégie commerciale opérationnelle
          pour booster vos ventes.
        </li>
      </ul>
    ),
  },
  {
    title: "Pilotage & Gestion de Projet Stratégique",
    slug: "pilotage-gestion-projet-strategique",
    description: (
      <ul className="text-neutral-600 space-y-4 list-disc dark:text-neutral-400 mt-4 text-base font-normal relative z-20">
        <li>
          Coordination experte pour le pilotage et le suivi de projets de
          développement ou de lancement.
        </li>
      </ul>
    ),
  },
  {
    title: "Plan Go-to-Market & Accompagnement Opérationnel",
    slug: "plan-go-to-market-accompagnement-operational",
    description: (
      <ul className="text-neutral-600 space-y-4 list-disc dark:text-neutral-400 mt-4 text-base font-normal relative z-20">
        <li>
          Structuration du lancement de nouveaux produits/services et
          pénétration efficace du marché.
        </li>
      </ul>
    ),
  },
  {
    title: "Prospection & Lead Generation Multicanal",
    slug: "prospection-lead-generation-multicanal",
    description: (
      <ul className="text-neutral-600 space-y-4 list-disc dark:text-neutral-400 mt-4 text-base font-normal relative z-20">
        <li>
          Mise en place de processus de prospection et accompagnement des
          équipes de vente pour booster vos leads.
        </li>
      </ul>
    ),
  },
  {
    title: "Création de Sites Web Vitrine & E-commerce",
    slug: "creation-sites-web-vitrine-e-commerce",
    description: (
      <ul className="text-neutral-600 space-y-4 list-disc dark:text-neutral-400 mt-4 text-base font-normal relative z-20">
        <li>
          Conception et développement de sites optimisés pour la conversion et
          l&apos;expérience utilisateur.
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
