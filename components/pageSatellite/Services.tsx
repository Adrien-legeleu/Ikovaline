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
    <div className="grid md:grid-cols-2 grid-cols-1 z-20 relative  2xl:grid-cols-4 gap-5 xl:gap-10 px-5 xl:px-20 max-w-5xl mx-auto">
      {serviceAgenceWeb.map((card, index) => (
        <Link
          href={card.link}
          key={index}
          className={`p-10 rounded-3xl relative inline-flex flex-col shadow-xl dark:from-[#090d11e2] dark:to-[#17212bdd] bg-gradient-to-b from-[#f4fafbc9] to-[#d2eaf3d8] items-center  justify-between `}
        >
          <ShineBorder
            shineColor={["#01d5ff", "#02b6fd", "#79DFF3"]}
            shineColorDark={["#01d5ff86", "#02b6fd63", "#79DFF3"]}
          />
          <div className="text-2xl font-bold">{card.text}</div>
          <p className="text-center text-gray-600 dark:text-neutral-400 text-sm sm:text-base  mt-8 mx-[10%]">
            {card.subtext}
          </p>
          <span className="flex items-center justify-center gap-2  text-sm hover:underline py-2 mt-5  rounded-full ">
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
