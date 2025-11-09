// file: app/(site)/roulette/page.tsx
'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { RouletteWheel } from '@/components/roulette/RouletteWheel';
import { ResultModal } from '@/components/roulette/ResultModal';
import { ChanceList } from '@/components/roulette/ChanceList';
import { InviteCard } from '@/components/roulette/InviteCard';
import { SpinButton } from '@/components/roulette/SpinButton';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Mail } from 'lucide-react';
import { RewardsPanel } from '@/components/roulette/RewardsPanel';
import { AllocationPanel } from '@/components/roulette/AllocationPanel';

type Weight = { seg: number; label: string; pct: number };
type Allocation = { seg: number; points: number };
type Conversion = { seg: number; label: string; point_factor_pct: number };
type Reward = {
  id: string;
  seg: number;
  prize_label: string;
  code: string;
  status: 'issued' | 'used' | 'expired';
  expires_at: string;
  created_at: string;
};
type StatusResponse = {
  tries_left: number;
  points_wallet: number;
  allocation: Allocation[];
  conversion: Conversion[];
  weights: Weight[];
  rewards: Reward[];
};
type Result = { seg: number; prize: string; code: string; expiresAt: string };

export default function RoulettePage() {
  const [email, setEmail] = useState('');
  const [triesLeft, setTriesLeft] = useState<number>(0);
  const [wallet, setWallet] = useState<number>(100);
  const [allocation, setAllocation] = useState<Allocation[] | null>(null);
  const [conversion, setConversion] = useState<Conversion[] | null>(null);
  const [weights, setWeights] = useState<Weight[] | null>(null);
  const [rewards, setRewards] = useState<Reward[] | null>(null);

  const [spinning, setSpinning] = useState(false);
  const [targetSeg, setTargetSeg] = useState<number | null>(null);
  const [result, setResult] = useState<Result | null>(null);
  const [showResultModal, setShowResultModal] = useState(false);

  const [inviteUrl, setInviteUrl] = useState<string | null>(null);
  const [toast, setToast] = useState<{
    message: string;
    type: 'success' | 'error';
  } | null>(null);

  const inviteCode =
    typeof window !== 'undefined'
      ? new URLSearchParams(window.location.search).get('invite')
      : null;

  const canSpin = useMemo(
    () => !!email && triesLeft > 0 && !spinning,
    [email, triesLeft, spinning]
  );

  const showToast = (
    message: string,
    type: 'success' | 'error' = 'success'
  ) => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 2600);
  };

  const fetchStatus = useCallback(async (e: string) => {
    const res = await fetch('/api/roulette/status', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ email: e }),
    });
    const data: StatusResponse = await res.json();
    if ((data as any).error) throw new Error((data as any).error);

    setTriesLeft(data.tries_left);
    setWallet(data.points_wallet);
    setAllocation(data.allocation);
    setConversion(data.conversion);
    setWeights(data.weights);
    setRewards(data.rewards);
  }, []);

  // Accept invite if present
  useEffect(() => {
    if (!inviteCode || !email) return;
    (async () => {
      try {
        await fetch('/api/roulette/accept', {
          method: 'POST',
          headers: { 'content-type': 'application/json' },
          body: JSON.stringify({ inviteCode, inviteeEmail: email }),
        });
        await fetchStatus(email);
        showToast('Invitation acceptée ✅');
      } catch {
        showToast('Invitation déjà liée ou invalide', 'error');
      }
    })();
  }, [inviteCode, email, fetchStatus]);

  // Fetch status on email debounce
  useEffect(() => {
    if (!email || !email.includes('@')) return;
    const t = setTimeout(
      () => fetchStatus(email).catch(() => showToast('Erreur status', 'error')),
      350
    );
    return () => clearTimeout(t);
  }, [email, fetchStatus]);

  async function spin() {
    if (!canSpin) return;
    setSpinning(true);
    setTargetSeg(null);
    setResult(null);
    try {
      const res = await fetch('/api/roulette/spin', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (!res.ok || !data?.ok) throw new Error(data?.error || 'spin_failed');

      setTargetSeg(data.seg as number);
      // Fin d’anim à ~3.9s (inertie 3.8s + micro-bounce wheel)
      setTimeout(() => {
        setResult({
          seg: data.seg,
          prize: data.prize,
          code: data.code,
          expiresAt: data.expiresAt,
        });
        setSpinning(false);
        setShowResultModal(true);
        fetchStatus(email);
      }, 3950);
    } catch (e: any) {
      setSpinning(false);
      showToast(e?.message ?? 'Erreur réseau', 'error');
    }
  }

  const saveAllocation = useCallback(
    async (next: Allocation[]) => {
      if (!email) return;
      const res = await fetch('/api/roulette/allocation', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ email, allocation: next }),
      });
      const data = await res.json();
      if (!res.ok || !data?.ok) {
        showToast(data?.error ?? 'Erreur allocation', 'error');
        return;
      }
      setWeights(data.weights);
      setAllocation(next);
      showToast('Répartition enregistrée');
    },
    [email]
  );

  const createInvite = useCallback(async () => {
    if (!email) return;
    const r = await fetch('/api/roulette/invite', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ referrerEmail: email }),
    });
    const data = await r.json();
    if (data?.url) setInviteUrl(data.url);
  }, [email]);

  return (
    <div className="min-h-[100svh] bg-white dark:bg-neutral-950 text-neutral-900 dark:text-white relative overflow-hidden">
      {/* Background luxe discret */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          className="absolute top-20 -left-32 w-80 h-80 rounded-full blur-3xl opacity-10"
          style={{ background: 'hsl(var(--primary))' }}
          animate={{ x: [0, 28, 0], y: [0, -20, 0], scale: [1, 1.08, 1] }}
          transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute bottom-32 -right-32 w-80 h-80 rounded-full blur-3xl opacity-10"
          style={{ background: 'hsl(var(--primary))' }}
          animate={{ x: [0, -32, 0], y: [0, 18, 0], scale: [1.06, 1, 1.06] }}
          transition={{ duration: 13, repeat: Infinity, ease: 'easeInOut' }}
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
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-4">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-semibold text-primary">
              Offre exclusive
            </span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-3">
            La Roue <span className="text-primary">Ikovaline</span>
          </h1>
          <p className="text-neutral-600 dark:text-neutral-400 text-base md:text-lg max-w-2xl mx-auto">
            1 essai à vie par email • Probabilités réelles • Validité 14 jours
          </p>
        </motion.div>

        {/* Email */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
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
          </div>

          {/* Badges statut wallet/tries */}
          {email && allocation && weights && (
            <div className="mt-3 flex items-center justify-center gap-4 text-xs text-neutral-600 dark:text-neutral-400">
              <span className="px-3 py-1 rounded-full bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800">
                Essais restants : <b className="tabular-nums">{triesLeft}</b>
              </span>
              <span className="px-3 py-1 rounded-full bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800">
                Wallet : <b className="tabular-nums">{wallet}</b> pts
              </span>
            </div>
          )}
        </motion.div>

        {/* Grid */}
        <div className="grid xl:grid-cols-[1.15fr_0.85fr] gap-8 items-start">
          {/* Roue */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
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
                onClick={spin}
                email={email}
                eligible={triesLeft > 0}
              />
            </div>

            {/* Chances compact sous la roue (mobile) */}
            {weights && (
              <p className="mt-6 text-xs text-neutral-500 dark:text-neutral-400">
                Jackpot −50% :{' '}
                <span className="font-semibold text-primary tabular-nums">
                  {(weights.find((w) => w.seg === 1)?.pct ?? 0).toFixed(2)}%
                </span>
              </p>
            )}
          </motion.div>

          {/* Panneaux latéraux */}
          <div className="space-y-6">
            {/* Allocation */}
            {allocation && conversion && (
              <AllocationPanel
                wallet={wallet}
                allocation={allocation}
                conversion={conversion}
                onSave={saveAllocation}
              />
            )}

            {/* Chances détaillées */}
            {weights && <ChanceList weights={weights} />}

            {/* Parrainage */}
            {email && (
              <InviteCard
                email={email}
                onGenerateInvite={createInvite}
                inviteUrl={inviteUrl}
              />
            )}

            {/* Historique récompenses */}
            {rewards && <RewardsPanel rewards={rewards} email={email} />}
          </div>
        </div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-16 text-center text-[11px] text-neutral-500 dark:text-neutral-400 max-w-3xl mx-auto leading-relaxed"
        >
          1 essai par email à vie. Validité des codes 14 jours. Remises non
          cumulables. Les probabilités affichées sont calculées côté serveur à
          partir de votre répartition de points.
        </motion.div>
      </div>

      {/* Modal résultat */}
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

      {/* Toast */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            className="fixed bottom-6 right-6 z-50"
            role="status"
            aria-live="polite"
          >
            <div
              className={`px-6 py-4 rounded-2xl shadow-2xl backdrop-blur-xl flex items-center gap-3 ${
                toast.type === 'error'
                  ? 'bg-red-500/90 text-white'
                  : 'bg-emerald-500/90 text-white'
              }`}
            >
              <span className="font-medium">{toast.message}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
