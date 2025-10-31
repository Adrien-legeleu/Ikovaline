// app/api/admin/projects/route.ts
import { NextResponse } from 'next/server';
import { supabase } from '@/lib/SupabaseClient'; // ⚠️ côté serveur: init avec SERVICE_ROLE
import {
  sendExistingUserProjectEmail,
  sendWelcomeNewUserEmail,
} from '@/lib/email';

type Body = {
  title: string;
  description?: string;
  clientEmail: string;
  tier: 'custom' | 'boost' | 'essential';
  status: 'active' | 'paused' | 'draft' | 'finished';
  progress?: number;
  startAt: string; // YYYY-MM-DD
  options?: any;
};

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as Body;
    const APP_URL = process.env.APP_URL || 'http://localhost:3000';

    // validations
    if (!body?.clientEmail || !body?.title || !body?.startAt) {
      return NextResponse.json(
        { error: 'clientEmail, title et startAt sont requis.' },
        { status: 400 }
      );
    }

    const clientEmail = body.clientEmail.trim().toLowerCase();
    const title = body.title.trim();

    // infos facultatives depuis le wizard
    const profile = body.options?.profile || {};
    const fullName: string | undefined = profile.fullName || undefined;
    const phone: string | undefined = profile.phone || undefined;
    const company: string | undefined = profile.company || undefined;

    // startAt(YYYY-MM-DD) -> timestamp (UTC minuit)
    const startAtTs = new Date(`${body.startAt}T00:00:00Z`).toISOString();

    // 1) Tenter de retrouver l'utilisateur par le profil
    let userId: string | null = null;
    let createdUser = false;
    let inviteUrl: string | null = null;

    const { data: existingProfile, error: profErr } = await supabase
      .from('profiles')
      .select('id')
      .eq('email', clientEmail)
      .maybeSingle();

    if (profErr) {
      console.warn('profiles lookup error:', profErr.message);
    }

    if (existingProfile?.id) {
      userId = existingProfile.id; // compte existant
    } else {
      // 2) Générer un lien d’invitation (crée le user si inexistant)
      const { data: linkData, error: linkErr } =
        await supabase.auth.admin.generateLink({
          type: 'invite',
          email: clientEmail,
          options: { redirectTo: `${APP_URL}/welcome?next=/dashboard` },
        });

      if (linkErr) {
        // Fallback: cas rare — tenter listUsers pour trouver l’ID
        const { data: listData, error: listErr } =
          await supabase.auth.admin.listUsers({ page: 1, perPage: 200 });
        if (listErr) throw listErr;

        const existing = listData.users.find(
          (u) => (u.email || '').toLowerCase() === clientEmail
        );
        if (!existing) throw linkErr;

        userId = existing.id;
        createdUser = false;
      } else {
        userId = linkData.user?.id ?? null;
        // ✅ la bonne propriété
        inviteUrl = linkData.properties?.action_link ?? null;
        createdUser = true;
      }
    }

    if (!userId) {
      return NextResponse.json(
        { error: "Impossible de déterminer l'utilisateur (userId null)." },
        { status: 500 }
      );
    }

    // 3) Upsert profile (complète/normalise)
    {
      const { error: upErr } = await supabase.from('profiles').upsert({
        id: userId,
        email: clientEmail,
        full_name: fullName ?? null,
        phone: phone ?? null,
        company: company ?? null,
        role: 'user',
        status: 'active',
      });
      if (upErr) throw upErr;
    }

    // 4) Créer le projet (schema de TA table)
    const priceEuro = Number(body?.options?.pricing?.totalEuros ?? 0) || null;

    const { data: inserted, error: insErr } = await supabase
      .from('projects')
      .insert({
        title,
        description: body.description ?? null,
        client_email: clientEmail,
        owner_user_id: userId,
        status: body.status || 'draft',
        tier: body.tier || 'custom',
        progress: body.progress ?? 0,
        start_at: startAtTs, // 👈 timestamp (pas de deadline)
        options: body.options ?? {}, // tout le wizard
        // si tu veux le garder à portée:
        motion_seconds: Number(body?.options?.pricing?.motionSeconds ?? 0) || 0,
        urls: Array.isArray(body?.options?.questions?.urls)
          ? body.options.questions.urls
          : [],
        extra: priceEuro ? { price_euro: priceEuro } : {}, // optionnel
      })
      .select('id')
      .single();

    if (insErr) throw insErr;

    // 5) Emails
    if (createdUser && inviteUrl) {
      await sendWelcomeNewUserEmail({
        to: clientEmail,
        fullName,
        projectTitle: title,
        inviteUrl,
      });
    } else {
      await sendExistingUserProjectEmail({
        to: clientEmail,
        fullName,
        projectTitle: title,
        dashboardUrl: `${APP_URL}/dashboard`,
      });
    }

    // 6) Réponse UI (le wizard consomme passwordSetupUrl si présent)
    return NextResponse.json({
      id: inserted.id,
      userExisted: !createdUser,
      passwordSetupUrl: inviteUrl, // null si compte existant
    });
  } catch (e: any) {
    console.error('POST /api/admin/projects error:', e);
    return NextResponse.json(
      { error: e?.message || 'Server error' },
      { status: 500 }
    );
  }
}
