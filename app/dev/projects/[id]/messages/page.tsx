import { cookies, headers } from 'next/headers';
import { createServerClient } from '@supabase/ssr';
import MessageList from '@/components/ClientSpace/Chat/MessageList';
import Composer from '@/components/ClientSpace/Chat/Composer';

export const dynamic = 'force-dynamic';

type Props = { params: { id: string } };

export default async function DevProjectMessages({ params }: Props) {
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

  // Vérifier que le dev est bien assigné (RLS s’en charge aussi)
  const { data: assign } = await supabase
    .from('project_assignments')
    .select('id')
    .eq('project_id', params.id)
    .eq('user_id', user.id)
    .eq('active', true)
    .maybeSingle();

  if (!assign)
    return <div className="p-6">Accès interdit / Projet non assigné.</div>;

  // Récup messages par projet (30 derniers)
  const { data: init } = await supabase
    .from('messages')
    .select('*')
    .eq('project_id', params.id)
    .order('created_at', { ascending: false })
    .limit(30);

  return (
    <section className="h-[calc(100dvh-140px)] rounded-[2rem] overflow-hidden">
      {/* Header minimal */}
      <div className="px-4 py-3 z-20">
        <div className="text-sm opacity-70">Conversation projet</div>
        <h1 className="text-xl font-semibold">#{params.id.slice(0, 6)}</h1>
      </div>

      {/* Liste + Composer */}
      <div className="grid grid-rows-[1fr,auto] h-full">
        <MessageList
          mode="dev"
          threadId={null}
          currentUserId={user.id}
          initial={init || []}
          projectId={params.id}
        />
        <div className="sticky bottom-0">
          <Composer
            threadId={''}
            projectId={params.id}
            currentUserId={user.id}
          />
        </div>
      </div>
    </section>
  );
}
