"use client";
import React from "react";
import Image from "next/image";
import { TracingBeam } from "@/components/ui/tracing-beam";
import { Team } from "@/components/AboutPage/Team";
import ImageHistory1 from "@/public/images/About/team-ikovaline (3).jpg";
import ImageHistory2 from "@/public/images/About/team-ikovaline (4).jpg";
import { Highlight } from "@/components/ui/hero-highlight";
import { motion } from "framer-motion";
import { Cover } from "@/components/ui/cover";
import { IconQuote } from "@tabler/icons-react";
import { CallToAction } from "@/components/callToAction/CallToAction";

export default function Page() {
  return (
    <div className="max-w-[1400px] mx-auto">
      {" "}
      <TracingBeam className="px-6 my-20 ">
        <div className="max-w-3xl mx-auto antialiased pt-4 relative max-lg:px-5">
          {ikovalineContent.map((item, index) => (
            <div key={`content-${index}`} className="mb-10" id={item.id}>
              <p className="bg-[#2B92C6] text-white rounded-full text-sm w-fit px-4 py-1 mb-4">
                {item.badge}
              </p>

              <h2
                className={
                  "text-5xl mb-12 text-center font-semibold bg-gradient-to-t from-neutral-300 to-neutral-600 bg-clip-text text-transparent "
                }
              >
                {item.title}
              </h2>

              <div className="sm:text-lg text-base space-y-5 text-center leading-loose  prose prose-sm dark:prose-invert">
                {item.description}
              </div>
            </div>
          ))}
        </div>
      </TracingBeam>
      <CallToAction
        title="Passez à l&lsquo;action avec Ikovaline"
        desc="Notre expertise en marketing digital est à votre service. Discutez avec nous pour développer des solutions adaptées à vos besoins."
        textBtn="Prenez contact !"
      />
    </div>
  );
}

const ikovalineContent = [
  {
    title: "Les Origines d’Ikovaline",
    id: "notre-histoire",
    description: (
      <>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: [20, -5, 0] }}
          transition={{ duration: 0.5, ease: [0.4, 0.0, 0.2, 1] }}
          viewport={{ amount: 0.5 }}
        >
          Fondée par <Highlight className="p-2">Florent Ghizzoni</Highlight>,
          Ikovaline est une start-up spécialisée en marketing digital née de la
          volonté d&lsquo;aider les entreprises à réussir leur transformation
          numérique. Grâce à son expertise en business développement et en
          marketing stratégique, Florent a su répondre aux besoins des petites
          et moyennes entreprises, en proposant des solutions personnalisées et
          accessibles.
        </motion.p>
        <div className="grid sm:grid-cols-2 grid-cols-1 gap-8">
          <Image
            src={ImageHistory1}
            alt="Présentation d'Ikovaline"
            width={200}
            height={200}
            className="rounded-3xl w-full  aspect-square object-cover object-center"
          />
          <Image
            src={ImageHistory2}
            alt="Présentation d'Ikovaline"
            width={200}
            height={200}
            className="rounded-3xl w-full max-sm:hidden aspect-square object-cover object-bottom"
          />
        </div>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: [20, -5, 0] }}
          transition={{ duration: 0.5, ease: [0.4, 0.0, 0.2, 1] }}
          viewport={{ amount: 1 }}
        >
          Ikovaline se démarque par une mission claire :{" "}
          <Highlight className="p-2">accompagner les entreprises</Highlight> à
          se développer dans un écosystème numérique en constante évolution,
          grâce à des services à forte valeur ajoutée.
        </motion.p>
      </>
    ),
    badge: "Histoire",
  },

  {
    title: "Une Équipe Passionnée",
    id: "notre-equipe",
    description: (
      <>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: [20, -5, 0] }}
          transition={{ duration: 0.5, ease: [0.4, 0.0, 0.2, 1] }}
          viewport={{ amount: 1 }}
        >
          Chez Ikovaline, nous aidons nos clients à réussir grâce à{" "}
          <Highlight className="p-2">une équipe passionnée</Highlight>et
          engagée. Avec nos compétences en marketing digital, développement
          commercial et gestion de projets, nous créons des solutions adaptées à
          chaque entreprise pour les aider à atteindre leurs objectifs.
        </motion.p>

        <Team />
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: [20, -5, 0] }}
          transition={{ duration: 0.5, ease: [0.4, 0.0, 0.2, 1] }}
          viewport={{ amount: 1 }}
        >
          Ensemble, nous partageons une vision commune : accompagner les
          entreprises dans leur transition numérique, tout en garantissant des
          <Highlight className="p-2">
            résultats concrets et mesurables
          </Highlight>{" "}
          . Nous mettons un point d’honneur à maintenir une approche humaine et
          personnalisée dans chacun de nos projets.
        </motion.p>
      </>
    ),
    badge: "Équipe",
  },
  {
    title: "Une Vision Ambitieuse",
    id: "notre-vision",
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
            amount: 1, // 50% de l'élément doit être visible pour déclencher l'animation
          }}
        >
          Ikovaline vise un objectif ambitieux : atteindre{" "}
          <Cover>300 000 € </Cover> de chiffre d’affaires avant 2026. Notre
          engagement envers nos clients repose sur une satisfaction maximale
          grâce à des services performants et innovants.
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
