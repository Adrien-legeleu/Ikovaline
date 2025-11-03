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
  cubicBezier,
} from 'framer-motion';
import { useTheme } from 'next-themes';

/* --- Auth helper --- */
function useSessionRole() {
  const [logged, setLogged] = useState(false);
  const [role, setRole] = useState<'admin' | 'dev' | 'user' | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    async function load() {
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
        setRole((data?.role as 'admin' | 'dev' | 'user') ?? 'user');
      }
      setLoading(false);
    }
    load();
    const { data: sub } = supabase.auth.onAuthStateChange((_e, s) => {
      const u = s?.user ?? null;
      setLogged(!!u);
      setRole(null);
    });
    return () => {
      mounted = false;
      sub.subscription.unsubscribe();
    };
  }, []);

  const spaceHref = useMemo(() => {
    if (!logged) return '/signin';
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
/* ✨ Header premium ultra fluide + transparence totale   */
/* ====================================================== */
export function Header({ className }: { className?: string }) {
  const [active, setActive] = useState<string | null>(null);
  const { logged, spaceHref, loading } = useSessionRole();
  const pathname = usePathname();
  const number = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER?.trim();

  // lien whatsapp
  const href = useMemo(() => {
    const text =
      'Bonjour, je souhaite échanger avec vous, par messages ou par téléphone. Quand vous convient-il ?';
    return number
      ? `https://wa.me/${number}?text=${encodeURIComponent(text)}`
      : '#';
  }, [number, pathname]);

  /* ===== Scroll / motion values ===== */
  const { scrollY } = useScroll();
  const vel = useVelocity(scrollY);

  // on lit scrollY -> on pilote un state bool pour savoir si on est tout en haut
  const [isTop, setIsTop] = useState(true);
  useEffect(() => {
    // subscribe à scrollY pour maj isTop sans re-render sale
    const unsub = scrollY.on('change', (v) => {
      // seuil ultra faible genre 2px pour éviter le flicker
      setIsTop(v < 2);
    });
    return () => unsub();
  }, [scrollY]);

  // easing / springs
  const smoothEase = cubicBezier(0.25, 1, 0.5, 1);
  const springCfg = { stiffness: 420, damping: 30, mass: 0.5 };

  // t = progression du scroll (0 -> top)
  const t = useTransform(scrollY, [0, 160], [0, 1]);

  // rebond vertical façon Dynamic Island
  const yTarget = useTransform(vel, (v) =>
    Math.max(Math.min(-v / 110, 16), -32)
  );

  const y = useSpring(yTarget, springCfg);

  // intensité absolue
  const velAbs = useTransform(vel, (v) => Math.min(Math.abs(v), 1600));

  // squash / stretch global
  const baseScale = useTransform(y, [-48, 0, 28], [0.94, 1.0, 1.03]);
  const bumpPx = useTransform(velAbs, [0, 200, 800, 1600], [0, 4, 12, 16]);

  // hover dilation
  const [hover, setHover] = useState(false);
  const hoverSpring = useSpring(hover ? 1 : 0, {
    stiffness: 140,
    damping: 20,
    mass: 0.4,
  });
  const hoverBump = useTransform(hoverSpring, (p) => 12 * p);
  const hoverScale = useTransform(hoverSpring, (p) => 1 + 0.0 * p);

  // hauteur dynamique
  const navHeight = useTransform(
    [t, bumpPx, hoverBump],
    ([tv, b, hb]) =>
      `${68 - 10 * (tv as number) + (b as number) + (hb as number)}px`
  );

  // rayon dynamique
  const navRadius = useTransform([t, velAbs, hoverSpring], ([tv, va, hp]) => {
    const base = 48 - 10 * (tv as number);
    const punch = Math.min(8, (va as number) / 240);
    const hoverPlus = 3 * (hp as number);
    return `${Math.max(20, base - punch + hoverPlus)}px`;
  });

  // scale combiné
  const scale = useTransform(
    [baseScale, hoverScale],
    ([a, b]) => (a as number) * (b as number)
  );

  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === 'dark';

  // background, blur, border, shadow -> transparents si isTop
  const bgColor = useTransform(t, (v) =>
    isTop
      ? 'transparent'
      : isDark
        ? `rgba(10,10,10,${0.6 + 0.4 * v})`
        : `rgba(255,255,255,${0.6 + 0.4 * v})`
  );

  const blurFx = useTransform(t, (v) =>
    isTop ? 'none' : `blur(${18 * v}px) saturate(${1 + 0.3 * v})`
  );

  const borderColor = useTransform(t, (v) =>
    isTop
      ? 'transparent'
      : isDark
        ? 'rgba(255,255,255,0.08)'
        : 'rgba(0,0,0,0.04)'
  );

  const shadow = useTransform(t, (v) =>
    isTop
      ? 'none'
      : `0 8px 22px rgba(0,0,0,${0.1 * v}),
         0 24px 48px rgba(0,0,0,${0.08 * v}),
         inset 0 1px 0 rgba(255,255,255,${0.2 * v})`
  );

  return (
    <>
      {/* Mobile version reste comme avant */}
      <HeaderResponsive />

      {/* Desktop */}
      <div
        className={cn(
          'fixed inset-x-0 top-0 z-[10000] hidden lg:block',
          className
        )}
      >
        <div className="mx-auto mt-2 max-w-7xl px-4">
          <motion.nav
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            transition={{ ease: smoothEase, duration: 0.65 }}
            className="relative flex items-center justify-between text-neutral-900 dark:text-neutral-100"
            style={{
              y,
              scale,
              height: navHeight as any,
              borderRadius: navRadius as any,
              backgroundColor: bgColor as any,
              backdropFilter: blurFx as any,
              WebkitBackdropFilter: blurFx as any,
              boxShadow: shadow as any,
              borderColor: borderColor as any,
              borderWidth: 1,
              transition: 'all 0.6s cubic-bezier(0.25,1,0.5,1)',
            }}
            whileTap={{ scale: 0.9 }}
          >
            {/* 👉 reflets / halos = seulement SI pas tout en haut */}
            {!isTop && (
              <motion.div
                aria-hidden
                className="pointer-events-none absolute inset-0 z-0 overflow-hidden rounded-[inherit]"
              >
                <div className="absolute inset-x-0 top-0 h-1/2 rounded-t-[inherit] bg-gradient-to-b from-white/20 via-transparent to-transparent dark:from-white/10" />
                <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/5 to-transparent" />
              </motion.div>
            )}

            {/* contenu nav */}
            <div className="relative z-[1] flex w-full items-center justify-between px-6">
              {/* Logo */}
              <Link href="/" className="flex items-center gap-2">
                <Image
                  src={IkovalineLogo}
                  alt="Ikovaline"
                  width={120}
                  height={36}
                  className="h-8 dark:hidden"
                />
                <Image
                  src={IkovalineLogoDark}
                  alt="Ikovaline"
                  width={120}
                  height={36}
                  className="hidden h-8 dark:block"
                />
              </Link>

              {/* Menu centre */}
              <div className="flex min-w-0 flex-1 items-center justify-center">
                <Menu setActive={setActive} upToZero>
                  <MenuItem
                    setActive={setActive}
                    active={active}
                    item="Accueil"
                    link="/"
                  ></MenuItem>

                  <MenuItem
                    setActive={setActive}
                    active={active}
                    item="Nos Services"
                    link="/nos-services"
                  >
                    <div className="flex flex-col space-y-3 text-sm">
                      <HoveredLink href="/nos-services/#saas-apps">
                        <IconApps stroke={2} />
                        Applications Web & Mobile
                      </HoveredLink>
                      <HoveredLink href="/nos-services/#automatisation-ia">
                        <IconInputAi stroke={2} />
                        Automatisation & IA
                      </HoveredLink>
                      <HoveredLink href="/nos-services/#scaling">
                        <IconAdjustments stroke={2} />
                        Stratégie & Croissance
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
                    item="Blog"
                    link="/blog"
                  />
                  <MenuItem
                    setActive={setActive}
                    active={active}
                    item="A Propos"
                    link="/about"
                  />
                  <MenuItem
                    setActive={setActive}
                    active={active}
                    item="Contact"
                    link="/contact"
                  />
                </Menu>
              </div>

              {/* Actions droite */}
              <div className="flex items-center gap-3">
                <AnimatedThemeToggler />

                {logged ? (
                  <Link
                    href={spaceHref}
                    className={cn(
                      'flex h-9 items-center justify-center rounded-3xl bg-primary px-4 text-xs font-semibold text-white shadow-lg transition',
                      'hover:scale-[1.02] active:scale-[0.97]'
                    )}
                  >
                    {loading ? 'Chargement…' : 'Mon espace'}
                  </Link>
                ) : (
                  <Link
                    href="/signin"
                    className="flex h-9 items-center justify-center rounded-3xl bg-primary px-4 text-xs font-semibold text-white shadow-lg hover:scale-[1.02] active:scale-[0.97]"
                  >
                    Se connecter
                  </Link>
                )}

                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-9 items-center gap-1 rounded-3xl bg-[#25D366] px-2 text-white shadow-lg transition hover:scale-[1.03] active:scale-[0.97]"
                >
                  <IconBrandWhatsapp className="h-5 w-5" />
                </a>
              </div>
            </div>
          </motion.nav>
        </div>
      </div>
    </>
  );
}
