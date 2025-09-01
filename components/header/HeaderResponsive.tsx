'use client';

import * as React from 'react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTrigger,
} from '@/components/ui/drawer';

import IkovalineLogo from '@/public/images/logo/ikovaline_logo.png';
import IkovalineLogoDark from '@/public/images/logo/ikovaline_logo_dark.png';

import { ModeToggle } from '../toggle-darkmode';
import { LiquidLink } from '../ui/liquid-link';

import {
  IconMenu3,
  IconMessage2,
  IconChevronDown,
  IconCpu,
} from '@tabler/icons-react';
import {
  IconChartLine,
  IconDeviceLaptop,
  IconEye,
  IconHelpHexagon,
  IconHistory,
  IconThumbUp,
} from '@tabler/icons-react';
import { LiquidButton } from '../ui/liquid-glass-button';
import LangSwitch from '../LangSwitch';
import { useScrollTopOnPathChange } from '@/hooks/useScrollToponPathChange';

/* ================= helpers locale ================= */

type SubLink = { label: string; href: string; icon?: React.ReactNode };
type Section = { title: string; href: string; links?: SubLink[] };

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
  if (href.startsWith('/#')) return `/en${href}`; // ancre page d’accueil
  return href.startsWith('/') ? `/en${href}` : `/en/${href}`;
}

/* ================= dictionnaires ================= */

const TEXTS = {
  fr: {
    ariaOpen: 'Ouvrir le menu',
    ariaHome: 'Accueil',
    contact: 'Contactez-nous',
    contactCta: 'Contactez-nous !',
    cancel: 'Annuler',
    sections: [
      {
        title: 'Accueil',
        href: '/',
        links: [],
      },
      {
        title: 'Nos Services',
        href: '/nos-services',
        links: [
          {
            label: 'Applications Web, Mobiles & SaaS',
            href: '/nos-services/#saas-apps',
            icon: <IconDeviceLaptop stroke={2} />,
          },
          {
            label: 'Automatisation & IA',
            href: '/nos-services/#automatisation-ia',
            icon: <IconCpu stroke={2} />,
          },
          {
            label: 'Stratégies Digitales & Croissance',
            href: '/nos-services/#scaling',
            icon: <IconChartLine stroke={2} />,
          },
          {
            label: 'Ce qui fait notre différence',
            href: '/nos-services/#pourquoi-nous',
            icon: <IconThumbUp stroke={2} />,
          },
          {
            label: 'Foire aux questions',
            href: '/nos-services/#faq',
            icon: <IconHelpHexagon stroke={2} />,
          },
        ],
      },
      {
        title: 'À Propos',
        href: '/about',
        links: [
          {
            label: 'Notre Histoire',
            href: '/about/#notre-histoire',
            icon: <IconHistory stroke={2} />,
          },
          {
            label: 'Notre Vision',
            href: '/about/#notre-vision',
            icon: <IconEye stroke={2} />,
          },
          {
            label: 'Notre Garantie',
            href: '/about/#notre-garantie',
            icon: <IconHelpHexagon stroke={2} />,
          },
        ],
      },
      { title: 'Conseils Digitaux', href: '/blog', links: [] },
      { title: 'Nos Projets', href: '/projects', links: [] },
    ] as Section[],
  },

  en: {
    ariaOpen: 'Open menu',
    ariaHome: 'Home',
    contact: 'Contact us',
    contactCta: 'Contact us!',
    cancel: 'Cancel',
    sections: [
      {
        title: 'Home',
        href: '/',
        links: [],
      },
      {
        title: 'Our Services',
        href: '/nos-services',
        links: [
          {
            label: 'Web, Mobile & SaaS Apps',
            href: '/nos-services/#saas-apps',
            icon: <IconDeviceLaptop stroke={2} />,
          },
          {
            label: 'Automation & AI',
            href: '/nos-services/#automatisation-ia',
            icon: <IconCpu stroke={2} />,
          },
          {
            label: 'Digital Strategies & Growth',
            href: '/nos-services/#scaling',
            icon: <IconChartLine stroke={2} />,
          },
          {
            label: 'What makes us different',
            href: '/nos-services/#pourquoi-nous',
            icon: <IconThumbUp stroke={2} />,
          },
          {
            label: 'FAQ',
            href: '/nos-services/#faq',
            icon: <IconHelpHexagon stroke={2} />,
          },
        ],
      },
      {
        title: 'About',
        href: '/about',
        links: [
          {
            label: 'Our Story',
            href: '/about/#notre-histoire',
            icon: <IconHistory stroke={2} />,
          },
          {
            label: 'Our Vision',
            href: '/about/#notre-vision',
            icon: <IconEye stroke={2} />,
          },
          {
            label: 'Our Guarantee',
            href: '/about/#notre-garantie',
            icon: <IconHelpHexagon stroke={2} />,
          },
        ],
      },
      { title: 'Digital Advice', href: '/blog', links: [] },
      { title: 'Our Projects', href: '/projects', links: [] },
    ] as Section[],
  },
} as const;

/* ================= composant ================= */

export function HeaderResponsive() {
  const { isEN } = useLocale();
  const DURATION = 260;
  useScrollTopOnPathChange();

  // sections localisées
  const headerLinks: Section[] = (
    isEN ? TEXTS.en.sections : TEXTS.fr.sections
  ).map((s) => ({
    title: s.title,
    href: localizeHref(s.href, isEN),
    links: (s.links || []).map((l) => ({
      ...l,
      href: localizeHref(l.href, isEN),
    })),
  }));

  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [animatingIndex, setAnimatingIndex] = useState<number | null>(null);

  const toggle = (i: number) => {
    setAnimatingIndex(i);
    setActiveIndex((prev) => (prev === i ? null : i));
    window.setTimeout(() => setAnimatingIndex(null), DURATION + 40);
  };

  const t = isEN ? TEXTS.en : TEXTS.fr;

  return (
    <Drawer>
      {/* BARRE FLOTTANTE MOBILE */}
      <div
        className={[
          'fixed bottom-0 z-[10000] lg:hidden',
          'flex max-xs:w-full xs:left-1/2 max-xs:pb-5 xs:-translate-x-1/2 items-center justify-around [320px]:justify-between xs:gap-6 gap-2',
          'rounded-t-[2rem] xs:rounded-[2rem] border dark:border-white/15',
          'bg-white dark:bg-black',

          'bg-[linear-gradient(135deg,rgba(255,255,255,.78),rgba(240,245,252,.42))] dark:bg-[linear-gradient(135deg,rgba(10,14,20,.92),rgba(10,14,20,.65))]',
          'shadow-[0_18px_60px_rgba(6,24,44,.12),inset_0_1px_0_rgba(255,255,255,.55)] dark:shadow-[0_18px_60px_rgba(2,6,12,.6),inset_0_1px_0_rgba(59,130,246,.12)]',
          'xs:p-4 px-1 pt-3',
        ].join(' ')}
      >
        <DrawerTrigger aria-label={t.ariaOpen} asChild>
          <button className="grid place-items-center rounded-full p-0 transition hover:scale-[1.03]">
            <IconMenu3 stroke={2} className="[360px]:min-w-9 min-w-7 min-h-9" />
          </button>
        </DrawerTrigger>

        <ModeToggle />
        <LangSwitch />
        <div className="max-[320px]:hidden">
          <DrawerClose asChild>
            <Link href={localizeHref('/', isEN)} aria-label={t.ariaHome}>
              <Image
                src={IkovalineLogoDark}
                alt="Ikovaline"
                width={150}
                height={150}
                className="hidden h-10 w-24 min-w-12 xs:min-w-24 object-contain dark:block"
                priority
              />
              <Image
                src={IkovalineLogo}
                alt="Ikovaline"
                width={150}
                height={150}
                className="block h-10 w-24 min-w-12 xs:min-w-24 object-contain dark:hidden"
                priority
              />
            </Link>
          </DrawerClose>
        </div>

        <LiquidLink href={localizeHref('/contact', isEN)} className="h-11 px-3">
          <span className="flex items-center gap-2 xs:text-xs text-[0.7rem]">
            <IconMessage2 aria-hidden className="max-xs:hidden" />
            {t.contact}
          </span>
        </LiquidLink>
      </div>

      {/* CONTENU DU DRAWER */}
      <DrawerContent>
        <div
          className={[
            'relative mx-auto w-full overflow-hidden rounded-t-[2rem] pb-6',
            'bg-white/6 dark:bg-black/30',
            'border border-white/40 dark:border-[rgba(37,99,235,0.20)]',
            'shadow-[0_22px_70px_rgba(6,24,44,0.12),inset_0_1px_0_rgba(255,255,255,0.45)]',
            'dark:shadow-[0_22px_70px_rgba(0,0,0,0.65),inset_0_1px_0_rgba(37,99,235,0.12)]',
          ].join(' ')}
        >
          {/* rims */}
          <span
            aria-hidden
            className="pointer-events-none absolute inset-0 rounded-t-[2rem] dark:hidden"
            style={{
              border: '1px solid transparent',
              backgroundImage:
                'linear-gradient(135deg,rgba(255,255,255,.85),rgba(245,248,252,.40)),' +
                'conic-gradient(from 210deg, rgba(255,255,255,.8), rgba(0,168,232,.28), rgba(255,255,255,.55), rgba(37,99,235,.20), rgba(255,255,255,.85))',
              backgroundClip: 'padding-box, border-box',
              opacity: 0.95,
            }}
          />
          <span
            aria-hidden
            className="pointer-events-none absolute inset-0 hidden rounded-t-[2rem] dark:block"
            style={{
              border: '1px solid transparent',
              backgroundImage:
                'linear-gradient(135deg,rgba(8,12,18,.92),rgba(8,12,18,.58)),' +
                'conic-gradient(from 210deg, rgba(0,168,232,.22), rgba(37,99,235,.18), rgba(0,168,232,.22))',
              backgroundClip: 'padding-box, border-box',
              opacity: 0.85,
            }}
          />

          {/* handle */}
          <div className="relative z-10 mx-auto mt-2 h-2 w-[100px] rounded-full bg-neutral-300/80 dark:bg-white/10" />

          <DrawerHeader className="relative z-10">
            <Image
              src={IkovalineLogoDark}
              alt="Ikovaline"
              width={150}
              height={150}
              className="mx-auto hidden min-h-10 min-w-28 object-contain dark:block"
            />
            <Image
              src={IkovalineLogo}
              alt="Ikovaline"
              width={150}
              height={150}
              className="mx-auto block min-h-10 min-w-28 object-contain dark:hidden"
            />
          </DrawerHeader>

          {/* NAV (accordion single-open) */}
          <nav
            style={{ scrollbarWidth: 'none' }}
            className="mx-auto max-w-[300px] max-h-[50vh] px-2 overflow-y-auto space-y-2 pt-0"
          >
            {headerLinks.map((section, i) => {
              const hasChildren = !!section.links?.length;
              const expanded = activeIndex === i;

              return (
                <div
                  key={`${section.title}-${i}`}
                  className="bg-white/60 relative  rounded-[2rem] shadow-[0_1px_4px_rgba(0,0,0,.12)] dark:bg-black/40 dark:shadow-[0_1px_4px_rgba(0,0,0,.55)]"
                >
                  {/* ligne principale */}
                  <div className="relative z-10  pr-4 h-full  flex items-center">
                    <DrawerClose asChild>
                      <Link
                        onClick={() => {
                          // Force scroll en haut à chaque navigation
                          if (typeof window !== 'undefined') {
                            window.scrollTo({ top: 0, behavior: 'smooth' });
                          }
                        }}
                        href={section.href}
                        className="flex-1 px-4 py-4 text-sm font-semibold text-neutral-800 transition-colors hover:text-neutral-950 dark:text-neutral-200 dark:hover:text-white"
                      >
                        {section.title}
                      </Link>
                    </DrawerClose>

                    {hasChildren && (
                      <LiquidButton
                        className="!p-2 h-full !py-2 relative"
                        aria-expanded={expanded}
                        aria-controls={`sub-${i}`}
                        onClick={() => toggle(i)}
                      >
                        <IconChevronDown
                          className={`size-5 text-sky-700/70 transition-transform duration-300 dark:text-sky-300/80 ${expanded ? 'rotate-180' : ''}`}
                        />
                      </LiquidButton>
                    )}
                  </div>

                  {/* sous-liens animés */}
                  <AnimatePresence initial={false} mode="wait">
                    {hasChildren && expanded && (
                      <MeasuredList
                        id={`sub-${i}`}
                        links={section.links!}
                        duration={DURATION}
                        isAnimating={animatingIndex === i}
                      />
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </nav>

          {/* FOOTER CTA */}
          <DrawerFooter className="relative z-10 ">
            <DrawerClose asChild>
              <button
                className={[
                  'relative group/btn mt-10 block h-14 w-full rounded-full text-[15px] font-semibold tracking-wide text-white',
                  'bg-[linear-gradient(135deg,#2563EB,#00A8E8)]',
                  'shadow-[0_14px_36px_rgba(37,99,235,.55),0_0_50px_rgba(0,168,232,.30)]',
                ].join(' ')}
              >
                <Link
                  onClick={() => {
                    // Force scroll en haut à chaque navigation
                    if (typeof window !== 'undefined') {
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }
                  }}
                  href={localizeHref('/contact', isEN)}
                >
                  {t.contactCta}
                </Link>
                <span className="pointer-events-none absolute inset-x-10 -bottom-px mx-auto h-px w-1/2 bg-gradient-to-r from-transparent via-sky-300 to-transparent" />
              </button>
            </DrawerClose>
            <DrawerClose asChild>
              <LiquidButton className="rounded-2xl ">{t.cancel}</LiquidButton>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
}

/* ============== sous-liste animée ============== */

function MeasuredList({
  id,
  links,
  duration,
}: {
  id: string;
  links: { label: string; href: string; icon?: React.ReactNode }[];
  duration: number;
  isAnimating: boolean;
}) {
  const innerRef = React.useRef<HTMLUListElement>(null);
  const [h, setH] = React.useState<number | 'auto'>(0);

  React.useLayoutEffect(() => {
    if (!innerRef.current) return;
    innerRef.current.style.height = 'auto';
    const next = innerRef.current.scrollHeight;
    setH(next);
  }, [links.length]);

  return (
    <motion.ul
      id={id}
      key={id}
      ref={innerRef}
      initial={{ height: 0, opacity: 0 }}
      animate={{ height: h, opacity: 1 }}
      exit={{ height: 0, opacity: 0 }}
      transition={{ duration: duration / 1000, ease: [0.2, 0.0, 0.2, 1] }}
      className="overflow-hidden"
      style={{
        willChange: 'height, opacity',
        contain: 'layout paint',
        transform: 'translateZ(0)',
      }}
    >
      <span
        aria-hidden
        className="mx-auto mb-2 block h-px w-[88%] rounded bg-gradient-to-r from-transparent via-sky-400/40 to-transparent"
      />

      {links.map((link) => (
        <li key={link.href}>
          <DrawerClose asChild>
            <Link
              onClick={() => {
                // Force scroll en haut à chaque navigation
                if (typeof window !== 'undefined') {
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }
              }}
              href={link.href}
              className="flex items-center gap-3 rounded-lg p-3 text-[15px] font-medium text-neutral-700 hover:bg-neutral-100 dark:text-neutral-300 dark:hover:bg-white/10"
            >
              <span aria-hidden className="opacity-75">
                {link.icon}
              </span>
              {link.label}
            </Link>
          </DrawerClose>
        </li>
      ))}
    </motion.ul>
  );
}
