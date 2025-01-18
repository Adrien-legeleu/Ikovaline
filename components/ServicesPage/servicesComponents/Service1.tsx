"use client";
import { Button } from "@/components/ui/button";
import { HeroHighlight } from "@/components/ui/hero-highlight";
import React from "react";
import { useId } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

export function Service1() {
  return (
    <HeroHighlight className="pb-16 pt-10 lg:pb-28 max-w-4xl mb-2 md:px-0 px-5 mx-auto space-y-8">
      <h2 className=" sm:text-4xl text-3xl items-center justify-center text-center  mb-12 font-bold bg-gradient-to-t from-neutral-500 to-neutral-800 bg-clip-text text-transparent">
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

            {feature.description}
          </motion.div>
        ))}
      </div>
      <div className="w-full flex items-center justify-center">
        <Link href="/contact">
          {" "}
          <Button variant={"destructive"} className="text-lg">
            Contactez-nous !
          </Button>
        </Link>
      </div>
    </HeroHighlight>
  );
}

const grid = [
  {
    title: "Audit et suivi analytique",
    description: (
      <ul className="text-neutral-600 space-y-4 list-disc dark:text-neutral-400 mt-4 text-base font-normal relative z-20">
        <li>
          Analyse complète de votre présence en ligne pour identifier les axes
          d’amélioration.
        </li>
        <li>
          Mise en place de Google Analytics et rapports détaillés pour suivre
          vos performances et ajuster vos actions.
        </li>
      </ul>
    ),
  },
  {
    title: "Formation et conseil stratégique",
    description: (
      <ul className="text-neutral-600 space-y-4 list-disc dark:text-neutral-400 mt-4 text-base font-normal relative z-20">
        <li>
          Sessions de formation en marketing digital adaptées aux besoins de vos
          équipes.
        </li>
        <li>
          Conseils personnalisés pour élaborer des stratégies marketing
          efficaces.
        </li>
      </ul>
    ),
  },
  {
    title: "Gestion de partenariats et e-réputation",
    description: (
      <ul className="text-neutral-600 space-y-4 list-disc dark:text-neutral-400 mt-4 text-base font-normal relative z-20">
        <li>
          Amélioration de votre image en ligne par une gestion proactive de
          votre e-réputation.
        </li>
        <li>
          Création et gestion de partenariats stratégiques pour renforcer votre
          présence en ligne.
        </li>
      </ul>
    ),
  },
  {
    title: "Email marketing et service client digital",
    description: (
      <ul className="text-neutral-600 space-y-4 list-disc dark:text-neutral-400 mt-4 text-base font-normal relative z-20">
        <li>
          Création de campagnes e-mailing performantes pour fidéliser vos
          clients.
        </li>
        <li>
          Optimisation des interactions client via messageries, réseaux sociaux
          et Google My Business.
        </li>
      </ul>
    ),
  },
  {
    title: "Réalisation de landing pages et publicité locale",
    description: (
      <ul className="text-neutral-600 space-y-4 list-disc dark:text-neutral-400 mt-4 text-base font-normal relative z-20">
        <li>
          Création de pages d’atterrissage efficaces et adaptées à vos
          campagnes.
        </li>
        <li>
          Campagnes locales pour capter des clients dans votre zone
          géographique.
        </li>
      </ul>
    ),
  },
  {
    title: "Campagnes publicitaires en ligne (Google Ads & Social Ads)",
    description: (
      <ul className="text-neutral-600 space-y-4 list-disc dark:text-neutral-400 mt-4 text-base font-normal relative z-20">
        <li>
          Création et gestion de campagnes publicitaires sur Google, Facebook,
          Instagram et TikTok.
        </li>
        <li>
          Optimisation des annonces pour maximiser le retour sur investissement.
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
