'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { supabase } from '@/lib/SupabaseClient';

export default function FinishPage() {
  const router = useRouter();
  const search = useSearchParams();
  const nextParam = search.get('next') || undefined;
  const [status, setStatus] = useState<'loading' | 'error'>('loading');

  useEffect(() => {
    const run = async () => {
      // 1️⃣ Consommer le token dans l’URL (hash) et créer la session
      const { data, error } = await supabase.auth.exchangeCodeForSession(
        window.location.href
      );

      if (error) {
        console.error(error);
        setStatus('error');
        return;
      }

      // 2️⃣ Synchroniser la session côté backend (cookies HTTP-only)
      const { data: sessionData, error: sErr } =
        await supabase.auth.getSession();
      if (!sErr && sessionData.session) {
        await fetch('/api/auth/set', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            event: 'SIGNED_IN',
            session: {
              access_token: sessionData.session.access_token,
              refresh_token: sessionData.session.refresh_token,
            },
            persist: true,
          }),
        });
      }

      // 3️⃣ Rôle + redirection
      const { data: userData } = await supabase.auth.getUser();
      const user = userData.user;
      if (!user) {
        setStatus('error');
        return;
      }

      const { data: profile } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', user.id)
        .single();

      // ⬇️ pas besoin de setStatus('ok'), on redirige direct
      if (!profile?.role) {
        router.replace('/dashboard');
        return;
      }

      switch (profile.role) {
        case 'admin':
          router.replace('/admin/dashboard');
          break;
        case 'dev':
          router.replace('/dev/projects');
          break;
        default:
          if (nextParam) {
            router.replace(nextParam);
          } else {
            router.replace('/dashboard');
          }
          break;
      }
    };

    run();
  }, [router, search, nextParam]);

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Connexion en cours…</p>
      </div>
    );
  }

  // status === 'error'
  return (
    <div className="min-h-screen flex items-center justify-center">
      <p className="text-red-600 text-center">
        Le lien de connexion est invalide ou expiré.
        <br />
        Retourne sur la page de connexion et demande un nouveau lien.
      </p>
    </div>
  );
}
