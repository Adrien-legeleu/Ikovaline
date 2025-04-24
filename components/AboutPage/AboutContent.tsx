"use client";
import Image from "next/image";
import { TracingBeam } from "@/components/ui/tracing-beam";
import { Team } from "@/components/AboutPage/Team";
import ImageHistory1 from "@/public/images/About/team-ikovaline (3).jpg";
import ImageHistory2 from "@/public/images/About/team-ikovaline (4).jpg";
import { Highlight } from "@/components/ui/hero-highlight";
import { motion } from "framer-motion";
import { Cover } from "@/components/ui/cover";
import { IconQuote } from "@tabler/icons-react";

export default function AboutContent() {
  return (
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
          , Ikovaline est une start-up spécialisée dans le marketing digital et
          la transformation numérique. Née d’une volonté forte d’accompagner les
          entreprises dans leur croissance, elle propose des solutions digitales
          personnalisées pour améliorer la visibilité, le développement
          commercial et les performances globales.
        </motion.p>

        <div className="grid sm:grid-cols-2 grid-cols-1 gap-8">
          <Image
            src={ImageHistory1}
            alt="Équipe Ikovaline en collaboration sur projets de transformation numérique et marketing digital"
            width={500}
            height={500}
            className="rounded-3xl w-full shadow-xl aspect-square object-cover object-center"
          />
          <Image
            src={ImageHistory2}
            alt="Équipe Ikovaline en réunion de stratégie digitale"
            width={500}
            height={500}
            className="rounded-3xl w-full shadow-xl max-sm:hidden aspect-square object-cover object-bottom"
          />
        </div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: [20, -5, 0] }}
          transition={{ duration: 0.5, ease: [0.4, 0.0, 0.2, 1] }}
          viewport={{ amount: 1 }}
          className="leading-9"
        >
          Ikovaline <Highlight className="p-2 m-1">se distingue</Highlight> par
          sa mission : accélérer la digitalisation des entreprises avec des
          services innovants et sur-mesure. Grâce à une approche orientée
          résultats, l’équipe aide chaque client à franchir un cap stratégique
          dans un environnement numérique en constante évolution.
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
          Chez Ikovaline, la réussite de nos clients repose sur une équipe
          marketing <Highlight className="p-2 m-1">passionnée</Highlight> et{" "}
          <Highlight className="p-2 m-1">engagée</Highlight>. Experts en
          stratégie digitale, développement commercial et gestion de projet,
          nous créons des solutions personnalisées qui boostent la visibilité en
          ligne et la croissance durable des entreprises.
        </motion.p>

        <Team />

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: [20, -5, 0] }}
          transition={{ duration: 0.5, ease: [0.4, 0.0, 0.2, 1] }}
          viewport={{ amount: 1 }}
          className="leading-9"
        >
          Ensemble, nous partageons une mission : accompagner les professionnels
          dans leur transformation numérique. Notre objectif ? Fournir des
          résultats <Highlight className="p-2 m-1">durables</Highlight> et{" "}
          <Highlight className="p-2 m-1">mesurables</Highlight>, en plaçant
          l’humain au cœur de chaque stratégie.
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
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: [20, -5, 0] }}
          transition={{ duration: 0.5, ease: [0.4, 0.0, 0.2, 1] }}
          viewport={{ amount: 1 }}
          className="leading-9"
        >
          Ikovaline porte une vision claire : atteindre un chiffre d'affaires de{" "}
          <Cover>300 000 €</Cover> d’ici 2026. Cette ambition s’appuie sur notre
          capacité à proposer des services digitaux{" "}
          <Highlight className="p-2 m-1">performants</Highlight> et à offrir un
          accompagnement <Highlight className="p-2 m-1">personnalisé</Highlight>{" "}
          pour chaque entreprise.
        </motion.p>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: [20, -5, 0] }}
          transition={{ duration: 0.5, ease: [0.4, 0.0, 0.2, 1] }}
          viewport={{ amount: 1 }}
          className="leading-8"
        >
          <IconQuote
            stroke={2}
            className="inline-block h-6 w-6 text-neutral-500 align-top"
          />
          <span className="text-neutral-500">
            Nous croyons que la réussite passe par une stratégie numérique
            adaptée
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
          Chez Ikovaline, nous misons sur la performance digitale et des
          résultats <Highlight className="p-2 m-1">concrets</Highlight>. Si nos
          solutions personnalisées ne permettent pas d’atteindre les objectifs
          fixés ensemble, nous vous remboursons{" "}
          <Highlight className="p-2 m-1">intégralement</Highlight>. Votre
          satisfaction est au cœur de notre engagement.
        </motion.p>
      </>
    ),
    badge: "Remboursement garanti",
  },
];
