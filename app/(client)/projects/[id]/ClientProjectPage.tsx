'use client';

import { useState, useMemo } from 'react';
import { motion, cubicBezier } from 'framer-motion';
import {
  CalendarDays,
  Mail,
  Link as LinkIcon,
  CheckCircle2,
  ListTodo,
  Clock,
  Gauge,
  CreditCard,
  TrendingUp,
  CalendarClock,
  FileText,
  Zap,
  Pencil,
  ShieldAlert,
  AlertTriangle,
  ShieldCheck,
} from 'lucide-react';
import ProgressGauge from '@/components/ClientSpace/Dashboard/ProgressGauge';

const ease = cubicBezier(0.16, 1, 0.3, 1);

type Update = {
  id: string;
  progress: number;
  created_at: string;
  message: { done?: string[]; next?: string[] };
};

type ClientProjectPageProps = {
  proj: any;
  displayTitle: string;
  updates: Update[];
  signedPdf: string | null;
};

export default function ClientProjectPage({
  proj,
  displayTitle,
  updates,
  signedPdf,
}: ClientProjectPageProps) {
  const progress = clamp(proj.progress ?? 0, 0, 100);

  const last = useMemo<Update | null>(
    () => (updates && updates.length > 0 ? updates[0] : null),
    [updates]
  );

  return (
    <section className="space-y-8">
      {/* HERO HEADER */}
      <motion.section
        initial={{ opacity: 0, y: 12, filter: 'blur(6px)' }}
        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        transition={{ duration: 0.45, ease }}
        className={CARD_HERO}
      >
        <div className="grid gap-10 lg:grid-cols-[1.5fr_.5fr] items-start">
          {/* LEFT */}
          <div className="min-w-0 space-y-6">
            <EditableTitleClient
              initialTitle={displayTitle}
              projectId={proj.id}
            />

            {proj.description ? (
              <p className="text-sm text-muted-foreground leading-relaxed max-w-2xl">
                {proj.description}
              </p>
            ) : null}

            {/* chips */}
            <div className="flex flex-wrap items-center gap-2.5 text-[11px] font-medium">
              <StatusChip status={proj.status} />
              <PriorityChip level={proj.priority} />
              <RiskChip level={proj.risk_level} />

              {proj.deadline && (
                <MetaChip>
                  <CalendarDays className="h-3.5 w-3.5 shrink-0" />
                  <span className="truncate">
                    Deadline&nbsp;: {formatDateShort(proj.deadline)}
                  </span>
                </MetaChip>
              )}

              {proj.start_at && (
                <MetaChip>
                  <CalendarClock className="h-3.5 w-3.5 shrink-0" />
                  <span className="truncate">
                    Début&nbsp;: {formatDateShort(proj.start_at)}
                  </span>
                </MetaChip>
              )}
            </div>

            {/* last update preview */}
            {last && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <SmallPane>
                  <div className="text-[11px] uppercase text-muted-foreground mb-1 flex items-center gap-1.5">
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />
                    Fait dernièrement
                  </div>
                  <div className="text-sm leading-relaxed">
                    {last.message?.done?.length ? last.message.done[0] : '—'}
                  </div>
                </SmallPane>

                <SmallPane>
                  <div className="text-[11px] uppercase text-muted-foreground mb-1 flex items-center gap-1.5">
                    <ListTodo className="h-3.5 w-3.5 text-primary" />
                    Prochaine étape
                  </div>
                  <div className="text-sm leading-relaxed">
                    {last.message?.next?.length ? last.message.next[0] : '—'}
                  </div>
                </SmallPane>

                <div className="sm:col-span-2 text-[11px] text-muted-foreground flex flex-wrap items-center gap-2">
                  <Clock className="h-3.5 w-3.5" />
                  <span>
                    {formatDateShort(last.created_at)} — {last.progress}%
                    atteint
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* RIGHT / GAUGE */}
          <div className="flex justify-center lg:justify-end">
            <div className="relative flex flex-col items-center text-center">
              {/* fond radial derrière la gauge */}
              <div
                className="absolute inset-0 flex items-center justify-center pointer-events-none"
                aria-hidden
              >
                <div className="h-40 w-40 rounded-full bg-primary/10 blur-2xl" />
              </div>

              <ProgressGauge value={progress} />

              <div className="mt-4 text-xs text-muted-foreground font-medium">
                Avancement global
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* CONTENT GRID */}
      <div className="grid gap-6 xl:grid-cols-[1.4fr_.6fr]">
        {/* COL GAUCHE */}
        <div className="space-y-6">
          {/* suivi */}
          <SectionCard
            icon={<Zap className="h-4 w-4 text-primary" />}
            sectionLabel="Suivi du projet"
            title="Étapes & avancement"
            description="Historique des jalons, ce qui est fait, ce qui arrive."
          >
            <UpdatesTimeline updates={updates ?? []} />
          </SectionCard>

          {/* ressources */}
          <SectionCard
            icon={<LinkIcon className="h-4 w-4 text-primary" />}
            sectionLabel="Ressources"
            title="Dépôt & Liens"
            description="Tout ce qui vous permet de suivre / tester."
          >
            <div className="text-sm space-y-6">
              <Row
                label="Dépôt code"
                value={
                  proj.repo_url ? (
                    <a
                      href={proj.repo_url}
                      target="_blank"
                      rel="noreferrer"
                      className="underline underline-offset-4 break-all"
                    >
                      {proj.repo_url}
                    </a>
                  ) : (
                    '—'
                  )
                }
              />

              <div className="space-y-2">
                <div className="text-[11px] uppercase text-muted-foreground flex items-center gap-1.5 font-medium">
                  <LinkIcon className="h-3.5 w-3.5" />
                  Liens externes
                </div>

                {Array.isArray(proj.urls) && proj.urls.length ? (
                  <ul className="flex flex-wrap gap-2">
                    {proj.urls.map((u: string, i: number) => (
                      <li key={`${u}-${i}`}>
                        <a
                          href={u}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1.5 rounded-full bg-black/[0.04] dark:bg-white/[0.07] ring-1 ring-black/10 dark:ring-white/10 hover:bg-black/[0.07] dark:hover:bg-white/[0.12] px-3 py-1.5 text-[12px] font-medium transition max-w-[220px]"
                          title={u}
                        >
                          <LinkIcon className="h-3.5 w-3.5 opacity-70 shrink-0" />
                          <span className="truncate">{u}</span>
                        </a>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="text-xs text-muted-foreground">
                    Aucun lien fourni.
                  </div>
                )}
              </div>
            </div>
          </SectionCard>
        </div>

        {/* COL DROITE */}
        <div className="space-y-6">
          {/* infos clés */}
          <SectionCard
            icon={<Gauge className="h-4 w-4 text-primary" />}
            sectionLabel="Infos clés"
            title="État du projet"
          >
            <div className="space-y-4 text-sm">
              <Row label="Statut" value={<StatusChip status={proj.status} />} />
              <Row label="Progression" value={`${progress}%`} />
              <Row
                label="Priorité"
                value={<PriorityChip level={proj.priority} />}
              />
              <Row
                label="Risque"
                value={<RiskChip level={proj.risk_level} />}
              />
              <Row
                label="Client"
                value={
                  proj.client_email ? (
                    <span className="inline-flex items-center gap-2 break-all">
                      <Mail className="h-4 w-4 opacity-70 shrink-0" />
                      {proj.client_email}
                    </span>
                  ) : (
                    '—'
                  )
                }
              />
              <Row
                label="Début"
                value={proj.start_at ? formatDateShort(proj.start_at) : '—'}
              />
              <Row
                label="Deadline"
                value={proj.deadline ? formatDateShort(proj.deadline) : '—'}
              />
            </div>
          </SectionCard>

          {/* facturation */}
          <SectionCard
            icon={<CreditCard className="h-4 w-4 text-primary" />}
            sectionLabel="Facturation"
            title="Paiement"
            description="Résumé du statut de paiement pour ce projet."
          >
            <div className="space-y-4 text-sm">
              <Row
                label="Statut paiement"
                value={<BillingChip status={proj.billing_status} />}
              />
              <Row label="Total prévu" value={formatEuro(proj.payment_total)} />
              <Row
                label="Déjà encaissé"
                value={formatEuro(proj.payment_captured)}
              />
              <Row
                label="Échéances"
                value={
                  proj.payment_installments
                    ? `${proj.payment_installments}x`
                    : '—'
                }
              />
            </div>
          </SectionCard>

          {/* contrat / offre */}
          <SectionCard
            icon={<FileText className="h-4 w-4 text-primary" />}
            sectionLabel="Documents"
            title="Contrat & Offre"
            description="Contrat signé et périmètre vendu."
          >
            <div className="space-y-5 text-sm">
              <Row
                label="Contrat signé"
                value={
                  signedPdf ? (
                    <a
                      href={signedPdf}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 rounded-full bg-primary text-white px-3 py-1.5 text-xs font-medium hover:opacity-90 active:scale-[.99] transition shadow-[0_14px_30px_rgba(59,130,246,0.4)] dark:shadow-[0_14px_30px_rgba(59,130,246,0.3)]"
                    >
                      <FileText className="h-4 w-4" />
                      Ouvrir PDF
                    </a>
                  ) : (
                    <span className="inline-flex items-center gap-2 rounded-full bg-black/[0.04] dark:bg-white/[0.07] ring-1 ring-black/10 dark:ring-white/10 px-3 py-1.5 text-xs text-muted-foreground">
                      <FileText className="h-4 w-4 opacity-70" /> —
                    </span>
                  )
                }
              />

              <div className="space-y-2">
                <div className="text-[11px] uppercase text-muted-foreground flex items-center gap-1.5 font-medium">
                  <TrendingUp className="h-3.5 w-3.5" />
                  Offre vendue
                </div>

                <div className="rounded-[1rem] bg-black/[0.04] dark:bg-white/[0.07] ring-1 ring-black/10 dark:ring-white/10 p-3 text-xs leading-relaxed">
                  <div className="font-medium text-foreground text-[13px]">
                    {proj.offer_category} · {proj.offer_tier}
                  </div>

                  <div className="text-muted-foreground mt-2 flex flex-wrap gap-1.5">
                    {Array.isArray(proj.selected_options) &&
                    proj.selected_options.length ? (
                      proj.selected_options.map((opt: string, i: number) => (
                        <span
                          key={opt + i}
                          className="inline-flex items-center rounded-full bg-primary/10 text-primary ring-1 ring-primary/30 px-2 py-0.5 text-[10px] font-medium"
                        >
                          {opt}
                        </span>
                      ))
                    ) : (
                      <span className="opacity-60">Aucune option</span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </SectionCard>
        </div>
      </div>
    </section>
  );
}

/* ------------------ Editable Title ------------------ */

function EditableTitleClient({
  initialTitle,
  projectId,
}: {
  initialTitle: string;
  projectId: string;
}) {
  const [title, setTitle] = useState(initialTitle);
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);

  async function save() {
    if (!title.trim()) return;
    setSaving(true);
    try {
      // await updateProjectTitleAction({ projectId, title });
    } catch (e) {
      console.error('update title failed', e);
    } finally {
      setSaving(false);
      setEditing(false);
    }
  }

  return (
    <div className="group flex flex-col gap-2">
      {editing ? (
        <div className="flex flex-col lg:flex-row lg:items-center gap-3">
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full rounded-[1rem] bg-black/[0.03] dark:bg-white/[0.07] ring-1 ring-black/10 dark:ring-white/10 px-3 py-2 text-xl lg:text-2xl font-semibold tracking-tight leading-tight outline-none focus:ring-2 focus:ring-primary/40 dark:focus:ring-primary/40"
          />
          <div className="flex items-center gap-2 text-sm">
            <button
              onClick={save}
              disabled={saving || !title.trim()}
              className="inline-flex items-center rounded-[0.75rem] bg-primary text-white px-3 py-2 font-medium text-xs hover:opacity-90 active:scale-[.99] transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {saving ? 'Enregistrement…' : 'Enregistrer'}
            </button>
            <button
              onClick={() => {
                setTitle(initialTitle);
                setEditing(false);
              }}
              className="inline-flex items-center rounded-[0.75rem] bg-black/[0.05] dark:bg-white/[0.08] ring-1 ring-black/10 dark:ring-white/10 px-3 py-2 text-xs font-medium hover:bg-black/[0.07] dark:hover:bg-white/[0.12] transition"
            >
              Annuler
            </button>
          </div>
        </div>
      ) : (
        <div className="flex flex-wrap items-start gap-2">
          <h1 className="text-2xl lg:text-3xl font-semibold leading-tight tracking-tight break-words">
            {title}
          </h1>
          <button
            onClick={() => setEditing(true)}
            className="opacity-0 group-hover:opacity-100 transition-opacity inline-flex items-center gap-1 rounded-[0.75rem] bg-black/[0.05] dark:bg-white/[0.08] ring-1 ring-black/10 dark:ring-white/10 px-2 py-1 text-[10px] font-medium hover:bg-black/[0.07] dark:hover:bg-white/[0.12]"
            title="Renommer le projet"
            aria-label="Renommer le projet"
          >
            <Pencil className="h-3.5 w-3.5 opacity-70" />
            <span>Éditer</span>
          </button>
        </div>
      )}

      <div className="text-[11px] text-muted-foreground font-medium">
        ID projet&nbsp;:{' '}
        <span className="font-mono text-[11px]">{projectId}</span>
      </div>
    </div>
  );
}

/* ------------------ Timeline ------------------ */

function UpdatesTimeline({ updates }: { updates: Update[] }) {
  if (!updates || updates.length === 0) {
    return (
      <div className="text-sm text-muted-foreground py-8">
        Aucune mise à jour pour l’instant.
      </div>
    );
  }

  return (
    <ol className="relative pl-4 space-y-6">
      {updates.map((u) => (
        <li key={u.id} className="relative space-y-3">
          {/* bullet */}
          <div className="absolute left-[-10px] top-[2px] h-4 w-4 rounded-full bg-primary shadow-[0_0_20px_rgba(59,130,246,0.6)] ring-2 ring-white dark:ring-[#0e1116]" />

          {/* header */}
          <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1">
            <div className="text-sm font-medium">Progression {u.progress}%</div>
            <div className="text-[11px] text-muted-foreground">
              {formatDateShort(u.created_at)}
            </div>
          </div>

          {/* done */}
          {u.message?.done?.length ? (
            <div className="text-[13px] leading-relaxed">
              <div className="inline-flex items-center gap-1 text-emerald-600 dark:text-emerald-400 text-[11px] font-medium uppercase">
                <CheckCircle2 className="h-3.5 w-3.5" />
                Fait
              </div>
              <ul className="list-disc list-inside mt-1 space-y-0.5">
                {u.message.done.map((d, i) => (
                  <li key={`done-${i}`} className="text-[13px]">
                    {d}
                  </li>
                ))}
              </ul>
            </div>
          ) : null}

          {/* next */}
          {u.message?.next?.length ? (
            <div className="text-[13px] leading-relaxed">
              <div className="inline-flex items-center gap-1 text-primary text-[11px] font-medium uppercase">
                <ListTodo className="h-3.5 w-3.5" />À venir
              </div>
              <ul className="list-disc list-inside mt-1 space-y-0.5">
                {u.message.next.map((n, i) => (
                  <li key={`next-${i}`} className="text-[13px]">
                    {n}
                  </li>
                ))}
              </ul>
            </div>
          ) : null}

          <div className="h-px w-full bg-black/5 dark:bg-white/10" />
        </li>
      ))}
    </ol>
  );
}

/* ------------------ UI helpers ------------------ */

const CARD_HERO = [
  'rounded-[2rem]',
  'p-8 lg:p-10',
  'bg-white dark:bg-[#0e1116]',
  'ring-1 ring-black/5 dark:ring-white/10',
  'shadow-[0_30px_80px_rgba(0,0,0,0.08)]',
].join(' ');

const CARD_SUB = [
  'rounded-[2rem]',
  'p-6 md:p-7',
  'bg-white dark:bg-[#0e1116]',
  'ring-1 ring-black/5 dark:ring-white/10',
  'shadow-[0_24px_60px_rgba(0,0,0,0.08)]',
].join(' ');

function SectionCard({
  icon,
  sectionLabel,
  title,
  description,
  children,
}: {
  icon: React.ReactNode;
  sectionLabel: string;
  title: string;
  description?: string;
  children: React.ReactNode;
}) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 12, filter: 'blur(6px)' }}
      animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      transition={{ duration: 0.45, ease }}
      className={CARD_SUB}
    >
      <header className="mb-5 space-y-2">
        <div className="flex flex-wrap items-center gap-2">
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-xl bg-primary/10 text-primary ring-1 ring-primary/20 dark:ring-primary/30">
            {icon}
          </span>
          <span className="text-[10px] tracking-[0.18em] uppercase text-muted-foreground font-medium">
            {sectionLabel}
          </span>
        </div>

        <div className="flex flex-col">
          <h2 className="text-base font-semibold leading-tight">{title}</h2>
          {description ? (
            <p className="text-xs text-muted-foreground max-w-prose">
              {description}
            </p>
          ) : null}
        </div>
      </header>

      <div>{children}</div>
    </motion.section>
  );
}

function Row({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="flex items-start gap-4">
      <div className="text-[11px] uppercase text-muted-foreground w-28 shrink-0 leading-relaxed">
        {label}
      </div>
      <div className="text-sm break-words leading-relaxed">{value ?? '—'}</div>
    </div>
  );
}

function SmallPane({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-[1rem] bg-black/[0.04] dark:bg-white/[0.07] ring-1 ring-black/10 dark:ring-white/10 p-3 shadow-[0_16px_30px_rgba(0,0,0,0.07)]">
      {children}
    </div>
  );
}

function MetaChip({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 bg-black/[0.04] dark:bg-white/[0.07] ring-1 ring-black/10 dark:ring-white/10 text-[11px] leading-none">
      {children}
    </span>
  );
}

/* ------------------ Chips ------------------ */

function StatusChip({ status }: { status?: string }) {
  const s = (status ?? 'in_progress').toLowerCase();
  const map: Record<string, { text: string; cls: string }> = {
    draft: {
      text: 'Brouillon',
      cls: 'bg-gray-500/10 text-gray-700 dark:text-gray-300 ring-1 ring-gray-500/30',
    },
    scheduled: {
      text: 'Planifié',
      cls: 'bg-amber-400/10 text-amber-700 dark:text-amber-300 ring-1 ring-amber-400/30',
    },
    in_progress: {
      text: 'En cours',
      cls: 'bg-blue-500/10 text-blue-700 dark:text-blue-300 ring-1 ring-blue-500/30',
    },
    paused: {
      text: 'En pause',
      cls: 'bg-amber-500/10 text-amber-700 dark:text-amber-300 ring-1 ring-amber-500/30',
    },
    completed: {
      text: 'Terminé',
      cls: 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 ring-1 ring-emerald-500/30',
    },
    cancelled: {
      text: 'Annulé',
      cls: 'bg-rose-500/10 text-rose-700 dark:text-rose-300 ring-1 ring-rose-500/30',
    },
  };
  const { text, cls } = map[s] ?? map['draft'];
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-1 text-[11px] font-medium leading-none ${cls}`}
    >
      {text}
    </span>
  );
}

function PriorityChip({ level }: { level?: string }) {
  const l = (level ?? 'normal').toLowerCase();
  if (l === 'critical')
    return (
      <span className="inline-flex items-center rounded-full bg-rose-500/10 text-rose-600 dark:text-rose-400 ring-1 ring-rose-500/30 px-2.5 py-1 text-[11px] font-medium leading-none">
        Critique
      </span>
    );
  if (l === 'high')
    return (
      <span className="inline-flex items-center rounded-full bg-amber-500/10 text-amber-700 dark:text-amber-400 ring-1 ring-amber-500/30 px-2.5 py-1 text-[11px] font-medium leading-none">
        Haute
      </span>
    );
  if (l === 'normal')
    return (
      <span className="inline-flex items-center rounded-full bg-primary/10 text-primary ring-1 ring-primary/30 px-2.5 py-1 text-[11px] font-medium leading-none">
        Normale
      </span>
    );
  return (
    <span className="inline-flex items-center rounded-full bg-black/[0.04] dark:bg-white/[0.07] ring-1 ring-black/10 dark:ring-white/10 px-2.5 py-1 text-[11px] font-medium leading-none">
      {level || '—'}
    </span>
  );
}

function RiskChip({ level }: { level?: string }) {
  const l = (level ?? 'normal').toLowerCase();
  if (l === 'urgent')
    return (
      <span className="inline-flex items-center rounded-full bg-rose-500/10 text-rose-600 dark:text-rose-400 ring-1 ring-rose-500/30 px-2.5 py-1 text-[11px] font-medium leading-none">
        <ShieldAlert className="h-3.5 w-3.5 mr-1" />
        Urgent
      </span>
    );
  if (l === 'attention')
    return (
      <span className="inline-flex items-center rounded-full bg-amber-500/10 text-amber-700 dark:text-amber-400 ring-1 ring-amber-500/30 px-2.5 py-1 text-[11px] font-medium leading-none">
        <AlertTriangle className="h-3.5 w-3.5 mr-1" />À surveiller
      </span>
    );
  return (
    <span className="inline-flex items-center rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 ring-1 ring-emerald-500/30 px-2.5 py-1 text-[11px] font-medium leading-none">
      <ShieldCheck className="h-3.5 w-3.5 mr-1" />
      OK
    </span>
  );
}

function BillingChip({ status }: { status?: string }) {
  const s = (status ?? '').toLowerCase();
  if (s === 'late')
    return (
      <span className="inline-flex items-center rounded-full bg-rose-500/10 text-rose-600 dark:text-rose-400 ring-1 ring-rose-500/30 px-2.5 py-1 text-[11px] font-medium leading-none">
        Retard paiement
      </span>
    );
  if (s === 'paid_full')
    return (
      <span className="inline-flex items-center rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 ring-1 ring-emerald-500/30 px-2.5 py-1 text-[11px] font-medium leading-none">
        Payé
      </span>
    );
  if (s === 'deposit_paid')
    return (
      <span className="inline-flex items-center rounded-full bg-primary/10 text-primary ring-1 ring-primary/30 px-2.5 py-1 text-[11px] font-medium leading-none">
        Acompte OK
      </span>
    );
  if (s === 'in_progress')
    return (
      <span className="inline-flex items-center rounded-full bg-blue-500/10 text-blue-700 dark:text-blue-300 ring-1 ring-blue-500/30 px-2.5 py-1 text-[11px] font-medium leading-none">
        En cours
      </span>
    );
  return (
    <span className="inline-flex items-center rounded-full bg-black/[0.04] dark:bg-white/[0.07] ring-1 ring-black/10 dark:ring-white/10 px-2.5 py-1 text-[11px] font-medium leading-none">
      {status || '—'}
    </span>
  );
}

/* ------------------ utils ------------------ */

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}
function formatDateShort(d: string | number | Date) {
  try {
    return new Date(d).toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  } catch {
    return String(d);
  }
}
function formatEuro(v: any) {
  const n = Number(v);
  if (!isFinite(n)) return '—';
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'EUR',
    maximumFractionDigits: 0,
  }).format(n);
}
