// app/admin/messages/page.tsx
import { createServerClient } from '@supabase/ssr';
import { cookies, headers } from 'next/headers';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default async function AdminInbox() {
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

  const { data: threads } = await supabase
    .from('threads')
    .select('id, account_email, last_message_at')
    .order('last_message_at', { ascending: false });

  // quick previews
  const previews: Record<string, any> = {};
  if (threads?.length) {
    for (const t of threads) {
      const { data } = await supabase
        .from('messages')
        .select('body,type,created_at')
        .eq('thread_id', t.id)
        .order('created_at', { ascending: false })
        .limit(1)
        .maybeSingle();
      previews[t.id] = data;
    }
  }

  return (
    <section className="p-6">
      <h1 className="text-2xl font-semibold mb-4">Inbox</h1>
      <div className="rounded-2xl border divide-y">
        {(threads || []).map((t) => (
          <Link
            key={t.id}
            href={`/admin/messages/${t.id}`}
            className="flex items-center justify-between p-4 hover:bg-foreground/5"
          >
            <div>
              <div className="font-medium">{t.account_email}</div>
              <div className="text-xs text-muted-foreground">
                {(previews[t.id]?.type === 'system' ? '[Système] ' : '') +
                  (previews[t.id]?.body ?? 'Pièce jointe')}
              </div>
            </div>
            <div className="text-xs text-muted-foreground">
              {new Date(t.last_message_at).toLocaleString()}
            </div>
          </Link>
        ))}
        {(!threads || threads.length === 0) && (
          <div className="p-4 text-sm text-muted-foreground">Aucun thread.</div>
        )}
      </div>
    </section>
  );
}
