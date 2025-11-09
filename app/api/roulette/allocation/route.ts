// file: app/api/roulette/allocation/route.ts
import { NextResponse } from 'next/server';
import { getAdminSupabase } from '@/app/api/_lib/supabaseAdmin';
import { computeWeights } from '@/lib/roulette/calc';
import { normalizeEmail } from '@/lib/normalizeEmail';

export async function POST(req: Request) {
  const { email, allocation } = await req.json().catch(() => ({}));
  if (!email || !Array.isArray(allocation)) {
    return NextResponse.json({ error: 'invalid_body' }, { status: 400 });
  }
  const email_norm = normalizeEmail(email);
  const db = getAdminSupabase();

  const user = await db
    .from('roulette_users')
    .select('points_wallet')
    .eq('email_norm', email_norm)
    .single();
  if (user.error)
    return NextResponse.json({ error: user.error.message }, { status: 500 });
  if (!user.data)
    return NextResponse.json({ error: 'user_not_found' }, { status: 404 });

  // Valider 8 segments [1..8] et somme == wallet
  const cleaned = allocation
    .map((a: any) => ({
      seg: Number(a.seg),
      points: Math.max(0, Number(a.points) || 0),
    }))
    .filter((a) => a.seg >= 1 && a.seg <= 8);

  if (cleaned.length !== 8) {
    return NextResponse.json(
      { error: 'must_provide_8_segments' },
      { status: 400 }
    );
  }

  const sum = cleaned.reduce((acc, a) => acc + a.points, 0);
  if (sum !== user.data.points_wallet) {
    return NextResponse.json(
      { error: 'sum_must_equal_wallet', expected: user.data.points_wallet },
      { status: 400 }
    );
  }

  // Upsert en une fois
  const rows = cleaned.map((r) => ({
    email_norm,
    seg: r.seg,
    points: r.points,
  }));
  const up = await db
    .from('roulette_allocation')
    .upsert(rows, { onConflict: 'email_norm,seg' });
  if (up.error)
    return NextResponse.json({ error: up.error.message }, { status: 500 });

  const [allocRes, convRes] = await Promise.all([
    db
      .from('roulette_allocation')
      .select('seg, points')
      .eq('email_norm', email_norm)
      .order('seg'),
    db
      .from('roulette_conversion')
      .select('seg, label, point_factor_pct')
      .order('seg'),
  ]);
  if (allocRes.error)
    return NextResponse.json(
      { error: allocRes.error.message },
      { status: 500 }
    );
  if (convRes.error)
    return NextResponse.json({ error: convRes.error.message }, { status: 500 });

  const weights = computeWeights(allocRes.data!, convRes.data!);
  return NextResponse.json({ ok: true, weights });
}
