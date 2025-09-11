'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { StickyItem, StickyScroll } from './StickyScroll';

/* ----------------------------- EASINGS & HELPERS ---------------------------- */

const EASEIO = [0.65, 0, 0.35, 1] as const; // standard ease-in-out

/* Compteur “continuel” : boucle des micro-variations pour garder la vie */
function useRollingNumber(base: number, amplitude = 0.6, period = 2600) {
  const [val, setVal] = useState(base);
  useEffect(() => {
    let t = 0;
    const id = setInterval(() => {
      // petite vague sinusoïdale, puis retour au base : vivant mais stable
      const w = Math.sin((t / period) * Math.PI * 2) * amplitude;
      setVal(Number((base + w).toFixed(1)));
      t += 120;
    }, 120);
    return () => clearInterval(id);
  }, [base, amplitude, period]);
  return val;
}

/* Typewriter infini : tape → pause → efface → pause (fluide pour toujours) */
function TypewriterLoop({
  text,
  speed = 34, // chars/sec
  backspeed = 54, // effacement plus vif
  pause = 900, // pause aux extrémités
  className,
}: {
  text: string;
  speed?: number;
  backspeed?: number;
  pause?: number;
  className?: string;
}) {
  const [i, setI] = useState(0);
  const [dir, setDir] = useState<1 | -1>(1);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) {
      setI(text.length);
      return;
    }

    let id: ReturnType<typeof setTimeout> | null = null;

    if (i === text.length && dir === 1) {
      id = setTimeout(() => setDir(-1), pause);
    } else if (i === 0 && dir === -1) {
      id = setTimeout(() => setDir(1), pause);
    } else {
      const s = dir === 1 ? 1000 / speed : 1000 / backspeed;
      id = setTimeout(() => setI((n) => n + dir), s);
    }

    return () => {
      if (id) clearTimeout(id);
    };
  }, [i, dir, text, speed, backspeed, pause, reduced]);

  return (
    <span className={className}>
      {text.slice(0, i)}
      {!reduced && <span className="opacity-60">▌</span>}
    </span>
  );
}

/* Shimmer pro (plus doux, infini) */
function Shimmer({ className = '' }: { className?: string }) {
  return (
    <div className={`relative overflow-hidden ${className}`}>
      <div className="absolute inset-0 -translate-x-full animate-[shimmer_2.8s_linear_infinite] bg-gradient-to-r from-transparent via-black/5 to-transparent dark:via-white/10" />
      <style jsx>{`
        @keyframes shimmer {
          100% {
            transform: translateX(100%);
          }
        }
      `}</style>
    </div>
  );
}

/* ------------------------------ MAC WINDOW SHELL ---------------------------- */

function MacWindow({
  children,
  title = 'ikovaline.app',
}: {
  children: React.ReactNode;
  title?: string;
}) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      className="h-full w-full overflow-hidden rounded-2xl bg-white dark:bg-neutral-900"
      animate={
        reduced
          ? {}
          : {
              boxShadow: [
                '0 24px 56px -28px rgba(0,0,0,.32)',
                '0 28px 62px -28px rgba(0,0,0,.34)',
                '0 24px 56px -28px rgba(0,0,0,.32)',
              ],
            }
      }
      transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
    >
      <div className="flex items-center gap-2 px-4 py-3">
        {['#FF5F57', '#FEBB2E', '#28C840'].map((c, i) => (
          <motion.span
            key={c + i}
            className="h-3 w-3 rounded-full"
            style={{ backgroundColor: c }}
            animate={reduced ? {} : { scale: [1, 1.06, 1] }}
            transition={{
              duration: 2.4,
              repeat: Infinity,
              ease: EASEIO,
              delay: i * 0.15,
            }}
          />
        ))}
        <div className="mx-auto rounded-full bg-black/5 px-3 py-1 text-xs font-medium text-neutral-600 dark:bg-white/10 dark:text-neutral-300">
          {title}
        </div>
      </div>
      <div className="h-px w-full bg-gradient-to-r from-transparent via-black/10 to-transparent dark:via-white/10" />
      <div className="relative h-[calc(100%-44px)] p-5">{children}</div>
    </motion.div>
  );
}

/* --------------------------------- MOCK #1 --------------------------------- */
/* Analytics : halo qui respire, grille subtile, courbe SVG tracée en boucle + point “runner” */

function AnalyticsMock() {
  const lcp = useRollingNumber(2.4, 0.2, 3200);
  const inp = useRollingNumber(0.9, 0.1, 3600);
  const reduced = useReducedMotion();

  // Courbe dans le viewBox (360x120)
  const pathD = 'M0,60 C40,20 80,100 120,58 S200,90 240,62 320,35 360,60';

  // Refs + état pour longueur réelle du path
  const measureRef = React.useRef<SVGPathElement | null>(null);
  const [L, setL] = React.useState(0);

  React.useEffect(() => {
    if (measureRef.current) {
      const len = measureRef.current.getTotalLength();
      if (!Number.isNaN(len) && isFinite(len)) setL(len);
    }
  }, [pathD]);

  // Paramètres du segment (après mesure)
  const dash = Math.max(L * 0.1, 22); // 22% de la longueur, min 42px
  const duration = Math.max((L + dash) / 140, 4); // ~120px/s, min 2.8s

  return (
    <MacWindow title="Analytics · Realtime">
      {/* KPIs simples */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: 'Score', v: '100' },
          { label: 'LCP', v: `${lcp.toFixed(1)}s` },
          { label: 'INP', v: `${inp.toFixed(1)}%` },
        ].map((item, i) => (
          <motion.div
            key={i}
            className="rounded-xl bg-white p-4 ring-1 ring-black/5 shadow-[0_18px_40px_-24px_rgba(0,0,0,.25)] dark:bg-neutral-900/90 dark:ring-white/10"
            initial={{ opacity: 0.85, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: EASEIO, delay: i * 0.06 }}
          >
            <div className="text-[11px] uppercase tracking-wide text-neutral-500 dark:text-neutral-400">
              {item.label}
            </div>
            <div className="mt-2 text-2xl font-extrabold text-neutral-900 dark:text-neutral-50">
              {item.v}
            </div>
            <div className="mt-1 text-xs text-green-600">+ mieux que P75</div>
          </motion.div>
        ))}
      </div>

      {/* Chart */}
      <div className="mt-6 rounded-2xl bg-gradient-to-b from-white to-white/60 p-4 ring-1 ring-black/5 shadow-[0_28px_56px_-28px_rgba(0,0,0,.28)] dark:from-neutral-900 dark:to-neutral-900/60 dark:ring-white/10">
        <div className="relative h-40 w-full overflow-hidden rounded-lg">
          {/* grille lisible */}
          <div
            className="absolute inset-0 z-0 rounded-lg"
            style={{
              backgroundImage:
                'linear-gradient(to right, rgba(0,0,0,.10) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,0,0,.10) 1px, transparent 1px)',
              backgroundSize: '28px 28px',
            }}
          />

          <svg
            viewBox="0 0 360 120"
            className="absolute inset-0 z-10"
            preserveAspectRatio="none"
          >
            {/* zone sous la courbe (teinte légère) */}
            <path
              d={`${pathD} L 360 120 L 0 120 Z`}
              fill="rgba(44,183,255,0.10)"
            />

            {/* path de mesure — DOIT être rendu pour que getTotalLength marche */}
            <path ref={measureRef} d={pathD} fill="none" stroke="transparent" />

            {/* ligne de base (toujours visible) – couleur solide haute lisibilité */}
            <path
              d={pathD}
              fill="none"
              stroke="#1E9BEA" // bleu soutenu
              strokeOpacity="0.35" // discrète
              strokeWidth={3}
              vectorEffect="non-scaling-stroke"
            />

            {/* segment animé très visible */}
            {!reduced && L > 0 && (
              <motion.path
                d={pathD}
                fill="none"
                stroke="#19B1FF" // bleu vif
                strokeWidth={2}
                strokeLinecap="round"
                vectorEffect="non-scaling-stroke"
                style={{ strokeDasharray: `${dash} ${L}` }}
                animate={{ strokeDashoffset: [0, -(L + dash)] }}
                transition={{ duration, repeat: Infinity, ease: 'linear' }}
              />
            )}
          </svg>
        </div>
      </div>
    </MacWindow>
  );
}

/* --------------------------------- MOCK #2 --------------------------------- */
function KanbanMock() {
  const cols = useMemo(() => ['SEO', 'Ads', 'Contenu'], []);
  const reduced = useReducedMotion();

  const Badge = ({ children }: { children: React.ReactNode }) => (
    <motion.span
      className="rounded-full bg-[#2CB7FF1a] px-2 py-0.5 text-[10px] font-semibold text-[#2CB7FF]"
      animate={
        reduced
          ? {}
          : {
              boxShadow: [
                '0 0 0 0 rgba(44,183,255,.0)',
                '0 0 0 6px rgba(44,183,255,.08)',
                '0 0 0 0 rgba(44,183,255,.0)',
              ],
            }
      }
      transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
    >
      {children}
    </motion.span>
  );

  const Card = ({
    children,
    delay = 0,
  }: {
    children: React.ReactNode;
    delay?: number;
  }) => {
    const reduced = useReducedMotion();

    return (
      <div className="relative overflow-hidden rounded-lg bg-white p-3 text-xs ring-1 ring-black/5 shadow-[0_14px_28px_-18px_rgba(0,0,0,.3)] dark:bg-neutral-900 dark:ring-white/10">
        {/* sheen continu (reset hors cadre) */}
        {!reduced && (
          <div
            className="pointer-events-none absolute inset-y-0 -left-1 w-1/3"
            style={{
              background:
                'linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,.25) 50%, rgba(255,255,255,0) 100%)',
              animation: `sweep 4.2s linear ${delay}s infinite`,
            }}
          />
        )}

        <div className="relative z-10">{children}</div>

        {/* progress bar : défilement **continu** */}
        <div className="relative mt-2 h-1 w-full overflow-hidden rounded bg-neutral-200 dark:bg-neutral-800">
          {!reduced && (
            <div
              className="absolute inset-y-0 rounded"
              style={{
                // largeur du “runner” (bande bleue)
                width: '40%',
                backgroundImage: 'linear-gradient(90deg, #2CB7FF, #00A8FF)',
                backgroundSize: '200% 100%',
                // le reset se fait quand la bande est déjà sortie à droite
                animation: `runner 2.6s linear ${delay + 0.15}s infinite`,
              }}
            />
          )}
        </div>

        {/* keyframes locales */}
        <style jsx>{`
          @keyframes sweep {
            0% {
              transform: translateX(-40%);
            }
            100% {
              transform: translateX(140%);
            }
          }
          @keyframes runner {
            0% {
              transform: translateX(-40%);
            }
            100% {
              transform: translateX(100%);
            }
          }
        `}</style>
      </div>
    );
  };

  return (
    <MacWindow title="Plan d’acquisition">
      <div className="grid h-full grid-cols-3 gap-4 max-sm:hidden">
        {cols.map((col, i) => (
          <motion.div
            key={col}
            className="flex flex-col rounded-xl bg-white/90 p-3 ring-1 ring-black/5 shadow-[0_18px_40px_-24px_rgba(0,0,0,.25)] dark:bg-neutral-900/80 dark:ring-white/10"
            initial={{ opacity: 0, y: 12, scale: 0.985, filter: 'blur(6px)' }}
            animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
            transition={{
              duration: 0.6,
              ease: [0.22, 1, 0.36, 1],
              delay: i * 0.06,
            }}
            style={{ willChange: 'transform, filter' }}
          >
            <div className="mb-2 flex items-center justify-between">
              <span className="text-xs font-semibold text-neutral-700 dark:text-neutral-300">
                {col}
              </span>
              <Badge>{['To-do', 'Running', 'Review'][i]}</Badge>
            </div>

            <div className="space-y-2">
              <Card delay={0.0}>• Task #1 — {col}</Card>
              <Card delay={0.35}>• Task #2 — {col}</Card>
              <Card delay={0.7}>• Task #3 — {col}</Card>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Mobile : 2 colonnes, mêmes effets, sans lourdeur */}
      <div className="grid h-full grid-cols-2 sm:hidden gap-4">
        {['SEO', 'Ads'].map((col, i) => (
          <motion.div
            key={col}
            className="flex flex-col rounded-xl bg-white/90 p-3 ring-1 ring-black/5 shadow-[0_18px_40px_-24px_rgba(0,0,0,.25)] dark:bg-neutral-900/80 dark:ring-white/10"
            initial={{ opacity: 0, y: 12, scale: 0.985, filter: 'blur(6px)' }}
            animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
            transition={{
              duration: 0.6,
              ease: [0.22, 1, 0.36, 1],
              delay: i * 0.06,
            }}
            style={{ willChange: 'transform, filter' }}
          >
            <div className="mb-2 flex items-center justify-between">
              <span className="text-xs font-semibold text-neutral-700 dark:text-neutral-300">
                {col}
              </span>
              <Badge>{['To-do', 'Running'][i]}</Badge>
            </div>
            <div className="space-y-2">
              <Card delay={0.0}>• Task #1 — {col}</Card>
              <Card delay={0.35}>• Task #2 — {col}</Card>
              <Card delay={0.7}>• Task #3 — {col}</Card>
            </div>
          </motion.div>
        ))}
      </div>
    </MacWindow>
  );
}

/* --------------------------------- MOCK #3 --------------------------------- */
/* Code : typewriter infini + preview qui “respire” + shimmers continus */

function CodeMock() {
  const code = `export default function Hero() {
  return (<section>…</section>)
}`;
  const reduced = useReducedMotion();

  return (
    <MacWindow title="Next.js · components/Home.tsx">
      <div className="grid h-full grid-cols-[1.2fr_.9fr] gap-4">
        {/* Editor */}
        <motion.div
          className="rounded-xl bg-[#0B1020] p-4 font-mono text-[12px] leading-6 text-slate-200 ring-1 ring-black/20 shadow-[0_24px_48px_-24px_rgba(0,0,0,.45)]"
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
        >
          <div className="text-[11px] text-slate-400">/components/Hero.tsx</div>
          <div className="text-slate-300 whitespace-pre-wrap">
            <TypewriterLoop text={code} speed={30} backspeed={50} pause={900} />
          </div>
        </motion.div>

        {/* Preview */}
        <motion.div
          className="relative rounded-xl bg-white p-4 ring-1 ring-black/5 shadow-[0_28px_56px_-28px_rgba(0,0,0,.35)] dark:bg-neutral-950 dark:ring-white/10"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          animate={reduced ? {} : { y: [0, -1.2, 0] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
        >
          <div className="h-full rounded-lg bg-gradient-to-br from-[#2CB7FF1a] to-transparent p-4">
            <motion.div
              animate={reduced ? {} : { scale: [1, 1.01, 1] }}
              transition={{ duration: 6, repeat: Infinity, ease: EASEIO }}
              className="rounded-xl bg-white/90 p-4 shadow-[0_16px_34px_-20px_rgba(0,0,0,.3)] dark:bg-neutral-900/80"
            >
              <Shimmer className="mb-2 h-6 w-40 rounded bg-neutral-200 dark:bg-neutral-800" />
              <div className="space-y-2">
                <Shimmer className="h-2 rounded bg-neutral-200 dark:bg-neutral-800" />
                <Shimmer className="h-2 w-3/4 rounded bg-neutral-200 dark:bg-neutral-800" />
              </div>
              <Shimmer className="mt-4 h-32 rounded-lg bg-neutral-200 dark:bg-neutral-800" />
            </motion.div>
          </div>
        </motion.div>
      </div>
    </MacWindow>
  );
}

/* --------------------------------- MOCK #4 --------------------------------- */
/* KPI : micro-variations infinies, lueur de fond continue, trend qui glisse */

function KPIMock() {
  const leads = useRollingNumber(124, 0.4, 2800);
  const taux = useRollingNumber(6.3, 0.15, 3000);
  const cpl = useRollingNumber(14.2, 0.2, 2600);
  const ca = useRollingNumber(48.6, 0.3, 3200);

  const items = [
    { label: 'Leads', val: `${leads.toFixed(1)}`, trend: '+18%' },
    { label: 'Taux conv.', val: `${taux.toFixed(1)}%`, trend: '+0.8pt' },
    { label: 'CPL', val: `${cpl.toFixed(2)}€`, trend: '-12%' },
    { label: 'CA', val: `${ca.toFixed(1)}k€`, trend: '+22%' },
  ];
  const reduced = useReducedMotion();

  return (
    <MacWindow title="Reporting · KPI hebdo">
      <div className="grid h-full grid-cols-2 gap-4">
        {items.map((k, i) => (
          <motion.div
            key={i}
            className="relative overflow-hidden rounded-xl bg-white p-4 ring-1 ring-black/5 shadow-[0_24px_48px_-24px_rgba(0,0,0,.28)] dark:bg-neutral-900 dark:ring-white/10"
            initial={{ y: 10, scale: 0.98 }}
            whileInView={{ y: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.5 }}
          >
            {/* lueur subtile en fond (infinie) */}
            <motion.div
              className="pointer-events-none absolute -inset-1"
              style={{
                background:
                  'radial-gradient(120px 60px at 20% 20%, rgba(44,183,255,.10), transparent 60%)',
              }}
              animate={reduced ? {} : { opacity: [0.35, 0.6, 0.35] }}
              transition={{ duration: 8 + i, repeat: Infinity, ease: 'linear' }}
            />
            <div className="text-[11px] uppercase tracking-wide text-neutral-500 dark:text-neutral-400">
              {k.label}
            </div>
            <div className="mt-2 text-2xl font-extrabold text-neutral-900 dark:text-neutral-50">
              {k.val}
            </div>
            <motion.div
              initial={{ x: -8, opacity: 0.6 }}
              animate={reduced ? {} : { x: [-8, 0, -8] }}
              transition={{
                duration: 3 + i * 0.2,
                repeat: Infinity,
                ease: EASEIO,
              }}
              className={
                k.trend.startsWith('+')
                  ? 'text-emerald-600 text-xs'
                  : 'text-red-600 text-xs'
              }
            >
              {k.trend}
            </motion.div>
          </motion.div>
        ))}
      </div>
    </MacWindow>
  );
}

/* ------------------------------- STICKY SECTION ----------------------------- */

const content: StickyItem[] = [
  {
    title: 'Audit & Objectifs',
    description:
      'Audit complet de votre présence en ligne. Forces, freins, opportunités. On pose des objectifs clairs et mesurables.',
    content: <AnalyticsMock />,
  },
  {
    title: 'Stratégie Digitale Personnalisée',
    description:
      'Local SEO, contenu, Google Business Profile, Google Ads : un plan d’acquisition sur-mesure, orienté ROI.',
    content: <KanbanMock />,
  },
  {
    title: 'Conception & Optimisation',
    description:
      'Design system, Next.js, performance, SEO technique. Du pixel au code, tout est pensé conversion.',
    content: <CodeMock />,
  },
  {
    title: 'Suivi & Résultats',
    description:
      'Pilotage continu, reporting transparent, amélioration durable des indicateurs clés.',
    content: <KPIMock />,
  },
];

export default function MethodologieSticky() {
  return (
    <section className="relative mx-auto w-full max-w-7xl px-4 py-16 md:py-24">
      <header className="mx-auto max-w-3xl text-center">
        <span className="inline-flex items-center rounded-full border border-[#2CB7FF]/25 px-3 py-1 text-xs font-semibold text-[#2CB7FF]">
          Méthodologie Ikovaline
        </span>
        <h2 className="mt-4 text-4xl font-extrabold leading-tight tracking-tight text-neutral-900 dark:text-neutral-200 md:text-6xl">
          De l’idée à un <span className="text-[#2CB7FF]">projet réussi</span>.
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-[17px] leading-7 text-neutral-600 dark:text-neutral-300">
          Une progression claire, visuelle, et orientée résultats avec un aperçu
          concret de chaque étape.
        </p>
      </header>

      <div className="mt-10">
        <StickyScroll
          content={content}
          contentClassName="ring-1 ring-black/10 dark:ring-white/10"
          className="rounded-3xl"
        />
      </div>
    </section>
  );
}
