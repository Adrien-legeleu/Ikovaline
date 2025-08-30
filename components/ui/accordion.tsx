'use client';

import * as React from 'react';
import * as AccordionPrimitive from '@radix-ui/react-accordion';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { LiquidButton } from './liquid-glass-button';

/* Root */
const Accordion = AccordionPrimitive.Root;

/* Item */
const AccordionItem = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>
>(({ className, ...props }, ref) => (
  <AccordionPrimitive.Item
    ref={ref}
    className={cn('relative rounded-3xl overflow-hidden', className)}
    {...props}
  />
));
AccordionItem.displayName = 'AccordionItem';

/* Trigger — Liquid Glass + accents bleus */
const AccordionTrigger = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Header className="flex w-full">
    <AccordionPrimitive.Trigger
      ref={ref}
      className={cn(
        'group relative flex w-full items-center gap-4 rounded-2xl px-6 py-5 text-left',
        'text-[15px] md:text-[17px] font-semibold tracking-tight',
        'transition-all duration-300 will-change-transform',
        // Base tint (light/dark) — aucun blanc en dark
        'backdrop-blur-2xl',
        'bg-[radial-gradient(120%_120%_at_50%_0%,rgba(255,255,255,.9),rgba(244,250,251,.48))]',
        'dark:bg-[linear-gradient(180deg,rgba(8,12,18,.86),rgba(8,12,18,.62))]',
        // Rim conique (verre)
        'border border-transparent',
        'shadow-[0_14px_40px_rgba(6,24,44,.10),0_2px_8px_rgba(6,24,44,.06)]',
        'dark:shadow-[0_16px_50px_rgba(2,6,12,.55)]',
        'hover:-translate-y-[2px] hover:shadow-[0_26px_80px_rgba(0,168,232,.20)]',
        'data-[state=open]:shadow-[0_30px_90px_rgba(37,99,235,.25)]',
        className
      )}
      {...props}
    >
      {/* barre d’accent à gauche */}
      <span className="absolute left-0 top-1/2 -translate-y-1/2 h-8 w-[3px] rounded-r-full bg-[rgba(0,168,232,.55)] dark:bg-[rgba(37,99,235,.55)]" />

      {/* streak haut (jamais blanc en dark) */}
      <span className="pointer-events-none absolute left-6 right-16 top-2 h-6 rounded-full blur-[10px] bg-black/5 dark:bg-sky-400/12" />

      {/* micro grain pour éviter le banding */}
      <span
        className="pointer-events-none absolute inset-0 opacity-[.06] dark:opacity-[.05]"
        style={{
          background:
            'url("data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 width=%27120%27 height=%27120%27 viewBox=%270 0 120 120%27%3E%3Cfilter id=%27n%27%3E%3CfeTurbulence type=%27fractalNoise%27 baseFrequency=%270.8%27 numOctaves=%272%27 stitchTiles=%27stitch%27/%3E%3C/filter%3E%3Crect width=%27120%27 height=%27120%27 filter=%27url(%23n)%27/%3E%3C/svg%3E")',
        }}
      />

      {/* Texte */}
      <span className="relative z-10 flex-1 text-neutral-900 dark:text-neutral-100">
        {children}
      </span>

      {/* Pastille chevron (glassy) */}
      <LiquidButton
        className={cn(
          ' w-10 h-10 !p-0 !px-0 !py-0 transition-transform duration-300 group-data-[state=open]:rotate-180'
        )}
      >
        <ChevronDown className="h-6 w-6 text-sky-600 dark:text-sky-400" />
      </LiquidButton>

      {/* Glow bas bleu (subtil) */}
      <span
        aria-hidden
        className="pointer-events-none absolute -bottom-8 left-1/2 h-16 w-[78%] -translate-x-1/2 rounded-full blur-3xl"
        style={{
          background:
            'radial-gradient(ellipse at center, rgba(0,168,232,.50), rgba(37,99,235,.32), transparent 70%)',
        }}
      />

      {/* Filtre « verre liquide » */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 overflow-hidden rounded-2xl"
        style={{ backdropFilter: 'url("#accordion-glass")' }}
      />
      <GlassFilter />
    </AccordionPrimitive.Trigger>
  </AccordionPrimitive.Header>
));
AccordionTrigger.displayName = 'AccordionTrigger';

/* Content — creux soft + verre */
const AccordionContent = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Content
    ref={ref}
    className="overflow-hidden data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down"
    {...props}
  >
    <div
      className={cn(
        'relative mt-2 rounded-2xl px-6 py-5 text-[15px] md:text-base leading-relaxed',
        'text-neutral-700 dark:text-neutral-300',
        'backdrop-blur-2xl',
        'bg-[radial-gradient(120%_120%_at_50%_0%,rgba(255,255,255,.88),rgba(245,248,252,.42))]',
        'dark:bg-[linear-gradient(180deg,rgba(8,12,18,.84),rgba(8,12,18,.58))]',
        'border border-white/40 dark:border-[rgba(56,130,246,0.15)]',
        'shadow-[inset_2px_2px_4px_rgba(0,0,0,.06),inset_-1px_-1px_2px_rgba(255,255,255,.25),0_6px_28px_rgba(6,24,44,.06)]',
        'dark:shadow-[inset_1px_1px_3px_rgba(0,0,0,.55),inset_-1px_-1px_2px_rgba(255,255,255,.04),0_10px_36px_rgba(2,6,12,.35)]',
        className
      )}
    >
      {/* streak très léger du contenu */}
      <span className="pointer-events-none absolute left-6 right-6 top-2 h-4 rounded-full blur-[8px] bg-black/5 dark:bg-sky-400/8" />
      {/* Glow bas soft */}
      <span
        aria-hidden
        className="pointer-events-none absolute -bottom-8 left-1/2 h-12 w-3/4 -translate-x-1/2 rounded-full blur-2xl"
        style={{
          background:
            'radial-gradient(ellipse at center, rgba(0,168,232,.35), rgba(37,99,235,.22), transparent 70%)',
        }}
      />
      {/* filtre verre */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 overflow-hidden rounded-2xl"
        style={{ backdropFilter: 'url("#accordion-glass")' }}
      />
      <span className="relative z-10 block">{children}</span>
    </div>
  </AccordionPrimitive.Content>
));
AccordionContent.displayName = 'AccordionContent';

/* Filtre glass (dédié accordéon) */
function GlassFilter() {
  return (
    <svg className="hidden">
      <defs>
        <filter
          id="accordion-glass"
          x="0%"
          y="0%"
          width="100%"
          height="100%"
          colorInterpolationFilters="sRGB"
        >
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.05 0.05"
            numOctaves="1"
            seed="3"
            result="noise"
          />
          <feGaussianBlur in="noise" stdDeviation="2" result="blurNoise" />
          <feDisplacementMap
            in="SourceGraphic"
            in2="blurNoise"
            scale="58"
            xChannelSelector="R"
            yChannelSelector="B"
            result="displaced"
          />
          <feGaussianBlur in="displaced" stdDeviation="3" result="final" />
          <feComposite in="final" in2="final" operator="over" />
        </filter>
      </defs>
    </svg>
  );
}

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };
