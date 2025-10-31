'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import type { ReactNode } from 'react';

type Props = {
  href: string;
  label: string;
  match?: 'exact' | 'startsWith';
  /** notif simple (dot ou nombre) */
  notif?: boolean | number;
  /** on passe l’icône en JSX (élément), pas en fonction */
  children: ReactNode;
};

export default function NavIcon({
  href,
  label,
  match = 'startsWith',
  notif,
  children,
}: Props) {
  const pathname = usePathname() || '/';
  const onPage =
    match === 'exact' ? pathname === href : pathname.startsWith(href);

  const hasNumber = typeof notif === 'number' && notif > 0;
  const hasDot = notif === true;

  return (
    <Link
      href={href}
      aria-label={label}
      className={cn(
        'relative inline-flex items-center justify-center rounded-2xl p-2 transition',
        'bg-black/5 hover:bg-black/10 dark:bg-white/10 dark:hover:bg-white/15'
      )}
    >
      {/* Barre en bas quand actif */}
      {onPage && (
        <span className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 h-1 w-5 bg-primary rounded-full" />
      )}

      {/* Icône injectée depuis le parent (Server) */}
      {children}

      {/* Badge / dot notif */}
      {hasNumber && (
        <span className="absolute -top-1.5 -right-1.5 min-w-[18px] h-[18px] px-1 rounded-full text-[10px] leading-[18px] text-white bg-primary text-center shadow-lg">
          {notif > 99 ? '99+' : notif}
        </span>
      )}
      {hasDot && !hasNumber && (
        <span className="absolute top-1.5 right-1.5 h-2.5 w-2.5 bg-primary rounded-full ring-2 ring-white dark:ring-neutral-900 animate-pulse" />
      )}
    </Link>
  );
}
