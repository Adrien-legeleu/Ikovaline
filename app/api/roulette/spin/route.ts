/**
 * POST /api/roulette/spin
 *
 * Lance un spin de la roulette :
 * 1. Vérifie l'authentification
 * 2. Récupère la configuration d'allocation en cours
 * 3. Calcule les segments
 * 4. Tire aléatoirement une récompense
 * 5. Enregistre le spin
 * 6. Met à jour le wallet (optionnel : décrémente les points)
 * 7. Génère un code de récompense si applicable
 * 8. Retourne le résultat avec l'angle de rotation
 */

import { NextRequest, NextResponse } from 'next/server';
import { getAdminSupabase } from '@/app/api/_lib/supabaseAdmin';
import {
  calculateSegments,
  generateRandomRotation,
  determineWinner,
  generateRewardCode,
} from '@/lib/roulette/calculator';
import type {
  SpinResult,
  RouletteReward,
  AllocationInput,
} from '@/lib/roulette/types';
import { ROULETTE_ERROR_CODES, REWARD_CONFIGS } from '@/lib/roulette/types';

export async function POST(request: NextRequest) {
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
    const { data: wallet, error: walletError } = await supabase
      .from('roulette_wallets')
      .select('*')
      .eq('user_id', user.id)
      .single();

    if (walletError) {
      return NextResponse.json(
        { error: 'Wallet introuvable', code: ROULETTE_ERROR_CODES.WALLET_NOT_FOUND },
        { status: 404 }
      );
    }

    // 3. Récupérer les allocations en cours (dernière session)
    const { data: allocations, error: allocError } = await supabase
      .from('roulette_allocations')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })
      .limit(20);

    if (allocError || !allocations || allocations.length === 0) {
      return NextResponse.json(
        { error: 'Aucune configuration trouvée', code: ROULETTE_ERROR_CODES.NO_ALLOCATION },
        { status: 400 }
      );
    }

    const latestSessionId = allocations[0].session_id;
    const currentAllocations = allocations.filter(
      (a) => a.session_id === latestSessionId
    );

    // 4. Récupérer les récompenses
    const { data: rewards, error: rewardsError } = await supabase
      .from('roulette_rewards')
      .select('*')
      .eq('is_active', true);

    if (rewardsError || !rewards) {
      return NextResponse.json(
        { error: 'Erreur lors de la récupération des récompenses' },
        { status: 500 }
      );
    }

    // 5. Convertir les allocations et calculer les segments
    const rewardMap = new Map((rewards as RouletteReward[]).map((r) => [r.id, r]));
    const allocationInputs: AllocationInput[] = currentAllocations
      .map((a) => {
        const reward = rewardMap.get(a.reward_id);
        return reward ? { reward_key: reward.reward_key, points: a.points } : null;
      })
      .filter((a): a is AllocationInput => a !== null);

    const result = calculateSegments(allocationInputs, rewards as RouletteReward[]);

    if (result.errors.length > 0) {
      return NextResponse.json(
        { error: 'Configuration invalide', details: result.errors },
        { status: 400 }
      );
    }

    if (result.segments.length === 0) {
      return NextResponse.json(
        { error: 'Aucun segment disponible', code: ROULETTE_ERROR_CODES.NO_ALLOCATION },
        { status: 400 }
      );
    }

    // 6. Générer un angle de rotation aléatoire
    const finalRotation = generateRandomRotation(3, 5);

    // 7. Déterminer la récompense gagnée
    const winningSegment = determineWinner(finalRotation, result.segments);

    if (!winningSegment) {
      return NextResponse.json(
        { error: 'Erreur lors de la détermination du gagnant' },
        { status: 500 }
      );
    }

    // 8. Récupérer les détails de la récompense
    const winningReward = winningSegment.reward_key !== 'nothing'
      ? rewards.find((r) => r.reward_key === winningSegment.reward_key)
      : null;

    // 9. Générer un code de récompense si applicable
    let rewardCode: string | undefined;
    if (winningReward) {
      rewardCode = generateRewardCode(winningReward.reward_key, user.id);
    }

    // 10. Calculer les points dépensés (optionnel : pour l'instant 0)
    const pointsSpent = 0;

    // 11. Enregistrer le spin en base
    const { data: spin, error: spinError } = await supabase
      .from('roulette_spins')
      .insert({
        user_id: user.id,
        session_id: latestSessionId,
        angle: finalRotation,
        reward_id: winningReward?.id || null,
        reward_label: winningSegment.label,
        points_spent: pointsSpent,
        status: 'success',
        reward_code: rewardCode,
        metadata: {
          segment: winningSegment,
          total_segments: result.segments.length,
        },
      })
      .select()
      .single();

    if (spinError) {
      console.error('Erreur enregistrement spin:', spinError);
      return NextResponse.json(
        { error: 'Erreur lors de l\'enregistrement du spin' },
        { status: 500 }
      );
    }

    // 12. (Optionnel) Mettre à jour le wallet si on décrémente les points
    // Pour l'instant, on ne décrémente pas les points à chaque spin
    // Décommenter si besoin :
    /*
    if (pointsSpent > 0) {
      await supabase
        .from('roulette_wallets')
        .update({
          total_points_spent: wallet.total_points_spent + pointsSpent,
          available_points: wallet.available_points - pointsSpent,
        })
        .eq('user_id', user.id);

      await supabase
        .from('roulette_point_transactions')
        .insert({
          user_id: user.id,
          type: 'spend',
          points_delta: -pointsSpent,
          reason: 'Spin de la roulette',
          metadata: { spin_id: spin.id },
        });
    }
    */

    // 13. Récupérer le wallet à jour
    const { data: updatedWallet } = await supabase
      .from('roulette_wallets')
      .select('*')
      .eq('user_id', user.id)
      .single();

    // 14. Construire la réponse
    const response: SpinResult = {
      spin: spin as any,
      final_rotation: finalRotation,
      reward: winningReward as RouletteReward | null,
      reward_config: winningReward
        ? REWARD_CONFIGS[winningReward.reward_key]
        : REWARD_CONFIGS.nothing,
      wallet: updatedWallet || wallet,
    };

    return NextResponse.json(response);

  } catch (error) {
    console.error('Erreur dans POST /api/roulette/spin:', error);
    return NextResponse.json(
      { error: 'Erreur serveur' },
      { status: 500 }
    );
  }
}
