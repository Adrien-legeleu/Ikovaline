"use client";
import { useTheme } from "next-themes";
import { CardSticky, ContainerScroll } from "./CardStack";
import { Sparkles } from "./Sparkles";

const METHODOLOGIE_PHASES = [
  {
    id: "phase-1",
    title: "Audit & Objectifs",
    description:
      "Avant toute action, nous réalisons un audit complet de votre présence en ligne. Nous identifions vos points forts, vos freins et les opportunités d'amélioration. Cette phase stratégique permet de fixer des objectifs clairs pour votre digitalisation.",
  },
  {
    id: "phase-2",
    title: "Stratégie Digitale Personnalisée",
    description:
      "SEO local, création de contenu, gestion de Google Business Profile, publicité Google Ads... nous concevons un plan sur-mesure pour renforcer votre visibilité et attirer des clients qualifiés.",
  },
  {
    id: "phase-3",
    title: "Conception & Optimisation",
    description:
      "Nous concevons ou refondons votre site web avec une approche centrée sur l'utilisateur. Responsive, rapide, optimisé pour le référencement naturel et pensé pour convertir vos visiteurs en prospects.",
  },
  {
    id: "phase-4",
    title: "Suivi & Résultats",
    description:
      "Une fois votre stratégie lancée, nous assurons un suivi régulier. Nos actions sont mesurées, ajustées et transparentes, pour garantir des résultats durables en visibilité, trafic et conversions.",
  },
];

export default function Methodologie() {
  const { theme } = useTheme();
  return (
    <div className="container min-h-svh place-content-center mx-auto  px-6  xl:px-12">
      <div className="grid md:grid-cols-2 md:gap-12 xl:gap-16">
        <div className="left-0 top-36 md:sticky md:h-svh">
          <h2 className="mb-6 mt-4 text-4xl max-md:text-center text-neutral-900 dark:text-neutral-100 font-bold tracking-tight">
            Une méthode claire pour{" "}
            <span className="">booster votre visibilité en ligne</span>
          </h2>
          <p className="max-w-prose md:text-sm  max-md:text-center lg:text-base text-neutral-700 dark:text-neutral-300">
            Chez Ikovaline, nous accompagnons les entreprises dans leur
            transformation digitale à travers une méthode structurée, pensée
            pour des résultats concrets. Chaque étape est optimisée pour le
            référencement naturel, la visibilité locale et la performance.
          </p>
          <div className="relative -mt-32 h-96 w-full overflow-hidden [mask-image:radial-gradient(50%_50%,white,transparent)]">
            <div className="absolute inset-0 before:absolute before:inset-0 before:bg-[radial-gradient(circle_at_bottom_center,#5AD8F2,transparent_99%)] before:opacity-40" />
            <div className="absolute -left-1/2 top-1/2 aspect-[1/0.7] z-10 w-[200%] rounded-[100%] border-t border-zinc-900/20 dark:border-white/20 bg-white dark:bg-zinc-900" />
            <Sparkles
              density={1200}
              className="absolute inset-x-0 bottom-0 h-full w-full [mask-image:radial-gradient(50%_50%,white,transparent_85%)]"
              color={theme === "dark" ? "#ffffff" : "#000000"}
            />
          </div>
        </div>
        <ContainerScroll className="min-h-[220vh] space-y-8 py-12">
          {METHODOLOGIE_PHASES.map((phase, index) => (
            <CardSticky
              key={phase.id}
              index={index + 2}
              className="rounded-3xl border p-8 shadow-md backdrop-blur-2xl bg-white/20 dark:bg-black/10"
            >
              <div className="flex items-center justify-between gap-4">
                <h2 className="my-6 text-2xl font-bold text-secondary tracking-tighter">
                  {phase.title}
                </h2>
                <h3 className="text-2xl font-bold text-secondary">
                  {String(index + 1).padStart(2, "0")}
                </h3>
              </div>

              <p className="text-neutral-700 md:text-sm lg:text-base dark:text-neutral-300 ">
                {phase.description}
              </p>
            </CardSticky>
          ))}
        </ContainerScroll>
      </div>
    </div>
  );
}

// const ACHIEVEMENTS = [
//   {
//     id: "achivement-1",
//     title: "4",
//     description: "site of the day",
//     bg: "rgb(58,148,118)",
//   },
//   {
//     id: "achivement-2",
//     title: "60+",
//     description: "website created",
//     bg: "rgb(195,97,158)",
//   },
//   {
//     id: "achivement-3",
//     title: "5+",
//     description: "years of experience",
//     bg: "rgb(202,128,53)",
//   },
//   {
//     id: "achivement-4",
//     title: "6+",
//     description: "component created",
//     bg: "rgb(135,95,195)",
//   },
// ];

// const Achievements = () => {
//   return (
//     <ContainerScroll className="min-h-[400vh] place-items-center space-y-8 p-12 text-center text-zinc-50">
//       {ACHIEVEMENTS.map((achievement, index) => (
//         <CardSticky
//           key={achievement.id}
//           incrementY={20}
//           index={index + 2}
//           className="flex h-72 w-[420px] flex-col place-content-center justify-evenly rounded-2xl  border border-current p-8 shadow-md"
//           style={{ rotate: index + 2, background: achievement.bg }}
//         >
//           <h1 className="text-left text-6xl font-semibold opacity-80">
//             {achievement.title}
//           </h1>
//           <div className="place-items-end text-right">
//             <h3 className="max-w-[10ch] text-wrap  text-4xl font-semibold capitalize tracking-tight">
//               {achievement.description}
//             </h3>
//           </div>
//         </CardSticky>
//       ))}
//     </ContainerScroll>
//   );
// };
