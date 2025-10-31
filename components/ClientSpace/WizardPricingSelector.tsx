'use client';

import { useMemo, useState, useDeferredValue, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import {
  CATALOG,
  type CategoryId,
  type TierId,
  type CategoryDef,
  type TierDef,
  type SelectionState,
  emptySelection,
  getVisibleOptions,
  calcTotals,
  computeKPI,
} from '@/lib/catalog/onboarding';

// Dyn imports
const TierCompactMini = dynamic(() => import('./TierCompactMini'), {
  ssr: true,
});
const StatsEstimate = dynamic(() => import('./StatesEstimateMini'), {
  ssr: false,
});

// Anim
const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];
const fadeUp = {
  hidden: { opacity: 0, y: 12, filter: 'blur(8px)' },
  show: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.45, ease: EASE },
  },
};
const staggerCol = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06, delayChildren: 0.05 } },
};

// Styles
const SHEET =
  'rounded-[2rem] bg-white/80 dark:bg-neutral-900/70 shadow-[0_12px_44px_rgba(0,0,0,.08)] backdrop-blur-xl';
const TILE =
  'rounded-[1.2rem] bg-black/[0.04] dark:bg-white/10 transition hover:bg-black/[0.06] dark:hover:bg-white/15';
const TILE_ACTIVE = 'bg-primary/15 text-primary hover:bg-primary/20';
const BUTTON_NEXT =
  'rounded-[1.6rem] w-full px-5 py-4 bg-primary text-white disabled:opacity-60 shadow-[0_12px_30px_rgba(59,130,246,0.25)]';

// ---------- Types ----------
export type OnboardingPricing = {
  categoryId: CategoryId;
  tierId: TierId;
  selection: SelectionState;
  adsBudget: number;
  totalEuros: number;
  delayDays: number;
  kpi: ReturnType<typeof computeKPI>;
};

export default function WizardPricingSelector({
  value,
  onChange,
  onContinue,
}: {
  value?: Partial<OnboardingPricing>;
  onChange: (sel: OnboardingPricing) => void;
  onContinue: () => void;
}) {
  // Defaults
  const [categoryId, setCategoryId] = useState<CategoryId>(
    value?.categoryId ?? 'landing'
  );
  const cat: CategoryDef = useMemo(() => CATALOG[categoryId], [categoryId]);

  const defaultTierId: TierId = useMemo(
    () => cat.tiers[0]?.id ?? 'starter',
    [cat.tiers]
  );
  const [tierId, setTierId] = useState<TierId>(value?.tierId ?? defaultTierId);

  // Selection (serialisable friendly: Set <-> array handled externally if needed)
  const [selection, setSelection] = useState<SelectionState>(
    value?.selection ?? emptySelection()
  );

  // Budget pub si applicable
  const [adsBudget, setAdsBudget] = useState<number>(
    value?.adsBudget ?? (cat.hasAdsBudget ? 500 : 0)
  );

  useEffect(() => {
    // reset tier if category changes and previous tier does not exist in new category
    if (!cat.tiers.find((t) => t.id === tierId)) {
      setTierId(cat.tiers[0].id);
    }
    // reset ads budget depending on category
    setAdsBudget((prev) => (cat.hasAdsBudget ? prev || 500 : 0));
    // clear selection groups that are not visible in this category/tier
    setSelection((prev) => {
      const next: SelectionState = {
        toggles: new Set<string>(),
        radios: {},
        qty: {},
      };
      const tier = cat.tiers.find(
        (t) =>
          t.id ===
          (cat.tiers.find((t) => t.id === tierId)?.id ?? cat.tiers[0].id)
      )!;
      const visible = getVisibleOptions(cat, tier.id);
      // keep only visible toggles
      for (const o of visible) {
        if (o.kind === 'toggle' && prev.toggles.has(o.id))
          next.toggles.add(o.id);
        if (o.kind === 'radio' && o.group && prev.radios[o.group] === o.id)
          next.radios[o.group] = o.id;
        if (o.kind === 'qty' && (prev.qty[o.id] ?? 0) > 0)
          next.qty[o.id] = prev.qty[o.id];
      }
      return next;
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categoryId]);

  const tier: TierDef = useMemo(
    () => cat.tiers.find((t) => t.id === tierId) ?? cat.tiers[0],
    [cat, tierId]
  );

  // Deferred (perf)
  const dSel = useDeferredValue(selection);
  const dAds = useDeferredValue(cat.hasAdsBudget ? adsBudget : 0);

  // Totaux
  const { grandTotal, delayDays } = useMemo(
    () => calcTotals(cat, tier, dSel, dAds),
    [cat, tier, dSel, dAds]
  );

  // KPI
  const kpi = useMemo(
    () => computeKPI(categoryId, tier, dSel, dAds),
    [categoryId, tier, dSel, dAds]
  );

  // Notifier parent
  useEffect(() => {
    onChange({
      categoryId,
      tierId,
      selection,
      adsBudget: cat.hasAdsBudget ? adsBudget : 0,
      totalEuros: grandTotal,
      delayDays,
      kpi,
    });
  }, [
    categoryId,
    tierId,
    selection,
    adsBudget,
    grandTotal,
    delayDays,
    kpi,
    onChange,
    cat.hasAdsBudget,
  ]);

  // UI helpers
  const visibleOptions = useMemo(
    () => getVisibleOptions(cat, tier.id),
    [cat, tier.id]
  );
  const isRadioChecked = (group: string, id: string) =>
    selection.radios[group] === id;
  const toggleRadio = (group: string, id: string) =>
    setSelection((prev) => ({
      ...prev,
      radios: {
        ...prev.radios,
        [group]: prev.radios[group] === id ? undefined : id,
      },
    }));
  const toggleToggle = (id: string) =>
    setSelection((prev) => {
      const next = new Set(prev.toggles);
      next.has(id) ? next.delete(id) : next.add(id);
      return { ...prev, toggles: next };
    });

  return (
    <motion.div
      variants={staggerCol}
      initial="hidden"
      animate="show"
      className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_340px] w-full max-w-6xl mx-auto pb-12"
    >
      {/* Colonne gauche */}
      <motion.section
        variants={fadeUp}
        className={`${SHEET} relative p-6 md:p-8 space-y-6`}
      >
        {/* Catégories */}
        <div className="space-y-2">
          <div className="text-[11px] tracking-[0.18em] uppercase text-muted-foreground">
            Catégorie
          </div>
          <div className="flex flex-wrap gap-2">
            {Object.values(CATALOG).map((c) => {
              const active = c.id === categoryId;
              return (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => setCategoryId(c.id)}
                  className={cn(
                    'px-3 h-9 inline-flex items-center rounded-[1rem] text-sm',
                    TILE,
                    active && TILE_ACTIVE
                  )}
                >
                  {c.name}
                </button>
              );
            })}
          </div>
          <p className="text-sm text-muted-foreground">{cat.tagline}</p>
        </div>

        {/* Tiers */}
        <div className="space-y-3">
          <div className="text-[11px] tracking-[0.18em] uppercase text-muted-foreground">
            Offre
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 items-stretch">
            {cat.tiers.map((t) => (
              <button
                key={t.id}
                type="button"
                onClick={() => setTierId(t.id)}
                className="h-full text-left ring-0 outline-none transition focus-visible:outline-none border-none focus-visible:ring-0 focus-visible:shadow-none"
              >
                <TierCompactMini
                  active={t.id === tier.id}
                  name={t.name}
                  tagline=""
                  price={t.price}
                  delayDays={t.baseDelayDays}
                  bullets={t.includes}
                  onSelect={() => setTierId(t.id)}
                />
              </button>
            ))}
          </div>
        </div>

        {/* Options visibles pour ce tier */}
        {visibleOptions.length > 0 && (
          <div className="space-y-3">
            <h3 className="text-lg font-medium">Modules</h3>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {visibleOptions.map((opt) => {
                if (opt.kind === 'radio' && opt.group) {
                  const checked = isRadioChecked(opt.group, opt.id);
                  return (
                    <button
                      key={opt.id}
                      type="button"
                      onClick={() => toggleRadio(opt.group!, opt.id)}
                      className={cn(
                        TILE,
                        'p-4 flex flex-col justify-between',
                        checked && TILE_ACTIVE
                      )}
                    >
                      <span className="font-medium">{opt.label}</span>
                      <span className="text-sm text-muted-foreground">
                        + {opt.price.toLocaleString('fr-FR')}€
                      </span>
                    </button>
                  );
                }
                // toggle
                const checked = selection.toggles.has(opt.id);
                return (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => toggleToggle(opt.id)}
                    className={cn(
                      TILE,
                      'p-4 flex flex-col justify-between',
                      checked && TILE_ACTIVE
                    )}
                  >
                    <span className="font-medium">{opt.label}</span>
                    <span className="text-sm text-muted-foreground">
                      + {opt.price.toLocaleString('fr-FR')}€
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Budget pub si applicable */}
        {cat.hasAdsBudget && (
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Budget publicitaire</h3>
            <input
              type="range"
              min={0}
              max={5000}
              step={50}
              value={adsBudget}
              onChange={(e) => setAdsBudget(parseInt(e.target.value, 10))}
              className="w-full accent-primary"
            />
            <div className="text-sm text-muted-foreground flex justify-between mt-1">
              <span>0€</span>
              <span>2 500€</span>
              <span>5 000€</span>
            </div>
          </div>
        )}
      </motion.section>

      {/* Colonne droite */}
      <motion.aside
        variants={fadeUp}
        className="space-y-4 lg:sticky lg:top-6 h-fit"
      >
        <div className={`${SHEET} p-5`}>
          <div className="text-[11px] tracking-[0.18em] uppercase text-muted-foreground mb-1">
            Résumé
          </div>
          <div className="text-sm space-y-2">
            <div className="flex items-center justify-between gap-4">
              <span className="text-muted-foreground">Catégorie</span>
              <span className="font-medium">{cat.name}</span>
            </div>
            <div className="flex items-center justify-between gap-4">
              <span className="text-muted-foreground">Offre</span>
              <span className="font-medium">{tier.name}</span>
            </div>
            {cat.hasAdsBudget && (
              <div className="flex items-center justify-between gap-4">
                <span className="text-muted-foreground">Publicité</span>
                <span className="font-medium">
                  {adsBudget.toLocaleString('fr-FR')}€
                </span>
              </div>
            )}
            <div className="flex items-center justify-between gap-4">
              <span className="text-muted-foreground">Délai estimé</span>
              <span className="font-medium">~ {delayDays} jours</span>
            </div>
          </div>
        </div>

        <div className={`${SHEET} p-5`}>
          <div className="text-sm font-medium">Total estimé</div>
          <div className="text-2xl font-bold mt-1">
            {grandTotal === 0
              ? 'Sur devis'
              : `${grandTotal.toLocaleString('fr-FR')}€`}
          </div>
        </div>

        <div className={`${SHEET} p-5`}>
          <StatsEstimate
            kpi={kpi}
            tierId={tier.id}
            tierName={tier.name}
            adsBudget={cat.hasAdsBudget ? adsBudget : 0}
          />
        </div>

        <motion.div variants={fadeUp} className="mt-2">
          <button type="button" onClick={onContinue} className={BUTTON_NEXT}>
            Continuer
          </button>
        </motion.div>
      </motion.aside>
    </motion.div>
  );
}
