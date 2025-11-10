// lib/roulette/segments.ts

/**
 * Types de récompense disponibles sur la roulette Ikovaline
 */
export type RewardKey =
  | 'jackpot'
  | 'minus20'
  | 'minus10'
  | 'voucher150'
  | 'voucher100'
  | 'voucher75'
  | 'voucher50'
  | 'minus5';

export type SegmentId = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;

export type Rule =
  | { kind: 'PERCENT'; value: number; cap?: number; excludeSaaS?: boolean }
  | { kind: 'AMOUNT'; value: number; minOrder?: number };

/**
 * Configuration d'une récompense
 * @param key - Identifiant unique de la récompense
 * @param label - Label affiché sur la roue
 * @param coef - Coefficient : 1 point = X % de probabilité
 * @param rules - Règles métier pour l'application de la récompense
 */
export type RewardConfig = {
  key: RewardKey;
  seg: SegmentId;
  label: string;
  coef: number; // Coefficient en % par point
  rules: Rule;
};

/**
 * Configuration des récompenses de la roulette Ikovaline
 *
 * ⚠️ COEFFICIENTS OBLIGATOIRES (NE PAS MODIFIER) :
 * - Jackpot 50%    : 1 point = 0.05 % (max 5% à 100 points)
 * - Réduction -20% : 1 point = 0.2 %  (max 20% à 100 points)
 * - Réduction -10% : 1 point = 0.3 %  (max 30% à 100 points)
 * - Bon -150€      : 1 point = 0.5 %  (max 50% à 100 points)
 * - Bon -100€      : 1 point = 0.6 %  (max 60% à 100 points)
 * - Bon -75€       : 1 point = 0.7 %  (max 70% à 100 points)
 * - Bon -50€       : 1 point = 0.8 %  (max 80% à 100 points)
 * - Réduction -5%  : 1 point = 1.0 %  (max 100% à 100 points)
 */
export const REWARD_CONFIGS: RewardConfig[] = [
  {
    key: 'jackpot',
    seg: 1,
    label: 'Jackpot −50%',
    coef: 0.05,
    rules: { kind: 'PERCENT', value: 50, cap: 500, excludeSaaS: true },
  },
  {
    key: 'minus20',
    seg: 2,
    label: '−20%',
    coef: 0.2,
    rules: { kind: 'PERCENT', value: 20, cap: 250, excludeSaaS: true },
  },
  {
    key: 'minus10',
    seg: 3,
    label: '−10%',
    coef: 0.3,
    rules: { kind: 'PERCENT', value: 10, cap: 150, excludeSaaS: true },
  },
  {
    key: 'voucher150',
    seg: 4,
    label: '−150 €',
    coef: 0.5,
    rules: { kind: 'AMOUNT', value: 150, minOrder: 3000 },
  },
  {
    key: 'voucher100',
    seg: 5,
    label: '−100 €',
    coef: 0.6,
    rules: { kind: 'AMOUNT', value: 100, minOrder: 2000 },
  },
  {
    key: 'voucher75',
    seg: 6,
    label: '−75 €',
    coef: 0.7,
    rules: { kind: 'AMOUNT', value: 75, minOrder: 1200 },
  },
  {
    key: 'voucher50',
    seg: 7,
    label: '−50 €',
    coef: 0.8,
    rules: { kind: 'AMOUNT', value: 50, minOrder: 700 },
  },
  {
    key: 'minus5',
    seg: 8,
    label: '−5 %',
    coef: 1.0,
    rules: { kind: 'PERCENT', value: 5, cap: 50 },
  },
];

/**
 * Map par ID de segment pour accès rapide
 */
export const SEGMENTS: Record<SegmentId, { label: string; rules: Rule }> = {
  1: {
    label: 'Jackpot −50%',
    rules: { kind: 'PERCENT', value: 50, cap: 500, excludeSaaS: true },
  },
  2: {
    label: '−20%',
    rules: { kind: 'PERCENT', value: 20, cap: 250, excludeSaaS: true },
  },
  3: {
    label: '−10%',
    rules: { kind: 'PERCENT', value: 10, cap: 150, excludeSaaS: true },
  },
  4: { label: '−150 €', rules: { kind: 'AMOUNT', value: 150, minOrder: 3000 } },
  5: { label: '−100 €', rules: { kind: 'AMOUNT', value: 100, minOrder: 2000 } },
  6: { label: '−75 €', rules: { kind: 'AMOUNT', value: 75, minOrder: 1200 } },
  7: { label: '−50 €', rules: { kind: 'AMOUNT', value: 50, minOrder: 700 } },
  8: { label: '−5 %', rules: { kind: 'PERCENT', value: 5, cap: 50 } },
};
