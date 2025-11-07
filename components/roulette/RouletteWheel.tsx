// components/roulette/RouletteWheel.tsx
'use client';

import { useEffect, useMemo, useRef } from 'react';

type Weight = { seg: number; label: string; pct: number };

export function RouletteWheel({
  weights,
  targetSeg, // segment gagnant (1..8) -> or null (avant tirage)
  spinning,
}: {
  weights: Weight[];
  targetSeg: number | null;
  spinning: boolean;
}) {
  const wheelRef = useRef<HTMLDivElement | null>(null);

  // mapping visuel : 8 secteurs de 45°
  const segAngles = useMemo(
    () =>
      Array.from({ length: 8 }, (_, i) => ({
        seg: i + 1,
        start: i * 45,
        center: i * 45 + 22.5,
      })),
    []
  );

  // anime la roue quand targetSeg change
  useEffect(() => {
    const wheel = wheelRef.current;
    if (!wheel || !targetSeg) return;

    const index = targetSeg - 1;
    const degPerSeg = 360 / 8;
    // 4 tours complets + centre du segment choisi, aiguille en haut
    const stopDeg = 360 * 4 + index * degPerSeg + degPerSeg / 2;

    // reset avant anim si besoin
    wheel.style.transition = 'none';
    wheel.style.transform = `rotate(0deg)`;
    // petit rafraîchissement
    requestAnimationFrame(() => {
      wheel.style.transition = 'transform 3.7s cubic-bezier(.15,.9,.2,1)';
      wheel.style.transform = `rotate(${stopDeg}deg)`;
    });
  }, [targetSeg]);

  return (
    <div className="relative">
      {/* Aiguille */}
      <div
        aria-hidden
        className="absolute -top-4 left-1/2 -translate-x-1/2 z-20 w-0 h-0"
        style={{
          borderLeft: '10px solid transparent',
          borderRight: '10px solid transparent',
          borderBottom: '16px solid currentColor',
        }}
      />

      {/* Roue */}
      <div
        ref={wheelRef}
        className={[
          'w-80 h-80 rounded-full border-[10px]',
          'border-zinc-200/60 dark:border-zinc-800',
          'shadow-[inset_0_10px_40px_rgba(0,0,0,.25),0_10px_30px_rgba(0,0,0,.25)]',
          'relative overflow-hidden',
        ].join(' ')}
        style={
          {
            background:
              'conic-gradient(var(--segA) 0deg, var(--segA) 45deg, var(--segB) 45deg, var(--segB) 90deg, var(--segA) 90deg, var(--segA) 135deg, var(--segB) 135deg, var(--segB) 180deg, var(--segA) 180deg, var(--segA) 225deg, var(--segB) 225deg, var(--segB) 270deg, var(--segA) 270deg, var(--segA) 315deg, var(--segB) 315deg, var(--segB) 360deg)',
            // teintes light/dark subtiles
            // segA/segB alternés pour effet horlogerie
            // @ts-ignore
            '--segA':
              'color-mix(in srgb, var(--ringColor, #dfe6ee) 82%, transparent)',
            '--segB':
              'color-mix(in srgb, var(--ringColor, #cfd8e3) 72%, transparent)',
          } as React.CSSProperties
        }
      >
        {/* anneau interne "verre" */}
        <div className="absolute inset-0 grid place-items-center">
          <div className="w-[86%] h-[86%] rounded-full bg-white/40 dark:bg-white/5 border border-black/5 dark:border-white/10 backdrop-blur-[1.5px] relative">
            {/* Libellés par segment */}
            {segAngles.map(({ seg, center }) => {
              const w = weights.find((x) => x.seg === seg);
              const label = w?.label ?? `Seg ${seg}`;
              return (
                <div
                  key={seg}
                  className="absolute left-1/2 top-1/2 origin-[0px_0px] text-[11px] md:text-[12px] text-zinc-800 dark:text-zinc-200"
                  style={{
                    transform: `rotate(${center}deg) translate(0, -36%)`,
                  }}
                >
                  <div
                    className="px-2 py-1 rounded-lg bg-white/70 dark:bg-black/40 border border-black/5 dark:border-white/10 shadow-sm"
                    style={{ transform: `rotate(${-center}deg)` }}
                  >
                    {label}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* micro-légende */}
      <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-xs text-zinc-500 dark:text-zinc-400">
        {spinning ? 'Rotation...' : 'Aiguille = résultat'}
      </div>
    </div>
  );
}
