// app/(site)/roulette/page.tsx
'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { RouletteWheel } from '@/components/roulette/RouletteWheel';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Gift, Users, TrendingUp, Mail } from 'lucide-react';

type Weight = { seg: number; label: string; pct: number };

export default function RoulettePage() {
  const [email, setEmail] = useState('');
  const [weights, setWeights] = useState<Weight[] | null>(null);
  const [eligible, setEligible] = useState<boolean | null>(null);
  const [nextEligibleAt, setNextEligibleAt] = useState<string | null>(null);
  const [boosts, setBoosts] = useState<{
    add2: number;
    add3: number;
    add5: number;
    add7: number;
  } | null>(null);

  const [spinning, setSpinning] = useState(false);
  const [targetSeg, setTargetSeg] = useState<number | null>(null);
  const [result, setResult] = useState<{
    seg: number;
    prize: string;
    code: string;
    expiresAt: string;
  } | null>(null);

  const [inviteUrl, setInviteUrl] = useState<string | null>(null);
  const [probLoading, setProbLoading] = useState(false);

  const searchParams =
    typeof window !== 'undefined'
      ? new URLSearchParams(window.location.search)
      : null;
  const inviteCode = searchParams?.get('invite') || null;

  const canSpin = useMemo(
    () => !!email && eligible === true && !spinning,
    [email, eligible, spinning]
  );

  const fetchProbs = useCallback(async (e?: string) => {
    if (!e) return;
    setProbLoading(true);
    const res = await fetch('/api/roulette/probabilities', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ email: e }),
    });
    const data = await res.json();
    setProbLoading(false);

    if (data?.weights) {
      setWeights(data.weights);
      setEligible(data.eligible);
      setNextEligibleAt(data.nextEligibleAt);
      setBoosts(data.boosts);
    } else {
      setWeights(null);
      setEligible(null);
      setNextEligibleAt(null);
      setBoosts(null);
    }
  }, []);

  useEffect(() => {
    if (!inviteCode || !email) return;
    (async () => {
      await fetch('/api/roulette/accept', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ inviteCode, inviteeEmail: email }),
      });
      fetchProbs(email);
    })();
  }, [inviteCode, email, fetchProbs]);

  useEffect(() => {
    if (email) fetchProbs(email);
  }, [email, fetchProbs]);

  async function spin() {
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
      const data = await res.json();
      setEligible(false);
      setNextEligibleAt(data?.nextEligibleAt ?? null);
      setSpinning(false);
      return;
    }

    const data = await res.json();
    if (!data?.ok) {
      setSpinning(false);
      alert(data?.error ?? 'Erreur spin');
      return;
    }

    setTargetSeg(data.seg as number);
    setTimeout(() => {
      setResult({
        seg: data.seg,
        prize: data.prize,
        code: data.code,
        expiresAt: data.expiresAt,
      });
      setSpinning(false);
      fetchProbs(email);
    }, 3850);
  }

  async function createInvite() {
    if (!email) return;
    const r = await fetch('/api/roulette/invite', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ referrerEmail: email }),
    });
    const data = await r.json();
    if (data?.url) setInviteUrl(data.url);
  }

  const totalPct = useMemo(
    () => weights?.reduce((a, w) => a + w.pct, 0) ?? 0,
    [weights]
  );

  return (
    <div className="h-screen w-full text-5xl flex items-center justify-center">
      Arrive Bientôt
    </div>
    // <div className="min-h-[100svh] bg-white dark:bg-black relative overflow-hidden">
    //   {/* Background animé subtil */}
    //   <div className="absolute inset-0 pointer-events-none overflow-hidden">
    //     <motion.div
    //       className="absolute top-20 -left-32 w-80 h-80 rounded-full blur-3xl opacity-10"
    //       style={{ background: 'hsl(var(--primary))' }}
    //       animate={{
    //         x: [0, 30, 0],
    //         y: [0, -20, 0],
    //         scale: [1, 1.1, 1],
    //       }}
    //       transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
    //     />
    //     <motion.div
    //       className="absolute bottom-32 -right-32 w-80 h-80 rounded-full blur-3xl opacity-10"
    //       style={{ background: 'hsl(var(--primary))' }}
    //       animate={{
    //         x: [0, -30, 0],
    //         y: [0, 20, 0],
    //         scale: [1.1, 1, 1.1],
    //       }}
    //       transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
    //     />
    //   </div>

    //   <div className="max-w-7xl mx-auto px-6 py-12 md:py-20 relative z-10">
    //     {/* Header */}
    //     <motion.div
    //       initial={{ opacity: 0, y: 20 }}
    //       animate={{ opacity: 1, y: 0 }}
    //       transition={{ duration: 0.6 }}
    //       className="text-center mb-12 md:mb-16"
    //     >
    //       <motion.div
    //         initial={{ scale: 0.9, opacity: 0 }}
    //         animate={{ scale: 1, opacity: 1 }}
    //         transition={{ duration: 0.5, delay: 0.1 }}
    //         className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 mb-4"
    //       >
    //         <Sparkles className="w-4 h-4 text-primary" />
    //         <span className="text-sm font-semibold text-primary">
    //           Offre exclusive
    //         </span>
    //       </motion.div>

    //       <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-3">
    //         La Roue <span className="text-primary">Ikovaline</span>
    //       </h1>
    //       <p className="text-neutral-600 dark:text-neutral-400 text-base md:text-lg max-w-2xl mx-auto">
    //         Une rotation par email • Récompense garantie • 14 jours de validité
    //       </p>
    //     </motion.div>

    //     {/* Email Section */}
    //     <motion.div
    //       initial={{ opacity: 0, y: 20 }}
    //       animate={{ opacity: 1, y: 0 }}
    //       transition={{ duration: 0.6, delay: 0.2 }}
    //       className="max-w-lg mx-auto mb-8"
    //     >
    //       <div className="rounded-[2rem] bg-white/90 dark:bg-neutral-900/90 backdrop-blur-xl p-5 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)]">
    //         <div className="relative">
    //           <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
    //           <input
    //             value={email}
    //             onChange={(e) => setEmail(e.target.value)}
    //             placeholder="votre@email.com"
    //             inputMode="email"
    //             className="w-full rounded-2xl pl-12 pr-6 py-4 bg-white dark:bg-neutral-950 text-neutral-900 dark:text-white placeholder:text-neutral-400 outline-none focus:ring-2 focus:ring-primary/50 transition-all"
    //             aria-label="Adresse e-mail"
    //           />
    //         </div>
    //         <button
    //           onClick={() => fetchProbs(email)}
    //           disabled={probLoading}
    //           className="w-full mt-3 rounded-2xl px-6 py-4 bg-primary text-white font-semibold hover:opacity-90 transition-all disabled:opacity-50"
    //         >
    //           {probLoading ? 'Chargement...' : 'Voir mes chances'}
    //         </button>
    //       </div>

    //       {/* Status */}
    //       <AnimatePresence mode="wait">
    //         {eligible === true && (
    //           <motion.div
    //             initial={{ opacity: 0, y: -10 }}
    //             animate={{ opacity: 1, y: 0 }}
    //             exit={{ opacity: 0, y: -10 }}
    //             className="mt-3 text-center text-sm text-emerald-600 dark:text-emerald-400 flex items-center justify-center gap-2"
    //           >
    //             <motion.div
    //               className="w-2 h-2 rounded-full bg-emerald-500"
    //               animate={{ scale: [1, 1.2, 1], opacity: [1, 0.5, 1] }}
    //               transition={{ duration: 2, repeat: Infinity }}
    //             />
    //             Vous pouvez jouer maintenant
    //           </motion.div>
    //         )}
    //         {eligible === false && (
    //           <motion.div
    //             initial={{ opacity: 0, y: -10 }}
    //             animate={{ opacity: 1, y: 0 }}
    //             exit={{ opacity: 0, y: -10 }}
    //             className="mt-3 text-center text-sm text-amber-600 dark:text-amber-400"
    //           >
    //             ⏳ Prochain essai :{' '}
    //             {nextEligibleAt
    //               ? new Date(nextEligibleAt).toLocaleDateString('fr-FR')
    //               : 'plus tard'}
    //           </motion.div>
    //         )}
    //       </AnimatePresence>
    //     </motion.div>

    //     {/* Main Grid */}
    //     <div className="grid lg:grid-cols-[1.2fr_0.8fr] gap-8 items-start">
    //       {/* Roue */}
    //       <motion.div
    //         initial={{ opacity: 0, scale: 0.95 }}
    //         animate={{ opacity: 1, scale: 1 }}
    //         transition={{ duration: 0.6, delay: 0.3 }}
    //         className="flex flex-col items-center"
    //       >
    //         <RouletteWheel
    //           weights={weights ?? []}
    //           targetSeg={targetSeg}
    //           spinning={spinning}
    //         />

    //         <motion.button
    //           onClick={spin}
    //           disabled={!canSpin}
    //           whileHover={{ scale: canSpin ? 1.03 : 1 }}
    //           whileTap={{ scale: canSpin ? 0.97 : 1 }}
    //           className="mt-8 px-12 py-4 rounded-2xl bg-primary text-white font-bold text-base shadow-[0_20px_40px_-15px] shadow-primary/40 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
    //         >
    //           {spinning ? (
    //             <span className="flex items-center gap-3">
    //               <motion.div
    //                 animate={{ rotate: 360 }}
    //                 transition={{
    //                   duration: 1,
    //                   repeat: Infinity,
    //                   ease: 'linear',
    //                 }}
    //                 className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
    //               />
    //               Rotation en cours...
    //             </span>
    //           ) : (
    //             'Je tente ma chance'
    //           )}
    //         </motion.button>

    //         {weights && (
    //           <motion.p
    //             initial={{ opacity: 0 }}
    //             animate={{ opacity: 1 }}
    //             transition={{ delay: 0.5 }}
    //             className="mt-6 text-sm text-neutral-500 dark:text-neutral-400"
    //           >
    //             Jackpot −50% :{' '}
    //             <span className="font-semibold text-primary">
    //               {weights.find((w) => w.seg === 1)?.pct.toFixed(2)}%
    //             </span>
    //           </motion.p>
    //         )}
    //       </motion.div>

    //       {/* Panels */}
    //       <motion.div
    //         initial={{ opacity: 0, x: 20 }}
    //         animate={{ opacity: 1, x: 0 }}
    //         transition={{ duration: 0.6, delay: 0.4 }}
    //         className="space-y-6"
    //       >
    //         {/* Chances */}
    //         <div className="rounded-[2rem] bg-white/90 dark:bg-neutral-900/90 backdrop-blur-xl p-6 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)]">
    //           <div className="flex items-center gap-3 mb-5">
    //             <div className="p-2.5 rounded-xl bg-primary/10">
    //               <TrendingUp className="w-5 h-5 text-primary" />
    //             </div>
    //             <div>
    //               <h3 className="font-semibold text-base">Vos chances</h3>
    //               <p className="text-xs text-neutral-500 dark:text-neutral-400">
    //                 Total : {totalPct.toFixed(1)}%
    //               </p>
    //             </div>
    //           </div>

    //           <div className="grid grid-cols-2 gap-2.5">
    //             {(weights ?? []).map((w, i) => (
    //               <motion.div
    //                 key={w.seg}
    //                 initial={{ opacity: 0, y: 10 }}
    //                 animate={{ opacity: 1, y: 0 }}
    //                 transition={{ delay: 0.5 + i * 0.05 }}
    //                 className="rounded-xl bg-white dark:bg-neutral-950 p-3 shadow-sm"
    //               >
    //                 <div className="text-[10px] text-neutral-500 dark:text-neutral-400 mb-0.5 truncate">
    //                   {w.label}
    //                 </div>
    //                 <div className="text-xl font-bold text-primary">
    //                   {w.pct.toFixed(1)}%
    //                 </div>
    //               </motion.div>
    //             ))}
    //           </div>

    //           {boosts &&
    //             (boosts.add2 || boosts.add3 || boosts.add5 || boosts.add7) && (
    //               <motion.div
    //                 initial={{ opacity: 0 }}
    //                 animate={{ opacity: 1 }}
    //                 className="mt-4 p-3 rounded-xl bg-emerald-500/10"
    //               >
    //                 <p className="text-xs text-emerald-700 dark:text-emerald-400">
    //                   🚀 Boosts actifs : +
    //                   {boosts.add7 + boosts.add3 + boosts.add2 + boosts.add5}{' '}
    //                   pts
    //                 </p>
    //               </motion.div>
    //             )}
    //         </div>

    //         {/* Referral */}
    //         <div className="rounded-[2rem] bg-white/90 dark:bg-neutral-900/90 backdrop-blur-xl p-6 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)]">
    //           <div className="flex items-center gap-3 mb-4">
    //             <div className="p-2.5 rounded-xl bg-primary/10">
    //               <Users className="w-5 h-5 text-primary" />
    //             </div>
    //             <div>
    //               <h3 className="font-semibold text-base">Parrainage</h3>
    //               <p className="text-xs text-neutral-500 dark:text-neutral-400">
    //                 +5 pts par filleul
    //               </p>
    //             </div>
    //           </div>

    //           <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-4">
    //             Invitez un ami et gagnez des points bonus pour votre prochaine
    //             rotation
    //           </p>

    //           <div className="space-y-2.5">
    //             <button
    //               onClick={createInvite}
    //               disabled={!email}
    //               className="w-full rounded-xl px-5 py-3 bg-primary text-white text-sm font-semibold hover:opacity-90 transition-all disabled:opacity-50"
    //             >
    //               Générer mon lien
    //             </button>

    //             {inviteUrl && (
    //               <motion.div
    //                 initial={{ opacity: 0, height: 0 }}
    //                 animate={{ opacity: 1, height: 'auto' }}
    //                 className="space-y-2"
    //               >
    //                 <button
    //                   onClick={() => navigator.clipboard.writeText(inviteUrl)}
    //                   className="w-full rounded-xl px-5 py-3 bg-neutral-100 dark:bg-neutral-800 text-sm font-medium hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-all"
    //                 >
    //                   Copier le lien
    //                 </button>
    //                 <p className="text-[10px] text-neutral-500 break-all px-2">
    //                   {inviteUrl}
    //                 </p>
    //               </motion.div>
    //             )}
    //           </div>
    //         </div>

    //         {/* Result */}
    //         <AnimatePresence>
    //           {result && (
    //             <motion.div
    //               initial={{ opacity: 0, scale: 0.9, y: 20 }}
    //               animate={{ opacity: 1, scale: 1, y: 0 }}
    //               exit={{ opacity: 0, scale: 0.9, y: -20 }}
    //               className="rounded-[2rem] bg-gradient-to-br from-primary to-primary/80 p-6 shadow-[0_20px_60px_-15px] shadow-primary/40"
    //             >
    //               <div className="flex items-center gap-3 mb-4">
    //                 <Gift className="w-7 h-7 text-white" />
    //                 <h3 className="font-bold text-xl text-white">
    //                   Félicitations !
    //                 </h3>
    //               </div>

    //               <div className="bg-white/10 backdrop-blur-sm rounded-xl p-5 text-white space-y-3">
    //                 <p className="text-base">
    //                   Vous avez gagné : <strong>{result.prize}</strong>
    //                 </p>
    //                 <div className="p-3 rounded-lg bg-white/20 backdrop-blur-sm">
    //                   <p className="text-xs opacity-80 mb-1">Votre code :</p>
    //                   <p className="font-mono text-lg font-bold">
    //                     {result.code}
    //                   </p>
    //                 </div>
    //                 <p className="text-xs opacity-80">
    //                   Valable jusqu'au{' '}
    //                   {new Date(result.expiresAt).toLocaleDateString('fr-FR')}
    //                 </p>
    //               </div>
    //             </motion.div>
    //           )}
    //         </AnimatePresence>
    //       </motion.div>
    //     </div>

    //     {/* Footer */}
    //     <motion.div
    //       initial={{ opacity: 0 }}
    //       animate={{ opacity: 1 }}
    //       transition={{ delay: 0.8 }}
    //       className="mt-16 text-center text-[11px] text-neutral-500 dark:text-neutral-400 max-w-3xl mx-auto leading-relaxed"
    //     >
    //       Jackpot −50% activé lors d'événements annoncés. Remises % plafonnées,
    //       remises fixes avec seuils. 1 rotation/30j par email. Validité 14j. Non
    //       cumulable. Probabilités réelles affichées.
    //     </motion.div>
    //   </div>
    // </div>
  );
}
