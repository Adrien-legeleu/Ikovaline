"use client";
import { cn } from "@/lib/utils";
import React from "react";
import { BentoGrid, BentoGridItem } from "../../ui/bento-grid";
import {
  IconBoxAlignRightFilled,
  IconFileBroken,
  IconMapPin,
  IconSignature,
  IconTableColumn,
} from "@tabler/icons-react";
import { motion } from "framer-motion";

import { IconBuildingStore } from "@tabler/icons-react";
import { SkeletonThreeComponent } from "./SkeletonThree";
import { SkeletonTwoComponent } from "./SkeletonTwo";
import { SkeletonFourComponent } from "./SkeletonFour";
import { SkeletonFiveComponent } from "./SkeletonFive";

export default function Services() {
  return (
    <BentoGrid className="md:max-w-5xl max-w-sm py-32 mx-auto md:auto-rows-[28rem]">
      <h2
        className={
          "max-md:flex hidden sm:text-4xl text-3xl items-center justify-center  mb-12 font-semibold bg-gradient-to-t from-neutral-400 to-neutral-700 bg-clip-text text-transparent "
        }
      >
        Nos Services
      </h2>
      {items.map((item, i) => (
        <BentoGridItem
          key={i}
          title={item.title}
          description={item.description}
          header={item.header}
          className={cn("[&>p:text-lg]", item.className)}
          icon={item.icon}
        />
      ))}
    </BentoGrid>
  );
}

const SkeletonOne = () => {
  const variants = {
    initial: {
      x: 0,
    },
    animate: {
      x: 8,
      rotate: 3,
      transition: {
        duration: 0.2,
      },
    },
  };
  const variantsSecond = {
    initial: {
      x: 0,
    },
    animate: {
      x: -8,
      rotate: -3,
      transition: {
        duration: 0.2,
      },
    },
  };

  return (
    <motion.div
      initial="initial"
      whileHover="animate"
      className=" w-full  relative h-auto  pt-2 gap-4  text-xs grid grid-cols-2 dark:bg-dot-white/[0.2] bg-dot-black/[0.1] flex-col "
    >
      <motion.div variants={variantsSecond} className="space-y-4">
        <div className="w-full text-sm bg-white text-neutral-400 rounded-full shadow-lg py-1 px-2 border">
          recherche
        </div>
        <div className="space-y-2">
          <div className="space-y-1 flex flex-col  border border-red-300 rounded-xl p-1">
            <span className="text-sm text-neutral-500 flex gap-1 items-center ">
              {" "}
              <div className="h-3 w-3 rounded-full bg-gradient-to-r from-pink-500 to-violet-500 flex-shrink-0" />
              Ikovaline
            </span>
            <span className="text-xs text-neutral-400">
              La start-up qui booste...
            </span>
          </div>
          <div className="space-y-1 flex flex-col">
            <div className="w-1/2 bg-neutral-100 h-4 rounded-full dark:bg-neutral-900" />
            <div className="w-full bg-neutral-100 h-4 rounded-full dark:bg-neutral-900" />
          </div>
          <div className="space-y-1 flex flex-col">
            <div className="w-1/2 bg-neutral-100 h-4 rounded-full dark:bg-neutral-900" />
            <div className="w-full bg-neutral-100 h-4 rounded-full dark:bg-neutral-900" />
          </div>
        </div>
      </motion.div>
      <div className="h-full border border-neutral-100 absolute top-0 left-1/2 -translate-x-1/2" />
      <motion.div variants={variants}>
        <div>
          <IconBuildingStore
            stroke={2}
            width={55}
            height={55}
            className="mx-auto text-neutral-300"
          />
        </div>
        <div>
          <span className="text-base flex  text-neutral-500 gap-2 items-center">
            {" "}
            <div className="h-5 w-5  rounded-full bg-gradient-to-r from-pink-500 to-violet-500 flex-shrink-0" />
            Ikovaline
          </span>
        </div>
        <div className="flex text-sm text-neutral-400 ">
          <span>⭐</span>
          <span>⭐</span>
          <span>⭐</span>
          <span>⭐</span>
          <span>⭐</span>
          <span>(87)</span>
        </div>
        <div className="text-xs text-neutral-400">buisness développement</div>
        <div className="w-full border my-2" />
        <div className="w-full bg-gray-100 h-4 rounded-full dark:bg-neutral-900" />
      </motion.div>
    </motion.div>
  );
};
const SkeletonTwo = () => {
  return (
    <motion.div
      initial="initial"
      animate="animate"
      whileHover="hover"
      className="flex flex-1 w-full h-full dark:bg-dot-white/[0.2] bg-dot-black/[0.1] flex-col space-y-2"
    >
      <SkeletonTwoComponent />
    </motion.div>
  );
};
const SkeletonThree = () => {
  const variants = {
    initial: {
      backgroundPosition: "0 50%",
    },
    animate: {
      backgroundPosition: ["0, 50%", "100% 50%", "0 50%"],
    },
  };
  return (
    <motion.div
      initial="initial"
      animate="animate"
      variants={variants}
      transition={{
        duration: 5,
        repeat: Infinity,
        repeatType: "reverse",
      }}
      className="flex flex-1 w-full h-full  rounded-lg bg-dot-black/[0.2] flex-col space-y-2"
    >
      <SkeletonThreeComponent className="p-1 " />
    </motion.div>
  );
};
const SkeletonFour = () => {
  return (
    <motion.div
      initial="initial"
      animate="animate"
      whileHover="hover"
      className="flex pt-4 w-full h-full bg-dot-black/[0.1] flex-row space-x-2"
    >
      <SkeletonFourComponent />
    </motion.div>
  );
};
const SkeletonFive = () => {
  return (
    <motion.div
      initial="initial"
      whileHover="animate"
      className="flex flex-1 w-full h-full items-center justify-center  bg-dot-black/[0.1] flex-col space-y-2"
    >
      <SkeletonFiveComponent />
    </motion.div>
  );
};
const items = [
  {
    title: "Google My Business & Avis Clients",
    description: (
      <span className="text-sm">
        Ikovaline vous aide à optimiser votre présence sur Google My Business et
        à gérer les avis clients pour améliorer votre visibilité en ligne.
      </span>
    ),
    header: <SkeletonOne />,
    className: "md:col-span-1",
    icon: <IconMapPin stroke={2} className="text-neutral-500" />,
  },
  {
    title: "Stratégie de Contenu & Réseaux Sociaux",
    description: (
      <span className="text-sm">
        Développez votre stratégie de contenu sur des plateformes comme
        Instagram, Facebook, TikTok, et LinkedIn pour engager votre audience et
        renforcer votre image de marque.
      </span>
    ),
    header: <SkeletonTwo />,
    className: "md:col-span-1",
    icon: <IconFileBroken className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "Lancement de Campagnes Publicitaires",
    description: (
      <span className="text-sm">
        Profitez des meilleures pratiques en publicité en ligne avec des
        campagnes Google Ads et Social Ads pour atteindre vos objectifs
        commerciaux et maximiser votre ROI.
      </span>
    ),
    header: <SkeletonFour />,
    className: "md:col-span-1",
    icon: <IconTableColumn className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "Création & Optimisation de Sites Internet",
    description: (
      <span className="text-sm">
        Nous créons des sites web vitrine et e-commerce adaptés à vos besoins,
        optimisés pour offrir une expérience utilisateur fluide et responsive
        sur tous les appareils.
      </span>
    ),
    header: <SkeletonThree />,
    className: "md:col-span-2",
    icon: <IconSignature className="h-4 w-4 text-neutral-500" />,
  },

  {
    title: "Consulting en Développement Commercial",
    description: (
      <span className="text-sm">
        Nous vous accompagnons dans le développement commercial en optimisant
        vos processus et stratégies pour atteindre une croissance durable.
      </span>
    ),
    header: <SkeletonFive />,
    className: "md:col-span-1",
    icon: <IconBoxAlignRightFilled className="h-4 w-4 text-neutral-500" />,
  },
];
