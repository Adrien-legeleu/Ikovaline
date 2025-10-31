// app/api/stripe/webhook/route.ts
import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { createClient } from '@supabase/supabase-js';

// 👇 important pour forcer runtime Node (pas Edge)
export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
export const revalidate = 0;

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

// helper pour marquer la soumission comme "autorisée" (= carte ok, fonds réservés)
async function updateSubmissionAfterAuth(args: {
  submissionId: string;
  paymentIntentId: string | null;
  amountTotalCents: number | null;
}) {
  const { submissionId, paymentIntentId, amountTotalCents } = args;

  const supa = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  const amountEuro = amountTotalCents != null ? amountTotalCents / 100 : null;

  const { error } = await supa
    .from('submissions')
    .update({
      payment_intent_id: paymentIntentId,
      payment_amount: amountEuro,
      payment_currency: 'EUR',
      payment_status: 'authorized', // 👈 réservé (manual capture)
      status: 'paid', // 👈 business: ok pour bosser
    })
    .eq('id', submissionId);

  if (error) {
    console.error('[webhook] supabase update error (authorized)', error);
  } else {
    console.log('[webhook] submission updated OK', submissionId);
  }
}

export async function POST(req: Request) {
  const sig = req.headers.get('stripe-signature');
  const whsec = process.env.STRIPE_WEBHOOK_SECRET;

  if (!sig || !whsec) {
    console.error('[webhook] missing signature or STRIPE_WEBHOOK_SECRET');
    return new NextResponse('Bad webhook signature setup', { status: 400 });
  }

  const rawBody = await req.text();
  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(rawBody, sig, whsec);
  } catch (err: any) {
    console.error('[webhook] constructEvent failed', err?.message);
    return new NextResponse(`Webhook Error: ${err.message}`, { status: 400 });
  }

  switch (event.type) {
    case 'checkout.session.completed': {
      // L'utilisateur vient de terminer le Checkout
      const session = event.data.object as Stripe.Checkout.Session;

      const submissionId = session.metadata?.submissionId || null;
      const paymentIntentId = session.payment_intent as string | null;
      const amountTotalCents = session.amount_total ?? null;

      if (submissionId) {
        await updateSubmissionAfterAuth({
          submissionId,
          paymentIntentId,
          amountTotalCents,
        });
      } else {
        console.warn(
          '[webhook] checkout.session.completed sans submissionId dans metadata'
        );
      }

      break;
    }

    case 'payment_intent.succeeded': {
      // Ici le paiement est CAPTURÉ (argent vraiment encaissé)
      const pi = event.data.object as Stripe.PaymentIntent;
      const submissionId = (pi.metadata as any)?.submissionId || null;

      if (submissionId) {
        const supa = createClient(
          process.env.NEXT_PUBLIC_SUPABASE_URL!,
          process.env.SUPABASE_SERVICE_ROLE_KEY!
        );

        const amountEuro =
          pi.amount_received != null ? pi.amount_received / 100 : null;

        const { error } = await supa
          .from('submissions')
          .update({
            payment_intent_id: pi.id,
            payment_amount: amountEuro,
            payment_currency: 'EUR',
            payment_status: 'captured', // 👈 capturé pour de vrai
            status: 'paid',
          })
          .eq('id', submissionId);

        if (error) {
          console.error('[webhook] supabase update error (captured)', error);
        } else {
          console.log('[webhook] submission captured OK', submissionId);
        }
      } else {
        console.warn(
          '[webhook] payment_intent.succeeded sans submissionId dans metadata'
        );
      }

      break;
    }

    default: {
      console.log('[webhook] unhandled event', event.type);
    }
  }

  return NextResponse.json({ received: true });
}
