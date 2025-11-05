'use client';

import {
  CATALOG,
  type CategoryId,
  type TierId,
} from '@/lib/catalog/onboarding';

import { useState, useMemo, useEffect } from 'react';
import { motion, cubicBezier } from 'framer-motion';
import {
  CalendarDays,
  Mail,
  Link as LinkIcon,
  CheckCircle2,
  ListTodo,
  Clock,
  Gauge,
  CreditCard,
  TrendingUp,
  CalendarClock,
  FileText,
  Zap,
  Pencil,
  ShieldAlert,
  AlertTriangle,
  ShieldCheck,
} from 'lucide-react';
import ProgressGauge from '@/components/ClientSpace/Dashboard/ProgressGauge';
import { supabase } from '@/lib/SupabaseClient';

const ease = cubicBezier(0.16, 1, 0.3, 1);

/* ========================= Types ========================= */

type Update = {
  id: string;
  progress: number | null;
  headline: string | null;
  done: string[];
  next: string[];
  blockers: string[];
  created_at: string;
};

type ClientProjectPageProps = {
  proj: any;
  displayTitle: string;
  updates: Update[];
  signedContractPath: string | null; // <- path dans le bucket signed-pdfs
};

type TeamItem = {
  id: string;
  user_id: string;
  email: string | null;
  name: string | null;
  role: string; // global: 'admin' | 'dev' | 'user'
  staff_role?: string; // pour /members (staff ikovaline)
};

type Collab = {
  id: string;
  user_id: string | null;
  email: string | null;
  name: string | null;
  role: string | null;
  project_role: 'owner' | 'collaborator';
  invited: boolean;
  created_at: string;
};

/* ========================= Hooks ========================= */

/** Génère des URLs signées pour un bucket privé (ex: `signed-pdfs`, `uploads`). */
function useSignedUrls(
  bucket: string,
  paths: string[],
  expiresSeconds = 60 * 60 * 24 * 7
) {
  const [map, setMap] = useState<Record<string, string>>({});

  useEffect(() => {
    let cancelled = false;
    if (!paths.length) {
      setMap({});
      return;
    }

    (async () => {
      const entries: [string, string][] = [];
      for (const p of paths) {
        const { data, error } = await supabase.storage
          .from(bucket)
          .createSignedUrl(p, expiresSeconds);
        if (error) {
          console.warn('Signed URL error for', p, error.message);
          entries.push([p, '']);
        } else {
          entries.push([p, data?.signedUrl || '']);
        }
      }
      if (!cancelled) setMap(Object.fromEntries(entries));
    })();

    return () => {
      cancelled = true;
    };
  }, [bucket, JSON.stringify(paths), expiresSeconds]);

  return map;
}

/* ========================= Helpers ========================= */

function resolveOptionLabels(
  categoryId: string | undefined,
  tierId: string | undefined,
  selected: string[] | undefined
): string[] {
  if (!categoryId || !selected?.length) return [];
  const cat = CATALOG[categoryId as CategoryId];
  if (!cat) return selected;

  const map = new Map(cat.options.map((o) => [o.id, o.label]));
  return selected.map((k) => map.get(k) ?? k);
}

/* ========================= Page ========================= */

export default function ClientProjectPage({
  proj,
  displayTitle,
  updates,
  signedContractPath,
}: ClientProjectPageProps) {
  const progress = clamp(proj.progress ?? 0, 0, 100);

  const last = useMemo<Update | null>(
    () => (updates && updates.length > 0 ? (updates[0] as Update) : null),
    [updates]
  );

  // Contrats / briefs : PATHS dans les buckets
  const contractPaths = Array.isArray(proj.signed_contract_files)
    ? proj.signed_contract_files
    : [];
  const briefPaths = Array.isArray(proj.brief_files) ? proj.brief_files : [];

  const signedMap = useSignedUrls('signed-pdfs', contractPaths);
  const briefsMap = useSignedUrls('uploads', briefPaths);

  const signedPdfUrl =
    signedContractPath && signedMap[signedContractPath]
      ? signedMap[signedContractPath]
      : null;

  const briefUrls = briefPaths.map((p: string) => ({
    path: p,
    url: briefsMap[p] || '',
  }));

  return (
    <section className="space-y-8">
      {/* ===== HERO ===== */}
      <motion.section
        initial={{ opacity: 0, y: 12, filter: 'blur(6px)' }}
        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        transition={{ duration: 0.45, ease }}
        className={CARD_HERO}
      >
        <div className="grid gap-10 lg:grid-cols-[1.5fr_.5fr] items-start">
          {/* LEFT */}
          <div className="min-w-0 space-y-6">
            <EditableTitleClient
              initialTitle={displayTitle}
              projectId={proj.id}
            />

            {proj.description ? (
              <p className="text-sm text-muted-foreground bg-sky-50 border-sky-100 p-4 rounded-3xl text-sky-800 leading-relaxed max-w-2xl">
                {proj.description}
              </p>
            ) : null}

            {/* Chips */}
            <div className="flex flex-wrap items-center gap-2.5 text-[11px] font-medium">
              <StatusChip status={proj.status} />
              <PriorityChip level={proj.priority} />
              <RiskChip level={proj.risk_level} />

              {proj.deadline && (
                <MetaChip>
                  <CalendarDays className="h-3.5 w-3.5 shrink-0" />
                  <span className="truncate">
                    Deadline&nbsp;: {formatDateShort(proj.deadline)}
                  </span>
                </MetaChip>
              )}

              {proj.start_at && (
                <MetaChip>
                  <CalendarClock className="h-3.5 w-3.5 shrink-0" />
                  <span className="truncate">
                    Début&nbsp;: {formatDateShort(proj.start_at)}
                  </span>
                </MetaChip>
              )}
            </div>

            {/* Last update */}
            {last && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="rounded-3xl bg-emerald-50  ring-1 ring-emerald-50 p-5 shadow-[0_16px_30px_rgba(0,0,0,0.07)]">
                  <div className="text-[11px] uppercase mb-1 flex text-emerald-800 items-center gap-1.5">
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />
                    Fait dernièrement
                  </div>
                  <div className="text-sm text-emerald-900leading-relaxed">
                    {Array.isArray(last.done) && last.done.length
                      ? last.done[0]
                      : '—'}
                  </div>
                </div>

                <div className="rounded-3xl bg-sky-50  ring-1 ring-sky-50 p-5 shadow-[0_16px_30px_rgba(0,0,0,0.07)]">
                  <div className="text-[11px] uppercase mb-1 text-sky-800 flex items-center gap-1.5">
                    <ListTodo className="h-3.5 w-3.5 text-primary" />
                    Prochaine étape
                  </div>
                  <div className="text-sm text-sky-900 leading-relaxed">
                    {Array.isArray(last.next) && last.next.length
                      ? last.next[0]
                      : '—'}
                  </div>
                </div>

                <div className="sm:col-span-2 text-[11px] text-muted-foreground flex flex-wrap items-center gap-2">
                  <Clock className="h-3.5 w-3.5" />
                  <span>
                    {formatDateShort(last.created_at)} — {last.progress ?? 0}%
                    atteint
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* RIGHT / GAUGE */}
          <div className="flex justify-center lg:justify-end">
            <div className="relative flex flex-col items-center text-center">
              <div
                className="absolute inset-0 flex items-center justify-center pointer-events-none"
                aria-hidden
              >
                <div className="h-40 w-40 rounded-full bg-primary/10 blur-2xl" />
              </div>
              <ProgressGauge value={progress} />
              <div className="mt-4 text-xs text-muted-foreground font-medium">
                Avancement global
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* ===== CONTENT (BENTO GRID ≥ md) ===== */}
      <div className="grid gap-6 md:grid-cols-12">
        {/* Bloc gauche large */}
        <div className="md:col-span-7 md:row-span-5 space-y-6">
          <SectionCard
            icon={<Zap className="h-4 w-4 text-primary" />}
            sectionLabel="Suivi du projet"
            title="Étapes & avancement"
            description="Historique des jalons, ce qui est fait, ce qui arrive."
          >
            <UpdatesTimeline updates={updates ?? []} />
          </SectionCard>

          <SectionCard
            icon={<LinkIcon className="h-4 w-4 text-primary" />}
            sectionLabel="Ressources"
            title="Dépôt & Liens"
            description="Tout ce qui vous permet de suivre / tester."
          >
            <ProjectLinks repo_url={proj.repo_url} urls={proj.urls} />
          </SectionCard>
        </div>

        {/* Colonne droite compacte */}
        <div className="md:col-span-5 space-y-6">
          <SectionCard
            icon={<Gauge className="h-4 w-4 text-primary" />}
            sectionLabel="Infos clés"
            title="État du projet"
          >
            <ProjectFacts proj={proj} progress={progress} />
          </SectionCard>

          <SectionCard
            icon={<CreditCard className="h-4 w-4 text-primary" />}
            sectionLabel="Facturation"
            title="Paiement"
            description="Résumé du statut de paiement pour ce projet."
          >
            <BillingFacts proj={proj} />
          </SectionCard>

          <SectionCard
            icon={<FileText className="h-4 w-4 text-primary" />}
            sectionLabel="Documents"
            title="Contrat & Offre"
            description="Contrat signé, briefs, périmètre vendu."
          >
            <OfferBlock
              proj={proj}
              signedPdfUrl={signedPdfUrl}
              briefUrls={briefUrls}
            />
          </SectionCard>
        </div>

        {/* Équipe & Accès en pleine largeur */}
        <div className="md:col-span-12 pt-20">
          <TeamAndAccess
            projectId={proj.id}
            canManageStaff={proj?.viewer_is_admin === true}
          />
        </div>
      </div>
    </section>
  );
}

/* ========================= Équipe & Accès ========================= */

function TeamAndAccess({
  projectId,
  canManageStaff = false,
}: {
  projectId: string;
  canManageStaff?: boolean;
}) {
  return (
    <div className="grid gap-6 md:grid-cols-12">
      <div className="md:col-span-4">
        <AdminsCard projectId={projectId} />
      </div>
      <div className="md:col-span-4">
        <StaffCard projectId={projectId} canManageStaff={canManageStaff} />
      </div>
      <div className="md:col-span-4">
        <CollaboratorsCard projectId={projectId} />
      </div>
    </div>
  );
}

/* ---- Admins (depuis /members : fusion d’admins globaux) ---- */

function AdminsCard({ projectId }: { projectId: string }) {
  const [items, setItems] = useState<TeamItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      setLoading(true);
      setErr(null);
      try {
        const r = await fetch(`/api/projects/${projectId}/members`, {
          cache: 'no-store',
        });
        const j = await r.json();
        const admins = (j.items as TeamItem[]).filter(
          (m) => m.role === 'admin'
        );
        setItems(admins);
      } catch (e: any) {
        setErr(e?.message || 'Erreur');
      } finally {
        setLoading(false);
      }
    })();
  }, [projectId]);

  return (
    <SectionCard
      icon={<ShieldCheck className="h-4 w-4 text-primary" />}
      sectionLabel="Accès"
      title="Administrateurs Ikovaline"
      description="Les admins sont toujours visibles et non retirables."
    >
      {loading ? (
        <div className="text-sm opacity-70">Chargement…</div>
      ) : err ? (
        <div className="text-sm text-rose-600">{err}</div>
      ) : items.length === 0 ? (
        <div className="text-sm opacity-70">Aucun admin.</div>
      ) : (
        <ul className="space-y-2">
          {items.map((m) => (
            <li
              key={m.id}
              className="flex items-center justify-between rounded-[1rem] bg-black/5 dark:bg-white/10 px-4 py-3"
            >
              <div className="min-w-0">
                <div className="text-sm font-medium break-words">
                  {m.name || m.email}
                </div>
                <div className="text-xs opacity-70">admin</div>
              </div>
              <span className="text-xs text-muted-foreground italic">
                Non modifiable
              </span>
            </li>
          ))}
        </ul>
      )}
    </SectionCard>
  );
}

/* ---- Staff Ikovaline (assignments) ---- */

function StaffCard({
  projectId,
  canManageStaff = false,
}: {
  projectId: string;
  canManageStaff?: boolean;
}) {
  const [items, setItems] = useState<TeamItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState<string | null>(null);

  async function load() {
    setLoading(true);
    setErr(null);
    try {
      const r = await fetch(`/api/projects/${projectId}/members`, {
        cache: 'no-store',
      });
      const j = await r.json();
      const staff = (j.items as TeamItem[]).filter(
        (m) => m.staff_role && m.role !== 'admin'
      );
      setItems(staff);
    } catch (e: any) {
      setErr(e?.message || 'Erreur');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, [projectId]);

  async function remove(user_id: string) {
    if (!confirm('Retirer ce membre de l’équipe Ikovaline ?')) return;
    const r = await fetch(
      `/api/projects/${projectId}/members?user_id=${encodeURIComponent(user_id)}`,
      { method: 'DELETE' }
    );
    const j = await r.json();
    if (!r.ok) return alert(j?.error || 'Suppression impossible');
    load();
  }

  return (
    <SectionCard
      icon={<Gauge className="h-4 w-4  text-primary" />}
      sectionLabel="Équipe"
      title="Équipe Ikovaline"
      description="Les personnes assignées au delivery."
    >
      {loading ? (
        <div className="text-sm opacity-70">Chargement…</div>
      ) : err ? (
        <div className="text-sm text-rose-600">{err}</div>
      ) : items.length === 0 ? (
        <div className="text-sm opacity-70">Aucun membre pour l’instant.</div>
      ) : (
        <ul className="space-y-2 ">
          {items.map((m) => (
            <li
              key={m.id}
              className="flex items-center justify-between rounded-[1rem] bg-black/5 dark:bg:white/10 px-4 py-3"
            >
              <div className="min-w-0">
                <div className="text-sm font-medium break-words">
                  {m.name || m.email}
                </div>
                <div className="text-xs opacity-70">{m.staff_role}</div>
              </div>
              {canManageStaff ? (
                <button
                  onClick={() => remove(m.user_id)}
                  className="inline-flex h-8 items-center rounded-[0.7rem] bg-rose-600 text-white px-3 text-[12px] font-medium hover:opacity-90 transition"
                >
                  Retirer
                </button>
              ) : (
                <span className="text-xs text-muted-foreground italic select-none">
                  Non modifiable
                </span>
              )}
            </li>
          ))}
        </ul>
      )}
    </SectionCard>
  );
}

/* ---- Collaborateurs côté client ---- */

function CollaboratorsCard({ projectId }: { projectId: string }) {
  const [items, setItems] = useState<Collab[]>([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState<string | null>(null);
  const [email, setEmail] = useState('');
  const [submitting, setSubmitting] = useState(false);

  async function load() {
    setLoading(true);
    setErr(null);
    try {
      const r = await fetch(`/api/projects/${projectId}/collaborators`, {
        cache: 'no-store',
      });
      const j = await r.json();
      setItems(Array.isArray(j.items) ? j.items : []);
    } catch (e: any) {
      setErr(e?.message || 'Erreur');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, [projectId]);

  async function invite(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setErr(null);
    try {
      const r = await fetch(`/api/projects/${projectId}/collaborators`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const j = await r.json();
      if (!r.ok) throw new Error(j?.error || 'Invitation impossible');
      setEmail('');
      await load();
    } catch (e: any) {
      setErr(e?.message || 'Erreur');
    } finally {
      setSubmitting(false);
    }
  }

  async function remove(member_id: string) {
    if (!confirm('Retirer ce collaborateur ?')) return;
    const r = await fetch(
      `/api/projects/${projectId}/collaborators?member_id=${encodeURIComponent(member_id)}`,
      { method: 'DELETE' }
    );
    const j = await r.json();
    if (!r.ok) return alert(j?.error || 'Suppression impossible');
    load();
  }

  return (
    <SectionCard
      icon={<Users2Icon />}
      sectionLabel="Accès"
      title="Collaborateurs (côté client)"
      description="Invitez d’autres personnes de votre équipe à suivre le projet."
    >
      {loading ? (
        <div className="text-sm opacity-70">Chargement…</div>
      ) : err ? (
        <div className="text-sm text-rose-600">{err}</div>
      ) : items.length === 0 ? (
        <div className="text-sm opacity-70">Aucun collaborateur.</div>
      ) : (
        <ul className="space-y-2 mb-3">
          {items.map((m) => (
            <li
              key={m.id}
              className="flex items-center justify-between rounded-[1rem] bg-black/5 dark:bg:white/10 px-4 py-3"
            >
              <div className="min-w-0">
                <div className="text-sm font-medium break-words">
                  {m.name || m.email}
                </div>
                <div className="text-xs opacity-70">
                  {m.project_role}
                  {m.invited && ' • invitation envoyée'}
                </div>
              </div>
              <button
                onClick={() => remove(m.id)}
                className="inline-flex h-8 items-center rounded-[0.7rem] bg-rose-600 text-white px-3 text-[12px] font-medium hover:opacity-90 transition"
              >
                Retirer
              </button>
            </li>
          ))}
        </ul>
      )}

      <form
        onSubmit={invite}
        className="grid sm:grid-cols-[1fr_auto] gap-3 items-center"
      >
        <input
          type="email"
          className="h-10 rounded-[0.9rem] px-3 bg-black/5 dark:bg:white/10 outline-none"
          placeholder="email@entreprise.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button
          disabled={submitting}
          className={`h-10 rounded-[0.9rem] px-4 bg-primary text-white text-sm font-medium transition ${
            submitting ? 'opacity-70 pointer-events-none' : ''
          }`}
        >
          Inviter
        </button>
      </form>
    </SectionCard>
  );
}

function Users2Icon() {
  return (
    <span className="inline-flex h-4 w-4 items-center justify-center text-primary">
      <svg viewBox="0 0 24 24" fill="none" className="h-4 w-4">
        <path
          d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"
          stroke="currentColor"
          strokeWidth="1.5"
        />
        <circle cx="9" cy="7" r="3" stroke="currentColor" strokeWidth="1.5" />
        <path
          d="M22 21v-2a4 4 0 0 0-3-3.87"
          stroke="currentColor"
          strokeWidth="1.5"
        />
        <path
          d="M16 3.13a3 3 0 0 1 0 5.75"
          stroke="currentColor"
          strokeWidth="1.5"
        />
      </svg>
    </span>
  );
}

/* ========================= Sous-composants contenu ========================= */

function ProjectLinks({
  repo_url,
  urls,
}: {
  repo_url?: string | null;
  urls?: string[];
}) {
  return (
    <div className="text-sm space-y-6">
      <Row
        label="Dépôt code"
        value={
          repo_url ? (
            <a
              href={repo_url}
              target="_blank"
              rel="noreferrer"
              className="underline underline-offset-4 break-all"
            >
              {repo_url}
            </a>
          ) : (
            '—'
          )
        }
      />

      <div className="space-y-2">
        <div className="text-[11px] uppercase text-muted-foreground flex items-center gap-1.5 font-medium">
          <LinkIcon className="h-3.5 w-3.5" />
          Liens externes
        </div>

        {Array.isArray(urls) && urls.length ? (
          <ul className="flex flex-wrap gap-2">
            {urls.map((u, i) => (
              <li key={`${u}-${i}`}>
                <a
                  href={u}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-full bg-black/[0.04] dark:bg:white/[0.07] ring-1 ring-black/10 dark:ring:white/10 hover:bg-black/[0.07] dark:hover:bg:white/[0.12] px-3 py-1.5 text-[12px] font-medium transition max-w-[220px]"
                  title={u}
                >
                  <LinkIcon className="h-3.5 w-3.5 opacity-70 shrink-0" />
                  <span className="truncate">{u}</span>
                </a>
              </li>
            ))}
          </ul>
        ) : (
          <div className="text-xs text-muted-foreground">
            Aucun lien fourni.
          </div>
        )}
      </div>
    </div>
  );
}

function ProjectFacts({ proj, progress }: { proj: any; progress: number }) {
  return (
    <div className="space-y-4 text-sm">
      <Row label="Statut" value={<StatusChip status={proj.status} />} />
      <Row label="Progression" value={`${progress}%`} />
      <Row label="Priorité" value={<PriorityChip level={proj.priority} />} />
      <Row label="Risque" value={<RiskChip level={proj.risk_level} />} />
      <Row
        label="Client"
        value={
          proj.client_email ? (
            <span className="inline-flex items-center gap-2 break-all">
              <Mail className="h-4 w-4 opacity-70 shrink-0" />
              {proj.client_email}
            </span>
          ) : (
            '—'
          )
        }
      />
      <Row
        label="Début"
        value={proj.start_at ? formatDateShort(proj.start_at) : '—'}
      />
      <Row
        label="Deadline"
        value={proj.deadline ? formatDateShort(proj.deadline) : '—'}
      />
    </div>
  );
}

function BillingFacts({ proj }: { proj: any }) {
  return (
    <div className="space-y-4 text-sm">
      <Row
        label="Statut paiement"
        value={<BillingChip status={proj.billing_status} />}
      />
      <Row label="Total prévu" value={formatEuro(proj.payment_total)} />
      <Row label="Déjà encaissé" value={formatEuro(proj.payment_captured)} />
      <Row
        label="Échéances"
        value={
          proj.payment_installments ? `${proj.payment_installments}x` : '—'
        }
      />
    </div>
  );
}

function OfferBlock({
  proj,
  signedPdfUrl,
  briefUrls,
}: {
  proj: any;
  signedPdfUrl: string | null;
  briefUrls: { path: string; url: string }[];
}) {
  const optionLabels = resolveOptionLabels(
    proj?.offer_category,
    proj?.offer_tier,
    Array.isArray(proj.selected_options) ? proj.selected_options : []
  );

  return (
    <div className="space-y-5 text-sm">
      <Row
        label="Contrat signé"
        value={
          signedPdfUrl ? (
            <a
              href={signedPdfUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-primary text-white px-3 py-1.5 text-xs font-medium hover:opacity-90 active:scale-[.99] transition shadow-[0_14px_30px_rgba(59,130,246,0.4)] dark:shadow-[0_14px_30px_rgba(59,130,246,0.3)]"
            >
              <FileText className="h-4 w-4" />
              Ouvrir PDF
            </a>
          ) : (
            <span className="inline-flex items-center gap-2 rounded-full bg-black/[0.04] dark:bg:white/[0.07] ring-1 ring-black/10 dark:ring:white/10 px-3 py-1.5 text-xs text-muted-foreground">
              <FileText className="h-4 w-4 opacity-70" /> —
            </span>
          )
        }
      />

      {/* Briefs */}
      <div className="space-y-2">
        <div className="text-[11px] uppercase text-muted-foreground flex items-center gap-1.5 font-medium">
          <FileText className="h-3.5 w-3.5" />
          Briefs (PDF / images)
        </div>
        {briefUrls.length ? (
          <ul className="space-y-1">
            {briefUrls.map((b) => (
              <li key={b.path}>
                <a
                  href={b.url || '#'}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 text-xs underline underline-offset-4 break-all"
                >
                  <FileText className="h-2.5 w-2.5 opacity-70" />
                  voir le fichier
                </a>
              </li>
            ))}
          </ul>
        ) : (
          <div className="text-xs text-muted-foreground">
            Aucun brief enregistré.
          </div>
        )}
      </div>

      <div className="space-y-2">
        <div className="text-[11px] uppercase text-muted-foreground flex items-center gap-1.5 font-medium">
          <TrendingUp className="h-3.5 w-3.5" />
          Offre vendue
        </div>

        <div className="rounded-3xl bg-black/[0.04] dark:bg:white/[0.07] ring-1 ring-black/5 dark:ring:white/10 p-5 text-xs leading-relaxed">
          <div className="font-medium text-foreground text-[13px]">
            {proj.offer_category} · {proj.offer_tier}
          </div>

          <div className="text-muted-foreground mt-2 flex flex-wrap gap-3">
            {optionLabels.length ? (
              optionLabels.map((label, i) => (
                <span
                  key={label + i}
                  className="inline-flex items-center rounded-3xl bg-primary/10 text-primary ring-1 ring-primary/15 px-3 py-2 text-[11px] font-medium"
                >
                  {label}
                </span>
              ))
            ) : (
              <span className="opacity-60">Aucune option</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ========================= Editable Title ========================= */

function EditableTitleClient({
  initialTitle,
  projectId,
}: {
  initialTitle: string;
  projectId: string;
}) {
  const [title, setTitle] = useState(initialTitle);
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);

  async function save() {
    if (!title.trim()) return;
    setSaving(true);
    try {
      // await updateProjectTitleAction({ projectId, title });
    } catch (e) {
      console.error('update title failed', e);
    } finally {
      setSaving(false);
      setEditing(false);
    }
  }

  return (
    <div className="group flex flex-col gap-2">
      {editing ? (
        <div className="flex flex-col lg:flex-row lg:items-center gap-3">
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full rounded-[1rem] bg-black/[0.03] dark:bg:white/[0.07] ring-1 ring-black/10 dark:ring:white/10 px-3 py-2 text-xl lg:text-2xl font-semibold tracking-tight leading-tight outline-none focus:ring-2 focus:ring-primary/40 dark:focus:ring-primary/40"
          />
          <div className="flex items-center gap-2 text-sm">
            <button
              onClick={save}
              disabled={saving || !title.trim()}
              className="inline-flex items-center rounded-[0.75rem] bg-primary text-white px-3 py-2 font-medium text-xs hover:opacity-90 active:scale-[.99] transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {saving ? 'Enregistrement…' : 'Enregistrer'}
            </button>
            <button
              onClick={() => {
                setTitle(initialTitle);
                setEditing(false);
              }}
              className="inline-flex items-center rounded-[0.75rem] bg-black/[0.05] dark:bg:white/[0.08] ring-1 ring-black/10 dark:ring:white/10 px-3 py-2 text-xs font-medium hover:bg-black/[0.07] dark:hover:bg:white/[0.12] transition"
            >
              Annuler
            </button>
          </div>
        </div>
      ) : (
        <div className="flex flex-wrap items-start gap-2">
          <h1 className="text-2xl lg:text-3xl font-semibold leading-tight tracking-tight break-words">
            {title}
          </h1>
          <button
            onClick={() => setEditing(true)}
            className="opacity-0 group-hover:opacity-100 transition-opacity inline-flex items-center gap-1 rounded-[0.75rem] bg-black/[0.05] dark:bg:white/[0.08] ring-1 ring-black/10 dark:ring:white/10 px-2 py-1 text-[10px] font-medium hover:bg-black/[0.07] dark:hover:bg:white/[0.12]"
            title="Renommer le projet"
            aria-label="Renommer le projet"
          >
            <Pencil className="h-3.5 w-3.5 opacity-70" />
            <span>Éditer</span>
          </button>
        </div>
      )}

      <div className="text-[11px] text-muted-foreground font-medium">
        ID projet&nbsp;:
        <span className="font-mono text-[11px]"> {projectId}</span>
      </div>
    </div>
  );
}

/* ========================= Timeline ========================= */

function UpdatesTimeline({ updates }: { updates: Update[] }) {
  if (!updates || updates.length === 0) {
    return (
      <div className="text-sm min-h-96 flex items-center justify-center text-muted-foreground py-8">
        Aucune mise à jour pour l’instant.
      </div>
    );
  }

  return (
    <ol className="relative pl-4 space-y-6 py-5">
      {updates.map((u) => {
        const doneList = Array.isArray(u.done) ? u.done : [];
        const nextList = Array.isArray(u.next) ? u.next : [];

        return (
          <li key={u.id} className="relative space-y-3">
            <div className="absolute left-[-18px] top-[4px] h-3 w-3 rounded-full bg-primary shadow-[0_0_20px_rgba(59,130,246,0.6)] ring-2 ring-white dark:ring-[#0e1116]" />
            <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1">
              <div className="text-sm pl-1 font-medium">
                Progression <strong>{u.progress ?? 0}%</strong>
              </div>
              <div className="text-[11px] text-muted-foreground">
                {formatDateShort(u.created_at)}
              </div>
            </div>

            {doneList.length ? (
              <div className="text-[13px] p-5 rounded-3xl bg-emerald-50 border border-emerald-50 leading-relaxed">
                <div className="inline-flex items-center gap-1 text-emerald-600 dark:text-emerald-400 text-[11px] font-medium uppercase">
                  <CheckCircle2 className="h-3.5 w-3.5" />
                  Fait
                </div>
                <ul className="mt-1 space-y-0.5">
                  {doneList.map((d, i) => (
                    <li key={`done-${i}`} className="text-[13px]">
                      {d}
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}

            {nextList.length ? (
              <div className="text-[13px] p-5 rounded-3xl bg-sky-50 border border-sky-50 leading-relaxed">
                <div className="inline-flex items-center gap-1 text-primary text-[11px] font-medium uppercase">
                  <ListTodo className="h-3.5 w-3.5" />À venir
                </div>
                <ul className=" mt-1 space-y-0.5">
                  {nextList.map((n, i) => (
                    <li key={`next-${i}`} className="text-[13px]">
                      {n}
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}

            <div className="h-px w-full bg-black/5 dark:bg:white/10" />
          </li>
        );
      })}
    </ol>
  );
}

/* ========================= UI helpers ========================= */

const CARD_HERO = [
  'rounded-[2rem]',
  'p-8 lg:p-10',
  'bg-white dark:bg-[#0e1116]',
  'ring-1 ring-black/5 dark:ring-white/10',
  'shadow-[0_30px_80px_rgba(0,0,0,0.08)]',
].join(' ');

const CARD_SUB = [
  'rounded-[2rem]',
  'p-6 md:p-7',
  'bg-white dark:bg-[#0e1116]',
  'ring-1 ring-black/5 dark:ring-white/10',
  'shadow-[0_24px_60px_rgba(0,0,0,0.08)]',
].join(' ');

function SectionCard({
  icon,
  sectionLabel,
  title,
  description,
  children,
}: {
  icon: React.ReactNode;
  sectionLabel: string;
  title: string;
  description?: string;
  children: React.ReactNode;
}) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 12, filter: 'blur(6px)' }}
      animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      transition={{ duration: 0.45, ease }}
      className={CARD_SUB}
    >
      <header className="mb-5  space-y-2">
        <div className="flex flex-wrap items-center gap-2">
          <span className="inline-flex h-8 w-8 items-center justify-center rounded-xl bg-primary/10 text-primary ring-1 ring-primary/20 dark:ring-primary/30">
            {icon}
          </span>
          <span className="text-[10px] tracking-[0.18em] uppercase text-muted-foreground font-medium">
            {sectionLabel}
          </span>
        </div>

        <div className="flex flex-col">
          <h2 className="text-base font-semibold leading-tight">{title}</h2>
          {description ? (
            <p className="text-xs text-muted-foreground max-w-prose">
              {description}
            </p>
          ) : null}
        </div>
      </header>

      <div>{children}</div>
    </motion.section>
  );
}

function Row({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="flex items-center gap-4">
      <div className="text-[11px] uppercase text-muted-foreground w-28 shrink-0 leading-relaxed">
        {label}
      </div>
      <div className="text-sm break-words leading-relaxed">{value ?? '—'}</div>
    </div>
  );
}

function MetaChip({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full px-3 py-2.5  bg-black/[0.04] dark:bg:white/[0.07] ring-1 ring-black/10 dark:ring:white/10 text-[11px] leading-none">
      {children}
    </span>
  );
}

/* ========================= Chips ========================= */

function StatusChip({ status }: { status?: string }) {
  const s = (status ?? 'in_progress').toLowerCase();
  const map: Record<string, { text: string; cls: string }> = {
    draft: {
      text: 'Brouillon',
      cls: 'bg-gray-50 text-gray-700 dark:text-gray-300 ring-1 ring-gray-100',
    },
    scheduled: {
      text: 'Planifié',
      cls: 'bg-amber-50 text-amber-700 dark:text-amber-300 ring-1 ring-amber-100',
    },
    in_progress: {
      text: 'En cours',
      cls: 'bg-blue-50 text-blue-700 dark:text-blue-300 ring-1 ring-blue-100',
    },
    paused: {
      text: 'En pause',
      cls: 'bg-amber-50 text-amber-700 dark:text-amber-300 ring-1 ring-amber-100',
    },
    completed: {
      text: 'Terminé',
      cls: 'bg-emerald-50 text-emerald-700 dark:text-emerald-300 ring-1 ring-emerald-100',
    },
    cancelled: {
      text: 'Annulé',
      cls: 'bg-rose-50 text-rose-700 dark:text-rose-300 ring-1 ring-rose-100',
    },
  };
  const { text, cls } = map[s] ?? map['draft'];
  return (
    <span
      className={`inline-flex items-center rounded-full px-4 py-2.5 text-[11px] font-medium leading-none ${cls}`}
    >
      {text}
    </span>
  );
}

function PriorityChip({ level }: { level?: string }) {
  const l = (level ?? 'normal').toLowerCase();
  if (l === 'critical')
    return (
      <span className="inline-flex items-center rounded-full bg-rose-50 text-rose-600 dark:text-rose-400 ring-1 ring-rose-100 px-3 py-2.5  text-[11px] font-medium leading-none">
        Critique
      </span>
    );
  if (l === 'high')
    return (
      <span className="inline-flex items-center rounded-full bg-amber-50 text-amber-700 dark:text-amber-400 ring-1 ring-amber-100 px-3 py-2.5  text-[11px] font-medium leading-none">
        Haute
      </span>
    );
  if (l === 'normal')
    return (
      <span className="inline-flex items-center rounded-full bg-primary/10 text-primary ring-1 ring-primary/20 px-3 py-2.5 text-[11px] font-medium leading-none">
        Normale
      </span>
    );
  return (
    <span className="inline-flex items-center rounded-full bg-black/[0.04] dark:bg:white/[0.07] ring-1 ring-black/8 dark:ring:white/10 px-3 py-2.5 text-[11px] font-medium leading-none">
      {level || '—'}
    </span>
  );
}

function RiskChip({ level }: { level?: string }) {
  const l = (level ?? 'normal').toLowerCase();
  if (l === 'urgent')
    return (
      <span className="inline-flex items-center rounded-full bg-rose-50 text-rose-700 dark:text-rose-400 ring-1 ring-rose-100 px-3 py-2.5  text-[11px] font-medium leading-none">
        <ShieldAlert className="h-3.5 w-3.5 mr-1 opacity-70" />
        Urgent
      </span>
    );
  if (l === 'attention')
    return (
      <span className="inline-flex items-center rounded-full bg-amber-50 text-amber-700 dark:text-amber-400 ring-1 ring-amber-100 px-3 py-2.5 text-[11px] font-medium leading-none">
        <AlertTriangle className="h-3.5 w-3.5 mr-1 opacity-70" />À surveiller
      </span>
    );
  return (
    <span className="inline-flex items-center rounded-full bg-emerald-50 text-emerald-600 dark:text-emerald-400 ring-1 ring-emerald-100 px-3 py-2.5 text-[11px] font-medium leading-none">
      <ShieldCheck className="h-3.5 w-3.5 mr-1 opacity-70" />
      OK
    </span>
  );
}

function BillingChip({ status }: { status?: string }) {
  const s = (status ?? '').toLowerCase();
  if (s === 'late')
    return (
      <span className="inline-flex items-center rounded-full bg-rose-50 text-rose-600 dark:text-rose-400 ring-1 ring-rose-100 px-3 py-2.5 text-[11px] font-medium leading-none">
        Retard paiement
      </span>
    );
  if (s === 'paid_full')
    return (
      <span className="inline-flex items-center rounded-full bg-emerald-50 text-emerald-600 dark:text-emerald-400 ring-1 ring-emerald-100 px-3 py-2.5  text-[11px] font-medium leading-none">
        Payé
      </span>
    );
  if (s === 'deposit_paid')
    return (
      <span className="inline-flex items-center rounded-full bg-primary/10 text-primary ring-1 ring-primary/20 px-3 py-2.5 text-[11px] font-medium leading-none">
        Acompte OK
      </span>
    );
  if (s === 'in_progress')
    return (
      <span className="inline-flex items-center rounded-full bg-blue-50 text-blue-700 dark:text-blue-300 ring-1 ring-blue-100 px-3 py-2.5 text-[11px] font-medium leading-none">
        En cours
      </span>
    );
  return (
    <span className="inline-flex items-center rounded-full bg-black/[0.04] dark:bg:white/[0.07] ring-1 ring-black/8 dark:ring:white/10 px-3 py-2.5 text-[11px] font-medium leading-none">
      {status || '—'}
    </span>
  );
}

/* ========================= utils ========================= */

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
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
function formatEuro(v: any) {
  const n = Number(v);
  if (!isFinite(n)) return '—';
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'EUR',
    maximumFractionDigits: 0,
  }).format(n);
}
