'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { Home, UserCog, LogOut, LayoutDashboard } from 'lucide-react';
import { cn } from '@/lib/utils';

const NAV_ITEMS = [
  { href: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { href: '/account', icon: UserCog, label: 'Compte' },
];

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <>
      {/* NAV BAR */}
      <header
        className={cn(
          // mobile = dock collé en bas
          // desktop/tablette = sticky top-0
          'fixed bottom-0 sm:bottom-2 left-0 right-0 z-40 flex w-full justify-center pointer-events-none',
          'md:sticky md:top-4 md:bottom-auto md:pt-0 md:justify-center'
        )}
      >
        <div
          className={cn(
            'pointer-events-auto w-full md:max-w-2xl sm:max-w-lg max-w-sm px-4',
            'drop-shadow-[0_30px_80px_rgba(0,0,0,0.08)]'
          )}
        >
          <div
            className={cn(
              // ligne principale
              'relative flex items-center justify-between gap-4 sm:gap-8',
              // shape
              'backdrop-blur-lg rounded-t-[2rem] sm:rounded-[2rem] px-4 py-2 sm:py-3',
              // fond glass
              'bg-white text-neutral-900 shadow-[14px_14px_36px_rgba(0,0,0,0.07),-14px_-14px_36px_rgba(255,255,255,0.6)] backdrop-blur-xl',
              'dark:bg-neutral-900/60 dark:text-white dark:shadow-[14px_14px_36px_rgba(0,0,0,0.8),-14px_-14px_36px_rgba(255,255,255,0.07)]'
            )}
          >
            {/* inner bevel */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 rounded-t-[2rem] sm:rounded-[2rem]"
              style={{
                boxShadow:
                  'inset 1px 1px 0 rgba(255,255,255,0.6), inset -1px -1px 0 rgba(0,0,0,0.05)',
              }}
            />

            {/* LEFT : home public */}
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
                const active =
                  href === '/dashboard'
                    ? pathname === '/dashboard'
                    : pathname.startsWith(href);

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
                    {/* contenu (icône + label) */}
                    <div className="relative z-[1] flex items-center gap-2">
                      <div className="relative flex items-center justify-center">
                        <Icon
                          className={cn(
                            'relative h-5 w-5',
                            active ? 'text-primary' : ''
                          )}
                        />
                      </div>

                      <span className="hidden sm:inline text-xs font-medium whitespace-nowrap">
                        {label}
                      </span>
                    </div>

                    {/* DOT ACTIVE */}
                    {active && (
                      <motion.span
                        layoutId="waveBar"
                        className={cn(
                          'absolute -bottom-0.5',
                          'h-[6px] w-[6px] rounded-full',
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

                    {/* mini tooltip mobile */}
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
                'bg-primary/10 text-primary hover:bg-prumary/20 transition-colors',
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

      {/* SPACER pour que le contenu ne passe pas sous la nav en mobile */}
      <div className="h-[40px] md:h-[90px]" />

      {/* MAIN CONTENT */}
      <main className="mx-auto max-w-[1700px] px-6 md:pb-10 pb-32 sm:px-10">
        {children}
      </main>
    </>
  );
}
