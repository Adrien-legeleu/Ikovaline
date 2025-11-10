/**
 * ResultModal - Modal de résultat du spin
 * Affiche la récompense gagnée avec animation et confettis
 */

'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Gift, Copy, Check, X, ExternalLink } from 'lucide-react';
import type { SpinResult } from '@/lib/roulette/types';

interface ResultModalProps {
  isOpen: boolean;
  onClose: () => void;
  result: SpinResult | null;
}

export function ResultModal({ isOpen, onClose, result }: ResultModalProps) {
  const [copied, setCopied] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  const handleCopy = async () => {
    if (!result?.spin.reward_code) return;

    try {
      await navigator.clipboard.writeText(result.spin.reward_code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Erreur lors de la copie:', error);
    }
  };

  // Confetti animation on open
  useEffect(() => {
    if (isOpen) {
      setShowConfetti(true);
      const timer = setTimeout(() => setShowConfetti(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  // Escape key handler
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  if (!result) return null;

  const hasReward = result.reward !== null;
  const rewardConfig = result.reward_config;
  const rewardCode = result.spin.reward_code;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            onClick={onClose}
          />

          {/* Modal */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
            <motion.div
              role="dialog"
              aria-modal="true"
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: 'spring', damping: 20 }}
              className="relative w-full max-w-md pointer-events-auto"
            >
              <div className="relative rounded-3xl bg-white shadow-2xl overflow-hidden">
                {/* Background gradient */}
                <div
                  className="absolute inset-0 opacity-10"
                  style={{
                    background: `linear-gradient(135deg, ${rewardConfig?.color || '#3B82F6'} 0%, transparent 70%)`,
                  }}
                />

                {/* Close button */}
                <button
                  onClick={onClose}
                  className="absolute top-4 right-4 p-2 rounded-xl bg-neutral-100 hover:bg-neutral-200 transition-colors z-10"
                  aria-label="Fermer"
                >
                  <X className="w-5 h-5 text-neutral-600" />
                </button>

                {/* Content */}
                <div className="relative p-8">
                  {/* Icon */}
                  <motion.div
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{
                      delay: 0.2,
                      type: 'spring',
                      stiffness: 200,
                    }}
                    className="flex justify-center mb-6"
                  >
                    <div
                      className="w-24 h-24 rounded-2xl flex items-center justify-center text-5xl shadow-xl"
                      style={{ backgroundColor: rewardConfig?.color || '#3B82F6' }}
                    >
                      {rewardConfig?.icon || '🎁'}
                    </div>
                  </motion.div>

                  {/* Title */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="text-center mb-8"
                  >
                    <h2 className="text-3xl font-bold text-neutral-900 mb-2">
                      {hasReward ? 'Félicitations !' : 'Dommage !'}
                    </h2>
                    <p className="text-neutral-600">
                      {hasReward
                        ? 'Vous avez gagné'
                        : 'Pas de chance cette fois-ci'}
                    </p>
                  </motion.div>

                  {/* Reward */}
                  {hasReward && (
                    <>
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="mb-6"
                      >
                        <div className="p-6 rounded-2xl bg-gradient-to-br from-neutral-50 to-neutral-100 border border-neutral-200 text-center">
                          <div className="text-sm text-neutral-600 mb-2">
                            {result.reward?.label}
                          </div>
                          <div className="text-4xl font-bold text-blue-600">
                            {rewardConfig?.value}
                          </div>
                          <div className="text-xs text-neutral-500 mt-2">
                            {result.reward?.description}
                          </div>
                        </div>
                      </motion.div>

                      {/* Code */}
                      {rewardCode && (
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.5 }}
                          className="mb-6"
                        >
                          <div className="text-xs text-neutral-600 mb-2 font-semibold uppercase tracking-wide">
                            Votre code de réduction
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="flex-1 px-4 py-3 bg-neutral-100 rounded-xl font-mono text-lg font-bold text-neutral-900">
                              {rewardCode}
                            </div>
                            <button
                              onClick={handleCopy}
                              className="p-3 rounded-xl bg-blue-600 text-white hover:bg-blue-700 transition-colors"
                              aria-label="Copier le code"
                            >
                              {copied ? (
                                <Check className="w-5 h-5" />
                              ) : (
                                <Copy className="w-5 h-5" />
                              )}
                            </button>
                          </div>
                          {copied && (
                            <p className="text-xs text-green-600 mt-2">
                              ✓ Code copié !
                            </p>
                          )}
                        </motion.div>
                      )}

                      {/* CTA */}
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 }}
                      >
                        <a
                          href="/contact"
                          className="flex items-center justify-center gap-2 w-full px-6 py-4 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-colors"
                        >
                          <ExternalLink className="w-5 h-5" />
                          Utiliser ma réduction
                        </a>
                        <p className="text-xs text-neutral-500 text-center mt-3">
                          Contactez-nous pour démarrer votre projet et profiter de votre réduction
                        </p>
                      </motion.div>
                    </>
                  )}

                  {/* No reward */}
                  {!hasReward && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                      className="text-center"
                    >
                      <p className="text-neutral-600 mb-6">
                        Réessayez votre chance lors de votre prochain passage !
                      </p>
                      <button
                        onClick={onClose}
                        className="px-6 py-3 rounded-xl bg-neutral-900 text-white font-semibold hover:bg-neutral-800 transition-colors"
                      >
                        Fermer
                      </button>
                    </motion.div>
                  )}
                </div>
              </div>
            </motion.div>
          </div>

          {/* Confetti */}
          {showConfetti && hasReward && (
            <div className="fixed inset-0 z-40 pointer-events-none overflow-hidden">
              {Array.from({ length: 40 }).map((_, i) => {
                const colors = [
                  rewardConfig?.color || '#3B82F6',
                  '#FFD700',
                  '#FFA500',
                  '#FF6B9D',
                  '#4ADE80',
                ];
                const randomColor = colors[Math.floor(Math.random() * colors.length)];
                const randomX = Math.random() * 100;
                const randomDelay = Math.random() * 0.5;
                const randomDuration = 1 + Math.random() * 1;
                const randomRotate = Math.random() * 720 - 360;

                return (
                  <motion.div
                    key={i}
                    className="absolute rounded-full"
                    style={{
                      left: `${randomX}%`,
                      top: '-10%',
                      width: Math.random() * 10 + 5,
                      height: Math.random() * 10 + 5,
                      background: randomColor,
                    }}
                    initial={{ y: 0, rotate: 0, opacity: 1 }}
                    animate={{
                      y: window.innerHeight + 100,
                      x: (Math.random() - 0.5) * 300,
                      rotate: randomRotate,
                      opacity: [1, 1, 0],
                    }}
                    transition={{
                      duration: randomDuration,
                      delay: randomDelay,
                      ease: 'easeIn',
                    }}
                  />
                );
              })}
            </div>
          )}
        </>
      )}
    </AnimatePresence>
  );
}
