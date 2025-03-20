"use client";
import { TextAnimate } from "@/components/ui/text-animate";
import Image from "next/image";
import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  IconChartBar,
  IconMapPin,
  IconShield,
  IconUsers,
} from "@tabler/icons-react";
import { AnimatedShinyText } from "@/components/magicui/animated-shiny-text";
import { NeonGradientCard } from "@/components/magicui/neon-gradient-card";

export default function page() {
  const [valueIdText, setValueIdText] = useState("visibilité accrue");
  return (
    <div>
      <div className="min-h-screen h-full items-center justify-center flex pt-24 flex-col">
        <h1 className=" sm:text-4xl md:text-5xl max-w-3xl mx-auto text-3xl items-center justify-center text-center py-2  mb-12 font-bold bg-gradient-to-t from-neutral-500 to-neutral-800 dark:to-neutral-500 dark:from-neutral-200 bg-clip-text text-transparent">
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
          className="object-cover w-1/2 relative bottom-20"
          width={1800}
          height={1600}
          src={"/images/services/service-mobile (1).png"}
          alt="mobile service"
        />
      </div>
      <div className="py-24 flex items-center space-y-12 justify-center flex-col">
        <h2 className=" sm:text-4xl max-w-xl mx-auto text-3xl items-center justify-center text-center   font-bold bg-gradient-to-t from-neutral-500 to-neutral-800 dark:to-neutral-500 dark:from-neutral-200 bg-clip-text text-transparent">
          Des questions sur notre service ? <br /> Nous avons les réponses !
        </h2>
        <p className="text-muted-foreground  dark:text-neutral-400 font-poppins max-sm:px-2 max-w-lg text-center xs:text-xs md:text-lg">
          91 % des consommateurs consultent les avis en ligne avant de faire un
          achat. Des retours positifs augmentent votre crédibilité et améliorent
          votre référencement local. Inversement, un mauvais score peut faire
          fuir vos prospects.
        </p>
        <NeonGradientCard className="max-w-sm items-center justify-center text-center">
          <AnimatedShinyText className="inline-flex text-8xl font-extrabold items-center justify-center px-4 py-1 transition ease-out hover:text-neutral-600 hover:duration-300 hover:dark:text-neutral-50">
            <span>91%</span>
          </AnimatedShinyText>
          <span className="inline-block text-muted-foreground dark:text-neutral-400  font-poppins ">
            des consommateurs se fient aux avis en ligne.{" "}
          </span>
        </NeonGradientCard>
      </div>
      <div className="md:px-10 py-24 space-y-12 px-5">
        <h2 className=" sm:text-4xl max-w-xl mx-auto text-3xl items-center justify-center text-center   font-bold bg-gradient-to-t from-neutral-500 to-neutral-800 dark:to-neutral-500 dark:from-neutral-200 bg-clip-text text-transparent">
          Surveillance, analyse et réponses personnalisées
        </h2>
        <div className="grid xl:grid-cols-3 sm:grid-cols-4 grid-cols-1 w-full gap-6">
          {cards.map((card, index) => (
            <div
              key={index}
              className={`outer aspect-square ${
                index === cards.length - 1
                  ? "sm:col-span-2 sm:col-start-2 xl:col-span-1" // Centrage en sm et normal en xl
                  : "sm:col-span-2 xl:col-span-1"
              }`}
            >
              <div className="dot"></div>
              <div className="card">
                <div className="ray"></div>
                <div
                  className="text-3xl pt-[15%] text-center mx-[15%] font-bold 
          bg-[linear-gradient(45deg,_#cacaca_4%,_#000000,_#ffffff)] 
          dark:bg-[linear-gradient(45deg,_#2b2b2b_4%,_#ffffff,_#000000)] 
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
        <div className="flex flex-col pt-12 gap-10 items-center justify-center">
          <div className="relative p-2 bg-[#F4F4F4] dark:bg-neutral-800 rounded-3xl shadow-product flex  justify-center">
            <ul className="relative flex flex-row flex-wrap items-center justify-center  gap-2 w-full ">
              {valuesData.map((value) => (
                <motion.li
                  key={value.title}
                  className="p-2 font-semibold  flex w-auto  gap-2 cursor-pointer relative rounded-full"
                  onClick={() => setValueIdText(value.title.toLowerCase())}
                >
                  {value.title.toLowerCase() === valueIdText && (
                    <motion.div
                      layoutId="activeBg"
                      className="absolute w-full inset-0 shadow-neumorphic2 bg-white dark:bg-neutral-900 rounded-full"
                      transition={{
                        type: "spring",
                        stiffness: 200,
                        damping: 20,
                      }}
                    />
                  )}
                  <span className="relative whitespace-nowrap flex w-full text-xs sm:text-sm gap-2 px-3 ">
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
                    className=" w-full p-5 max-w-md space-y-2 bg-white dark:bg-neutral-800 rounded-3xl shadow-product"
                  >
                    <div className="flex gap-1 items-start flex-col">
                      <span className="inline-block text-sm  bg-emerald-100 px-2 py-[2px] text-emerald-400 dark:bg-emerald-800 dark:text-emerald-500 rounded-lg">
                        {value.subdesc1}
                      </span>
                      <span className="inline-block text-sm  bg-cyan-100 px-2 py-[2px] text-cyan-400  dark:bg-cyan-800 dark:text-cyan-500 rounded-lg">
                        {value.subdesc2}
                      </span>
                    </div>

                    <h3 className="font-semibold  text-lg md:text-xl">
                      {value.title}
                    </h3>

                    <p className="text-sm text-darkgrey md:text-base">
                      {value.description}
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
    title: "Visibilité accrue",
    description:
      "Améliorez votre classement sur Google Maps et attirez plus de clients locaux.",

    subdesc1: "Google Maps",
    subdesc2: "SEO local",
    icon: <IconMapPin className="text-secondary w-6 h-6" />,
  },
  {
    title: "Crédibilité renforcée",
    description:
      "Des avis positifs rassurent vos prospects et augmentent votre taux de conversion.",
    subdesc1: "Confiance",
    subdesc2: "Réputation",
    icon: <IconShield className="text-secondary w-6 h-6" />,
  },
  {
    title: "Fidélisation optimisée",
    description:
      "Une relation client positive encourage les clients à revenir et à recommander votre entreprise.",
    subdesc1: "Expérience client",
    subdesc2: "Recommandations",
    icon: <IconUsers className="text-secondary w-6 h-6" />,
  },
  {
    title: "Plus de trafic",
    description:
      "Augmentez les visites en boutique et le trafic vers votre site web.",
    subdesc1: "Points de vente",
    subdesc2: "Site web",
    icon: <IconChartBar className="text-secondary w-6 h-6" />,
  },
];
