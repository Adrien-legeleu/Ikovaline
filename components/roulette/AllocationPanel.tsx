// file: components/roulette/AllocationPanel.tsx
'use client';
import { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { SlidersHorizontal, Save } from 'lucide-react';

type Allocation = { seg: number; points: number };
type Conversion = { seg: number; label: string; point_factor_pct: number };

export function AllocationPanel({
  wallet,
  allocation,
  conversion,
  onSave,
}: {
  wallet: number;
  allocation: Allocation[];
  conversion: Conversion[];
  onSave: (next: Allocation[]) => Promise<void> | void;
}) {
  const [local, setLocal] = useState<Allocation[]>(allocation);
  useEffect(() => setLocal(allocation), [allocation]);

  const labels = useMemo(
    () => new Map(conversion.map((c) => [c.seg, c.label])),
    [conversion]
  );
  const sum = local.reduce((a, r) => a + (r.points ?? 0), 0);
  const valid = sum === wallet;

  function set(seg: number, points: number) {
    setLocal((prev) =>
      prev.map((r) => (r.seg === seg ? { ...r, points: points } : r))
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-[2rem] bg-white/90 dark:bg-neutral-900/90 backdrop-blur-xl p-6 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] border border-black/5 dark:border-white/10"
    >
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2.5 rounded-xl bg-primary/10">
          <SlidersHorizontal className="w-5 h-5 text-primary" />
        </div>
        <div className="flex-1">
          <h3 className="font-semibold text-base">Répartition des points</h3>
          <p className="text-xs text-neutral-500 dark:text-neutral-400">
            Somme : <b className="tabular-nums">{sum}</b> /{' '}
            <b className="tabular-nums">{wallet}</b> pts
          </p>
          {wallet > 100 && (
            <p className="text-xs text-green-600 dark:text-green-400 mt-0.5">
              ✨ +{wallet - 100} pts bonus parrainage !
            </p>
          )}
        </div>
      </div>

      <div className="space-y-4">
        {local.map((row) => (
          <div key={row.seg} className="flex items-center gap-3">
            <div className="w-40 text-xs text-neutral-600 dark:text-neutral-300 truncate">
              {labels.get(row.seg) ?? `Segment ${row.seg}`}
            </div>
            <input
              type="range"
              min={0}
              max={wallet}
              step={1}
              value={row.points}
              onChange={(e) => set(row.seg, Number(e.target.value))}
              className="flex-1"
              aria-label={`Points pour ${labels.get(row.seg)}`}
            />
            <input
              type="number"
              min={0}
              max={wallet}
              value={row.points}
              onChange={(e) => {
                const v = Math.max(
                  0,
                  Math.min(wallet, Number(e.target.value) || 0)
                );
                set(row.seg, v);
              }}
              className="w-20 px-2 py-1 rounded-lg bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 text-sm text-right tabular-nums"
              aria-label={`Valeur numérique pour ${labels.get(row.seg)}`}
            />
          </div>
        ))}
      </div>

      <div className="mt-5 flex items-center justify-between">
        <p
          className={`text-xs ${valid ? 'text-emerald-600' : 'text-amber-600'} tabular-nums`}
          aria-live="polite"
        >
          {valid ? 'Répartition valide ✓' : 'La somme doit égaler le wallet'}
        </p>
        <button
          onClick={() => valid && onSave(local)}
          disabled={!valid}
          className="inline-flex items-center gap-2 rounded-xl px-4 py-2 bg-primary text-white text-sm font-semibold disabled:opacity-40"
          aria-disabled={!valid}
        >
          <Save className="w-4 h-4" />
          Enregistrer
        </button>
      </div>
    </motion.div>
  );
}
