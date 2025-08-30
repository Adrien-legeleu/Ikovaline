'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  IconApps,
  IconChartLine,
  IconDeviceLaptop,
  IconEye,
  IconHelpHexagon,
  IconHistory,
  IconMessage,
  IconShieldCheck,
  IconThumbUp,
  IconUser,
} from '@tabler/icons-react';

import { cn } from '@/lib/utils';
import { Menu, MenuItem, HoveredLink } from '../ui/navbar-menu';
import { HeaderResponsive } from './HeaderResponsive';
import { ModeToggle } from '../toggle-darkmode';
import { LiquidLink } from '../ui/liquid-link';
import LangSwitch from '../LangSwitch';

import IkovalineLogo from '@/public/images/logo/ikovaline_logo.png';
import IkovalineLogoDark from '@/public/images/logo/ikovaline_logo_dark.png';

/* ============ locale helpers ============ */
function useLocale() {
  const pathname = usePathname() || '/';
  const isEN = /^\/en(\/|$)/.test(pathname);
  return { isEN };
}
function localizeHref(href: string, isEN: boolean) {
  if (!isEN) return href;
  if (/^(https?:)?\/\//.test(href)) return href; // externe
  if (/^\/en(\/|$)/.test(href)) return href; // déjà en /en
  if (href === '/') return '/en';
  if (href.startsWith('/#')) return `/en${href}`; // ancre home
  return href.startsWith('/') ? `/en${href}` : `/en/${href}`;
}

/* ============ dictionnaires ============ */
const TEXTS = {
  fr: {
    home: 'Accueil',
    ourServices: 'Nos Services',
    about: 'À Propos',
    blog: 'Conseils Digitaux',
    contact: 'Contactez-nous',

    sub_home_about: 'À Propos',
    sub_home_services: 'Nos Services',
    sub_home_reviews: 'Témoignages',

    s1: 'Accélérez votre croissance',
    s2: 'Modernisez votre présence en ligne',
    s3: 'Ce qui fait notre différence',
    s4: 'Foire aux questions',

    a1: 'Notre Histoire',
    a2: 'Notre Vision',
    a3: 'Notre Garantie',
  },
  en: {
    home: 'Home',
    ourServices: 'Our services',
    about: 'About us',
    blog: 'Digital Consulting',
    contact: 'Contact us',

    sub_home_about: 'About',
    sub_home_services: 'Our services',
    sub_home_reviews: 'Testimonials',

    s1: 'Accelerate your growth',
    s2: 'Modernize your online presence',
    s3: 'What makes us different',
    s4: 'Frequently asked questions',

    a1: 'Our Story',
    a2: 'Our Vision',
    a3: 'Our Guarantee',
  },
} as const;

/* ============ composant ============ */
export function Header({ className }: { className?: string }) {
  const { isEN } = useLocale();
  const t = isEN ? TEXTS.en : TEXTS.fr;

  const [active, setActive] = useState<string | null>(null);
  const [upToZero, setUpToZero] = useState(false);

  useEffect(() => {
    const onScroll = () => setUpToZero(window.scrollY > 0);
    onScroll();
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      {/* barre mobile */}
      <HeaderResponsive />

      {/* barre desktop */}
      <div
        className={cn(
          'fixed inset-x-0 z-[10000] mx-auto flex items-center justify-center bg-transparent duration-500 ease-in-out max-lg:hidden',
          upToZero ? 'top-4' : 'top-0',
          className
        )}
      >
        <Menu setActive={setActive} upToZero={upToZero}>
          {/* Logo */}
          <div className="flex items-center justify-center">
            <Link href={localizeHref('/', isEN)} aria-label={t.home}>
              <Image
                src={IkovalineLogo}
                alt="Ikovaline"
                width={150}
                height={150}
                className="h-10 object-contain dark:hidden"
                priority
              />
              <Image
                src={IkovalineLogoDark}
                alt="Ikovaline (dark)"
                width={150}
                height={150}
                className="hidden h-10 object-contain dark:block"
                priority
              />
            </Link>
          </div>

          {/* Nav items */}
          <div className="flex w-full items-center justify-end gap-10">
            {/* Home (mega sous-menu) */}
            <MenuItem
              setActive={setActive}
              active={active}
              item={t.home}
              link={localizeHref('/', isEN)}
            >
              <div className="z-10 flex h-full flex-col space-y-4 text-sm">
                <HoveredLink href={localizeHref('/#about', isEN)}>
                  <IconUser stroke={2} />
                  {t.sub_home_about}
                </HoveredLink>
                <HoveredLink href={localizeHref('/#services', isEN)}>
                  <IconApps stroke={2} />
                  {t.sub_home_services}
                </HoveredLink>
                <HoveredLink href={localizeHref('/#review', isEN)}>
                  <IconMessage stroke={2} />
                  {t.sub_home_reviews}
                </HoveredLink>
              </div>
            </MenuItem>

            {/* Services */}
            <MenuItem
              setActive={setActive}
              active={active}
              item={t.ourServices}
              link={localizeHref('/nos-services', isEN)}
            >
              <div className="flex flex-col space-y-4 text-sm">
                <HoveredLink
                  href={localizeHref(
                    '/nos-services/#buisness-developpement',
                    isEN
                  )}
                >
                  <IconChartLine stroke={2} />
                  {t.s1}
                </HoveredLink>
                <HoveredLink
                  href={localizeHref(
                    '/nos-services/#developpement-digital',
                    isEN
                  )}
                >
                  <IconDeviceLaptop stroke={2} />
                  {t.s2}
                </HoveredLink>
                <HoveredLink
                  href={localizeHref('/nos-services/#pourquoi-nous', isEN)}
                >
                  <IconThumbUp stroke={2} />
                  {t.s3}
                </HoveredLink>
                <HoveredLink href={localizeHref('/nos-services/#faq', isEN)}>
                  <IconHelpHexagon stroke={2} />
                  {t.s4}
                </HoveredLink>
              </div>
            </MenuItem>

            {/* About */}
            <MenuItem
              setActive={setActive}
              active={active}
              item={t.about}
              link={localizeHref('/about', isEN)}
            >
              <div className="flex flex-col space-y-4 text-sm">
                <HoveredLink
                  href={localizeHref('/about/#notre-histoire', isEN)}
                >
                  <IconHistory stroke={2} />
                  {t.a1}
                </HoveredLink>
                <HoveredLink href={localizeHref('/about/#notre-vision', isEN)}>
                  <IconEye stroke={2} />
                  {t.a2}
                </HoveredLink>
                <HoveredLink
                  href={localizeHref('/about/#notre-garantie', isEN)}
                >
                  <IconShieldCheck stroke={2} />
                  {t.a3}
                </HoveredLink>
              </div>
            </MenuItem>

            {/* Blog */}
            <MenuItem
              setActive={setActive}
              active={active}
              item={t.blog}
              link={localizeHref('/blog', isEN)}
            />

            {/* Right side actions */}
            <div className="flex items-center gap-4">
              <ModeToggle />
              <LangSwitch />
              <LiquidLink
                href={localizeHref('/contact', isEN)}
                className="z-10 !h-10 !px-4 !py-0"
              >
                {t.contact}
              </LiquidLink>
            </div>
          </div>
        </Menu>
      </div>
    </>
  );
}
