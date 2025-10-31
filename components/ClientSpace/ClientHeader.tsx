// components/ClientHeader.tsx
'use client';
import { supabase } from '@/lib/SupabaseClient';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function ClientHeader() {
  const router = useRouter();
  async function signOut() {
    await supabase.auth.signOut();
    router.replace('/');
  }
  return (
    <header className="h-14 flex items-center justify-between px-4 border-b">
      <Link href="/dashboard" className="font-semibold">
        Ikovaline — Espace client
      </Link>
      <nav className="flex items-center gap-3">
        <Link href="/new-project" className="text-sm underline">
          Nouveau projet
        </Link>
        <button onClick={signOut} className="text-sm">
          Se déconnecter
        </button>
      </nav>
    </header>
  );
}
