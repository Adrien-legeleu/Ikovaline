'use client';

import { useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

/**
 * Force scroll top on chaque navigation.
 * - si URL contient un #hash → scroll jusqu’à l’élément (avec retries si lazy/dynamic)
 * - sinon → scroll tout en haut.
 * - désactive la restauration de scroll native (qui peut remettre l’ancienne position)
 */
export function ScrollManager() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // 1) désactiver la restauration du navigateur (sinon ça “recale” le scroll)
  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
  }, []);

  // helper pour scroller sur un hash (avec retry si l’élément arrive plus tard)
  function scrollToHash(maxRetries = 20) {
    const hash = window.location.hash?.slice(1);
    if (!hash) return false;
    const el = document.getElementById(hash);
    if (el) {
      // si tu as un header fixe, ajoute un offset ici
      el.scrollIntoView({ block: 'start', behavior: 'smooth' });
      return true;
    }
    if (maxRetries > 0) {
      // retente après un court délai (pour le DOM async/dynamic)
      setTimeout(() => scrollToHash(maxRetries - 1), 50);
    }
    return false;
  }

  // 2) à chaque changement de route / query → on scrolle
  useEffect(() => {
    // laisser Next peindre la nouvelle page d’abord
    const id = requestAnimationFrame(() => {
      if (window.location.hash) {
        // si hash : on tente de scroller dessus (avec retry si nécessaire)
        scrollToHash();
      } else {
        window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
      }
    });
    return () => cancelAnimationFrame(id);
  }, [pathname, searchParams]);

  // 3) si hash change sans changer de route (ex: /page#faq → /page#autre)
  useEffect(() => {
    const onHashChange = () => {
      // on essaye directement, puis on re-tente un peu
      if (!scrollToHash()) scrollToHash(10);
    };
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  return null;
}
