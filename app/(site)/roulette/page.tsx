// file: app/(site)/roulette/page.tsx
'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Mail, AlertCircle } from 'lucide-react';

import { RouletteWheel } from '@/components/roulette/RouletteWheel';
import { ChanceList } from '@/components/roulette/ChanceList';
import { AllocationPanel } from '@/components/roulette/AllocationPanel';
import { ResultModal } from '@/components/roulette/ResultModal';

type Weight = { seg: number; label: string; pct: number };
type Alloc = { seg: number; points: number };
type Conv = { seg: number; label: string; point_factor_pct: number };
type Reward = {
  id: string;
  seg: number;
  prize_label: string;
  code: string;
  status: 'issued' | 'used' | 'expired';
  expires_at: string;
  created_at: string;
};

export default function RoulettePage() {
  const [email, setEmail] = useState('');
  const [tries, setTries] = useState(0);
  const [wallet, setWallet] = useState(0);
  const [allocation, setAllocation] = useState<Alloc[]>([]);
  const [conversion, setConversion] = useState<Conv[]>([]);
  const [weights, setWeights] = useState<Weight[]>([]);
  const [rewards, setRewards] = useState<Reward[]>([]);

  const [spinning, setSpinning] = useState(false);
  const [targetSeg, setTargetSeg] = useState<number | null>(null);
  const [result, setResult] = useState<{
    seg: number;
    prize: string;
    code: string;
    expiresAt: string;
  } | null>(null);
  const [showResultModal, setShowResultModal] = useState(false);

  const canSpin = useMemo(
    () => !!email && tries > 0 && !spinning,
    [email, tries, spinning]
  );

  const fetchStatus = useCallback(async (e: string) => {
    if (!e) return;
    const res = await fetch('/api/roulette/status', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ email: e }),
    });
    const data = await res.json();
    if (data?.tries_left != null) setTries(data.tries_left);
    if (data?.points_wallet != null) setWallet(data.points_wallet);
    if (Array.isArray(data?.allocation)) setAllocation(data.allocation);
    if (Array.isArray(data?.conversion)) setConversion(data.conversion);
    if (Array.isArray(data?.weights)) setWeights(data.weights);
    if (Array.isArray(data?.rewards)) setRewards(data.rewards);
  }, []);

  // Debounced fetch when email looks valid
  useEffect(() => {
    if (!email || !email.includes('@')) return;
    const t = setTimeout(() => fetchStatus(email), 300);
    return () => clearTimeout(t);
  }, [email, fetchStatus]);

  // Spin
  const handleSpin = async () => {
    if (!canSpin) return;
    setSpinning(true);
    setTargetSeg(null);
    setResult(null);

    const res = await fetch('/api/roulette/spin', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ email }),
    });

    if (res.status === 409) {
      // plus d'essais
      const data = await res.json();
      setTries(0);
      setSpinning(false);
      alert(data?.error ?? "Plus d'essais disponibles");
      return;
    }

    const data = await res.json();
    if (!data?.ok) {
      setSpinning(false);
      alert(data?.error ?? 'Erreur lors du tirage');
      return;
    }

    setTargetSeg(data.seg);

    // attend fin anim (3.8s + micro-bounce ~0.4s)
    setTimeout(() => {
      setSpinning(false);
      setResult({
        seg: data.seg,
        prize: data.prize,
        code: data.code,
        expiresAt: data.expiresAt,
      });
      setShowResultModal(true);
      fetchStatus(email); // refresh tries + rewards
    }, 4000);
  };

  return (
    <div className="min-h-[100svh] bg-white dark:bg-neutral-950 text-neutral-900 dark:text-white relative overflow-hidden">
      {/* BG doux */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          className="absolute top-20 -left-32 w-80 h-80 rounded-full blur-3xl opacity-10"
          style={{ background: 'hsl(var(--primary))' }}
          animate={{ x: [0, 30, 0], y: [0, -20, 0], scale: [1, 1.1, 1] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute bottom-32 -right-32 w-80 h-80 rounded-full blur-3xl opacity-10"
          style={{ background: 'hsl(var(--primary))' }}
          animate={{ x: [0, -30, 0], y: [0, 20, 0], scale: [1.1, 1, 1.1] }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12 md:py-20 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-16"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-4"
          >
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-semibold text-primary">
              Offre exclusive
            </span>
          </motion.div>

          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-3">
            La Roue <span className="text-primary">Ikovaline</span>
          </h1>
          <p className="text-neutral-600 dark:text-neutral-400 text-base md:text-lg max-w-2xl mx-auto">
            Une rotation par email • Récompense garantie • 14 jours de validité
          </p>
        </motion.div>

        {/* Email */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-lg mx-auto mb-8"
        >
          <div className="rounded-[2rem] bg-white/90 dark:bg-neutral-900/90 backdrop-blur-xl p-5 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.15)] border border-black/5 dark:border-white/10">
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="votre@email.com"
                type="email"
                inputMode="email"
                className="w-full rounded-2xl pl-12 pr-6 py-4 bg-white dark:bg-neutral-950 text-neutral-900 dark:text-white placeholder:text-neutral-400 outline-none focus:ring-2 focus:ring-primary/50 transition-all border border-neutral-200 dark:border-neutral-800"
                aria-label="Adresse e-mail"
              />
            </div>
            {email && (
              <p className="mt-3 text-center text-xs text-neutral-500 dark:text-neutral-400">
                Essais restants :{' '}
                <span className="tabular-nums font-semibold">{tries}</span> •
                Wallet :{' '}
                <span className="tabular-nums font-semibold">{wallet}</span>
              </p>
            )}
          </div>
        </motion.div>

        {/* Grid */}
        <div className="grid lg:grid-cols-[1.2fr_0.8fr] gap-8 items-start">
          {/* Roue + bouton */}
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="flex flex-col items-center"
          >
            <RouletteWheel
              weights={weights ?? []}
              targetSeg={targetSeg}
              spinning={spinning}
            />

            <div className="mt-8">
              <SpinButton
                canSpin={canSpin}
                spinning={spinning}
                onClick={handleSpin}
                disabledReason={
                  !email
                    ? 'Saisissez votre e-mail'
                    : tries <= 0
                      ? "Plus d'essais"
                      : undefined
                }
              />
            </div>
          </motion.div>

          {/* Panneaux */}
          <div className="space-y-6">
            {email && allocation.length === 8 && conversion.length === 8 && (
              <AllocationPanel
                email={email}
                wallet={wallet}
                initialAllocation={allocation}
                conversion={conversion}
                onSaved={(w) => setWeights(w)}
              />
            )}

            {weights && weights.length > 0 && <ChanceList weights={weights} />}
          </div>
        </div>
      </div>

      {/* Result Modal */}
      {result && (
        <ResultModal
          isOpen={showResultModal}
          onClose={() => setShowResultModal(false)}
          prize={result.prize}
          code={result.code}
          expiresAt={result.expiresAt}
          email={email}
        />
      )}
    </div>
  );
}

/* ---------- Spin button (léger) ---------- */
function SpinButton({
  canSpin,
  spinning,
  onClick,
  disabledReason,
}: {
  canSpin: boolean;
  spinning: boolean;
  onClick: () => void;
  disabledReason?: string;
}) {
  const isDisabled = !canSpin;

  return (
    <div className="relative inline-block">
      <motion.button
        onClick={onClick}
        disabled={isDisabled}
        whileHover={canSpin ? { scale: 1.03, y: -2 } : {}}
        whileTap={canSpin ? { scale: 0.97 } : {}}
        className="relative px-12 py-4 rounded-2xl bg-gradient-to-br from-primary to-primary/90 text-white font-bold text-base shadow-[0_20px_40px_-15px] shadow-primary/40 disabled:opacity-40 disabled:cursor-not-allowed transition-all overflow-hidden group"
        aria-label={spinning ? 'Rotation en cours' : 'Lancer la roue'}
        aria-disabled={isDisabled}
      >
        {/* Shine */}
        {canSpin && !spinning && (
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full"
            transition={{ duration: 0.6, ease: 'easeInOut' }}
          />
        )}
        <span className="relative flex items-center justify-center gap-3">
          {spinning ? 'Rotation en cours…' : 'Je tente ma chance'}
        </span>
      </motion.button>

      <AnimatePresence>
        {isDisabled && disabledReason && (
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
