'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useMemo } from 'react';
import { Check } from 'lucide-react';

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';

// ------- helpers URL / cookies -------
function setLocaleCookie(locale: 'fr' | 'en') {
  document.cookie = `NEXT_LOCALE=${locale}; path=/; max-age=31536000`;
}
function stripLocale(path: string) {
  const parts = path.split('/');
  if (parts[1] === 'fr' || parts[1] === 'en') parts.splice(1, 1);
  let out = parts.join('/');
  if (!out.startsWith('/')) out = '/' + out;
  return out.replace(/\/\/+/g, '/') || '/';
}
function withEnPrefix(path: string) {
  const parts = path.split('/');
  if (parts[1] === 'fr' || parts[1] === 'en') parts[1] = 'en';
  else parts.splice(1, 0, 'en');
  let out = parts.join('/');
  if (!out.startsWith('/')) out = '/' + out;
  return out.replace(/\/\/+/g, '/');
}

export default function LangSwitch() {
  const router = useRouter();
  const pathname = usePathname() || '/';

  // locale courante selon l'URL
  const current: 'fr' | 'en' = useMemo(
    () => (/^\/en(\/|$)/.test(pathname) ? 'en' : 'fr'),
    [pathname]
  );

  function switchTo(next: 'fr' | 'en') {
    if (next === current) return;
    setLocaleCookie(next);

    if (next === 'fr') {
      const target = stripLocale(pathname);
      window.location.assign(target); // hard reload → FR natif
      return;
    }

    // next === 'en'
    const target = withEnPrefix(pathname);
    router.push(target);
  }

  // pastille “glass” réutilisable
  const glass =
    'rounded-2xl border px-3 py-1 backdrop-blur-xl ' +
    'bg-white/50 dark:bg-white/10 ' +
    'border-white/60 dark:border-white/15 ' +
    'shadow-[0_10px_30px_rgba(6,24,44,.08)] dark:shadow-[0_10px_30px_rgba(0,0,0,.5)]';

  return (
    <>
      {/* Desktop / md+ : pastille FR · EN */}
      <div
        className={`hidden md:inline-flex items-center gap-2 ${glass}`}
        data-i18n="no"
      >
        <button
          onClick={() => switchTo('fr')}
          className={`transition ${
            current === 'fr' ? 'font-semibold' : 'opacity-60 hover:opacity-90'
          }`}
          aria-current={current === 'fr' ? 'true' : 'false'}
          data-i18n="no"
        >
          FR
        </button>
        <span className="opacity-40" data-i18n="no">
          ·
        </span>
        <button
          onClick={() => switchTo('en')}
          className={`transition ${
            current === 'en' ? 'font-semibold' : 'opacity-60 hover:opacity-90'
          }`}
          aria-current={current === 'en' ? 'true' : 'false'}
          data-i18n="no"
        >
          EN
        </button>
      </div>

      {/* Mobile / < md : dropdown shadcn */}
      <DropdownMenu>
        <DropdownMenuTrigger
          className={`md:hidden inline-flex items-center gap-2 border border-black/15 ${glass}`}
          aria-label="Change language"
          data-i18n="no"
        >
          <span className="text-sm" data-i18n="no">
            {current === 'fr' ? 'FR' : 'EN'}
          </span>
        </DropdownMenuTrigger>

        <DropdownMenuContent
          align="end"
          sideOffset={8}
          className="min-w-[180px] rounded-3xl backdrop-blur-xl bg-white/70 dark:bg-zinc-900/70 border-white/60 dark:border-white/15"
          data-i18n="no"
        >
          <DropdownMenuLabel>Language</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => switchTo('fr')} data-i18n="no">
            <span className="flex items-center gap-2" data-i18n="no">
              <span className="font-medium" data-i18n="no">
                Français
              </span>
              {current === 'fr' && <Check className="ml-auto h-4 w-4" />}
            </span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => switchTo('en')} data-i18n="no">
            <span className="flex items-center gap-2" data-i18n="no">
              <span className="font-medium" data-i18n="no">
                English
              </span>
              {current === 'en' && <Check className="ml-auto h-4 w-4" />}
            </span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
