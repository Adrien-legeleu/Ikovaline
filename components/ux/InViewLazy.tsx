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

    const el = ref.current;

    // Déclencheur de secours (const + type inféré number côté navigateur)
    const timeoutId = window.setTimeout(() => setShown(true), timeoutMs);

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            setShown(true);
            if (once) io.disconnect();
            window.clearTimeout(timeoutId);
            break;
          }
        }
      },
      { root: null, rootMargin, threshold: 0.01 }
    );

    io.observe(el);

    return () => {
      io.disconnect();
      window.clearTimeout(timeoutId);
    };
  }, [shown, rootMargin, once, timeoutMs]);

  return (
    <div
      ref={ref}
      style={{
        minHeight,
        // skip layout/paint tant que hors-écran
        contentVisibility: shown ? 'visible' : ('auto' as any),
        containIntrinsicSize:
          typeof minHeight === 'number'
            ? `${minHeight}px`
            : (minHeight as string),
      }}
    >
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
