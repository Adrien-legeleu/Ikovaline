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

  // projet principal
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

  // autorisation
  const allowed =
    proj.owner_user_id === user.id ||
    (proj.client_email && proj.client_email === user.email);

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

  // siblings pour index humain si besoin
  let siblings: { id: string; created_at: string }[] = [];
  if (proj.owner_user_id) {
    const { data } = await supabase
      .from('projects')
      .select('id, created_at')
      .eq('owner_user_id', proj.owner_user_id)
      .order('created_at', { ascending: true });
    siblings = data ?? [];
  } else if (proj.client_email) {
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

  // updates du projet
  const { data: updates } = await supabase
    .from('project_updates')
    .select('id,progress,message,created_at')
    .eq('project_id', proj.id)
    .order('created_at', { ascending: false });

  // on n’a plus "payload" dans submissions côté prod actuel,
  // donc on ne va pas charger d’ancienne submission (pour éviter erreurs avec ancien schéma).
  // On check juste s’il y a un contrat signé côté projet.
  const signedPdf =
    Array.isArray(proj.signed_contract_files) &&
    proj.signed_contract_files.length > 0
      ? proj.signed_contract_files[0]
      : null;

  return (
    <ClientProjectPage
      proj={proj}
      displayTitle={displayTitle}
      updates={updates ?? []}
      signedPdf={signedPdf}
    />
  );
}
