import { HeroHighlight } from "@/components/ui/hero-highlight";
import React from "react";
import { useId } from "react";

export function Service1() {
  return (
    <HeroHighlight className="pb-16 pt-10 lg:pb-28 max-w-4xl mb-2 mx-auto space-y-8">
      <h2 className="text-4xl font-semibold text-center">
        Business Développement
      </h2>
      <p className="text-center max-w-3xl leading-relaxed tracking-wider mx-auto">
        Le développement commercial est au cœur de la croissance d’une
        entreprise. Nos services sont conçus pour identifier les opportunités
        stratégiques, optimiser vos processus internes et externes, et maximiser
        vos performances. Que ce soit par des analyses détaillées, des
        formations ou des partenariats, nous vous aidons à transformer vos
        objectifs en résultats concrets.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 pt-10 md:grid-cols-3 gap-10 md:gap-3 max-w-7xl mx-auto">
        {grid.map((feature) => (
          <div
            key={feature.title}
            className="relative bg-gradient-to-b dark:from-neutral-900 from-neutral-100 dark:to-neutral-950 to-white p-6 rounded-3xl overflow-hidden"
          >
            <Grid size={20} />
            <p className="text-base font-bold text-neutral-800 dark:text-white relative z-20">
              {feature.title}
            </p>

            {feature.description}
          </div>
        ))}
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
          Sessions de formation en marketing digital adaptées aux besoins de vos
          équipes.
        </li>
      </ul>
    ),
  },
  {
    title: "Gestion de partenariats et e-réputation",
    description: (
      <ul className="text-neutral-600 space-y-4 list-disc dark:text-neutral-400 mt-4 text-base font-normal relative z-20">
        <li>
          Sessions de formation en marketing digital adaptées aux besoins de vos
          équipes.
        </li>
        <li>
          Sessions de formation en marketing digital adaptées aux besoins de vos
          équipes.
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
  pattern?: number[][];
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
    <div className="pointer-events-none absolute left-1/2 top-0  -ml-20 -mt-2 h-full w-full [mask-image:linear-gradient(white,transparent)]">
      <div className="absolute inset-0 bg-gradient-to-r  [mask-image:radial-gradient(farthest-side_at_top,white,transparent)] dark:from-zinc-900/30 from-blue-100/30 to-blue-300/30 dark:to-zinc-900/30 opacity-100">
        <GridPattern
          width={size ?? 20}
          height={size ?? 20}
          x="-12"
          y="4"
          squares={p}
          className="absolute inset-0 h-full w-full  mix-blend-overlay dark:fill-white/10 dark:stroke-white/10 stroke-black/10 fill-black/10"
        />
      </div>
    </div>
  );
};

export function GridPattern({ width, height, x, y, squares, ...props }: any) {
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
          {squares.map(([x, y]: any) => (
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
