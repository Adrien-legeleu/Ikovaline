import { cookies, headers } from 'next/headers';
import { createServerClient } from '@supabase/ssr';
import DevTopNav from '@/components/ClientSpace/DevTopNav';
import { ThemeLockLight } from '@/components/ThemeLock';

export const dynamic = 'force-dynamic';

async function requireDevOrAdmin() {
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
  if (!user) return { allowed: false };

  const { data: profile } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user.id)
    .single();
  const allowed = profile?.role === 'dev' || profile?.role === 'admin';
  return { allowed };
}

export default async function DevLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { allowed } = await requireDevOrAdmin();
  if (!allowed) return <div className="p-6">Accès interdit.</div>;
  return (
    <div className="min-h-dvh">
      <ThemeLockLight />
      <DevTopNav />
      <div className="h-[20px] md:h-[90px]" />

      <main className="mx-auto max-w-7xl px-4  pb-14">{children}</main>
    </div>
  );
}
