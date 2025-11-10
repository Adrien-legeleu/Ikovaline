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

import { Phone } from 'lucide-react';
import Link from 'next/link';
import { CategoryGrid } from '@/components/LandingPage/simulator/CategoryGrid';
import { TierPicker } from '@/components/LandingPage/simulator/TierPicker';
import { OptionsPanel } from '@/components/LandingPage/simulator/OptionsPanel';
import { KPIBoard } from '@/components/LandingPage/simulator/KPIBoard';
import { EstimatePanel } from '@/components/LandingPage/simulator/EstimatePanel';

export default function Simulator() {
  const [category, setCategory] = useState<CategoryId | null>(null);
  const [tier, setTier] = useState<TierDef | null>(null);
  const [sel, setSel] = useState<SelectionState>(emptySelection());
  const [ads, setAds] = useState<number>(500);
  const [email, setEmail] = useState('');

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
      email,
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
    <section className="relative w-full py-12 pt-32 bg-background">
      <div className="mx-auto max-w-7xl px-4 bg-background md:px-8">
        {/* Intro */}
        <motion.div
          key="step-cat"
          variants={stepVariants}
          initial="hidden"
          animate="show"
          exit="exit"
          className="space-y-6 mb-20"
        >
          <div className="text-center space-y-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-[10px] font-bold tracking-[0.2em] uppercase
                         bg-gradient-to-r from-primary/10 via-primary/5 to-transparent backdrop-blur-xl text-primary"
            >
              <div className="h-1 w-1 rounded-full bg-primary animate-pulse" />
              Studio de Projet
            </motion.div>

            <h1 className="text-5xl md:text-8xl font-black tracking-tighter leading-none">
              <span className="bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-700 dark:from-neutral-100 dark:via-neutral-200 dark:to-neutral-300 bg-clip-text text-transparent">
                Ikovaline
              </span>
              <br />
              <span className="bg-gradient-to-r from-primary via-primary/90 to-primary/70 bg-clip-text text-transparent">
                Launch
              </span>
            </h1>

            <p className="mt-2 text-black/70 dark:text-white/70">
              Choisissez une catégorie pour démarrer.
            </p>
          </div>
        </motion.div>

        {/* Step 1: Catégories */}
        <AnimatePresence mode="wait">
          {!category && (
            <motion.div className="mt-10" id="simulator-root">
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
      rounded-[3rem] p-6 flex flex-col items-center justify-center
      bg-white dark:bg-neutral-900
      ring-1 ring-black/[0.03] dark:ring-white/[0.06]
      shadow-[0_28px_64px_rgba(0,0,0,0.06),0_2px_4px_rgba(0,0,0,0.03)]
      space-y-4
    "
                >
                  {/* Champ email moderne */}
                  <div className="w-full">
                    <input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="exemple@entreprise.fr"
                      className="
    w-full rounded-3xl border border-neutral-100 dark:border-neutral-900
    bg-neutral-50 dark:bg-neutral-950
    px-4 py-3 text-sm text-neutral-800 dark:text-neutral-100
    placeholder:text-neutral-400 dark:placeholder:text-neutral-600
    focus:outline-none focus:ring-2 focus:ring-sky-500/60 focus:border-sky-400
    transition-all duration-150
  "
                      required
                    />
                  </div>

                  {/* Bouton envoyer */}
                  <button
                    onClick={handleSend}
                    disabled={sending}
                    className="
        w-full rounded-3xl bg-black/[0.04] dark:bg-white/[0.04] text-black dark:text-white py-3
        font-semibold tracking-[-0.02em] text-sm
        hover:brightness-110 active:scale-[.99] transition
        disabled:opacity-60
      "
                  >
                    {sending ? 'Envoi…' : 'Envoyer ma configuration'}
                  </button>
                  <Link
                    href={'https://calendly.com/florent-ghizzoni/meeting'}
                    target="_blank"
                    className="
        w-full rounded-3xl bg-sky-600 text-white py-3
   tracking-[-0.02em] text-sm
        hover:brightness-110 active:scale-[.99] transition
        disabled:opacity-60 flex items-center justify-center
      "
                  >
                    <Phone className="h-4 mr-2 w-4" />{' '}
                    <strong className="mr-2">-10% </strong> Appel de découverte
                  </Link>

                  <div className="text-center text-[10px] text-neutral-500 dark:text-neutral-400">
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
