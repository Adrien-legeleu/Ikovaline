// file: app/api/roulette/spin/route.ts
import { NextResponse } from 'next/server';
import { getAdminSupabase } from '@/app/api/_lib/supabaseAdmin';
import { computeWeights } from '@/lib/roulette/calc';
import { randomInt, randomBytes } from 'crypto';
import { normalizeEmail } from '@/lib/normalizeEmail';

type Weight = { seg: number; label: string; pct: number };

function pickSegmentCSPRNG(weights: Weight[]) {
  // Convertir en entiers sur 1_000_000 pour éviter les flottants
  const scale = 1_000_000;
  const cum: { seg: number; label: string; hi: number }[] = [];
  let acc = 0;
  weights.forEach((w) => {
    const inc = Math.max(0, Math.round((w.pct / 100) * scale));
    acc += inc;
    cum.push({ seg: w.seg, label: w.label, hi: acc });
  });
  if (acc <= 0) {
    // fallback uniforme
    const i = randomInt(0, 8);
    return cum[i]?.seg ?? (i % 8) + 1;
  }
  const r = randomInt(0, acc); // [0,acc)
  for (const c of cum) {
    if (r < c.hi) return c.seg;
  }
  return cum[cum.length - 1].seg;
}

export async function POST(req: Request) {
  const { email } = await req.json().catch(() => ({}));
  if (!email)
    return NextResponse.json({ error: 'email_required' }, { status: 400 });

  const email_norm = normalizeEmail(email);
  const db = getAdminSupabase();

  // Charger user + allocation + conversion
  const [userRes, allocRes, convRes] = await Promise.all([
    db
      .from('roulette_users')
      .select('tries_left, points_wallet')
      .eq('email_norm', email_norm)
      .single(),
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

  if (userRes.error)
    return NextResponse.json({ error: userRes.error.message }, { status: 500 });
  if (!userRes.data)
    return NextResponse.json({ error: 'user_not_found' }, { status: 404 });

  if (userRes.data.tries_left <= 0) {
    return NextResponse.json({ error: 'no_tries_left' }, { status: 409 });
  }

  const wallet = userRes.data.points_wallet;
  const allocation = allocRes.data ?? [];
  if (allocation.length !== 8) {
    return NextResponse.json(
      { error: 'incomplete_allocation' },
      { status: 400 }
    );
  }
  const sum = allocation.reduce((a, r) => a + (r.points ?? 0), 0);
  if (sum !== wallet) {
    return NextResponse.json(
      { error: 'sum_must_equal_wallet', expected: wallet },
      { status: 400 }
    );
  }

  const conversion = convRes.data ?? [];
  const weights = computeWeights(allocation, conversion); // [{seg,label,pct}]

  const seg = pickSegmentCSPRNG(weights);
  const label =
    conversion.find((c) => c.seg === seg)?.label ?? `Segment ${seg}`;

  // Transaction SQL centralisée
  const apply = await db.rpc('roulette_apply_spin', {
    p_email: email,
    p_email_norm: email_norm,
    p_seg: seg,
    p_prize_label: label,
  });

  if (apply.error) {
    const msg = apply.error.message.includes('no_tries_left')
      ? 'no_tries_left'
      : apply.error.message;
    return NextResponse.json({ error: msg }, { status: 409 });
  }

  const { code, expires_at } = (apply.data ?? {}) as {
    code: string;
    expires_at: string;
  };

  // ✨ PARRAINAGE : Créditer le parrain si c'est le premier spin du filleul
  try {
    await creditReferrerOnFirstSpin(db, email_norm);
  } catch (err) {
    console.error('Error crediting referrer:', err);
    // Ne pas bloquer le spin si le crédit parrain échoue
  }

  return NextResponse.json({
    ok: true,
    seg,
    prize: label,
    code,
    expiresAt: expires_at,
  });
}

/**
 * Crédite le parrain avec +25 points et +1 essai au premier spin du filleul
 *
 * LOGIQUE PARRAINAGE :
 * - Quand un filleul fait son premier spin, son parrain gagne :
 *   ✅ +1 essai (tries_left)
 *   ✅ +25 points (points_wallet) à répartir comme il veut
 * - Le filleul peut relancer si le parrain a des tries_left
 * - Un filleul ne peut créditer son parrain qu'une seule fois
 */
async function creditReferrerOnFirstSpin(
  db: ReturnType<typeof getAdminSupabase>,
  invitee_email_norm: string
) {
  // Trouver la relation de parrainage acceptée et non encore créditée
  const { data: referral } = await db
    .from('roulette_referrals')
    .select('id, referrer_email, referrer_email_norm, credited')
    .eq('invitee_email_norm', invitee_email_norm)
    .eq('accepted', true)
    .maybeSingle();

  if (!referral || referral.credited) {
    // Pas de parrainage ou déjà crédité
    return;
  }

  // Récupérer les valeurs actuelles du parrain
  const { data: referrerUser } = await db
    .from('roulette_users')
    .select('points_wallet, tries_left')
    .eq('email_norm', referral.referrer_email_norm)
    .single();

  if (!referrerUser) {
    console.error('Referrer user not found');
    return;
  }

  // Créditer le parrain : +25 points + +1 essai
  const { error: updateError } = await db
    .from('roulette_users')
    .update({
      points_wallet: referrerUser.points_wallet + 25,
      tries_left: referrerUser.tries_left + 1,
    })
    .eq('email_norm', referral.referrer_email_norm);

  if (updateError) {
    console.error('Error updating referrer wallet:', updateError);
    throw updateError;
  }

  // Marquer le parrainage comme crédité
  await db
    .from('roulette_referrals')
    .update({ credited: true, credited_at: new Date().toISOString() })
    .eq('id', referral.id);

  console.log(
    `✅ Parrain ${referral.referrer_email} crédité : +25 pts, +1 essai (filleul: ${invitee_email_norm})`
  );
}
