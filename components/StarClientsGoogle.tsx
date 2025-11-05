'use client';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Star } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

export default function StarClientsGoogle() {
  const { resolvedTheme } = useTheme();

  // <- ADD
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  // -----

  // si pas encore monté côté client → on renvoie rien
  // comme ça pas de flash mauvais laurier
  if (!mounted) {
    return (
      <div className="z-10 pb-5 h-[60px] flex items-end justify-center">
        {/* petit placeholder pour garder la hauteur et éviter le layout shift */}
      </div>
    );
  }

  const leftLaurelSrc =
    resolvedTheme === 'dark'
      ? '/laurier-gauche-dark.svg'
      : '/laurier-gauche.svg';

  const rightLaurelSrc =
    resolvedTheme === 'dark'
      ? '/laurier-droite-dark.svg'
      : '/laurier-droite.svg';

  return (
    <div className="z-10 pb-5">
      <a
        target="_blank"
        href="https://www.google.com/search?rlz=1C1CHZN_frFR1084FR1084&q=Ikovaline%20Avis"
        className="flex items-end justify-center gap-2 cursor-pointer"
      >
        <motion.div
          initial={{ opacity: 0, y: 10, filter: 'blur(6px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 1, ease: 'easeInOut', delay: 0.4 }}
          className="mt-4 flex items-center justify-center gap-1 text-slate-700 dark:text-slate-100"
        >
          {/* 🌿 Laurier gauche */}
          <Image
            src={leftLaurelSrc}
            alt="laurier gauche"
            width={46}
            height={46}
            className="opacity-90 rotate-12 drop-shadow-[0_0_16px_rgba(44,183,255,0.7)]"
          />

          {/* ⭐ Bloc central */}
          <span className="flex flex-col gap-1 items-center justify-center">
            <StarRow />
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="text-xs tracking-wider font-semibold text-gray-700 dark:text-gray-300"
            >
              67+ avis
            </motion.span>
          </span>

          {/* 🌿 Laurier droit */}
          <Image
            src={rightLaurelSrc}
            alt="laurier droit"
            width={46}
            height={46}
            className="opacity-85 -rotate-12 drop-shadow-[0_0_16px_rgba(44,183,255,0.7)]"
          />
        </motion.div>
      </a>
    </div>
  );
}

export function StarRow() {
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
                <stop offset="0%" stopColor="#20A8FF" />
                <stop offset="100%" stopColor="#01B7FF" />
              </linearGradient>
            </defs>
          </svg>
        </motion.div>
      ))}
    </div>
  );
}
