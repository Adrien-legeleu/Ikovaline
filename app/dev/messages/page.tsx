import Link from 'next/link';
import { cookies, headers } from 'next/headers';
import { createServerClient } from '@supabase/ssr';

export const dynamic = 'force-dynamic';

export default async function DevMessagesIndex() {
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

  const { data: rows } = await supabase
    .from('project_assignments')
    .select('project_id, projects(id,title,last_message_at:created_at)')
    .eq('user_id', user.id)
    .eq('active', true);

  const items = (rows || []).map((r: any) => r.projects).filter(Boolean);

  return (
    <section className="p-6 space-y-6">
      <h1 className="text-2xl font-semibold">Messages (par projet)</h1>
      <div className="grid sm:grid-cols-2 gap-4">
        {items.map((p: any) => (
          <Link
            key={p.id}
            href={`/dev/projects/${p.id}/messages`}
            className="rounded-[2rem] p-4 bg-white/70 dark:bg-neutral-900/60 backdrop-blur-xl shadow-[14px_14px_36px_rgba(0,0,0,0.07),-14px_-14px_36px_rgba(255,255,255,0.6)]"
          >
            <div className="text-sm font-medium">{p.title || 'Projet'}</div>
            <div className="text-xs text-muted-foreground">
              Ouvrir la conversation
            </div>
          </Link>
        ))}
        {!items.length && (
          <div className="text-sm text-muted-foreground">Aucun projet.</div>
        )}
      </div>
    </section>
  );
}
