"use client";

import { motion } from "framer-motion";
import { DotPattern } from "@/components/magicui/dot-pattern";
import { cn } from "@/lib/utils";
import { IconArrowNarrowLeft, IconArrowNarrowRight } from "@tabler/icons-react";
import { useEffect, useState } from "react";

type ServiceInteractiveProps = {
  service: {
    section4Title: string;
    section4Content: Array<{
      title: string;
      description: string;
      icon: React.ReactNode;
    }>;
  };
};

export default function ServiceInteractive({
  service,
}: ServiceInteractiveProps) {
  const [valueIdText, setValueIdText] = useState("");
  useEffect(() => {
    if (service) {
      setValueIdText(service.section4Content[0].title.toLocaleLowerCase());
    }
  }, [service?.section4Content]);
  return (
    <div>
      <div className="md:px-10 relative overflow-x-hidden py-24 px-5">
        <DotPattern
          glow={false}
          className={cn(
            "[mask-image:radial-gradient(500px_circle_at_center,white,transparent)]"
          )}
        />
        <h2 className="sm:text-4xl  max-w-xl mx-auto py-2 text-3xl text-center font-bold bg-gradient-to-t from-neutral-500 to-neutral-800 dark:to-neutral-500 dark:from-neutral-200 bg-clip-text text-transparent">
          {service.section4Title}
        </h2>
        <div className="flex flex-col pt-12 gap-10 items-center justify-center">
          <div className="relative p-2 bg-[#F4F4F4] dark:bg-neutral-800 w-full rounded-3xl shadow-product flex justify-center">
            <ul className="relative flex flex-row flex-wrap items-center justify-center gap-2 w-full">
              {service.section4Content.map((value) => (
                <motion.li
                  key={value.title}
                  className="p-2 font-semibold flex max-sm:w-full  gap-2 cursor-pointer relative rounded-full"
                  onClick={() => setValueIdText(value.title.toLowerCase())}
                >
                  {value.title.toLowerCase() === valueIdText && (
                    <motion.div
                      layoutId="activeBg"
                      className="absolute w-full inset-0 shadow-neumorphic2 bg-white dark:bg-neutral-900 rounded-full"
                    />
                  )}
                  <span className="relative whitespace-nowrap justify-center flex w-full items-center text-xs sm:text-sm gap-2 px-3">
                    {value.icon}
                    {value.title}
                  </span>
                </motion.li>
              ))}
            </ul>
          </div>
          <div className="relative ">
            {service.section4Content.map(
              (value) =>
                valueIdText === value.title.toLowerCase() && (
                  <motion.div
                    key={value.title}
                    initial={{ x: 150, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: -50, opacity: 0 }}
                    transition={{
                      type: "spring",
                      stiffness: 150,
                      damping: 12,
                    }}
                    className="w-full p-5 sm:max-w-md max-w-sm space-y-2 bg-white shadow-2xl shadow-black/20 dark:shadow-white/20 dark:bg-neutral-800 rounded-3xl shadow-product"
                  >
                    <h3 className="font-semibold text-lg md:text-xl">
                      {value.title}
                    </h3>
                    <p className="text-sm text-darkgrey md:text-base">
                      {value.description}
                    </p>
                    <div className="sm:w-4 sm:h-4 w-3 h-3 bg-white dark:bg-black rounded-full sm:border-[3px] border-2 border-black dark:border-neutral-200 absolute top-1/2   -translate-y-1/2 -left-2" />

                    <div className="absolute top-1/2 max-xss:hidden -translate-y-1/2 flex items-center -right-8 sm:-right-20 md:-right-36   lg:-right-64">
                      <IconArrowNarrowLeft className=" text-neutral-800 dark:text-neutral-300 stroke-[1.2px]" />
                      <div className="lg:w-52 md:w-28 sm:w-12 max-sm:hidden h-[1.2px] bg-gradient-to-r dark:bg-gradient-to-l relative right-2 from-neutral-800 from-10% via-60% to-80% via-neutral-200 dark:via-neutral-400 to-neutral-100 dark:to-neutral-300" />
                    </div>
                    <div className="absolute top-1/2 max-xss:hidden -translate-y-1/2 flex flex-row-reverse items-center  lg:-left-64 md:-left-36 sm:-left-20 -left-8">
                      <IconArrowNarrowRight className=" text-neutral-800 dark:text-neutral-300  stroke-[1.2px]" />
                      <div className="lg:w-52 md:w-28 w-12 max-sm:hidden h-[1.2px] bg-gradient-to-l dark:bg-gradient-to-r relative left-2 from-neutral-800 from-10% via-60% to-80%  dark:via-neutral-400 to-neutral-100 dark:to-neutral-300" />
                    </div>

                    <div className="sm:w-4 sm:h-4 w-3 h-3 bg-white dark:bg-black rounded-full sm:border-[3px] border-2 border-black dark:border-neutral-200 absolute top-1/2 -translate-y-1/2 -right-2" />
                  </motion.div>
                )
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
