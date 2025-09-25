// lib/offers/kpi.ts
import type { OptionId } from './pricing';

export type KPI = {
  traffic: [number, number]; // visites/mois
  convRate: [number, number]; // %
  leads: [number, number]; // leads/mois
};

const BASE_TRAFFIC: [number, number] = [200, 600];
const BASE_CR: [number, number] = [0.8, 1.6]; // %

const OPT_IMPACTS: Record<
  OptionId,
  { trafficPct?: [number, number]; convPct?: [number, number] }
> = {
  admin: { convPct: [2, 6] },
  ssl: { trafficPct: [0, 1], convPct: [1, 2] },
  backups: { convPct: [0, 1] },
  speed: { trafficPct: [1, 4], convPct: [3, 12] },
  analytics: { convPct: [1, 4] },
  support12: { trafficPct: [0, 2], convPct: [1, 4] },
  seo: { trafficPct: [20, 80], convPct: [2, 8] },
  uxui: { trafficPct: [0, 4], convPct: [10, 35] },
  landing: { trafficPct: [4, 20], convPct: [3, 12] },
  social: { trafficPct: [1, 4], convPct: [0, 2] },
};

const clamp = (n: number, min: number, max: number) =>
  Math.max(min, Math.min(max, n));

export function computeKPI(selected: OptionId[]): KPI {
  let [tMin, tMax] = BASE_TRAFFIC;
  let [crMin, crMax] = BASE_CR;

  selected.forEach((id) => {
    const imp = OPT_IMPACTS[id];
    if (!imp) return;
    if (imp.trafficPct) {
      tMin = Math.round(tMin * (1 + imp.trafficPct[0] / 100));
      tMax = Math.round(tMax * (1 + imp.trafficPct[1] / 100));
    }
    if (imp.convPct) {
      crMin = +(crMin * (1 + imp.convPct[0] / 100)).toFixed(2);
      crMax = +(crMax * (1 + imp.convPct[1] / 100)).toFixed(2);
    }
  });

  crMin = clamp(+crMin.toFixed(2), 0.5, 3.5);
  crMax = clamp(+crMax.toFixed(2), 1.0, 4.5);

  const leadsMin = Math.round((tMin * crMin) / 100);
  const leadsMax = Math.round((tMax * crMax) / 100);

  return {
    traffic: [tMin, tMax],
    convRate: [crMin, crMax],
    leads: [leadsMin, leadsMax],
  };
}

export const kpiNarrative = (selected: OptionId[]): string[] => {
  const notes: string[] = [];
  if (selected.includes('uxui'))
    notes.push(
      'UX/UI : friction réduite, confiance accrue → conversions en hausse.'
    );
  if (selected.includes('seo'))
    notes.push('SEO : progression organique 3–6 mois puis effets cumulatifs.');
  if (selected.includes('landing'))
    notes.push(
      'Landing dédiée : baisse du CPA, meilleure pertinence annonces.'
    );
  if (selected.includes('speed'))
    notes.push('Vitesse : INP/LCP meilleurs, gains surtout sur mobile.');
  if (selected.includes('analytics'))
    notes.push('Analytics : boucle d’optimisation plus fine.');
  return notes;
};
