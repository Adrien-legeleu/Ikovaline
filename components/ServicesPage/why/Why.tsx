"use client";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import {
  IconDiscountCheck,
  IconCash,
  IconClock,
  IconMessage2,
  IconUsersGroup,
  IconShieldCheck,
} from "@tabler/icons-react";

export default function Why() {
  const features = [
    {
      title: "Un excellent rapport qualité/prix",
      description:
        "Des services digitaux performants à des tarifs étudiés, accessibles même pour les petites entreprises.",
      icon: <IconDiscountCheck className="text-secondary" />,
    },
    {
      title: "Garantie satisfait ou remboursé",
      description:
        "	Si nos solutions ne répondent pas à vos objectifs, nous vous remboursons intégralement.",
      icon: <IconCash className="text-secondary" />,
    },
    {
      title: "Des résultats rapides et mesurables",
      description:
        "Livraison rapide des projets, avec indicateurs clairs et impact mesurable.",
      icon: <IconClock className="text-secondary" />,
    },
    {
      title: "Suivi personnalisé & communication fluide",
      description:
        "Un accompagnement digital transparent, avec points réguliers et réponses rapides.",
      icon: <IconMessage2 className="text-secondary" />,
    },
    {
      title: "Une équipe engagée et expérimentée",
      description:
        "	Des spécialistes passionnés en marketing digital et développement commercial.",
      icon: <IconUsersGroup className="text-secondary" />,
    },
    {
      title: "Confiance et cadre sur-mesure",
      description:
        "Chaque mission est encadrée avec un plan d’action clair et une vraie relation de confiance.",
      icon: <IconShieldCheck className="text-secondary" />,
    },
  ];

  return (
    <div
      className=" max-w-5xl z-10 py-20 overflow-hidden  mx-auto"
      id="pourquoi-nous"
    >
      <h2 className="sm:text-4xl text-3xl items-center justify-center text-center mb-12 font-bold bg-gradient-to-t from-neutral-500 to-neutral-800 dark:to-neutral-500 dark:from-neutral-200 bg-clip-text text-transparent">
        6 raisons de faire équipe avec Ikovaline
      </h2>

      <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-3 xs:py-20 py-16 relative ">
        <div className="absolute h-60 w-60 dark:blur-[150px] blur-[100px] bg-secondary top-1/4 left-2/3  opacity-65" />
        {features.map((feature, index) => (
          <Feature key={feature.title} {...feature} index={index} />
        ))}
      </div>
    </div>
  );
}

const Feature = ({
  title,
  description,
  icon,
  index,
}: {
  title: string;
  description: string;
  icon: React.ReactNode;
  index: number;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.4, 0.0, 0.2, 1] }}
      viewport={{ amount: 0.5 }}
      className={cn(
        "flex flex-col lg:border-r py-4 xs:py-10 relative group/feature dark:border-neutral-800",
        (index === 0 || index === 4) && "lg:border-l dark:border-neutral-800",
        index < 4 && "lg:border-b dark:border-neutral-800"
      )}
    >
      {index < 4 && (
        <div className="opacity-0 group-hover/feature:opacity-25 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-t from-neutral-100 dark:from-neutral-800 to-transparent pointer-events-none" />
      )}
      {index >= 4 && (
        <div className="opacity-0 group-hover/feature:opacity-25 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-b from-neutral-100 dark:from-neutral-800 to-transparent pointer-events-none" />
      )}
      <div className="xs:mb-4 mb-2 relative z-10 px-10 text-neutral-600 dark:text-neutral-400">
        {icon}
      </div>
      <div className="text-lg font-bold mb-2 relative z-10 px-10">
        <div className="absolute left-0 inset-y-0 h-6 group-hover/feature:h-8 w-1 rounded-tr-full rounded-br-full bg-neutral-300 dark:bg-neutral-700 group-hover/feature:bg-[#77DEF3] transition-all duration-200 origin-center" />
        <span className="group-hover/feature:translate-x-2 transition duration-200 inline-block text-neutral-800 dark:text-neutral-100">
          {title}
        </span>
      </div>
      <p className="text-sm text-neutral-600 dark:text-neutral-300 max-w-xs relative z-10 px-10">
        {description}
      </p>
    </motion.div>
  );
};
