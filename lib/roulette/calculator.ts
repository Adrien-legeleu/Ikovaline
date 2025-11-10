/**
 * Fonctions pures pour les calculs de la roulette
 *
 * Convention d'angle :
 * - 0° = haut (12h)
 * - Sens horaire
 * - La flèche est fixe en haut
 * - On fait tourner la roue, pas la flèche
 */

import type {
  AllocationInput,
  RouletteReward,
  RouletteSegment,
  SegmentCalculationResult,
  RewardConfig,
} from './types';
import { REWARD_CONFIGS, RouletteError, ROULETTE_ERROR_CODES } from './types';

/**
 * Calcule le pourcentage pour une récompense donnée
 * Applique le cap max_percent si défini
 */
export function calculatePercent(
  points: number,
  factor: number,
  maxPercent?: number
): { percent: number; capped: boolean } {
  if (points < 0) {
    throw new RouletteError(
      'Les points ne peuvent pas être négatifs',
      'INVALID_POINTS'
    );
  }

  let percent = points * factor;
  let capped = false;

  if (maxPercent !== undefined && percent > maxPercent) {
    percent = maxPercent;
    capped = true;
  }

  // Arrondir à 2 décimales
  percent = Math.round(percent * 100) / 100;

  return { percent, capped };
}

/**
 * Calcule les segments de la roulette à partir des allocations
 * Retourne les segments avec angles + warnings/errors
 */
export function calculateSegments(
  allocations: AllocationInput[],
  rewards: RouletteReward[]
): SegmentCalculationResult {
  const warnings: string[] = [];
  const errors: string[] = [];
  const segments: RouletteSegment[] = [];

  // Créer un map des récompenses par clé
  const rewardMap = new Map<string, RouletteReward>();
  rewards.forEach((r) => rewardMap.set(r.reward_key, r));

  let totalPoints = 0;
  let totalPercent = 0;

  // Calculer les pourcentages pour chaque allocation
  for (const alloc of allocations) {
    if (alloc.points <= 0) continue;

    const reward = rewardMap.get(alloc.reward_key);
    if (!reward) {
      errors.push(`Récompense introuvable : ${alloc.reward_key}`);
      continue;
    }

    if (!reward.is_active) {
      errors.push(`Récompense inactive : ${alloc.reward_key}`);
      continue;
    }

    const { percent, capped } = calculatePercent(
      alloc.points,
      reward.factor,
      reward.max_percent ?? undefined
    );

    totalPoints += alloc.points;
    totalPercent += percent;

    if (capped && reward.max_percent) {
      warnings.push(
        `${reward.label} : limité à ${reward.max_percent}% (${alloc.points} points donnés)`
      );
    }

    const config = REWARD_CONFIGS[reward.reward_key] || {
      key: reward.reward_key,
      label: reward.label,
      description: reward.description || '',
      color: '#CCCCCC',
      textColor: '#000000',
      value: '?',
    };

    segments.push({
      reward_key: reward.reward_key,
      reward_id: reward.id,
      label: reward.label,
      points: alloc.points,
      percent,
      start_angle: 0, // sera calculé après
      end_angle: 0,   // sera calculé après
      color: config.color,
      text_color: config.textColor,
      icon: config.icon,
      value: config.value,
    });
  }

  // Vérifier que la somme ne dépasse pas 100%
  if (totalPercent > 100) {
    errors.push(
      `La somme des pourcentages dépasse 100% (${totalPercent.toFixed(2)}%). ` +
      `Réduisez vos allocations.`
    );
  }

  // Ajouter le segment "nothing" si < 100%
  if (totalPercent < 100 && segments.length > 0) {
    const nothingPercent = 100 - totalPercent;
    const nothingConfig = REWARD_CONFIGS.nothing;

    segments.push({
      reward_key: 'nothing',
      label: nothingConfig.label,
      points: 0,
      percent: nothingPercent,
      start_angle: 0,
      end_angle: 0,
      color: nothingConfig.color,
      text_color: nothingConfig.textColor,
      icon: nothingConfig.icon,
      value: nothingConfig.value,
    });

    warnings.push(
      `${nothingPercent.toFixed(1)}% de la roue sera "Rien gagné" (complète automatiquement à 100%)`
    );
  }

  // Calculer les angles start/end pour chaque segment
  let currentAngle = 0;
  for (const segment of segments) {
    const angleSize = (segment.percent / 100) * 360;
    segment.start_angle = currentAngle;
    segment.end_angle = currentAngle + angleSize;
    currentAngle = segment.end_angle;
  }

  return {
    segments,
    total_percent: totalPercent,
    total_points: totalPoints,
    warnings,
    errors,
  };
}

/**
 * Détermine quelle récompense est gagnée en fonction de l'angle final de rotation
 *
 * Convention :
 * - rotationAngle = rotation totale appliquée à la roue (peut être > 360°)
 * - La flèche est fixe à 0° (haut)
 * - On cherche le segment qui se trouve sous la flèche après rotation
 */
export function determineWinner(
  rotationAngle: number,
  segments: RouletteSegment[]
): RouletteSegment | null {
  if (segments.length === 0) return null;

  // Normaliser l'angle de rotation (entre 0 et 360)
  const normalized = ((rotationAngle % 360) + 360) % 360;

  // La flèche pointe en haut (0°)
  // Après rotation de la roue, on doit trouver quel segment est maintenant sous la flèche
  // Si la roue tourne de X degrés dans le sens horaire, le segment qui était à (360 - X)° est maintenant à 0°
  const pointerAngle = (360 - normalized) % 360;

  // Trouver le segment correspondant
  for (const segment of segments) {
    if (pointerAngle >= segment.start_angle && pointerAngle < segment.end_angle) {
      return segment;
    }
  }

  // Edge case : si on est exactement à 360°, prendre le premier segment
  return segments[0];
}

/**
 * Génère un angle de rotation aléatoire pour un spin
 * Garantit plusieurs tours complets + un angle final aléatoire
 *
 * @param minSpins - Nombre minimum de tours complets (défaut: 3)
 * @param maxSpins - Nombre maximum de tours complets (défaut: 5)
 */
export function generateRandomRotation(
  minSpins: number = 3,
  maxSpins: number = 5
): number {
  const spins = Math.floor(Math.random() * (maxSpins - minSpins + 1)) + minSpins;
  const extraAngle = Math.random() * 360;
  return spins * 360 + extraAngle;
}

/**
 * Génère un angle de rotation qui tombera sur un segment spécifique
 * Utile pour les tests ou pour garantir un résultat
 */
export function generateRotationForSegment(
  targetSegment: RouletteSegment,
  minSpins: number = 3,
  maxSpins: number = 5
): number {
  const spins = Math.floor(Math.random() * (maxSpins - minSpins + 1)) + minSpins;

  // Angle aléatoire dans le segment cible
  const segmentSize = targetSegment.end_angle - targetSegment.start_angle;
  const angleInSegment = targetSegment.start_angle + Math.random() * segmentSize;

  // Pour que la flèche (0°) tombe sur ce segment après rotation,
  // on doit tourner de (360 - angleInSegment)
  const targetRotation = (360 - angleInSegment) % 360;

  return spins * 360 + targetRotation;
}

/**
 * Valide une liste d'allocations
 * Retourne true si valide, sinon lance une RouletteError
 */
export function validateAllocations(
  allocations: AllocationInput[],
  rewards: RouletteReward[],
  availablePoints: number
): true {
  const result = calculateSegments(allocations, rewards);

  // Vérifier les erreurs
  if (result.errors.length > 0) {
    throw new RouletteError(
      result.errors.join(', '),
      ROULETTE_ERROR_CODES.INVALID_ALLOCATION,
      { errors: result.errors }
    );
  }

  // Vérifier les points disponibles
  if (result.total_points > availablePoints) {
    throw new RouletteError(
      `Points insuffisants : ${result.total_points} requis, ${availablePoints} disponibles`,
      ROULETTE_ERROR_CODES.INSUFFICIENT_POINTS,
      { required: result.total_points, available: availablePoints }
    );
  }

  // Vérifier que la somme ne dépasse pas 100%
  if (result.total_percent > 100) {
    throw new RouletteError(
      `La somme des pourcentages dépasse 100% (${result.total_percent.toFixed(2)}%)`,
      ROULETTE_ERROR_CODES.TOTAL_EXCEEDS_100,
      { total: result.total_percent }
    );
  }

  // Vérifier qu'il y a au moins une allocation
  if (result.total_points === 0) {
    throw new RouletteError(
      'Aucun point alloué',
      ROULETTE_ERROR_CODES.NO_ALLOCATION
    );
  }

  return true;
}

/**
 * Génère un code de réduction unique
 */
export function generateRewardCode(
  rewardKey: string,
  userId: string
): string {
  const timestamp = Date.now().toString(36);
  const random = Math.random().toString(36).substring(2, 8).toUpperCase();
  const prefix = rewardKey.substring(0, 3).toUpperCase();

  return `${prefix}-${timestamp}-${random}`;
}
