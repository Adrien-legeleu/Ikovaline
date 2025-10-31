// app/admin/submissions/[id]/SubmissionDetailClient.tsx
'use client';

import { motion, cubicBezier } from 'framer-motion';
import Link from 'next/link';
import {
  CheckCircle2,
  AlertTriangle,
  FileText,
  Mail,
  Phone,
  Building2,
  User,
  CreditCard,
  Clock3,
} from 'lucide-react';
import {
  LinkedProject,
  SupabaseSubmission,
} from '@/app/admin/submissions/[id]/page';
import SubmissionActions from '@/app/admin/submissions/[id]/submissions-actions';

// Style tokens cohérents avec Stats
const CARD_BASE =
  'rounded-[2rem] border border-neutral-200/50 dark:border-neutral-800/60 bg-white dark:bg-neutral-900 shadow-[0_20px_40px_-8px_rgba(0,0,0,0.08)] p-6 md:p-8';

function SoftBadge({
  tone,
  children,
}: {
  tone: 'primary' | 'ok' | 'warn' | 'danger' | 'muted';
  children: React.ReactNode;
}) {
  const map: Record<'primary' | 'ok' | 'warn' | 'danger' | 'muted', string> = {
    primary:
      'bg-primary/10 text-primary ring-1 ring-primary/20 dark:ring-primary/30',
    ok: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 ring-1 ring-emerald-500/20',
    warn: 'bg-amber-500/10 text-amber-700 dark:text-amber-400 ring-1 ring-amber-500/20',
    danger:
      'bg-rose-500/10 text-rose-600 dark:text-rose-400 ring-1 ring-rose-500/20',
    muted:
      'bg-black/[0.05] text-black/70 dark:bg-white/10 dark:text-white/70 ring-1 ring-black/10 dark:ring-white/15',
  };
  return (
    <span
      className={`inline-flex items-center rounded-full px-3 h-8 text-xs font-medium leading-none ${map[tone]}`}
    >
      {children}
    </span>
  );
}

function Line({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-start gap-3 text-sm">
      <div className="w-28 shrink-0 text-xs uppercase tracking-wide text-neutral-500 dark:text-neutral-400">
        {label}
      </div>
      <div className="min-w-0 break-words leading-relaxed text-neutral-800 dark:text-neutral-100">
        {children}
      </div>
    </div>
  );
}

// motion variants/ease pour blur+translate
const easeFn = cubicBezier(0.16, 1, 0.3, 1);
const fadeCard = {
  initial: { opacity: 0, y: 12, filter: 'blur(6px)' },
  animate: { opacity: 1, y: 0, filter: 'blur(0px)' },
};

// composant principal client
export default function SubmissionDetailClient({
  sub,
  proj,
  derived,
}: {
  sub: SupabaseSubmission;
  proj: LinkedProject;
  derived: {
    paymentTone: {
      tone: 'ok' | 'warn' | 'danger' | 'muted' | 'primary';
      label: string;
    };
    contractSigned: boolean;
    contractBadge: string;
    estTotalDisplay: string;
    langs: string[];
    tones: string[];
    urls: string[];
    links: string[];
    opts: string[];
    startWanted: string;
  };
}) {
  const {
    paymentTone,
    contractSigned,
    contractBadge,
    estTotalDisplay,
    langs,
    tones,
    urls,
    links,
    opts,
    startWanted,
  } = derived;

  // champs directs depuis la table
  const fullName = sub.full_name || 'Client';
  const company = sub.company || '—';
  const email = sub.email || '—';
  const phone = sub.phone || '—';
  const goal = sub.goal || '—';
  const audience = sub.audience || '—';

  const domainWanted = sub.has_domain
    ? sub.domain || '(domaine fourni)'
    : sub.domain || 'Pas encore';

  return (
    <section className="px-4 md:px-6 pb-10 space-y-8 max-w-7xl mx-auto">
      {/* top row / meta */}
      <motion.div
        variants={fadeCard}
        initial="initial"
        animate="animate"
        transition={{ duration: 0.45, ease: easeFn }}
        className="flex items-center justify-between flex-wrap gap-4"
      >
        <Link
          href="/admin/dashboard"
          className="text-sm font-medium text-primary underline underline-offset-[3px]"
        >
          ← Retour dashboard
        </Link>

        <div className="flex items-center gap-2 text-xs text-neutral-500 dark:text-neutral-400">
          <span className="font-mono text-[11px] opacity-70 break-all max-w-[220px]">
            {sub.id}
          </span>
          <span className="opacity-50">·</span>
          <span>
            {new Date(sub.created_at).toLocaleString('fr-FR', {
              dateStyle: 'short',
              timeStyle: 'short',
            })}
          </span>
        </div>
      </motion.div>

      {/* HEADER CARD */}
      <motion.section
        variants={fadeCard}
        initial="initial"
        animate="animate"
        transition={{ duration: 0.5, ease: easeFn }}
        className={CARD_BASE}
      >
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
          {/* LEFT */}
          <div className="space-y-4">
            <div className="text-[11px] tracking-[0.18em] uppercase text-neutral-500 dark:text-neutral-400">
              Soumission client
            </div>
            <h1 className="text-2xl md:text-3xl font-semibold leading-tight text-neutral-900 dark:text-neutral-100">
              {fullName}
            </h1>

            <div className="flex flex-wrap items-center gap-2 text-sm">
              <SoftBadge tone={paymentTone.tone}>
                <CreditCard className="h-3.5 w-3.5 mr-1" />
                {paymentTone.label}
              </SoftBadge>

              <SoftBadge tone={contractSigned ? 'ok' : 'warn'}>
                <FileText className="h-3.5 w-3.5 mr-1" />
                {contractBadge}
              </SoftBadge>

              <SoftBadge tone="primary">
                {sub.offer_category} · {sub.offer_tier}
              </SoftBadge>

              <SoftBadge tone="muted">{estTotalDisplay}</SoftBadge>
            </div>

            <div className="text-xs text-neutral-600 dark:text-neutral-400 leading-relaxed space-y-1">
              <div className="flex items-center gap-1.5">
                <Clock3 className="h-3.5 w-3.5" />
                <span>Début souhaité: {startWanted}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <User className="h-3.5 w-3.5" />
                <span>Entreprise: {company}</span>
              </div>
            </div>
          </div>

          {/* RIGHT */}
          <div className="space-y-3 text-sm w-full md:w-auto">
            {contractSigned ? (
              <div className="flex items-start gap-2 rounded-[1rem] bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 p-3">
                <CheckCircle2 className="h-4 w-4 flex-shrink-0 mt-0.5" />
                <div className="min-w-0">
                  <div className="font-medium leading-tight">Contrat signé</div>
                  {Array.isArray(sub.signed_contract_files) &&
                  sub.signed_contract_files.length > 0 ? (
                    <a
                      href={sub.signed_contract_files[0] ?? '#'}
                      target="_blank"
                      rel="noreferrer"
                      className="underline underline-offset-[3px] text-emerald-700 dark:text-emerald-400"
                    >
                      Ouvrir le PDF
                    </a>
                  ) : (
                    <div className="opacity-70 text-xs text-neutral-600 dark:text-neutral-400">
                      PDF stocké côté client.
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="flex items-start gap-2 rounded-[1rem] bg-amber-500/10 text-amber-700 dark:text-amber-400 p-3">
                <AlertTriangle className="h-4 w-4 flex-shrink-0 mt-0.5" />
                <div className="min-w-0">
                  <div className="font-medium leading-tight">
                    Contrat non signé
                  </div>
                  <div className="opacity-70 text-xs leading-snug text-amber-700 dark:text-amber-400">
                    Relancer le client si paiement ok mais pas de signature.
                  </div>
                </div>
              </div>
            )}

            {proj ? (
              <Link
                href={`/admin/projects/${proj.id}`}
                className="inline-flex items-center justify-center w-full rounded-[1rem] bg-primary text-white px-4 py-2 font-medium text-sm hover:bg-primary/90 transition shadow-[0_20px_40px_-8px_rgba(0,0,0,0.08)]"
              >
                Ouvrir le projet
              </Link>
            ) : (
              <div className="text-xs text-neutral-500 dark:text-neutral-400 leading-snug opacity-80">
                Aucun projet actif trouvé après cette soumission.
              </div>
            )}
          </div>
        </div>
      </motion.section>

      {/* PROFIL + MISSION */}
      <div className="grid lg:grid-cols-2 gap-8">
        {/* Profil client */}
        <motion.section
          variants={fadeCard}
          initial="initial"
          animate="animate"
          transition={{ duration: 0.5, ease: easeFn }}
          className={CARD_BASE}
        >
          <header className="space-y-1 mb-5">
            <div className="text-[11px] tracking-[0.18em] uppercase text-neutral-500 dark:text-neutral-400">
              Profil client
            </div>
            <h2 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">
              Coordonnées
            </h2>
          </header>

          <div className="space-y-4 text-sm">
            <Line label="Nom">
              <span className="inline-flex items-center gap-2 text-neutral-800 dark:text-neutral-100">
                <User className="h-4 w-4 opacity-70" />
                {fullName}
              </span>
            </Line>

            <Line label="Email">
              <span className="inline-flex items-center gap-2 break-all text-neutral-800 dark:text-neutral-100">
                <Mail className="h-4 w-4 opacity-70" />
                {email}
              </span>
            </Line>

            <Line label="Téléphone">
              <span className="inline-flex items-center gap-2 text-neutral-800 dark:text-neutral-100">
                <Phone className="h-4 w-4 opacity-70" />
                {phone}
              </span>
            </Line>

            <Line label="Entreprise">
              <span className="inline-flex items-center gap-2 text-neutral-800 dark:text-neutral-100">
                <Building2 className="h-4 w-4 opacity-70" />
                {company}
              </span>
            </Line>
          </div>

          <div className="rounded-[1rem] bg-neutral-100/60 dark:bg-neutral-800/50 p-4 text-xs leading-relaxed text-neutral-600 dark:text-neutral-300 mt-6">
            Créé le{' '}
            {new Date(sub.created_at).toLocaleString('fr-FR', {
              dateStyle: 'short',
              timeStyle: 'short',
            })}
            .
            <br />
            Paiement: {paymentTone.label} · Total estimé: {estTotalDisplay}
          </div>
        </motion.section>

        {/* Mission / besoin */}
        <motion.section
          variants={fadeCard}
          initial="initial"
          animate="animate"
          transition={{ duration: 0.5, ease: easeFn }}
          className={CARD_BASE}
        >
          <header className="space-y-1 mb-5">
            <div className="text-[11px] tracking-[0.18em] uppercase text-neutral-500 dark:text-neutral-400">
              Mission
            </div>
            <h2 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">
              Contexte & objectif
            </h2>
          </header>

          <div className="grid gap-4 text-sm text-neutral-800 dark:text-neutral-100">
            <Line label="Objectif">{goal}</Line>

            <Line label="Audience">{audience}</Line>

            <Line label="Langues">
              {langs.length ? langs.join(' · ') : '—'}
            </Line>

            <Line label="Ton / image">
              {tones.length ? tones.join(' · ') : '—'}
            </Line>

            <Line label="Nom de domaine">{domainWanted}</Line>
          </div>

          <div className="mt-6 text-neutral-800 dark:text-neutral-100">
            <div className="text-xs uppercase text-neutral-500 dark:text-neutral-400 mb-2 font-medium">
              Références
            </div>
            <ul className="text-sm space-y-1 break-all">
              {urls.length ? (
                urls.map((u, i) => (
                  <li key={i}>
                    <a
                      className="underline underline-offset-[3px] text-primary hover:opacity-80 break-all"
                      href={u}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {u}
                    </a>
                  </li>
                ))
              ) : (
                <li className="opacity-60">—</li>
              )}
            </ul>

            {links.length ? (
              <>
                <div className="text-xs uppercase text-neutral-500 dark:text-neutral-400 mt-4 mb-2 font-medium">
                  Liens (Notion, Miro, Drive…)
                </div>
                <ul className="text-sm space-y-1 break-all">
                  {links.map((u, i) => (
                    <li key={`l-${i}`}>
                      <a
                        className="underline underline-offset-[3px] text-primary hover:opacity-80 break-all"
                        href={u}
                        target="_blank"
                        rel="noreferrer"
                      >
                        {u}
                      </a>
                    </li>
                  ))}
                </ul>
              </>
            ) : null}
          </div>
        </motion.section>
      </div>

      {/* Offre / Budget */}
      <motion.section
        variants={fadeCard}
        initial="initial"
        animate="animate"
        transition={{ duration: 0.5, ease: easeFn }}
        className={CARD_BASE}
      >
        <header className="space-y-1 mb-6">
          <div className="text-[11px] tracking-[0.18em] uppercase text-neutral-500 dark:text-neutral-400">
            Offre & Budget
          </div>
          <h2 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">
            {sub.offer_category} · {sub.offer_tier}
          </h2>
        </header>

        <div className="grid md:grid-cols-2 gap-6 text-sm text-neutral-800 dark:text-neutral-100">
          <div className="space-y-2">
            <Line label="Pack / Tier">{sub.offer_tier || '—'}</Line>

            <Line label="Description">{sub.offer_description || '—'}</Line>

            <Line label="Options">{opts.length ? opts.join(' · ') : '—'}</Line>

            <Line label="Budget Ads">
              {sub.wants_ads
                ? sub.ads_budget != null
                  ? `${new Intl.NumberFormat('fr-FR').format(
                      Number(sub.ads_budget)
                    )} €`
                  : '—'
                : sub.ads_budget != null
                  ? `${new Intl.NumberFormat('fr-FR').format(
                      Number(sub.ads_budget)
                    )} €`
                  : '—'}
            </Line>

            <Line label="Montant estimé">{estTotalDisplay}</Line>
          </div>

          <div className="space-y-2">
            <Line label="Paiement intent">{sub.payment_intent_id ?? '—'}</Line>

            <Line label="Paiement reçu (€)">
              {sub.payment_amount != null
                ? `${new Intl.NumberFormat('fr-FR').format(
                    Number(sub.payment_amount)
                  )} €`
                : '—'}
            </Line>

            <Line label="Devise">
              {sub.payment_currency || sub.currency || 'EUR'}
            </Line>

            <Line label="Statut facture">{sub.payment_status || 'unpaid'}</Line>

            <Line label="Échéances">
              {sub.payment_installments != null
                ? `${sub.payment_installments}x`
                : '1x'}
            </Line>
          </div>
        </div>

        {/* fichiers / note admin / etc */}
        {(Array.isArray(sub.brief_files) && sub.brief_files.length > 0) ||
        sub.note_admin ? (
          <div className="mt-6 grid md:grid-cols-2 gap-6 text-sm">
            <div>
              <div className="text-xs uppercase text-neutral-500 dark:text-neutral-400 mb-2 font-medium flex items-center gap-2">
                <FileText className="h-4 w-4 opacity-70" />
                Brief / Fichiers
              </div>
              {Array.isArray(sub.brief_files) && sub.brief_files.length > 0 ? (
                <ul className="space-y-1 text-primary underline underline-offset-[3px] break-all">
                  {sub.brief_files.map((url, i) => (
                    <li key={i}>
                      <a
                        href={url}
                        target="_blank"
                        rel="noreferrer"
                        className="hover:opacity-80"
                      >
                        {url}
                      </a>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="text-neutral-500 dark:text-neutral-400 text-xs">
                  Aucun fichier joint
                </div>
              )}
            </div>

            <div>
              <div className="text-xs uppercase text-neutral-500 dark:text-neutral-400 mb-2 font-medium">
                Note interne
              </div>
              <div className="rounded-[1rem] bg-neutral-100/60 dark:bg-neutral-800/50 p-4 text-xs leading-relaxed text-neutral-700 dark:text-neutral-200 whitespace-pre-wrap">
                {sub.note_admin && sub.note_admin.trim().length > 0
                  ? sub.note_admin
                  : '—'}
              </div>
            </div>
          </div>
        ) : null}
      </motion.section>

      {/* ACTIONS ADMIN */}
      {sub.status === 'accepted' && proj ? (
        <motion.div
          variants={fadeCard}
          initial="initial"
          animate="animate"
          transition={{ duration: 0.4, ease: easeFn }}
          className="rounded-[2rem] border border-emerald-500/20 bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4 shadow-[0_20px_40px_-8px_rgba(0,0,0,0.08)]"
        >
          <div className="text-sm flex items-start gap-2">
            <CheckCircle2 className="h-5 w-5 flex-shrink-0 mt-0.5" />
            <div>
              <div className="font-medium text-emerald-700 dark:text-emerald-400">
                Cette soumission est acceptée.
              </div>
              <div className="opacity-70 text-xs leading-snug">
                Le projet est créé et en cours.
              </div>
            </div>
          </div>

          <Link
            href={`/admin/projects/${proj.id}`}
            className="inline-flex items-center justify-center rounded-[1rem] bg-primary text-white px-4 py-2 text-sm font-medium hover:bg-primary/90 transition shadow-[0_20px_40px_-8px_rgba(0,0,0,0.08)]"
          >
            Ouvrir le projet
          </Link>
        </motion.div>
      ) : sub.status === 'refused' ? (
        <motion.div
          variants={fadeCard}
          initial="initial"
          animate="animate"
          transition={{ duration: 0.4, ease: easeFn }}
          className="rounded-[2rem] border border-rose-500/20 bg-rose-500/10 text-rose-700 dark:text-rose-400 p-6 text-sm flex items-start gap-2 shadow-[0_20px_40px_-8px_rgba(0,0,0,0.08)]"
        >
          <AlertTriangle className="h-5 w-5 flex-shrink-0 mt-0.5" />
          <div>
            <div className="font-medium text-rose-700 dark:text-rose-400">
              Cette soumission a été refusée.
            </div>
            <div className="opacity-70 text-xs leading-snug">
              Aucune action supplémentaire.
            </div>
          </div>
        </motion.div>
      ) : (
        <motion.section
          variants={fadeCard}
          initial="initial"
          animate="animate"
          transition={{ duration: 0.4, ease: easeFn }}
          className={CARD_BASE}
        >
          <header className="space-y-1 mb-4">
            <div className="text-[11px] tracking-[0.18em] uppercase text-neutral-500 dark:text-neutral-400">
              Action interne
            </div>
            <h2 className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">
              Valider ou refuser
            </h2>
            <p className="text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed max-w-md">
              Si tu acceptes : on passe le lead en projet actif, on part en
              prod. Si tu refuses : le lead est fermé.
            </p>
          </header>

          <SubmissionActions
            submissionId={sub.id}
            hasCheckout={
              !!sub.payment_intent_id ||
              sub.payment_status === 'authorized' ||
              sub.payment_status === 'captured'
            }
            hasSignedPdf={contractSigned}
          />
        </motion.section>
      )}
    </section>
  );
}
