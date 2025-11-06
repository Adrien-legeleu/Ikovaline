// app/api/auth/magic-link/route.ts
import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { createClient } from '@supabase/supabase-js';

const resend = new Resend(process.env.RESEND_API_KEY!);

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: Request) {
  try {
    const { email, next } = await req.json();

    if (!email) {
      return NextResponse.json({ error: 'Email requis' }, { status: 400 });
    }

    // 🔥 Détection auto local/prod (important pour Vercel preview)
    const BASE_URL =
      process.env.NEXT_PUBLIC_SITE_URL ||
      (process.env.VERCEL_URL
        ? `https://${process.env.VERCEL_URL}`
        : 'http://localhost:3000');

    const redirectTo = next
      ? `${BASE_URL}/finish?next=${encodeURIComponent(next)}`
      : `${BASE_URL}/finish`;

    console.log('🔗 [Magic Link] Email:', email); // Debug
    console.log('🔗 [Magic Link] Redirect:', redirectTo); // Debug

    // 1️⃣ Générer le lien magique
    const { data, error } = await supabaseAdmin.auth.admin.generateLink({
      type: 'magiclink',
      email,
      options: {
        redirectTo,
      },
    });

    if (error || !data?.properties?.action_link) {
      console.error('❌ [Magic Link] Supabase error:', error);
      return NextResponse.json(
        { error: error?.message || 'Impossible de générer le lien magique.' },
        { status: 500 }
      );
    }

    const magicLink = data.properties.action_link;
    console.log('✅ [Magic Link] Lien généré'); // Debug (pas le lien complet pour sécurité)

    // 2️⃣ Envoyer l'email via Resend
    const result = await resend.emails.send({
      from: 'Ikovaline <contact@ikovaline.com>',
      to: email,
      subject: '🔐 Connexion à ton espace Ikovaline',
      html: `
        <div style="font-family:Inter,system-ui,-apple-system,sans-serif;max-width:600px;margin:0 auto;padding:40px 20px;">
          <div style="background:linear-gradient(135deg,#0ea5e9,#6366f1);padding:30px;border-radius:16px 16px 0 0;text-align:center;">
            <h1 style="color:#fff;margin:0;font-size:28px;font-weight:700;">Ikovaline</h1>
          </div>
          
          <div style="background:#f9fafb;padding:40px 30px;border-radius:0 0 16px 16px;">
            <h2 style="color:#111;margin:0 0 16px;font-size:24px;font-weight:600;">
              Connexion à ton espace client
            </h2>
            
            <p style="color:#475569;font-size:16px;line-height:1.6;margin:0 0 24px;">
              Clique sur le bouton ci-dessous pour accéder instantanément à ton tableau de bord Ikovaline.
            </p>
            
            <div style="text-align:center;margin:32px 0;">
              <a href="${magicLink}" 
                 style="display:inline-block;padding:16px 32px;background:linear-gradient(135deg,#0ea5e9,#6366f1);color:#fff;text-decoration:none;border-radius:999px;font-weight:600;font-size:16px;box-shadow:0 10px 30px rgba(14,165,233,0.3);">
                👉 Accéder à mon espace
              </a>
            </div>
            
            <div style="margin-top:32px;padding-top:24px;border-top:1px solid #e2e8f0;">
              <p style="color:#64748b;font-size:13px;line-height:1.5;margin:0;">
                <strong>Note de sécurité :</strong> Ce lien est personnel et expire dans quelques minutes. 
                Si tu n'es pas à l'origine de cette demande, ignore simplement cet email.
              </p>
            </div>
          </div>
          
          <div style="text-align:center;margin-top:24px;">
            <p style="color:#94a3b8;font-size:12px;margin:0;">
              © ${new Date().getFullYear()} Ikovaline - Agence digitale
            </p>
          </div>
        </div>
      `,
    });

    if (result.error) {
      console.error('❌ [Magic Link] Resend error:', result.error);
      throw new Error(`Resend: ${result.error.message}`);
    }

    console.log('✅ [Magic Link] Email envoyé:', result.data?.id);

    return NextResponse.json({ ok: true });
  } catch (err: any) {
    console.error('❌ [Magic Link] Fatal error:', err);
    return NextResponse.json(
      { error: err?.message || "Erreur serveur pendant l'envoi de l'email." },
      { status: 500 }
    );
  }
}
