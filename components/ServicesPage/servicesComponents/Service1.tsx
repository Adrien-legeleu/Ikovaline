"use client";
import { Button } from "@/components/ui/button";
import { HeroHighlight } from "@/components/ui/hero-highlight";
import React from "react";
import { useId } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { IconArrowRight } from "@tabler/icons-react";

export function Service1() {
  return (
    <HeroHighlight className="pb-16 pt-10 lg:pb-28 max-w-5xl mb-2 md:px-0 px-5 mx-auto space-y-8">
      <h2 className="sm:text-4xl text-3xl items-center justify-center text-center mb-12 font-bold bg-gradient-to-t from-neutral-500 to-neutral-800 dark:to-neutral-500 dark:from-neutral-200 bg-clip-text text-transparent">
        Propulsez votre Business avec une Stratégie Commerciale Efficace
      </h2>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: [20, -5, 0] }}
        transition={{ duration: 0.5, ease: [0.4, 0.0, 0.2, 1] }}
        viewport={{ amount: 0.5 }}
        className="text-center max-w-3xl leading-relaxed tracking-wider mx-auto"
      >
        Grâce à notre expertise en <strong>développement commercial</strong> et
        en <strong>stratégie business</strong>, nous vous aidons à structurer
        votre croissance. Études de marché, prospection multicanale,
        accompagnement stratégique : découvrez nos leviers pour générer plus de
        leads et améliorer durablement votre chiffre d'affaires.
      </motion.p>
      <div
        className="grid grid-cols-1 sm:grid-cols-2 pt-10 md:grid-cols-3 gap-5 md:gap-3 max-w-7xl mx-auto"
        id="buisness-developpement"
      >
        {grid.map((feature, index) => (
          <Link
            href={`nos-services/${feature.slug}`}
            key={index}
            className="group h-full"
          >
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

              {feature.description}
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
          {" "}
          <Button variant={"secondary"} className="text-lg">
            Lancez votre croissance dès aujourd’hui
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
          Analyse poussée du marché, identification de vos cibles, veille
          concurrentielle et tendances sectorielles pour orienter votre
          stratégie commerciale.
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
          Collecte et analyse de données précises (qualitatives et
          quantitatives) pour obtenir des insights clients B2B/B2C fiables et
          actionnables.
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
          Mise en place d’une stratégie commerciale performante et alignée sur
          vos objectifs pour augmenter vos ventes et votre chiffre d’affaires.
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
          Accompagnement dans la coordination et le suivi de vos projets
          marketing ou business, avec une approche orientée résultats.
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
          Structuration de vos lancements produits ou services avec une
          stratégie de pénétration efficace sur vos marchés cibles.
        </li>
      </ul>
    ),
  },
  {
    title: "Prospection & Lead Generation (B2B, B2C, B2B2C)",
    slug: "prospection-lead-generation-multicanal",
    description: (
      <ul className="text-neutral-600 space-y-4 list-disc dark:text-neutral-400 mt-4 text-base font-normal relative z-20">
        <li>
          Stratégies de prospection multicanale et outils de lead generation
          pour booster la conversion et remplir votre pipeline commercial.
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
          Conception de sites performants, pensés pour la conversion, le
          référencement naturel (SEO) et l'expérience utilisateur mobile-first.
        </li>
      </ul>
    ),
  },
  {
    title: "Prospection & Téléphone IA",
    slug: "prospection-telephone-ia",
    description: (
      <ul className="text-neutral-600 space-y-4 list-disc dark:text-neutral-400 mt-4 text-base font-normal relative z-20">
        <li>
          IA de prospection intelligente : appels automatisés, suivi
          personnalisé et relance optimisée pour générer des leads efficacement.
        </li>
      </ul>
    ),
  },
  {
    title: "Développement International",
    slug: "developpement-international",
    description: (
      <ul className="text-neutral-600 space-y-4 list-disc dark:text-neutral-400 mt-4 text-base font-normal relative z-20">
        <li>
          Accompagnement stratégique pour réussir votre implantation sur de
          nouveaux marchés internationaux, avec analyse locale et adaptation
          commerciale.
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
