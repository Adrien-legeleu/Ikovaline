// deno-lint-ignore-file
// @ts-nocheck

import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

Deno.serve(async () => {
  const supa = createClient(
    Deno.env.get('SUPABASE_URL')!,
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!,
    { db: { schema: 'public' } }
  );

  const nowIso = new Date().toISOString();

  // 1. Tous les projets planifiés dont la date de démarrage est atteinte
  const { data: dueProjects, error: fetchErr } = await supa
    .from('projects')
    .select('id')
    .eq('status', 'scheduled')
    .lte('start_at', nowIso);

  if (fetchErr) {
    console.error('[auto-start-projects] fetchErr:', fetchErr.message);
    return new Response(fetchErr.message, { status: 500 });
  }

  if (!dueProjects?.length) {
    return new Response('Aucun projet à démarrer', { status: 200 });
  }

  const ids = dueProjects.map((p) => p.id);

  // 2. Les passer en in_progress
  const { error: updateErr } = await supa
    .from('projects')
    .update({ status: 'in_progress' })
    .in('id', ids);

  if (updateErr) {
    console.error('[auto-start-projects] updateErr:', updateErr.message);
    return new Response(updateErr.message, { status: 500 });
  }

  return new Response(`Projets démarrés automatiquement: ${ids.length}`, {
    status: 200,
  });
});
