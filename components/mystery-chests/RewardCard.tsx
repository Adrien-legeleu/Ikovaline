'use client';

import { motion } from 'framer-motion';
import { X } from 'lucide-react';

export type RewardTier =
  | 'common'
  | 'rare'
  | 'epic'
  | 'legendary'
  | 'ultra'
  | 'jackpot';

interface RewardCardProps {
  label: string;
  description: string;
  rewardKey: string;
  tier?: RewardTier;
  onUse?: () => void;
  onClose?: () => void;
}

const getTierConfig = (tier: RewardTier) => {
  switch (tier) {
    case 'jackpot':
      return {
        badge: 'JACKPOT',
        gradient: 'from-purple-600 via-pink-600 to-red-600',
        borderGlow: 'shadow-[0_0_30px_rgba(168,85,247,0.6)]',
        badgeBg: 'bg-gradient-to-r from-yellow-400 to-orange-500',
        badgeText: 'text-white',
      };
    case 'legendary':
      return {
        badge: 'LÉGENDAIRE',
        gradient: 'from-yellow-500 via-orange-500 to-red-500',
        borderGlow: 'shadow-[0_0_25px_rgba(251,191,36,0.5)]',
        badgeBg: 'bg-gradient-to-r from-yellow-400 to-amber-500',
        badgeText: 'text-gray-900',
      };
    case 'epic':
      return {
        badge: 'ÉPIQUE',
        gradient: 'from-purple-500 via-violet-500 to-indigo-500',
        borderGlow: 'shadow-[0_0_20px_rgba(139,92,246,0.4)]',
        badgeBg: 'bg-gradient-to-r from-purple-500 to-violet-500',
        badgeText: 'text-white',
      };
    case 'ultra':
      return {
        badge: 'ULTRA RARE',
        gradient: 'from-cyan-500 via-blue-500 to-indigo-600',
        borderGlow: 'shadow-[0_0_25px_rgba(59,130,246,0.5)]',
        badgeBg: 'bg-gradient-to-r from-cyan-400 to-blue-500',
        badgeText: 'text-white',
      };
    case 'rare':
      return {
        badge: 'RARE',
        gradient: 'from-blue-500 to-cyan-500',
        borderGlow: 'shadow-[0_0_15px_rgba(6,182,212,0.3)]',
        badgeBg: 'bg-gradient-to-r from-blue-500 to-cyan-500',
        badgeText: 'text-white',
      };
    case 'common':
    default:
      return {
        badge: 'AVANTAGE',
        gradient: 'from-green-500 to-emerald-500',
        borderGlow: 'shadow-[0_0_10px_rgba(16,185,129,0.2)]',
        badgeBg: 'bg-gradient-to-r from-green-500 to-emerald-500',
        badgeText: 'text-white',
      };
  }
};

const getRewardKeyToTier = (rewardKey: string): RewardTier => {
  if (rewardKey === 'jackpot_50') return 'jackpot';
  if (rewardKey === 'voucher_150') return 'legendary';
  if (rewardKey === 'voucher_100') return 'epic';
  if (rewardKey === 'discount_10' || rewardKey === 'discount_20')
    return 'ultra';
  if (rewardKey === 'voucher_75') return 'rare';
  return 'common'; // discount_5, voucher_50
};

export default function RewardCard({
  label,
  description,
  rewardKey,
  tier: propTier,
  onUse,
  onClose,
}: RewardCardProps) {
  const tier = propTier || getRewardKeyToTier(rewardKey);
  const config = getTierConfig(tier);

  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className="relative max-w-md w-full mx-auto"
    >
      {/* Close button */}
      {onClose && (
        <motion.button
          onClick={onClose}
          className="absolute -top-4 -right-4 z-50 bg-white/90 backdrop-blur-sm rounded-full p-2 shadow-lg hover:bg-white transition-colors"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <X className="w-5 h-5 text-gray-700" />
        </motion.button>
      )}

      {/* Card */}
      <div
        className={`relative rounded-3xl p-6 md:p-8 backdrop-blur-xl bg-white/95 border border-gray-100 ${config.borderGlow}`}
      >
        {/* Gradient overlay */}
        <div
          className={`absolute inset-0 rounded-3xl opacity-10 bg-gradient-to-br ${config.gradient}`}
        />

        {/* Glow effect for ultra and jackpot */}
        {(tier === 'ultra' || tier === 'jackpot') && (
          <motion.div
            className={`absolute -inset-1 rounded-3xl bg-gradient-to-r ${config.gradient} opacity-20 blur-xl`}
            animate={{
              opacity: [0.2, 0.4, 0.2],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        )}

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center text-center space-y-4">
          {/* Badge */}
          <motion.div
            className={`inline-block px-4 py-1.5 rounded-full ${config.badgeBg} ${config.badgeText} text-xs font-bold tracking-wider shadow-lg`}
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            {config.badge}
          </motion.div>

          {/* Title */}
          <motion.h3
            className="text-2xl md:text-3xl font-bold text-gray-900"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            {label}
          </motion.h3>

          {/* Description */}
          <motion.p
            className="text-gray-600 text-sm md:text-base max-w-xs"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            {description}
          </motion.p>

          {/* Divider */}
          <div className="w-full h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent my-4" />

          {/* Footer text */}
          <motion.p
            className="text-xs text-gray-500 italic"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            Valable sur un projet Ikovaline
          </motion.p>

          {/* Action button */}
          {onUse && (
            <motion.button
              onClick={onUse}
              className="mt-4 px-6 py-2.5 bg-gradient-to-r from-[#ff7a00] to-[#ff3c00] text-white font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              Utiliser maintenant
            </motion.button>
          )}
        </div>
      </div>
    </motion.div>
  );
}
