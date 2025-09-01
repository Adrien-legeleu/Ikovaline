'use client';

import * as React from 'react';
import { useState, useCallback } from 'react';
import { LazyMotion, domAnimation, m, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';

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
  IconChartLine,
  IconDeviceLaptop,
  IconEye,
  IconHelpHexagon,
  IconHistory,
  IconThumbUp,
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
  if (/^(https?:)?\/\//.test(href)) return href;
  if (/^\/en(\/|$)/.test(href)) return href;
  if (href === '/') return '/en';
  if (href.startsWith('/#')) return `/en${href}`;
  return href.startsWith('/') ? `/en${href}` : `/en/${href}`;
}

/* ================= dictionnaires ================= */
/** IMPORTANT:
 *  - Les liens de NIVEAU 1 pointent vers la PAGE (sans #) => on doit arriver TOUT EN HAUT
 *  - Les SOUS-LIENS (links) peuvent garder les ancres (#...)
 */
const TEXTS = {
  fr: {
    ariaOpen: 'Ouvrir le menu',
    ariaHome: 'Accueil',
    contact: 'Contactez-nous',
    contactCta: 'Contactez-nous !',
    cancel: 'Annuler',
    sections: [
      { title: 'Accueil', href: '/', links: [] },
      {
        title: 'Nos Services',
        href: '/nos-services', // <-- pas d’ancre ici
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
            label: 'Ce qui fait notre différence',
            href: '/nos-services#pourquoi-nous',
            icon: <IconThumbUp stroke={2} />,
          },
          {
            label: 'Foire aux questions',
            href: '/nos-services#faq',
            icon: <IconHelpHexagon stroke={2} />,
          },
        ],
      },
      {
        title: 'À Propos',
        href: '/about', // <-- pas d’ancre ici
        links: [
          {
            label: 'Notre Histoire',
            href: '/about#notre-histoire',
            icon: <IconHistory stroke={2} />,
          },
          {
            label: 'Notre Vision',
            href: '/about#notre-vision',
            icon: <IconEye stroke={2} />,
          },
          {
            label: 'Notre Garantie',
            href: '/about#notre-garantie',
            icon: <IconHelpHexagon stroke={2} />,
          },
        ],
      },
      { title: 'Conseils Digitaux', href: '/blog', links: [] },
      { title: 'Nos Projets', href: '/projects', links: [] }, // <-- pas d’ancre ici
    ] as Section[],
  },
  en: {
    ariaOpen: 'Open menu',
    ariaHome: 'Home',
    contact: 'Contact us',
    contactCta: 'Contact us!',
    cancel: 'Cancel',
    sections: [
      { title: 'Home', href: '/', links: [] },
      {
        title: 'Our Services',
        href: '/nos-services',
        links: [
          {
            label: 'Web, Mobile & SaaS Apps',
            href: '/nos-services#saas-apps',
            icon: <IconDeviceLaptop stroke={2} />,
          },
          {
            label: 'Automation & AI',
            href: '/nos-services#automatisation-ia',
            icon: <IconCpu stroke={2} />,
          },
          {
            label: 'Digital Strategies & Growth',
            href: '/nos-services#scaling',
            icon: <IconChartLine stroke={2} />,
          },
          {
            label: 'What makes us different',
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
      {
        title: 'About',
        href: '/about',
        links: [
          {
            label: 'Our Story',
            href: '/about#notre-histoire',
            icon: <IconHistory stroke={2} />,
          },
          {
            label: 'Our Vision',
            href: '/about#notre-vision',
            icon: <IconEye stroke={2} />,
          },
          {
            label: 'Our Guarantee',
            href: '/about#notre-garantie',
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
  const router = useRouter();
  const DURATION = 260;
  const DRAWER_ANIM_MS = 260;

  // état d'ouverture du Drawer (on contrôle pour séquencer)
  const [open, setOpen] = useState(false);

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

  // NAVIGATION DEPUIS LE DRAWER (FIABLE MOBILE)
  const goFromDrawer = useCallback(
    (href: string, forceTop: boolean) => {
      // Marqueur pour ScrollManager sur la prochaine navigation
      if (forceTop) sessionStorage.setItem('forceScrollTop', '1');

      // 1) fermer le drawer
      setOpen(false);

      // 2) attendre la fin de l’anim, puis router.push
      window.setTimeout(() => {
        router.push(href); // scroll:true par défaut
        // pas besoin d’appeler scrollTo ici : ScrollManager s’en charge
      }, DRAWER_ANIM_MS);
    },
    [router]
  );

  const t = isEN ? TEXTS.en : TEXTS.fr;

  return (
    <LazyMotion features={domAnimation}>
      <Drawer open={open} onOpenChange={setOpen}>
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
              <IconMenu3
                stroke={2}
                className="[360px]:min-w-9 min-w-7 min-h-9"
              />
            </button>
          </DrawerTrigger>

          <ModeToggle />
          <LangSwitch />
          <div className="max-[320px]:hidden">
            {/* logo vers HOME — on force top */}
            <button
              aria-label={t.ariaHome}
              onClick={() => goFromDrawer(localizeHref('/', isEN), true)}
            >
              <Image
                src={IkovalineLogoDark}
                alt="Ikovaline"
                width={150}
                height={150}
                className="hidden h-10 w-24 object-contain dark:block"
                priority
              />
              <Image
                src={IkovalineLogo}
                alt="Ikovaline"
                width={150}
                height={150}
                className="block h-10 w-24 object-contain dark:hidden"
                priority
              />
            </button>
          </div>

          <LiquidLink
            href={localizeHref('/contact', isEN)}
            className="h-11 px-3"
          >
            <span className="flex items-center gap-2 xs:text-xs text-[0.7rem]">
              <IconMessage2 aria-hidden className="max-xs:hidden" />
              {t.contact}
            </span>
          </LiquidLink>
        </div>

        {/* CONTENU DU DRAWER */}
        <DrawerContent>
          <div className="relative mx-auto w-full overflow-hidden rounded-t-[2rem] pb-6 bg-white/6 dark:bg-black/30 border border-white/40 dark:border-[rgba(37,99,235,0.20)]">
            {/* handle */}
            <div className="relative z-10 mx-auto mt-2 h-2 w-[100px] rounded-full bg-neutral-300/80 dark:bg-white/10" />

            <DrawerHeader className="relative z-10">
              <button
                onClick={() => goFromDrawer(localizeHref('/', isEN), true)}
              >
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
              </button>
            </DrawerHeader>

            {/* NAV */}
            <nav className="mx-auto max-w-[300px] max-h-[50vh] px-2 overflow-y-auto space-y-2 pt-0">
              {headerLinks.map((section, i) => {
                const hasChildren = !!section.links?.length;
                const expanded = activeIndex === i;

                return (
                  <div
                    key={section.title}
                    className="bg-white/60 relative rounded-[2rem] shadow dark:bg-black/40"
                  >
                    <div className="relative z-10 pr-4 flex items-center">
                      {/* IMPORTANT: bouton -> goFromDrawer(page, forceTop=true) */}
                      <button
                        onClick={() => goFromDrawer(section.href, true)}
                        className="flex-1 text-left px-4 py-4 text-sm font-semibold"
                      >
                        {section.title}
                      </button>

                      {hasChildren && (
                        <LiquidButton
                          className="!p-2 h-full relative"
                          aria-expanded={expanded}
                          aria-controls={`sub-${i}`}
                          onClick={() => {
                            setAnimatingIndex(i);
                            setActiveIndex((prev) => (prev === i ? null : i));
                            window.setTimeout(
                              () => setAnimatingIndex(null),
                              DURATION + 40
                            );
                          }}
                        >
                          <IconChevronDown
                            className={`size-5 transition-transform duration-300 ${expanded ? 'rotate-180' : ''}`}
                          />
                        </LiquidButton>
                      )}
                    </div>

                    {/* sous-liens (peuvent garder des #ancres) */}
                    <AnimatePresence initial={false} mode="wait">
                      {hasChildren && expanded && (
                        <MeasuredList
                          id={`sub-${i}`}
                          links={section.links!}
                          duration={DURATION}
                          onClickLink={(href) => {
                            // Sous-lien: on NE force PAS top, on laisse le ScrollManager scroller vers l’ancre
                            goFromDrawer(href, false);
                          }}
                        />
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </nav>

            {/* FOOTER CTA */}
            <DrawerFooter>
              <button
                className="relative group/btn mt-10 block h-14 w-full rounded-full text-[15px] font-semibold tracking-wide text-white bg-[linear-gradient(135deg,#2563EB,#00A8E8)]"
                onClick={() =>
                  goFromDrawer(localizeHref('/contact', isEN), true)
                }
              >
                {t.contactCta}
              </button>
              <button className="rounded-2xl" onClick={() => setOpen(false)}>
                {t.cancel}
              </button>
            </DrawerFooter>
          </div>
        </DrawerContent>
      </Drawer>
    </LazyMotion>
  );
}

/* ============== sous-liste animée ============== */
function MeasuredList({
  id,
  links,
  duration,
  onClickLink,
}: {
  id: string;
  links: { label: string; href: string; icon?: React.ReactNode }[];
  duration: number;
  onClickLink: (href: string) => void;
}) {
  const innerRef = React.useRef<HTMLUListElement>(null);
  const [h, setH] = React.useState<number | 'auto'>(0);

  React.useLayoutEffect(() => {
    if (!innerRef.current) return;
    innerRef.current.style.height = 'auto';
    setH(innerRef.current.scrollHeight);
  }, [links.length]);

  return (
    <m.ul
      id={id}
      ref={innerRef}
      initial={{ height: 0, opacity: 0 }}
      animate={{ height: h, opacity: 1 }}
      exit={{ height: 0, opacity: 0 }}
      transition={{ duration: duration / 1000 }}
      className="overflow-hidden"
    >
      {links.map((link) => (
        <li key={link.href}>
          <button
            onClick={() => onClickLink(link.href)}
            className="flex w-full items-center gap-3 p-3 text-sm font-medium text-left"
          >
            {link.icon && <span>{link.icon}</span>}
            {link.label}
          </button>
        </li>
      ))}
    </m.ul>
  );
}
