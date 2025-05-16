"use client";

import { motion } from "framer-motion";

export default function ParallaxBubble() {
  return (
    <motion.div
      className="fixed top-[30%] left-[10%] w-[300px] h-[300px] rounded-full bg-blue-400/30 blur-2xl pointer-events-none z-0"
      animate={{
        y: [0, -30, 0, 30, 0],
      }}
      transition={{
        duration: 10,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
  );
}
