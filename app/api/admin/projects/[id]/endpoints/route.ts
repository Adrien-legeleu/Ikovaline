export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  const body = await req.json().catch(() => ({}));
  const { endpoints } = body as { endpoints: string[] };

  if (!Array.isArray(endpoints)) {
    return NextResponse.json(
      { error: 'endpoints doit être un tableau de string' },
      { status: 400 }
    );
  }

  const supa = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { db: { schema: 'public' } }
  );

  // merge extra
  const { data: proj, error: e1 } = await supa
    .from('projects')
    .select('extra')
    .eq('id', params.id)
    .single();
  if (e1) return NextResponse.json({ error: e1.message }, { status: 500 });

  const nextExtra = { ...(proj?.extra ?? {}), endpoints };

  const { error: e2 } = await supa
    .from('projects')
    .update({ extra: nextExtra })
    .eq('id', params.id);

  if (e2) return NextResponse.json({ error: e2.message }, { status: 500 });

  return NextResponse.json({ ok: true });
}
