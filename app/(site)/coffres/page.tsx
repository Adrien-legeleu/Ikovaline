'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Gift, Sparkles, Lock, Mail, Loader2 } from 'lucide-react';
import RewardRevealDialog from '@/components/coffres/RewardRevealDialog';
import ParrainageSection from '@/components/coffres/ParrainageSection';
import { useSearchParams } from 'next/navigation';

interface Reward {
  id: string;
  label: string;
  description: string;
  reward_key: string;
}

interface UserData {
  userId: string;
  email: string;
  rewardUser: {
    referral_code: string;
  };
  availableRounds: number;
  validatedReferrals: number;
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
        alert(error.error || 'Erreur lors de la validation de l\'email');
        return;
      }

      const data = await res.json();
      setUserData(data);
      setAvailableRounds(data.availableRounds);

      // Sauvegarder l'email dans localStorage
      localStorage.setItem('ikovaline_user_email', email);
      localStorage.setItem('ikovaline_user_id', data.userId);
    } catch (error) {
      console.error('Erreur lors de la soumission de l\'email:', error);
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
  };

  // Email form view
  if (!userData || isSubmittingEmail) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 py-12 px-4 flex items-center justify-center">
        <div className="max-w-md w-full">
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-center mb-8"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Coffres Mystères{' '}
              <span className="bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent">
                Ikovaline
              </span>
            </h1>
            <p className="text-gray-600 text-lg">
              Tentez votre chance et remportez des réductions exclusives !
            </p>
          </motion.div>

          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8"
          >
            {referralCode && (
              <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl">
                <p className="text-sm text-green-800 text-center">
                  🎉 Vous avez été parrainé ! Vous allez recevoir <strong>1 tour gratuit</strong>
                </p>
              </div>
            )}

            <form onSubmit={handleEmailSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Votre adresse email
                </label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="exemple@email.com"
                    required
                    disabled={isSubmittingEmail}
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmittingEmail || !email}
                className="w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:opacity-90 disabled:opacity-50 text-white font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2"
              >
                {isSubmittingEmail ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Chargement...
                  </>
                ) : (
                  'Commencer à jouer'
                )}
              </button>
            </form>

            <p className="text-xs text-gray-500 text-center mt-4">
              En continuant, vous acceptez de recevoir des informations sur Ikovaline.
            </p>
          </motion.div>
        </div>
      </div>
    );
  }

  // Main game view
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Coffres Mystères{' '}
            <span className="bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent">
              Ikovaline
            </span>
          </h1>
          <p className="text-gray-600 text-lg mb-2">
            Tentez votre chance et remportez des réductions exclusives !
          </p>
          <p className="text-sm text-gray-500">
            Connecté en tant que : <strong>{userData.email}</strong>{' '}
            <button
              onClick={handleLogout}
              className="text-blue-600 hover:underline ml-2"
            >
              Changer
            </button>
          </p>
        </motion.div>

        {/* Available rounds counter */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="max-w-md mx-auto mb-12"
        >
          <div className="bg-white rounded-3xl shadow-lg border border-gray-100 p-6 text-center">
            <div className="flex items-center justify-center gap-3 mb-2">
              <Sparkles className="w-6 h-6 text-blue-600" />
              <span className="text-3xl font-bold text-gray-900">
                {availableRounds}
              </span>
            </div>
            <p className="text-gray-600">
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
        </motion.div>

        {/* Chests */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto mb-12">
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
                className={`relative w-full aspect-square rounded-3xl p-8 transition-all duration-300 ${
                  availableRounds === 0
                    ? 'bg-gray-100 cursor-not-allowed'
                    : 'bg-gradient-to-br from-white to-gray-50 hover:shadow-2xl cursor-pointer border-2 border-transparent hover:border-blue-200'
                } ${
                  selectedChest === index
                    ? 'scale-110 shadow-2xl border-blue-400'
                    : ''
                }`}
                whileHover={
                  availableRounds > 0 && !isPlaying
                    ? { scale: 1.05, y: -10 }
                    : {}
                }
                whileTap={
                  availableRounds > 0 && !isPlaying ? { scale: 0.95 } : {}
                }
                animate={
                  selectedChest === index
                    ? {
                        scale: [1, 1.1, 1],
                        rotate: [0, -5, 5, -5, 0],
                      }
                    : {}
                }
                transition={{ duration: 0.5 }}
              >
                {/* Glow effect when available */}
                {availableRounds > 0 && selectedChest !== index && (
                  <motion.div
                    className="absolute inset-0 rounded-3xl bg-gradient-to-br from-blue-400 to-blue-600 opacity-0"
                    whileHover={{ opacity: 0.1 }}
                  />
                )}

                {/* Icon */}
                <div className="relative z-10 flex flex-col items-center justify-center h-full">
                  {availableRounds === 0 ? (
                    <Lock className="w-20 h-20 text-gray-300 mb-4" />
                  ) : (
                    <Gift className="w-20 h-20 text-blue-600 mb-4" />
                  )}
                  <span className="text-gray-700 font-semibold text-lg">
                    Coffre {index + 1}
                  </span>
                  {selectedChest === index && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="mt-4 text-sm text-blue-600"
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
                        rotate: 360,
                        scale: [1, 1.2, 1],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: 'easeInOut',
                      }}
                    >
                      <Sparkles className="w-6 h-6 text-blue-600" />
                    </motion.div>
                  )}
              </motion.button>
            </motion.div>
          ))}
        </div>

        {/* Parrainage Section */}
        <div className="max-w-4xl mx-auto">
          <ParrainageSection
            referralCode={userData.rewardUser.referral_code}
            validatedReferrals={userData.validatedReferrals}
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
