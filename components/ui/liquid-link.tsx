// components/ui/liquid-link.tsx
'use client';

import * as React from 'react';
import Link, { type LinkProps } from 'next/link';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

export const liquidbuttonVariants = cva(
  'inline-flex relative isolate items-center justify-center cursor-pointer gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-[color,box-shadow,transform] disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*="size-"])]:size-4 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]',
  {
    variants: {
      variant: {
        default: 'bg-transparent text-primary hover:scale-105 duration-300',
      },
      size: {
        default: 'h-9 px-4',
        xl: 'h-12 px-8',
        xxl: 'h-14 px-10',
      },
    },
    defaultVariants: { variant: 'default', size: 'xxl' },
  }
);

type LiquidLinkProps = LinkProps &
  Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, keyof LinkProps> &
  VariantProps<typeof liquidbuttonVariants>;

export const LiquidLink = React.forwardRef<HTMLAnchorElement, LiquidLinkProps>(
  ({ href, className, variant, size, children, ...props }, ref) => {
    return (
      <Link
        ref={ref}
        href={href}
        className={cn(liquidbuttonVariants({ variant, size }), className)}
        {...props}
      >
        {/* contenu cliquable */}
        <span className="relative z-10">{children}</span>

        {/* calque relief (ne bloque pas le clic) */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 z-0 rounded-full
            shadow-[0_0_6px_rgba(0,0,0,0.03),0_2px_6px_rgba(0,0,0,0.08),inset_3px_3px_0.5px_-3px_rgba(0,0,0,0.9),inset_-3px_-3px_0.5px_-3px_rgba(0,0,0,0.85),inset_1px_1px_1px_-0.5px_rgba(0,0,0,0.6),inset_-1px_-1px_1px_-0.5px_rgba(0,0,0,0.6),inset_0_0_6px_6px_rgba(0,0,0,0.12),inset_0_0_2px_2px_rgba(0,0,0,0.06),0_0_12px_rgba(255,255,255,0.15)]"
        />
        {/* calque filtre (SVG) */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10 overflow-hidden rounded-md"
          style={{ filter: 'url("#container-glass")' }} // 👈 filtre SVG (plus fiable que backdropFilter)
        />
        <GlassFilter />
      </Link>
    );
  }
);
LiquidLink.displayName = 'LiquidLink';

function GlassFilter() {
  return (
    <svg className="hidden">
      <defs>
        <filter id="container-glass" x="0" y="0" width="100%" height="100%">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.05 0.05"
            numOctaves="1"
            seed="1"
            result="noise"
          />
          <feGaussianBlur in="noise" stdDeviation="2" result="blurred" />
          <feDisplacementMap
            in="SourceGraphic"
            in2="blurred"
            scale="70"
            xChannelSelector="R"
            yChannelSelector="B"
          />
        </filter>
      </defs>
    </svg>
  );
}
