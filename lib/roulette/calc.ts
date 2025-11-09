// file: lib/roulette/calc.ts
export type Allocation = { seg: number; points: number }[];
export type Conversion = {
  seg: number;
  label: string;
  point_factor_pct: number;
}[];

export function computeWeights(allocation: Allocation, conversion: Conversion) {
  const mapConv = new Map(conversion.map((c) => [c.seg, c]));
  const raw = allocation.map(({ seg, points }) => {
    const f = mapConv.get(seg)?.point_factor_pct ?? 1;
    return {
      seg,
      label: mapConv.get(seg)?.label ?? `Seg ${seg}`,
      raw: Math.max(0, points) * Math.max(0, Number(f)),
    };
  });
  const sum = raw.reduce((a, r) => a + r.raw, 0);

  // Si l'utilisateur n'a alloué aucun point, distribuer 12.5% uniformément
  if (sum <= 0) {
    return raw.map((r) => ({ seg: r.seg, label: r.label, pct: 100 / 8 }));
  }

  return raw.map((r) => ({
    seg: r.seg,
    label: r.label,
    pct: (r.raw / sum) * 100,
  }));
}
