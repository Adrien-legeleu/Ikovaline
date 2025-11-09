// file: app/api/roulette/accept/route.ts
import { NextResponse } from 'next/server';
import { getAdminSupabase } from '@/app/api/_lib/supabaseAdmin';
import { normalizeEmail } from '@/lib/normalizeEmail';

export async function POST(req: Request) {
  const { inviteCode, inviteeEmail } = await req.json().catch(() => ({}));
  if (!inviteCode || !inviteeEmail) {
    return NextResponse.json({ error: 'invalid_body' }, { status: 400 });
  }

  const db = getAdminSupabase();
  const invitee_email_norm = normalizeEmail(inviteeEmail);

  // s'assurer que le filleul existe (utile pour essais/alloc)
  await db
    .from('roulette_users')
    .upsert(
      { email: inviteeEmail, email_norm: invitee_email_norm },
      { onConflict: 'email_norm' }
    );
  await db.rpc('roulette_ensure_allocation', {
    p_email_norm: invitee_email_norm,
  });

  // associer l'invitation
  const upd = await db
    .from('roulette_referrals')
    .update({
      invitee_email: inviteeEmail,
      invitee_email_norm,
      accepted: true,
      accepted_at: new Date().toISOString(),
    })
    .eq('invite_code', inviteCode)
    .is('accepted', false)
    .select('id');

  if (upd.error) {
    // conflit unique index => déjà accepté ailleurs
    return NextResponse.json({ error: upd.error.message }, { status: 409 });
  }

  return NextResponse.json({ ok: true });
}
