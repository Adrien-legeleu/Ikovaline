// app/admin/dashboard/AdminDashboardClient.tsx
'use client';

import Link from 'next/link';
import { motion, cubicBezier } from 'framer-motion';
import type { Variants, Transition } from 'framer-motion';
import { Plus } from 'lucide-react';

export type Submission = {
  id: string;
  email: string | null;
  est_total: number | null;
  status: 'pending' | 'accepted' | 'refused' | 'archived';
  payment_intent_id: string | null;
  payment_status:
    | 'unpaid'
    | 'authorized'
    | 'captured'
    | 'refused'
    | 'refunded'
    | null;
  payment_amount: number | null;
  payment_currency: string | null;
  contract_status: 'pending' | 'signed' | 'refused' | 'cancelled' | null;
  signed_contract_files: string[] | null;
  offer_category: string;
  offer_tier: string;
  created_at: string;
};

export default function AdminDashboardClient({
  submissions,
  nonPayes,
  payes,
  kpi,
}: {
  submissions: Submission[];
  nonPayes: Submission[];
  payes: Submission[];
  kpi: {
    total: number;
    avantPaiement: number;
    checkoutOk: number;
    signes: number;
    caPotentiel: number;
  };
}) {
  // easing
  const easeFn = cubicBezier(0.16, 1, 0.3, 1);
  const tSlow: Transition = { duration: 0.45, ease: easeFn };
  const tFast: Transition = { duration: 0.3, ease: easeFn };

  const fadeItem: Variants = {
    initial: { opacity: 0, y: 12, filter: 'blur(6px)' },
    animate: { opacity: 1, y: 0, filter: 'blur(0px)' },
  };

  //
  // STYLE TOKENS alignés sur StatsDashboard
  //
  const CARD_BASE =
    'rounded-[2rem] border border-neutral-200/50 dark:border-neutral-800/60 bg-white dark:bg-neutral-900 shadow-[0_20px_40px_-8px_rgba(0,0,0,0.08)]';

  const KPI_CARD_BASE = `${CARD_BASE} p-6 md:p-8 flex flex-col gap-2 min-h-[8.5rem]`;

  const ROW_BASE =
    'rounded-[1rem] px-4 py-4 bg-neutral-100/50 dark:bg-neutral-800/50 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition border border-neutral-200/30 dark:border-neutral-700/40';

  //
  // BADGES (identiques à ceux utilisés côté page détail submission)
  //
  function SoftBadge({
    tone,
    children,
  }: {
    tone: 'primary' | 'ok' | 'warn' | 'danger' | 'muted' | 'outline' | 'ghost';
    children: React.ReactNode;
  }) {
    const map: Record<
      'primary' | 'ok' | 'warn' | 'danger' | 'muted' | 'outline' | 'ghost',
      string
    > = {
      primary:
        'bg-primary/10 text-primary ring-1 ring-primary/20 dark:ring-primary/30',
      ok: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 ring-1 ring-emerald-500/20',
      warn: 'bg-amber-500/10 text-amber-700 dark:text-amber-400 ring-1 ring-amber-500/20',
      danger:
        'bg-rose-500/10 text-rose-600 dark:text-rose-400 ring-1 ring-rose-500/20',
      muted:
        'bg-black/[0.05] text-black/70 dark:bg-white/10 dark:text-white/70 ring-1 ring-black/10 dark:ring-white/15',
      outline:
        'bg-transparent text-current ring-1 ring-black/15 dark:ring-white/20',
      ghost:
        'bg-black/5 dark:bg-white/10 text-current ring-0 text-[11px] font-normal',
    };

    return (
      <span
        className={`inline-flex items-center h-7 rounded-[0.9rem] px-2.5 text-[11px] font-medium leading-none ${map[tone]}`}
      >
        {children}
      </span>
    );
  }

  //
  // HELPERS
  //
  function toneForPayment(
    p: Submission['payment_status']
  ): 'ok' | 'warn' | 'danger' | 'muted' {
    if (p === 'captured' || p === 'authorized') return 'ok';
    if (p === 'unpaid') return 'warn';
    if (p === 'refused') return 'danger';
    return 'muted'; // refunded/missing -> neutre
  }

  function humanPayment(p: Submission['payment_status']): string {
    switch (p) {
      case 'authorized':
        return 'autorisé';
      case 'captured':
        return 'capturé';
      case 'unpaid':
        return 'non payé';
      case 'refused':
        return 'refusé';
      case 'refunded':
        return 'remboursé';
      default:
        return '—';
    }
  }

  function humanContract(
    s: Submission['contract_status'],
    signedFiles: string[] | null | undefined
  ): string {
    if (s === 'signed' || (signedFiles?.length ?? 0) > 0)
      return 'contrat signé';
    if (s === 'refused') return 'contrat refusé';
    if (s === 'cancelled') return 'contrat annulé';
    return 'contrat en attente';
  }

  function toneForContract(
    s: Submission['contract_status'],
    signedFiles: string[] | null | undefined
  ): 'ok' | 'warn' | 'danger' | 'muted' {
    if (s === 'signed' || (signedFiles?.length ?? 0) > 0) return 'ok';
    if (s === 'refused' || s === 'cancelled') return 'danger';
    return 'warn';
  }

  //
  // ONE SUBMISSION ROW
  //
  function SubmissionLine({ s }: { s: Submission }) {
    const payTone = toneForPayment(s.payment_status);
    const payText = humanPayment(s.payment_status);

    const contractText = humanContract(
      s.contract_status,
      s.signed_contract_files
    );
    const contractTone = toneForContract(
      s.contract_status,
      s.signed_contract_files
    );

    return (
      <motion.li
        key={s.id}
        initial={{ opacity: 0, y: 8, filter: 'blur(6px)' }}
        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        transition={tFast}
        className={ROW_BASE}
      >
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          {/* LEFT */}
          <div className="min-w-0 flex-1">
            {/* ligne 1: email + € + tier */}
            <div className="text-[13px] font-medium text-neutral-900 dark:text-neutral-100 truncate flex flex-wrap items-center gap-x-2 gap-y-1">
              <span className="truncate max-w-[200px]">
                {s.email ?? '—email'}
              </span>

              <span className="opacity-60 text-xs text-neutral-500 dark:text-neutral-400">
                ·
              </span>

              <span className="tabular-nums font-semibold text-neutral-900 dark:text-neutral-100">
                {(s.est_total ?? 0).toLocaleString('fr-FR')}€
              </span>

              {s.offer_category && s.offer_tier && (
                <>
                  <span className="opacity-60 text-xs text-neutral-500 dark:text-neutral-400">
                    ·
                  </span>
                  <span className="text-xs text-neutral-500 dark:text-neutral-400 truncate">
                    {s.offer_category} · {s.offer_tier}
                  </span>
                </>
              )}
            </div>

            {/* ligne 2: id + date */}
            <div className="text-[11px] text-neutral-500 dark:text-neutral-400 leading-relaxed whitespace-nowrap flex flex-wrap items-center gap-x-2 gap-y-0.5">
              <span className="font-mono opacity-70 truncate max-w-[240px]">
                {s.id}
              </span>
              <span>•</span>
              <span className="opacity-70">
                {new Date(s.created_at).toLocaleString('fr-FR')}
              </span>
            </div>
          </div>

          {/* RIGHT */}
          <div className="flex flex-col items-start sm:items-end gap-2 shrink-0 text-[11px]">
            <div className="flex flex-wrap items-center gap-2">
              <SoftBadge tone={payTone}>{payText}</SoftBadge>
              <SoftBadge tone={contractTone}>{contractText}</SoftBadge>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <Link
                href={`/admin/submissions/${s.id}`}
                className="inline-flex items-center h-8 rounded-[0.8rem] bg-primary text-white px-3 text-[11px] font-medium leading-none hover:bg-primary/90 transition shadow-[0_20px_40px_-8px_rgba(0,0,0,0.08)]"
              >
                Détails
              </Link>
            </div>
          </div>
        </div>
      </motion.li>
    );
  }

  //
  // RENDER
  //
  return (
    <div className="px-2 pb-10 space-y-8">
      {/* HEADER PAGE */}
      <motion.div
        initial="initial"
        animate="animate"
        variants={fadeItem}
        transition={tSlow}
        className="flex flex-col gap-2"
      >
        <div className="text-[11px] tracking-[0.18em] uppercase text-neutral-500 dark:text-neutral-400">
          Admin
        </div>
        <h1 className="text-2xl md:text-3xl font-semibold tracking-tight leading-tight text-neutral-900 dark:text-neutral-100">
          Tableau de bord
        </h1>
        <p className="text-sm text-neutral-500 dark:text-neutral-400 max-w-prose">
          Vue globale des demandes entrantes, paiements autorisés et contrats
          signés. Tout ce qui tombe dans la machine ✦
        </p>
      </motion.div>

      {/* KPIs */}
      <motion.div
        initial="initial"
        animate="animate"
        transition={{ staggerChildren: 0.06 }}
        className="grid grid-cols-2 md:grid-cols-5 gap-4"
      >
        {[
          {
            label: 'Submissions',
            value: kpi.total.toLocaleString('fr-FR'),
            hint: 'Total reçu',
          },
          {
            label: 'Avant paiement',
            value: kpi.avantPaiement.toLocaleString('fr-FR'),
            hint: 'Pas encore validés Stripe',
          },
          {
            label: 'Checkout OK',
            value: kpi.checkoutOk.toLocaleString('fr-FR'),
            hint: 'Paiement autorisé',
          },
          {
            label: 'PDF signés',
            value: kpi.signes.toLocaleString('fr-FR'),
            hint: 'Contrats signés',
          },
          {
            label: 'CA potentiel',
            value: kpi.caPotentiel.toLocaleString('fr-FR') + '€',
            hint: 'Montant TTC estimé',
          },
        ].map((card) => (
          <motion.div
            key={card.label}
            variants={fadeItem}
            transition={tSlow}
            className={KPI_CARD_BASE}
          >
            <div className="flex flex-col relative z-[1]">
              <div className="flex items-center justify-between">
                <div className="text-[11px] uppercase tracking-[0.15em] text-neutral-500 dark:text-neutral-400">
                  {card.label}
                </div>
              </div>
              <div className="text-2xl font-semibold leading-tight mt-1 text-neutral-900 dark:text-neutral-100 tabular-nums">
                {card.value}
              </div>
              <div className="text-[11px] text-neutral-500 dark:text-neutral-400 mt-1">
                {card.hint}
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Actions principales */}
      <motion.section
        initial="initial"
        animate="animate"
        variants={fadeItem}
        transition={tSlow}
        className={`${CARD_BASE} p-6 md:p-8`}
      >
        <div className="relative z-[1] flex flex-col md:flex-row md:items-center gap-4 md:gap-6">
          <div className="flex-1">
            <h2 className="text-base font-semibold leading-tight text-neutral-900 dark:text-neutral-100">
              Actions rapides
            </h2>
            <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1 max-w-sm">
              Créer un projet manuel ou accéder au pipe complet.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Link
              href="/admin/projects/new"
              className="inline-flex items-center justify-center h-10 rounded-[1rem] bg-primary text-white px-4 text-sm font-medium leading-none hover:bg-primary/90 transition shadow-[0_20px_40px_-8px_rgba(0,0,0,0.08)]"
            >
              <Plus className="w-4 h-4 mr-2" /> Nouveau projet
            </Link>

            <Link
              href="/admin/projects"
              className="inline-flex items-center h-10 rounded-[1rem] bg-primary/10 text-primary px-4 text-sm font-medium leading-none hover:bg-primary/15 transition ring-1 ring-primary/20 dark:ring-primary/30"
            >
              Voir les projets
            </Link>
          </div>
        </div>
      </motion.section>

      {/* Deux colonnes: avant paiement / autorisés */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* NON PAYÉS */}
        <motion.section
          initial="initial"
          animate="animate"
          variants={fadeItem}
          transition={tSlow}
          className={`${CARD_BASE} p-6 md:p-8 flex flex-col`}
        >
          <div className="flex items-start justify-between flex-wrap gap-3 mb-5">
            <div>
              <h2 className="text-base font-semibold leading-tight text-neutral-900 dark:text-neutral-100">
                Avant paiement
              </h2>
              <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">
                Leads qualifiés mais pas encore validés côté carte 💳
              </p>
            </div>
            <SoftBadge tone="warn">
              {nonPayes.length} en attente paiement
            </SoftBadge>
          </div>

          {/* scrollable list */}
          <ul className="space-y-3 max-h-[360px] overflow-y-auto pr-1 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-neutral-300 dark:scrollbar-thumb-neutral-700">
            {nonPayes.map((s) => (
              <SubmissionLine key={s.id} s={s} />
            ))}
            {nonPayes.length === 0 && (
              <p className="opacity-60 text-sm text-neutral-500 dark:text-neutral-400">
                RAS 👌
              </p>
            )}
          </ul>
        </motion.section>

        {/* PAYÉS / AUTORISÉS */}
        <motion.section
          initial="initial"
          animate="animate"
          variants={fadeItem}
          transition={tSlow}
          className={`${CARD_BASE} p-6 md:p-8 flex flex-col`}
        >
          <div className="flex items-start justify-between flex-wrap gap-3 mb-5">
            <div>
              <h2 className="text-base font-semibold leading-tight text-neutral-900 dark:text-neutral-100">
                Paiement autorisé
              </h2>
              <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">
                Le client a passé Stripe. Projet quasiment gagné.
              </p>
            </div>
            <SoftBadge tone="ok">{payes.length} prêts à lancer 🚀</SoftBadge>
          </div>

          {/* scrollable list */}
          <ul className="space-y-3 max-h-[360px] overflow-y-auto pr-1 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-neutral-300 dark:scrollbar-thumb-neutral-700">
            {payes.map((s) => (
              <SubmissionLine key={s.id} s={s} />
            ))}
            {payes.length === 0 && (
              <p className="opacity-60 text-sm text-neutral-500 dark:text-neutral-400">
                Encore personne ici
              </p>
            )}
          </ul>
        </motion.section>
      </div>

      {/* full log */}
      <motion.section
        initial="initial"
        animate="animate"
        variants={fadeItem}
        transition={tSlow}
        className={`${CARD_BASE} p-6 md:p-8`}
      >
        <div className="flex items-start justify-between flex-wrap gap-3 mb-5">
          <div>
            <h2 className="text-base font-semibold leading-tight text-neutral-900 dark:text-neutral-100">
              Historique complet
            </h2>
            <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">
              Tout ce qui est rentré, trié du plus récent au plus ancien.
            </p>
          </div>
          <SoftBadge tone="muted">{submissions.length} en base</SoftBadge>
        </div>

        <ul className="space-y-3 max-h-[420px] overflow-y-auto pr-1 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-neutral-300 dark:scrollbar-thumb-neutral-700">
          {submissions.map((s) => (
            <SubmissionLine key={s.id} s={s} />
          ))}
        </ul>
      </motion.section>
    </div>
  );
}
