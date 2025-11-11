'use client';

import { motion } from 'framer-motion';
import { Gift, Calendar } from 'lucide-react';

interface Reward {
  id: string;
  created_at: string;
  rewards: {
    reward_key: string;
    label: string;
    description: string;
  };
}

interface RewardsListProps {
  rewards: Reward[];
}

export default function RewardsList({ rewards }: RewardsListProps) {
  if (!rewards || rewards.length === 0) {
    return (
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 text-center"
      >
        <Gift className="w-12 h-12 text-gray-300 mx-auto mb-3" />
        <p className="text-gray-500">Aucune récompense gagnée pour le moment</p>
        <p className="text-sm text-gray-400 mt-1">
          Jouez aux coffres pour gagner des réductions !
        </p>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.5 }}
      className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8"
    >
      <div className="flex items-center gap-3 mb-6">
        <Gift className="w-6 h-6 text-primary" />
        <h2 className="text-2xl font-bold text-gray-900">Mes récompenses</h2>
      </div>

      <div className="space-y-3">
        {rewards.map((reward, index) => (
          <motion.div
            key={reward.id}
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.6 + index * 0.1 }}
            className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4 border border-blue-100"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 mb-1">
                  {reward.rewards.label}
                </h3>
                <p className="text-sm text-gray-600 mb-2">
                  {reward.rewards.description}
                </p>
                <div className="inline-block px-3 py-1 bg-white rounded-lg border border-blue-200">
                  <p className="text-xs font-mono font-semibold text-primary">
                    Code : {reward.rewards.reward_key.toUpperCase()}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-1 text-xs text-gray-500">
                <Calendar className="w-3 h-3" />
                {new Date(reward.created_at).toLocaleDateString('fr-FR')}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
