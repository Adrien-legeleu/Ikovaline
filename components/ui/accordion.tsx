'use client';

import * as React from 'react';
import * as AccordionPrimitive from '@radix-ui/react-accordion';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

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

/* Trigger (glassy) */
const AccordionTrigger = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Header className="flex w-full">
    <AccordionPrimitive.Trigger
      ref={ref}
      className={cn(
        'group relative flex flex-1 items-center justify-between text-lg md:text-xl font-semibold px-5 py-4 rounded-2xl',
        'transition-all text-left [&[data-state=open]>svg]:rotate-180',
        // Glassy light
        'backdrop-blur-xl bg-[linear-gradient(135deg,rgba(255,255,255,.86),rgba(240,245,252,.46))]',
        'dark:bg-[linear-gradient(135deg,rgba(10,14,20,.92),rgba(10,14,20,.65))]',
        'border border-white/40 dark:border-[rgba(56,130,246,0.2)]',
        'shadow-[0_4px_12px_rgba(6,24,44,.12),inset_0_1px_0_rgba(255,255,255,.45)]',
        'dark:shadow-[0_4px_14px_rgba(2,6,12,.65),inset_0_1px_0_rgba(59,130,246,.1)]',
        'hover:shadow-[0_20px_60px_rgba(37,99,235,.15)] hover:-translate-y-[1px]',
        className
      )}
      {...props}
    >
      <span className="relative z-10">{children}</span>
      <ChevronDown
        role="presentation"
        aria-hidden="true"
        className="ml-3 h-6 w-6 shrink-0 text-neutral-600 dark:text-neutral-300 transition-transform duration-200"
      />

      {/* Glow bas */}
      <span
        aria-hidden
        className="pointer-events-none absolute -bottom-6 left-1/2 h-10 w-4/5 -translate-x-1/2 rounded-full blur-2xl
                   bg-[radial-gradient(ellipse_at_center,rgba(0,168,232,.4),rgba(37,99,235,.28),transparent_70%)]"
      />
    </AccordionPrimitive.Trigger>
  </AccordionPrimitive.Header>
));
AccordionTrigger.displayName = 'AccordionTrigger';

/* Content */
const AccordionContent = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Content
    ref={ref}
    className="overflow-hidden text-justify data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down"
    {...props}
  >
    <div
      className={cn(
        'relative mt-2 rounded-2xl  text-sm md:text-base leading-relaxed',
        // effet verre
        'backdrop-blur-xl bg-[linear-gradient(135deg,rgba(255,255,255,.85),rgba(245,248,252,.45))]',
        'dark:bg-[linear-gradient(135deg,rgba(10,14,20,.92),rgba(10,14,20,.65))]',
        'border border-white/40 dark:border-[rgba(56,130,246,0.15)]',
        'shadow-[0_3px_8px_rgba(6,24,44,.12),inset_0_1px_0_rgba(255,255,255,.4)]',
        'dark:shadow-[0_3px_10px_rgba(2,6,12,.65),inset_0_1px_0_rgba(59,130,246,.08)]',
        className
      )}
    >
      {children}
    </div>
  </AccordionPrimitive.Content>
));
AccordionContent.displayName = 'AccordionContent';

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };
