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

import { IconMenu3, IconMessage2, IconChevronDown } from '@tabler/icons-react';
import {
  IconApps,
  IconChartLine,
  IconDeviceLaptop,
  IconEye,
  IconHelpHexagon,
  IconHistory,
  IconMessage,
  IconThumbUp,
  IconUser,
} from '@tabler/icons-react';
import { LiquidButton } from '../ui/liquid-glass-button';
import LangSwitch from '../LangSwitch';

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
        links: [
          { label: 'À Propos', href: '/#about', icon: <IconUser stroke={2} /> },
          {
            label: 'Nos Services',
            href: '/#services',
            icon: <IconApps stroke={2} />,
          },
          {
            label: 'Témoignages',
            href: '/#review',
            icon: <IconMessage stroke={2} />,
          },
        ],
      },
      {
        title: 'Nos Services',
        href: '/nos-services',
        links: [
          {
            label: 'Accélérez votre croissance',
            href: '/nos-services/#buisness-developpement',
            icon: <IconChartLine stroke={2} />,
          },
          {
            label: 'Modernisez votre présence en ligne',
            href: '/nos-services/#developpement-digital',
            icon: <IconDeviceLaptop stroke={2} />,
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
        links: [
          { label: 'About', href: '/#about', icon: <IconUser stroke={2} /> },
          {
            label: 'Our Services',
            href: '/#services',
            icon: <IconApps stroke={2} />,
          },
          {
            label: 'Testimonials',
            href: '/#review',
            icon: <IconMessage stroke={2} />,
          },
        ],
      },
      {
        title: 'Our Services',
        href: '/nos-services',
        links: [
          {
            label: 'Accelerate your growth',
            href: '/nos-services/#buisness-developpement',
            icon: <IconChartLine stroke={2} />,
          },
          {
            label: 'Modernize your online presence',
            href: '/nos-services/#developpement-digital',
            icon: <IconDeviceLaptop stroke={2} />,
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
    ] as Section[],
  },
} as const;

/* ================= composant ================= */

export function HeaderResponsive() {
  const { isEN } = useLocale();
  const DURATION = 260;

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
          'flex max-xs:w-full xs:left-1/2 xs:-translate-x-1/2 items-center justify-around [320px]:justify-between xs:gap-6 gap-2',
          'rounded-t-[2rem] xs:rounded-[2rem] border dark:border-white/15',
          'backdrop-blur-2xl',
          'bg-[linear-gradient(135deg,rgba(255,255,255,.78),rgba(240,245,252,.42))] dark:bg-[linear-gradient(135deg,rgba(10,14,20,.92),rgba(10,14,20,.65))]',
          'shadow-[0_18px_60px_rgba(6,24,44,.12),inset_0_1px_0_rgba(255,255,255,.55)] dark:shadow-[0_18px_60px_rgba(2,6,12,.6),inset_0_1px_0_rgba(59,130,246,.12)]',
          'p-4',
        ].join(' ')}
      >
        <DrawerTrigger aria-label={t.ariaOpen} asChild>
          <button className="grid place-items-center rounded-full p-0 transition hover:scale-[1.03]">
            <IconMenu3 stroke={2} className="[360px]:min-w-9 min-w-7 min-h-9" />
          </button>
        </DrawerTrigger>

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
          <span className="flex items-center gap-2 text-xs">
            <IconMessage2 aria-hidden />
            {t.contact}
          </span>
        </LiquidLink>

        <ModeToggle />
        <LangSwitch />
      </div>

      {/* CONTENU DU DRAWER */}
      <DrawerContent>
        {/* halos */}
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
          <span className="absolute -top-32 left-1/2 h-[36rem] w-[36rem] -translate-x-1/2 rounded-full opacity-35 blur-[220px] dark:opacity-45 bg-[radial-gradient(closest-side,#00A8E8,transparent_70%)]" />
          <span className="absolute -bottom-40 right-1/3 h-[30rem] w-[30rem] translate-x-1/4 rounded-full opacity-25 blur-[200px] dark:opacity-35 bg-[radial-gradient(closest-side,#2563EB,transparent_70%)]" />
        </div>

        <div
          className={[
            'relative mx-auto w-full overflow-hidden rounded-t-[2rem] pb-6',
            'backdrop-blur-[18px] backdrop-saturate-150',
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
          <span className="pointer-events-none absolute left-6 right-6 top-2 h-6 rounded-full bg-white/65 blur-[10px] dark:bg-sky-400/10" />
          <div className="relative z-10 mx-auto mt-4 h-2 w-[100px] rounded-full bg-neutral-300/80 dark:bg-white/10" />

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
          <nav className="mx-auto max-w-[280px] space-y-3 py-4">
            {headerLinks.map((section, i) => {
              const hasChildren = !!section.links?.length;
              const expanded = activeIndex === i;

              return (
                <div
                  key={`${section.title}-${i}`}
                  className={[
                    'group relative overflow-hidden rounded-3xl',
                    'bg-white/70 dark:bg-zinc-900/60 backdrop-blur-2xl backdrop-saturate-150',
                    'border border-white/55 dark:border-white/10',
                    'shadow-[0_18px_48px_rgba(6,24,44,.10),inset_0_1px_0_rgba(255,255,255,.55)]',
                    'dark:shadow-[0_18px_48px_rgba(0,0,0,.55),inset_0_1px_0_rgba(37,99,235,.10)]',
                    'transition-transform duration-300 hover:-translate-y-[2px]',
                    'hover:shadow-[0_24px_60px_rgba(37,99,235,.20),inset_0_1px_0_rgba(255,255,255,.6)]',
                  ].join(' ')}
                >
                  {/* rims (card) */}
                  <span
                    aria-hidden
                    className="pointer-events-none absolute inset-0 rounded-2xl opacity-95 dark:hidden"
                    style={{
                      border: '1px solid transparent',
                      backgroundImage:
                        'linear-gradient(135deg,rgba(255,255,255,.85),rgba(245,248,252,.40)),' +
                        'conic-gradient(from 210deg, rgba(255,255,255,.85), rgba(0,168,232,.26), rgba(255,255,255,.55), rgba(37,99,235,.22), rgba(255,255,255,.85))',
                      backgroundClip: 'padding-box, border-box',
                    }}
                  />
                  <span
                    aria-hidden
                    className="pointer-events-none absolute inset-0 hidden rounded-2xl opacity-90 mix-blend-normal dark:block"
                    style={{
                      border: '1px solid transparent',
                      backgroundImage:
                        'linear-gradient(135deg,rgba(8,12,18,.90),rgba(8,12,18,.60)),' +
                        'conic-gradient(from 210deg, rgba(0,168,232,.20), rgba(37,99,235,.16), rgba(0,168,232,.20))',
                      backgroundClip: 'padding-box, border-box',
                    }}
                  />

                  {/* ligne principale */}
                  <div className="relative z-10 flex items-center">
                    <DrawerClose asChild>
                      <Link
                        href={section.href}
                        className="flex-1 px-4 py-4 text-[15px] font-semibold text-neutral-800 transition-colors hover:text-neutral-950 dark:text-neutral-200 dark:hover:text-white"
                      >
                        {section.title}
                      </Link>
                    </DrawerClose>

                    {hasChildren && (
                      <button
                        aria-expanded={expanded}
                        aria-controls={`sub-${i}`}
                        onClick={() => toggle(i)}
                        className={[
                          'mr-2 grid size-10 place-items-center rounded-2xl transition',
                          'border border-white/45 dark:border-white/10',
                          'bg-white/70 dark:bg-zinc-900/60 backdrop-blur-md backdrop-saturate-150',
                          'shadow-[inset_0_1px_0_rgba(255,255,255,.5)] dark:shadow-[inset_0_1px_0_rgba(37,99,235,.10)]',
                          'hover:scale-[1.04]',
                        ].join(' ')}
                      >
                        <IconChevronDown
                          className={`size-5 text-sky-700/70 transition-transform duration-300 dark:text-sky-300/80 ${expanded ? 'rotate-180' : ''}`}
                        />
                      </button>
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
          <DrawerFooter className="relative z-10 mt-2">
            <DrawerClose asChild>
              <button
                className={[
                  'relative group/btn mt-10 block h-14 w-full rounded-full text-[15px] font-semibold tracking-wide text-white',
                  'bg-[linear-gradient(135deg,#2563EB,#00A8E8)]',
                  'shadow-[0_14px_36px_rgba(37,99,235,.55),0_0_50px_rgba(0,168,232,.30)]',
                  'transition-shadow hover:shadow-[0_18px_48px_rgba(37,99,235,.65),0_0_70px_rgba(0,168,232,.40)]',
                ].join(' ')}
              >
                <span className="pointer-events-none absolute inset-0 rounded-3xl [mask-image:linear-gradient(160deg,transparent_35%,black_50%,transparent_65%)]">
                  <span className="absolute -inset-10 rotate-[18deg] bg-white/20 blur-xl" />
                </span>
                <Link href={localizeHref('/contact', isEN)}>
                  {t.contactCta}
                </Link>
                <span className="pointer-events-none absolute inset-x-10 -bottom-px mx-auto h-px w-1/2 bg-gradient-to-r from-transparent via-sky-300 to-transparent" />
              </button>
            </DrawerClose>
            <DrawerClose asChild>
              <LiquidButton className="rounded-2xl">{t.cancel}</LiquidButton>
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
  isAnimating,
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
      style={{
        overflow: 'hidden',
        willChange: 'height, opacity',
        contain: 'layout paint',
        transform: 'translateZ(0)',
      }}
      className={[
        'relative z-10 px-2 pb-2',
        isAnimating ? 'backdrop-blur-sm' : 'backdrop-blur-md',
      ].join(' ')}
    >
      <span
        aria-hidden
        className="mx-auto mb-2 block h-px w-[88%] rounded bg-gradient-to-r from-transparent via-sky-400/40 to-transparent"
      />

      {links.map((link) => (
        <li key={link.href}>
          <DrawerClose asChild>
            <Link
              href={link.href}
              className={[
                'my-1.5 flex items-center gap-2 rounded-xl px-3 py-2 text-[14px] transition',
                'text-neutral-700 hover:text-neutral-900 dark:text-neutral-300 dark:hover:text-white',
                isAnimating
                  ? 'hover:bg-white/45 dark:hover:bg-zinc-900/45'
                  : 'hover:bg-white/55 dark:hover:bg-zinc-900/55 hover:shadow-[inset_0_1px_0_rgba(255,255,255,.6)] dark:hover:shadow-[inset_0_1px_0_rgba(37,99,235,.12)]',
              ].join(' ')}
            >
              <span aria-hidden className="opacity-75">
                {link.icon}
              </span>
              {link.label}
            </Link>
          </DrawerClose>
        </li>
      ))}

      <span
        aria-hidden
        className="pointer-events-none mx-auto -mb-1 block h-8 w-[84%] rounded-full
                   bg-[radial-gradient(ellipse_at_center,rgba(0,168,232,.40),rgba(37,99,235,.28),transparent_70%)] blur-2xl"
      />
    </motion.ul>
  );
}
