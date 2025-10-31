import { cookies } from 'next/headers';
import { createServerClient } from '@supabase/ssr';
import ClientDashboardView, {
  type DashboardProject,
} from '@/components/ClientSpace/Dashboard/ClientDashboardView';

export const dynamic = 'force-dynamic';

export default async function ClientDashboard() {
  const cookieStore = await cookies();
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { cookies: { get: (n: string) => cookieStore.get(n)?.value } }
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return (
      <section className="min-h-[60vh] flex flex-col items-center justify-center text-center">
        <h1 className="text-2xl font-semibold mb-2">Tableau de bord</h1>
        <p className="text-muted-foreground text-sm max-w-sm">
          Connectez-vous pour accéder à vos projets.
        </p>
      </section>
    );
  }

  // Récup nom du profil
  const { data: profile } = await supabase
    .from('profiles')
    .select('full_name')
    .eq('id', user.id)
    .maybeSingle();

  const fullName = (profile?.full_name ?? '').trim();
  const firstFromFull = fullName ? fullName.split(/\s+/)[0] : null;
  const firstFromEmail = (user.email ?? '').split('@')[0];
  const displayName = firstFromFull || firstFromEmail || 'vous';

  // Récup ses projets
  const userEmail = user.email ?? null;
  const { data: projectsRaw } = await supabase
    .from('projects')
    .select(
      'id,title,status,progress,deadline,created_at,priority,risk_level,billing_status'
    )
    .or(`owner_user_id.eq.${user.id},client_email.eq.${userEmail}`)
    .order('created_at', { ascending: false });

  const projects: DashboardProject[] = (projectsRaw ?? []).map((p) => ({
    id: p.id,
    title: p.title,
    status: p.status,
    progress: typeof p.progress === 'number' ? p.progress : 0,
    deadline: p.deadline,
    created_at: p.created_at,
    priority: p.priority ?? 'normal',
    risk_level: p.risk_level ?? 'normal',
    billing_status: p.billing_status ?? 'in_progress',
  }));

  return <ClientDashboardView projects={projects} displayName={displayName} />;
}
