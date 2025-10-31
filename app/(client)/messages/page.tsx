// app/(client)/messages/page.tsx
import ClientChatShell from '@/components/ClientSpace/Chat/MessagesShell';
import { getOrCreateAccountThread, getServerSupabase } from '@/lib/threads';

export const dynamic = 'force-dynamic';

export default async function MessagesPage() {
  const supabase = await getServerSupabase();
  const thread = await getOrCreateAccountThread();

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return <div className="p-6">Non connecté.</div>;

  const { data: projects } = await supabase
    .from('projects')
    .select('id,title,client_email,owner_user_id,created_at')
    .or(`client_email.eq.${user.email},owner_user_id.eq.${user.id}`)
    .order('created_at', { ascending: true });

  const { data: init } = await supabase
    .from('messages')
    .select('*')
    .eq('thread_id', thread.id)
    .order('created_at', { ascending: false })
    .limit(30);

  return (
    <section className="h-[calc(100vh-200px)] max-h-[100vh] ">
      <div className="h-full rounded-[2rem] relative backdrop-blur-xl shadow-[0_12px_50px_rgba(0,0,0,0.08)] grid grid-rows-[auto,1fr,auto]">
        <ClientChatShell
          threadId={thread.id}
          currentUserId={user.id}
          initial={init || []}
          projects={(projects || []).map((p) => ({
            id: p.id,
            title: p.title || 'Projet',
          }))}
        />
      </div>
    </section>
  );
}
