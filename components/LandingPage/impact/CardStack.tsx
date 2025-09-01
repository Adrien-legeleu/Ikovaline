// CardStack.tsx
'use client';

import * as React from 'react';
import { motion, type HTMLMotionProps } from 'motion/react';
import { cn } from '@/lib/utils';

interface CardStickyProps extends Omit<HTMLMotionProps<'div'>, 'style'> {
  index: number;
  incrementY?: number; // décalage vertical entre cartes
  zBase?: number; // base du z-index
  cardClassName?: string;
}

/* Conteneur de la colonne qui scrolle — pas d'overflow ici */
export const ContainerScroll = React.forwardRef<
  HTMLDivElement,
  React.HTMLProps<HTMLDivElement>
>(({ children, className, style, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('relative w-full overflow-visible', className)}
    style={style}
    {...props}
  >
    {children}
  </div>
));
ContainerScroll.displayName = 'ContainerScroll';

/* Helper “isMobile” juste pour ajuster le top */
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

/* Une carte collante : <div sticky> (wrapper) + <motion.div> (carte) */
export const CardSticky = React.forwardRef<HTMLDivElement, CardStickyProps>(
  (
    {
      index,
      incrementY = 10,
      zBase = 10,
      className,
      cardClassName,
      children,
      ...motionProps
    },
    ref
  ) => {
    const isMobile = useIsMobile();
    const top = index * incrementY + (isMobile ? 10 : 120);
    const zIndex = zBase + index;

    return (
      <div
        ref={ref}
        className={cn('sticky', className)}
        style={{ top }} // ⚠️ top sur le WRAPPER
      >
        <motion.div
          layout="position"
          className={cn('relative', cardClassName)}
          style={{ zIndex, backfaceVisibility: 'hidden' }} // z-index sur la CARTE
          {...motionProps}
        >
          {children}
        </motion.div>
      </div>
    );
  }
);
CardSticky.displayName = 'CardSticky';

/* Optionnel : ton skin “verre” inchangé */
export function GlassSticky({
  className = '',
  children,
}: React.PropsWithChildren<{ className?: string }>) {
  return (
    <div
      className={[
        'relative z-10 overflow-hidden rounded-[28px] p-5',
        'bg-[radial-gradient(120%_120%_at_50%_0%,rgba(255,255,255,0.92),rgba(245,248,252,0.55))]',
        'dark:bg-[linear-gradient(180deg,rgb(8,12,18),rgb(8,12,18))]',
        'border border-black/5 dark:border-[rgba(56,130,246,0.14)]',
        'shadow-[0_28px_90px_rgba(6,24,44,0.14),0_6px_16px_rgba(6,24,44,0.08)]',
        'dark:shadow-[0_18px_60px_rgba(2,6,12,0.65),inset_0_1px_0_rgba(59,130,246,0.10)]',
        className,
      ].join(' ')}
    >
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
      <span
        className="pointer-events-none absolute inset-0 hidden rounded-[28px] opacity-90 dark:block"
        style={{
          border: '1px solid transparent',
          backgroundImage:
            'linear-gradient(135deg,rgba(8,12,18,0.92),rgba(8,12,18,0.55)),' +
            'conic-gradient(from 210deg,rgba(37,99,235,.22),rgba(56,189,248,.18),rgba(37,99,235,.22))',
          backgroundClip: 'padding-box,border-box',
        }}
      />
      <span className="pointer-events-none absolute left-6 right-6 top-2 h-6 rounded-full blur-[10px] bg-white/70 dark:bg-sky-400/15" />
      <span className="pointer-events-none absolute -bottom-10 left-1/2 h-16 w-[82%] -translate-x-1/2 rounded-full blur-3xl bg-[radial-gradient(ellipse_at_center,rgba(56,189,248,.55),rgba(37,99,235,.38),transparent_70%)] dark:opacity-80" />
      <div className="relative">{children}</div>
    </div>
  );
}
