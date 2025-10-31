// /api/stripe/checkout/route.ts
import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: Request) {
  const { submissionId, amountEuro, customerEmail, summary } = await req.json();

  // /api/stripe/checkout/route.ts (juste la partie success_url / cancel_url)

  const envOrigin = process.env.NEXT_PUBLIC_SITE_URL;
  const origin = envOrigin || new URL(req.url).origin;

  // Cette page-là s'ouvre DANS l'onglet Stripe après paiement
  const success_url = `${origin}/thanks?sid=${submissionId}&cs={CHECKOUT_SESSION_ID}`;

  // Si la personne annule, on renvoie l'onglet Stripe vers la même app mais étape paiement
  const cancel_url = `${origin}/demarrer?step=pay&sid=${submissionId}&cancel=1`;

  const session = await stripe.checkout.sessions.create({
    mode: 'payment',
    customer_email: customerEmail || undefined,
    payment_method_types: ['card'],

    // ✅ Autorise maintenant, capture plus tard par l'admin
    payment_intent_data: { capture_method: 'manual' },

    line_items: [
      {
        price_data: {
          currency: 'eur',
          product_data: { name: `Soumission ${submissionId}` },
          unit_amount: Math.round(Number(amountEuro) * 100),
        },
        quantity: 1,
      },
    ],
    metadata: { submissionId, ...flattenMeta(summary) },
    success_url,
    cancel_url,
  });

  // On stocke l'id de la session (on en aura besoin côté admin)
  const supa = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );
  await supa
    .from('submissions')
    .update({ stripe_payment_intent: session.id }) // on garde le checkout_session_id ici
    .eq('id', submissionId);

  return NextResponse.json({ url: session.url });
}

function flattenMeta(obj: any, prefix = ''): Record<string, string> {
  const out: Record<string, string> = {};
  Object.entries(obj || {}).forEach(([k, v]) => {
    const key = prefix ? `${prefix}_${k}` : k;
    if (v && typeof v === 'object' && !Array.isArray(v)) {
      Object.assign(out, flattenMeta(v, key));
    } else {
      out[key] = Array.isArray(v) ? v.join(',') : String(v ?? '');
    }
  });
  return out;
}
