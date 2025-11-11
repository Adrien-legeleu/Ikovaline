// app/api/coffres/play/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { getAdminSupabase } from '@/lib/supabaseAdmin';

interface Reward {
  id: string;
  reward_key: string;
  label: string;
  description: string;
  weight: number;
}

function selectReward(rewards: Reward[]): Reward {
  const totalWeight = rewards.reduce((sum, r) => sum + r.weight, 0);
  const rand = Math.random() * totalWeight;

  let cumulative = 0;
  for (const reward of rewards) {
    cumulative += reward.weight;
    if (rand < cumulative) {
      return reward;
    }
  }

  // Fallback au dernier reward
  return rewards[rewards.length - 1];
}

export async function POST(request: NextRequest) {
  try {
    const { userId } = await request.json();

    if (!userId || typeof userId !== 'string') {
      return NextResponse.json({ error: 'userId requis' }, { status: 400 });
    }

    const supabase = getAdminSupabase();

    // Trouver un tour disponible (le plus ancien)
    const { data: availableRounds, error: roundsError } = await supabase
      .from('game_rounds')
      .select('*')
      .eq('user_id', userId)
      .eq('status', 'available')
      .order('created_at', { ascending: true })
      .limit(1);

    if (roundsError) {
      console.error('Erreur récupération rounds:', roundsError);
      return NextResponse.json(
        { error: 'Erreur lors de la récupération des tours' },
        { status: 500 }
      );
    }

    if (!availableRounds || availableRounds.length === 0) {
      return NextResponse.json(
        { error: 'Aucun tour disponible' },
        { status: 400 }
      );
    }

    const gameRound = availableRounds[0];

    // Récupérer toutes les récompenses actives
    const { data: rewards, error: rewardsError } = await supabase
      .from('rewards')
      .select('*')
      .eq('is_active', true);

    if (rewardsError || !rewards || rewards.length === 0) {
      console.error('Erreur récupération rewards:', rewardsError);
      return NextResponse.json(
        { error: 'Aucune récompense disponible' },
        { status: 500 }
      );
    }

    // Sélectionner une récompense aléatoire basée sur le poids
    const selectedReward = selectReward(rewards as Reward[]);

    // Créer le résultat dans game_results
    const { data: gameResult, error: resultError } = await supabase
      .from('game_results')
      .insert({
        user_id: userId,
        game_round_id: gameRound.id,
        reward_id: selectedReward.id,
      })
      .select()
      .single();

    if (resultError) {
      console.error('Erreur création game_result:', resultError);
      return NextResponse.json(
        { error: "Erreur lors de l'enregistrement du résultat" },
        { status: 500 }
      );
    }

    // Mettre à jour le tour comme utilisé
    const { error: updateError } = await supabase
      .from('game_rounds')
      .update({
        status: 'used',
        used_at: new Date().toISOString(),
      })
      .eq('id', gameRound.id);

    if (updateError) {
      console.error('Erreur mise à jour round:', updateError);
    }

    // Compter les tours restants
    const { count: remainingRounds } = await supabase
      .from('game_rounds')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', userId)
      .eq('status', 'available');

    return NextResponse.json({
      success: true,
      reward: {
        id: selectedReward.id,
        reward_key: selectedReward.reward_key,
        label: selectedReward.label,
        description: selectedReward.description,
      },
      gameResult,
      remainingRounds: remainingRounds || 0,
    });
  } catch (error) {
    console.error('Erreur API /api/coffres/play:', error);
    return NextResponse.json(
      { error: 'Erreur serveur interne' },
      { status: 500 }
    );
  }
}
