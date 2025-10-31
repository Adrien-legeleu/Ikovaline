import { cookies } from 'next/headers';
import { createServerClient } from '@supabase/ssr';
import AccountClient from '@/components/ClientSpace/Account/AccountClient';

export const dynamic = 'force-dynamic';

export default async function AccountPage() {
  const cookieStore = await cookies();
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { cookies: { get: (n: string) => cookieStore.get(n)?.value } }
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return (
      <section className="min-h-[60vh] grid place-items-center">
        <div className="text-center">
          <h1 className="text-2xl font-semibold">Mon compte</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Vous devez être connecté pour accéder à cette page.
          </p>
        </div>
      </section>
    );
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select('full_name,email,phone,company,role,status,created_at')
    .eq('id', user.id)
    .maybeSingle();

  return (
    <AccountClient
      email={user.email ?? ''}
      profile={{
        full_name: profile?.full_name ?? '',
        email: profile?.email ?? user.email ?? '',
        phone: profile?.phone ?? '',
        company: profile?.company ?? '',
        role: profile?.role ?? 'user',
        status: profile?.status ?? 'active',
        created_at: profile?.created_at ?? user?.created_at ?? '',
      }}
    />
  );
}
