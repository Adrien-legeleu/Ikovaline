// app/(auth)/finish/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { supabase } from '@/lib/SupabaseClient';

export default function Finish() {
  const router = useRouter();
  const sp = useSearchParams();
  const next = sp.get('next') || undefined;
  const [msg, setMsg] = useState('Connexion en cours…');

  useEffect(() => {
    const run = async () => {
      try {
        // 1) Échange PKCE via l’URL complète (?code=...)
        const { error } = await supabase.auth.exchangeCodeForSession(
          window.location.href
        );
        if (error) throw error;

        // 2) (optionnel) sync cookies HTTP-only côté serveur
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

        // 3) route selon rôle / next
        const {
          data: { user },
        } = await supabase.auth.getUser();
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
        // Fallback implicite: si jamais le provider a renvoyé un fragment #access_token=...
        // supabase-js sait parser automatiquement à l’arrivée sur la page.
        setTimeout(async () => {
          const { data: sessionData } = await supabase.auth.getSession();
          if (sessionData.session) {
            // on a bien une session -> route comme plus haut
            const {
              data: { user },
            } = await supabase.auth.getUser();
            const { data: profile } = await supabase
              .from('profiles')
              .select('role')
              .eq('id', user!.id)
              .single();

            if (next) router.replace(next);
            else if (profile?.role === 'admin')
              router.replace('/admin/dashboard');
            else router.replace('/dashboard');
            return;
          }

          // Toujours pas de session -> message explicite (PKCE)
          setMsg(
            "Lien invalide ou expiré. Ouvre le lien dans le même navigateur que celui utilisé pour demander l'e-mail, puis réessaie."
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
