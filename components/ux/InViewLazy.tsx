'use client';
import { useEffect, useRef, useState } from 'react';

type Props = {
  children: React.ReactNode;
  /** zone d’amorçage (px/%) */
  rootMargin?: string;
  /** fixe la hauteur pour éviter les sauts de layout */
  minHeight?: number | string;
  /** rendu provisoire (squelette léger) */
  placeholder?: React.ReactNode;
  /** afficher une fois ou ré-observer */
  once?: boolean;
  /** secours si l’IO ne déclenche pas (Safari offscreen, etc.) */
  timeoutMs?: number;
};

export default function InViewLazy({
  children,
  rootMargin = '1200px',
  minHeight = 420,
  placeholder,
  once = true,
  timeoutMs = 2500,
}: Props) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    if (shown || !ref.current) return;

    let timeout: any;
    const el = ref.current;

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            setShown(true);
            if (once) io.disconnect();
            clearTimeout(timeout);
            break;
          }
        }
      },
      { root: null, rootMargin, threshold: 0.01 }
    );

    io.observe(el);

    // Secours: si l’IO ne “tire” pas, on affiche quand même après X ms
    timeout = setTimeout(() => setShown(true), timeoutMs);

    return () => {
      io.disconnect();
      clearTimeout(timeout);
    };
  }, [shown, rootMargin, once, timeoutMs]);

  return (
    <div ref={ref} style={{ minHeight }}>
      {shown
        ? children
        : (placeholder ?? <DefaultSkeleton height={minHeight} />)}
    </div>
  );
}

function DefaultSkeleton({ height }: { height: number | string }) {
  return (
    <div
      className="animate-pulse rounded-3xl"
      style={{
        height,
        background:
          'linear-gradient(90deg, rgba(2,132,199,.10), rgba(59,130,246,.08), rgba(2,132,199,.10))',
      }}
      aria-hidden
    />
  );
}
