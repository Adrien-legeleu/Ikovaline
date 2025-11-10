// file: components/roulette/AllocationPanel.tsx
'use client';

import { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { computeWeights, sumPoints } from '@/lib/roulette/calc';
import {
  SEGMENTS,
  segmentShortLabel,
  describeRule,
} from '@/lib/roulette/segments';
import { Info } from 'lucide-react';

type Alloc = { seg: number; points: number };
type Conv = { seg: number; label: string; point_factor_pct: number };

type Props = {
  email: string;
  wallet: number; // **nécessaire** pour les caps
  initialAllocation: Alloc[]; // 8 lignes (1..8)
  conversion: Conv[]; // 8 lignes (1..8) avec les facteurs demandés
  onSaved?: (weights: { seg: number; label: string; pct: number }[]) => void;
};

export function AllocationPanel({
  email,
  wallet,
  initialAllocation,
  conversion,
  onSaved,
}: Props) {
  const [alloc, setAlloc] = useState<Alloc[]>(initialAllocation);

  const total = useMemo(() => sumPoints(alloc), [alloc]);
  const weights = useMemo(
    () => computeWeights(alloc, conversion, wallet),
    [alloc, conversion, wallet]
  );
  const valid = total === wallet;

  const convMap = useMemo(
    () => new Map(conversion.map((c) => [c.seg, c])),
    [conversion]
  );

  const setValue = (seg: number, newPoints: number) => {
    setAlloc((prev) =>
      prev.map((r) =>
        r.seg === seg ? { ...r, points: Math.max(0, Math.floor(newPoints)) } : r
      )
    );
  };

  const save = async () => {
    if (!valid) return;
    const res = await fetch('/api/roulette/allocation', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ email, allocation: alloc }),
    });
    const data = await res.json();
    if (data?.ok && data?.weights && onSaved) onSaved(data.weights);
  };

  return (
    <section
      className="rounded-[2rem] bg-white/90 dark:bg-neutral-900/90 backdrop-blur-xl p-6 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.12)] border border-black/5 dark:border-white/10"
      aria-labelledby="alloc-title"
    >
      <header className="flex items-baseline justify-between mb-5">
        <h3 id="alloc-title" className="font-semibold text-base">
          Répartition de vos points
        </h3>
        <p className="text-xs text-neutral-500 dark:text-neutral-400">
          Wallet&nbsp;:&nbsp;
          <span className="font-semibold tabular-nums">{wallet}</span>
          &nbsp;•&nbsp;Total&nbsp;:&nbsp;
          <span
            className={`tabular-nums font-semibold ${valid ? 'text-emerald-600' : 'text-amber-600'}`}
            aria-live="polite"
          >
            {total}
          </span>
        </p>
      </header>

      <div className="space-y-4">
        {alloc.map((row, i) => {
          const seg = row.seg as 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
          const shortLabel = segmentShortLabel(seg);
          const fullLabel = SEGMENTS[seg].label;
          const rulesText = describeRule(SEGMENTS[seg].rules);

          const factor = convMap.get(seg)?.point_factor_pct ?? 0; // ex : 0.05 => 0,05%
          const pct = weights.find((w) => w.seg === seg)?.pct ?? 0;

          return (
            <SliderRow
              key={seg}
              seg={seg}
              shortLabel={shortLabel}
              fullLabel={fullLabel}
              ruleText={rulesText}
              factor={factor}
              points={row.points}
              onChange={(v) => setValue(seg, v)}
              pct={pct}
              max={wallet}
              delay={i * 0.03}
            />
          );
        })}
      </div>

      <div className="mt-6 flex flex-wrap gap-3">
        <button
          onClick={save}
          disabled={!valid}
          className="px-5 py-3 rounded-xl bg-primary text-white text-sm font-semibold shadow-lg shadow-primary/20 disabled:opacity-50 disabled:cursor-not-allowed hover:opacity-90 transition-all"
        >
          Enregistrer la répartition
        </button>

        <AnimatePresence>
          {!valid && (
            <motion.span
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 4 }}
              className="text-xs text-amber-600 dark:text-amber-400 self-center inline-flex items-center gap-1.5"
              role="status"
              aria-live="polite"
            >
              <Info className="w-3.5 h-3.5" />
              La somme des points doit être égale à {wallet}.
            </motion.span>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

/* ---------- Slider luxe & a11y ---------- */

function SliderRow({
  seg,
  shortLabel,
  fullLabel,
  ruleText,
  factor,
  points,
  onChange,
  pct,
  max,
  delay = 0,
}: {
  seg: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
  shortLabel: string;
  fullLabel: string;
  ruleText: string;
  factor: number; // % par point (ex: 0.05)
  points: number;
  onChange: (v: number) => void;
  pct: number;
  max: number;
  delay?: number;
}) {
  const pctPoints = Math.min(100, (points / max) * 100 || 0);
  const ariaText = `${fullLabel}: ${points} points, ~${pct.toFixed(1)}%`;

  // format "0,05%" à la française
  const factorStr = factor.toLocaleString('fr-FR', {
    minimumFractionDigits: factor < 0.1 ? 2 : 1,
    maximumFractionDigits: 2,
  });

  const cap = max * factor; // plafond % à afficher
  const capStr = cap.toLocaleString('fr-FR', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.35 }}
    >
      <div className="flex items-center justify-between mb-1.5">
        <div className="flex items-center gap-2 min-w-0">
          <div className="px-2 py-0.5 rounded-md text-[10px] font-extrabold tracking-wide bg-primary/10 text-primary">
            {shortLabel}
          </div>
          <div
            className="text-[11px] text-neutral-500 dark:text-neutral-400 truncate"
            title={fullLabel}
          >
            {fullLabel}
          </div>
        </div>

        <div className="text-[11px] tabular-nums text-neutral-500 dark:text-neutral-400 flex items-center gap-3">
          <span title="Aperçu de probabilité">{pct.toFixed(1)}%</span>
          <span className="font-semibold">{points}</span> pts
        </div>
      </div>

      {/* Règle + facteur + cap affichés */}
      <div className="mb-2 flex items-center gap-2 text-[10px] text-neutral-500 dark:text-neutral-400">
        <Info className="w-3.5 h-3.5" />
        <span className="truncate">{ruleText}</span>
        <span className="opacity-60">•</span>
        <span>1&nbsp;pt&nbsp;=&nbsp;{factorStr}%</span>
        <span className="opacity-60">•</span>
        <span>cap&nbsp;:&nbsp;{capStr}%</span>
      </div>

      <Slider
        value={points}
        max={max}
        onChange={onChange}
        ariaLabel={`Segment ${seg} — ${ariaText}`}
      />

      <div className="mt-1.5 h-1 rounded-full overflow-hidden bg-neutral-100 dark:bg-neutral-800/70">
        <div
          className="h-full"
          style={{
            width: `${pctPoints}%`,
            background:
              'linear-gradient(90deg, hsl(var(--primary)) 0%, hsl(var(--primary) / 0.6) 100%)',
          }}
          aria-hidden
        />
      </div>
    </motion.div>
  );
}

function Slider({
  value,
  max,
  onChange,
  ariaLabel,
}: {
  value: number;
  max: number;
  onChange: (v: number) => void;
  ariaLabel: string;
}) {
  const pct = Math.min(100, (value / max) * 100 || 0);

  const onPointer = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = e.currentTarget;
    const rect = el.getBoundingClientRect();
    const x = Math.min(Math.max(e.clientX - rect.left, 0), rect.width);
    const ratio = rect.width === 0 ? 0 : x / rect.width;
    onChange(Math.round(ratio * max));
  };

  const onKey = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') {
      e.preventDefault();
      onChange(Math.max(0, value - 1));
    } else if (e.key === 'ArrowRight' || e.key === 'ArrowUp') {
      e.preventDefault();
      onChange(Math.min(max, value + 1));
    } else if (e.key === 'Home') {
      e.preventDefault();
      onChange(0);
    } else if (e.key === 'End') {
      e.preventDefault();
      onChange(max);
    } else if (e.key === 'PageUp') {
      e.preventDefault();
      onChange(Math.min(max, value + Math.max(1, Math.floor(max * 0.05))));
    } else if (e.key === 'PageDown') {
      e.preventDefault();
      onChange(Math.max(0, value - Math.max(1, Math.floor(max * 0.05))));
    }
  };

  return (
    <div
      className="relative h-9 rounded-2xl overflow-hidden select-none"
      role="slider"
      aria-label={ariaLabel}
      aria-valuemin={0}
      aria-valuemax={max}
      aria-valuenow={value}
      aria-valuetext={`${value} points`}
      tabIndex={0}
      onKeyDown={onKey}
      onPointerDown={(e) => {
        (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
        onPointer(e);
      }}
      onPointerMove={(e) => e.buttons === 1 && onPointer(e)}
      style={{
        background:
          'linear-gradient(180deg, rgba(255,255,255,0.75), rgba(255,255,255,0.55))',
        boxShadow:
          'inset 0 1px 0 rgba(255,255,255,0.7), inset 0 -1px 0 rgba(0,0,0,0.04), 0 8px 26px rgba(0,0,0,0.08)',
      }}
    >
      <div
        className="absolute inset-y-0 left-0"
        style={{
          width: `${pct}%`,
          background:
            'linear-gradient(135deg, hsl(var(--primary)) 0%, hsl(var(--primary) / 0.85) 100%)',
          boxShadow: 'inset 0 0 16px rgba(255,255,255,0.25)',
        }}
      />
      <div
        className="absolute top-1/2 -translate-y-1/2 -ml-3 w-6 h-6 rounded-full"
        style={{
          left: `calc(${pct}% + 0px)`,
          background: 'linear-gradient(180deg, #ffffff, #f3f4f6)',
          boxShadow:
            '0 6px 18px rgba(0,0,0,0.18), inset 0 1px 0 rgba(255,255,255,0.9), inset 0 -1px 0 rgba(0,0,0,0.06)',
        }}
        aria-hidden
      />
    </div>
  );
}
