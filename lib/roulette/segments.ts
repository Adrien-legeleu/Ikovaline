// lib/roulette/segments.ts
export type SegmentId = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;

export type Rule =
  | { kind: 'PERCENT'; value: number; cap?: number; excludeSaaS?: boolean }
  | { kind: 'AMOUNT'; value: number; minOrder?: number };

export const SEGMENTS: Record<SegmentId, { label: string; rules: Rule }> = {
  1: {
    label: 'Jackpot −50%',
    rules: { kind: 'PERCENT', value: 50, cap: 500, excludeSaaS: true },
  },
  2: {
    label: '−20% (Pro/Premium/Ultra)',
    rules: { kind: 'PERCENT', value: 20, cap: 250, excludeSaaS: true },
  },
  3: {
    label: '−10% (LP/Vitrine/Tunnel)',
    rules: { kind: 'PERCENT', value: 10, cap: 150, excludeSaaS: true },
  },
  4: { label: '−150 €', rules: { kind: 'AMOUNT', value: 150, minOrder: 3000 } },
  5: { label: '−100 €', rules: { kind: 'AMOUNT', value: 100, minOrder: 2000 } },
  6: { label: '−75 €', rules: { kind: 'AMOUNT', value: 75, minOrder: 1200 } },
  7: { label: '−50 €', rules: { kind: 'AMOUNT', value: 50, minOrder: 700 } },
  8: { label: '−5 %', rules: { kind: 'PERCENT', value: 5, cap: 50 } },
};
