import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { Resend } from 'resend';

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const RESEND_API_KEY = process.env.RESEND_API_KEY!;
const RESEND_FROM_EMAIL = process.env.RESEND_FROM_EMAIL!;
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000';

const supabaseAdmin = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
  auth: { persistSession: false },
});
const resend = new Resend(RESEND_API_KEY);

/** Crée/assure un user Supabase et renvoie un lien recovery */
async function ensureUserAndRecoveryLink(args: {
  email: string;
  fullName?: string | null;
}) {
  const { email, fullName } = args;

  // 1) chercher si le user existe
  const listRes = await supabaseAdmin.auth.admin.listUsers({
    // @ts-expect-error champ non typé dans sdk
    search: email,
  });

  let user = listRes.data?.users?.find((u: any) => u.email === email) ?? null;
  let mode: 'existing' | 'created' = 'existing';

  // 2) créer si absent
  if (!user) {
    const createRes = await supabaseAdmin.auth.admin.createUser({
      email,
      email_confirm: true,
    });
    if (createRes.error) {
      return {
        error: `createUser failed: ${createRes.error.message}`,
        userId: null,
        link: null,
        mode: 'error' as const,
      };
    }
    user = createRes.data.user ?? null;
    mode = 'created';
  }

  const userId = user?.id ?? null;

  // 3) s'assurer du profile
  if (userId) {
    const { data: profileRow } = await supabaseAdmin
      .from('profiles')
      .select('id')
      .eq('id', userId)
      .single();

    if (!profileRow) {
      const { error: pErr } = await supabaseAdmin.from('profiles').insert({
        id: userId,
        full_name: fullName ?? null,
        email,
        role: 'user',
        status: 'active',
      });
      if (pErr) console.warn('profiles insert warning', pErr);
    }
  }

  // 4) lien recovery (onboarding)
  const recoveryRes = await supabaseAdmin.auth.admin.generateLink({
    type: 'recovery',
    email,
    options: {
      redirectTo: `${SITE_URL}/welcome`,
    },
  });
  if (recoveryRes.error) {
    return {
      error: `generateLink(recovery) failed: ${recoveryRes.error.message}`,
      userId,
      link: null,
      mode,
    };
  }

  return {
    error: null,
    userId,
    link: recoveryRes.data.properties?.action_link ?? null,
    mode,
  };
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // Champs principaux
    const title: string | undefined = body.title ?? body.projectTitle;
    const description: string | undefined =
      body.description ?? body.projectDescription;

    const clientEmail: string | undefined =
      body.clientEmail ?? body.client_email;

    const clientName: string | undefined = body.clientName ?? body.client_name;

    // Offre (désormais facultative)
    const offer_category: string | undefined =
      body.offer_category ?? body.offerCategory;
    const offer_tier: string | undefined = body.offer_tier ?? body.offerTier;
    const offer_price: number | undefined =
      typeof body.offer_price === 'number'
        ? body.offer_price
        : typeof body.offerPrice === 'number'
          ? body.offerPrice
          : undefined;

    const currency: 'EUR' | 'USD' = (body.currency as 'EUR' | 'USD') ?? 'EUR';

    const selected_options: string[] = Array.isArray(
      body.selected_options ?? body.selectedOptions
    )
      ? (body.selected_options ?? body.selectedOptions)
      : [];

    const wants_ads: boolean = !!(body.wants_ads ?? body.wantsAds);
    const ads_budget: number | null =
      typeof (body.ads_budget ?? body.adsBudget) === 'number'
        ? (body.ads_budget ?? body.adsBudget)
        : null;

    const start_at: string | null = body.start_at ?? body.startAt ?? null; // ISO
    const deadline: string | null = body.deadline ?? null; // YYYY-MM-DD

    const maintenance_type: string | null =
      body.maintenance_type ?? body.maintenanceType ?? null;
    const maintenance_start: string | null =
      body.maintenance_start ?? body.maintenanceStart ?? null;
    const maintenance_end: string | null =
      body.maintenance_end ?? body.maintenanceEnd ?? null;

    const repo_url: string | null = body.repo_url ?? body.repoUrl ?? null;
    const urls: string[] = Array.isArray(body.urls) ? body.urls : [];

    const brief_files: string[] = Array.isArray(
      body.brief_files ?? body.briefFiles
    )
      ? (body.brief_files ?? body.briefFiles)
      : [];
    const signed_contract_files: string[] = Array.isArray(
      body.signed_contract_files ?? body.signedContractFiles
    )
      ? (body.signed_contract_files ?? body.signedContractFiles)
      : [];

    const status:
      | 'draft'
      | 'scheduled'
      | 'in_progress'
      | 'paused'
      | 'completed'
      | 'cancelled' = body.status ?? 'in_progress';

    const billing_status:
      | 'deposit_paid'
      | 'in_progress'
      | 'late'
      | 'paid_full' = body.billing_status ?? 'deposit_paid';

    const risk_level: 'normal' | 'attention' | 'urgent' =
      body.risk_level ?? 'normal';

    const priority: 'low' | 'normal' | 'high' | 'critical' =
      body.priority ?? 'normal';

    const progress: number =
      typeof body.progress === 'number' ? body.progress : 0;

    const payment_total: number | null =
      typeof body.payment_total === 'number' ? body.payment_total : null;

    const payment_captured: number | null =
      typeof body.payment_captured === 'number' ? body.payment_captured : null;

    const payment_installments: number | null =
      typeof body.payment_installments === 'number'
        ? body.payment_installments
        : null;

    const extra: Record<string, any> = body.extra ?? {};

    const inviteClient: boolean = !!body.inviteClient;
    const devEmails: string[] = Array.isArray(body.devEmails)
      ? body.devEmails
      : [];

    // ---- ✅ Validations MINIMALES : email + nom du client
    if (!clientEmail) {
      return NextResponse.json(
        { ok: false, error: 'clientEmail required' },
        { status: 400 }
      );
    }
    if (!clientName || !String(clientName).trim()) {
      return NextResponse.json(
        { ok: false, error: 'clientName required' },
        { status: 400 }
      );
    }

    // Titre par défaut si absent
    const safeTitle =
      title?.trim() || `Projet ${new Date().toISOString().slice(0, 10)}`;

    // ---- 1) Invitation (optionnelle)
    let invitedUserId: string | null = null;
    let invitationMode: 'created' | 'existing' | null = null;
    let recoveryLink: string | null = null;

    if (inviteClient) {
      const invite = await ensureUserAndRecoveryLink({
        email: clientEmail,
        fullName: clientName ?? null,
      });

      if (invite.error) {
        console.error('ensureUserAndRecoveryLink error', invite.error);
        // on continue quand même la création du projet
      } else {
        invitedUserId = invite.userId ?? null;
        invitationMode = (invite.mode as 'created' | 'existing') ?? null;
        recoveryLink = invite.link ?? null;
      }
    }

    // ---- 2) Insert projet (la plupart des colonnes peuvent être null/undefined)
    const projectRow: any = {
      owner_user_id: invitedUserId ?? null,
      client_email: clientEmail,

      title: safeTitle,
      description: description ?? null,
      industry: body.industry ?? null,

      offer_category: offer_category ?? null,
      offer_tier: offer_tier ?? null,
      offer_price: typeof offer_price === 'number' ? offer_price : null,
      selected_options,
      currency,

      wants_ads,
      ads_budget,

      start_at,
      deadline,

      repo_url,
      urls,

      maintenance_type,
      maintenance_start,
      maintenance_end,

      brief_files,
      signed_contract_files,

      status,
      progress,

      billing_status,
      risk_level,
      priority,

      total_sold: typeof offer_price === 'number' ? offer_price : null,
      payment_total: typeof payment_total === 'number' ? payment_total : null,
      payment_captured:
        typeof payment_captured === 'number' ? payment_captured : null,
      payment_installments:
        typeof payment_installments === 'number' ? payment_installments : 1,
      payment_currency: currency,

      extra: { ...(extra ?? {}), clientName }, // on garde le nom dans extra si pas de colonne dédiée
      created_at: new Date().toISOString(),
    };

    const { data: projectData, error: projectErr } = await supabaseAdmin
      .from('projects')
      .insert(projectRow)
      .select()
      .single();

    if (projectErr) {
      console.error('projects insert error', projectErr);
      return NextResponse.json(
        { ok: false, error: 'Failed to create project' },
        { status: 500 }
      );
    }

    // ---- 3) project_members
    const membersToInsert: any[] = [];

    // Owner (client)
    membersToInsert.push({
      project_id: projectData.id,
      user_id: invitedUserId ?? null,
      invited_email: clientEmail,
      project_role: 'owner',
    });

    // Collaborateurs (devs)
    for (const email of devEmails) {
      membersToInsert.push({
        project_id: projectData.id,
        user_id: null,
        invited_email: email,
        project_role: 'collaborator',
      });
    }

    const { error: memErr } = await supabaseAdmin
      .from('project_members')
      .insert(membersToInsert);

    if (memErr) {
      console.warn('project_members insert warning', memErr);
    }

    // ---- 4) Mail onboarding (UNIQUEMENT si inviteClient + recoveryLink ok)
    if (inviteClient && recoveryLink) {
      try {
        await resend.emails.send({
          from: RESEND_FROM_EMAIL,
          to: clientEmail,
          subject: `Accès à votre projet — ${safeTitle}`,
          html: `
            <div style="font-family:system-ui,-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;color:#0b1226">
              <h2 style="margin:0 0 8px 0;">Bonjour ${clientName ?? ''},</h2>
              <p style="margin:0 0 12px 0;color:#334155">
                Votre espace client pour <strong>${safeTitle}</strong> est prêt.
                Cliquez ci-dessous pour définir votre mot de passe
                et accéder à votre tableau de bord.
              </p>
              <p style="margin:14px 0;">
                <a href="${recoveryLink}" style="display:inline-block;padding:10px 16px;background:#0ea5e9;color:#fff;border-radius:12px;text-decoration:none;font-weight:600">
                  Accéder à mon espace
                </a>
              </p>
              <p style="margin:0;color:#7c8598;font-size:13px">
                Si vous n’êtes pas à l’origine de cette demande, ignorez ce message.
              </p>
            </div>
          `,
        });
      } catch (e) {
        console.error('Resend email send error', e);
        return NextResponse.json({
          ok: true,
          warning: 'project created but email send failed',
          project: projectData,
          invitedUserId,
          invitationMode,
        });
      }
    }

    // ---- 5) OK final
    return NextResponse.json({
      ok: true,
      project: projectData,
      invitedUserId,
      invitationMode,
    });
  } catch (e) {
    console.error('unexpected error', e);
    return NextResponse.json(
      { ok: false, error: 'Unexpected server error' },
      { status: 500 }
    );
  }
}
