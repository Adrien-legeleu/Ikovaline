// app/api/roulette/migrate-referrals/route.ts
import { NextResponse } from 'next/server';
import { getAdminSupabase } from '@/app/api/_lib/supabaseAdmin';

/**
 * Route API pour vérifier/ajouter les colonnes nécessaires au parrainage
 *
 * Ajoute les colonnes à roulette_referrals :
 * - credited (boolean) : indique si le parrain a déjà été crédité
 * - credited_at (timestamp) : date du crédit
 *
 * Usage: POST /api/roulette/migrate-referrals
 */
export async function POST(req: Request) {
  const db = getAdminSupabase();

  try {
    // Vérifier si les colonnes existent déjà en essayant de sélectionner
    const { data: test, error: testError } = await db
      .from('roulette_referrals')
      .select('credited, credited_at')
      .limit(1);

    if (testError) {
      // Les colonnes n'existent probablement pas
      // Note: Supabase ne permet pas d'ALTER TABLE via l'API client
      // Il faut utiliser l'éditeur SQL de Supabase Dashboard
      return NextResponse.json({
        ok: false,
        error: 'Migration required',
        message:
          'Please run the following SQL in Supabase Dashboard:\n\n' +
          'ALTER TABLE roulette_referrals ADD COLUMN IF NOT EXISTS credited BOOLEAN DEFAULT FALSE;\n' +
          'ALTER TABLE roulette_referrals ADD COLUMN IF NOT EXISTS credited_at TIMESTAMPTZ;',
        sql: [
          'ALTER TABLE roulette_referrals ADD COLUMN IF NOT EXISTS credited BOOLEAN DEFAULT FALSE;',
          'ALTER TABLE roulette_referrals ADD COLUMN IF NOT EXISTS credited_at TIMESTAMPTZ;',
        ],
      });
    }

    return NextResponse.json({
      ok: true,
      message: 'Columns already exist',
    });
  } catch (err: any) {
    console.error('Error in migrate-referrals:', err);
    return NextResponse.json(
      { error: err?.message ?? 'Unknown error' },
      { status: 500 }
    );
  }
}
