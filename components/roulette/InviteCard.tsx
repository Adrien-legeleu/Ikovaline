// file: components/roulette/InviteCard.tsx
'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, Copy, Check, Info } from 'lucide-react';

export function InviteCard({
  email,
  onGenerateInvite,
  inviteUrl,
}: {
  email: string;
  onGenerateInvite: () => Promise<void>;
  inviteUrl: string | null;
}) {
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  const handleGenerate = async () => {
    setLoading(true);
    try {
      await onGenerateInvite();
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = async () => {
    if (!inviteUrl) return;
    try {
      await navigator.clipboard.writeText(inviteUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 1200);
    } catch {}
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-[2rem] bg-white/90 dark:bg-neutral-900/90 backdrop-blur-xl p-6 border border-black/5 dark:border-white/10"
    >
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2.5 rounded-xl bg-primary/10">
          <Users className="w-5 h-5 text-primary" />
        </div>
        <div className="flex-1">
          <h3 className="font-semibold text-base">Parrainage</h3>
          <p className="text-xs text-neutral-500">
            +1 essai <b className="text-primary">+ 25 points</b> quand le
            filleul effectue son premier spin
          </p>
        </div>
        <button
          className="p-2 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800"
          onMouseEnter={() => setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
          aria-label="Règles du parrainage"
        >
          <Info className="w-4 h-4 text-neutral-400" />
          <AnimatePresence>
            {showTooltip && (
              <motion.div
                initial={{ opacity: 0, y: 5, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 5, scale: 0.95 }}
                transition={{ duration: 0.15 }}
                className="absolute right-0 mt-2 w-64 p-3 rounded-xl bg-neutral-900 text-white text-xs shadow-xl z-10"
              >
                Un filleul crédite son parrain <b>une seule fois</b> au premier
                spin réussi.
                <div className="absolute -top-1 right-4 w-2 h-2 rotate-45 bg-neutral-900" />
              </motion.div>
            )}
          </AnimatePresence>
        </button>
      </div>

      <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-4">
        Invitez un ami pour l’aider à tenter sa chance.
      </p>

      <div className="space-y-2.5">
        {!inviteUrl ? (
          <button
            onClick={handleGenerate}
            disabled={!email || loading}
            className="w-full rounded-xl px-5 py-3.5 bg-primary text-white text-sm font-semibold disabled:opacity-50"
          >
            {loading ? 'Génération…' : 'Générer mon lien'}
          </button>
        ) : (
          <>
            <button
              onClick={handleCopy}
              className="w-full rounded-xl px-5 py-3.5 bg-neutral-100 dark:bg-neutral-800 text-sm font-semibold flex items-center justify-center gap-2"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4" /> Copié ✓
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" /> Copier le lien
                </>
              )}
            </button>
            <div className="p-3 rounded-xl bg-neutral-50 dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800">
              <p className="text-[10px] text-neutral-500 break-all font-mono">
                {inviteUrl}
              </p>
            </div>
          </>
        )}
      </div>
    </motion.div>
  );
}
