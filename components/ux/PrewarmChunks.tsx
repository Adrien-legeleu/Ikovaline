'use client';

import { useEffect } from 'react';

/* ---------- Typages IdleCallback ---------- */
type IdleDeadline = { didTimeout: boolean; timeRemaining: () => number };
type IdleCallback = (deadline: IdleDeadline) => void;

type IdleWindow = {
  requestIdleCallback?: (
    cb: IdleCallback,
    opts?: { timeout: number }
  ) => number;
  cancelIdleCallback?: (id: number) => void;
};

/* ---------- Typages Navigator ---------- */
interface NavigatorWithMemory extends Navigator {
  deviceMemory?: number;
  connection?: { effectiveType?: string };
}

/* ---------- Safe helper ---------- */
function onIdle(cb: () => void): void {
  if (typeof window !== 'undefined') {
    const w = window as unknown as IdleWindow;
    if (typeof w.requestIdleCallback === 'function') {
      w.requestIdleCallback(() => cb());
      return;
    }
  }
  // Fallback minimal si pas de requestIdleCallback
  window.setTimeout(cb, 1);
}

export default function PrewarmChunks() {
  useEffect(() => {
    const start = () =>
      onIdle(() => {
        const nav = navigator as NavigatorWithMemory;
        const mem = nav.deviceMemory ?? 8;
        const net = nav.connection?.effectiveType ?? '4g';

        if (mem < 4 || /2g|3g/.test(net)) return;

        void import('@/components/LandingPage/map/Map');
        void import('@/components/LandingPage/review/Review');
        void import('@/components/LandingPage/Blog/BlogLanding');
        void import('@/components/LandingPage/CTAHome');
      });

    if (document.readyState === 'complete') {
      start();
    } else {
      window.addEventListener('load', start, { once: true });
    }

    return () => window.removeEventListener('load', start);
  }, []);

  return null;
}
