'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { supabase } from '@/lib/SupabaseClient';

export default function AuthCta({ className = '' }: { className?: string }) {
  const [logged, setLogged] = useState<boolean | null>(null);

  useEffect(() => {
    // état initial
    supabase.auth.getSession().then(({ data }) => setLogged(!!data.session));
    // se met à jour si l'utilisateur se connecte / déconnecte
    const { data: sub } = supabase.auth.onAuthStateChange((_event, session) => {
      setLogged(!!session);
    });
    return () => sub.subscription.unsubscribe();
  }, []);

  if (logged === null) return null; // évite le "clignotement"

  return logged ? (
    <Link href="/(client)/onboarding" className={className}>
      Accéder à votre espace
    </Link>
  ) : (
    <Link href="/signin" className={className}>
      Se connecter
    </Link>
  );
}
