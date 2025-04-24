"use client";
import React from "react";
import type { Metadata } from "next";
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

export const metadata: Metadata = {
  title: "À propos d'Ikovaline - Notre Histoire et Équipe",
  description:
    "Découvrez l'histoire, les valeurs et l'équipe passionnée qui se cache derrière Ikovaline, la start-up étudiante experte en marketing digital.",
  openGraph: {
    title: "À propos d'Ikovaline - Notre Histoire et Équipe",
    description:
      "Plongez dans les coulisses d'Ikovaline : notre parcours, notre vision et les personnes qui façonnent l'accompagnement digital de demain.",
    url: "https://www.ikovaline.com/about",
    type: "website",
    images: [
      {
        url: "/images/logo/ikovaline_logo.png",
        width: 1200,
        height: 630,
        alt: "Ikovaline Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "À propos d'Ikovaline - Notre Histoire et Équipe",
    description:
      "Découvrez qui se cache derrière Ikovaline et comment notre équipe vous accompagne dans votre transformation digitale.",
    images: ["/images/logo/ikovaline_logo.png"],
  },
};

export default function Page() {
  return (
    <div className="max-w-[1400px] mx-auto">
      <TracingBeam className="px-6 my-20 ">
        <div className="max-w-3xl mx-auto antialiased pt-4 relative max-lg:px-5">
          {ikovalineContent.map((item, index) => (
            <div key={`content-${index}`} className="mb-10" id={item.id}>
              <p className="bg-[#2B92C6] text-white rounded-full text-sm w-fit px-4 py-1 mb-4">
                {item.badge}
              </p>
              <h2 className="md:text-5xl xs:text-4xl text-3xl mb-12 text-center font-semibold bg-gradient-to-t from-neutral-300 to-neutral-600 bg-clip-text text-transparent">
                {item.title}
              </h2>
              <div className="sm:text-lg text-base space-y-5 text-center leading-loose prose prose-sm dark:prose-invert">
                {item.description}
              </div>
            </div>
          ))}
        </div>
      </TracingBeam>
      <CallToAction
        title="Faites passer votre business au niveau supérieur avec Ikovaline"
        desc="Profitez de notre expertise en marketing digital pour transformer vos idées en succès. Contactez-nous et développons des solutions sur mesure."
        textBtn="Contactez-nous dès maintenant !"
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
          className="leading-9"
        >
          Fondée par <Highlight className="p-2 m-1">Florent Ghizzoni</Highlight>
          , Ikovaline est une start-up spécialisée en marketing digital née de
          la volonté d&lsquo;aider les entreprises à réussir leur transformation
          numérique. Grâce à son expertise en business développement et en
          marketing stratégique, Florent a su répondre aux besoins des petites
          et moyennes entreprises, en proposant des solutions personnalisées et
          accessibles.
        </motion.p>
        <div className="grid sm:grid-cols-2 grid-cols-1 gap-8">
          <Image
            src={ImageHistory1}
            alt="Équipe Ikovaline en collaboration sur projets de transformation numérique et marketing digital"
            width={500}
            height={500}
            className="rounded-3xl w-full aspect-square object-cover object-center"
          />
          <Image
            src={ImageHistory2}
            alt="Équipe Ikovaline en réunion de stratégie digitale"
            width={500}
            height={500}
            className="rounded-3xl w-full max-sm:hidden aspect-square object-cover object-bottom"
          />
        </div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: [20, -5, 0] }}
          transition={{ duration: 0.5, ease: [0.4, 0.0, 0.2, 1] }}
          viewport={{ amount: 1 }}
          className="leading-9"
        >
          Ikovaline <Highlight className="p-2 m-1">se démarque</Highlight> par
          une mission claire : accompagner les entreprises à se développer dans
          un écosystème numérique en constante évolution, grâce à des services à
          forte valeur ajoutée.
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
          className="leading-9"
        >
          Chez Ikovaline, nous aidons nos clients à réussir grâce à une équipe
          <Highlight className="p-2 m-1">passionnée</Highlight>et{" "}
          <Highlight className="p-2 m-1">engagée</Highlight>. Avec nos
          compétences en marketing digital, développement commercial et gestion
          de projets, nous créons des solutions adaptées à chaque entreprise
          pour les aider à atteindre leurs objectifs.
        </motion.p>

        <Team />
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: [20, -5, 0] }}
          transition={{ duration: 0.5, ease: [0.4, 0.0, 0.2, 1] }}
          viewport={{ amount: 1 }}
          className="leading-9"
        >
          Ensemble, nous partageons une vision commune : accompagner les
          entreprises dans leur transition numérique, tout en garantissant des
          résultats
          <Highlight className="p-2 m-1 ">concrets</Highlight> et{" "}
          <Highlight className="p-2 m-1 "> mesurables</Highlight>. Nous mettons
          un point d’honneur à maintenir une approche humaine et personnalisée
          dans chacun de nos projets.
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
          className="leading-9"
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
          className="leading-8"
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
  {
    title: "Garantie de Résultats ou Remboursement",
    id: "notre-garantie",
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
            amount: 1,
          }}
          className="leading-9"
        >
          Chez Ikovaline, nous croyons en des résultats concrets. Si nos
          solutions ne répondent pas aux objectifs que nous avons définis
          ensemble, nous vous remboursons{" "}
          <Highlight className="p-2 m-1 ">intégralement</Highlight>. Votre
          satisfaction est notre priorité.
        </motion.p>
      </>
    ),
    badge: "Remboursement garanti",
  },
];
