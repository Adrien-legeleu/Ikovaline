/**
 * HistoryPanel - Affiche l'historique des spins de l'utilisateur
 */

'use client';

import { motion } from 'framer-motion';
import { History, Calendar, Trophy } from 'lucide-react';
import type { RouletteSpin } from '@/lib/roulette/types';
import { REWARD_CONFIGS } from '@/lib/roulette/types';

interface HistoryPanelProps {
  spins: RouletteSpin[];
  isLoading?: boolean;
}

export function HistoryPanel({ spins, isLoading = false }: HistoryPanelProps) {
  if (isLoading) {
    return (
      <div className="rounded-2xl bg-white shadow-lg p-6 border border-neutral-200">
        <div className="animate-pulse space-y-4">
          <div className="h-4 bg-neutral-200 rounded w-1/3"></div>
          <div className="h-20 bg-neutral-200 rounded"></div>
          <div className="h-20 bg-neutral-200 rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-2xl bg-white shadow-lg p-6 border border-neutral-200"
    >
      {/* En-tête */}
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2.5 rounded-xl bg-purple-50">
          <History className="w-5 h-5 text-purple-600" />
        </div>
        <div className="flex-1">
          <h3 className="font-semibold text-lg text-neutral-900">
            Historique des tirages
          </h3>
          <p className="text-sm text-neutral-500">
            Vos {spins.length} derniers spins
          </p>
        </div>
      </div>

      {/* Liste des spins */}
      <div className="space-y-3 max-h-[500px] overflow-y-auto">
        {spins.length === 0 ? (
          <div className="text-center py-8">
            <Trophy className="w-12 h-12 text-neutral-300 mx-auto mb-3" />
            <p className="text-sm text-neutral-500">
              Aucun tirage pour le moment
            </p>
            <p className="text-xs text-neutral-400 mt-1">
              Lancez la roulette pour voir votre historique
            </p>
          </div>
        ) : (
          spins.map((spin) => {
            const reward = spin.reward_label
              ? REWARD_CONFIGS[Object.keys(REWARD_CONFIGS).find(
                  key => REWARD_CONFIGS[key].label === spin.reward_label
                ) || 'nothing']
              : REWARD_CONFIGS.nothing;

            const date = new Date(spin.created_at);
            const isRecent = Date.now() - date.getTime() < 60000; // moins d'1 minute

            return (
              <motion.div
                key={spin.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className={`p-4 rounded-xl border transition-colors ${
                  isRecent
                    ? 'border-green-300 bg-green-50'
                    : 'border-neutral-200 hover:border-neutral-300'
                }`}
              >
                <div className="flex items-center gap-3">
                  {/* Icône de la récompense */}
                  <div
                    className="w-12 h-12 rounded-lg flex items-center justify-center text-2xl"
                    style={{ backgroundColor: reward.color }}
                  >
                    {reward.icon}
                  </div>

                  {/* Détails */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-semibold text-sm text-neutral-900">
                        {spin.reward_label || 'Rien gagné'}
                      </span>
                      {isRecent && (
                        <span className="text-xs px-2 py-0.5 rounded-full bg-green-100 text-green-700">
                          Nouveau
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-2 text-xs text-neutral-500">
                      <Calendar className="w-3 h-3" />
                      <span>
                        {date.toLocaleDateString('fr-FR', {
                          day: 'numeric',
                          month: 'short',
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </span>
                    </div>
                    {spin.reward_code && (
                      <div className="mt-2 text-xs">
                        <span className="font-mono px-2 py-1 bg-neutral-100 rounded text-neutral-700">
                          {spin.reward_code}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Valeur */}
                  <div className="text-right">
                    <div className="text-lg font-bold text-blue-600">
                      {reward.value}
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })
        )}
      </div>
    </motion.div>
  );
}
