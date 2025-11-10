// app/api/rewards/update-referral-code/route.ts
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
        { error: 'Vous devez être connecté pour modifier votre code' },
        { status: 401 }
      );
    }

    const { referralCode } = await request.json();

    if (!referralCode || typeof referralCode !== 'string') {
      return NextResponse.json(
        { error: 'Code de parrainage requis' },
        { status: 400 }
      );
    }

    // Valider le format (optionnel)
    const codePattern = /^[A-Z0-9-]{3,20}$/;
    if (!codePattern.test(referralCode)) {
      return NextResponse.json(
        {
          error:
            'Format invalide (lettres majuscules, chiffres et tirets uniquement)',
        },
        { status: 400 }
      );
    }

    // Vérifier l'unicité
    const { data: existing } = await supabase
      .from('reward_users')
      .select('id, user_id')
      .eq('referral_code', referralCode)
      .single();

    if (existing && existing.user_id !== user.id) {
      return NextResponse.json(
        { error: 'Ce code de parrainage existe déjà' },
        { status: 400 }
      );
    }

    // Mettre à jour
    const { data: updated, error: updateError } = await supabase
      .from('reward_users')
      .update({ referral_code: referralCode })
      .eq('user_id', user.id)
      .select()
      .single();

    if (updateError) {
      console.error('Erreur mise à jour code:', updateError);
      return NextResponse.json(
        { error: 'Erreur lors de la mise à jour' },
        { status: 500 }
      );
    }

    return NextResponse.json({ rewardUser: updated });
  } catch (error) {
    console.error('Erreur API /api/rewards/update-referral-code:', error);
    return NextResponse.json(
      { error: 'Erreur serveur interne' },
      { status: 500 }
    );
  }
}
