// app/api/messages/route.ts
import { NextResponse } from 'next/server';
import { getServerSupabase } from '@/lib/threads';

export async function GET(req: Request) {
  const supabase = await getServerSupabase();
  const url = new URL(req.url);
  const thread_id = url.searchParams.get('thread_id');
  if (!thread_id)
    return NextResponse.json({ error: 'thread_id required' }, { status: 400 });

  const project_id = url.searchParams.get('project_id');
  const before = url.searchParams.get('before');
  const limit = Number(url.searchParams.get('limit') || 30);

  let q = supabase
    .from('messages')
    .select('*')
    .eq('thread_id', thread_id)
    .order('created_at', { ascending: false })
    .limit(limit);
  if (project_id) q = q.eq('project_id', project_id);
  if (before) q = q.lt('created_at', before);

  const { data, error } = await q;
  if (error)
    return NextResponse.json({ error: error.message }, { status: 400 });
  return NextResponse.json({ items: data });
}

export async function POST(req: Request) {
  const supabase = await getServerSupabase();
  const {
    thread_id,
    body,
    attachments = [],
    project_id = null,
  } = await req.json();

  if (!thread_id)
    return NextResponse.json({ error: 'thread_id required' }, { status: 400 });

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user)
    return NextResponse.json({ error: 'unauthenticated' }, { status: 401 });

  const payload = {
    thread_id,
    sender_id: user.id,
    type: 'text' as const,
    body: body ?? null,
    attachments,
    project_id,
  };

  const { data, error } = await supabase
    .from('messages')
    .insert(payload)
    .select('*')
    .single();
  if (error)
    return NextResponse.json({ error: error.message }, { status: 400 });

  await supabase
    .from('threads')
    .update({ last_message_at: new Date().toISOString() })
    .eq('id', thread_id);

  return NextResponse.json(data);
}
