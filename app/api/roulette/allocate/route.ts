/**
 * POST /api/roulette/allocate
 *
 * Enregistre la configuration d'allocation des points de l'utilisateur
 * Vérifie :
 * - Authentification
 * - Points disponibles suffisants
 * - Pourcentages valides (somme <= 100%)
 * - Cap des récompenses respectés
 */

import { NextRequest, NextResponse } from 'next/server';
import { getAdminSupabase } from '@/lib/supabaseAdmin';
import { validateAllocations, calculateSegments } from '@/lib/roulette/calculator';
import type {
  AllocationInput,
  AllocationResponse,
  RouletteReward,
} from '@/lib/roulette/types';
import { RouletteError } from '@/lib/roulette/types';

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

    // 2. Parser le body
    const body = await request.json();
    const allocations: AllocationInput[] = body.allocations || [];

    if (!Array.isArray(allocations)) {
      return NextResponse.json(
        { error: 'Format invalide : allocations doit être un tableau' },
        { status: 400 }
      );
    }

    // 3. Récupérer le wallet
    const { data: wallet, error: walletError } = await supabase
      .from('roulette_wallets')
      .select('*')
      .eq('user_id', user.id)
      .single();

    if (walletError) {
      return NextResponse.json(
        { error: 'Wallet introuvable' },
        { status: 404 }
      );
    }

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

    // 5. Valider les allocations
    try {
      validateAllocations(
        allocations,
        rewards as RouletteReward[],
        wallet.available_points
      );
    } catch (error) {
      if (error instanceof RouletteError) {
        return NextResponse.json(
          { error: error.message, code: error.code, details: error.details },
          { status: 400 }
        );
      }
      throw error;
    }

    // 6. Calculer les segments
    const result = calculateSegments(allocations, rewards as RouletteReward[]);

    // 7. Générer un nouveau session_id
    const sessionId = crypto.randomUUID();

    // 8. Créer les nouvelles allocations en base
    const rewardMap = new Map((rewards as RouletteReward[]).map((r) => [r.reward_key, r]));

    const allocationRows = allocations
      .filter((a) => a.points > 0)
      .map((a) => {
        const reward = rewardMap.get(a.reward_key);
        const segment = result.segments.find((s) => s.reward_key === a.reward_key);

        if (!reward || !segment) return null;

        return {
          user_id: user.id,
          reward_id: reward.id,
          points: a.points,
          percent: segment.percent,
          session_id: sessionId,
        };
      })
      .filter(Boolean);

    if (allocationRows.length === 0) {
      return NextResponse.json(
        { error: 'Aucune allocation valide' },
        { status: 400 }
      );
    }

    const { data: savedAllocations, error: saveError } = await supabase
      .from('roulette_allocations')
      .insert(allocationRows)
      .select();

    if (saveError) {
      console.error('Erreur sauvegarde allocations:', saveError);
      return NextResponse.json(
        { error: 'Erreur lors de la sauvegarde' },
        { status: 500 }
      );
    }

    // 9. Retourner la réponse
    const response: AllocationResponse = {
      success: true,
      allocations: savedAllocations || [],
      segments: result.segments,
      warnings: result.warnings,
    };

    return NextResponse.json(response);

  } catch (error) {
    console.error('Erreur dans POST /api/roulette/allocate:', error);
    return NextResponse.json(
      { error: 'Erreur serveur' },
      { status: 500 }
    );
  }
}
