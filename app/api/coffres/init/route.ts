// app/api/coffres/init/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { getAdminSupabase } from '@/lib/supabaseAdmin';

function generateReferralCode(): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let code = 'IKOVA-';
  for (let i = 0; i < 6; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
}

export async function POST(request: NextRequest) {
  try {
    const { email, referralCode } = await request.json();

    if (!email || typeof email !== 'string') {
      return NextResponse.json({ error: 'Email requis' }, { status: 400 });
    }

    // Valider le format email
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      return NextResponse.json(
        { error: 'Format email invalide' },
        { status: 400 }
      );
    }

    const supabase = getAdminSupabase();

    // Chercher si un utilisateur auth existe avec cet email
    const { data: authUsers } = await supabase.auth.admin.listUsers();
    const existingAuthUser = authUsers?.users.find((u) => u.email === email);

    let userId: string;

    if (existingAuthUser) {
      userId = existingAuthUser.id;
    } else {
      // Créer un utilisateur auth
      const { data: newUser, error: createError } =
        await supabase.auth.admin.createUser({
          email,
          email_confirm: true,
        });

      if (createError) {
        console.error('Erreur création user:', createError);
        return NextResponse.json(
          { error: 'Erreur lors de la création du profil' },
          { status: 500 }
        );
      }

      userId = newUser.user.id;
    }

    // Chercher le profil reward_users
    let { data: rewardUser, error: fetchError } = await supabase
      .from('reward_users')
      .select('*')
      .eq('user_id', userId)
      .single();

    let isNewUser = false;

    // Si aucun profil reward_users, en créer un
    if (fetchError && fetchError.code === 'PGRST116') {
      isNewUser = true;
      let codeUnique = false;
      let myReferralCode = '';

      while (!codeUnique) {
        myReferralCode = generateReferralCode();
        const { data: existing } = await supabase
          .from('reward_users')
          .select('id')
          .eq('referral_code', myReferralCode)
          .single();

        if (!existing) {
          codeUnique = true;
        }
      }

      // Vérifier si l'utilisateur arrive avec un code de parrainage
      let referredBy = null;
      if (referralCode) {
        const { data: referrer } = await supabase
          .from('reward_users')
          .select('user_id')
          .eq('referral_code', referralCode)
          .single();

        if (referrer && referrer.user_id !== userId) {
          referredBy = referrer.user_id;
        }
      }

      const { data: newRewardUser, error: createError } = await supabase
        .from('reward_users')
        .insert({
          user_id: userId,
          referral_code: myReferralCode,
          referred_by: referredBy,
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

      // Créer le tour initial
      await supabase.from('game_rounds').insert({
        user_id: userId,
        status: 'available',
        round_type: 'standard',
        source: 'initial',
      });

      // Si vient d'un parrainage, donner un bonus au parrain
      if (referredBy) {
        // Créer un enregistrement dans referrals
        await supabase.from('referrals').insert({
          referrer_user_id: referredBy,
          referred_email: email,
          status: 'validated',
          validated_at: new Date().toISOString(),
        });

        // Créer un tour bonus pour le parrain
        await supabase.from('game_rounds').insert({
          user_id: referredBy,
          status: 'available',
          round_type: 'referral',
          source: 'referral_validated',
        });
      }
    }

    // Compter les tours disponibles
    const { count: availableRounds } = await supabase
      .from('game_rounds')
      .select('*', { count: 'exact', head: true })
      .eq('user_id', userId)
      .eq('status', 'available');

    // Récupérer l'historique des récompenses
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
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
      .limit(10);

    // Compter les filleuls validés
    const { count: validatedReferrals } = await supabase
      .from('referrals')
      .select('*', { count: 'exact', head: true })
      .eq('referrer_user_id', userId)
      .eq('status', 'validated');

    return NextResponse.json({
      success: true,
      userId,
      email,
      rewardUser,
      availableRounds: availableRounds || 0,
      recentRewards: recentRewards || [],
      validatedReferrals: validatedReferrals || 0,
      isNewUser,
    });
  } catch (error) {
    console.error('Erreur API /api/coffres/init:', error);
    return NextResponse.json(
      { error: 'Erreur serveur interne' },
      { status: 500 }
    );
  }
}
