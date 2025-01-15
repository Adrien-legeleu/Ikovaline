import { cn } from "@/lib/utils";
import {
  IconCloud,
  IconCurrencyDollar,
  IconEaseInOut,
  IconRouteAltLeft,
  IconTerminal2,
} from "@tabler/icons-react";

export default function Why() {
  const features = [
    {
      title: "Meilleur rapport qualité-prix",
      description: "Des prestations haut de gamme à des tarifs compétitifs.",
      icon: <IconTerminal2 />,
    },
    {
      title: "Satisfait ou remboursé",
      description: "La garantie d’un service conforme à vos attentes.",
      icon: <IconEaseInOut />,
    },
    {
      title: "Délais d’exécution rapides",
      description:
        "Projets livrés dans les temps, sans compromis sur la qualité.",
      icon: <IconCurrencyDollar />,
    },
    {
      title: "Communication fluide et transparente",
      description:
        "Un suivi client efficace, avec des points réguliers pour garantir votre satisfaction.",
      icon: <IconCloud />,
    },
    {
      title: "Équipe expérimentée et passionnée",
      description: "Des professionnels dévoués à votre réussite.",
      icon: <IconRouteAltLeft />,
    },
  ];

  return (
    <div className=" max-w-4xl z-10 py-20  mx-auto" id="pourquoi-nous">
      <h2 className="text-4xl font-semibold text-center">
        Pourquoi Nous choisir ?
      </h2>
      <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-3 py-20 relative ">
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
    <div
      className={cn(
        "flex flex-col lg:border-r  py-10 relative group/feature dark:border-neutral-800",
        (index === 0 || index === 4) && "lg:border-l dark:border-neutral-800",
        index < 4 && "lg:border-b dark:border-neutral-800"
      )}
    >
      {index < 4 && (
        <div className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-t from-neutral-100 dark:from-neutral-800 to-transparent pointer-events-none" />
      )}
      {index >= 4 && (
        <div className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-b from-neutral-100 dark:from-neutral-800 to-transparent pointer-events-none" />
      )}
      <div className="mb-4 relative z-10 px-10 text-neutral-600 dark:text-neutral-400">
        {icon}
      </div>
      <div className="text-lg font-bold mb-2 relative z-10 px-10">
        <div className="absolute left-0 inset-y-0 h-6 group-hover/feature:h-8 w-1 rounded-tr-full rounded-br-full bg-neutral-300 dark:bg-neutral-700 group-hover/feature:bg-blue-500 transition-all duration-200 origin-center" />
        <span className="group-hover/feature:translate-x-2 transition duration-200 inline-block text-neutral-800 dark:text-neutral-100">
          {title}
        </span>
      </div>
      <p className="text-sm text-neutral-600 dark:text-neutral-300 max-w-xs relative z-10 px-10">
        {description}
      </p>
    </div>
  );
};
