import NumberTicker from "@/components/ui/number-ticker";
import React from "react";

export default function Result() {
  return (
    <div className="max-w-4xl mx-auto py-20">
      <ul className="grid grid-cols-3 gap-10">
        <li className="flex items-center flex-col gap-5">
          <p className="whitespace-pre-wrap text-7xl font-medium tracking-tighter text-black dark:text-white">
            X<NumberTicker value={2} />
          </p>
          <p className="text-muted-foreground text-center tracking-widest">
            Des clients ayant doublé leur visibilité et leurs ventes en ligne en
            moins de 3 mois
          </p>
        </li>

        <li className="flex items-center flex-col gap-5">
          <p className="whitespace-pre-wrap text-7xl font-medium tracking-tighter text-black dark:text-white">
            <NumberTicker value={98} />%
          </p>
          <p className="text-muted-foreground text-center tracking-widest">
            Une satisfaction client à 98 %, grâce à un accompagnement
            personnalisé.
          </p>
        </li>

        <li className="flex items-center flex-col gap-5">
          <p className="whitespace-pre-wrap text-7xl font-medium tracking-tighter text-black dark:text-white">
            <NumberTicker value={500} />%
          </p>
          <p className="text-muted-foreground text-center tracking-widest">
            Des campagnes publicitaires avec un ROI jusqu’à 500 %.
          </p>
        </li>
      </ul>
    </div>
  );
}
