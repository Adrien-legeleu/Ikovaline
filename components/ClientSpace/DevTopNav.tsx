'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  Home,
  LogOut,
  LayoutDashboard,
  MessageSquare,
  UserCog,
} from 'lucide-react';
import { cn } from '@/lib/utils';

const NAV_ITEMS = [
  { href: '/dev/projects', icon: LayoutDashboard, label: 'Mes projets' },
  { href: '/dev/account', icon: UserCog, label: 'Compte' },
];

export default function DevTopNav() {
  const pathname = usePathname();

  return (
    <>
      <header
        className={cn(
          'fixed bottom-0 sm:bottom-2 left-0 right-0 z-40 flex w-full justify-center pointer-events-none',
          'md:sticky md:top-4 md:bottom-auto md:pt-0 md:justify-center'
        )}
      >
        <div
          className={cn(
            'pointer-events-auto w-full md:max-w-3xl sm:max-w-xl max-w-sm px-4',
            'drop-shadow-[0_30px_80px_rgba(0,0,0,0.08)]'
          )}
        >
          <div
            className={cn(
              'relative flex items-center justify-between gap-4 sm:gap-8',
              'backdrop-blur-lg rounded-t-[2rem] sm:rounded-[2rem] px-4 py-2 sm:py-3',
              'bg-white text-neutral-900 shadow-[14px_14px_36px_rgba(0,0,0,0.07),-14px_-14px_36px_rgba(255,255,255,0.6)]',
              'dark:bg-neutral-900/60 dark:text-white dark:shadow-[14px_14px_36px_rgba(0,0,0,0.8),-14px_-14px_36px_rgba(255,255,255,0.07)]'
            )}
          >
            {/* bevel */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 rounded-t-[2rem] sm:rounded-[2rem]"
              style={{
                boxShadow:
                  'inset 1px 1px 0 rgba(255,255,255,0.6), inset -1px -1px 0 rgba(0,0,0,0.05)',
              }}
            />

            {/* LEFT : retour site */}
            <Link
              href="/"
              className={cn(
                'relative shrink-0 inline-flex items-center justify-center',
                'h-10 w-10 rounded-2xl text-[0px] font-medium',
                'bg-primary/10 text-primary hover:bg-primary/20 transition-colors'
              )}
              title="Retour au site"
            >
              <Home className="h-5 w-5" />
              <span className="sr-only">Accueil</span>
            </Link>

            {/* CENTER NAV */}
            <nav className="flex items-center md:flex-1 gap-4 md:min-w-0">
              {NAV_ITEMS.map(({ href, icon: Icon, label }) => {
                // actif si pathname === href OU pathname commence par href + '/'
                const active =
                  pathname === href || pathname.startsWith(href + '/');

                return (
                  <Link
                    key={href}
                    href={href}
                    className={cn(
                      'relative group inline-flex items-center justify-center',
                      'rounded-xl px-3 py-2 text-sm font-medium leading-none',
                      'text-current/80 hover:text-current transition-colors'
                    )}
                    title={label}
                  >
                    {/* icône + label */}
                    <div className="relative z-[1] flex items-center gap-2">
                      <Icon
                        className={cn(
                          'relative h-5 w-5',
                          active ? 'text-primary' : ''
                        )}
                      />
                      <span className="hidden sm:inline text-xs font-medium whitespace-nowrap">
                        {label}
                      </span>
                    </div>

                    {/* DOT ACTIF */}
                    {active && (
                      <motion.span
                        layoutId="devActiveDot"
                        className={cn(
                          'absolute -bottom-0.5 h-[6px] w-[6px] rounded-full',
                          'bg-primary shadow-[0_0_12px_rgba(0,0,0,0.25)]'
                        )}
                        style={{
                          left: 'calc(50% - 3px)',
                        }}
                        transition={{
                          type: 'spring',
                          stiffness: 300,
                          damping: 26,
                        }}
                      />
                    )}

                    {/* tooltip mobile */}
                    <span
                      className={cn(
                        'pointer-events-none absolute left-1/2 top-[calc(100%+0.5rem)] -translate-x-1/2',
                        'scale-95 opacity-0 group-hover:opacity-100 group-hover:scale-100',
                        'transition text-[10px] px-2 py-1 rounded-md',
                        'bg-primary text-white shadow-[0_12px_30px_rgba(0,0,0,0.3)]',
                        'sm:hidden'
                      )}
                    >
                      {label}
                    </span>
                  </Link>
                );
              })}
            </nav>

            {/* RIGHT : logout */}
            <a
              href="/logout"
              className={cn(
                'relative shrink-0 inline-flex items-center justify-center',
                'h-10 w-10 rounded-2xl text-[0px] font-medium',
                'bg-primary/10 text-primary hover:bg-primary/20 transition-colors',
                'dark:bg-neutral-800 dark:hover:bg-neutral-700'
              )}
              title="Se déconnecter"
            >
              <LogOut className="h-5 w-5" />
              <span className="sr-only">Quitter</span>
            </a>
          </div>
        </div>
      </header>
    </>
  );
}
