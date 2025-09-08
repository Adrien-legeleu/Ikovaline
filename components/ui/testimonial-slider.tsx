'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';
import { motion, useAnimationControls } from 'framer-motion';
import { cn } from '@/lib/utils';

export type Testimonial = { icon: React.ReactNode; quote: string };

/* ===== Breakpoint hook (≥ md) ===== */
function useIsMdUp() {
  const [isMd, setIsMd] = useState(false);
  useEffect(() => {
    if (typeof window === 'undefined' || !window.matchMedia) return;
    const mq = window.matchMedia('(min-width: 768px)');
    const listener = (e: MediaQueryListEvent) => setIsMd(e.matches);
    setIsMd(mq.matches);
    mq.addEventListener?.('change', listener);
    return () => mq.removeEventListener?.('change', listener);
  }, []);
  return isMd;
}

/* ===== Carte (reprend ton style) ===== */
function Card({ children }: { children: React.ReactNode }) {
  return (
    <div className={cn('overflow-hidden rounded-2xl')}>
      {/* Reflet doux */}
      <span
        aria-hidden
        className="pointer-events-none mx-8 block h-16 rounded-b-[48px] bg-white/40 blur-xl dark:hidden"
      />
      <span
        aria-hidden
        className="pointer-events-none mx-8 hidden h-16 rounded-b-[48px] bg-white/5 blur-lg dark:block"
      />
      <div className="relative px-6 py-10 sm:px-8 sm:py-12">{children}</div>
    </div>
  );
}

function CardInner({ icon, quote }: Testimonial) {
  return (
    <div className="flex flex-col items-center gap-7 text-center">
      {/* Pastille icône */}
      <div className="relative">
        <span
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-full h-6 w-28 -translate-x-1/2 -translate-y-2 rounded-full bg-black/25 blur-xl dark:bg-white/15"
        />
        <div
          className={cn(
            'grid size-16 sm:size-20 place-items-center rounded-full',
            'bg-white text-primary',
            'shadow-[inset_0_-10px_18px_rgba(0,0,0,.06),0_14px_30px_rgba(0,0,0,.16)]',
            'ring-1 ring-black/5',
            'dark:bg-neutral-900 dark:ring-white/10 dark:shadow-[inset_0_-10px_18px_rgba(255,255,255,.03),0_14px_30px_rgba(0,0,0,.6)]'
          )}
        >
          <span className="text-[26px] sm:text-[28px]">{icon}</span>
        </div>
      </div>

      {/* Quote */}
      <p
        className={cn(
          'max-w-xl text-balance font-semibold leading-tight',
          'text-[18px] sm:text-[20px] md:text-[22px] lg:text-[24px]',
          'text-primary'
        )}
      >
        {quote}
      </p>
    </div>
  );
}

/* ===== Slider : slide vers la GAUCHE, step-by-step ===== */
export const TestimonialSlider = React.memo(function TestimonialSlider({
  testimonials,
  autorotateMs = 3000, // attente avant chaque slide
}: {
  testimonials: Testimonial[];
  autorotateMs?: number;
}) {
  const isMdUp = useIsMdUp();
  const visibleCount = isMdUp ? 3 : 1;

  // index du 1er élément visible
  const [active, setActive] = useState(0);

  // track controls (on translateX)
  const controls = useAnimationControls();
  const timer = useRef<NodeJS.Timeout | null>(null);

  // éléments visibles + le suivant (pour faire entrer à droite)
  const windowItems = useMemo(() => {
    const len = testimonials.length;
    const count = Math.min(visibleCount, len);
    // on montre count + 1 (l’entrant)
    return Array.from(
      { length: Math.min(count + 1, len) },
      (_, k) => testimonials[(active + k) % len]
    );
  }, [active, testimonials, visibleCount]);

  // largeur d’une carte (en %) selon nb visible
  const slideWidthPct = useMemo(
    () => (visibleCount === 3 ? 100 / 3 : 100),
    [visibleCount]
  );

  // boucle : attend autorotateMs, puis slide de -slideWidthPct%, puis reset x et avance l’index
  useEffect(() => {
    if (!testimonials.length) return;

    timer.current = setTimeout(async () => {
      // animation vers la gauche (une carte)
      await controls.start({
        x: `-${slideWidthPct}%`,
        transition: { duration: 0.55, ease: [0.22, 0.8, 0.22, 1] }, // easing net, pas trop fluide
      });

      // une fois l’anim finie : on “saute” le track à x=0 sans anim et on incrémente active
      await controls.set({ x: '0%' });
      setActive((i) => (i + 1) % testimonials.length);
    }, autorotateMs);

    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, [active, autorotateMs, testimonials.length, controls, slideWidthPct]);

  return (
    <div className="relative mx-auto w-full max-w-6xl px-4">
      {/* Halo d’élévation */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-x-10 -bottom-8 z-0 hidden h-24 rounded-[100px] bg-black/45 blur-3xl dark:block"
      />
      <span
        aria-hidden
        className="pointer-events-none absolute inset-x-10 -bottom-8 z-0 h-24 rounded-[100px] bg-white/80 blur-3xl dark:hidden"
      />

      {/* Viewport */}
      <div className="relative z-10 overflow-hidden">
        {/* Track horizontal — flex, cartes à largeur fixe */}
        <div className="bg-gradient-to-r z-30 from-white to-transparent h-full absolute top-0 left-0 w-28" />
        <div className="bg-gradient-to-l z-30 from-white to-transparent h-full absolute top-0 right-0 w-28" />
        <motion.div
          className={cn('flex')}
          animate={controls}
          style={{ x: '0%' }}
        >
          {windowItems.map((t, idx) => (
            <div
              key={`${active}-${idx}`}
              className={cn(
                'shrink-0 px-3',
                // largeur d’une carte : 100% en mobile, 33.333% en ≥ md
                'basis-full md:basis-1/3'
              )}
              style={{ width: `${slideWidthPct}%` }}
            >
              <Card>
                <CardInner icon={t.icon} quote={t.quote} />
              </Card>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Bullets mobile */}
    </div>
  );
});
