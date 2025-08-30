'use client';

import {
  CSSProperties,
  ReactElement,
  ReactNode,
  useEffect,
  useRef,
  useState,
} from 'react';
import { cn } from '@/lib/utils';

interface NeonColorsProps {
  firstColor: string;
  secondColor: string;
}
interface NeonGradientCardProps {
  as?: ReactElement;
  className?: string;
  children?: ReactNode;
  borderSize?: number;
  borderRadius?: number;
  neonColors?: NeonColorsProps;
  [key: string]:
    | string
    | boolean
    | undefined
    | number
    | NeonColorsProps
    | ReactElement
    | ReactNode;
}

export const NeonGradientCard: React.FC<NeonGradientCardProps> = ({
  className,
  children,
  borderSize = 3,
  borderRadius = 32,
  neonColors = {
    firstColor: '#00A8E8', // electric blue
    secondColor: '#2563EB', // royal blue
  },
  ...props
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [dim, setDim] = useState({ w: 0, h: 0 });

  const update = () => {
    if (ref.current) {
      setDim({ w: ref.current.offsetWidth, h: ref.current.offsetHeight });
    }
  };

  useEffect(() => {
    update();
    window.addEventListener('resize', update, { passive: true });
    return () => window.removeEventListener('resize', update);
  }, []);
  useEffect(() => update(), [children]);

  return (
    <div
      ref={ref}
      style={
        {
          '--b': `${borderSize}px`,
          '--r': `${borderRadius}px`,
          '--c1': neonColors.firstColor,
          '--c2': neonColors.secondColor,
          '--pw': `${dim.w + borderSize * 2}px`,
          '--ph': `${dim.h + borderSize * 2}px`,
          '--blur': `${Math.max(dim.w, 240) / 2.8}px`,
        } as CSSProperties
      }
      className={cn('relative z-10 size-full rounded-[var(--r)]', className)}
      {...props}
    >
      {/* contour néon animé */}
      <span
        aria-hidden
        className="pointer-events-none absolute -left-[var(--b)] -top-[var(--b)] -z-10 block h-[var(--ph)] w-[var(--pw)] rounded-[var(--r)]
                   bg-[linear-gradient(0deg,var(--c1),var(--c2))] bg-[length:100%_200%] animate-background-position-spin opacity-80"
      />
      <span
        aria-hidden
        className="pointer-events-none absolute -left-[var(--b)] -top-[var(--b)] -z-10 block h-[var(--ph)] w-[var(--pw)] rounded-[var(--r)]
                   blur-[var(--blur)] bg-[linear-gradient(0deg,var(--c1),var(--c2))] bg-[length:100%_200%] animate-background-position-spin opacity-60"
      />

      {/* contenu — liquid glass */}
      <div
        className={cn(
          'relative size-full min-h-[inherit] rounded-[calc(var(--r)-var(--b))] p-6',
          // LIGHT
          'bg-[linear-gradient(135deg,rgba(255,255,255,.92),rgba(240,245,252,.50))]',
          // DARK (black glass, no white)
          'dark:bg-[linear-gradient(135deg,rgba(8,12,18,.95),rgba(8,12,18,.65))]',
          'backdrop-blur-2xl backdrop-saturate-150',
          'border border-white/60 dark:border-[rgba(56,130,246,.22)]',
          'shadow-[0_24px_80px_rgba(0,168,232,.22),inset_0_1px_0_rgba(255,255,255,.55)]',
          'dark:shadow-[0_24px_80px_rgba(0,0,0,.65),inset_0_1px_0_rgba(59,130,246,.12)]'
        )}
      >
        {/* rim interne clair */}
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-[calc(var(--r)-var(--b))] block dark:hidden"
          style={{
            border: '1px solid transparent',
            backgroundImage:
              'linear-gradient(135deg,rgba(255,255,255,.95),rgba(245,248,252,.52)),' +
              'conic-gradient(from 210deg,rgba(255,255,255,.90),rgba(0,168,232,.30),rgba(255,255,255,.55),rgba(37,99,235,.22),rgba(255,255,255,.90))',
            backgroundClip: 'padding-box,border-box',
            opacity: 0.95,
          }}
        />
        {/* rim interne dark (no white) */}
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 hidden rounded-[calc(var(--r)-var(--b))] dark:block"
          style={{
            border: '1px solid transparent',
            backgroundImage:
              'linear-gradient(135deg,rgba(8,12,18,.96),rgba(8,12,18,.62)),' +
              'conic-gradient(from 210deg,rgba(0,168,232,.24),rgba(37,99,235,.18),rgba(0,168,232,.24))',
            backgroundClip: 'padding-box,border-box',
            opacity: 0.92,
          }}
        />

        {/* streak doux */}
        <span className="pointer-events-none absolute left-6 right-6 top-2 h-6 rounded-full blur-[12px] bg-white/70 dark:bg-sky-400/10" />
        {children}
      </div>
    </div>
  );
};
