// app/api/admin/referrals/validate/route.ts
import { createServerSupabaseClient } from '@/lib/supabaseServer';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
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

    // TODO: Vérifier que l'utilisateur est admin
    // Pour l'instant, on suppose que tous les utilisateurs connectés peuvent valider
    // Dans une vraie app, vérifier un rôle admin dans auth.users ou une table séparée

    const { referralId } = await request.json();

    if (!referralId || typeof referralId !== 'string') {
      return NextResponse.json(
        { error: 'ID du parrainage requis' },
        { status: 400 }
      );
    }

    // Récupérer le parrainage
    const { data: referral, error: fetchError } = await supabase
      .from('referrals')
      .select('*')
      .eq('id', referralId)
      .single();

    if (fetchError || !referral) {
      return NextResponse.json(
        { error: 'Parrainage non trouvé' },
        { status: 404 }
      );
    }

    if (referral.status === 'validated') {
      return NextResponse.json(
        { error: 'Ce parrainage est déjà validé' },
        { status: 400 }
      );
    }

    // Mettre à jour le statut du parrainage
    const { error: updateError } = await supabase
      .from('referrals')
      .update({
        status: 'validated',
        validated_at: new Date().toISOString(),
      })
      .eq('id', referralId);

    if (updateError) {
      console.error('Erreur validation referral:', updateError);
      return NextResponse.json(
        { error: 'Erreur lors de la validation' },
        { status: 500 }
      );
    }

    // Créer un tour bonus pour le parrain
    const { data: bonusRound, error: roundError } = await supabase
      .from('game_rounds')
      .insert({
        user_id: referral.referrer_user_id,
        status: 'available',
        round_type: 'referral',
        source: 'referral_validated',
      })
      .select()
      .single();

    if (roundError) {
      console.error('Erreur création bonus round:', roundError);
      return NextResponse.json(
        {
          error:
            'Parrainage validé mais erreur lors de la création du tour bonus',
        },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      referral: {
        id: referralId,
        status: 'validated',
      },
      bonusRound,
    });
  } catch (error) {
    console.error('Erreur API /api/admin/referrals/validate:', error);
    return NextResponse.json(
      { error: 'Erreur serveur interne' },
      { status: 500 }
    );
  }
}
