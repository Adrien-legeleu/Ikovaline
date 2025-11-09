// app/simulateurs/maxbid/page.tsx
'use client';

import { useMemo, useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

/* ===== Formatage ===== */
function formatCurrency(value: number): string {
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
}

function formatNumber(value: number, decimals = 0): string {
  return new Intl.NumberFormat('fr-FR', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(value);
}

function formatPercent(value: number): string {
  return `${formatNumber(value, 1)} %`;
}

export default function MaxBidSimulator() {
  /* ===== INPUTS ===== */
  const [avgOrder, setAvgOrder] = useState(500); // Panier moyen €
  const [ordersPerCust, setOrdersPerCust] = useState(2); // Nb achats par client
  const [marginPct, setMarginPct] = useState(40); // Marge brute %
  const [acqSharePct, setAcqSharePct] = useState(30); // Part CA pour acquisition %
  const [crClickLead, setCrClickLead] = useState(5); // Taux clic → lead %
  const [crLeadClient, setCrLeadClient] = useState(20); // Taux lead → client %

  /* ===== CALCULS ===== */
  const {
    ltv,
    cacMax,
    cplMax,
    cpcMax,
    breakEvenRoas,
    crClickClient,
    acqShare,
    margin,
  } = useMemo(() => {
    // Convertir en décimaux
    const margin = marginPct / 100;
    const acqShare = acqSharePct / 100;
    const clickLeadRate = crClickLead / 100;
    const leadClientRate = crLeadClient / 100;

    // LTV
    const ltv = avgOrder * ordersPerCust * margin;

    // CAC max
    const cacMax = ltv * acqShare;

    // Taux clic → client
    const crClickClient = clickLeadRate * leadClientRate;

    // CPL max
    const cplMax = leadClientRate > 0 ? cacMax * leadClientRate : 0;

    // CPC max
    const cpcMax = crClickClient > 0 ? cacMax * crClickClient : 0;

    // ROAS de rupture
    const breakEvenRoas = cacMax > 0 ? (avgOrder * ordersPerCust) / cacMax : 0;

    return {
      ltv,
      cacMax,
      cplMax,
      cpcMax,
      breakEvenRoas,
      crClickClient,
      acqShare,
      margin,
    };
  }, [
    avgOrder,
    ordersPerCust,
    marginPct,
    acqSharePct,
    crClickLead,
    crLeadClient,
  ]);

  return (
    <section className="relative w-full min-h-screen py-12 pt-32 bg-white dark:bg-neutral-950">
      <div className="mx-auto max-w-7xl px-6 md:px-8">
        {/* Glows ambiants */}
        <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-1/4 w-[700px] h-[700px] bg-primary/3 dark:bg-primary/5 rounded-full blur-[140px] animate-pulse" />
          <div
            className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-primary/2 dark:bg-primary/4 rounded-full blur-[120px] animate-pulse"
            style={{ animationDelay: '2s' }}
          />
        </div>

        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-8 mb-24"
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
              Calculateur d'enchères
            </motion.div>

            <h1 className="text-5xl md:text-8xl font-black tracking-tighter leading-none">
              <span className="bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-700 dark:from-neutral-100 dark:via-neutral-200 dark:to-neutral-300 bg-clip-text text-transparent">
                Ikovaline
              </span>
              <br />
              <span className="bg-gradient-to-r from-primary via-primary/90 to-primary/70 bg-clip-text text-transparent">
                MaxBid
              </span>
            </h1>

            <p className="mx-auto max-w-2xl text-lg md:text-xl text-neutral-600 dark:text-neutral-400 font-light leading-relaxed">
              Calcule ton CPC, CPL et CAC maximum pour rester rentable selon ta
              marge et ton budget acquisition.
            </p>
          </div>
        </motion.div>

        {/* Layout principal */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_420px] lg:gap-12">
          {/* ===== GAUCHE : INPUTS ===== */}
          <div className="space-y-6">
            {/* Card sliders */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="group relative rounded-[3rem] overflow-hidden
                         bg-gradient-to-br from-white via-neutral-50/50 to-neutral-100/30
                         dark:from-neutral-900/50 dark:via-neutral-900/30 dark:to-neutral-900/20
                         backdrop-blur-2xl p-8
                         shadow-[0_8px_40px_-12px_rgba(0,0,0,0.08)]
                         dark:shadow-[0_8px_40px_-12px_rgba(0,0,0,0.4)]
                         transition-shadow duration-500 hover:shadow-[0_20px_60px_-12px_rgba(0,0,0,0.12)]
                         dark:hover:shadow-[0_20px_60px_-12px_rgba(0,0,0,0.6)]"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/0 via-transparent to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

              <div className="relative space-y-10">
                <div className="flex items-center gap-3">
                  <div className="h-8 w-0.5 rounded-full bg-gradient-to-b from-primary to-primary/50" />
                  <h2 className="text-2xl font-black tracking-tight text-neutral-900 dark:text-neutral-100">
                    Paramètres business
                  </h2>
                </div>

                <RefSlider
                  label="Panier moyen"
                  value={avgOrder}
                  min={5}
                  max={50000}
                  step={5}
                  onChange={setAvgOrder}
                  prefix="€"
                />

                <RefSlider
                  label="Nombre d'achats par client"
                  value={ordersPerCust}
                  min={1}
                  max={10}
                  step={1}
                  onChange={setOrdersPerCust}
                />

                <RefSlider
                  label="Marge brute"
                  value={marginPct}
                  min={1}
                  max={90}
                  step={1}
                  onChange={setMarginPct}
                  suffix="%"
                />

                <RefSlider
                  label="Part du CA pour acquisition"
                  value={acqSharePct}
                  min={5}
                  max={60}
                  step={1}
                  onChange={setAcqSharePct}
                  suffix="%"
                />
              </div>
            </motion.div>

            {/* Card taux de conversion */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="group relative rounded-[3rem] overflow-hidden
                         bg-gradient-to-br from-white via-neutral-50/50 to-neutral-100/30
                         dark:from-neutral-900/50 dark:via-neutral-900/30 dark:to-neutral-900/20
                         backdrop-blur-2xl p-8
                         shadow-[0_8px_40px_-12px_rgba(0,0,0,0.08)]
                         dark:shadow-[0_8px_40px_-12px_rgba(0,0,0,0.4)]
                         transition-shadow duration-500 hover:shadow-[0_20px_60px_-12px_rgba(0,0,0,0.12)]
                         dark:hover:shadow-[0_20px_60px_-12px_rgba(0,0,0,0.6)]"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/0 via-transparent to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

              <div className="relative space-y-10">
                <div className="flex items-center gap-3">
                  <div className="h-8 w-0.5 rounded-full bg-gradient-to-b from-primary to-primary/50" />
                  <div>
                    <h2 className="text-2xl font-black tracking-tight text-neutral-900 dark:text-neutral-100">
                      Taux de conversion
                    </h2>
                    <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-1">
                      Performance de ton funnel
                    </p>
                  </div>
                </div>

                <RefSlider
                  label="Taux clic → lead"
                  value={crClickLead}
                  min={0.1}
                  max={30}
                  step={0.1}
                  onChange={setCrClickLead}
                  suffix="%"
                />

                <RefSlider
                  label="Taux lead → client"
                  value={crLeadClient}
                  min={0.1}
                  max={80}
                  step={0.1}
                  onChange={setCrLeadClient}
                  suffix="%"
                />

                {/* Taux clic → client calculé */}
                <div className="pt-4 border-t border-neutral-200/50 dark:border-neutral-800/50">
                  <div className="flex items-baseline justify-between">
                    <div className="text-xs font-bold tracking-wider text-neutral-500 dark:text-neutral-400 uppercase">
                      Taux clic → client
                    </div>
                    <div className="text-2xl font-black text-primary tabular-nums">
                      {formatPercent(crClickClient * 100)}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* ===== DROITE : RÉSULTATS ===== */}
          <div className="space-y-6 lg:sticky lg:top-8 lg:self-start">
            {/* Hero card - Enchères max */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="group relative rounded-[3rem] overflow-hidden"
            >
              {/* Gradient sky comme LeakMap */}
              <div className="absolute inset-0 bg-gradient-to-br from-sky-100 via-sky-50 to-sky-100" />

              {/* Texture lumineuse */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(255,255,255,0.15),transparent_60%)]" />

              {/* Orbs animés */}
              <div className="absolute -top-24 -right-24 w-72 h-72 bg-white/8 rounded-full blur-3xl animate-pulse" />
              <div
                className="absolute -bottom-24 -left-24 w-72 h-72 bg-white/5 rounded-full blur-3xl animate-pulse"
                style={{ animationDelay: '2s' }}
              />

              <div className="relative p-10 space-y-6">
                <div className="flex items-center gap-2 text-sky-700/60 text-[10px] font-bold tracking-[0.15em] uppercase">
                  <div className="h-1 w-1 rounded-full bg-sky-700/60 animate-pulse" />
                  Enchères maximum
                </div>

                {/* CPC max */}
                <div className="space-y-2">
                  <div className="text-sm font-semibold text-sky-700/60">
                    CPC max (coût par clic)
                  </div>
                  <div className="text-5xl font-black text-sky-700 tracking-tighter leading-none tabular-nums">
                    {cpcMax > 0 ? formatCurrency(cpcMax).split(' ')[0] : '—'}
                  </div>
                  {cpcMax > 0 && (
                    <div className="text-3xl font-bold text-sky-700/70">
                      {formatCurrency(cpcMax).split(' ')[1]}
                    </div>
                  )}
                </div>

                {/* Divider */}
                <div className="h-px bg-gradient-to-r from-transparent via-sky-200 to-transparent" />

                {/* CPL max */}
                <div className="space-y-2">
                  <div className="text-sm font-semibold text-sky-700/60">
                    CPL max (coût par lead)
                  </div>
                  <div className="text-3xl font-black text-sky-700 tabular-nums">
                    {cplMax > 0 ? formatCurrency(cplMax) : '—'}
                  </div>
                </div>

                {/* Divider */}
                <div className="h-px bg-gradient-to-r from-transparent via-sky-200 to-transparent" />

                {/* CAC max */}
                <div className="space-y-2">
                  <div className="text-sm font-semibold text-sky-700/60">
                    CAC max (coût par client)
                  </div>
                  <div className="text-3xl font-black text-sky-700 tabular-nums">
                    {formatCurrency(cacMax)}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* LTV & ROAS */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="rounded-[3rem] overflow-hidden
                         bg-gradient-to-br from-primary/10 via-primary/5 to-transparent
                         backdrop-blur-2xl p-6
                         shadow-[0_4px_20px_rgba(var(--primary),0.15)]"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="text-sm font-semibold text-neutral-700 dark:text-neutral-300">
                    LTV client (marge)
                  </div>
                  <div className="text-2xl font-black text-primary tabular-nums">
                    {formatCurrency(ltv)}
                  </div>
                </div>

                <div className="h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="text-sm font-semibold text-neutral-700 dark:text-neutral-300">
                      ROAS de rupture
                    </div>
                    <div className="text-2xl font-black text-primary tabular-nums">
                      {breakEvenRoas > 0 ? formatNumber(breakEvenRoas, 2) : '—'}
                    </div>
                  </div>
                  {breakEvenRoas > 0 && (
                    <p className="text-xs text-neutral-600 dark:text-neutral-400">
                      {formatNumber(breakEvenRoas, 2)}€ de CA pour 1€ de
                      publicité
                    </p>
                  )}
                </div>
              </div>
            </motion.div>

            {/* Mini stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="grid grid-cols-2 gap-3"
            >
              <StatCard label="Panier moyen" value={formatCurrency(avgOrder)} />
              <StatCard
                label="Achats / client"
                value={ordersPerCust.toString()}
              />
              <StatCard label="Marge brute" value={formatPercent(marginPct)} />
              <StatCard
                label="Part CA acquisition"
                value={formatPercent(acqSharePct)}
                highlight={acqSharePct > 40}
              />
            </motion.div>

            {/* Barre zone sûre */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="rounded-[3rem] overflow-hidden
                         bg-gradient-to-br from-white via-neutral-50/50 to-neutral-100/30
                         dark:from-neutral-900/50 dark:via-neutral-900/30 dark:to-neutral-900/20
                         backdrop-blur-2xl p-6
                         shadow-[0_8px_40px_-12px_rgba(0,0,0,0.08)]
                         dark:shadow-[0_8px_40px_-12px_rgba(0,0,0,0.4)]"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="text-sm font-bold text-neutral-700 dark:text-neutral-300">
                    Agressivité acquisition
                  </div>
                  <div className="text-xs text-neutral-500 dark:text-neutral-400">
                    {acqSharePct < 20 && 'Conservateur'}
                    {acqSharePct >= 20 && acqSharePct < 40 && 'Équilibré'}
                    {acqSharePct >= 40 && 'Agressif'}
                  </div>
                </div>

                <div className="relative h-3 rounded-full overflow-hidden bg-neutral-200 dark:bg-neutral-800">
                  <div
                    className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-primary/80 via-primary to-primary/90 transition-all duration-500"
                    style={{ width: `${(acqSharePct / 60) * 100}%` }}
                  />
                </div>

                <div className="flex justify-between text-xs text-neutral-500 dark:text-neutral-400">
                  <span>5%</span>
                  <span>60%</span>
                </div>
              </div>
            </motion.div>

            {/* Actions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="flex flex-col gap-3"
            >
              <Button
                size="lg"
                className="group relative h-14 rounded-2xl bg-primary text-white font-bold text-base 
                           shadow-[0_8px_30px_rgba(var(--primary),0.25)] 
                           hover:shadow-[0_12px_40px_rgba(var(--primary),0.35)] 
                           transition-all duration-300 hover:scale-[1.02] overflow-hidden"
              >
                <span className="relative z-10 flex items-center gap-2">
                  Adapter mes enchères
                  <svg
                    className="w-4 h-4 transition-transform group-hover:translate-x-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 7l5 5m0 0l-5 5m5-5H6"
                    />
                  </svg>
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
              </Button>

              <Dialog>
                <DialogTrigger asChild>
                  <Button
                    size="lg"
                    variant="ghost"
                    className="h-14 rounded-2xl font-semibold text-base
                               bg-gradient-to-r from-neutral-100/50 to-neutral-50/30
                               dark:from-neutral-900/50 dark:to-neutral-800/30
                               hover:from-neutral-100 hover:to-neutral-50
                               dark:hover:from-neutral-900 dark:hover:to-neutral-800
                               transition-all duration-300"
                  >
                    Méthodologie de calcul
                  </Button>
                </DialogTrigger>
                <DialogContent
                  className="max-w-3xl rounded-[3rem] bg-white/95 dark:bg-neutral-950/95 backdrop-blur-2xl p-0 
                                          shadow-[0_20px_80px_-12px_rgba(0,0,0,0.25)]"
                >
                  <div className="relative overflow-hidden rounded-t-[3rem] bg-gradient-to-br from-primary/10 via-primary/5 to-transparent p-10">
                    <div className="absolute top-0 right-0 w-80 h-80 bg-primary/10 rounded-full blur-3xl" />
                    <DialogHeader>
                      <DialogTitle className="relative text-4xl font-black tracking-tight text-neutral-900 dark:text-neutral-100">
                        Méthodologie
                      </DialogTitle>
                      <p className="relative text-neutral-600 dark:text-neutral-400 mt-2">
                        Comment nous calculons tes enchères maximum
                      </p>
                    </DialogHeader>
                  </div>

                  <div className="p-10 space-y-8">
                    {/* Formules */}
                    <div className="rounded-2xl bg-gradient-to-br from-neutral-100/50 to-neutral-50/30 dark:from-neutral-900/50 dark:to-neutral-800/30 p-6 space-y-4">
                      <h4 className="font-bold text-lg mb-4 flex items-center gap-2 text-neutral-900 dark:text-neutral-100">
                        <div className="h-2 w-2 rounded-full bg-primary" />
                        Formules de calcul
                      </h4>

                      <div className="space-y-3">
                        <FormulaItem
                          label="LTV"
                          formula="Panier moyen × Nb d'achats × Marge"
                        />
                        <FormulaItem
                          label="CAC max"
                          formula="LTV × Part du CA pour acquisition"
                        />
                        <FormulaItem
                          label="CPL max"
                          formula="CAC max × (taux lead → client)"
                        />
                        <FormulaItem
                          label="CPC max"
                          formula="CAC max × (taux clic → client)"
                        />
                        <FormulaItem
                          label="Taux clic → client"
                          formula="(taux clic → lead) × (taux lead → client)"
                        />
                        <FormulaItem
                          label="ROAS de rupture"
                          formula="(Panier moyen × Nb d'achats) ÷ CAC max"
                        />
                      </div>
                    </div>

                    {/* Explication */}
                    <div className="space-y-4 text-neutral-600 dark:text-neutral-400 leading-relaxed">
                      <p>
                        <strong className="text-neutral-900 dark:text-neutral-100">
                          LTV
                        </strong>{' '}
                        = combien tu gagnes en marge sur un client sur toute sa
                        vie.
                      </p>
                      <p>
                        <strong className="text-neutral-900 dark:text-neutral-100">
                          CAC max
                        </strong>{' '}
                        = combien tu peux payer pour l'acquérir en restant dans
                        la part de CA que tu as choisi.
                      </p>
                      <p>
                        En remontant le funnel avec tes taux de conversion, ça
                        donne un{' '}
                        <strong className="text-neutral-900 dark:text-neutral-100">
                          CPL max
                        </strong>{' '}
                        et un{' '}
                        <strong className="text-neutral-900 dark:text-neutral-100">
                          CPC max
                        </strong>
                        .
                      </p>
                      <p>
                        Le{' '}
                        <strong className="text-neutral-900 dark:text-neutral-100">
                          ROAS de rupture
                        </strong>{' '}
                        indique le CA minimum à générer pour chaque euro investi
                        en publicité pour couvrir tes coûts.
                      </p>
                    </div>

                    {/* Références */}
                    <div className="rounded-2xl bg-gradient-to-br from-primary/5 to-transparent p-6">
                      <h4 className="font-bold text-lg mb-4 flex items-center gap-2 text-neutral-900 dark:text-neutral-100">
                        <div className="h-2 w-2 rounded-full bg-primary animate-pulse" />
                        Références
                      </h4>
                      <div className="space-y-3 text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed">
                        <p>
                          Les concepts de{' '}
                          <strong className="text-neutral-900 dark:text-neutral-100">
                            LTV / CAC
                          </strong>{' '}
                          sont standards en marketing et SaaS (Klipfolio,
                          Reforge, etc.).
                        </p>
                        <p>
                          Le{' '}
                          <strong className="text-neutral-900 dark:text-neutral-100">
                            ROAS de rupture
                          </strong>{' '}
                          (ROAS_be = 1 / marge) est classique en achat média.
                        </p>
                      </div>
                    </div>

                    <p className="text-xs text-neutral-500 dark:text-neutral-400 italic pl-4 border-l-2 border-primary/30">
                      Ce simulateur reste pédagogique et conservateur : les
                      vrais résultats dépendent de ton secteur, panier, réachat
                      et qualité du trafic.
                    </p>
                  </div>
                </DialogContent>
              </Dialog>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ===== Slider ultra-minimaliste (style LeakMap) ===== */
function RefSlider({
  label,
  value,
  min,
  max,
  step,
  onChange,
  prefix,
  suffix,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (n: number) => void;
  prefix?: string;
  suffix?: string;
}) {
  const safeValue = Math.max(min, Math.min(max, value));
  const range = max - min;
  const pct = range > 0 ? ((safeValue - min) / range) * 100 : 0;

  const formatValue = (v: number): string => {
    if (suffix === '%') return `${formatNumber(v, 1)} %`;
    if (prefix === '€') return formatCurrency(v);
    return formatNumber(v, step < 1 ? 1 : 0);
  };

  return (
    <div className="space-y-5">
      <div className="flex items-baseline justify-between">
        <label className="text-xs font-bold tracking-wider text-neutral-500 dark:text-neutral-400 uppercase">
          {label}
        </label>
        <div className="flex items-baseline gap-2">
          <div className="text-4xl font-black text-neutral-900 dark:text-neutral-100 tabular-nums tracking-tight">
            {formatValue(safeValue).split(' ')[0]}
          </div>
          {formatValue(safeValue).split(' ')[1] && (
            <div className="text-xl font-bold text-neutral-500 dark:text-neutral-400">
              {formatValue(safeValue).split(' ')[1]}
            </div>
          )}
        </div>
      </div>

      <div className="relative h-0.5 group">
        {/* Track */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-neutral-200/90 via-neutral-100/80 to-neutral-200/90 dark:from-neutral-800 dark:via-neutral-900 dark:to-neutral-800" />

        {/* Fill */}
        <div
          className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-primary/90 via-primary to-primary/90 
                     transition-all duration-300 shadow-[0_0_20px_rgba(var(--primary),0.3)]"
          style={{ width: `${pct}%` }}
        />

        {/* Handle */}
        <div
          className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 pointer-events-none 
                     transition-all duration-300 group-hover:scale-125"
          style={{ left: `${pct}%` }}
        >
          <div className="relative">
            <div className="absolute inset-0 rounded-full bg-primary blur-lg opacity-50 group-hover:opacity-70 transition-opacity" />
            <div
              className="relative h-7 w-7 rounded-full bg-white dark:bg-neutral-950 
                            shadow-[0_0_0_1.5px_hsl(var(--primary)/0.5),0_4px_12px_rgba(0,0,0,0.2)] 
                            flex items-center justify-center"
            >
              <div className="h-1 w-1 rounded-full bg-primary" />
            </div>
          </div>
        </div>

        {/* Input */}
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={safeValue}
          onChange={(e) => onChange(Number(e.target.value))}
          className="absolute inset-0 w-full h-1.5 cursor-pointer opacity-0 z-20"
          aria-label={label}
          aria-valuemin={min}
          aria-valuemax={max}
          aria-valuenow={safeValue}
          aria-valuetext={formatValue(safeValue)}
        />
      </div>
    </div>
  );
}

/* ===== Stat card (style LeakMap) ===== */
function StatCard({
  label,
  value,
  highlight = false,
}: {
  label: string;
  value: string;
  highlight?: boolean;
}) {
  return (
    <div
      className={`group relative rounded-[2rem] p-6 transition-all duration-300 hover:scale-[1.03] 
                  ${
                    highlight
                      ? 'bg-gradient-to-br from-orange-500/10 via-orange-500/5 to-transparent shadow-sm'
                      : 'bg-gradient-to-br from-neutral-100/50 to-neutral-50/30 dark:from-neutral-900/50 dark:to-neutral-800/30 shadow-sm hover:shadow-md'
                  }`}
    >
      <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

      <div className="relative space-y-2">
        <div
          className={`text-[10px] font-bold uppercase tracking-[0.15em] ${
            highlight
              ? 'text-orange-500'
              : 'text-neutral-500 dark:text-neutral-400'
          }`}
        >
          {label}
        </div>
        <div
          className={`text-xl font-black tabular-nums tracking-tight ${
            highlight
              ? 'text-orange-500'
              : 'text-neutral-900 dark:text-neutral-100'
          }`}
        >
          {value}
        </div>
      </div>
    </div>
  );
}

/* ===== Formula item ===== */
function FormulaItem({ label, formula }: { label: string; formula: string }) {
  return (
    <div className="rounded-xl bg-white dark:bg-neutral-950 p-4 shadow-sm">
      <div className="flex items-start gap-3">
        <div className="shrink-0 font-mono text-sm font-bold text-primary">
          {label}
        </div>
        <div className="text-sm text-neutral-600 dark:text-neutral-400 flex-1">
          = {formula}
        </div>
      </div>
    </div>
  );
}
