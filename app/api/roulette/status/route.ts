// app/api/roulette/status/route.ts
import { NextResponse } from 'next/server';
import { getAdminSupabase } from '@/app/api/_lib/supabaseAdmin';

type ConvRow = { seg: number; label: string; point_factor_pct: number };
type AllocRow = { seg: number; points: number };

function normEmail(email: string) {
  return String(email).trim().toLowerCase();
}

async function ensureUserAndAlloc(
  supa: ReturnType<typeof getAdminSupabase>,
  email: string
) {
  const email_norm = normEmail(email);

  // 1) upsert user (tries_left=1, points_wallet=100 à la première activation)
  const { data: user } = await supa
    .from('roulette_users')
    .select('email_norm, tries_left, points_wallet')
    .eq('email_norm', email_norm)
    .maybeSingle();

  if (!user) {
    const { data: created } = await supa
      .from('roulette_users')
      .insert({ email, email_norm, tries_left: 1, points_wallet: 100 })
      .select('email_norm, tries_left, points_wallet')
      .single();
    // 8 lignes d'allocation à 0
    const rows = Array.from({ length: 8 }, (_, i) => ({
      email_norm,
      seg: i + 1,
      points: 0,
    }));
    await supa.from('roulette_allocation').upsert(rows, {
      onConflict: 'email_norm,seg',
    });
    return created!;
  }

  // 2) s'assurer que les 8 lignes existent
  const { data: alloc } = await supa
    .from('roulette_allocation')
    .select('seg')
    .eq('email_norm', email_norm);

  if ((alloc?.length ?? 0) < 8) {
    const missing = new Set(Array.from({ length: 8 }, (_, i) => i + 1));
    alloc?.forEach((r) => missing.delete(r.seg));
    const rows = Array.from(missing).map((seg) => ({
      email_norm,
      seg,
      points: 0,
    }));
    if (rows.length) {
      await supa.from('roulette_allocation').upsert(rows, {
        onConflict: 'email_norm,seg',
      });
    }
  }

  return user;
}

function normalizeTo100(raw: { seg: number; label: string; value: number }[]) {
  const total = raw.reduce((a, r) => a + r.value, 0);
  if (total <= 0) {
    return raw.map((r) => ({ seg: r.seg, label: r.label, pct: 0 }));
  }
  return raw.map((r) => ({
    seg: r.seg,
    label: r.label,
    pct: (r.value / total) * 100,
  }));
}

export async function POST(req: Request) {
  const supa = getAdminSupabase();
  const { email } = await req.json().catch(() => ({}));
  if (!email) {
    return NextResponse.json({ error: 'email required' }, { status: 400 });
  }
  const email_norm = normEmail(email);

  // Crée l’utilisateur & allocation si besoin
  const user = await ensureUserAndAlloc(supa, email);

  // Conversion (facteur % par point)
  const { data: conversion, error: convErr } = await supa
    .from('roulette_conversion')
    .select('seg,label,point_factor_pct')
    .order('seg');

  if (convErr || !conversion || conversion.length !== 8) {
    console.error('❌ Erreur roulette_conversion:', {
      error: convErr,
      rowCount: conversion?.length ?? 0,
      expectedRows: 8,
      message: convErr?.message,
      details: convErr?.details,
      hint: convErr?.hint,
    });
    return NextResponse.json(
      {
        error: 'conversion not configured',
        details: convErr?.message || `Expected 8 rows, got ${conversion?.length ?? 0}`,
        hint: 'Run POST /api/roulette/init-conversion to initialize the table'
      },
      { status: 500 }
    );
  }

  // Allocation utilisateur
  const { data: allocation } = await supa
    .from('roulette_allocation')
    .select('seg,points')
    .eq('email_norm', email_norm)
    .order('seg');

  const allocMap: Record<number, number> = {};
  (allocation ?? []).forEach((a: AllocRow) => {
    allocMap[a.seg] = a.points;
  });

  // Calcul des poids normalisés
  const raw = conversion.map((c: ConvRow) => ({
    seg: c.seg,
    label: c.label,
    value: (allocMap[c.seg] ?? 0) * Number(c.point_factor_pct),
  }));
  const weights = normalizeTo100(raw).map((w) => ({
    seg: w.seg,
    label: w.label,
    pct: Number(w.pct.toFixed(4)),
  }));

  // Historique des récompenses
  const { data: rewards } = await supa
    .from('roulette_codes')
    .select('id, seg, prize_label, code, status, expires_at, created_at')
    .eq('email_norm', email_norm)
    .order('created_at', { ascending: false });

  return NextResponse.json({
    tries_left: user.tries_left,
    points_wallet: user.points_wallet,
    allocation: (allocation ?? []).map((a: AllocRow) => ({
      seg: a.seg,
      points: a.points,
    })),
    conversion: conversion.map((c: ConvRow) => ({
      seg: c.seg,
      label: c.label,
      point_factor_pct: Number(c.point_factor_pct),
    })),
    weights,
    rewards: rewards ?? [],
  });
}
