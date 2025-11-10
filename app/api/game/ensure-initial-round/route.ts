// app/api/game/ensure-initial-round/route.ts
import { createServerSupabaseClient } from '@/lib/supabaseServer';
import { NextResponse } from 'next/server';

export async function POST() {
  try {
    const supabase = await createServerSupabaseClient();

    // Récupérer l'utilisateur connecté
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json({ error: 'Non autorisé' }, { status: 401 });
    }

    // Vérifier s'il existe déjà des tours pour cet utilisateur
    const { count } = await supabase
      .from('game_rounds')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', user.id);

    // Si aucun tour n'existe, créer le tour initial
    if (count === 0) {
      const { data: newRound, error: insertError } = await supabase
        .from('game_rounds')
        .insert({
          user_id: user.id,
          status: 'available',
          round_type: 'standard',
          source: 'initial',
        })
        .select()
        .single();

      if (insertError) {
        console.error('Erreur création round initial:', insertError);
        return NextResponse.json(
          { error: 'Erreur lors de la création du tour initial' },
          { status: 500 }
        );
      }

      return NextResponse.json({
        message: 'Tour initial créé',
        round: newRound,
        created: true,
      });
    }

    return NextResponse.json({
      message: 'Des tours existent déjà',
      created: false,
    });
  } catch (error) {
    console.error('Erreur API /api/game/ensure-initial-round:', error);
    return NextResponse.json(
      { error: 'Erreur serveur interne' },
      { status: 500 }
    );
  }
}
