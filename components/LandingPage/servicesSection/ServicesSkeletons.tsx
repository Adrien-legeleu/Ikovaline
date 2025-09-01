'use client';

import React from 'react';
import { motion, useAnimationControls } from 'framer-motion';
import { IconRobot } from '@tabler/icons-react';

/* 1. SaaSConstellation – constellation + flux animés vers le noyau */
export function SaaSConstellation() {
  const stars = Array.from({ length: 18 });
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      {/* étoiles */}
      {stars.map((_, i) => (
        <motion.span
          key={i}
          className="absolute size-1.5 rounded-full bg-cyan-400/90 shadow-[0_0_10px_rgba(34,211,238,0.9)]"
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: [0.3, 1, 0.3], scale: [0.6, 1.1, 0.6] }}
          transition={{
            duration: 2 + (i % 6) * 0.3,
            repeat: Infinity,
            delay: i * 0.12,
          }}
          style={{
            top: `${15 + (i % 6) * 15}%`,
            left: `${8 + ((i * 19) % 85)}%`,
          }}
        />
      ))}

      {/* noyau produit */}
      <motion.div
        className="h-16 w-16 rounded-xl bg-white/60 dark:bg-neutral-900/60 backdrop-blur-lg border border-white/30 shadow-[0_0_25px_rgba(34,211,238,0.7)]"
        animate={{ scale: [0.9, 1.05, 0.9], opacity: [0.8, 1, 0.8] }}
        transition={{ duration: 2, repeat: Infinity }}
      />
    </div>
  );
}

/* 2. DevicesOrbit – devices flottants qui orbitent autour d’un plateau */
export function DevicesOrbit() {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      {/* plateau */}
      <div className="absolute inset-x-12 top-8 bottom-8 rounded-2xl bg-white/40 dark:bg-neutral-900/40 backdrop-blur-md border border-white/20" />

      {/* desktop */}
      <motion.div
        className="absolute h-24 w-36 rounded-xl bg-gradient-to-tr from-indigo-200/60 to-indigo-400/40  border border-white/20 backdrop-blur-md shadow-lg"
        animate={{ y: [-10, 0, -10], rotate: [-2, 0, -2] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* mobile */}
      <motion.div
        className="absolute bottom-10 right-16 h-28 w-14 rounded-2xl bg-gradient-to-tr from-blue-200/60 to-blue-400/40  border border-white/20 backdrop-blur-md shadow-md"
        animate={{ y: [8, 0, 8], rotate: [3, 0, 3] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* tablette */}
      <motion.div
        className="absolute bottom-14 left-20 h-20 w-28 rounded-xl bg-gradient-to-tr from-cyan-200/60 to-cyan-400/40  border border-white/20 backdrop-blur-md"
        animate={{ x: [8, 0, 8], opacity: [0.7, 1, 0.7] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
      />
    </div>
  );
}

export function AutomationGrid() {
  return (
    <div className="relative w-full h-48 flex items-center justify-center">
      {/* Noyau central : AI */}
      <div className="absolute z-20 w-12 h-12 rounded-full bg-gradient-to-br from-teal-400 to-cyan-500 shadow-[0_0_18px_rgba(34,211,238,0.8)] flex items-center justify-center animate-pulse-slow">
        <IconRobot className="size-6 text-white" />
      </div>

      {/* Nœuds périphériques en losange */}
      {[
        { top: '15%', left: '50%' }, // haut
        { top: '50%', left: '85%' }, // droite
        { top: '85%', left: '50%' }, // bas
        { top: '50%', left: '15%' }, // gauche
      ].map((pos, i) => (
        <div
          key={i}
          className="absolute w-4 !-translate-x-1/2 !-translate-y-1/2 h-4 rounded-full bg-cyan-300 shadow-[0_0_10px_rgba(34,211,238,0.7)] animate-pulse-slower"
          style={{ ...pos }}
        />
      ))}

      {/* Lignes lumineuses */}
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        <line x1="50" y1="15" x2="50" y2="50" className="automation-line" />
        <line x1="85" y1="50" x2="50" y2="50" className="automation-line" />
        <line x1="50" y1="85" x2="50" y2="50" className="automation-line" />
        <line x1="15" y1="50" x2="50" y2="50" className="automation-line" />
      </svg>

      <style jsx>{`
        .automation-line {
          stroke: rgba(34, 211, 238, 0.5);
          stroke-width: 1.5;
          stroke-linecap: round;
          animation: flow 4s ease-in-out infinite;
        }

        @keyframes flow {
          0% {
            stroke-opacity: 0.2;
          }
          50% {
            stroke-opacity: 0.8;
          }
          100% {
            stroke-opacity: 0.2;
          }
        }

        .animate-pulse-slow {
          animation: pulse 3s infinite;
        }
        .animate-pulse-slower {
          animation: pulse 5s infinite;
        }
        @keyframes pulse {
          0%,
          100% {
            transform: scale(0.9);
          }
          50% {
            transform: scale(1.2);
          }
        }
      `}</style>
    </div>
  );
}

export function ConversionPulse() {
  const controls = useAnimationControls();

  React.useEffect(() => {
    controls.start({
      strokeDashoffset: [600, 0],
      transition: { duration: 4, repeat: Infinity, ease: 'easeInOut' },
    });
  }, [controls]);

  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <svg viewBox="0 0 400 200" className="w-full h-full">
        <defs>
          <linearGradient id="gradLine" x1="0" x2="1" y1="0" y2="0">
            <stop offset="0%" stopColor="rgba(71,234,224,1)" />
            <stop offset="100%" stopColor="rgba(59,130,246,1)" />
          </linearGradient>
        </defs>

        {/* halo derrière la courbe */}
        <motion.path
          d="M10,150 C70,80 130,120 180,60 C230,20 280,110 340,90 Q370,80 390,100"
          fill="none"
          stroke="url(#gradLine)"
          strokeWidth="12"
          strokeLinecap="round"
          strokeOpacity="0.15"
          filter="blur(12px)"
          animate={{ opacity: [0.1, 0.25, 0.1] }}
          transition={{ duration: 5, repeat: Infinity }}
        />

        {/* courbe principale */}
        <motion.path
          d="M10,150 C70,80 130,120 180,60 C230,20 280,110 340,90 Q370,80 390,100"
          fill="none"
          stroke="url(#gradLine)"
          strokeWidth="4"
          strokeLinecap="round"
          strokeDasharray="600"
          animate={controls}
        />

        {/* remplissage area chart */}
        <motion.path
          d="M10,150 C70,80 130,120 180,60 C230,20 280,110 340,90 Q370,80 390,100 L390,200 L10,200 Z"
          fill="url(#gradLine)"
          opacity="0.1"
          animate={{ opacity: [0.08, 0.2, 0.08] }}
          transition={{ duration: 5, repeat: Infinity }}
        />
      </svg>

      {/* points dynamiques */}
      {[
        { x: 180, y: 60 },
        { x: 280, y: 85 },
      ].map((p, i) => (
        <motion.span
          key={i}
          className="absolute size-3 rounded-full bg-cyan-300 shadow-[0_0_20px_rgba(59,130,246,0.95)]"
          style={{
            left: `${(p.x / 400) * 100}%`,
            top: `${(p.y / 200) * 100}%`,
          }}
          animate={{
            scale: [0.7, 1.6, 0.7],
            opacity: [0.6, 1, 0.6],
            y: [0, -6, 0],
          }}
          transition={{ duration: 2 + i, repeat: Infinity }}
        />
      ))}
    </div>
  );
}
