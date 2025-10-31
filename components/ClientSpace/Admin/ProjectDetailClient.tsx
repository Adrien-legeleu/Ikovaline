'use client';

import Link from 'next/link';
import { motion, cubicBezier } from 'framer-motion';
import type { Variants, Transition } from 'framer-motion';
import {
  CheckCircle2,
  AlertTriangle,
  ExternalLink,
  Mail,
  Clock3,
  GitBranch,
  OctagonAlert,
} from 'lucide-react';
import ScheduleForm from '@/app/admin/projects/[id]/schedule-form';
import UpdateForm from '@/app/admin/projects/[id]/update-form';

const easeFn = cubicBezier(0.16, 1, 0.3, 1);
const tSlow: Transition = { duration: 0.5, ease: easeFn };
const tFast: Transition = { duration: 0.35, ease: easeFn };

const fadeIn: Variants = {
  initial: { opacity: 0, y: 16, filter: 'blur(8px)' },
  animate: { opacity: 1, y: 0, filter: 'blur(0px)' },
};

const CARD =
  'relative rounded-[2rem] p-6 md:p-8 bg-[#ffffff] dark:bg-[#0e1116] shadow-[14px_14px_36px_#d7dce6,-14px_-14px_36px_#ffffff] dark:shadow-[14px_14px_36px_rgba(0,0,0,0.55),-14px_-14px_36px_rgba(255,255,255,0.03)]';
const CARD_INNER =
  'pointer-events-none absolute inset-0 rounded-[2rem] shadow-[inset_1px_1px_0_rgba(255,255,255,0.9),inset_-1px_-1px_0_rgba(0,0,0,0.03)]';

const SUBCARD =
  'rounded-[1.4rem] bg-black/5 dark:bg-white/10 p-4 text-sm leading-relaxed';
const ROW_BG =
  'rounded-[1.4rem] px-4 py-4 bg-black/[0.03] dark:bg-white/[0.06]';

// Types publics du composant
export type Update = {
  id: string;
  progress: number | null;
  headline: string | null;
  done: string[];
  next: string[];
  blockers: string[];
  created_at: string;
};

export type View = {
  id: string;
  title: string;
  status: string;
  created_at: string;
  start_at: string | null;
  deadline: string | null;
  progress: number;
  description: string | null;
  client_email: string | null;
  owner_user_id: string | null;

  tier: string | null;
  category: string | null;
  price_euros: number | null;
  ads_budget: number | null;

  domain: string;
  goal: string;
  langs: string[];
  tones: string[];
  urls: string[];
  links: string[];

  contractSignedUrl: string | null;
  contractStatus: string | null;
  repo_url: string | null;
  priority: string | null;
  risk_level: string | null;
};

// Badges
function SoftBadge({
  tone,
  children,
}: {
  tone: 'primary' | 'ok' | 'warn' | 'danger' | 'muted';
  children: React.ReactNode;
}) {
  const map: Record<string, string> = {
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
      className={`inline-flex items-center h-7 rounded-[0.9rem] px-2.5 text-[11px] font-medium leading-none ${map[tone]}`}
    >
      {children}
    </span>
  );
}

function toneForContract(status: string | null, hasPdf: boolean) {
  if (hasPdf) return { tone: 'ok' as const, label: 'Contrat signé' };
  if (status === 'paid_full') return { tone: 'ok' as const, label: 'Payé' };
  if (status === 'late')
    return { tone: 'danger' as const, label: 'Retard paiement' };
  return { tone: 'warn' as const, label: 'En cours' };
}

function InfoRow({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="flex items-start gap-3 text-sm">
      <div className="w-32 shrink-0 opacity-60 text-[12px] uppercase tracking-wide leading-relaxed">
        {label}
      </div>
      <div className="min-w-0 break-words text-[13px] leading-relaxed">
        {value}
      </div>
    </div>
  );
}

function StatusPretty({ status }: { status: string }) {
  const s = (status || '').toLowerCase();

  if (s === 'in_progress')
    return <SoftBadge tone="primary">En cours</SoftBadge>;
  if (s === 'scheduled') return <SoftBadge tone="muted">Planifié</SoftBadge>;
  if (s === 'completed') return <SoftBadge tone="ok">Terminé</SoftBadge>;
  if (s === 'paused') return <SoftBadge tone="warn">En pause</SoftBadge>;
  if (s === 'cancelled') return <SoftBadge tone="danger">Annulé</SoftBadge>;
  if (s === 'draft') return <SoftBadge tone="muted">Brouillon</SoftBadge>;

  return <SoftBadge tone="muted">{status || '—'}</SoftBadge>;
}

function RiskPretty({
  priority,
  risk,
}: {
  priority: string | null;
  risk: string | null;
}) {
  let tone: 'ok' | 'warn' | 'danger' | 'muted' = 'muted';
  let label = 'Normal';

  if (risk === 'urgent' || priority === 'critical') {
    tone = 'danger';
    label = 'Urgent';
  } else if (risk === 'attention' || priority === 'high') {
    tone = 'warn';
    label = 'Attention';
  }

  return (
    <SoftBadge tone={tone === 'muted' ? 'muted' : tone}>{label}</SoftBadge>
  );
}

function ProgressBar({ value }: { value: number }) {
  const safe = Math.min(100, Math.max(0, value));
  return (
    <div className="w-full">
      <div className="h-2 rounded-full bg-black/10 dark:bg-white/10 overflow-hidden">
        <div
          className="h-full rounded-full bg-primary transition-[width] duration-700"
          style={{ width: `${safe}%` }}
        />
      </div>
      <div className="text-right text-[11px] opacity-70 mt-1 tabular-nums">
        {safe}%
      </div>
    </div>
  );
}

function LabeledChips({ label, values }: { label: string; values: string[] }) {
  return (
    <div className="text-sm space-y-2">
      <div className="opacity-60 text-xs uppercase tracking-wide">{label}</div>
      {values?.length ? (
        <div className="flex flex-wrap gap-1.5">
          {values.map((v, i) => (
            <span
              key={i}
              className="inline-flex items-center rounded-[0.7rem] bg-primary/10 text-primary text-[11px] font-medium px-2.5 h-7 ring-1 ring-primary/20 dark:ring-primary/30"
            >
              {v}
            </span>
          ))}
        </div>
      ) : (
        <div className="text-sm opacity-60">—</div>
      )}
    </div>
  );
}

function NiceLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="inline-flex items-center gap-1 text-[13px] text-primary underline underline-offset-[3px] decoration-1 hover:opacity-80 break-all"
    >
      {children} <ExternalLink className="h-3.5 w-3.5" />
    </a>
  );
}

export default function ProjectDetailClient({
  mode,
  view,
  updates,
}: {
  mode: 'admin' | 'dev';
  view: View;
  updates: Update[];
}) {
  const contractInfo = toneForContract(
    view.contractStatus,
    !!view.contractSignedUrl
  );

  return (
    <section className="space-y-10">
      {/* back link */}
      <motion.div
        initial="initial"
        animate="animate"
        variants={fadeIn}
        transition={tFast}
        className="text-[13px]"
      >
        <Link
          href={mode === 'admin' ? '/admin/projects' : '/dev/projects'}
          className="inline-flex items-center h-9 rounded-[0.8rem] bg-primary/10 text-primary px-3 font-medium text-[12px] leading-none ring-1 ring-primary/20 hover:bg-primary/15 transition"
        >
          ← Retour projets
        </Link>
      </motion.div>

      {/* HEADER CARD */}
      <motion.div
        initial="initial"
        animate="animate"
        variants={fadeIn}
        transition={tSlow}
        className={CARD}
      >
        <div aria-hidden className={CARD_INNER} />
        <div className="relative z-[1] flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
          {/* gauche */}
          <div className="flex-1 min-w-0">
            <div className="text-[11px] tracking-[0.18em] uppercase text-muted-foreground">
              Projet
            </div>
            <h1 className="text-2xl md:text-3xl font-semibold tracking-tight leading-tight break-words">
              {view.title || 'Projet'}
            </h1>

            <div className="mt-4 flex flex-wrap items-center gap-2">
              <StatusPretty status={view.status} />

              {view.deadline && (
                <SoftBadge tone="warn">
                  <Clock3 className="h-3.5 w-3.5 mr-1" />
                  Deadline {new Date(view.deadline).toLocaleDateString('fr-FR')}
                </SoftBadge>
              )}

              <SoftBadge tone="muted">
                Créé le {new Date(view.created_at).toLocaleDateString('fr-FR')}
              </SoftBadge>

              <SoftBadge tone={contractInfo.tone}>
                {contractInfo.label}
              </SoftBadge>

              <RiskPretty
                priority={view.priority ?? null}
                risk={view.risk_level ?? null}
              />
            </div>
          </div>

          {/* droite */}
          <div className="w-full max-w-[260px] space-y-4">
            <ProgressBar value={view.progress} />

            {view.repo_url && (
              <div className="text-[13px] leading-relaxed rounded-[1rem] bg-black/5 dark:bg-white/10 px-3 py-2 flex items-start gap-2">
                <GitBranch className="h-4 w-4 shrink-0 mt-0.5" />
                <div className="min-w-0 break-all">
                  <div className="opacity-60 text-[11px] uppercase tracking-wide">
                    Repo
                  </div>
                  <a
                    href={view.repo_url}
                    target="_blank"
                    rel="noreferrer"
                    className="underline underline-offset-[3px] decoration-1"
                  >
                    {view.repo_url}
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
      </motion.div>

      {/* CONTRAT / FACTURATION */}
      <motion.div
        initial="initial"
        animate="animate"
        variants={fadeIn}
        transition={tSlow}
        className={CARD}
      >
        <div aria-hidden className={CARD_INNER} />
        <div className="relative z-[1] flex flex-col gap-4">
          <div className="flex items-start justify-between flex-wrap gap-3">
            <div className="flex flex-col">
              <div className="text-base font-semibold leading-tight">
                Contrat & statut facturation
              </div>
              <div className="text-[12px] text-muted-foreground">
                Signature client et état du paiement
              </div>
            </div>
            <SoftBadge tone={contractInfo.tone}>{contractInfo.label}</SoftBadge>
          </div>

          {view.contractSignedUrl ? (
            <div className={`${ROW_BG} flex flex-col gap-2 text-[13px]`}>
              <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-medium">
                <CheckCircle2 className="h-4 w-4" />
                <span>Contrat signé</span>
              </div>
              <div>
                <a
                  href={view.contractSignedUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center h-9 rounded-[0.8rem] bg-primary text-white px-3 text-[12px] font-medium leading-none hover:opacity-90 transition shadow-[0_14px_30px_rgba(59,130,246,0.4)] dark:shadow-[0_14px_30px_rgba(59,130,246,0.3)]"
                >
                  Ouvrir le PDF signé
                </a>
              </div>
            </div>
          ) : (
            <div className={`${ROW_BG} flex gap-3 text-[13px]`}>
              <OctagonAlert className="h-4 w-4 text-amber-600 mt-0.5 shrink-0" />
              <div className="space-y-1">
                <div className="font-medium text-amber-700 dark:text-amber-400">
                  Pas de contrat signé
                </div>
                <div className="text-muted-foreground text-[12px] leading-relaxed">
                  Le PDF signé n’est pas encore dispo pour ce projet.
                </div>
              </div>
            </div>
          )}
        </div>
      </motion.div>

      {/* INFOS CLÉS */}
      <motion.div
        initial="initial"
        animate="animate"
        variants={fadeIn}
        transition={tSlow}
        className={CARD}
      >
        <div aria-hidden className={CARD_INNER} />
        <div className="relative z-[1] space-y-8">
          {/* meta grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <InfoRow
              label="Client"
              value={
                view.client_email ? (
                  <span className="inline-flex items-center gap-2">
                    <Mail className="h-4 w-4" />
                    {view.client_email}
                  </span>
                ) : (
                  '—'
                )
              }
            />
            <InfoRow
              label="Responsable interne"
              value={view.owner_user_id ?? '—'}
            />
            <InfoRow
              label="Début prévu"
              value={
                view.start_at
                  ? new Date(view.start_at).toLocaleString('fr-FR')
                  : '—'
              }
            />
            <InfoRow label="Offre" value={view.tier ?? view.category ?? '—'} />
            <InfoRow
              label="Budget total"
              value={
                view.price_euros != null
                  ? view.price_euros.toLocaleString('fr-FR') + ' €'
                  : '—'
              }
            />
            <InfoRow
              label="Budget Ads"
              value={
                view.ads_budget != null
                  ? view.ads_budget.toLocaleString('fr-FR') + ' €'
                  : '—'
              }
            />
          </div>

          {/* description + objectifs */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className={SUBCARD}>
              <div className="text-[11px] uppercase tracking-wide opacity-60 mb-2">
                Description
              </div>
              <p className="text-[13px] leading-relaxed">
                {view.description || '—'}
              </p>
            </div>

            <div className={SUBCARD}>
              <div className="text-[11px] uppercase tracking-wide opacity-60 mb-2">
                Objectif & positionnement
              </div>
              <ul className="text-[13px] leading-relaxed space-y-1.5">
                <li>
                  <span className="opacity-60">Objectif :</span>{' '}
                  {view.goal || '—'}
                </li>
                <li>
                  <span className="opacity-60">Domaine :</span>{' '}
                  {view.domain || '—'}
                </li>
              </ul>
              <div className="mt-4 grid grid-cols-2 gap-4">
                <LabeledChips label="Langues" values={view.langs || []} />
                <LabeledChips label="Ton" values={view.tones || []} />
              </div>
            </div>
          </div>

          {/* refs / liens */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className={SUBCARD}>
              <div className="text-[11px] uppercase tracking-wide opacity-60 mb-2">
                Références / Bench
              </div>
              <div className="flex flex-col gap-2">
                {view.urls?.length ? (
                  view.urls.map((u, i) => (
                    <NiceLink key={i} href={u}>
                      {u}
                    </NiceLink>
                  ))
                ) : (
                  <div className="text-[13px] opacity-60">—</div>
                )}
              </div>
            </div>

            <div className={SUBCARD}>
              <div className="text-[11px] uppercase tracking-wide opacity-60 mb-2">
                Liens client (Notion, Miro, Drive…)
              </div>
              <div className="flex flex-col gap-2">
                {view.links?.length ? (
                  view.links.map((u, i) => (
                    <NiceLink key={i} href={u}>
                      {u}
                    </NiceLink>
                  ))
                ) : (
                  <div className="text-[13px] opacity-60">—</div>
                )}
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* FORMS : planning + update */}
      <motion.div
        initial="initial"
        animate="animate"
        variants={fadeIn}
        transition={tFast}
        className={CARD}
      >
        <div aria-hidden className={CARD_INNER} />
        <div className="relative z-[1] space-y-8">
          <div>
            <div className="text-base font-semibold leading-tight">
              Planning & statut interne
            </div>
            <div className="text-[12px] text-muted-foreground">
              Ajuster les dates et l’avancement global du projet.
            </div>
          </div>

          <ScheduleForm
            projectId={view.id}
            start_at={view.start_at}
            deadline={view.deadline}
            status={view.status}
          />

          <UpdateForm projectId={view.id} currentProgress={view.progress} />
        </div>
      </motion.div>

      {/* TIMELINE UPDATES */}
      <motion.div
        initial="initial"
        animate="animate"
        variants={fadeIn}
        transition={tFast}
        className={CARD}
      >
        <div aria-hidden className={CARD_INNER} />
        <div className="relative z-[1]">
          <div className="flex items-start justify-between flex-wrap gap-3 mb-6">
            <div>
              <div className="text-base font-semibold leading-tight">
                Historique d’avancement
              </div>
              <div className="text-[12px] text-muted-foreground">
                Ce qui a été fait, ce qui arrive, les blocages.
              </div>
            </div>
            <SoftBadge tone="muted">
              {updates.length} update{updates.length > 1 ? 's' : ''}
            </SoftBadge>
          </div>

          {!updates?.length ? (
            <p className="text-[13px] opacity-70">
              Aucun update pour le moment.
            </p>
          ) : (
            <ol className="relative ml-2">
              {updates.map((u, idx) => (
                <li
                  key={u.id}
                  className="pl-6 pb-8 last:pb-0 relative text-[13px] leading-relaxed"
                >
                  {/* dot */}
                  <span className="absolute left-0 top-1.5 h-3 w-3 rounded-full bg-primary shadow-[0_0_20px_rgba(59,130,246,0.6)]" />
                  {/* line */}
                  {idx !== updates.length - 1 && (
                    <span className="absolute left-[5px] top-5 bottom-0 w-[2px] bg-primary/20" />
                  )}

                  {/* header row */}
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div className="flex flex-col gap-1">
                      <SoftBadge tone="primary">
                        {u.progress ?? 0}% fait
                      </SoftBadge>
                      {u.headline && (
                        <div className="text-[13px] font-medium leading-snug">
                          {u.headline}
                        </div>
                      )}
                    </div>
                    <div className="text-[11px] opacity-70 tabular-nums">
                      {new Date(u.created_at).toLocaleString('fr-FR')}
                    </div>
                  </div>

                  {/* body */}
                  <div className="mt-4 grid md:grid-cols-3 gap-4">
                    <div className={SUBCARD}>
                      <div className="text-[11px] uppercase tracking-wide opacity-60 mb-2">
                        Fait
                      </div>
                      {u.done.length ? (
                        <ul className="list-disc list-inside space-y-1">
                          {u.done.map((d, i) => (
                            <li key={i}>{d}</li>
                          ))}
                        </ul>
                      ) : (
                        <div className="opacity-60">—</div>
                      )}
                    </div>

                    <div className={SUBCARD}>
                      <div className="text-[11px] uppercase tracking-wide opacity-60 mb-2">
                        À venir
                      </div>
                      {u.next.length ? (
                        <ul className="list-disc list-inside space-y-1">
                          {u.next.map((n, i) => (
                            <li key={i}>{n}</li>
                          ))}
                        </ul>
                      ) : (
                        <div className="opacity-60">—</div>
                      )}
                    </div>
                  </div>
                </li>
              ))}
            </ol>
          )}
        </div>
      </motion.div>
    </section>
  );
}
