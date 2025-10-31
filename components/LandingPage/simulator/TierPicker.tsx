'use client';

import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import type { TierDef } from '@/lib/catalog';

/* --------------------------
   Petit badge délai (~ 10 j)
---------------------------*/
function DelayBadge({ days }: { days: number }) {
  return (
    <div
      className="
        inline-flex items-center gap-1
        rounded-full px-2 py-[2px]
        text-[10px] font-medium leading-none
        text-neutral-600 dark:text-neutral-200
        bg-white/70 dark:bg-neutral-800/70
        ring-1 ring-black/[0.04] dark:ring-white/[0.08]
      "
    >
      <span className="block h-1.5 w-1.5 rounded-full bg-emerald-400" />~ {days}{' '}
      j
    </div>
  );
}

/* --------------------------
   Pastilles façon fenêtre macOS
---------------------------*/
function MacDots() {
  return (
    <div className="flex items-center justify-center gap-1.5">
      <div className="size-2.5 rounded-full bg-red-400" />
      <div className="size-2.5 rounded-full bg-amber-300" />
      <div className="size-2.5 rounded-full bg-emerald-400" />
    </div>
  );
}

/* --------------------------
   Barre d'offres (Starter / Premium / Ultra)
   -> toujours en row, jamais wrap
   -> centrée
---------------------------*/
function TierNavRow({
  tiers,
  activeId,
  onChange,
}: {
  tiers: TierDef[];
  activeId: string;
  onChange: (id: string) => void;
}) {
  return (
    <div className="flex flex-col items-center">
      {/* row offres */}
      <div
        className="
          mt-5 flex flex-row items-center gap-8
          max-w-full 
        "
        style={{ WebkitOverflowScrolling: 'touch' }}
      >
        {tiers.map((t) => {
          const active = t.id === activeId;
          return (
            <button
              key={t.id}
              onClick={() => onChange(t.id)}
              className="relative text-center"
            >
              <div
                className={[
                  'flex flex-col items-center gap-2',
                  active
                    ? 'text-sky-600 dark:text-sky-400'
                    : 'text-neutral-500 dark:text-neutral-400 hover:text-neutral-800 dark:hover:text-neutral-200',
                ].join(' ')}
              >
                <span className="text-[14px] sm:text-[15px] font-medium leading-none tracking-[-0.03em]">
                  {t.name}
                </span>
                {active ? <DelayBadge days={t.baseDelayDays} /> : null}
              </div>

              {active ? (
                <motion.div
                  layoutId="tier-underline"
                  className="absolute left-0 right-0 -bottom-2 h-[2px] rounded-full bg-sky-500 dark:bg-sky-400"
                />
              ) : null}
            </button>
          );
        })}
      </div>
    </div>
  );
}

/* --------------------------
   Bloc prix / CTA
   Centré, wording peaufiné
---------------------------*/
function TierInfo({
  tier,
  onConfirm,
}: {
  tier: TierDef;
  onConfirm: (t: TierDef) => void;
}) {
  const isDevis = tier.price === 0;

  return (
    <div className="flex flex-col items-center text-center">
      <div className="text-[1.9rem] leading-none font-semibold text-neutral-900 dark:text-white tracking-[-0.04em]">
        {isDevis ? 'Sur devis' : tier.price.toLocaleString('fr-FR') + '€'}
      </div>

      <div className="mt-2 text-[12px] text-neutral-500 dark:text-neutral-400 leading-snug">
        {isDevis
          ? 'Chiffrage précis après échange rapide'
          : 'TTC estimatif • mise en ligne moyenne ~ ' +
            tier.baseDelayDays +
            ' jours'}
      </div>

      <button
        onClick={() => onConfirm(tier)}
        className="
          mt-6 inline-flex items-center justify-center
          rounded-3xl px-4 py-2 text-[13px] font-semibold
          bg-sky-600 text-white
          dark:bg-sky-500 dark:text-white
          shadow-[0_16px_32px_rgba(0,0,0,0.08)]
          hover:brightness-110 active:scale-[.99]
          transition
        "
      >
        Continuer avec cette offre
      </button>

      <div className="mt-4 text-[11px] leading-snug text-neutral-400 dark:text-neutral-500 max-w-[240px]">
        On vérifie ensemble le périmètre exact (fonctionnalités, timing,
        contraintes internes) avant de bloquer quoi que ce soit.
      </div>
    </div>
  );
}

/* --------------------------
   Card shell style “Apple / soft”
   - très arrondi
   - fond blanc / dark
   - shadow douce
   - ring ultra léger
   - contenu centré + espacé
---------------------------*/
function TierCardShell({
  tiers,
  activeId,
  onChange,
  children,
}: {
  tiers: TierDef[];
  activeId: string;
  onChange: (id: string) => void;
  children: React.ReactNode;
}) {
  return (
    <div
      className={[
        'w-full max-w-3xl',
        'rounded-[3rem] bg-white dark:bg-neutral-900',
        'shadow-[0_32px_80px_rgba(0,0,0,0.07),0_2px_4px_rgba(0,0,0,0.03)]',
        'ring-1 ring-black/[0.02] dark:ring-white/[0.02]',
        'px-6 py-8 sm:px-10 sm:py-10',
        'flex flex-col items-center text-center gap-10',
      ].join(' ')}
    >
      {/* nav row */}
      <TierNavRow tiers={tiers} activeId={activeId} onChange={onChange} />

      {/* séparation hairline */}
      <div className="h-px w-full max-w-[200px] bg-black/[0.05] dark:bg-white/[0.08] rounded-full" />

      {/* prix / CTA */}
      {children}
    </div>
  );
}

/* --------------------------
   MAIN COMPONENT
---------------------------*/
export function TierPicker({
  tiers,
  onSelect,
}: {
  tiers: TierDef[];
  onSelect: (t: TierDef) => void;
}) {
  // on prend le premier palier comme actif (Starter en général)
  const [activeId, setActiveId] = useState<string>(tiers[0]?.id ?? '');

  const currentTier = useMemo(
    () => tiers.find((t) => t.id === activeId) ?? tiers[0],
    [tiers, activeId]
  );

  return (
    <div className="w-full flex flex-col items-center">
      <TierCardShell
        tiers={tiers}
        activeId={currentTier.id}
        onChange={setActiveId}
      >
        <TierInfo tier={currentTier} onConfirm={onSelect} />
      </TierCardShell>

      <div className="mt-8 text-[10px] text-neutral-400 dark:text-neutral-500 text-center leading-snug max-w-sm">
        Vous choisissez l’offre qui vous ressemble. On affine ensuite les
        options (ex: SEO, CRM, tunnel pub) juste après cette étape.
      </div>
    </div>
  );
}
