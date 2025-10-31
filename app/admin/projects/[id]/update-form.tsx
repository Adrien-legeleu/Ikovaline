'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { ClipboardCheck, Check, RefreshCcw } from 'lucide-react';

export default function UpdateForm({
  projectId,
  currentProgress,
}: {
  projectId: string;
  currentProgress: number;
}) {
  const [progress, setProgress] = useState<number>(currentProgress ?? 0);
  const [done, setDone] = useState('');
  const [next, setNext] = useState('');
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);
  const [err, setErr] = useState<string | null>(null);

  async function submit() {
    setBusy(true);
    setMsg(null);
    setErr(null);
    try {
      const r = await fetch(`/api/admin/projects/${projectId}/update`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          progress,
          message: {
            done: splitLines(done),
            next: splitLines(next),
          },
        }),
      });
      const j = await r.json().catch(() => ({}));
      if (!r.ok) throw new Error(j?.error || 'Erreur');
      setMsg('✅ Mise à jour enregistrée');
      setTimeout(() => location.reload(), 800);
    } catch (e: any) {
      setErr(e.message ?? 'Erreur');
    } finally {
      setBusy(false);
    }
  }

  return (
    <div
      className={cn(
        'rounded-[2rem] p-6 md:p-8 bg-white/70 dark:bg-[#0e1116]/70 backdrop-blur-xl shadow-[inset_1px_1px_6px_rgba(255,255,255,0.2),inset_-2px_-2px_10px_rgba(0,0,0,0.1)] space-y-6 transition-all'
      )}
    >
      {/* header */}
      <div className="flex items-center gap-2">
        <ClipboardCheck className="h-5 w-5 text-primary" />
        <h2 className="text-xl font-semibold">Nouvelle mise à jour</h2>
      </div>
      <p className="text-sm text-muted-foreground">
        Indique les tâches réalisées et les prochaines étapes du projet.
      </p>

      {/* slider */}
      <div className="space-y-3 pt-2">
        <label className="text-sm flex items-center justify-between">
          <span>Progression</span>
          <span className="font-medium">{progress}%</span>
        </label>
        <div className="px-1">
          <Slider
            defaultValue={[progress]}
            max={100}
            step={1}
            onValueChange={(v) => setProgress(v[0])}
            className="w-full"
          />
        </div>
      </div>

      {/* textareas */}
      <div className="grid sm:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground/80">Fait</label>
          <textarea
            className="w-full rounded-2xl bg-black/[0.04] dark:bg-white/5 border border-black/[0.02] dark:border-white/[0.02] px-3 py-2.5 text-sm outline-none resize-none backdrop-blur-md hover:bg-white/60 dark:hover:bg-white/10 transition-all"
            rows={6}
            placeholder={`Kick-off\nSetup repo\nDesign tokens`}
            value={done}
            onChange={(e) => setDone(e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground/80">
            À venir
          </label>
          <textarea
            className="w-full rounded-2xl bg-black/[0.04] dark:bg-white/5 border border-black/[0.02] dark:border-white/[0.02] px-3 py-2.5 text-sm outline-none resize-none backdrop-blur-md hover:bg-white/60 dark:hover:bg-white/10 transition-all"
            rows={6}
            placeholder={`Intégration Hero\nConnexion Supabase`}
            value={next}
            onChange={(e) => setNext(e.target.value)}
          />
        </div>
      </div>

      {/* actions */}
      <div className="flex flex-wrap gap-3 pt-2">
        <Button
          disabled={busy}
          onClick={submit}
          className={cn(
            'h-11 px-6 rounded-2xl text-white bg-primary hover:opacity-90 transition',
            busy && 'opacity-70 pointer-events-none'
          )}
        >
          <RefreshCcw className="h-4 w-4 mr-1" />
          Enregistrer
        </Button>

        {msg && (
          <div className="text-sm text-emerald-600 flex items-center gap-2">
            <Check className="h-4 w-4" /> {msg}
          </div>
        )}
        {err && <div className="text-sm text-rose-600">{err}</div>}
      </div>
    </div>
  );
}

function splitLines(s: string): string[] {
  return s
    .split('\n')
    .map((x) => x.trim())
    .filter(Boolean);
}
