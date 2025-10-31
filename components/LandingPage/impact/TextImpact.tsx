'use client';

import * as React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useReducedMotion } from 'framer-motion';

/* mini shimmer (barres grises animées) */
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

/* mockup type code + preview */
function CodeMock() {
  const reduced = useReducedMotion();
  const code = `export default function Hero() {
  return (<section>…</section>)
}`;

  return (
    <div
      className="relative isolate flex h-[22rem] w-full max-w-xl flex-col justify-center overflow-hidden rounded-[2rem] border border-black/[0.04] bg-white/60 p-6 shadow-[0_30px_100px_-40px_rgba(0,0,0,0.35)] backdrop-blur-xl dark:border-white/[0.06] dark:bg-white/[0.03] dark:shadow-[0_60px_160px_-40px_rgba(0,0,0,0.9)]"
      style={{
        WebkitBackdropFilter: 'blur(20px)',
        backdropFilter: 'blur(20px)',
      }}
    >
      <div className="grid h-full grid-cols-[1.1fr_0.9fr] gap-5">
        {/* ==== Éditeur gauche ==== */}
        <motion.div
          className="rounded-[1.5rem] bg-[#000] p-4 font-mono text-[12px] leading-6 text-slate-200 ring-1 ring-black/10 shadow-[0_24px_48px_-24px_rgba(0,0,0,.35)]"
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="text-[11px] text-slate-400 mb-1">
            /components/Hero.tsx
          </div>
          <div className="text-slate-300 whitespace-pre-wrap leading-relaxed">
            <motion.span
              animate={
                reduced
                  ? {}
                  : {
                      opacity: [0.6, 1, 0.6],
                    }
              }
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            >
              {code}
            </motion.span>
          </div>
        </motion.div>

        {/* ==== Preview droite ==== */}
        <motion.div
          className="relative rounded-[1.5rem] bg-white p-4 ring-1 ring-black/[0.02] shadow-[0_24px_48px_-24px_rgba(0,0,0,.15)] dark:bg-neutral-950 dark:ring-white/[0.04]"
          initial={{ y: 12, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
        >
          <div className="h-full rounded-lg bg-gradient-to-br from-[hsl(var(--primary)/0.15)] to-transparent p-4">
            <motion.div
              animate={
                reduced
                  ? {}
                  : {
                      scale: [1, 1.01, 1],
                      transition: {
                        duration: 6,
                        repeat: Infinity,
                        ease: 'easeInOut',
                      },
                    }
              }
              className="rounded-xl bg-white/90 p-4 shadow-[0_16px_34px_-20px_rgba(0,0,0,.3)] dark:bg-neutral-900/80"
            >
              <Shimmer className="mb-2 h-6 w-40 rounded" />
              <div className="space-y-2">
                <Shimmer className="h-2 rounded" />
                <Shimmer className="h-2 w-3/4 rounded" />
              </div>
              <Shimmer className="mt-4 h-32 rounded-lg" />
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

/* données textuelles à gauche */
const FACTS = [
  'Jusqu’à +30% de conversion après refonte.',
  'De 5 000 € à 20 000 € / mois avec IkoSystem.',
  'Top 3 sur Google Maps sur nos secteurs.',
  'Intégrations IA (ChatGPT, RAG) orientées ROI.',
  'Reconnu pour la qualité et la rapidité d’exécution.',
];

function useAutoIndex(len: number, ms = 3500) {
  const [i, setI] = React.useState(0);
  React.useEffect(() => {
    const id = setInterval(() => setI((x) => (x + 1) % len), ms);
    return () => clearInterval(id);
  }, [len, ms]);
  return i;
}

/* ====== MAIN COMPONENT ====== */
export default function ImpactMap() {
  const i = useAutoIndex(FACTS.length);

  return (
    <section className="relative mx-auto w-full max-w-7xl px-6 md:px-10 py-28">
      {/* halos discrets brand */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-20 left-0 h-72 w-72 blur-3xl opacity-60"
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

      {/* centre global */}
      <div className="mx-auto grid max-w-6xl items-center justify-center gap-12 md:grid-cols-2">
        {/* gauche */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="relative mx-auto max-w-md text-center md:text-left"
        >
          <h2 className="text-3xl md:text-4xl font-semibold tracking-[-0.02em] leading-tight text-neutral-900 dark:text-neutral-50">
            Des résultats concrets.
            <br />
            Une exécution sobre.
          </h2>

          <p className="mt-4 text-[15px] leading-relaxed text-neutral-800 dark:text-neutral-300">
            Nous accompagnons des entreprises avec une approche claire&nbsp;:
            moins d’effets, plus d’impact.
          </p>

          {/* phrase animée */}
          <div className="mt-6 relative overflow-hidden rounded-2xl border border-black/[0.05] bg-white/60 px-5 py-4 backdrop-blur-md dark:border-white/[0.07] dark:bg-white/[0.04]">
            <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-[hsl(var(--primary)/0.7)] to-[hsl(var(--primary)/0.4)]" />
            <AnimatePresence mode="wait">
              <motion.p
                key={i}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25, ease: 'easeOut' }}
                className="relative z-[1] text-[15px] text-neutral-900 dark:text-neutral-100"
              >
                <span className="mr-3 inline-block h-[7px] w-[7px] -translate-y-[2px] rounded-full bg-[hsl(var(--primary))] shadow-[0_8px_16px_hsl(var(--primary)/0.6)]" />
                {FACTS[i]}
              </motion.p>
            </AnimatePresence>
          </div>
        </motion.div>

        {/* droite */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="flex justify-center"
        >
          <CodeMock />
        </motion.div>
      </div>
    </section>
  );
}
