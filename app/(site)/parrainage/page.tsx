'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Copy,
  Check,
  Mail,
  Share2,
  Users,
  Gift,
  Edit2,
  Save,
  X,
  LogIn,
} from 'lucide-react';
import { supabase } from '@/lib/SupabaseClient';
import Link from 'next/link';

interface RewardUser {
  id: string;
  referral_code: string;
  user_id: string;
}

export default function ParrainagePage() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [rewardUser, setRewardUser] = useState<RewardUser | null>(null);
  const [availableRounds, setAvailableRounds] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [copied, setCopied] = useState(false);
  const [isEditingCode, setIsEditingCode] = useState(false);
  const [newCode, setNewCode] = useState('');
  const [isSavingCode, setIsSavingCode] = useState(false);
  const [referredEmail, setReferredEmail] = useState('');
  const [isInviting, setIsInviting] = useState(false);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user) {
        setIsAuthenticated(true);
        await loadUserData();
      } else {
        setIsAuthenticated(false);
        setIsLoading(false);
      }
    } catch (error) {
      console.error('Erreur vérification auth:', error);
      setIsAuthenticated(false);
      setIsLoading(false);
    }
  };

  const loadUserData = async () => {
    try {
      const res = await fetch('/api/rewards/me');
      if (res.ok) {
        const data = await res.json();
        setRewardUser(data.rewardUser);
        setAvailableRounds(data.availableRounds);
        setNewCode(data.rewardUser.referral_code);
      }
    } catch (error) {
      console.error('Erreur chargement données:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopyCode = async () => {
    if (!rewardUser) return;

    const message = `Je te partage mon code Ikovaline ${rewardUser.referral_code} : tu peux avoir une réduction sur ton projet (site, app, automation…)`;

    try {
      await navigator.clipboard.writeText(message);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Erreur copie:', error);
    }
  };

  const handleShareWhatsApp = () => {
    if (!rewardUser) return;

    const message = `🎁 Salut ! Je te partage mon code de parrainage Ikovaline : *${rewardUser.referral_code}*\n\nAvec ce code, tu peux bénéficier d'une réduction sur ton projet digital (site web, application, automation…).\n\nRendez-vous sur https://ikovaline.com pour découvrir nos services !\n\n✨ Ikovaline - Agence digitale premium`;

    const url = `https://wa.me/?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  const handleShareEmail = () => {
    if (!rewardUser) return;

    const subject = 'Invitation Ikovaline – réduction sur ton projet digital';
    const body = `Bonjour,

Je voulais te partager mon code de parrainage Ikovaline : ${rewardUser.referral_code}

Avec ce code, tu peux bénéficier d'une réduction exclusive sur ton projet digital (site web, application mobile, automation, etc.).

Ikovaline est une agence digitale premium qui accompagne les entreprises dans leur transformation numérique. Leurs services incluent :
- Développement web & mobile
- Design UX/UI
- Automatisation de processus
- Solutions sur mesure

Tu peux découvrir leurs services sur : https://ikovaline.com

N'hésite pas si tu as des questions !

Cordialement`;

    const mailtoUrl = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailtoUrl;
  };

  const handleUpdateCode = async () => {
    if (!newCode || isSavingCode) return;

    setIsSavingCode(true);

    try {
      const res = await fetch('/api/rewards/update-referral-code', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ referralCode: newCode }),
      });

      if (!res.ok) {
        const error = await res.json();
        alert(error.error || 'Erreur lors de la mise à jour');
        return;
      }

      const data = await res.json();
      setRewardUser(data.rewardUser);
      setIsEditingCode(false);
      alert('Code mis à jour avec succès !');
    } catch (error) {
      console.error('Erreur mise à jour code:', error);
      alert('Erreur serveur');
    } finally {
      setIsSavingCode(false);
    }
  };

  const handleInviteEmail = async () => {
    if (!referredEmail || isInviting) return;

    setIsInviting(true);

    try {
      const res = await fetch('/api/referrals/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ referredEmail }),
      });

      if (!res.ok) {
        const error = await res.json();
        alert(error.error || 'Erreur lors de l\'invitation');
        return;
      }

      alert('Invitation envoyée ! Vous gagnerez un tour bonus une fois validé.');
      setReferredEmail('');
    } catch (error) {
      console.error('Erreur invitation:', error);
      alert('Erreur serveur');
    } finally {
      setIsInviting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4" />
          <p className="text-gray-600">Chargement...</p>
        </div>
      </div>
    );
  }

  // Not authenticated view
  if (isAuthenticated === false) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Parrainage{' '}
              <span className="bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent">
                Ikovaline
              </span>
            </h1>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Partagez votre code et gagnez des tours bonus pour chaque filleul
              validé !
            </p>
          </motion.div>

          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="max-w-md mx-auto bg-white rounded-3xl shadow-xl border border-gray-100 p-8 text-center"
          >
            <div className="mb-6">
              <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <LogIn className="w-10 h-10 text-blue-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                Connexion requise
              </h2>
              <p className="text-gray-600">
                Pour accéder à votre code de parrainage et inviter des amis,
                veuillez vous connecter ou créer un compte.
              </p>
            </div>

            <div className="space-y-3">
              <Link
                href="/login"
                className="block w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                Se connecter
              </Link>
              <Link
                href="/signup"
                className="block w-full px-6 py-3 bg-white border-2 border-blue-600 text-blue-600 font-semibold rounded-full hover:bg-blue-50 transition-all duration-300"
              >
                Créer un compte
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  // Authenticated view
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Parrainage{' '}
            <span className="bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent">
              Ikovaline
            </span>
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Partagez votre code et gagnez des tours bonus pour chaque filleul
            validé !
          </p>
        </motion.div>

        {/* Referral Code Card */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-3xl shadow-lg border border-gray-100 p-8 mb-8"
        >
          <div className="flex items-center gap-3 mb-6">
            <Gift className="w-6 h-6 text-blue-600" />
            <h2 className="text-2xl font-bold text-gray-900">
              Votre code de parrainage
            </h2>
          </div>

          {!isEditingCode ? (
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="flex-1 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-100">
                  <p className="text-sm text-gray-600 mb-2">Votre code :</p>
                  <p className="text-3xl font-bold text-gray-900 tracking-wider">
                    {rewardUser?.referral_code}
                  </p>
                </div>
                <button
                  onClick={() => setIsEditingCode(true)}
                  className="p-3 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors"
                  title="Modifier le code"
                >
                  <Edit2 className="w-5 h-5 text-gray-700" />
                </button>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={handleCopyCode}
                  className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-gray-900 hover:bg-gray-800 text-white rounded-full transition-all duration-300 hover:scale-105 shadow-lg"
                >
                  {copied ? (
                    <>
                      <Check className="w-5 h-5" />
                      Copié !
                    </>
                  ) : (
                    <>
                      <Copy className="w-5 h-5" />
                      Copier le message
                    </>
                  )}
                </button>

                <button
                  onClick={handleShareWhatsApp}
                  className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-[#25D366] hover:bg-[#1fb855] text-white rounded-full transition-all duration-300 hover:scale-105 shadow-lg"
                >
                  <Share2 className="w-5 h-5" />
                  WhatsApp
                </button>

                <button
                  onClick={handleShareEmail}
                  className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:opacity-90 text-white rounded-full transition-all duration-300 hover:scale-105 shadow-lg"
                >
                  <Mail className="w-5 h-5" />
                  Email
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nouveau code (lettres, chiffres et tirets uniquement)
                </label>
                <input
                  type="text"
                  value={newCode}
                  onChange={(e) =>
                    setNewCode(e.target.value.toUpperCase().replace(/[^A-Z0-9-]/g, ''))
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg font-semibold tracking-wider"
                  placeholder="IKOVA-ABC123"
                  maxLength={20}
                />
              </div>

              <div className="flex gap-3">
                <button
                  onClick={handleUpdateCode}
                  disabled={isSavingCode || newCode === rewardUser?.referral_code}
                  className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 text-white rounded-full transition-colors"
                >
                  <Save className="w-5 h-5" />
                  {isSavingCode ? 'Enregistrement...' : 'Enregistrer'}
                </button>

                <button
                  onClick={() => {
                    setIsEditingCode(false);
                    setNewCode(rewardUser?.referral_code || '');
                  }}
                  className="px-6 py-3 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-full transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>
          )}
        </motion.div>

        {/* Invite by Email Card */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-3xl shadow-lg border border-gray-100 p-8 mb-8"
        >
          <div className="flex items-center gap-3 mb-6">
            <Users className="w-6 h-6 text-blue-600" />
            <h2 className="text-2xl font-bold text-gray-900">
              Inviter un filleul
            </h2>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email du filleul
              </label>
              <input
                type="email"
                value={referredEmail}
                onChange={(e) => setReferredEmail(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="email@exemple.com"
              />
            </div>

            <button
              onClick={handleInviteEmail}
              disabled={isInviting || !referredEmail}
              className="w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:opacity-90 disabled:opacity-50 text-white rounded-full font-semibold transition-all duration-300 hover:scale-105 shadow-lg"
            >
              {isInviting ? 'Envoi...' : 'Envoyer l\'invitation'}
            </button>

            <p className="text-sm text-gray-500 text-center">
              Vous gagnerez un tour bonus une fois le filleul validé par un
              admin.
            </p>
          </div>
        </motion.div>

        {/* Stats Card */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="bg-gradient-to-br from-blue-600 to-indigo-600 rounded-3xl shadow-xl p-8 text-white"
        >
          <h2 className="text-2xl font-bold mb-6">Vos statistiques</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-2">
                <Gift className="w-6 h-6" />
                <span className="text-sm opacity-90">Tours disponibles</span>
              </div>
              <p className="text-4xl font-bold">{availableRounds}</p>
            </div>

            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-2">
                <Users className="w-6 h-6" />
                <span className="text-sm opacity-90">Code de parrainage</span>
              </div>
              <p className="text-2xl font-bold">
                {rewardUser?.referral_code}
              </p>
            </div>
          </div>

          <div className="mt-6 text-center">
            <Link
              href="/coffres"
              className="inline-block px-8 py-3 bg-white text-blue-600 font-semibold rounded-full hover:bg-gray-100 transition-all duration-300 hover:scale-105 shadow-lg"
            >
              Ouvrir mes coffres
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
