import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { resend, DEFAULT_FROM, APP_URL } from '@/lib/resend';

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const sbAdmin = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
  auth: { persistSession: false },
});

// GET /api/projects/:id/collaborators
export async function GET(
  _req: NextRequest,
  { params }: { params: { id: string } }
) {
  // Membres (dont invitations en attente si invited_email non nul)
  const { data: members, error } = await sbAdmin
    .from('project_members')
    .select('id, project_id, user_id, invited_email, project_role, created_at')
    .eq('project_id', params.id)
    .eq('project_role', 'collaborator');

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const userIds = (members ?? [])
    .map((m) => m.user_id)
    .filter(Boolean) as string[];

  let profiles: Array<{
    id: string;
    full_name: string | null;
    email: string | null;
    role: string | null;
  }> = [];

  if (userIds.length) {
    const { data: profs, error: profErr } = await sbAdmin
      .from('profiles')
      .select('id, full_name, email, role')
      .in('id', userIds);

    if (profErr) {
      return NextResponse.json({ error: profErr.message }, { status: 500 });
    }
    profiles = profs ?? [];
  }

  const items = (members ?? []).map((m) => {
    const p = profiles.find((x) => x.id === m.user_id);
    return {
      id: m.id,
      user_id: m.user_id,
      email: p?.email ?? m.invited_email ?? null,
      name: p?.full_name ?? null,
      role: p?.role ?? null, // rôle global (user/dev/admin)
      project_role: m.project_role as 'owner' | 'collaborator',
      invited: !m.user_id && !!m.invited_email,
      created_at: m.created_at,
    };
  });

  return NextResponse.json({ items });
}

// POST /api/projects/:id/collaborators
export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await req.json().catch(() => ({}));
    const emailRaw: string | undefined = body.email;
    const name: string | undefined = body.name;
    if (!emailRaw) {
      return NextResponse.json({ error: 'email requis' }, { status: 400 });
    }
    const email = emailRaw.trim().toLowerCase();

    // 1) Projet
    const { data: proj, error: projErr } = await sbAdmin
      .from('projects')
      .select('id, title')
      .eq('id', params.id)
      .single();

    if (projErr || !proj) {
      return NextResponse.json(
        { error: projErr?.message || 'Projet introuvable' },
        { status: 404 }
      );
    }

    // 2) Cherche profil par email (source de vérité locale)
    const { data: profile } = await sbAdmin
      .from('profiles')
      .select('id, email, full_name, role')
      .eq('email', email)
      .maybeSingle();

    // 3) Idempotence → déjà dans le projet ?
    const { data: existing } = await sbAdmin
      .from('project_members')
      .select('id, user_id, invited_email, project_role')
      .eq('project_id', params.id)
      .or(
        `user_id.eq.${profile?.id ?? '00000000-0000-0000-0000-000000000000'},invited_email.eq.${email}`
      )
      .maybeSingle();

    if (existing) {
      return NextResponse.json({ ok: true, already: true });
    }

    const projectUrl = `${APP_URL}/client/projects/${params.id}`;

    if (profile?.id) {
      // 4A) Le compte existe → on lie en collaborator
      const { error: insErr } = await sbAdmin.from('project_members').insert({
        project_id: params.id,
        user_id: profile.id,
        invited_email: null,
        project_role: 'collaborator',
      });
      if (insErr) {
        return NextResponse.json({ error: insErr.message }, { status: 500 });
      }

      // Mail "vous avez été ajouté"
      try {
        await resend.emails.send({
          from: DEFAULT_FROM,
          to: email,
          subject: `Vous avez été ajouté au projet « ${proj.title || 'Projet'} »`,
          html: `
            <p>Bonjour,</p>
            <p>Vous avez été ajouté comme <strong>collaborateur</strong> sur le projet « ${proj.title || 'Projet'} ».</p>
            <p><a href="${projectUrl}" style="display:inline-block;padding:10px 16px;border-radius:10px;background:#2563eb;color:#fff;text-decoration:none">Accéder au projet</a></p>
            <p>— Ikovaline</p>
          `,
        });
      } catch {
        // on n’échoue pas si l’email part pas
      }

      return NextResponse.json({ ok: true, createdUser: false });
    }

    // 4B) Aucun profil → on crée l’utilisateur Auth + le profil + on l’ajoute
    const created = await sbAdmin.auth.admin.createUser({
      email,
      email_confirm: false,
      user_metadata: { name: name ?? null },
    });
    if (created.error || !created.data?.user) {
      return NextResponse.json(
        { error: created.error?.message || 'createUser failed' },
        { status: 500 }
      );
    }
    const newUser = created.data.user;

    // Profil (upsert)
    {
      const { error: upErr } = await sbAdmin.from('profiles').upsert(
        {
          id: newUser.id,
          email,
          full_name: name ?? null,
          role: 'user',
        },
        { onConflict: 'id' }
      );
      if (upErr) {
        return NextResponse.json({ error: upErr.message }, { status: 500 });
      }
    }

    // Ajout au projet en tant que collaborator
    {
      const { error: insErr } = await sbAdmin.from('project_members').insert({
        project_id: params.id,
        user_id: newUser.id,
        invited_email: null,
        project_role: 'collaborator',
      });
      if (insErr) {
        return NextResponse.json({ error: insErr.message }, { status: 500 });
      }
    }

    // Magic link → /welcome (session auto) + email via Resend (fallback invite supabase)
    try {
      const { data: linkData, error: linkErr } =
        await sbAdmin.auth.admin.generateLink({
          type: 'magiclink',
          email,
          options: {
            redirectTo: `${APP_URL}/welcome`,
          },
        });
      if (linkErr) throw linkErr;

      const actionLink = linkData?.properties?.action_link;
      if (!actionLink) throw new Error('Magic link introuvable');

      await resend.emails.send({
        from: DEFAULT_FROM,
        to: email,
        subject: 'Bienvenue — finalisez votre accès Ikovaline',
        html: `
          <p>Bonjour,</p>
          <p>Nous avons créé votre accès. Cliquez pour finaliser (puis définissez votre mot de passe) :</p>
          <p><a href="${actionLink}" style="display:inline-block;padding:10px 16px;border-radius:10px;background:#2563eb;color:#fff;text-decoration:none">Finaliser mon accès</a></p>
          <p>Une fois connecté, vous retrouverez le projet ici :</p>
          <p><a href="${projectUrl}">${projectUrl}</a></p>
        `,
      });
    } catch (e) {
      // Fallback : laisse Supabase envoyer l’invitation
      await sbAdmin.auth.admin.inviteUserByEmail(email, {
        redirectTo: `${APP_URL}/welcome`,
      });
    }

    return NextResponse.json({ ok: true, createdUser: true });
  } catch (e: any) {
    return NextResponse.json(
      { error: e?.message || 'Server error' },
      { status: 500 }
    );
  }
}

// DELETE /api/projects/:id/collaborators?member_id=...
export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { searchParams } = new URL(req.url);
  const member_id = searchParams.get('member_id');
  if (!member_id) {
    return NextResponse.json({ error: 'member_id requis' }, { status: 400 });
  }

  const { error } = await sbAdmin
    .from('project_members')
    .delete()
    .eq('id', member_id)
    .eq('project_id', params.id)
    .eq('project_role', 'collaborator');

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
