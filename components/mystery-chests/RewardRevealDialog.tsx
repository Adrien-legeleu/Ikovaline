'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import RewardCard, { type RewardTier } from './RewardCard';

interface RewardRevealDialogProps {
  isOpen: boolean;
  reward: {
    label: string;
    description: string;
    reward_key: string;
  } | null;
  onClose: () => void;
}

// Simple confetti component
function Confetti() {
  const [particles, setParticles] = useState<
    Array<{ id: number; x: number; delay: number; duration: number }>
  >([]);

  useEffect(() => {
    const newParticles = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      delay: Math.random() * 0.5,
      duration: 2 + Math.random() * 2,
    }));
    setParticles(newParticles);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-40">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute w-2 h-2 rounded-full"
          style={{
            left: `${particle.x}%`,
            top: '-10px',
            backgroundColor: [
              '#ff7a00',
              '#ff3c00',
              '#22c55e',
              '#3b82f6',
              '#a855f7',
              '#f59e0b',
            ][Math.floor(Math.random() * 6)],
          }}
          initial={{ y: -20, opacity: 1, rotate: 0 }}
          animate={{
            y: window.innerHeight + 20,
            opacity: 0,
            rotate: 360,
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            ease: 'easeIn',
          }}
        />
      ))}
    </div>
  );
}

export default function RewardRevealDialog({
  isOpen,
  reward,
  onClose,
}: RewardRevealDialogProps) {
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    if (isOpen && reward) {
      setShowConfetti(true);
      const timer = setTimeout(() => setShowConfetti(false), 4000);
      return () => clearTimeout(timer);
    }
  }, [isOpen, reward]);

  return (
    <AnimatePresence>
      {isOpen && reward && (
        <>
          {/* Confetti */}
          {showConfetti && <Confetti />}

          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center z-50 p-4"
            onClick={onClose}
          >
            {/* Dialog content */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
              onClick={(e) => e.stopPropagation()}
              className="relative"
            >
              <RewardCard
                label={reward.label}
                description={reward.description}
                rewardKey={reward.reward_key}
                onClose={onClose}
              />
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
