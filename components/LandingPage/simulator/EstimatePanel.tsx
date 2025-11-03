'use client';
import { motion } from 'framer-motion';
import CountUp from 'react-countup';
import type { CategoryId, KPI } from '@/lib/catalog';
import { Slider } from '@/components/ui/slider';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  Tooltip,
  ReferenceDot,
} from 'recharts';

export function EstimatePanel({
  category,
  total,
  delayDays,
  kpi,
  adsBudget,
  onAds,
}: {
  category: CategoryId;
  total: number;
  delayDays: number;
  kpi: KPI;
  adsBudget: number;
  onAds: (v: number) => void;
}) {
  const showAds = (
    ['landing', 'ecommerce', 'funnel', 'saas', 'vitrine'] as CategoryId[]
  ).includes(category);

  // Dataset "projection leads" en fonction du budget pub
  const midLeads = Math.round((kpi.leads[0] + kpi.leads[1]) / 2);

  // On génère une courbe réaliste : forte croissance au début, puis stabilisation
  const data = [0, 500, 1000, 1500, 2000, 3000, 4000, 5000].map((b) => ({
    budget: b,
    leads: Math.round(midLeads * (1 + Math.pow(b / 5000, 0.8) * 2.5)),
  }));

  // Trouve la valeur de leads correspondant au budget sélectionné (pour afficher le point)
  const selectedPoint = data.find(
    (d) => d.budget === Math.round(adsBudget / 500) * 500
  );

  return (
    <motion.div
      initial={{ opacity: 0, filter: 'blur(12px)', y: 12 }}
      animate={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
      transition={{ duration: 0.3 }}
      className="
        rounded-[3rem] p-5 sm:p-6
        bg-white dark:bg-neutral-900
        ring-1 ring-black/[0.03] dark:ring-white/[0.06]
        shadow-[0_28px_64px_rgba(0,0,0,0.06),0_2px_4px_rgba(0,0,0,0.03)]
        space-y-4
      "
    >
      <div className="text-sm font-semibold tracking-[-0.01em]">Résumé</div>

      {/* Total */}
      <div className="flex items-center justify-between">
        <div className="text-sm text-neutral-500 dark:text-neutral-400">
          Total TTC
        </div>
        <div className="text-[1.6rem] leading-none font-semibold tracking-[-0.03em]">
          <CountUp end={total} duration={0.8} separator=" " />€
        </div>
      </div>

      {/* Délai */}
      <div className="flex items-center justify-between text-sm">
        <span className="text-neutral-500 dark:text-neutral-400">
          Délai estimé
        </span>
        <span className="font-medium">~ {delayDays} jours</span>
      </div>

      {showAds && (
        <div className="pt-3 space-y-3">
          {/* Budget pub */}
          <div className="flex items-center justify-between">
            <div className="font-medium">Budget publicitaire mensuel</div>
            <div className="text-sm text-neutral-600 dark:text-neutral-300">
              {adsBudget.toLocaleString('fr-FR')}€
            </div>
          </div>

          <Slider
            defaultValue={[adsBudget]}
            max={5000}
            step={50}
            onValueChange={(v) => onAds(v[0] ?? 0)}
          />

          {/* Indicateur résumé */}
          <div className="text-[11px] text-right text-neutral-500 dark:text-neutral-400">
            Votre budget actuel : {adsBudget.toLocaleString('fr-FR')}€ ≈{' '}
            <span className="font-medium text-sky-600">
              {Math.round((kpi.leads[0] + kpi.leads[1]) / 2)} leads / mois
            </span>
          </div>
        </div>
      )}

      <div className="pt-1 text-[11px] text-neutral-400 dark:text-neutral-500">
        Chiffrage indicatif basé sur votre sélection. Ajustable avant
        validation.
      </div>
    </motion.div>
  );
}
