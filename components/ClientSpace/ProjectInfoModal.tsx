// components/ClientProject/ProjectInfoModal.tsx
'use client';

import { X } from 'lucide-react';
import { useEffect } from 'react';

export default function ProjectInfoModal({
  open,
  onClose,
  project,
  payload,
}: {
  open: boolean;
  onClose: () => void;
  project: any; // proj row
  payload?: any; // last approved submission payload
}) {
  useEffect(() => {
    function onEsc(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose();
    }
    if (open) document.addEventListener('keydown', onEsc);
    return () => document.removeEventListener('keydown', onEsc);
  }, [open, onClose]);

  if (!open) return null;

  const extra = project?.extra || {};
  const pQuestions = payload?.questions || {};
  const langs = extra.languages || pQuestions.languages || [];
  const tone = extra.tone || pQuestions.tone || [];
  const urls = project?.urls || pQuestions.urls || [];
  const domain = extra.domain || pQuestions.domain || '';
  const goal = extra.goal || pQuestions.goal || '';
  const deadline = project?.deadline || pQuestions.deadline || null;
  const tier = project?.tier || payload?.pricing?.tier || null;
  const adsBudget =
    project?.options?.adsBudget ?? payload?.pricing?.adsBudget ?? null;
  const motion =
    project?.motion_seconds ?? payload?.pricing?.motionSeconds ?? null;
  const links = pQuestions.links || [];

  return (
    <div className="fixed inset-0 z-[100]">
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="absolute inset-x-4 sm:inset-x-8 md:inset-x-16 lg:inset-x-24 top-12 bottom-12 rounded-3xl border bg-card/80 p-0 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b">
          <h3 className="text-lg font-medium">Détails du projet</h3>
          <button
            onClick={onClose}
            className="rounded-lg border px-2 py-1 text-sm hover:bg-black/5 dark:hover:bg-white/10"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Body */}
        <div className="h-full overflow-y-auto p-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
          <section className="lg:col-span-2 space-y-6">
            <Block title="Description">
              <p className="text-sm leading-relaxed">
                {project?.description || '—'}
              </p>
            </Block>

            <Block title="Cible & objectifs">
              <InfoRow
                k="Audience"
                v={extra?.audience || pQuestions?.audience || '—'}
              />
              <InfoRow k="Objectif" v={goal || '—'} />
              <InfoRow k="Langues" v={langs.length ? langs.join(' · ') : '—'} />
              <InfoRow k="Ton" v={tone.length ? tone.join(' · ') : '—'} />
            </Block>

            <Block title="Références & ressources">
              <InfoRow k="Domaine" v={domain || '—'} />
              {!!urls?.length && (
                <div className="text-sm">
                  <div className="text-xs uppercase text-muted-foreground mb-1">
                    Liens
                  </div>
                  <ul className="space-y-1">
                    {urls.map((u: string, i: number) => (
                      <li key={`${u}-${i}`} className="truncate">
                        <a
                          className="underline underline-offset-4"
                          href={u}
                          target="_blank"
                          rel="noreferrer"
                        >
                          {u}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {!!links?.length && (
                <div className="text-sm mt-3">
                  <div className="text-xs uppercase text-muted-foreground mb-1">
                    Liens (Notion, Miro, Drive…)
                  </div>
                  <ul className="space-y-1">
                    {links.map((u: string, i: number) => (
                      <li key={`${u}-${i}`} className="truncate">
                        <a
                          className="underline underline-offset-4"
                          href={u}
                          target="_blank"
                          rel="noreferrer"
                        >
                          {u}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </Block>
          </section>

          <aside className="space-y-6">
            <Block title="Planning">
              <InfoRow
                k="Début"
                v={
                  project?.start_at
                    ? new Date(project.start_at).toLocaleString()
                    : '—'
                }
              />
              <InfoRow
                k="Deadline"
                v={deadline ? new Date(deadline).toLocaleDateString() : '—'}
              />
              <InfoRow k="Statut" v={project?.status || '—'} />
              <InfoRow k="Progression" v={`${project?.progress ?? 0}%`} />
            </Block>

            <Block title="Offre & budget">
              <InfoRow k="Offre" v={tier || '—'} />
              <InfoRow
                k="Budget Ads"
                v={adsBudget != null ? `${adsBudget} €` : '—'}
              />
              <InfoRow k="Motion" v={motion != null ? `${motion}s` : '—'} />
              {Array.isArray(project?.options?.ids) &&
                project.options.ids.length > 0 && (
                  <InfoRow k="Options" v={project.options.ids.join(' · ')} />
                )}
            </Block>
          </aside>
        </div>
      </div>
    </div>
  );
}

function Block({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl border p-4 bg-card/70">
      <div className="text-xs uppercase tracking-wide text-muted-foreground mb-2">
        {title}
      </div>
      {children}
    </div>
  );
}
function InfoRow({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex items-start gap-3 text-sm">
      <div className="w-28 shrink-0 text-xs uppercase text-muted-foreground">
        {k}
      </div>
      <div className="flex-1">{v}</div>
    </div>
  );
}
