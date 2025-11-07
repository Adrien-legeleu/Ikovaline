// app/api/roulette/accept/route.ts
import { NextResponse } from 'next/server';
import { getAdminSupabase } from '@/lib/supabaseAdmin';

export async function POST(req: Request) {
  const supa = getAdminSupabase();
  const { inviteCode, inviteeEmail } = await req.json().catch(() => ({}));
  if (!inviteCode || !inviteeEmail) {
    return NextResponse.json(
      { error: 'inviteCode & inviteeEmail required' },
      { status: 400 }
    );
  }
  const inviteeNorm = String(inviteeEmail).trim().toLowerCase();

  // retrouver le parrainage
  const { data: rr } = await supa
    .from('roulette_referrals')
    .select('*')
    .eq('invite_code', inviteCode)
    .maybeSingle();
  if (!rr) return NextResponse.json({ error: 'not_found' }, { status: 404 });

  // si déjà accepté, on ne redonne pas de boost
  if (!rr.accepted) {
    await supa
      .from('roulette_referrals')
      .update({
        accepted: true,
        invitee_email: inviteeEmail,
        accepted_at: new Date().toISOString(),
      })
      .eq('invite_code', inviteCode);

    // Cap de boosts par 30 jours
    const refNorm = String(rr.referrer_email).trim().toLowerCase();
    const { data: cfg } = await supa
      .from('roulette_config')
      .select('max_referral_boosts_per_30d')
      .single();
    const limit = cfg?.max_referral_boosts_per_30d ?? 3;

    // combien d'acceptations sur 30j ?
    const { count } = await supa
      .from('roulette_referrals')
      .select('*', { count: 'exact', head: true })
      .eq('referrer_email_norm', refNorm)
      .eq('accepted', true)
      .gte('accepted_at', new Date(Date.now() - 30 * 864e5).toISOString());

    if ((count ?? 0) < limit) {
      // s'assurer que la ligne de boosts existe
      await supa
        .from('roulette_boosts')
        .upsert({ email_norm: refNorm }, { onConflict: 'email_norm' });

      // +2 pts (seg 7), +1.5 (seg 3), +1 (seg 2), +0.5 (seg 5)
      try {
        await supa.rpc('increment_boosts', {
          p_email_norm: refNorm,
          p_add2: 1,
          p_add3: 1.5,
          p_add5: 0.5,
          p_add7: 2,
        });
      } catch {
        // fallback sans RPC (lecture + update)
        const { data: b } = await supa
          .from('roulette_boosts')
          .select('*')
          .eq('email_norm', refNorm)
          .single();
        await supa
          .from('roulette_boosts')
          .update({
            boost_pts_2: (b?.boost_pts_2 ?? 0) + 1,
            boost_pts_3: (b?.boost_pts_3 ?? 0) + 1.5,
            boost_pts_5: (b?.boost_pts_5 ?? 0) + 0.5,
            boost_pts_7: (b?.boost_pts_7 ?? 0) + 2,
          })
          .eq('email_norm', refNorm);
      }
    }
  }

  return NextResponse.json({ ok: true });
}
