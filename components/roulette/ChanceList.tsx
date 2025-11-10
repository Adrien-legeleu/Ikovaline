// file: components/roulette/ChanceList.tsx
'use client';

import { motion } from 'framer-motion';

type Weight = { seg: number; label: string; pct: number };

export function ChanceList({ weights }: { weights: Weight[] }) {
  const total = Math.round(weights.reduce((a, w) => a + w.pct, 0) * 10) / 10;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="rounded-[2rem] bg-white/90 dark:bg-neutral-900/90 backdrop-blur-xl p-6 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] border border-black/5 dark:border-white/10"
    >
      <div className="flex items-center justify-between mb-5">
        <h3 className="font-semibold text-base">Vos chances</h3>
        <p className="text-xs text-neutral-500 dark:text-neutral-400 tabular-nums">
          Total : {total.toFixed(1)}%
        </p>
      </div>
      <div className="grid grid-cols-2 gap-2.5">
        {weights.map((w, i) => (
          <motion.div
            key={w.seg}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25 + i * 0.05, duration: 0.35 }}
            className="rounded-xl bg-white dark:bg-neutral-950 p-3 shadow-sm border border-neutral-100 dark:border-neutral-800 hover:border-primary/30 dark:hover:border-primary/30 transition-colors"
          >
            <div className="text-[10px] text-neutral-500 dark:text-neutral-400 mb-1 truncate font-medium uppercase tracking-wide">
              {w.label}
            </div>
            <div className="text-xl font-bold text-primary tabular-nums">
              {w.pct.toFixed(1)}%
            </div>
          </motion.div>
        ))}
      </div>
      <p className="mt-4 text-[10px] text-neutral-400 dark:text-neutral-500 text-center">
        Probabilités serveur • somme = 100%
      </p>
    </motion.div>
  );
}
