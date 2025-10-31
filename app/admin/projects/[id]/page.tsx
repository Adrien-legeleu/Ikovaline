// app/admin/projects/[id]/page.tsx
import { cookies } from 'next/headers';
import { createServerClient } from '@supabase/ssr';
import ProjectDetailClient, {
  type View,
  type Update,
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
  extra: any | null;
  signed_contract_files: string[] | null;
  billing_status: string | null;
  priority: string | null;
  risk_level: string | null;
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
        'extra',
        'signed_contract_files',
        'billing_status',
        'priority',
        'risk_level',
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

  // construire la view attendue par ProjectDetailClient
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

    domain: proj.extra?.domain || '',
    goal: proj.extra?.goal || '',
    langs: Array.isArray(proj.extra?.languages) ? proj.extra.languages : [],
    tones: Array.isArray(proj.extra?.tone) ? proj.extra.tone : [],
    urls: Array.isArray(proj.urls) ? proj.urls : [],
    links: Array.isArray(proj.extra?.links) ? proj.extra.links : [],

    contractSignedUrl: proj.signed_contract_files?.[0] ?? null,
    contractStatus: proj.billing_status ?? null,
    repo_url: proj.repo_url ?? null,
    priority: proj.priority ?? null,
    risk_level: proj.risk_level ?? null,
  };

  return (
    <section className="px-6 py-8 space-y-8">
      <ProjectDetailClient mode="admin" view={view} updates={updates} />

      {/* bloc équipe admin (invite / remove) */}
      <ProjectTeamAdmin projectId={proj.id} />
    </section>
  );
}
