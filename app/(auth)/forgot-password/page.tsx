// app/(auth)/forgot-password/page.tsx
'use client';
import { useState } from 'react';
import Link from 'next/link';
import { supabase } from '@/lib/SupabaseClient';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const base =
      process.env.NEXT_PUBLIC_SITE_URL ||
      (typeof window !== 'undefined' ? window.location.origin : '');
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${base}/reset-password`,
    });
    if (error) return alert(error.message);
    setSent(true);
  }

  return (
    <div className="h-[100dvh] grid place-items-center px-4">
      <div className="w-full max-w-md rounded-2xl border border-border/80 bg-card/70 p-6">
        <h1 className="text-xl font-semibold">Réinitialiser le mot de passe</h1>
        {sent ? (
          <p className="mt-3 text-sm text-muted-foreground">
            Email envoyé. Clique sur le lien reçu pour définir un nouveau mot de
            passe.
          </p>
        ) : (
          <form onSubmit={onSubmit} className="mt-4 space-y-4">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="ton.email@exemple.com"
              className="w-full h-11 rounded-xl border border-border/80 bg-background/60 px-3"
            />
            <button className="w-full h-11 rounded-xl bg-primary text-primary-foreground">
              Envoyer le lien
            </button>
          </form>
        )}
        <div className="mt-4 text-sm">
          <Link
            href="/signin"
            className="text-[hsl(var(--primary))] hover:underline"
          >
            Retour connexion
          </Link>
        </div>
      </div>
    </div>
  );
}
