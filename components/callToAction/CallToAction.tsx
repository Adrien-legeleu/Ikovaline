"use client";

import { Button } from "../ui/button";
import Link from "next/link";
import { motion } from "framer-motion";

interface ICallToAction {
  title: string;
  desc: string;
  textBtn: string;
}

export function CallToAction({ title, desc, textBtn }: ICallToAction) {
  return (
    <section className="overflow-hidden pt-0 md:pt-0 max-md:py-10">
      <div className="relative mx-auto flex max-w-5xl flex-col items-center gap-6 px-8 py-12 text-center sm:gap-8 md:py-24">
        <h2 className="md:text-4xl max-w-xl lg:text-5xl 2xl:text-6xl text-3xl text-center font-bold text-neutral-900 dark:text-neutral-100">
          {title}
        </h2>
        <p className="text-center max-w-2xl text-neutra-800 dark:text-neutral-300 text-base md:text-lg xl:text-xl 2xl:text-2xl">
          {desc}
        </p>
        <Link href="/contact" className="inline-block z-20">
          <Button
            variant={"default"}
            className="text-base md:text-lg xl:text-xl 2xl:text-2xl py-6 rounded-3xl px-6 z-30"
          >
            {textBtn}
          </Button>
        </Link>

        {/* Animation au scroll */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: "easeOut", delay: 0.7 }}
          className="pointer-events-none absolute inset-0 rounded-3xl  shadow-glow"
        />
        <div className="absolute -top-4 md:-top-5 w-[110%] h-12 md:h-20 bg-white dark:bg-black blur-lg md:blur-xl" />
      </div>
    </section>
  );
}
