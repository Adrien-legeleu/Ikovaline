// lib/threads.ts
import { createServerClient } from '@supabase/ssr';
import { cookies, headers } from 'next/headers';

export async function getServerSupabase() {
  const cookieStore = await cookies();
  const headerList = await headers();
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: { get: (n: string) => cookieStore.get(n)?.value },
      global: {
        headers: { 'x-forwarded-for': headerList.get('x-forwarded-for') ?? '' },
      },
    }
  );
}

export async function getOrCreateAccountThread() {
  const supabase = await getServerSupabase();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user?.email) throw new Error('Unauthenticated');

  const { data: existing } = await supabase
    .from('threads')
    .select('*')
    .eq('account_email', user.email)
    .maybeSingle();

  if (existing) {
    await supabase
      .from('thread_participants')
      .upsert({ thread_id: existing.id, user_id: user.id, role: 'member' });
    return existing;
  }

  const { data: thread, error } = await supabase
    .from('threads')
    .insert({ account_email: user.email, created_by: user.id })
    .select('*')
    .single();
  if (error) throw error;

  await supabase
    .from('thread_participants')
    .upsert({ thread_id: thread.id, user_id: user.id, role: 'member' });

  return thread;
}
