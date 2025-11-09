// file: components/roulette/ChanceList.tsx
'use client';
import { motion } from 'framer-motion';
import { TrendingUp } from 'lucide-react';
import { useMemo } from 'react';

type Weight = { seg: number; label: string; pct: number };

export function ChanceList({ weights }: { weights: Weight[] }) {
  const totalPct = useMemo(
    () => weights.reduce((acc, w) => acc + w.pct, 0),
    [weights]
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-[2rem] bg-white/90 dark:bg-neutral-900/90 backdrop-blur-xl p-6 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] border border-black/5 dark:border-white/10"
    >
      <div className="flex items-center gap-3 mb-5">
        <div className="p-2.5 rounded-xl bg-primary/10">
          <TrendingUp className="w-5 h-5 text-primary" />
        </div>
        <div>
          <h3 className="font-semibold text-base">Vos chances</h3>
          <p className="text-xs text-neutral-500 tabular-nums">
            Total : {totalPct.toFixed(1)}%
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2.5">
        {weights.map((w, i) => (
          <motion.div
            key={w.seg}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 * i }}
            className="rounded-xl bg-white dark:bg-neutral-950 p-3 border border-neutral-100 dark:border-neutral-800"
          >
            <div className="text-[10px] text-neutral-500 mb-1 uppercase tracking-wide">
              {w.label}
            </div>
            <div className="text-xl font-bold text-primary tabular-nums">
              {w.pct.toFixed(1)}%
            </div>
          </motion.div>
        ))}
      </div>

      <p className="mt-4 text-[10px] text-neutral-400 text-center">
        Probabilités calculées côté serveur
      </p>
    </motion.div>
  );
}
