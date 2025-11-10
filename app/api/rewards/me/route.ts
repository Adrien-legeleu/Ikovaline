// app/api/rewards/me/route.ts
import { createServerSupabaseClient } from '@/lib/supabaseServer';
import { NextResponse } from 'next/server';

function generateReferralCode(): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let code = 'IKOVA-';
  for (let i = 0; i < 6; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
}

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
        { error: 'Vous devez être connecté pour accéder à cette ressource' },
        { status: 401 }
      );
    }

    // Chercher le profil reward_users
    let { data: rewardUser, error: fetchError } = await supabase
      .from('reward_users')
      .select('*')
      .eq('user_id', user.id)
      .single();

    // Si aucun profil, en créer un avec un code unique
    if (fetchError && fetchError.code === 'PGRST116') {
      let codeUnique = false;
      let referralCode = '';

      while (!codeUnique) {
        referralCode = generateReferralCode();
        const { data: existing } = await supabase
          .from('reward_users')
          .select('id')
          .eq('referral_code', referralCode)
          .single();

        if (!existing) {
          codeUnique = true;
        }
      }

      const { data: newRewardUser, error: createError } = await supabase
        .from('reward_users')
        .insert({
          user_id: user.id,
          referral_code: referralCode,
        })
        .select()
        .single();

      if (createError) {
        console.error('Erreur création reward_user:', createError);
        return NextResponse.json(
          { error: 'Erreur lors de la création du profil' },
          { status: 500 }
        );
      }

      rewardUser = newRewardUser;
    } else if (fetchError) {
      console.error('Erreur fetch reward_user:', fetchError);
      return NextResponse.json(
        { error: 'Erreur lors de la récupération du profil' },
        { status: 500 }
      );
    }

    // Compter les tours disponibles
    const { count: availableRounds } = await supabase
      .from('game_rounds')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', user.id)
      .eq('status', 'available');

    // Récupérer l'historique des dernières récompenses
    const { data: recentRewards } = await supabase
      .from('game_results')
      .select(
        `
        id,
        created_at,
        rewards:reward_id (
          reward_key,
          label,
          description
        )
      `
      )
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })
      .limit(10);

    return NextResponse.json({
      rewardUser,
      availableRounds: availableRounds || 0,
      recentRewards: recentRewards || [],
    });
  } catch (error) {
    console.error('Erreur API /api/rewards/me:', error);
    return NextResponse.json(
      { error: 'Erreur serveur interne' },
      { status: 500 }
    );
  }
}
