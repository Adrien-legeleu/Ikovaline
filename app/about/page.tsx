"use client";
import React from "react";
import Image from "next/image";
import { TracingBeam } from "@/components/ui/tracing-beam";
import { Team } from "@/components/AboutPage/Team";
import ImageHistory from "@/public/images/About/ikovaline-about.jpeg";
import { HeroHighlight, Highlight } from "@/components/ui/hero-highlight";
import { motion } from "framer-motion";
import { Cover } from "@/components/ui/cover";
import { IconQuote } from "@tabler/icons-react";
import { CallToAction } from "@/components/callToAction/CallToAction";

export default function Page() {
  return (
    <div>
      {" "}
      <TracingBeam className="px-6 my-20 ">
        <div className="max-w-2xl mx-auto antialiased pt-4 relative">
          {ikovalineContent.map((item, index) => (
            <div key={`content-${index}`} className="mb-10">
              <p className="bg-black text-white rounded-full text-sm w-fit px-4 py-1 mb-4">
                {item.badge}
              </p>

              <h2
                className={
                  "text-5xl mb-12 text-center font-semibold bg-gradient-to-t from-neutral-300 to-neutral-600 bg-clip-text text-transparent "
                }
              >
                {item.title}
              </h2>

              <div className="text-lg space-y-5 text-center leading-loose  prose prose-sm dark:prose-invert">
                {item.description}
              </div>
            </div>
          ))}
        </div>
      </TracingBeam>
      <CallToAction />
    </div>
  );
}

const ikovalineContent = [
  {
    title: "Les Origines d’Ikovaline",
    description: (
      <>
        <motion.p
          id="history"
          initial={{
            opacity: 0,
            y: 20,
          }}
          whileInView={{
            opacity: 1,
            y: [20, -5, 0],
          }}
          transition={{
            duration: 0.5,
            ease: [0.4, 0.0, 0.2, 1],
          }}
          viewport={{
            amount: 0.5, // 50% de l'élément doit être visible pour déclencher l'animation
          }}
        >
          Fondée par <Highlight className="p-2">Florent Ghizzoni</Highlight>,
          Ikovaline est née de l’ambition de proposer des solutions marketing
          digital abordables et personnalisées. Étudiant en alternance, Florent
          a su transformer son expertise en business développement et marketing
          stratégique pour répondre aux besoins des petites et moyennes
          entreprises.
        </motion.p>
        <div className="flex justify-center items-center gap-8">
          <Image
            src={ImageHistory}
            alt="Ikovaline-photo-présentation"
            width={300}
            height={300}
            className="rounded-3xl aspect-square object-cover"
          />
          <Image
            src={ImageHistory}
            alt="Ikovaline-photo-présentation"
            width={300}
            height={300}
            className="rounded-3xl aspect-square object-cover"
          />
        </div>
        <motion.p
          initial={{
            opacity: 0,
            y: 20,
          }}
          whileInView={{
            opacity: 1,
            y: [20, -5, 0],
          }}
          transition={{
            duration: 0.5,
            ease: [0.4, 0.0, 0.2, 1],
          }}
          viewport={{
            amount: 1, // 50% de l'élément doit être visible pour déclencher l'animation
          }}
        >
          Ikovaline, c’est avant tout l’histoire d’une vision :
          <Highlight className="p-2">aider les entreprises</Highlight> à se
          démarquer dans un monde numérique en constante évolution, en offrant
          des services à forte valeur ajoutée accessibles à tous.
        </motion.p>
      </>
    ),
    badge: "Histoire",
  },
  {
    title: "Une Équipe Passionnée",
    description: (
      <>
        <motion.p
          id="team"
          initial={{
            opacity: 0,
            y: 20,
          }}
          whileInView={{
            opacity: 1,
            y: [20, -5, 0],
          }}
          transition={{
            duration: 0.5,
            ease: [0.4, 0.0, 0.2, 1],
          }}
          viewport={{
            amount: 1, // 50% de l'élément doit être visible pour déclencher l'animation
          }}
        >
          L’équipe d’Ikovaline est composée de jeunes talents motivés, chacun
          ayant un rôle clé : Florent Ghizzoni (Fondateur et CEO), Samuel Garrel
          (Directeur Web-Marketing), Nathan Paré (Directeur Commercial), Adam
          Sauneron (Responsable Commercial), et bien d’autres.
        </motion.p>

        <motion.p
          initial={{
            opacity: 0,
            y: 20,
          }}
          whileInView={{
            opacity: 1,
            y: [20, -5, 0],
          }}
          transition={{
            duration: 0.5,
            ease: [0.4, 0.0, 0.2, 1],
          }}
          viewport={{
            amount: 1, // 50% de l'élément doit être visible pour déclencher l'animation
          }}
        >
          Ensemble, ils allient créativité, expertise et passion pour fournir un
          service exceptionnel, garantissant des résultats concrets pour chaque
          projet.
        </motion.p>
        <Team />
      </>
    ),
    badge: "Équipe",
  },
  {
    title: "Une Vision Ambitieuse",
    description: (
      <>
        <motion.p
          id="vision"
          initial={{
            opacity: 0,
            y: 20,
          }}
          whileInView={{
            opacity: 1,
            y: [20, -5, 0],
          }}
          transition={{
            duration: 0.5,
            ease: [0.4, 0.0, 0.2, 1],
          }}
          viewport={{
            amount: 1, // 50% de l'élément doit être visible pour déclencher l'animation
          }}
        >
          Ikovaline vise un objectif ambitieux : atteindre{" "}
          <Cover>300 000 € </Cover> de chiffre d’affaires avant 2026. Avec une
          approche centrée sur la satisfaction client, l’équipe travaille sans
          relâche pour offrir des services innovants, rapides et efficaces.
        </motion.p>
        <motion.p
          initial={{
            opacity: 0,
            y: 20,
          }}
          whileInView={{
            opacity: 1,
            y: [20, -5, 0],
          }}
          transition={{
            duration: 0.5,
            ease: [0.4, 0.0, 0.2, 1],
          }}
          viewport={{
            amount: 1, // 50% de l'élément doit être visible pour déclencher l'animation
          }}
        >
          <IconQuote
            stroke={2}
            className="inline-block h-6 w-6 text-neutral-500 align-top"
          />
          <span className="text-neutral-500">
            Nous croyons en l’idée qu’une petite équipe passionnée peut
            accomplir de grandes choses, en aidant nos clients à atteindre et
            dépasser leurs objectifs.
          </span>
          <IconQuote
            stroke={2}
            className="inline-block h-6 w-6 text-neutral-500 align-top"
          />
          <span className="ml-1 block text-neutral-600 font-semibold">
            - Florent Ghizzoni.
          </span>
        </motion.p>
      </>
    ),
    badge: "Vision",
  },
];
