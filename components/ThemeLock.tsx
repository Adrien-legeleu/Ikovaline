'use client';

import { useEffect } from 'react';

/**
 * Bloque le dark mode pour une section précise.
 * Supprime la classe "dark" de <html> et la remet quand on quitte la page.
 */
export function ThemeLockLight() {
  useEffect(() => {
    const html = document.documentElement;

    // on mémorise l'état initial
    const hadDark = html.classList.contains('dark');

    // on force le light
    html.classList.remove('dark');
    html.style.colorScheme = 'light';

    // empêche le ThemeProvider de réappliquer dark
    localStorage.setItem('theme', 'light');

    // cleanup quand on quitte cette zone
    return () => {
      if (hadDark) {
        html.classList.add('dark');
        html.style.colorScheme = 'dark';
        localStorage.setItem('theme', 'dark');
      }
    };
  }, []);

  return null;
}
