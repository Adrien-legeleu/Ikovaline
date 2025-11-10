// app/api/referrals/create/route.ts
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
        { error: 'Vous devez être connecté pour parrainer' },
        { status: 401 }
      );
    }

    const { referredEmail } = await request.json();

    if (!referredEmail || typeof referredEmail !== 'string') {
      return NextResponse.json(
        { error: 'Email du filleul requis' },
        { status: 400 }
      );
    }

    // Valider le format email
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(referredEmail)) {
      return NextResponse.json(
        { error: 'Format email invalide' },
        { status: 400 }
      );
    }

    // Vérifier si un parrainage existe déjà pour cet email
    const { data: existingReferral } = await supabase
      .from('referrals')
      .select('id, status')
      .eq('referrer_user_id', user.id)
      .eq('referred_email', referredEmail)
      .single();

    if (existingReferral) {
      if (existingReferral.status === 'pending') {
        return NextResponse.json(
          { error: 'Ce filleul a déjà été invité (en attente de validation)' },
          { status: 400 }
        );
      } else if (existingReferral.status === 'validated') {
        return NextResponse.json(
          { error: 'Ce filleul a déjà été validé' },
          { status: 400 }
        );
      }
    }

    // Créer le parrainage
    const { data: newReferral, error: insertError } = await supabase
      .from('referrals')
      .insert({
        referrer_user_id: user.id,
        referred_email: referredEmail,
        status: 'pending',
      })
      .select()
      .single();

    if (insertError) {
      console.error('Erreur création referral:', insertError);
      return NextResponse.json(
        { error: 'Erreur lors de la création du parrainage' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      referral: newReferral,
    });
  } catch (error) {
    console.error('Erreur API /api/referrals/create:', error);
    return NextResponse.json(
      { error: 'Erreur serveur interne' },
      { status: 500 }
    );
  }
}
