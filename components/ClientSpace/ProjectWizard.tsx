'use client';

import { useMemo, useState, useEffect, useRef } from 'react';
import { AnimatePresence, motion, cubicBezier } from 'framer-motion';
import { supabase } from '@/lib/SupabaseClient';
import { cn } from '@/lib/utils';
import WizardPricingSelector, {
  type OnboardingPricing,
} from './WizardPricingSelector';
import FileUploader from './FileUploader';
import SignStep from './SignStep';
import PayStep from './PayStep';
import {
  IconArrowLeft,
  IconBuilding,
  IconCalendar,
  IconChevronDown,
  IconMail,
  IconPhone,
  IconUser,
} from '@tabler/icons-react';
import Link from 'next/link';
import { Popover, PopoverTrigger, PopoverContent } from '../ui/popover';
import { Button } from '../ui/button';
import { Calendar } from '@/components/ui/calendar';
import { format, addDays } from 'date-fns';
import { fr } from 'date-fns/locale';
import Image from 'next/image';
import AutoConfettiFireworks from './AutoConfettiFireworks';

// ★ import catalog helpers pour deadline
import { CATALOG, calcTotals } from '@/lib/catalog/onboarding';
import PayStepRib from './PayStepRib';

const FM_EASE = cubicBezier(0.16, 1, 0.3, 1);

type WizardStep =
  | 'profile'
  | 'questions'
  | 'pricing'
  | 'sign'
  | 'pay'
  | 'review';

type Props = {
  includeProfileStep?: boolean;
  onDone?: (projectId: string) => void;
  onStepChange?: (step: WizardStep) => void;
};

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
];

const LS_KEY = 'ikova_wizard_v3'; // ★ nouveau

const stepVariants = {
  initial: { opacity: 0, y: 18, filter: 'blur(8px)', scale: 0.995 },
  in: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    scale: 1,
    transition: { duration: 0.55, ease: FM_EASE },
  },
  out: {
    opacity: 0,
    y: -14,
    filter: 'blur(8px)',
    scale: 0.995,
    transition: { duration: 0.4, ease: FM_EASE },
  },
};

const NEUMO_CARD =
  'relative rounded-[2rem] bg-[#ffffff] dark:bg-[#0e1116] shadow-[14px_14px_36px_#d7dce6,-14px_-14px_36px_#ffffff] dark:shadow-[14px_14px_36px_rgba(0,0,0,0.55),-14px_-14px_36px_rgba(255,255,255,0.03)]';
const NEUMO_FIELD =
  'h-12 w-full text-sm pl-11 pr-3 rounded-[1.1rem] bg-black/[0.04] dark:bg:white/5 dark:text-white dark:shadow-[inset_3px_3px_8px_rgba(0,0,0,0.35),inset_-3px_-3px_8px_rgba(255,255,255,0.05)] outline-none focus:outline-none focus:ring-2 ring-primary/40 transition';

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];
const fadeUp = {
  hidden: { opacity: 0, y: 14, filter: 'blur(6px)' },
  show: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.5, ease: EASE },
  },
};
const staggerCol = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.06 } },
};

export default function ProjectWizard({
  includeProfileStep = true,
  onDone,
  onStepChange,
}: Props) {
  const didRestoreRef = useRef(false);
  const [forcedStep, setForcedStep] = useState<WizardStep | null>(null);

  const steps: WizardStep[] = useMemo(
    () =>
      includeProfileStep
        ? ['profile', 'questions', 'pricing', 'sign', 'pay', 'review']
        : ['questions', 'pricing', 'sign', 'pay', 'review'],
    [includeProfileStep]
  );
  const initialStep: WizardStep = includeProfileStep ? 'profile' : 'questions';
  const [step, setStep] = useState<WizardStep>(initialStep);
  const idx = steps.indexOf(step);
  const progress = Math.round((idx / (steps.length - 1)) * 100);

  const [submissionId, setSubmissionId] = useState<string | null>(null);
  const [sessionUserId, setSessionUserId] = useState<string | null>(null);
  const [sessionEmail, setSessionEmail] = useState<string | null>(null);

  const [profileErr, setProfileErr] = useState<string | null>(null);

  // profile
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [company, setCompany] = useState('');

  // questions
  const [audience, setAudience] = useState<'B2B' | 'B2C' | 'Mix' | ''>('');
  const [goal, setGoal] = useState<string>('');
  const [languages, setLanguages] = useState<string[]>(['FR']);
  const [tone, setTone] = useState<string[]>(['Premium', 'Minimal']);
  const [hasDomain, setHasDomain] = useState<boolean>(false);
  const [domain, setDomain] = useState('');
  const [urls, setUrls] = useState<string[]>(['', '', '']);
  const [startDate, setStartDate] = useState<string>('');
  const [assets, setAssets] = useState<
    { id: string; file_url: string; filename: string }[]
  >([]);
  const [links, setLinks] = useState<string[]>(['']);

  // ★ pricing (nouveau modèle)
  const [pricing, setPricing] = useState<OnboardingPricing>({
    categoryId: 'landing',
    tierId: 'starter',
    selection: { toggles: new Set(), radios: {}, qty: {} },
    adsBudget: 0,
    totalEuros: 0,
    delayDays: 7,
    kpi: { traffic: [0, 0], convRate: [0, 0], leads: [0, 0] },
  });

  const [saving, setSaving] = useState(false);
  const [projectId, setProjectId] = useState<string | null>(null);
  const [finishingPayment, setFinishingPayment] = useState(false);
  const [payErr, setPayErr] = useState<string | null>(null);
  const [celebrateKey, setCelebrateKey] = useState<number>(0);

  /* ---------- Session ---------- */
  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setSessionUserId(data.user?.id ?? null);
      setSessionEmail(data.user?.email ?? null);
    });
  }, []);

  /* ---------- URL init ---------- */
  useEffect(() => {
    const sp = new URLSearchParams(window.location.search);
    const sid = sp.get('sid');
    const stepQ = sp.get('step') as WizardStep | null;
    if (sid) {
      setSubmissionId(sid);
      try {
        localStorage.setItem('submissionId', sid);
      } catch {}
    }
    if (stepQ && steps.includes(stepQ)) {
      setForcedStep(stepQ);
      setStep(stepQ);
      didRestoreRef.current = true;
      try {
        const raw = localStorage.getItem(LS_KEY);
        const prev = raw ? JSON.parse(raw) : {};
        localStorage.setItem(LS_KEY, JSON.stringify({ ...prev, step: stepQ }));
      } catch {}
    }
    setTimeout(() => setForcedStep(null), 0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [steps.length]);

  /* ---------- Restore ---------- */
  useEffect(() => {
    if (didRestoreRef.current) return;
    const raw = localStorage.getItem(LS_KEY);
    if (!raw) {
      didRestoreRef.current = true;
      return;
    }
    try {
      const s = JSON.parse(raw);
      setFullName(s.fullName ?? '');
      setEmail(s.email ?? '');
      setPhone(s.phone ?? '');
      setCompany(s.company ?? '');
      setAudience(s.audience ?? '');
      setGoal(s.goal ?? '');
      setLanguages(s.languages ?? ['FR']);
      setTone(s.tone ?? ['Premium', 'Minimal']);
      setHasDomain(s.hasDomain ?? false);
      setDomain(s.domain ?? '');
      setUrls(s.urls ?? ['', '', '']);
      setStartDate(s.startDate ?? '');
      // ★ restore pricing safely (rebuild Set)
      if (s.pricing) {
        setPricing({
          ...s.pricing,
          selection: {
            toggles: new Set<string>(
              Array.isArray(s.pricing.selection?.toggles)
                ? s.pricing.selection.toggles
                : []
            ),
            radios: s.pricing.selection?.radios ?? {},
            qty: s.pricing.selection?.qty ?? {},
          },
        });
      }
      setProjectId(s.projectId ?? null);
      if (!forcedStep && s.step && steps.includes(s.step)) setStep(s.step);
    } catch {}
    didRestoreRef.current = true;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [forcedStep, steps.length]);

  /* ---------- Persist ---------- */
  useEffect(() => {
    const payload = {
      step,
      projectId,
      fullName,
      email,
      phone,
      company,
      audience,
      goal,
      languages,
      tone,
      hasDomain,
      domain,
      urls,
      startDate,
      pricing: {
        ...pricing,
        selection: {
          toggles: Array.from(pricing.selection.toggles),
          radios: pricing.selection.radios,
          qty: pricing.selection.qty,
        },
      },
    };
    try {
      localStorage.setItem(LS_KEY, JSON.stringify(payload));
    } catch {}
  }, [
    step,
    projectId,
    fullName,
    email,
    phone,
    company,
    audience,
    goal,
    languages,
    tone,
    hasDomain,
    domain,
    urls,
    startDate,
    pricing,
  ]);

  /* ---------- Notifier parent ---------- */
  useEffect(() => {
    onStepChange?.(step);
  }, [step, onStepChange]);

  /* ---------- Assurer un sid quand requis ---------- */
  useEffect(() => {
    if (
      (step === 'sign' || step === 'pay' || step === 'review') &&
      !submissionId
    ) {
      const sid = localStorage.getItem('submissionId');
      if (sid) setSubmissionId(sid);
      else setStepUI('pricing');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [step, submissionId]);

  /* ---------- setStepUI centralisé ---------- */
  const setStepUI = (next: WizardStep) => {
    setStep(next);
    if (typeof window !== 'undefined') {
      const url = new URL(window.location.href);
      if (
        next === 'sign' ||
        next === 'pricing' ||
        next === 'questions' ||
        next === 'profile'
      ) {
        url.searchParams.delete('step');
      } else {
        url.searchParams.set('step', next);
      }
      history.replaceState(null, '', url.toString());
    }
    try {
      const raw = localStorage.getItem(LS_KEY);
      const prev = raw ? JSON.parse(raw) : {};
      localStorage.setItem(LS_KEY, JSON.stringify({ ...prev, step: next }));
    } catch {}
  };

  const goNext = () => setStepUI(steps[Math.min(idx + 1, steps.length - 1)]);
  const goPrev = () => setStepUI(steps[Math.max(idx - 1, 0)]);

  /* ---------- Garde-fous navigation ---------- */

  // 1) PAY requiert PDF signé → sinon retour SIGN
  useEffect(() => {
    const checkPdf = async () => {
      if (step !== 'pay' || !submissionId) return;
      const ls = localStorage.getItem('signedPdfUrl');
      if (ls) return;
      const { data, error } = await supabase
        .from('submissions')
        .select('signed_pdf_url')
        .eq('id', submissionId)
        .maybeSingle();
      const pdf = error ? null : (data?.signed_pdf_url ?? null);
      if (!pdf) setStepUI('sign');
    };
    checkPdf();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [step, submissionId]);

  // 2) Email submission cohérent
  useEffect(() => {
    const verifyEmail = async () => {
      if (!submissionId || (step !== 'sign' && step !== 'pay')) return;
      const { data, error } = await supabase
        .from('submissions')
        .select('email')
        .eq('id', submissionId)
        .maybeSingle();
      if (error) return;
      const expected = includeProfileStep
        ? (email || '').trim()
        : (sessionEmail || '').trim();
      const subEmail = (data?.email || '').trim();
      if (!expected) return;
      if (
        subEmail &&
        expected &&
        subEmail.toLowerCase() !== expected.toLowerCase()
      ) {
        try {
          localStorage.removeItem('submissionId');
          localStorage.removeItem('signedPdfUrl');
        } catch {}
        setSubmissionId(null);
        alert(
          "L'e-mail de la demande ne correspond pas à l'e-mail courant. On repart à l’étape de profil."
        );
        setStepUI(includeProfileStep ? 'profile' : 'questions');
      }
    };
    verifyEmail();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [step, submissionId, email, sessionEmail, includeProfileStep]);

  /* ---------- Helpers ---------- */
  function smartTitle() {
    if (hasDomain && domain) return `Site ${domain}`;
    if (company) return `Projet ${company}`;
    return 'Nouveau projet';
  }
  function isLocalProgressValid() {
    if (includeProfileStep) {
      if (!email?.trim()) return false;
    }
    if (!audience || !goal || !startDate) return false;
    if (!pricing?.tierId || !pricing?.categoryId) return false;
    return true;
  }

  useEffect(() => {
    if (!['pricing', 'sign', 'pay', 'review'].includes(step)) return;
    if (!isLocalProgressValid()) {
      try {
        localStorage.removeItem(LS_KEY);
        localStorage.removeItem('submissionId');
        localStorage.removeItem('signedPdfUrl');
      } catch {}
      setSubmissionId(null);
      setStepUI(includeProfileStep ? 'profile' : 'questions');
      if (typeof window !== 'undefined')
        console.warn('[wizard] Données locales manquantes → reset');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    step,
    audience,
    goal,
    startDate,
    pricing?.tierId,
    pricing?.categoryId,
    email,
    includeProfileStep,
  ]);

  function buildSummary() {
    const cat = CATALOG[pricing.categoryId];
    const tier = cat.tiers.find((t) => t.id === pricing.tierId);

    // map options sélectionnées -> leurs labels réels du CATALOG
    const visibleOpts = cat.options;
    const pickedLabels: string[] = [];

    // toggles
    pricing.selection.toggles.forEach((id) => {
      const def = visibleOpts.find((o) => o.id === id);
      if (def) pickedLabels.push(def.label);
    });

    // radios
    Object.values(pricing.selection.radios).forEach((id) => {
      if (!id) return;
      const def = visibleOpts.find((o) => o.id === id);
      if (def) pickedLabels.push(def.label);
    });

    // qty
    Object.entries(pricing.selection.qty).forEach(([id, qty]) => {
      const q = qty ?? 0;
      if (q > 0) {
        const def = visibleOpts.find((o) => o.id === id);
        if (def) {
          // ex: "Maintenance annuelle x3"
          pickedLabels.push(`${def.label} x${q}`);
        }
      }
    });

    // domaine: "oui"/"non"
    const domainAnswer = hasDomain ? 'oui' : 'non';

    return {
      project: {
        // plus de title; on expose domaine et début
        domainStatus: domainAnswer, // "oui" / "non"
        domainName: hasDomain && domain ? domain : null,
        startAt: startDate || null,
        audience,
        goal,
      },
      client: {
        fullName,
        email: (includeProfileStep ? email : sessionEmail) || null,
        phone,
        company,
      },
      pricing: {
        categoryId: pricing.categoryId, // "landing"
        categoryName: cat?.name ?? '', // "Landing Page"
        tierId: pricing.tierId, // "starter"
        tierName: tier?.name ?? '', // "Starter"
        totalEuros: pricing.totalEuros, // TTC final
        adsBudget: cat.hasAdsBudget ? pricing.adsBudget : 0,
        optionLabels: pickedLabels, // labels lisibles
      },
    };
  }

  // ★ Création submission minimale (PLUS DE payload en DB)
  async function ensureSubmission() {
    if (submissionId) return submissionId;

    // 1. retrouver catégorie + tier pour récupérer le prix de base et la desc
    const cat = CATALOG[pricing.categoryId];
    const tier = cat.tiers.find((t) => t.id === pricing.tierId);
    if (!tier) {
      throw new Error('Offre invalide (tier introuvable).');
    }

    const basePrice = tier.price; // numeric
    const offerDesc = `${cat.name} – ${tier.name}`;

    // 2. options sélectionnées -> array<string>
    const selectedOptions: string[] = (() => {
      const arr: string[] = [];

      // toggles
      pricing.selection.toggles.forEach((optId) => {
        arr.push(optId);
      });

      // radios
      Object.values(pricing.selection.radios).forEach((optId) => {
        if (optId) arr.push(optId);
      });

      // qty
      Object.entries(pricing.selection.qty).forEach(([optId, qty]) => {
        if ((qty ?? 0) > 0) {
          arr.push(optId); // tu pourrais faire `${optId}x${qty}`, mais simple pour l’instant
        }
      });

      return arr;
    })();

    // 3. brief_files = URLs uploadées
    const briefFilesUrls = assets.map((a) => a.file_url);

    // 4. wants_ads + ads_budget
    const wantsAds = cat.hasAdsBudget && pricing.adsBudget > 0 ? true : false;
    const adsBudgetNum = wantsAds ? pricing.adsBudget : 0;

    // 5. construire l'insert qui colle AU SCHÉMA
    const insertData: any = {
      full_name: fullName || null,
      email: includeProfileStep ? email || null : sessionEmail || null,
      phone: phone || null,
      company: company || null,

      audience: audience || null,
      goal: goal || null,
      languages: languages ?? [],
      tone: tone ?? [],
      start_at: startDate || null, // "yyyy-MM-dd" -> Supabase cast vers date OK
      urls: urls ?? [],
      links: links ?? [],
      has_domain: hasDomain,
      domain: domain || null,

      offer_category: pricing.categoryId, // ex 'landing'
      offer_tier: pricing.tierId, // ex 'starter'
      offer_price: basePrice, // prix du tier seul
      offer_description: offerDesc, // "Landing Page – Pro"
      selected_options: selectedOptions,
      est_total: pricing.totalEuros, // total TTC estimé
      currency: 'EUR',

      wants_ads: wantsAds,
      ads_budget: adsBudgetNum,

      brief_files: briefFilesUrls,
      contract_files: [],
      signed_contract_files: [],

      // contract_status: 'pending', // default
      // payment_*: null / default -> on laisse Supabase mettre les défauts
      status: 'pending',
    };

    const { data, error } = await supabase
      .from('submissions')
      .insert(insertData)
      .select('id')
      .single();

    if (error) throw error;

    setSubmissionId(data.id);
    try {
      localStorage.setItem('submissionId', data.id);
    } catch {}

    return data.id;
  }

  // ★ After payment → créer PROJECT
  async function createProjectAfterPaid(subId: string) {
    // Calcule la deadline à partir de la catégorie/tier/options
    const cat = CATALOG[pricing.categoryId];
    const tier = cat.tiers.find((t) => t.id === pricing.tierId)!;
    const { delayDays } = calcTotals(
      cat,
      tier,
      pricing.selection,
      pricing.adsBudget
    );

    const startsAt = new Date(startDate + 'T00:00:00');
    const deadline = addDays(startsAt, Math.max(0, delayDays));

    // Insertion projet — ajuste les noms de colonnes si besoin côté DB
    const insertObj: any = {
      title: smartTitle(),
      status: 'signed_paid',
      progress: 0,
      tier: pricing.tierId,
      category: pricing.categoryId,
      client_email: includeProfileStep ? email : sessionEmail,
      starts_at: startsAt.toISOString(),
      deadline: deadline.toISOString(),
      price_euros: pricing.totalEuros,
      ads_budget: cat.hasAdsBudget ? pricing.adsBudget : 0,
      submission_id: subId,
      // Tu peux stocker l’instantané “brief” côté projets si tu veux le retrouver facilement
      brief: buildSummary(), // ok d’avoir un JSON côté projects
    };

    const { data, error } = await supabase
      .from('projects')
      .insert(insertObj)
      .select('id')
      .single();

    if (error) throw error;
    setProjectId(data.id);
    onDone?.(data.id);
    return data.id;
  }

  async function continueFromProfile() {
    setProfileErr(null);
    const em = email.trim();
    if (!em) {
      setProfileErr('Merci d’indiquer un email.');
      return;
    }

    // ⇣⇣⇣ check supabase
    const { data, error } = await supabase
      .from('profiles')
      .select('id')
      .eq('email', em)
      .maybeSingle();

    if (error) {
      setProfileErr(error.message);
      return;
    }

    if (data?.id) {
      setProfileErr(
        'Un compte existe déjà avec cet email. Connecte-toi pour continuer.'
      );
      return;
    }

    setStepUI('questions');
  }

  const canNextProfile = includeProfileStep ? !!email.trim() : true;
  const canNextQuestions = !!audience && !!goal && !!startDate;
  async function handleBankConfirmed() {
    if (finishingPayment) return;
    setFinishingPayment(true);
    setPayErr(null);

    try {
      // 1. s'assurer qu'on a bien une submission en base
      const sid = await ensureSubmission();
      if (!sid) throw new Error("Pas d'ID submission.");

      // 2. marquer submission comme 'bank_transfer_initiated'
      const { error: upErr } = await supabase
        .from('submissions')
        .update({
          payment_status: 'bank_transfer_initiated',
        })
        .eq('id', sid);

      if (upErr) {
        console.warn('[wizard] could not update payment_status', upErr.message);
      }
      setCelebrateKey(Date.now());

      // 4. go écran review
      setStepUI('review');
    } catch (e: any) {
      console.error(e);
      setPayErr(
        e?.message || 'Erreur interne pendant la validation du paiement.'
      );
    } finally {
      setFinishingPayment(false);
    }
  }

  function ComboPopover({
    value,
    onChange,
    options,
    placeholder = 'Choisir…',
  }: {
    value: string;
    onChange: (v: string) => void;
    options: string[];
    placeholder?: string;
  }) {
    const [open, setOpen] = useState(false);
    return (
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <button
            type="button"
            className="w-full h-11 px-3 rounded-2xl justify-between inline-flex items-center text-left bg-black/[0.04] dark:bg-white/10 hover:bg-black/[0.07] dark:hover:bg-white/15 border-0 ring-0 outline-none shadow-none transition"
          >
            <span
              className={!value ? 'text-muted-foreground truncate' : 'truncate'}
            >
              {value || placeholder}
            </span>
            <IconChevronDown className="h-4 w-4 opacity-70" />
          </button>
        </PopoverTrigger>
        <PopoverContent
          align="start"
          className="p-2 border-0 rounded-[1.1rem] backdrop-blur-md bg-white/95 dark:bg-neutral-900/95 shadow-[0_20px_60px_rgba(0,0,0,.12)]"
        >
          <div className="max-h-64 overflow-auto p-1">
            {options.map((opt) => {
              const active = value === opt;
              return (
                <button
                  key={opt}
                  type="button"
                  onClick={() => {
                    onChange(opt);
                    setOpen(false);
                  }}
                  className={[
                    'w-full text-left px-3 py-2 rounded-[0.9rem] transition',
                    'bg-transparent hover:bg-black/[0.06] dark:hover:bg-white/15',
                    active
                      ? 'bg-primary/15 text-primary hover:bg-primary/20'
                      : '',
                    'outline-none focus:outline-none ring-0',
                  ].join(' ')}
                >
                  {opt}
                </button>
              );
            })}
          </div>
        </PopoverContent>
      </Popover>
    );
  }

  /* ---------- Render ---------- */
  return (
    <motion.div className="relative w-full h-full flex flex-col min-h-0" layout>
      {/* Top bar */}
      <div className="max-w-3xl w-full mx-auto">
        <div className="sticky top-0 z-30 w-full -mx-2 md:mx-0 px-2 md:px-0 pt-2 pb-3 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="mb-2 flex items-center justify-between gap-2">
            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-[1.1rem] px-3 py-2 bg-white/60 dark:bg-neutral-900/60 backdrop-blur-xl hover:bg-white/80 dark:hover:bg-neutral-900/80 transition shadow-[0_8px_30px_rgba(0,0,0,0.06)]"
              aria-label="Retour"
            >
              <IconArrowLeft className="h-4 w-4" />
              <span className="text-sm font-medium">Retour</span>
            </Link>

            <div className="flex items-center gap-2">
              <span className="text-[11px] tracking-[0.18em] uppercase text-muted-foreground">
                Progression
              </span>
              <span className="inline-flex items-center rounded-full px-3 py-2 text-xs font-medium bg-foreground/[0.06] dark:bg-white/10">
                Étape {idx + 1} / {steps.length}
              </span>
            </div>

            {idx > 0 && step !== 'review' ? (
              <button
                type="button"
                onClick={goPrev}
                className="text-sm px-3 py-2 flex gap-2 items-center rounded-[1.1rem] bg-foreground/[0.06] hover:bg-foreground/[0.1] dark:bg-white/10 dark:hover:bg-white/15 transition"
              >
                <IconArrowLeft className="h-4 w-4" /> Étape précédente
              </button>
            ) : (
              <span className="w-[142px]" />
            )}
          </div>

          <div className="h-2 rounded-full bg-foreground/[0.06] dark:bg-white/10 overflow-hidden relative">
            <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-white/20 to-transparent" />
            <motion.div
              className="h-full rounded-full relative"
              style={{ width: `${progress}%` }}
              animate={{ width: `${progress}%` }}
              transition={{ type: 'spring', stiffness: 220, damping: 28 }}
            >
              <div className="absolute inset-0 bg-primary" />
              <div className="absolute inset-0 bg-gradient-to-r from-primary to-blue-500 mix-blend-overlay" />
              <div className="absolute -inset-x-4 -inset-y-1 blur-xl bg-primary/30 pointer-events-none" />
            </motion.div>
          </div>
        </div>
      </div>

      {/* Steps */}
      <AnimatePresence mode="wait" initial={false}>
        {/* PROFILE */}
        {includeProfileStep && step === 'profile' && (
          <motion.div
            key="step-profile"
            variants={stepVariants}
            initial="initial"
            animate="in"
            exit="out"
            className="flex-1 grid place-items-center py-6"
          >
            <motion.div
              variants={staggerCol}
              initial="hidden"
              animate="show"
              className="w-full max-w-xl"
            >
              <motion.div
                variants={fadeUp}
                className={cn(NEUMO_CARD, 'p-6 md:p-8')}
              >
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0 rounded-[2rem]"
                  style={{
                    boxShadow:
                      'inset 1px 1px 0 rgba(255,255,255,0.9), inset -1px -1px 0 rgba(0,0,0,0.03)',
                  }}
                />
                <motion.div
                  variants={fadeUp}
                  className="text-center mb-6 relative z-10"
                >
                  <div className="text-[11px] tracking-[0.18em] text-muted-foreground uppercase">
                    Profil
                  </div>
                  <h2 className="text-2xl md:text-3xl font-semibold mt-1">
                    Tes coordonnées
                  </h2>
                  <p className="text-sm text-muted-foreground mt-1">
                    Pour préparer la suite et t’envoyer les bons éléments.
                  </p>
                </motion.div>

                <div className="relative z-10 space-y-5">
                  <motion.label variants={fadeUp} className="block">
                    <span className="sr-only">Nom complet</span>
                    <div className="relative">
                      <span className="absolute inset-y-0 left-3 flex items-center text-muted-foreground">
                        <IconUser className="h-5 w-5" />
                      </span>
                      <input
                        className={NEUMO_FIELD}
                        placeholder="Nom complet"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        autoComplete="name"
                      />
                    </div>
                  </motion.label>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <motion.label variants={fadeUp} className="block">
                      <span className="sr-only">Email</span>
                      <div className="relative">
                        <span className="absolute inset-y-0 left-3 flex items-center text-muted-foreground">
                          <IconMail className="h-5 w-5" />
                        </span>
                        <input
                          className={NEUMO_FIELD}
                          placeholder="Email"
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          autoComplete="email"
                        />
                      </div>
                    </motion.label>

                    <motion.label variants={fadeUp} className="block">
                      <span className="sr-only">Téléphone</span>
                      <div className="relative">
                        <span className="absolute inset-y-0 left-3 flex items-center text-muted-foreground">
                          <IconPhone className="h-5 w-5" />
                        </span>
                        <input
                          className={NEUMO_FIELD}
                          placeholder="Téléphone"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          autoComplete="tel"
                        />
                      </div>
                    </motion.label>
                  </div>

                  <motion.label variants={fadeUp} className="block">
                    <span className="sr-only">Entreprise</span>
                    <div className="relative">
                      <span className="absolute inset-y-0 left-3 flex items-center text-muted-foreground">
                        <IconBuilding className="h-5 w-5" />
                      </span>
                      <input
                        className={NEUMO_FIELD}
                        placeholder="Entreprise (optionnel)"
                        value={company}
                        onChange={(e) => setCompany(e.target.value)}
                        autoComplete="organization"
                      />
                    </div>
                  </motion.label>
                </div>

                {profileErr && (
                  <motion.p
                    variants={fadeUp}
                    className="text-sm text-red-600 mt-3 relative z-10"
                  >
                    {profileErr}
                  </motion.p>
                )}

                <motion.div variants={fadeUp} className="mt-6 relative z-10">
                  <button
                    type="button"
                    onClick={() => continueFromProfile()}
                    disabled={!canNextProfile}
                    className="w-full h-12 rounded-[1.1rem] bg-primary text-white font-medium hover:opacity-90 disabled:opacity-60 transition shadow-[8px_8px_18px_rgba(59,130,246,0.28),-8px_-8px_18px_rgba(255,255,255,0.9)] dark:shadow-none"
                  >
                    Continuer
                  </button>
                </motion.div>
              </motion.div>
            </motion.div>
          </motion.div>
        )}

        {/* QUESTIONS */}
        {step === 'questions' && (
          <motion.div
            key="step-questions"
            variants={stepVariants}
            initial="initial"
            animate="in"
            exit="out"
            className="flex h-full flex-col min-h-0 py-6"
          >
            {(() => {
              const SHEET =
                'rounded-[2rem] bg-white/80 dark:bg-neutral-900/70 shadow-[0_12px_44px_rgba(0,0,0,.08)]';
              const INPUT =
                'h-11 w-full rounded-[1.1rem] bg-black/[0.04] dark:bg-white/10 px-3 outline-none placeholder:text-muted-foreground/70 focus-visible:outline-none focus-visible:shadow-[0_0_0_4px_rgba(59,130,246,.28)] transition';
              const CHIP =
                'px-3 h-9 inline-flex items-center rounded-[1rem] text-sm bg-black/[0.05] dark:bg-white/10 hover:bg-black/[0.08] dark:hover:bg-white/15 transition';
              const CHIP_ACTIVE =
                'bg-primary/15 text-primary hover:bg-primary/20';

              return (
                <div className="w-full max-w-5xl pb-12 mx-auto">
                  <motion.div
                    variants={staggerCol}
                    initial="hidden"
                    animate="show"
                    className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_340px]"
                  >
                    <motion.section
                      variants={fadeUp}
                      className={`${SHEET} p-6 md:p-8 space-y-6`}
                    >
                      <header className="mb-2">
                        <div className="text-[11px] tracking-[0.18em] uppercase text-muted-foreground">
                          Cadrage
                        </div>
                        <h2 className="text-2xl md:text-3xl font-semibold">
                          Quelques précisions
                        </h2>
                        <p className="text-sm text-muted-foreground">
                          Pour cibler le résultat.
                        </p>
                      </header>

                      <div className="space-y-2">
                        <label className="text-sm font-medium">
                          Audience principale
                        </label>
                        <ComboPopover
                          value={audience}
                          onChange={(v) => setAudience(v as any)}
                          options={['B2B', 'B2C', 'Mix']}
                          placeholder="Choisir l’audience"
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-medium">
                          Objectif #1 du site
                        </label>
                        <ComboPopover
                          value={goal}
                          onChange={(v) => setGoal(v)}
                          options={GOAL_LIST}
                          placeholder="Choisir l’objectif"
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-medium">Langues</label>
                        <div className="flex flex-wrap gap-2">
                          {LANG_LIST.map((l) => {
                            const active = languages.includes(l);
                            return (
                              <button
                                key={l}
                                type="button"
                                onClick={() =>
                                  setLanguages((prev) =>
                                    active
                                      ? prev.filter((x) => x !== l)
                                      : [...prev, l]
                                  )
                                }
                                className={`${CHIP} ${active ? CHIP_ACTIVE : ''}`}
                              >
                                {l}
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-medium">
                          Ton / marque
                        </label>
                        <div className="flex flex-wrap gap-2">
                          {TONE_LIST.map((t) => {
                            const active = tone.includes(t);
                            return (
                              <button
                                key={t}
                                type="button"
                                onClick={() =>
                                  setTone((prev) =>
                                    active
                                      ? prev.filter((x) => x !== t)
                                      : [...prev, t]
                                  )
                                }
                                className={`${CHIP} ${active ? CHIP_ACTIVE : ''}`}
                              >
                                {t}
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-medium">
                          Nom de domaine
                        </label>
                        <div className="flex flex-wrap gap-2">
                          <button
                            type="button"
                            onClick={() => setHasDomain(true)}
                            className={`${CHIP} ${hasDomain ? CHIP_ACTIVE : ''}`}
                          >
                            J’en ai un
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              setHasDomain(false);
                              setDomain('');
                            }}
                            className={`${CHIP} ${!hasDomain ? CHIP_ACTIVE : ''}`}
                          >
                            Pas encore
                          </button>
                        </div>
                        {hasDomain && (
                          <input
                            className={`${INPUT} mt-2`}
                            placeholder="ex: monentreprise.com"
                            value={domain}
                            onChange={(e) => setDomain(e.target.value)}
                          />
                        )}
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-medium">
                          Concurrents / références (jusqu’à 3)
                        </label>
                        <div className="grid gap-2 sm:grid-cols-3">
                          {urls.map((u, i) => (
                            <input
                              key={i}
                              className={INPUT}
                              placeholder={`https://… (${i + 1})`}
                              value={u}
                              onChange={(e) =>
                                setUrls((arr) =>
                                  arr.map((x, idx) =>
                                    idx === i ? e.target.value : x
                                  )
                                )
                              }
                            />
                          ))}
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-medium">
                          Date de début souhaitée
                        </label>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant="ghost"
                              className="w-full h-11 px-3 rounded-2xl justify-between bg-black/[0.04] dark:bg-white/10 hover:bg-black/[0.07] dark:hover:bg-white/15 border-0 ring-0 shadow-none"
                            >
                              <span
                                className={cn(
                                  'truncate',
                                  !startDate && 'text-muted-foreground'
                                )}
                              >
                                {startDate
                                  ? format(
                                      new Date(startDate + 'T00:00:00'),
                                      'PPP',
                                      { locale: fr }
                                    )
                                  : 'Choisir une date'}
                              </span>
                              <IconCalendar className="h-4 w-4 opacity-70" />
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent
                            align="start"
                            className="p-2 border-0 rounded-[1.1rem] backdrop-blur-md bg-white/95 dark:bg-neutral-900/95 shadow-[0_20px_60px_rgba(0,0,0,.12)]"
                          >
                            <Calendar
                              mode="single"
                              selected={
                                startDate
                                  ? new Date(startDate + 'T00:00:00')
                                  : undefined
                              }
                              onSelect={(d) =>
                                setStartDate(d ? format(d, 'yyyy-MM-dd') : '')
                              }
                              initialFocus
                              locale={fr}
                              className="rounded-2xl"
                            />
                          </PopoverContent>
                        </Popover>
                      </div>

                      {/* ★ Bloc fichiers (conservé) */}
                      <div className="space-y-2">
                        <label className="text-sm font-medium">
                          Fichiers (brief, PDF…)
                        </label>
                        <FileUploader
                          folderKey={submissionId ?? 'temp-local'}
                          onUploaded={(rows) =>
                            setAssets((p) => [
                              ...p,
                              ...rows.map((r) => ({
                                id:
                                  r.path ||
                                  (globalThis.crypto?.randomUUID?.() ??
                                    String(Date.now())),
                                file_url: r.file_url,
                                filename: r.filename,
                              })),
                            ])
                          }
                        />
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-medium">
                          Liens (Notion, Miro, Drive…)
                        </label>
                        <div className="space-y-2">
                          {links.map((u, i) => (
                            <input
                              key={i}
                              className={INPUT}
                              placeholder="https://…"
                              value={u}
                              onChange={(e) =>
                                setLinks((arr) =>
                                  arr.map((x, idx) =>
                                    idx === i ? e.target.value : x
                                  )
                                )
                              }
                            />
                          ))}
                          <button
                            type="button"
                            className="text-sm text-muted-foreground underline"
                            onClick={() => setLinks((p) => [...p, ''])}
                          >
                            + Ajouter un lien
                          </button>
                        </div>
                      </div>
                    </motion.section>

                    {/* Aside */}
                    <motion.aside
                      variants={fadeUp}
                      className="space-y-4 lg:sticky lg:top-6 h-fit"
                    >
                      <div className={`${SHEET} p-5`}>
                        <div className="text-[11px] tracking-[0.18em] uppercase text-muted-foreground mb-1">
                          Aperçu
                        </div>
                        <div className="text-sm space-y-2">
                          <div className="flex items-center justify-between gap-4">
                            <span className="text-muted-foreground">
                              Objectif
                            </span>
                            <span className="font-medium">{goal || '—'}</span>
                          </div>
                          <div className="flex items-center justify-between gap-4">
                            <span className="text-muted-foreground">
                              Audience
                            </span>
                            <span className="font-medium">
                              {audience || '—'}
                            </span>
                          </div>
                          <div className="flex items-center justify-between gap-4">
                            <span className="text-muted-foreground">
                              Langues
                            </span>
                            <span className="font-medium truncate">
                              {languages.join(', ')}
                            </span>
                          </div>
                          <div className="flex items-center justify-between gap-4">
                            <span className="text-muted-foreground">Début</span>
                            <span className="font-medium">
                              {startDate || '—'}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className={`${SHEET} p-5`}>
                        <div className="text-sm font-medium">
                          Délais indicatifs
                        </div>
                        <div className="mt-2 text-sm text-muted-foreground space-y-1">
                          <div>Landing: 7–10 jours</div>
                          <div>Vitrine: 14–35 jours</div>
                          <div>E-commerce: 21–45 jours</div>
                          <div>Funnel: 10–24 jours</div>
                          <div>SaaS: 30–75 jours</div>
                        </div>
                      </div>

                      <motion.div
                        variants={fadeUp}
                        className="mt-6 flex items-center justify-between"
                      >
                        <button
                          type="button"
                          onClick={() => setStepUI('pricing')}
                          disabled={!canNextQuestions}
                          className="rounded-[1.9rem] w-full px-5 py-2 h-12 bg-primary text-white disabled:opacity-60 shadow-[0_12px_30px_rgba(59,130,246,0.25)]"
                        >
                          Continuer
                        </button>
                      </motion.div>
                    </motion.aside>
                  </motion.div>
                </div>
              );
            })()}
          </motion.div>
        )}

        {/* PRICING */}
        {step === 'pricing' && (
          <motion.div
            key="step-pricing"
            variants={stepVariants}
            initial="initial"
            animate="in"
            exit="out"
            className="flex h-full flex-col min-h-0 py-6"
          >
            <div className="w-full max-w-7xl mx-auto">
              <div className="p-5 md:p-6">
                <WizardPricingSelector
                  onContinue={async () => {
                    try {
                      const sid = await ensureSubmission();
                      setSubmissionId(sid);
                      setStepUI('sign');
                    } catch (e: any) {
                      alert(
                        e?.message ?? 'Erreur lors de la création du brouillon.'
                      );
                    }
                  }}
                  value={pricing}
                  onChange={setPricing}
                />
              </div>
            </div>
          </motion.div>
        )}

        {/* SIGN */}
        {step === 'sign' && submissionId && (
          <motion.div
            key="step-sign"
            variants={stepVariants}
            initial="initial"
            animate="in"
            exit="out"
            className="flex-1 grid place-items-center py-6"
          >
            <motion.div
              variants={staggerCol}
              initial="hidden"
              animate="show"
              className="w-full max-w-xl"
            >
              <motion.div
                variants={fadeUp}
                className={cn(NEUMO_CARD, 'p-6 md:p-8')}
              >
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0 rounded-[2rem]"
                  style={{
                    boxShadow:
                      'inset 1px 1px 0 rgba(255,255,255,0.9), inset -1px -1px 0 rgba(0,0,0,0.03)',
                  }}
                />
                <motion.div
                  variants={fadeUp}
                  className="text-center mb-6 relative z-10"
                >
                  <div className="text-[11px] tracking-[0.18em] text-muted-foreground uppercase">
                    Signature
                  </div>
                  <h2 className="text-2xl md:text-3xl font-semibold mt-1">
                    Signature électronique
                  </h2>
                  <p className="text-sm text-muted-foreground mt-1">
                    Sécurisée & conforme
                  </p>
                </motion.div>

                <div className="my-5">
                  <Image
                    src="/signature.png"
                    alt="Exemple de signature électronique"
                    width={300}
                    height={300}
                    className="w-1/2 h-auto mx-auto shadow-2xl shadow-[#00000015] aspect-[12/16] rounded-[2rem] blur-[3px]"
                    priority
                  />
                </div>

                <SignStep
                  submissionId={submissionId}
                  clientName={fullName || 'Client'}
                  clientEmail={
                    includeProfileStep ? email : (sessionEmail ?? '')
                  }
                  onSigned={() => setStepUI('pay')}
                />
              </motion.div>
            </motion.div>
          </motion.div>
        )}

        {/* PAY */}
        {step === 'pay' && submissionId && (
          <motion.div
            key="step-pay"
            variants={stepVariants}
            initial="initial"
            animate="in"
            exit="out"
            className="flex-1 grid place-items-center py-6"
          >
            <motion.div
              variants={staggerCol}
              initial="hidden"
              animate="show"
              className="w-full max-w-2xl"
            >
              <motion.div
                variants={fadeUp}
                className={cn(NEUMO_CARD, 'p-6 md:p-8')}
              >
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0 rounded-[2rem]"
                  style={{
                    boxShadow:
                      'inset 1px 1px 0 rgba(255,255,255,0.9), inset -1px -1px 0 rgba(0,0,0,0.03)',
                  }}
                />
                <motion.div
                  variants={fadeUp}
                  className="text-center mb-6 relative z-10"
                >
                  <div className="text-[11px] tracking-[0.18em] text-muted-foreground uppercase">
                    Paiement
                  </div>
                  <h2 className="text-xl md:text-2xl font-semibold">
                    Paiement sécurisé
                  </h2>
                </motion.div>

                <PayStepRib
                  submissionId={submissionId}
                  amountEuro={pricing.totalEuros}
                  summary={{
                    ...buildSummary(),
                    signedPdfUrl:
                      typeof window !== 'undefined'
                        ? localStorage.getItem('signedPdfUrl')
                        : null,
                  }}
                  bank={{
                    iban: 'FR76 1741 8000 0100 0118 4964 938',
                    bic: 'SNNNFR22XXX',
                    label: 'zb1v0063a',
                    swiftPartnerBic: 'TRWIBEB3',
                  }}
                  onConfirmed={handleBankConfirmed}
                  confirmLoading={finishingPayment}
                />

                {payErr && (
                  <p className="mt-3 text-sm text-red-600 text-center">
                    {payErr}
                  </p>
                )}

                {finishingPayment && !payErr && (
                  <p className="mt-3 text-sm text-muted-foreground text-center">
                    Validation en cours…
                  </p>
                )}

                <div className="mt-4 text-center">
                  <button
                    onClick={() => setStepUI('sign')}
                    className="text-sm underline opacity-70 hover:opacity-100"
                  >
                    Revenir à l’étape Signature
                  </button>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        )}

        {/* REVIEW */}
        {step === 'review' && (
          <motion.div
            key="step-review"
            variants={stepVariants}
            initial="initial"
            animate="in"
            exit="out"
            className="flex-1 grid place-items-center py-6"
          >
            <motion.div
              variants={staggerCol}
              initial="hidden"
              animate="show"
              className="w-full max-w-xl"
            >
              <motion.div
                variants={fadeUp}
                className={cn(NEUMO_CARD, 'p-6 md:p-8 relative')}
              >
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-0 rounded-[2rem]"
                  style={{
                    boxShadow:
                      'inset 1px 1px 0 rgba(255,255,255,0.9), inset -1px -1px 0 rgba(0,0,0,0.03)',
                  }}
                />
                <motion.div
                  variants={fadeUp}
                  className="text-center relative z-10 space-y-2"
                >
                  <div className="text-[11px] tracking-[0.18em] text-muted-foreground uppercase">
                    Merci
                  </div>

                  <h2 className="text-xl md:text-2xl font-semibold">
                    On a bien reçu vos informations
                  </h2>

                  <p className="text-sm text-muted-foreground leading-relaxed">
                    On vérifie maintenant votre acompte / virement.
                    <br />
                    Dès que le paiement est confirmé, on ouvre votre espace
                    projet dans notre interface interne et on vous envoie un
                    e-mail avec l’accès, le planning et les prochaines étapes.
                  </p>
                </motion.div>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Tir confetti plein écran uniquement sur l'écran final.
         Le key change (Date.now()) après le clic "Paiement confirmé" → ça relance l'animation.
      */}
      {step === 'review' && <AutoConfettiFireworks />}
    </motion.div>
  );
}
