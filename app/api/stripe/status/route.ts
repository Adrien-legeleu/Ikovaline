// /api/stripe/status/route.ts
import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

type PaymentRow = {
  status: string | null; // 'pending' | 'paid' | ...
  payment_status: string | null; // 'unpaid' | 'authorized' | 'captured'
  payment_intent_id: string | null; // pi_xxx
  payment_amount: number | null; // en EUR
  payment_currency: string | null; // 'EUR'
};

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const submissionId = searchParams.get('submissionId');

    if (!submissionId) {
      return new NextResponse('Missing submissionId', { status: 400 });
    }

    const supa = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    const { data, error } = await supa
      .from('submissions')
      .select(
        [
          'status',
          'payment_status',
          'payment_intent_id',
          'payment_amount',
          'payment_currency',
        ].join(',')
      )
      .eq('id', submissionId)
      .maybeSingle();

    if (error) {
      return new NextResponse(error.message, { status: 500 });
    }
    if (!data) {
      return new NextResponse('Not found', { status: 404 });
    }

    const row = data as unknown as PaymentRow;

    // Est-ce qu'on considère la commande "payée" businessment ?
    // oui si:
    // - business status = 'paid'
    // - ou payment_status = 'authorized' (fonds réservés)
    // - ou payment_status = 'captured' (fonds encaissés)
    const isPaidNow =
      row.status === 'paid' ||
      row.payment_status === 'authorized' ||
      row.payment_status === 'captured';

    const mappedStatus = isPaidNow ? 'succeeded' : 'requires_payment_method';

    return NextResponse.json({
      status: mappedStatus,
      payment_intent_id: row.payment_intent_id ?? null,
      amount: row.payment_amount ?? null,
      currency: row.payment_currency ?? 'EUR',
    });
  } catch (e: any) {
    return new NextResponse(e?.message ?? 'Server error', { status: 500 });
  }
}
