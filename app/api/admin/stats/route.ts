// app/api/admin/stats/route.ts
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

import { NextResponse } from 'next/server';
import { cookies, headers } from 'next/headers';
import { createServerClient } from '@supabase/ssr';

// ---- Types ----
type ProjectRow = {
  id: string;
  created_at: string;
  start_at: string | null;
  deadline: string | null;
  status: string | null;
  progress: number | null;
  offer_category: string | null;
  offer_tier: string | null;
  offer_price: number | null;
  payment_captured: number | null;
  priority: string | null;
  risk_level: string | null;
  client_email: string | null;
};

type SubmissionRow = {
  id: string;
  created_at: string;
  status: string | null;
  email: string | null;
  offer_category: string | null;
  offer_tier: string | null;
  wants_ads: boolean | null;
  ads_budget: number | null;
};

// ---- Utils ----
function toYyyyMm(d: string | Date) {
  const dt = new Date(d);
  const y = dt.getUTCFullYear();
  const m = String(dt.getUTCMonth() + 1).padStart(2, '0');
  return `${y}-${m}`;
}

function monthSpan(from: Date, to: Date) {
  const list: string[] = [];
  // normalize to first of month UTC
  const cur = new Date(Date.UTC(from.getUTCFullYear(), from.getUTCMonth(), 1));
  const end = new Date(Date.UTC(to.getUTCFullYear(), to.getUTCMonth(), 1));
  while (cur <= end) {
    const y = cur.getUTCFullYear();
    const m = String(cur.getUTCMonth() + 1).padStart(2, '0');
    list.push(`${y}-${m}`);
    cur.setUTCMonth(cur.getUTCMonth() + 1);
  }
  return list;
}

export async function GET(req: Request) {
  try {
    // ----- 1. Récup période -----
    const u = new URL(req.url);
    const qsFrom = u.searchParams.get('from');
    const qsTo = u.searchParams.get('to');

    const now = new Date();
    const defTo = new Date(
      Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate())
    );
    const defFrom = new Date(
      Date.UTC(defTo.getUTCFullYear(), defTo.getUTCMonth() - 11, 1)
    );

    const from = qsFrom ? new Date(qsFrom) : defFrom;
    const to = qsTo ? new Date(qsTo) : defTo;

    // jour de fin inclus => on ajoute 1 jour pour le <=
    const toPlusOneIso = new Date(
      to.getTime() + 24 * 3600 * 1000
    ).toISOString();

    // ----- 2. Supabase server client -----
    const cookieStore = await cookies();
    const headerList = await headers();
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: { get: (n: string) => cookieStore.get(n)?.value },
        global: {
          headers: {
            'x-forwarded-for': headerList.get('x-forwarded-for') ?? '',
          },
        },
      }
    );

    // auth
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    }

    // must be admin
    const { data: meProfile } = await supabase
      .from('profiles')
      .select('role')
      .eq('id', user.id)
      .maybeSingle();

    if (!meProfile || meProfile.role !== 'admin') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    // ----- 3. Fetch data -----
    const { data: projectsData, error: projErr } = await supabase
      .from('projects')
      .select(
        `
        id,
        created_at,
        start_at,
        deadline,
        status,
        progress,
        offer_category,
        offer_tier,
        offer_price,
        payment_captured,
        priority,
        risk_level,
        client_email
      `
      )
      .gte('created_at', from.toISOString())
      .lte('created_at', toPlusOneIso);

    if (projErr) {
      return NextResponse.json(
        { error: projErr.message || 'projects fetch failed' },
        { status: 500 }
      );
    }

    const projectsRaw: ProjectRow[] = Array.isArray(projectsData)
      ? (projectsData as ProjectRow[])
      : [];

    const { data: subsData, error: subsErr } = await supabase
      .from('submissions')
      .select(
        `
        id,
        created_at,
        status,
        email,
        offer_category,
        offer_tier,
        wants_ads,
        ads_budget
      `
      )
      .gte('created_at', from.toISOString())
      .lte('created_at', toPlusOneIso);

    if (subsErr) {
      return NextResponse.json(
        { error: subsErr.message || 'submissions fetch failed' },
        { status: 500 }
      );
    }

    const submissionsRaw: SubmissionRow[] = Array.isArray(subsData)
      ? (subsData as SubmissionRow[])
      : [];

    // ----- 4. Pré-calculs communs -----
    const months = monthSpan(from, to);

    // emails projets (pour approx conversion)
    const projEmails = new Set(
      projectsRaw
        .map((p) => (p.client_email || '').trim().toLowerCase())
        .filter(Boolean)
    );

    // ----- 5. KPIs Projects -----
    const activeCount = projectsRaw.filter(
      (p) => p.status === 'in_progress'
    ).length;
    const scheduledCount = projectsRaw.filter(
      (p) => p.status === 'scheduled'
    ).length;
    const completedCount = projectsRaw.filter(
      (p) => p.status === 'completed'
    ).length;

    const totalSold = projectsRaw.reduce(
      (sum, p) => sum + Number(p.offer_price || 0),
      0
    );
    const totalCaptured = projectsRaw.reduce(
      (sum, p) => sum + Number(p.payment_captured || 0),
      0
    );
    const totalAR = Math.max(totalSold - totalCaptured, 0);

    const kpiProjects = {
      active: activeCount,
      scheduled: scheduledCount,
      completed: completedCount,
      sold: totalSold,
      captured: totalCaptured,
      ar: totalAR,
    };

    // ----- 6. Charts Projects -----

    // 6.1 byStatus
    const byStatusMap: Record<string, number> = {};
    for (const p of projectsRaw) {
      const key = p.status || '—';
      byStatusMap[key] = (byStatusMap[key] ?? 0) + 1;
    }
    const chartProjectsByStatus = Object.entries(byStatusMap).map(
      ([status, n]) => ({ status, n })
    );

    // 6.2 byCategory
    const byCatMap: Record<string, number> = {};
    for (const p of projectsRaw) {
      const key = p.offer_category || '—';
      byCatMap[key] = (byCatMap[key] ?? 0) + 1;
    }
    const chartProjectsByCategory = Object.entries(byCatMap).map(
      ([offer_category, n]) => ({ offer_category, n })
    );

    // 6.3 byTier (count + revenue)
    const tierCount: Record<string, number> = {};
    const tierRevenue: Record<string, number> = {};
    for (const p of projectsRaw) {
      const t = p.offer_tier || '—';
      tierCount[t] = (tierCount[t] ?? 0) + 1;
      tierRevenue[t] = (tierRevenue[t] ?? 0) + Number(p.offer_price || 0);
    }
    const tiersAll = new Set([
      ...Object.keys(tierCount),
      ...Object.keys(tierRevenue),
    ]);
    const chartProjectsByTier = Array.from(tiersAll).map((offer_tier) => ({
      offer_tier,
      n: tierCount[offer_tier] ?? 0,
      revenue: tierRevenue[offer_tier] ?? 0,
    }));

    // 6.4 perMonth: créations
    const monthCount: Record<string, number> = {};
    for (const m of months) monthCount[m] = 0;
    for (const p of projectsRaw) {
      const m = toYyyyMm(p.created_at);
      if (m in monthCount) monthCount[m] += 1;
    }
    const chartProjectsPerMonth = months.map((month) => ({
      month,
      n: monthCount[month] || 0,
    }));

    // 6.5 soldPerMonth
    const soldPerMonthMap: Record<string, number> = {};
    for (const m of months) soldPerMonthMap[m] = 0;
    for (const p of projectsRaw) {
      const m = toYyyyMm(p.created_at);
      if (m in soldPerMonthMap) {
        soldPerMonthMap[m] += Number(p.offer_price || 0);
      }
    }
    const chartSoldPerMonth = months.map((month) => ({
      month,
      sold: soldPerMonthMap[month] || 0,
    }));

    // 6.6 capturedPerMonth
    const capturedPerMonthMap: Record<string, number> = {};
    for (const m of months) capturedPerMonthMap[m] = 0;
    for (const p of projectsRaw) {
      const m = toYyyyMm(p.created_at);
      if (m in capturedPerMonthMap) {
        capturedPerMonthMap[m] += Number(p.payment_captured || 0);
      }
    }
    const chartCapturedPerMonth = months.map((month) => ({
      month,
      captured: capturedPerMonthMap[month] || 0,
    }));

    // 6.7 priority
    const priorityMap: Record<string, number> = {};
    for (const p of projectsRaw) {
      const key = p.priority || '—';
      priorityMap[key] = (priorityMap[key] ?? 0) + 1;
    }
    const chartPriority = Object.entries(priorityMap).map(([priority, n]) => ({
      priority,
      n,
    }));

    // 6.8 risk
    const riskMap: Record<string, number> = {};
    for (const p of projectsRaw) {
      const key = p.risk_level || '—';
      riskMap[key] = (riskMap[key] ?? 0) + 1;
    }
    const chartRisk = Object.entries(riskMap).map(([risk_level, n]) => ({
      risk_level,
      n,
    }));

    // 6.9 AR aging
    // bucketize par "ancienneté" du projet
    const arAgingBuckets = {
      '<30j': 0,
      '30–60j': 0,
      '>60j': 0,
    } as Record<string, number>;
    for (const p of projectsRaw) {
      const due = Number(p.offer_price || 0) - Number(p.payment_captured || 0);
      if (due > 0) {
        const createdDays = Math.floor(
          (Date.now() - new Date(p.created_at).getTime()) / 86400000
        );
        if (createdDays < 30) {
          arAgingBuckets['<30j'] += due;
        } else if (createdDays < 60) {
          arAgingBuckets['30–60j'] += due;
        } else {
          arAgingBuckets['>60j'] += due;
        }
      }
    }
    const chartARAging = Object.entries(arAgingBuckets).map(
      ([bucket, amount]) => ({ bucket, amount })
    );

    // ----- 7. KPIs Submissions -----
    const subsTotal = submissionsRaw.length;
    const subsAccepted = submissionsRaw.filter(
      (s) => s.status === 'accepted'
    ).length;
    const subsRefused = submissionsRaw.filter(
      (s) => s.status === 'refused'
    ).length;

    // approx conversion via email match
    const subsEmails = submissionsRaw
      .map((s) => (s.email || '').trim().toLowerCase())
      .filter((e) => !!e);
    const converted = subsEmails.filter((e) => projEmails.has(e)).length;
    const conversionRate = subsTotal > 0 ? (converted / subsTotal) * 100 : 0;

    const kpiSubmissions = {
      total: subsTotal,
      accepted: subsAccepted,
      refused: subsRefused,
      converted,
      conversionRate: Math.round(conversionRate * 10) / 10,
    };

    // ----- 8. Charts Submissions -----

    // 8.1 byStatus
    const subsStatusMap: Record<string, number> = {};
    for (const s of submissionsRaw) {
      const key = s.status || '—';
      subsStatusMap[key] = (subsStatusMap[key] ?? 0) + 1;
    }
    const chartSubsByStatus = Object.entries(subsStatusMap).map(
      ([status, n]) => ({ status, n })
    );

    // 8.2 perMonth
    const subsMonthMap: Record<string, number> = {};
    for (const m of months) subsMonthMap[m] = 0;
    for (const s of submissionsRaw) {
      const m = toYyyyMm(s.created_at);
      if (m in subsMonthMap) subsMonthMap[m] += 1;
    }
    const chartSubsPerMonth = months.map((month) => ({
      month,
      n: subsMonthMap[month] || 0,
    }));

    // 8.3 byCategory
    const subsCatMap: Record<string, number> = {};
    for (const s of submissionsRaw) {
      const key = s.offer_category || '—';
      subsCatMap[key] = (subsCatMap[key] ?? 0) + 1;
    }
    const chartSubsByCategory = Object.entries(subsCatMap).map(
      ([offer_category, n]) => ({ offer_category, n })
    );

    // 8.4 byTier
    const subsTierMap: Record<string, number> = {};
    for (const s of submissionsRaw) {
      const key = s.offer_tier || '—';
      subsTierMap[key] = (subsTierMap[key] ?? 0) + 1;
    }
    const chartSubsByTier = Object.entries(subsTierMap).map(
      ([offer_tier, n]) => ({ offer_tier, n })
    );

    // 8.5 adsByMonth
    // n_ads = nb de demandes wants_ads=true
    // budget_total = somme ads_budget
    const adsCountMap: Record<string, number> = {};
    const adsBudgetMap: Record<string, number> = {};
    for (const m of months) {
      adsCountMap[m] = 0;
      adsBudgetMap[m] = 0;
    }
    for (const s of submissionsRaw) {
      const m = toYyyyMm(s.created_at);
      if (!(m in adsCountMap)) continue;
      if (s.wants_ads) {
        adsCountMap[m] += 1;
      }
      adsBudgetMap[m] += Number(s.ads_budget || 0);
    }
    const chartSubsAdsByMonth = months.map((month) => ({
      month,
      n_ads: adsCountMap[month] || 0,
      budget_total: adsBudgetMap[month] || 0,
    }));

    // ----- 9. Assemble -----
    return NextResponse.json({
      period: {
        from: from.toISOString().slice(0, 10),
        to: to.toISOString().slice(0, 10),
        months,
      },
      projects: {
        kpis: kpiProjects,
        charts: {
          byStatus: chartProjectsByStatus,
          byCategory: chartProjectsByCategory,
          byTier: chartProjectsByTier,
          perMonth: chartProjectsPerMonth,
          soldPerMonth: chartSoldPerMonth,
          capturedPerMonth: chartCapturedPerMonth,
          priority: chartPriority,
          risk: chartRisk,
          arAging: chartARAging,
        },
      },
      submissions: {
        kpis: kpiSubmissions,
        charts: {
          byStatus: chartSubsByStatus,
          perMonth: chartSubsPerMonth,
          byCategory: chartSubsByCategory,
          byTier: chartSubsByTier,
          adsByMonth: chartSubsAdsByMonth,
        },
      },
    });
  } catch (e: any) {
    return NextResponse.json(
      { error: e?.message || 'Server error' },
      { status: 500 }
    );
  }
}
