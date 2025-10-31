// components/ClientSpace/Dashboard/Countdown.tsx
'use client';
import { Bebas_Neue } from 'next/font/google';
const bebas = Bebas_Neue({ subsets: ['latin'], weight: '400' });

import { useEffect, useMemo, useState } from 'react';
import { cn } from '@/lib/utils';

type Props = {
  /** Nombre de jours à partir de maintenant (par défaut 10 jours) */
  days?: number;
  /** Ou bien une date cible précise (ignorer `days` si fourni) */
  targetAt?: string | Date;
  /** Classes utilitaires pour positionner/styler le bloc */
  className?: string;
  /** Taille en px (hauteur du texte), par défaut 40 */
  sizePx?: number;
};

export default function Countdown({
  days = 10,
  targetAt,
  className,
  sizePx = 40,
}: Props) {
  const target = useMemo(() => {
    if (targetAt) return new Date(targetAt).getTime();
    const d = new Date();
    d.setDate(d.getDate() + days);
    return d.getTime();
  }, [days, targetAt]);

  const [now, setNow] = useState<number>(() => Date.now());

  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);

  const remaining = Math.max(0, target - now);

  const { dd, hh, mm, ss } = useMemo(() => {
    const totalSec = Math.floor(remaining / 1000);
    const d = Math.floor(totalSec / (3600 * 24));
    const h = Math.floor((totalSec % (3600 * 24)) / 3600);
    const m = Math.floor((totalSec % 3600) / 60);
    const s = totalSec % 60;
    return {
      dd: String(d).padStart(2, '0'),
      hh: String(h).padStart(2, '0'),
      mm: String(m).padStart(2, '0'),
      ss: String(s).padStart(2, '0'),
    };
  }, [remaining]);

  const ended = remaining <= 0;

  return (
    <div
      className={cn(
        'select-none pointer-events-none',
        'rounded-2xl relative  backdrop-blur-[2px]',
        className
      )}
      aria-label="Compte à rebours nouvelles fonctionnalités"
    >
      <div
        className={cn(
          bebas.className,
          'text-white/95 flex items-center gap-2 tracking-[0.1em] drop-shadow-[0_4px_18px_rgba(0,0,0,0.45)]'
        )}
        style={{
          fontSize: `${sizePx * 2}px`, // un peu plus gros pour compenser
          lineHeight: 1,
          letterSpacing: '0.05em',
        }}
      >
        {ended ? (
          <span className="text-white/90">00:00:00:00</span>
        ) : (
          <>
            <TimeChunk value={dd} />
            <Colon />
            <TimeChunk value={hh} />
            <Colon />
            <TimeChunk value={mm} />
            <Colon />
            <TimeChunk value={ss} />
          </>
        )}
      </div>
    </div>
  );
}

function TimeChunk({ value }: { value: string }) {
  return <span className="tabular-nums font-bold tracking-tight">{value}</span>;
}

function Colon() {
  return <span className="opacity-90 font-bold">:</span>;
}
