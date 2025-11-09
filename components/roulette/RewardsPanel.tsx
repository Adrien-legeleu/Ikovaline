// file: components/roulette/RewardsPanel.tsx
'use client';
import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Gift, Copy, Mail, MessageCircle } from 'lucide-react';

type Reward = {
  id: string;
  seg: number;
  prize_label: string;
  code: string;
  status: 'issued' | 'used' | 'expired';
  expires_at: string;
  created_at: string;
};

export function RewardsPanel({
  rewards,
  email,
}: {
  rewards: Reward[];
  email: string;
}) {
  const [filter, setFilter] = useState<'all' | 'valid' | 'used' | 'expired'>(
    'all'
  );
  const list = useMemo(() => {
    return rewards.filter((r) => {
      if (filter === 'all') return true;
      if (filter === 'valid') return r.status === 'issued';
      if (filter === 'used') return r.status === 'used';
      if (filter === 'expired') return r.status === 'expired';
      return true;
    });
  }, [rewards, filter]);

  const whats = (r: Reward) => {
    const dateFR = new Date(r.expires_at).toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
    const num = (process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '').replace(
      /[\s\+\(\)\-]/g,
      ''
    );
    if (!num) return '#';
    const txt = `Bonjour Ikovaline 👋
J'ai gagné « ${r.prize_label} ».
Code : ${r.code}
Valide jusqu'au : ${dateFR}
Email : ${email}`;
    return `https://wa.me/${num}?text=${encodeURIComponent(txt)}`;
  };

  const mailto = (r: Reward) => {
    const dateFR = new Date(r.expires_at).toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });
    const to = process.env.NEXT_PUBLIC_SALES_EMAIL || 'contact@ikovaline.com';
    const subject = `Code Ikovaline ${r.code} – Je souhaite démarrer`;
    const body = `Bonjour Ikovaline,

Je viens de gagner « ${r.prize_label} ».
Code : ${r.code}
Valide jusqu'au : ${dateFR}
Email : ${email}

Cordialement,`;
    return `mailto:${to}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-[2rem] bg-white/90 dark:bg-neutral-900/90 backdrop-blur-xl p-6 border border-black/5 dark:border-white/10"
    >
      <div className="flex items-center gap-3 mb-5">
        <div className="p-2.5 rounded-xl bg-primary/10">
          <Gift className="w-5 h-5 text-primary" />
        </div>
        <h3 className="font-semibold text-base">Mes récompenses</h3>
      </div>

      {/* Filtres */}
      <div className="mb-4 flex items-center gap-2">
        {[
          { k: 'all', label: 'Tous' },
          { k: 'valid', label: 'Valides' },
          { k: 'used', label: 'Utilisés' },
          { k: 'expired', label: 'Expirés' },
        ].map((f) => (
          <button
            key={f.k}
            onClick={() => setFilter(f.k as any)}
            className={`px-3 py-1.5 rounded-lg text-xs border ${filter === f.k ? 'bg-primary text-white border-primary' : 'bg-transparent border-neutral-200 dark:border-neutral-800 text-neutral-500'}`}
            aria-pressed={filter === f.k}
          >
            {f.label}
          </button>
        ))}
      </div>

      <div className="space-y-3">
        {list.map((r) => {
          const date = new Date(r.created_at).toLocaleDateString('fr-FR');
          const exp = new Date(r.expires_at).toLocaleDateString('fr-FR');
          return (
            <div
              key={r.id}
              className="p-4 rounded-xl bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800"
            >
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <div className="text-sm font-semibold">{r.prize_label}</div>
                  <div className="text-[11px] text-neutral-500">
                    Émis le {date} • Expire le {exp}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span
                    className={`px-2 py-1 rounded-md text-[11px] ${
                      r.status === 'issued'
                        ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/30 dark:text-emerald-400'
                        : r.status === 'used'
                          ? 'bg-blue-50 text-blue-700 dark:bg-blue-950/30 dark:text-blue-400'
                          : 'bg-neutral-100 text-neutral-600 dark:bg-neutral-800 dark:text-neutral-300'
                    }`}
                  >
                    {r.status}
                  </span>
                </div>
              </div>

              <div className="mt-3 flex flex-wrap items-center gap-2">
                <code className="px-2 py-1 rounded-md bg-neutral-100 dark:bg-neutral-800 text-xs font-mono">
                  {r.code}
                </code>
                <button
                  onClick={() => navigator.clipboard.writeText(r.code)}
                  className="px-3 py-1.5 rounded-lg text-xs bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 flex items-center gap-1"
                >
                  <Copy className="w-3.5 h-3.5" /> Copier
                </button>
                <a
                  href={whats(r)}
                  target="_blank"
                  className="px-3 py-1.5 rounded-lg text-xs bg-[#25D366] text-white hover:opacity-90 flex items-center gap-1"
                >
                  <MessageCircle className="w-3.5 h-3.5" /> WhatsApp
                </a>
                <a
                  href={mailto(r)}
                  className="px-3 py-1.5 rounded-lg text-xs bg-primary text-white hover:opacity-90 flex items-center gap-1"
                >
                  <Mail className="w-3.5 h-3.5" /> Email
                </a>
              </div>
            </div>
          );
        })}
        {list.length === 0 && (
          <p className="text-sm text-neutral-500">
            Aucune récompense pour l’instant.
          </p>
        )}
      </div>
    </motion.div>
  );
}
