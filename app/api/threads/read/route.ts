// app/api/threads/read/route.ts
import { NextResponse } from 'next/server';
import { getServerSupabase } from '@/lib/threads';

export async function POST(req: Request) {
  const supabase = await getServerSupabase();
  const { thread_id } = await req.json();
  if (!thread_id)
    return NextResponse.json({ error: 'thread_id required' }, { status: 400 });

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user)
    return NextResponse.json({ error: 'unauthenticated' }, { status: 401 });

  await supabase.from('thread_participants').upsert({
    thread_id,
    user_id: user.id,
    last_read_at: new Date().toISOString(),
  });

  return NextResponse.json({ ok: true });
}
