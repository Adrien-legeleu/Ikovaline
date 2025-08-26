// CardStack.tsx
'use client';

import * as React from 'react';
import { HTMLMotionProps, motion } from 'motion/react';
import { cn } from '@/lib/utils';

interface CardStickyProps extends HTMLMotionProps<'div'> {
  index: number;
  incrementY?: number;
  incrementZ?: number;
}

export const ContainerScroll = React.forwardRef<
  HTMLDivElement,
  React.HTMLProps<HTMLDivElement>
>(({ children, className, style, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('relative w-full', className)}
    style={{ perspective: '1000px', ...(style || {}) }}
    {...props}
  >
    {children}
  </div>
));
ContainerScroll.displayName = 'ContainerScroll';

function useIsMobile(breakpoint = 768) {
  const [isMobile, setIsMobile] = React.useState(false);
  React.useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < breakpoint);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, [breakpoint]);
  return isMobile;
}

export const CardSticky = React.forwardRef<HTMLDivElement, CardStickyProps>(
  (
    {
      index,
      incrementY = 10,
      incrementZ = 10,
      className,
      style,
      children,
      ...props
    },
    ref
  ) => {
    const isMobile = useIsMobile();
    const y = index * incrementY + (isMobile ? 10 : 120);
    const z = index * incrementZ;

    return (
      <motion.div
        ref={ref}
        layout="position"
        className={cn('sticky top-32 will-change-transform', className)}
        style={{ top: y, z, backfaceVisibility: 'hidden', ...(style || {}) }}
        {...props}
      >
        {children}
      </motion.div>
    );
  }
);
CardSticky.displayName = 'CardSticky';

export function GlassSticky({
  className = '',
  children,
}: React.PropsWithChildren<{ className?: string }>) {
  return (
    <div
      className={[
        'relative z-10 overflow-hidden rounded-[28px] p-5',
        'backdrop-blur-2xl',

        /* ——— Light (inchangé/clean) ——— */
        'bg-[radial-gradient(120%_120%_at_50%_0%,rgba(255,255,255,0.92),rgba(245,248,252,0.55))]',

        /* ——— Dark = noir fumé (aucun blanc) ——— */
        'dark:bg-[linear-gradient(180deg,rgba(8,12,18,0.80),rgba(8,12,18,0.58))]',
        'border border-black/5 dark:border-[rgba(56,130,246,0.14)]',

        /* profondeur (pas de glow blanc en dark) */
        'shadow-[0_28px_90px_rgba(6,24,44,0.14),0_6px_16px_rgba(6,24,44,0.08)]',
        'dark:shadow-[0_18px_60px_rgba(2,6,12,0.65),inset_0_1px_0_rgba(59,130,246,0.10)]',
        className,
      ].join(' ')}
    >
      {/* RIM & reflets — LIGHT */}
      <span
        className="pointer-events-none absolute inset-0 rounded-[28px] block dark:hidden"
        style={{
          border: '1px solid transparent',
          backgroundImage:
            'linear-gradient(135deg,rgba(255,255,255,.92),rgba(245,248,252,.52)),' +
            'conic-gradient(from 200deg,rgba(255,255,255,.85),rgba(59,130,246,.35),rgba(255,255,255,.55),rgba(59,130,246,.25),rgba(255,255,255,.85))',
          backgroundClip: 'padding-box,border-box',
        }}
      />

      {/* RIM & reflets — DARK (teinte bleue, AUCUN blanc) */}
      <span
        className="pointer-events-none absolute inset-0 hidden rounded-[28px] opacity-90 dark:block"
        style={{
          border: '1px solid transparent',
          backgroundImage:
            'linear-gradient(135deg,rgba(8,12,18,0.92),rgba(8,12,18,0.55)),' + // base noire
            // léger liseré bleu
            'conic-gradient(from 210deg,rgba(37,99,235,.22),rgba(56,189,248,.18),rgba(37,99,235,.22))',
          backgroundClip: 'padding-box,border-box',
          // surtout PAS screen/plus-lighter qui blanchissent sur noir
          mixBlendMode: 'normal',
        }}
      />

      {/* STREAK haut — remplace le blanc par un bleu très faible en dark */}
      <span className="pointer-events-none absolute left-6 right-6 top-2 h-6 rounded-full blur-[10px] bg-white/70 dark:bg-sky-400/15" />

      {/* Glow bas bleu (sans blanc) */}
      <span className="pointer-events-none absolute -bottom-10 left-1/2 h-16 w-[82%] -translate-x-1/2 rounded-full blur-3xl bg-[radial-gradient(ellipse_at_center,rgba(56,189,248,.55),rgba(37,99,235,.38),transparent_70%)] dark:opacity-80" />

      {/* Vignette d’épaisseur (noir en dark) */}
      <span className="pointer-events-none absolute inset-0 rounded-[28px] ring-1 ring-black/0 shadow-[inset_0_1px_0_rgba(255,255,255,.75),inset_0_-1px_0_rgba(0,0,0,.08)] dark:shadow-[inset_0_1px_0_rgba(37,99,235,.14),inset_0_-1px_0_rgba(0,0,0,.6)]" />

      {/* grain subtil (bleuté en dark, pas blanc) */}
      <span
        className="pointer-events-none absolute inset-0 opacity-[.07] dark:opacity-[.05] mix-blend-normal"
        style={{
          background:
            'radial-gradient(120% 120% at 50% 0%, rgba(2,6,12,0), rgba(2,6,12,.08)),' +
            'url("data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 width=%27120%27 height=%27120%27 viewBox=%270 0 120 120%27%3E%3Cfilter id=%27n%27%3E%3CfeTurbulence type=%27fractalNoise%27 baseFrequency=%270.8%27 numOctaves=%272%27 stitchTiles=%27stitch%27/%3E%3C/filter%3E%3Crect width=%27120%27 height=%27120%27 filter=%27url(%23n)%27 fill=%27%230a1220%27 fill-opacity=%270.12%27/%3E%3C/svg%3E")',
        }}
      />

      <div className="relative">{children}</div>
    </div>
  );
}
