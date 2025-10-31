// app/api/admin/projects/[id]/schedule/route.ts
export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  const body = await req.json().catch(() => ({}));

  const { startNow, start_at, deadline } = body as {
    startNow?: boolean;
    start_at?: string; // ISO genre "2025-11-03T09:00:00.000Z"
    deadline?: string; // "2025-11-20"
  };

  const supa = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { db: { schema: 'public' } }
  );

  // On va builder exactement ce qu'on veut écrire dans la row projects
  const patch: Record<string, any> = {};

  if (startNow) {
    // L'admin force le lancement maintenant
    patch.start_at = new Date().toISOString();
    patch.status = 'in_progress';
  } else {
    // planification classique
    if (start_at !== undefined) {
      patch.start_at = start_at || null;

      // si une date future est définie et que le projet est encore brouillon,
      // on le marque comme "scheduled" (planifié)
      if (start_at) {
        patch.status = 'scheduled';
      } else {
        // si l'admin retire la date (null), on repasse pas forcément in_progress,
        // on ne touche pas le status ici
      }
    }
  }

  if (deadline !== undefined) {
    patch.deadline = deadline || null;
  }

  const { error } = await supa
    .from('projects')
    .update(patch)
    .eq('id', params.id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
