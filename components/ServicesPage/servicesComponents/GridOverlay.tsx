'use client';

import { useId } from 'react';

export const GridOverlay = ({ size }: { size?: number }) => {
  const patternId = useId();
  const gridSize = size ?? 20;

  // quelques carrés “remplis” pour donner un look dashboard
  const randomSquares: [number, number][] = Array.from({ length: 5 }, () => [
    Math.floor(Math.random() * 4) + 7,
    Math.floor(Math.random() * 6) + 1,
  ]);

  return (
    <div className="pointer-events-none absolute inset-0 -z-10">
      {/* Film coloré bleu (light/dark) + mask radial */}
      <div
        className="absolute inset-0 opacity-95
                   bg-gradient-to-r from-[#E6F8FE]/60 to-[#DDEBFF]/60
                   dark:from-[#0B1118]/60 dark:to-[#0B1118]/60
                   [mask-image:radial-gradient(farthest-side_at_top,white,transparent)]"
      />

      <svg
        aria-hidden="true"
        className="absolute inset-0 h-full w-full
                   mix-blend-overlay
                   stroke-black/10 fill-black/10
                   dark:stroke-white/10 dark:fill-white/10"
      >
        <defs>
          <pattern
            id={patternId}
            width={gridSize}
            height={gridSize}
            patternUnits="userSpaceOnUse"
          >
            {/* lignes de grille */}
            <path d={`M.5 ${gridSize}V.5H${gridSize}`} fill="none" />
          </pattern>
        </defs>

        {/* grille */}
        <rect width="100%" height="100%" fill={`url(#${patternId})`} />

        {/* carrés accent bleus (très subtils) */}
        <svg x="0" y="0" className="overflow-visible">
          {randomSquares.map(([x, y]) => (
            <rect
              key={`${x}-${y}`}
              width={gridSize + 1}
              height={gridSize + 1}
              x={x * gridSize}
              y={y * gridSize}
              className="fill-[#00A8E8]/12 dark:fill-[#00A8E8]/14"
              strokeWidth="0"
            />
          ))}
        </svg>
      </svg>

      {/* léger glow en bas */}
      <span
        className="absolute bottom-4 left-1/2 h-20 w-2/3 -translate-x-1/2 rounded-full blur-3xl
                       bg-[radial-gradient(ellipse_at_center,rgba(0,168,232,.25),rgba(37,99,235,.18),transparent_70%)]"
      />
    </div>
  );
};
