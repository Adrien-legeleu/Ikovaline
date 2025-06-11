import React from "react";
import { AnimatedBorderButton } from "../ui/animated-border-button";
import Link from "next/link";
import { IconInfoCircle } from "@tabler/icons-react";

export default function Objectif({
  objectifTitle,
  text1,
  text2,
}: {
  objectifTitle: string;
  text1?: string;
  text2?: string;
}) {
  return (
    <div className="flex flex-col items-center z-20 relative justify-center py-20 gap-4 max-w-2xl mx-auto">
      <h2 className="text-2xl font-semibold px-5 text-center bg-clip-text text-transparent bg-gradient-to-b from-neutral-900 via-neutral-800 to-neutral-800 dark:from-neutral-800 dark:via-white dark:to-white  py-2 md:text-3xl lg:text-4xl max-w-4xl mx-auto">
        {objectifTitle}
      </h2>
      <p className="text-lg mb-4  px-5 text-center text-neutral-900 dark:text-neutral-300">
        {text1}
      </p>
      <p className="text-lg px-5 text-center text-neutral-900 dark:text-neutral-300">
        {text2}
      </p>
      <Link href="/about">
        <AnimatedBorderButton>
          <span className="flex items-center justify-center gap-2">
            <span aria-hidden="true">
              <IconInfoCircle />
            </span>
            En savoir plus sur notre agence web
          </span>
        </AnimatedBorderButton>
      </Link>
    </div>
  );
}
