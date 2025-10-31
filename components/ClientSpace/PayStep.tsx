'use client';

import { supabase } from '@/lib/SupabaseClient';
import { useEffect, useRef, useState } from 'react';

type PaymentStatus =
  | 'requires_payment_method'
  | 'requires_confirmation'
  | 'requires_action'
  | 'processing'
  | 'succeeded'
  | 'canceled'
  | 'unknown';

// résumé envoyé à Stripe / affiché
type CheckoutSummary = {
  project: {
    domainStatus: string; // "oui" | "non"
    domainName: string | null; // "monentreprise.com" ou null
    startAt: string | null; // yyyy-MM-dd
    audience: string; // "B2B" / "B2C" / "Mix" / ""
    goal: string;
  };
  client: {
    fullName: string;
    email: string | null; // <- corrigé: peut être null
    phone: string;
    company: string;
  };
  pricing: {
    categoryId: string; // ex "landing"
    categoryName: string; // ex "Landing Page"
    tierId: string; // ex "starter"
    tierName: string; // ex "Starter"
    totalEuros: number; // TTC final
    adsBudget: number; // budget pub
    optionLabels: string[]; // libellés humains des modules sélectionnés
  };
  signedPdfUrl?: string | null;
};

export default function PayStep({
  submissionId,
  amountEuro,
  customerEmail,
  summary,
  onPaid,
}: {
  submissionId: string;
  amountEuro: number;
  customerEmail: string;
  summary: CheckoutSummary;
  onPaid: (piOrStatus: string) => void; // 'succeeded' ou id de PI
}) {
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [blockedUrl, setBlockedUrl] = useState<string | null>(null);

  // refs pour polling Stripe
  const stripeTabRef = useRef<Window | null>(null);
  const pollTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const isPollingRef = useRef(false);

  /* ---- init PDF depuis summary/localStorage ---- */
  useEffect(() => {
    const fromSummary = summary?.signedPdfUrl ?? null;
    const fromLS =
      typeof window !== 'undefined'
        ? localStorage.getItem('signedPdfUrl')
        : null;
    setPdfUrl(fromSummary || fromLS || null);
  }, [summary]);

  /* ---- récupère PDF en DB ---- */
  useEffect(() => {
    let mounted = true;
    (async () => {
      if (!submissionId) return;
      const { data, error } = await supabase
        .from('submissions')
        .select('signed_pdf_url')
        .eq('id', submissionId)
        .maybeSingle();
      if (!mounted) return;
      if (error) return;
      const url = data?.signed_pdf_url || null;
      if (url) {
        setPdfUrl(url);
        try {
          localStorage.setItem('signedPdfUrl', url);
        } catch {}
      }
    })();
    return () => {
      mounted = false;
    };
  }, [submissionId]);

  /* ---- realtime DB: update PDF ---- */
  useEffect(() => {
    if (!submissionId) return;
    const channel = supabase
      .channel('submissions_signed_pdf_url')
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'submissions',
          filter: `id=eq.${submissionId}`,
        },
        (payload: any) => {
          const next = payload?.new?.signed_pdf_url || null;
          if (next) {
            setPdfUrl(next);
            try {
              localStorage.setItem('signedPdfUrl', next);
            } catch {}
          }
        }
      )
      .subscribe();
    return () => {
      supabase.removeChannel(channel);
    };
  }, [submissionId]);

  /* ---- polling Stripe ---- */
  function stopPaymentPolling() {
    if (pollTimerRef.current) clearInterval(pollTimerRef.current);
    pollTimerRef.current = null;
    isPollingRef.current = false;
  }

  function startPaymentPolling() {
    if (isPollingRef.current || !submissionId) return;
    isPollingRef.current = true;

    const tick = async () => {
      try {
        const r = await fetch(
          `/api/stripe/status?submissionId=${encodeURIComponent(submissionId)}`,
          { cache: 'no-store' }
        );
        if (!r.ok) throw new Error(await r.text());
        const j = (await r.json()) as {
          status: PaymentStatus;
          payment_intent_id?: string;
        };

        if (j.status === 'succeeded') {
          stopPaymentPolling();
          try {
            if (stripeTabRef.current && !stripeTabRef.current.closed) {
              stripeTabRef.current.close();
            }
          } catch {}
          onPaid(j.payment_intent_id || 'succeeded');
          return;
        }

        if (j.status === 'canceled') {
          stopPaymentPolling();
          setLoading(false);
          return;
        }
      } catch {
        // réseau flaky -> continue sans casser l'UI
      }
    };

    tick();
    pollTimerRef.current = setInterval(tick, 3000);
  }

  useEffect(() => {
    return () => stopPaymentPolling();
  }, []);

  /* ---- aller sur Stripe ---- */
  async function goPay() {
    setLoading(true);
    setErr(null);
    setBlockedUrl(null);

    try {
      const res = await fetch('/api/stripe/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          submissionId,
          amountEuro,
          customerEmail,
          summary, // déjà propre
        }),
      });
      if (!res.ok) throw new Error(await res.text());
      const { url } = (await res.json()) as { url: string };

      const newTab = window.open(url, '_blank');
      if (newTab) {
        stripeTabRef.current = newTab;
        startPaymentPolling();
      } else {
        // popup bloquée
        setBlockedUrl(url);
      }
    } catch (e: any) {
      setErr(e?.message ?? 'Erreur paiement.');
    } finally {
      setLoading(false);
    }
  }

  /* ---- données affichées dans le récap ---- */
  const catName =
    summary?.pricing?.categoryName || summary?.pricing?.categoryId || '—';
  const tierName =
    summary?.pricing?.tierName || summary?.pricing?.tierId || '—';
  const optionLabels = summary?.pricing?.optionLabels ?? [];
  const adsBudget = summary?.pricing?.adsBudget ?? 0;
  const startAt = summary?.project?.startAt || '—';
  const domainStatus = summary?.project?.domainStatus || 'non';
  const domainName = summary?.project?.domainName || '';

  // prépare rendu des modules en deux colonnes
  // si aucun module -> "Non"
  const modulesChunks: string[][] = (() => {
    if (!optionLabels.length) return [['Non']];
    // on coupe en colonnes équilibrées
    const mid = Math.ceil(optionLabels.length / 2);
    return [optionLabels.slice(0, mid), optionLabels.slice(mid)];
  })();

  return (
    <div className="space-y-4">
      <div className="rounded-[1.2rem] p-4 bg-black/[0.04] dark:bg-white/10">
        <div className="grid grid-cols-2 gap-3 text-sm">
          <Item k="Catégorie" v={catName} />
          <Item k="Offre" v={tierName} />

          <Item k="Début" v={String(startAt)} />
          <Item k="Nom de domaine" v={domainStatus} />

          <Item
            k="Budget pub"
            v={
              adsBudget ? `${Number(adsBudget).toLocaleString('fr-FR')}€` : '0€'
            }
          />
          <Item k="Email" v={customerEmail || (summary.client.email ?? '—')} />
        </div>

        {domainStatus === 'oui' && domainName ? (
          <div className="mt-3 text-xs text-muted-foreground break-all">
            Domaine&nbsp;: <span className="font-medium">{domainName}</span>
          </div>
        ) : null}

        <div className="mt-4">
          <div className="text-xs font-medium text-muted-foreground mb-1">
            Modules / options
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs">
            {modulesChunks.map((col, colIdx) => (
              <ul
                key={colIdx}
                className="space-y-1 rounded-[0.8rem] bg-black/[0.03] dark:bg-white/[0.07] p-3"
              >
                {col.map((label, i) => (
                  <li key={i} className="leading-snug">
                    {label}.
                  </li>
                ))}
              </ul>
            ))}
          </div>
        </div>

        {pdfUrl && (
          <div className="mt-4">
            <a
              href={pdfUrl}
              target="_blank"
              rel="noreferrer"
              className="w-full inline-flex items-center justify-center gap-2 rounded-[1.1rem] px-4 py-3
                         bg-black/[0.04] hover:bg-black/10
                         dark:bg-white/10 dark:hover:bg-white/15 transition text-sm"
            >
              Voir le contrat signé
              <svg
                className="w-4 h-4 opacity-80"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M7 17L17 7" />
                <path d="M7 7h10v10" />
              </svg>
            </a>
          </div>
        )}

        <div className="mt-4 h-px bg-black/10 dark:bg-white/10" />

        <div className="mt-3 flex items-center justify-between">
          <span className="text-sm text-muted-foreground">Montant TTC</span>
          <span className="text-xl font-bold">
            {amountEuro.toLocaleString('fr-FR')}€
          </span>
        </div>
      </div>

      {!pdfUrl && (
        <div className="text-xs text-amber-600 bg-amber-50 border border-amber-200 rounded-xl p-3">
          ⚠️ Le document n’est pas encore signé. Vous pouvez ouvrir le paiement,
          mais l’étape “Signature” est obligatoire.
        </div>
      )}

      <button
        onClick={goPay}
        type="button"
        disabled={loading}
        className="rounded-[1.1rem] text-white px-5 py-3 bg-primary w-full disabled:opacity-60"
      >
        {loading ? 'Ouverture…' : 'Payer avec Stripe'}
      </button>

      {err && <p className="text-sm text-red-600">{err}</p>}

      {blockedUrl && (
        <div className="text-sm rounded-xl p-3 bg-amber-50 border border-amber-200">
          Votre navigateur a bloqué l’ouverture de l’onglet Stripe.
          <a
            href={blockedUrl}
            target="_blank"
            rel="noreferrer"
            className="ml-2 underline font-medium"
            onClick={() => startPaymentPolling()}
          >
            Ouvrir Stripe dans un nouvel onglet
          </a>
        </div>
      )}
    </div>
  );
}

function Item({
  k,
  v,
  clamp = false,
}: {
  k: string;
  v: string;
  clamp?: boolean;
}) {
  return (
    <div className="flex items-center justify-between gap-3 text-sm">
      <span className="text-muted-foreground">{k}</span>
      <span
        className={clamp ? 'font-medium truncate max-w-[60%]' : 'font-medium'}
      >
        {v}
      </span>
    </div>
  );
}
