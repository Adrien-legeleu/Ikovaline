// app/logout/page.tsx
export const dynamic = 'force-dynamic';

import { redirect } from 'next/navigation';
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

export default async function LogoutPage() {
  const cookieStore = cookies();

  // ✅ Version propre et sans warning
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          } catch {
            // ignore errors
          }
        },
      },
    }
  );

  // ✅ Déconnexion propre
  await supabase.auth.signOut();

  // ✅ Redirection après déconnexion
  redirect('/');
}
