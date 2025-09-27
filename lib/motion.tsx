'use client';
import dynamic from 'next/dynamic';
import React from 'react';

// Expose juste les éléments dont tu as besoin
export const MotionDiv = dynamic(
  () => import('framer-motion').then((m) => m.motion.div),
  { ssr: false }
);

export const MotionSpan = dynamic(
  () => import('framer-motion').then((m) => m.motion.span),
  { ssr: false }
);

export const MotionSection = dynamic(
  () => import('framer-motion').then((m) => m.motion.section),
  { ssr: false }
);

// Facultatif : AnimatePresence si tu l’utilises
export const AnimatePresence = dynamic(
  () => import('framer-motion').then((m) => m.AnimatePresence),
  { ssr: false }
);

// Optionnel : respect de prefers-reduced-motion
export function usePrefersReducedMotion() {
  const [reduced, setReduced] = React.useState(false);
  React.useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const onChange = (e: MediaQueryListEvent) => setReduced(e.matches);
    setReduced(mq.matches);
    mq.addEventListener?.('change', onChange);
    return () => mq.removeEventListener?.('change', onChange);
  }, []);
  return reduced;
}
