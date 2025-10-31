// app/(auth)/finish/page.tsx
'use client';

import { Suspense, useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { supabase } from '@/lib/SupabaseClient';

function FinishInner() {
  const router = useRouter();
  const sp = useSearchParams();
  const next = sp.get('next') || undefined;
  const [msg, setMsg] = useState('Connexion en cours…');

  useEffect(() => {
    const run = async () => {
      try {
        const { error } = await supabase.auth.exchangeCodeForSession(
          window.location.href
        );
        if (error) throw error;

        const { data: sessionData, error: sErr } =
          await supabase.auth.getSession();
        if (sErr) throw sErr;

        await fetch('/api/auth/set', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            event: 'SIGNED_IN',
            session: {
              access_token: sessionData.session?.access_token!,
              refresh_token: sessionData.session?.refresh_token ?? null,
            },
            persist: true,
          }),
        });

        const { data: userData } = await supabase.auth.getUser();
        const user = userData.user;
        if (!user) throw new Error('Session introuvable');

        const { data: profile } = await supabase
          .from('profiles')
          .select('role')
          .eq('id', user.id)
          .single();

        if (next) router.replace(next);
        else if (profile?.role === 'admin') router.replace('/admin/dashboard');
        else router.replace('/dashboard');
      } catch (e) {
        setTimeout(async () => {
          const { data: sessionData } = await supabase.auth.getSession();
          if (sessionData.session) {
            const { data: userData } = await supabase.auth.getUser();
            const { data: profile } = await supabase
              .from('profiles')
              .select('role')
              .eq('id', userData.user!.id)
              .single();

            if (next) router.replace(next);
            else if (profile?.role === 'admin')
              router.replace('/admin/dashboard');
            else router.replace('/dashboard');
            return;
          }

          setMsg(
            'Lien invalide ou expiré. Réessaie depuis le même navigateur.'
          );
          setTimeout(() => router.replace('/signin'), 1800);
        }, 150);
      }
    };
    run();
  }, [router, next]);

  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="rounded-2xl border p-6 bg-card/70 text-sm">{msg}</div>
    </div>
  );
}

export default function Finish() {
  return (
    <Suspense
      fallback={
        <div className="p-8 text-center text-muted-foreground">Chargement…</div>
      }
    >
      <FinishInner />
    </Suspense>
  );
}
