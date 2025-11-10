/**
 * GET /api/roulette/referral
 *
 * Retourne les informations de parrainage de l'utilisateur :
 * - Code de parrainage
 * - Liste des filleuls
 * - Points gagnés via parrainage
 */

import { NextRequest, NextResponse } from 'next/server';
import { getAdminSupabase } from '@/app/api/_lib/supabaseAdmin';
import type { ReferralSummary } from '@/lib/roulette/types';

/**
 * Génère un code de parrainage unique à partir de l'UUID de l'utilisateur
 */
function generateReferralCode(userId: string): string {
  // Prendre les 8 premiers caractères de l'UUID et les convertir en majuscules
  return userId.substring(0, 8).toUpperCase().replace(/-/g, '');
}

export async function GET(request: NextRequest) {
  try {
    const supabase = getAdminSupabase();

    // 1. Authentification
    const authHeader = request.headers.get('authorization');
    if (!authHeader) {
      return NextResponse.json(
        { error: 'Non authentifié' },
        { status: 401 }
      );
    }

    const token = authHeader.replace('Bearer ', '');
    const { data: { user }, error: authError } = await supabase.auth.getUser(token);

    if (authError || !user) {
      return NextResponse.json(
        { error: 'Token invalide' },
        { status: 401 }
      );
    }

    // 2. Récupérer ou créer le wallet avec le code de parrainage
    let { data: wallet, error: walletError } = await supabase
      .from('roulette_wallets')
      .select('*')
      .eq('user_id', user.id)
      .single();

    // Si le wallet n'existe pas, le créer
    if (walletError && walletError.code === 'PGRST116') {
      const referralCode = generateReferralCode(user.id);
      const { data: newWallet, error: createError } = await supabase
        .from('roulette_wallets')
        .insert({
          user_id: user.id,
          total_points_earned: 0,
          total_points_spent: 0,
          available_points: 0,
          referral_code: referralCode,
        })
        .select()
        .single();

      if (createError) {
        console.error('Erreur création wallet:', createError);
        return NextResponse.json(
          { error: 'Erreur lors de la création du wallet' },
          { status: 500 }
        );
      }

      wallet = newWallet;
    } else if (walletError) {
      console.error('Erreur récupération wallet:', walletError);
      return NextResponse.json(
        { error: 'Erreur lors de la récupération du wallet' },
        { status: 500 }
      );
    }

    // Si le wallet n'a pas de code de parrainage, en générer un
    if (!wallet.referral_code) {
      const referralCode = generateReferralCode(user.id);
      await supabase
        .from('roulette_wallets')
        .update({ referral_code: referralCode })
        .eq('user_id', user.id);

      wallet.referral_code = referralCode;
    }

    // 3. Récupérer tous les parrainages
    const { data: referrals, error: referralsError } = await supabase
      .from('roulette_referrals')
      .select('*')
      .eq('referrer_id', user.id)
      .order('created_at', { ascending: false });

    if (referralsError) {
      console.error('Erreur récupération parrainages:', referralsError);
      return NextResponse.json(
        { error: 'Erreur lors de la récupération des parrainages' },
        { status: 500 }
      );
    }

    // 4. Calculer les statistiques
    const totalReferrals = referrals?.length || 0;
    const validatedReferrals = referrals?.filter((r) => r.status === 'validated').length || 0;
    const pendingReferrals = referrals?.filter((r) => r.status === 'pending').length || 0;
    const totalPointsEarned = referrals?.reduce((sum, r) => sum + (r.bonus_points || 0), 0) || 0;

    // 5. Construire la réponse
    const response: ReferralSummary = {
      referral_code: wallet.referral_code || '',
      total_referrals: totalReferrals,
      validated_referrals: validatedReferrals,
      pending_referrals: pendingReferrals,
      total_points_earned: totalPointsEarned,
      referrals: referrals || [],
    };

    return NextResponse.json(response);

  } catch (error) {
    console.error('Erreur dans GET /api/roulette/referral:', error);
    return NextResponse.json(
      { error: 'Erreur serveur' },
      { status: 500 }
    );
  }
}
