'use client';
import { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  CATALOG,
  CategoryId,
  TierDef,
  SelectionState,
  emptySelection,
  calcTotals,
  computeKPI,
  narrative,
  mobileSupplements,
} from '@/lib/catalog';
import { CategoryGrid } from './CategoryGrid';
import { TierPicker } from './TierPicker';
import { KPIBoard } from './KPIBoard';
import { EstimatePanel } from './EstimatePanel';
import { OptionsPanel } from './OptionsPanel';

export default function Simulator() {
  const [category, setCategory] = useState<CategoryId | null>(null);
  const [tier, setTier] = useState<TierDef | null>(null);
  const [sel, setSel] = useState<SelectionState>(emptySelection());
  const [ads, setAds] = useState<number>(500);

  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const cat = category ? CATALOG[category] : null;

  // Derived totals & KPI
  const totals = useMemo(
    () =>
      category && tier
        ? calcTotals(CATALOG[category], tier, sel, mobileSupplements, ads)
        : null,
    [category, tier, sel, ads]
  );

  const kpi = useMemo(
    () => (category && tier ? computeKPI(category, tier, sel, ads) : null),
    [category, tier, sel, ads]
  );

  const notes = useMemo(
    () => (category ? narrative(category, sel) : []),
    [category, sel]
  );

  // Step transitions with blur
  const stepVariants = {
    hidden: { opacity: 0, filter: 'blur(14px)', y: 14 },
    show: {
      opacity: 1,
      filter: 'blur(0px)',
      y: 0,
      transition: { duration: 0.35 },
    },
    exit: {
      opacity: 0,
      filter: 'blur(10px)',
      y: -10,
      transition: { duration: 0.25 },
    },
  };

  const resetAfterCategory = () => {
    setTier(null);
    setSel(emptySelection());
  };

  // helper pour extraire les options sélectionnées
  function getChosenOptions() {
    if (!cat) return [];
    const opts = [...cat.options, ...mobileSupplements];

    return opts
      .map((o) => {
        if (o.kind === 'toggle') {
          if (!sel.toggles.has(o.id)) return null;
          return {
            label: o.label,
            qty: 1,
            price: o.price,
          };
        }
        if (o.kind === 'radio' && o.group) {
          if (sel.radios[o.group] !== o.id) return null;
          return {
            label: o.label,
            qty: 1,
            price: o.price,
          };
        }
        if (o.kind === 'qty') {
          const q = sel.qty[o.id] ?? 0;
          if (q <= 0) return null;
          return {
            label: o.label,
            qty: q,
            price: o.price * q,
          };
        }
        return null;
      })
      .filter(Boolean) as { label: string; qty: number; price: number }[];
  }

  async function handleSend() {
    if (!category || !tier || !totals || !kpi || !cat) return;

    setSending(true);
    setSent(false);

    // KPI mids
    const mid = (a: number, b: number) =>
      Math.round((Number(a) + Number(b)) / 2);

    const convLabel =
      category === 'ecommerce'
        ? 'Commandes/mois'
        : category === 'funnel'
          ? 'Conversions/mois'
          : 'Leads/mois';

    const payload = {
      categoryLabel: cat.name, // Exemple: "Landing Page"
      tierLabel: tier.name, // Exemple: "Starter"
      options: getChosenOptions(), // [{label, qty, price}, ...]
      adsBudget: ads,
      totalTTC: totals.grandTotal,
      delayDays: totals.delayDays,
      kpi: {
        visitorsMid: mid(kpi.traffic[0], kpi.traffic[1]),
        convMid: mid(kpi.leads[0], kpi.leads[1]),
        convLabel,
        convRatePct: ((kpi.convRate[0] + kpi.convRate[1]) / 2).toFixed(1) + '%',
      },
    };

    try {
      const res = await fetch('/api/send-config', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        console.error('[Simulator] send-config failed', await res.text());
        // UX: on réactive le bouton mais pas de toast vert
        setSending(false);
        return;
      }

      // succès → petit toast ✅
      setSending(false);
      setSent(true);
      setTimeout(() => setSent(false), 2200);
    } catch (err) {
      console.error('[Simulator] send-config exception', err);
      setSending(false);
    }
  }

  return (
    <section
      id="simulator-root"
      className="relative w-full py-12 bg-background"
    >
      <div className="mx-auto max-w-7xl px-4 bg-background md:px-8">
        {/* Intro */}
        <motion.div
          key="step-cat"
          variants={stepVariants}
          initial="hidden"
          animate="show"
          exit="exit"
          className="space-y-6"
        >
          <div className="text-center">
            <div className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-primary bg-primary/10 dark:text-primary dark:bg-primary/20 shadow-sm">
              Studio de Projet
            </div>
            <h2 className="mt-4 text-4xl md:text-5xl font-extrabold tracking-tight">
              Composez votre projet
            </h2>
            <p className="mt-2 text-black/70 dark:text-white/70">
              Choisissez une catégorie pour démarrer.
            </p>
          </div>
        </motion.div>

        {/* Step 1: Catégories */}
        <AnimatePresence mode="wait">
          {!category && (
            <motion.div className="mt-10">
              <CategoryGrid
                onPick={(c) => {
                  setCategory(c);
                  resetAfterCategory();

                  // ⬇️ Scroll fluide vers le début du simulateur
                  const section = document.getElementById('simulator-root');
                  if (section) {
                    section.scrollIntoView({
                      behavior: 'smooth',
                      block: 'start',
                    });
                  }
                }}
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Step 2: Tiers */}
        <AnimatePresence mode="wait">
          {category && !tier && cat && (
            <motion.div
              key="step-tier"
              variants={stepVariants}
              initial="hidden"
              animate="show"
              exit="exit"
              className="mt-10 space-y-6"
            >
              <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <h3 className="text-2xl font-bold text-neutral-900 dark:text-white">
                    {cat.name}
                  </h3>
                  <p className="text-sm text-neutral-500 dark:text-neutral-400">
                    Choisis ton niveau d’accompagnement.
                  </p>
                </div>

                <button
                  className="self-start text-sm text-neutral-500 hover:text-neutral-800 dark:text-neutral-400 dark:hover:text-white transition"
                  onClick={() => setCategory(null)}
                >
                  ← changer de catégorie
                </button>
              </div>

              <TierPicker tiers={cat.tiers} onSelect={(t) => setTier(t)} />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Step 3: Options + Estimations */}
        <AnimatePresence mode="wait">
          {category && tier && cat && (
            <motion.div
              key="step-opts"
              variants={stepVariants}
              initial="hidden"
              animate="show"
              exit="exit"
              className="mt-10 grid grid-cols-1 lg:grid-cols-3 gap-6"
            >
              {/* Colonne principale */}
              <div className="lg:col-span-2 space-y-6">
                {/* Header offre */}
                <div
                  className="
                    rounded-[3rem] bg-white dark:bg-neutral-900
                    ring-1 ring-black/[0.03] dark:ring-white/[0.06]
                    shadow-[0_28px_64px_rgba(0,0,0,0.06),0_2px_4px_rgba(0,0,0,0.03)]
                    p-5 sm:p-6
                  "
                >
                  <div className="flex items-center w-full relative justify-between gap-4">
                    <div className="min-w-0 ">
                      <div className="flex items-start sm:items-center max-sm:flex-col  w-full sm:gap-4 gap-1 text-xs">
                        <button
                          className="font-medium text-neutral-500 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-white transition"
                          onClick={() => {
                            setTier(null);
                            setSel(emptySelection());
                          }}
                        >
                          ← Changer d’offre
                        </button>
                        <span className="text-neutral-300 max-sm:hidden dark:text-neutral-700">
                          •
                        </span>
                        <button
                          className="font-medium text-neutral-400 hover:text-neutral-700 dark:text-neutral-500 dark:hover:text-neutral-200 transition"
                          onClick={() => {
                            setCategory(null);
                            resetAfterCategory();
                          }}
                        >
                          ↺ Recommencer
                        </button>
                      </div>

                      <h3 className="mt-3 sm:text-[1.8rem] text-2xl font-semibold tracking-[-0.04em] text-neutral-900 dark:text-white">
                        {tier.name}
                      </h3>
                      <div className="text-sm text-neutral-500 dark:text-neutral-400">
                        {cat.tagline}
                      </div>
                    </div>

                    <div className="text-right shrink-0">
                      <div className="sm:text-[1.8rem] text-2xl  leading-none font-semibold tracking-[-0.03em]">
                        {tier.price
                          ? tier.price.toLocaleString('fr-FR') + '€'
                          : 'Sur devis'}
                      </div>
                      <div className="text-[11px] text-neutral-500 dark:text-neutral-400 mt-1">
                        ~ {tier.baseDelayDays} j
                      </div>
                    </div>
                  </div>
                </div>

                {/* Options */}
                <OptionsPanel
                  category={cat}
                  tier={tier}
                  mobile={mobileSupplements}
                  sel={sel}
                  onSel={setSel}
                />

                {/* KPI */}
                {kpi ? (
                  <KPIBoard category={category} kpi={kpi} adsBudget={ads} />
                ) : null}
              </div>

              {/* Colonne droite (Résumé + CTA) */}
              <div className="lg:sticky lg:top-20 h-fit space-y-4">
                {totals && kpi ? (
                  <EstimatePanel
                    category={category}
                    total={totals.grandTotal}
                    delayDays={totals.delayDays}
                    kpi={kpi}
                    adsBudget={ads}
                    onAds={setAds}
                  />
                ) : null}

                <div
                  className="
                    rounded-[3rem] p-5 flex items-center justify-center flex-col
                    bg-white dark:bg-neutral-900
                    ring-1 ring-black/[0.03] dark:ring-white/[0.06]
                    shadow-[0_28px_64px_rgba(0,0,0,0.06),0_2px_4px_rgba(0,0,0,0.03)]
                  "
                >
                  <button
                    onClick={handleSend}
                    disabled={sending}
                    className="
                      w-full mx-auto rounded-3xl bg-sky-600 text-white py-3
                      font-semibold tracking-[-0.02em] text-sm
                      hover:brightness-110 active:scale-[.99] transition
                      disabled:opacity-60
                    "
                  >
                    {sending ? 'Envoi…' : 'Envoyer ma configuration'}
                  </button>
                  <div className="mt-2 w-full text-center text-[10px] text-neutral-500 dark:text-neutral-400">
                    Offre, options, budget pub & KPI seront joints
                    automatiquement.
                  </div>
                </div>
              </div>

              {/* TOAST succès */}
              <AnimatePresence>
                {sent && (
                  <motion.div
                    initial={{ y: 20, opacity: 0, filter: 'blur(6px)' }}
                    animate={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
                    exit={{ y: 10, opacity: 0, filter: 'blur(4px)' }}
                    transition={{ duration: 0.25 }}
                    className="fixed bottom-6 right-6 z-50"
                  >
                    <div className="rounded-3xl bg-neutral-900 text-white px-4 py-2 shadow-xl/20">
                      Configuration envoyée ✅
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
