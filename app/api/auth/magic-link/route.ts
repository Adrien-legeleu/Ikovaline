// app/api/auth/magic-link/route.ts
import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { getAdminSupabase } from '@/lib/supabaseAdmin';

const resend = new Resend(process.env.RESEND_API_KEY!);

// ⚓️ Base URL garantie (même si l'env bug)
const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://ikovaline.com';

export async function POST(req: Request) {
  try {
    const { email, next } = await req.json();

    if (!email) {
      return NextResponse.json({ error: 'Email requis' }, { status: 400 });
    }

    const supabaseAdmin = getAdminSupabase();

    // URL de redirection finale qu'on VEUT pour le front
    const redirectTo = next
      ? `${BASE_URL}/finish?next=${encodeURIComponent(next)}`
      : `${BASE_URL}/finish`;

    // 1️⃣ On demande à Supabase de générer un lien magique
    const { data, error } = await supabaseAdmin.auth.admin.generateLink({
      type: 'magiclink',
      email,
      options: {
        redirectTo, // même si Supabase l’ignore, on force derrière
      },
    });

    if (error || !data?.properties?.action_link) {
      console.error('Supabase generateLink error:', error);
      return NextResponse.json(
        { error: 'Impossible de générer le lien magique.' },
        { status: 500 }
      );
    }

    // Lien brut renvoyé par Supabase
    const rawMagicLink = data.properties.action_link;

    // 🪄 On force le redirect_to à BASE_URL /finish…
    let fixedMagicLink = rawMagicLink;
    try {
      const url = new URL(rawMagicLink);
      url.searchParams.set('redirect_to', redirectTo);
      fixedMagicLink = url.toString();
    } catch (e) {
      console.warn('Impossible de parser magicLink, utilisation brute:', e);
    }

    // 2️⃣ Email fond blanc, clean
    await resend.emails.send({
      from: 'Ikovaline <contact@ikovaline.com>',
      to: email,
      subject: '🔐 Ton lien de connexion Ikovaline',
      html: `
        <div style="background:#f3f4f6;padding:24px;">
          <div style="
            max-width:480px;
            margin:0 auto;
            background:#ffffff;
            border-radius:16px;
            padding:24px 24px 20px;
            border:1px solid #e5e7eb;
            font-family:system-ui, -apple-system, BlinkMacSystemFont, 'SF Pro Text', sans-serif;
            color:#0f172a;
          ">
            <h1 style="font-size:22px; margin:0 0 8px; font-weight:600;">
              Connexion à ton espace Ikovaline
            </h1>
            <p style="margin:0 0 16px; font-size:14px; line-height:1.5; color:#475569;">
              Clique sur le bouton ci-dessous pour accéder à ton espace sécurisé.
            </p>
            <a
              href="${fixedMagicLink}"
              style="
                display:inline-block;
                padding:12px 20px;
                border-radius:999px;
                background:linear-gradient(135deg,#0ea5e9,#6366f1);
                color:#ffffff;
                text-decoration:none;
                font-weight:600;
                font-size:14px;
                margin:8px 0 4px;
              "
            >
              👉 Accéder à mon espace
            </a>
            <p style="margin:16px 0 0; font-size:11px; line-height:1.5; color:#94a3b8;">
              Ce lien est personnel et expire après quelques minutes.
              Si tu n'es pas à l'origine de cette demande, ignore simplement cet email.
            </p>
          </div>
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
