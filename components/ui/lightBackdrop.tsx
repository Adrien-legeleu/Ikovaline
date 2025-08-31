'use client';

import React from 'react';
import { cn } from '@/lib/utils';

export default function LightBackdrop({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        'absolute inset-0 -z-10 isolate overflow-visible',
        className
      )}
    >
      {/* Halos bleus purs */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          // Bleu pur uniquement (HSL 205–210) + opacités maîtrisées
          background: [
            'radial-gradient(900px 520px at 50% 18%, hsl(210 100% 62% / 0.28), transparent 75%)',
            'radial-gradient(1400px 700px at 50% 62%, hsl(207 100% 60% / 0.18), transparent 80%)',
          ].join(','),
          // mélange confiné grâce à "isolate" sur le parent
          mixBlendMode: 'screen',
        }}
      />

      {/* Première diagonale (beam) */}
      <div className="absolute inset-x-0 top-0 flex items-center justify-center">
        <div
          className="w-[140%] h-48 rotate-[32deg]"
          style={{
            background:
              'linear-gradient(90deg, hsl(210 100% 66% / 0.85), hsl(205 100% 64% / 0.85))',
            filter: 'blur(120px)',
            borderRadius: '9999px',
          }}
        />
      </div>

      {/* Deuxième diagonale (beam) */}
      <div className="absolute inset-x-0 top-1/3 flex items-center justify-center">
        <div
          className="w-[140%] h-48 rotate-[32deg] translate-y-48"
          style={{
            background:
              'linear-gradient(90deg, hsl(210 100% 66% / 0.85), hsl(205 100% 64% / 0.85))',
            filter: 'blur(150px)',
            borderRadius: '9999px',
          }}
        />
      </div>

      {/* Grain subtil (inchangé) */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage:
            'radial-gradient(rgba(0,0,0,0.03) 1px, transparent 1px)',
          backgroundSize: '2px 2px',
        }}
      />
    </div>
  );
}
