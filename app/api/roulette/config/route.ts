/**
 * GET /api/roulette/config
 *
 * Retourne la configuration complète de la roulette pour l'utilisateur :
 * - Liste des récompenses actives
 * - Allocations en cours
 * - Wallet de points
 * - Segments calculés
 */

import { NextRequest, NextResponse } from 'next/server';
import { getAdminSupabase } from '@/lib/supabaseAdmin';
import { calculateSegments } from '@/lib/roulette/calculator';
import type {
  RouletteConfigResponse,
  RouletteReward,
  RouletteAllocation,
  RouletteWallet,
  AllocationInput,
} from '@/lib/roulette/types';

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

    // 2. Récupérer les récompenses actives
    const { data: rewards, error: rewardsError } = await supabase
      .from('roulette_rewards')
      .select('*')
      .eq('is_active', true)
      .order('sort_order', { ascending: true });

    if (rewardsError) {
      console.error('Erreur récupération récompenses:', rewardsError);
      return NextResponse.json(
        { error: 'Erreur lors de la récupération des récompenses' },
        { status: 500 }
      );
    }

    // 3. Récupérer le wallet de l'utilisateur
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

    // 4. Récupérer les allocations en cours (dernière session)
    const { data: allocations, error: allocError } = await supabase
      .from('roulette_allocations')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })
      .limit(20);

    if (allocError) {
      console.error('Erreur récupération allocations:', allocError);
      return NextResponse.json(
        { error: 'Erreur lors de la récupération des allocations' },
        { status: 500 }
      );
    }

    // Grouper par session_id et prendre la plus récente
    const latestSessionId = allocations?.[0]?.session_id;
    const currentAllocations = allocations?.filter(
      (a) => a.session_id === latestSessionId
    ) || [];

    // 5. Calculer les segments si des allocations existent
    let segments = [];
    if (currentAllocations.length > 0 && rewards) {
      // Convertir les allocations en AllocationInput
      const allocationInputs: AllocationInput[] = currentAllocations.map((a) => {
        const reward = rewards.find((r) => r.id === a.reward_id);
        return {
          reward_key: reward?.reward_key || '',
          points: a.points,
        };
      }).filter((a) => a.reward_key !== '');

      const result = calculateSegments(
        allocationInputs,
        rewards as RouletteReward[]
      );

      segments = result.segments;
    }

    // 6. Construire la réponse
    const response: RouletteConfigResponse = {
      rewards: (rewards || []) as RouletteReward[],
      allocations: currentAllocations as RouletteAllocation[],
      wallet: wallet as RouletteWallet,
      segments,
    };

    return NextResponse.json(response);

  } catch (error) {
    console.error('Erreur dans GET /api/roulette/config:', error);
    return NextResponse.json(
      { error: 'Erreur serveur' },
      { status: 500 }
    );
  }
}
