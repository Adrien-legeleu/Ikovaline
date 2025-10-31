'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from '@/components/ui/popover';
import { Calendar as CalendarIcon, Clock, Check } from 'lucide-react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

export default function ScheduleForm({
  projectId,
  start_at,
  deadline,
  status,
}: {
  projectId: string;
  start_at: string | null;
  deadline: string | null;
  status: string | null;
}) {
  const [startAt, setStartAt] = useState<Date | null>(
    start_at ? new Date(start_at) : null
  );
  const [dl, setDl] = useState<Date | null>(
    deadline ? new Date(deadline) : null
  );
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);
  const [err, setErr] = useState<string | null>(null);

  async function save(startNow?: boolean) {
    setBusy(true);
    setMsg(null);
    setErr(null);

    try {
      const r = await fetch(`/api/admin/projects/${projectId}/schedule`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          startNow: !!startNow,
          start_at: startNow
            ? undefined // backend saura: in_progress + now()
            : startAt
              ? startAt.toISOString()
              : null,
          deadline: dl ? dl.toISOString().split('T')[0] : null,
        }),
      });

      const j = await r.json().catch(() => ({}));
      if (!r.ok) throw new Error(j?.error || 'Erreur');
      setMsg('Planification enregistrée');
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
        'rounded-[2rem] p-6 md:p-8 bg-white/70 dark:bg-[#0e1116]/70 backdrop-blur-xl',
        'shadow-[inset_1px_1px_6px_rgba(255,255,255,0.2),inset_-2px_-2px_10px_rgba(0,0,0,0.1)]',
        'space-y-6 transition-all'
      )}
    >
      {/* header */}
      <div className="flex items-center gap-2">
        <Clock className="h-5 w-5 text-primary" />
        <h2 className="text-xl font-semibold">Planification du projet</h2>
      </div>
      <p className="text-sm text-muted-foreground">
        Choisis la date de démarrage et la deadline. Tu peux aussi lancer le
        projet tout de suite.
      </p>

      {/* dates */}
      <div className="grid sm:grid-cols-2 gap-6">
        {/* start_at */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground/80">
            Date de démarrage
          </label>

          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="ghost"
                className={cn(
                  'w-full h-11 rounded-2xl bg-white/50 dark:bg-white/5 border shadow-xl',
                  'shadow-black/[0.04] border-black/[0.02] dark:border-white/[0.02]',
                  'backdrop-blur-md text-left justify-start font-normal',
                  'hover:bg-white/60 dark:hover:bg-white/10 transition-all',
                  !startAt && 'text-muted-foreground'
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4 text-primary" />
                {startAt
                  ? format(startAt, 'PPP', { locale: fr })
                  : 'Choisir une date'}
              </Button>
            </PopoverTrigger>

            <PopoverContent
              className="p-3 rounded-2xl bg-white/80 dark:bg-[#101216]/80 backdrop-blur-xl"
              align="start"
            >
              <Calendar
                mode="single"
                required={false}
                selected={startAt ?? undefined}
                onSelect={(date) => setStartAt(date ?? null)}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>

        {/* deadline */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground/80">
            Deadline
          </label>

          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="ghost"
                className={cn(
                  'w-full h-11 rounded-2xl bg-white/50 dark:bg-white/5 border shadow-xl',
                  'shadow-black/[0.04] border-black/[0.02] dark:border-white/[0.02]',
                  'backdrop-blur-md text-left justify-start font-normal',
                  'hover:bg-white/60 dark:hover:bg-white/10 transition-all',
                  !dl && 'text-muted-foreground'
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4 text-primary" />
                {dl ? format(dl, 'PPP', { locale: fr }) : 'Choisir une date'}
              </Button>
            </PopoverTrigger>

            <PopoverContent
              className="p-3 rounded-2xl bg-white/80 dark:bg-[#101216]/80 backdrop-blur-xl"
              align="start"
            >
              <Calendar
                mode="single"
                required={false}
                selected={dl ?? undefined}
                onSelect={(date) => setDl(date ?? null)}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>
      </div>

      {/* actions */}
      <div className="flex flex-wrap items-start gap-3 pt-2">
        {/* Enregistrer = planifier / scheduled */}
        <Button
          disabled={busy}
          onClick={() => save(false)}
          className="h-11 rounded-2xl text-white bg-primary hover:opacity-90 transition px-5"
        >
          Enregistrer
        </Button>

        {/* Démarrer = in_progress maintenant */}
        <Button
          disabled={busy}
          onClick={() => save(true)}
          className="h-11 rounded-2xl text-black bg-black/[0.04] dark:text-white dark:bg-white/5 border border-black/[0.05] dark:border-white/[0.1] shadow-none hover:bg-black/[0.07] dark:hover:bg-white/10 transition px-5"
        >
          Démarrer maintenant
        </Button>
      </div>

      {/* statut actuel */}
      <div className="text-sm text-muted-foreground">
        Statut actuel :{' '}
        <span className="font-medium capitalize text-foreground">
          {status ?? '—'}
        </span>
      </div>

      {msg && (
        <div className="text-sm text-emerald-600 flex items-center gap-2">
          <Check className="h-4 w-4" /> {msg}
        </div>
      )}

      {err && <div className="text-sm text-rose-600">{err}</div>}
    </div>
  );
}
