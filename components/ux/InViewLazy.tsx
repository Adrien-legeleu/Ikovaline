// components/ux/InViewLazy.tsx
'use client';
import { useEffect, useRef, useState } from 'react';

export default function InViewLazy({
  children,
  rootMargin = '200px',
  once = true,
}: {
  children: React.ReactNode;
  rootMargin?: string;
  once?: boolean;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    if (!ref.current || shown) return;
    const io = new IntersectionObserver(
      (entries) => {
        const hit = entries.some((e) => e.isIntersecting);
        if (hit) {
          setShown(true);
          if (once) io.disconnect();
        }
      },
      { root: null, rootMargin, threshold: 0.01 }
    );
    io.observe(ref.current);
    return () => io.disconnect();
  }, [shown, rootMargin, once]);

  return <div ref={ref}>{shown ? children : null}</div>;
}
