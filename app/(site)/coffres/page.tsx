'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Gift, Sparkles, Lock, Mail, Loader2 } from 'lucide-react';

import { useSearchParams } from 'next/navigation';
import RewardsList from '@/components/coffres-mystere/RewardsList';
import ParrainageSection from '@/components/coffres-mystere/ParrainageSection';
import RewardRevealDialog from '@/components/coffres-mystere/RewardRevealDialog';

interface Reward {
  id: string;
  label: string;
  description: string;
  reward_key: string;
}

interface RewardHistory {
  id: string;
  created_at: string;
  rewards: {
    reward_key: string;
    label: string;
    description: string;
  };
}

interface UserData {
  userId: string;
  email: string;
  rewardUser: {
    referral_code: string;
  };
  availableRounds: number;
  validatedReferrals: number;
  recentRewards: RewardHistory[];
  isNewUser: boolean;
}

export default function CoffresPage() {
  const searchParams = useSearchParams();
  const referralCode = searchParams?.get('ref');

  const [email, setEmail] = useState('');
  const [isSubmittingEmail, setIsSubmittingEmail] = useState(false);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [availableRounds, setAvailableRounds] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [selectedChest, setSelectedChest] = useState<number | null>(null);
  const [revealedReward, setRevealedReward] = useState<Reward | null>(null);
  const [showDialog, setShowDialog] = useState(false);
  const [recentRewards, setRecentRewards] = useState<RewardHistory[]>([]);

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || isSubmittingEmail) return;

    setIsSubmittingEmail(true);

    try {
      const res = await fetch('/api/coffres/init', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          referralCode: referralCode || undefined,
        }),
      });

      if (!res.ok) {
        const error = await res.json();
        alert(error.error || "Erreur lors de la validation de l'email");
        return;
      }

      const data = await res.json();
      setUserData(data);
      setAvailableRounds(data.availableRounds);
      setRecentRewards(data.recentRewards || []);

      // Sauvegarder l'email dans localStorage
      localStorage.setItem('ikovaline_user_email', email);
      localStorage.setItem('ikovaline_user_id', data.userId);
    } catch (error) {
      console.error("Erreur lors de la soumission de l'email:", error);
      alert('Erreur serveur');
    } finally {
      setIsSubmittingEmail(false);
    }
  };

  // Récupérer l'email du localStorage au chargement
  useEffect(() => {
    const savedEmail = localStorage.getItem('ikovaline_user_email');
    const savedUserId = localStorage.getItem('ikovaline_user_id');

    if (savedEmail && savedUserId) {
      setEmail(savedEmail);
      // Recharger les données de l'utilisateur
      loadUserData(savedEmail);
    }
  }, []);

  const loadUserData = async (userEmail: string) => {
    setIsSubmittingEmail(true);
    try {
      const res = await fetch('/api/coffres/init', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: userEmail }),
      });

      if (res.ok) {
        const data = await res.json();
        setUserData(data);
        setAvailableRounds(data.availableRounds);
        setRecentRewards(data.recentRewards || []);
      }
    } catch (error) {
      console.error('Erreur lors du rechargement des données:', error);
    } finally {
      setIsSubmittingEmail(false);
    }
  };

  const handleChestClick = async (chestIndex: number) => {
    if (isPlaying || availableRounds === 0 || !userData) return;

    setIsPlaying(true);
    setSelectedChest(chestIndex);

    try {
      const res = await fetch('/api/coffres/play', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: userData.userId }),
      });

      if (!res.ok) {
        const error = await res.json();
        alert(error.error || 'Erreur lors du tirage');
        setIsPlaying(false);
        setSelectedChest(null);
        return;
      }

      const data = await res.json();

      // Wait for animation
      setTimeout(() => {
        setRevealedReward(data.reward);
        setShowDialog(true);
        setAvailableRounds(data.remainingRounds);
        setIsPlaying(false);
        setSelectedChest(null);
        // Recharger les récompenses
        loadUserData(email);
      }, 1500);
    } catch (error) {
      console.error('Erreur lors du jeu:', error);
      alert('Erreur serveur');
      setIsPlaying(false);
      setSelectedChest(null);
    }
  };

  const closeDialog = () => {
    setShowDialog(false);
    setRevealedReward(null);
  };

  const handleLogout = () => {
    localStorage.removeItem('ikovaline_user_email');
    localStorage.removeItem('ikovaline_user_id');
    setUserData(null);
    setEmail('');
    setAvailableRounds(0);
    setRecentRewards([]);
  };

  // Email form view
  if (!userData || isSubmittingEmail) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50/30 py-12 px-4 flex items-center justify-center">
        <div className="max-w-md w-full">
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-center mb-8"
          >
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-4 tracking-tight">
              Coffres Mystères
            </h1>
            <div className="inline-block px-4 py-1 bg-primary/10 rounded-full mb-4">
              <span className="text-primary font-semibold">Ikovaline</span>
            </div>
            <p className="text-gray-600 text-lg">
              Tentez votre chance et remportez des réductions exclusives !
            </p>
          </motion.div>

          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8"
          >
            {referralCode && (
              <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl">
                <p className="text-sm text-green-800 text-center font-medium">
                  🎉 Vous avez été parrainé ! Vous allez recevoir{' '}
                  <strong>1 tour gratuit</strong>
                </p>
              </div>
            )}

            <form onSubmit={handleEmailSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Votre adresse email
                </label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-primary transition-colors"
                    placeholder="votre@email.com"
                    required
                    disabled={isSubmittingEmail}
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmittingEmail || !email}
                className="w-full px-6 py-3 bg-primary hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] flex items-center justify-center gap-2"
              >
                {isSubmittingEmail ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Chargement...
                  </>
                ) : (
                  <>
                    <Gift className="w-5 h-5" />
                    Commencer à jouer
                  </>
                )}
              </button>
            </form>

            <p className="text-xs text-gray-500 text-center mt-4">
              En continuant, vous acceptez de recevoir des informations sur
              Ikovaline.
            </p>
          </motion.div>
        </div>
      </div>
    );
  }

  // Main game view
  const lastReward = recentRewards.length > 0 ? recentRewards[0].rewards : null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50/30 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-center mb-12"
        >
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-4 tracking-tight">
            Coffres Mystères
          </h1>
          <div className="inline-block px-4 py-1 bg-primary/10 rounded-full mb-4">
            <span className="text-primary font-semibold">Ikovaline</span>
          </div>
          <p className="text-gray-600 text-lg mb-3">
            Tentez votre chance et remportez des réductions exclusives !
          </p>
          <p className="text-sm text-gray-500">
            Connecté :{' '}
            <strong className="text-gray-900">{userData.email}</strong>
            <button
              onClick={handleLogout}
              className="text-primary hover:underline ml-2 font-medium"
            >
              Changer
            </button>
          </p>
        </motion.div>

        {/* Available rounds counter */}
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="max-w-md mx-auto mb-16"
        >
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-blue-500/5" />
            <div className="relative">
              <div className="flex items-center justify-center gap-3 mb-3">
                <Sparkles className="w-7 h-7 text-primary" />
                <span className="text-5xl font-bold text-gray-900">
                  {availableRounds}
                </span>
              </div>
              <p className="text-gray-600 font-medium text-lg">
                {availableRounds === 0
                  ? 'Aucun tour disponible'
                  : availableRounds === 1
                    ? 'Tour disponible'
                    : 'Tours disponibles'}
              </p>
              {availableRounds === 0 && (
                <p className="text-sm text-gray-500 mt-2">
                  Parrainez des amis pour gagner plus de tours !
                </p>
              )}
            </div>
          </div>
        </motion.div>

        {/* Chests - 3D style */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-16">
          {[0, 1, 2].map((index) => (
            <motion.div
              key={index}
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 + index * 0.1 }}
              className="relative"
            >
              <motion.button
                onClick={() => handleChestClick(index)}
                disabled={isPlaying || availableRounds === 0}
                className={`group relative w-full aspect-square rounded-2xl p-8 transition-all duration-500 ${
                  availableRounds === 0
                    ? 'bg-gray-100 cursor-not-allowed'
                    : 'bg-gradient-to-br from-white via-blue-50/30 to-indigo-50/30 hover:shadow-2xl cursor-pointer border-2 border-transparent hover:border-primary/30'
                } ${
                  selectedChest === index
                    ? 'scale-105 shadow-2xl !border-primary'
                    : ''
                }`}
                style={{
                  transform:
                    selectedChest === index
                      ? 'perspective(1000px) rotateY(0deg)'
                      : 'perspective(1000px) rotateY(0deg)',
                }}
                whileHover={
                  availableRounds > 0 && !isPlaying
                    ? { y: -15, rotateY: 5 }
                    : {}
                }
                whileTap={
                  availableRounds > 0 && !isPlaying ? { scale: 0.98 } : {}
                }
              >
                {/* 3D effect layers */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/10 to-blue-600/10 transform translate-y-1 -z-10" />
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/5 to-blue-600/5 transform translate-y-2 -z-20" />

                {/* Glow effect when available */}
                {availableRounds > 0 && selectedChest !== index && (
                  <motion.div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/20 to-blue-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl" />
                )}

                {/* Icon */}
                <div className="relative z-10 flex flex-col items-center justify-center h-full">
                  {availableRounds === 0 ? (
                    <Lock className="w-24 h-24 text-gray-300 mb-4" />
                  ) : (
                    <motion.div
                      animate={
                        selectedChest !== index
                          ? {
                              rotateY: [0, 10, -10, 0],
                            }
                          : {}
                      }
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: 'easeInOut',
                      }}
                    >
                      <Gift className="w-24 h-24 text-primary drop-shadow-lg mb-4" />
                    </motion.div>
                  )}
                  <span className="text-gray-700 font-bold text-xl">
                    Coffre {index + 1}
                  </span>
                  {selectedChest === index && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="mt-4 text-sm text-primary font-semibold"
                    >
                      Ouverture...
                    </motion.div>
                  )}
                </div>

                {/* Sparkles animation */}
                {availableRounds > 0 &&
                  !isPlaying &&
                  selectedChest !== index && (
                    <motion.div
                      className="absolute top-4 right-4"
                      animate={{
                        scale: [1, 1.3, 1],
                        rotate: [0, 180, 360],
                      }}
                      transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: 'easeInOut',
                      }}
                    >
                      <Sparkles className="w-8 h-8 text-primary drop-shadow-md" />
                    </motion.div>
                  )}
              </motion.button>
            </motion.div>
          ))}
        </div>

        {/* Rewards list and Parrainage in grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
          {/* Rewards List */}
          <RewardsList rewards={recentRewards} />

          {/* Parrainage Section */}
          <ParrainageSection
            referralCode={userData.rewardUser.referral_code}
            validatedReferrals={userData.validatedReferrals}
            lastReward={lastReward}
          />
        </div>
      </div>

      {/* Reward Dialog */}
      <RewardRevealDialog
        isOpen={showDialog}
        reward={revealedReward}
        onClose={closeDialog}
      />
    </div>
  );
}
