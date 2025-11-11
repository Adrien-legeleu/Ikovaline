'use client';

import { motion } from 'framer-motion';
import { Copy, Check, Share2, Mail, Users } from 'lucide-react';
import { useState } from 'react';

interface ParrainageSectionProps {
  referralCode: string;
  validatedReferrals: number;
  lastReward?: {
    label: string;
    description: string;
    reward_key: string;
  } | null;
}

export default function ParrainageSection({
  referralCode,
  validatedReferrals,
  lastReward,
}: ParrainageSectionProps) {
  const [copied, setCopied] = useState(false);

  const referralLink =
    typeof window !== 'undefined'
      ? `${window.location.origin}/coffres?ref=${referralCode}`
      : `https://ikovaline.com/coffres?ref=${referralCode}`;

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(referralLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Erreur copie:', error);
    }
  };

  const handleShareWhatsApp = () => {
    if (!lastReward) return;

    const message = `🎉 J'ai gagné une super récompense sur Ikovaline !\n\n🎁 ${lastReward.label}\n${lastReward.description}\n\nCode : ${lastReward.reward_key.toUpperCase()}\n\nTente ta chance aussi sur : ${referralLink}\n\n✨ Ikovaline - Agence digitale premium`;

    const url = `https://wa.me/?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  const handleShareEmail = () => {
    if (!lastReward) return;

    const subject = `J'ai gagné ${lastReward.label} sur Ikovaline !`;
    const body = `Bonjour,

Je voulais te partager ma récompense que j'ai gagnée sur Ikovaline !

🎁 Récompense : ${lastReward.label}
📝 Description : ${lastReward.description}
🔑 Code : ${lastReward.reward_key.toUpperCase()}

Valable sur un projet Ikovaline (site web, application mobile, automation, etc.).

Tu peux toi aussi tenter ta chance et gagner des réductions exclusives !

Mon lien de parrainage : ${referralLink}

Si tu t'inscris avec mon lien, on gagne tous les deux un tour bonus 🎉

Découvre Ikovaline : https://ikovaline.com

À bientôt !`;

    const mailtoUrl = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailtoUrl;
  };

  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.4 }}
      className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-8"
    >
      <div className="flex items-center gap-3 mb-6">
        <Users className="w-6 h-6 text-primary" />
        <h2 className="text-2xl font-bold text-gray-900">Parrainage</h2>
      </div>

      {/* Stats */}
      <div className="bg-gradient-to-r from-primary/10 to-blue-500/10 rounded-xl p-6 mb-6 border border-primary/20">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-600 mb-1">Filleuls validés</p>
            <p className="text-3xl font-bold text-primary">
              {validatedReferrals}
            </p>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-600 mb-1">Tours bonus gagnés</p>
            <p className="text-3xl font-bold text-green-600">
              {validatedReferrals}
            </p>
          </div>
        </div>
      </div>

      {/* Referral Link */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Votre lien de parrainage
        </label>
        <div className="flex gap-2">
          <input
            type="text"
            value={referralLink}
            readOnly
            className="flex-1 px-4 py-3 border border-gray-300 rounded-xl bg-gray-50 text-sm font-mono"
          />
          <button
            onClick={handleCopyLink}
            className="px-6 py-3 bg-gray-900 hover:bg-gray-800 text-white rounded-xl transition-colors flex items-center gap-2 font-medium"
          >
            {copied ? (
              <>
                <Check className="w-5 h-5" />
                <span className="hidden sm:inline">Copié !</span>
              </>
            ) : (
              <>
                <Copy className="w-5 h-5" />
                <span className="hidden sm:inline">Copier</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Share reward buttons */}
      {lastReward ? (
        <>
          <div className="mb-4">
            <p className="text-sm font-medium text-gray-700 mb-3">
              Partagez votre dernière récompense :
            </p>
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-4 mb-4 border border-green-200">
              <p className="font-semibold text-gray-900">{lastReward.label}</p>
              <p className="text-sm text-gray-600 mt-1">
                {lastReward.description}
              </p>
              <p className="text-xs font-mono font-semibold text-primary mt-2">
                Code : {lastReward.reward_key.toUpperCase()}
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={handleShareWhatsApp}
              className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-[#25D366] hover:bg-[#1fb855] text-white rounded-xl transition-all duration-300 hover:scale-105 shadow-md font-medium"
            >
              <Share2 className="w-5 h-5" />
              Partager sur WhatsApp
            </button>

            <button
              onClick={handleShareEmail}
              className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-primary hover:bg-blue-700 text-white rounded-xl transition-all duration-300 hover:scale-105 shadow-md font-medium"
            >
              <Mail className="w-5 h-5" />
              Partager par Email
            </button>
          </div>
        </>
      ) : (
        <div className="bg-gray-50 rounded-xl p-6 text-center border border-gray-200">
          <p className="text-gray-500 text-sm">
            Gagnez une récompense pour la partager avec vos amis !
          </p>
        </div>
      )}

      <p className="text-xs text-gray-500 text-center mt-4">
        Gagnez <strong>1 tour bonus</strong> pour chaque ami qui s'inscrit avec
        votre lien !
      </p>
    </motion.div>
  );
}
