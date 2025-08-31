// components/Projects/ProjectsCarousel.tsx
'use client';

import * as React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { PROJECTS_FR, PROJECTS_EN } from '@/data/projects';
import { cn } from '@/lib/utils';

type CardProps = {
  index: number;
  titre: string;
  client: string;
  secteur: string;
  periode: string;
  services: string[];
  resultat: string;
  coverImage: string;
  lien?: string;
  hrefFallback: string;
};

/* ------- Skin “Liquid Glass” : bord/tour bleu + halos + reflets ------- */
function GlassShell({
  className,
  children,
}: React.PropsWithChildren<{ className?: string }>) {
  return (
    <div
      className={cn(
        'relative z-0 overflow-hidden rounded-[28px] backdrop-blur-2xl',
        'bg-[radial-gradient(120%_120%_at_50%_0%,rgba(255,255,255,0.92),rgba(245,248,252,0.55))]',
        'dark:bg-[linear-gradient(180deg,rgba(8,12,18,0.80),rgba(8,12,18,0.58))]',
        'border border-black/5 dark:border-[rgba(2,98,254,0.30)]',
        'shadow-[0_28px_90px_rgba(6,24,44,0.14),0_6px_16px_rgba(6,24,44,0.08)]',
        className
      )}
    >
      {/* anneau conique (contour) */}
      <span
        aria-hidden
        className="pointer-events-none absolute -inset-px rounded-[28px] opacity-95"
        style={{
          background:
            'conic-gradient(from 210deg,rgba(37,99,235,.22),rgba(56,189,248,.22),rgba(37,99,235,.22))',
          WebkitMask:
            'linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)',
          WebkitMaskComposite: 'xor',
          mask: 'linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)',
          maskComposite: 'exclude',
          padding: '1px',
        }}
      />
      {/* reflets */}
      <span className="pointer-events-none absolute left-6 right-6 top-2 h-6 rounded-full blur-[10px] bg-white/70 dark:bg-sky-400/15" />
      <span className="pointer-events-none absolute -bottom-10 left-1/2 h-16 w-[82%] -translate-x-1/2 rounded-full blur-3xl bg-[radial-gradient(ellipse_at_center,rgba(56,189,248,.55),rgba(37,99,235,.38),transparent_70%)] dark:opacity-80" />
      {/* halo externe */}
      <span
        aria-hidden
        className="pointer-events-none absolute -inset-8 rounded-[30px] blur-3xl opacity-60"
        style={{
          background:
            'radial-gradient(60% 50% at 50% 0%, rgba(56,189,248,.45), rgba(59,130,246,.35), transparent 70%)',
        }}
      />
      <div className="relative z-10">{children}</div>
    </div>
  );
}

/* ------------------------ Carte projet ------------------------ */
function ProjectCard({
  index,
  titre,
  client,
  secteur,
  periode,
  services,
  resultat,
  coverImage,
  lien,
  hrefFallback,
}: CardProps) {
  const href = lien || hrefFallback;

  return (
    <Link
      href={href}
      aria-label={`${titre} – ${client}`}
      target={lien ? '_blank' : undefined}
      rel={lien ? 'noopener noreferrer' : undefined}
      className="snap-center snap-always  block"
    >
      <GlassShell className="transition-transform min-w-[300px] duration-300 hover:scale-[1.015] shadow-[0_0_28px_rgba(59,130,246,.50),0_0_70px_rgba(56,189,248,.38)] hover:shadow-[0_0_40px_rgba(59,130,246,.70),0_0_110px_rgba(56,189,248,.60)]">
        {/* Media */}
        <div className="relative aspect-[16/9] w-full overflow-hidden rounded-t-[28px]">
          <Image
            src={coverImage}
            alt={titre}
            fill
            sizes="(min-width:1280px) 900px, (min-width:1024px) 75vw, 100vw"
            className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
            priority={index === 1}
          />
          <span
            aria-hidden
            className="pointer-events-none absolute inset-x-0 bottom-0 h-0.5 opacity-80"
            style={{
              background:
                'linear-gradient(90deg, rgba(56,189,248,0), rgba(56,189,248,.6), rgba(59,130,246,.7), rgba(56,189,248,.6), rgba(56,189,248,0))',
            }}
          />
        </div>

        {/* Contenu */}
        <div className="p-5 lg:p-6">
          <div className="mb-2 flex items-center gap-2 text-[11px] sm:text-xs text-sky-900 dark:text-sky-100">
            <span className="inline-flex items-center rounded-full border border-sky-400/25 bg-sky-400/10 px-2 py-0.5">
              {client}
            </span>
            <span className="opacity-60">•</span>
            <span className="opacity-80">{secteur}</span>
          </div>

          <h3 className="text-lg sm:text-xl lg:text-2xl font-semibold tracking-tight text-neutral-900 dark:text-neutral-50">
            {titre}
          </h3>
          <p className="mt-1 text-sm text-neutral-700 dark:text-neutral-300">
            {periode}
          </p>

          <div className="mt-3 flex flex-wrap gap-2">
            {services.slice(0, 3).map((s) => (
              <span
                key={s}
                className="rounded-full border border-sky-400/30 bg-sky-500/10 px-2 py-0.5 text-[11px] font-medium text-sky-800 dark:text-sky-200"
              >
                {s}
              </span>
            ))}
            {services.length > 3 && (
              <span className="rounded-full border border-sky-400/30 bg-sky-500/10 px-2 py-0.5 text-[11px] font-medium text-sky-800 dark:text-sky-200">
                +{services.length - 3}
              </span>
            )}
          </div>

          <div className="mt-4 flex items-center justify-between">
            <span className="text-sm font-semibold text-sky-700 dark:text-sky-300">
              {resultat}
            </span>
            <span className="inline-flex items-center gap-2 text-sm font-medium text-sky-700 dark:text-sky-200">
              <span className="relative">
                <span className="relative z-10">{lien ? 'Demo' : 'Voir'}</span>
                <span className="absolute -bottom-1 left-0 h-[2px] w-0 bg-gradient-to-r from-sky-400 to-sky-600 transition-[width] duration-300 group-hover:w-full" />
              </span>
              <svg
                className="size-4 transition-transform duration-300 group-hover:translate-x-0.5"
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden
              >
                <path
                  d="M5 12h14M13 5l7 7-7 7"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
          </div>
        </div>
      </GlassShell>
    </Link>
  );
}

/* ------------------- Carrousel avec snap + auto-align JS ------------------- */
export default function ProjectsCarousel() {
  const pathname = usePathname() || '/';
  const isEN = /^\/en(\/|$)/.test(pathname);
  const t = isEN
    ? {
        title: 'Our Projects',
        all: 'See all projects →',
        baseHref: '/en/projects',
      }
    : {
        title: 'Nos Projets',
        all: 'Voir tous les projets →',
        baseHref: '/projets',
      };

  // 3 projets uniquement — on enlève Sophie direct
  const dataRaw = isEN ? PROJECTS_EN : PROJECTS_FR;
  const data = dataRaw
    .filter((p) => p.id !== 'sophie-deneriez-2025')
    .slice(0, 3);

  const viewportRef = React.useRef<HTMLDivElement | null>(null);
  const [active, setActive] = React.useState(1); // centre par défaut (carte 2/3)
  const snapPositionsRef = React.useRef<number[]>([]);
  const snapTimerRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);
  const snappingRef = React.useRef(false);

  // calcule les positions de centrage réelles (robuste : offsetLeft + width/2)
  const computeSnapPositions = React.useCallback(() => {
    const el = viewportRef.current;
    if (!el) return;

    const items = Array.from(
      el.querySelectorAll<HTMLElement>('[data-snap-item]')
    );
    const positions: number[] = items.map((it) => {
      const left = it.offsetLeft;
      const w = it.offsetWidth;
      const centerLeft = left + w / 2 - el.clientWidth / 2;
      return Math.max(0, centerLeft);
    });

    snapPositionsRef.current = positions;
  }, []);

  // scroll vers l’index souhaité
  const scrollToIndex = React.useCallback((idx: number) => {
    const el = viewportRef.current;
    if (!el) return;
    const pos = snapPositionsRef.current[idx] ?? 0;
    snappingRef.current = true;
    el.scrollTo({ left: pos, behavior: 'smooth' });
    // on relâche le flag après un petit délai
    window.setTimeout(() => {
      snappingRef.current = false;
    }, 320);
  }, []);

  // trouve l’index le plus proche d’une position
  const nearestIndex = React.useCallback((left: number) => {
    const arr = snapPositionsRef.current;
    if (!arr.length) return 0;
    let best = 0;
    let bestDist = Math.abs(arr[0] - left);
    for (let i = 1; i < arr.length; i++) {
      const dist = Math.abs(arr[i] - left);
      if (dist < bestDist) {
        best = i;
        bestDist = dist;
      }
    }
    return best;
  }, []);

  // observe scroll : met à jour l’active et déclenche un auto-snap après inertie
  React.useEffect(() => {
    const el = viewportRef.current;
    if (!el) return;

    const onScroll = () => {
      if (!snapPositionsRef.current.length) return;
      const idx = nearestIndex(el.scrollLeft);
      setActive(idx);

      if (snappingRef.current) return; // on ne se bat pas contre notre smooth scroll

      if (snapTimerRef.current) clearTimeout(snapTimerRef.current);
      snapTimerRef.current = setTimeout(() => {
        // fin d’inertie -> verrouille pile au centre le plus proche
        scrollToIndex(nearestIndex(el.scrollLeft));
      }, 90);
    };

    el.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      el.removeEventListener('scroll', onScroll);
      if (snapTimerRef.current) clearTimeout(snapTimerRef.current);
    };
  }, [nearestIndex, scrollToIndex]);

  // recalcul sur mount + resize
  React.useEffect(() => {
    computeSnapPositions();
    const ro = new ResizeObserver(() => computeSnapPositions());
    if (viewportRef.current) ro.observe(viewportRef.current);
    // recalc aussi après un tick (images)
    const t = window.setTimeout(computeSnapPositions, 200);
    return () => {
      ro.disconnect();
      clearTimeout(t);
    };
  }, [computeSnapPositions, data.length]);

  React.useEffect(() => {
    // centre par défaut sur la carte du milieu
    scrollToIndex(1);
  }, [scrollToIndex]);

  function prev() {
    scrollToIndex(Math.max(0, active - 1));
  }
  function next() {
    scrollToIndex(Math.min(data.length - 1, active + 1));
  }

  function onKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'ArrowRight') {
      e.preventDefault();
      next();
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      prev();
    }
  }

  return (
    <section className="relative pt-10 mx-auto max-w-6xl" aria-label={t.title}>
      {/* halo global bleu discret */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10" />

      <div className="sm:mb-8 mb-12 flex max-sm:flex-col max-sm:gap-5 sm:items-end items-center sm:justify-between gap-4">
        <h2 className="text-3xl sm:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-neutral-900 to-neutral-800 dark:from-neutral-100 dark:to-neutral-200">
          {t.title}
        </h2>
        <Link
          href={t.baseHref}
          className="text-sm font-medium text-sky-700 hover:underline dark:text-sky-300"
        >
          {t.all}
        </Link>
      </div>

      <div className="relative">
        {/* flèches */}
        <button
          type="button"
          aria-label="Previous"
          onClick={prev}
          className={cn(
            'absolute left-0 top-1/2 z-20 -translate-y-1/2 rounded-full backdrop-blur-md',
            'bg-white/70 dark:bg-neutral-900/60 border border-sky-400/30',
            'shadow-[0_8px_30px_rgba(59,130,246,.25)] p-2 hidden sm:inline-flex',
            active === 0 && 'opacity-50 cursor-not-allowed'
          )}
          disabled={active === 0}
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
            <path
              d="M15 6l-6 6 6 6"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
        <button
          type="button"
          aria-label="Next"
          onClick={next}
          className={cn(
            'absolute right-0 top-1/2 z-20 -translate-y-1/2 rounded-full backdrop-blur-md',
            'bg-white/70 dark:bg-neutral-900/60 border border-sky-400/30',
            'shadow-[0_8px_30px_rgba(59,130,246,.25)] p-2 hidden sm:inline-flex',
            active === data.length - 1 && 'opacity-50 cursor-not-allowed'
          )}
          disabled={active === data.length - 1}
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
            <path
              d="M9 6l6 6-6 6"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        {/* VIEWPORT — snap + fallback JS auto-align */}
        <div
          ref={viewportRef}
          role="group"
          aria-roledescription="carousel"
          tabIndex={0}
          onKeyDown={onKeyDown}
          className={cn(
            'flex items-stretch lg:gap-6 gap-4 overflow-x-auto px-6 py-16 relative bottom-10 sm:px-10 lg:px-20',
            'snap-x snap-mandatory scroll-smooth overscroll-x-contain',
            '[scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden'
          )}
          style={{
            // on centre parfaitement : padding = 10% si carte = 80% du viewport
            scrollPaddingLeft: '10%',
            scrollPaddingRight: '10%',
          }}
        >
          {data.map((p, i) => (
            <div
              key={p.id}
              data-snap-item
              className={cn(
                'shrink-0 basis-[80%] sm:basis-[68%] lg:basis-[58%]',
                i === 1 ? 'lg:scale-[1.06]' : 'lg:scale-[.98]'
              )}
            >
              <ProjectCard
                index={i}
                titre={p.titre}
                client={p.client}
                secteur={p.secteur}
                periode={p.periode}
                services={p.services}
                resultat={p.resultat}
                coverImage={p.coverImage}
                lien={p.lien}
                hrefFallback={t.baseHref}
              />
            </div>
          ))}
        </div>

        {/* Dots */}
        <div className="mt-6 flex relative bottom-20 justify-center gap-2">
          {data.map((_, i) => (
            <button
              key={i}
              aria-label={`Go to slide ${i + 1}`}
              onClick={() => scrollToIndex(i)}
              className={cn(
                'h-2 rounded-full transition-all',
                i === active
                  ? 'w-6 bg-sky-500 shadow-[0_0_18px_rgba(56,189,248,.65)]'
                  : 'w-2 bg-sky-300/60 dark:bg-sky-300/40'
              )}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
