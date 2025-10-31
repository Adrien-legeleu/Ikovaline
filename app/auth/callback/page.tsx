'use client';

import { Suspense, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { supabase } from '@/lib/SupabaseClient';

function CallbackInner() {
  const router = useRouter();
  const sp = useSearchParams();

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      const next = sp.get('next') || '/dashboard';
      router.replace(data.session ? next : '/signin');
    });
  }, [router, sp]);

  return (
    <main className="min-h-[100dvh] grid place-items-center">
      <p className="text-sm text-muted-foreground">Connexion en cours…</p>
    </main>
  );
}

export default function AuthCallback() {
  return (
    <Suspense fallback={null}>
      <CallbackInner />
    </Suspense>
  );
}
