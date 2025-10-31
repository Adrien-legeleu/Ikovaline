'use client';
import { motion } from 'framer-motion';
import type { CategoryId } from '@/lib/catalog';
import { CATALOG as CAT } from '@/lib/catalog';
import {
  MonitorSmartphone,
  ShoppingCart,
  Rocket,
  Landmark,
  Blocks,
} from 'lucide-react';

const ICONS: Record<CategoryId, any> = {
  landing: Rocket,
  vitrine: Landmark,
  ecommerce: ShoppingCart,
  funnel: Blocks,
  saas: MonitorSmartphone,
};

/* -------------------------
   FRAME GLOBALE DES MOCKUPS
   - même header type "fenêtre app"
   - même fond
   - même border ultra light
   - même arrondis
--------------------------*/

function Frame({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={[
        'w-full h-[140px] rounded-2xl flex flex-col overflow-hidden',
        'bg-neutral-50 dark:bg-neutral-800',
        'border border-black/[0.02] dark:border-white/5',
        'shadow-inner shadow-black/[0.02]',
        'text-[10px] leading-tight',
      ].join(' ')}
    >
      {/* header style macOS */}
      <div className="flex items-center justify-between px-3 py-2 border-b border-black/[0.02] dark:border-white/10 text-[10px]">
        <div className="flex items-center gap-1.5">
          <div className="size-2.5 rounded-full bg-red-400/90" />
          <div className="size-2.5 rounded-full bg-amber-300/90" />
          <div className="size-2.5 rounded-full bg-green-400/90" />
        </div>
        <div className="px-2 py-[2px] rounded-full bg-white/60 text-neutral-600 border border-black/[0.02] shadow-lg shadow-black/[0.02] dark:bg-neutral-700/60 dark:text-neutral-200 dark:border-white/10">
          {title}
        </div>
        <div className="w-5" />
      </div>

      <div className="flex-1 p-3 flex flex-col">{children}</div>
    </div>
  );
}

/* -------------------------
   MOCKUP: LANDING
   - headline
   - sub
   - CTA
--------------------------*/
function MockupLanding() {
  return (
    <Frame title="Landing · Hero">
      <div className="space-y-1.5">
        <div className="h-3 w-24 rounded-xl bg-gradient-to-r from-sky-400/40 to-sky-400/0" />
        <div className="h-3.5 w-2/3 rounded-xl bg-black/10 dark:bg-white/20" />
        <div className="h-2.5 w-1/2 rounded-xl bg-black/5 dark:bg-white/10" />
      </div>

      <div className="mt-auto flex">
        <div className="h-7 mt-1.5 w-24 rounded-xl bg-sky-500/10 text-[10px] font-medium text-sky-600 dark:text-sky-300 border border-sky-500/[0.02] flex items-center justify-center">
          Call to action
        </div>
      </div>
    </Frame>
  );
}

/* -------------------------
   MOCKUP: SITE VITRINE
   - deux "cards service"
   - description sous les cards
--------------------------*/
function MockupVitrine() {
  return (
    <Frame title="Vitrine · Sections">
      <div className="flex gap-2">
        <div className="flex-1 h-12 rounded-2xl bg-white/70 dark:bg-white/5 border border-black/[0.02] dark:border-white/10 shadow-[0_2px_4px_rgba(0,0,0,0.02)]" />
        <div className="flex-1 h-12 rounded-2xl bg-white/40 dark:bg-white/5 border border-black/[0.02] dark:border-white/10 shadow-[0_2px_4px_rgba(0,0,0,0.02)]" />
      </div>

      <div className="mt-3 h-2.5 w-3/4 rounded-md bg-black/10 dark:bg-white/20" />
      <div className="mt-1 h-2 w-1/2 rounded-md bg-black/5 dark:bg-white/10" />
    </Frame>
  );
}

/* -------------------------
   MOCKUP: E-COMMERCE
   - KPIs en haut
   - mini area chart ventes
--------------------------*/
function MockupEcom() {
  return (
    <Frame title="E-commerce · Ventes">
      {/* KPIs row */}
      <div className="grid grid-cols-3 gap-2 font-medium text-[10px] leading-[1.15]">
        <div className="rounded-2xl border border-black/[0.02] dark:border-white/5 bg-white dark:bg-neutral-900 p-2 shadow-lg shadow-black/[0.02]">
          <div className="text-[9px] text-neutral-500 dark:text-neutral-400">
            Panier
          </div>
          <div className="text-neutral-800 dark:text-white text-sm font-semibold">
            68€
          </div>
          <div className="text-[9px] text-emerald-600 dark:text-emerald-400">
            +12%
          </div>
        </div>
        <div className="rounded-2xl border border-black/[0.02] dark:border-white/5 bg-white dark:bg-neutral-900 p-2 shadow-lg shadow-black/[0.02]">
          <div className="text-[9px] text-neutral-500 dark:text-neutral-400">
            Tx conv.
          </div>
          <div className="text-neutral-800 dark:text-white text-sm font-semibold">
            2.3%
          </div>
          <div className="text-[9px] text-emerald-600 dark:text-emerald-400">
            + mieux
          </div>
        </div>
        <div className="rounded-2xl border border-black/[0.02] dark:border-white/5 bg-white dark:bg-neutral-900 p-2 shadow-lg shadow-black/[0.02]">
          <div className="text-[9px] text-neutral-500 dark:text-neutral-400">
            CA /j
          </div>
          <div className="text-neutral-800 dark:text-white text-sm font-semibold">
            1.9k€
          </div>
          <div className="text-[9px] text-emerald-600 dark:text-emerald-400">
            ↑ stable
          </div>
        </div>
      </div>

      {/* mini chart */}
      <div className="mt-2 flex-1 rounded-lg border border-black/[0.02] dark:border-white/5 bg-gradient-to-b from-emerald-50 to-emerald-100/30 dark:from-emerald-900/20 dark:to-emerald-900/5 relative overflow-hidden">
        <svg
          viewBox="0 0 100 28"
          preserveAspectRatio="none"
          className="absolute inset-0 w-full h-full"
        >
          <path
            d="M0,20 C10,16 20,14 30,18 C40,22 50,12 60,15 C70,18 80,12 90,14 C95,15 100,17 100,17 L100,28 L0,28 Z"
            fill="rgba(16,185,129,0.15)"
          />
          <path
            d="M0,20 C10,16 20,14 30,18 C40,22 50,12 60,15 C70,18 80,12 90,14 C95,15 100,17 100,17"
            fill="none"
            stroke="rgba(16,185,129,1)"
            strokeWidth={1.5}
            strokeLinecap="round"
          />
        </svg>
      </div>
    </Frame>
  );
}

/* -------------------------
   MOCKUP: FUNNEL
   - pipeline Visiteur → Lead → Paiement + % conv
   - un mini bloc "conversion ↑"
--------------------------*/
function MockupFunnel() {
  return (
    <Frame title="Tunnel · Parcours">
      <div className="text-[10px] font-medium text-neutral-700 dark:text-neutral-200 space-y-2">
        <div className="flex items-center gap-2">
          <div className="size-2.5 rounded-full bg-sky-500" />
          <div>Visiteur</div>
          <div className="flex-1 h-[2px] bg-gradient-to-r from-sky-500/60 to-sky-500/0" />
          <div className="text-[9px] text-neutral-500 dark:text-neutral-400">
            100%
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="size-2.5 rounded-full bg-sky-400" />
          <div>Lead</div>
          <div className="flex-1 h-[2px] bg-gradient-to-r from-sky-400/60 to-sky-400/0" />
          <div className="text-[9px] text-neutral-500 dark:text-neutral-400">
            14%
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="size-2.5 rounded-full bg-emerald-500" />
          <div>Paiement</div>
          <div className="flex-1 h-[2px] bg-gradient-to-r from-emerald-500/60 to-emerald-500/0" />
          <div className="text-[9px] text-emerald-600 dark:text-emerald-400 font-semibold">
            4.9%
          </div>
        </div>
      </div>

      <div className="mt-auto flex justify-end">
        <div className="rounded-lg border border-black/[0.02] dark:border-white/5 bg-white dark:bg-neutral-900 px-2 py-[3px] text-[9px] font-medium text-emerald-600 dark:text-emerald-400 shadow-lg shadow-black/[0.02]">
          Conversion ↑
        </div>
      </div>
    </Frame>
  );
}

/* -------------------------
   MOCKUP: SAAS
   - analytics realtime
   - même principe que ecom KPIs/chart
--------------------------*/
function MockupSaaS() {
  return (
    <Frame title="App · Analytics">
      {/* KPIs */}
      <div className="grid grid-cols-3 gap-2 text-[10px] leading-[1.15] font-medium">
        <div className="rounded-2xl border border-black/[0.02] dark:border-white/5 bg-white dark:bg-neutral-900 p-2 shadow-lg shadow-black/[0.02]">
          <div className="text-[9px] text-neutral-500 dark:text-neutral-400">
            SCORE
          </div>
          <div className="text-neutral-800 dark:text-white text-sm font-semibold">
            100
          </div>
          <div className="text-[9px] text-emerald-600 dark:text-emerald-400">
            + mieux que P75
          </div>
        </div>

        <div className="rounded-2xl border border-black/[0.02] dark:border-white/5 bg-white dark:bg-neutral-900 p-2 shadow-lg shadow-black/[0.02]">
          <div className="text-[9px] text-neutral-500 dark:text-neutral-400">
            LCP
          </div>
          <div className="text-neutral-800 dark:text-white text-sm font-semibold">
            2.3s
          </div>
          <div className="text-[9px] text-emerald-600 dark:text-emerald-400">
            + mieux que P75
          </div>
        </div>

        <div className="rounded-2xl border border-black/[0.02] dark:border-white/5 bg-white dark:bg-neutral-900 p-2 shadow-lg shadow-black/[0.02]">
          <div className="text-[9px] text-neutral-500 dark:text-neutral-400">
            INP
          </div>
          <div className="text-neutral-800 dark:text-white text-sm font-semibold">
            0.8%
          </div>
          <div className="text-[9px] text-emerald-600 dark:text-emerald-400">
            + mieux que P75
          </div>
        </div>
      </div>

      {/* mini area chart sky */}
      <div className="mt-2 flex-1 rounded-lg border border-black/[0.02] dark:border-white/5 bg-gradient-to-b from-sky-50 to-sky-100/30 dark:from-sky-950/30 dark:to-sky-900/10 relative overflow-hidden">
        <svg
          viewBox="0 0 100 28"
          preserveAspectRatio="none"
          className="absolute inset-0 w-full h-full"
        >
          <path
            d="M0,18 C10,10 20,8 30,14 C40,20 50,9 60,13 C70,17 80,10 90,12 C95,13 100,15 100,15 L100,28 L0,28 Z"
            fill="rgba(56,189,248,0.18)"
          />
          <path
            d="M0,18 C10,10 20,8 30,14 C40,20 50,9 60,13 C70,17 80,10 90,12 C95,13 100,15 100,15"
            fill="none"
            stroke="rgba(56,189,248,1)"
            strokeWidth={1.5}
            strokeLinecap="round"
          />
        </svg>
      </div>
    </Frame>
  );
}

/* map catégorie -> mockup */
const MOCKUP: Record<CategoryId, React.FC> = {
  landing: MockupLanding,
  vitrine: MockupVitrine,
  ecommerce: MockupEcom,
  funnel: MockupFunnel,
  saas: MockupSaaS,
};

/* -------------------------
   GRID
   - mobile: 1 col
   - sm:     2 cols
   - lg:     3 cols
   - carte "saas" prend 2 colonnes (hero produit)
--------------------------*/

export function CategoryGrid({ onPick }: { onPick: (c: CategoryId) => void }) {
  const cats = Object.values(CAT);

  return (
    <div
      className="
        grid 
        grid-cols-1
        sm:grid-cols-2
        lg:grid-cols-3
        gap-6
      "
    >
      {cats.map((c) => {
        const Icon = ICONS[c.id];
        const CardMock = MOCKUP[c.id];
        const isWide = c.id === 'saas';

        return (
          <motion.button
            key={c.id}
            type="button"
            onClick={() => onPick(c.id)}
            initial={{ opacity: 0, filter: 'blur(10px)', y: 10 }}
            animate={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
            whileHover={{ y: -3, scale: 1.015 }}
            transition={{ duration: 0.28 }}
            className={[
              'relative flex flex-col cursor-pointer rounded-[3rem] p-6 h-[280px]',
              isWide ? 'sm:col-span-2 lg:col-span-2' : '',
              'bg-white dark:bg-neutral-900',
              'shadow-[0_30px_60px_-10px_rgba(0,0,0,0.07),0_2px_4px_rgba(0,0,0,0.03)]',
              'ring-1 ring-black/[0.02] dark:ring-white/[0.02]',
              'transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]',
              'focus:outline-none',
            ].join(' ')}
          >
            {/* header carte */}
            <div className="flex items-start justify-between">
              <div className="text-left">
                <div className="text-[15px] font-semibold text-neutral-900 dark:text-white">
                  {c.name}
                </div>
                <div className="text-[12px] text-neutral-500 dark:text-neutral-400 leading-snug">
                  {c.tagline}
                </div>
              </div>

              <div className="flex items-center justify-center w-10 h-10 rounded-2xl bg-white dark:bg-neutral-800 shadow-inner shadow-black/[0.02] ring-1 ring-black/[0.02] dark:ring-white/5">
                <Icon className="w-5 h-5 text-primary" />
              </div>
            </div>

            {/* mockup visuel */}
            <div className="mt-5 flex-1 flex">
              <CardMock />
            </div>

            {/* footer prix */}
            <div className="pt-4 text-[12px] leading-tight text-neutral-600 dark:text-neutral-300 font-medium">
              À partir de{' '}
              <span className="font-semibold text-primary">
                {c.tiers[0].price.toLocaleString('fr-FR')}€
              </span>
            </div>
          </motion.button>
        );
      })}
    </div>
  );
}
