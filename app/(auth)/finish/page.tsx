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
        // 🔥 Fonction pour attendre la session (max 5 secondes)
        const waitForSession = async (maxAttempts = 10, delayMs = 500) => {
          for (let i = 0; i < maxAttempts; i++) {
            const { data, error } = await supabase.auth.getSession();

            if (data.session) {
              console.log(`✅ Session trouvée après ${i * delayMs}ms`);
              return { data, error: null };
            }

            // Attendre avant le prochain essai
            if (i < maxAttempts - 1) {
              await new Promise((resolve) => setTimeout(resolve, delayMs));
            }
          }

          // Timeout : pas de session après 5 secondes
          return { data: { session: null }, error: null };
        };

        // 1️⃣ Attendre la session avec polling
        let { data: sessionData } = await waitForSession();

        // 2️⃣ Fallback : parser le hash manuellement
        if (!sessionData.session) {
          console.log('🔄 Fallback: parsing manuel du hash');
          const hash = window.location.hash.substring(1);
          const params = new URLSearchParams(hash);
          const accessToken = params.get('access_token');
          const refreshToken = params.get('refresh_token');

          if (accessToken && refreshToken) {
            const { data: manualSession, error: manualError } =
              await supabase.auth.setSession({
                access_token: accessToken,
                refresh_token: refreshToken,
              });

            if (manualError || !manualSession.session) {
              console.error('❌ setSession échoué:', manualError);
              setStatus('error');
              return;
            }

            sessionData = manualSession;
            console.log('✅ Session créée manuellement');
          } else {
            console.error('❌ Pas de tokens dans le hash');
            setStatus('error');
            return;
          }
        }

        if (!sessionData.session) {
          setStatus('error');
          return;
        }

        // 3️⃣ Sauvegarder en cookie
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

        // 4️⃣ Récupérer le profil
        const { data: profile } = await supabase
          .from('profiles')
          .select('role')
          .eq('id', sessionData.session.user.id)
          .single();

        // 5️⃣ Rediriger selon le rôle
        const url = new URL(window.location.href);
        const nextParam = url.searchParams.get('next') || undefined;

        if (profile?.role === 'admin') {
          router.replace('/admin/dashboard');
        } else if (profile?.role === 'dev') {
          router.replace('/dev/projects');
        } else {
          router.replace(nextParam || '/dashboard');
        }
      } catch (err) {
        console.error('❌ FinishPage error:', err);
        setStatus('error');
      }
    };

    run();
  }, [router]);

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-primary border-r-transparent mb-4"></div>
          <p className="text-muted-foreground">Connexion en cours…</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center max-w-md px-6">
        <div className="mb-4 text-6xl">❌</div>
        <h1 className="text-xl font-semibold mb-2">Lien invalide ou expiré</h1>
        <p className="text-muted-foreground mb-6">
          Le lien de connexion a expiré ou a déjà été utilisé.
        </p>
        <a
          href="/signin"
          className="inline-block rounded-[1.1rem] bg-primary text-white px-6 py-3 font-medium hover:opacity-90 transition"
        >
          Retour à la connexion
        </a>
      </div>
    </div>
  );
}
