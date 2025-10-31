'use client';

import * as React from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { cn } from '@/lib/utils';

/* ───────────────── helpers UI ───────────────── */
function Shimmer({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        'animate-pulse bg-gradient-to-r from-neutral-200 via-neutral-100 to-neutral-200 dark:from-neutral-800 dark:via-neutral-700 dark:to-neutral-800',
        className
      )}
    />
  );
}

function CardShell({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        'relative isolate h-[22rem] w-full max-w-xl overflow-hidden rounded-[2rem] border border-black/[0.04] bg-white/60 p-6 shadow-[0_30px_100px_-40px_rgba(0,0,0,0.35)] backdrop-blur-2xl dark:border-white/[0.06] dark:bg-white/[0.03] dark:shadow-[0_60px_160px_-40px_rgba(0,0,0,0.9)]',
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
        className="pointer-events-none absolute -top-20 -left-10 h-52 w-52 blur-3xl opacity-60"
        style={{
          background:
            'radial-gradient(closest-side, hsl(var(--primary)/0.12), transparent 70%)',
        }}
      />
      {children}
    </div>
  );
}

/* ───────────────── mockups (1 par phrase) ───────────────── */

/* 1) +30% conversion : mini A/B results */
function MockConversion() {
  return (
    <CardShell>
      <div className="mb-3 flex items-center justify-between">
        <span className="rounded-full bg-black/[0.04] px-3 py-1 text-xs font-medium dark:bg-white/[0.06]">
          A/B test — Conversion
        </span>
        <span className="rounded-full bg-[hsl(var(--primary)/0.12)] px-3 py-1 text-xs font-semibold text-[hsl(var(--primary))] ring-1 ring-[hsl(var(--primary)/0.35)]">
          B +32%
        </span>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {/* Variant A */}
        <div className="rounded-2xl bg-white/80 p-4 ring-1 ring-black/[0.04] dark:bg-white/[0.04] dark:ring-white/[0.06]">
          <p className="mb-3 text-xs font-medium text-neutral-500">Variant A</p>
          <div className="space-y-2">
            <div className="h-2 rounded bg-neutral-200 dark:bg-neutral-800" />
            <div className="h-2 w-3/4 rounded bg-neutral-200 dark:bg-neutral-800" />
          </div>
          {/* barres */}
          <div className="mt-4 space-y-2">
            <div className="h-3 w-[62%] rounded bg-neutral-300 dark:bg-neutral-700" />
            <div className="h-3 w-[48%] rounded bg-neutral-300 dark:bg-neutral-700" />
            <div className="h-3 w-[53%] rounded bg-neutral-300 dark:bg-neutral-700" />
          </div>
        </div>

        {/* Variant B (winner) */}
        <div className="rounded-2xl bg-white/90 p-4 ring-1 ring-black/[0.04] shadow-[0_18px_36px_-18px_rgba(0,0,0,.25)] dark:bg-white/[0.06] dark:ring-white/[0.06]">
          <p className="mb-3 text-xs font-medium text-neutral-500">Variant B</p>
          <div className="space-y-2">
            <div className="h-2 rounded bg-neutral-200 dark:bg-neutral-800" />
            <div className="h-2 w-3/4 rounded bg-neutral-200 dark:bg-neutral-800" />
          </div>
          <div className="mt-4 space-y-2">
            <div className="h-3 w-[78%] rounded bg-[hsl(var(--primary)/0.35)]" />
            <div className="h-3 w-[66%] rounded bg-[hsl(var(--primary)/0.35)]" />
            <div className="h-3 w-[72%] rounded bg-[hsl(var(--primary)/0.35)]" />
          </div>
        </div>
      </div>
    </CardShell>
  );
}

/* 2) Revenu 5k -> 20k : spark bars up */
function MockRevenue() {
  return (
    <CardShell>
      <div className="mb-3 flex items-center justify-between">
        <span className="rounded-full bg-black/[0.04] px-3 py-1 text-xs font-medium dark:bg-white/[0.06]">
          Monthly revenue
        </span>
        <span className="text-xs font-semibold text-[hsl(var(--primary))]">
          +4× en 6 mois
        </span>
      </div>
      <div className="flex h-[12rem] items-end gap-2 rounded-2xl bg-white/80 p-4 ring-1 ring-black/[0.04] dark:bg-white/[0.04] dark:ring-white/[0.06]">
        {([12, 20, 24, 28, 36, 42, 50, 60, 72, 84] as const).map((h, i) => (
          <motion.div
            key={i}
            initial={{ height: 0, opacity: 0.6 }}
            animate={{ height: `${h}%`, opacity: 1 }}
            transition={{ duration: 0.5, delay: i * 0.06, ease: 'easeOut' }}
            className="w-6 rounded-md bg-[linear-gradient(180deg,hsl(var(--primary)/0.55),hsl(var(--primary)/0.22))]"
          />
        ))}
      </div>
      <div className="mt-4 flex items-center justify-between text-xs text-neutral-500">
        <span>5 000 €</span>
        <span className="font-semibold text-neutral-700 dark:text-neutral-200">
          → 20 000 €
        </span>
      </div>
    </CardShell>
  );
}

/* 3) Local Pack Google Maps : top 3 */
function MockMaps() {
  return (
    <CardShell>
      <div className="mb-3">
        <div className="rounded-xl bg-white/80 px-4 py-2 text-sm ring-1 ring-black/[0.04] dark:bg-white/[0.05] dark:ring-white/[0.06]">
          🔎 <span className="opacity-70">agence web essonne</span>
        </div>
      </div>
      <div className="space-y-2">
        {[1, 2, 3].map((rank) => (
          <div
            key={rank}
            className="flex items-center gap-3 rounded-2xl bg-white/90 p-4 ring-1 ring-black/[0.04] shadow-[0_12px_24px_-16px_rgba(0,0,0,.25)] dark:bg-white/[0.06] dark:ring-white/[0.06]"
          >
            <span className="grid size-6 place-items-center rounded-full bg-[hsl(var(--primary)/0.12)] text-[11px] font-bold text-[hsl(var(--primary))] ring-1 ring-[hsl(var(--primary)/0.35)]">
              {rank}
            </span>
            <div className="grow">
              <div className="h-3 w-40 rounded bg-neutral-200 dark:bg-neutral-800" />
              <div className="mt-1 h-2 w-24 rounded bg-neutral-200 dark:bg-neutral-800" />
            </div>
            <div className="text-[11px] text-neutral-500">4.9 ★</div>
          </div>
        ))}
        <div className="mt-1 text-center text-[12px] text-neutral-500">
          Top 3 confirmé sur nos secteurs.
        </div>
      </div>
    </CardShell>
  );
}

/* 4) Intégrations IA / RAG : pipeline pseudo-code */
function MockAI() {
  const reduced = useReducedMotion();
  return (
    <CardShell>
      <div className="mb-3 flex items-center gap-2">
        <span className="rounded-full bg-black/[0.04] px-3 py-1 text-xs font-medium dark:bg-white/[0.06]">
          Pipeline IA (RAG)
        </span>
        <span className="text-[11px] text-neutral-500">ROI-oriented</span>
      </div>
      <div className="grid grid-cols-[1.1fr_0.9fr] gap-4">
        {/* code noir */}
        <div className="rounded-2xl bg-black p-4 font-mono text-[12px] leading-6 text-slate-200 ring-1 ring-black/10">
          <div className="text-[11px] text-slate-400 mb-1">
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
        <div className="rounded-2xl bg-white/90 p-4 ring-1 ring-black/[0.04] dark:bg-white/[0.06] dark:ring-white/[0.06]">
          <p className="mb-2 text-xs font-medium text-neutral-500">KPIs</p>
          <div className="space-y-2 text-[12px]">
            <div className="flex items-center justify-between">
              <span>Coût</span>
              <span className="rounded-md bg-emerald-500/15 px-2 py-0.5 font-semibold text-emerald-600">
                ↓ 38%
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span>Temps de réponse</span>
              <span className="rounded-md bg-emerald-500/15 px-2 py-0.5 font-semibold text-emerald-600">
                ↓ 55%
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span>CSAT</span>
              <span className="rounded-md bg-[hsl(var(--primary)/0.12)] px-2 py-0.5 font-semibold text-[hsl(var(--primary))]">
                ↑ 21%
              </span>
            </div>
          </div>
        </div>
      </div>
    </CardShell>
  );
}

/* 5) Qualité & rapidité : timeline + badge */
function MockQuality() {
  return (
    <CardShell>
      <div className="mb-3 flex items-center justify-between">
        <span className="rounded-full bg-black/[0.04] px-3 py-1 text-xs font-medium dark:bg-white/[0.06]">
          Delivery plan
        </span>
        <span className="rounded-full bg-[hsl(var(--primary)/0.12)] px-3 py-1 text-xs font-semibold text-[hsl(var(--primary))] ring-1 ring-[hsl(var(--primary)/0.35)]">
          14 jours
        </span>
      </div>
      <div className="flex items-center justify-between rounded-2xl bg-white/90 p-5 ring-1 ring-black/[0.04] dark:bg-white/[0.06] dark:ring-white/[0.06]">
        {['Brief', 'Design', 'Build', 'QA', 'Go-Live'].map((s, i, arr) => (
          <div key={s} className="flex flex-1 items-center">
            <div className="grid place-items-center">
              <div className="grid size-8 place-items-center rounded-full bg-white ring-1 ring-black/[0.06] dark:bg-white/[0.08] dark:ring-white/[0.06]">
                <div
                  className={cn(
                    'size-4 rounded-full',
                    i < arr.length - 1
                      ? 'bg-[hsl(var(--primary))]'
                      : 'bg-neutral-300 dark:bg-neutral-700'
                  )}
                />
              </div>
              <div className="mt-2 text-[11px] text-neutral-500">{s}</div>
            </div>
            {i < arr.length - 1 && (
              <div className="mx-2 h-[2px] w-full rounded bg-[hsl(var(--primary)/0.25)]" />
            )}
          </div>
        ))}
      </div>
      <div className="mt-3 text-center text-xs text-neutral-500">
        Reconnu pour la qualité et la rapidité d’exécution.
      </div>
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

function useAutoIndex(len: number, ms = 3500) {
  const [i, setI] = React.useState(0);
  React.useEffect(() => {
    const id = setInterval(() => setI((x) => (x + 1) % len), ms);
    return () => clearInterval(id);
  }, [len, ms]);
  return i;
}

function MockupByIndex({ i }: { i: number }) {
  const map = [
    <MockConversion />,
    <MockRevenue />,
    <MockMaps />,
    <MockAI />,
    <MockQuality />,
  ];
  return map[i] ?? map[0];
}

/* ───────────────── main block ───────────────── */
export default function ImpactMap() {
  const i = useAutoIndex(FACTS.length);

  return (
    <section className="relative mx-auto w-full max-w-7xl px-6 md:px-10 py-28">
      {/* halos brand discrets */}
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

      <div className="mx-auto grid max-w-6xl items-center justify-center gap-12 md:grid-cols-2">
        {/* Colonne gauche : texte + phrase tournante dans un bloc verre */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="relative mx-auto w-full max-w-md"
        >
          <div className="overflow-hidden rounded-[2rem] border border-black/[0.04] bg-white/60 p-8 backdrop-blur-xl dark:border-white/[0.06] dark:bg-white/[0.04]">
            <h2 className="text-center md:text-left text-3xl md:text-4xl font-semibold tracking-[-0.02em] leading-tight text-neutral-900 dark:text-neutral-50">
              Des résultats concrets.
              <br />
              Une exécution sobre.
            </h2>

            <p className="mt-4 text-[15px] leading-relaxed text-neutral-800 dark:text-neutral-300">
              Moins d’effets, plus d’impact—avec un delivery net et maitrisé.
            </p>

            <div className="mt-6 relative overflow-hidden rounded-2xl border border-black/[0.05] bg-white/70 px-5 py-4 backdrop-blur-md dark:border-white/[0.07] dark:bg-white/[0.05]">
              <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-[hsl(var(--primary)/0.7)] to-[hsl(var(--primary)/0.4)]" />
              <AnimatePresence mode="wait">
                <motion.p
                  key={i}
                  initial={{ opacity: 0, y: 8, filter: 'blur(6px)' }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, y: -8, filter: 'blur(6px)' }}
                  transition={{ duration: 0.28, ease: 'easeOut' }}
                  className="relative z-[1] text-[15px] text-neutral-900 dark:text-neutral-100"
                >
                  <span className="mr-3 inline-block h-[7px] w-[7px] -translate-y-[2px] rounded-full bg-[hsl(var(--primary))] shadow-[0_8px_16px_hsl(var(--primary)/0.6)]" />
                  {FACTS[i]}
                </motion.p>
              </AnimatePresence>
            </div>
          </div>
        </motion.div>

        {/* Colonne droite : mockup synchronisé avec la phrase */}
        <motion.div
          className="flex justify-center"
          initial={{ opacity: 0, scale: 0.985 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 8, filter: 'blur(6px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: -8, filter: 'blur(6px)' }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
            >
              <MockupByIndex i={i} />
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
