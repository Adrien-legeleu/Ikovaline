'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { LiquidButton } from './liquid-glass-button';

export type Testimonial = { emoji: string; quote: string };

export function TestimonialSlider({
  testimonials,
}: {
  testimonials: Testimonial[];
}) {
  const [active, setActive] = useState(0);
  const [autorotate, setAutorotate] = useState(true);
  const autorotateTiming = 3500;

  // rotation auto fluide
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
    <div
      className="relative mx-auto w-full max-w-3xl text-center"
      style={{ contentVisibility: 'auto', containIntrinsicSize: '420px' }}
    >
      {/* ======= Halo bleu brillant ======= */}
      <div className="relative h-36">
        <div className="pointer-events-none absolute left-1/2 top-0 -translate-x-1/2">
          <div
            className="relative -z-10 isolate"
            style={{ width: 'min(520px, 90vw)', height: 'min(520px, 90vw)' }}
          >
            {/* Halo radial bleu */}
            <div
              className="absolute inset-0 rounded-full"
              style={{
                WebkitMaskImage:
                  'linear-gradient(to bottom,rgba(255,255,255,1) 0%,rgba(255,255,255,0) 85%)',
                maskImage:
                  'linear-gradient(to bottom,rgba(255,255,255,1) 0%,rgba(255,255,255,0) 85%)',
                background:
                  'radial-gradient(circle at 50% 40%,rgba(56,189,248,.9) 0%,rgba(59,130,246,.45) 40%,transparent 75%)',
                filter: 'blur(6px)',
              }}
            />
            {/* Halo conique bleu */}
            <div
              className="absolute inset-0 rounded-full opacity-80"
              style={{
                WebkitMaskImage:
                  'linear-gradient(to bottom,rgba(255,255,255,1) 0%,rgba(255,255,255,0) 85%)',
                maskImage:
                  'linear-gradient(to bottom,rgba(255,255,255,1) 0%,rgba(255,255,255,0) 85%)',
                background:
                  'conic-gradient(from 30deg at 50% 35%,rgba(14,165,233,.55),rgba(37,99,235,.55),rgba(56,189,248,.6),transparent 330deg)',
                filter: 'blur(16px)',
                mixBlendMode: 'screen',
              }}
            />
          </div>
        </div>
      </div>

      {/* ======= Contenu animé ======= */}
      <div className="relative mb-10 h-28">
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.45, ease: 'easeOut' }}
            className="absolute inset-0 flex flex-col items-center justify-center gap-12 px-4"
          >
            {/* pastille bleue glass */}
            <div className="relative -mt-28 grid place-items-center">
              <div className="grid size-16 lg:size-20 place-items-center rounded-full border border-sky-400/40 bg-sky-100/80 text-3xl backdrop-blur-xl shadow-[0_10px_30px_rgba(37,99,235,0.25)] dark:border-sky-300/20 dark:bg-sky-950/60 dark:text-sky-100">
                {testimonials[active].emoji}
              </div>
            </div>
            {/* texte bleu */}
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

      {/* ======= Navigation ======= */}
      <div className="mt-4 flex items-center justify-center gap-5">
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
              onClick={() => {
                setAutorotate(false);
                setActive(i);
              }}
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
}
