"use client";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export const MagicText = ({
  words,
  className,
  filter = true,
  duration = 0.1,
}: {
  words: string;
  className?: string;
  filter?: boolean;
  duration?: number;
}) => {
  const wordsArray = words.split(" ");

  const containerVariants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const wordVariants = {
    hidden: {
      opacity: 0,
      filter: filter ? "blur(2px)" : "none",
    },
    show: {
      opacity: 1,
      filter: "blur(0px)",
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  return (
    <div className={cn("font-semibold", className)}>
      <div className="mt-4">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="dark:text-white px-5 text-center text-black text-lg md:text-xl lg:text-2xl 2xl:text-3xl !leading-[2.5rem] tracking-wider"
        >
          {wordsArray.map((word, idx) => (
            <motion.span
              key={word + idx}
              variants={wordVariants}
              className="inline-block mr-1"
            >
              {word}
            </motion.span>
          ))}
        </motion.div>
      </div>
    </div>
  );
};
