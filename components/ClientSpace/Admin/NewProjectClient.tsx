'use client';

import { useEffect, useMemo, useState, useTransition } from 'react';
import { motion, cubicBezier } from 'framer-motion';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';

import { createProjectAction } from '@/components/ClientSpace/Admin/_actions';
import { CATALOG, getVisibleOptions } from '@/lib/catalog';
import { supabase } from '@/lib/SupabaseClient';

// shadcn/ui
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';

// Icons
import {
  Plus,
  Calendar as CalIcon,
  Upload,
  X,
  UserPlus,
  UserMinus,
} from 'lucide-react';

// ================== LISTES METIER ==================
const LANG_LIST = ['FR', 'EN', 'ES', 'DE', 'IT', 'PT', 'AR', 'Autres'] as const;
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
] as const;
const GOAL_LIST = [
  'Leads',
  'Vente en ligne',
  'Notoriété',
  'Prise de RDV',
  'Recrutement',
  'Événement',
  'Support / Helpdesk',
  'Communauté',
  'Produit SaaS',
  'Catalogue',
  'Autre',
] as const;

type Dev = { email: string };

const ease = cubicBezier(0.16, 1, 0.3, 1);

const CARD =
  'rounded-[2rem] border border-neutral-200/60 dark:border-neutral-800/60 bg-white dark:bg-neutral-900 shadow-sm p-6 md:p-8';

// ========== SMALL REUSABLE UI ==========
function Section({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div className="mb-5">
      <h3 className="text-xl md:text-2xl font-semibold tracking-tight">
        {title}
      </h3>
      {subtitle ? (
        <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-400">
          {subtitle}
        </p>
      ) : null}
    </div>
  );
}

function Field({
  label,
  children,
  hint,
}: {
  label: string;
  children: React.ReactNode;
  hint?: string;
}) {
  return (
    <div className="space-y-2">
      <Label className="text-sm">{label}</Label>
      {children}
      {hint ? (
        <p className="text-xs text-neutral-500 dark:text-neutral-400">{hint}</p>
      ) : null}
    </div>
  );
}

function Chip({
  active,
  children,
  onClick,
}: {
  active?: boolean;
  children: React.ReactNode;
  onClick?: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        'rounded-3xl px-3 py-1.5 text-sm transition ring-1',
        active
          ? 'bg-primary text-white ring-primary/20'
          : 'bg-neutral-100/80 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-200 ring-neutral-200/50 dark:ring-neutral-700',
      ].join(' ')}
    >
      {children}
    </button>
  );
}

function DatePicker({
  value,
  onChange,
  placeholder = 'Choisir une date',
}: {
  value: Date | null;
  onChange: (d: Date | null) => void;
  placeholder?: string;
}) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className="w-full shadow-sm shadow-black/5 h-9 py-0 border-black/[0.04] justify-start"
        >
          <CalIcon className="mr-2 h-4 w-4" />
          {value ? format(value, 'd MMM yyyy', { locale: fr }) : placeholder}
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="p-0 border border-black/[0.04]  rounded-[2rem]"
        align="start"
      >
        <Calendar
          mode="single"
          selected={value ?? undefined}
          onSelect={(d) => onChange(d ?? null)}
          initialFocus
          locale={fr}
        />
      </PopoverContent>
    </Popover>
  );
}

// Upload helper
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
    if (!error) {
      paths.push(path);
    } else {
      console.warn(`Upload failed for ${f.name}`, error.message);
    }
  }
  return paths;
}

// ================== COMPONENT ==================
export default function NewProjectClient() {
  const [isPending, startTransition] = useTransition();
  const [toast, setToast] = useState<string | null>(null);

  // invite le client (création profil / envoi mail)
  const [inviteClient, setInviteClient] = useState<boolean>(true);

  // Client
  const [clientEmail, setClientEmail] = useState('');
  const [clientName, setClientName] = useState('');

  // Offre
  const [category, setCategory] = useState<keyof typeof CATALOG>('landing');
  const [tier, setTier] = useState(CATALOG['landing'].tiers[0].id);
  const [price, setPrice] = useState<number>(CATALOG['landing'].tiers[0].price);
  const [currency, setCurrency] = useState<'EUR' | 'USD'>('EUR');

  // Détails projet
  const [title, setTitle] = useState('');
  const [description, setDesc] = useState('');
  const [industry, setIndustry] = useState('');
  const [urls, setUrls] = useState<string>('');
  const [repoUrl, setRepoUrl] = useState('');

  // Ads
  const [wantsAds, setWantsAds] = useState(false);
  const [adsBudget, setAdsBudget] = useState<number>(0);

  // Planif
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [startTime, setStartTime] = useState<string>('09:00');
  const [deadlineDate, setDeadlineDate] = useState<Date | null>(null);

  // Maintenance
  const [maintenanceType, setMaintenanceType] = useState<string>('');
  const [maintenanceStart, setMaintenanceStart] = useState<Date | null>(null);
  const [maintenanceEnd, setMaintenanceEnd] = useState<Date | null>(null);

  // Équipe
  const [devs, setDevs] = useState<Dev[]>([]);
  const [devInput, setDevInput] = useState('');

  // Fichiers
  const [briefFiles, setBriefFiles] = useState<File[]>([]);
  const [signedFiles, setSignedFiles] = useState<File[]>([]);

  // Extras
  const ADMIN_EXTRA_OPTIONS = useMemo(
    () => [
      { id: 'priority_support', label: 'Support prioritaire' },
      { id: 'training', label: 'Session de formation' },
      { id: 'seo_boost', label: 'Audit SEO de départ' },
    ],
    []
  );
  const [selectedOptionIds, setSelectedOptionIds] = useState<string[]>([]);
  const [selectedAdminExtraIds, setSelectedAdminExtraIds] = useState<string[]>(
    []
  );

  // KPI/projet
  const [status, setStatus] = useState<
    'draft' | 'scheduled' | 'in_progress' | 'paused' | 'completed' | 'cancelled'
  >('in_progress');

  const [billingStatus, setBillingStatus] = useState<
    'deposit_paid' | 'in_progress' | 'late' | 'paid_full'
  >('deposit_paid');

  const [riskLevel, setRiskLevel] = useState<'normal' | 'attention' | 'urgent'>(
    'normal'
  );

  const [priority, setPriority] = useState<
    'low' | 'normal' | 'high' | 'critical'
  >('normal');

  const [progress, setProgress] = useState<number>(0);

  // Paiements
  const [paymentTotal, setPaymentTotal] = useState<number | ''>('');
  const [paymentCaptured, setPaymentCaptured] = useState<number | ''>('');
  const [paymentInstallments, setPaymentInstallments] = useState<number>(1);

  // Extra (langues / ton / goal)
  const [languages, setLanguages] = useState<string[]>([]);
  const [tones, setTones] = useState<string[]>([]);
  const [goal, setGoal] = useState<string>('');

  // dérivés
  const tiers = CATALOG[category].tiers;
  const visibleOptions = useMemo(
    () => getVisibleOptions(CATALOG[category], tier),
    [category, tier]
  );

  const onPickTier = (id: string) => {
    setTier(id as any);
    const t = tiers.find((x) => x.id === id);
    if (t) setPrice(t.price);
  };

  const toggleOption = (id: string) =>
    setSelectedOptionIds((cur) =>
      cur.includes(id) ? cur.filter((x) => x !== id) : [...cur, id]
    );

  const toggleAdminExtra = (id: string) =>
    setSelectedAdminExtraIds((cur) =>
      cur.includes(id) ? cur.filter((x) => x !== id) : [...cur, id]
    );

  const toggleLang = (id: string) =>
    setLanguages((cur) =>
      cur.includes(id) ? cur.filter((x) => x !== id) : [...cur, id]
    );

  const toggleTone = (id: string) =>
    setTones((cur) =>
      cur.includes(id) ? cur.filter((x) => x !== id) : [...cur, id]
    );

  const addDev = () => {
    const email = devInput.trim();
    if (!email) return;
    if (devs.some((d) => d.email.toLowerCase() === email.toLowerCase())) return;
    setDevs([...devs, { email }]);
    setDevInput('');
  };

  const removeDev = (email: string) =>
    setDevs(devs.filter((d) => d.email !== email));

  // auto-ajustements si terminé
  useEffect(() => {
    if (status === 'completed') {
      setProgress(100);
      setBillingStatus('paid_full');
      setInviteClient(false); // historique -> pas d'invite
    }
  }, [status]);

  // helpers date
  const combineStartAtISO = (): string | undefined => {
    if (!startDate) return undefined;
    const [h, m] = (startTime || '09:00').split(':').map((n) => Number(n));
    const d = new Date(startDate);
    d.setHours(h || 9, m || 0, 0, 0);
    return d.toISOString();
  };

  const toDateString = (d: Date | null): string | undefined =>
    d ? format(d, 'yyyy-MM-dd') : undefined;

  // reset après succès
  function softResetForm() {
    setClientEmail('');
    setClientName('');
    setInviteClient(true);

    setCategory('landing');
    setTier(CATALOG['landing'].tiers[0].id);
    setPrice(CATALOG['landing'].tiers[0].price);
    setCurrency('EUR');

    setTitle('');
    setDesc('');
    setIndustry('');
    setUrls('');
    setRepoUrl('');

    setWantsAds(false);
    setAdsBudget(0);

    setStartDate(null);
    setStartTime('09:00');
    setDeadlineDate(null);

    setMaintenanceType('');
    setMaintenanceStart(null);
    setMaintenanceEnd(null);

    setDevs([]);
    setDevInput('');

    setBriefFiles([]);
    setSignedFiles([]);

    setSelectedOptionIds([]);
    setSelectedAdminExtraIds([]);

    setStatus('in_progress');
    setBillingStatus('deposit_paid');
    setRiskLevel('normal');
    setPriority('normal');
    setProgress(0);

    setPaymentTotal('');
    setPaymentCaptured('');
    setPaymentInstallments(1);

    setLanguages([]);
    setTones([]);
    setGoal('');
  }

  // -------- SUBMIT ----------
  const onSubmit = () => {
    setToast(null);

    // sécurité front : check les champs minimum
    if (!clientEmail.trim() || !title.trim() || !price || !status) {
      setToast('Remplis au moins email, nom projet, prix, statut.');
      return;
    }

    startTransition(async () => {
      // 1) upload fichiers
      const briefPaths = await uploadFilesToBucket(
        'uploads',
        briefFiles,
        'briefs'
      );
      const signedPaths = await uploadFilesToBucket(
        'signed-pdfs',
        signedFiles,
        'contracts'
      );

      // 2) build propre : on enlève les champs vides
      const payload = {
        clientEmail: clientEmail.trim(),
        clientName: clientName.trim() || undefined,
        inviteClient,

        title: title.trim(),
        description: description.trim() || undefined,
        industry: industry.trim() || undefined,

        offerCategory: category,
        offerTier: tier,
        offerPrice: Number(price),
        currency,

        selectedOptions: [...selectedOptionIds, ...selectedAdminExtraIds],

        wantsAds,
        adsBudget: Number(adsBudget || 0),

        startAt: combineStartAtISO(),
        deadline: toDateString(deadlineDate),

        maintenanceType: maintenanceType || undefined,
        maintenanceStart: toDateString(maintenanceStart),
        maintenanceEnd: toDateString(maintenanceEnd),

        repoUrl: repoUrl.trim() || undefined,
        urls: urls
          ? urls
              .split('\n')
              .map((s) => s.trim())
              .filter(Boolean)
          : [],

        briefFiles: briefPaths,
        signedContractFiles: signedPaths,

        devEmails: devs.map((d) => d.email),

        status,
        billingStatus,
        riskLevel,
        priority,
        progress,

        paymentTotal:
          typeof paymentTotal === 'number' && !Number.isNaN(paymentTotal)
            ? paymentTotal
            : undefined,
        paymentCaptured:
          typeof paymentCaptured === 'number' && !Number.isNaN(paymentCaptured)
            ? paymentCaptured
            : undefined,
        paymentInstallments: Number.isFinite(paymentInstallments)
          ? paymentInstallments
          : 1,

        extra: {
          languages,
          tone: tones,
          goal: goal || null,
        },
      };

      const res = await createProjectAction(payload);

      if (res.ok) {
        setToast(
          inviteClient
            ? 'Projet créé • Invitation client envoyée ✅'
            : 'Projet enregistré ✅'
        );
        softResetForm();
      } else {
        setToast(res.error || 'Erreur inconnue.');
      }
    });
  };

  // ================== RENDER ==================
  return (
    <section className="mx-auto max-w-7xl px-4 md:px-8 pb-10 space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 10, filter: 'blur(8px)' }}
        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        transition={{ duration: 0.45, ease }}
        className="text-center"
      >
        <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 bg-primary/10 text-primary ring-1 ring-primary/20">
          <span className="text-xs font-medium tracking-wide">Admin</span>
          <span className="text-xs opacity-60">·</span>
          <span className="text-xs opacity-80">Nouveau projet</span>
        </div>
        <h1 className="mt-4 text-3xl md:text-5xl font-extrabold tracking-tight">
          Créer un projet
        </h1>
        <p className="mt-2 text-neutral-600 dark:text-neutral-400">
          Rattache un client, renseigne l’offre et les paramètres clés.
        </p>
      </motion.div>

      {/* Bandeau invite / historique */}
      <motion.div
        initial={{ opacity: 0, y: 8, filter: 'blur(6px)' }}
        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        transition={{ duration: 0.35, ease }}
        className={CARD}
      >
        <Section
          title="Mode de création"
          subtitle="Invite le client ou enregistre un projet terminé (historique) sans invitation."
        />

        <div className="flex items-center justify-between gap-4 rounded-xl bg-neutral-50 dark:bg-neutral-800/60 p-4">
          <div className="space-y-1">
            <div className="font-medium">
              Inviter le client & créer le profil
            </div>
            <div className="text-sm text-neutral-600 dark:text-neutral-400">
              Active pour envoyer une invitation; désactive pour un projet déjà
              bouclé (pas d’e-mail envoyé).
            </div>
          </div>
          <div className="flex items-center gap-3">
            <UserMinus
              className={`h-4 w-4 ${
                inviteClient ? 'opacity-40' : 'opacity-80'
              }`}
            />
            <Switch checked={inviteClient} onCheckedChange={setInviteClient} />
            <UserPlus
              className={`h-4 w-4 ${
                inviteClient ? 'opacity-80' : 'opacity-40'
              }`}
            />
          </div>
        </div>
      </motion.div>

      {/* CLIENT */}
      <motion.div
        initial={{ opacity: 0, y: 8, filter: 'blur(6px)' }}
        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        transition={{ duration: 0.35, ease }}
        className={CARD}
      >
        <Section
          title="Client"
          subtitle={
            inviteClient
              ? 'Une invitation sera envoyée si l’e-mail est inconnu.'
              : 'Aucune invitation ne sera envoyée.'
          }
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Field label="Email du client">
            <Input
              type="email"
              placeholder="client@domaine.com"
              value={clientEmail}
              onChange={(e) => setClientEmail(e.target.value)}
              required
            />
          </Field>
          <Field label="Nom (optionnel)">
            <Input
              placeholder="Ex. Jeanne Dupont"
              value={clientName}
              onChange={(e) => setClientName(e.target.value)}
            />
          </Field>
        </div>
      </motion.div>

      {/* OFFRE */}
      <motion.div
        initial={{ opacity: 0, y: 8, filter: 'blur(6px)' }}
        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        transition={{ duration: 0.35, ease }}
        className={CARD}
      >
        <Section
          title="Offre"
          subtitle="Catégorie & palier vendus (Starter, Premium, Ultra…)."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Field label="Catégorie">
            <Select
              value={category}
              onValueChange={(val: keyof typeof CATALOG) => {
                setCategory(val);
                setTier(CATALOG[val].tiers[0].id);
                setPrice(CATALOG[val].tiers[0].price);
              }}
            >
              <SelectTrigger>
                <SelectValue placeholder="Choisir..." />
              </SelectTrigger>
              <SelectContent>
                {Object.values(CATALOG).map((c) => (
                  <SelectItem key={c.id} value={c.id}>
                    {c.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </Field>

          <Field label="Offre (palier)">
            <div className="flex flex-wrap items-center gap-2">
              {tiers.map((t) => {
                const active = t.id === tier;
                return (
                  <Chip
                    key={t.id}
                    active={active}
                    onClick={() => onPickTier(t.id)}
                  >
                    {t.name}
                  </Chip>
                );
              })}
            </div>
          </Field>

          <Field label="Prix vendu">
            <div className="flex items-center gap-2">
              <Input
                type="number"
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
                required
              />
              <Select
                value={currency}
                onValueChange={(v: 'EUR' | 'USD') => setCurrency(v)}
              >
                <SelectTrigger className="w-[120px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="EUR">EUR</SelectItem>
                  <SelectItem value="USD">USD</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="text-xs text-neutral-500 mt-1">TTC</div>
          </Field>

          <Field label="Publicité">
            <div className="flex items-center justify-between rounded-xl bg-neutral-50 dark:bg-neutral-800/60 p-4">
              <div>
                <div className="text-sm font-medium">Campagne publicitaire</div>
                <div className="text-xs text-neutral-600 dark:text-neutral-400">
                  Active une gestion de budget mensuel.
                </div>
              </div>
              <Switch checked={wantsAds} onCheckedChange={setWantsAds} />
            </div>
            {wantsAds && (
              <div className="mt-3 flex items-center gap-2">
                <Input
                  type="number"
                  min={0}
                  placeholder="Ex. 300"
                  value={adsBudget}
                  onChange={(e) => setAdsBudget(Number(e.target.value))}
                />
                <span className="text-sm text-neutral-500">€/mois</span>
              </div>
            )}
          </Field>
        </div>

        {/* OPTIONS */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <div className="text-sm font-semibold mb-2">
              Options du catalogue
            </div>
            <div className="flex flex-wrap gap-2">
              {visibleOptions.map((o) => (
                <Chip
                  key={o.id}
                  active={selectedOptionIds.includes(o.id)}
                  onClick={() => toggleOption(o.id)}
                >
                  {o.label}
                </Chip>
              ))}
            </div>
          </div>

          <div>
            <div className="text-sm font-semibold mb-2">Extras Admin</div>
            <div className="flex flex-wrap gap-2">
              {ADMIN_EXTRA_OPTIONS.map((o) => (
                <Chip
                  key={o.id}
                  active={selectedAdminExtraIds.includes(o.id)}
                  onClick={() => toggleAdminExtra(o.id)}
                >
                  {o.label}
                </Chip>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      {/* DETAILS */}
      <motion.div
        initial={{ opacity: 0, y: 8, filter: 'blur(6px)' }}
        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        transition={{ duration: 0.35, ease }}
        className={CARD}
      >
        <Section title="Détails" subtitle="Contexte, références, dépôts…" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Field label="Titre du projet">
            <Input
              placeholder="Ex. Refonte site e-commerce"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </Field>

          <Field label="Secteur (optionnel)">
            <Input
              placeholder="Ex. Mode, B2B SaaS…"
              value={industry}
              onChange={(e) => setIndustry(e.target.value)}
            />
          </Field>
        </div>

        <div className="mt-4">
          <Field label="Description">
            <Textarea
              rows={5}
              placeholder="Contexte, objectifs, périmètre…"
              value={description}
              onChange={(e) => setDesc(e.target.value)}
            />
          </Field>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
          <Field label="Repo (optionnel)">
            <Input
              placeholder="https://github.com/…"
              value={repoUrl}
              onChange={(e) => setRepoUrl(e.target.value)}
            />
          </Field>

          <Field label="URLs de référence (1 par ligne)">
            <Textarea
              rows={3}
              placeholder="https://…"
              value={urls}
              onChange={(e) => setUrls(e.target.value)}
            />
          </Field>
        </div>

        {/* EXTRA: Lang / Tone / Goal */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          <div>
            <div className="text-sm font-semibold mb-2">Langues</div>
            <div className="flex flex-wrap gap-2">
              {LANG_LIST.map((l) => (
                <Chip
                  key={l}
                  active={languages.includes(l)}
                  onClick={() => toggleLang(l)}
                >
                  {l}
                </Chip>
              ))}
            </div>
          </div>

          <div>
            <div className="text-sm font-semibold mb-2">Ton</div>
            <div className="flex flex-wrap gap-2">
              {TONE_LIST.map((t) => (
                <Chip
                  key={t}
                  active={tones.includes(t)}
                  onClick={() => toggleTone(t)}
                >
                  {t}
                </Chip>
              ))}
            </div>
          </div>

          <Field label="Objectif principal">
            <Select value={goal} onValueChange={setGoal}>
              <SelectTrigger>
                <SelectValue placeholder="Choisir…" />
              </SelectTrigger>
              <SelectContent>
                {GOAL_LIST.map((g) => (
                  <SelectItem key={g} value={g}>
                    {g}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </Field>
        </div>
      </motion.div>

      {/* PLANIF + MAINTENANCE */}
      <motion.div
        initial={{ opacity: 0, y: 8, filter: 'blur(6px)' }}
        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        transition={{ duration: 0.35, ease }}
        className={CARD}
      >
        <Section
          title="Planification & Maintenance"
          subtitle="Dates clés & contrat de maintenance (facultatif)."
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Field label="Démarrage (date)">
            <DatePicker value={startDate} onChange={setStartDate} />
          </Field>

          <Field label="Heure de démarrage">
            <Input
              type="time"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
            />
          </Field>

          <Field label="Deadline">
            <DatePicker value={deadlineDate} onChange={setDeadlineDate} />
          </Field>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
          <Field label="Type de maintenance">
            <Select
              value={maintenanceType || undefined}
              onValueChange={setMaintenanceType}
            >
              <SelectTrigger>
                <SelectValue placeholder="—" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="mensuelle">Mensuelle</SelectItem>
                <SelectItem value="trimestrielle">Trimestrielle</SelectItem>
                <SelectItem value="annuelle">Annuelle</SelectItem>
                <SelectItem value="a_l_acte">À l’acte</SelectItem>
                <SelectItem value="forfait_illimite">
                  Forfait illimité
                </SelectItem>
                <SelectItem value="corrective">Corrective</SelectItem>
                <SelectItem value="preventive">Préventive</SelectItem>
                <SelectItem value="evolution">Évolutive</SelectItem>
                <SelectItem value="autre">Autre</SelectItem>
              </SelectContent>
            </Select>
          </Field>

          <Field label="Maint. début">
            <DatePicker
              value={maintenanceStart}
              onChange={setMaintenanceStart}
            />
          </Field>

          <Field label="Maint. fin">
            <DatePicker value={maintenanceEnd} onChange={setMaintenanceEnd} />
          </Field>
        </div>
      </motion.div>

      {/* KPI / STATUS / BILLING */}
      <motion.div
        initial={{ opacity: 0, y: 8, filter: 'blur(6px)' }}
        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        transition={{ duration: 0.35, ease }}
        className={CARD}
      >
        <Section
          title="Statut & Facturation"
          subtitle="Pilotage du projet (statut, avancement, facturation)."
        />

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Field label="Statut du projet">
            <Select value={status} onValueChange={(v: any) => setStatus(v)}>
              <SelectTrigger>
                <SelectValue placeholder="Statut…" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="draft">Brouillon</SelectItem>
                <SelectItem value="scheduled">Planifié</SelectItem>
                <SelectItem value="in_progress">En cours</SelectItem>
                <SelectItem value="paused">En pause</SelectItem>
                <SelectItem value="completed">Terminé</SelectItem>
                <SelectItem value="cancelled">Annulé</SelectItem>
              </SelectContent>
            </Select>
          </Field>

          <Field label="Facturation">
            <Select
              value={billingStatus}
              onValueChange={(v: any) => setBillingStatus(v)}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="deposit_paid">Acompte payé</SelectItem>
                <SelectItem value="in_progress">En cours</SelectItem>
                <SelectItem value="late">En retard</SelectItem>
                <SelectItem value="paid_full">Payé</SelectItem>
              </SelectContent>
            </Select>
          </Field>

          <Field label="Priorité">
            <Select value={priority} onValueChange={(v: any) => setPriority(v)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="low">Basse</SelectItem>
                <SelectItem value="normal">Normale</SelectItem>
                <SelectItem value="high">Haute</SelectItem>
                <SelectItem value="critical">Critique</SelectItem>
              </SelectContent>
            </Select>
          </Field>

          <Field label="Risque">
            <Select
              value={riskLevel}
              onValueChange={(v: any) => setRiskLevel(v)}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="normal">Normal</SelectItem>
                <SelectItem value="attention">Attention</SelectItem>
                <SelectItem value="urgent">Urgent</SelectItem>
              </SelectContent>
            </Select>
          </Field>
        </div>

        <div className="mt-6">
          <Label className="text-sm">Progression ({progress}%)</Label>
          <div className="mt-2 px-1">
            <Slider
              value={[progress]}
              min={0}
              max={100}
              step={1}
              onValueChange={(arr) => setProgress(arr[0] ?? 0)}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          <Field label="Total à facturer (€)">
            <Input
              type="number"
              value={paymentTotal}
              onChange={(e) =>
                setPaymentTotal(
                  e.target.value === '' ? '' : Number(e.target.value)
                )
              }
            />
          </Field>

          <Field label="Déjà encaissé (€)">
            <Input
              type="number"
              value={paymentCaptured}
              onChange={(e) =>
                setPaymentCaptured(
                  e.target.value === '' ? '' : Number(e.target.value)
                )
              }
            />
          </Field>

          <Field label="Échéances">
            <Select
              value={String(paymentInstallments)}
              onValueChange={(v) => setPaymentInstallments(Number(v))}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {[1, 2, 3, 4, 6, 12].map((n) => (
                  <SelectItem key={n} value={String(n)}>
                    {n}x
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </Field>
        </div>
      </motion.div>

      {/* FICHIERS & EQUIPE */}
      <motion.div
        initial={{ opacity: 0, y: 8, filter: 'blur(6px)' }}
        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        transition={{ duration: 0.35, ease }}
        className={CARD}
      >
        <Section title="Fichiers & Équipe" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Field label="Briefs (PDF/Images)">
            <div className="flex items-center gap-3">
              <Input
                type="file"
                multiple
                accept="application/pdf,image/*"
                onChange={(e) =>
                  setBriefFiles(Array.from(e.target.files ?? []))
                }
              />
              <Button
                type="button"
                variant="outline"
                className="shadow-sm border-black/5"
              >
                <Upload className="h-4 w-4 mr-2" />
                Importer
              </Button>
            </div>
            <div className="mt-1 text-xs text-neutral-500">
              {briefFiles.length
                ? `${briefFiles.length} fichier(s) sélectionné(s)`
                : '—'}
            </div>
          </Field>

          <Field label="Contrat signé (PDF)">
            <div className="flex items-center gap-3">
              <Input
                type="file"
                multiple
                accept="application/pdf"
                onChange={(e) =>
                  setSignedFiles(Array.from(e.target.files ?? []))
                }
              />
              <Button
                type="button"
                variant="outline"
                className="shadow-sm border-black/5"
              >
                <Upload className="h-4 w-4 mr-2" />
                Importer
              </Button>
            </div>
            <div className="mt-1 text-xs text-neutral-500">
              {signedFiles.length
                ? `${signedFiles.length} fichier(s) sélectionné(s)`
                : '—'}
            </div>
          </Field>
        </div>

        <div className="mt-6">
          <Label className="text-sm">Associer des développeurs</Label>
          <div className="mt-2 flex items-center gap-2">
            <Input
              placeholder="dev@ikovaline.com"
              value={devInput}
              onChange={(e) => setDevInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  addDev();
                }
              }}
            />
            <Button
              type="button"
              onClick={addDev}
              className="shadow-sm text-white"
            >
              <Plus className="h-4 w-4 mr-2" />
              Ajouter
            </Button>
          </div>

          {devs.length ? (
            <div className="mt-3 flex flex-wrap gap-2">
              {devs.map((d) => (
                <span
                  key={d.email}
                  className="inline-flex items-center gap-2 rounded-3xl px-3 py-1.5 text-sm bg-neutral-100 dark:bg-neutral-800 ring-1 ring-neutral-200/70 dark:ring-neutral-700"
                >
                  {d.email}
                  <button
                    onClick={() => removeDev(d.email)}
                    className="opacity-60 hover:opacity-100"
                    aria-label="Supprimer"
                    title="Supprimer"
                    type="button"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </span>
              ))}
            </div>
          ) : null}
        </div>
      </motion.div>

      {/* SUBMIT */}
      <div className="mt-8 flex justify-center">
        <Button
          disabled={
            isPending ||
            !clientEmail.trim() ||
            !title.trim() ||
            !price ||
            !status
          }
          onClick={onSubmit}
          className="px-8 py-6 text-base"
        >
          {isPending
            ? 'Création…'
            : inviteClient
              ? 'Créer & inviter'
              : 'Enregistrer'}
        </Button>
      </div>

      {/* TOAST */}
      {toast ? (
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="fixed bottom-6 right-6 rounded-2xl px-4 py-3 bg-neutral-900 text-white shadow-xl ring-1 ring-white/10"
        >
          {toast}
        </motion.div>
      ) : null}
    </section>
  );
}
