"use client";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export const TextGenerateEffect = ({
  words,
  className,
  filter = true,
  duration = 0.5,
}: {
  words: string;
  className?: string;
  filter?: boolean;
  duration?: number;
}) => {
  const wordsArray = words.split(" ");

  const renderWords = () => {
    return (
      <motion.div>
        {wordsArray.map((word, idx) => {
          return (
            <motion.span
              key={word + idx}
              className="dark:text-neutral-200 text-black opacity-0"
              initial={{ opacity: 0, filter: "blur(10px)" }}
              whileInView={{
                opacity: 1,
                filter: filter ? "blur(0px)" : "none",
                transition: {
                  duration: duration,
                  delay: idx * 0.12, // Applique un délai progressif
                },
              }}
              viewport={{ once: true }}
            >
              {word}{" "}
            </motion.span>
          );
        })}
      </motion.div>
    );
  };

  return (
    <div className={cn("font-bold", className)}>
      <div className="mt-4">
        <div className="dark:text-neutral-200 text-center text-black md:text-2xl sm:text-xl stext-lg md:px-0 px-5 leading-relaxed tracking-wide">
          {renderWords()}
        </div>
      </div>
    </div>
  );
};
