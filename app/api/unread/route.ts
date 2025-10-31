import { NextResponse } from 'next/server';
import { createServerClient } from '@supabase/ssr';
import { cookies, headers } from 'next/headers';

export const dynamic = 'force-dynamic';

export async function GET() {
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

  const {
    data: { user },
    error: uErr,
  } = await supabase.auth.getUser();
  if (uErr || !user)
    return NextResponse.json({ error: 'unauthenticated' }, { status: 401 });

  // 1) find the account thread (single thread per account)
  const { data: thread } = await supabase
    .from('threads')
    .select('*')
    .eq('account_email', user.email!)
    .order('created_at', { ascending: true })
    .limit(1)
    .maybeSingle();

  if (!thread)
    return NextResponse.json({ total: 0, perProject: {}, threadId: null });

  // 2) last_read
  const { data: meTp } = await supabase
    .from('thread_participants')
    .select('last_read_at')
    .eq('thread_id', thread.id)
    .eq('user_id', user.id)
    .maybeSingle();

  const lastRead = meTp?.last_read_at ?? '1970-01-01T00:00:00Z';

  // 3) counts
  const { data: rows, error } = await supabase
    .from('messages')
    .select('project_id, created_at')
    .eq('thread_id', thread.id)
    .gt('created_at', lastRead);

  if (error)
    return NextResponse.json({ error: error.message }, { status: 400 });

  const perProject: Record<string, number> = {};
  let total = 0;
  for (const r of rows ?? []) {
    total += 1;
    const key = r.project_id ?? '__ALL__';
    perProject[key] = (perProject[key] ?? 0) + 1;
  }

  return NextResponse.json({ total, perProject, threadId: thread.id });
}
