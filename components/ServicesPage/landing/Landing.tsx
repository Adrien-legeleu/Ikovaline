"use client";
import { Button } from "@/components/ui/button";
import { Cover } from "@/components/ui/cover";
import { SparklesCore } from "@/components/ui/sparkles";
import { useTheme } from "next-themes";
import Link from "next/link";
import React from "react";
import { motion } from "framer-motion";

export default function Landing() {
  const { theme } = useTheme();
  return (
    <div className="h-screen flex-col flex items-center md:justify-center justify-start pt-20">
      <h1 className="text-3xl md:px-0 px-6 font-poppins  md:text-4xl lg:text-5xl font-semibold max-w-4xl mx-auto text-center relative z-20 py-6 bg-clip-text text-transparent bg-gradient-to-b from-neutral-800 via-neutral-700 to-neutral-700 dark:from-neutral-800 dark:via-white dark:to-white">
        Transformez vos défis en opportunités avec nos <br />{" "}
        <Cover>services</Cover>
      </h1>
      <div className="sm:w-[40rem] w-full h-28 relative bg-[#F4FAFB] dark:bg-[#090D11]">
        {/* Gradients */}
        <div className="absolute sm:inset-x-20 max-sm:left-1/2 max-sm:-translate-x-1/2 top-0 bg-gradient-to-r from-transparent via-[#D1A3FF] to-transparent h-[2px] w-3/4 blur-sm dark:via-[#A682FF]" />
        <div className="absolute sm:inset-x-20 max-sm:left-1/2 max-sm:-translate-x-1/2 top-0 bg-gradient-to-r from-transparent via-[#7AB8FF] to-transparent h-px w-3/4 dark:via-[#2E95FF]" />
        <div className="absolute sm:inset-x-60 max-sm:left-1/2 max-sm:-translate-x-1/2 top-0 bg-gradient-to-r from-transparent via-[#B8E5FF] to-transparent h-[5px] w-1/4 blur-sm dark:via-[#5AC8FA]" />
        <div className="absolute sm:inset-x-60 max-sm:left-1/2 max-sm:-translate-x-1/2 top-0 bg-gradient-to-r from-transparent via-[#B8E5FF] to-transparent h-px w-1/4 dark:via-[#5AC8FA]" />

        {/* Core component */}
        <SparklesCore
          background={theme === "dark" ? "#090D11" : "#F4FAFB"}
          minSize={0.4}
          maxSize={1}
          particleDensity={1200}
          className="w-full h-full"
          particleColor={theme === "dark" ? "#FFFFFF" : "#000000"}
        />

        {/* Radial Gradient to prevent sharp edges */}
        <div className="absolute inset-0 w-full  h-full bg-[#F4FAFB] dark:bg-[#090D11] [mask-image:radial-gradient(350px_200px_at_top,transparent_20%,white)]"></div>
      </div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.4, 0.0, 0.2, 1] }}
        viewport={{ amount: 0.5 }}
        className="font-poppins mt-10 flex max-sm:flex-col items-center justify-center max-sm:gap-3 gap-5"
      >
        <Link href="/nos-services/#buisness-developpement">
          {" "}
          <Button>Business Développement</Button>
        </Link>
        <Link href="/nos-services/#developpement-digital">
          <Button>Développement digital</Button>
        </Link>
      </motion.div>
    </div>
  );
}
