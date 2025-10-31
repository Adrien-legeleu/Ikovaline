'use client';

import * as React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { AnimatePresence, motion as m } from 'motion/react';
import {
  IconMenu3,
  IconX,
  IconChevronDown,
  IconCpu,
  IconChartLine,
  IconDeviceLaptop,
  IconEye,
  IconHelpHexagon,
  IconHistory,
  IconThumbUp,
} from '@tabler/icons-react';

import IkovalineLogo from '@/public/images/logo/ikovaline-logo-full-light.svg';
import IkovalineLogoDark from '@/public/images/logo/ikovaline-logo-full-dark.svg';
import { AnimatedThemeToggler } from '../magicui/animated-theme-toggler';
import WhatsAppButton from '../WhatsappButton';
import { supabase } from '@/lib/SupabaseClient';
import { useEffect, useState, useMemo } from 'react';
import { cn } from '@/lib/utils';

/* 🔒 même hook que dans Header (copie locale ici) */
function useSessionRole() {
  const [logged, setLogged] = useState(false);
  const [role, setRole] = useState<'admin' | 'dev' | 'user' | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    async function load() {
      setLoading(true);
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!mounted) return;
      setLogged(!!user);

      if (user) {
        const { data } = await supabase
          .from('profiles')
          .select('role')
          .eq('id', user.id)
          .maybeSingle();

        if (!mounted) return;
        setRole((data?.role as 'admin' | 'dev' | 'user') ?? 'user');
        setLoading(false);
      } else {
        setRole(null);
        setLoading(false);
      }
    }

    load();

    const { data: sub } = supabase.auth.onAuthStateChange(
      async (_e, session) => {
        const u = session?.user ?? null;
        setLogged(!!u);

        if (u) {
          setLoading(true);
          const { data } = await supabase
            .from('profiles')
            .select('role')
            .eq('id', u.id)
            .maybeSingle();

          setRole((data?.role as 'admin' | 'dev' | 'user') ?? 'user');
          setLoading(false);
        } else {
          setRole(null);
          setLoading(false);
        }
      }
    );

    return () => {
      mounted = false;
      sub.subscription.unsubscribe();
    };
  }, []);

  const spaceHref = useMemo(() => {
    if (!logged) return '/signin';
    if (loading) return '/dashboard';
    switch (role) {
      case 'admin':
        return '/admin/dashboard';
      case 'dev':
        return '/dev/projects';
      default:
        return '/dashboard';
    }
  }, [logged, role, loading]);

  return { logged, loading, spaceHref };
}

/* ================= MOBILE NAV DATA ================== */
type SubLink = { label: string; href: string; icon?: React.ReactNode };
type Section = { title: string; href: string; links?: SubLink[] };

const SECTIONS: Section[] = [
  { title: 'Accueil', href: '/' },
  {
    title: 'Nos Services',
    href: '/nos-services',
    links: [
      {
        label: 'Applications Web, Mobiles & SaaS',
        href: '/nos-services#saas-apps',
        icon: <IconDeviceLaptop stroke={2} className="shrink-0" />,
      },
      {
        label: 'Automatisation & IA',
        href: '/nos-services#automatisation-ia',
        icon: <IconCpu stroke={2} className="shrink-0" />,
      },
      {
        label: 'Stratégies Digitales & Croissance',
        href: '/nos-services#scaling',
        icon: <IconChartLine stroke={2} className="shrink-0" />,
      },
      {
        label: 'Ce qui fait notre différence',
        href: '/nos-services#pourquoi-nous',
        icon: <IconThumbUp stroke={2} className="shrink-0" />,
      },
      {
        label: 'Foire aux questions',
        href: '/nos-services#faq',
        icon: <IconHelpHexagon stroke={2} className="shrink-0" />,
      },
    ],
  },
  { title: 'Nos Projets', href: '/our-projects' },
  { title: 'Conseils Digitaux', href: '/blog' },
  {
    title: 'À Propos',
    href: '/about',
    links: [
      {
        label: 'Notre Histoire',
        href: '/about#notre-histoire',
        icon: <IconHistory stroke={2} className="shrink-0" />,
      },
      {
        label: 'Notre Vision',
        href: '/about#notre-vision',
        icon: <IconEye stroke={2} className="shrink-0" />,
      },
      {
        label: 'Notre Garantie',
        href: '/about#notre-garantie',
        icon: <IconHelpHexagon stroke={2} className="shrink-0" />,
      },
    ],
  },
  { title: 'Contact', href: '/contact' },
];

/* ================= COMPONENT ================== */
export function HeaderResponsive() {
  const [open, setOpen] = React.useState(false);
  const [expanded, setExpanded] = React.useState<number | null>(null);

  const { logged, loading, spaceHref } = useSessionRole();

  // body scroll lock quand menu ouvert
  React.useEffect(() => {
    document.documentElement.classList.toggle('overflow-hidden', open);
    return () => document.documentElement.classList.remove('overflow-hidden');
  }, [open]);

  // ESC pour fermer
  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);
  // ===== Effet mobile "magnétique + parallax" (sans framer hooks) =====
  const barRef = React.useRef<HTMLElement>(null);

  // détecte le thème pour le verre clair/sombre
  const [isDark, setIsDark] = React.useState(false);
  React.useEffect(() => {
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    const update = () => setIsDark(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  React.useEffect(() => {
    const el = barRef.current;
    if (!el) return;

    let raf = 0;
    let lastY = window.scrollY;
    let lastT = performance.now();
    let cur = 0; // position animée actuelle (y)
    let target = 0; // cible aimantée (y)

    const clamp = (v: number, min: number, max: number) =>
      Math.max(min, Math.min(max, v));

    const tick = () => {
      // 🎚️ Inertie plus douce
      const SPRING = 0.14; // (avant 0.18)
      const DAMP = 0.99; // (avant 0.99)

      const next = cur + (target - cur) * SPRING;
      cur = next * DAMP + target * (1 - DAMP);

      // Parallax très léger, recalé sur nouvelle plage [-12 .. +6]
      const ratio = Math.max(0, Math.min(1, (cur + 12) / 18)); // [-12..+6] -> [0..1]
      const scale = 0.992 + ratio * (1.006 - 0.992); // 0.992 -> 1.006

      el.style.transform = `translateY(${cur.toFixed(2)}px) scale(${scale.toFixed(3)})`;

      raf = requestAnimationFrame(tick);
    };

    const onScroll = () => {
      const now = performance.now();
      const y = window.scrollY;
      const dt = Math.max(1, now - lastT);

      const vel = (y - lastY) * (1000 / dt); // px/s

      // 🎛️ Réglages "moins fort"
      const K = 220; // plus grand = moins sensible (avant 100)
      const MAX_UP = -12; // montant max (avant -28)
      const MAX_DOWN = 6; // descendant max (avant +14)

      let mapped = -vel / K; // vel>0 (descente) => y négatif (monte un peu)

      // petite dead-zone pour éviter le frémissement
      if (Math.abs(mapped) < 0.8) mapped = 0;

      // clamp l’amplitude
      mapped = Math.max(Math.min(mapped, MAX_DOWN), MAX_UP);

      // lissage vers la cible (évite les bonds)
      target += (mapped - target) * 0.18;

      lastY = y;
      lastT = now;

      if (!raf) raf = requestAnimationFrame(tick);
    };

    // init + listener
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(raf);
    };
  }, [isDark]);

  return (
    <>
      {/* Header mobile transparent */}
      <header
        ref={barRef}
        className="fixed inset-x-0 top-0 z-[10000] flex items-center justify-between px-4 py-2 lg:hidden will-change-transform"
      >
        {/* logo */}
        <Link href="/" aria-label="Accueil" className="flex items-center gap-2">
          <Image
            src={IkovalineLogo}
            alt="Ikovaline"
            width={80}
            height={36}
            className="h-6 w-auto object-contain dark:hidden"
            priority
          />
          <Image
            src={IkovalineLogoDark}
            alt="Ikovaline"
            width={80}
            height={36}
            className="hidden h-6 w-auto object-contain dark:block"
          />
        </Link>

        <div className="flex items-center gap-3">
          <AnimatedThemeToggler />
          {logged ? (
            <Link
              href={spaceHref}
              aria-disabled={loading}
              className={cn(
                'rounded-2xl bg-primary flex items-center justify-center h-[2.25rem] px-3 py-2 text-[12px] font-semibold text-white shadow-lg transition',
                loading
                  ? 'opacity-50 pointer-events-none cursor-default'
                  : 'active:scale-[0.98]'
              )}
            >
              {loading ? '...' : 'Dashboard'}
            </Link>
          ) : (
            <Link
              href="/signup"
              className={cn(
                'rounded-2xl h-[2.25rem] flex items-center justify-center px-3 py-2 text-[12px] font-semibold bg-primary text-white active:scale-[0.98]'
              )}
            >
              Lancer
            </Link>
          )}

          {/* burger */}
          <button
            onClick={() => setOpen(true)}
            aria-label="Ouvrir le menu"
            className="grid size-9 place-items-center rounded-2xl bg-white/70 p-1 text-neutral-900 shadow-sm ring-1 ring-black/[0.04] backdrop-blur dark:bg-neutral-900/60 dark:text-neutral-100 dark:ring-white/5"
          >
            <IconMenu3 className="h-full w-full" />
          </button>
        </div>
      </header>

      {/* Menu plein écran */}
      <AnimatePresence>
        {open && (
          <m.div
            key="overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[1000000] lg:hidden"
          >
            <div
              aria-hidden
              className="absolute inset-0 bg-white/70 backdrop-blur-2xl dark:bg-black/70"
            />
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 opacity-60"
              style={{
                background:
                  'repeating-linear-gradient(90deg, hsl(var(--primary) / 0.08) 0 1px, transparent 1px calc(12.5%))',
              }}
            />
            <div
              aria-hidden
              className="pointer-events-none absolute -left-24 top-10 h-72 w-72 rounded-full blur-[120px]"
              style={{
                background:
                  'radial-gradient(closest-side, hsl(var(--primary)/0.16), transparent 70%)',
              }}
            />
            <div
              aria-hidden
              className="pointer-events-none absolute right-0 bottom-0 h-96 w-96 translate-x-1/4 rounded-full blur-[160px]"
              style={{
                background:
                  'radial-gradient(closest-side, color-mix(in oklab, hsl(var(--primary)) 75%, #00E5FF) / 0.14, transparent 70%)',
              }}
            />

            <m.aside
              key="panel"
              initial={{ y: 24, opacity: 0, scale: 0.98 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 12, opacity: 0, scale: 0.995 }}
              transition={{ duration: 0.28, ease: 'easeOut' }}
              className="relative z-10 flex h-full w-full flex-col"
            >
              {/* top bar in menu */}
              <div className="flex items-center justify-between px-4 pt-2">
                <Link
                  href="/"
                  aria-label="Accueil"
                  onClick={() => setOpen(false)}
                >
                  <Image
                    src={IkovalineLogo}
                    alt="Ikovaline"
                    width={120}
                    height={36}
                    className="h-8 w-auto object-contain dark:hidden"
                  />
                  <Image
                    src={IkovalineLogoDark}
                    alt="Ikovaline"
                    width={120}
                    height={36}
                    className="hidden h-8 w-auto object-contain dark:block"
                  />
                </Link>

                <button
                  onClick={() => setOpen(false)}
                  aria-label="Fermer le menu"
                  className="grid size-9 place-items-center rounded-2xl bg-white/70 text-neutral-900 shadow-sm ring-1 ring-black/[0.04] backdrop-blur hover:opacity-95 dark:bg-neutral-900/60 dark:text-neutral-100 dark:ring-white/5"
                >
                  <IconX />
                </button>
              </div>

              {/* nav list */}
              <m.nav
                initial="hidden"
                animate="show"
                exit="hidden"
                variants={{
                  hidden: {
                    transition: { staggerChildren: 0.04, staggerDirection: -1 },
                  },
                  show: { transition: { staggerChildren: 0.06 } },
                }}
                className="relative mx-auto mt-6 w-full max-w-3xl grow overflow-y-auto px-5 pb-28"
                style={{ scrollbarWidth: 'none' }}
              >
                {SECTIONS.map((s, idx) => {
                  const hasChildren = !!s.links?.length;
                  const isOpen = expanded === idx;

                  return (
                    <m.div
                      key={s.title}
                      variants={{
                        hidden: { opacity: 0, y: 12, filter: 'blur(4px)' },
                        show: { opacity: 1, y: 0, filter: 'blur(0px)' },
                      }}
                      className="mb-2"
                    >
                      {/* ligne principale */}
                      <div className="group relative flex items-center justify-between rounded-2xl px-4 py-4">
                        <Link
                          href={s.href}
                          onClick={() => setOpen(false)}
                          className="text-xl font-semibold tracking-tight text-neutral-900 hover:opacity-80 dark:text-neutral-50"
                        >
                          {s.title}
                        </Link>

                        {hasChildren && (
                          <button
                            type="button"
                            aria-expanded={isOpen}
                            aria-controls={`submenu-${idx}`}
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              setExpanded((p) => (p === idx ? null : idx));
                            }}
                            onPointerDown={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                            }}
                            className="ml-3 grid size-9 place-items-center rounded-xl text-neutral-700 transition group-hover:scale-105 hover:bg-black/10 dark:text-neutral-300 dark:hover:bg-white/10"
                          >
                            <IconChevronDown
                              className={`transition-transform ${isOpen ? 'rotate-180' : ''}`}
                            />
                          </button>
                        )}
                      </div>

                      {/* hairline */}
                      <div className="pointer-events-none mt-2 h-px w-full bg-gradient-to-r from-transparent via-black/5 to-transparent dark:via-white/5" />

                      {/* sous-liens */}
                      <AnimatePresence initial={false}>
                        {hasChildren && isOpen && (
                          <m.ul
                            id={`submenu-${idx}`}
                            initial={{ height: 0, opacity: 0, y: -4 }}
                            animate={{ height: 'auto', opacity: 1, y: 0 }}
                            exit={{ height: 0, opacity: 0, y: -4 }}
                            transition={{ duration: 0.24, ease: 'easeOut' }}
                            className="overflow-hidden px-1"
                          >
                            {s.links!.map((l) => (
                              <li key={l.href}>
                                <Link
                                  href={l.href}
                                  onClick={() => setOpen(false)}
                                  className="mt-1 flex items-center gap-3 rounded-xl px-4 py-3 text-[15px] text-neutral-800 transition hover:bg-black/5 dark:text-neutral-200 dark:hover:bg-white/5"
                                >
                                  <span className="grid size-6 place-items-center">
                                    {l.icon}
                                  </span>
                                  <span className="truncate">{l.label}</span>
                                </Link>
                              </li>
                            ))}
                          </m.ul>
                        )}
                      </AnimatePresence>
                    </m.div>
                  );
                })}
              </m.nav>

              {/* gradient bottom overlay */}
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black/5 to-transparent dark:from-white/5" />

              {/* footer actions */}
              <div className="relative z-10 mx-auto mb-6 w-full max-w-3xl space-y-2 px-5">
                {!logged && (
                  <div className="absolute h-12 w-full z-10 top-0 -translate-y-1/2 left-0 bg-[#F5F8FA] blur-md" />
                )}
                <WhatsAppButton
                  className="w-full flex items-center justify-center gap-2 px-5 py-4 text-[15px]"
                  message="Bonjour, je souhaite échanger avec vous, par messages ou par téléphone. Quand vous convient-il ?"
                  label="WhatsApp"
                />

                {logged ? (
                  <Link
                    href={spaceHref}
                    aria-disabled={loading}
                    onClick={() => setOpen(false)}
                    className={cn(
                      'inline-flex w-full items-center justify-center rounded-3xl bg-[hsl(var(--primary))] px-5 py-4 text-[15px] font-semibold text-white shadow-[0_28px_56px_-22px_hsl(var(--primary)/0.6)] ring-1 ring-white/15 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--primary)/0.45)]',
                      loading
                        ? 'opacity-50 pointer-events-none cursor-default'
                        : 'active:scale-[0.98]'
                    )}
                  >
                    {loading ? 'Chargement…' : 'Accéder à mon espace'}
                  </Link>
                ) : (
                  <>
                    <Link
                      href="/signup"
                      onClick={() => setOpen(false)}
                      className="inline-flex w-full items-center justify-center rounded-3xl bg-neutral-100 px-5 py-4 text-[15px] font-semibold text-black  ring-1 ring-white/15 transition active:scale-[0.98] dark:bg-white dark:text-neutral-900"
                    >
                      Lancer mon projet
                    </Link>

                    <Link
                      href="/signin"
                      onClick={() => setOpen(false)}
                      className="inline-flex w-full items-center justify-center rounded-3xl bg-[hsl(var(--primary))] px-5 py-4 text-[15px] font-semibold text-white shadow-[0_28px_56px_-22px_hsl(var(--primary)/0.6)] ring-1 ring-white/15 transition active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--primary)/0.45)]"
                    >
                      Se connecter
                    </Link>
                  </>
                )}
              </div>
            </m.aside>
          </m.div>
        )}
      </AnimatePresence>
    </>
  );
}
