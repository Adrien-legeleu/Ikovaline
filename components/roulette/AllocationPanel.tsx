/**
 * AllocationPanel - Composant de configuration de la roulette
 *
 * Permet à l'utilisateur de distribuer ses points entre les récompenses
 * Affiche :
 * - Liste des récompenses avec sliders
 * - Calcul en temps réel des pourcentages
 * - Warnings et erreurs de validation
 * - Bouton de sauvegarde
 */

'use client';

import { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { SlidersHorizontal, Save, AlertTriangle, Info } from 'lucide-react';
import { calculateSegments } from '@/lib/roulette/calculator';
import type {
  RouletteReward,
  AllocationInput,
  RouletteWallet,
} from '@/lib/roulette/types';
import { REWARD_CONFIGS } from '@/lib/roulette/types';

interface AllocationPanelProps {
  wallet: RouletteWallet;
  rewards: RouletteReward[];
  initialAllocations: AllocationInput[];
  onSave: (allocations: AllocationInput[]) => Promise<void>;
  isLoading?: boolean;
}

export function AllocationPanel({
  wallet,
  rewards,
  initialAllocations,
  onSave,
  isLoading = false,
}: AllocationPanelProps) {
  const [allocations, setAllocations] = useState<Map<string, number>>(new Map());
  const [isSaving, setIsSaving] = useState(false);

  // Initialiser les allocations
  useEffect(() => {
    const map = new Map<string, number>();
    rewards.forEach((r) => {
      const existing = initialAllocations.find((a) => a.reward_key === r.reward_key);
      map.set(r.reward_key, existing?.points || 0);
    });
    setAllocations(map);
  }, [rewards, initialAllocations]);

  // Calculer les segments et validations en temps réel
  const calculation = useMemo(() => {
    const allocationInputs: AllocationInput[] = Array.from(allocations.entries())
      .map(([reward_key, points]) => ({ reward_key, points }))
      .filter((a) => a.points > 0);

    return calculateSegments(allocationInputs, rewards);
  }, [allocations, rewards]);

  const totalPoints = calculation.total_points;
  const totalPercent = calculation.total_percent;
  const hasErrors = calculation.errors.length > 0;
  const isValid =
    !hasErrors &&
    totalPoints <= wallet.available_points &&
    totalPercent <= 100 &&
    totalPoints > 0;

  const handleAllocationChange = (rewardKey: string, points: number) => {
    setAllocations((prev) => {
      const next = new Map(prev);
      next.set(rewardKey, Math.max(0, Math.floor(points)));
      return next;
    });
  };

  const handleSave = async () => {
    if (!isValid) return;

    setIsSaving(true);
    try {
      const allocationInputs: AllocationInput[] = Array.from(allocations.entries())
        .map(([reward_key, points]) => ({ reward_key, points }))
        .filter((a) => a.points > 0);

      await onSave(allocationInputs);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-2xl bg-white shadow-lg p-6 border border-neutral-200"
    >
      {/* En-tête */}
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2.5 rounded-xl bg-blue-50">
          <SlidersHorizontal className="w-5 h-5 text-blue-600" />
        </div>
        <div className="flex-1">
          <h3 className="font-semibold text-lg text-neutral-900">
            Répartition des points
          </h3>
          <p className="text-sm text-neutral-500">
            Distribuez vos points pour configurer la roulette
          </p>
        </div>
      </div>

      {/* Résumé */}
      <div className="mb-6 p-4 rounded-xl bg-neutral-50 border border-neutral-200">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-neutral-600">Points utilisés</span>
          <span className="text-sm font-semibold tabular-nums text-neutral-900">
            {totalPoints} / {wallet.available_points}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm text-neutral-600">Pourcentage total</span>
          <span
            className={`text-sm font-semibold tabular-nums ${
              totalPercent > 100
                ? 'text-red-600'
                : totalPercent === 100
                ? 'text-green-600'
                : 'text-neutral-900'
            }`}
          >
            {totalPercent.toFixed(1)}%
          </span>
        </div>
      </div>

      {/* Warnings */}
      {calculation.warnings.length > 0 && (
        <div className="mb-4 p-3 rounded-lg bg-amber-50 border border-amber-200">
          <div className="flex items-start gap-2">
            <Info className="w-4 h-4 text-amber-600 mt-0.5 flex-shrink-0" />
            <div className="flex-1 text-xs text-amber-800 space-y-1">
              {calculation.warnings.map((warning, i) => (
                <p key={i}>{warning}</p>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Erreurs */}
      {hasErrors && (
        <div className="mb-4 p-3 rounded-lg bg-red-50 border border-red-200">
          <div className="flex items-start gap-2">
            <AlertTriangle className="w-4 h-4 text-red-600 mt-0.5 flex-shrink-0" />
            <div className="flex-1 text-xs text-red-800 space-y-1">
              {calculation.errors.map((error, i) => (
                <p key={i}>{error}</p>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Liste des récompenses */}
      <div className="space-y-4 mb-6">
        {rewards
          .filter((r) => r.is_active)
          .sort((a, b) => a.sort_order - b.sort_order)
          .map((reward) => {
            const config = REWARD_CONFIGS[reward.reward_key];
            const points = allocations.get(reward.reward_key) || 0;
            const segment = calculation.segments.find(
              (s) => s.reward_key === reward.reward_key
            );
            const percent = segment?.percent || 0;

            return (
              <div
                key={reward.id}
                className="p-4 rounded-xl border border-neutral-200 hover:border-neutral-300 transition-colors"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div
                    className="w-10 h-10 rounded-lg flex items-center justify-center text-xl"
                    style={{ backgroundColor: config?.color || '#ccc' }}
                  >
                    {config?.icon || '🎁'}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-sm text-neutral-900">
                      {reward.label}
                    </h4>
                    <p className="text-xs text-neutral-500">
                      {reward.description}
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-semibold text-blue-600">
                      {config?.value || '?'}
                    </div>
                    <div className="text-xs text-neutral-500 tabular-nums">
                      {percent.toFixed(1)}% de la roue
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <input
                    type="range"
                    min={0}
                    max={wallet.available_points}
                    step={1}
                    value={points}
                    onChange={(e) =>
                      handleAllocationChange(reward.reward_key, Number(e.target.value))
                    }
                    disabled={isLoading || isSaving}
                    className="flex-1 h-2 rounded-full appearance-none cursor-pointer
                      bg-neutral-200
                      [&::-webkit-slider-thumb]:appearance-none
                      [&::-webkit-slider-thumb]:w-4
                      [&::-webkit-slider-thumb]:h-4
                      [&::-webkit-slider-thumb]:rounded-full
                      [&::-webkit-slider-thumb]:bg-blue-600
                      [&::-webkit-slider-thumb]:cursor-pointer
                      [&::-moz-range-thumb]:w-4
                      [&::-moz-range-thumb]:h-4
                      [&::-moz-range-thumb]:rounded-full
                      [&::-moz-range-thumb]:bg-blue-600
                      [&::-moz-range-thumb]:cursor-pointer
                      [&::-moz-range-thumb]:border-0"
                  />
                  <input
                    type="number"
                    min={0}
                    max={wallet.available_points}
                    value={points}
                    onChange={(e) =>
                      handleAllocationChange(reward.reward_key, Number(e.target.value))
                    }
                    disabled={isLoading || isSaving}
                    className="w-24 px-3 py-2 rounded-lg bg-white border border-neutral-300
                      text-sm text-right tabular-nums focus:outline-none focus:ring-2
                      focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
            );
          })}
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between pt-4 border-t border-neutral-200">
        <div className="text-sm">
          {isValid ? (
            <span className="text-green-600 font-medium">✓ Configuration valide</span>
          ) : totalPoints === 0 ? (
            <span className="text-neutral-500">Aucun point alloué</span>
          ) : (
            <span className="text-red-600">Configuration invalide</span>
          )}
        </div>

        <button
          onClick={handleSave}
          disabled={!isValid || isLoading || isSaving}
          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl
            bg-blue-600 text-white text-sm font-semibold
            hover:bg-blue-700 transition-colors
            disabled:opacity-40 disabled:cursor-not-allowed
            focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          <Save className="w-4 h-4" />
          {isSaving ? 'Enregistrement...' : 'Enregistrer'}
        </button>
      </div>
    </motion.div>
  );
}
