// components/ClientSpace/Admin/ProjectDetailClient.tsx
'use client';

import Link from 'next/link';
import React, { useEffect, useMemo, useState, useTransition } from 'react';
import { motion, cubicBezier } from 'framer-motion';
import type { Variants, Transition } from 'framer-motion';
import {
  CheckCircle2,
  ExternalLink,
  Mail,
  Clock3,
  GitBranch,
  OctagonAlert,
  Upload as UploadIcon,
  X as XIcon,
  FileText,
  Eye,
  Check,
} from 'lucide-react';

import ScheduleForm from '@/app/admin/projects/[id]/schedule-form';
import UpdateForm from '@/app/admin/projects/[id]/update-form';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerFooter,
  DrawerClose,
} from '@/components/ui/drawer';

import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/lib/SupabaseClient';
import { updateProjectAction } from './_actions';

import {
  CATALOG,
  mobileSupplements,
  getVisibleOptions,
  calcTotals,
  computeKPI,
} from '@/lib/catalog';
import type {
  CategoryId,
  TierId,
  CategoryDef,
  TierDef,
  OptionDef,
  SelectionState,
} from '@/lib/catalog';

/* ===== Anim / styles ===== */
const easeFn = cubicBezier(0.16, 1, 0.3, 1);
const tSlow: Transition = { duration: 0.5, ease: easeFn };
const tFast: Transition = { duration: 0.35, ease: easeFn };
const fadeIn: Variants = {
  initial: { opacity: 0, y: 16, filter: 'blur(8px)' },
  animate: { opacity: 1, y: 0, filter: 'blur(0px)' },
};

/* ===== Cards & UI ===== */
const CARD =
  'relative rounded-3xl p-6 md:p-8 bg-white shadow-[0_8px_30px_rgba(15,23,42,0.08)] ring-1 ring-black/5';
const CARD_INNER =
  'pointer-events-none absolute inset-0 rounded-3xl shadow-[inset_0_1px_0_rgba(255,255,255,0.7)]';
const SUBCARD = 'rounded-3xl bg-sky-50 p-4 text-sm leading-relaxed';
const BLUE_BOX =
  'rounded-3xl border bg-blue-50 text-blue-600 border-blue-50 p-3';
const ROW_BG = 'rounded-3xl px-4 py-4 bg-black/[0.04]';
const inputClass =
  'h-12 md:h-12 rounded-3xl bg-black/[0.03] border-transparent focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-0 placeholder:text-black/40';
const selectTriggerClass =
  'h-12 md:h-12 rounded-3xl bg-black/[0.03] border-transparent focus:ring-2 focus:ring-primary';

/* ===== Lists / enums ===== */
const STATUS_OPTIONS = [
  ['draft', 'Brouillon'],
  ['scheduled', 'Planifié'],
  ['in_progress', 'En cours'],
  ['paused', 'En pause'],
  ['completed', 'Terminé'],
  ['cancelled', 'Annulé'],
] as const;
const BILLING_OPTIONS = [
  ['in_progress', 'Facturation en cours'],
  ['deposit_paid', 'Acompte payé'],
  ['late', 'Retard paiement'],
  ['paid_full', 'Payé (solde)'],
] as const;
const PRIORITY_OPTIONS = [
  ['low', 'Basse'],
  ['normal', 'Normale'],
  ['high', 'Haute'],
  ['critical', 'Critique'],
] as const;
const RISK_OPTIONS = [
  ['normal', 'Normal'],
  ['attention', 'Attention'],
  ['urgent', 'Urgent'],
] as const;

const LANG_LIST = ['FR', 'EN', 'ES', 'DE', 'IT', 'PT', 'AR', 'Autres'];
const TONE_LIST = [
  'Sérieux',
  'Premium',
  'Minimal',
  'Fun',
  'Innovant',
  'Chaleureux',
  'Corporate',
  'Créatif',
  'Tech',
];

/* ===== Types ===== */
export type Update = {
  id: string;
  progress: number | null;
  headline: string | null;
  done: string[];
  next: string[];
  blockers: string[];
  created_at: string;
};

export type View = {
  id: string;
  title: string;
  status: string;
  billing_status?: 'deposit_paid' | 'in_progress' | 'late' | 'paid_full' | null;
  created_at: string;
  start_at: string | null;
  deadline: string | null;
  progress: number;
  description: string | null;
  client_email: string | null;
  owner_user_id: string | null;

  category: string | null;
  tier: string | null;
  price_euros: number | null;
  ads_budget: number | null;

  selected_options?: string[] | null;

  domain: string;
  goal: string;
  langs: string[];
  tones: string[];
  urls: string[];
  links: string[];

  // Fichiers
  signed_contract_files?: string[];
  brief_files?: string[];

  contractStatus: string | null;
  repo_url: string | null;
  priority: string | null;
  risk_level: string | null;

  currency?: 'EUR' | 'USD';
};

/* ===== UI helpers ===== */
function SoftBadge({
  tone,
  children,
}: {
  tone: 'primary' | 'ok' | 'warn' | 'danger' | 'muted';
  children: React.ReactNode;
}) {
  const map: Record<string, string> = {
    primary: 'bg-primary/15 text-primary ring-1 ring-primary/25',
    ok: 'bg-emerald-500/10 text-emerald-600 ring-1 ring-emerald-500/20',
    warn: 'bg-amber-500/10 text-amber-700 ring-1 ring-amber-500/20',
    danger: 'bg-rose-500/10 text-rose-600 ring-1 ring-rose-500/20',
    muted: 'bg-black/5 text-black/70 ring-1 ring-black/10',
  };
  return (
    <span
      className={`inline-flex items-center h-7 rounded-xl px-2.5 text-[11px] font-medium leading-none ${map[tone]}`}
    >
      {children}
    </span>
  );
}

function toneForBilling(status?: string | null, hasSigned?: boolean) {
  const s = (status || '').toLowerCase();
  if (hasSigned || s === 'paid_full')
    return { tone: 'ok' as const, label: 'Payé' };
  if (s === 'late')
    return { tone: 'danger' as const, label: 'Retard paiement' };
  if (s === 'deposit_paid')
    return { tone: 'warn' as const, label: 'Acompte payé' };
  return { tone: 'muted' as const, label: 'Facturation en cours' };
}

function InfoRow({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="flex items-start gap-3 text-sm">
      <div className="w-36 shrink-0 opacity-60 text-[12px] uppercase tracking-wide leading-relaxed">
        {label}
      </div>
      <div className="min-w-0 break-words text-[13px] leading-relaxed">
        {value}
      </div>
    </div>
  );
}

function StatusPretty({ status }: { status: string }) {
  const s = (status || '').toLowerCase();
  if (s === 'in_progress')
    return <SoftBadge tone="primary">En cours</SoftBadge>;
  if (s === 'scheduled') return <SoftBadge tone="muted">Planifié</SoftBadge>;
  if (s === 'completed') return <SoftBadge tone="ok">Terminé</SoftBadge>;
  if (s === 'paused') return <SoftBadge tone="warn">En pause</SoftBadge>;
  if (s === 'cancelled') return <SoftBadge tone="danger">Annulé</SoftBadge>;
  if (s === 'draft') return <SoftBadge tone="muted">Brouillon</SoftBadge>;
  return <SoftBadge tone="muted">{status || '—'}</SoftBadge>;
}

function RiskPretty({
  priority,
  risk,
}: {
  priority: string | null;
  risk: string | null;
}) {
  let tone: 'ok' | 'warn' | 'danger' | 'muted' = 'muted';
  let label = 'Normal';
  if (risk === 'urgent' || priority === 'critical') {
    tone = 'danger';
    label = 'Urgent';
  } else if (risk === 'attention' || priority === 'high') {
    tone = 'warn';
    label = 'Attention';
  }
  return <SoftBadge tone={tone}>{label}</SoftBadge>;
}

function ProgressBar({ value }: { value: number }) {
  const safe = Math.min(100, Math.max(0, value));
  return (
    <div className="w-full">
      <div className="h-2 rounded-full bg-black/10 overflow-hidden">
        <div
          className="h-full rounded-full bg-primary transition-[width] duration-700"
          style={{ width: `${safe}%` }}
        />
      </div>
      <div className="text-right text-[11px] opacity-70 mt-1 tabular-nums">
        {safe}%
      </div>
    </div>
  );
}

function LabeledChips({ label, values }: { label: string; values: string[] }) {
  return (
    <div className="text-sm space-y-2">
      <div className="opacity-60 text-xs uppercase tracking-wide">{label}</div>
      {values?.length ? (
        <div className="flex flex-wrap gap-1.5">
          {values.map((v, i) => (
            <span
              key={`${label}-${i}`}
              className="inline-flex items-center rounded-2xl bg-sky-50 text-[12px] font-medium px-3 h-8 ring-1 ring-sky-100"
            >
              {v}
            </span>
          ))}
        </div>
      ) : (
        <div className="text-sm opacity-60">—</div>
      )}
    </div>
  );
}

function NiceLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  const safeHref = /^https?:\/\//i.test(href) ? href : `https://${href}`;
  return (
    <a
      href={safeHref}
      target="_blank"
      rel="noreferrer"
      className="inline-flex items-center gap-1 text-[13px] text-primary underline underline-offset-[3px] decoration-1 hover:opacity-80 break-words"
    >
      {children} <ExternalLink className="h-3.5 w-3.5" />
    </a>
  );
}

/* ===== Helpers URLs Storage ===== */

function getPublicUrl(bucket: string, path: string) {
  const { data } = supabase.storage.from(bucket).getPublicUrl(path);
  return data?.publicUrl || '';
}

/** Hook: génère des URLs SIGNÉES pour un bucket privé (ex: `signed-pdfs`). */
function useSignedUrls(
  bucket: string,
  paths: string[],
  expiresSeconds = 60 * 60 * 24 * 7
) {
  const [map, setMap] = useState<Record<string, string>>({});
  useEffect(() => {
    let cancelled = false;
    (async () => {
      const entries: [string, string][] = [];
      for (const p of paths) {
        const { data, error } = await supabase.storage
          .from(bucket)
          .createSignedUrl(p, expiresSeconds);
        entries.push([p, data?.signedUrl || '']);
        if (error) console.warn('Signed URL error for', p, error.message);
      }
      if (!cancelled) setMap(Object.fromEntries(entries));
    })();
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bucket, JSON.stringify(paths)]);
  return map;
}

/** Upload helper */
async function uploadFilesToBucket(
  bucket: 'uploads' | 'signed-pdfs',
  files: File[],
  prefix = `admin/${Date.now()}`
): Promise<string[]> {
  const paths: string[] = [];
  for (const f of files) {
    const safeName = f.name.replace(/[^\w.\-]+/g, '_');
    const path = `${prefix}/${crypto.randomUUID()}-${safeName}`;
    const { error } = await supabase.storage.from(bucket).upload(path, f, {
      cacheControl: '3600',
      upsert: false,
      contentType: f.type || undefined,
    });
    if (!error) paths.push(path);
    else console.warn(`Upload failed for ${f.name}`, error.message);
  }
  return paths;
}

/* ====== Offre helpers ====== */
const CATEGORY_IDS = Object.keys(CATALOG) as CategoryId[];

function selectionFromIds(
  ids: Set<string>,
  cat: CategoryDef | null,
  tier: TierDef | null
): SelectionState {
  const sel: SelectionState = { toggles: new Set(), radios: {}, qty: {} };
  if (!cat || !tier) return sel;
  const visible = getVisibleOptions(cat, tier.id);
  const allRadioGroups = new Map<string, OptionDef[]>();

  for (const o of visible) {
    if (o.kind === 'toggle' && ids.has(o.id)) sel.toggles.add(o.id);
    if (o.kind === 'radio' && o.group) {
      if (!allRadioGroups.has(o.group)) allRadioGroups.set(o.group, []);
      allRadioGroups.get(o.group)!.push(o);
    }
  }

  allRadioGroups.forEach((options) => {
    const chosen = options.find((o) => ids.has(o.id));
    if (chosen && chosen.group) {
      sel.radios[chosen.group] = chosen.id;
    }
  });

  for (const m of mobileSupplements) {
    if (m.kind === 'toggle' && ids.has(m.id)) sel.toggles.add(m.id);
  }
  return sel;
}

function toggleOptionInSet(
  set: Set<string>,
  opt: OptionDef,
  cat: CategoryDef,
  tier: TierDef
) {
  if (opt.kind === 'toggle') {
    if (set.has(opt.id)) set.delete(opt.id);
    else set.add(opt.id);
  } else if (opt.kind === 'radio' && opt.group) {
    const visible = getVisibleOptions(cat, tier.id);
    for (const o of visible) {
      if (o.kind === 'radio' && o.group === opt.group) set.delete(o.id);
    }
    set.add(opt.id);
  }
}

/* ===== Drawer d’édition ===== */
function AdminEditDrawer({
  view,
  onSaved,
}: {
  view: View;
  onSaved: (v: Partial<View>) => void;
}) {
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  /* GENERAL */
  const [title, setTitle] = useState(view.title ?? '');
  const [status, setStatus] = useState(view.status ?? 'in_progress');
  const [billing, setBilling] = useState<
    'deposit_paid' | 'in_progress' | 'late' | 'paid_full'
  >((view.billing_status as any) ?? 'in_progress');
  const [priority, setPriority] = useState(view.priority ?? 'normal');
  const [riskLevel, setRiskLevel] = useState(view.risk_level ?? 'normal');
  const [progress, setProgress] = useState<number>(view.progress ?? 0);
  const [description, setDescription] = useState(view.description ?? '');

  const [clientEmail, setClientEmail] = useState(view.client_email ?? '');
  const [ownerUserId, setOwnerUserId] = useState(view.owner_user_id ?? '');

  /* OFFRE dyn. via CATALOG */
  const [categoryId, setCategoryId] = useState<CategoryId | ''>(
    (view.category as CategoryId) || ''
  );
  const [tierId, setTierId] = useState<TierId | ''>(
    (view.tier as TierId) || ''
  );

  const [currency, setCurrency] = useState<'EUR' | 'USD'>(
    view.currency ?? 'EUR'
  );
  const [price, setPrice] = useState<number | ''>(view.price_euros ?? '');
  const [adsBudget, setAdsBudget] = useState<number | ''>(
    view.ads_budget ?? ''
  );

  const [selected, setSelected] = useState<Set<string>>(
    new Set(view.selected_options ?? [])
  );

  const [repoUrl, setRepoUrl] = useState(view.repo_url ?? '');
  const [goal, setGoal] = useState(view.goal ?? '');
  const [domain, setDomain] = useState(view.domain ?? '');
  const [langs, setLangs] = useState<string[]>(view.langs ?? []);
  const [tones, setTones] = useState<string[]>(view.tones ?? []);
  const [urls, setUrls] = useState<string>(
    Array.isArray(view.urls) ? view.urls.join('\n') : ''
  );
  const [links, setLinks] = useState<string>(
    Array.isArray(view.links) ? view.links.join('\n') : ''
  );

  // Fichiers
  const [contractPaths, setContractPaths] = useState<string[]>(
    view.signed_contract_files ?? []
  );
  const [briefPaths, setBriefPaths] = useState<string[]>(
    view.brief_files ?? []
  );
  // URLs signées pour les briefs (bucket uploads)
  const briefsSignedMap = useSignedUrls('uploads', briefPaths);

  /* Memos Catalog */
  const cat: CategoryDef | null = useMemo(
    () => (categoryId ? CATALOG[categoryId] : null),
    [categoryId]
  );
  const tier: TierDef | null = useMemo(() => {
    if (!cat || !tierId) return null;
    return cat.tiers.find((t) => t.id === tierId) ?? null;
  }, [cat, tierId]);

  const visibleOptions = useMemo(() => {
    if (!cat || !tier) return [];
    return getVisibleOptions(cat, tier.id);
  }, [cat, tier]);

  const selection: SelectionState = useMemo(
    () => selectionFromIds(selected, cat, tier),
    [selected, cat, tier]
  );

  const ads = typeof adsBudget === 'number' ? adsBudget : 0;

  const totals = useMemo(() => {
    if (!cat || !tier) return null;
    return calcTotals(cat, tier, selection, mobileSupplements, ads);
  }, [cat, tier, selection, ads]);

  const kpis = useMemo(() => {
    if (!cat || !tier) return null;
    return computeKPI(cat.id, tier, selection, ads);
  }, [cat, tier, selection, ads]);

  const billingInfo = useMemo(
    () => toneForBilling(billing, (contractPaths?.length ?? 0) > 0),
    [billing, contractPaths]
  );
  const signedUrlMap = useSignedUrls('signed-pdfs', contractPaths);

  /* Submit */
  function onSubmit() {
    startTransition(async () => {
      const patch = {
        id: view.id,
        title: title || undefined,
        status,
        billing_status: billing,
        priority,
        risk_level: riskLevel,
        progress: Number.isFinite(progress as number)
          ? (progress as number)
          : 0,
        description: description || null,
        client_email: clientEmail || null,
        owner_user_id: ownerUserId || null,

        offer_category: categoryId || null,
        offer_tier: tierId || null,
        offer_price: price === '' ? null : Number(price),
        currency,
        ads_budget: adsBudget === '' ? null : Number(adsBudget),
        repo_url: repoUrl || null,

        urls: urls
          .split('\n')
          .map((s) => s.trim())
          .filter(Boolean),

        links: links
          .split('\n')
          .map((s) => s.trim())
          .filter(Boolean),

        goal: goal || '',
        domain: domain || '',
        langs,
        tones,

        selected_options: Array.from(selected),
        signed_contract_files: contractPaths,
        brief_files: briefPaths,
      } as const;

      const res = await updateProjectAction(patch as any);
      if (res?.ok) {
        onSaved({
          title,
          status,
          billing_status: billing,
          priority,
          risk_level: riskLevel,
          progress,
          description,
          client_email: clientEmail,
          owner_user_id: ownerUserId,
          category: categoryId || null,
          tier: tierId || null,
          price_euros: price === '' ? null : Number(price),
          ads_budget: adsBudget === '' ? null : Number(adsBudget),
          repo_url: repoUrl,
          goal,
          domain,
          langs,
          tones,
          urls: patch.urls,
          links: patch.links,
          selected_options: Array.from(selected),
          signed_contract_files: contractPaths,
          brief_files: briefPaths,
          currency,
        });
        toast({ title: 'Projet mis à jour', description: '✅ Sauvegardé' });
        setOpen(false);
      } else {
        toast({
          title: 'Erreur',
          description: res?.error ?? 'Échec de mise à jour',
          variant: 'destructive',
        });
      }
    });
  }

  /* Uploads */
  async function handleContractInputChange(
    e: React.ChangeEvent<HTMLInputElement>
  ) {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;
    const prefix = `admin/${view.id}/contracts/${Date.now()}`;
    const paths = await uploadFilesToBucket('signed-pdfs', files, prefix);
    if (!paths.length) {
      return toast({
        title: 'Upload échoué',
        description: 'Impossible d’uploader le PDF signé.',
        variant: 'destructive',
      });
    }
    const newPaths = [...(contractPaths || []), ...paths];
    setContractPaths(newPaths);
    await updateProjectAction({
      id: view.id,
      signed_contract_files: newPaths,
    } as any);
    toast({ title: 'Contrat ajouté', description: 'PDF signé enregistré.' });
  }

  async function handleBriefsInputChange(
    e: React.ChangeEvent<HTMLInputElement>
  ) {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;
    const prefix = `admin/${view.id}/briefs/${Date.now()}`;
    const paths = await uploadFilesToBucket('uploads', files, prefix);
    if (!paths.length) {
      return toast({
        title: 'Upload échoué',
        description: 'Impossible d’uploader les briefs.',
        variant: 'destructive',
      });
    }
    const newPaths = [...(briefPaths || []), ...paths];
    setBriefPaths(newPaths);
    await updateProjectAction({ id: view.id, brief_files: newPaths } as any);
    toast({ title: 'Briefs ajoutés', description: 'Fichiers enregistrés.' });
  }

  function removeContractPath(path: string) {
    setContractPaths((p) => p.filter((x) => x !== path));
  }
  function removeBriefPath(path: string) {
    setBriefPaths((p) => p.filter((x) => x !== path));
  }

  return (
    <Drawer open={open} onOpenChange={setOpen} direction="bottom">
      <DrawerTrigger asChild>
        <Button
          size="sm"
          className="gap-2 bg-primary text-white hover:opacity-90 rounded-xl"
        >
          Modifier
        </Button>
      </DrawerTrigger>

      <DrawerContent className="fixed inset-x-0 bottom-0 top-auto h-[92dvh] sm:h-[86dvh] w-full rounded-t-[2rem] border border-black/5 shadow-[0_-24px_80px_rgba(15,23,42,0.28)] bg-white backdrop-blur-xl">
        <div className="h-full flex flex-col">
          <DrawerHeader className="sticky top-0 z-20 border-b border-black/[0.04] bg-white/95 px-5 md:px-6 py-4">
            <div className="max-w-[1100px] mx-auto w-full flex items-center justify-between gap-3">
              <DrawerTitle className="text-lg sm:text-xl font-semibold">
                Modifier le projet
              </DrawerTitle>
              <DrawerClose asChild>
                <button
                  className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-black/[0.04]"
                  aria-label="Fermer"
                >
                  <XIcon className="h-4 w-4" />
                </button>
              </DrawerClose>
            </div>
          </DrawerHeader>

          <div className="flex-1 overflow-y-auto px-5 md:px-6 pb-5">
            <div className="max-w-[1100px] mx-auto w-full">
              <Tabs defaultValue="offer" className="mt-0">
                <div className="sticky top-0 rounded-3xl z-10 py-2 bg-white/70 backdrop-blur-sm">
                  <div className="no-scrollbar overflow-x-auto overflow-y-hidden -mx-5 md:mx-0 px-5">
                    <TabsList className="flex w-max gap-2 rounded-3xl bg-neutral-50 px-2 py-6 border border-black/[0.04]">
                      {[
                        ['offer', 'Offre'],
                        ['general', 'Général'],
                        ['client', 'Client & Interne'],
                        ['budget', 'Budget'],
                        ['content', 'Contenu'],
                        ['refs', 'Références'],
                        ['files', 'Fichiers'],
                      ].map(([val, lab]) => (
                        <TabsTrigger
                          key={val}
                          value={val}
                          className="rounded-2xl px-3 py-2 text-xs sm:text-[13px]
                     data-[state=active]:bg-white data-[state=active]:shadow-sm
                     data-[state=active]:text-black"
                        >
                          {lab}
                        </TabsTrigger>
                      ))}
                    </TabsList>
                  </div>
                </div>

                {/* === OFFRE === */}
                <TabsContent value="offer" className="space-y-7 pt-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <Label className="mb-1.5 inline-block">Catégorie</Label>
                      <Select
                        value={categoryId || ''}
                        onValueChange={(v) => {
                          setCategoryId(v as CategoryId);
                          setTierId('');
                          setSelected(new Set());
                        }}
                      >
                        <SelectTrigger className={selectTriggerClass}>
                          <SelectValue placeholder="Choisir une catégorie" />
                        </SelectTrigger>
                        <SelectContent>
                          {CATEGORY_IDS.map((cid) => (
                            <SelectItem key={cid} value={cid}>
                              {CATALOG[cid].name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="grid grid-cols-3 gap-3">
                      <div>
                        <Label className="mb-1.5 inline-block">Devise</Label>
                        <Select
                          value={currency}
                          onValueChange={(v) => setCurrency(v as 'EUR' | 'USD')}
                        >
                          <SelectTrigger className={selectTriggerClass}>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="EUR">EUR</SelectItem>
                            <SelectItem value="USD">USD</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="col-span-2">
                        <Label className="mb-1.5 inline-block">
                          Prix vendu (TTC)
                        </Label>
                        <Input
                          className={inputClass}
                          type="number"
                          inputMode="decimal"
                          value={String(price ?? '')}
                          onChange={(e) =>
                            setPrice(
                              e.target.value === ''
                                ? ''
                                : Number(e.target.value)
                            )
                          }
                          placeholder="Ex : 7 400"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Tiers */}
                  {cat && (
                    <div className="space-y-3">
                      <div className="text-sm font-medium">Pack</div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                        {cat.tiers.map((t) => {
                          const active = tierId === t.id;
                          return (
                            <button
                              key={t.id}
                              type="button"
                              aria-pressed={active}
                              onClick={() => setTierId(t.id)}
                              className={[
                                'text-left rounded-3xl p-4 transition',
                                active
                                  ? 'bg-sky-50 ring-1 ring-sky-100'
                                  : 'bg-black/[0.03] ring-1 ring-black/5 hover:bg-black/[0.05]',
                              ].join(' ')}
                            >
                              <div className="flex items-center justify-between gap-2">
                                <div className="font-semibold">{t.name}</div>
                                <Badge variant="secondary">
                                  {new Intl.NumberFormat('fr-FR', {
                                    style: 'currency',
                                    currency,
                                  }).format(t.price)}
                                </Badge>
                              </div>
                              <ul className="mt-2 text-[12.5px] leading-relaxed opacity-80 list-disc list-inside space-y-0.5">
                                {t.includes.slice(0, 4).map((b, i) => (
                                  <li key={i}>{b}</li>
                                ))}
                              </ul>
                              <div className="mt-2 text-[11px] opacity-60">
                                Délai base : {t.baseDelayDays} j
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {cat && tier && (
                    <div className="space-y-6">
                      <div>
                        <div className="mb-2 text-sm font-medium">
                          Options ({CATALOG[cat.id].name})
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {visibleOptions.map((o) => {
                            const isOn = selected.has(o.id);

                            return (
                              <button
                                key={o.id}
                                type="button"
                                role="checkbox"
                                aria-checked={isOn}
                                onClick={() => {
                                  const next = new Set(selected);
                                  toggleOptionInSet(next, o, cat, tier);
                                  setSelected(next);
                                }}
                                className={[
                                  'w-full text-left flex items-start gap-3 rounded-3xl px-3 py-2 ring-1 text-[13px] leading-relaxed cursor-pointer transition',
                                  isOn
                                    ? 'bg-sky-50 ring-sky-100'
                                    : 'bg-white ring-neutral-100 hover:bg-neutral-50',
                                ].join(' ')}
                              >
                                {/* carré visuel qui remplace la checkbox */}
                                <div
                                  className={[
                                    'flex items-center justify-center rounded-[6px] border h-4 w-4 text-[11px] font-semibold transition',
                                    isOn
                                      ? 'bg-sky-500 border-sky-500 text-white'
                                      : 'bg-sky-50 border-sky-100 text-sky-500',
                                  ].join(' ')}
                                >
                                  {isOn ? (
                                    <Check className="h-2.5 w-2.5" />
                                  ) : (
                                    ''
                                  )}
                                </div>

                                <div className="min-w-0">
                                  <div className="font-medium">{o.label}</div>
                                  <div className="opacity-70 text-[12px]">
                                    {o.note || 'Option'}
                                  </div>
                                  <div className="mt-1 text-[12px]">
                                    {new Intl.NumberFormat('fr-FR', {
                                      style: 'currency',
                                      currency,
                                    }).format(o.price)}{' '}
                                    {o.delayDays ? `· ${o.delayDays} j` : ''}
                                  </div>
                                </div>
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      {/* Budget Ads */}
                      {cat.hasAdsBudget && (
                        <div>
                          <Label className="mb-1.5 inline-block">
                            Budget Ads (€/mois){' '}
                            <span className="opacity-60">
                              {typeof adsBudget === 'number'
                                ? `: ${adsBudget.toLocaleString('fr-FR')} €`
                                : ''}
                            </span>
                          </Label>
                          <div className="mt-2 px-1">
                            <Slider
                              min={0}
                              max={5000}
                              step={50}
                              value={[
                                typeof adsBudget === 'number' ? adsBudget : 0,
                              ]}
                              onValueChange={(a) => setAdsBudget(a[0] ?? 0)}
                            />
                          </div>
                        </div>
                      )}

                      {/* Résumé calculé */}
                      {totals && (
                        <div
                          className={`${ROW_BG} flex flex-wrap items-center justify-between gap-3`}
                        >
                          <div className="text-[13px]">
                            <span className="opacity-60 mr-1.5">Résumé :</span>
                            <span className="font-medium">
                              {cat.name} · {tier.name}
                            </span>
                            {!!selected.size && (
                              <span className="opacity-70">
                                {' '}
                                · {selected.size} option(s)
                              </span>
                            )}
                            <span className="opacity-60">
                              {' '}
                              · Délai estimé :
                            </span>{' '}
                            <span className="font-medium">
                              {totals.delayDays} j
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <SoftBadge tone="muted">
                              Base{' '}
                              {new Intl.NumberFormat('fr-FR', {
                                style: 'currency',
                                currency,
                              }).format(totals.base)}
                            </SoftBadge>
                            <SoftBadge tone="muted">
                              Options{' '}
                              {new Intl.NumberFormat('fr-FR', {
                                style: 'currency',
                                currency,
                              }).format(totals.optionsTotal)}
                            </SoftBadge>
                            <SoftBadge tone="primary">
                              Estimé{' '}
                              {new Intl.NumberFormat('fr-FR', {
                                style: 'currency',
                                currency,
                              }).format(totals.grandTotal)}
                            </SoftBadge>
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Résumé prix saisi */}
                  <div
                    className={`${ROW_BG} flex items-center justify-between gap-3`}
                  >
                    <div className="text-[13px]">
                      <span className="opacity-60 mr-1.5">Résumé :</span>
                      <span className="font-medium">
                        {categoryId ? CATALOG[categoryId].name : '—'}
                        {tierId && categoryId ? ' · ' : ''}
                        {tierId && categoryId
                          ? CATALOG[categoryId].tiers.find(
                              (t) => t.id === tierId
                            )?.name
                          : '—'}
                      </span>
                    </div>
                    <SoftBadge tone="primary">
                      {price === '' || typeof price !== 'number'
                        ? 'Tarif non défini'
                        : new Intl.NumberFormat('fr-FR', {
                            style: 'currency',
                            currency,
                          }).format(price as number)}
                    </SoftBadge>
                  </div>
                </TabsContent>

                {/* === GENERAL === */}
                <TabsContent value="general" className="space-y-6 pt-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <Label className="mb-1.5 inline-block">Titre</Label>
                      <Input
                        className={inputClass}
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Titre du projet"
                      />
                    </div>
                    <div>
                      <Label className="mb-1.5 inline-block">Statut</Label>
                      <Select value={status} onValueChange={setStatus}>
                        <SelectTrigger className={selectTriggerClass}>
                          <SelectValue placeholder="Choisir le statut" />
                        </SelectTrigger>
                        <SelectContent>
                          {STATUS_OPTIONS.map(([v, l]) => (
                            <SelectItem key={v} value={v}>
                              {l}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label className="mb-1.5 inline-block">Facturation</Label>
                      <Select
                        value={billing}
                        onValueChange={(v) => setBilling(v as any)}
                      >
                        <SelectTrigger className={selectTriggerClass}>
                          <SelectValue placeholder="Statut facturation" />
                        </SelectTrigger>
                        <SelectContent>
                          {BILLING_OPTIONS.map(([v, l]) => (
                            <SelectItem key={v} value={v}>
                              {l}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label className="mb-1.5 inline-block">Priorité</Label>
                      <Select
                        value={priority ?? 'normal'}
                        onValueChange={(v) => setPriority(v)}
                      >
                        <SelectTrigger className={selectTriggerClass}>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {PRIORITY_OPTIONS.map(([v, l]) => (
                            <SelectItem key={v} value={v}>
                              {l}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label className="mb-1.5 inline-block">Risque</Label>
                      <Select
                        value={riskLevel ?? 'normal'}
                        onValueChange={(v) => setRiskLevel(v)}
                      >
                        <SelectTrigger className={selectTriggerClass}>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {RISK_OPTIONS.map(([v, l]) => (
                            <SelectItem key={v} value={v}>
                              {l}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="pt-2">
                    <Label className="mb-1.5 inline-block">
                      Progression{' '}
                      <span className="opacity-70">({progress}%)</span>
                    </Label>
                    <div className="mt-2 px-1">
                      <Slider
                        value={[progress]}
                        min={0}
                        max={100}
                        step={1}
                        onValueChange={(a) => setProgress(a[0] ?? 0)}
                      />
                    </div>
                  </div>

                  <div>
                    <Label className="mb-1.5 inline-block">Description</Label>
                    <Textarea
                      className={`${inputClass} min-h-[120px]`}
                      rows={5}
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="Résumé clair du besoin client, contraintes, contexte…"
                    />
                  </div>
                </TabsContent>

                {/* === CLIENT === */}
                <TabsContent value="client" className="space-y-6 pt-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <Label className="mb-1.5 inline-block">
                        Email client
                      </Label>
                      <Input
                        className={inputClass}
                        type="email"
                        value={clientEmail}
                        onChange={(e) => setClientEmail(e.target.value)}
                      />
                    </div>
                    <div>
                      <Label className="mb-1.5 inline-block">
                        Responsable interne (UUID)
                      </Label>
                      <Input
                        className={inputClass}
                        value={ownerUserId ?? ''}
                        onChange={(e) => setOwnerUserId(e.target.value)}
                        placeholder="UUID Supabase du membre Ikovaline"
                      />
                    </div>
                  </div>
                </TabsContent>

                {/* === BUDGET === */}
                <TabsContent value="budget" className="space-y-6 pt-4">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <Label className="mb-1.5 inline-block">Prix vendu</Label>
                      <Input
                        className={inputClass}
                        type="number"
                        inputMode="decimal"
                        value={String(price ?? '')}
                        onChange={(e) =>
                          setPrice(
                            e.target.value === '' ? '' : Number(e.target.value)
                          )
                        }
                      />
                    </div>
                    <div>
                      <Label className="mb-1.5 inline-block">Devise</Label>
                      <Select
                        value={currency}
                        onValueChange={(v) => setCurrency(v as 'EUR' | 'USD')}
                      >
                        <SelectTrigger className={selectTriggerClass}>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="EUR">EUR</SelectItem>
                          <SelectItem value="USD">USD</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label className="mb-1.5 inline-block">
                        Budget Ads (€ / mois)
                      </Label>
                      <Input
                        className={inputClass}
                        type="number"
                        inputMode="numeric"
                        value={String(adsBudget ?? '')}
                        onChange={(e) =>
                          setAdsBudget(
                            e.target.value === '' ? '' : Number(e.target.value)
                          )
                        }
                      />
                    </div>
                  </div>
                </TabsContent>

                {/* === CONTENU === */}
                <TabsContent value="content" className="space-y-6 pt-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <Label className="mb-1.5 inline-block">
                        Objectif (goal)
                      </Label>
                      <Input
                        className={inputClass}
                        value={goal ?? ''}
                        onChange={(e) => setGoal(e.target.value)}
                        placeholder="Ex : Générer des leads qualifiés, vendre en ligne…"
                      />
                    </div>
                    <div>
                      <Label className="mb-1.5 inline-block">
                        Domaine (domain)
                      </Label>
                      <Input
                        className={inputClass}
                        value={domain ?? ''}
                        onChange={(e) => setDomain(e.target.value)}
                        placeholder="Ex : BTP, coaching, e-commerce, formation…"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <Label className="mb-1.5 inline-block">Langues</Label>
                      <div className="mt-2 flex flex-wrap gap-2">
                        {LANG_LIST.map((l) => {
                          const active = langs.includes(l);
                          return (
                            <button
                              key={l}
                              type="button"
                              aria-pressed={active}
                              onClick={() =>
                                setLangs((prev) =>
                                  prev.includes(l)
                                    ? prev.filter((x) => x !== l)
                                    : [...prev, l]
                                )
                              }
                              className={[
                                'h-8 px-3 rounded-xl text-[12.5px] ring-1 transition',
                                active
                                  ? 'bg-blue-50 text-blue-700 ring-blue-200'
                                  : 'bg-black/[0.03] text-foreground/80 ring-black/10 hover:bg-black/[0.06]',
                              ].join(' ')}
                            >
                              {l}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    <div>
                      <Label className="mb-1.5 inline-block">Ton</Label>
                      <div className="mt-2 flex flex-wrap gap-2">
                        {TONE_LIST.map((t) => {
                          const active = tones.includes(t);
                          return (
                            <button
                              key={t}
                              type="button"
                              aria-pressed={active}
                              onClick={() =>
                                setTones((prev) =>
                                  prev.includes(t)
                                    ? prev.filter((x) => x !== t)
                                    : [...prev, t]
                                )
                              }
                              className={[
                                'h-8 px-3 rounded-xl text-[12.5px] ring-1 transition',
                                active
                                  ? 'bg-blue-50 text-blue-700 ring-blue-200'
                                  : 'bg-black/[0.03] text-foreground/80 ring-black/10 hover:bg-black/[0.06]',
                              ].join(' ')}
                            >
                              {t}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </TabsContent>

                {/* === REFERENCES === */}
                <TabsContent value="refs" className="space-y-6 pt-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label className="mb-1.5 inline-block">
                        Références / Bench (sites à suivre)
                      </Label>
                      <Textarea
                        className={`${inputClass} min-h-[140px]`}
                        placeholder="1 URL par ligne (sites concurrents, inspirations UI/UX, etc.)"
                        value={urls}
                        onChange={(e) => setUrls(e.target.value)}
                      />
                    </div>
                    <div>
                      <Label className="mb-1.5 inline-block">
                        Liens client (Notion, Miro, Drive…)
                      </Label>
                      <Textarea
                        className={`${inputClass} min-h-[140px]`}
                        placeholder="1 URL par ligne (documents, espaces partagés, etc.)"
                        value={links}
                        onChange={(e) => setLinks(e.target.value)}
                      />
                    </div>
                  </div>
                </TabsContent>

                {/* === FICHIERS (Contrats + Briefs) === */}
                <TabsContent value="files" className="space-y-6 pt-4">
                  <div
                    className={`${BLUE_BOX} text-[13px] flex items-start gap-2`}
                  >
                    <UploadIcon className="h-4 w-4 mt-0.5" />
                    <div>
                      <div className="font-medium opacity-90">
                        Gestion des fichiers
                      </div>
                      <div className="opacity-60">
                        • <b>Contrats signés</b> → bucket privé{' '}
                        <code>signed-pdfs</code> (liens signés).
                        <br />• <b>Briefs</b> (PDF/Images) → bucket public{' '}
                        <code>uploads</code> (URL publiques).
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Contrats */}
                    <div className="space-y-2">
                      <Label className="mb-1.5 inline-block">
                        Ajouter un contrat signé (PDF)
                      </Label>
                      <Input
                        className={inputClass}
                        type="file"
                        accept="application/pdf"
                        onChange={handleContractInputChange}
                      />
                      <div className={SUBCARD}>
                        <div className="text-[11px] uppercase tracking-wide opacity-60 mb-2">
                          Contrats enregistrés
                        </div>

                        {!contractPaths?.length ? (
                          <div className="text-[13px] opacity-60">—</div>
                        ) : (
                          <ul className="space-y-2">
                            {contractPaths.map((p) => {
                              const url = signedUrlMap[p] || '#'; // 🔥 signed URL générée via hook useSignedUrls('signed-pdfs', contractPaths)
                              return (
                                <li
                                  key={p}
                                  className="flex items-center justify-between gap-2 text-[13px]"
                                >
                                  <a
                                    href={url}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="inline-flex items-center gap-1 text-blue-600 hover:text-blue-700 underline underline-offset-2 decoration-1"
                                  >
                                    <Eye className="h-3.5 w-3.5" />
                                    Voir le contrat
                                  </a>
                                  <button
                                    type="button"
                                    className="inline-flex items-center h-8 px-2 rounded-lg bg-black/[0.06] text-[12px]"
                                    onClick={() => removeContractPath(p)}
                                    title="Retirer de la liste (ne supprime pas du bucket)"
                                  >
                                    <XIcon className="h-3.5 w-3.5" />
                                  </button>
                                </li>
                              );
                            })}
                          </ul>
                        )}
                      </div>
                    </div>

                    {/* Briefs */}
                    <div className="space-y-2">
                      <Label className="mb-1.5 inline-block">
                        Briefs (PDF/Images)
                      </Label>
                      <Input
                        className={inputClass}
                        type="file"
                        multiple
                        accept="application/pdf,image/*"
                        onChange={handleBriefsInputChange}
                      />
                      <div className={SUBCARD}>
                        <div className="text-[11px] uppercase tracking-wide opacity-60 mb-2">
                          Briefs enregistrés
                        </div>
                        {!briefPaths?.length ? (
                          <div className="text-[13px] opacity-60">—</div>
                        ) : (
                          <ul className="space-y-2">
                            {briefPaths.map((p) => {
                              const url = briefsSignedMap[p] || '#';
                              return (
                                <li
                                  key={p}
                                  className="flex items-center justify-between gap-2"
                                >
                                  <a
                                    href={url}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="text-[12.5px] underline underline-offset-[3px] decoration-1 break-all"
                                  >
                                    voir le fichier
                                  </a>
                                  <button
                                    type="button"
                                    className="inline-flex items-center h-8 px-2 rounded-lg bg-black/[0.06] text-[12px]"
                                    onClick={() => removeBriefPath(p)}
                                  >
                                    <XIcon className="h-3.5 w-3.5" />
                                  </button>
                                </li>
                              );
                            })}
                          </ul>
                        )}
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>

          <DrawerFooter className="sticky bottom-0 z-20 border-t border-black/[0.04] bg-white/95 backdrop-blur-xl gap-2 px-5 md:px-6 py-4">
            <div className="max-w-[1100px] mx-auto w-full flex gap-2">
              <DrawerClose asChild>
                <Button
                  variant="outline"
                  className="rounded-3xl shadow-none w-1/3 sm:w-auto"
                >
                  Annuler
                </Button>
              </DrawerClose>
              <Button
                onClick={onSubmit}
                disabled={isPending}
                aria-busy={isPending}
                className="bg-primary shadow-noe text-white rounded-3xl hover:opacity-90 w-2/3 sm:w-auto"
              >
                {isPending ? 'Enregistrement…' : 'Enregistrer'}
              </Button>
            </div>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
}

/* ===== Page Detail ===== */
export default function ProjectDetailClientPage({
  mode,
  view: initialView,
  updates,
}: {
  mode: 'admin' | 'dev';
  view: View;
  updates: Update[];
}) {
  const [view, setView] = useState<View>(initialView);

  const canEdit = mode === 'admin';
  const billingTone = toneForBilling(
    view.billing_status ?? view.contractStatus ?? 'in_progress',
    (view.signed_contract_files?.length ?? 0) > 0
  );

  const formatMoney = (n?: number | null, currency: 'EUR' | 'USD' = 'EUR') =>
    typeof n === 'number'
      ? new Intl.NumberFormat('fr-FR', { style: 'currency', currency }).format(
          n
        )
      : '—';

  const catName =
    view.category && CATALOG[view.category as CategoryId]
      ? CATALOG[view.category as CategoryId].name
      : view.category || '—';

  const tierName =
    view.category && view.tier
      ? CATALOG[view.category as CategoryId]?.tiers.find(
          (t) => t.id === (view.tier as TierId)
        )?.name || (view.tier as string)
      : view.tier || '—';

  // URLs signées pour les contrats (bucket privé)
  const contractPaths = view.signed_contract_files || [];
  const signedUrlMap = useSignedUrls('signed-pdfs', contractPaths);
  // URLs signées pour les briefs (bucket uploads)
  const briefPaths = view.brief_files || [];
  const briefsSignedMap = useSignedUrls('uploads', briefPaths);

  return (
    <section className="w-full">
      <div className="mx-auto w-full max-w-7xl space-y-10">
        {/* Back + Edit */}
        <motion.div
          initial="initial"
          animate="animate"
          variants={fadeIn}
          transition={tFast}
          className="flex items-center justify-between"
        >
          <Link
            href={mode === 'admin' ? '/admin/projects' : '/dev/projects'}
            className="inline-flex items-center h-9 rounded-xl bg-black/[0.04] text-sm px-3 leading-none ring-1 ring-black/10 hover:bg-black/[0.08] transition"
          >
            ← Retour projets
          </Link>
          {canEdit && (
            <AdminEditDrawer
              view={view}
              onSaved={(patch) =>
                setView((prev) => ({ ...prev, ...patch }) as View)
              }
            />
          )}
        </motion.div>

        {/* HEADER */}
        <motion.div
          initial="initial"
          animate="animate"
          variants={fadeIn}
          transition={tSlow}
          className={CARD}
        >
          <div aria-hidden className={CARD_INNER} />
          <div className="relative z-[1] flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
            <div className="flex-1 min-w-0">
              <div className="text-[11px] tracking-[0.18em] uppercase text-black/50">
                Projet
              </div>
              <h1 className="text-2xl md:text-3xl font-semibold tracking-tight leading-tight break-words">
                {view.title || 'Projet'}
              </h1>

              <div className="mt-4 flex flex-wrap items-center gap-2">
                <StatusPretty status={view.status} />
                {view.deadline && (
                  <SoftBadge tone="warn">
                    <Clock3 className="h-3.5 w-3.5 mr-1" /> Deadline{' '}
                    {new Date(view.deadline).toLocaleDateString('fr-FR')}
                  </SoftBadge>
                )}
                <SoftBadge tone="muted">
                  Créé le{' '}
                  {new Date(view.created_at).toLocaleDateString('fr-FR')}
                </SoftBadge>
                <SoftBadge tone={billingTone.tone}>
                  {billingTone.label}
                </SoftBadge>
                <RiskPretty
                  priority={view.priority ?? null}
                  risk={view.risk_level ?? null}
                />
              </div>
              {/* Description visible dans la page principale */}
              {view.description ? (
                <div className="mt-4">
                  <div className={BLUE_BOX}>
                    <p className="text-[13px] leading-relaxed whitespace-pre-wrap">
                      {view.description}
                    </p>
                  </div>
                </div>
              ) : null}
            </div>

            <div className="w-full md:max-w-[340px] space-y-4">
              <ProgressBar value={view.progress} />
              {view.repo_url && (
                <div className="text-[13px] leading-relaxed rounded-2xl bg-black/[0.04] px-3 py-2 flex items-start gap-2">
                  <GitBranch className="h-4 w-4 shrink-0 mt-0.5" />
                  <div className="min-w-0 break-all">
                    <div className="opacity-60 text-[11px] uppercase tracking-wide">
                      Repo
                    </div>
                    <a
                      href={view.repo_url}
                      target="_blank"
                      rel="noreferrer"
                      className="underline underline-offset-[3px] decoration-1"
                    >
                      voir le repository
                    </a>
                  </div>
                </div>
              )}
            </div>
          </div>
        </motion.div>

        {/* CONTRAT */}
        <motion.div
          initial="initial"
          animate="animate"
          variants={fadeIn}
          transition={tSlow}
          className={CARD}
        >
          <div aria-hidden className={CARD_INNER} />
          <div className="relative z-[1] flex flex-col gap-4">
            <div className="flex items-start justify-between flex-wrap gap-3">
              <div className="flex flex-col">
                <div className="text-base font-semibold leading-tight">
                  Contrat & statut facturation
                </div>
                <div className="text-[12px] text-black/60">
                  Signature client et état du paiement
                </div>
              </div>
              <SoftBadge tone={billingTone.tone}>{billingTone.label}</SoftBadge>
            </div>

            {contractPaths.length ? (
              <div className={`${SUBCARD} flex flex-col gap-2 text-[13px]`}>
                <div className="flex items-center gap-2 text-emerald-600 font-medium">
                  <CheckCircle2 className="h-4 w-4" />
                  <span>{contractPaths.length} contrat(s) signé(s)</span>
                </div>

                <div className="grid gap-2  justify-start">
                  {contractPaths.map((p) => {
                    const signed = signedUrlMap[p] || '#';
                    return (
                      <a
                        key={p}
                        href={signed}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 h-10 rounded-2xl bg-primary text-white px-3 text-[12.5px] font-medium leading-none hover:opacity-90 transition"
                        title="Voir le PDF signé"
                      >
                        <Eye className="h-4 w-4" />
                        Voir le PDF
                      </a>
                    );
                  })}
                </div>
              </div>
            ) : (
              <div className={`${SUBCARD} flex gap-3 text-[13px]`}>
                <OctagonAlert className="h-4 w-4 text-amber-600 mt-0.5 shrink-0" />
                <div className="space-y-1">
                  <div className="font-medium text-amber-700">
                    Pas de contrat signé
                  </div>
                  <div className="text-[12px] text-black/60 leading-relaxed">
                    Aucun PDF signé n’est enregistré pour ce projet.
                  </div>
                </div>
              </div>
            )}
          </div>
        </motion.div>

        {/* INFOS CLÉS */}
        <motion.div
          initial="initial"
          animate="animate"
          variants={fadeIn}
          transition={tSlow}
          className={CARD}
        >
          <div aria-hidden className={CARD_INNER} />
          <div className="relative z-[1] space-y-8">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <InfoRow
                label="Client"
                value={
                  view.client_email ? (
                    <span className="inline-flex items-center gap-2">
                      <Mail className="h-4 w-4" />
                      {view.client_email}
                    </span>
                  ) : (
                    '—'
                  )
                }
              />
              <InfoRow
                label="Responsable interne"
                value={view.owner_user_id ?? '—'}
              />
              <InfoRow
                label="Début prévu"
                value={
                  view.start_at
                    ? new Date(view.start_at).toLocaleString('fr-FR')
                    : '—'
                }
              />
              <InfoRow label="Offre" value={`${catName} · ${tierName}`} />
              <InfoRow
                label="Budget total"
                value={formatMoney(view.price_euros, view.currency ?? 'EUR')}
              />
              <InfoRow
                label="Budget Ads"
                value={
                  typeof view.ads_budget === 'number'
                    ? `${view.ads_budget.toLocaleString('fr-FR')} €`
                    : '—'
                }
              />
            </div>

            {/* Langues / Ton / Objectif & Domaine */}
            <div className="grid md:grid-cols-3 gap-6">
              <LabeledChips label="Langues" values={view.langs || []} />
              <LabeledChips label="Ton" values={view.tones || []} />
              <div className={SUBCARD}>
                <div className="space-y-1.5 text-[13px] leading-relaxed">
                  <div>
                    <span className="opacity-60">Objectif : </span>
                    <span>{view.goal || '—'}</span>
                  </div>
                  <div>
                    <span className="opacity-60">Domaine : </span>
                    <span>{view.domain || '—'}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Options + Briefs */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className={SUBCARD}>
                <div className="text-[11px] uppercase tracking-wide opacity-60 mb-2">
                  Options sélectionnées
                </div>
                {view.selected_options?.length ? (
                  <div className="flex flex-wrap gap-1.5">
                    {view.selected_options.map((id) => {
                      const label =
                        (view.category &&
                          CATALOG[view.category as CategoryId]?.options.find(
                            (o) => o.id === id
                          )?.label) ||
                        mobileSupplements.find((m) => m.id === id)?.label ||
                        id;
                      return (
                        <span
                          key={id}
                          className="inline-flex items-center rounded-2xl bg-white text-[12px] font-medium px-3 h-8 ring-1 ring-white/10"
                        >
                          {label}
                        </span>
                      );
                    })}
                  </div>
                ) : (
                  <div className="text-[13px] opacity-60">—</div>
                )}
              </div>

              {/* Briefs (visibles ici aussi) */}
              <div className={SUBCARD}>
                <div className="text-[11px] uppercase tracking-wide opacity-60 mb-2">
                  Briefs (PDF/Images)
                </div>
                {view.brief_files?.length ? (
                  <ul className="space-y-1">
                    {view.brief_files.map((p) => {
                      const url = briefsSignedMap[p] || '#';
                      return (
                        <li
                          key={p}
                          className="flex items-center gap-2 text-[13px]"
                        >
                          <FileText className="h-4 w-4 opacity-70" />
                          <a
                            href={url}
                            target="_blank"
                            rel="noreferrer"
                            className="underline underline-offset-[3px] decoration-1 break-all"
                          >
                            voir le fichier
                          </a>
                        </li>
                      );
                    })}
                  </ul>
                ) : (
                  <div className="text-[13px] opacity-60">—</div>
                )}
              </div>
            </div>

            {/* Références */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className={SUBCARD}>
                <div className="text-[11px] uppercase tracking-wide opacity-60 mb-2">
                  Références / Bench
                </div>
                <div className="flex flex-col gap-2">
                  {view.urls?.length ? (
                    view.urls.map((u, i) => (
                      <NiceLink key={i} href={u}>
                        {u}
                      </NiceLink>
                    ))
                  ) : (
                    <div className="text-[13px] opacity-60">—</div>
                  )}
                </div>
              </div>
              <div className={SUBCARD}>
                <div className="text-[11px] uppercase tracking-wide opacity-60 mb-2">
                  Liens client (Notion, Miro, Drive…)
                </div>
                <div className="flex flex-col gap-2">
                  {view.links?.length ? (
                    view.links.map((u, i) => (
                      <NiceLink key={i} href={u}>
                        {u}
                      </NiceLink>
                    ))
                  ) : (
                    <div className="text-[13px] opacity-60">—</div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* FORMS */}
        <motion.div
          initial="initial"
          animate="animate"
          variants={fadeIn}
          transition={tFast}
          className={CARD}
        >
          <div aria-hidden className={CARD_INNER} />
          <div className="relative z-[1] space-y-8">
            <div>
              <div className="text-base font-semibold leading-tight">
                Planning & statut interne
              </div>
              <div className="text-[12px] text-black/60">
                Ajuster les dates et l’avancement global du projet.
              </div>
            </div>
            <ScheduleForm
              projectId={view.id}
              start_at={view.start_at}
              deadline={view.deadline}
              status={view.status}
            />
            <UpdateForm projectId={view.id} currentProgress={view.progress} />
          </div>
        </motion.div>

        {/* TIMELINE */}
        <motion.div
          initial="initial"
          animate="animate"
          variants={fadeIn}
          transition={tFast}
          className={CARD}
        >
          <div aria-hidden className={CARD_INNER} />
          <div className="relative z-[1]">
            <div className="flex items-start justify-between flex-wrap gap-3 mb-6">
              <div>
                <div className="text-base font-semibold leading-tight">
                  Historique d’avancement
                </div>
                <div className="text-[12px] text-black/60">
                  Ce qui a été fait, ce qui arrive, les blocages.
                </div>
              </div>
              <SoftBadge tone="muted">
                {updates.length} update{updates.length > 1 ? 's' : ''}
              </SoftBadge>
            </div>

            {!updates?.length ? (
              <p className="text-[13px] opacity-70">
                Aucun update pour le moment.
              </p>
            ) : (
              <ol className="relative ml-2">
                {updates.map((u, idx) => (
                  <li
                    key={u.id}
                    className="pl-6 pb-8 last:pb-0 relative text-[13px] leading-relaxed"
                  >
                    <span className="absolute left-0 top-1.5 h-3 w-3 rounded-full bg-primary shadow-[0_0_20px_rgba(59,130,246,0.6)]" />
                    {idx !== updates.length - 1 && (
                      <span className="absolute left-[5px] top-5 bottom-0 w-[2px] bg-primary/20" />
                    )}
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <div className="flex flex-col gap-1">
                        <SoftBadge tone="primary">
                          {u.progress ?? 0}% fait
                        </SoftBadge>
                        {u.headline && (
                          <div className="text-[13px] font-medium leading-snug">
                            {u.headline}
                          </div>
                        )}
                      </div>
                      <div className="text-[11px] opacity-70 tabular-nums">
                        {new Date(u.created_at).toLocaleString('fr-FR')}
                      </div>
                    </div>
                    <div className="mt-4 grid md:grid-cols-3 gap-4">
                      <div className={SUBCARD}>
                        <div className="text-[11px] uppercase tracking-wide opacity-60 mb-2">
                          Fait
                        </div>
                        {u.done.length ? (
                          <ul className="list-disc list-inside space-y-1">
                            {u.done.map((d, i) => (
                              <li key={i}>{d}</li>
                            ))}
                          </ul>
                        ) : (
                          <div className="opacity-60">—</div>
                        )}
                      </div>
                      <div className={SUBCARD}>
                        <div className="text-[11px] uppercase tracking-wide opacity-60 mb-2">
                          À venir
                        </div>
                        {u.next.length ? (
                          <ul className="list-disc list-inside space-y-1">
                            {u.next.map((n, i) => (
                              <li key={i}>{n}</li>
                            ))}
                          </ul>
                        ) : (
                          <div className="opacity-60">—</div>
                        )}
                      </div>
                    </div>
                  </li>
                ))}
              </ol>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
