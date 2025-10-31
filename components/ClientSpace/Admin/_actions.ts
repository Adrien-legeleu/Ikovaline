'use server';

import { revalidatePath } from 'next/cache';

// IMPORTANT : URL absolue pour fetch interne
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000';

/**
 * Payload envoyé depuis le client.
 * -> Il contient plus d'info que ce qu'on va insérer direct en DB,
 *    notamment inviteClient (logique d'invite) et extra (lang/tone/goal).
 */
export type CreateProjectPayload = {
  // --- client / identité ---
  clientEmail: string; // requis côté action pour savoir à qui rattacher
  clientName?: string;
  inviteClient: boolean; // sert juste à décider si on invite / crée le compte

  // --- core projet ---
  title: string;
  description?: string;
  industry?: string;

  offerCategory: string;
  offerTier: string;
  offerPrice: number;
  currency: 'EUR' | 'USD';

  // options vendues
  selectedOptions: string[];

  // pub
  wantsAds: boolean;
  adsBudget?: number;

  // planning
  startAt?: string; // ISO
  deadline?: string; // YYYY-MM-DD

  // maintenance
  maintenanceType?: string;
  maintenanceStart?: string; // YYYY-MM-DD
  maintenanceEnd?: string; // YYYY-MM-DD

  // refs
  repoUrl?: string;
  urls: string[];

  // fichiers
  briefFiles: string[]; // storage paths
  signedContractFiles: string[]; // storage paths

  // équipe
  devEmails: string[];

  // KPI / statut / factu
  status:
    | 'draft'
    | 'scheduled'
    | 'in_progress'
    | 'paused'
    | 'completed'
    | 'cancelled';
  billingStatus: 'deposit_paid' | 'in_progress' | 'late' | 'paid_full';
  riskLevel: 'normal' | 'attention' | 'urgent';
  priority: 'low' | 'normal' | 'high' | 'critical';
  progress: number; // 0..100

  paymentTotal?: number;
  paymentCaptured?: number;
  paymentInstallments?: number; // int >=1

  // bloc extra qui part dans la colonne jsonb `extra`
  extra?: {
    languages?: string[];
    tone?: string[];
    goal?: string | null;
  };
};

/**
 * Action serveur appelée par le client.
 * Elle forward vers ton endpoint /api/admin/projects/create
 * qui fera réellement :
 *   - création projet dans table public.projects
 *   - si inviteClient === true => créer/associer user + envoyer invit
 *   - si inviteClient === false => juste créer le projet historique
 */
export async function createProjectAction(payload: CreateProjectPayload) {
  // sécurisation: enlever les champs vides/optionnels pour ne pas envoyer null inutilement
  const body = {
    // ---- champs DB directs ----
    clientEmail: payload.clientEmail,
    clientName: payload.clientName ?? undefined,

    title: payload.title,
    description: payload.description ?? undefined,
    industry: payload.industry ?? undefined,

    offer_category: payload.offerCategory,
    offer_tier: payload.offerTier,
    offer_price: payload.offerPrice,
    currency: payload.currency,

    selected_options: payload.selectedOptions ?? [],

    wants_ads: payload.wantsAds,
    ads_budget: payload.adsBudget ?? undefined,

    // planning
    start_at: payload.startAt ?? undefined,
    deadline: payload.deadline ?? undefined,

    // maintenance
    maintenance_type: payload.maintenanceType ?? undefined,
    maintenance_start: payload.maintenanceStart ?? undefined,
    maintenance_end: payload.maintenanceEnd ?? undefined,

    // refs
    repo_url: payload.repoUrl ?? undefined,
    urls: payload.urls ?? [],

    // fichiers
    brief_files: payload.briefFiles ?? [],
    signed_contract_files: payload.signedContractFiles ?? [],

    // billing / status / risk / priority
    status: payload.status,
    billing_status: payload.billingStatus,
    risk_level: payload.riskLevel,
    priority: payload.priority,
    progress: payload.progress,

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

    // pour ta colonne JSONB extra
    extra: payload.extra ?? {},

    /**
     * Note:
     * total_sold, payment_currency etc:
     * - total_sold ~ ce que tu as vendu => on peut mettre offer_price par défaut côté API
     * - payment_currency => on peut réutiliser currency
     * Tu peux en déduire tout ça côté route /api/admin/projects/create.
     */

    // ---- metadata logique côté backend ----
    inviteClient: payload.inviteClient, // <- info pour l'API (création compte client ou non)
    devEmails: payload.devEmails ?? [], // assigner équipe
  };

  const resp = await fetch(`${SITE_URL}/api/admin/projects/create`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    cache: 'no-store',
    body: JSON.stringify(body),
  });

  let data: any;
  try {
    data = await resp.json();
  } catch (e) {
    console.error('Invalid JSON from /api/admin/projects/create', e);
    return { ok: false, error: 'Serveur: réponse invalide' };
  }

  if (!resp.ok || !data?.ok) {
    console.error('Project create failed', data);
    return {
      ok: false,
      error: data?.error || 'Création impossible',
    };
  }

  // invalider les listes côté admin si besoin
  revalidatePath('/admin/projects');

  return {
    ok: true,
    project: data.project,
    invitedUserId: data.invitedUserId ?? null,
    invitationMode: data.invitationMode ?? null,
    warning: data.warning ?? null,
  };
}
