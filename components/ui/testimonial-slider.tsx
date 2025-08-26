'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

interface Testimonial {
  emoji: string;
  quote: string;
}

export const Component = ({
  testimonials,
}: {
  testimonials: Testimonial[];
}) => {
  const [active, setActive] = useState(0);
  const [autorotate, setAutorotate] = useState(true);
  const autorotateTiming = 3000;

  useEffect(() => {
    if (!autorotate) return;
    const id = setInterval(() => {
      setActive((p) => (p + 1 === testimonials.length ? 0 : p + 1));
    }, autorotateTiming);
    return () => clearInterval(id);
  }, [autorotate, testimonials.length]);

  const prev = () => {
    setAutorotate(false);
    setActive((p) => (p === 0 ? testimonials.length - 1 : p - 1));
  };
  const next = () => {
    setAutorotate(false);
    setActive((p) => (p + 1 === testimonials.length ? 0 : p + 1));
  };

  return (
    <div className="relative mx-auto w-full max-w-3xl text-center">
      {/* ===================== GROS DISQUE ===================== */}
      <div className="relative h-36">
        <div className="pointer-events-none absolute left-1/2 top-0 -translate-x-1/2">
          <div
            className="relative -z-10 your-disk-wrapper isolate"
            style={{ width: 'min(560px, 90vw)', height: 'min(560px, 90vw)' }}
          >
            {/* HALO RADIAL */}
            <div
              className="absolute inset-0 rounded-full z-0"
              style={{
                /* (1) MASQUE DOUX — transition plus longue pour éviter le gris cassé */
                WebkitMaskImage:
                  'linear-gradient(to bottom, rgba(255,255,255,1) 0%, rgba(255,255,255,1) 35%, rgba(255,255,255,0.6) 60%, rgba(255,255,255,0) 85%)',
                maskImage:
                  'linear-gradient(to bottom, rgba(255,255,255,1) 0%, rgba(255,255,255,1) 35%, rgba(255,255,255,0.6) 60%, rgba(255,255,255,0) 85%)',
                background: `
                  radial-gradient(circle at 50% 40%, rgba(71,234,224,0.9) 0%, rgba(71,234,224,0.55) 28%, rgba(71,234,224,0.22) 52%, rgba(71,234,224,0) 74%),
                  radial-gradient(circle at 50% 35%, rgba(59,130,246,0.35) 0%, rgba(59,130,246,0.16) 36%, rgba(59,130,246,0) 72%)
                `,
                filter: 'blur(3px)',
              }}
            />

            {/* ÉCLAT CONIQUE */}
            <div
              className="absolute inset-0 rounded-full z-0"
              style={{
                WebkitMaskImage:
                  'linear-gradient(to bottom, rgba(255,255,255,1) 0%, rgba(255,255,255,1) 35%, rgba(255,255,255,0.6) 60%, rgba(255,255,255,0) 85%)',
                maskImage:
                  'linear-gradient(to bottom, rgba(255,255,255,1) 0%, rgba(255,255,255,1) 35%, rgba(255,255,255,0.6) 60%, rgba(255,255,255,0) 85%)',
                background:
                  'conic-gradient(from 18deg at 50% 35%, rgba(0,212,255,0.55), rgba(59,130,246,0.5), rgba(71,234,224,0.6), rgba(0,212,255,0.0) 300deg)',
                mixBlendMode: 'screen',
                filter: 'blur(16px)',
                opacity: 0.85,
              }}
            />

            {/* (2) RIDEAU DE RACCORD — colle la base du disque à la couleur de fond */}
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-96 z-10 bg-gradient-to-b   from-transparent to-[hsl(var(--background))]" />

            {/* TWEAKS DARK — couleurs + masque spécifiques */}
            <style jsx>{`
              :global(.dark) .your-disk-wrapper > .rounded-full:nth-child(1) {
                background:
                  radial-gradient(
                    circle at 50% 40%,
                    rgba(56, 219, 210, 0.95) 0%,
                    rgba(56, 219, 210, 0.58) 28%,
                    rgba(56, 219, 210, 0.2) 50%,
                    rgba(56, 219, 210, 0) 76%
                  ),
                  radial-gradient(
                    circle at 50% 35%,
                    rgba(37, 99, 235, 0.42) 0%,
                    rgba(37, 99, 235, 0.2) 34%,
                    rgba(37, 99, 235, 0) 70%
                  );
                /* (3) MASQUE DOUX DARK — coupe encore plus tard pour un fondu noir nickel */
                -webkit-mask-image: linear-gradient(
                  to bottom,
                  rgba(255, 255, 255, 1) 0%,
                  rgba(255, 255, 255, 0) 32%,
                  rgba(255, 255, 255, 0) 42%,
                  rgba(255, 255, 255, 0) 68%
                );
                mask-image: linear-gradient(
                  to bottom,
                  rgba(255, 255, 255, 1) 0%,
                  rgba(255, 255, 255, 0) 32%,
                  rgba(255, 255, 255, 0) 42%,
                  rgba(255, 255, 255, 0) 68%
                );
              }
              :global(.dark) .your-disk-wrapper > .rounded-full:nth-child(2) {
                opacity: 0.72;
                -webkit-mask-image: linear-gradient(
                  to bottom,
                  rgba(255, 255, 255, 1) 0%,
                  rgba(255, 255, 255, 0) 32%,
                  rgba(255, 255, 255, 0) 42%,
                  rgba(255, 255, 255, 0) 68%
                );
                mask-image: linear-gradient(
                  to bottom,
                  rgba(255, 255, 255, 1) 0%,
                  rgba(255, 255, 255, 0) 32%,
                  rgba(255, 255, 255, 0) 42%,
                  rgba(255, 255, 255, 0) 68%
                );
              }
            `}</style>
          </div>
        </div>
      </div>

      {/* ===================== CONTENU ===================== */}
      <div className="relative mb-10 h-28">
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0 flex flex-col items-center justify-center gap-16 lg:gap-8 px-4"
          >
            {/* pastille glass */}
            <div className="relative -mt-28 grid place-items-center">
              <div className="relative grid size-16 lg:size-24 place-items-center rounded-full border border-white/50 bg-white/75 text-3xl lg:text-4xl backdrop-blur-2xl shadow-[0_10px_30px_rgba(0,0,0,0.06),0_0_24px_rgba(71,234,224,0.25)] dark:border-white/10 dark:bg-neutral-900/60">
                <span className="select-none">
                  {testimonials[active].emoji}
                </span>
                <span className="pointer-events-none absolute inset-0 rounded-full ring-1 ring-cyan-300/50" />
              </div>
            </div>

            {/* texte lisible light/dark */}
            <p className="text-xl lg:text-3xl font-semibold leading-snug text-neutral-900 dark:text-white">
              <span className="mr-2 text-cyan-500/90">“</span>
              <span className="bg-gradient-to-r from-cyan-700 to-blue-700 bg-clip-text text-transparent dark:from-cyan-100 dark:to-blue-200">
                {testimonials[active].quote}
              </span>
              <span className="ml-2 text-cyan-500/90">”</span>
            </p>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* ===================== NAVIGATION ===================== */}
      <div className="mt-2 flex items-center justify-center gap-4">
        <button
          aria-label="Précédent"
          onClick={() => {
            setAutorotate(false);
            prev();
          }}
          className={cn(
            'inline-flex h-10 w-10 items-center justify-center rounded-full',
            'border border-white/40 bg-white/70 text-neutral-700 backdrop-blur-xl',
            'shadow-[0_6px_24px_rgba(0,0,0,0.06),inset_0_1px_0_rgba(255,255,255,0.5)]',
            'transition-transform duration-200 hover:scale-105 active:scale-95',
            'dark:border-white/10 dark:bg-neutral-900/60 dark:text-neutral-100'
          )}
        >
          <svg
            className="size-4"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>

        <div className="flex items-center gap-2">
          {testimonials.map((_, i) => (
            <button
              key={i}
              aria-label={`Aller à ${i + 1}`}
              onClick={() => {
                setAutorotate(false);
                setActive(i);
              }}
              className={cn(
                'h-2.5 w-2.5 rounded-full transition-all',
                i === active
                  ? 'bg-gradient-to-r from-cyan-400 to-blue-400 shadow-[0_0_12px_rgba(59,130,246,0.6)] scale-100'
                  : 'bg-neutral-300/70 hover:bg-neutral-400/80 scale-90 dark:bg-neutral-700/70 dark:hover:bg-neutral-600'
              )}
            />
          ))}
        </div>

        <button
          aria-label="Suivant"
          onClick={() => {
            setAutorotate(false);
            next();
          }}
          className={cn(
            'inline-flex h-10 w-10 items-center justify-center rounded-full',
            'border border-white/40 bg-white/70 text-neutral-700 backdrop-blur-xl',
            'shadow-[0_6px_24px_rgba(0,0,0,0.06),inset_0_1px_0_rgba(255,255,255,0.5)]',
            'transition-transform duration-200 hover:scale-105 active:scale-95',
            'dark:border-white/10 dark:bg-neutral-900/60 dark:text-neutral-100'
          )}
        >
          <svg
            className="size-4"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M9 18l6-6-6-6" />
          </svg>
        </button>
      </div>
    </div>
  );
};
