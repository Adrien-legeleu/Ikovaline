'use client';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

export function useScrollTopOnPathChange() {
  const pathname = usePathname();

  useEffect(() => {
    const scrollTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

    // scroll quand le path change
    scrollTop();

    // scroll aussi quand le hash change
    window.addEventListener('hashchange', scrollTop);

    return () => {
      window.removeEventListener('hashchange', scrollTop);
    };
  }, [pathname]);
}
