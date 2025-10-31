// lib/supabaseAdmin.ts
import { createClient } from '@supabase/supabase-js';

// ⚠ SERVICE ROLE KEY obligatoire en env serveur uniquement
// Ne JAMAIS exposer cette clé côté client.
export function getAdminSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;
  return createClient(url, serviceKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
}
