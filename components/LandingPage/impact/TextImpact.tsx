'use client';

import * as React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

/* ====== DATA ====== */

/**
 * Pour chaque punchline :
 * - title: la phrase business
 * - mockup: JSX du petit visuel à droite
 */
const ITEMS = [
  {
    title: 'Jusqu’à +30% de conversion après refonte.',
    mockup: (
      <MockupCard>
        <MockupWindowLabel>Funnel avant / après</MockupWindowLabel>
        <div className="space-y-2">
          <MockupBar w="90%" />
          <MockupBar w="80%" />
          <MockupBar w="65%" />
        </div>
        <MockupCTA />
      </MockupCard>
    ),
  },
  {
    title: 'De 5 000 € à 20 000 € / mois avec IkoSystem.',
    mockup: (
      <MockupCard accent>
        <MockupWindowLabel>Dashboard revenus</MockupWindowLabel>
        <div className="flex items-end gap-1 h-16">
          <MockupBarCol h="40%" />
          <MockupBarCol h="55%" />
          <MockupBarCol h="80%" active />
        </div>
        <MockupStat label="MRR estimé" value="20K€ /mois" />
      </MockupCard>
    ),
  },
  {
    title: 'Top 3 sur Google Maps sur nos secteurs.',
    mockup: (
      <MockupCard>
        <MockupWindowLabel>Recherche locale</MockupWindowLabel>
        <div className="rounded-xl border border-black/10 dark:border-white/10 bg-white/70 dark:bg-white/[0.04] px-3 py-2 text-[11px] text-neutral-800 dark:text-neutral-200 shadow-[0_8px_24px_-6px_rgba(0,0,0,0.4)]">
          <div className="flex items-center gap-2">
            <div className="h-2 w-2 rounded-full bg-[hsl(var(--primary))] shadow-[0_0_8px_hsl(var(--primary)/0.8)]" />
            <span className="font-medium">Ikovaline – Agence web</span>
          </div>
          <div className="mt-1 text-[10px] text-neutral-500 dark:text-neutral-400">
            ⭐️⭐️⭐️⭐️⭐️ · “Visible direct en top résultats”
          </div>
        </div>
        <div className="mt-3 flex gap-2 text-[10px] text-neutral-500 dark:text-neutral-400">
          <span className="rounded-full border border-black/10 dark:border-white/10 bg-white/50 dark:bg-white/0 px-2 py-1">
            Essonne
          </span>
          <span className="rounded-full border border-black/10 dark:border-white/10 bg-white/50 dark:bg-white/0 px-2 py-1">
            Seine-et-Marne
          </span>
        </div>
      </MockupCard>
    ),
  },
  {
    title: 'Intégrations IA (ChatGPT, RAG) orientées ROI.',
    mockup: (
      <MockupCard accent>
        <MockupWindowLabel>Assistant IA</MockupWindowLabel>
        <MockupChatBubble side="left" label="Client">
          Peux-tu résumer les 12 leads d’hier ?
        </MockupChatBubble>
        <MockupChatBubble side="right" label="IA" glow>
          12 leads dont 5 qualifiés “achat 30j”.
        </MockupChatBubble>
        <MockupChatBubble side="right" label="IA" glow>
          Taux de réponse : 83%.
        </MockupChatBubble>
      </MockupCard>
    ),
  },
  {
    title: 'Reconnu pour la qualité et la rapidité d’exécution.',
    mockup: (
      <MockupCard>
        <MockupWindowLabel>Timeline projet</MockupWindowLabel>
        <MockupStep n={1} title="Kick-off" done />
        <MockupStep n={2} title="UX / UI" done />
        <MockupStep n={3} title="Dev & intégration" active />
        <MockupStep n={4} title="Go live" />
      </MockupCard>
    ),
  },
];

function useAutoIndex(len: number, ms = 3200) {
  const [i, setI] = React.useState(0);
  React.useEffect(() => {
    const id = setInterval(() => setI((x) => (x + 1) % len), ms);
    return () => clearInterval(id);
  }, [len, ms]);
  return i;
}

/* ====== SUB-COMPONENTS MOCKUP (mini UI cards à droite) ====== */

function Surface({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  // surface verre/matelassée qu’on va réutiliser
  return (
    <div
      className={cn(
        'relative rounded-[2rem] border border-black/5 bg-white/60 p-6 backdrop-blur-xl shadow-[0_40px_120px_-30px_rgba(0,0,0,0.4)]',
        'dark:border-white/[0.07] dark:bg-white/[0.03] dark:shadow-[0_60px_160px_-30px_rgba(0,0,0,0.9)]',
        className
      )}
      style={{
        WebkitBackdropFilter: 'blur(20px)',
        backdropFilter: 'blur(20px)',
      }}
    >
      {/* lueur interne haut */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-1/2 rounded-t-[2rem]"
        style={{
          background:
            'linear-gradient(to bottom, rgba(255,255,255,0.45), rgba(255,255,255,0.12), transparent)',
        }}
      />
      {/* contour interne */}
      <div className="pointer-events-none absolute inset-0 rounded-[2rem] ring-1 ring-white/40 dark:ring-white/[0.06]" />

      <div className="relative z-[1]">{children}</div>
    </div>
  );
}

function MockupCard({
  children,
  accent,
}: {
  children: React.ReactNode;
  accent?: boolean;
}) {
  return (
    <div
      className={cn(
        'relative w-full rounded-2xl p-4 text-[11px] leading-relaxed text-neutral-700 dark:text-neutral-300',
        'bg-white/60 backdrop-blur-md border border-black/[0.07] shadow-[0_24px_60px_-16px_rgba(0,0,0,0.5)]',
        'dark:bg-white/[0.04] dark:border-white/[0.08] dark:shadow-[0_40px_120px_-24px_rgba(0,0,0,0.9)]'
      )}
      style={{
        WebkitBackdropFilter: 'blur(12px)',
        backdropFilter: 'blur(12px)',
        backgroundImage: accent
          ? 'radial-gradient(circle at 80% 10%, hsl(var(--primary)/0.18) 0%, transparent 60%)'
          : undefined,
      }}
    >
      {children}
    </div>
  );
}

function MockupWindowLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-3 flex items-center gap-2 text-[10px] text-neutral-500 dark:text-neutral-400">
      <div className="flex gap-1">
        <span className="block h-[6px] w-[6px] rounded-full bg-red-400/80" />
        <span className="block h-[6px] w-[6px] rounded-full bg-yellow-300/80" />
        <span className="block h-[6px] w-[6px] rounded-full bg-green-400/80" />
      </div>
      <span className="truncate font-medium text-neutral-700 dark:text-neutral-300">
        {children}
      </span>
    </div>
  );
}

function MockupBar({ w }: { w: string }) {
  return (
    <div
      className="h-[10px] rounded-md bg-gradient-to-r from-neutral-200 to-neutral-300 dark:from-white/[0.08] dark:to-white/[0.02]"
      style={{ width: w }}
    />
  );
}

function MockupCTA() {
  return (
    <div className="mt-4 h-[36px] w-[60%] rounded-xl bg-[hsl(var(--primary)/0.15)] text-[10px] font-semibold text-[hsl(var(--primary))] shadow-[0_12px_30px_hsl(var(--primary)/0.4)] ring-1 ring-[hsl(var(--primary)/0.4)] flex items-center justify-center dark:bg-[hsl(var(--primary)/0.07)] dark:text-[hsl(var(--primary))] dark:ring-[hsl(var(--primary)/0.5)]">
      Call-to-action
    </div>
  );
}

function MockupBarCol({ h, active }: { h: string; active?: boolean }) {
  return (
    <div
      className={cn(
        'w-[14%] min-w-[14%] rounded-md bg-gradient-to-t',
        active
          ? 'from-[hsl(var(--primary)/0.4)] to-[hsl(var(--primary)/0.9)] shadow-[0_20px_40px_-8px_hsl(var(--primary)/0.6)]'
          : 'from-neutral-300 to-neutral-100 dark:from-white/[0.08] dark:to-white/[0.02]'
      )}
      style={{ height: h }}
    />
  );
}

function MockupStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="mt-4 text-[10px]">
      <div className="text-neutral-500 dark:text-neutral-400">{label}</div>
      <div className="font-semibold text-neutral-800 dark:text-neutral-100">
        {value}
      </div>
    </div>
  );
}

function MockupChatBubble({
  side,
  label,
  children,
  glow,
}: {
  side: 'left' | 'right';
  label: string;
  children: React.ReactNode;
  glow?: boolean;
}) {
  const isRight = side === 'right';
  return (
    <div
      className={cn(
        'mb-2 flex max-w-[90%] flex-col text-[10px]',
        isRight ? 'ml-auto items-end text-right' : 'items-start text-left'
      )}
    >
      <div className="mb-[2px] text-[9px] text-neutral-500 dark:text-neutral-400">
        {label}
      </div>
      <div
        className={cn(
          'rounded-xl px-3 py-2 leading-relaxed ring-1 text-[10px]',
          isRight
            ? 'bg-[hsl(var(--primary)/0.12)] text-[hsl(var(--primary))] ring-[hsl(var(--primary)/0.4)] dark:bg-[hsl(var(--primary)/0.07)] dark:text-[hsl(var(--primary))] dark:ring-[hsl(var(--primary)/0.5)]'
            : 'bg-white/70 text-neutral-700 ring-black/10 dark:bg-white/[0.05] dark:text-neutral-200 dark:ring-white/[0.1]'
        )}
        style={
          glow
            ? {
                boxShadow:
                  '0 16px 32px -8px hsl(var(--primary)/0.5),0_0_12px hsl(var(--primary)/0.8)',
              }
            : undefined
        }
      >
        {children}
      </div>
    </div>
  );
}

function MockupStep({
  n,
  title,
  done,
  active,
}: {
  n: number;
  title: string;
  done?: boolean;
  active?: boolean;
}) {
  return (
    <div className="mb-2 flex items-center gap-2 text-[10px] leading-tight">
      <div
        className={cn(
          'flex h-5 w-5 items-center justify-center rounded-full border text-[10px] font-semibold',
          done &&
            'border-green-400/50 bg-green-400/10 text-green-500 shadow-[0_8px_16px_-4px_rgba(16,185,129,0.5)]',
          active &&
            'border-[hsl(var(--primary)/0.5)] bg-[hsl(var(--primary)/0.1)] text-[hsl(var(--primary))] shadow-[0_8px_16px_-4px_hsl(var(--primary)/0.6)]',
          !done &&
            !active &&
            'border-neutral-400/30 bg-neutral-400/10 text-neutral-500 dark:border-white/20 dark:bg-white/[0.03] dark:text-neutral-300'
        )}
      >
        {n}
      </div>
      <div
        className={cn(
          'text-neutral-700 dark:text-neutral-200',
          done && 'text-green-500 dark:text-green-400',
          active && 'text-[hsl(var(--primary))]'
        )}
      >
        {title}
      </div>
    </div>
  );
}

/* ====== MAIN COMPONENT ====== */

export default function ImpactMap() {
  const i = useAutoIndex(ITEMS.length);

  return (
    <section className="relative mx-auto w-full max-w-7xl px-6 md:px-10 py-16 md:py-24">
      {/* halos soft brand autour de la carte */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-10 -left-10 h-64 w-64 blur-3xl opacity-70"
        style={{
          background:
            'radial-gradient(closest-side, hsl(var(--primary)/0.12), transparent 70%)',
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-0 right-0 h-64 w-64 translate-x-10 translate-y-10 blur-[80px] opacity-60"
        style={{
          background:
            'radial-gradient(closest-side, hsl(var(--primary)/0.08), transparent 70%)',
        }}
      />

      <div className="grid place-items-center">
        <Surface className="w-full max-w-5xl">
          {/* Headline bloc */}
          <div className="max-w-[32rem]">
            <h2 className="text-3xl md:text-4xl font-semibold tracking-[-0.02em] leading-tight text-neutral-900 dark:text-neutral-50">
              Des résultats concrets.
              <br className="hidden md:block" />
              Une exécution sobre.
            </h2>

            <p className="mt-4 text-[15px] leading-relaxed text-neutral-800 dark:text-neutral-300">
              Nous accompagnons des entreprises en France et à l’international
              avec une approche claire&nbsp;: moins d’effets, plus d’impact.
            </p>
          </div>

          {/* zone rotative texte + mockup */}
          <div className="mt-8 grid gap-6 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
            {/* gauche = punchline animée */}
            <div className="relative rounded-2xl border border-black/[0.07] bg-white/60 p-5 text-[15px] leading-relaxed backdrop-blur-md dark:border-white/[0.08] dark:bg-white/[0.04]">
              {/* barre de progression */}
              <div className="absolute inset-x-0 top-0 h-[2px]">
                <motion.span
                  key={i}
                  className="block h-full bg-[hsl(var(--primary))]"
                  initial={{ width: '0%' }}
                  animate={{ width: '100%' }}
                  transition={{ duration: 3.2, ease: 'linear' }}
                />
              </div>

              <div
                aria-hidden
                className="pointer-events-none absolute inset-x-0 top-0 h-1/2 rounded-t-2xl"
                style={{
                  background:
                    'linear-gradient(to bottom, rgba(255,255,255,0.4), rgba(255,255,255,0.12), transparent)',
                }}
              />

              <div className="relative z-[1]">
                <AnimatePresence mode="wait">
                  <motion.p
                    key={i}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.28, ease: 'easeOut' }}
                    className="text-neutral-900 dark:text-neutral-100"
                  >
                    <span className="mr-3 inline-block h-[7px] w-[7px] -translate-y-[2px] rounded-full bg-[hsl(var(--primary))] shadow-[0_8px_16px_hsl(var(--primary)/0.6)]" />
                    {ITEMS[i].title}
                  </motion.p>
                </AnimatePresence>
              </div>
            </div>

            {/* droite = mockup animé */}
            <div className="relative">
              <AnimatePresence mode="wait">
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 8, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -8, scale: 0.98 }}
                  transition={{ duration: 0.28, ease: 'easeOut' }}
                  className="relative"
                >
                  {ITEMS[i].mockup}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* footer valeurs */}
          <div className="mt-10 grid gap-6 text-[13px] leading-relaxed text-neutral-600 dark:text-neutral-400 md:grid-cols-3">
            <div>
              <p className="font-semibold text-neutral-900 dark:text-neutral-100 tracking-[-0.02em]">
                Cadre clair dès le départ.
              </p>
              <p className="mt-1">
                On définit l’objectif business, pas juste le “beau site”.
              </p>
            </div>

            <div>
              <p className="font-semibold text-neutral-900 dark:text-neutral-100 tracking-[-0.02em]">
                Allers-retours humains.
              </p>
              <p className="mt-1">
                Vous validez, on ajuste. Pas de jargon, pas de tunnel opaque.
              </p>
            </div>

            <div>
              <p className="font-semibold text-neutral-900 dark:text-neutral-100 tracking-[-0.02em]">
                Livrable exploitable.
              </p>
              <p className="mt-1">
                Prêt à présenter, vendre, pitcher. Pas une maquette figée.
              </p>
            </div>
          </div>
        </Surface>
      </div>
    </section>
  );
}
