// app/dev/projects/[id]/page.tsx
import { cookies, headers } from 'next/headers';
import { createServerClient } from '@supabase/ssr';
import ProjectDetailClient, {
  type View,
  type Update,
} from '@/components/ClientSpace/Admin/ProjectDetailClient';
import ProjectTeamReadOnly from '@/components/ClientSpace/ProjectTeamReadOnly';

export const dynamic = 'force-dynamic';

type Props = { params: { id: string } };

export default async function DevProjectDetail({ params }: Props) {
  const cookieStore = await cookies();
  const headerList = await headers();
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: { get: (n: string) => cookieStore.get(n)?.value },
      global: {
        headers: { 'x-forwarded-for': headerList.get('x-forwarded-for') ?? '' },
      },
    }
  );

  // 🔒 Auth
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return <div className="p-6">Non connecté.</div>;

  // Vérifie que le dev est assigné
  const { data: assign } = await supabase
    .from('project_assignments')
    .select('id')
    .eq('project_id', params.id)
    .eq('user_id', user.id)
    .eq('active', true)
    .maybeSingle();

  // Récupère le projet complet
  const { data: proj, error: projErr } = await supabase
    .from('projects')
    .select('*')
    .eq('id', params.id)
    .single();

  if (projErr || !proj)
    return (
      <section className="p-6">
        <a
          href="/dev/projects"
          className="text-sm text-primary underline underline-offset-4"
        >
          ← Retour projets
        </a>
        <div className="mt-6 text-lg font-medium">Projet introuvable.</div>
      </section>
    );

  // ✅ Autorise les admins + les devs assignés
  const { data: me } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .maybeSingle();

  const isAdmin = me?.role === 'admin';
  if (!assign && !isAdmin)
    return <div className="p-6">Accès interdit / Projet non assigné.</div>;

  // ✅ Updates
  const { data: updatesRaw = [] } = await supabase
    .from('project_updates')
    .select('*')
    .eq('project_id', params.id)
    .order('created_at', { ascending: false });

  const updates: Update[] = (updatesRaw || []).map((u: any) => ({
    id: String(u.id),
    progress: u.progress ?? null,
    headline: u.headline ?? null,
    done: Array.isArray(u.done) ? u.done : [],
    next: Array.isArray(u.next) ? u.next : [],
    blockers: Array.isArray(u.blockers) ? u.blockers : [],
    created_at: String(u.created_at),
  }));

  // ✅ View
  const view: View = {
    id: proj.id,
    title: proj.title ?? 'Projet',
    status: proj.status ?? 'draft',
    created_at: proj.created_at,
    start_at: proj.start_at,
    deadline: proj.deadline,
    progress: proj.progress ?? 0,
    description: proj.description ?? null,
    client_email: proj.client_email ?? null,
    owner_user_id: proj.owner_user_id ?? null,
    tier: proj.offer_tier ?? null,
    category: proj.offer_category ?? null,
    price_euros: proj.offer_price ?? null,
    ads_budget: proj.ads_budget ?? null,
    domain: proj.extra?.domain ?? '',
    goal: proj.extra?.goal ?? '',
    langs: proj.extra?.languages ?? [],
    tones: proj.extra?.tone ?? [],
    urls: proj.urls ?? [],
    links: proj.extra?.links ?? [],
    contractSignedUrl: proj.signed_contract_files?.[0] ?? null,
    contractStatus: proj.billing_status ?? null,
    repo_url: proj.repo_url ?? null,
    priority: proj.priority ?? null,
    risk_level: proj.risk_level ?? null,
  };

  // ✅ Récupère équipe : tous les actifs + admin(s) + soi-même
  const { data: teamRows = [] } = await supabase
    .from('project_assignments')
    .select(
      `
      user_id,
      staff_role,
      profiles:profiles(full_name, email, role)
    `
    )
    .eq('project_id', params.id)
    .eq('active', true);

  const assignedTeam = (teamRows || []).map((r: any) => ({
    role: r.profiles?.role ?? 'user',
    staff_role: r.staff_role ?? null,
    name: r.profiles?.full_name ?? null,
    email: r.profiles?.email ?? null,
  }));

  // Ajoute les admins (hors duplicata)
  const { data: admins = [] } = await supabase
    .from('profiles')
    .select('full_name, email, role')
    .eq('role', 'admin')
    .eq('status', 'active');
  const adminTeam = (admins ?? []).map((a) => ({
    role: 'admin',
    staff_role: 'admin',
    name: a.full_name ?? null,
    email: a.email ?? null,
  }));

  // Fusion unique (admin + assignés)
  const allTeam = [...assignedTeam];
  for (const a of adminTeam) {
    if (!allTeam.find((m) => m.email === a.email)) allTeam.push(a);
  }

  // Ajoute soi-même si pas déjà dans la liste
  const { data: myProfile } = await supabase
    .from('profiles')
    .select('full_name, email, role')
    .eq('id', user.id)
    .maybeSingle();

  if (myProfile && !allTeam.find((m) => m.email === myProfile.email)) {
    allTeam.push({
      role: myProfile.role ?? 'user',
      staff_role: 'self',
      name: myProfile.full_name ?? null,
      email: myProfile.email ?? null,
    });
  }

  return (
    <section className="px-6 py-8 space-y-8">
      <ProjectDetailClient mode="dev" view={view} updates={updates} />
      <ProjectTeamReadOnly team={allTeam} />
    </section>
  );
}
