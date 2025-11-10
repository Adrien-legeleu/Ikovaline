/**
 * GET /api/roulette/wallet
 *
 * Retourne le wallet de l'utilisateur avec un résumé détaillé :
 * - Points disponibles
 * - Total gagné via parrainage
 * - Total gagné via actions
 */

import { NextRequest, NextResponse } from 'next/server';
import { getAdminSupabase } from '@/app/api/_lib/supabaseAdmin';
import type { WalletSummary } from '@/lib/roulette/types';

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

    // 2. Récupérer le wallet
    let { data: wallet, error: walletError } = await supabase
      .from('roulette_wallets')
      .select('*')
      .eq('user_id', user.id)
      .single();

    // Si le wallet n'existe pas, le créer
    if (walletError && walletError.code === 'PGRST116') {
      const { data: newWallet, error: createError } = await supabase
        .from('roulette_wallets')
        .insert({
          user_id: user.id,
          total_points_earned: 0,
          total_points_spent: 0,
          available_points: 0,
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

    // 3. Calculer les points gagnés via parrainage
    const { data: referralTransactions } = await supabase
      .from('roulette_point_transactions')
      .select('points_delta')
      .eq('user_id', user.id)
      .eq('type', 'referral_bonus');

    const pointsFromReferrals = referralTransactions
      ? referralTransactions.reduce((sum, t) => sum + (t.points_delta || 0), 0)
      : 0;

    // 4. Calculer les points gagnés via actions
    const { data: earnTransactions } = await supabase
      .from('roulette_point_transactions')
      .select('points_delta')
      .eq('user_id', user.id)
      .eq('type', 'earn');

    const pointsFromActions = earnTransactions
      ? earnTransactions.reduce((sum, t) => sum + (t.points_delta || 0), 0)
      : 0;

    // 5. Compter les parrainages en attente
    const { count: pendingReferralsCount } = await supabase
      .from('roulette_referrals')
      .select('*', { count: 'exact', head: true })
      .eq('referrer_id', user.id)
      .eq('status', 'pending');

    // 6. Construire la réponse
    const response: WalletSummary = {
      wallet: wallet as any,
      points_from_referrals: pointsFromReferrals,
      points_from_actions: pointsFromActions,
      pending_referrals: pendingReferralsCount || 0,
    };

    return NextResponse.json(response);

  } catch (error) {
    console.error('Erreur dans GET /api/roulette/wallet:', error);
    return NextResponse.json(
      { error: 'Erreur serveur' },
      { status: 500 }
    );
  }
}
