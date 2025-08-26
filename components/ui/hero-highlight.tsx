'use client';
import { cn } from '@/lib/utils';
import { useMotionValue, motion, useMotionTemplate } from 'framer-motion';
import React from 'react';

export const HeroHighlight = ({
  children,
  className,
  containerClassName,
}: {
  children: React.ReactNode;
  className?: string;
  containerClassName?: string;
}) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({
    currentTarget,
    clientX,
    clientY,
  }: React.MouseEvent<HTMLDivElement>) {
    if (!currentTarget) return;
    const { left, top } = currentTarget.getBoundingClientRect();

    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }
  return (
    <div
      className={cn(
        'relative h-full flex items-center bg-white dark:bg-black justify-center w-full group',
        containerClassName
      )}
      onMouseMove={handleMouseMove}
    >
      {/* Background neutre avec le motif */}
      <div className="absolute inset-0 bg-dot-thick-neutral-300 dark:bg-dot-thick-neutral-800 pointer-events-none" />

      {/* Motif dynamique avec les couleurs d'Ikovaline */}
      <motion.div
        className="pointer-events-none bg-dot-thick-[#6db8ff] dark:bg-dot-thick-[#0cb4f7] absolute inset-0 opacity-0 transition duration-300 group-hover:opacity-100"
        style={{
          WebkitMaskImage: useMotionTemplate`
        radial-gradient(
          200px circle at ${mouseX}px ${mouseY}px,
          black 0%,
          transparent 100%
        )
      `,
          maskImage: useMotionTemplate`
        radial-gradient(
          200px circle at ${mouseX}px ${mouseY}px,
          black 0%,
          transparent 100%
        )
      `,
        }}
      />

      <div className={cn('relative z-20', className)}>{children}</div>
    </div>
  );
};

export const Highlight = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <motion.span
      initial={{ backgroundSize: '0% 100%' }}
      whileInView={{ backgroundSize: '100% 100%' }}
      transition={{ duration: 2, ease: 'linear', delay: 0.5 }}
      viewport={{ once: true }}
      style={{
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'left center',
        display: 'inline-block',
      }}
      className={cn(
        [
          'relative inline-block py-2 px-2 m-1   rounded-3xl',
          'backdrop-blur-md',
          // verre clair (light) / noir fumé (dark)
          'bg-[linear-gradient(135deg,rgba(255,255,255,.65),rgba(240,240,240,.35))]',
          'dark:bg-[linear-gradient(135deg,rgba(17,17,20,.75),rgba(17,17,20,.45))]',
          // fine bordure
          'border border-white/40 dark:border-white/10',
          // ombre douce (quasi neutre)
          'shadow-[0_2px_12px_rgba(0,0,0,0.08),inset_0_1px_1px_rgba(255,255,255,0.25)]',
        ].join(' '),
        className
      )}
    >
      <span
        className="pointer-events-none absolute inset-0 rounded-3xl block dark:hidden"
        style={{
          border: '1px solid transparent',
          backgroundImage:
            'linear-gradient(135deg,rgba(255,255,255,.92),rgba(245,248,252,.52)),' +
            'conic-gradient(from 200deg,rgba(255,255,255,.85),rgba(59,130,246,.35),rgba(255,255,255,.55),rgba(59,130,246,.25),rgba(255,255,255,.85))',
          backgroundClip: 'padding-box,border-box',
        }}
      />

      {/* Reflets DARK (verre + bleu) */}
      <span
        className="pointer-events-none absolute inset-0 hidden rounded-3xl opacity-90 dark:block"
        style={{
          border: '1px solid transparent',
          backgroundImage:
            'linear-gradient(135deg,rgba(8,12,18,0.92),rgba(8,12,18,0.55)),' +
            'conic-gradient(from 210deg,rgba(37,99,235,.22),rgba(56,189,248,.18),rgba(37,99,235,.22))',
          backgroundClip: 'padding-box,border-box',
          mixBlendMode: 'normal',
        }}
      />

      {/* Streak haut */}
      <span className="pointer-events-none absolute left-2 right-2 top-1 h-3 rounded-full blur-[8px] bg-white/60 dark:bg-sky-400/10" />

      {/* Glow bas bleu */}
      <span className="pointer-events-none absolute -bottom-3 left-1/2 h-6 w-[80%] -translate-x-1/2 rounded-full blur-xl bg-[radial-gradient(ellipse_at_center,rgba(56,189,248,.45),rgba(37,99,235,.32),transparent_70%)] dark:opacity-80" />

      {/* Grain subtil */}
      <span
        className="pointer-events-none absolute inset-0 opacity-[.05] mix-blend-normal"
        style={{
          background:
            'radial-gradient(120% 120% at 50% 0%, rgba(2,6,12,0), rgba(2,6,12,.08)),' +
            'url("data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 width=%27120%27 height=%27120%27 viewBox=%270 0 120 120%27%3E%3Cfilter id=%27n%27%3E%3CfeTurbulence type=%27fractalNoise%27 baseFrequency=%270.8%27 numOctaves=%272%27 stitchTiles=%27stitch%27/%3E%3C/filter%3E%3Crect width=%27120%27 height=%27120%27 filter=%27url(%23n)%27 fill=%27%230a1220%27 fill-opacity=%270.12%27/%3E%3C/svg%3E")',
        }}
      />
      <span className="relative z-10 font-medium">{children}</span>
    </motion.span>
  );
};
