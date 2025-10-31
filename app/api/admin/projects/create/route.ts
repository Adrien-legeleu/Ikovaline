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

/**
 * Assure qu'un user existe pour cet email (sinon on le crée),
 * assure qu'il a un profile row,
 * génère un lien "recovery" (reset password) qui servira d'onboarding.
 */
async function ensureUserAndRecoveryLink(args: {
  email: string;
  fullName?: string | null;
}) {
  const { email, fullName } = args;

  // 1. check si user existe déjà
  const listRes = await supabaseAdmin.auth.admin.listUsers({
    // @ts-expect-error supabase types pas alignés pour {search}
    search: email,
  });

  let user = listRes.data?.users?.find((u: any) => u.email === email) ?? null;
  let mode: 'existing' | 'created' = 'existing';

  // 2. si pas trouvé -> on crée
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

  // 3. s'assurer que le profile existe
  if (userId) {
    const { data: profileRow, error: profileSelectErr } = await supabaseAdmin
      .from('profiles')
      .select('id')
      .eq('id', userId)
      .single();

    if (profileSelectErr || !profileRow) {
      const { error: pErr } = await supabaseAdmin.from('profiles').insert({
        id: userId,
        full_name: fullName ?? null,
        email,
        role: 'user',
        status: 'active',
      });
      if (pErr) {
        console.warn('profiles insert warning', pErr);
      }
    }
  }

  // 4. créer lien recovery (toujours recovery, on n'utilise plus signup)
  const recoveryRes = await supabaseAdmin.auth.admin.generateLink({
    type: 'recovery',
    email,
    options: {
      // très important : doit pointer vers /welcome
      // /welcome va faire exchangeCodeForSession() pour ouvrir la session
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

    const {
      // requis
      projectTitle,
      clientEmail,

      // optionnels
      clientName,
      projectDescription,
      industry,
      offerCategory,
      offerTier,
      offerPrice,
      selectedOptions = [],
      wantsAds = false,
      adsBudget = 0,
      ownerUserId = null,
      devEmails = [],

      // planning
      startAt,
      deadline,

      // refs
      repoUrl,
      urls = [],
      currency = 'EUR',

      // maintenance / fichiers etc si tu les ajoutes plus tard
      maintenanceType,
      maintenanceStart,
      maintenanceEnd,
      briefFiles = [],
      signedContractFiles = [],
    } = body;

    if (!projectTitle) {
      return NextResponse.json(
        { ok: false, error: 'projectTitle required' },
        { status: 400 }
      );
    }
    if (!clientEmail) {
      return NextResponse.json(
        { ok: false, error: 'clientEmail required' },
        { status: 400 }
      );
    }

    // 1) s'assure que user existe + récupère lien onboarding
    const invite = await ensureUserAndRecoveryLink({
      email: clientEmail,
      fullName: clientName ?? null,
    });

    if (invite.error) {
      console.error('ensureUserAndRecoveryLink error', invite.error);
      // on ne bloque pas forcement le projet pour ça
    }

    // 2) insert dans projects
    const projectRow: any = {
      owner_user_id: ownerUserId,
      client_email: clientEmail,

      title: projectTitle,
      description: projectDescription ?? null,
      industry: industry ?? null,

      offer_category: offerCategory ?? null,
      offer_tier: offerTier ?? null,
      offer_price: offerPrice ?? null,
      selected_options: selectedOptions,
      currency,

      wants_ads: wantsAds,
      ads_budget: adsBudget,

      start_at: startAt ?? null,
      deadline: deadline ?? null,

      repo_url: repoUrl ?? null,
      urls,

      maintenance_type: maintenanceType ?? null,
      maintenance_start: maintenanceStart ?? null,
      maintenance_end: maintenanceEnd ?? null,

      brief_files: briefFiles,
      signed_contract_files: signedContractFiles,

      status: 'in_progress',
      progress: 0,
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

    // 3) project_members
    const membersToInsert: any[] = [
      {
        project_id: projectData.id,
        user_id: invite.userId ?? null,
        invited_email: clientEmail,
        project_role: 'owner',
      },
      ...devEmails.map((email: string) => ({
        project_id: projectData.id,
        user_id: null,
        invited_email: email,
        project_role: 'collaborator',
      })),
    ];

    const { error: memErr } = await supabaseAdmin
      .from('project_members')
      .insert(membersToInsert);
    if (memErr) {
      console.warn('project_members insert warning', memErr);
    }

    // 4) mail onboarding
    if (invite.link) {
      try {
        await resend.emails.send({
          from: RESEND_FROM_EMAIL,
          to: clientEmail,
          subject: `Accès à votre projet — ${projectTitle}`,
          html: `
            <div style="font-family:system-ui,-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;color:#0b1226">
              <h2 style="margin:0 0 8px 0;">Bonjour ${clientName ?? ''},</h2>
              <p style="margin:0 0 12px 0;color:#334155">
                Votre espace client pour <strong>${projectTitle}</strong> est prêt.
                Cliquez ci-dessous pour définir votre mot de passe
                et accéder à votre tableau de bord.
              </p>
              <p style="margin:14px 0;">
                <a href="${invite.link}" style="display:inline-block;padding:10px 16px;background:#0ea5e9;color:#fff;border-radius:12px;text-decoration:none;font-weight:600">
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
        });
      }
    }

    // 5) OK final
    return NextResponse.json({
      ok: true,
      project: projectData,
      invitedUserId: invite.userId ?? null,
      invitationMode: invite.mode, // 'created' | 'existing'
    });
  } catch (e) {
    console.error('unexpected error', e);
    return NextResponse.json(
      { ok: false, error: 'Unexpected server error' },
      { status: 500 }
    );
  }
}
