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

/* ---------- Skin “Satin Primary” : sobre, élégant, accents bleus ---------- */
function PrimaryCardShell({
  className,
  children,
}: React.PropsWithChildren<{ className?: string }>) {
  return (
    <div
      className={cn(
        'relative overflow-hidden rounded-2xl ',
        // surface satinée + ring primary léger
        ' bg-white/90  shadow-[0_10px_30px_rgba(0,0,0,.06)]',
        ' dark:bg-neutral-900/85  dark:shadow-[0_10px_30px_rgba(0,0,0,.45)]',
        className
      )}
    >
      {/* bande header très discrète (dégradé primary) */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-1.5"
        style={{
          background:
            'linear-gradient(90deg, hsl(var(--primary)/.0), hsl(var(--primary)/.35) 18%, hsl(var(--primary)/.5) 50%, hsl(var(--primary)/.35) 82%, hsl(var(--primary)/.0))',
        }}
      />
      {/* reflet doux en haut */}
      <span className="pointer-events-none absolute inset-x-6 top-0 h-10 rounded-b-[32px] bg-white/35 blur-xl dark:bg-white/5" />
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
      className="group block snap-center snap-always"
    >
      <PrimaryCardShell className="transition-transform duration-300 group-hover:scale-[1.01]">
        {/* Media */}
        <div className="relative aspect-[16/9] w-full overflow-hidden rounded-t-2xl">
          <Image
            src={coverImage}
            alt={titre}
            fill
            sizes="(min-width:1280px) 900px, (min-width:1024px) 75vw, 100vw"
            className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
            priority={index === 1}
          />
          {/* fondu bas pour lisibilité + liseré primary fin */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t via-transparent to-transparent dark:from-black/15" />
          <span
            aria-hidden
            className="pointer-events-none absolute inset-x-0 bottom-0 h-px"
            style={{
              background:
                'linear-gradient(90deg, transparent, hsl(var(--primary)/.35), hsl(var(--primary)/.55), hsl(var(--primary)/.35), transparent)',
            }}
          />
        </div>

        {/* Contenu */}
        <div className="p-5 lg:p-6">
          <div className="mb-2 flex items-center gap-2 text-[11px] sm:text-xs text-primary">
            <span className="inline-flex items-center rounded-full border border-primary/20 bg-primary/8 px-2 py-0.5">
              {client}
            </span>
            <span className="opacity-50">•</span>
            <span className="text-neutral-600 dark:text-neutral-300">
              {secteur}
            </span>
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
                className="rounded-full border border-primary/20 bg-primary/10 px-2 py-0.5 text-[11px] font-medium text-primary/90 dark:text-primary"
              >
                {s}
              </span>
            ))}
            {services.length > 3 && (
              <span className="rounded-full border border-primary/20 bg-primary/10 px-2 py-0.5 text-[11px] font-medium text-primary/90 dark:text-primary">
                +{services.length - 3}
              </span>
            )}
          </div>

          <div className="mt-4 flex items-center justify-between">
            <span className="text-sm font-semibold text-primary">
              {resultat}
            </span>
            <span className="inline-flex items-center gap-2 text-sm font-medium text-neutral-800 dark:text-neutral-200">
              <span className="relative">
                <span className="relative z-10">{lien ? 'Demo' : 'Voir'}</span>
                <span className="absolute -bottom-1 left-0 h-[2px] w-0 bg-primary/80 transition-[width] duration-300 group-hover:w-full" />
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
      </PrimaryCardShell>
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
        baseHref: '/en/our-projects',
      }
    : {
        title: 'Nos Projets',
        all: 'Voir tous les projets →',
        baseHref: '/our-projects',
      };

  // 3 projets uniquement
  const dataRaw = isEN ? PROJECTS_EN : PROJECTS_FR;
  const data = dataRaw
    .filter((p) => p.id !== 'sophie-deneriez-2025')
    .slice(0, 3);

  const viewportRef = React.useRef<HTMLDivElement | null>(null);
  const [active, setActive] = React.useState(1); // centre par défaut
  const snapPositionsRef = React.useRef<number[]>([]);
  const snapTimerRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);
  const snappingRef = React.useRef(false);

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

  const scrollToIndex = React.useCallback((idx: number) => {
    const el = viewportRef.current;
    if (!el) return;
    const pos = snapPositionsRef.current[idx] ?? 0;
    snappingRef.current = true;
    el.scrollTo({ left: pos, behavior: 'smooth' });
    window.setTimeout(() => {
      snappingRef.current = false;
    }, 320);
  }, []);

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

  React.useEffect(() => {
    const el = viewportRef.current;
    if (!el) return;

    const onScroll = () => {
      if (!snapPositionsRef.current.length) return;
      const idx = nearestIndex(el.scrollLeft);
      setActive(idx);

      if (snappingRef.current) return;

      if (snapTimerRef.current) clearTimeout(snapTimerRef.current);
      snapTimerRef.current = setTimeout(() => {
        scrollToIndex(nearestIndex(el.scrollLeft));
      }, 90);
    };

    el.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      el.removeEventListener('scroll', onScroll);
      if (snapTimerRef.current) clearTimeout(snapTimerRef.current);
    };
  }, [nearestIndex, scrollToIndex]);

  React.useEffect(() => {
    computeSnapPositions();
    const ro = new ResizeObserver(() => computeSnapPositions());
    if (viewportRef.current) ro.observe(viewportRef.current);
    const t = window.setTimeout(computeSnapPositions, 200);
    return () => {
      ro.disconnect();
      clearTimeout(t);
    };
  }, [computeSnapPositions, data.length]);

  React.useEffect(() => {
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
    <section
      className="relative mx-auto w-full max-w-7xl pt-12"
      aria-label={t.title}
    >
      {/* décor section — motif primaire très léger */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.08] dark:opacity-[0.06]"
        style={{
          background:
            'radial-gradient(70% 50% at 20% 0%, hsl(var(--primary)/.6), transparent 60%), radial-gradient(65% 45% at 85% 10%, hsl(var(--primary)/.45), transparent 62%)',
        }}
      />

      <div className="mb-12 flex items-center justify-between gap-4 max-sm:flex-col max-sm:items-start px-2 lg:px-4">
        <h2 className="pb-1 text-3xl font-bold text-neutral-900 sm:text-4xl dark:text-neutral-100">
          {t.title}
        </h2>
        <Link
          href={t.baseHref}
          className="relative bottom-0.5 text-sm font-medium text-primary hover:opacity-90"
        >
          {t.all}
        </Link>
      </div>

      <div className="relative lg:px-4">
        {/* flèches mobiles */}
        <button
          type="button"
          aria-label="Précédent"
          onClick={prev}
          className={cn(
            'absolute left-0 top-1/2 z-20 hidden -translate-y-1/2 rounded-full border p-2 backdrop-blur-md sm:inline-flex lg:hidden',
            'border-black/5 bg-white/80 text-neutral-800 shadow-[0_8px_24px_rgba(0,0,0,.12)]',
            'dark:border-white/10 dark:bg-neutral-900/70 dark:text-neutral-100 dark:shadow-[0_8px_24px_rgba(0,0,0,.5)]',
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
          aria-label="Suivant"
          onClick={next}
          className={cn(
            'absolute right-0 top-1/2 z-20 hidden -translate-y-1/2 rounded-full border p-2 backdrop-blur-md sm:inline-flex lg:hidden',
            'border-black/5 bg-white/80 text-neutral-800 shadow-[0_8px_24px_rgba(0,0,0,.12)]',
            'dark:border-white/10 dark:bg-neutral-900/70 dark:text-neutral-100 dark:shadow-[0_8px_24px_rgba(0,0,0,.5)]',
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
            'relative mx-auto flex w-full max-w-[1400px] items-center gap-6 px-6 py-16 sm:px-8 lg:justify-center lg:px-0',
            'snap-x snap-mandatory scroll-smooth overscroll-x-contain',
            'max-lg:overflow-x-auto',
            '[scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden'
          )}
        >
          {data.map((p, i) => (
            <div
              key={p.id}
              data-snap-item
              className={cn(
                'shrink-0 basis-[86%] sm:basis-[62%] md:basis-[54%] lg:basis-[34%] xl:basis-[36%]',
                i === active ? 'scale-[1.04]' : 'scale-[.99]',
                'transition-transform duration-300'
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
        <div className="relative -top-4 flex justify-center gap-2 lg:hidden">
          {data.map((_, i) => (
            <button
              key={i}
              aria-label={`Aller à la slide ${i + 1}`}
              onClick={() => scrollToIndex(i)}
              className={cn(
                'h-2 rounded-full transition-all',
                i === active
                  ? 'w-6 bg-primary shadow-[0_0_14px_hsl(var(--primary)/.55)]'
                  : 'w-2 bg-primary/30 dark:bg-primary/25'
              )}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
