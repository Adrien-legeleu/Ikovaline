// components/roulette/SpinButton.tsx
'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Loader2 } from 'lucide-react';
import { useState } from 'react';

type SpinButtonProps = {
  canSpin: boolean;
  spinning: boolean;
  onClick: () => void;
  email: string;
  eligible: boolean | null;
};

export function SpinButton({
  canSpin,
  spinning,
  onClick,
  email,
  eligible,
}: SpinButtonProps) {
  const [showTooltip, setShowTooltip] = useState(false);

  const getDisabledReason = () => {
    if (!email) return 'Saisissez votre e-mail';
    if (eligible === false) return 'Prochain essai disponible plus tard';
    if (eligible === null) return "Vérifiez vos chances d'abord";
    return null;
  };

  const disabledReason = getDisabledReason();
  const isDisabled = !canSpin;

  return (
    <div className="relative inline-block">
      <motion.button
        onClick={onClick}
        disabled={isDisabled}
        onMouseEnter={() => isDisabled && setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        whileHover={canSpin ? { scale: 1.03, y: -2 } : {}}
        whileTap={canSpin ? { scale: 0.97 } : {}}
        className="relative px-12 py-4 rounded-2xl bg-gradient-to-br from-primary to-primary/90 text-white font-bold text-base shadow-[0_20px_40px_-15px] shadow-primary/40 disabled:opacity-40 disabled:cursor-not-allowed transition-all overflow-hidden group"
        aria-label={spinning ? 'Rotation en cours' : 'Lancer la roue'}
        aria-disabled={isDisabled}
      >
        {/* Shine effect on hover */}
        {canSpin && !spinning && (
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full"
            transition={{ duration: 0.6, ease: 'easeInOut' }}
          />
        )}

        {/* Button content */}
        <span className="relative flex items-center justify-center gap-3">
          <AnimatePresence mode="wait">
            {spinning ? (
              <motion.span
                key="spinning"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="flex items-center gap-3"
              >
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{
                    duration: 1,
                    repeat: Infinity,
                    ease: 'linear',
                  }}
                >
                  <Loader2 className="w-5 h-5" />
                </motion.div>
                Rotation en cours...
              </motion.span>
            ) : (
              <motion.span
                key="ready"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="flex items-center gap-3"
              >
                <Sparkles className="w-5 h-5" />
                Je tente ma chance
              </motion.span>
            )}
          </AnimatePresence>
        </span>

        {/* Glow effect when active */}
        {canSpin && !spinning && (
          <motion.div
            className="absolute inset-0 rounded-2xl"
            animate={{
              boxShadow: [
                '0 0 0 0 rgba(var(--primary-rgb), 0)',
                '0 0 0 4px rgba(var(--primary-rgb), 0.1)',
                '0 0 0 0 rgba(var(--primary-rgb), 0)',
              ],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        )}
      </motion.button>

      {/* Tooltip */}
      <AnimatePresence>
        {showTooltip && disabledReason && (
          <motion.div
            initial={{ opacity: 0, y: 5, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 5, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 px-4 py-2 rounded-xl bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900 text-sm font-medium whitespace-nowrap shadow-xl z-10"
            role="tooltip"
          >
            {disabledReason}
            <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-1 w-2 h-2 rotate-45 bg-neutral-900 dark:bg-neutral-100" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
