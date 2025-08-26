'use client';

import React from 'react';
import { cn } from '@/lib/utils';

export default function LightBackdrop({ className }: { className?: string }) {
  return (
    <div className={cn('absolute inset-0 -z-10  overflow-visible', className)}>
      {/* Halo turquoise/bleu de fond */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(500px 350px at 30% 30%, rgba(71,234,224,0.7), transparent 80%),
            radial-gradient(500px 350px at 70% 70%, rgba(59,130,246,0.65), transparent 80%)
          `,
          mixBlendMode: 'screen',
        }}
      />

      {/* Première diagonale (centrée, diffuse) */}
      <div className="absolute inset-x-0 top-0 flex items-center justify-center">
        <div
          className="w-[140%] h-48 rotate-[32deg]"
          style={{
            background:
              'linear-gradient(to left, rgba(0,190,255,0.9), rgba(71,234,224,0.85))',
            filter: 'blur(120px)',
            borderRadius: '9999px',
          }}
        />
      </div>

      {/* Deuxième diagonale (parallèle, décalée plus bas) */}
      <div className="absolute inset-x-0 top-1/2 flex items-center justify-center">
        <div
          className="w-[140%] h-48 rotate-[32deg] translate-y-48"
          style={{
            background:
              'linear-gradient(to left, rgba(0,190,255,0.9), rgba(71,234,224,0.85))',
            filter: 'blur(150px)',
            borderRadius: '9999px',
          }}
        />
      </div>

      {/* Grain subtil */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            'radial-gradient(rgba(0,0,0,0.03) 1px, transparent 1px)',
          backgroundSize: '2px 2px',
        }}
      />
    </div>
  );
}
