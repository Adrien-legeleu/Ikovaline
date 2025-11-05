import { cookies } from 'next/headers';
import { createServerClient } from '@supabase/ssr';
import ProjectDetailClient, {
  Update,
  View,
} from '@/components/ClientSpace/Admin/ProjectDetailClient';
import ProjectTeamAdmin from '@/components/ClientSpace/Admin/ProjectTeamAdmin';

export const dynamic = 'force-dynamic';

type Props = { params: { id: string } };

type ProjectRow = {
  id: string;
  title: string;
  status: string;
  created_at: string;
  start_at: string | null;
  deadline: string | null;
  progress: number;
  description: string | null;
  client_email: string | null;
  owner_user_id: string | null;

  offer_tier: string | null;
  offer_category: string | null;
  offer_price: number | null;
  ads_budget: number | null;
  urls: string[] | null;
  repo_url: string | null;

  selected_options: string[] | null;
  signed_contract_files: string[] | null;
  brief_files: string[] | null; // 👈 AJOUTÉ

  extra: any | null;
  billing_status: string | null;
  priority: string | null;
  risk_level: string | null;
  currency: 'EUR' | 'USD' | null;
};

export default async function AdminProjectDetail({ params }: Props) {
  const cookieStore = await cookies();
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { cookies: { get: (n: string) => cookieStore.get(n)?.value } }
  );

  // auth
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return (
      <section className="px-6 py-10">
        <div className="text-lg font-medium">Non connecté.</div>
      </section>
    );
  }

  const { data: meProfile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single();

  if (!meProfile || meProfile.role !== 'admin') {
    return (
      <section className="px-6 py-10">
        <div className="text-lg font-medium">Accès refusé (réservé admin).</div>
      </section>
    );
  }

  // projet
  const { data: proj, error: projErr } = await supabase
    .from('projects')
    .select(
      [
        'id',
        'title',
        'status',
        'created_at',
        'start_at',
        'deadline',
        'progress',
        'description',
        'client_email',
        'owner_user_id',
        'offer_tier',
        'offer_category',
        'offer_price',
        'ads_budget',
        'urls',
        'repo_url',
        'selected_options',
        'signed_contract_files',
        'brief_files', // 👈 AJOUTÉ ICI AUSSI
        'extra',
        'billing_status',
        'priority',
        'risk_level',
        'currency',
      ].join(',')
    )
    .eq('id', params.id)
    .single<ProjectRow>();

  if (projErr || !proj) {
    return (
      <section className="px-6 py-10">
        <a
          href="/admin/projects"
          className="text-sm text-primary underline underline-offset-[3px]"
        >
          ← Retour projets
        </a>
        <div className="mt-6 text-lg font-medium text-foreground">
          Projet introuvable.
        </div>
        {projErr && (
          <pre className="mt-4 text-xs text-red-500 whitespace-pre-wrap">
            {projErr.message}
          </pre>
        )}
      </section>
    );
  }

  // updates
  const { data: updatesRaw = [] } = await supabase
    .from('project_updates')
    .select(
      [
        'id',
        'progress',
        'headline',
        'done',
        'next',
        'blockers',
        'created_at',
      ].join(',')
    )
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

  // mapping DB -> View
  const view: View = {
    id: proj.id,
    title: proj.title || 'Projet',
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

    urls: Array.isArray(proj.urls) ? proj.urls : [],
    links: proj.extra?.client_links ?? [],
    goal: proj.extra?.goal ?? '',
    domain: proj.extra?.domain ?? '',
    langs: proj.extra?.languages ?? [],
    tones: proj.extra?.tone ?? [],

    selected_options: Array.isArray(proj.selected_options)
      ? proj.selected_options
      : [],

    signed_contract_files: Array.isArray(proj.signed_contract_files)
      ? proj.signed_contract_files
      : [],

    brief_files: Array.isArray(proj.brief_files) // 👈 AJOUTÉ ICI AUSSI
      ? proj.brief_files
      : [],

    contractStatus: proj.billing_status ?? null,

    repo_url: proj.repo_url ?? null,
    priority: proj.priority ?? null,
    risk_level: proj.risk_level ?? null,

    currency: (proj.currency ?? 'EUR') as 'EUR' | 'USD',
  };

  return (
    <section className="w-full">
      <div className="mx-auto w-full max-w-7xl px-2 py-8">
        <ProjectDetailClient mode="admin" view={view} updates={updates} />
        <div className="mt-10">
          <ProjectTeamAdmin projectId={proj.id} />
        </div>
      </div>
    </section>
  );
}
