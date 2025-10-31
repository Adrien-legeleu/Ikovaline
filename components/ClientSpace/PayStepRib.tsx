'use client';

import { useEffect, useMemo, useState } from 'react';
import { Check, Copy, Shield, Info } from 'lucide-react';
import { supabase } from '@/lib/SupabaseClient'; // si tu veux écouter la signature PDF comme dans PayStep
import { cn } from '@/lib/utils';

/* ===== Types (identiques à ton PayStep) ===== */
type CheckoutSummary = {
  project: {
    domainStatus: string;
    domainName: string | null;
    startAt: string | null;
    audience: string;
    goal: string;
  };
  client: {
    fullName: string;
    email: string | null;
    phone: string;
    company: string;
  };
  pricing: {
    categoryId: string;
    categoryName: string;
    tierId: string;
    tierName: string;
    totalEuros: number;
    adsBudget: number;
    optionLabels: string[];
  };
  signedPdfUrl?: string | null;
};

type BankDetails = {
  iban: string; // avec espaces pour lecture
  bic: string;
  label: string; // libellé/référence à mettre impérativement
  swiftPartnerBic?: string; // pour virement international (optionnel)
  note?: string; // ligne libre additionnelle
};

/* ===== Composant ===== */
export default function PayStepRib({
  submissionId,
  amountEuro,
  summary,
  bank = {
    iban: 'FR76 1741 8000 0100 0118 4964 938',
    bic: 'SNNNFR22XXX',
    label: 'zb1v0063a',
    swiftPartnerBic: 'TRWIBEB3',
  },
  onConfirmed,
  confirmLoading = false,
  // appelé quand l’utilisateur clique "J’ai effectué le virement"
}: {
  submissionId?: string;
  amountEuro: number;
  summary: CheckoutSummary;
  bank?: BankDetails;
  onConfirmed?: () => void;
  confirmLoading?: boolean;
}) {
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);

  // (facultatif) récup PDF signé comme dans ton PayStep
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
      if (!error && data?.signed_pdf_url) setPdfUrl(data.signed_pdf_url);
    })();
    return () => {
      mounted = false;
    };
  }, [submissionId]);

  const catName =
    summary?.pricing?.categoryName || summary?.pricing?.categoryId || '—';
  const tierName =
    summary?.pricing?.tierName || summary?.pricing?.tierId || '—';
  const optionLabels = summary?.pricing?.optionLabels ?? [];
  const adsBudget = summary?.pricing?.adsBudget ?? 0;
  const startAt = summary?.project?.startAt || '—';
  const domainStatus = summary?.project?.domainStatus || 'non';
  const domainName = summary?.project?.domainName || '';

  const modulesChunks: string[][] = useMemo(() => {
    if (!optionLabels.length) return [['Non']];
    const mid = Math.ceil(optionLabels.length / 2);
    return [optionLabels.slice(0, mid), optionLabels.slice(mid)];
  }, [optionLabels]);

  return (
    <div className="space-y-4">
      {/* Bandeau info Stripe */}
      <div className="rounded-[1.1rem] border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900 dark:border-amber-300/40 dark:bg-amber-100/20 dark:text-amber-100">
        <div className="flex items-start gap-2">
          <Info className="mt-0.5 h-4 w-4 shrink-0" />
          <div>
            <span className="font-medium">Stripe arrive bientôt.</span> En
            attendant, vous pouvez régler par virement bancaire grâce aux
            informations ci-dessous.
          </div>
        </div>
      </div>

      {/* Récap projet/prix (même style que PayStep) */}
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
          <Item k="Email" v={summary.client.email || '—'} />
        </div>

        {domainStatus === 'oui' && domainName ? (
          <div className="mt-3 text-xs text-muted-foreground break-all">
            Domaine : <span className="font-medium">{domainName}</span>
          </div>
        ) : null}

        <div className="mt-4">
          <div className="mb-1 text-xs font-medium text-muted-foreground">
            Modules / options
          </div>
          <div className="grid grid-cols-2 gap-2 text-xs">
            {modulesChunks.map((col, idx) => (
              <ul
                key={idx}
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
              className="inline-flex w-full items-center justify-center gap-2 rounded-[1.1rem] px-4 py-3
                         bg-black/[0.04] hover:bg-black/10 dark:bg-white/10 dark:hover:bg-white/15 transition text-sm"
            >
              Voir le contrat signé
              <svg
                className="h-4 w-4 opacity-80"
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

      {/* Bloc RIB */}
      <BankBlock bank={bank} amountEuro={amountEuro} />

      {/* Bouton confirmation */}
      <button
        type="button"
        disabled={confirmLoading}
        onClick={onConfirmed}
        className="w-full rounded-[1.1rem] bg-primary px-5 py-3 text-white disabled:opacity-60"
      >
        {confirmLoading ? 'Validation…' : 'J’ai effectué le virement'}
      </button>

      {/* Conseils / délais */}
      <div className="rounded-[1.1rem] border border-neutral-200 bg-white p-4 text-sm dark:border-white/10 dark:bg-neutral-900">
        <div className="mb-2 flex items-center gap-2 font-medium">
          <Shield className="h-4 w-4" />
          Conseils importants
        </div>
        <ul className="ml-5 list-disc space-y-1 text-muted-foreground">
          <li>
            Indiquez <span className="font-semibold">exactement</span> le
            libellé ci-dessus pour accélérer l’identification.
          </li>
          <li>
            Un virement SEPA peut prendre{' '}
            <span className="font-medium">24 à 72 h ouvrées</span>.
          </li>
          <li>Nous activons votre projet dès réception des fonds.</li>
        </ul>
      </div>
    </div>
  );
}

/* ===== Sous-composants ===== */
function BankBlock({
  bank,
  amountEuro,
}: {
  bank: BankDetails;
  amountEuro: number;
}) {
  return (
    <div className="rounded-[1.2rem] border border-neutral-200 bg-white p-4 dark:border-white/10 dark:bg-neutral-900">
      <div className="mb-3 text-base font-semibold">
        Informations de paiement (virement)
      </div>
      <div className="grid grid-cols-1 gap-3 text-sm sm:grid-cols-2">
        <CopyRow label="IBAN" value={bank.iban} mono />
        <CopyRow label="BIC" value={bank.bic} mono />
        <CopyRow
          label="Libellé à indiquer"
          value={bank.label}
          helper="À inclure dans le libellé pour faciliter l’identification."
          mono
        />
        {bank.swiftPartnerBic ? (
          <CopyRow
            label="BIC partenaire (SWIFT)"
            value={bank.swiftPartnerBic}
            helper="À utiliser pour un virement international."
            mono
          />
        ) : null}
        <CopyRow
          label="Montant TTC"
          value={`${amountEuro.toLocaleString('fr-FR')} €`}
        />
      </div>
      {bank.note ? (
        <p className="mt-3 text-xs text-muted-foreground">{bank.note}</p>
      ) : null}
    </div>
  );
}

function CopyRow({
  label,
  value,
  helper,
  mono = false,
}: {
  label: string;
  value: string;
  helper?: string;
  mono?: boolean;
}) {
  const [copied, setCopied] = useState(false);

  async function onCopy() {
    try {
      // pour l’IBAN on copie sans espaces
      const clean = label.toLowerCase().includes('iban')
        ? value.replace(/\s+/g, '')
        : value;
      await navigator.clipboard.writeText(clean);
      setCopied(true);
      setTimeout(() => setCopied(false), 1200);
    } catch {}
  }

  return (
    <div className="flex items-start justify-between gap-3 rounded-xl bg-black/[0.03] p-3 dark:bg-white/[0.06]">
      <div className="min-w-0">
        <div className="text-xs text-muted-foreground">{label}</div>
        <div
          className={cn(
            'truncate font-medium',
            mono && 'font-mono tracking-wide'
          )}
        >
          {value}
        </div>
        {helper && (
          <div className="mt-1 text-xs text-muted-foreground">{helper}</div>
        )}
      </div>
      <button
        type="button"
        onClick={onCopy}
        className="shrink-0 rounded-lg border border-neutral-200 bg-white px-2.5 py-1.5 text-xs hover:bg-neutral-50 dark:border-white/10 dark:bg-neutral-900 dark:hover:bg-neutral-800"
        aria-label={`Copier ${label}`}
        title={`Copier ${label}`}
      >
        {copied ? (
          <span className="inline-flex items-center gap-1">
            <Check className="h-3.5 w-3.5" /> Copié
          </span>
        ) : (
          <span className="inline-flex items-center gap-1">
            <Copy className="h-3.5 w-3.5" /> Copier
          </span>
        )}
      </button>
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
        className={clamp ? 'max-w-[60%] truncate font-medium' : 'font-medium'}
      >
        {v}
      </span>
    </div>
  );
}
