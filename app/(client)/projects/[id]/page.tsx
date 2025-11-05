export const dynamic = 'force-dynamic';

import { cookies } from 'next/headers';
import { createServerClient } from '@supabase/ssr';
import ClientProjectPage from './ClientProjectPage';

type Props = { params: { id: string } };

export default async function ProjectDetail({ params }: Props) {
  const cookieStore = await cookies();
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { cookies: { get: (n: string) => cookieStore.get(n)?.value } }
  );

  // --- Auth obligatoire (RLS en a besoin) ---
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return (
      <section className="rounded-[2rem] bg-[#ffffff] dark:bg-[#0e1116] shadow-[14px_14px_36px_rgba(0,0,0,0.07),-14px_-14px_36px_rgba(255,255,255,0.6)] dark:shadow-[14px_14px_36px_rgba(0,0,0,0.8),-14px_-14px_36px_rgba(255,255,255,0.07)] p-6">
        <h1 className="text-xl font-semibold">Projet</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Vous devez être connecté pour accéder à ce projet.
        </p>
      </section>
    );
  }

  // --- Projet (RLS protège déjà) ---
  const { data: proj } = await supabase
    .from('projects')
    .select('*')
    .eq('id', params.id)
    .maybeSingle();

  if (!proj) {
    return (
      <div className="p-6 text-sm text-muted-foreground">
        Projet introuvable.
      </div>
    );
  }

  // --- Autorisation: owner OU client_email OU collaborateur dans project_members ---
  let isCollaborator = false;
  {
    const { count } = await supabase
      .from('project_members')
      .select('id', { count: 'exact', head: true })
      .eq('project_id', proj.id)
      .or(
        `user_id.eq.${user.id},invited_email.eq.${user.email ?? '___null___'}`
      );
    isCollaborator = (count ?? 0) > 0;
  }

  const allowed =
    proj.owner_user_id === user.id ||
    (!!proj.client_email && proj.client_email === user.email) ||
    isCollaborator;

  if (!allowed) {
    return (
      <section className="rounded-[2rem] bg-[#ffffff] dark:bg-[#0e1116] shadow-[14px_14px_36px_rgba(0,0,0,0.07),-14px_-14px_36px_rgba(255,255,255,0.6)] dark:shadow-[14px_14px_36px_rgba(0,0,0,0.8),-14px_-14px_36px_rgba(255,255,255,0.07)] p-6">
        <h1 className="text-xl font-semibold">Accès refusé</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Vous n’avez pas les droits pour consulter ce projet.
        </p>
      </section>
    );
  }

  // --- Siblings: ordre des projets pour ce client / owner ---
  let siblings: { id: string; created_at: string }[] = [];
  if (!isCollaborator && proj.owner_user_id) {
    const { data } = await supabase
      .from('projects')
      .select('id, created_at')
      .eq('owner_user_id', proj.owner_user_id)
      .order('created_at', { ascending: true });
    siblings = data ?? [];
  } else if (!isCollaborator && proj.client_email) {
    const { data } = await supabase
      .from('projects')
      .select('id, created_at')
      .eq('client_email', proj.client_email)
      .order('created_at', { ascending: true });
    siblings = data ?? [];
  } else {
    siblings = [{ id: proj.id, created_at: proj.created_at }];
  }

  const index = siblings.findIndex((p) => p.id === proj.id);
  const humanIndex = index >= 0 ? index + 1 : 1;
  const displayTitle = (proj.title || '').trim() || `Projet ${humanIndex}`;

  // --- Updates (même structure que l’admin : done / next / blockers) ---
  const { data: updates = [] } = await supabase
    .from('project_updates')
    .select('id,progress,headline,done,next,blockers,created_at')
    .eq('project_id', proj.id)
    .order('created_at', { ascending: false });

  // --- Contrat signé : on garde le PATH, pas une URL brute ---
  const signedContractPath =
    Array.isArray(proj.signed_contract_files) &&
    proj.signed_contract_files.length > 0
      ? proj.signed_contract_files[0]
      : null;

  return (
    <ClientProjectPage
      proj={proj}
      displayTitle={displayTitle}
      updates={updates}
      signedContractPath={signedContractPath}
    />
  );
}
