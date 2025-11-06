'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/SupabaseClient';

export default function FinishPage() {
  const router = useRouter();
  const [status, setStatus] = useState<'loading' | 'error'>('loading');

  useEffect(() => {
    const run = async () => {
      try {
        const { error } = await supabase.auth.exchangeCodeForSession(
          window.location.href
        );
        if (error) {
          console.error('exchangeCodeForSession error', error);
          setStatus('error');
          return;
        }

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

        const url = new URL(window.location.href);
        const nextParam = url.searchParams.get('next') || undefined;

        if (!profile?.role) {
          router.replace(nextParam || '/dashboard');
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
            router.replace(nextParam || '/dashboard');
            break;
        }
      } catch (err) {
        console.error('FinishPage error', err);
        setStatus('error');
      }
    };

    run();
  }, [router]);

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Connexion en cours…</p>
      </div>
    );
  }

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
