// app/(site)/components/BackgroundRippleEffect.tsx
'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

type Props = {
  cellSize?: number;
  ripple?: string; // couleur onde (clair)
  rippleEnd?: string; // fin d’onde (clair)
  className?: string;
};

type ClickedCell = { row: number; col: number } | null;

type CSSVars = React.CSSProperties & {
  ['--ripple']?: string;
  ['--ripple-end']?: string;
};

export default function BackgroundRippleEffect({
  cellSize = 56,
  ripple = 'rgba(44,183,255,0.04)', // bleu subtil (clair)
  rippleEnd = 'rgba(44,183,255,0)',
  className,
}: Props) {
  const rootRef = useRef<HTMLDivElement>(null);
  const [dims, setDims] = useState<{ w: number; h: number }>({ w: 0, h: 0 });
  const [clicked, setClicked] = useState<ClickedCell>(null);
  const [rev, setRev] = useState<number>(0);

  // ——— Thème (dark) détecté via la classe <html class="dark"> ———
  const [isDark, setIsDark] = useState<boolean>(false);
  useEffect(() => {
    if (typeof document === 'undefined') return;
    const root = document.documentElement;

    const sync = () => setIsDark(root.classList.contains('dark'));
    sync();

    const obs = new MutationObserver(sync);
    obs.observe(root, { attributes: true, attributeFilter: ['class'] });

    const mq = window.matchMedia?.('(prefers-color-scheme: dark)');
    const onMQ = () => {
      if (!root.classList.contains('dark')) setIsDark(!!mq?.matches);
    };
    mq?.addEventListener?.('change', onMQ);

    return () => {
      obs.disconnect();
      mq?.removeEventListener?.('change', onMQ);
    };
  }, []);

  // Couleurs adaptées au dark mode
  const rippleDark = 'rgba(44,183,255,0.02)';
  const rippleEndDark = 'rgba(44,183,255,0)';

  // 1) Mesure la taille du parent (la section) → grille auto-fit
  useEffect(() => {
    const parent = rootRef.current?.parentElement;
    if (!parent) return;

    const ro = new ResizeObserver((entries) => {
      const r = entries[0]?.contentRect;
      if (!r) return;
      setDims({ w: Math.ceil(r.width), h: Math.ceil(r.height) });
    });
    ro.observe(parent);

    return () => ro.disconnect();
  }, []);

  // 2) Écoute les clics du parent en "capture" → ne bloque rien
  useEffect(() => {
    const parent = rootRef.current?.parentElement;
    if (!parent) return;

    const onClick = (ev: MouseEvent) => {
      const host = rootRef.current;
      if (!host) return;

      const rect = host.getBoundingClientRect();
      const x = ev.clientX - rect.left;
      const y = ev.clientY - rect.top;
      if (x < 0 || y < 0 || x > rect.width || y > rect.height) return;

      const col = Math.max(
        0,
        Math.min(Math.floor(x / cellSize), Math.ceil(rect.width / cellSize) - 1)
      );
      const row = Math.max(
        0,
        Math.min(
          Math.floor(y / cellSize),
          Math.ceil(rect.height / cellSize) - 1
        )
      );

      requestAnimationFrame(() => {
        setClicked({ row, col });
        setRev((n) => n + 1);
      });
    };

    const opts: AddEventListenerOptions = { capture: true, passive: true };
    parent.addEventListener('click', onClick, opts);

    // removeEventListener accepte EventListenerOptions|boolean — on réutilise le même objet (typé)
    return () => parent.removeEventListener('click', onClick, opts);
  }, [cellSize]);

  const cols = Math.max(1, Math.ceil(dims.w / cellSize));
  const rows = Math.max(1, Math.ceil(dims.h / cellSize));
  const gridW = cols * cellSize;
  const gridH = rows * cellSize;

  const styleVars: CSSVars = {
    ['--ripple']: isDark ? rippleDark : ripple,
    ['--ripple-end']: isDark ? rippleEndDark : rippleEnd,
  };

  return (
    <div
      ref={rootRef}
      className={cn(
        'absolute inset-0 z-0 pointer-events-none overflow-hidden select-none',
        // variables (bord & fond de cellule)
        '[--cell-border-color:rgba(0,0,0,0.04)] [--cell-fill-color:transparent]',
        'dark:[--cell-border-color:rgba(255,255,255,0.08)] dark:[--cell-fill-color:transparent]',
        className
      )}
      style={styleVars}
      aria-hidden
    >
      {/* Vignette/mask — teinte adoucie en dark */}
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
            ? 'radial-gradient(1000px 500px at 35% -10%, rgba(255,255,255,0.12), transparent 60%)'
            : 'radial-gradient(1000px 500px at 35% -10%, rgba(255,255,255,0.9), transparent 60%)',
        }}
      />

      {/* Grille */}
      <div className="relative mx-auto" style={{ width: gridW, height: gridH }}>
        <Grid
          key={`${rows}-${cols}-${rev}`}
          rows={rows}
          cols={cols}
          cellSize={cellSize}
          borderColor="var(--cell-border-color)"
          fillColor="var(--cell-fill-color)"
          clickedCell={clicked}
        />
      </div>

      {/* styles locaux (hover + ripple) */}
      <style jsx global>{`
        .rip-cell {
          transition:
            opacity 150ms,
            transform 150ms,
            box-shadow 150ms,
            background-color 150ms;
          will-change: transform, box-shadow, background-color, opacity;
          opacity: 0.7;
          background-clip: padding-box;
        }
        .rip-cell:hover {
          opacity: 0.95;
          box-shadow: inset 0 0 60px 2px rgba(255, 255, 255, 0.45);
          background-color: rgba(255, 255, 255, 0.22);
        }
        /* Dark overrides */
        :root.dark .rip-cell {
          opacity: 0.6;
        }
        :root.dark .rip-cell:hover {
          opacity: 0.9;
          box-shadow: inset 0 0 60px 2px rgba(255, 255, 255, 0.12);
          background-color: rgba(255, 255, 255, 0.06);
        }
        @keyframes ripple-wave {
          0% {
            transform: scale(0.985);
            background-color: transparent;
            box-shadow: inset 0 0 0 0 rgba(255, 255, 255, 0);
          }
          45% {
            transform: scale(1);
            background-color: var(--ripple);
            box-shadow: inset 0 0 60px 2px var(--ripple);
          }
          100% {
            transform: scale(1);
            background-color: var(--ripple-end);
            box-shadow: inset 0 0 0 0 rgba(255, 255, 255, 0);
          }
        }
      `}</style>
    </div>
  );
}

function Grid({
  rows,
  cols,
  cellSize,
  borderColor,
  fillColor,
  clickedCell,
}: {
  rows: number;
  cols: number;
  cellSize: number;
  borderColor: string;
  fillColor: string;
  clickedCell: ClickedCell;
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
      {cells.map((idx) => {
        const r = Math.floor(idx / cols);
        const c = idx % cols;

        let anim: React.CSSProperties = {};
        if (clickedCell) {
          const dist = Math.hypot(clickedCell.row - r, clickedCell.col - c);
          const delay = Math.round(dist * 70);
          const duration = 320 + Math.round(dist * 110);
          anim = {
            animationName: 'ripple-wave',
            animationDelay: `${delay}ms`,
            animationDuration: `${duration}ms`,
            animationTimingFunction: 'cubic-bezier(.22,1,.36,1)',
            animationFillMode: 'both',
          };
        }

        return (
          <div
            key={idx}
            className="rip-cell relative border-[0.5px]"
            style={{ borderColor, backgroundColor: fillColor, ...anim }}
          />
        );
      })}
    </div>
  );
}
