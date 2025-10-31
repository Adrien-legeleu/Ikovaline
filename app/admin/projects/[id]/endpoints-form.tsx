'use client';

import { useState } from 'react';

export default function EndpointsForm({
  projectId,
  initialEndpoints,
}: {
  projectId: string;
  initialEndpoints: string[];
}) {
  const [list, setList] = useState<string[]>(initialEndpoints ?? []);
  const [newUrl, setNewUrl] = useState('');
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);
  const [err, setErr] = useState<string | null>(null);

  function add() {
    const url = (newUrl || '').trim();
    if (!url) return;
    setList((x) => Array.from(new Set([...x, url])));
    setNewUrl('');
  }

  function remove(url: string) {
    setList((x) => x.filter((u) => u !== url));
  }

  async function save() {
    setBusy(true);
    setMsg(null);
    setErr(null);
    try {
      const r = await fetch(`/api/admin/projects/${projectId}/endpoints`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ endpoints: list }),
      });
      const j = await r.json().catch(() => ({}));
      if (!r.ok) throw new Error(j?.error || 'Erreur');
      setMsg('Endpoints enregistrés');
    } catch (e: any) {
      setErr(e.message ?? 'Erreur');
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="rounded-2xl border p-4 space-y-4">
      <h2 className="font-medium">Endpoints (lecture client)</h2>

      <div className="flex gap-2">
        <input
          type="url"
          placeholder="https://…"
          className="flex-1 rounded-lg border p-2 bg-transparent"
          value={newUrl}
          onChange={(e) => setNewUrl(e.target.value)}
        />
        <button
          onClick={add}
          className="rounded-lg border px-3 py-2 text-sm hover:bg-black/5 dark:hover:bg-white/10"
        >
          Ajouter
        </button>
      </div>

      <ul className="space-y-2">
        {list.map((u) => (
          <li
            key={u}
            className="flex items-center justify-between rounded-lg bg-black/5 dark:bg-white/10 p-2"
          >
            <a
              className="truncate underline text-sm"
              href={u}
              target="_blank"
              rel="noreferrer"
            >
              {u}
            </a>
            <button
              onClick={() => remove(u)}
              className="text-xs text-red-600 hover:underline"
            >
              Supprimer
            </button>
          </li>
        ))}
        {list.length === 0 && (
          <li className="text-sm text-muted-foreground">
            Aucun endpoint pour le moment.
          </li>
        )}
      </ul>

      <div className="flex items-center gap-3">
        <button
          disabled={busy}
          onClick={save}
          className="rounded-lg bg-foreground text-background px-4 py-2 text-sm"
        >
          Enregistrer
        </button>
        {msg && <span className="text-sm text-green-700">{msg}</span>}
        {err && <span className="text-sm text-red-600">{err}</span>}
      </div>
    </div>
  );
}
