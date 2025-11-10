/**
 * GET /api/roulette/history
 *
 * Retourne l'historique des spins de l'utilisateur
 * Supporte la pagination
 */

import { NextRequest, NextResponse } from 'next/server';
import { getAdminSupabase } from '@/app/api/_lib/supabaseAdmin';
import type { HistoryResponse } from '@/lib/roulette/types';

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

    // 2. Paramètres de pagination
    const url = new URL(request.url);
    const page = parseInt(url.searchParams.get('page') || '1', 10);
    const perPage = parseInt(url.searchParams.get('per_page') || '20', 10);

    const from = (page - 1) * perPage;
    const to = from + perPage - 1;

    // 3. Récupérer les spins
    const { data: spins, error: spinsError, count } = await supabase
      .from('roulette_spins')
      .select('*', { count: 'exact' })
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })
      .range(from, to);

    if (spinsError) {
      console.error('Erreur récupération spins:', spinsError);
      return NextResponse.json(
        { error: 'Erreur lors de la récupération de l\'historique' },
        { status: 500 }
      );
    }

    // 4. Construire la réponse
    const response: HistoryResponse = {
      spins: spins || [],
      total: count || 0,
      page,
      per_page: perPage,
    };

    return NextResponse.json(response);

  } catch (error) {
    console.error('Erreur dans GET /api/roulette/history:', error);
    return NextResponse.json(
      { error: 'Erreur serveur' },
      { status: 500 }
    );
  }
}
