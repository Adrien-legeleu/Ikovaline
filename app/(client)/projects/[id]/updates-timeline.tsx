'use client';

import { useState } from 'react';
import { IconEye, IconEyeOff } from '@tabler/icons-react';

type Update = {
  id: string;
  progress: number;
  created_at: string;
  message: { done?: string[]; next?: string[] };
};

export default function UpdatesTimeline({ updates }: { updates: Update[] }) {
  const [openIds, setOpenIds] = useState<Record<string, boolean>>({});

  if (!updates || updates.length === 0) {
    return (
      <div className="text-sm text-muted-foreground">
        Aucune mise à jour pour le moment.
      </div>
    );
  }

  const toggle = (id: string) => setOpenIds((m) => ({ ...m, [id]: !m[id] }));
  const isOpen = (id: string) => !!openIds[id];

  return (
    <div className="space-y-4">
      <ol className="relative ps-4">
        <div className="absolute left-0 top-0 bottom-0 w-px bg-foreground/15" />
        {updates.map((u) => {
          const open = isOpen(u.id);
          return (
            <li key={u.id} className="pb-5 group">
              <div className="absolute -left-[7px] mt-1.5 size-[14px] rounded-full bg-primary/80 group-hover:bg-primary transition-colors" />

              <div className="flex items-center justify-between gap-3">
                <div className="font-medium">
                  {u.progress}% — {formatDateShort(u.created_at)}
                </div>
                <button
                  onClick={() => toggle(u.id)}
                  className="inline-flex items-center justify-center h-7 w-7 rounded-lg bg-black/5 hover:bg-black/10 dark:bg-white/10 dark:hover:bg-white/15 transition"
                  title={open ? 'Masquer' : 'Voir'}
                  aria-label={open ? 'Masquer' : 'Voir'}
                >
                  {open ? (
                    <IconEyeOff className="h-4.5 w-4.5" />
                  ) : (
                    <IconEye className="h-4.5 w-4.5" />
                  )}
                </button>
              </div>

              <div
                className={`mt-3 rounded-2xl bg-white/60 dark:bg-neutral-900/50 backdrop-blur-xl shadow-[0_8px_30px_rgba(0,0,0,0.06)] transition-all ${
                  open
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 -translate-y-1 pointer-events-none h-0 overflow-hidden'
                }`}
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
                  <div className="rounded-xl bg-background/70 p-3">
                    <div className="text-[11px] uppercase text-muted-foreground mb-2">
                      Fait
                    </div>
                    <ul className="list-disc list-inside text-sm space-y-1">
                      {(u.message?.done ?? []).map((d, i) => (
                        <li key={`d-${i}`}>{d}</li>
                      ))}
                      {(!u.message?.done || u.message.done.length === 0) && (
                        <li className="text-muted-foreground">—</li>
                      )}
                    </ul>
                  </div>
                  <div className="rounded-xl bg-background/70 p-3">
                    <div className="text-[11px] uppercase text-muted-foreground mb-2">
                      À venir
                    </div>
                    <ul className="list-disc list-inside text-sm space-y-1">
                      {(u.message?.next ?? []).map((n, i) => (
                        <li key={`n-${i}`}>{n}</li>
                      ))}
                      {(!u.message?.next || u.message.next.length === 0) && (
                        <li className="text-muted-foreground">—</li>
                      )}
                    </ul>
                  </div>
                </div>
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}

function formatDateShort(d: string | number | Date) {
  try {
    return new Date(d).toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  } catch {
    return String(d);
  }
}
