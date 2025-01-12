"use client";
import React from "react";
import Image from "next/image";
import { TracingBeam } from "@/components/ui/tracing-beam";
import { Team } from "@/components/AboutPage/Team";
import ImageHistory from "@/public/images/About/ikovaline-about.jpeg";
import { HeroHighlight, Highlight } from "@/components/ui/hero-highlight";
import { motion } from "framer-motion";

export default function Page() {
  return (
    <TracingBeam className="px-6 mt-20">
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
  );
}

const ikovalineContent = [
  {
    title: "Les Origines d’Ikovaline",
    description: (
      <>
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
            once: true, // L'animation ne se joue qu'une seule fois
            amount: 0.5, // 50% de l'élément doit être visible pour déclencher l'animation
          }}
        >
          Fondée par{" "}
          <Highlight className="py-2 px-2">Florent Ghizzoni</Highlight>,
          Ikovaline est née de l’ambition de proposer des solutions marketing
          digital abordables et personnalisées. Étudiant en alternance, Florent
          a su transformer son expertise en{" "}
          <Highlight className="py-2 px-2">business développement</Highlight> et{" "}
          <Highlight className="py-2 px-2">marketing stratégique</Highlight>{" "}
          pour répondre aux besoins des petites et moyennes entreprises.
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
            once: true, // L'animation ne se joue qu'une seule fois
            amount: 0.5, // 50% de l'élément doit être visible pour déclencher l'animation
          }}
        >
          Ikovaline, c’est avant tout l’histoire d’une vision : aider les
          entreprises à se démarquer dans un monde numérique en constante
          évolution, en offrant des services à forte valeur ajoutée accessibles
          à tous.
        </motion.p>
      </>
    ),
    badge: "Histoire",
  },
  {
    title: "Une Équipe Passionnée",
    description: (
      <>
        <p>
          L’équipe d’Ikovaline est composée de jeunes talents motivés, chacun
          ayant un rôle clé : Florent Ghizzoni (Fondateur et CEO), Samuel Garrel
          (Directeur Web-Marketing), Nathan Paré (Directeur Commercial), Adam
          Sauneron (Responsable Commercial), et bien d’autres.
        </p>
        <p>
          Ensemble, ils allient créativité, expertise et passion pour fournir un
          service exceptionnel, garantissant des résultats concrets pour chaque
          projet.
        </p>
        <Team />
      </>
    ),
    badge: "Équipe",
  },
  {
    title: "Une Vision Ambitieuse",
    description: (
      <>
        <p>
          Ikovaline vise un objectif ambitieux : atteindre 300 000 € de chiffre
          d’affaires avant 2026. Avec une approche centrée sur la satisfaction
          client, l’équipe travaille sans relâche pour offrir des services
          innovants, rapides et efficaces.
        </p>
        <p>
          “Nous croyons en l’idée qu’une petite équipe passionnée peut accomplir
          de grandes choses, en aidant nos clients à atteindre et dépasser leurs
          objectifs.” - Florent Ghizzoni.
        </p>
      </>
    ),
    badge: "Vision",
  },
];
