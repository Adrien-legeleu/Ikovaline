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

import IkovalineLogo from '@/public/images/logo/ikovaline_logo.png';
import IkovalineLogoDark from '@/public/images/logo/ikovaline_logo_dark.png';
import { AnimatedThemeToggler } from '../magicui/animated-theme-toggler';
import WhatsAppButton from '../WhatsappButton';

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
  { title: 'Nos Projets', href: '/projects' },
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
];

export function HeaderResponsive() {
  const [open, setOpen] = React.useState(false);
  const [expanded, setExpanded] = React.useState<number | null>(null);

  React.useEffect(() => {
    document.documentElement.classList.toggle('overflow-hidden', open);
    return () => document.documentElement.classList.remove('overflow-hidden');
  }, [open]);

  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return (
    <>
      {/* Header mobile transparent */}
      <header className="fixed inset-x-0 top-0 z-[10000] lg:hidden">
        <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4">
          <Link
            href="/"
            aria-label="Accueil"
            className="flex items-center gap-2"
          >
            <Image
              src={IkovalineLogo}
              alt="Ikovaline"
              width={120}
              height={36}
              className="h-8 w-auto object-contain dark:hidden"
              priority
            />
            <Image
              src={IkovalineLogoDark}
              alt="Ikovaline"
              width={120}
              height={36}
              className="hidden h-8 w-auto object-contain dark:block"
              priority
            />
          </Link>

          <div className="flex items-center gap-4">
            <AnimatedThemeToggler />
            <button
              onClick={() => setOpen(true)}
              aria-label="Ouvrir le menu"
              className="grid size-10 p-1  place-items-center rounded-xl bg-white/70 text-neutral-900 shadow-sm ring-1 ring-black/10 backdrop-blur dark:bg-neutral-900/60 dark:text-neutral-100 dark:ring-white/10"
            >
              <IconMenu3 className="w-full h-full" />
            </button>
          </div>
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
              className="pointer-events-none absolute inset-0 opacity-100"
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
              <div className="flex items-center justify-between px-5 pt-4">
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
                  className="grid size-10 place-items-center rounded-xl bg-white/70 text-neutral-900 shadow-sm ring-1 ring-black/10 backdrop-blur hover:opacity-95 dark:bg-neutral-900/60 dark:text-neutral-100 dark:ring-white/10"
                >
                  <IconX />
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
                  show: { transition: { staggerChildren: 0.06 } },
                }}
                className="relative mx-auto mt-6 w-full max-w-3xl grow overflow-y-auto px-5 pb-28"
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
                      {/* LIGNE PRINCIPALE — Link + bouton séparés (❗pas de bouton dans le Link) */}
                      <div className="group relative flex items-center justify-between rounded-2xl px-4 py-4">
                        <Link
                          href={s.href}
                          onClick={() => setOpen(false)}
                          className="text-2xl font-semibold tracking-tight text-neutral-900 hover:opacity-80 dark:text-neutral-50"
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
                              e.stopPropagation(); // ← empêche la fermeture
                              setExpanded((p) => (p === idx ? null : idx));
                            }}
                            onPointerDown={(e) => {
                              // évite que le mousedown déclenche le click du parent sur mobiles
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

                      {/* Hairline */}
                      <div className="pointer-events-none mt-2 h-px w-full bg-gradient-to-r from-transparent via-black/10 to-transparent dark:via-white/10" />

                      {/* SOUS-LIENS */}
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

              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black/5 to-transparent dark:from-white/5" />
              <div className="relative z-10 space-y-2 mx-auto mb-6 w-full max-w-3xl px-5">
                <WhatsAppButton
                  className=" px-5 py-4 text-[15px] gap-2 w-full flex items-center justify-center"
                  message="Bonjour, je souhaite échanger avec vous, par messages ou par téléphone. Quand vous convient-il ?"
                  label="WhatsApp"
                />
                <Link
                  href="/contact"
                  onClick={() => setOpen(false)}
                  className="inline-flex w-full items-center justify-center rounded-xl bg-[hsl(var(--primary))] px-5 py-4 text-[15px] font-semibold text-white shadow-[0_28px_56px_-22px_hsl(var(--primary)/0.6)] ring-1 ring-white/15 transition hover:brightness-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--primary)/0.45)]"
                >
                  Contactez-nous
                </Link>
              </div>
            </m.aside>
          </m.div>
        )}
      </AnimatePresence>
    </>
  );
}
