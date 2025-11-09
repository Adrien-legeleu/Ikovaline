// app/api/roulette/probabilities/route.ts
import { NextResponse } from 'next/server';
import { getAdminSupabase } from '@/lib/supabaseAdmin';

export async function POST(req: Request) {
  const supa = getAdminSupabase();
  const { email } = await req.json().catch(() => ({}));
  if (!email)
    return NextResponse.json({ error: 'email required' }, { status: 400 });

  // On appelle /status en interne
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SITE_URL || ''}/api/roulette/status`,
    {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ email }),
    }
  );
  const data = await res.json();

  // Config (pour validityDays / maxReferralBoosts si ton UI les affiche)
  const { data: cfg } = await supa
    .from('roulette_config')
    .select('code_validity_days, max_referral_boosts_per_30d')
    .single();

  return NextResponse.json({
    validityDays: Number(cfg?.code_validity_days ?? 14),
    maxReferralBoosts: Number(cfg?.max_referral_boosts_per_30d ?? 3),
    eligible: (data?.tries_left ?? 0) > 0,
    nextEligibleAt: null,
    boosts: null,
    weights: data?.weights ?? [],
  });
}
