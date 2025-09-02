'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useMotionValueEvent, useScroll, motion } from 'motion/react';
import { cn } from '@/lib/utils';

export type StickyItem = {
  title: string;
  description: string;
  content?: React.ReactNode;
};

type Props = {
  content: StickyItem[];
  contentClassName?: string;
  className?: string;
  /** Couleurs light (fallback) */
  backgrounds?: string[];
  gradients?: string[];
  /** Couleurs dark (optionnel) */
  darkBackgrounds?: string[];
  darkGradients?: string[];
};

/* ============================= DESKTOP (identique) ============================= */

export function StickyScrollDesktop({
  content,
  contentClassName,
  className,
  backgrounds = ['#ffffff', '#fafafa', '#ffffff'],
  gradients = [
    'linear-gradient(135deg, #2CB7FF1a, #00A8FF14)',
    'linear-gradient(135deg, #60A5FA1a, #2CB7FF14)',
    'linear-gradient(135deg, #38BDF81a, #60A5FA14)',
  ],
  darkBackgrounds = ['#0a0a0a', '#0b0b0b', '#0a0a0a'],
  darkGradients = [
    'linear-gradient(135deg, #0ea5e915, #38bdf812)',
    'linear-gradient(135deg, #38bdf815, #60a5fa12)',
    'linear-gradient(135deg, #60a5fa15, #93c5fd12)',
  ],
}: Props) {
  const [activeCard, setActiveCard] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  // Détecte .dark
  const [isDark, setIsDark] = useState(false);
  useEffect(() => {
    const root = document.documentElement;
    const update = () => setIsDark(root.classList.contains('dark'));
    update();
    const mo = new MutationObserver(update);
    mo.observe(root, { attributes: true, attributeFilter: ['class'] });
    return () => mo.disconnect();
  }, []);

  const bgList = isDark ? darkBackgrounds : backgrounds;
  const gradList = isDark ? darkGradients : gradients;

  // Scroll progress sur la section
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const cardLength = content.length;

  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    const idx = Math.min(
      cardLength - 1,
      Math.max(0, Math.floor(latest * cardLength + 0.0001))
    );
    setActiveCard(idx);
  });

  const backgroundColor = useMemo(
    () => bgList[activeCard % bgList.length],
    [activeCard, bgList]
  );
  const backgroundGradient = useMemo(
    () => gradList[activeCard % gradList.length],
    [activeCard, gradList]
  );

  return (
    <motion.section
      ref={containerRef}
      animate={{ backgroundColor }}
      className={cn(
        'relative grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(28rem,36rem)]',
        'gap-6 md:gap-8 rounded-3xl border border-black/5 dark:border-white/5',
        'shadow-[0_24px_50px_-20px_rgba(0,0,0,.2)]',
        'p-5 md:p-8 lg:p-10',
        'min-h-[160vh] md:min-h-[180vh] lg:min-h-[160vh]',
        className
      )}
    >
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 rounded-3xl"
        style={{ background: backgroundGradient, opacity: isDark ? 0.12 : 0.1 }}
      />

      {/* Colonne gauche — textes */}
      <div className="relative z-10">
        <div className="mx-auto max-w-2xl">
          {content.map((item, index) => {
            const isActive = index === activeCard;
            return (
              <article key={item.title + index} className="my-20 md:my-28">
                <motion.h2
                  initial={{ opacity: 0.5, y: 8 }}
                  animate={{ opacity: isActive ? 1 : 0.5, y: 0 }}
                  transition={{ duration: 0.25 }}
                  className={cn(
                    'text-2xl md:text-3xl font-semibold tracking-tight',
                    'text-neutral-900 dark:text-white'
                  )}
                >
                  {item.title}
                </motion.h2>
                <motion.p
                  initial={{ opacity: 0.5 }}
                  animate={{ opacity: isActive ? 1 : 0.5 }}
                  transition={{ duration: 0.25 }}
                  className="mt-3 md:mt-4 max-w-[40ch] text-[15px] md:text-base leading-7 text-neutral-700 dark:text-neutral-300"
                >
                  {item.description}
                </motion.p>

                {/* Mobile dans la version desktop : on garde, mais caché par lg:hidden */}
                {isActive && (
                  <div className="lg:hidden mt-6">
                    <div
                      style={{ background: backgroundGradient }}
                      className={cn(
                        'h-[22rem] sm:h-[26rem] md:h-[28rem] w-full overflow-hidden',
                        'rounded-2xl bg-white shadow-[0_32px_64px_-36px_rgba(0,0,0,.35)]',
                        'ring-1 ring-black/10 dark:ring-white/10',
                        contentClassName
                      )}
                    >
                      {content[index].content ?? null}
                    </div>
                  </div>
                )}
              </article>
            );
          })}

          {/* Pips mobile cachés en desktop */}
          <div className="lg:hidden mt-2 flex justify-center gap-2">
            {content.map((_, i) => (
              <span
                key={i}
                className={cn(
                  'h-1.5 w-5 rounded-full bg-neutral-300 dark:bg-neutral-700 transition-all',
                  i === activeCard && 'w-7 bg-primary'
                )}
              />
            ))}
          </div>

          <div className="h-10 md:h-16" />
        </div>
      </div>

      {/* Panneau sticky (desktop) */}
      <div className={cn('relative z-10', 'hidden lg:block')}>
        <div
          style={{ background: backgroundGradient }}
          className={cn(
            'sticky top-24 h-[30rem] xl:h-[32rem] w-full overflow-hidden',
            'rounded-2xl bg-white shadow-[0_40px_80px_-32px_rgba(0,0,0,.35)]',
            'ring-1 ring-black/10 dark:ring-white/10',
            contentClassName
          )}
        >
          {content[activeCard].content ?? null}
        </div>
      </div>
    </motion.section>
  );
}

/* ============================= MOBILE/TABLETTE ============================= */

export function StickyScrollMobile({
  content,
  contentClassName,
  className,
  gradients = [
    'linear-gradient(135deg, #2CB7FF1a, #00A8FF14)',
    'linear-gradient(135deg, #60A5FA1a, #2CB7FF14)',
    'linear-gradient(135deg, #38BDF81a, #60A5FA14)',
  ],
  darkGradients = [
    'linear-gradient(135deg, #0ea5e915, #38bdf812)',
    'linear-gradient(135deg, #38bdf815, #60a5fa12)',
    'linear-gradient(135deg, #60a5fa15, #93c5fd12)',
  ],
}: Props) {
  // Détecte .dark
  const [isDark, setIsDark] = useState(false);
  useEffect(() => {
    const root = document.documentElement;
    const update = () => setIsDark(root.classList.contains('dark'));
    update();
    const mo = new MutationObserver(update);
    mo.observe(root, { attributes: true, attributeFilter: ['class'] });
    return () => mo.disconnect();
  }, []);

  const gradList = isDark ? darkGradients : gradients;

  return (
    <section
      className={cn(
        'relative rounded-3xl border border-black/5 dark:border-white/5 p-5 md:p-8',
        className
      )}
    >
      <div className="mx-auto max-w-2xl">
        {content.map((item, index) => {
          const grad = gradList[index % gradList.length];
          return (
            <article key={item.title + index} className="py-8 md:py-12">
              <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-neutral-900 dark:text-white">
                {item.title}
              </h2>
              <p className="mt-3 md:mt-4 max-w-[40ch] text-[15px] md:text-base leading-7 text-neutral-700 dark:text-neutral-300">
                {item.description}
              </p>

              {item.content && (
                <div
                  style={{ background: grad }}
                  className={cn(
                    'mt-6 h-[22rem] sm:h-[26rem] md:h-[28rem] w-full overflow-hidden',
                    'rounded-2xl bg-white shadow-[0_32px_64px_-36px_rgba(0,0,0,.35)]',
                    'ring-1 ring-black/10 dark:ring-white/10',
                    contentClassName
                  )}
                >
                  {item.content}
                </div>
              )}
            </article>
          );
        })}
      </div>
    </section>
  );
}

/* ============================= WRAPPER (export) ============================= */

export function StickyScroll(props: Props) {
  return (
    <>
      <div className="hidden lg:block">
        <StickyScrollDesktop {...props} />
      </div>
      <div className="block lg:hidden">
        <StickyScrollMobile {...props} />
      </div>
    </>
  );
}
