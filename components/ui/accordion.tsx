// components/ui/accordion.tsx
'use client';

import * as React from 'react';
import * as AccordionPrimitive from '@radix-ui/react-accordion';
import { cn } from '@/lib/utils';

/* Root */
const Accordion = AccordionPrimitive.Root;

/* Item — simple ligne avec séparateur */
const AccordionItem = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>
>(({ className, ...props }, ref) => (
  <AccordionPrimitive.Item
    ref={ref}
    className={cn(
      'border-b border-neutral-200/80 dark:border-neutral-800/80',
      'first:border-t',
      className
    )}
    {...props}
  />
));
AccordionItem.displayName = 'AccordionItem';

/* Icône “+” bleu à gauche (pivote en “×” à l’ouverture) */
function PlusIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className={cn(
        'h-8 w-8 shrink-0 text-sky-600 transition-transform duration-200',
        // quand l'item est ouvert, Radix met data-state="open" sur Trigger
        // on pivote donc l'icône via la classe group-data-...
        'group-data-[state=open]:rotate-45'
      )}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
    >
      <path d="M12 5v14M5 12h14" />
    </svg>
  );
}

/* Trigger — rangée texte, sans fond, hover subtil */
const AccordionTrigger = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Header className="w-full">
    <AccordionPrimitive.Trigger
      ref={ref}
      className={cn(
        'group flex w-full text-left items-center gap-3 py-4 pr-2 pl-1',
        'text-[15px] md:text-[17px] font-medium text-neutral-800 dark:text-neutral-100',
        'transition-colors hover:text-neutral-900 dark:hover:text-white',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500/40 rounded-md',
        className
      )}
      {...props}
    >
      {/* Icône “+” qui pivote en “×” à l’ouverture */}
      <PlusIcon />

      <span className="select-text">{children}</span>
    </AccordionPrimitive.Trigger>
  </AccordionPrimitive.Header>
));
AccordionTrigger.displayName = 'AccordionTrigger';

/* Content — texte simple avec padding discret */
const AccordionContent = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <AccordionPrimitive.Content
    ref={ref}
    className={cn(
      'overflow-hidden data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down'
    )}
    {...props}
  >
    <div
      className={cn(
        'pb-5 pl-7 pr-2',
        'text-[13.5px] md:text-[15px] leading-6 md:leading-7',
        'text-neutral-700 dark:text-neutral-300',
        className
      )}
    >
      {children}
    </div>
  </AccordionPrimitive.Content>
));
AccordionContent.displayName = 'AccordionContent';

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };
