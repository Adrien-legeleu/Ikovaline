'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

/**
 * Force le scroll en haut sur chaque navigation.
 * - si hash (#id) → scroll vers l'élément (avec retries si rendu async)
 * - sinon → top:0
 * - désactive la restauration du navigateur (sinon ça recale la position précédente)
 */
export function ScrollManager() {
  const pathname = usePathname();

  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
  }, []);

  const scrollToHash = (maxRetries = 20) => {
    const hash = window.location.hash?.slice(1);
    if (!hash) return false;
    const el = document.getElementById(hash);
    if (el) {
      el.scrollIntoView({ block: 'start', behavior: 'smooth' });
      return true;
    }
    if (maxRetries > 0) {
      setTimeout(() => scrollToHash(maxRetries - 1), 50);
    }
    return false;
  };

  // à chaque changement de route → remonte
  useEffect(() => {
    const id = requestAnimationFrame(() => {
      if (window.location.hash) {
        scrollToHash();
      } else {
        window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
      }
    });
    return () => cancelAnimationFrame(id);
  }, [pathname]);

  // si le hash change sans changer de page
  useEffect(() => {
    const onHash = () => {
      if (!scrollToHash()) scrollToHash(10);
    };
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);

  return null;
}
