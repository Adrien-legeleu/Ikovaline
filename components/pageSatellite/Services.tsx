import { IconArrowRight } from "@tabler/icons-react";
import Link from "next/link";
import React from "react";
import { ShineBorder } from "../magicui/shine-border";

export default function Services({
  serviceAgenceWeb,
}: {
  serviceAgenceWeb: { text: string; subtext: string; link: string }[];
}) {
  return (
    <div className="grid md:grid-cols-2 grid-cols-1 z-20 relative   gap-5 xl:gap-10 px-5 xl:px-20 2xl:max-w-6xl max-w-5xl mx-auto">
      {serviceAgenceWeb.map((card, index) => (
        <Link
          href={card.link}
          key={index}
          className={`sm:p-10 py-10 px-5 rounded-3xl relative inline-flex flex-col shadow-xl gap-8 dark:from-[#090d11e2] dark:to-[#17212bdd] bg-gradient-to-b from-[#f4fafbc9] to-[#d2eaf3d8] items-center  justify-between `}
        >
          <ShineBorder
            shineColor={["#01d5ff", "#02b6fd", "#79DFF3"]}
            shineColorDark={["#01d5ff86", "#02b6fd63", "#79DFF3"]}
          />
          <div className="text-2xl font-bold text-center">{card.text}</div>
          <p className="text-center text-gray-600 dark:text-neutral-400 text-base   sm:mx-[10%]">
            {card.subtext}
          </p>
          <span className="flex items-center justify-center gap-2 2xl:text-md text-sm hover:underline py-2  rounded-full ">
            En savoir plus
            <span aria-hidden="true">
              <IconArrowRight />
            </span>
          </span>
        </Link>
      ))}
    </div>
  );
}
