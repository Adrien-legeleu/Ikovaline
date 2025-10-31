export const dynamic = 'force-dynamic';
export const revalidate = 0;
export const runtime = 'nodejs';

import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import Stripe from 'stripe';
import { getOrCreateUserByEmail } from '@/app/api/_utils/helper';
import { Resend } from 'resend';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(_: Request, { params }: { params: { id: string } }) {
  const supa = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { db: { schema: 'public' } } // ✅ explicite
  );

  // 1) Submission
  const { data: sub, error: e1 } = await supa
    .from('submissions')
    .select('*')
    .eq('id', params.id)
    .single();
  if (e1 || !sub) {
    return NextResponse.json(
      { error: e1?.message || 'Submission introuvable' },
      { status: 404 }
    );
  }

  if (!sub.stripe_payment_intent) {
    return NextResponse.json(
      { error: 'Checkout non effectué' },
      { status: 400 }
    );
  }

  // 2) Checkout Session -> PI
  const cs = await stripe.checkout.sessions.retrieve(sub.stripe_payment_intent);
  const piId = (cs.payment_intent as string) || null;
  if (!piId) {
    return NextResponse.json(
      { error: 'Payment Intent introuvable depuis la session' },
      { status: 400 }
    );
  }

  // 3) Capture (si nécessaire)
  try {
    await stripe.paymentIntents.capture(piId);
  } catch (err: any) {
    // si déjà capturé, on ignore
    if (err?.code !== 'payment_intent_unexpected_state') throw err;
  }

  // 4) User
  const email = sub.email!;
  const userId = await getOrCreateUserByEmail(email);

  // 5) Profil
  await supa.from('profiles').upsert({
    id: userId,
    email,
    full_name: sub.full_name,
    phone: sub.phone,
    company: sub.company,
    role: 'user',
    status: 'active',
  });

  // 6) Projet
  const payload = sub.payload || {};
  const title = payload?.profile?.company
    ? `Projet ${payload.profile.company}`
    : 'Nouveau projet';
  const description = payload?.questions?.goal
    ? `Objectif: ${payload.questions.goal}`
    : null;

  const { error: projErr } = await supa.from('projects').insert({
    title,
    description,
    client_email: email,
    owner_user_id: userId,
    status: 'review',
    tier: payload?.pricing?.tier ?? null,
    options: payload?.pricing
      ? {
          ids: payload.pricing.options ?? [],
          adsBudget: payload.pricing.adsBudget ?? 0,
        }
      : {},
    motion_seconds: payload?.pricing?.motionSeconds ?? 0,
    urls: payload?.questions?.urls ?? [],
    extra: {
      audience: payload?.questions?.audience ?? null,
      languages: payload?.questions?.languages ?? [],
      tone: payload?.questions?.tone ?? [],
      domain: payload?.questions?.domain ?? null,
      deadline: payload?.questions?.deadline ?? null,
    },
  });
  if (projErr)
    return NextResponse.json({ error: projErr.message }, { status: 500 });

  // 7) Submission -> approved
  await supa
    .from('submissions')
    .update({ status: 'approved' })
    .eq('id', params.id);

  // 8) Lien de password
  const { data: linkData, error: linkErr } = await supa.auth.admin.generateLink(
    {
      type: 'recovery',
      email,
      options: {
        redirectTo:
          process.env.NODE_ENV === 'production'
            ? 'https://ikovaline.com/create-password'
            : 'http://localhost:3000/create-password',
      },
    }
  );

  const passwordLink = linkData?.properties?.action_link || null;
  if (linkErr) console.warn('[approve] generateLink error', linkErr.message);

  // 9) Email (Resend instancié ICI)
  const RESEND_API_KEY = process.env.RESEND_API_KEY;
  if (!RESEND_API_KEY) {
    console.error('[approve] RESEND_API_KEY manquante');
    // On renvoie quand même OK côté métier
  } else {
    const resend = new Resend(RESEND_API_KEY);
    const from =
      process.env.RESEND_FROM_EMAIL || 'Ikovaline <contact@ikovaline.com>';
    const subject =
      '✅ Votre projet est validé — activez votre espace Ikovaline';
    const firstName = (sub.full_name || '').split(' ')[0] || 'Bonjour';
    const html = `
      <div style="font-family:Inter,system-ui,-apple-system,Segoe UI,Roboto,Arial,sans-serif;line-height:1.55;color:#111">
        <h2 style="margin:0 0 10px 0">Votre projet est validé 🎉</h2>
        <p>Bonjour ${firstName},</p>
        <p>Bonne nouvelle : votre projet a été validé et votre paiement confirmé.</p>
        <p>Pour accéder à votre espace client et suivre l’avancement, définissez votre mot de passe :</p>
        <p>
          <a href="${passwordLink ?? '#'}"
             style="display:inline-block;background:#111;color:#fff;padding:12px 18px;border-radius:10px;text-decoration:none;font-weight:600"
             target="_blank" rel="noreferrer">
            Activer mon espace
          </a>
        </p>
        ${!passwordLink ? `<p style="color:#c00">⚠️ Le lien n'a pas pu être généré automatiquement. Répondez à cet email pour que nous vous le renvoyions.</p>` : ''}
        <hr style="border:none;border-top:1px solid #eee;margin:20px 0" />
        <p style="margin:0;color:#555">Ikovaline — Onboarding projets</p>
      </div>`.trim();

    try {
      await resend.emails.send({ from, to: email, subject, html });
    } catch (mailErr: any) {
      console.warn('[approve] resend error:', mailErr?.message || mailErr);
    }
  }

  return NextResponse.json({
    ok: true,
    message: 'Soumission validée, paiement capturé, projet créé, email envoyé.',
    passwordLink,
  });
}
