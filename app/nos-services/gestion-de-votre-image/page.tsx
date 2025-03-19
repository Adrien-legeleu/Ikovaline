"use client";
import { TextAnimate } from "@/components/ui/text-animate";
import Image from "next/image";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { IconBulb, IconHeartHandshake, IconLeaf } from "@tabler/icons-react";

export default function page() {
  const [valueIdText, setValueIdText] = useState("innovation");
  return (
    <div>
      <div className="min-h-screen h-full items-center justify-center flex pt-24 flex-col">
        <h1 className=" sm:text-4xl text-3xl max-w-2xl items-center justify-center text-center py-2  mb-12 font-bold bg-gradient-to-t from-neutral-500 to-neutral-800 dark:to-neutral-500 dark:from-neutral-200 bg-clip-text text-transparent">
          Gestion de votre image en ligne : Maximisez votre crédibilité sur
          Google
        </h1>

        <TextAnimate
          animation="blurInUp"
          by="word"
          className="text-muted-foreground dark:text-neutral-400 font-poppins max-sm:px-2 max-w-lg text-center xs:text-xs md:text-lg"
        >
          Prenez le contrôle de votre e-réputation en gérant efficacement vos
          avis Google et votre fiche Google My Business. Découvrez comment une
          image en ligne soignée attire plus de clients et renforce votre
          notoriété.
        </TextAnimate>
        <Image
          className="object-cover w-full"
          width={1800}
          height={1600}
          src={"/images/services/service-mobile.png"}
          alt="mobile service"
        />
      </div>
      <div className="py-24">
        <h2 className=" sm:text-4xl text-3xl items-center justify-center text-center   font-bold bg-gradient-to-t from-neutral-500 to-neutral-800 dark:to-neutral-500 dark:from-neutral-200 bg-clip-text text-transparent">
          Des questions sur notre service ? <br /> Nous avons les réponses !
        </h2>
        <p>
          91 % des consommateurs consultent les avis en ligne avant de faire un
          achat. Des retours positifs augmentent votre crédibilité et améliorent
          votre référencement local. Inversement, un mauvais score peut faire
          fuir vos prospects.
        </p>
      </div>
      <div className="md:px-10 py-24 px-5">
        <h2 className=" sm:text-4xl text-3xl items-center justify-center text-center   font-bold bg-gradient-to-t from-neutral-500 to-neutral-800 dark:to-neutral-500 dark:from-neutral-200 bg-clip-text text-transparent">
          Surveillance, analyse et réponses personnalisées
        </h2>
        <div className="grid grid-cols-3 w-full gap-6">
          {cards.map((card, index) => (
            <div key={index} className="outer aspect-square">
              <div className="dot"></div>
              <div className="card">
                <div className="ray"></div>
                <div
                  className="text-3xl pt-[15%] text-center mx-[10%] font-bold 
          bg-[linear-gradient(45deg,_#ffffff_4%,_#000000,_#ffffff)] 
          dark:bg-[linear-gradient(45deg,_#000000_4%,_#ffffff,_#000000)] 
          bg-clip-text text-transparent"
                >
                  {card.text}
                </div>
                <p className="text-center text-gray-600 dark:text-neutral-400 text-sm px-4 mt-8 mx-[10%]">
                  {card.subtext}
                </p>
                <div className="line topl"></div>
                <div className="line leftl"></div>
                <div className="line bottoml"></div>
                <div className="line rightl"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="md:px-10 py-24 px-5">
        <h2 className=" sm:text-4xl text-3xl items-center justify-center text-center   font-bold bg-gradient-to-t from-neutral-500 to-neutral-800 dark:to-neutral-500 dark:from-neutral-200 bg-clip-text text-transparent">
          Les bénéfices pour votre entreprise
        </h2>
        <div className="space-y-10 sm:grid sm:grid-cols-2 sm:gap-10 items-center justify-center">
          <div className="relative p-5 bg-[#F4F4F4] rounded-3xl shadow-product flex justify-center">
            <ul className="relative flex flex-col gap-2 w-full ">
              {valuesData.map((value) => (
                <motion.li
                  key={value.title}
                  className="p-2 font-semibold  flex w-full  gap-2 cursor-pointer relative rounded-full"
                  onClick={() => setValueIdText(value.title.toLowerCase())}
                >
                  {value.title.toLowerCase() === valueIdText && (
                    <motion.div
                      layoutId="activeBg"
                      className="absolute w-full inset-0 shadow-neumorphic2 bg-white rounded-full"
                      transition={{
                        type: "spring",
                        stiffness: 200,
                        damping: 15,
                      }}
                    />
                  )}
                  <span className="relative flex w-full justify-center items-center text-sm gap-2 px-3 ">
                    {value.icon}
                    {value.title}
                  </span>
                </motion.li>
              ))}
            </ul>
          </div>

          <div className="relative ">
            {valuesData.map(
              (value) =>
                valueIdText === value.title.toLowerCase() && (
                  <motion.div
                    key={value.title}
                    initial={{ x: 150, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: -50, opacity: 0 }}
                    transition={{ type: "spring", stiffness: 150, damping: 12 }}
                    className=" w-full p-5 space-y-2 bg-white rounded-3xl shadow-product"
                  >
                    <div className="flex gap-1 items-start flex-col">
                      <span className="inline-block text-sm  bg-orange-100 px-2 py-[2px] text-orange-400 rounded-lg">
                        {value.subdesc}
                      </span>
                      <span className="inline-block text-sm  bg-blue-100 px-2 py-[2px] text-blue-400 rounded-lg">
                        {value.subdesc2}
                      </span>
                    </div>

                    <h3 className="font-semibold text-lg md:text-xl">
                      {value.subtitle}
                    </h3>

                    <p className="text-sm text-darkgrey md:text-base">
                      {value.desc}
                    </p>
                  </motion.div>
                )
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

const cards = [
  {
    text: "Surveillance continue",
    subtext:
      "Nous suivons en temps réel les nouveaux avis et alertons en cas de commentaire négatif.",
  },
  {
    text: "Analyse approfondie",
    subtext:
      "Nous identifions les axes d’amélioration pour transformer un retour mitigé en opportunité de satisfaction client.",
  },
  {
    text: "Optimisation de votre fiche Google My Business",
    subtext:
      "Mise à jour régulière des informations (horaires, photos, offres) pour maintenir un profil complet et attractif.",
  },
];

const valuesData = [
  {
    title: "Innovation",
    icon: <IconBulb />,
    desc: "Chaque projet chez Lynelec est une opportunité d’explorer de nouvelles solutions, d’adopter les meilleures technologies et d’anticiper les besoins de demain.",
    subtitle: "Innover pour transformer",
    subdesc: "Repousser les limites",
    subdesc2: "Des technologies de pointe",
  },
  {
    title: "Engagement",
    icon: <IconHeartHandshake />,
    desc: "Nous nous engageons à offrir des solutions durables et adaptées, en accompagnant chaque client avec écoute et professionnalisme.",
    subtitle: "Un partenaire de confiance",
    subdesc: "Fiabilité et expertise",
    subdesc2: "Proximité avec nos clients",
  },
  {
    title: "Durabilité",
    icon: <IconLeaf />,
    desc: "Chez Lynelec, chaque innovation est pensée pour réduire l’impact environnemental et favoriser un développement plus respectueux de la planète.",
    subtitle: "Un futur plus vert",
    subdesc: "Énergies responsables",
    subdesc2: "Une vision éco-conçue",
  },
];
