'use client';
import { supabase } from '@/lib/SupabaseClient';
import { useRouter } from 'next/navigation';

export function LogoutBtn() {
  const router = useRouter();
  return (
    <button
      onClick={async () => {
        await supabase.auth.signOut();
        router.replace('/'); // retour au site public
      }}
      className="text-sm opacity-80 hover:opacity-100"
    >
      Se déconnecter
    </button>
  );
}
