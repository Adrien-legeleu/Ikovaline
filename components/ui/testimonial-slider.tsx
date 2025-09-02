'use client';

import React, { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { cn } from '@/lib/utils';

export type Testimonial = { icon: React.ReactNode; quote: string };

export const TestimonialSlider = React.memo(function TestimonialSlider({
  testimonials,
  autorotateMs = 2000,
}: {
  testimonials: Testimonial[];
  autorotateMs?: number;
}) {
  const [active, setActive] = useState(0);
  const timer = useRef<NodeJS.Timeout | null>(null);

  // Auto-rotation minimaliste
  useEffect(() => {
    timer.current = setTimeout(() => {
      setActive((i) => (i + 1 === testimonials.length ? 0 : i + 1));
    }, 3000);
    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, [active, testimonials.length, autorotateMs]);

  return (
    <div className="relative mx-auto w-full h-80 flex items-center justify-center max-w-5xl px-4">
      {/* Halo “élévation” — blanc en light / noir en dark */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-x-10 -bottom-8 z-0 hidden h-24 rounded-[100px] bg-black/45 blur-3xl dark:block"
      />
      <span
        aria-hidden
        className="pointer-events-none absolute inset-x-10 -bottom-8 z-0 h-24 rounded-[100px] bg-white/80 blur-3xl dark:hidden"
      />

      {/* Carte principale (verre doux, sans néon) */}
      <div className={cn('relative z-10 overflow-hidden rounded-2xl ')}>
        {/* Liseré haut subtile */}
        <span
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-black/10 to-transparent dark:via-white/10"
        />

        {/* Léger reflet interne en haut */}
        <span
          aria-hidden
          className="pointer-events-none absolute inset-x-8 top-0 h-16 rounded-b-[48px] bg-white/40 blur-xl dark:hidden"
        />
        <span
          aria-hidden
          className="pointer-events-none absolute inset-x-8 top-0 hidden h-16 rounded-b-[48px] bg-white/5 blur-lg dark:block"
        />

        {/* Contenu animé */}
        <div className="relative px-6 py-10 sm:px-10 sm:py-14">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -14 }}
              transition={{ duration: 0.45, ease: 'easeOut' }}
              className="flex flex-col items-center gap-7 text-center"
            >
              {/* Pastille icône — 3D sobre */}
              <div className="relative">
                {/* Ombre portée sous la pastille */}
                <span
                  aria-hidden
                  className="pointer-events-none absolute left-1/2 top-full h-6 w-28 -translate-x-1/2 -translate-y-2 rounded-full bg-black/25 blur-xl dark:bg-white/15"
                />
                <div
                  className={cn(
                    'grid size-16 sm:size-20 place-items-center rounded-full',
                    'bg-white ',
                    'shadow-[inset_0_-10px_18px_rgba(0,0,0,.06),0_14px_30px_rgba(0,0,0,.16)]',
                    'ring-1 ring-black/5',
                    'dark:bg-neutral-900 text-primary dark:ring-white/10 dark:shadow-[inset_0_-10px_18px_rgba(255,255,255,.03),0_14px_30px_rgba(0,0,0,.6)]'
                  )}
                >
                  <span className="text-[26px] sm:text-[28px]">
                    {testimonials[active].icon}
                  </span>
                </div>
              </div>

              {/* Texte — grand, net, premium */}
              <p
                className={cn(
                  'max-w-3xl text-balance font-semibold leading-tight',
                  'text-[20px] sm:text-[22px] md:text-[26px] lg:text-[30px]',
                  'text-primary'
                )}
              >
                {testimonials[active].quote}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
});
