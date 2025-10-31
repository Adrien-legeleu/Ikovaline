'use client';

import * as React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  IconApps,
  IconHelpHexagon,
  IconHistory,
  IconShieldCheck,
  IconThumbUp,
  IconUser,
  IconMessage,
  IconInputAi,
  IconAdjustments,
  IconUsersGroup,
  IconBrandWhatsapp,
} from '@tabler/icons-react';

import { cn } from '@/lib/utils';
import { Menu, MenuItem, HoveredLink } from '../ui/navbar-menu';
import { HeaderResponsive } from './HeaderResponsive';
import IkovalineLogo from '@/public/images/logo/ikovaline-logo-full-light.svg';
import IkovalineLogoDark from '@/public/images/logo/ikovaline-logo-full-dark.svg';
import { AnimatedThemeToggler } from '../magicui/animated-theme-toggler';
import { usePathname } from 'next/navigation';
import { supabase } from '@/lib/SupabaseClient';
import { useEffect, useState, useMemo } from 'react';
import {
  motion,
  useScroll,
  useTransform,
  useVelocity,
  useSpring,
} from 'framer-motion';

/* ====================================================== */
/* 🔒 Hook: état auth + rôle sécurisé                     */
/* ====================================================== */
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

  return { logged, role, loading, spaceHref };
}

/* ====================================================== */
/* ✨ Header principal avec vrai effet scroll premium     */
/* ====================================================== */
export function Header({ className }: { className?: string }) {
  const [active, setActive] = useState<string | null>(null);
  const { logged, spaceHref, loading } = useSessionRole();
  const pathname = usePathname();

  // on check si le thème courant est dark pour adapter le verre (sinon t'avais blanc en dark etc)
  useEffect(() => {
    // check media query au mount, et écoute les changements
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    const update = () => setIsDark(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  const number = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER?.trim();

  const href = React.useMemo(() => {
    const origin = typeof window !== 'undefined' ? window.location.origin : '';
    const page = origin && pathname ? `${origin}${pathname}` : '';
    const text = page
      ? `Bonjour, je souhaite échanger avec vous, par messages ou par téléphone. Quand vous convient-il ?`
      : 'Bonjour, je souhaite échanger avec vous, par messages ou par téléphone. Quand vous convient-il ?';

    // wa.me attend un numéro sans + et le paramètre text encodé
    const encoded = encodeURIComponent(text);
    return `https://wa.me/${number}?text=${encoded}`;
  }, [number, pathname]);

  if (!href) return null;

  // === Effets scroll ===
  const { scrollY } = useScroll();

  // t = 0 (haut) -> 1 (~160px)
  const t = useTransform(scrollY, [0, 160], [0, 1]);

  // Détecte le thème courant (pour le verre clair/sombre)
  const [isDark, setIsDark] = React.useState(false);
  React.useEffect(() => {
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    const update = () => setIsDark(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  // ----- MAGNETIC: déplacement selon vélocité du scroll -----
  const vel = useVelocity(scrollY);

  // map la vélocité (px/s) -> translation Y (px).
  // Descente rapide (vel>0) => y négatif (vers le haut) jusqu’à ~ -28px.
  // Remontée (vel<0) => y positif (vers le bas) max ~ +14px.
  const yTarget = useTransform(vel, (v) => {
    const mapped = -v / 100;
    const clamped = Math.max(Math.min(mapped, 14), -28);
    return clamped;
  });

  // spring pour l'inertie (magnétique)
  const y = useSpring(yTarget, { stiffness: 520, damping: 42, mass: 0.25 });

  // léger parallax (respire quand y bouge)
  const scale = useTransform(y, [-28, 0, 14], [0.985, 1.0, 1.008]);

  // ----- GLASS qui rampe avec la distance scroll (t) -----
  const bgColor = useTransform(t, (v) => {
    const alpha = 0.8 * v;
    return isDark ? `rgba(0,0,0,${alpha})` : `rgba(255,255,255,${alpha})`;
  });

  const borderColor = useTransform(t, (v) =>
    isDark ? `rgba(160,160,160,${0.35 * v})` : `rgba(255,255,255,${0.45 * v})`
  );

  // verre plus fin (moins saturé, un poil de contraste) + blur progressif
  const blurFx = useTransform(
    t,
    (v) =>
      `saturate(${1 + 0.12 * v}) contrast(${1 + 0.02 * v}) blur(${12 * v}px)`
  );

  // ombre multicouches douce + fin liseré interne (donne l’épaisseur)
  const shadow = useTransform(
    t,
    (v) =>
      `0 2px 6px rgba(0,0,0,${0.04 * v}),
     0 12px 24px rgba(0,0,0,${0.06 * v}),
     0 24px 48px rgba(0,0,0,${0.04 * v}),
     inset 0 0.5px 0 rgba(255,255,255,${0.55 * v})`
  );

  return (
    <>
      {/* Mobile header */}
      <HeaderResponsive />

      {/* Desktop navbar */}
      <div
        className={cn(
          'fixed inset-x-0 top-0 z-[10000] hidden lg:block',
          className
        )}
      >
        <div className="mx-auto mt-2 max-w-7xl px-4">
          <motion.nav
            className={cn(
              'flex items-center justify-between rounded-[3rem] ',
              'transition-[color,background,box-shadow] duration-150',
              'text-neutral-900 dark:text-neutral-100',
              'will-change-transform'
            )}
            style={{
              y, // ← magnétique
              scale, // ← parallax subtil
              backgroundColor: bgColor as any,
              backdropFilter: blurFx as any,
              WebkitBackdropFilter: blurFx as any,

              boxShadow: shadow as any,
              borderColor: borderColor as any,
              borderWidth: 1,
            }}
          >
            {/* overlays glass (subtils) */}
            <motion.div
              aria-hidden
              className="pointer-events-none absolute inset-0 rounded-[3rem] z-0 overflow-hidden"
              style={{ opacity: t as any }}
            >
              {/* reflet doux en haut */}
              <div
                className="absolute inset-x-0 top-0 h-1/2 rounded-t-[inherit]"
                style={{
                  background:
                    'linear-gradient(to bottom, rgba(255,255,255,0.35), rgba(255,255,255,0.10), rgba(255,255,255,0))',
                }}
              />
              {/* vignette très légère en bas (assise/volume) */}
              <div
                className="absolute inset-x-0 -bottom-1 h-16 rounded-b-[0rem]"
                style={{
                  background:
                    'linear-gradient(to top, rgba(0,0,0,0.04), rgba(0,0,0,0))',
                }}
              />
            </motion.div>
            <div className="relative z-[1] px-4 h-16 w-full flex items-center justify-between">
              <Link
                href="/"
                aria-label="Accueil"
                className="flex items-center gap-2"
              >
                {/* en light */}
                <Image
                  src={IkovalineLogo}
                  alt="Ikovaline"
                  width={120}
                  height={36}
                  className="h-8 w-auto object-contain dark:hidden"
                  priority
                />
                {/* en dark */}
                <Image
                  src={IkovalineLogoDark}
                  alt="Ikovaline"
                  width={120}
                  height={36}
                  className="hidden h-8 w-auto object-contain dark:block"
                />
              </Link>

              {/* Navigation centre */}
              <div className="flex min-w-0 flex-1 items-center justify-center">
                <Menu setActive={setActive} upToZero>
                  <MenuItem
                    setActive={setActive}
                    active={active}
                    item="Accueil"
                    link="/"
                  >
                    <div className="flex flex-col space-y-3 text-sm">
                      <HoveredLink href="/#about">
                        <IconUser stroke={2} />À Propos
                      </HoveredLink>
                      <HoveredLink href="/#services">
                        <IconApps stroke={2} />
                        Nos Services
                      </HoveredLink>
                      <HoveredLink href="/#review">
                        <IconMessage stroke={2} />
                        Témoignages
                      </HoveredLink>
                    </div>
                  </MenuItem>

                  <MenuItem
                    setActive={setActive}
                    active={active}
                    item="Nos Services"
                    link="/nos-services"
                  >
                    <div className="flex flex-col space-y-3 text-sm">
                      <HoveredLink href="/nos-services/#saas-apps">
                        <IconApps stroke={2} />
                        Application Web, Mobile & sur-mesure
                      </HoveredLink>
                      <HoveredLink href="/nos-services/#automatisation-ia">
                        <IconInputAi stroke={2} />
                        Automatisation & IA
                      </HoveredLink>
                      <HoveredLink href="/nos-services/#scaling">
                        <IconAdjustments stroke={2} />
                        Stratégies Digitales & sur-mesure
                      </HoveredLink>
                      <HoveredLink href="/nos-services/#pourquoi-nous">
                        <IconThumbUp stroke={2} />
                        Notre différence
                      </HoveredLink>
                      <HoveredLink href="/nos-services/#faq">
                        <IconHelpHexagon stroke={2} />
                        FAQ
                      </HoveredLink>
                    </div>
                  </MenuItem>

                  <MenuItem
                    setActive={setActive}
                    active={active}
                    item="Nos Projets"
                    link="/our-projects"
                  />
                  <MenuItem
                    setActive={setActive}
                    active={active}
                    item="Conseils Digitaux"
                    link="/blog"
                  />

                  <MenuItem
                    setActive={setActive}
                    active={active}
                    item="À Propos"
                    link="/about"
                  >
                    <div className="flex flex-col space-y-3 text-sm">
                      <HoveredLink href="/about/#notre-histoire">
                        <IconHistory stroke={2} />
                        Notre Histoire
                      </HoveredLink>
                      <HoveredLink href="/about/#notre-vision">
                        <IconUsersGroup stroke={2} />
                        Notre Équipe
                      </HoveredLink>
                      <HoveredLink href="/about/#notre-garantie">
                        <IconShieldCheck stroke={2} />
                        Notre Garantie
                      </HoveredLink>
                    </div>
                  </MenuItem>

                  <MenuItem
                    setActive={setActive}
                    active={active}
                    item="Contact"
                    link="/contact"
                  />
                </Menu>
              </div>

              {/* Actions à droite */}
              <div className="flex items-center justify-center gap-3">
                <AnimatedThemeToggler />

                {logged ? (
                  <Link
                    href={spaceHref}
                    aria-disabled={loading}
                    className={cn(
                      'rounded-3xl bg-primary shadow-lg !px-4 !py-2 text-xs font-semibold text-white transition',
                      loading
                        ? 'opacity-50 pointer-events-none cursor-default'
                        : 'hover:opacity-95 active:scale-[0.98]'
                    )}
                  >
                    {loading ? 'Chargement…' : 'Accéder à mon espace'}
                  </Link>
                ) : (
                  <div className="flex items-center gap-2">
                    <Link
                      href="/signin"
                      className="rounded-3xl bg-primary shadow-lg !px-4 items-center justify-center flex h-9 text-xs font-semibold text-white hover:opacity-95 active:scale-[0.98]"
                    >
                      Se connecter
                    </Link>
                  </div>
                )}

                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Nous contacter sur WhatsApp"
                  className={cn(
                    'inline-flex items-center gap-1 rounded-3xl px-2 shadow-lg h-9 transition will-change-transform active:scale-[0.98]',
                    'bg-[#25D366] text-white hover:opacity-90',
                    'focus:outline-none focus:ring-2 focus:ring-white/70'
                  )}
                >
                  <IconBrandWhatsapp className="lg:h-4 xl:h-5" />
                </a>
              </div>
            </div>
          </motion.nav>
        </div>

        {/* Logo */}
      </div>
    </>
  );
}
