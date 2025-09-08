'use client';

import React from 'react';
import Link from 'next/link';
import {
  IconCpu,
  IconDeviceMobileCode,
  IconRobot,
  IconSparkles,
  IconMapPin,
  IconChartLine,
} from '@tabler/icons-react';

type CardShellProps<As extends React.ElementType = 'article'> = {
  children: React.ReactNode;
  as?: As;
  className?: string;
} & Omit<React.ComponentPropsWithoutRef<As>, 'as' | 'className' | 'children'>;

function CardShell<As extends React.ElementType = 'article'>({
  children,
  as,
  className = '',
}: CardShellProps<As>) {
  const Comp = (as ?? 'article') as React.ElementType;
  return (
    <Comp
      className={[
        'relative flex h-full justify-between flex-col overflow-hidden rounded-2xl p-6 md:p-7 transition-transform',
        'bg-white/90 backdrop-blur-xl shadow-[0_40px_120px_-52px_rgba(0,0,0,.35)] border border-black/10 dark:border-white/10',
        'dark:bg-neutral-900/80 dark:ring-white/10 dark:shadow-[0_60px_150px_-60px_rgba(0,0,0,.70)]',
        'before:pointer-events-none before:absolute before:inset-0',
        'before:[background:linear-gradient(135deg,rgba(255,255,255,.85),rgba(255,255,255,.85))_padding-box,linear-gradient(135deg,#d4d4d8,#e5e7eb)]',
        'dark:before:[background:linear-gradient(135deg,rgba(0,0,0,.85),rgba(0,0,0,.85))_padding-box,linear-gradient(135deg,#52525b,#71717a)]',
        className,
      ].join(' ')}
    >
      <span className="pointer-events-none absolute inset-x-6 top-3 h-8 rounded-full bg-black/5 dark:black-white/5 blur-xl" />
      {children}
    </Comp>
  );
}

/* =========================== Frame type “MacWindow” =========================== */
function MacWindow({
  children,
  title = 'ikovaline.app',
}: {
  children: React.ReactNode;
  title?: string;
}) {
  return (
    <div className="h-full w-full overflow-hidden rounded-2xl bg-white dark:bg-neutral-950 ring-1 ring-black/10 dark:ring-white/10">
      <div className="flex items-center gap-2 px-4 py-3">
        <span className="h-3 w-3 rounded-full bg-[#FF5F57]" />
        <span className="h-3 w-3 rounded-full bg-[#FEBB2E]" />
        <span className="h-3 w-3 rounded-full bg-[#28C840]" />
        <div className="mx-auto rounded-full bg-black/5 px-3 py-1 text-xs font-medium text-neutral-600 dark:text-neutral-200">
          {title}
        </div>
      </div>
      <div className="h-px w-full bg-gradient-to-r from-transparent via-black/10 to-transparent dark:via-white/10" />
      <div className="relative h-[calc(100%-44px)] p-5">{children}</div>
    </div>
  );
}

/* ============================= Mockups premium ============================= */
/* 1) SaaS — Dashboard (KPIs + courbe + billing) */
function SaaSMock() {
  return (
    <MacWindow title="SaaS · Dashboard">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-black/5 to-transparent dark:from-white/5" />

      <div className="grid grid-cols-2  gap-4">
        {['MRR', 'Active users'].map((k, i) => (
          <div
            key={k}
            className="rounded-xl bg-white p-4 shadow-[0_18px_40px_-24px_rgba(0,0,0,.25)] ring-1 ring-black/5 dark:bg-neutral-900"
          >
            <div className="text-[11px] uppercase tracking-wide text-neutral-500">
              {k}
            </div>
            <div className="mt-2 h-7 w-24 rounded bg-neutral-200 dark:bg-neutral-800" />
            <div
              className={[
                'mt-2 h-2 w-3/4 rounded',
                i === 1 ? 'bg-red-500/30' : 'bg-emerald-500/30',
              ].join(' ')}
            />
          </div>
        ))}
      </div>

      <div className="mt-5 rounded-2xl bg-gradient-to-b from-white to-white/70 p-4 shadow-[0_28px_56px_-28px_rgba(0,0,0,.28)] ring-1 ring-black/5 dark:from-neutral-900 dark:to-neutral-900/60">
        <div className="h-40 w-full rounded-lg bg-[linear-gradient(to_right,rgba(0,0,0,.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,.06)_1px,transparent_1px)] bg-[size:28px_28px] dark:bg-[linear-gradient(to_right,rgba(255,255,255,.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,.06)_1px,transparent_1px)]" />
        <div className="-mt-1 h-[2px] w-full bg-gradient-to-r from-neutral-400 to-neutral-500 dark:from-neutral-300 dark:to-neutral-400" />
      </div>

      <div className="mt-5 rounded-2xl bg-white p-4 shadow-[0_24px_48px_-28px_rgba(0,0,0,.22)] ring-1 ring-black/5 dark:bg-neutral-900">
        <div className="mb-3 grid grid-cols-5 gap-3 text-[11px] font-semibold text-neutral-500">
          <div>Plan</div>
          <div>Customer</div>
          <div>Status</div>
          <div>Amount</div>
          <div>Date</div>
        </div>
        {[1, 2, 3].map((r) => (
          <div
            key={r}
            className="mb-2 grid grid-cols-5 items-center gap-3 rounded-lg bg-neutral-50 p-3 dark:bg-neutral-800/60"
          >
            <div className="h-3 w-20 rounded bg-neutral-200 dark:bg-neutral-700" />
            <div className="h-3 w-28 rounded bg-neutral-200 dark:bg-neutral-700" />
            <div className="h-6 w-16 rounded-full bg-emerald-500/15 ring-1 ring-emerald-500/30" />
            <div className="h-3 w-16 rounded bg-neutral-200 dark:bg-neutral-700" />
            <div className="h-3 w-24 rounded bg-neutral-200 dark:bg-neutral-700" />
          </div>
        ))}
      </div>
    </MacWindow>
  );
}

/* 2) Apps — Deux téléphones clean (cards, CTA, media) */
function AppsMock() {
  return (
    <MacWindow title="Apps · Preview">
      <div className="relative grid place-items-center py-2">
        <div className="relative h-72 w-40 -rotate-6 rounded-[2rem] border border-black/10 bg-white shadow-[0_24px_60px_-28px_rgba(0,0,0,.35)] dark:border-white/10 dark:bg-neutral-900">
          <div className="mx-auto mt-2 h-1.5 w-16 rounded-full bg-neutral-200 dark:bg-neutral-700" />
          <div className="m-3 h-16 rounded-xl bg-neutral-100 dark:bg-neutral-800" />
          <div className="mx-3 mt-2 h-3 rounded bg-neutral-200 dark:bg-neutral-700" />
          <div className="mx-3 mt-2 h-3 w-3/4 rounded bg-neutral-200 dark:bg-neutral-700" />
          <div className="mx-3 mt-3 grid grid-cols-2 gap-2">
            <div className="h-8 rounded-md bg-neutral-200 dark:bg-neutral-700" />
            <div className="h-8 rounded-md bg-neutral-200 dark:bg-neutral-700" />
          </div>
        </div>
        <div className="absolute left-1/2 top-1/2 h-72 w-40 -translate-y-1/3 translate-x-2 rotate-6 rounded-[2rem] border border-black/10 bg-white shadow-[0_28px_70px_-30px_rgba(0,0,0,.35)] dark:border-white/10 dark:bg-neutral-900">
          <div className="mx-auto mt-2 h-1.5 w-16 rounded-full bg-neutral-200 dark:bg-neutral-700" />
          <div className="m-3 h-12 rounded-xl bg-neutral-100 dark:bg-neutral-800" />
          <div className="mx-3 mt-2 h-3 w-2/3 rounded bg-neutral-200 dark:bg-neutral-700" />
          <div className="mx-3 mt-3 h-24 rounded-xl bg-neutral-100 dark:bg-neutral-800" />
        </div>
      </div>
    </MacWindow>
  );
}

/* 3) Automation/IA — Pipeline clair (nœuds + badges étapes) */
function AutomationMock() {
  return (
    <MacWindow title="Automation · Workflow">
      <div className="relative h-64 rounded-xl bg-white dark:bg-neutral-950 ring-1 ring-black/5 dark:ring-white/10">
        <div className="absolute left-1/2 top-1/2 h-12 w-12 -translate-x-1/2 -translate-y-1/2 rounded-full bg-neutral-100 ring-2 ring-[hsl(var(--primary)/0.35)] dark:bg-neutral-900" />
        {[
          { top: '18%', left: '22%' },
          { top: '18%', left: '78%' },
          { top: '82%', left: '22%' },
          { top: '82%', left: '78%' },
          { top: '50%', left: '12%' },
          { top: '50%', left: '88%' },
        ].map((pos, i) => (
          <div
            key={i}
            className="absolute h-3.5 w-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[hsl(var(--primary))]"
            style={pos as React.CSSProperties}
          />
        ))}
        <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100">
          {[
            'M22 18 C45 22, 50 40, 50 50',
            'M78 18 C55 22, 50 40, 50 50',
            'M22 82 C45 78, 50 60, 50 50',
            'M78 82 C55 78, 50 60, 50 50',
            'M12 50 C30 50, 50 50, 50 50',
            'M88 50 C70 50, 50 50, 50 50',
          ].map((d, i) => (
            <path
              key={i}
              d={d}
              stroke="hsl(var(--primary) / .35)"
              strokeWidth="1.6"
              fill="none"
              strokeLinecap="round"
            />
          ))}
        </svg>
        <div className="absolute bottom-3 left-3 flex flex-wrap gap-2">
          {['Trigger CRM', 'Enrich data', 'Notify Slack'].map((t) => (
            <div
              key={t}
              className="rounded-full bg-neutral-50 px-3 py-1 text-[10px] font-semibold text-neutral-700 ring-1 ring-black/10 dark:bg-neutral-900 dark:text-neutral-200 dark:ring-white/10"
            >
              {t}
            </div>
          ))}
        </div>
      </div>
    </MacWindow>
  );
}

/* 4) Sites & SEO/GEO — SERP + preview + badge CWV */
function SitesMock() {
  return (
    <MacWindow title="Sites · SEO & GEO">
      <div className="space-y-4">
        <div className="rounded-xl border border-neutral-200 bg-white p-4 shadow-[0_18px_40px_-24px_rgba(0,0,0,.22)] dark:border-neutral-800 dark:bg-neutral-900">
          <div className="h-3 w-44 rounded bg-neutral-200 dark:bg-neutral-700" />
          <div className="mt-2 h-4 w-3/4 rounded bg-neutral-100 dark:bg-neutral-800" />
          <div className="mt-1 h-3 w-1/2 rounded bg-neutral-100 dark:bg-neutral-800" />
        </div>
        <div className="grid grid-cols-3 gap-4">
          <div className="col-span-3 h-20 rounded-xl bg-neutral-100 dark:bg-neutral-800" />
          <div className="col-span-2 space-y-2">
            <div className="h-3 rounded bg-neutral-200 dark:bg-neutral-700" />
            <div className="h-3 w-3/4 rounded bg-neutral-200 dark:bg-neutral-700" />
            <div className="h-32 rounded-xl bg-neutral-100 dark:bg-neutral-800" />
          </div>
          <div className="space-y-2">
            <div className="h-3 rounded bg-neutral-200 dark:bg-neutral-700" />
            <div className="h-20 rounded-xl bg-neutral-100 dark:bg-neutral-800" />
            <div className="h-8 rounded-xl bg-neutral-200 dark:bg-neutral-700" />
          </div>
        </div>
        <div className="inline-flex items-center gap-2 rounded-full bg-emerald-500/10 px-3 py-1 text-[10px] font-semibold text-emerald-700 ring-1 ring-emerald-500/30 dark:text-emerald-400">
          Core Web Vitals • OK
        </div>
      </div>
    </MacWindow>
  );
}

/* 5) Google My Business — Carte + fiche + avis */
function GMBMock() {
  return (
    <MacWindow title="Google Business Profile · Local">
      <div className="space-y-4">
        {/* mini carte */}
        <div className="h-28 rounded-xl bg-[conic-gradient(at_30%_40%,#e5e7eb_0_25%,#d1d5db_0_50%,#e5e7eb_0_75%,#f3f4f6_0)] dark:bg-[conic-gradient(at_30%_40%,#222_0_25%,#333_0_50%,#222_0_75%,#111_0)] ring-1 ring-black/10 dark:ring-white/10" />
        {/* fiche */}
        <div className="rounded-xl border border-neutral-200 bg-white p-4 shadow-[0_18px_40px_-24px_rgba(0,0,0,.22)] dark:border-neutral-800 dark:bg-neutral-900">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-neutral-200 dark:bg-neutral-700" />
            <div>
              <div className="h-3 w-40 rounded bg-neutral-200 dark:bg-neutral-700" />
              <div className="mt-2 flex items-center gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <div key={i} className="h-3 w-3 rounded bg-amber-400/70" />
                ))}
                <span className="ml-2 h-3 w-8 rounded bg-neutral-200 dark:bg-neutral-700" />
              </div>
            </div>
          </div>
          <div className="mt-3 grid grid-cols-3 gap-3">
            <div className="h-16 rounded-lg bg-neutral-100 dark:bg-neutral-800" />
            <div className="h-16 rounded-lg bg-neutral-100 dark:bg-neutral-800" />
            <div className="h-16 rounded-lg bg-neutral-100 dark:bg-neutral-800" />
          </div>
        </div>
        {/* actions */}
        <div className="flex gap-2">
          <div className="h-8 w-24 rounded-lg bg-neutral-200 dark:bg-neutral-700" />
          <div className="h-8 w-24 rounded-lg bg-neutral-200 dark:bg-neutral-700" />
          <div className="h-8 w-24 rounded-lg bg-neutral-200 dark:bg-neutral-700" />
        </div>
      </div>
    </MacWindow>
  );
}

/* 6) Acquisition — Ads dashboard + table mots-clés */
function AcquisitionMock() {
  return (
    <MacWindow title="Acquisition · SEA & SEO">
      <div className="space-y-4">
        {/* KPIs */}
        <div className="grid grid-cols-3 gap-3">
          {['CPC', 'CTR', 'ROAS'].map((k) => (
            <div
              key={k}
              className="rounded-xl bg-white p-3 shadow-[0_18px_40px_-24px_rgba(0,0,0,.22)] ring-1 ring-black/5 dark:bg-neutral-900"
            >
              <div className="text-[11px] uppercase tracking-wide text-neutral-500">
                {k}
              </div>
              <div className="mt-2 h-6 w-20 rounded bg-neutral-200 dark:bg-neutral-700" />
            </div>
          ))}
        </div>
        {/* graph perf */}
        <div className="h-32 rounded-xl bg-[linear-gradient(to_right,rgba(0,0,0,.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,.06)_1px,transparent_1px)] bg-[size:28px_28px] dark:bg-[linear-gradient(to_right,rgba(255,255,255,.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,.06)_1px,transparent_1px)]" />
        {/* table mots-clés */}
        <div className="rounded-xl bg-white p-3 ring-1 ring-black/5 shadow-[0_18px_40px_-24px_rgba(0,0,0,.22)] dark:bg-neutral-900">
          <div className="mb-2 grid grid-cols-4 gap-2 text-[11px] font-semibold text-neutral-500">
            <div>Mot-clé</div>
            <div>Qualité</div>
            <div>Coût</div>
            <div>Conv.</div>
          </div>
          {[1, 2, 3].map((r) => (
            <div
              key={r}
              className="mb-1 grid grid-cols-4 items-center gap-2 rounded-lg bg-neutral-50 p-2 dark:bg-neutral-800/60"
            >
              <div className="h-3 w-24 rounded bg-neutral-200 dark:bg-neutral-700" />
              <div className="h-3 w-16 rounded bg-neutral-200 dark:bg-neutral-700" />
              <div className="h-3 w-12 rounded bg-neutral-200 dark:bg-neutral-700" />
              <div className="h-3 w-12 rounded bg-neutral-200 dark:bg-neutral-700" />
            </div>
          ))}
        </div>
      </div>
    </MacWindow>
  );
}

/* =============================== Données =============================== */
const SERVICES = [
  {
    id: 'saas',
    tag: 'SaaS',
    // REFAIT
    title: 'SaaS sur-mesure, scalable & sécurisé',
    desc: 'De l’architecture au billing : base produit robuste (auth, RBAC, plans, facturation), CI/CD propre et observabilité pour itérer vite sans dette.',
    icon: <IconCpu className="h-5 w-5" />,
    href: 'https://ikovaline.com/nos-services/creation-saas-sur-mesure',
    illustration: <SaaSMock />,
  },
  {
    id: 'apps',
    tag: 'Apps',
    title: 'Web & Mobile Apps hautes performances',
    desc: 'Next.js / Expo. Accessibilité, offline-first, sync en temps réel, design premium. Du MVP au scale, sans friction.',
    icon: <IconDeviceMobileCode className="h-5 w-5" />,
    href: 'https://ikovaline.com/nos-services/web-apps-applications-mobiles/',
    illustration: <AppsMock />,
  },
  {
    id: 'automation',
    tag: 'IA & Automation',
    title: 'Automatisation & IA orientées résultats',
    desc: 'Workflows, intégrations API, RAG/agents. Moins de tâches répétitives, plus de valeur. Mesure claire du ROI.',
    icon: <IconRobot className="h-5 w-5" />,
    href: 'https://ikovaline.com/nos-services#automatisation-ia',
    illustration: <AutomationMock />,
  },
  {
    id: 'sites',
    tag: 'Sites & SEO',
    // REFAIT
    title: 'Sites sur-mesure • SEO & GEO',
    desc: 'Design haut de gamme, vitesse extrême, schémas & maillage SEO, pages locales (GEO) prêtes pour ranker en zone ciblée.',
    icon: <IconSparkles className="h-5 w-5" />,
    href: 'https://ikovaline.com/nos-services#sites-seo-geo',
    illustration: <SitesMock />,
  },
  {
    id: 'gmb',
    tag: 'Local',
    title: 'Google My Business (GBP) qui convertit',
    desc: 'Création/optimisation de fiche, catégories, posts, avis, photos, suivi des positions et conversions locales (appels, itinéraires).',
    icon: <IconMapPin className="h-5 w-5" />,
    href: 'https://ikovaline.com/nos-services/google-my-business',
    illustration: <GMBMock />,
  },
  {
    id: 'acquisition',
    tag: 'Acquisition',
    title: 'SEA + SEO : acquisition rentable',
    desc: 'Campagnes Google Ads (Search/Shopping/PMAX) + SEO technique & contenu. Suivi ROAS, dashboards clairs, croissance maîtrisée.',
    icon: <IconChartLine className="h-5 w-5" />,
    href: 'https://ikovaline.com/nos-services/sea-seo-acquisition',
    illustration: <AcquisitionMock />,
  },
] as const;

/* ============================ Section 2×3 luxe ============================ */
export default function ServicesGridRefined() {
  return (
    <section className="bg-transparent">
      <div className="relative z-10 mx-auto  px-4">
        {/* Passe automatiquement en 2 colonnes (md) / 3 (lg) */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 lg:gap-10">
          {SERVICES.map((s) => (
            <Link
              key={s.id}
              href={s.href}
              prefetch={false}
              aria-label={`${s.title} — en savoir plus`}
              className="group block focus:outline-none"
            >
              <CardShell>
                <div className="flex z-20 flex-col gap-4">
                  <div className="w-full items-center flex justify-between">
                    <span className="inline-flex w-fit items-center gap-2 rounded-full bg-[hsl(var(--primary)/0.08)] px-3 py-1 text-xs font-semibold text-[hsl(var(--primary))] ring-1 ring-[hsl(var(--primary)/0.25)]">
                      {s.icon}
                      {s.tag}
                    </span>
                    <div className=" z-20 inline-flex items-center gap-2 text-sm font-semibold text-neutral-800 transition group-hover:translate-x-0.5 text-primary">
                      En savoir plus
                      <svg
                        aria-hidden
                        viewBox="0 0 24 24"
                        className="h-4 w-4"
                        fill="none"
                        stroke="currentColor"
                      >
                        <path d="M5 12h14" strokeWidth="2" />
                        <path d="M13 5l7 7-7 7" strokeWidth="2" />
                      </svg>
                    </div>
                  </div>
                  <h3 className="text-[clamp(1.25rem,1.6vw,1.8rem)] font-extrabold leading-tight text-neutral-900 dark:text-white">
                    {s.title}
                  </h3>
                  <p className="text-[12px] leading-6 text-neutral-700 dark:text-neutral-300">
                    {s.desc}
                  </p>
                </div>

                <div className="">
                  <div className="relative w-full overflow-hidden rounded-2xl">
                    <div className="aspect-[16/10]">{s.illustration}</div>
                  </div>
                </div>
              </CardShell>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
