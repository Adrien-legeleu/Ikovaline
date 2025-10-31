// components/ClientSpace/Dashboard/ProjectCard.tsx
'use client';

import Link from 'next/link';
import { motion, useInView } from 'framer-motion';
import { CalendarDays, TrendingUp } from 'lucide-react';

import type { DashboardProject } from './ClientDashboardView';
import React from 'react';
import ProgressGauge from './ProgressGauge';

export default function ProjectCard({
  project,
}: {
  project: DashboardProject;
}) {
  return (
    <motion.article
      whileHover={{ scale: 1.03, y: -3 }}
      transition={{ type: 'spring', stiffness: 120, damping: 12 }}
      className="group rounded-3xl bg-gradient-to-br from-white/90 to-white/70 dark:from-neutral-900/70 dark:to-neutral-800/60 backdrop-blur-xl shadow-[0_10px_40px_rgba(0,0,0,0.08)] p-6 sm:p-7 space-y-5"
    >
      <div className="flex items-start justify-between">
        <div className="min-w-0">
          <h3 className="font-semibold text-lg truncate">{project.title}</h3>
          <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
            <CalendarDays className="h-3.5 w-3.5 shrink-0" />
            {project.deadline
              ? `Deadline : ${formatDate(project.deadline)}`
              : 'Pas de deadline'}
          </p>
        </div>
        <StatusPill status={project.status} />
      </div>

      <div className="grid grid-cols-[auto_1fr] gap-4 items-center">
        <ProgressGauge value={project.progress} />
        <div className="space-y-2">
          <div className="text-xs text-muted-foreground flex items-center gap-1">
            <TrendingUp className="h-3.5 w-3.5" />
            Créé le {formatDate(project.created_at)}
          </div>
        </div>
      </div>

      <div className="flex items-center justify-end">
        <Link
          href={`/projects/${project.id}`}
          className="text-sm font-medium text-primary hover:text-blue-600 transition"
        >
          Ouvrir →
        </Link>
      </div>
    </motion.article>
  );
}

/* --------------------- Progress Circle --------------------- */

function ProgressCircle({ value }: { value: number }) {
  const clamped = Math.min(Math.max(value, 0), 100);
  const radius = 44; // visuellement équilibré
  const stroke = 8;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference * (1 - clamped / 100);

  const ref = (node: HTMLDivElement | null) => {
    // just to trigger useInView hook below cleanly
  };

  const containerRef = (useInView as any)
    ? (useInView as (t: any, o?: any) => boolean)
    : null;
  // Basic inView animation without extra deps usage:
  const inViewRef = React.useRef<HTMLDivElement>(null);
  const inView = useInView(inViewRef, { once: true, margin: '-20%' });

  return (
    <div ref={inViewRef} className="relative size-[120px]">
      <svg
        width="120"
        height="120"
        viewBox="0 0 120 120"
        className="-rotate-90"
      >
        {/* Track */}
        <circle
          cx="60"
          cy="60"
          r={radius}
          fill="transparent"
          stroke="hsl(var(--muted))"
          strokeWidth={stroke}
        />
        {/* Animated arc */}
        <motion.circle
          cx="60"
          cy="60"
          r={radius}
          fill="transparent"
          stroke="url(#grad)"
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: inView ? offset : circumference }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
        />
        {/* Gradient for arc */}
        <defs>
          <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="hsl(var(--primary))" />
            <stop offset="100%" stopColor="#22d3ee" />
          </linearGradient>
        </defs>
      </svg>

      {/* Center label */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-2xl font-bold">{clamped}%</span>
        <span className="text-[10px] text-muted-foreground">complété</span>
      </div>
    </div>
  );
}

/* --------------------- Status Pill --------------------- */

function StatusPill({ status }: { status: string | null }) {
  const s = (status ?? 'draft').toLowerCase();
  const map: Record<string, { text: string; cls: string }> = {
    draft: {
      text: 'Brouillon',
      cls: 'bg-gray-400/20 text-gray-700 dark:text-gray-300',
    },
    pending: {
      text: 'Programmé',
      cls: 'bg-amber-400/20 text-amber-700 dark:text-amber-300',
    },
    review: {
      text: 'En cours',
      cls: 'bg-blue-400/20 text-blue-700 dark:text-blue-300',
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
    <span className={`text-xs px-3 py-1 rounded-full font-medium ${cls}`}>
      {text}
    </span>
  );
}

/* --------------------- Utils --------------------- */

function formatDate(d: string) {
  try {
    return new Date(d).toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
  } catch {
    return d;
  }
}
