'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { LiquidButton } from './liquid-glass-button';

export type Testimonial = { emoji: string; quote: string };

export const TestimonialSlider = React.memo(function TestimonialSlider({
  testimonials,
}: {
  testimonials: Testimonial[];
}) {
  const [active, setActive] = useState(0);
  const autorotateTiming = 3500;
  const timer = useRef<NodeJS.Timeout | null>(null);

  // ✅ auto-rotate optimisé avec setTimeout
  useEffect(() => {
    timer.current = setTimeout(() => {
      setActive((p) => (p + 1 === testimonials.length ? 0 : p + 1));
    }, autorotateTiming);
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, [active, testimonials.length]);

  const goTo = (i: number) => {
    if (timer.current) clearTimeout(timer.current);
    setActive(i);
  };

  const prev = () => goTo(active === 0 ? testimonials.length - 1 : active - 1);
  const next = () => goTo((active + 1) % testimonials.length);

  return (
    <div
      className="relative mx-auto w-full max-w-3xl text-center h-[280px]"
      style={{ contentVisibility: 'auto' }}
    >
      {/* ===== Halo bleu (optimisé) ===== */}
      <div className="absolute inset-0 flex items-start justify-center">
        <div
          className="relative -z-10 rounded-full"
          style={{
            width: 'min(500px,90vw)',
            height: 'min(500px,90vw)',
            background:
              'radial-gradient(circle at 50% 40%,rgba(56,189,248,.7),rgba(59,130,246,.35) 50%,transparent 80%)',
            filter: 'blur(6px)',
          }}
        />
      </div>

      {/* ===== Contenu animé ===== */}
      <div className="relative mb-10 h-40">
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.45, ease: 'easeOut' }}
            className="absolute inset-0 flex flex-col items-center justify-center gap-8 px-4"
          >
            {/* pastille */}
            <div className="grid size-16 lg:size-20 place-items-center rounded-full border border-sky-400/40 bg-sky-100/80 text-3xl backdrop-blur-xl shadow-[0_6px_18px_rgba(37,99,235,0.25)] dark:border-sky-300/20 dark:bg-sky-950/60">
              {testimonials[active].emoji}
            </div>

            {/* texte */}
            <p className="text-lg lg:text-2xl font-semibold leading-snug text-neutral-900 dark:text-white">
              <span className="mr-2 text-sky-400">“</span>
              <span className="bg-gradient-to-r from-sky-600 via-blue-500 to-cyan-400 bg-clip-text text-transparent dark:from-sky-200 dark:via-blue-200 dark:to-cyan-100">
                {testimonials[active].quote}
              </span>
              <span className="ml-2 text-sky-400">”</span>
            </p>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* ===== Navigation ===== */}
      <div className="pb-4 z-10 relative flex items-center justify-center gap-5">
        <LiquidButton
          onClick={prev}
          aria-label="Précédent"
          className="nav-btn !p-0 !text-xl !h-8 !w-8"
        >
          ‹
        </LiquidButton>
        <div className="flex items-center gap-2">
          {testimonials.map((_, i) => (
            <button
              key={i}
              aria-label={`Aller à ${i + 1}`}
              onClick={() => goTo(i)}
              className={cn(
                'h-2.5 w-2.5 rounded-full transition-all duration-300',
                i === active
                  ? 'bg-gradient-to-r from-sky-400 to-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.7)] scale-110'
                  : 'bg-neutral-300/60 hover:bg-neutral-400/80 dark:bg-neutral-700/70 dark:hover:bg-neutral-600'
              )}
            />
          ))}
        </div>
        <LiquidButton
          onClick={next}
          aria-label="Suivant"
          className="nav-btn !p-0 !text-xl !h-8 !w-8"
        >
          ›
        </LiquidButton>
      </div>
      <div className="absolute bottom-0  left-0 h-24 w-full  bg-gradient-to-t from-white dark:from-black to-transparent" />

      <style jsx>{`
        .nav-btn {
          @apply inline-flex h-10 w-10 items-center justify-center rounded-full
            border border-sky-400/30 bg-sky-100/80 text-sky-600 backdrop-blur-xl
            shadow-[0_6px_24px_rgba(37,99,235,0.25)]
            transition-transform duration-200 hover:scale-110 active:scale-95
            dark:border-sky-300/20 dark:bg-sky-950/60 dark:text-sky-200;
        }
      `}</style>
    </div>
  );
});
