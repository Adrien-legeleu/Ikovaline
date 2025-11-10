'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Gift, Sparkles, Lock, LogIn } from 'lucide-react';
import RewardRevealDialog from '@/components/coffres-mystere/RewardRevealDialog';
import { supabase } from '@/lib/SupabaseClient';
import Link from 'next/link';

interface Reward {
  id: string;
  label: string;
  description: string;
  reward_key: string;
}

export default function CoffresPage() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [availableRounds, setAvailableRounds] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [selectedChest, setSelectedChest] = useState<number | null>(null);
  const [revealedReward, setRevealedReward] = useState<Reward | null>(null);
  const [showDialog, setShowDialog] = useState(false);

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
      // Ensure initial round
      await fetch('/api/game/ensure-initial-round', {
        method: 'POST',
      });

      // Get available rounds
      const res = await fetch('/api/game/rounds');
      if (res.ok) {
        const data = await res.json();
        setAvailableRounds(data.availableRounds);
      }
    } catch (error) {
      console.error('Erreur chargement données:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChestClick = async (chestIndex: number) => {
    if (isPlaying || availableRounds === 0) return;

    setIsPlaying(true);
    setSelectedChest(chestIndex);

    try {
      const res = await fetch('/api/game/play', {
        method: 'POST',
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
        setAvailableRounds((prev) => Math.max(0, prev - 1));
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
              Coffres Mystères{' '}
              <span className="bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent">
                Ikovaline
              </span>
            </h1>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Tentez votre chance et remportez des réductions exclusives sur vos
              projets digitaux !
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
                Pour jouer aux coffres mystères et gagner des réductions,
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

          {/* Preview chests (locked) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto mt-12">
            {[0, 1, 2].map((index) => (
              <motion.div
                key={index}
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 + index * 0.1 }}
                className="relative"
              >
                <div className="relative w-full aspect-square rounded-3xl p-8 bg-gray-100 opacity-50">
                  <div className="relative z-10 flex flex-col items-center justify-center h-full">
                    <Lock className="w-20 h-20 text-gray-300 mb-4" />
                    <span className="text-gray-400 font-semibold text-lg">
                      Coffre {index + 1}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Authenticated view
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Coffres Mystères{' '}
            <span className="bg-gradient-to-r from-blue-600 to-blue-700 bg-clip-text text-transparent">
              Ikovaline
            </span>
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Tentez votre chance et remportez des réductions exclusives sur vos
            projets digitaux !
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

        {/* CTA Parrainage */}
        {availableRounds === 0 && (
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="text-center"
          >
            <Link
              href="/parrainage"
              className="inline-block px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
            >
              Parrainer pour gagner des tours
            </Link>
          </motion.div>
        )}
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
