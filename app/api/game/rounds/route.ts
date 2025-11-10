// app/api/game/rounds/route.ts
import { createServerSupabaseClient } from '@/lib/supabaseServer';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const supabase = await createServerSupabaseClient();

    // Récupérer l'utilisateur connecté
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json(
        { error: 'Vous devez être connecté' },
        { status: 401 }
      );
    }

    // Compter les tours disponibles
    const { count, error: countError } = await supabase
      .from('game_rounds')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', user.id)
      .eq('status', 'available');

    if (countError) {
      console.error('Erreur comptage rounds:', countError);
      return NextResponse.json(
        { error: 'Erreur lors du comptage des tours' },
        { status: 500 }
      );
    }

    return NextResponse.json({ availableRounds: count || 0 });
  } catch (error) {
    console.error('Erreur API /api/game/rounds:', error);
    return NextResponse.json(
      { error: 'Erreur serveur interne' },
      { status: 500 }
    );
  }
}
