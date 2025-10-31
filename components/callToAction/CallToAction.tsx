'use client';

import Link from 'next/link';
import { cn } from '@/lib/utils';
import StarClientsGoogle from '../StarClientsGoogle';
import WhatsAppButton from '../WhatsappButton';

interface Props {
  title: string;
  desc: string;
  textBtn: string;
  reviewsCount?: number; // si StarClientsGoogle le lit, sinon ignoré
}

/**
 * Notes:
 * - Utilise la variable CSS `--primary` (shadcn/tailwind) : ex. 197 100% 50%
 * - Le fond “stripes” = 8 colonnes (lignes verticales plein écran), en primary/10
 * - Verre: géré via variables --glass-a / --glass-b pour light/dark sans dupliquer le style
 * - Boutons: focus-visible + variantes dark
 */
export default function CallToAction({ title, desc, textBtn }: Props) {
  return (
    <section className="relative mx-auto w-full max-w-[120rem] px-2 sm:px-6 py-28 md:py-40">
      {/* Stripes verticales (8 colonnes), teintées en primary/10 */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-100"
        style={{
          background:
            'repeating-linear-gradient(90deg, hsl(var(--primary) / 0.1) 0 1px, transparent 1px calc(12.5%))',
        }}
      />

      {/* Halos (subtils, OK light/dark) */}
      <div
        aria-hidden
        className="pointer-events-none absolute -left-24 -top-24 h-80 w-80 rounded-full blur-[140px]"
        style={{
          background:
            'radial-gradient(closest-side, hsl(var(--primary) / 0.06), transparent 70%)',
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-24 bottom-0 h-96 w-96 rounded-full blur-[160px]"
        style={{
          background:
            // un “secondaire” en mixant un peu la primaire vers le cyan
            'radial-gradient(closest-side, color-mix(in oklab, hsl(var(--primary)) 75%, #00E5FF) / 0.14, transparent 70%)',
        }}
      />

      {/* Carte verre + bordure conique (light/dark via CSS vars) */}
      <div
        className={cn(
          'relative z-10 mx-auto max-w-6xl overflow-hidden rounded-[3rem] sm:p-12 p-5 md:p-20 text-center',
          'shadow-[0_60px_120px_-48px_rgba(0,0,0,.35)] backdrop-blur-xl',
          // variables light/dark pour le dégradé “verre”
          '[--glass-a:rgba(255,255,255,.95)] [--glass-b:rgba(255,255,255,.88)]',
          'dark:[--glass-a:rgba(10,10,12,.92)] dark:[--glass-b:rgba(12,12,16,.86)]',
          // teinte de reflet en dark un peu plus douce
          'dark:[--gloss:white/20]'
        )}
        style={{
          border: '0.5px solid transparent',
          background:
            // 1. le “verre” (padding-box)  2. la bordure conique (border-box)
            'linear-gradient(180deg, var(--glass-a), var(--glass-b)) padding-box, conic-gradient(from 160deg, hsl(var(--primary)), color-mix(in oklab, hsl(var(--primary)) 80%, white)',
        }}
      >
        {/* reflets luxe */}
        <div className="pointer-events-none absolute inset-x-10 top-4 h-14 rounded-full bg-white/40 blur-lg dark:bg-[var(--gloss)]" />
        <div className="pointer-events-none absolute inset-x-10 bottom-0 h-20 translate-y-6 rounded-full bg-[radial-gradient(50%_60%_at_50%_50%,rgba(0,0,0,.06),transparent_70%)] dark:bg-[radial-gradient(50%_60%_at_50%_50%,rgba(255,255,255,.04),transparent_70%)]" />
        <div className="pointer-events-none absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-[hsl(var(--primary)/0.5)] to-transparent" />

        {/* étoiles (ton composant) */}
        <div className="flex justify-center">
          <StarClientsGoogle /* reviews={reviewsCount} */ />
        </div>

        {/* titre + description */}
        <h2 className="mt-6 text-balance text-3xl font-extrabold leading-tight tracking-tight text-neutral-900 md:text-6xl lg:text-7xl dark:text-neutral-50">
          {title}
        </h2>
        <p className="mx-auto mt-5 max-w-3xl text-pretty text-[12px] md:leading-8 leading-6 text-neutral-700 md:text-[19px] dark:text-neutral-300">
          {desc}
        </p>

        {/* CTAs */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          {/* primaire (dégradé + gloss) */}
          <Link
            href="/contact"
            className={cn(
              'group relative inline-flex items-center justify-center rounded-3xl px-7 py-4 text-[15px] font-semibold text-white',
              'shadow-[0_28px_56px_-22px_hsl(var(--primary)/0.7)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--primary))/0.45]',
              'transition'
            )}
            style={{
              background:
                'linear-gradient(135deg, hsl(var(--primary)), color-mix(in oklab, hsl(var(--primary)) 78%, #00E5FF))',
            }}
          >
            <span className="relative z-10">{textBtn}</span>
            <span className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-white/25" />
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
            className=" px-6 py-4  gap-2 rounded-3xl flex items-center justify-center"
            message="Bonjour, je souhaite échanger avec vous, par messages ou par téléphone. Quand vous convient-il ?"
            label="WhatsApp"
          />
          {/* secondaire (ghost luxe) */}
          <Link
            href="/our-projects"
            className={cn(
              'inline-flex items-center justify-center rounded-3xl px-6 py-4 text-[15px] font-semibold transition',
              'bg-white/80 text-neutral-800 ring-1 ring-black/[0.04] hover:bg-white',
              'dark:bg-neutral-900/70 dark:text-neutral-100 dark:ring-white/[0.04] dark:hover:bg-neutral-900'
            )}
          >
            Voir nos projets
          </Link>
        </div>

        {/* micro-confiance */}
        <div className="mt-5 text-xs text-neutral-500 dark:text-neutral-400">
          Réponse sous 24h • Devis gratuit
        </div>

        {/* halo interne très léger pour profondeur */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            boxShadow: 'inset 0 -120px 220px -80px hsl(var(--primary) / 0.12)',
          }}
        />
      </div>
    </section>
  );
}
