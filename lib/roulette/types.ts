/**
 * Types TypeScript pour le système de roulette Ikovaline
 *
 * Ce fichier contient tous les types nécessaires pour :
 * - Les récompenses et leur configuration
 * - Le wallet et les transactions de points
 * - Les allocations et segments de la roulette
 * - Les spins et l'historique
 * - Le système de parrainage
 */

// ================================
// Types ENUM (alignés avec Postgres)
// ================================

export type RouletteTransactionType =
  | 'earn'
  | 'spend'
  | 'referral_bonus'
  | 'admin_adjust'
  | 'refund';

export type RouletteSpinStatus =
  | 'pending'
  | 'success'
  | 'cancelled'
  | 'error';

export type RouletteReferralStatus =
  | 'pending'
  | 'validated'
  | 'rejected';

// ================================
// Récompenses
// ================================

export interface RouletteReward {
  id: string;
  reward_key: string;
  label: string;
  description?: string;
  factor: number;           // Conversion points -> %
  max_percent?: number;     // Cap maximum (ex: 5% pour jackpot)
  is_active: boolean;
  sort_order: number;
  created_at: string;
}

/**
 * Configuration statique des récompenses (côté front)
 * Permet de définir les couleurs, icônes, etc.
 */
export interface RewardConfig {
  key: string;
  label: string;
  description: string;
  color: string;            // Couleur du segment (hex)
  textColor: string;        // Couleur du texte
  icon?: string;            // Emoji ou icône
  value: string;            // Affichage de la valeur (-50%, -150€, etc.)
}

// Configuration statique des récompenses
export const REWARD_CONFIGS: Record<string, RewardConfig> = {
  jackpot_50: {
    key: 'jackpot_50',
    label: 'Jackpot',
    description: 'Réduction exceptionnelle de 50 %',
    color: '#FFD700',
    textColor: '#000000',
    icon: '💎',
    value: '-50%',
  },
  discount_20: {
    key: 'discount_20',
    label: 'Réduction',
    description: 'Réduction de 20 % sur un projet',
    color: '#FF6B6B',
    textColor: '#FFFFFF',
    icon: '🎉',
    value: '-20%',
  },
  discount_10: {
    key: 'discount_10',
    label: 'Réduction',
    description: 'Réduction de 10 % sur un projet',
    color: '#4ECDC4',
    textColor: '#FFFFFF',
    icon: '🎊',
    value: '-10%',
  },
  voucher_150: {
    key: 'voucher_150',
    label: 'Bon',
    description: 'Bon de réduction de 150 €',
    color: '#95E1D3',
    textColor: '#000000',
    icon: '🎁',
    value: '-150€',
  },
  voucher_100: {
    key: 'voucher_100',
    label: 'Bon',
    description: 'Bon de réduction de 100 €',
    color: '#F38181',
    textColor: '#FFFFFF',
    icon: '🎫',
    value: '-100€',
  },
  voucher_75: {
    key: 'voucher_75',
    label: 'Bon',
    description: 'Bon de réduction de 75 €',
    color: '#AA96DA',
    textColor: '#FFFFFF',
    icon: '🎟️',
    value: '-75€',
  },
  voucher_50: {
    key: 'voucher_50',
    label: 'Bon',
    description: 'Bon de réduction de 50 €',
    color: '#FCBAD3',
    textColor: '#000000',
    icon: '💝',
    value: '-50€',
  },
  discount_5: {
    key: 'discount_5',
    label: 'Réduction',
    description: 'Réduction douce de 5 %',
    color: '#A8D8EA',
    textColor: '#000000',
    icon: '✨',
    value: '-5%',
  },
  nothing: {
    key: 'nothing',
    label: 'Dommage',
    description: 'Merci d\'avoir participé !',
    color: '#E0E0E0',
    textColor: '#666666',
    icon: '😊',
    value: 'Rien',
  },
};

// ================================
// Wallet & Points
// ================================

export interface RouletteWallet {
  user_id: string;
  total_points_earned: number;
  total_points_spent: number;
  available_points: number;
  referral_code?: string;
  referred_by?: string;
  created_at: string;
}

export interface RoulettePointTransaction {
  id: string;
  user_id: string;
  type: RouletteTransactionType;
  points_delta: number;
  reason?: string;
  metadata?: Record<string, unknown>;
  created_at: string;
}

export interface WalletSummary {
  wallet: RouletteWallet;
  points_from_referrals: number;
  points_from_actions: number;
  pending_referrals: number;
}

// ================================
// Allocations & Segments
// ================================

export interface RouletteAllocation {
  id: string;
  user_id: string;
  reward_id: string;
  points: number;
  percent: number;
  session_id: string;
  created_at: string;
}

/**
 * Input pour l'allocation des points (depuis le front)
 */
export interface AllocationInput {
  reward_key: string;
  points: number;
}

/**
 * Segment de la roulette (calculé)
 */
export interface RouletteSegment {
  reward_key: string;
  reward_id?: string;
  label: string;
  points: number;
  percent: number;
  start_angle: number;    // En degrés (0° = haut, sens horaire)
  end_angle: number;      // En degrés
  color: string;
  text_color: string;
  icon?: string;
  value: string;
}

/**
 * Résultat du calcul des segments
 */
export interface SegmentCalculationResult {
  segments: RouletteSegment[];
  total_percent: number;
  total_points: number;
  warnings: string[];
  errors: string[];
}

// ================================
// Spins
// ================================

export interface RouletteSpin {
  id: string;
  user_id: string;
  session_id?: string;
  angle: number;
  reward_id?: string;
  reward_label?: string;
  points_spent: number;
  status: RouletteSpinStatus;
  reward_code?: string;
  metadata?: Record<string, unknown>;
  created_at: string;
}

/**
 * Résultat d'un spin (retourné par l'API)
 */
export interface SpinResult {
  spin: RouletteSpin;
  final_rotation: number;    // Rotation finale en degrés
  reward: RouletteReward | null;
  reward_config?: RewardConfig;
  wallet: RouletteWallet;
}

// ================================
// Parrainage
// ================================

export interface RouletteReferral {
  id: string;
  referrer_id: string;
  referred_id: string;
  referral_code: string;
  status: RouletteReferralStatus;
  bonus_points: number;
  created_at: string;
}

export interface ReferralSummary {
  referral_code: string;
  total_referrals: number;
  validated_referrals: number;
  pending_referrals: number;
  total_points_earned: number;
  referrals: RouletteReferral[];
}

// ================================
// Réponses API
// ================================

export interface RouletteConfigResponse {
  rewards: RouletteReward[];
  allocations: RouletteAllocation[];
  wallet: RouletteWallet;
  segments: RouletteSegment[];
}

export interface AllocationResponse {
  success: boolean;
  allocations: RouletteAllocation[];
  segments: RouletteSegment[];
  warnings: string[];
}

export interface HistoryResponse {
  spins: RouletteSpin[];
  total: number;
  page: number;
  per_page: number;
}

// ================================
// Erreurs
// ================================

export class RouletteError extends Error {
  constructor(
    message: string,
    public code: string,
    public details?: Record<string, unknown>
  ) {
    super(message);
    this.name = 'RouletteError';
  }
}

export const ROULETTE_ERROR_CODES = {
  INSUFFICIENT_POINTS: 'INSUFFICIENT_POINTS',
  INVALID_ALLOCATION: 'INVALID_ALLOCATION',
  TOTAL_EXCEEDS_100: 'TOTAL_EXCEEDS_100',
  NO_ALLOCATION: 'NO_ALLOCATION',
  WALLET_NOT_FOUND: 'WALLET_NOT_FOUND',
  REWARD_NOT_FOUND: 'REWARD_NOT_FOUND',
  SPIN_FAILED: 'SPIN_FAILED',
  INVALID_REFERRAL_CODE: 'INVALID_REFERRAL_CODE',
  REFERRAL_ALREADY_USED: 'REFERRAL_ALREADY_USED',
} as const;
