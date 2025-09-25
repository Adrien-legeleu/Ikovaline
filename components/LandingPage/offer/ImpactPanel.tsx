'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { IconBolt } from '@tabler/icons-react';
import { kpiNarrative } from '@/lib/offers/kpi';
import type { OptionId } from '@/lib/offers/pricing';

export default function ImpactPanel({ selected }: { selected: OptionId[] }) {
  const lines = kpiNarrative(selected);

  return (
    <AnimatePresence mode="popLayout">
      <motion.div
        key={selected.join('|') || 'base'}
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -6 }}
        transition={{ duration: 0.25 }}
        className="rounded-2xl bg-white/60 border border-black/10 shadow p-5 dark:bg-neutral-900/60 dark:border-white/10"
      >
        <div className="text-lg font-semibold mb-2 text-neutral-900 dark:text-white">
          Impact business
        </div>
        <p className="text-sm text-black/70 dark:text-white/70">
          Un socle clair pour <b className="font-semibold">être trouvé</b>, des
          parcours qui <b className="font-semibold">rassurent</b>, et des
          métriques pour <b className="font-semibold">décider vite</b>.
        </p>

        {lines.length ? (
          <ul className="mt-3 space-y-1">
            {lines.map((l, i) => (
              <li
                key={i}
                className="text-sm flex items-start gap-2 text-neutral-900 dark:text-white/90"
              >
                <IconBolt className="size-4 mt-0.5 text-primary" /> {l}
              </li>
            ))}
          </ul>
        ) : null}

        <p className="mt-3 text-[11px] text-black/50 dark:text-white/50">
          Estimations indicatives : secteur, concurrence et budget média
          influent fortement.
        </p>
      </motion.div>
    </AnimatePresence>
  );
}
