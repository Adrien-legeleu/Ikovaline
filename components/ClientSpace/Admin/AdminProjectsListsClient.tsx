'use client';

import Link from 'next/link';
import { motion, cubicBezier } from 'framer-motion';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import { AlertTriangle, Clock3 } from 'lucide-react';
import { cn } from '@/lib/utils';

export type AdminProjectCard = {
  id: string;
  title: string;
  status: string | null;
  progress: number | null;
  deadline: string | null;
  created_at: string;
  offer_tier: string | null;
  client_email: string | null;
  billing_status: string | null;
  priority: string | null;
  risk_level: string | null;
};

export default function AdminProjectsListClient({
  projects,
  mode = 'admin',
}: {
  projects: AdminProjectCard[];
  mode?: 'admin' | 'dev';
}) {
  const ease = cubicBezier(0.16, 1, 0.3, 1);

  const CARD =
    'relative rounded-[2rem] p-6 bg-[#ffffff] dark:bg-[#0e1116] shadow-[14px_14px_36px_#d7dce6,-14px_-14px_36px_#ffffff] dark:shadow-[14px_14px_36px_rgba(0,0,0,0.55),-14px_-14px_36px_rgba(255,255,255,0.03)]';
  const CARD_INNER =
    'pointer-events-none absolute inset-0 rounded-[2rem] shadow-[inset_1px_1px_0_rgba(255,255,255,0.9),inset_-1px_-1px_0_rgba(0,0,0,0.03)]';

  function fmtDate(iso?: string | null) {
    if (!iso) return '—';
    try {
      return format(new Date(iso), 'dd MMM yyyy', { locale: fr });
    } catch {
      return '—';
    }
  }

  function Badge({
    tone,
    children,
  }: {
    tone: 'ok' | 'warn' | 'danger' | 'muted' | 'info';
    children: React.ReactNode;
  }) {
    const map: Record<string, string> = {
      ok: 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400',
      warn: 'bg-amber-500/15 text-amber-700 dark:text-amber-400',
      danger: 'bg-rose-500/15 text-rose-600 dark:text-rose-400',
      muted:
        'bg-black/[0.05] text-black/70 dark:bg-white/10 dark:text-white/70',
      info: 'bg-primary/15 text-primary',
    };
    return (
      <span
        className={cn(
          'inline-flex items-center rounded-full px-3 h-7 text-[11px] font-medium',
          map[tone]
        )}
      >
        {children}
      </span>
    );
  }

  function toneFromStatus(status: string | null) {
    const s = (status || '').toLowerCase();
    if (s === 'in_progress')
      return { tone: 'info' as const, label: 'En cours' };
    if (s === 'completed') return { tone: 'ok' as const, label: 'Terminé' };
    if (s === 'paused') return { tone: 'warn' as const, label: 'En pause' };
    if (s === 'cancelled') return { tone: 'danger' as const, label: 'Annulé' };
    if (s === 'scheduled') return { tone: 'info' as const, label: 'Planifié' };
    if (s === 'draft') return { tone: 'muted' as const, label: 'Brouillon' };
    return { tone: 'muted' as const, label: status || '—' };
  }
  function toneFromBilling(billing: string | null): {
    tone: 'ok' | 'warn' | 'danger' | 'muted' | 'info';
    label: string;
  } {
    const b = (billing || '').toLowerCase();
    if (b === 'paid_full') return { tone: 'ok', label: 'Payé' };
    if (b === 'deposit_paid') return { tone: 'info', label: 'Acompte ok' };
    if (b === 'in_progress') return { tone: 'muted', label: 'En cours' };
    if (b === 'late') return { tone: 'danger', label: 'Retard paiement' };
    return { tone: 'muted', label: billing || '—' };
  }

  function toneFromRisk(
    prio: string | null,
    risk: string | null
  ): { tone: 'ok' | 'warn' | 'danger' | 'muted' | 'info'; label: string } {
    if (risk === 'urgent' || prio === 'critical')
      return { tone: 'danger', label: 'Urgent' };
    if (risk === 'attention' || prio === 'high')
      return { tone: 'warn', label: 'Attention' };
    return { tone: 'muted', label: 'Normal' };
  }

  return (
    <section className="px-2 pb-10 space-y-8">
      {/* header row */}
      <motion.div
        initial={{ opacity: 0, y: 12, filter: 'blur(6px)' }}
        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        transition={{ duration: 0.45, ease }}
        className="flex flex-col sm:flex-row sm:items-center justify-between gap-4"
      >
        <div className="flex flex-col gap-2">
          <div className="text-[11px] tracking-[0.18em] uppercase text-muted-foreground">
            Projets
          </div>
          <h1 className="text-2xl md:text-3xl font-semibold leading-tight">
            Suivi production
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Tous les projets en cours, leur statut et leur priorité.
          </p>
        </div>

        {mode === 'admin' && (
          <Link
            href="/admin/projects/new"
            className="inline-flex items-center justify-center rounded-[1rem] bg-primary text-white px-4 py-2 text-sm font-medium hover:opacity-90 transition shadow-[0_12px_30px_rgba(59,130,246,0.25)]"
          >
            + Nouveau projet
          </Link>
        )}
      </motion.div>

      {/* GRID LIST */}
      {projects.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 12, filter: 'blur(6px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 0.45, ease }}
          className={CARD}
        >
          <div aria-hidden className={CARD_INNER} />
          <div className="relative z-10 flex items-start gap-3 text-sm text-muted-foreground">
            <AlertTriangle className="h-5 w-5 flex-shrink-0 mt-0.5" />
            <div>Aucun projet pour le moment.</div>
          </div>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 12, filter: 'blur(6px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 0.45, ease }}
          className="grid gap-6 md:grid-cols-2 xl:grid-cols-3"
        >
          {projects.map((p) => {
            const st = toneFromStatus(p.status);
            const bill = toneFromBilling(p.billing_status);
            const risk = toneFromRisk(p.priority, p.risk_level);

            // ✅ Choix du lien selon mode
            const linkHref =
              mode === 'admin'
                ? `/admin/projects/${p.id}`
                : `/dev/projects/${p.id}`;

            return (
              <div key={p.id} className={CARD}>
                <div aria-hidden className={CARD_INNER} />
                <div className="relative z-10 flex flex-col gap-5">
                  {/* header row */}
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <div className="text-xs uppercase tracking-wide text-muted-foreground">
                        {p.offer_tier || '—'}
                      </div>
                      <div className="text-lg font-semibold leading-snug break-words">
                        {p.title}
                      </div>
                      <div className="text-xs text-muted-foreground break-all">
                        {p.client_email || '—'}
                      </div>
                    </div>

                    <Link
                      href={linkHref}
                      className="shrink-0 inline-flex items-center justify-center rounded-[0.8rem] bg-primary text-white text-xs font-medium px-3 py-2 hover:opacity-90 transition"
                    >
                      Ouvrir
                    </Link>
                  </div>

                  {/* badges */}
                  <div className="flex flex-wrap items-center gap-2 text-[11px] leading-none">
                    <Badge tone={st.tone}>{st.label}</Badge>
                    <Badge tone={bill.tone}>{bill.label}</Badge>
                    <Badge tone={risk.tone}>{risk.label}</Badge>
                  </div>

                  {/* timing */}
                  <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1.5">
                      <Clock3 className="h-3.5 w-3.5" />
                      <span>Deadline {fmtDate(p.deadline)}</span>
                    </div>
                    <div className="opacity-60">
                      Créé le {fmtDate(p.created_at)}
                    </div>
                  </div>

                  {/* progress bar */}
                  <div>
                    <div className="flex items-center justify-between text-xs mb-1">
                      <span className="opacity-60">Progression</span>
                      <span className="font-medium">{p.progress ?? 0}%</span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-black/10 dark:bg-white/10 overflow-hidden">
                      <div
                        className="h-2 rounded-full bg-primary transition-all"
                        style={{
                          width: `${Math.min(
                            100,
                            Math.max(0, p.progress ?? 0)
                          )}%`,
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </motion.div>
      )}
    </section>
  );
}
