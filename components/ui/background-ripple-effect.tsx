// app/(site)/components/BackgroundRippleEffect.tsx
'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

type Props = {
  cellSize?: number;
  className?: string;
};

export default function BackgroundRippleEffect({
  cellSize = 56,
  className,
}: Props) {
  const rootRef = useRef<HTMLDivElement>(null);
  const [dims, setDims] = useState<{ w: number; h: number }>({ w: 0, h: 0 });
  const [isDark, setIsDark] = useState<boolean>(false);

  // Dark mode (classe html.dark ou prefers-color-scheme)
  useEffect(() => {
    if (typeof document === 'undefined') return;
    const root = document.documentElement;
    const sync = () => setIsDark(root.classList.contains('dark'));
    sync();
    const obs = new MutationObserver(sync);
    obs.observe(root, { attributes: true, attributeFilter: ['class'] });
    const mq = window.matchMedia?.('(prefers-color-scheme: dark)');
    const onMQ = () =>
      !root.classList.contains('dark') && setIsDark(!!mq?.matches);
    mq?.addEventListener?.('change', onMQ);
    return () => {
      obs.disconnect();
      mq?.removeEventListener?.('change', onMQ);
    };
  }, []);

  // Mesure la taille du parent (auto-fit)
  useEffect(() => {
    const parent = rootRef.current?.parentElement;
    if (!parent) return;
    const ro = new ResizeObserver((entries) => {
      const r = entries[0]?.contentRect;
      if (r) setDims({ w: Math.ceil(r.width), h: Math.ceil(r.height) });
    });
    ro.observe(parent);
    return () => ro.disconnect();
  }, []);

  const cols = Math.max(1, Math.ceil(dims.w / cellSize));
  const rows = Math.max(1, Math.ceil(dims.h / cellSize));
  const gridW = cols * cellSize;
  const gridH = rows * cellSize;

  return (
    <div
      ref={rootRef}
      className={cn(
        'absolute inset-0 z-0 pointer-events-none overflow-hidden select-none',
        '[--cell-border-color:rgba(0,0,0,0.05)] [--cell-fill-color:transparent]',
        'dark:[--cell-border-color:rgba(255,255,255,0.1)] dark:[--cell-fill-color:transparent]',
        className
      )}
      aria-hidden
    >
      {/* léger vignettage (statique) */}
      <div
        className="absolute inset-0"
        style={{
          WebkitMaskImage:
            'radial-gradient(1200px 700px at 20% -10%, #000 40%, transparent 70%), radial-gradient(1000px 700px at 100% 0%, #000 30%, transparent 75%), linear-gradient(#000,#000), linear-gradient(#000,#000), linear-gradient(#000,#000), linear-gradient(#000,#000)',
          maskImage:
            'radial-gradient(1200px 700px at 20% -10%, #000 40%, transparent 70%), radial-gradient(1000px 700px at 100% 0%, #000 30%, transparent 75%), linear-gradient(#000,#000), linear-gradient(#000,#000), linear-gradient(#000,#000), linear-gradient(#000,#000)',
          WebkitMaskComposite:
            'source-over,source-over,exclude,exclude,exclude,exclude',
          WebkitMaskPosition: '0 0,0 0,left top,right top,left top,left bottom',
          WebkitMaskSize: 'auto,auto,100% 6%,100% 6%,5% 100%,5% 100%',
          WebkitMaskRepeat: 'no-repeat',
          background: isDark
            ? 'radial-gradient(1000px 500px at 35% -10%, rgba(255,255,255,0.08), transparent 60%)'
            : 'radial-gradient(1000px 500px at 35% -10%, rgba(255,255,255,0.9), transparent 60%)',
        }}
      />

      {/* Grille statique (aucune animation) */}
      <div className="relative mx-auto" style={{ width: gridW, height: gridH }}>
        <Grid rows={rows} cols={cols} cellSize={cellSize} />
      </div>

      {/* styles locaux minimalistes */}
      <style jsx global>{`
        .rip-cell {
          opacity: 0.7;
          background-clip: padding-box;
        }
        :root.dark .rip-cell {
          opacity: 0.6;
        }
      `}</style>
    </div>
  );
}

function Grid({
  rows,
  cols,
  cellSize,
}: {
  rows: number;
  cols: number;
  cellSize: number;
}) {
  const cells = useMemo<number[]>(
    () => Array.from({ length: rows * cols }, (_, i) => i),
    [rows, cols]
  );

  const styleGrid: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: `repeat(${cols}, ${cellSize}px)`,
    gridTemplateRows: `repeat(${rows}, ${cellSize}px)`,
    width: cols * cellSize,
    height: rows * cellSize,
    marginInline: 'auto',
  };

  return (
    <div className="relative" style={styleGrid}>
      {cells.map((idx) => (
        <div
          key={idx}
          className="rip-cell relative border-[1px]"
          style={{
            borderColor: 'var(--cell-border-color)',
            backgroundColor: 'var(--cell-fill-color)',
          }}
        />
      ))}
    </div>
  );
}
