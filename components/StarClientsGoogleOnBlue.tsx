'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { Star } from 'lucide-react';
import { useEffect, useState } from 'react';

/**
 * Variante spéciale pour fond bleu foncé :
 * - tout est en blanc / blanc-80
 * - étoiles = dégradé blanc → blanc transparent
 * - glow = blanc
 * - lauriers passés en "blanc" via invert/brightness pour éviter le vert/or d'origine
 * - pas de dark mode switch ici, on force le rendu clair
 */
export default function StarClientsGoogleOnBlue() {
  // éviter le flash SSR/hydratation → même logique que l'original
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="z-10 pb-5 h-[60px] flex items-end justify-center">
        {/* placeholder hauteur pour pas bouger le layout */}
      </div>
    );
  }

  // on prend toujours les mêmes SVG lauriers que toi,
  // mais on les "force" visuellement en blanc via filters CSS.
  // Si tu as une version blanche dédiée genre /laurier-white.svg,
  // remplace directement src par ça et tu peux virer les filters.
  const leftLaurelSrc = '/laurier-gauche-dark.svg';
  const rightLaurelSrc = '/laurier-droite-dark.svg';

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
          className={`
            mt-4 flex items-center justify-center gap-1
            text-white
          `}
        >
          {/* 🌿 Laurier gauche */}
          <Image
            src={leftLaurelSrc}
            alt="laurier gauche"
            width={46}
            height={46}
            className={`
              opacity-90 rotate-12
             
              drop-shadow-[0_0_16px_rgba(255,255,255,0.4)]
            `}
          />

          {/* Bloc central (étoiles + "67+ AVIS") */}
          <span className="flex flex-col gap-1 items-center justify-center">
            <StarRowWhite />
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="text-xs tracking-[0.18em] font-semibold text-white/80"
            >
              67+ AVIS
            </motion.span>
          </span>

          {/* 🌿 Laurier droit */}
          <Image
            src={rightLaurelSrc}
            alt="laurier droit"
            width={46}
            height={46}
            className={`
              opacity-90 -rotate-12
            
              drop-shadow-[0_0_16px_rgba(255,255,255,0.4)]
            `}
          />
        </motion.div>
      </a>
    </div>
  );
}

/**
 * Rangée de 5 étoiles blanches avec glow blanc.
 * On garde la même anim (scale spring en cascade),
 * mais on remplace le dégradé bleu par un dégradé blanc -> blanc transparent
 * pour que ça reste lisible sur le fond bleu.
 */
function StarRowWhite() {
  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: 5 }).map((_, i) => (
        <motion.div
          key={i}
          initial={{ scale: 0.7, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{
            delay: 0.5 + i * 0.08,
            type: 'spring',
            stiffness: 120,
          }}
          className="drop-shadow-[0_0_10px_rgba(255,255,255,0.7)]"
        >
          <Star
            size={16}
            stroke="none"
            fill="url(#ikovalineWhite)"
            className="text-primary"
          />
          {/* gradient defs */}
          <svg width="0" height="0">
            <defs>
              <linearGradient id="ikovalineWhite" x1="0" x2="1" y1="0" y2="1">
                <stop offset="0%" stopColor="rgba(255,255,255,1)" />
                <stop offset="100%" stopColor="rgba(255,255,255,0.8)" />
              </linearGradient>
            </defs>
          </svg>
        </motion.div>
      ))}
    </div>
  );
}
