// app/(auth)/reset-password/page.tsx
'use client';

import { supabase } from '@/lib/SupabaseClient';
import { useRouter } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';

function parseHash(hash: string) {
  const p = new URLSearchParams(hash.replace(/^#/, ''));
  return {
    access_token: p.get('access_token') || '',
    refresh_token: p.get('refresh_token') || '',
    type: p.get('type') || '',
    error: p.get('error') || '',
    error_description: p.get('error_description') || '',
  };
}

export default function ResetPassword() {
  const router = useRouter();
  const [pw, setPw] = useState('');
  const [ok, setOk] = useState(false);
  const [phase, setPhase] = useState<
    'checking' | 'form' | 'saving' | 'done' | 'error'
  >('checking');
  const [msg, setMsg] = useState('');

  const hashInfo = useMemo(
    () => parseHash(typeof window !== 'undefined' ? window.location.hash : ''),
    []
  );

  useEffect(() => {
    const bootstrap = async () => {
      if (hashInfo.error) {
        setPhase('error');
        setMsg(
          decodeURIComponent(hashInfo.error_description || hashInfo.error)
        );
        return;
      }
      // Beaucoup de configurations exigent d'établir la session manuellement
      if (hashInfo.type === 'recovery' && hashInfo.access_token) {
        // @ts-ignore refresh_token peut être vide
        const { error: setErr } = await supabase.auth.setSession({
          access_token: hashInfo.access_token,
          refresh_token: hashInfo.refresh_token || '',
        });
        if (setErr) {
          setPhase('error');
          setMsg(setErr.message || 'Lien expiré.');
          return;
        }
      }
      setPhase('form');
    };
    bootstrap();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (pw.length < 8) {
      setMsg('Le mot de passe doit contenir au moins 8 caractères.');
      return;
    }
    setPhase('saving');
    const { error } = await supabase.auth.updateUser({ password: pw });
    if (error) {
      setPhase('form');
      setMsg(error.message);
      return;
    }
    setOk(true);
    setPhase('done');
    setTimeout(() => router.replace('/signin'), 800);
  }

  return (
    <div className="h-[100dvh] grid place-items-center px-4">
      <div className="w-full max-w-md rounded-2xl border border-border/80 bg-card/70 p-6">
        <h1 className="text-xl font-semibold">Nouveau mot de passe</h1>

        {phase === 'checking' && (
          <p className="mt-3 text-sm text-muted-foreground">
            Validation du lien…
          </p>
        )}

        {phase === 'error' && (
          <>
            <p className="mt-3 text-sm text-red-600">{msg}</p>
            <div className="mt-4 text-sm">
              <Link href="/signin" className="underline">
                Retour connexion
              </Link>
              <span> • </span>
              <Link href="/forgot-password" className="underline">
                Mot de passe oublié
              </Link>
            </div>
          </>
        )}

        {phase === 'form' && !ok && (
          <form onSubmit={onSubmit} className="mt-4 space-y-4">
            {msg && <p className="text-sm text-red-600">{msg}</p>}
            <input
              type="password"
              required
              value={pw}
              onChange={(e) => setPw(e.target.value)}
              placeholder="••••••••"
              className="w-full h-11 rounded-xl border border-border/80 bg-background/60 px-3"
              minLength={8}
            />
            <button className="w-full h-11 rounded-xl bg-primary text-primary-foreground">
              Enregistrer
            </button>
          </form>
        )}

        {phase === 'done' && (
          <p className="mt-3 text-sm text-muted-foreground">
            Mot de passe mis à jour. Redirection…
          </p>
        )}
      </div>
    </div>
  );
}
