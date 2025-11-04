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
  IconHelpHexagon,
  IconThumbUp,
} from '@tabler/icons-react';

import IkovalineLogo from '@/public/images/logo/ikovaline-logo-full-light.svg';
import IkovalineLogoDark from '@/public/images/logo/ikovaline-logo-full-dark.svg';
import { AnimatedThemeToggler } from '../magicui/animated-theme-toggler';
import { supabase } from '@/lib/SupabaseClient';
import { cn } from '@/lib/utils';

/* ====================================================== */
/* 🔒 Hook de session robuste                            */
/* ====================================================== */

type Role = 'admin' | 'dev' | 'user';

function computeSpaceHref(logged: boolean | null, role: Role | null): string {
  if (!logged) return '/signin';
  switch (role) {
    case 'admin':
      return '/admin/dashboard';
    case 'dev':
      return '/dev/projects';
    case 'user':
    default:
      return '/dashboard';
  }
}

function useSessionRole() {
  const [logged, setLogged] = React.useState<boolean | null>(null);
  const [role, setRole] = React.useState<Role | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [spaceHref, setSpaceHref] = React.useState('/signin');

  React.useEffect(() => {
    setSpaceHref(computeSpaceHref(logged, role));
  }, [logged, role]);

  React.useEffect(() => {
    let active = true;

    async function syncFromUser(userFromEvent: any | null) {
      try {
        setLoading(true);

        // 1. Récupération user : soit depuis l’événement, soit depuis Supabase
        let user = userFromEvent;
        if (!user) {
          const { data, error } = await supabase.auth.getUser();
          if (error) {
            if (!active) return;
            setLogged(false);
            setRole(null);
            return;
          }
          user = data.user;
        }

        if (!active) return;

        if (!user) {
          // pas connecté
          setLogged(false);
          setRole(null);
          return;
        }

        // 2. User connecté → on récupère le rôle
        setLogged(true);

        const { data: profile, error: profileError } = await supabase
          .from('profiles')
          .select('role')
          .eq('id', user.id)
          .maybeSingle();

        if (!active) return;

        if (profileError) {
          // en cas d’erreur, on considère "user" par défaut
          setRole('user');
        } else {
          const r = (profile?.role as Role) ?? 'user';
          setRole(r);
        }
      } catch (e) {
        if (!active) return;
        // En cas d’erreur réseau / autre → on retombe en mode invité
        setLogged(false);
        setRole(null);
      } finally {
        if (active) setLoading(false);
      }
    }

    // 🔁 Premier chargement
    syncFromUser(null);

    // 🔁 Abonnement aux changements de session (login, logout, refresh)
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        const user = session?.user ?? null;
        syncFromUser(user);
      }
    );

    return () => {
      active = false;
      authListener?.subscription?.unsubscribe();
    };
  }, []);

  return { logged, role, loading, spaceHref };
}

/* ====================================================== */
/* 📚 Données menu                                       */
/* ====================================================== */
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
        icon: <IconDeviceLaptop stroke={2} />,
      },
      {
        label: 'Automatisation & IA',
        href: '/nos-services#automatisation-ia',
        icon: <IconCpu stroke={2} />,
      },
      {
        label: 'Stratégies Digitales & Croissance',
        href: '/nos-services#scaling',
        icon: <IconChartLine stroke={2} />,
      },
      {
        label: 'Notre Différence',
        href: '/nos-services#pourquoi-nous',
        icon: <IconThumbUp stroke={2} />,
      },
      {
        label: 'FAQ',
        href: '/nos-services#faq',
        icon: <IconHelpHexagon stroke={2} />,
      },
    ],
  },
  { title: 'Nos Projets', href: '/our-projects' },
  { title: 'Conseils Digitaux', href: '/blog' },
  {
    title: 'À Propos',
    href: '/about',
  },
  { title: 'Contact', href: '/contact' },
];

/* ====================================================== */
/* 💫 HeaderResponsive (mobile)                          */
/* ====================================================== */
export function HeaderResponsive() {
  const [open, setOpen] = React.useState(false);
  const [expanded, setExpanded] = React.useState<number | null>(null);

  const { logged, loading, spaceHref } = useSessionRole();

  // lock scroll body quand menu est ouvert
  React.useEffect(() => {
    document.documentElement.classList.toggle('overflow-hidden', open);
    return () => {
      document.documentElement.classList.remove('overflow-hidden');
    };
  }, [open]);

  // ESC pour fermer le menu
  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  /* ====================================================== */
  /* 🍏 Effet Dynamic Island fluide                        */
  /* ====================================================== */

  const barRef = React.useRef<HTMLElement>(null);
  const innerRef = React.useRef<HTMLDivElement>(null);
  const leftRef = React.useRef<HTMLAnchorElement>(null);
  const rightRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const barEl = barRef.current;
    const innerEl = innerRef.current;
    const leftEl = leftRef.current;
    const rightEl = rightRef.current;
    if (!barEl || !innerEl || !leftEl || !rightEl) return;

    let curOuterY = 0;
    let curOuterScale = 1;
    let curInnerY = 0;
    let curInnerScaleX = 1;
    let curInnerScaleY = 1;

    let targetOuterY = 0;
    let targetOuterScale = 1;
    let targetInnerY = 0;
    let targetInnerScaleX = 1;
    let targetInnerScaleY = 1;

    let lastScrollY = window.scrollY;
    let raf = 0;

    const lerp = (from: number, to: number, f: number) =>
      from + (to - from) * f;

    const animate = () => {
      // un peu plus de réactivité
      curOuterY = lerp(curOuterY, targetOuterY, 0.22);
      curOuterScale = lerp(curOuterScale, targetOuterScale, 0.22);

      curInnerY = lerp(curInnerY, targetInnerY, 0.26);
      curInnerScaleX = lerp(curInnerScaleX, targetInnerScaleX, 0.26);
      curInnerScaleY = lerp(curInnerScaleY, targetInnerScaleY, 0.26);

      barEl.style.transform = `translateY(${curOuterY.toFixed(
        2
      )}px) scale(${curOuterScale.toFixed(3)})`;

      innerEl.style.transform = `translateY(${curInnerY.toFixed(
        2
      )}px) scale(${curInnerScaleX.toFixed(3)}, ${curInnerScaleY.toFixed(3)})`;
      innerEl.style.transformOrigin = 'center center';

      // enfants un chouïa plus exagérés
      const childScaleX = curInnerScaleX * 1.02;
      const childScaleY = curInnerScaleY * 0.97;
      const childY = curInnerY * 0.7;

      leftEl.style.transform = `translateY(${childY.toFixed(
        2
      )}px) scale(${childScaleX.toFixed(3)}, ${childScaleY.toFixed(3)})`;
      leftEl.style.transformOrigin = 'left center';

      rightEl.style.transform = `translateY(${childY.toFixed(
        2
      )}px) scale(${childScaleX.toFixed(3)}, ${childScaleY.toFixed(3)})`;
      rightEl.style.transformOrigin = 'right center';

      raf = requestAnimationFrame(animate);
    };

    const onScroll = () => {
      const yNow = window.scrollY;
      const dy = yNow - lastScrollY;
      lastScrollY = yNow;

      // 🔥 effet x2 : on divise moins, et on clamp plus large
      const raw = -dy / 4; // (avant: /8)
      const clamped = Math.max(Math.min(raw, 18), -22);

      // header qui “flotte” plus
      targetOuterY = clamped;
      targetOuterScale = 1 + clamped / 450; // (avant ~900)

      // inner qui bouge en sens inverse un peu plus fort
      const opposite = -clamped * 0.55;
      targetInnerY = opposite;

      // pincement / étirement x2
      const intensity = Math.min(Math.abs(clamped) / 12, 1);
      targetInnerScaleX = 1 + 0.05 * intensity; // avant 0.03
      targetInnerScaleY = 1 - 0.05 * intensity; // avant 0.03
    };

    raf = requestAnimationFrame(animate);
    window.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  return (
    <>
      {/* ===== Header mobile flottant ===== */}
      <header
        ref={barRef}
        className="fixed inset-x-0 top-0 z-[10000000000000] will-change-transform lg:hidden"
      >
        <div
          ref={innerRef}
          className="flex items-center justify-between px-4 py-2 will-change-transform"
        >
          <Link
            ref={leftRef}
            href="/"
            aria-label="Accueil"
            className="flex items-center gap-2 will-change-transform"
          >
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
              priority
            />
          </Link>

          <div
            ref={rightRef}
            className="flex items-center gap-3 will-change-transform"
          >
            <AnimatedThemeToggler />

            {/* ✅ CTA sécurisé : pas de mauvais lien pendant le chargement */}
            {logged ? (
              <Link
                href={spaceHref}
                aria-disabled={loading}
                className={cn(
                  'rounded-2xl bg-primary flex items-center justify-center h-[2.25rem] px-3 text-[12px] font-semibold text-white shadow-lg transition will-change-transform active:scale-[0.97]',
                  loading ? 'opacity-50 pointer-events-none' : ''
                )}
              >
                {loading ? '...' : 'Dashboard'}
              </Link>
            ) : loading ? (
              // skeleton pendant qu’on ne sait pas encore si la personne est connectée
              <div className="h-[2.25rem] w-20 rounded-2xl bg-white/40 dark:bg-neutral-800 animate-pulse" />
            ) : (
              <Link
                href="/signup"
                className="rounded-2xl h-[2.25rem] flex items-center justify-center px-3 text-[12px] font-semibold bg-primary text-white will-change-transform active:scale-[0.97]"
              >
                Lancer
              </Link>
            )}

            <button
              onClick={() => setOpen(true)}
              aria-label="Ouvrir le menu"
              className="grid size-9 place-items-center rounded-2xl bg-white/80 p-1 text-neutral-900 shadow-sm ring-1 ring-black/[0.04] backdrop-blur dark:bg-neutral-900/70 dark:text-neutral-100 dark:ring-white/5 active:scale-[0.96] will-change-transform"
            >
              <IconMenu3 className="h-5 w-5" />
            </button>
          </div>
        </div>
      </header>

      {/* ===== Overlay menu fullscreen ===== */}
      <AnimatePresence>
        {open && (
          <m.div
            key="overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{
              duration: 0.28,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="fixed inset-0 z-[1000000000000] lg:hidden"
          >
            <m.div
              aria-hidden
              className="absolute inset-0 backdrop-blur-2xl"
              initial={{
                backgroundColor:
                  typeof window !== 'undefined' &&
                  document.documentElement.classList.contains('dark')
                    ? 'rgba(0,0,0,1)'
                    : 'rgba(255,255,255,1)',
                opacity: 0,
              }}
              animate={{
                backgroundColor:
                  typeof window !== 'undefined' &&
                  document.documentElement.classList.contains('dark')
                    ? 'rgba(0,0,0,0.7)'
                    : 'rgba(255,255,255,0.7)',
                opacity: 1,
              }}
              exit={{ opacity: 0 }}
              transition={{
                backgroundColor: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
                opacity: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
              }}
            />

            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 opacity-50"
              style={{
                background:
                  'repeating-linear-gradient(90deg, hsl(var(--primary) / 0.08) 0 1px, transparent 1px calc(12.5%))',
              }}
            />

            <m.aside
              key="panel"
              initial={{ opacity: 0, y: 18, scale: 0.99 }}
              animate={{
                opacity: 1,
                y: 0,
                scale: [0.99, 1.02, 1],
              }}
              exit={{ opacity: 0, y: 16, scale: 0.97 }}
              transition={{
                duration: 0.38,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="relative z-10 flex h-full w-full flex-col"
            >
              <div className="flex items-center justify-between px-4 pt-3">
                <Link
                  href="/"
                  aria-label="Accueil"
                  onClick={() => setOpen(false)}
                  className="active:scale-[0.97] will-change-transform"
                  style={{ transformOrigin: 'left center' }}
                >
                  <Image
                    src={IkovalineLogo}
                    alt="Ikovaline"
                    width={110}
                    height={32}
                    className="dark:hidden"
                  />
                  <Image
                    src={IkovalineLogoDark}
                    alt="Ikovaline"
                    width={110}
                    height={32}
                    className="hidden dark:block"
                  />
                </Link>

                <button
                  onClick={() => setOpen(false)}
                  aria-label="Fermer le menu"
                  className="grid size-9 place-items-center rounded-2xl bg-white/80 text-neutral-900 shadow-sm ring-1 ring-black/[0.04] backdrop-blur dark:bg-neutral-900/70 dark:text-neutral-100 dark:ring-white/5 active:scale-[0.96] will-change-transform"
                  style={{ transformOrigin: 'right center' }}
                >
                  <IconX className="h-5 w-5" />
                </button>
              </div>

              <m.nav
                initial="hidden"
                animate="show"
                exit="hidden"
                variants={{
                  hidden: {
                    transition: { staggerChildren: 0.04, staggerDirection: -1 },
                  },
                  show: {
                    transition: {
                      staggerChildren: 0.06,
                      ease: [0.16, 1, 0.3, 1],
                    },
                  },
                }}
                className="mx-auto mt-6 w-full max-w-3xl grow overflow-y-auto px-6 pb-24"
                style={{ scrollbarWidth: 'none' }}
              >
                {SECTIONS.map((s, idx) => {
                  const hasChildren = !!s.links?.length;
                  const isOpen = expanded === idx;

                  return (
                    <m.div
                      key={s.title}
                      variants={{
                        hidden: {
                          opacity: 0,
                          y: 14,
                          filter: 'blur(6px)',
                        },
                        show: {
                          opacity: 1,
                          y: 0,
                          filter: 'blur(0px)',
                          transition: {
                            duration: 0.28,
                            ease: [0.16, 1, 0.3, 1],
                          },
                        },
                      }}
                      className="mb-3"
                    >
                      <div className="group flex items-center justify-between rounded-2xl px-4 py-4">
                        <Link
                          href={s.href}
                          onClick={() => setOpen(false)}
                          className="text-lg font-semibold text-neutral-900 dark:text-neutral-50 active:scale-[0.98] will-change-transform"
                          style={{ transformOrigin: 'left center' }}
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
                            className="ml-3 grid size-9 place-items-center rounded-xl text-neutral-700 transition hover:bg-black/10 active:scale-[0.96] dark:text-neutral-300 dark:hover:bg-white/10 will-change-transform"
                            style={{ transformOrigin: 'right center' }}
                          >
                            <IconChevronDown
                              className={`transition-transform ${isOpen ? 'rotate-180' : ''}`}
                            />
                          </button>
                        )}
                      </div>

                      <AnimatePresence initial={false}>
                        {hasChildren && isOpen && (
                          <m.ul
                            id={`submenu-${idx}`}
                            initial={{ height: 0, opacity: 0, y: -4 }}
                            animate={{ height: 'auto', opacity: 1, y: 0 }}
                            exit={{ height: 0, opacity: 0, y: -4 }}
                            transition={{
                              duration: 0.28,
                              ease: [0.16, 1, 0.3, 1],
                            }}
                            className="overflow-hidden px-2"
                          >
                            {s.links!.map((l) => (
                              <li key={l.href}>
                                <Link
                                  href={l.href}
                                  onClick={() => setOpen(false)}
                                  className="mt-1 flex items-center gap-3 rounded-xl px-4 py-3 text-[15px] text-neutral-800 hover:bg-black/5 active:scale-[0.98] dark:text-neutral-200 dark:hover:bg-white/5 will-change-transform"
                                  style={{ transformOrigin: 'left center' }}
                                >
                                  {l.icon && (
                                    <span className="grid size-6 place-items-center text-neutral-700 dark:text-neutral-300">
                                      {l.icon}
                                    </span>
                                  )}
                                  <span>{l.label}</span>
                                </Link>
                              </li>
                            ))}
                          </m.ul>
                        )}
                      </AnimatePresence>

                      <div className="pointer-events-none mt-3 h-px w-full bg-gradient-to-r from-transparent via-black/5 to-transparent dark:via-white/5" />
                    </m.div>
                  );
                })}
              </m.nav>

              {/* CTA bas sécurisé aussi */}
              <div className="mx-auto mb-6 w-full max-w-3xl space-y-2 px-5">
                {logged ? (
                  <Link
                    href={spaceHref}
                    aria-disabled={loading}
                    onClick={() => setOpen(false)}
                    className={cn(
                      'inline-flex w-full items-center justify-center rounded-3xl bg-[hsl(var(--primary))] px-5 py-4 text-[15px] font-semibold text-white shadow-[0_28px_56px_-22px_hsl(var(--primary)/0.6)] active:scale-[0.98] will-change-transform',
                      loading
                        ? 'opacity-50 pointer-events-none cursor-default'
                        : ''
                    )}
                    style={{ transformOrigin: 'center center' }}
                  >
                    {loading ? 'Chargement…' : 'Accéder à mon espace'}
                  </Link>
                ) : loading ? (
                  <div className="inline-flex w-full items-center justify-center rounded-3xl bg-neutral-100/70 dark:bg-neutral-900/70 px-5 py-4 text-[15px] font-semibold text-neutral-500 dark:text-neutral-400 animate-pulse">
                    Vérification de votre espace…
                  </div>
                ) : (
                  <>
                    <Link
                      href="/signup"
                      onClick={() => setOpen(false)}
                      className="inline-flex w-full items-center justify-center rounded-3xl bg-neutral-100 dark:bg-neutral-900 px-5 py-4 text-[15px] font-semibold text-black active:scale-[0.98] will-change-transform  dark:text-neutral-200"
                      style={{ transformOrigin: 'center center' }}
                    >
                      Lancer mon projet
                    </Link>

                    <Link
                      href="/signin"
                      onClick={() => setOpen(false)}
                      className="inline-flex w-full items-center justify-center rounded-3xl bg-[hsl(var(--primary))] px-5 py-4 text-[15px] font-semibold text-white shadow-[0_28px_56px_-22px_hsl(var(--primary)/0.6)] active:scale-[0.98] will-change-transform"
                      style={{ transformOrigin: 'center center' }}
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
