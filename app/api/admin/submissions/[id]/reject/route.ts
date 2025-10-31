export const dynamic = 'force-dynamic';
export const revalidate = 0;
export const runtime = 'nodejs';

import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import Stripe from 'stripe';
import { Resend } from 'resend';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(_: Request, { params }: { params: { id: string } }) {
  const supa = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { db: { schema: 'public' } } // ✅ explicite
  );

  const { data: sub, error: e1 } = await supa
    .from('submissions')
    .select('id, email, stripe_payment_intent, full_name')
    .eq('id', params.id)
    .single();
  if (e1 || !sub)
    return NextResponse.json(
      { error: e1?.message || 'Not found' },
      { status: 404 }
    );

  if (!sub.stripe_payment_intent) {
    return NextResponse.json(
      { error: 'Checkout non effectué' },
      { status: 400 }
    );
  }

  // PI -> cancel (autorisation)
  const cs = await stripe.checkout.sessions.retrieve(sub.stripe_payment_intent);
  const piId = (cs.payment_intent as string) || null;
  if (!piId)
    return NextResponse.json(
      { error: 'Payment Intent introuvable' },
      { status: 400 }
    );

  try {
    await stripe.paymentIntents.cancel(piId);
  } catch (err: any) {
    // si déjà annulé, on ignore
    if (err?.code !== 'payment_intent_unexpected_state') throw err;
  }

  await supa
    .from('submissions')
    .update({ status: 'rejected' })
    .eq('id', params.id);

  // Email
  const RESEND_API_KEY = process.env.RESEND_API_KEY;
  if (RESEND_API_KEY) {
    const resend = new Resend(RESEND_API_KEY);
    const from =
      process.env.RESEND_FROM_EMAIL || 'Ikovaline <contact@ikovaline.com>';
    const subject = 'Votre demande n’a pas été retenue — Ikovaline';
    const firstName = (sub.full_name || '').split(' ')[0] || 'Bonjour';
    const html = `
      <div style="font-family:Inter,system-ui,-apple-system,Segoe UI,Roboto,Arial,sans-serif;line-height:1.55;color:#111">
        <h2 style="margin:0 0 10px 0">Décision concernant votre demande</h2>
        <p>${firstName},</p>
        <p>Après étude, nous ne pouvons pas donner suite à votre demande pour le moment. L’autorisation de paiement a été annulée.</p>
        <p>Si vous souhaitez des précisions ou retravailler votre brief, répondez à cet email et nous vous guiderons.</p>
        <hr style="border:none;border-top:1px solid #eee;margin:20px 0" />
        <p style="margin:0;color:#555">Ikovaline — Onboarding projets</p>
      </div>`.trim();

    try {
      await resend.emails.send({ from, to: sub.email!, subject, html });
    } catch (mailErr: any) {
      console.warn('[reject] resend error:', mailErr?.message || mailErr);
    }
  } else {
    console.error('[reject] RESEND_API_KEY manquante');
  }

  return NextResponse.json({
    message: 'Soumission refusée, autorisation annulée, email envoyé.',
  });
}
