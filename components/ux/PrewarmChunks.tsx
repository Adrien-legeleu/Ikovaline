'use client';

import { useEffect } from 'react';

/* Strict typings (no any, no ts-ignore) */
type IdleDeadline = { didTimeout: boolean; timeRemaining: () => number };
type IdleCallback = (deadline: IdleDeadline) => void;

type RICWindow = {
  requestIdleCallback?: (
    cb: IdleCallback,
    opts?: { timeout: number }
  ) => number;
  cancelIdleCallback?: (id: number) => void;
};

/* Safe helper */
function onIdle(cb: () => void): void {
  if (typeof window !== 'undefined') {
    const w = window as unknown as RICWindow;
    if (typeof w.requestIdleCallback === 'function') {
      w.requestIdleCallback(() => cb());
      return;
    }
  }
  // Fallback minimal
  setTimeout(cb, 1);
}

export default function PrewarmChunks() {
  useEffect(() => {
    const start = () =>
      onIdle(() => {
        const mem = (navigator as any).deviceMemory ?? 8;
        const net = (navigator as any).connection?.effectiveType ?? '4g';
        if (mem < 4 || /2g|3g/.test(net)) return; // skip préchauffe sur devices modestes        import('@/components/LandingPage/map/Map');
        import('@/components/LandingPage/review/Review');
        import('@/components/LandingPage/Blog/BlogLanding');
        import('@/components/LandingPage/CTAHome');
      });
    if (document.readyState === 'complete') start();
    else window.addEventListener('load', start, { once: true });
    return () => window.removeEventListener('load', start);
  }, []);

  return null;
}
