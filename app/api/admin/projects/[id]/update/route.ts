// app/api/admin/projects/[id]/update/route.ts
export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export async function POST(
  req: Request,
  { params }: { params: { id: string } }
) {
  const body = await req.json().catch(() => ({}));
  const { progress, message } = body as {
    progress: number;
    message: { done?: string[]; next?: string[] };
  };

  // --- validation inputs ---
  if (typeof progress !== 'number' || progress < 0 || progress > 100) {
    return NextResponse.json(
      { error: 'progress doit être entre 0 et 100' },
      { status: 400 }
    );
  }
  if (
    !message ||
    (!Array.isArray(message.done) && !Array.isArray(message.next))
  ) {
    return NextResponse.json(
      { error: 'message.done ou message.next requis' },
      { status: 400 }
    );
  }

  // --- supabase service role (secure backend only) ---
  const supa = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { db: { schema: 'public' } }
  );

  // 1️⃣ créer la nouvelle ligne dans project_updates
  // headline: petit résumé automatique genre "Update du 28 oct" (sinon ça casse car NOT NULL)
  const headline = `Mise à jour du projet`;

  const { error: insertErr } = await supa.from('project_updates').insert({
    project_id: params.id,
    progress,
    headline,
    done: message.done ?? [],
    next: message.next ?? [],
    blockers: [], // pour l'instant vide
    is_visible_client: true,
    // author_user_id: on pourrait l'ajouter si on veut, mais ici on ne l'a pas dans la requête
  });

  if (insertErr) {
    return NextResponse.json({ error: insertErr.message }, { status: 500 });
  }

  // 2️⃣ mettre à jour le projet: progress + statut automatique
  // logique statut :
  // - progress = 100 → completed
  // - sinon progress > 0 → in_progress
  // - sinon on ne change pas status
  const patch: Record<string, any> = {
    progress,
  };

  if (progress === 100) {
    patch.status = 'completed';
  } else if (progress > 0) {
    patch.status = 'in_progress';
  }

  const { error: updateErr } = await supa
    .from('projects')
    .update(patch)
    .eq('id', params.id);

  if (updateErr) {
    return NextResponse.json({ error: updateErr.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
