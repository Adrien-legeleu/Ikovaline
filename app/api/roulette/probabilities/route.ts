// app/api/roulette/probabilities/route.ts
import { NextResponse } from 'next/server';
import { getAdminSupabase } from '@/lib/supabaseAdmin';

type WeightRow = { seg: number; label: string; weight_pts: number };

function clamp(n: number, a: number, b: number) {
  return Math.max(a, Math.min(b, n));
}

export async function POST(req: Request) {
  const supa = getAdminSupabase();
  const { email } = await req.json().catch(() => ({}));
  if (!email)
    return NextResponse.json({ error: 'email required' }, { status: 400 });

  const emailNorm = String(email).trim().toLowerCase();

  // 1) Base weights
  const { data: base, error: wErr } = (await supa
    .from('roulette_weights_base')
    .select('seg,label,weight_pts')
    .order('seg')) as unknown as { data: WeightRow[]; error: any };

  if (wErr || !base || base.length !== 8) {
    return NextResponse.json(
      { error: 'weights not configured' },
      { status: 500 }
    );
  }

  // 2) Config
  const { data: cfg } = await supa.from('roulette_config').select('*').single();
  const jackpotActive = !!cfg?.jackpot_active;
  const validityDays = cfg?.code_validity_days ?? 14;
  const maxReferralBoosts = cfg?.max_referral_boosts_per_30d ?? 3;

  // 3) Boosts par utilisateur
  const { data: boosts } = await supa
    .from('roulette_boosts')
    .select('*')
    .eq('email_norm', emailNorm)
    .maybeSingle();

  const add2 = Number(boosts?.boost_pts_2 ?? 0);
  const add3 = Number(boosts?.boost_pts_3 ?? 0);
  const add5 = Number(boosts?.boost_pts_5 ?? 0);
  const add7 = Number(boosts?.boost_pts_7 ?? 0);

  // 4) Éligibilité (1 spin / 30 jours)
  const { data: lastSpin } = await supa
    .from('roulette_spins')
    .select('created_at')
    .eq('email_norm', emailNorm)
    .gte('created_at', new Date(Date.now() - 30 * 864e5).toISOString())
    .order('created_at', { ascending: false })
    .limit(1);
  const alreadyPlayed = (lastSpin?.length ?? 0) > 0;
  const nextEligibleAt = alreadyPlayed
    ? new Date(
        new Date(lastSpin![0].created_at).getTime() + 30 * 864e5
      ).toISOString()
    : null;

  // 5) Construire les poids
  const weights = base.map((r) => ({ ...r }));
  const get = (seg: number) => weights.find((w) => w.seg === seg)!;

  // jackpot de base stocké en base (0.5 %) sur seg 1
  const jackpotBase = get(1).weight_pts;

  // appliquer boosts + retirer depuis seg 8
  get(2).weight_pts += add2;
  get(3).weight_pts += add3;
  get(5).weight_pts += add5;
  get(7).weight_pts += add7;

  const totalAdded = add2 + add3 + add5 + add7;
  get(8).weight_pts = clamp(get(8).weight_pts - totalAdded, 0, 100);

  // si jackpot désactivé ⇒ on remet seg1 à 0 et on reporte son % sur seg8
  if (!jackpotActive) {
    get(1).weight_pts = 0;
    get(8).weight_pts = clamp(get(8).weight_pts + jackpotBase, 0, 100);
  }

  // normalization fine
  const sum = weights.reduce((a, w) => a + w.weight_pts, 0);
  const fix = 100 - sum;
  get(8).weight_pts = clamp(get(8).weight_pts + fix, 0, 100);

  return NextResponse.json({
    validityDays,
    maxReferralBoosts,
    eligible: !alreadyPlayed,
    nextEligibleAt,
    boosts: { add2, add3, add5, add7 },
    weights: weights.map((w) => ({
      seg: w.seg,
      label: w.label,
      pct: +w.weight_pts.toFixed(3),
    })),
  });
}
