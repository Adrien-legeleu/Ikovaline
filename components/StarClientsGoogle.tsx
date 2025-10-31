'use client';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Star } from 'lucide-react';

export default function StarClientsGoogle() {
  return (
    <div className="z-10 pb-5">
      <a
        target="_blank"
        href="https://www.google.com/search?rlz=1C1CHZN_frFR1084FR1084&q=Ikovaline%20Avis&rflfq=1&num=20&rldimm=10167155926367019769&tbm=lcl&hl=fr"
        className="flex items-end justify-center gap-2 cursor-pointer"
      >
        <motion.div
          initial={{ opacity: 0, y: 10, filter: 'blur(6px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 1, ease: 'easeInOut', delay: 0.4 }}
          className="mt-4 flex items-center justify-center gap-3 text-slate-700 dark:text-slate-100"
        >
          {/* 🌿 Laurier gauche */}
          <Image
            src="/laurel-left.png"
            alt="laurier gauche"
            width={42}
            height={42}
            className="opacity-90 rotate-12 drop-shadow-[0_0_16px_rgba(44,183,255,0.7)]"
            priority={false}
          />

          {/* ⭐ Bloc central */}
          <span className="flex flex-col gap-1 items-center justify-center">
            <StarRow />
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="text-xs tracking-[0.18em] font-semibold text-gray-700 dark:text-gray-300"
            >
              67+ AVIS
            </motion.span>
          </span>

          {/* 🌿 Laurier droit */}
          <Image
            src="/laurel-right.png"
            alt="laurier droit"
            width={42}
            height={42}
            className="opacity-85 -rotate-12 drop-shadow-[0_0_16px_rgba(44,183,255,0.7)]"
            priority={false}
          />
        </motion.div>
      </a>
    </div>
  );
}

function StarRow() {
  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: 5 }).map((_, i) => (
        <motion.div
          key={i}
          initial={{ scale: 0.7, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.5 + i * 0.08, type: 'spring', stiffness: 120 }}
        >
          <Star
            size={16}
            fill="url(#ikovalineBlue)"
            stroke="none"
            className="drop-shadow-[0_0_8px_rgba(44,183,255,0.5)]"
          />
          <svg width="0" height="0">
            <defs>
              <linearGradient id="ikovalineBlue" x1="0" x2="1" y1="0" y2="1">
                <stop offset="0%" stopColor="#2CB7FF" />
                <stop offset="100%" stopColor="#0072FF" />
              </linearGradient>
            </defs>
          </svg>
        </motion.div>
      ))}
    </div>
  );
}
