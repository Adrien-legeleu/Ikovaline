// app/admin/messages/[threadId]/page.tsx
import AdminChatShell from '@/components/ClientSpace/Chat/AdminThreadClient';
import { createServerClient } from '@supabase/ssr';
import { cookies, headers } from 'next/headers';

export const dynamic = 'force-dynamic';

type Props = { params: { threadId: string } };

export default async function AdminThread({ params }: Props) {
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
  } = await supabase.auth.getUser();
  if (!user) return <div className="p-6">Non connecté.</div>;
  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single();
  if (profile?.role !== 'admin')
    return <div className="p-6">Accès interdit.</div>;

  const { data: thread } = await supabase
    .from('threads')
    .select('*')
    .eq('id', params.threadId)
    .single();
  if (!thread) return <div className="p-6">Thread introuvable.</div>;

  const { data: projects } = await supabase
    .from('projects')
    .select('id,title')
    .eq('client_email', thread.account_email)
    .order('created_at', { ascending: true });

  const { data: init } = await supabase
    .from('messages')
    .select('*')
    .eq('thread_id', thread.id)
    .order('created_at', { ascending: false })
    .limit(30);

  return (
    <section className="h-[calc(100dvh-80px)] rounded-2xl border overflow-hidden grid grid-rows-[auto,1fr,auto]">
      {/* Client shell */}

      <AdminChatShell
        threadId={thread.id}
        currentUserId={user!.id}
        initial={init || []}
        projects={(projects || []).map((p) => ({
          id: p.id,
          title: p.title || 'Projet',
        }))}
      />
    </section>
  );
}
