'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/SupabaseClient';

export default function FinishPage() {
  const router = useRouter();
  const [status, setStatus] = useState<'loading' | 'error'>('loading');
  const [debugInfo, setDebugInfo] = useState<string>('');

  useEffect(() => {
    const run = async () => {
      try {
        console.log('🔍 URL complète:', window.location.href);
        console.log('🔍 Hash:', window.location.hash);
        console.log('🔍 Search params:', window.location.search);

        setDebugInfo(`URL: ${window.location.href}`);

        // 1️⃣ Attendre un peu que Supabase traite le hash
        await new Promise((resolve) => setTimeout(resolve, 500));

        // 2️⃣ Tenter de récupérer la session
        console.log('🔍 Tentative getSession...');
        const { data: sessionData, error: sessionError } =
          await supabase.auth.getSession();

        console.log('🔍 Session data:', sessionData);
        console.log('🔍 Session error:', sessionError);

        if (sessionError) {
          setDebugInfo(
            (prev) => prev + `\nErreur session: ${sessionError.message}`
          );
          console.error('❌ Session error:', sessionError);
          setStatus('error');
          return;
        }

        if (!sessionData.session) {
          setDebugInfo((prev) => prev + '\nAucune session trouvée');
          console.error('❌ Pas de session');

          // 🔥 Tentative de récupération manuelle depuis le hash
          const hash = window.location.hash.substring(1);
          const params = new URLSearchParams(hash);
          const accessToken = params.get('access_token');
          const refreshToken = params.get('refresh_token');

          console.log(
            '🔍 Access token dans hash:',
            accessToken ? 'OUI' : 'NON'
          );
          console.log(
            '🔍 Refresh token dans hash:',
            refreshToken ? 'OUI' : 'NON'
          );

          if (accessToken && refreshToken) {
            console.log('🔄 Tentative setSession manuelle...');
            const { data: manualSession, error: manualError } =
              await supabase.auth.setSession({
                access_token: accessToken,
                refresh_token: refreshToken,
              });

            console.log('🔍 Manual session data:', manualSession);
            console.log('🔍 Manual session error:', manualError);

            if (manualError || !manualSession.session) {
              setDebugInfo(
                (prev) =>
                  prev +
                  `\nErreur setSession: ${manualError?.message || 'Aucune session'}`
              );
              setStatus('error');
              return;
            }

            // Utiliser la session manuelle
            sessionData.session = manualSession.session;
          } else {
            setStatus('error');
            return;
          }
        }

        console.log('✅ Session OK:', sessionData.session.user.email);
        setDebugInfo(
          (prev) => prev + `\nSession OK: ${sessionData.session.user.email}`
        );

        // 3️⃣ Sauvegarder dans les cookies
        console.log('💾 Sauvegarde cookies...');
        const cookieRes = await fetch('/api/auth/set', {
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

        console.log('🔍 Cookie response:', cookieRes.ok);

        // 4️⃣ Récupérer le profil
        console.log('👤 Récupération profil...');
        const { data: profile, error: profileError } = await supabase
          .from('profiles')
          .select('role')
          .eq('id', sessionData.session.user.id)
          .single();

        console.log('🔍 Profile:', profile);
        console.log('🔍 Profile error:', profileError);

        setDebugInfo((prev) => prev + `\nProfil: ${profile?.role || 'aucun'}`);

        // 5️⃣ Récupérer le "next"
        const url = new URL(window.location.href);
        const nextParam = url.searchParams.get('next') || undefined;

        console.log('🔍 Next param:', nextParam);

        // 6️⃣ Rediriger
        const destination =
          profile?.role === 'admin'
            ? '/admin/dashboard'
            : profile?.role === 'dev'
              ? '/dev/projects'
              : nextParam || '/dashboard';

        console.log('🎯 Redirection vers:', destination);

        router.replace(destination);
      } catch (err: any) {
        console.error('❌ Fatal error:', err);
        setDebugInfo((prev) => prev + `\nErreur fatale: ${err.message}`);
        setStatus('error');
      }
    };

    run();
  }, [router]);

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center max-w-2xl px-6">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-primary border-r-transparent mb-4"></div>
          <p className="text-muted-foreground mb-4">Connexion en cours…</p>
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
        <pre className="text-left text-xs bg-muted p-4 rounded overflow-auto max-h-96 mb-6">
          {debugInfo}
        </pre>
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
