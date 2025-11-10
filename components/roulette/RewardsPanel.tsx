// file: components/roulette/RewardsPanel.tsx
'use client';

import { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  Gift,
  Copy,
  Check,
  Filter,
  MessageCircle,
  Mail,
  Info,
} from 'lucide-react';
import { SEGMENTS, describeRule } from '@/lib/roulette/segments';

type Reward = {
  id: string;
  seg: number;
  prize_label: string; // gardé pour compat, mais on préfère SEGMENTS[x].label
  code: string;
  status: 'issued' | 'used' | 'expired';
  expires_at: string;
  created_at: string;
};

type Props = { email: string; rewards: Reward[] };
type FilterKey = 'all' | 'valid' | 'expired' | 'used';

export function RewardsPanel({ email, rewards }: Props) {
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [filter, setFilter] = useState<FilterKey>('all');

  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '';
  const salesEmail = process.env.NEXT_PUBLIC_SALES_EMAIL || '';
  const now = Date.now();

  const list = useMemo(() => {
    const sorted = [...rewards].sort(
      (a, b) =>
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    );
    const isExpired = (r: Reward) =>
      r.status === 'expired' || new Date(r.expires_at).getTime() < now;
    const isValid = (r: Reward) => r.status === 'issued' && !isExpired(r);

    switch (filter) {
      case 'valid':
        return sorted.filter(isValid);
      case 'expired':
        return sorted.filter(isExpired);
      case 'used':
        return sorted.filter((r) => r.status === 'used');
      default:
        return sorted;
    }
  }, [rewards, filter, now]);

  const toFR = (iso: string) =>
    new Date(iso).toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    });

  const copyCode = async (id: string, code: string) => {
    try {
      await navigator.clipboard.writeText(code);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 1200);
    } catch {}
  };

  const sanitizePhone = (n: string) => n.replace(/[\s\+\(\)\-]/g, '');

  const buildWhatsApp = (r: Reward, label: string) => {
    if (!whatsappNumber) return undefined;
    const message = `Bonjour Ikovaline 👋
Je viens de gagner « ${label} » sur la Roue Ikovaline.
Mon code : ${r.code}
Valide jusqu'au : ${toFR(r.expires_at)}
Email : ${email}
Je souhaite démarrer un projet. Merci de revenir vers moi.`;
    return `https://wa.me/${sanitizePhone(whatsappNumber)}?text=${encodeURIComponent(message)}`;
  };

  const buildMailto = (r: Reward, label: string) => {
    if (!salesEmail) return undefined;
    const subject = `Code Ikovaline ${r.code} – Démarrage projet`;
    const body = `Bonjour Ikovaline,

Je viens de gagner « ${label} » sur la Roue Ikovaline.
Code : ${r.code}
Valide jusqu'au : ${toFR(r.expires_at)}
Email utilisé : ${email}

Je souhaite démarrer un projet (Landing / Vitrine / Tunnel / E-commerce / SaaS).
Merci de me recontacter.

——
Message généré depuis la page Roulette Ikovaline`;
    return `mailto:${salesEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  return (
    <section
      className="rounded-[2rem] bg-white/90 dark:bg-neutral-900/90 backdrop-blur-xl p-6 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] border border-black/5 dark:border-white/10"
      aria-labelledby="rewards-title"
    >
      <header className="flex items-center justify-between gap-4 mb-5">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-primary/10">
            <Gift className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h3 id="rewards-title" className="font-semibold text-base">
              Mes récompenses
            </h3>
            <p className="text-xs text-neutral-500 dark:text-neutral-400">
              Historique complet • tri par date (↓)
            </p>
          </div>
        </div>

        <div
          className="flex items-center gap-2"
          role="tablist"
          aria-label="Filtrer l'historique"
        >
          <FilterPill
            label="Tous"
            active={filter === 'all'}
            onClick={() => setFilter('all')}
          />
          <FilterPill
            label="Valides"
            active={filter === 'valid'}
            onClick={() => setFilter('valid')}
          />
          <FilterPill
            label="Expirés"
            active={filter === 'expired'}
            onClick={() => setFilter('expired')}
          />
          <FilterPill
            label="Utilisés"
            active={filter === 'used'}
            onClick={() => setFilter('used')}
          />
        </div>
      </header>

      {list.length === 0 ? (
        <EmptyState />
      ) : (
        <ul className="grid sm:grid-cols-2 gap-4">
          {list.map((r, i) => {
            // ✅ Libellé fiable depuis SEGMENTS
            const segEntry = SEGMENTS[r.seg as keyof typeof SEGMENTS];
            const label = segEntry?.label ?? r.prize_label;
            const ruleText = segEntry ? describeRule(segEntry.rules) : '';

            const expired =
              r.status === 'expired' || new Date(r.expires_at).getTime() < now;
            const badge =
              r.status === 'used'
                ? {
                    text: 'Utilisé',
                    className:
                      'bg-neutral-200 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300',
                  }
                : expired
                  ? {
                      text: 'Expiré',
                      className:
                        'bg-red-100/80 dark:bg-red-900/40 text-red-700 dark:text-red-300',
                    }
                  : {
                      text: 'Valide',
                      className:
                        'bg-emerald-100/80 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-300',
                    };

            const wa = buildWhatsApp(r, label);
            const mail = buildMailto(r, label);

            return (
              <motion.li
                key={r.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.03, duration: 0.3 }}
                className="rounded-2xl bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 p-4 shadow-sm"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <h4 className="font-semibold text-sm">{label}</h4>
                    <p className="text-[11px] text-neutral-500 dark:text-neutral-400">
                      Émis le{' '}
                      <span className="tabular-nums">{toFR(r.created_at)}</span>
                      {' • '}Expire le{' '}
                      <span className="tabular-nums">{toFR(r.expires_at)}</span>
                    </p>
                    {ruleText && (
                      <p className="mt-1 inline-flex items-center gap-1 text-[11px] text-neutral-500 dark:text-neutral-400">
                        <Info className="w-3.5 h-3.5" />
                        {ruleText}
                      </p>
                    )}
                  </div>

                  <span
                    className={`px-2.5 py-1 rounded-full text-[11px] font-semibold ${badge.className}`}
                  >
                    {badge.text}
                  </span>
                </div>

                <div className="mt-3 flex items-center justify-between gap-3">
                  <code className="px-3 py-2 rounded-xl bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 font-mono text-sm tracking-wider">
                    {r.code}
                  </code>

                  <button
                    onClick={() => copyCode(r.id, r.code)}
                    className="shrink-0 px-3 py-2 rounded-xl bg-primary text-white text-xs font-semibold hover:opacity-90 transition-all active:scale-95"
                    aria-label="Copier le code"
                  >
                    <AnimatePresence mode="wait">
                      {copiedId === r.id ? (
                        <motion.span
                          key="ok"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          exit={{ scale: 0 }}
                          className="flex items-center gap-1"
                        >
                          <Check className="w-4 h-4" /> Copié ✓
                        </motion.span>
                      ) : (
                        <motion.span
                          key="copy"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          exit={{ scale: 0 }}
                          className="flex items-center gap-1"
                        >
                          <Copy className="w-4 h-4" /> Copier
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </button>
                </div>

                <div className="mt-3 grid grid-cols-2 gap-2">
                  <a
                    href={wa}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-disabled={!wa}
                    className={`flex items-center justify-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold shadow-sm transition-all ${
                      wa
                        ? 'bg-[#25D366] text-white hover:opacity-90 active:scale-95'
                        : 'bg-neutral-100 dark:bg-neutral-900 text-neutral-400 cursor-not-allowed'
                    }`}
                  >
                    <MessageCircle className="w-4 h-4" />
                    WhatsApp
                  </a>
                  <a
                    href={mail}
                    aria-disabled={!mail}
                    className={`flex items-center justify-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold shadow-sm transition-all ${
                      mail
                        ? 'bg-primary text-white hover:opacity-90 active:scale-95'
                        : 'bg-neutral-100 dark:bg-neutral-900 text-neutral-400 cursor-not-allowed'
                    }`}
                  >
                    <Mail className="w-4 h-4" />
                    Email
                  </a>
                </div>
              </motion.li>
            );
          })}
        </ul>
      )}
    </section>
  );
}

function FilterPill({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      role="tab"
      aria-selected={active}
      onClick={onClick}
      className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-colors ${
        active
          ? 'bg-primary text-white'
          : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-200 hover:bg-neutral-200 dark:hover:bg-neutral-700'
      }`}
    >
      {label}
    </button>
  );
}

function EmptyState() {
  return (
    <div className="rounded-2xl border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950 p-6 text-center">
      <p className="text-sm text-neutral-600 dark:text-neutral-400">
        Aucune récompense pour le moment.
      </p>
      <p className="text-xs text-neutral-500 dark:text-neutral-500 mt-1">
        Jouez la roue pour obtenir un code ✨
      </p>
    </div>
  );
}
