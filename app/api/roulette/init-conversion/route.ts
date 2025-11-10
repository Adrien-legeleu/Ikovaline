// app/api/roulette/init-conversion/route.ts
import { NextResponse } from 'next/server';
import { getAdminSupabase } from '@/app/api/_lib/supabaseAdmin';
import { REWARD_CONFIGS } from '@/lib/roulette/segments';

/**
 * Route API pour initialiser/mettre à jour la table roulette_conversion
 * avec les coefficients obligatoires
 *
 * Usage: POST /api/roulette/init-conversion
 */
export async function POST(req: Request) {
  const db = getAdminSupabase();

  // Préparer les données à insérer
  const conversionRows = REWARD_CONFIGS.map((config) => ({
    seg: config.seg,
    label: config.label,
    point_factor_pct: config.coef,
  }));

  try {
    // Upsert dans la table roulette_conversion
    const { data, error } = await db
      .from('roulette_conversion')
      .upsert(conversionRows, {
        onConflict: 'seg',
        ignoreDuplicates: false,
      })
      .select();

    if (error) {
      console.error('Error updating roulette_conversion:', error);
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({
      ok: true,
      message: 'roulette_conversion table updated successfully',
      rows: data,
    });
  } catch (err: any) {
    console.error('Error in init-conversion:', err);
    return NextResponse.json(
      { error: err?.message ?? 'Unknown error' },
      { status: 500 }
    );
  }
}
