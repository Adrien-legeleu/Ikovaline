// app/auth/callback/page.tsx
'use client';
import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { supabase } from '@/lib/SupabaseClient';

export default function AuthCallback() {
  const router = useRouter();
  const sp = useSearchParams();

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      const next = sp.get('next') || '/dashboard'; // <-- no "(client)" in URLs
      router.replace(data.session ? next : '/signin');
    });
  }, [router, sp]);

  return (
    <main className="min-h-[100dvh] grid place-items-center">
      <p className="text-sm text-muted-foreground">Connexion en cours…</p>
    </main>
  );
}
