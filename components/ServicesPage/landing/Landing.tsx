"use client";

import Link from "next/link";
import React from "react";
import { motion } from "framer-motion";
import { AnimatedText } from "@/components/ui/hand-writing-text";
import { AnimatedBorderButton } from "@/components/ui/animated-border-button";

export default function Landing() {
  return (
    <div className="h-screen flex-col flex items-center md:justify-center justify-start pt-20">
      <h1 className="text-3xl md:px-0 px-6   md:text-4xl lg:text-5xl font-semibold max-w-4xl mx-auto text-center relative z-20 py-6 bg-clip-text text-transparent bg-gradient-to-b from-neutral-900 via-neutral-700 to-neutral-800 dark:from-neutral-800 dark:via-white dark:to-white">
        Donnez un nouveau souffle à votre entreprise avec nos
        <span className="inline-flex p-2">
          <AnimatedText
            text="solutions digitales"
            textClassName="text-neutral-800 dark:text-neutral-100"
            underlinePath="M 0,10 Q 75,0 150,10 Q 225,20 300,10"
            underlineHoverPath="M 0,10 Q 75,20 150,10 Q 225,0 300,10"
            underlineDuration={1.5}
            strokeWidth={3}
          />
        </span>
      </h1>

      <div className="relative -mt-32 h-96 w-full overflow-hidden">
        <div className="relative w-full h-full [mask-image:radial-gradient(50%_50%,white,transparent)]">
          <div className="absolute inset-0 before:absolute before:inset-0 before:bg-[radial-gradient(circle_at_bottom_center,#2fcbea,transparent_70%)] before:opacity-40" />
          <div className="absolute -left-1/2 top-1/2 aspect-[1/0.7] z-10 w-[200%] rounded-[100%] border-t border-zinc-900/20 dark:border-white/20 bg-white dark:bg-zinc-900" />
        </div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.4, 0.0, 0.2, 1] }}
          viewport={{ amount: 0.5 }}
          className=" mt-10 flex max-sm:flex-col  z-20 absolute w-full  md:bottom-20 bottom-0 items-center justify-center max-sm:gap-3 gap-5"
        >
          <Link href="/nos-services/#buisness-developpement">
            <AnimatedBorderButton>
              Accélérez votre croissance
            </AnimatedBorderButton>
          </Link>

          <Link href="/nos-services/#developpement-digital">
            <AnimatedBorderButton>
              Modernisez votre présence digitale
            </AnimatedBorderButton>
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
