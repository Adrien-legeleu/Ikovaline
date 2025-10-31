'use client';

import { useMemo } from 'react';

// 👉 même shape que computeKPI() renvoie
export type KPI = {
  traffic: [number, number];
  convRate: [number, number];
  leads: [number, number];
};

// Ici on ne lock plus sur 'essential' | 'boost' | 'luxe'
// On accepte littéralement n'importe quel string de tier,
// parce qu'on a maintenant 'starter' | 'pro' | 'premium' | 'ultra'
// selon la catégorie (landing, vitrine, etc.)
type StatsEstimateMiniProps = {
  kpi: KPI;
  tierId: string;
  tierName: string;
  adsBudget: number;
};

export default function StatsEstimateMini({
  kpi,
  tierId,
  tierName,
  adsBudget,
}: StatsEstimateMiniProps) {
  // Ancien code faisait des boosts custom par palier "boost"/"luxe".
  // Maintenant ces boosts ne sont plus cohérents (nouvelles offres).
  // On garde un hook calculé pour rester extensible si tu veux rebooster plus tard,
  // mais pour l’instant c’est juste identique au KPI d’entrée.
  const normalized = useMemo(() => {
    let [tMin, tMax] = kpi.traffic;
    let [crMin, crMax] = kpi.convRate;
    let [lMin, lMax] = kpi.leads;

    // 👉 Si plus tard tu veux dire "premium = +10%" etc.
    // tu peux le faire ici via tierId.
    // Pour l’instant : rien.

    return {
      traffic: [tMin, tMax] as [number, number],
      convRate: [crMin, crMax] as [number, number],
      leads: [lMin, lMax] as [number, number],
    };
  }, [kpi, tierId, adsBudget]);

  const visitorsMid = Math.round(
    (normalized.traffic[0] + normalized.traffic[1]) / 2
  );
  const leadsMid = Math.round((normalized.leads[0] + normalized.leads[1]) / 2);
  const convMid = (
    (normalized.convRate[0] + normalized.convRate[1]) / 2 || 0
  ).toFixed(1);

  return (
    <div className="grid grid-cols-3 gap-3 text-center">
      <InfoBox
        label="Visiteurs / mois"
        value={visitorsMid.toLocaleString('fr-FR')}
      />
      <InfoBox label="Leads / mois" value={leadsMid.toLocaleString('fr-FR')} />
      <InfoBox label="Taux conv." value={`${convMid}%`} />

      <p className="col-span-3 text-[11px] text-muted-foreground">
        Estimations indicatives (secteur, saisonnalité, concurrence).
      </p>
    </div>
  );
}

function InfoBox({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl bg-black/5 dark:bg-white/10 p-3">
      <div className="text-xl font-extrabold">{value}</div>
      <div className="text-[11px] text-muted-foreground">{label}</div>
    </div>
  );
}
