/**
 * ReferralPanel - Gestion du parrainage
 */

'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Users, Copy, Check, Gift } from 'lucide-react';
import type { ReferralSummary } from '@/lib/roulette/types';

interface ReferralPanelProps {
  referralData: ReferralSummary;
  isLoading?: boolean;
}

export function ReferralPanel({ referralData, isLoading = false }: ReferralPanelProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    const referralUrl = `${window.location.origin}/roulette?ref=${referralData.referral_code}`;
    try {
      await navigator.clipboard.writeText(referralUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Erreur lors de la copie:', error);
    }
  };

  if (isLoading) {
    return (
      <div className="rounded-2xl bg-white shadow-lg p-6 border border-neutral-200">
        <div className="animate-pulse space-y-4">
          <div className="h-4 bg-neutral-200 rounded w-1/3"></div>
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
        <div className="p-2.5 rounded-xl bg-green-50">
          <Users className="w-5 h-5 text-green-600" />
        </div>
        <div className="flex-1">
          <h3 className="font-semibold text-lg text-neutral-900">
            Parrainage
          </h3>
          <p className="text-sm text-neutral-500">
            Invitez vos amis et gagnez des points
          </p>
        </div>
      </div>

      {/* Code de parrainage */}
      <div className="mb-6 p-4 rounded-xl bg-gradient-to-br from-green-50 to-blue-50 border border-green-200">
        <div className="text-sm text-neutral-600 mb-2">
          Votre code de parrainage
        </div>
        <div className="flex items-center gap-2">
          <code className="flex-1 px-4 py-3 bg-white rounded-lg font-mono text-lg font-bold text-green-600 tracking-wider">
            {referralData.referral_code}
          </code>
          <button
            onClick={handleCopy}
            className="p-3 rounded-lg bg-green-600 text-white hover:bg-green-700 transition-colors"
            title="Copier le lien"
          >
            {copied ? (
              <Check className="w-5 h-5" />
            ) : (
              <Copy className="w-5 h-5" />
            )}
          </button>
        </div>
        {copied && (
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-xs text-green-600 mt-2"
          >
            ✓ Lien copié dans le presse-papiers !
          </motion.p>
        )}
      </div>

      {/* Statistiques */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="text-center p-3 rounded-xl bg-neutral-50">
          <div className="text-2xl font-bold text-neutral-900">
            {referralData.total_referrals}
          </div>
          <div className="text-xs text-neutral-500 mt-1">
            Total
          </div>
        </div>
        <div className="text-center p-3 rounded-xl bg-green-50">
          <div className="text-2xl font-bold text-green-600">
            {referralData.validated_referrals}
          </div>
          <div className="text-xs text-neutral-500 mt-1">
            Validés
          </div>
        </div>
        <div className="text-center p-3 rounded-xl bg-blue-50">
          <div className="text-2xl font-bold text-blue-600">
            {referralData.total_points_earned}
          </div>
          <div className="text-xs text-neutral-500 mt-1">
            Points
          </div>
        </div>
      </div>

      {/* Comment ça marche */}
      <div className="p-4 rounded-xl bg-neutral-50 border border-neutral-200">
        <div className="flex items-center gap-2 mb-3">
          <Gift className="w-4 h-4 text-blue-600" />
          <span className="text-sm font-semibold text-neutral-900">
            Comment ça marche ?
          </span>
        </div>
        <ul className="space-y-2 text-xs text-neutral-600">
          <li className="flex items-start gap-2">
            <span className="text-blue-600 font-bold">1.</span>
            <span>Partagez votre code de parrainage avec vos amis</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-blue-600 font-bold">2.</span>
            <span>Ils s'inscrivent avec votre code</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-blue-600 font-bold">3.</span>
            <span>Vous gagnez des points bonus pour chaque filleul validé</span>
          </li>
        </ul>
      </div>
    </motion.div>
  );
}
