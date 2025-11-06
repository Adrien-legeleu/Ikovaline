// app/api/auth/magic-link/route.ts
import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { getAdminSupabase } from '@/lib/supabaseAdmin';

const resend = new Resend(process.env.RESEND_API_KEY!);

export async function POST(req: Request) {
  try {
    const { email, next } = await req.json();

    if (!email) {
      return NextResponse.json({ error: 'Email requis' }, { status: 400 });
    }

    const supabaseAdmin = getAdminSupabase();

    const BASE_URL =
      process.env.NEXT_PUBLIC_SITE_URL || 'https://ikovaline.com';

    const redirectTo = next
      ? `${BASE_URL}/finish?next=${encodeURIComponent(next)}`
      : `${BASE_URL}/finish`;

    const { data, error } = await supabaseAdmin.auth.admin.generateLink({
      type: 'magiclink',
      email,
      options: {
        redirectTo,
      },
    });

    if (error || !data?.properties?.action_link) {
      console.error('Supabase generateLink error:', error);
      return NextResponse.json(
        { error: 'Impossible de générer le lien magique.' },
        { status: 500 }
      );
    }

    const magicLink = data.properties.action_link;

    await resend.emails.send({
      from: 'Ikovaline <contact@ikovaline.com>',
      to: email,
      subject: '🔐 Ton lien de connexion Ikovaline',
      html: `...`, // la version fond blanc ci-dessus
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('Magic link route error:', err);
    return NextResponse.json(
      { error: 'Erreur serveur pendant l’envoi de l’email.' },
      { status: 500 }
    );
  }
}
