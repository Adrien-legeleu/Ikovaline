import { cookies, headers } from 'next/headers';
import { createServerClient } from '@supabase/ssr';
import AdminProjectsListClient, {
  type AdminProjectCard,
} from '@/components/ClientSpace/Admin/AdminProjectsListsClient';
import { redirect } from 'next/navigation';

export const dynamic = 'force-dynamic';

type ProjectRow = {
  id: string;
  title: string;
  status: string | null;
  progress: number | null;
  deadline: string | null;
  created_at: string;
  offer_tier: string | null;
  client_email: string | null;
  billing_status: string | null;
  priority: string | null;
  risk_level: string | null;
};

export default async function AdminProjectsPage() {
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

  // Auth requise
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect('/login');

  // Vérifie le rôle
  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single();

  if (!profile || profile.role !== 'admin') {
    redirect('/dashboard');
  }

  // ✅ Récupère TOUS les projets
  const { data: rows, error } = await supabase
    .from('projects')
    .select(
      `
        id,
        title,
        status,
        progress,
        deadline,
        created_at,
        offer_tier,
        client_email,
        billing_status,
        priority,
        risk_level
      `
    )
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Erreur chargement projets admin:', error.message);
  }

  const projects: AdminProjectCard[] = (rows ?? []).map((p: ProjectRow) => ({
    id: p.id,
    title: p.title,
    status: p.status,
    progress: p.progress,
    deadline: p.deadline,
    created_at: p.created_at,
    offer_tier: p.offer_tier,
    client_email: p.client_email,
    billing_status: p.billing_status,
    priority: p.priority,
    risk_level: p.risk_level,
  }));

  return <AdminProjectsListClient projects={projects} mode="admin" />;
}
