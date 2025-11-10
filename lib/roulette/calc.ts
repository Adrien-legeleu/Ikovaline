// file: lib/roulette/calc.ts

export type Allocation = { seg: number; points: number }[];
export type Conversion = {
  seg: number;
  label: string;
  point_factor_pct: number;
}[];

export type WheelSegment = {
  seg: number;
  label: string;
  pct: number;
};

/**
 * Calcule les probabilités réelles pour chaque segment de la roue
 *
 * LOGIQUE :
 * - Pour chaque segment : probabilité_brute = points × coefficient
 * - Les segments avec 0 point sont inclus avec pct=0 (le composant roue les filtrera)
 * - Normalisation : pct = (probabilité_brute / somme_totale) × 100
 *
 * @param allocation - Répartition des points par l'utilisateur (seg → points)
 * @param conversion - Table des coefficients (seg → coef)
 * @returns Array de segments avec leurs probabilités en %
 */
export function computeWeights(
  allocation: Allocation,
  conversion: Conversion
): WheelSegment[] {
  const mapConv = new Map(conversion.map((c) => [c.seg, c]));

  // Calcul : percent_raw = points × coef
  const raw = allocation.map(({ seg, points }) => {
    const coef = mapConv.get(seg)?.point_factor_pct ?? 1;
    return {
      seg,
      label: mapConv.get(seg)?.label ?? `Seg ${seg}`,
      raw: Math.max(0, points) * Math.max(0, Number(coef)),
    };
  });

  const sum = raw.reduce((a, r) => a + r.raw, 0);

  // Si l'utilisateur n'a alloué aucun point, distribuer 12.5% uniformément
  if (sum <= 0) {
    return raw.map((r) => ({ seg: r.seg, label: r.label, pct: 100 / 8 }));
  }

  // Normalisation pour avoir un total de 100%
  return raw.map((r) => ({
    seg: r.seg,
    label: r.label,
    pct: (r.raw / sum) * 100,
  }));
}

/**
 * Filtre les segments actifs (pct > 0) pour l'affichage sur la roue
 *
 * IMPORTANT : Les segments avec 0% ne doivent PAS apparaître sur la roue
 * (pas de triangle, pas de texte, pas de part).
 *
 * @param weights - Segments avec probabilités
 * @returns Uniquement les segments avec pct > 0
 */
export function getActiveSegments(weights: WheelSegment[]): WheelSegment[] {
  return weights.filter((w) => w.pct > 0);
}
