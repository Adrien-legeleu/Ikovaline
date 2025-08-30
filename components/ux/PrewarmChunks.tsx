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
    onIdle(() => {
      // Prefetch des bundles lourds (non bloquant)
      import('@/components/LandingPage/map/Map');
      import('@/components/LandingPage/review/Review');
      import('@/components/LandingPage/Blog/BlogLanding');
      import('@/components/LandingPage/CTAHome');
    });
  }, []);

  return null;
}
