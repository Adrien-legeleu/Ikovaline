'use client';

import AnimatedNumber from '@/components/AnimatedNumber';
import { Badge } from '@/components/ui/badge';
import { motion, AnimatePresence } from 'framer-motion';

export default function TierCompact({
  active,
  name,
  tagline,
  price,
  delayDays,
  bullets,
  ribbon,
  expanded,
  onToggleExpand,
  onSelect,
  onDetails,
}: {
  active: boolean;
  name: string;
  tagline: string;
  price: number;
  delayDays: number;
  bullets: string[];
  ribbon?: 'popular' | 'new' | 'hot' | 'signature';
  expanded: boolean;
  onToggleExpand: () => void;
  onSelect: () => void;
  onDetails: () => void;
}) {
  const ribbonText =
    ribbon === 'popular'
      ? 'Le plus choisi'
      : ribbon === 'new'
        ? 'Nouveau'
        : ribbon === 'hot'
          ? 'Populaire'
          : ribbon === 'signature'
            ? 'Signature'
            : undefined;

  return (
    <motion.div
      initial={{ y: 6, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true, amount: 0.4 }}
      whileHover={{ y: -3 }}
      transition={{ type: 'spring', stiffness: 220, damping: 22, mass: 0.7 }}
      className={[
        'relative w-full rounded-2xl flex flex-col jusitfy-between p-6 md:p-7 backdrop-blur border',
        'bg-white/65 dark:bg-neutral-900/65',
        active
          ? 'border-primary/40 shadow-xl'
          : 'border-black/10 shadow-sm hover:shadow-md hover:border-black/20 dark:border-white/10 dark:hover:border-white/20',
      ].join(' ')}
    >
      <button
        type="button"
        onClick={onSelect}
        className="absolute inset-0 rounded-3xl focus:outline-none focus-visible:ring-0"
        aria-label={`Sélectionner ${name}`}
      />

      {ribbonText ? (
        <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 text-xs font-semibold text-white bg-black rounded-full shadow dark:bg-white dark:text-black">
          {ribbonText}
        </Badge>
      ) : null}

      <div className="relative pointer-events-none">
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="text-lg md:text-xl font-bold tracking-tight text-neutral-900 dark:text-white">
              {name}
            </div>
            <div className="text-[13px] text-black/60 dark:text-white/60">
              {tagline}
            </div>
          </div>
          <div className="text-right">
            <div className="text-2xl md:text-3xl font-extrabold text-center tracking-tight text-neutral-900 dark:text-white">
              {price === 0 ? (
                'Sur devis'
              ) : (
                <div>
                  <AnimatedNumber value={price} />€{' '}
                </div>
              )}
            </div>
            <div className="text-[12px] text-black/50 dark:text-white/60">
              ~ {delayDays} j
            </div>
          </div>
        </div>

        <ul className="mt-4 space-y-2 text-[14px]">
          {bullets.slice(0, 3).map((b, i) => (
            <li key={i} className="flex items-start gap-2">
              <span className="mt-[2px] inline-block size-4 rounded-full bg-primary/10 text-primary text-[11px] text-center leading-4">
                ✓
              </span>
              <span className="text-black/80 dark:text-white/80">{b}</span>
            </li>
          ))}
        </ul>

        <AnimatePresence initial={false}>
          {expanded && (
            <motion.div
              key="more"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.22 }}
              className="mt-4 overflow-hidden"
            >
              <div className="rounded-2xl border border-black/10 bg-white/60 p-4 dark:border-white/10 dark:bg-neutral-900/60">
                <ul className="space-y-2 text-[14px]">
                  {bullets.slice(3, 8).map((b, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="mt-[2px] inline-block size-4 rounded-full bg-primary/10 text-primary text-[11px] text-center leading-4">
                        ✓
                      </span>
                      <span className="text-black/80 dark:text-white/80">
                        {b}
                      </span>
                    </li>
                  ))}
                </ul>
                <div className="mt-3 text-[12px] text-black/55 dark:text-white/60">
                  Livrables structurés et garanties claires — tout pour décider
                  vite, en confiance.
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="relative mt-5 flex items-center justify-between">
        <button
          type="button"
          onPointerDown={(e) => e.stopPropagation()}
          onClick={(e) => {
            e.stopPropagation();
            onToggleExpand();
          }}
          className="text-sm font-medium text-black/80 hover:underline transition pointer-events-auto dark:text-white/80"
          aria-label="Voir plus"
        >
          {expanded ? 'Voir moins' : 'Voir plus'}
        </button>

        <button
          type="button"
          onPointerDown={(e) => e.stopPropagation()}
          onClick={(e) => {
            e.stopPropagation();
            onDetails();
          }}
          className="px-3 py-1 text-[12px] text-black/70 border border-black/10 rounded-xl hover:bg-black/5 transition pointer-events-auto dark:text-white/80 dark:border-white/10 dark:hover:bg-white/5"
          aria-label="Démarrer"
        >
          Démarrer
        </button>
      </div>
    </motion.div>
  );
}
