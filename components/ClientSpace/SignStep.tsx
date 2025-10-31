'use client';

import {
  IconArrowRight,
  IconExternalLink,
  IconRefresh,
  IconLoader2,
} from '@tabler/icons-react';
import { useEffect, useRef, useState } from 'react';

type StatusPayload = {
  status: 'pending' | 'sent' | 'signed' | string;
  signedPdfPublicUrl: string | null;
};

type Persisted = {
  status?: StatusPayload['status'];
  signUrl?: string | null;
  pdfUrl?: string | null;
};

export default function SignStep({
  submissionId,
  clientName,
  clientEmail,
  onSigned,
}: {
  submissionId: string;
  clientName: string;
  clientEmail: string;
  onSigned: (signedPdfUrl: string | null) => void;
}) {
  const [loading, setLoading] = useState(false);
  const [signUrl, setSignUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [status, setStatus] = useState<StatusPayload['status']>('pending');
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);

  const pollingRef = useRef<NodeJS.Timeout | null>(null);
  const isPollingRef = useRef(false);
  const LS_KEY = `esign_${submissionId}`;

  function saveLS(p: Persisted) {
    try {
      const prev = JSON.parse(localStorage.getItem(LS_KEY) || '{}');
      localStorage.setItem(LS_KEY, JSON.stringify({ ...prev, ...p }));
    } catch {}
  }
  function readLS(): Persisted {
    try {
      return JSON.parse(localStorage.getItem(LS_KEY) || '{}');
    } catch {
      return {};
    }
  }

  // Boot : restaure local, relance polling si "sent"
  useEffect(() => {
    const persisted = readLS();
    if (persisted.status) setStatus(persisted.status);
    if (persisted.signUrl) setSignUrl(persisted.signUrl);
    if (persisted.pdfUrl) setPdfUrl(persisted.pdfUrl);

    if (persisted.status === 'sent') startPolling();

    // sync serveur
    fetchStatus();

    return () => stopPolling();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [submissionId]);

  // si on passe en "sent" plus tard → polling
  useEffect(() => {
    if (status === 'sent') startPolling();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);

  async function fetchStatus(): Promise<StatusPayload | null> {
    try {
      const r = await fetch(
        `/api/esign/status?submissionId=${encodeURIComponent(submissionId)}`,
        { cache: 'no-store' }
      );
      if (!r.ok) throw new Error(await r.text());
      const j = (await r.json()) as StatusPayload;

      setStatus(j.status);
      setPdfUrl(j.signedPdfPublicUrl);
      saveLS({ status: j.status, pdfUrl: j.signedPdfPublicUrl || null });

      return j;
    } catch (e) {
      console.warn('[esign-status]', e);
      return null;
    }
  }

  function startPolling() {
    if (isPollingRef.current) return;
    isPollingRef.current = true;

    const tick = async () => {
      try {
        await fetch('/api/esign/pull-status', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ submissionId }),
        }).catch(() => {});
        await fetch('/api/esign/fetch-pdf', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ submissionId }),
        }).catch(() => {});
        const s = await fetchStatus();
        if (s?.status === 'signed') stopPolling();
      } catch {}
    };

    tick();
    pollingRef.current = setInterval(tick, 5000);
  }

  function stopPolling() {
    if (pollingRef.current) clearInterval(pollingRef.current);
    pollingRef.current = null;
    isPollingRef.current = false;
  }

  async function createSignature() {
    try {
      setLoading(true);
      setError(null);

      const res = await fetch('/api/esign/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ submissionId, clientName, clientEmail }),
      });

      if (!res.ok) throw new Error(await res.text());

      const { url } = await res.json();
      if (!url) throw new Error("Impossible d'obtenir l'URL de signature.");

      setSignUrl(url);
      setStatus('sent'); // 🟡 <- clé : on passe en "sent" direct
      saveLS({ status: 'sent', signUrl: url });

      // ouvre la page de signature
      window.open(url, '_blank', 'noopener,noreferrer');

      // lance le polling
      startPolling();
    } catch (e: any) {
      setError(e.message ?? 'Erreur création du document.');
    } finally {
      setLoading(false);
    }
  }

  const isSigned = status === 'signed';
  const hasPdf = Boolean(pdfUrl);

  // si "signed" mais pas encore le pdfUrl final, on dérive qque chose
  useEffect(() => {
    if (isSigned && !hasPdf && signUrl) {
      const derived = signUrl.replace(/\/signed\/?$/i, '');
      setPdfUrl(derived);
      saveLS({ pdfUrl: derived, status: 'signed' });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSigned, hasPdf, signUrl]);

  /* ---------------- UI LOGIC FOR PRIMARY BUTTON ----------------
     1. loading === true      -> "Préparation…"
     2. status === 'sent'     -> "En attente de signature…" (spinner), disabled
     3. sinon (pending etc.)  -> 'Générer & ouvrir la signature' OU 'Relancer...'
  ---------------------------------------------------------------- */
  let primaryLabel: React.ReactNode;
  let primaryDisabled = false;

  if (loading) {
    primaryLabel = (
      <span className="inline-flex items-center gap-2">
        <IconLoader2 className="h-4 w-4 animate-spin" />
        Préparation…
      </span>
    );
    primaryDisabled = true;
  } else if (status === 'sent') {
    primaryLabel = (
      <span className="inline-flex items-center gap-2">
        <IconLoader2 className="h-4 w-4 animate-spin" />
        En attente de signature…
      </span>
    );
    primaryDisabled = true;
  } else {
    // status === 'pending' (ou autre pas signé)
    primaryLabel = signUrl
      ? 'Relancer la page de signature'
      : 'Générer & ouvrir la signature';
    primaryDisabled = false;
  }

  return (
    <div className="flex flex-col items-center justify-center gap-4 w-full">
      {/* ==== AVANT SIGNATURE ==== */}
      {status !== 'signed' && (
        <button
          className="rounded-[1.1rem] px-5 py-3 bg-primary text-white disabled:opacity-60 w-full flex items-center justify-center text-sm font-medium"
          onClick={() => {
            if (loading || status === 'sent') return;
            // si on est déjà en 'sent', on bloque le re-click
            // sinon on lance createSignature
            if (signUrl && status !== 'pending') {
              // cas rare (genre status inconnu mais url déjà là) -> réouvrir
              window.open(signUrl, '_blank', 'noopener,noreferrer');
            } else {
              createSignature();
            }
          }}
          disabled={primaryDisabled}
        >
          {primaryLabel}
        </button>
      )}

      {/* ==== APRÈS SIGNATURE (SIGNED) ==== */}
      {status === 'signed' && (
        <div className="grid grid-cols-2 mx-auto w-full items-center gap-3">
          {hasPdf && (
            <a
              href={pdfUrl!}
              target="_blank"
              rel="noreferrer"
              className="rounded-[1.1rem] px-4 py-3 items-center justify-center flex gap-2 bg-black/[0.04] hover:bg-black/10 dark:bg-white/10 dark:hover:bg-white/15 text-sm font-medium"
            >
              Voir le PDF signé
              <IconExternalLink className="inline ml-1 h-4 w-4" />
            </a>
          )}

          <button
            onClick={createSignature}
            className="rounded-[1.1rem] px-4 py-3 items-center justify-center flex gap-2 bg-black/[0.04] hover:bg-black/10 dark:bg-white/10 dark:hover:bg-white/15 text-sm font-medium"
          >
            Re-signer
            <IconRefresh className="inline ml-1 h-4 w-4" />
          </button>

          <button
            onClick={() => {
              try {
                localStorage.setItem('signedPdfUrl', pdfUrl || '');
              } catch {}
              onSigned(pdfUrl || null);
            }}
            className="rounded-[1.1rem] col-span-2 text-white px-4 py-3 bg-primary text-sm font-medium flex items-center justify-center gap-2"
          >
            Continuer le paiement
            <IconArrowRight className="inline ml-1 h-4 w-4" />
          </button>
        </div>
      )}

      {error && (
        <p className="text-sm text-red-600 text-center max-w-sm">{error}</p>
      )}

      {/* petit hint sous le bouton quand pas signé */}
      {status !== 'signed' && (
        <p className="text-xs text-muted-foreground text-center max-w-sm leading-relaxed">
          On va générer le contrat, l’ouvrir dans un nouvel onglet pour
          signature, puis on attend automatiquement que ce soit signé.
        </p>
      )}
    </div>
  );
}
