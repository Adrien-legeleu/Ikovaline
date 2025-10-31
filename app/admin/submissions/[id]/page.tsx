// app/admin/submissions/[id]/page.tsx
import { cookies } from 'next/headers';
import { createServerClient } from '@supabase/ssr';
import SubmissionDetailClient from '@/components/ClientSpace/Admin/SubmissionDetailClient';

export const dynamic = 'force-dynamic';

// Le type correspond EXACTEMENT à ta table public.submissions
export type SupabaseSubmission = {
  id: string;
  full_name: string | null;
  email: string | null;
  phone: string | null;
  company: string | null;
  audience: string | null;
  goal: string | null;
  languages: string[] | null;
  tone: string[] | null;
  start_at: string | null; // date -> string ISO en JS
  urls: string[] | null;
  links: string[] | null;
  has_domain: boolean | null;
  domain: string | null;
  offer_category: string;
  offer_tier: string;
  offer_price: number | null;
  offer_description: string | null;
  selected_options: string[] | null;
  est_total: number | null;
  currency: string;
  wants_ads: boolean | null;
  ads_budget: number | null;
  brief_files: string[] | null;
  contract_files: string[] | null;
  signed_contract_files: string[] | null;
  contract_status: 'pending' | 'signed' | 'refused' | 'cancelled' | null;
  payment_intent_id: string | null;
  payment_amount: number | null;
  payment_currency: string | null;
  payment_status:
    | 'unpaid'
    | 'authorized'
    | 'captured'
    | 'refused'
    | 'refunded'
    | null;
  payment_installments: number | null;
  status: 'pending' | 'accepted' | 'refused' | 'archived';
  note_admin: string | null;
  created_at: string; // timestamptz -> string ISO
  provider_contract_id: string | null;
};

// projet lié (existe déjà chez toi)
export type LinkedProject = {
  id: string;
  status: string;
  title: string | null;
  created_at: string;
} | null;

// --------- helpers (server-side, pas d'UI ici) ---------

function euro(v: number | null): string {
  if (v == null) return '—';
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'EUR',
  }).format(Number(v));
}

function resolvePaymentTone(p: SupabaseSubmission['payment_status']): {
  tone: 'ok' | 'warn' | 'danger' | 'muted' | 'primary';
  label: string;
} {
  if (p === 'captured' || p === 'authorized') {
    return { tone: 'ok', label: p };
  }
  if (p === 'unpaid') {
    return { tone: 'warn', label: 'unpaid' };
  }
  if (p === 'refused') {
    return { tone: 'danger', label: 'refused' };
  }
  if (p === 'refunded') {
    return { tone: 'muted', label: 'refunded' };
  }
  return { tone: 'muted', label: p ?? '—' };
}

function computeContractInfo(sub: SupabaseSubmission): {
  isSigned: boolean;
  badgeLabel: string;
} {
  const pdfSigned =
    Array.isArray(sub.signed_contract_files) &&
    sub.signed_contract_files.length > 0;

  const isSigned = sub.contract_status === 'signed' || pdfSigned;

  return {
    isSigned,
    badgeLabel: isSigned ? 'Contrat signé' : 'Contrat en attente',
  };
}

// --------- SERVER PAGE COMPONENT ---------

export default async function AdminSubmissionPage({
  params,
}: {
  params: { id: string };
}) {
  // 1. supabase server-side
  const cookieStore = await cookies();
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get: (n: string) => cookieStore.get(n)?.value,
      },
    }
  );

  // 2. get submission
  const { data: sub } = await supabase
    .from('submissions')
    .select('*')
    .eq('id', params.id)
    .single<SupabaseSubmission>();

  if (!sub) {
    return (
      <section className="px-6 py-10 text-center">
        <h1 className="text-xl font-semibold mb-3 text-neutral-900 dark:text-neutral-100">
          Soumission introuvable
        </h1>
        <a
          href="/admin/dashboard"
          className="text-primary underline text-sm font-medium"
        >
          ← Retour dashboard
        </a>
      </section>
    );
  }

  // 3. projet lié
  const { data: proj } = await supabase
    .from('projects')
    .select('id,status,title,created_at')
    .eq('client_email', sub.email)
    .gte('created_at', sub.created_at)
    .order('created_at', { ascending: false })
    .limit(1)
    .maybeSingle<LinkedProject>();

  // 4. champs dérivés envoyés au composant client
  const paymentTone = resolvePaymentTone(sub.payment_status);
  const { isSigned: contractSigned, badgeLabel: contractBadge } =
    computeContractInfo(sub);

  const estTotalDisplay = euro(sub.est_total);

  // languages, tone, urls, links, selected_options sont déjà dans le schéma
  const langs = Array.isArray(sub.languages) ? sub.languages : [];
  const tones = Array.isArray(sub.tone) ? sub.tone : [];
  const urls = Array.isArray(sub.urls) ? sub.urls : [];
  const links = Array.isArray(sub.links) ? sub.links : [];
  const opts = Array.isArray(sub.selected_options) ? sub.selected_options : [];

  // startWanted = ce que tu veux afficher côté UI
  const startWanted = sub.start_at ?? '—';

  return (
    <SubmissionDetailClient
      sub={sub}
      proj={proj}
      derived={{
        paymentTone,
        contractSigned,
        contractBadge,
        estTotalDisplay,
        langs,
        tones,
        urls,
        links,
        opts,
        startWanted,
      }}
    />
  );
}
