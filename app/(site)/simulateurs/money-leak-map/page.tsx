// app/simulateurs/money-leak-map/page.tsx
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
import Link from 'next/link';

/* ===== Barème pénalités ===== */
type LeakKey = 'form' | 'hero' | 'slow' | 'noproof' | 'ctahidden' | 'mobile';

const PENALTIES: Record<LeakKey, number> = {
  form: 0.18,
  hero: 0.12,
  slow: 0.12,
  noproof: 0.1,
  ctahidden: 0.08,
  mobile: 0.2,
};

const LEAK_LABELS: Record<LeakKey, string> = {
  form: 'Formulaire complexe',
  hero: 'Message peu clair',
  slow: 'Temps de chargement',
  noproof: 'Manque de preuve sociale',
  ctahidden: 'CTA non évident',
  mobile: 'UX mobile défaillante',
};

/* ===== Formatage ===== */
function formatCurrency(value: number): string {
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'EUR',
    maximumFractionDigits: 0,
  }).format(value);
}

function formatNumber(value: number, decimals = 0): string {
  return new Intl.NumberFormat('fr-FR', {
    maximumFractionDigits: decimals,
  }).format(value);
}

export default function MoneyLeakMap() {
  const [visits, setVisits] = useState(3000);
  const [conv, setConv] = useState(1.5);
  const [value, setValue] = useState(400);
  const [leaks, setLeaks] = useState<Record<LeakKey, boolean>>({
    form: true,
    hero: false,
    slow: false,
    noproof: true,
    ctahidden: false,
    mobile: false,
  });

  const { loss, currentRev, potentialRev, potentialConv, ranking } =
    useMemo(() => {
      const safeVisits = Math.max(0, visits);
      const safeConv = Math.max(0.1, Math.min(100, conv));
      const safeValue = Math.max(0, value);
      const convDec = safeConv / 100;

      const activeLeaks = (Object.keys(leaks) as LeakKey[]).filter(
        (k) => leaks[k]
      );
      const product =
        activeLeaks.length > 0
          ? activeLeaks.reduce((acc, k) => acc * (1 - PENALTIES[k]), 1)
          : 1;

      const rawPotential = convDec / product;
      const convPot = Math.min(12, Math.max(0, rawPotential * 100));

      const caActuel = safeVisits * convDec * safeValue;
      const caPot = safeVisits * (convPot / 100) * safeValue;
      const perte = Math.max(0, caPot - caActuel);

      const impacts = (Object.keys(leaks) as LeakKey[])
        .map((k) => {
          if (!leaks[k]) return { key: k, gain: 0 };
          const penalty = PENALTIES[k];
          const productWithoutK = product / (1 - penalty);
          const rawConvWithoutK = convDec / productWithoutK;
          const convSansK = Math.min(12, Math.max(0, rawConvWithoutK * 100));
          const caSansK = safeVisits * (convSansK / 100) * safeValue;
          return { key: k, gain: Math.max(0, caSansK - caActuel) };
        })
        .sort((a, b) => b.gain - a.gain);

      return {
        loss: perte,
        currentRev: caActuel,
        potentialRev: caPot,
        potentialConv: convPot,
        ranking: impacts,
      };
    }, [visits, conv, value, leaks]);

  // ✅ Fix de l’affichage de la perte (avant tu faisais split('') → un seul caractère)
  const formattedLoss = formatCurrency(loss);
  const lossParts = formattedLoss.split(' ');
  const lossMain = lossParts[0] ?? formattedLoss;
  const lossUnit = lossParts[1] ?? '';

  return (
    <section className="relative w-full min-h-screen py-12 pt-32 bg-white dark:bg-neutral-950">
      <div className="mx-auto max-w-7xl px-6 md:px-8">
        {/* Glows ambiants ultra-subtils */}
        <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
          <div className="absolute top-0 left-1/4 w-[700px] h-[700px] bg-primary/3 dark:bg-primary/10 rounded-full blur-[140px] animate-pulse" />
          <div
            className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-primary/2 dark:bg-primary/10 rounded-full blur-[120px] animate-pulse"
            style={{ animationDelay: '2s' }}
          />
        </div>

        {/* Hero ultra-minimaliste */}
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
              Analyseur de performance
            </motion.div>

            <h1 className="text-5xl md:text-8xl font-black tracking-tighter leading-none">
              <span className="bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-700 dark:from-neutral-100 dark:via-neutral-200 dark:to-neutral-300 bg-clip-text text-transparent">
                Ikovaline
              </span>
              <br />
              <span className="bg-gradient-to-r from-primary via-primary/90 to-primary/70 bg-clip-text text-transparent">
                LeakMap
              </span>
            </h1>

            <p className="mx-auto max-w-2xl text-lg md:text-xl text-neutral-600 dark:text-neutral-400 font-light leading-relaxed">
              Identifie en temps réel les frictions qui détruisent ta conversion
              et leur impact financier exact.
            </p>
          </div>
        </motion.div>

        {/* Layout principal */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_420px] lg:gap-12">
          {/* ===== GAUCHE : CONTRÔLES ===== */}
          <div className="space-y-6">
            {/* Sliders */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="group relative rounded-[3rem] overflow-hidden
                         bg-gradient-to-br from-white via-neutral-50/50 to-neutral-100/30
                         dark:from-neutral-900/70 dark:via-neutral-900/40 dark:to-neutral-900/30
                         backdrop-blur-2xl p-8
                         shadow-[0_8px_40px_-12px_rgba(0,0,0,0.08)]
                         dark:shadow-[0_8px_40px_-12px_rgba(0,0,0,0.6)]
                         transition-shadow duration-500 hover:shadow-[0_20px_60px_-12px_rgba(0,0,0,0.12)]
                         dark:hover:shadow-[0_20px_60px_-12px_rgba(0,0,0,0.7)]"
            >
              {/* Gradient subtil au hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/0 via-transparent to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

              <div className="relative space-y-10">
                <div className="flex items-center gap-3">
                  <div className="h-8 w-0.5 rounded-full bg-gradient-to-b from-primary to-primary/50" />
                  <h2 className="text-2xl font-black tracking-tight text-neutral-900 dark:text-neutral-100">
                    Paramètres
                  </h2>
                </div>

                <RefSlider
                  label="Trafic mensuel"
                  value={visits}
                  min={100}
                  max={50000}
                  step={100}
                  onChange={setVisits}
                />
                <RefSlider
                  label="Taux de conversion"
                  value={conv}
                  min={0.1}
                  max={10}
                  step={0.1}
                  onChange={setConv}
                  suffix="%"
                />
                <RefSlider
                  label="Valeur client moyenne"
                  value={value}
                  min={50}
                  max={50000}
                  step={50}
                  onChange={setValue}
                  prefix="€"
                />
              </div>
            </motion.div>

            {/* Points de friction */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="group relative rounded-[3rem] overflow-hidden
                         bg-gradient-to-br from-white via-neutral-50/50 to-neutral-100/30
                         dark:from-neutral-900/70 dark:via-neutral-900/40 dark:to-neutral-900/30
                         backdrop-blur-2xl p-8
                         shadow-[0_8px_40px_-12px_rgba(0,0,0,0.08)]
                         dark:shadow-[0_8px_40px_-12px_rgba(0,0,0,0.6)]
                         transition-shadow duration-500 hover:shadow-[0_20px_60px_-12px_rgba(0,0,0,0.12)]
                         dark:hover:shadow-[0_20px_60px_-12px_rgba(0,0,0,0.7)]"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/0 via-transparent to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

              <div className="relative space-y-6">
                <div className="flex items-center gap-3">
                  <div className="h-8 w-0.5 rounded-full bg-gradient-to-b from-primary to-primary/50" />
                  <div>
                    <h2 className="text-2xl font-black tracking-tight text-neutral-900 dark:text-neutral-100">
                      Points de friction
                    </h2>
                    <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-1">
                      Sélectionne les problèmes détectés
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-5">
                  {(Object.keys(leaks) as LeakKey[]).map((k) => (
                    <Chip
                      key={k}
                      label={LEAK_LABELS[k]}
                      checked={leaks[k]}
                      onChange={(v) => setLeaks((p) => ({ ...p, [k]: v }))}
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          </div>

          {/* ===== DROITE : RÉSULTATS ===== */}
          <div className="space-y-6 lg:sticky lg:top-8 lg:self-start">
            {/* Hero card perte */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="group relative rounded-[3rem] overflow-hidden"
            >
              {/* Gradient primary */}
              <div className="absolute inset-0 bg-gradient-to-br from-sky-100 via-sky-50 to-sky-100 dark:from-sky-950 dark:via-sky-900 dark:to-sky-950" />

              {/* Texture lumineuse */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(255,255,255,0.15),transparent_60%)] dark:bg-[radial-gradient(circle_at_50%_120%,rgba(255,255,255,0.06),transparent_60%)]" />

              {/* Orbs animés */}
              <div className="absolute -top-24 -right-24 w-72 h-72 bg-white/8 dark:bg-white/5 rounded-full blur-3xl animate-pulse" />
              <div
                className="absolute -bottom-24 -left-24 w-72 h-72 bg-white/5 dark:bg-white/3 rounded-full blur-3xl animate-pulse"
                style={{ animationDelay: '2s' }}
              />

              <div className="relative p-10 space-y-6">
                <div className="flex items-center gap-2 text-primary-foreground/60 text-[10px] font-bold tracking-[0.15em] uppercase">
                  <div className="h-1 w-1 rounded-full bg-primary-foreground/60 animate-pulse" />
                  Perte mensuelle estimée
                </div>

                <div className="space-y-2">
                  <div className="text-5xl font-black text-primary-foreground tracking-tighter leading-none tabular-nums">
                    {lossMain}
                  </div>
                  {lossUnit && (
                    <div className="text-3xl font-bold text-primary-foreground/70">
                      {lossUnit}
                    </div>
                  )}
                </div>

                <div className="inline-flex items-center gap-4 rounded-2xl bg-sky-100 dark:bg-sky-900/40 backdrop-blur-md px-6 py-4">
                  <div className="text-sm text-primary-foreground/70 font-semibold">
                    Annuel
                  </div>
                  <div className="h-5 w-px bg-white/20" />
                  <div className="text-2xl font-black text-primary-foreground tabular-nums">
                    {formatCurrency(loss * 12)}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Métriques */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="grid grid-cols-2 gap-3"
            >
              <Stat
                label="Actuel"
                value={formatCurrency(currentRev)}
                sublabel="CA mensuel"
              />
              <Stat
                label="Potentiel"
                value={formatCurrency(potentialRev)}
                sublabel="Après correction"
                highlight
              />
              <Stat
                label="Conv. cible"
                value={`${formatNumber(potentialConv, 2)}%`}
                sublabel="Après optimisation"
              />
              <Stat
                label="Blocages"
                value={`${Object.values(leaks).filter(Boolean).length}`}
                sublabel="Problèmes actifs"
                alert
              />
            </motion.div>

            {/* Priorités */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="rounded-[3rem] overflow-hidden
                         bg-gradient-to-br from-white via-neutral-50/50 to-neutral-100/30
                         dark:from-neutral-900/70 dark:via-neutral-900/40 dark:to-neutral-900/30
                         backdrop-blur-2xl p-6
                         shadow-[0_8px_40px_-12px_rgba(0,0,0,0.08)]
                         dark:shadow-[0_8px_40px_-12px_rgba(0,0,0,0.6)]"
            >
              <h3 className="mb-6 flex items-center gap-2 text-[10px] font-bold tracking-[0.15em] text-neutral-500 dark:text-neutral-400 uppercase">
                <div className="h-1 w-1 rounded-full bg-primary animate-pulse" />
                Axes prioritaires
              </h3>

              <div className="space-y-3">
                {ranking.slice(0, 3).map((r, idx) => (
                  <div
                    key={r.key}
                    className="group relative flex items-center gap-4 rounded-[2rem] 
                               bg-gradient-to-r from-neutral-100/50 via-neutral-50/30 to-transparent
                               dark:from-neutral-800/60 dark:via-neutral-900/40 dark:to-transparent
                               p-4 transition-all duration-300 
                               hover:from-primary/10 hover:via-primary/5 hover:scale-[1.02]
                               shadow-sm hover:shadow-md"
                  >
                    <div className="relative flex h-10 w-10 shrink-0 items-center justify-center">
                      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary/10 to-primary/5 group-hover:from-primary/20 group-hover:to-primary/10 transition-all" />
                      <span className="relative text-lg font-black text-primary tabular-nums">
                        {idx + 1}
                      </span>
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-bold text-neutral-900 dark:text-neutral-100">
                        {LEAK_LABELS[r.key]}
                      </div>
                    </div>

                    <div className="shrink-0 text-right">
                      <div className="text-base font-black text-primary tabular-nums">
                        +{formatCurrency(r.gain)}
                      </div>
                      <div className="text-xs text-neutral-500 dark:text-neutral-400">
                        /mois
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Actions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="flex flex-col gap-3"
            >
              <Link
                href="/contact"
                className="group relative flex items-center justify-center h-14 rounded-[2rem] bg-primary text-white font-bold text-base 
                           shadow-[0_8px_30px_rgba(0,0,0,0.25)] 
                           hover:shadow-[0_12px_40px_rgba(0,0,0,0.35)] 
                           transition-all duration-300 hover:scale-[1.02] overflow-hidden"
              >
                <span className="relative z-10 flex items-center gap-2">
                  Corriger ces fuites
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
              </Link>

              <Dialog>
                <DialogTrigger asChild>
                  <Button
                    size="lg"
                    variant="ghost"
                    className="h-14 rounded-[2rem] font-semibold text-base
                               bg-gradient-to-r from-neutral-100/50 to-neutral-50/30
                               dark:from-neutral-900/70 dark:to-neutral-800/40
                               hover:from-neutral-100 hover:to-neutral-50
                               dark:hover:from-neutral-900 dark:hover:to-neutral-800
                               transition-all duration-300"
                  >
                    Méthodologie de calcul
                  </Button>
                </DialogTrigger>
                <DialogContent
                  className="max-w-3xl w-[min(100vw-2rem,900px)] max-h-[80vh] overflow-y-auto rounded-3xl 
                             bg-white/95 dark:bg-neutral-950/95 backdrop-blur-2xl p-0 
                             shadow-[0_20px_80px_-12px_rgba(0,0,0,0.25)]"
                >
                  <div className="relative overflow-hidden rounded-t-3xl bg-gradient-to-br from-primary/10 via-primary/5 to-transparent dark:from-primary/20 dark:via-primary/10 dark:to-transparent p-10">
                    <div className="absolute top-0 right-0 w-80 h-80 bg-primary/10 rounded-full blur-3xl" />
                    <DialogHeader>
                      <DialogTitle className="relative text-4xl font-black tracking-tight text-neutral-900 dark:text-neutral-100">
                        Méthodologie
                      </DialogTitle>
                      <p className="relative text-neutral-600 dark:text-neutral-400 mt-2">
                        Comprends comment nous calculons ton potentiel
                      </p>
                    </DialogHeader>
                  </div>

                  <div className="p-10 space-y-8">
                    <div className="rounded-2xl bg-gradient-to-br from-neutral-100/50 to-neutral-50/30 dark:from-neutral-900/60 dark:to-neutral-800/40 p-6">
                      <h4 className="font-bold text-lg mb-4 flex items-center gap-2 text-neutral-900 dark:text-neutral-100">
                        <div className="h-2 w-2 rounded-full bg-primary" />
                        Formule de calcul
                      </h4>
                      <code
                        className="block rounded-xl bg-white dark:bg-neutral-950 p-4 text-sm font-mono text-neutral-900 dark:text-neutral-100
                                       shadow-sm"
                      >
                        CA = Visites × (Conv% ÷ 100) × Valeur client
                      </code>
                    </div>

                    <div className="space-y-4 text-neutral-600 dark:text-neutral-400 leading-relaxed">
                      <p>
                        La{' '}
                        <strong className="text-neutral-900 dark:text-neutral-100">
                          conversion potentielle
                        </strong>{' '}
                        élimine l&apos;impact cumulé des frictions via le
                        produit des facteurs{' '}
                        <code className="text-xs bg-neutral-100 dark:bg-neutral-900 px-2 py-1 rounded">
                          (1 − pénalité)
                        </code>
                        .
                      </p>
                      <p>
                        Le{' '}
                        <strong className="text-neutral-900 dark:text-neutral-100">
                          manque à gagner
                        </strong>{' '}
                        représente l&apos;écart entre ton CA actuel et ton
                        potentiel de revenus après correction.
                      </p>
                      <p className="text-sm">
                        Nous appliquons une borne maximale de{' '}
                        <strong className="text-neutral-900 dark:text-neutral-100">
                          12%
                        </strong>{' '}
                        au taux de conversion pour garantir des résultats
                        réalistes.
                      </p>
                    </div>

                    <div className="rounded-2xl bg-gradient-to-br from-primary/5 to-transparent dark:from-primary/10 dark:to-transparent p-6 space-y-5">
                      <h4 className="font-bold text-lg flex items-center gap-2 text-neutral-900 dark:text-neutral-100">
                        <div className="h-2 w-2 rounded-full bg-primary animate-pulse" />
                        Barème des pénalités
                      </h4>
                      <div className="space-y-3">
                        <PenaltyItem
                          label="Formulaire complexe"
                          penalty="18%"
                          source="Baymard Institute"
                        />
                        <PenaltyItem
                          label="Message peu clair"
                          penalty="12%"
                          source="Nielsen Norman Group"
                        />
                        <PenaltyItem
                          label="Temps de chargement"
                          penalty="12%"
                          source="Google/Deloitte"
                        />
                        <PenaltyItem
                          label="Manque de preuve sociale"
                          penalty="10%"
                          source="Spiegel Research"
                        />
                        <PenaltyItem
                          label="CTA non évident"
                          penalty="8%"
                          source="NN/g"
                        />
                        <PenaltyItem
                          label="UX mobile défaillante"
                          penalty="20%"
                          source="Benchmarks 2024-25"
                        />
                      </div>
                    </div>

                    <p
                      className="text-xs text-neutral-500 dark:text-neutral-400 italic pl-4 
                                  border-l-2 border-primary/30"
                    >
                      Estimations basées sur des études publiques reconnues. Les
                      résultats réels varient selon le secteur, le produit et la
                      qualité du trafic.
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

/* ===== Slider ultra-minimaliste ===== */
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
    return formatNumber(v);
  };

  const formatted = formatValue(safeValue);
  const parts = formatted.split(' ');
  const main = parts[0] ?? formatted;
  const unit = parts[1] ?? '';

  return (
    <div className="space-y-5">
      <div className="flex items-baseline justify-between">
        <label className="text-xs font-bold tracking-wider text-neutral-500 dark:text-neutral-400 uppercase">
          {label}
        </label>
        <div className="flex items-baseline gap-2">
          <div className="text-4xl font-black text-neutral-900 dark:text-neutral-100 tabular-nums tracking-tight">
            {main}
          </div>
          {unit && (
            <div className="text-xl font-bold text-neutral-500 dark:text-neutral-400">
              {unit}
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
                     transition-all duration-300 shadow-[0_0_20px_rgba(0,0,0,0.3)]"
          style={{ width: `${pct}%` }}
        />

        {/* Handle */}
        <div
          className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 pointer-events-none 
                     transition-all duration-300 group-hover:scale-125"
          style={{ left: `${pct}%` }}
        >
          <div className="relative">
            <div className="absolute inset-0 rounded-full bg-primary blur-lg opacity-20 group-hover:opacity-30 transition-opacity" />
            <div
              className="relative h-7 w-7 rounded-full bg-white dark:bg-neutral-950 
                            shadow-[0_0_0_1.5px_hsl(var(--primary)/0.3),0_4px_12px_rgba(0,0,0,0.01)] 
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
        />
      </div>
    </div>
  );
}

/* ===== Chip minimaliste ===== */
function Chip({
  checked,
  label,
  onChange,
}: {
  checked: boolean;
  label: string;
  onChange: (v: boolean) => void;
}) {
  return (
    <button
      type="button"
      onClick={() => onChange(!checked)}
      className={`relative rounded-[2rem] px-4 py-3.5 text-sm font-bold transition-all duration-300 
                  ${
                    checked
                      ? 'bg-gradient-to-br from-sky-100 via-sky-50 to-sky-100 text-sky-400 shadow-[0_4px_20px_rgba(0,0,0,0.05)] scale-105 dark:from-sky-900/60 dark:via-sky-900/40 dark:to-sky-900/60'
                      : 'bg-neutral-100/50 dark:bg-neutral-900/50 text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-900 hover:scale-105'
                  }`}
      aria-pressed={checked}
    >
      {checked && (
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/20 to-transparent pointer-events-none" />
      )}
      <span className="relative">{label}</span>
    </button>
  );
}

/* ===== Stat card ===== */
function Stat({
  label,
  value,
  sublabel,
  highlight = false,
  alert = false,
}: {
  label: string;
  value: string;
  sublabel?: string;
  highlight?: boolean;
  alert?: boolean;
}) {
  return (
    <div
      className={`group relative rounded-[2rem] p-6 transition-all duration-300 hover:scale-[1.03] 
                  ${
                    highlight
                      ? 'bg-gradient-to-br from-primary/10 via-primary/5 to-transparent shadow-[0_4px_20px_rgba(0,0,0,0.05)] dark:from-primary/20 dark:via-primary/10 dark:to-transparent'
                      : alert
                        ? 'bg-gradient-to-br from-orange-500/10 via-orange-500/5 to-transparent dark:from-orange-500/20 dark:via-orange-500/10 dark:to-transparent'
                        : 'bg-gradient-to-br from-neutral-100/50 to-neutral-50/30 dark:from-neutral-900/60 dark:to-neutral-800/40 shadow-sm hover:shadow-md'
                  }`}
    >
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

      <div className="relative space-y-2">
        <div className="flex items-center gap-2">
          <div
            className={`text-[10px] font-bold uppercase tracking-[0.15em] 
                        ${highlight ? 'text-primary' : alert ? 'text-orange-500' : 'text-neutral-500 dark:text-neutral-400'}`}
          >
            {label}
          </div>
          {(highlight || alert) && (
            <div
              className={`h-1 w-1 rounded-full animate-pulse ${highlight ? 'bg-primary' : 'bg-orange-500'}`}
            />
          )}
        </div>

        <div
          className={`text-3xl font-black tabular-nums tracking-tight 
                      ${highlight ? 'text-primary' : alert ? 'text-orange-500' : 'text-neutral-900 dark:text-neutral-100'}`}
        >
          {value}
        </div>

        {sublabel && (
          <div className="text-xs text-neutral-500 dark:text-neutral-400">
            {sublabel}
          </div>
        )}
      </div>
    </div>
  );
}

/* ===== Penalty item ===== */
function PenaltyItem({
  label,
  penalty,
  source,
}: {
  label: string;
  penalty: string;
  source: string;
}) {
  return (
    <div
      className="group flex items-start justify-between gap-4 rounded-xl 
                    bg-gradient-to-r from-neutral-100/50 to-transparent 
                    dark:from-neutral-900/60 dark:to-transparent 
                    p-4 transition-all hover:from-primary/5 hover:scale-[1.02]"
    >
      <div className="flex-1 space-y-1">
        <div className="font-bold text-neutral-900 dark:text-neutral-100 group-hover:text-primary transition-colors">
          {label}
        </div>
        <div className="text-xs text-neutral-500 dark:text-neutral-400">
          {source}
        </div>
      </div>
      <div className="shrink-0 rounded-full bg-primary/10 px-3 py-1.5 text-sm font-black text-primary tabular-nums">
        −{penalty}
      </div>
    </div>
  );
}
