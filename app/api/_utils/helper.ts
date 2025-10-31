// app/api/_utils/helper.ts
import { createClient } from '@supabase/supabase-js';

const admin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
  { db: { schema: 'public' } }
);

export async function getOrCreateUserByEmail(email: string): Promise<string> {
  const em = email.trim().toLowerCase();

  // 1) Chercher via Admin API (GoTrue) — filtre email
  let foundId: string | null = null;
  try {
    // Les typings de certaines versions n’exposent pas le filtre `email`,
    // on caste en any pour rester compatible.
    const { data, error } = await (admin.auth.admin as any).listUsers({
      page: 1,
      perPage: 1,
      email: em,
    });
    if (error) throw error;

    const user = data?.users?.find(
      (u: any) => (u.email || '').toLowerCase() === em
    );
    if (user) foundId = user.id;
  } catch (e) {
    // pas bloquant : on tentera la création en dessous
  }

  if (foundId) return foundId;

  // 2) Créer l’utilisateur si introuvable
  const { data: created, error: createErr } = await admin.auth.admin.createUser(
    {
      email: em,
      email_confirm: true, // évite l’email de confirmation
    }
  );
  if (createErr || !created?.user) {
    throw new Error(createErr?.message || 'createUser failed');
  }
  return created.user.id;
}
