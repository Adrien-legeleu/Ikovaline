"use client";

import * as React from "react";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";

export interface MagicTextProps {
  text: string;
}

interface WordProps {
  children: string;
  progress: MotionValue<number>;
  range: number[];
}

const Word: React.FC<WordProps> = ({ children, progress, range }) => {
  const opacity = useTransform(progress, range, [0, 1]);

  return (
    <span className="relative mt-[16px] mr-1 text-lg lg:text-xl xl:text-2xl 2xl:text-3xl  font-semibold">
      <span className="absolute opacity-20">{children}</span>
      <motion.span style={{ opacity: opacity }}>{children}</motion.span>
    </span>
  );
};

export const MagicText: React.FC<MagicTextProps> = ({ text }) => {
  const container = useRef(null);

  const { scrollYProgress } = useScroll({
    target: container,

    offset: ["start 0.7", "start 0.1"],
  });
  const words = text.split(" ");

  return (
    <p
      ref={container}
      className="flex   flex-wrap items-center justify-center leading-[5rem] p-4"
    >
      {words.map((word, i) => {
        const start = i / words.length;

        const end = start + 1 / words.length;

        return (
          <Word key={i} progress={scrollYProgress} range={[start, end]}>
            {word}
          </Word>
        );
      })}
    </p>
  );
};
