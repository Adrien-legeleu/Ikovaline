"use client";
import { cn } from "@/lib/utils";
import React from "react";
import { BentoGrid, BentoGridItem } from "../../ui/bento-grid";
import {
  IconBrandInstagram,
  IconBriefcase,
  IconChartBar,
  IconDeviceLaptop,
  IconMapPin,
} from "@tabler/icons-react";
import { motion } from "framer-motion";
import ImgLogoUnique from "@/public/images/logo/ikovaline_logo_unique.png";

import { IconBuildingStore } from "@tabler/icons-react";
import { SkeletonThreeComponent } from "./SkeletonThree";
import { SkeletonTwoComponent } from "./SkeletonTwo";
import { SkeletonFourComponent } from "./SkeletonFour";
import { SkeletonFiveComponent } from "./SkeletonFive";
import Image from "next/image";

export default function Services() {
  return (
    <div className="py-32">
      <h2
        className={
          "max-md:flex hidden sm:text-4xl text-3xl items-center justify-center mb-12  font-semibold bg-gradient-to-t from-neutral-400 to-neutral-700 bg-clip-text text-transparent "
        }
      >
        Nos Services
      </h2>
      <BentoGrid className="md:max-w-5xl  max-w-sm relative mx-auto md:auto-rows-[28rem]  auto-rows-[29rem]">
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
    </div>
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
      className=" w-full  relative h-auto  pt-5 gap-4  text-xs grid grid-cols-2 dark:bg-dot-white/[0.15] bg-dot-black/[0.1] flex-col "
    >
      <motion.div variants={variantsSecond} className="space-y-4">
        <div className="w-full text-sm bg-white dark:bg-neutral-700 text-neutral-400 rounded-full shadow-lg py-1 px-2 border">
          recherche
        </div>
        <div className="space-y-2">
          <div className="space-y-1 flex flex-col  border border-red-300 rounded-xl p-1">
            <span className="text-sm text-neutral-500 flex gap-1 items-center ">
              {" "}
              <Image
                width={30}
                height={30}
                src={ImgLogoUnique}
                alt="ikovaline logo"
                className="w-3 h-3"
              />
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
      <div className="h-full border border-neutral-100 dark:border-neutral-700 absolute top-0 left-1/2 -translate-x-1/2" />
      <motion.div variants={variants}>
        <div>
          <IconBuildingStore
            stroke={2}
            width={55}
            height={55}
            className="mx-auto text-neutral-300 dark:text-neutral-700"
          />
        </div>
        <div>
          <span className="text-base flex  text-neutral-500 gap-2 items-center">
            {" "}
            <Image
              width={50}
              height={50}
              src={ImgLogoUnique}
              alt="ikovaline logo"
              className="h-5 w-5"
            />
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
      className="flex flex-1 w-full h-full dark:bg-dot-white/[0.15] bg-dot-black/[0.1] flex-col space-y-2"
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
      className="flex flex-1 w-full h-full mt-4  rounded-lg  flex-col space-y-2"
    >
      <SkeletonThreeComponent className=" " />
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
      className="flex flex-1 w-full h-full items-center justify-center pt-4  bg-dot-black/[0.1]  flex-col space-y-2"
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
        Améliorez votre positionnement local grâce à une gestion stratégique de
        votre fiche Google My Business et des avis clients. Gagnez en
        visibilité, en crédibilité, et attirez plus de prospects.
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
        Déployez des campagnes engageantes sur Instagram, Facebook, TikTok et
        LinkedIn avec une stratégie de contenu SEO-friendly. Renforcez votre
        notoriété et générez du trafic qualifié.
      </span>
    ),
    header: <SkeletonTwo />,
    className: "md:col-span-1",
    icon: <IconBrandInstagram className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "Lancement de Campagnes Publicitaires",
    description: (
      <span className="text-sm">
        Lancez des campagnes Google Ads et Social Ads ciblées pour booster vos
        conversions. Augmentez votre retour sur investissement (ROI) grâce à une
        stratégie publicitaire maîtrisée.
      </span>
    ),
    header: <SkeletonFour />,
    className: "md:col-span-1",
    icon: <IconChartBar className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "Création & Optimisation de Sites Internet",
    description: (
      <span className="text-sm">
        Conception de sites vitrines et e-commerce performants, optimisés SEO,
        mobile-first et rapides. Offrez à vos visiteurs une expérience fluide
        sur tous les appareils.
      </span>
    ),
    header: <SkeletonThree />,
    className: "md:col-span-2 md:order-5",
    icon: <IconDeviceLaptop className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "Consulting en Développement Commercial",
    description: (
      <span className="text-sm">
        Bénéficiez de conseils stratégiques pour structurer votre prospection,
        améliorer vos ventes et automatiser votre croissance grâce au digital.
      </span>
    ),
    header: <SkeletonFive />,
    className: "md:col-span-1 md:order-4 ",
    icon: <IconBriefcase className="h-4 w-4 text-neutral-500" />,
  },
];
