// app/roulette/page.tsx
'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { RouletteWheel } from '@/components/roulette/RouletteWheel';

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
  const [acceptingInvite, setAcceptingInvite] = useState(false);
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

  // Si un code d'invite est présent, on l'accepte au moment où l'email est connu
  useEffect(() => {
    if (!inviteCode || !email) return;
    (async () => {
      setAcceptingInvite(true);
      await fetch('/api/roulette/accept', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ inviteCode, inviteeEmail: email }),
      });
      setAcceptingInvite(false);
      // recharger les probabilités après accept
      fetchProbs(email);
    })();
  }, [inviteCode, email, fetchProbs]);

  // Quand l'email change → charger probabilités
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

    // Lancer l’animation
    setTargetSeg(data.seg as number);
    // attendre la fin (3.7s) + marge
    setTimeout(() => {
      setResult({
        seg: data.seg,
        prize: data.prize,
        code: data.code,
        expiresAt: data.expiresAt,
      });
      setSpinning(false);
      // recharger eligibilité (désormais faux) et poids (boosts reset)
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
    <div className="min-h-[100svh] bg-white text-zinc-900 dark:bg-[#0B0D10] dark:text-[#E9EDF2]">
      <div className="max-w-5xl mx-auto px-6 py-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
          <div>
            <h1 className="text-3xl md:text-4xl font-semibold tracking-tight">
              Roue Ikovaline
            </h1>
            <p className="mt-1 text-zinc-600 dark:text-zinc-400">
              1 rotation / email • récompense garantie • validité 14 jours • non
              cumulable
            </p>
          </div>
          {/* Email */}
          <div className="flex items-center gap-2">
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="votre@email.com"
              inputMode="email"
              className="h-11 rounded-xl px-4 bg-white dark:bg-[#12171D] border border-zinc-200 dark:border-[#1A2026] outline-none shadow-sm w-72"
              aria-label="Adresse e-mail"
            />
            <button
              onClick={() => fetchProbs(email)}
              className="h-11 rounded-xl px-4 bg-zinc-900 text-white dark:bg-white dark:text-zinc-900"
            >
              Voir mes chances
            </button>
          </div>
        </div>

        {/* Status Eligibility */}
        <div className="mt-3 text-sm">
          {eligible === true && (
            <span className="text-emerald-600 dark:text-emerald-400">
              ✅ Vous pouvez jouer maintenant.
            </span>
          )}
          {eligible === false && (
            <span className="text-amber-600 dark:text-amber-400">
              ⏳ Vous avez déjà joué. Prochain essai possible le{' '}
              {nextEligibleAt
                ? new Date(nextEligibleAt).toLocaleString('fr-FR')
                : 'plus tard'}
              .
            </span>
          )}
          {probLoading && (
            <span className="ml-2 opacity-70">Mise à jour des chances…</span>
          )}
          {acceptingInvite && (
            <span className="ml-2 opacity-70">Validation de l’invitation…</span>
          )}
        </div>

        {/* Layout */}
        <div className="mt-8 grid md:grid-cols-2 gap-8">
          {/* Roue */}
          <div className="grid place-items-center">
            <RouletteWheel
              weights={weights ?? []}
              targetSeg={targetSeg}
              spinning={spinning}
            />
            <button
              onClick={spin}
              disabled={!canSpin}
              className="mt-6 h-12 px-6 rounded-xl font-medium bg-zinc-900 text-white enabled:hover:opacity-90 disabled:opacity-40 dark:bg-white dark:text-zinc-900"
            >
              {spinning ? 'Rotation…' : 'Je tente ma chance'}
            </button>
            <div className="mt-4 text-xs text-zinc-600 dark:text-zinc-400">
              Jackpot −50 % :{' '}
              {weights?.find((w) => w.seg === 1)?.pct.toFixed(2) ?? '0.00'} %
              actuellement
            </div>
          </div>

          {/* Panneau chances + parrainage */}
          <div>
            {/* Chances */}
            <div className="rounded-2xl border border-zinc-200 dark:border-[#1A2026] bg-white dark:bg-[#12161D] shadow-sm">
              <div className="px-4 py-3 border-b border-zinc-200/70 dark:border-white/10 flex items-center justify-between">
                <div className="font-medium">Chances actuelles</div>
                <div className="text-sm opacity-70">
                  Total : {totalPct.toFixed(2)}%
                </div>
              </div>
              <div className="p-4 grid grid-cols-1 sm:grid-cols-2 gap-2">
                {(weights ?? []).map((w) => (
                  <div
                    key={w.seg}
                    className="flex items-center justify-between rounded-lg px-3 py-2 bg-zinc-50 dark:bg-black/30 border border-zinc-200 dark:border-white/10"
                  >
                    <span>{w.label}</span>
                    <span className="tabular-nums">{w.pct.toFixed(2)}%</span>
                  </div>
                ))}
              </div>
              {boosts &&
              (boosts.add2 || boosts.add3 || boosts.add5 || boosts.add7) ? (
                <div className="px-4 pb-3 text-xs text-emerald-700 dark:text-emerald-400">
                  Boosts actifs : +{boosts.add7} pts (−50 €), +{boosts.add3} pts
                  (−10 %), +{boosts.add2} pts (−20 %), +{boosts.add5} pts (−100
                  €)
                </div>
              ) : (
                <div className="px-4 pb-3 text-xs text-zinc-600 dark:text-zinc-400">
                  Astuce : invitez un ami pour augmenter vos chances de gagner
                  une **grosse** remise.
                </div>
              )}
            </div>

            {/* Parrainage */}
            <div className="mt-6 rounded-2xl border border-zinc-200 dark:border-[#1A2026] bg-white dark:bg-[#12161D] shadow-sm p-4">
              <div className="font-medium">Parrainage</div>
              <p className="text-sm text-zinc-600 dark:text-zinc-400 mt-1">
                1 filleul validé ⇒ +5 pts répartis (−50 €, −10 %, −20 %, −100 €)
                pour votre <b>prochaine</b> rotation. Cap : 3 boosts / 30 jours.
              </p>
              <div className="mt-3 flex gap-2">
                <button
                  onClick={createInvite}
                  disabled={!email}
                  className="h-11 rounded-xl px-4 bg-zinc-900 text-white disabled:opacity-40 dark:bg-white dark:text-zinc-900"
                >
                  Générer mon lien d’invitation
                </button>
                {inviteUrl && (
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(inviteUrl!);
                    }}
                    className="h-11 rounded-xl px-4 bg-zinc-200 hover:bg-zinc-300 dark:bg-zinc-800 dark:hover:bg-zinc-700"
                  >
                    Copier le lien
                  </button>
                )}
              </div>
              {inviteUrl && (
                <div className="mt-2 text-xs break-all text-zinc-600 dark:text-zinc-400">
                  {inviteUrl}
                </div>
              )}
            </div>

            {/* Résultat */}
            {result && (
              <div className="mt-6 rounded-2xl border border-zinc-200 dark:border-[#1A2026] bg-white dark:bg-[#12161D] shadow-sm p-4">
                <div className="text-lg">
                  🎁 Gagné : <b>{result.prize}</b>
                </div>
                <div className="text-sm mt-2">
                  Code : <b>{result.code}</b> — valable jusqu’au{' '}
                  {new Date(result.expiresAt).toLocaleDateString('fr-FR')}
                </div>
                <div className="text-xs text-zinc-600 dark:text-zinc-400 mt-2">
                  Utilisez ce code dans votre brief / réponse email. Nous
                  appliquerons la remise sur votre devis/facture (paiement par
                  RIB).
                </div>
              </div>
            )}

            {/* Légal */}
            <div className="mt-6 text-xs text-zinc-500 dark:text-zinc-400">
              Jackpot −50 % : activé uniquement lors d’événements annoncés.
              Remises % plafonnées (cap), remises fixes avec seuils. 1 rotation
              / 30 j par email. Validité 14 j. Non cumulable. Probabilités
              affichées = réelles à l’instant T.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
