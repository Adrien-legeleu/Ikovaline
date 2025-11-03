import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { resend, DEFAULT_FROM, APP_URL } from '@/lib/resend';
import ProjectInviteEmail from '@/emails/ProjectInvite';

// --- Supabase admin (SERVICE ROLE) : bypass RLS en back ---
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const supabaseAdmin = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
  auth: { persistSession: false },
});

// GET /api/projects/:id/members
export async function GET(
  _req: NextRequest,
  { params }: { params: { id: string } }
) {
  // 1) Assignations actives
  const { data: assignments, error: assignErr } = await supabaseAdmin
    .from('project_assignments')
    .select('id, user_id, staff_role, active')
    .eq('project_id', params.id)
    .eq('active', true);

  if (assignErr)
    return NextResponse.json({ error: assignErr.message }, { status: 500 });

  const userIds = (assignments ?? []).map((a) => a.user_id);

  // 2) Profils des assignés
  const { data: profiles, error: profErr } = await supabaseAdmin
    .from('profiles')
    .select('id, full_name, email, role')
    .in('id', userIds);

  if (profErr)
    return NextResponse.json({ error: profErr.message }, { status: 500 });

  const assignedTeam =
    (assignments ?? []).map((a) => {
      const p = profiles?.find((pr) => pr.id === a.user_id);
      return {
        id: a.id,
        user_id: a.user_id,
        staff_role: a.staff_role, // ⬅️ IMPORTANT : staff_role (pas "role")
        role: p?.role ?? 'user', // rôle global du profil (user/dev/admin)
        name: p?.full_name ?? null,
        email: p?.email ?? null,
      };
    }) ?? [];

  // 3) Admins globaux (toujours visibles)
  const { data: admins, error: adminsErr } = await supabaseAdmin
    .from('profiles')
    .select('id, full_name, email, role')
    .eq('role', 'admin')
    .eq('status', 'active');

  if (adminsErr)
    return NextResponse.json({ error: adminsErr.message }, { status: 500 });

  const adminTeam =
    (admins ?? []).map((a) => ({
      id: `admin-${a.id}`,
      user_id: a.id,
      staff_role: 'admin',
      role: 'admin',
      name: a.full_name ?? null,
      email: a.email ?? null,
    })) ?? [];

  // 4) Merge sans doublon d’email
  const all = [...assignedTeam];
  for (const a of adminTeam) {
    if (!all.find((m) => m.email && a.email && m.email === a.email)) {
      all.push(a);
    }
  }

  return NextResponse.json({ items: all });
}

// POST /api/projects/:id/members
export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const body = await req.json().catch(() => ({}));

  // on accepte staff_role (préféré) et fallback sur role si vieux front
  const email: string | undefined = body.email;
  const staff_role: 'dev' | 'lead_dev' | 'design' | 'pm' | 'seo' | 'video' =
    body.staff_role ?? body.role;

  if (!email || !staff_role) {
    return NextResponse.json(
      { error: 'email & staff_role requis' },
      { status: 400 }
    );
  }

  // 1) Projet (pour l’email)
  const { data: proj, error: projErr } = await supabaseAdmin
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

  // 2) Lookup profil par email (SERVICE ROLE => bypass RLS)
  const { data: userProfile, error: userErr } = await supabaseAdmin
    .from('profiles')
    .select('id, email, full_name, status')
    .eq('email', email.toLowerCase())
    .maybeSingle();

  if (userErr) {
    return NextResponse.json(
      { error: userErr.message || 'Erreur lookup user' },
      { status: 500 }
    );
  }

  if (!userProfile?.id) {
    return NextResponse.json(
      {
        error:
          "Cet email n'existe pas encore dans la plateforme, crée d'abord le compte dev.",
      },
      { status: 404 }
    );
  }

  // Optionnel : refuser si profil disabled
  if (userProfile.status && userProfile.status !== 'active') {
    return NextResponse.json(
      { error: 'Ce compte existe mais est désactivé.' },
      { status: 403 }
    );
  }

  const userId = userProfile.id as string;

  // 3) Assigner (idempotent light : si déjà actif, on renvoie OK)
  const { data: existingAssign } = await supabaseAdmin
    .from('project_assignments')
    .select('id, active')
    .eq('project_id', params.id)
    .eq('user_id', userId)
    .maybeSingle();

  if (existingAssign?.active) {
    return NextResponse.json({ ok: true }); // déjà assigné
  }

  if (existingAssign && existingAssign.id) {
    // réactive si existait inactif
    const { error: reactErr } = await supabaseAdmin
      .from('project_assignments')
      .update({ active: true, staff_role })
      .eq('id', existingAssign.id);

    if (reactErr) {
      return NextResponse.json({ error: reactErr.message }, { status: 500 });
    }
  } else {
    // insert normal
    const { error: assignErr } = await supabaseAdmin
      .from('project_assignments')
      .insert({
        project_id: params.id,
        user_id: userId,
        staff_role,
        active: true,
      });

    if (assignErr) {
      return NextResponse.json({ error: assignErr.message }, { status: 500 });
    }
  }

  // 4) Email d’invitation
  const ctaUrl = `${APP_URL}/dev/projects/${encodeURIComponent(params.id)}`;
  try {
    await resend.emails.send({
      from: DEFAULT_FROM,
      to: email,
      subject: `Tu as été ajouté au projet « ${proj.title || 'Projet'} »`,
      react: ProjectInviteEmail({
        projectTitle: proj.title || 'Projet',
        inviteeEmail: email,
        role: staff_role,
        ctaUrl,
      }),
    });
  } catch (e: any) {
    // assign OK, email KO → on informe quand même
    return NextResponse.json(
      { ok: true, warn: 'assigné, mais email non envoyé', error: e?.message },
      { status: 200 }
    );
  }

  return NextResponse.json({ ok: true });
}

// DELETE /api/projects/:id/members?user_id=...
export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { searchParams } = new URL(req.url);
  const user_id = searchParams.get('user_id');
  if (!user_id) {
    return NextResponse.json({ error: 'user_id requis' }, { status: 400 });
  }

  // si admin global → refuse
  const { data: profile, error: profErr } = await supabaseAdmin
    .from('profiles')
    .select('role')
    .eq('id', user_id)
    .maybeSingle();

  if (profErr)
    return NextResponse.json({ error: profErr.message }, { status: 500 });

  if (profile?.role === 'admin') {
    return NextResponse.json(
      { error: 'Impossible de retirer un administrateur.' },
      { status: 403 }
    );
  }

  const { error } = await supabaseAdmin
    .from('project_assignments')
    .update({ active: false })
    .eq('project_id', params.id)
    .eq('user_id', user_id)
    .eq('active', true);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
