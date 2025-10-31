'use client';

import { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import {
  Loader2,
  BarChart3,
  PieChart as PieIcon,
  LineChart as LineIcon,
  Calendar as CalendarIcon,
  TrendingUp,
} from 'lucide-react';

import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '@/components/ui/card';

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from '@/components/ui/chart';

import {
  AreaChart,
  Area,
  CartesianGrid,
  XAxis,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Legend,
} from 'recharts';

// -------------------- Types backend --------------------

type StatsPayload = {
  period: { from: string; to: string; months: string[] };
  projects: {
    kpis: {
      active: number;
      scheduled: number;
      completed: number;
      sold: number;
      captured: number;
      ar: number;
    };
    charts: {
      byStatus: { status: string; n: number }[];
      byCategory: { offer_category: string; n: number }[];
      byTier: { offer_tier: string; n: number; revenue: number }[];
      perMonth: { month: string; n: number; trendPct?: number }[];
      soldPerMonth: { month: string; sold: number; trendPct?: number }[];
      capturedPerMonth: {
        month: string;
        captured: number;
        trendPct?: number;
      }[];
      priority: { priority: string; n: number }[];
      risk: { risk_level: string; n: number }[];
      arAging: { bucket: string; amount: number }[];
    };
  };
  submissions: {
    kpis: {
      total: number;
      accepted: number;
      refused: number;
      converted: number;
      conversionRate: number;
    };
    charts: {
      byStatus: { status: string; n: number }[];
      perMonth: { month: string; n: number; trendPct?: number }[];
      byCategory: { offer_category: string; n: number }[];
      byTier: { offer_tier: string; n: number }[];
      adsByMonth: {
        month: string;
        n_ads: number;
        budget_total: number;
        trendPct?: number;
      }[];
    };
  };
};

// -------------------- Style tokens --------------------

const CARD_BASE =
  'rounded-[2rem] border border-neutral-200/50 dark:border-neutral-800/60 bg-white dark:bg-neutral-900 shadow-[0_20px_40px_-8px_rgba(0,0,0,0.08)]';

const KPI_CARD_BASE =
  CARD_BASE + ' relative flex flex-col gap-3 p-6 min-h-[8.5rem]'; // min height => toutes les KPI mêmes dimensions

const fadeInVariants = {
  initial: { opacity: 0, y: 8, filter: 'blur(6px)' },
  animate: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.4 },
  },
} satisfies Record<string, any>;

function formatEuro(v: number) {
  return Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'EUR',
  }).format(v);
}

// -------------------- Bulb info --------------------

function InfoBubble({ hint }: { hint: string }) {
  return (
    <div className="absolute right-4 top-4 group">
      <div className="h-6 w-6 rounded-full bg-neutral-100 dark:bg-neutral-800 border border-neutral-200/60 dark:border-neutral-700/60 text-[10px] font-medium text-neutral-600 dark:text-neutral-300 grid place-items-center leading-none select-none cursor-default">
        i
      </div>
      <div className="pointer-events-none absolute right-0 top-8 z-20 hidden w-[220px] rounded-xl border border-neutral-200/60 dark:border-neutral-700/60 bg-white dark:bg-neutral-900 px-3 py-2 text-[11px] leading-snug text-neutral-700 dark:text-neutral-300 shadow-[0_24px_48px_-8px_rgba(0,0,0,0.4)] group-hover:block">
        {hint}
      </div>
    </div>
  );
}

// -------------------- KPI block --------------------

function KPIBlock({
  label,
  value,
  hint,
}: {
  label: string;
  value: string | number;
  hint: string;
}) {
  return (
    <motion.div {...fadeInVariants}>
      <div className={KPI_CARD_BASE}>
        <InfoBubble hint={hint} />
        <div className="text-[11px] uppercase font-medium tracking-wide text-neutral-500 dark:text-neutral-400">
          {label}
        </div>
        <div className="text-[2rem] font-semibold leading-none text-neutral-900 dark:text-neutral-100 tabular-nums">
          {value}
        </div>
      </div>
    </motion.div>
  );
}

// -------------------- Priority / Risk --------------------

function StatusBlock({
  title,
  hint,
  items,
}: {
  title: string;
  hint: string;
  items: { label: string; value: number | string }[];
}) {
  return (
    <motion.div {...fadeInVariants}>
      <div className={`${CARD_BASE} p-6 flex flex-col gap-4 relative`}>
        <InfoBubble hint={hint} />
        <div className="flex items-center gap-2 text-[13px] font-medium text-neutral-800 dark:text-neutral-200">
          <BarChart3 className="w-4 h-4 text-neutral-400 dark:text-neutral-500" />
          <span>{title}</span>
        </div>

        <div className="flex flex-wrap gap-2">
          {items.map((it, i) => (
            <span
              key={i}
              className="rounded-xl px-3 py-1 text-[12px] font-medium bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-200 shadow-[0_8px_20px_-4px_rgba(0,0,0,0.25)] border border-neutral-200/60 dark:border-neutral-700/60"
            >
              {it.label} : {it.value}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

// -------------------- Footer de tendance --------------------

function TrendingFooter({
  trendPct,
  rangeLabel,
}: {
  trendPct?: number;
  rangeLabel: string;
}) {
  return (
    <CardFooter className="flex-col gap-2 text-sm">
      <div className="flex items-center gap-2 leading-none font-medium text-neutral-800 dark:text-neutral-100">
        {typeof trendPct === 'number' ? (
          <>
            Tendance {trendPct >= 0 ? '↑' : '↓'} {trendPct}%
            <TrendingUp className="h-4 w-4" />
          </>
        ) : (
          <>Évolution</>
        )}
      </div>
      <div className="text-neutral-500 dark:text-neutral-400 leading-none text-[12px]">
        {rangeLabel}
      </div>
    </CardFooter>
  );
}

// -------------------- Main component --------------------

export default function StatsDashboard() {
  const [tab, setTab] = useState<'projects' | 'submissions'>('projects');
  const [from, setFrom] = useState<string>('');
  const [to, setTo] = useState<string>('');
  const [openDate, setOpenDate] = useState(false);
  const [data, setData] = useState<StatsPayload | null>(null);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  // init période = 12 derniers mois
  useEffect(() => {
    if (!from || !to) {
      const now = new Date();
      const todayUTC = new Date(
        Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate())
      );
      const startUTC = new Date(
        Date.UTC(todayUTC.getUTCFullYear(), todayUTC.getUTCMonth() - 11, 1)
      );
      setFrom(startUTC.toISOString().slice(0, 10));
      setTo(todayUTC.toISOString().slice(0, 10));
    }
  }, [from, to]);

  async function load() {
    if (!from || !to) return;
    setLoading(true);
    setErr(null);
    try {
      const q = new URLSearchParams({ from, to }).toString();
      const r = await fetch(`/api/admin/stats?${q}`, { cache: 'no-store' });
      const j = (await r.json()) as StatsPayload;
      if (!r.ok)
        throw new Error((j as any)?.error || 'Erreur chargement stats');

      const patched = normalizeCharts(j);
      setData(patched);
    } catch (e: any) {
      setErr(e?.message || 'Erreur');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [from, to]);

  // Pour les donuts + bar/area
  // On définit une seule couleur de base qu'on projette partout => cohérence
  // hsl(var(--primary)) doit pointer vers ton bleu dans le theme shadcn
  const baseColor = 'hsl(var(--primary))';

  // Pour les donuts: on génère des variations de bleu (opacité différente)
  const donutDataFrom = (pairs: { name: string; value: number }[]) => {
    return pairs.map((seg, i) => {
      // petit offset pour chaque segment (ex: même bleu mais opacité décroissante)
      const alpha = 0.4 + (0.6 * (pairs.length - i)) / pairs.length; // entre ~0.4 et 1
      return {
        ...seg,
        fill: `color-mix(in srgb, ${baseColor} ${Math.round(
          alpha * 100
        )}%, white 0%)`,
      };
    });
  };

  // config ChartContainer générique dynamique:
  function makeConfig(key: string, label: string): ChartConfig {
    return {
      [key]: {
        label,
        color: baseColor,
      },
    };
  }

  // render
  return (
    <section className="max-w-7xl mx-auto px-2 pb-10 space-y-8">
      {/* HEADER */}
      <motion.div
        {...fadeInVariants}
        className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between"
      >
        <div className="flex flex-col gap-2">
          <div className="text-[11px] tracking-[0.18em] uppercase text-muted-foreground">
            Stats
          </div>
          <h1 className="text-2xl md:text-3xl font-semibold tracking-tight leading-tight">
            Statistiques
          </h1>
          <p className="text-sm text-muted-foreground max-w-prose">
            Vue business, pipeline et conversion. Données agrégées sur la
            période sélectionnée.{' '}
          </p>
        </div>

        {/* DATE RANGE */}
        <div className="flex items-center flex-wrap gap-3">
          <Popover open={openDate} onOpenChange={setOpenDate}>
            <PopoverTrigger asChild>
              <button className="h-11 px-4 rounded-[2rem] border border-neutral-200/50 dark:border-neutral-800/60 bg-white dark:bg-neutral-900 text-sm text-neutral-700 dark:text-neutral-200 flex items-center gap-2 shadow-[0_20px_40px_-8px_rgba(0,0,0,0.08)] hover:bg-neutral-50 dark:hover:bg-neutral-800 transition">
                <CalendarIcon className="w-4 h-4 text-neutral-400 dark:text-neutral-500" />
                <span className="font-medium tabular-nums">
                  {from} → {to}
                </span>
              </button>
            </PopoverTrigger>

            <PopoverContent
              className="w-auto p-4 rounded-[2rem] border border-neutral-200/50 dark:border-neutral-800/60 bg-white dark:bg-neutral-900 shadow-[0_24px_48px_-8px_rgba(0,0,0,0.4)] flex flex-col sm:flex-row gap-4"
              align="end"
            >
              {/*
                IMPORTANT:
                - on interdit le futur
                - on autorise le passé
              */}
              {/* FROM */}
              <div className="flex flex-col gap-2">
                <span className="text-[11px] font-medium uppercase tracking-wide text-neutral-500 dark:text-neutral-400">
                  Début
                </span>
                <Calendar
                  mode="single"
                  selected={from ? new Date(from) : undefined}
                  onSelect={(d: Date | undefined) => {
                    if (!d) return;
                    const today = startOfDayUTC(new Date());
                    if (d > today) return; // refuse futur
                    setFrom(toISODateUTC(d));
                  }}
                  disabled={(date) => date > startOfDayUTC(new Date())}
                  className="rounded-[2rem] border border-neutral-200/50 dark:border-neutral-800/60 bg-white dark:bg-neutral-900 shadow-sm"
                />
              </div>

              {/* TO */}
              <div className="flex flex-col gap-2">
                <span className="text-[11px] font-medium uppercase tracking-wide text-neutral-500 dark:text-neutral-400">
                  Fin
                </span>
                <Calendar
                  mode="single"
                  selected={to ? new Date(to) : undefined}
                  onSelect={(d: Date | undefined) => {
                    if (!d) return;
                    const today = startOfDayUTC(new Date());
                    if (d > today) return;
                    setTo(toISODateUTC(d));
                  }}
                  disabled={(date) => date > startOfDayUTC(new Date())}
                  className="rounded-[2rem] border border-neutral-200/50 dark:border-neutral-800/60 bg-white dark:bg-neutral-900 shadow-sm"
                />
              </div>

              {/* ACTIONS */}
              <div className="flex flex-col justify-end gap-2 min-w-[160px]">
                <Button
                  onClick={() => {
                    const today = startOfDayUTC(new Date());
                    const start = new Date(
                      Date.UTC(
                        today.getUTCFullYear(),
                        today.getUTCMonth() - 11,
                        1
                      )
                    );
                    setFrom(toISODateUTC(start));
                    setTo(toISODateUTC(today));
                  }}
                  className="h-10 rounded-[1rem] bg-neutral-100 text-neutral-700 hover:bg-neutral-200 dark:bg-neutral-800 dark:text-neutral-200 dark:hover:bg-neutral-700 text-[12px] font-medium shadow-sm"
                  variant="secondary"
                >
                  12 derniers mois
                </Button>

                <Button
                  onClick={() => {
                    setOpenDate(false);
                    load();
                  }}
                  className="h-10 rounded-[1rem] bg-primary text-white hover:bg-primary/90 text-[12px] font-medium shadow-sm"
                >
                  Appliquer
                </Button>
              </div>
            </PopoverContent>
          </Popover>

          <Button
            className="h-11 rounded-[2rem] bg-primary text-white hover:bg-primary/90 text-sm font-medium shadow-[0_20px_40px_-8px_rgba(0,0,0,0.08)]"
            onClick={load}
          >
            Actualiser
          </Button>
        </div>
      </motion.div>

      {/* TABS */}
      <Tabs
        value={tab}
        onValueChange={(v: any) => setTab(v)}
        className="w-full space-y-8"
      >
        <motion.div {...fadeInVariants}>
          <TabsList className="inline-flex rounded-[2rem] bg-neutral-100 dark:bg-neutral-800 p-1 h-11 border border-neutral-200/50 dark:border-neutral-800/60 w-fit">
            <TabsTrigger
              value="projects"
              className={`px-4 h-9 text-sm font-medium rounded-[1rem] transition-colors ${
                tab === 'projects'
                  ? 'bg-white text-neutral-900 dark:bg-neutral-900 dark:text-white shadow-sm border border-neutral-200/50 dark:border-neutral-700/60'
                  : 'text-neutral-500 dark:text-neutral-400'
              }`}
            >
              Projets
            </TabsTrigger>

            <TabsTrigger
              value="submissions"
              className={`px-4 h-9 text-sm font-medium rounded-[1rem] transition-colors ${
                tab === 'submissions'
                  ? 'bg-white text-neutral-900 dark:bg-neutral-900 dark:text-white shadow-sm border border-neutral-200/50 dark:border-neutral-700/60'
                  : 'text-neutral-500 dark:text-neutral-400'
              }`}
            >
              Demandes
            </TabsTrigger>
          </TabsList>
        </motion.div>

        {loading && (
          <div className="flex items-center gap-2 text-neutral-500 dark:text-neutral-400 text-sm">
            <Loader2 className="h-4 w-4 animate-spin" />
            Chargement…
          </div>
        )}

        {err && <div className="text-rose-600 text-sm font-medium">{err}</div>}

        {!loading && data && (
          <>
            {/* ======================= PROJETS ======================= */}
            <TabsContent value="projects" className="space-y-8">
              {/* KPIs */}
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                <KPIBlock
                  label="Projets actifs"
                  value={data.projects.kpis.active}
                  hint="Projets en production actuellement (ni terminés ni abandonnés)."
                />
                <KPIBlock
                  label="Planifiés"
                  value={data.projects.kpis.scheduled}
                  hint="Projets signés / validés mais pas encore démarrés."
                />
                <KPIBlock
                  label="Terminés"
                  value={data.projects.kpis.completed}
                  hint="Projets livrés et considérés comme 'done'."
                />
                <KPIBlock
                  label="CA signé"
                  value={formatEuro(data.projects.kpis.sold)}
                  hint="Montant total vendu et accepté par les clients (devis signé)."
                />
                <KPIBlock
                  label="Encaissements"
                  value={formatEuro(data.projects.kpis.captured)}
                  hint="Somme réellement payée / encaissée sur la période."
                />
                <KPIBlock
                  label="À encaisser"
                  value={formatEuro(data.projects.kpis.ar)}
                  hint="Montant restant dû (facturé mais pas encore payé)."
                />
              </div>

              {/* CHART GRID */}
              <div className="grid gap-6 lg:grid-cols-2">
                {/* Projets par statut (bar) */}
                <ChartBlockBar
                  title="Projets par statut"
                  description="Répartition du pipeline par état"
                  chartKey="count"
                  labelKey="label"
                  data={data.projects.charts.byStatus.map((d) => ({
                    label: d.status,
                    count: d.n,
                  }))}
                  makeConfig={makeConfig}
                />

                {/* Catégorie (donut) */}
                <ChartBlockDonut
                  title="Par catégorie"
                  description="Catégories d'offre"
                  data={donutDataFrom(
                    data.projects.charts.byCategory.map((d) => ({
                      name: d.offer_category,
                      value: d.n,
                    }))
                  )}
                  baseColor={baseColor}
                />

                {/* Tier volume (donut) */}
                <ChartBlockDonut
                  title="Par tier (volume)"
                  description="Nb projets / tier"
                  data={donutDataFrom(
                    data.projects.charts.byTier.map((d) => ({
                      name: d.offer_tier,
                      value: d.n,
                    }))
                  )}
                  baseColor={baseColor}
                />

                {/* Tier CA (donut) */}
                <ChartBlockDonut
                  title="Par tier (€ CA)"
                  description="Poids CA par tier"
                  data={donutDataFrom(
                    data.projects.charts.byTier.map((d) => ({
                      name: d.offer_tier,
                      value: d.revenue,
                    }))
                  )}
                  baseColor={baseColor}
                />

                {/* Créations / mois (area) */}
                <ChartBlockArea
                  title="Nouveaux projets / mois"
                  description="Créations par mois"
                  chartKey="value"
                  labelKey="month"
                  data={data.projects.charts.perMonth.map((d) => ({
                    month: d.month,
                    value: d.n,
                    _trend: d.trendPct,
                  }))}
                  makeConfig={makeConfig}
                  footerRange={`${from} → ${to}`}
                  footerTrendPct={getLastTrend(
                    data.projects.charts.perMonth.map((d) => d.trendPct)
                  )}
                />

                {/* CA signé / mois (area) */}
                <ChartBlockArea
                  title="CA signé / mois (€)"
                  description="Valeur vendue chaque mois"
                  chartKey="value"
                  labelKey="month"
                  data={data.projects.charts.soldPerMonth.map((d) => ({
                    month: d.month,
                    value: d.sold,
                    _trend: d.trendPct,
                  }))}
                  makeConfig={makeConfig}
                  footerRange={`${from} → ${to}`}
                  footerTrendPct={getLastTrend(
                    data.projects.charts.soldPerMonth.map((d) => d.trendPct)
                  )}
                />

                {/* Encaissements / mois (area) */}
                <ChartBlockArea
                  title="Encaissements / mois (€)"
                  description="Montant encaissé par mois"
                  chartKey="value"
                  labelKey="month"
                  data={data.projects.charts.capturedPerMonth.map((d) => ({
                    month: d.month,
                    value: d.captured,
                    _trend: d.trendPct,
                  }))}
                  makeConfig={makeConfig}
                  footerRange={`${from} → ${to}`}
                  footerTrendPct={getLastTrend(
                    data.projects.charts.capturedPerMonth.map((d) => d.trendPct)
                  )}
                />

                {/* AR Aging (bar) */}
                <ChartBlockBar
                  title="Aging des AR"
                  description="Montants impayés par retard"
                  chartKey="value"
                  labelKey="label"
                  data={data.projects.charts.arAging.map((d) => ({
                    label: d.bucket,
                    value: d.amount,
                  }))}
                  makeConfig={makeConfig}
                  valueFormatter={(val, row) => {
                    // val est la barre (montant), row.value doit exister aussi
                    const numeric =
                      typeof val === 'number'
                        ? val
                        : typeof row.value === 'number'
                          ? row.value
                          : 0;
                    return formatEuro(numeric);
                  }}
                />

                {/* Priorité globale */}
                <StatusBlock
                  title="Priorité globale"
                  hint="Résumé du nombre de projets marqués haute/moyenne/basse priorité par les équipes."
                  items={summarizePriority(data.projects.charts.priority)}
                />

                {/* Risque global */}
                <StatusBlock
                  title="Niveau de risque global"
                  hint="Résumé du nombre de projets identifiés comme risqués (retards, scope flou, client instable...)."
                  items={summarizeRisk(data.projects.charts.risk)}
                />
              </div>
            </TabsContent>

            {/* ======================= DEMANDES ======================= */}
            <TabsContent value="submissions" className="space-y-8">
              {/* KPIs */}
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <KPIBlock
                  label="Demandes reçues"
                  value={data.submissions.kpis.total}
                  hint="Leads soumis (tous canaux)."
                />
                <KPIBlock
                  label="Acceptées"
                  value={data.submissions.kpis.accepted}
                  hint="Leads qualifiés / pertinents."
                />
                <KPIBlock
                  label="Refusées"
                  value={data.submissions.kpis.refused}
                  hint="Non retenus (budget trop bas, hors scope...)."
                />
                <KPIBlock
                  label="Conversion ≈"
                  value={`${data.submissions.kpis.conversionRate}%`}
                  hint="Taux: demandes acceptées → projets signés."
                />
              </div>

              {/* CHART GRID */}
              <div className="grid gap-6 lg:grid-cols-2">
                {/* Demandes par statut */}
                <ChartBlockBar
                  title="Demandes par statut"
                  description="État des leads"
                  chartKey="value"
                  labelKey="label"
                  data={data.submissions.charts.byStatus.map((d) => ({
                    label: d.status,
                    value: d.n,
                  }))}
                  makeConfig={makeConfig}
                />

                {/* Demandes entrantes / mois */}
                <ChartBlockArea
                  title="Demandes entrantes / mois"
                  description="Nouveaux leads par mois"
                  chartKey="value"
                  labelKey="month"
                  data={data.submissions.charts.perMonth.map((d) => ({
                    month: d.month,
                    value: d.n,
                    _trend: d.trendPct,
                  }))}
                  makeConfig={makeConfig}
                  footerRange={`${from} → ${to}`}
                  footerTrendPct={getLastTrend(
                    data.submissions.charts.perMonth.map((d) => d.trendPct)
                  )}
                />

                {/* Catégories demandées */}
                <ChartBlockDonut
                  title="Catégories demandées"
                  description="Type de besoin exprimé"
                  data={donutDataFrom(
                    data.submissions.charts.byCategory.map((d) => ({
                      name: d.offer_category,
                      value: d.n,
                    }))
                  )}
                  baseColor={baseColor}
                />

                {/* Tier demandé */}
                <ChartBlockDonut
                  title="Tier demandé"
                  description="Niveau d'offre estimé"
                  data={donutDataFrom(
                    data.submissions.charts.byTier.map((d) => ({
                      name: d.offer_tier,
                      value: d.n,
                    }))
                  )}
                  baseColor={baseColor}
                />

                {/* Ads / Budget */}
                <ChartBlockBar
                  title="Demandes Ads / Budget"
                  description="#briefs Ads par mois (tooltip: budget total annoncé)"
                  chartKey="leads"
                  labelKey="month"
                  data={data.submissions.charts.adsByMonth.map((d) => ({
                    month: d.month,
                    leads: d.n_ads,
                    budget_total: d.budget_total,
                  }))}
                  makeConfig={makeConfig}
                  valueFormatter={(val, row) => {
                    // val = leads pour ce mois
                    const leadsValue =
                      typeof val === 'number'
                        ? val
                        : typeof row.leads === 'number'
                          ? row.leads
                          : 0;
                    const budgetDisplay = formatEuro(
                      typeof row.budget_total === 'number'
                        ? row.budget_total
                        : 0
                    );
                    return `${leadsValue} — Budget ${budgetDisplay}`;
                  }}
                />
              </div>
            </TabsContent>
          </>
        )}
      </Tabs>
    </section>
  );
}

// -------------------- Utils (pure JS, pas d'erreur) --------------------

// normalise les données backend pour qu'on ait toujours les mêmes clés côté charts
function normalizeCharts(raw: StatsPayload): StatsPayload {
  // ici pas besoin de renommer tout puisque j'ai géré la translation au moment du mapping
  return raw;
}

// on prend le dernier pourcentage de tendance dispo
function getLastTrend(arr: (number | undefined)[]): number | undefined {
  for (let i = arr.length - 1; i >= 0; i--) {
    if (typeof arr[i] === 'number') return arr[i];
  }
  return undefined;
}

function summarizePriority(priorityData: { priority: string; n: number }[]) {
  return priorityData.map((p) => ({
    label: capitalize(p.priority),
    value: p.n,
  }));
}

function summarizeRisk(riskData: { risk_level: string; n: number }[]) {
  return riskData.map((p) => ({
    label: capitalize(p.risk_level),
    value: p.n,
  }));
}

function capitalize(str: string) {
  if (!str) return str;
  return str[0].toUpperCase() + str.slice(1);
}

// empêche qu'on choisisse une date future
function startOfDayUTC(d: Date) {
  return new Date(
    Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate())
  );
}
function toISODateUTC(d: Date) {
  return new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate()))
    .toISOString()
    .slice(0, 10);
}

// -------------------- Chart Blocks --------------------

// NOTE IMPORTANTE :
// on est alignés sur l'API réelle de shadcn charts :
// - ChartContainer({ config }) => définit des CSS vars du style --color-[key]
// - ensuite on fait fill={`var(--color-${key})`}
// - ChartTooltipContent accepte `formatter?: (value, name, item) => string`
//   et `hideLabel?: boolean` et `indicator?: "line" | "dot" | ...`
// DONC pas d'erreur TypeScript ici.

type RowData = Record<string, any>;

function ChartBlockArea({
  title,
  description,
  chartKey,
  labelKey,
  data,
  makeConfig,
  footerRange,
  footerTrendPct,
}: {
  title: string;
  description: string;
  chartKey: string; // ex: "value"
  labelKey: string; // ex: "month"
  data: RowData[];
  makeConfig: (key: string, label: string) => ChartConfig;
  footerRange: string;
  footerTrendPct?: number;
}) {
  const config = useMemo(
    () => makeConfig(chartKey, title),
    [chartKey, title, makeConfig]
  );

  return (
    <motion.div {...fadeInVariants}>
      <Card className={`${CARD_BASE} flex h-full flex-col`}>
        <CardHeader className="px-6 pt-6 pb-3">
          <div className="flex flex-col gap-1">
            <CardTitle className="text-[13px] font-medium text-neutral-800 dark:text-neutral-200 flex items-center gap-2">
              <LineIcon className="w-4 h-4 text-neutral-400 dark:text-neutral-500" />
              {title}
            </CardTitle>
            <CardDescription className="text-[12px] text-neutral-500 dark:text-neutral-400">
              {description}
            </CardDescription>
          </div>
        </CardHeader>

        <CardContent className="px-6 pb-0">
          <ChartContainer config={config} className="w-full">
            <AreaChart
              data={data}
              margin={{
                left: 12,
                right: 12,
              }}
            >
              {/* lignes horizontales soft, pas verticales */}
              <CartesianGrid vertical={false} stroke="rgba(0,0,0,0.04)" />
              <XAxis
                dataKey={labelKey}
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                // formatter: on affiche juste les 3 premières lettres du mois si c'est un mois style "2025-01"
                tickFormatter={(raw: string) => {
                  // si raw est "2025-01" -> on peut retourner "Jan"
                  // fallback: raw.slice(0,3)
                  return shortLabel(raw);
                }}
                stroke="#6b7280"
                tick={{
                  fill: '#6b7280',
                  fontSize: 11,
                  fontFamily: 'Inter, system-ui, sans-serif',
                }}
              />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent indicator="line" />}
              />
              <Area
                dataKey={chartKey}
                type="natural"
                // couleur cohérente
                fill={`var(--color-${chartKey})`}
                stroke={`var(--color-${chartKey})`}
                fillOpacity={0.4}
                strokeWidth={2}
              />
            </AreaChart>
          </ChartContainer>
        </CardContent>

        <TrendingFooter trendPct={footerTrendPct} rangeLabel={footerRange} />
      </Card>
    </motion.div>
  );
}

interface BarPoint {
  label?: string;
  value?: number;
  count?: number;
  month?: string;
  leads?: number;
  budget_total?: number;
}

function ChartBlockBar(props: {
  title: string;
  description: string;
  chartKey: keyof BarPoint;
  labelKey: keyof BarPoint;
  data: ReadonlyArray<BarPoint>;
  makeConfig: (key: string, label: string) => ChartConfig;
  valueFormatter?: (value: string | number, row: BarPoint) => string;
}) {
  const {
    title,
    description,
    chartKey,
    labelKey,
    data,
    makeConfig,
    valueFormatter,
  } = props;

  const config = useMemo(
    () => makeConfig(String(chartKey), title),
    [chartKey, title, makeConfig]
  );

  // copie mutable pour Recharts (sinon erreur readonly)
  const mutableData: BarPoint[] = [...data];

  // ✅ formatter compatible Recharts
  // pas de types explicites sur les params -> TS va matcher Formatter<ValueType, NameType>
  function finalFormatter(
    valueIn: string | number | ReadonlyArray<string | number>,
    _name: string | number,
    payloadItem: { payload?: BarPoint }
  ): string {
    // on récupère une valeur primitive stable
    let rawValUnknown: unknown = '';

    if (Array.isArray(valueIn)) {
      rawValUnknown = valueIn[0] ?? '';
    } else if (valueIn !== undefined && valueIn !== null) {
      rawValUnknown = valueIn;
    }

    // on normalise en string | number pour passer à valueFormatter
    const rawValPrimitive =
      typeof rawValUnknown === 'string' || typeof rawValUnknown === 'number'
        ? rawValUnknown
        : '';

    const row: BarPoint | undefined = payloadItem.payload;

    if (valueFormatter && row) {
      return valueFormatter(rawValPrimitive, row);
    }

    return String(rawValPrimitive);
  }

  return (
    <motion.div variants={fadeInVariants} initial="initial" animate="animate">
      <Card className={`${CARD_BASE} flex h-full flex-col`}>
        <CardHeader className="px-6 pt-6 pb-3">
          <div className="flex flex-col gap-1">
            <CardTitle className="text-[13px] font-medium text-neutral-800 dark:text-neutral-200 flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-neutral-400 dark:text-neutral-500" />
              {title}
            </CardTitle>
            <CardDescription className="text-[12px] text-neutral-500 dark:text-neutral-400">
              {description}
            </CardDescription>
          </div>
        </CardHeader>

        <CardContent className="px-6 pb-6">
          <ChartContainer config={config} className="w-full">
            <BarChart data={mutableData}>
              <CartesianGrid vertical={false} stroke="rgba(0,0,0,0.04)" />
              <XAxis
                dataKey={String(labelKey)}
                tickLine={false}
                axisLine={false}
                tickMargin={10}
                tickFormatter={(raw: string) => truncateLabel(raw)}
                stroke="#6b7280"
                tick={{
                  fill: '#6b7280',
                  fontSize: 11,
                  fontFamily: 'Inter, system-ui, sans-serif',
                }}
              />
              <ChartTooltip
                cursor={false}
                content={
                  <ChartTooltipContent hideLabel formatter={finalFormatter} />
                }
              />
              <Bar
                dataKey={String(chartKey)}
                fill={`var(--color-${String(chartKey)})`}
                radius={20}
              />
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </motion.div>
  );
}

function ChartBlockDonut({
  title,
  description,
  data,
  baseColor,
}: {
  title: string;
  description: string;
  data: { name: string; value: number; fill: string }[];
  baseColor: string;
}) {
  // on affiche la légende pour lire les noms
  return (
    <motion.div {...fadeInVariants}>
      <Card className={`${CARD_BASE} flex h-full flex-col`}>
        <CardHeader className="px-6 pt-6 pb-3">
          <div className="flex flex-col gap-1">
            <CardTitle className="text-[13px] font-medium text-neutral-800 dark:text-neutral-200 flex items-center gap-2">
              <PieIcon className="w-4 h-4 text-neutral-400 dark:text-neutral-500" />
              {title}
            </CardTitle>
            <CardDescription className="text-[12px] text-neutral-500 dark:text-neutral-400">
              {description}
            </CardDescription>
          </div>
        </CardHeader>

        <CardContent className="px-6 pb-0 flex-1">
          <ChartContainer
            // même principe config, pour cohérence visuelle :
            config={{
              segment: {
                label: title,
                color: baseColor,
              },
            }}
            className="mx-auto aspect-square max-h-[250px] w-full"
          >
            <PieChart>
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <Pie
                data={data}
                dataKey="value"
                nameKey="name"
                innerRadius={60}
                strokeWidth={5}
              >
                {data.map((seg, idx) => (
                  <path
                    // Recharts attend pas path direct normalement, mais TS sans erreur:
                    // on laisse Pie gérer les <path>. Le map manuel pour fill ne casse pas TS
                    // => On passe fill via data, pas besoin d'un renderCustom ici
                    key={idx}
                  />
                ))}
              </Pie>
              <Legend />
            </PieChart>
          </ChartContainer>
        </CardContent>

        <CardFooter className="px-6 pb-6 text-[12px] text-neutral-500 dark:text-neutral-400">
          Répartition par segment
        </CardFooter>
      </Card>
    </motion.div>
  );
}

// -------------------- label utils pour les axes --------------------

// transforme "2025-01" -> "Jan", "2025-02" -> "Fév", etc.
// si c'est déjà un libellé court, on renvoie tel quel
function shortLabel(raw: string): string {
  // on tente YYYY-MM
  const m = raw.match(/^(\d{4})-(\d{2})$/);
  if (m) {
    const monthIdx = Number(m[2]); // 1-12
    const monthsFR = [
      'Jan',
      'Fév',
      'Mar',
      'Avr',
      'Mai',
      'Juin',
      'Juil',
      'Aoû',
      'Sep',
      'Oct',
      'Nov',
      'Déc',
    ];
    const label = monthsFR[monthIdx - 1] || raw;
    return label;
  }
  // fallback: si "Janvier", on coupe à 3 lettres
  if (raw.length > 4) return raw.slice(0, 3);
  return raw;
}

// pour les bar charts: raccourcir les labels trop longs
function truncateLabel(raw: string): string {
  if (raw.length > 10) return raw.slice(0, 10) + '…';
  return raw;
}
