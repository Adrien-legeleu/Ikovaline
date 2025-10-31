// app/create-password/page.tsx
'use client';

import { useEffect, useMemo, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

function parseHash(hash: string) {
  const params = new URLSearchParams(hash.replace(/^#/, ''));
  return {
    access_token: params.get('access_token') || '',
    refresh_token: params.get('refresh_token') || '',
    type: params.get('type') || '',
    error: params.get('error') || '',
    error_description: params.get('error_description') || '',
  };
}

export default function CreatePasswordPage() {
  const router = useRouter();
  const [phase, setPhase] = useState<
    'checking' | 'form' | 'saving' | 'done' | 'error'
  >('checking');
  const [msg, setMsg] = useState<string>('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');

  const hashInfo = useMemo(
    () => parseHash(typeof window !== 'undefined' ? window.location.hash : ''),
    []
  );

  useEffect(() => {
    const run = async () => {
      // Erreur fournie par Supabase dans le hash
      if (hashInfo.error) {
        setPhase('error');
        setMsg(
          decodeURIComponent(hashInfo.error_description || hashInfo.error)
        );
        // Rediriger gentiment vers /signin (suggestion mot de passe oublié)
        setTimeout(() => router.replace('/signin?reason=link_expired'), 1500);
        return;
      }

      // Lien non-recovery ou sans token -> invalide
      if (hashInfo.type !== 'recovery' || !hashInfo.access_token) {
        setPhase('error');
        setMsg(
          "Lien invalide. Merci de vous connecter puis d'utiliser « Mot de passe oublié » si besoin."
        );
        setTimeout(() => router.replace('/signin?reason=invalid_link'), 1500);
        return;
      }

      // Établir la session depuis le lien (utile si le SDK ne l’a pas fait automatiquement)
      // @ts-ignore refresh_token peut être vide selon les configs
      const { error: setErr } = await supabase.auth.setSession({
        access_token: hashInfo.access_token,
        refresh_token: hashInfo.refresh_token || '',
      });
      if (setErr) {
        setPhase('error');
        setMsg(
          setErr.message ||
            'Le lien a expiré. Veuillez demander un nouveau lien.'
        );
        setTimeout(() => router.replace('/signin?reason=link_expired'), 1500);
        return;
      }

      setPhase('form');
    };
    run();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (password.length < 8)
      return setMsg('Le mot de passe doit contenir au moins 8 caractères.');
    if (password !== password2)
      return setMsg('Les mots de passe ne correspondent pas.');

    setPhase('saving');
    setMsg('');
    const { error: updErr } = await supabase.auth.updateUser({ password });
    if (updErr) {
      setPhase('form');
      setMsg(updErr.message || 'Impossible de définir le mot de passe.');
      return;
    }

    setPhase('done');
    setTimeout(() => router.replace('/dashboard'), 800);
  }

  return (
    <div className="min-h-[60vh] flex items-center justify-center p-6">
      <div className="w-full max-w-md rounded-2xl border border-black/10 dark:border-white/10 p-6">
        <h1 className="text-2xl font-semibold mb-2">Créer mon mot de passe</h1>

        {phase === 'checking' && (
          <p className="text-sm text-muted-foreground">Validation du lien…</p>
        )}

        {phase === 'error' && (
          <>
            <p className="text-sm text-red-600 mb-3">{msg}</p>
            <p className="text-sm text-muted-foreground">
              Vous allez être redirigé vers la connexion.&nbsp; Sinon,{' '}
              <Link href="/signin" className="underline">
                retourner à la connexion
              </Link>{' '}
              ou utilisez{' '}
              <Link href="/forgot-password" className="underline">
                Mot de passe oublié
              </Link>
              .
            </p>
          </>
        )}

        {phase === 'form' && (
          <form onSubmit={onSubmit} className="space-y-4">
            {msg && <p className="text-sm text-red-600">{msg}</p>}
            <div>
              <label className="block text-sm mb-1">Nouveau mot de passe</label>
              <input
                type="password"
                className="w-full rounded-lg border px-3 py-2"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                minLength={8}
                autoFocus
              />
            </div>
            <div>
              <label className="block text-sm mb-1">
                Confirmer le mot de passe
              </label>
              <input
                type="password"
                className="w-full rounded-lg border px-3 py-2"
                value={password2}
                onChange={(e) => setPassword2(e.target.value)}
                placeholder="••••••••"
                required
                minLength={8}
              />
            </div>
            <button
              type="submit"
              className="w-full rounded-xl bg-black text-white py-2.5 disabled:opacity-60 dark:bg-white dark:text-black"
            >
              Créer mon mot de passe
            </button>
          </form>
        )}

        {phase === 'saving' && (
          <p className="text-sm text-muted-foreground">Enregistrement…</p>
        )}

        {phase === 'done' && (
          <p className="text-sm text-green-600">
            Mot de passe défini. Redirection…
          </p>
        )}
      </div>
    </div>
  );
}
