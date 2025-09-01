'use client';

import { useEffect, useRef } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

/**
 * Force la position de scroll après chaque navigation.
 * - "forceScrollTop" via sessionStorage (déclenché par le Drawer)
 * - si hash (#id) => scroll vers l'ancre (avec retry DOM)
 * - sinon => top
 * - attend un petit délai pour laisser le Drawer relâcher le body-lock sur mobile
 */
export function ScrollManager() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const lastKey = useRef<string>('');

  // désactiver la restauration native du navigateur
  useEffect(() => {
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
      const onBeforeUnload = () => {
        history.scrollRestoration = 'auto';
      };
      window.addEventListener('beforeunload', onBeforeUnload);
      return () => window.removeEventListener('beforeunload', onBeforeUnload);
    }
  }, []);

  useEffect(() => {
    const keyNow = `${pathname}?${searchParams?.toString() || ''}`;
    if (keyNow === lastKey.current) return;
    lastKey.current = keyNow;

    const run = () => {
      const forceTop = sessionStorage.getItem('forceScrollTop') === '1';
      const hash = window.location.hash;

      const scrollTopNow = () => {
        // double raf + setTimeout = passe bien sur iOS après overlay/lock
        window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
        requestAnimationFrame(() => {
          window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
        });
        setTimeout(() => {
          window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
        }, 60);
      };

      if (forceTop) {
        sessionStorage.removeItem('forceScrollTop');
        scrollTopNow();
        return;
      }

      if (hash && hash.length > 1) {
        const id = decodeURIComponent(hash.slice(1));
        let tries = 0;
        const tryScroll = () => {
          const el = document.getElementById(id);
          if (el) {
            el.scrollIntoView({ behavior: 'smooth', block: 'start' });
          } else if (tries++ < 12) {
            requestAnimationFrame(tryScroll);
          }
        };
        requestAnimationFrame(tryScroll);
        return;
      }

      scrollTopNow();
    };

    // important: laisser 80ms pour que le Drawer ait fini de rendre/relâcher
    const t = setTimeout(() => requestAnimationFrame(run), 80);
    return () => clearTimeout(t);
  }, [pathname, searchParams]);

  return null;
}
