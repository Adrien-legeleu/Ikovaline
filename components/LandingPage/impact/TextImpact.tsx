'use client';

import * as React from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Check } from 'lucide-react';

/* ====== constants ====== */
const FACT_MS = 3600;
const EASE = [0.16, 1, 0.3, 1] as const;

/** Le conteneur des mockups : hauteur fixe + largeur fluide (REMPLACÉ) */
const STAGE = 'h-[24rem] w-full'; // plus de md:w-[..] → le 1.2fr prend toute la place

/* ───────────────── helpers UI ───────────────── */
function CardShell({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  // Conteneur principal (seule bordure légère autorisée)
  return (
    <div
      className={cn(
        STAGE,
        'relative isolate overflow-hidden rounded-[3rem]',
        'border border-black/[0.04] bg-white/60 p-6 backdrop-blur-2xl',
        'shadow-[0_30px_100px_-40px_rgba(0,0,0,0.35)]',
        'dark:border-white/[0.06] dark:bg-white/[0.04] dark:shadow-[0_60px_160px_-50px_rgba(0,0,0,0.85)]',
        // header / content / footer
        'grid grid-rows-[auto_1fr_auto] gap-4',
        className
      )}
      style={{
        WebkitBackdropFilter: 'blur(24px)',
        backdropFilter: 'blur(24px)',
      }}
    >
      {/* halo interne léger */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-24 -left-10 h-56 w-56 blur-3xl opacity-60"
        style={{
          background:
            'radial-gradient(closest-side, hsl(var(--primary)/0.12), transparent 70%)',
        }}
      />
      {children}
    </div>
  );
}

/* ========= Left Glass → fond primaire coloré (dégradé) ========= */
function LeftGlass({
  title,
  subtitle,
  fact,
  index,
}: {
  title: string;
  subtitle: string;
  fact: string;
  index: number;
}) {
  return (
    <div
      className={cn(
        'relative overflow-hidden rounded-[3rem] p-8 text-white',
        // Dégradé primaire plus riche (moins “blanc” à l’intérieur)
        'bg-gradient-to-tr from-primary via-primary/90 to-primary/60',
        ' dark:bg-gradient-to-br dark:from-primary/90 dark:via-primary/80 dark:to-primary/70',
        'shadow-[0_30px_100px_-40px_rgba(0,0,0,0.45)]'
      )}
      style={{
        WebkitBackdropFilter: 'blur(12px)',
        backdropFilter: 'blur(12px)',
      }}
    >
      {/* halos & grain discrets pour la profondeur, sans blanc pur */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-60 mix-blend-screen"
        style={{
          background:
            'radial-gradient(120% 90% at 0% 0%, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0) 55%), radial-gradient(90% 70% at 100% 20%, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0) 60%)',
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.08]"
        style={{
          background:
            'repeating-linear-gradient(135deg, rgba(255,255,255,0.12) 0px, rgba(255,255,255,0.12) 1px, transparent 1px, transparent 6px)',
        }}
      />

      {/* header */}
      <h2 className="text-3xl md:text-4xl font-semibold tracking-[-0.02em] leading-tight drop-shadow-[0_1px_8px_rgba(0,0,0,0.2)]">
        {title}
        <br />
        {subtitle}
      </h2>
      <p className="mt-4 text-[16px] md:text-[17px] font-medium leading-relaxed text-white/90">
        Moins d’effets, plus d’impact, un delivery net et maîtrisé.
      </p>

      {/* bloc dynamique – plus coloré, zéro blanc agressif */}
      <div className="mt-6 relative overflow-hidden rounded-[1.1rem] p-5 bg-white/5 backdrop-blur-sm dark:shadow-[inset_0_-50px_100px_-70px_rgba(0,0,0,0.25)] shadow-[inset_0_-50px_100px_-70px_rgba(255,255,255,0.25)]">
        {/* piste */}
        <div className="absolute left-5 right-5 top-2 h-[3px] rounded-full bg-white/35" />
        {/* progress (dégradé brand) */}
        <motion.span
          key={`bar-${index}`}
          className="absolute left-5 top-2 h-[3px] rounded-full bg-[linear-gradient(90deg,hsl(var(--primary)/0.95),hsl(var(--primary)/0.45))]"
          initial={{ width: 0 }}
          animate={{ width: 'calc(100% - 2.5rem)' }}
          transition={{ duration: FACT_MS / 1000, ease: 'linear' }}
        />
        {/* curseur (glow coloré, sans blanc) */}
        <motion.span
          key={`dot-${index}`}
          className="absolute top-[6px] left-5 size-2 rounded-full bg-[hsl(var(--primary))] shadow-[0_0_0_7px_hsl(var(--primary)/0.25)]"
        />

        {/* texte stable */}
        <div className="relative z-[1] mt-4 min-h-[50px]">
          <AnimatePresence mode="wait">
            <motion.p
              key={index}
              initial={{ opacity: 0, y: 8, filter: 'blur(6px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: -8, filter: 'blur(6px)' }}
              transition={{ duration: 0.28, ease: 'easeOut' }}
              className="text-[16px] md:text-[17px] font-semibold leading-snug text-white/95"
            >
              <span className="mr-3 inline-block h-[8px] w-[8px] -translate-y-[1px] rounded-full bg-white/70 shadow-[0_8px_16px_rgba(255,255,255,0.35)]" />
              {fact}
            </motion.p>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

/* ───────────────── mockups — sans border interne et full-space ───────────────── */
/* Règles : pas de ring/border internes, seulement bg + shadow très légère.
   Pour VRAIMENT remplir la carte : chaque "content" est en `h-full w-full overflow-hidden`.
*/

function MockConversion() {
  return (
    <CardShell>
      {/* header */}
      <div className="flex items-center justify-between">
        <span className="rounded-full bg-black/[0.04] px-3 py-1 text-[11px] font-medium dark:bg-white/[0.06]">
          A/B test — Conversion
        </span>
        <span className="rounded-full bg-[hsl(var(--primary)/0.12)] px-3 py-1 text-[11px] font-semibold text-[hsl(var(--primary))]">
          B +32%
        </span>
      </div>

      {/* content */}
      <div className="grid h-full w-full grid-cols-2 gap-4 overflow-hidden">
        {/* A */}
        <motion.div
          initial={{ y: 8, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.35, ease: EASE }}
          className="rounded-2xl bg-white/85 p-4 shadow-[0_18px_36px_-18px_rgba(0,0,0,.18)] dark:bg-white/[0.06]"
        >
          <p className="mb-3 text-[11px] font-medium text-neutral-500">
            Variant A
          </p>
          <div className="space-y-2">
            <div className="h-2 rounded bg-neutral-200/80 dark:bg-neutral-800" />
            <div className="h-2 w-3/4 rounded bg-neutral-200/80 dark:bg-neutral-800" />
          </div>
          <div className="mt-4 flex h-[65%] flex-col justify-end gap-2">
            {[62, 48, 53].map((w, i) => (
              <motion.div
                key={i}
                initial={{ width: 0, opacity: 0.6 }}
                animate={{ width: `${w}%`, opacity: 1 }}
                transition={{ duration: 0.5, delay: i * 0.06, ease: 'easeOut' }}
                className="h-3 rounded bg-neutral-300/90 dark:bg-neutral-700"
              />
            ))}
          </div>
        </motion.div>

        {/* B */}
        <motion.div
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.4, ease: EASE, delay: 0.05 }}
          className="rounded-2xl bg-white/95 p-4 shadow-[0_18px_36px_-18px_rgba(0,0,0,.18)] dark:bg-white/[0.07]"
        >
          <p className="mb-3 text-[11px] font-medium text-neutral-500">
            Variant B
          </p>
          <div className="space-y-2">
            <div className="h-2 rounded bg-neutral-200/80 dark:bg-neutral-800" />
            <div className="h-2 w-3/4 rounded bg-neutral-200/80 dark:bg-neutral-800" />
          </div>
          <div className="mt-4 flex h-[65%] flex-col justify-end gap-2">
            {[78, 66, 72].map((w, i) => (
              <motion.div
                key={i}
                initial={{ width: 0, opacity: 0.6 }}
                animate={{ width: `${w}%`, opacity: 1 }}
                transition={{
                  duration: 0.55,
                  delay: 0.15 + i * 0.08,
                  ease: 'easeOut',
                }}
                className="h-3 rounded bg-[linear-gradient(180deg,hsl(var(--primary)/0.72),hsl(var(--primary)/0.70))]"
              />
            ))}
          </div>
        </motion.div>
      </div>

      {/* footer spacer */}
      <div />
    </CardShell>
  );
}

/* 2) Revenu 5k -> 20k */
function MockRevenue() {
  return (
    <CardShell>
      {/* header */}
      <div className="flex items-center justify-between">
        <span className="rounded-full bg-black/[0.04] px-3 py-1 text-[11px] font-medium dark:bg-white/[0.06]">
          Monthly revenue
        </span>
        <span className="text-[11px] font-semibold text-[hsl(var(--primary))]">
          +4× en 6 mois
        </span>
      </div>

      {/* content bar chart */}
      <div className="h-full w-full overflow-hidden rounded-2xl bg-white/85 p-4 shadow-[0_18px_36px_-18px_rgba(0,0,0,.18)] dark:bg-white/[0.06]">
        <div className="flex h-full w-full items-end gap-2">
          {([12, 20, 24, 28, 36, 42, 50, 60, 72, 84] as const).map((h, i) => (
            <motion.div
              key={i}
              initial={{ height: 0, opacity: 0.6 }}
              animate={{ height: `${h}%`, opacity: 1 }}
              transition={{ duration: 0.5, delay: i * 0.06, ease: 'easeOut' }}
              className="flex-1 rounded-md bg-[linear-gradient(180deg,hsl(var(--primary)/0.82),hsl(var(--primary)/0.65))]"
            />
          ))}
        </div>
      </div>

      {/* footer */}
      <div className="flex items-center justify-between text-[11px] text-neutral-500">
        <span>5 000 €</span>
        <span className="font-semibold text-neutral-700 dark:text-neutral-200">
          → 20 000 €
        </span>
      </div>
    </CardShell>
  );
}

/* 3) Local Pack Google Maps
   - header harmonisé (badge + stat droite comme les autres)
   - list scrollable si jamais trop serré en mobile
*/
function MockMaps() {
  return (
    <CardShell>
      {/* header comme les autres : badge à gauche, petit label à droite */}
      <div className="flex items-center justify-between">
        <span className="rounded-full bg-black/[0.04] px-3 py-1 text-[11px] font-medium dark:bg-white/[0.06]">
          Local SEO / Maps
        </span>
        <span className="text-[11px] font-semibold text-[hsl(var(--primary))]">
          Top 3 local
        </span>
      </div>

      {/* content */}
      <div className="flex h-full w-full flex-col overflow-hidden pt-2">
        {/* champ search mock */}
        <div className="rounded-xl bg-white/85 px-4 py-2 text-[12px] shadow-[0_12px_24px_-16px_rgba(0,0,0,.18)] dark:bg-white/[0.06]">
          🔎 <span className="opacity-70">agence web essonne</span>
        </div>

        {/* résultats */}
        <div className="mt-2 flex min-h-0 flex-1 flex-col gap-2 overflow-hidden">
          <div className="flex flex-1 flex-col gap-2 overflow-y-hidden">
            {[1, 2, 3].map((rank, i) => (
              <motion.div
                key={rank}
                initial={{ x: -8, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.35, ease: EASE, delay: i * 0.08 }}
                className="flex items-center gap-3 rounded-2xl bg-white/95 p-4 shadow-[0_12px_24px_-16px_rgba(0,0,0,.18)] dark:bg-white/[0.07]"
              >
                <span className="grid size-6 place-items-center rounded-full bg-[hsl(var(--primary)/0.12)] text-[10px] font-bold text-[hsl(var(--primary))]">
                  {rank}
                </span>
                <div className="grow">
                  <div className="h-3 w-32 rounded bg-neutral-200/80 dark:bg-neutral-800 sm:w-40" />
                  <div className="mt-1 h-2 w-20 rounded bg-neutral-200/80 dark:bg-neutral-800 sm:w-24" />
                </div>
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{
                    duration: 0.25,
                    ease: EASE,
                    delay: 0.12 + i * 0.08,
                  }}
                  className="text-[11px] text-neutral-500"
                >
                  4.9 ★
                </motion.div>
              </motion.div>
            ))}
          </div>

          <div className="mt-1 text-center text-[11px] text-neutral-500 sm:text-[12px]">
            Top 3 confirmé sur nos secteurs.
          </div>
        </div>
      </div>

      <div />
    </CardShell>
  );
}

/* 4) Intégrations IA / RAG */
function MockAI() {
  const reduced = useReducedMotion();
  return (
    <CardShell>
      {/* header */}
      <div className="flex items-center justify-between">
        <span className="rounded-full bg-black/[0.04] px-3 py-1 text-[11px] font-medium dark:bg-white/[0.06]">
          Pipeline IA (RAG)
        </span>
        <motion.span
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.35, ease: EASE, delay: 0.1 }}
          className="inline-flex items-center gap-1 rounded-full bg-[hsl(var(--primary)/0.12)] px-3 py-1 text-[11px] font-semibold text-[hsl(var(--primary))]"
        >
          ROI-oriented
        </motion.span>
      </div>

      {/* content */}
      <div className="grid h-full w-full grid-cols-1 gap-4 overflow-hidden sm:grid-cols-[1.1fr_0.9fr]">
        {/* code block */}
        <div className="rounded-2xl bg-black p-4 font-mono text-[11px] leading-6 text-slate-200 shadow-[0_18px_36px_-18px_rgba(0,0,0,.5)] sm:text-[12px]">
          <div className="mb-1 text-[10px] text-slate-400 sm:text-[11px]">
            /rag/pipeline.ts
          </div>
          <motion.pre
            animate={reduced ? {} : { opacity: [0.8, 1, 0.8] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
            className="whitespace-pre-wrap text-slate-300"
          >{`const ctx = ingest(docs).embed().index('ikosystem');
const answer = ctx.query(userPrompt).rerank().generate();
return answer;`}</motion.pre>
        </div>

        {/* KPI */}
        <div className="rounded-2xl bg-white/95 p-4 shadow-[0_12px_24px_-16px_rgba(0,0,0,.18)] dark:bg-white/[0.07]">
          <p className="mb-2 text-[11px] font-medium text-neutral-500">KPIs</p>
          {[
            ['Coût', '↓ 38%'],
            ['Temps de réponse', '↓ 55%'],
            ['CSAT', '↑ 21%'],
          ].map(([k, v], i) => (
            <motion.div
              key={k}
              initial={{ y: 6, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.3, ease: EASE, delay: i * 0.06 }}
              className="mt-4 flex items-center justify-between text-[11px] sm:text-[12px]"
            >
              <span>{k}</span>
              <span
                className={cn(
                  'rounded-md px-2 py-0.5 font-semibold',
                  k === 'CSAT'
                    ? 'bg-[hsl(var(--primary)/0.12)] text-[hsl(var(--primary))]'
                    : 'bg-emerald-500/15 text-emerald-600'
                )}
              >
                {v}
              </span>
            </motion.div>
          ))}
        </div>
      </div>

      <div />
    </CardShell>
  );
}

/* 5) Qualité & rapidité
   - le bloc pipeline prend tout l'espace horizontal (pas de trous)
   - en mobile, toujours centré mais pas rikiki
*/
function MockQuality() {
  return (
    <CardShell>
      {/* header */}
      <div className="flex items-center justify-between">
        <span className="rounded-full bg-black/[0.04] px-3 py-1 text-[11px] font-medium dark:bg-white/[0.06]">
          Delivery plan
        </span>
        <span className="rounded-full bg-[hsl(var(--primary)/0.12)] px-3 py-1 text-[11px] font-semibold text-[hsl(var(--primary))]">
          14 jours
        </span>
      </div>

      {/* content */}
      <div className="flex h-full w-full items-center justify-center overflow-hidden rounded-2xl bg-white/95 p-4 shadow-[0_12px_24px_-16px_rgba(0,0,0,.18)] dark:bg-white/[0.07] sm:p-5">
        {/* timeline étirable */}
        <div className="flex w-full max-w-none flex-1 items-center justify-center gap-2 sm:gap-3">
          {['Brief', 'Design', 'Build', 'QA', 'Go-Live'].map((s, i, arr) => (
            <div
              key={s}
              className="flex flex-1 min-w-0 flex-col items-center text-center"
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{
                  duration: 0.25,
                  ease: EASE,
                  delay: i * 0.07,
                }}
                className="grid place-items-center"
              >
                <div className="grid size-8 place-items-center rounded-full bg-white/90 shadow-[0_8px_20px_-12px_rgba(0,0,0,.22)] dark:bg-white/[0.15]">
                  <div
                    className={cn(
                      'size-4 rounded-full',
                      i < arr.length - 1
                        ? 'bg-[hsl(var(--primary))]'
                        : 'bg-neutral-300 dark:bg-neutral-700'
                    )}
                  />
                </div>
                <div className="mt-2 text-[10px] text-neutral-500 sm:text-[11px]">
                  {s}
                </div>
              </motion.div>

              {i < arr.length - 1 && (
                <motion.div
                  initial={{ width: 0, opacity: 0.6 }}
                  animate={{ width: '100%', opacity: 1 }}
                  transition={{
                    duration: 0.5,
                    ease: 'easeOut',
                    delay: 0.05 + i * 0.07,
                  }}
                  className="mx-2 hidden h-[2px] flex-1 rounded bg-[hsl(var(--primary)/0.22)] sm:block"
                />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* footer */}
      <div className="text-center text-[11px] text-neutral-500 sm:text-[12px]">
        Reconnu pour la qualité et la rapidité d’exécution.
      </div>
    </CardShell>
  );
}

/* 6) Certifié Google Search & Analytics */
function MockCert() {
  return (
    <CardShell>
      {/* header */}
      <div className="flex items-center justify-between">
        <span className="rounded-full bg-black/[0.04] px-3 py-1 text-[11px] font-medium dark:bg-white/[0.06]">
          Certifications
        </span>
        <motion.span
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.35, ease: EASE, delay: 0.1 }}
          className="inline-flex items-center gap-1 rounded-full bg-[hsl(var(--primary)/0.12)] px-3 py-1 text-[11px] font-semibold text-[hsl(var(--primary))]"
        >
          <Check size={14} /> Validé
        </motion.span>
      </div>

      {/* content */}
      <div className="grid h-full w-full grid-cols-2 gap-4 overflow-hidden">
        {[
          { title: 'Google Search', sub: 'SEO Fundamentals' },
          { title: 'Google Analytics', sub: 'GA4 Measurement' },
        ].map((c, i) => (
          <motion.div
            key={c.title}
            initial={{ y: 8, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.35, ease: EASE, delay: i * 0.08 }}
            className="rounded-2xl bg-white/95 p-4 shadow-[0_12px_24px_-16px_rgba(0,0,0,.18)] dark:bg-white/[0.07]"
          >
            <div className="mb-2 h-6 w-20 rounded bg-[hsl(var(--primary)/0.18)] sm:w-24" />
            <div className="h-3 w-24 rounded bg-neutral-200/80 dark:bg-neutral-800 sm:w-32" />
            <div className="mt-2 h-2 w-16 rounded bg-neutral-200/80 dark:bg-neutral-800 sm:w-20" />
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{
                duration: 0.25,
                ease: EASE,
                delay: 0.15 + i * 0.08,
              }}
              className="mt-3 inline-flex items-center gap-2 rounded-full bg-emerald-500/15 px-2 py-1 text-[10px] font-semibold text-emerald-600 sm:text-[11px]"
            >
              Validé
            </motion.div>
          </motion.div>
        ))}
      </div>

      <div />
    </CardShell>
  );
}

/* ───────── switcher lié aux phrases ───────── */
const FACTS = [
  'Jusqu’à +30% de conversion après refonte.',
  'De 5 000 € à 20 000 € / mois avec IkoSystem.',
  'Top 3 sur Google Maps sur nos secteurs.',
  'Intégrations IA (ChatGPT, RAG) orientées ROI.',
  'Reconnu pour la qualité et la rapidité d’exécution.',
  'Certifié Google Search & Analytics.',
] as const;

function useAutoIndex(len: number, ms = FACT_MS) {
  const [i, setI] = React.useState(0);
  React.useEffect(() => {
    const id = setInterval(() => setI((x) => (x + 1) % len), ms);
    return () => clearInterval(id);
  }, [len, ms]);
  return i;
}

function MockupByIndex({ i }: { i: number }) {
  const map = [
    <MockConversion key="m0" />,
    <MockRevenue key="m1" />,
    <MockMaps key="m2" />,
    <MockAI key="m3" />,
    <MockQuality key="m4" />,
    <MockCert key="m5" />,
  ];
  return map[i] ?? map[0];
}

/* ───────────────── main block ───────────────── */
export default function ImpactMap() {
  const i = useAutoIndex(FACTS.length);

  return (
    <section className="relative mx-auto w-full max-w-7xl px-6 md:px-10 pb-32 pt-16">
      {/* halos brand */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-24 left-0 h-72 w-72 blur-3xl opacity-60"
        style={{
          background:
            'radial-gradient(closest-side, hsl(var(--primary)/0.12), transparent 70%)',
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-0 right-0 h-72 w-72 blur-[90px] opacity-60"
        style={{
          background:
            'radial-gradient(closest-side, hsl(var(--primary)/0.08), transparent 70%)',
        }}
      />

      <div className="mx-auto grid max-w-7xl items-center justify-center gap-12 md:grid-cols-[0.8fr_1.2fr]">
        {/* Colonne gauche (fond primaire) */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: EASE }}
          className="relative w-full"
        >
          <LeftGlass
            title="Des résultats concrets."
            subtitle="Une exécution sobre."
            fact={FACTS[i]}
            index={i}
          />
        </motion.div>

        {/* Colonne droite : mockup synchronisé (remplit 1.2fr) */}
        <motion.div
          className="w-full"
          initial={{ opacity: 0, scale: 0.985 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: EASE }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 8, filter: 'blur(6px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: -8, filter: 'blur(6px)' }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
              className="w-full"
            >
              <MockupByIndex i={i} />
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
