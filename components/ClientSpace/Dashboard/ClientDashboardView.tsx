'use client';

import { motion, cubicBezier } from 'framer-motion';
import Link from 'next/link';
import {
  CalendarDays,
  ShieldAlert,
  ShieldCheck,
  Zap,
  Headphones,
} from 'lucide-react';
import ProgressGauge from '@/components/ClientSpace/Dashboard/ProgressGauge';

export type DashboardProject = {
  id: string;
  title: string;
  status: string | null;
  progress: number;
  deadline: string | null;
  created_at: string;
  priority: string;
  risk_level: string;
  billing_status: string; // on le reçoit encore, mais on ne l'affiche plus ici
};

const ease = cubicBezier(0.16, 1, 0.3, 1);

// ---------------- VIEW ----------------
export default function ClientDashboardView({
  projects,
  displayName,
}: {
  projects: DashboardProject[];
  displayName: string;
}) {
  const count = projects.length;
  const avg =
    count === 0
      ? 0
      : Math.round(projects.reduce((s, p) => s + (p.progress ?? 0), 0) / count);

  // nombre de projets à risque
  const highRisk = projects.filter(
    (p) => p.risk_level === 'urgent' || p.risk_level === 'attention'
  ).length;

  return (
    <section className="space-y-8">
      {/* HEADER */}
      <motion.div
        initial={{ opacity: 0, y: 10, filter: 'blur(8px)' }}
        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        transition={{ duration: 0.45, ease }}
        className="flex flex-col gap-2"
      >
        <div className="text-[11px] tracking-[0.18em] uppercase text-muted-foreground">
          Espace client
        </div>

        <h1 className="text-2xl md:text-3xl font-semibold tracking-tight leading-tight">
          Bonjour {displayName} 👋
        </h1>

        <p className="text-sm text-muted-foreground max-w-prose">
          Suivi de vos projets, avancement des livrables et prochaines étapes
          avec l’équipe.
        </p>
      </motion.div>

      {/* KPI STRIP */}
      <motion.div
        initial={{ opacity: 0, y: 12, filter: 'blur(6px)' }}
        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        transition={{ duration: 0.5, ease }}
        className="grid grid-cols-2 md:grid-cols-3 gap-4"
      >
        <DashCard
          label="Vos projets"
          value={count.toString()}
          hint="Actifs ou en cours"
          icon={<Zap className="h-4 w-4 text-primary" />}
        />

        <DashCard
          label="Progression moy."
          value={`${avg}%`}
          hint="Global"
          icon={<ProgressGauge value={avg} size={28} />}
        />

        <DashCard
          label="Suivi risques"
          value={String(highRisk)}
          tone={highRisk > 0 ? 'warn' : 'ok'}
          hint={
            highRisk > 0 ? 'On surveille certains points' : 'Tout est stable'
          }
          icon={
            highRisk > 0 ? (
              <ShieldAlert className="h-4 w-4 text-amber-500" />
            ) : (
              <ShieldCheck className="h-4 w-4 text-emerald-500" />
            )
          }
        />
      </motion.div>

      {/* CONTENT GRID: gauche = projets / droite = next steps & support */}
      <div className="grid lg:grid-cols-[2fr_1fr] gap-6">
        {/* LISTE PROJETS */}
        <motion.section
          initial={{ opacity: 0, y: 12, filter: 'blur(6px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 0.5, ease }}
          className={CARD}
        >
          <div aria-hidden className={CARD_INNER} />
          <header className="relative z-10 flex items-start justify-between flex-wrap gap-3 mb-6">
            <div className="space-y-1">
              <div className="text-[11px] tracking-[0.18em] uppercase text-muted-foreground">
                Projets
              </div>
              <h2 className="text-base font-semibold leading-tight">
                Vos livraisons en cours
              </h2>
              <p className="text-xs text-muted-foreground max-w-sm">
                Cliquez pour ouvrir le suivi détaillé, voir les tâches à venir
                et les documents.
              </p>
            </div>
          </header>

          {/* Liste scrollable */}
          <div className="relative z-10 max-h-[460px] overflow-y-auto pr-1 custom-scroll">
            {projects.length === 0 ? (
              <div className="opacity-60 text-sm py-12 text-center">
                Aucun projet pour le moment.
              </div>
            ) : (
              <ul className="space-y-4">
                {projects.map((p) => (
                  <ProjectCardItem key={p.id} p={p} />
                ))}
              </ul>
            )}
          </div>
        </motion.section>

        {/* RIGHT PANEL */}
        <motion.aside
          initial={{ opacity: 0, y: 12, filter: 'blur(6px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 0.5, ease }}
          className={CARD}
        >
          <div aria-hidden className={CARD_INNER} />
          <div className="relative z-10 space-y-6">
            {/* Bloc prochaines étapes */}
            <div>
              <div className="text-[11px] tracking-[0.18em] uppercase text-muted-foreground">
                À venir
              </div>
              <h3 className="text-base font-semibold leading-tight flex items-center gap-2">
                <CalendarDays className="h-4 w-4 text-primary" />
                Prochain jalon
              </h3>
              <p className="text-xs text-muted-foreground mt-1">
                Ouvrez un projet pour voir exactement ce qui est en cours et ce
                qui arrive ensuite (déploiement, maquettes, intégration…).
              </p>
            </div>

            {/* Bloc support */}
            <div>
              <div className="text-[11px] tracking-[0.18em] uppercase text-muted-foreground">
                Support client
              </div>
              <h3 className="text-base font-semibold leading-tight flex items-center gap-2">
                <Headphones className="h-4 w-4 text-primary" />
                Besoin d’aide ?
              </h3>
              <p className="text-xs text-muted-foreground mt-1">
                Une question, un changement, une urgence ?
                <br />
                On répond vite (souvent &lt; 24h ouvrées).
              </p>

              <div className="mt-3 rounded-xl bg-black/[0.04] dark:bg-white/[0.07] p-4 text-[11px] leading-relaxed text-muted-foreground ring-1 ring-black/10 dark:ring-white/15">
                contact@ikovaline.com
                <div className="text-[10px] opacity-70">
                  indiquez le nom du projet pour accélérer ✽
                </div>
              </div>
            </div>
          </div>
        </motion.aside>
      </div>
    </section>
  );
}

// ---------------- SUB UI ----------------

const CARD =
  'relative rounded-[2rem] border border-black/[0.04] p-6 md:p-8 bg-[#ffffff] dark:bg-[#0e1116] shadow-[14px_14px_36px_#d7dce6,-14px_-14px_36px_#ffffff] dark:shadow-[14px_14px_36px_rgba(0,0,0,0.55),-14px_-14px_36px_rgba(255,255,255,0.03)]';

const CARD_INNER =
  'pointer-events-none absolute inset-0 rounded-[2rem] shadow-[inset_1px_1px_0_rgba(255,255,255,0.9),inset_-1px_-1px_0_rgba(0,0,0,0.03)]';

// petite carte KPI
function DashCard({
  label,
  value,
  hint,
  icon,
  tone,
}: {
  label: string;
  value: string;
  hint: string;
  icon?: React.ReactNode;
  tone?: 'ok' | 'warn';
}) {
  const toneMap: Record<string, string> = {
    ok: 'text-emerald-600 dark:text-emerald-400',
    warn: 'text-amber-600 dark:text-amber-400',
  };
  return (
    <div
      className={
        CARD +
        ' flex flex-col justify-between relative overflow-hidden min-h-[140px]'
      }
    >
      <div aria-hidden className={CARD_INNER} />
      <div className="relative z-[1] flex flex-col gap-1">
        <div className="flex items-center justify-between">
          <div className="text-[11px] uppercase tracking-[0.15em] text-muted-foreground">
            {label}
          </div>
          <div className="text-xs opacity-80">{icon}</div>
        </div>

        <div className="text-2xl font-semibold leading-tight mt-1 flex items-baseline gap-2">
          <span className={tone ? toneMap[tone] : ''}>{value}</span>
        </div>

        <div className="text-[11px] text-muted-foreground">{hint}</div>
      </div>
    </div>
  );
}

// badge priorité
function PriorityBadge({ level }: { level: string }) {
  const l = level?.toLowerCase();
  if (l === 'critical')
    return (
      <span className="inline-flex items-center h-6 rounded-[0.8rem] px-2 text-[10px] font-medium bg-rose-500/10 text-rose-600 dark:text-rose-400 ring-1 ring-rose-500/20">
        Critique
      </span>
    );
  if (l === 'high')
    return (
      <span className="inline-flex items-center h-6 rounded-[0.8rem] px-2 text-[10px] font-medium bg-amber-500/10 text-amber-700 dark:text-amber-400 ring-1 ring-amber-500/20">
        Haute
      </span>
    );
  if (l === 'normal')
    return (
      <span className="inline-flex items-center h-6 rounded-[0.8rem] px-2 text-[10px] font-medium bg-primary/10 text-primary ring-1 ring-primary/20 dark:ring-primary/30">
        Normale
      </span>
    );
  return (
    <span className="inline-flex items-center h-6 rounded-[0.8rem] px-2 text-[10px] font-medium bg-black/5 dark:bg-white/10 text-current ring-1 ring-black/10 dark:ring-white/15">
      {level || '—'}
    </span>
  );
}

// badge risque
function RiskBadge({ level }: { level: string }) {
  const l = level?.toLowerCase();
  if (l === 'urgent')
    return (
      <span className="inline-flex items-center h-6 rounded-[0.8rem] px-2 text-[10px] font-medium bg-rose-500/10 text-rose-600 dark:text-rose-400 ring-1 ring-rose-500/20">
        Urgent
      </span>
    );
  if (l === 'attention')
    return (
      <span className="inline-flex items-center h-6 rounded-[0.8rem] px-2 text-[10px] font-medium bg-amber-500/10 text-amber-700 dark:text-amber-400 ring-1 ring-amber-500/20">
        À surveiller
      </span>
    );
  return (
    <span className="inline-flex items-center h-6 rounded-[0.8rem] px-2 text-[10px] font-medium bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 ring-1 ring-emerald-500/20">
      OK
    </span>
  );
}

// Chip pour statut projet
function StatusChip({ status }: { status?: string | null }) {
  const s = (status ?? 'in_progress').toLowerCase();
  const map: Record<string, { text: string; cls: string }> = {
    draft: {
      text: 'Brouillon',
      cls: 'bg-gray-400/20 text-gray-700 dark:text-gray-300',
    },
    scheduled: {
      text: 'Planifié',
      cls: 'bg-amber-400/20 text-amber-700 dark:text-amber-300',
    },
    in_progress: {
      text: 'En cours',
      cls: 'bg-blue-400/20 text-blue-700 dark:text-blue-300',
    },
    paused: {
      text: 'En pause',
      cls: 'bg-amber-500/20 text-amber-700 dark:text-amber-300',
    },
    completed: {
      text: 'Terminé',
      cls: 'bg-emerald-400/20 text-emerald-700 dark:text-emerald-300',
    },
    cancelled: {
      text: 'Annulé',
      cls: 'bg-rose-400/20 text-rose-700 dark:text-rose-300',
    },
  };

  const { text, cls } = map[s] ?? map['draft'];
  return (
    <span
      className={`inline-flex items-center h-6 rounded-[0.8rem] px-2 text-[10px] font-medium ${cls}`}
    >
      {text}
    </span>
  );
}

function ProgressBar({ value }: { value: number }) {
  const pct = Math.max(0, Math.min(100, value));
  return (
    <div className="w-full h-2 rounded-full bg-black/10 dark:bg-white/10 overflow-hidden">
      <div
        className="h-full bg-gradient-to-r from-primary to-blue-500"
        style={{ width: `${pct}%` }}
      />
    </div>
  );
}

// une card cliquable projet
function ProjectCardItem({ p }: { p: DashboardProject }) {
  return (
    <Link
      href={`/projects/${p.id}`}
      className={[
        'block group relative rounded-[1.5rem] p-5',
        'bg-black/[0.03] dark:bg-white/[0.06]',
        'ring-1 ring-black/5 dark:ring-white/10',
        'hover:bg-black/[0.05] dark:hover:bg-white/[0.09]',
        'transition',
      ].join(' ')}
    >
      {/* top row */}
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
        {/* LEFT TEXT */}
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2 text-[13px] font-medium text-foreground truncate">
            <span className="truncate">{p.title || 'Projet'}</span>

            <span className="opacity-60 text-xs">·</span>

            <span className="tabular-nums font-semibold">{p.progress}%</span>

            {p.deadline && (
              <>
                <span className="opacity-60 text-xs">·</span>
                <span className="text-xs text-muted-foreground truncate flex items-center gap-1">
                  <CalendarDays className="h-3.5 w-3.5" />
                  {formatDateShort(p.deadline)}
                </span>
              </>
            )}
          </div>

          <div className="mt-1 text-[11px] text-muted-foreground leading-relaxed flex flex-wrap items-center gap-x-2 gap-y-0.5">
            <span className="font-mono opacity-70 truncate max-w-[240px]">
              {p.id}
            </span>
            <span>•</span>
            <span className="opacity-70">{formatDateShort(p.created_at)}</span>
          </div>

          {/* PROGRESS BAR */}
          <div className="mt-3">
            <ProgressBar value={p.progress} />
          </div>
        </div>

        {/* BADGES RIGHT */}
        <div className="flex flex-col items-start sm:items-end gap-2 shrink-0 text-[10px]">
          <div className="flex flex-wrap items-center gap-2">
            <StatusChip status={p.status} />
            <PriorityBadge level={p.priority} />
            <RiskBadge level={p.risk_level} />
          </div>

          <div className="inline-flex items-center gap-2 text-primary text-[11px] font-medium group-hover:underline underline-offset-4">
            <span>Détails</span>
            <span
              className="h-2 w-2 rounded-full bg-primary shadow-[0_0_10px_rgba(59,130,246,0.6)]"
              aria-hidden
            />
          </div>
        </div>
      </div>
    </Link>
  );
}

// utils
function formatDateShort(d: string | number | Date | null) {
  if (!d) return '—';
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
