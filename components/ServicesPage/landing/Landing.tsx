import { Button } from "@/components/ui/button";
import { Cover } from "@/components/ui/cover";
import { SparklesCore } from "@/components/ui/sparkles";
import React from "react";

export default function Landing() {
  return (
    <div className="h-screen flex-col flex items-center justify-center">
      <h1 className="text-3xl md:px-0 px-6 font-poppins  md:text-4xl lg:text-5xl font-semibold max-w-4xl mx-auto text-center mt-6 relative z-20 py-6 bg-clip-text text-transparent bg-gradient-to-b from-neutral-800 via-neutral-700 to-neutral-700 dark:from-neutral-800 dark:via-white dark:to-white">
        Transformez vos défis en opportunités avec nos <br />{" "}
        <Cover>services</Cover>
      </h1>
      <div className="sm:w-[40rem] w-full h-28 relative bg-[#F4FAFB]">
        {/* Gradients */}
        <div className="absolute sm:inset-x-20 max-sm:left-1/2 max-sm:-translate-x-1/2 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-[2px] w-3/4 blur-sm" />
        <div className="absolute sm:inset-x-20 max-sm:left-1/2 max-sm:-translate-x-1/2 top-0 bg-gradient-to-r from-transparent via-blue-500 to-transparent h-px w-3/4" />
        <div className="absolute sm:inset-x-60 max-sm:left-1/2 max-sm:-translate-x-1/2 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-[5px] w-1/4 blur-sm" />
        <div className="absolute sm:inset-x-60 max-sm:left-1/2 max-sm:-translate-x-1/2 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-px w-1/4" />

        {/* Core component */}
        <SparklesCore
          background="#F4FAFB"
          minSize={0.4}
          maxSize={1}
          particleDensity={1200}
          className="w-full h-full"
          particleColor="#000000"
        />

        {/* Radial Gradient to prevent sharp edges */}
        <div className="absolute inset-0 w-full  h-full bg-[#F4FAFB] [mask-image:radial-gradient(350px_200px_at_top,transparent_20%,white)]"></div>
      </div>
      <div className="font-poppins mt-10 flex max-sm:flex-col items-center justify-center max-sm:gap-3 gap-5">
        <Button>Business Développement</Button>
        <Button>Développement digitale</Button>
      </div>
    </div>
  );
}
