'use client';

import { useEffect } from 'react';

// Polyfill requestIdleCallback (Safari/old)
function onIdle(cb: () => void) {
  // @ts-ignore
  const ric =
    typeof window !== 'undefined' && (window.requestIdleCallback as any);
  if (ric) return ric(cb);
  return setTimeout(cb, 1);
}

export default function PrewarmChunks() {
  useEffect(() => {
    onIdle(() => {
      // Prefetch heavy, below-the-fold bundles (non-blocking)
      import('@/components/LandingPage/map/Map');
      import('@/components/LandingPage/review/Review');
      import('@/components/LandingPage/Blog/BlogLanding');
      import('@/components/LandingPage/CTAHome');
    });
  }, []);

  // no UI
  return null;
}
