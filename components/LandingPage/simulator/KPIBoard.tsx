'use client';
import { motion } from 'framer-motion';
import CountUp from 'react-countup';
import type { CategoryId, KPI } from '@/lib/catalog';

export function KPIBoard({
  category,
  kpi,
  adsBudget,
}: {
  category: CategoryId;
  kpi: KPI;
  adsBudget: number;
}) {
  const label =
    category === 'ecommerce'
      ? 'Commandes / mois'
      : category === 'funnel'
        ? 'Conversions / mois'
        : 'Leads / mois';
  const [tMin, tMax] = kpi.traffic;
  const [crMin, crMax] = kpi.convRate;
  const [lMin, lMax] = kpi.leads;
  const mid = (a: number, b: number) => Math.round((a + b) / 2);
  const showAds = (['landing', 'ecommerce', 'funnel'] as CategoryId[]).includes(
    category
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
      "
    >
      <div className="flex flex-col items-center text-center">
        <div className="text-[2.3rem] leading-none font-semibold tracking-[-0.04em]">
          <CountUp end={mid(tMin, tMax)} duration={1} separator=" " />
        </div>
        <div className="text-sm text-neutral-500 dark:text-neutral-400">
          Visiteurs / mois (est.)
        </div>
      </div>

      <div className="mt-5 grid grid-cols-3 gap-3">
        <div className="rounded-xl px-3 py-2 ring-1 ring-black/[0.03] dark:ring-white/[0.06] bg-white/70 dark:bg-neutral-900/70 text-center">
          <div className="text-[13px] font-semibold">
            <CountUp end={mid(lMin, lMax)} duration={0.8} separator=" " />
          </div>
          <div className="text-[11px] text-neutral-500 dark:text-neutral-400">
            {label}
          </div>
        </div>
        <div className="rounded-xl px-3 py-2 ring-1 ring-black/[0.03] dark:ring-white/[0.06] bg-white/70 dark:bg-neutral-900/70 text-center">
          <div className="text-[13px] font-semibold">
            {((crMin + crMax) / 2).toFixed(1)}%
          </div>
          <div className="text-[11px] text-neutral-500 dark:text-neutral-400">
            Taux de conv.
          </div>
        </div>
        <div className="rounded-xl px-3 py-2 ring-1 ring-black/[0.03] dark:ring-white/[0.06] bg-white/70 dark:bg-neutral-900/70 text-center">
          <div className="text-[13px] font-semibold">
            {showAds ? adsBudget.toLocaleString('fr-FR') + '€' : '—'}
          </div>
          <div className="text-[11px] text-neutral-500 dark:text-neutral-400">
            Budget pub
          </div>
        </div>
      </div>

      <div className="mt-4 text-[11px] text-neutral-500 dark:text-neutral-400 text-center">
        Estimations indicatives (secteur, saisonnalité & média influent).
      </div>
    </motion.div>
  );
}
