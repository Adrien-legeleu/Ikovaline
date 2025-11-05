// components/ClientSpace/Admin/_actions.ts
'use server';

import { revalidatePath } from 'next/cache';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000';

export type CreateProjectPayload = {
  clientEmail: string;
  clientName: string;
  inviteClient?: boolean;

  title?: string;
  description?: string;
  industry?: string;

  offerCategory?: string;
  offerTier?: string;
  offerPrice?: number;
  currency?: 'EUR' | 'USD';

  selectedOptions?: string[];

  wantsAds?: boolean;
  adsBudget?: number;

  startAt?: string; // ISO
  deadline?: string; // YYYY-MM-DD

  maintenanceType?: string;
  maintenanceStart?: string; // YYYY-MM-DD
  maintenanceEnd?: string; // YYYY-MM-DD

  repoUrl?: string;
  urls?: string[];

  briefFiles?: string[];
  signedContractFiles?: string[];

  devEmails?: string[];

  status?:
    | 'draft'
    | 'scheduled'
    | 'in_progress'
    | 'paused'
    | 'completed'
    | 'cancelled';
  billingStatus?: 'deposit_paid' | 'in_progress' | 'late' | 'paid_full';
  riskLevel?: 'normal' | 'attention' | 'urgent';
  priority?: 'low' | 'normal' | 'high' | 'critical';
  progress?: number;

  paymentTotal?: number;
  paymentCaptured?: number;
  paymentInstallments?: number;

  extra?: {
    languages?: string[];
    tone?: string[];
    goal?: string | null;
    domain?: string | null;
    client_links?: string[];
    contractSignedUrl?: string | null; // optionnel (legacy)
  };
};

function isValidEmail(s: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test((s ?? '').trim());
}

export async function createProjectAction(payload: CreateProjectPayload) {
  if (!payload.clientEmail || !isValidEmail(payload.clientEmail)) {
    return { ok: false, error: 'Email client invalide ou manquant.' };
  }
  if (!payload.clientName?.trim()) {
    return { ok: false, error: 'Le nom du client est requis.' };
  }

  const defaults = {
    inviteClient: true,
    currency: 'EUR' as const,
    selectedOptions: [] as string[],
    wantsAds: false,
    urls: [] as string[],
    briefFiles: [] as string[],
    signedContractFiles: [] as string[],
    devEmails: [] as string[],
    status: 'draft' as const,
    billingStatus: 'in_progress' as const,
    riskLevel: 'normal' as const,
    priority: 'normal' as const,
    progress: 0,
  };

  const raw = {
    clientEmail: payload.clientEmail.trim(),
    clientName: payload.clientName.trim(),
    inviteClient: payload.inviteClient ?? defaults.inviteClient,

    title: payload.title?.trim(),
    description: payload.description?.trim(),
    industry: payload.industry?.trim(),

    offer_category: payload.offerCategory,
    offer_tier: payload.offerTier,
    offer_price: payload.offerPrice,
    currency: payload.currency ?? defaults.currency,

    selected_options: payload.selectedOptions ?? defaults.selectedOptions,

    wants_ads: payload.wantsAds ?? defaults.wantsAds,
    ads_budget: payload.adsBudget,

    start_at: payload.startAt,
    deadline: payload.deadline,

    maintenance_type: payload.maintenanceType,
    maintenance_start: payload.maintenanceStart,
    maintenance_end: payload.maintenanceEnd,

    repo_url: payload.repoUrl?.trim(),
    urls: payload.urls ?? defaults.urls,

    brief_files: payload.briefFiles ?? defaults.briefFiles,
    signed_contract_files:
      payload.signedContractFiles ?? defaults.signedContractFiles,

    status: payload.status ?? defaults.status,
    billing_status: payload.billingStatus ?? defaults.billingStatus,
    risk_level: payload.riskLevel ?? defaults.riskLevel,
    priority: payload.priority ?? defaults.priority,
    progress:
      typeof payload.progress === 'number'
        ? payload.progress
        : defaults.progress,

    payment_total:
      typeof payload.paymentTotal === 'number'
        ? payload.paymentTotal
        : undefined,
    payment_captured:
      typeof payload.paymentCaptured === 'number'
        ? payload.paymentCaptured
        : undefined,
    payment_installments:
      typeof payload.paymentInstallments === 'number'
        ? payload.paymentInstallments
        : undefined,

    extra: payload.extra ?? {},
  };

  const body = Object.fromEntries(
    Object.entries(raw).filter(([, v]) => v !== undefined)
  );

  const resp = await fetch(`${SITE_URL}/api/admin/projects/create`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    cache: 'no-store',
    body: JSON.stringify(body),
  });

  let data: any;
  try {
    data = await resp.json();
  } catch {
    return { ok: false, error: 'Serveur: réponse invalide' };
  }

  if (!resp.ok || !data?.ok) {
    return { ok: false, error: data?.error || 'Création impossible' };
  }

  revalidatePath('/admin/projects');
  return {
    ok: true,
    project: data.project,
    invitedUserId: data.invitedUserId ?? null,
    invitationMode: data.invitationMode ?? null,
    warning: data.warning ?? null,
  };
}

// ----------------- UPDATE -----------------
export type UpdateProjectPayload = {
  id: string;
  title?: string | null;
  description?: string | null;

  status?:
    | 'draft'
    | 'scheduled'
    | 'in_progress'
    | 'paused'
    | 'completed'
    | 'cancelled';
  billing_status?: 'deposit_paid' | 'in_progress' | 'late' | 'paid_full';
  priority?: 'low' | 'normal' | 'high' | 'critical' | null;
  risk_level?: 'normal' | 'attention' | 'urgent' | null;
  progress?: number;

  client_email?: string | null;
  owner_user_id?: string | null;

  offer_category?: string | null;
  offer_tier?: string | null;
  offer_price?: number | null;
  currency?: 'EUR' | 'USD';

  start_at?: string | null;
  deadline?: string | null;

  maintenance_type?: string | null;
  maintenance_start?: string | null;
  maintenance_end?: string | null;

  repo_url?: string | null;
  urls?: string[];

  // colonnes directes
  selected_options?: string[];
  signed_contract_files?: string[];
  brief_files?: string[];
  // -> partent dans extra
  links?: string[];
  goal?: string | null;
  domain?: string | null;
  langs?: string[];
  tones?: string[];
  contractSignedUrl?: string | null; // optionnel (legacy)
};

export async function updateProjectAction(patch: UpdateProjectPayload) {
  if (!patch?.id) return { ok: false, error: 'id requis' };
  if (patch.client_email && !isValidEmail(patch.client_email)) {
    return { ok: false, error: 'Email client invalide.' };
  }

  // --- construit extra ---
  const extra: Record<string, any> = {};
  if (patch.langs) extra.languages = patch.langs;
  if (patch.tones) extra.tone = patch.tones;
  if ('goal' in patch) extra.goal = patch.goal ?? null;
  if ('domain' in patch) extra.domain = patch.domain ?? null;
  if (patch.links) extra.client_links = patch.links;
  if ('contractSignedUrl' in patch)
    extra.contractSignedUrl = patch.contractSignedUrl ?? null;

  // --- payload colonnes réelles ---
  const raw = {
    id: patch.id,
    title: patch.title?.trim(),
    description: patch.description ?? undefined,

    status: patch.status,
    billing_status: patch.billing_status,
    priority: patch.priority,
    risk_level: patch.risk_level,
    progress: typeof patch.progress === 'number' ? patch.progress : undefined,

    client_email: patch.client_email ?? undefined,
    owner_user_id: patch.owner_user_id ?? undefined,

    offer_category: patch.offer_category ?? undefined,
    offer_tier: patch.offer_tier ?? undefined,
    offer_price:
      patch.offer_price === null
        ? null
        : typeof patch.offer_price === 'number'
          ? patch.offer_price
          : undefined,
    currency: patch.currency,

    start_at: patch.start_at ?? undefined,
    deadline: patch.deadline ?? undefined,

    maintenance_type: patch.maintenance_type ?? undefined,
    maintenance_start: patch.maintenance_start ?? undefined,
    maintenance_end: patch.maintenance_end ?? undefined,

    repo_url: patch.repo_url ?? undefined,
    urls: patch.urls, // colonne

    selected_options: patch.selected_options, // colonne
    signed_contract_files: patch.signed_contract_files, // colonne
    brief_files: patch.brief_files,
    ...(Object.keys(extra).length ? { extra } : {}),
  };

  const body = Object.fromEntries(
    Object.entries(raw).filter(([, v]) => v !== undefined)
  );

  const resp = await fetch(`${SITE_URL}/api/admin/projects/update`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    cache: 'no-store',
    body: JSON.stringify(body),
  });

  let data: any = null;
  try {
    data = await resp.json();
  } catch {
    return { ok: false, error: 'Serveur: réponse invalide' };
  }

  if (!resp.ok || !data?.ok) {
    return { ok: false, error: data?.error || 'Mise à jour impossible' };
  }

  revalidatePath('/admin/projects');
  revalidatePath(`/admin/projects/${patch.id}`);

  return { ok: true, project: data.project };
}
