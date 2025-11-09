'use client';

import Link from 'next/link';
import { cn } from '@/lib/utils';
import WhatsAppButton from '../WhatsappButton';
import StarClientsGoogleOnBlue from '../StarClientsGoogleOnBlue';
import CalendlyWidgetFlorent from './alendlyWidgetFlorent';

interface Props {
  title: string;
  desc: string;
  textBtn: string;
}

export default function CallToAction({ title, desc, textBtn }: Props) {
  return (
    <section className="relative mx-auto w-full max-w-7xl sm:px-2 px-4 py-28 md:py-40">
      {/* fond global clair + décorations */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-100"
        style={{
          background:
            'repeating-linear-gradient(90deg, hsl(var(--primary) / 0.08) 0 1px, transparent 1px calc(12.5%))',
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -left-24 -top-24 h-80 w-80 rounded-full blur-[140px]"
        style={{
          background:
            'radial-gradient(closest-side, hsl(var(--primary) / 0.06), transparent 70%)',
        }}
      />

      {/* grille CTA + Calendly */}
      <div className="relative z-10 grid gap-10 lg:gap-8 lg:grid-cols-[1.2fr_0.8fr] items-center">
        {/* === COLONNE GAUCHE === */}
        <div
          className={cn(
            'relative overflow-hidden rounded-[3rem] p-8 md:p-10 text-center lg:text-left',
            'bg-gradient-to-tr from-[hsl(var(--primary))] via-[hsl(var(--primary)/0.9)] to-[hsl(var(--primary)/0.6)]',
            'ring-1 ring-[hsl(var(--primary)/0.4)] shadow-[0_40px_120px_-24px_rgba(0,0,0,.3)]',
            'flex flex-col items-center lg:items-start justify-center h-full'
          )}
        >
          <div className="relative z-[2] flex flex-col items-center gap-2 justify-center text-white">
            <StarClientsGoogleOnBlue />
            <h2 className="mt-4 text-3xl text-center leading-10 sm:text-4xl md:text-5xl font-extrabold tracking-tight drop-shadow-[0_20px_40px_rgba(0,0,0,0.5)]">
              {title}
            </h2>
            <p className="mt-4 max-w-xl text-center text-[15px] leading-7 text-white/85 font-medium">
              {desc}
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3 lg:justify-start">
              <Link
                href="/contact"
                className={cn(
                  'group relative inline-flex items-center justify-center rounded-3xl px-5 py-3 text-[14px] font-semibold text-black',
                  'shadow-none bg-white focus-visible:outline-none transition'
                )}
              >
                <span className="relative z-10">{textBtn}</span>
                <span className="pointer-events-none absolute inset-0 rounded-3xl ring-1 ring-white/10" />
                <svg
                  aria-hidden
                  className="ml-2 h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                >
                  <path d="M5 12h14" strokeWidth="2" />
                  <path d="M13 5l7 7-7 7" strokeWidth="2" />
                </svg>
              </Link>
              <WhatsAppButton
                className="px-5 py-3 gap-2 rounded-3xl !shadow-none flex items-center justify-center text-[14px] font-semibold"
                message="Bonjour, je souhaite échanger avec vous, par messages ou par téléphone. Quand vous convient-il ?"
                label="WhatsApp"
              />
              <Link
                href="/our-projects"
                className={cn(
                  'group relative inline-flex items-center justify-center rounded-3xl px-5 py-3 text-[14px] font-semibold text-white',
                  'shadow-none focus-visible:outline-none transition backdrop-blur-md'
                )}
              >
                <span className="relative z-10">Voir nos projets</span>
                <span className="pointer-events-none absolute inset-0 rounded-3xl ring-1 ring-white/5" />
                <svg
                  aria-hidden
                  className="ml-2 h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                >
                  <path d="M5 12h14" strokeWidth="2" />
                  <path d="M13 5l7 7-7 7" strokeWidth="2" />
                </svg>
              </Link>
            </div>
            <div className="mt-5 text-[11px] text-white/60">
              Réponse sous 24h • Devis gratuit
            </div>
          </div>
        </div>

        {/* === COLONNE DROITE === */}
        <div className="flex justify-center items-center h-full">
          <CalendlyWidgetFlorent />
        </div>
      </div>
    </section>
  );
}
