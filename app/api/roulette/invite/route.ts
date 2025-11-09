// file: app/api/roulette/invite/route.ts
import { NextResponse } from 'next/server';
import { getAdminSupabase } from '@/app/api/_lib/supabaseAdmin';
import { normalizeEmail } from '@/lib/email';
import { randomBytes } from 'crypto';

function genInviteCode() {
  return 'R-' + randomBytes(4).toString('hex');
}

export async function POST(req: Request) {
  const { referrerEmail } = await req.json().catch(() => ({}));
  if (!referrerEmail)
    return NextResponse.json({ error: 'email_required' }, { status: 400 });

  const email_norm = normalizeEmail(referrerEmail);
  const db = getAdminSupabase();

  // s'assurer que le parrain existe
  await db
    .from('roulette_users')
    .upsert({ email: referrerEmail, email_norm }, { onConflict: 'email_norm' });

  let code = genInviteCode();
  // boucle simple pour éviter collision
  // (rare mais on assure l'unicité)
  // eslint-disable-next-line no-constant-condition
  for (let i = 0; i < 3; i++) {
    const ins = await db
      .from('roulette_referrals')
      .insert({
        referrer_email: referrerEmail,
        referrer_email_norm: email_norm,
        invite_code: code,
      })
      .select('invite_code')
      .single();

    if (!ins.error) break;
    code = genInviteCode();
    if (i === 2)
      return NextResponse.json(
        { error: 'failed_generating_code' },
        { status: 500 }
      );
  }

  const base = process.env.NEXT_PUBLIC_SITE_URL!.replace(/\/+$/, '');
  const url = `${base}/roulette?invite=${encodeURIComponent(code)}`;

  return NextResponse.json({ ok: true, url });
}
