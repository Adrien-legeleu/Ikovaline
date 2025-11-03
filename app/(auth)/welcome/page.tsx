'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/SupabaseClient';

// util: parse le fragment "#a=1&b=2" -> { a: "1", b: "2" }
function parseHashParams(hash: string): Record<string, string> {
  const h = hash.replace(/^#/, '');
  const out: Record<string, string> = {};
  for (const part of h.split('&')) {
    if (!part) continue;
    const [k, v] = part.split('=');
    if (!k) continue;
    out[decodeURIComponent(k)] = decodeURIComponent(v ?? '');
  }
  return out;
}

export default function WelcomePage() {
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [hasSession, setHasSession] = useState(false);

  const [password, setPassword] = useState('');
  const [toast, setToast] = useState<string | null>(null);

  const [userEmail, setUserEmail] = useState<string>('');

  useEffect(() => {
    let mounted = true;

    (async () => {
      // 1. on regarde si on a déjà une session
      let { data } = await supabase.auth.getSession();

      // 2. si pas de session, on tente d'en créer une à partir du hash du lien magic
      if (!data.session) {
        const params = parseHashParams(window.location.hash || '');
        const access_token = params['access_token'];
        const refresh_token = params['refresh_token'];

        if (access_token && refresh_token) {
          // on injecte la session côté client
          const { data: setData, error: setErr } =
            await supabase.auth.setSession({
              access_token,
              refresh_token,
            });

          if (setErr) {
            console.warn('setSession error', setErr);
          }

          // on relit la session après setSession
          if (setData?.session) {
            data = { session: setData.session };
          }
        }
      }

      if (!mounted) return;

      const sessionExists = !!data.session;
      setHasSession(sessionExists);

      if (sessionExists && data.session?.user?.email) {
        setUserEmail(data.session.user.email);
      }

      setLoading(false);
    })();

    return () => {
      mounted = false;
    };
  }, []);

  // Enregistre le mdp choisi par le client
  const onSubmit = async () => {
    setToast(null);

    if (!password || password.length < 8) {
      setToast('Mot de passe trop court (min. 8 caractères).');
      return;
    }

    // met à jour le mot de passe de l'utilisateur courant
    const { error } = await supabase.auth.updateUser({ password });
    if (error) {
      setToast(
        error.message || 'Erreur lors de la mise à jour du mot de passe.'
      );
      return;
    }

    // déconnecte pour partir sur un vrai login propre
    await supabase.auth.signOut();

    router.push('/signin');
  };

  // ÉTAT = chargement
  if (loading) {
    return (
      <section className="mx-auto max-w-md px-4 md:px-8 py-16">
        <div className="rounded-[3rem] p-8 bg-white/70 dark:bg-neutral-900/70 backdrop-blur text-center ring-1 ring-black/[0.03] dark:ring-white/[0.06]">
          <div className="text-sm text-neutral-500 dark:text-neutral-400">
            Chargement…
          </div>
        </div>
      </section>
    );
  }

  // PAS DE SESSION = lien pas valide / déjà utilisé / expiré
  if (!hasSession) {
    return (
      <section className="mx-auto max-w-md px-4 md:px-8 py-16">
        <div className="rounded-[3rem] p-8 bg-white/70 dark:bg-neutral-900/70 backdrop-blur text-center ring-1 ring-black/[0.03] dark:ring-white/[0.06]">
          <h1 className="text-2xl font-semibold">Lien invalide ou expiré</h1>
          <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-400">
            Merci de demander un nouvel email d’accès.
          </p>
        </div>
      </section>
    );
  }

  // SESSION OK → on laisse définir le mot de passe
  return (
    <section className="mx-auto max-w-md px-4 md:px-8 py-16">
      <div className="rounded-[3rem] p-8 bg-white/70 dark:bg-neutral-900/70 backdrop-blur ring-1 ring-black/[0.03] dark:ring-white/[0.06]">
        <div className="text-center">
          <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 bg-neutral-100/70 dark:bg-neutral-800/70 ring-1 ring-black/[0.03] dark:ring-white/[0.06]">
            <span className="text-xs font-medium tracking-wide text-neutral-600 dark:text-neutral-300">
              Bienvenue
            </span>
          </div>

          <h1 className="mt-4 text-3xl font-extrabold tracking-tight">
            Définir votre mot de passe
          </h1>

          <p className="mt-2 text-neutral-600 dark:text-neutral-400">
            {userEmail
              ? `Compte lié à ${userEmail}`
              : 'Après validation, vous pourrez vous connecter.'}
          </p>
        </div>

        <div className="mt-6">
          <label className="text-sm font-medium">
            Nouveau mot de passe{' '}
            <span className="text-neutral-400 dark:text-neutral-500 font-normal">
              (min. 8 caractères)
            </span>
          </label>

          <input
            type="password"
            className="mt-1 w-full rounded-2xl bg-white/70 dark:bg-neutral-900/70 px-3 py-2 ring-1 ring-black/[0.05] dark:ring-white/[0.08] outline-none"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            onClick={onSubmit}
            className="mt-4 w-full rounded-3xl px-5 py-3 font-semibold bg-primary text-white dark:bg-white dark:text-neutral-900 hover:brightness-110 active:scale-[.99] transition"
          >
            Valider et se connecter
          </button>
        </div>

        {toast ? (
          <div className="mt-4 rounded-2xl px-4 py-3 bg-neutral-100/70 dark:bg-neutral-800/70 text-sm text-neutral-700 dark:text-neutral-200">
            {toast}
          </div>
        ) : null}
      </div>
    </section>
  );
}
