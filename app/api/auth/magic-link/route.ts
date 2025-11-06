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

    // 🌐 Base du site : priorité à NEXT_PUBLIC_SITE_URL
    const origin = process.env.NEXT_PUBLIC_SITE_URL ?? new URL(req.url).origin;

    const redirectTo = next
      ? `${origin}/finish?next=${encodeURIComponent(next)}`
      : `${origin}/finish`;

    // 1️⃣ On demande à Supabase de générer un lien magique
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

    // 2️⃣ On envoie l’email via Resend
    await resend.emails.send({
      from: 'Ikovaline <contact@ikovaline.com>',
      to: email,
      subject: '🔐 Ton lien de connexion Ikovaline',
      html: `
        <div style="font-family:system-ui, -apple-system, BlinkMacSystemFont, 'SF Pro Text', sans-serif; padding:24px; background:#0b1220; color:#f9fafb;">
          <h1 style="font-size:24px; margin-bottom:8px;">Connexion à ton espace Ikovaline</h1>
          <p style="margin-bottom:16px; opacity:.9;">
            Clique sur le bouton ci-dessous pour accéder à ton espace sécurisé.
          </p>
          <a
            href="${magicLink}"
            style="
              display:inline-block;
              padding:12px 20px;
              border-radius:999px;
              background:linear-gradient(135deg,#0ea5e9,#6366f1);
              color:white;
              text-decoration:none;
              font-weight:600;
            "
          >
            👉 Accéder à mon espace
          </a>
          <p style="margin-top:16px; font-size:12px; opacity:.7;">
            Ce lien est personnel et expire après quelques minutes. Si tu n'es pas à l'origine de cette demande, ignore simplement cet email.
          </p>
        </div>
      `,
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
