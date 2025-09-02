'use client';

import * as React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  IconApps,
  IconChartLine,
  IconDeviceLaptop,
  IconEye,
  IconHelpHexagon,
  IconHistory,
  IconShieldCheck,
  IconThumbUp,
  IconUser,
  IconMessage,
} from '@tabler/icons-react';

import { cn } from '@/lib/utils';
import { Menu, MenuItem, HoveredLink } from '../ui/navbar-menu';
import { HeaderResponsive } from './HeaderResponsive';
import IkovalineLogo from '@/public/images/logo/ikovaline_logo.png';
import IkovalineLogoDark from '@/public/images/logo/ikovaline_logo_dark.png';
import { AnimatedThemeToggler } from '../magicui/animated-theme-toggler';

export function Header({ className }: { className?: string }) {
  const [active, setActive] = React.useState<string | null>(null);
  const [scrolled, setScrolled] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 0);
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      {/* Mobile burger */}
      <HeaderResponsive />

      {/* Desktop navbar */}
      <div
        className={cn('fixed inset-x-0 top-0 z-[10000] hidden lg:block', className)}
      >
        <div className="mx-auto mt-2 max-w-6xl px-4">
          <nav
            className={cn(
              'flex h-16 items-center justify-between rounded-2xl border px-4',
              'bg-white/60 backdrop-blur-sm text-neutral-900 dark:bg-black dark:text-neutral-100',
              scrolled
                ? 'border-neutral-200 shadow-xl shadow-black/5 dark:border-neutral-800'
                : 'border-transparent'
            )}
          >
            {/* Logo */}
            <Link
              href="/"
              aria-label="Accueil"
              className="flex items-center gap-2"
            >
              <Image
                src={IkovalineLogo}
                alt="Ikovaline"
                width={150}
                height={40}
                className="h-10 w-auto object-contain dark:hidden"
                priority
              />
              <Image
                src={IkovalineLogoDark}
                alt="Ikovaline"
                width={150}
                height={40}
                className="hidden h-10 w-auto object-contain dark:block"
                priority
              />
            </Link>

            {/* Navigation */}
            <div className="flex min-w-0 flex-1 items-center justify-center">
              <Menu setActive={setActive} upToZero={scrolled}>
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
                    <HoveredLink href="/nos-services/#buisness-developpement">
                      <IconChartLine stroke={2} />
                      Accélérez votre croissance
                    </HoveredLink>
                    <HoveredLink href="/nos-services/#developpement-digital">
                      <IconDeviceLaptop stroke={2} />
                      Modernisez votre présence
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
                  item="À Propos"
                  link="/about"
                >
                  <div className="flex flex-col space-y-3 text-sm">
                    <HoveredLink href="/about/#notre-histoire">
                      <IconHistory stroke={2} />
                      Notre Histoire
                    </HoveredLink>
                    <HoveredLink href="/about/#notre-vision">
                      <IconEye stroke={2} />
                      Notre Vision
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
                  item="Conseils Digitaux"
                  link="/blog"
                />
                <MenuItem
                  setActive={setActive}
                  active={active}
                  item="Nos Projets"
                  link="/projects"
                />
              </Menu>
            </div>

            {/* Actions à droite (exigées) */}
            <div className="flex items-center justify-center gap-4">
              <AnimatedThemeToggler />
              <Link
                href="/contact"
                className="rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white hover:opacity-95"
              >
                Contactez-nous
              </Link>
            </div>
          </nav>
        </div>
      </div>
    </>
  );
}
