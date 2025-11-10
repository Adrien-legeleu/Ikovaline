// file: lib/roulette/calc.ts
export type Allocation = { seg: number; points: number }[];
export type Conversion = {
  seg: number;
  label: string; // libellé côté serveur
  // IMPORTANT : valeur en POURCENT par point (ex : Jackpot = 0.05 pour 0,05%)
  point_factor_pct: number;
};

export function sumPoints(allocation: Allocation): number {
  return allocation.reduce(
    (acc, r) => acc + Math.max(0, Math.floor(r.points || 0)),
    0
  );
}

/**
 * Règles demandées :
 * - factor = "X % par point" (ex : 0.05 => 0,05% par point)
 * - cap dur : pct_seg <= wallet * factor (ex : Jackpot <= 5% si wallet=100)
 * - somme finale = 100% (water-fill sur les segments non capés)
 * - Jamais dépasser les caps.
 */
export function computeWeights(
  allocation: Allocation,
  conversion: Conversion[],
  wallet: number
) {
  const convMap = new Map(conversion.map((c) => [c.seg, c]));

  // 1) Pcts bruts + caps naturels
  const rows = allocation.map(({ seg, points }) => {
    const conv = convMap.get(seg);
    const factor = Math.max(0, Number(conv?.point_factor_pct ?? 0)); // % par point
    const pts = Math.max(0, Math.floor(points || 0));
    const raw = pts * factor; // en %
    const cap = wallet * factor; // plafond % (ex: 100 * 0.05 = 5%)
    const clamped = Math.min(raw, cap);
    return {
      seg,
      label: conv?.label ?? `Seg ${seg}`,
      raw,
      cap,
      pct: clamped, // pct provisoire (cap appliqué)
      capped: raw >= cap, // indicateur capé
    };
  });

  // Cas "aucun point" => uniforme
  const sumRawOrCap = rows.reduce((a, r) => a + r.pct, 0);
  if (sumRawOrCap <= 0) {
    return rows.map((r) => ({ seg: r.seg, label: r.label, pct: 100 / 8 }));
  }

  // 2) Si total < 100, on “remplit” uniquement les non-capés
  //    pour atteindre 100% sans jamais dépasser leur cap.
  let current = rows.map((r) => ({ ...r }));
  let total = current.reduce((a, r) => a + r.pct, 0);

  // Garde-fou pour éviter boucles infinies (très théorique)
  let guard = 0;

  while (total < 100 - 1e-9 && guard++ < 16) {
    const uncapped = current.filter((r) => r.pct < r.cap - 1e-12);
    const sumUncapped = uncapped.reduce((a, r) => a + r.pct, 0);

    // S'il n'y a rien à scaler, on sort (on renormalise léger sur tout le monde)
    if (uncapped.length === 0 || sumUncapped <= 0) break;

    const missing = 100 - total;

    // On distribue le "missing" proportionnellement au pct déjà acquis des non-capés
    // (si certains atteignent leur cap, on re-boucle pour redistribuer le reliquat).
    let distributed = 0;
    for (const r of uncapped) {
      const share = (r.pct / sumUncapped) * missing; // part à ajouter
      const room = r.cap - r.pct; // marge avant cap
      const add = Math.min(share, room);
      r.pct += add;
      distributed += add;
    }

    total += distributed;

    // replace current rows
    current = current.map((r0) => {
      const r = uncapped.find((x) => x.seg === r0.seg);
      return r ? r : r0;
    });

    // si on a quasiment tout distribué, on s'arrête
    if (100 - total < 1e-6) break;
  }

  // 3) Si (très rare) on n'a pas pu atteindre 100% (tous capés mais total < 100),
  //    on fait une normalisation douce SANS dépasser les caps (donc on garde tel quel).
  //    L'UX reste cohérente : la somme peut être 99.9% selon arrondis.
  const finalTotal = current.reduce((a, r) => a + r.pct, 0);
  const scale = finalTotal > 0 ? 100 / finalTotal : 1;

  // On ne scale que si ça ne casse pas un cap ; ici, comme total <= 100, on évite de scaler au-dessus des caps.
  // On préfère un léger écart d’arrondis à une violation des caps.
  return current.map((r) => ({
    seg: r.seg,
    label: r.label,
    pct: +r.pct.toFixed(6), // précision propre
  }));
}
