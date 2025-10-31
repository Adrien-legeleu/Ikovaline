// app/admin/submissions/[id]/submission-actions.tsx
'use client';

import { useState } from 'react';

export default function SubmissionActions({
  submissionId,
  hasCheckout,
  hasSignedPdf,
}: {
  submissionId: string;
  hasCheckout: boolean;
  hasSignedPdf: boolean;
}) {
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);
  const [err, setErr] = useState<string | null>(null);

  async function call(path: string, body?: any) {
    setBusy(true);
    setErr(null);
    setMsg(null);
    try {
      const r = await fetch(path, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: body ? JSON.stringify(body) : '{}',
      });
      const j = await r.json().catch(() => ({}));
      if (!r.ok)
        throw new Error(j?.error || (await r.text()) || 'Erreur serveur');
      setMsg(j?.message || 'OK');
      // petit refresh
      setTimeout(() => location.reload(), 800);
    } catch (e: any) {
      setErr(e.message ?? 'Erreur');
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="flex flex-wrap gap-3 items-center">
      {!hasSignedPdf && (
        <button
          disabled={busy}
          className="rounded-xl border px-4 py-2 hover:bg-black/5 dark:hover:bg-white/10"
          onClick={() => call('/api/esign/fetch-pdf', { submissionId })}
        >
          Récupérer le PDF signé
        </button>
      )}

      <button
        disabled={busy || !hasCheckout}
        className="rounded-xl bg-green-600 text-white px-4 py-2 disabled:opacity-60"
        onClick={() => call(`/api/admin/submissions/${submissionId}/approve`)}
        title={!hasCheckout ? 'Checkout non effectué' : ''}
      >
        Valider (capturer)
      </button>

      <button
        disabled={busy || !hasCheckout}
        className="rounded-xl bg-red-600 text-white px-4 py-2 disabled:opacity-60"
        onClick={() => call(`/api/admin/submissions/${submissionId}/reject`)}
        title={!hasCheckout ? 'Checkout non effectué' : ''}
      >
        Refuser (annuler)
      </button>

      {msg && <span className="text-sm text-green-700">{msg}</span>}
      {err && <span className="text-sm text-red-600">{err}</span>}
    </div>
  );
}
