// app/api/roulette/invite/route.ts
import { NextResponse } from 'next/server';
import { getAdminSupabase } from '@/lib/supabaseAdmin';
import crypto from 'crypto';

function genInvite() {
  return `IKVR-${crypto.randomBytes(4).toString('hex').toUpperCase()}`;
}

export async function POST(req: Request) {
  const supa = getAdminSupabase();
  const { referrerEmail } = await req.json().catch(() => ({}));
  if (!referrerEmail)
    return NextResponse.json(
      { error: 'referrerEmail required' },
      { status: 400 }
    );

  const invite = genInvite();
  const { error } = await supa.from('roulette_referrals').insert({
    referrer_email: referrerEmail,
    invite_code: invite,
  });
  if (error)
    return NextResponse.json({ error: 'insert_failed' }, { status: 500 });

  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
  return NextResponse.json({
    ok: true,
    invite,
    url: `${baseUrl}/roulette?invite=${invite}`,
  });
}
