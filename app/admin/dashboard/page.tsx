// app/admin/page.tsx
import AdminDashboardClient from '@/components/ClientSpace/Admin/AdminDashboardClient';
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

export const dynamic = 'force-dynamic';

type SubmissionRow = {
  id: string;
  email: string | null;
  est_total: number | null; // NEW
  status: 'pending' | 'accepted' | 'refused' | 'archived';
  payment_intent_id: string | null; // NEW
  payment_status:
    | 'unpaid'
    | 'authorized'
    | 'captured'
    | 'refused'
    | 'refunded'
    | null; // NEW
  payment_amount: number | null; // NEW
  payment_currency: string | null; // NEW
  contract_status: 'pending' | 'signed' | 'refused' | 'cancelled' | null; // NEW
  signed_contract_files: string[] | null; // NEW
  offer_category: string;
  offer_tier: string;
  created_at: string;
};

export default async function AdminDashboardPage() {
  const cookieStore = await cookies();
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { cookies: { get: (n: string) => cookieStore.get(n)?.value } }
  );

  const fields = [
    'id',
    'email',
    'est_total',
    'status',
    'payment_intent_id',
    'payment_status',
    'payment_amount',
    'payment_currency',
    'contract_status',
    'signed_contract_files',
    'offer_category',
    'offer_tier',
    'created_at',
  ].join(',');

  const { data } = await supabase
    .from('submissions')
    .select(fields)
    .order('created_at', { ascending: false })
    .returns<SubmissionRow[]>(); // ← tell Supabase what to return

  const safeSubmissions = (data ?? []) as SubmissionRow[];

  const isPaid = (s: SubmissionRow) =>
    s.payment_status === 'authorized' || s.payment_status === 'captured';

  const nonPayes = safeSubmissions.filter((s) => !isPaid(s));
  const payes = safeSubmissions.filter((s) => isPaid(s));

  const kpi = {
    total: safeSubmissions.length,
    avantPaiement: nonPayes.length,
    checkoutOk: payes.length,
    signes: safeSubmissions.filter(
      (s) =>
        s.contract_status === 'signed' ||
        (s.signed_contract_files?.length ?? 0) > 0
    ).length,
    caPotentiel: safeSubmissions.reduce(
      (acc, s) => acc + Number(s.est_total ?? 0),
      0
    ),
  };

  return (
    <AdminDashboardClient
      submissions={safeSubmissions}
      nonPayes={nonPayes}
      payes={payes}
      kpi={kpi}
    />
  );
}
