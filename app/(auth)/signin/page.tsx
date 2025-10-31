'use client';

import { Suspense } from 'react';
import AuthCard from '@/components/ClientSpace/AuthCard';

/**
 * Page de connexion (Sign in)
 * - Rendue uniquement côté client
 * - Encapsulée dans un <Suspense> pour éviter tout warning Next.js
 */
function SigninInner() {
  return <AuthCard mode="signin" />;
}

export default function SigninPage() {
  return (
    <Suspense
      fallback={
        <div className="p-8 text-center text-muted-foreground">Chargement…</div>
      }
    >
      <SigninInner />
    </Suspense>
  );
}
