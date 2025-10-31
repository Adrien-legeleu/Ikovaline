import { NextRequest, NextResponse } from 'next/server';
import { cookies, headers } from 'next/headers';
import { createServerClient } from '@supabase/ssr';
import { resend, DEFAULT_FROM, APP_URL } from '@/lib/resend';
import ProjectInviteEmail from '@/emails/ProjectInvite';

async function getSB() {
  const cookieStore = await cookies();
  const headerList = await headers();
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: { get: (n: string) => cookieStore.get(n)?.value },
      global: {
        headers: { 'x-forwarded-for': headerList.get('x-forwarded-for') ?? '' },
      },
    }
  );
}

export async function GET(
  _req: NextRequest,
  { params }: { params: { id: string } }
) {
  const supabase = await getSB();

  // 1️⃣ Devs assignés
  const { data: assignments, error: assignErr } = await supabase
    .from('project_assignments')
    .select('id, user_id, staff_role, active')
    .eq('project_id', params.id)
    .eq('active', true);

  if (assignErr)
    return NextResponse.json({ error: assignErr.message }, { status: 500 });

  // 2️⃣ Récupère les profils associés
  const userIds = (assignments ?? []).map((a) => a.user_id);
  const { data: profiles, error: profErr } = await supabase
    .from('profiles')
    .select('id, full_name, email, role')
    .in('id', userIds);

  if (profErr)
    return NextResponse.json({ error: profErr.message }, { status: 500 });

  const assignedTeam = (assignments ?? []).map((a) => {
    const p = profiles?.find((pr) => pr.id === a.user_id);
    return {
      id: a.id,
      user_id: a.user_id,
      staff_role: a.staff_role,
      role: p?.role ?? 'user',
      name: p?.full_name ?? null,
      email: p?.email ?? null,
    };
  });

  // 3️⃣ Ajoute les admins globaux
  const { data: admins } = await supabase
    .from('profiles')
    .select('id, full_name, email, role')
    .eq('role', 'admin')
    .eq('status', 'active');

  const adminTeam = (admins ?? []).map((a) => ({
    id: `admin-${a.id}`,
    user_id: a.id,
    staff_role: 'admin',
    role: 'admin',
    name: a.full_name ?? null,
    email: a.email ?? null,
  }));

  // 4️⃣ Fusion unique (pas de doublons d’email)
  const all = [...assignedTeam];
  for (const a of adminTeam) {
    if (!all.find((m) => m.email === a.email)) all.push(a);
  }

  return NextResponse.json({ items: all });
}
// POST /api/projects/:id/members
export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const supabase = await getSB();
  const body = await req.json().catch(() => ({}));

  const { email, staff_role } = body as {
    email?: string;
    staff_role?: 'dev' | 'lead_dev' | 'design' | 'pm' | 'seo' | 'video';
  };

  if (!email || !staff_role) {
    return NextResponse.json(
      { error: 'email & staff_role requis' },
      { status: 400 }
    );
  }

  // 1) Vérifier projet (pour l'email de notif + 404 propre si projet inexistant)
  const { data: proj, error: projErr } = await supabase
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

  // 2) Récupérer l'utilisateur par email
  const { data: userProfile, error: userErr } = await supabase
    .from('profiles')
    .select('id, email, full_name')
    .eq('email', email)
    .maybeSingle();

  if (userErr) {
    return NextResponse.json(
      { error: userErr.message || 'Erreur lookup user' },
      { status: 500 }
    );
  }

  if (!userProfile || !userProfile.id) {
    // on ne crée PAS d'user ici, on demande qu'il existe déjà
    return NextResponse.json(
      {
        error:
          "Cet email n'existe pas encore dans la plateforme, crée d'abord le compte dev.",
      },
      { status: 404 }
    );
  }

  const userId = userProfile.id as string;

  // 3) Assigner au projet (si déjà assigné actif=true on peut juste renvoyer ok)
  // on essaie d'insérer; si doublon RLS, à toi de gérer unique si tu veux plus tard
  const { error: assignErr } = await supabase
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
    // l'assign a réussi, l'email a raté → on le dit mais pas d'erreur 500
    return NextResponse.json(
      {
        ok: true,
        warn: 'assigné, mais email non envoyé',
        error: e?.message,
      },
      { status: 200 }
    );
  }

  return NextResponse.json({ ok: true });
}

// DELETE /api/projects/:id/members?user_id=...
// DELETE /api/projects/:id/members?user_id=...
export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const supabase = await getSB();
  const { searchParams } = new URL(req.url);
  const user_id = searchParams.get('user_id');
  if (!user_id) {
    return NextResponse.json({ error: 'user_id requis' }, { status: 400 });
  }

  // 🧩 Vérifie si le user est admin
  const { data: profile, error: profErr } = await supabase
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

  // ✅ Supprime uniquement si non-admin
  const { error } = await supabase
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
