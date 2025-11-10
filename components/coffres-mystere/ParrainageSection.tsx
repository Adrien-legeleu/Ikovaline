'use client';

import { motion } from 'framer-motion';
import { Copy, Check, Share2, Mail, Users, Gift } from 'lucide-react';
import { useState } from 'react';

interface ParrainageSectionProps {
  referralCode: string;
  validatedReferrals: number;
}

export default function ParrainageSection({
  referralCode,
  validatedReferrals,
}: ParrainageSectionProps) {
  const [copied, setCopied] = useState(false);

  const referralLink = typeof window !== 'undefined'
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
    const message = `🎁 Salut ! Je te partage ce super jeu Ikovaline pour gagner des réductions sur tes projets digitaux !\n\nUtilise ce lien : ${referralLink}\n\nTu auras 1 tour gratuit et moi aussi 🎉\n\n✨ Ikovaline - Agence digitale premium`;

    const url = `https://wa.me/?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  const handleShareEmail = () => {
    const subject = 'Gagne des réductions Ikovaline !';
    const body = `Bonjour,

Je voulais te partager ce jeu sympa d'Ikovaline qui permet de gagner des réductions sur des projets digitaux (sites web, applications, automation, etc.).

Utilise mon lien de parrainage : ${referralLink}

Tu auras 1 tour gratuit pour tenter ta chance et je gagnerai aussi un tour bonus 🎉

Ikovaline est une agence digitale premium qui crée des solutions sur mesure pour les entreprises.

Découvre leurs services sur : https://ikovaline.com

À bientôt !`;

    const mailtoUrl = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailtoUrl;
  };

  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.4 }}
      className="bg-white rounded-3xl shadow-lg border border-gray-100 p-6 md:p-8"
    >
      <div className="flex items-center gap-3 mb-6">
        <Users className="w-6 h-6 text-blue-600" />
        <h2 className="text-2xl font-bold text-gray-900">
          Gagnez plus de tours
        </h2>
      </div>

      <p className="text-gray-600 mb-6">
        Partagez votre lien de parrainage et gagnez <strong>1 tour bonus</strong> pour chaque ami qui s'inscrit !
      </p>

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
            className="px-4 py-3 bg-gray-900 hover:bg-gray-800 text-white rounded-xl transition-colors flex items-center gap-2"
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

      {/* Share buttons */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <button
          onClick={handleShareWhatsApp}
          className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-[#25D366] hover:bg-[#1fb855] text-white rounded-full transition-all duration-300 hover:scale-105 shadow-lg"
        >
          <Share2 className="w-5 h-5" />
          Partager sur WhatsApp
        </button>

        <button
          onClick={handleShareEmail}
          className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:opacity-90 text-white rounded-full transition-all duration-300 hover:scale-105 shadow-lg"
        >
          <Mail className="w-5 h-5" />
          Partager par Email
        </button>
      </div>

      {/* Stats */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-100">
        <div className="flex items-center gap-3 mb-2">
          <Gift className="w-5 h-5 text-blue-600" />
          <span className="text-sm text-gray-600">Filleuls validés</span>
        </div>
        <p className="text-3xl font-bold text-gray-900">{validatedReferrals}</p>
        <p className="text-sm text-gray-500 mt-1">
          = {validatedReferrals} tour{validatedReferrals > 1 ? 's' : ''} bonus gagnés !
        </p>
      </div>
    </motion.div>
  );
}
