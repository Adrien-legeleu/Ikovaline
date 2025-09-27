'use client';

import React, { memo, useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import { motion, useAnimationControls, useReducedMotion } from 'framer-motion';
import {
  IconCpu,
  IconDeviceMobileCode,
  IconRobot,
  IconSparkles,
  IconMapPin,
  IconChartLine,
} from '@tabler/icons-react';

/* ============================================================================
   Shimmer util – inchangé visuellement, très léger
============================================================================ */
const Shimmer: React.FC<{ className?: string }> = ({ className = '' }) => (
  <span
    className={[
      'relative block overflow-hidden rounded',
      className,
      'before:absolute before:inset-0 before:-translate-x-full',
      'before:bg-[linear-gradient(110deg,transparent,rgba(255,255,255,.35),transparent)]',
      'before:animate-[shimmer_1.8s_infinite]',
      'will-change-transform',
    ].join(' ')}
    aria-hidden
  >
    <style jsx>{`
      @keyframes shimmer {
        100% {
          transform: translateX(100%);
        }
      }
    `}</style>
  </span>
);

/* ============================================================================
   MacWindow – wrapper des mockups (mêmes styles)
   + viewport-only + reduceMotion
============================================================================ */
function MacWindow({
  children,
  title = 'ikovaline.app',
}: {
  children: React.ReactNode;
  title?: string;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className="h-full w-full overflow-hidden rounded-2xl bg-white dark:bg-neutral-950 ring-1 ring-black/10 dark:ring-white/10"
      initial={reduce ? false : { opacity: 0, y: 8 }}
      whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
    >
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
    </motion.div>
  );
}

/* ============================================================================
   CardShell – identique visuellement, mémoïsé pour éviter re-render inutiles
============================================================================ */
type CardShellProps<As extends React.ElementType = 'article'> = {
  children: React.ReactNode;
  as?: As;
  className?: string;
} & Omit<React.ComponentPropsWithoutRef<As>, 'as' | 'className' | 'children'>;

const CardShell = memo(function CardShell<
  As extends React.ElementType = 'article',
>({ children, as, className = '' }: CardShellProps<As>) {
  const Comp = (as ?? 'article') as React.ElementType;
  return (
    <Comp
      className={[
        'relative flex h-full justify-between flex-col overflow-hidden rounded-2xl p-6 md:p-7 lg:p-5 xl:p-7',
        'bg-white/90 backdrop-blur-sm shadow-[0_40px_120px_-52px_rgba(0,0,0,.35)] border border-black/10 dark:border-white/10',
        'dark:bg-neutral-900/20 dark:ring-white/10 dark:shadow-[0_60px_150px_-60px_rgba(0,0,0,.70)]',
        'before:pointer-events-none before:absolute before:inset-0',
        'before:[background:linear-gradient(135deg,rgba(255,255,255,.85),rgba(255,255,255,.85))_padding-box,linear-gradient(135deg,#d4d4d8,#e5e7eb)]',
        'dark:before:[background:linear-gradient(135deg,rgba(0,0,0,.85),rgba(0,0,0,.85))_padding-box,linear-gradient(135deg,#52525b,#71717a)]',
        className,
      ].join(' ')}
    >
      <span
        className="pointer-events-none absolute inset-x-6 top-3 h-8 rounded-full bg-black/5 blur-xl dark:black-white/5"
        aria-hidden
      />
      <style jsx>{`
        :global(a.group:hover article),
        :global(a.group:focus-visible article) {
          transform: translateY(-2px);
        }
      `}</style>
      {children}
    </Comp>
  );
});

/* ============================================================================
   MOCKS – mêmes visuels, anims économisées si reduce motion
============================================================================ */
export function SaaSMock() {
  const reduce = useReducedMotion();
  return (
    <MacWindow title="SaaS · Dashboard">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-black/5 to-transparent dark:from-white/5"
        aria-hidden
      />
      <div className="grid grid-cols-2 gap-4">
        {['MRR', 'Active users'].map((k, i) => (
          <div
            key={k}
            className="rounded-xl bg-white p-4 shadow-[0_18px_40px_-24px_rgba(0,0,0,.25)] ring-1 ring-black/5 dark:bg-neutral-900"
          >
            <div className="text-[11px] uppercase tracking-wide text-neutral-500">
              {k}
            </div>
            <Shimmer className="mt-2 h-7 w-24 bg-neutral-200 dark:bg-neutral-800" />
            <motion.div
              className={[
                'mt-2 h-2 w-3/4 rounded origin-left',
                i === 1 ? 'bg-red-500/30' : 'bg-emerald-500/30',
              ].join(' ')}
              animate={reduce ? undefined : { scaleX: [0.7, 1, 0.85, 1] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              style={{ transformOrigin: 'left center' }}
            />
          </div>
        ))}
      </div>

      <div className="mt-5 rounded-2xl bg-gradient-to-b from-white to-white/70 p-4 shadow-[0_28px_56px_-28px_rgba(0,0,0,.28)] ring-1 ring-black/5 dark:from-neutral-900 dark:to-neutral-900/60">
        <motion.div
          className="h-40 w-full rounded-lg bg-[linear-gradient(to_right,rgba(0,0,0,.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,.06)_1px,transparent_1px)] bg-[size:28px_28px] dark:bg-[linear-gradient(to_right,rgba(255,255,255,.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,.06)_1px,transparent_1px)]"
          animate={
            reduce ? undefined : { backgroundPositionX: ['0px', '28px'] }
          }
          transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
        />
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
          <motion.div
            key={r}
            className="mb-2 grid grid-cols-5 items-center gap-3 rounded-lg bg-neutral-50 p-3 dark:bg-neutral-800/60"
            initial={false}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.35, delay: r * 0.06 }}
          >
            <Shimmer className="h-3 w-20 bg-neutral-200 dark:bg-neutral-700" />
            <Shimmer className="h-3 w-28 bg-neutral-200 dark:bg-neutral-700" />
            <div className="h-6 w-16 rounded-full bg-emerald-500/15 ring-1 ring-emerald-500/30" />
            <Shimmer className="h-3 w-16 bg-neutral-200 dark:bg-neutral-700" />
            <Shimmer className="h-3 w-24 bg-neutral-200 dark:bg-neutral-700" />
          </motion.div>
        ))}
      </div>
    </MacWindow>
  );
}

export function AppsMock() {
  const reduce = useReducedMotion();
  return (
    <MacWindow title="Apps · Preview">
      <div className="relative grid place-items-center py-2">
        <div className="relative z-10 -rotate-6 -translate-x-1/4">
          <motion.div
            className="h-72 w-40 rounded-[2rem] border border-black/10 bg-white shadow-[0_24px_60px_-28px_rgba(0,0,0,.35)] dark:border-white/10 dark:bg-neutral-900 will-change-transform"
            animate={
              reduce ? undefined : { y: [-8, 0, -8], rotate: [-1, 0, -1] }
            }
            transition={{ duration: 5.2, repeat: Infinity, ease: 'easeInOut' }}
          >
            <div className="mx-auto mt-2 h-1.5 w-16 rounded-full bg-neutral-200 dark:bg-neutral-700" />
            <div className="m-3 h-16 rounded-xl bg-neutral-100 dark:bg-neutral-800" />
            <Shimmer className="mx-3 mt-2 h-3 bg-neutral-200 dark:bg-neutral-700" />
            <Shimmer className="mx-3 mt-2 h-3 w-3/4 bg-neutral-200 dark:bg-neutral-700" />
            <div className="mx-3 mt-3 grid grid-cols-2 gap-2">
              <Shimmer className="h-8 rounded-md bg-neutral-200 dark:bg-neutral-700" />
              <Shimmer className="h-8 rounded-md bg-neutral-200 dark:bg-neutral-700" />
            </div>
          </motion.div>
        </div>

        <div className="absolute left-1/2 top-1/2 -translate-x-1/4 -translate-y-1/3 rotate-6 z-0">
          <motion.div
            className="h-72 w-40 rounded-[2rem] border border-black/10 bg-white shadow-[0_28px_70px_-30px_rgba(0,0,0,.35)] dark:border-white/10 dark:bg-neutral-900 will-change-transform"
            animate={reduce ? undefined : { y: [10, 0, 10], rotate: [1, 0, 1] }}
            transition={{ duration: 5.8, repeat: Infinity, ease: 'easeInOut' }}
          >
            <div className="mx-auto mt-2 h-1.5 w-16 rounded-full bg-neutral-200 dark:bg-neutral-700" />
            <div className="m-3 h-12 rounded-xl bg-neutral-100 dark:bg-neutral-800" />
            <Shimmer className="mx-3 mt-2 h-3 w-2/3 bg-neutral-200 dark:bg-neutral-700" />
            <div className="mx-3 mt-3 h-24 rounded-xl bg-neutral-100 dark:bg-neutral-800" />
          </motion.div>
        </div>
      </div>
    </MacWindow>
  );
}

export function AutomationMock() {
  const reduce = useReducedMotion();
  return (
    <MacWindow title="Automation · Workflow">
      <div className="relative h-64 rounded-xl bg-white dark:bg-neutral-950 ring-1 ring-black/5 dark:ring-white/10">
        <motion.div
          className="absolute left-1/2 top-1/2 h-12 w-12 -translate-x-1/2 -translate-y-1/2 rounded-full bg-neutral-100 ring-2 ring-[hsl(var(--primary)/0.35)] dark:bg-neutral-900 shadow-[0_0_28px_rgba(59,130,246,0.25)]"
          animate={
            reduce
              ? undefined
              : {
                  scale: [0.94, 1, 0.94],
                  boxShadow: [
                    '0 0 18px rgba(59,130,246,0.18)',
                    '0 0 28px rgba(59,130,246,0.28)',
                    '0 0 18px rgba(59,130,246,0.18)',
                  ],
                }
          }
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
        />

        {/* Lignes + particules */}
        <svg
          className="absolute inset-0 h-full w-full"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          aria-hidden
        >
          {[
            'M22 18 C45 22, 50 40, 50 50',
            'M78 18 C55 22, 50 40, 50 50',
            'M22 82 C45 78, 50 60, 50 50',
            'M78 82 C55 78, 50 60, 50 50',
            'M12 50 C30 50, 50 50, 50 50',
            'M88 50 C70 50, 50 50, 50 50',
          ].map((d, i) => (
            <g key={i}>
              <path
                d={d}
                stroke="hsl(var(--primary) / .30)"
                strokeWidth="1.6"
                fill="none"
                strokeLinecap="round"
              />
              {!reduce && (
                <motion.circle
                  r="1.1"
                  fill="hsl(var(--primary))"
                  filter="url(#automationGlow)"
                >
                  <animateMotion
                    dur={`${2.4 + (i % 3) * 0.6}s`}
                    repeatCount="indefinite"
                    keyPoints="0;1"
                    keyTimes="0;1"
                    calcMode="linear"
                    path={d}
                  />
                </motion.circle>
              )}
            </g>
          ))}
          <defs>
            <filter id="automationGlow">
              <feGaussianBlur stdDeviation="1.2" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
        </svg>

        <div className="absolute bottom-3 left-3 flex flex-wrap gap-2">
          {['Trigger CRM', 'Enrich data', 'Notify Slack'].map((t, i) => (
            <motion.div
              key={t}
              className="rounded-full bg-neutral-50 px-3 py-1 text-[10px] font-semibold text-neutral-700 ring-1 ring-black/10 dark:bg-neutral-900 dark:text-neutral-200 dark:ring-white/10"
              initial={false}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.35, delay: 0.08 * i }}
            >
              {t}
            </motion.div>
          ))}
        </div>
      </div>
    </MacWindow>
  );
}

export function SitesMock() {
  const reduce = useReducedMotion();
  return (
    <MacWindow title="Sites · SEO & GEO">
      <div className="space-y-4">
        <div className="rounded-xl border border-neutral-200 bg-white p-4 shadow-[0_18px_40px_-24px_rgba(0,0,0,.22)] dark:border-neutral-800 dark:bg-neutral-900">
          <Shimmer className="h-3 w-44 bg-neutral-200 dark:bg-neutral-700" />
          <div className="mt-2 h-4 w-3/4 rounded bg-neutral-100 dark:bg-neutral-800" />
          <div className="mt-1 h-3 w-1/2 rounded bg-neutral-100 dark:bg-neutral-800" />
          <motion.div
            className="mt-3 h-0.5 w-full rounded bg-gradient-to-r from-transparent via-[hsl(var(--primary)/.45)] to-transparent"
            animate={reduce ? undefined : { opacity: [0.25, 0.7, 0.25] }}
            transition={{ duration: 2.2, repeat: Infinity }}
          />
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div className="col-span-3 h-20 rounded-xl bg-neutral-100 dark:bg-neutral-800 relative overflow-hidden">
            {!reduce && (
              <>
                <motion.div
                  className="absolute inset-0"
                  animate={{ opacity: [0.7, 1, 0.7] }}
                  transition={{
                    duration: 2.6,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                  aria-hidden
                />
                <motion.span
                  className="absolute inset-y-0 w-24 bg-gradient-to-r from-transparent via-white/20 to-transparent dark:via-white/10"
                  initial={{ x: '-20%' }}
                  animate={{ x: '120%' }}
                  transition={{
                    duration: 2.4,
                    repeat: Infinity,
                    ease: 'linear',
                    delay: 0.3,
                  }}
                  aria-hidden
                />
              </>
            )}
          </div>

          <div className="col-span-2 space-y-2">
            <Shimmer className="h-3 bg-neutral-200 dark:bg-neutral-700" />
            <Shimmer className="h-3 w-3/4 bg-neutral-200 dark:bg-neutral-700" />
            <motion.div
              className="h-32 rounded-xl bg-neutral-100 dark:bg-neutral-800"
              animate={reduce ? undefined : { scale: [1, 1.008, 1] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            />
          </div>

          <div className="space-y-2">
            <Shimmer className="h-3 bg-neutral-200 dark:bg-neutral-700" />
            <div className="h-20 rounded-xl bg-neutral-100 dark:bg-neutral-800 relative overflow-hidden">
              {!reduce && (
                <motion.span
                  className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[hsl(var(--primary)/.35)] via-[hsl(var(--primary)/.6)] to-[hsl(var(--primary)/.35)]"
                  animate={{ width: ['0%', '100%'] }}
                  transition={{
                    duration: 2.8,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                  aria-hidden
                />
              )}
            </div>
            <Shimmer className="h-8 rounded-xl bg-neutral-200 dark:bg-neutral-700" />
          </div>
        </div>

        <div className="inline-flex items-center gap-2 rounded-full bg-emerald-500/10 px-3 py-1 text-[10px] font-semibold text-emerald-700 ring-1 ring-emerald-500/30 dark:text-emerald-400">
          {!reduce && (
            <motion.span
              className="h-2 w-2 rounded-full bg-emerald-500"
              animate={{ scale: [0.9, 1.25, 0.9] }}
              transition={{
                duration: 1.6,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
          )}
          <span>Core Web Vitals • OK</span>
        </div>
      </div>
    </MacWindow>
  );
}

export function GMBMock() {
  const reduce = useReducedMotion();
  return (
    <MacWindow title="Google Business Profile · Local">
      <div className="space-y-4">
        <div className="relative h-28 rounded-xl ring-1 ring-black/10 dark:ring-white/10 overflow-hidden">
          <motion.div
            className="absolute inset-0 will-change-transform"
            style={{
              background:
                'repeating-linear-gradient(90deg, rgba(0,0,0,.05) 0 1px, transparent 1px 28px), repeating-linear-gradient(0deg, rgba(0,0,0,.05) 0 1px, transparent 1px 28px)',
            }}
            animate={
              reduce ? undefined : { backgroundPositionX: ['0px', '28px'] }
            }
            transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
            aria-hidden
          />
          <div className="absolute inset-0 opacity-0 dark:opacity-100 dark:bg-[conic-gradient(at_30%_40%,#222_0_25%,#333_0_50%,#222_0_75%,#111_0)] transition-opacity" />
          <svg
            className="absolute inset-0 w-full h-full"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            aria-hidden
          >
            <defs>
              <linearGradient id="routeGrad" x1="0" x2="1" y1="0" y2="0">
                <stop offset="0%" stopColor="rgba(59,130,246,.7)" />
                <stop offset="100%" stopColor="rgba(16,185,129,.7)" />
              </linearGradient>
            </defs>
            <motion.path
              d="M10 70 C 30 55, 55 60, 70 45 S 92 30, 95 28"
              fill="none"
              stroke="url(#routeGrad)"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeDasharray="4 8"
              animate={reduce ? undefined : { strokeDashoffset: [0, -24] }}
              transition={{ duration: 2.2, repeat: Infinity, ease: 'linear' }}
            />
          </svg>
          {!reduce && (
            <motion.div
              className="absolute left-[72%] top-[34%] h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[hsl(var(--primary))] shadow-[0_0_20px_rgba(59,130,246,.55)]"
              animate={{ scale: [0.9, 1.15, 0.9] }}
              transition={{
                duration: 1.4,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              aria-hidden
            >
              <span className="absolute inset-0 rounded-full blur-[8px] bg-[hsl(var(--primary)/.55)]" />
            </motion.div>
          )}
        </div>

        <div className="rounded-xl border border-neutral-200 bg-white p-4 shadow-[0_18px_40px_-24px_rgba(0,0,0,.22)] dark:border-neutral-800 dark:bg-neutral-900">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-neutral-200 dark:bg-neutral-700" />
            <div>
              <Shimmer className="h-3 w-40 bg-neutral-200 dark:bg-neutral-700" />
              <div className="mt-2 flex items-center gap-1" aria-hidden>
                {Array.from({ length: 5 }).map((_, i) => (
                  <motion.div
                    key={i}
                    className="h-3 w-3 rounded bg-amber-400/80"
                    animate={
                      reduce
                        ? undefined
                        : {
                            scale: [0.92, 1, 0.92],
                            filter: [
                              'drop-shadow(0 0 0px rgba(251,191,36,.0))',
                              'drop-shadow(0 0 6px rgba(251,191,36,.6))',
                              'drop-shadow(0 0 0px rgba(251,191,36,.0))',
                            ],
                          }
                    }
                    transition={{
                      duration: 1.6 + i * 0.15,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                  />
                ))}
                <Shimmer className="ml-2 h-3 w-8 bg-neutral-200 dark:bg-neutral-700" />
              </div>
            </div>
          </div>
          <div className="mt-3 grid grid-cols-3 gap-3">
            <div className="h-16 rounded-lg bg-neutral-100 dark:bg-neutral-800" />
            <motion.div
              className="h-16 rounded-lg bg-neutral-100 dark:bg-neutral-800"
              animate={
                reduce
                  ? undefined
                  : { opacity: [0.6, 1, 0.6], scale: [0.98, 1, 0.98] }
              }
              transition={{
                duration: 2.6,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
            <div className="h-16 rounded-lg bg-neutral-100 dark:bg-neutral-800" />
          </div>
        </div>

        <div className="flex gap-2">
          <Shimmer className="h-8 w-24 rounded-lg bg-neutral-200 dark:bg-neutral-700" />
          <Shimmer className="h-8 w-24 rounded-lg bg-neutral-200 dark:bg-neutral-700" />
          <Shimmer className="h-8 w-24 rounded-lg bg-neutral-200 dark:bg-neutral-700" />
        </div>
      </div>
    </MacWindow>
  );
}

export function AcquisitionMock() {
  const reduce = useReducedMotion();
  return (
    <MacWindow title="Acquisition · SEA & SEO">
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
          {['CPC', 'CTR'].map((k) => (
            <div
              key={k}
              className="rounded-xl bg-white p-3 shadow-[0_18px_40px_-24px_rgba(0,0,0,.22)] ring-1 ring-black/5 dark:bg-neutral-900"
            >
              <div className="text-[11px] uppercase tracking-wide text-neutral-500">
                {k}
              </div>
              <Shimmer className="mt-2 h-6 w-full bg-neutral-200 dark:bg-neutral-700" />
            </div>
          ))}
        </div>
        <motion.div
          className="h-32 rounded-xl bg-[linear-gradient(to_right,rgba(0,0,0,.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,.06)_1px,transparent_1px)] bg-[size:28px_28px] dark:bg-[linear-gradient(to_right,rgba(255,255,255,.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,.06)_1px,transparent_1px)]"
          animate={
            reduce ? undefined : { backgroundPositionX: ['0px', '28px'] }
          }
          transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
        />
        <div className="rounded-xl bg-white p-3 ring-1 ring-black/5 shadow-[0_18px_40px_-24px_rgba(0,0,0,.22)] dark:bg-neutral-900">
          <div className="mb-2 grid grid-cols-4 gap-2 text-[11px] font-semibold text-neutral-500">
            <div>Mot-clé</div>
            <div>Qualité</div>
            <div>Coût</div>
            <div>Conv.</div>
          </div>
          {[1, 2, 3].map((r) => (
            <motion.div
              key={r}
              className="mb-1 grid grid-cols-4 items-center gap-2 rounded-lg bg-neutral-50 p-2 dark:bg-neutral-800/60"
              initial={false}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ duration: 0.35, delay: r * 0.05 }}
            >
              <Shimmer className="h-3 w-24 bg-neutral-200 dark:bg-neutral-700" />
              <Shimmer className="h-3 w-16 bg-neutral-200 dark:bg-neutral-700" />
              <Shimmer className="h-3 w-12 bg-neutral-200 dark:bg-neutral-700" />
              <Shimmer className="h-3 w-12 bg-neutral-200 dark:bg-neutral-700" />
            </motion.div>
          ))}
        </div>
      </div>
    </MacWindow>
  );
}

/* ============================================================================
   DATA – stable (module scope) pour éviter la recréation
============================================================================ */
const SERVICES = [
  {
    id: 'saas',
    tag: 'SaaS',
    title: 'SaaS sur-mesure',
    desc: 'On crée ton logiciel en ligne de A à Z : connexion des utilisateurs, abonnements, paiements, tout est prêt et simple à utiliser.',
    icon: <IconCpu className="h-5 w-5" />,
    href: 'https://ikovaline.com/nos-services/creation-saas-sur-mesure',
    Illustration: SaaSMock,
  },
  {
    id: 'apps',
    tag: 'Apps',
    title: 'Web & Mobile Apps hautes performances',
    desc: 'On développe ton site ou ton appli mobile rapide, facile à utiliser, qui marche partout et même sans internet.',
    icon: <IconDeviceMobileCode className="h-5 w-5" />,
    href: 'https://ikovaline.com/nos-services/web-apps-applications-mobiles/',
    Illustration: AppsMock,
  },
  {
    id: 'automation',
    tag: 'IA & Automation',
    title: 'Automatisation & IA',
    desc: 'On installe des robots et de l’IA pour faire les tâches chiantes à ta place, gagner du temps et être plus efficace.',
    icon: <IconRobot className="h-5 w-5" />,
    href: 'https://ikovaline.com/nos-services#automatisation-ia',
    Illustration: AutomationMock,
  },
  {
    id: 'sites',
    tag: 'Sites & SEO',
    title: 'Sites sur-mesure • SEO & GEO',
    desc: 'On fait un site beau, rapide, bien référencé sur Google, et optimisé pour que les gens près de chez toi te trouvent facilement.',
    icon: <IconSparkles className="h-5 w-5" />,
    href: 'https://ikovaline.com/nos-services#sites-seo-geo',
    Illustration: SitesMock,
  },
  {
    id: 'gmb',
    tag: 'Local',
    title: 'Google My Business (GBP) qui convertit',
    desc: 'On règle ta fiche Google pour que tu sois bien vu sur Maps : infos claires, avis clients, photos et appels qui arrivent directement.',
    icon: <IconMapPin className="h-5 w-5" />,
    href: 'https://ikovaline.com/nos-services#scaling',
    Illustration: GMBMock,
  },
  {
    id: 'acquisition',
    tag: 'Acquisition',
    title: 'SEA + SEO : acquisition rentable',
    desc: 'On t’amène des clients grâce à la pub Google et au référencement naturel. Tu vois clairement combien ça rapporte.',
    icon: <IconChartLine className="h-5 w-5" />,
    href: 'https://ikovaline.com/nos-services#scaling',
    Illustration: AcquisitionMock,
  },
] as const;

/* ============================================================================
   GRID – identique visuellement, perf : reduceMotion + memo + no reflow
============================================================================ */
export default function ServicesGridRefined() {
  const reduce = useReducedMotion();
  // stable reference (pas nécessaire mais explicite)
  const data = SERVICES;

  return (
    <section className="bg-transparent">
      <div className="relative z-10 mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 xl:gap-10">
          {data.map((s, idx) => (
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
                      {/* micro pulse icône seulement */}
                      <motion.span
                        className="inline-flex will-change-transform"
                        animate={reduce ? undefined : { scale: [1, 1.06, 1] }}
                        transition={{
                          duration: 2.2,
                          delay: idx * 0.05,
                          repeat: reduce ? 0 : Infinity,
                        }}
                        aria-hidden
                      >
                        {s.icon}
                      </motion.span>
                      {s.tag}
                    </span>
                    <div className="z-20 inline-flex items-center gap-2 text-sm font-semibold text-neutral-800 transition group-hover:translate-x-0.5 text-primary">
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

                <div className="mt-2">
                  <div className="relative w-full overflow-hidden rounded-2xl">
                    {/* halo discret au survol */}
                    <motion.div
                      className="pointer-events-none absolute inset-0"
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 1 }}
                      transition={{ duration: 0.25 }}
                      style={{
                        background:
                          'radial-gradient(1200px 300px at 50% 0%, rgba(59,130,246,0.07), transparent 60%)',
                      }}
                      aria-hidden
                    />
                    <div className="aspect-[16/10]">
                      <s.Illustration />
                    </div>
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

/* ============================================================================
   Helpers optionnels (inchangés visuellement, non utilisés par défaut)
============================================================================ */
export function SaaSConstellation() {
  const reduce = useReducedMotion();
  const stars = useMemo(() => Array.from({ length: 18 }), []);
  return (
    <div
      className="absolute inset-0 flex items-center justify-center"
      aria-hidden
    >
      {stars.map((_, i) => (
        <motion.span
          key={i}
          className="absolute size-1.5 rounded-full bg-cyan-400/90 shadow-[0_0_10px_rgba(34,211,238,0.9)] will-change-transform"
          initial={reduce ? undefined : { opacity: 0, scale: 0.6 }}
          animate={
            reduce
              ? undefined
              : { opacity: [0.3, 1, 0.3], scale: [0.6, 1.1, 0.6] }
          }
          transition={{
            duration: 2 + (i % 6) * 0.3,
            repeat: reduce ? 0 : Infinity,
            delay: i * 0.12,
          }}
          style={{
            top: `${15 + (i % 6) * 15}%`,
            left: `${8 + ((i * 19) % 85)}%`,
          }}
        />
      ))}
    </div>
  );
}

export function DevicesOrbit() {
  const reduce = useReducedMotion();
  return (
    <div
      className="absolute inset-0 flex items-center justify-center"
      aria-hidden
    >
      <div className="absolute inset-x-12 top-8 bottom-8 rounded-2xl bg-white/40 dark:bg-neutral-900/40 backdrop-blur-md border border-white/20" />
      {!reduce && (
        <>
          <motion.div
            className="absolute h-24 w-36 rounded-xl bg-gradient-to-tr from-indigo-200/60 to-indigo-400/40  border border-white/20 backdrop-blur-md shadow-lg will-change-transform"
            animate={{ y: [-10, 0, -10], rotate: [-2, 0, -2] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            className="absolute bottom-10 right-16 h-28 w-14 rounded-2xl bg-gradient-to-tr from-blue-200/60 to-blue-400/40  border border-white/20 backdrop-blur-md shadow-md will-change-transform"
            animate={{ y: [8, 0, 8], rotate: [3, 0, 3] }}
            transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            className="absolute bottom-14 left-20 h-20 w-28 rounded-xl bg-gradient-to-tr from-cyan-200/60 to-cyan-400/40  border border-white/20 backdrop-blur-md will-change-transform"
            animate={{ x: [8, 0, 8], opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
          />
        </>
      )}
    </div>
  );
}

export function AutomationGrid() {
  return (
    <div
      className="relative w-full h-48 flex items-center justify-center"
      aria-hidden
    >
      <div className="absolute z-20 w-12 h-12 rounded-full bg-gradient-to-br from-teal-400 to-cyan-500 shadow-[0_0_18px_rgba(34,211,238,0.8)] flex items-center justify-center animate-pulse">
        <IconRobot className="size-6 text-white" />
      </div>
      {[
        { top: '15%', left: '50%' },
        { top: '50%', left: '85%' },
        { top: '85%', left: '50%' },
        { top: '50%', left: '15%' },
      ].map((pos, i) => (
        <div
          key={i}
          className="absolute w-4 !-translate-x-1/2 !-translate-y-1/2 h-4 rounded-full bg-cyan-300 shadow-[0_0_10px_rgba(34,211,238,0.7)]"
          style={{ ...pos }}
        />
      ))}
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        <line x1="50" y1="15" x2="50" y2="50" className="automation-line" />
        <line x1="85" y1="50" x2="50" y2="50" className="automation-line" />
        <line x1="50" y1="85" x2="50" y2="50" className="automation-line" />
        <line x1="15" y1="50" x2="50" y2="50" className="automation-line" />
      </svg>
      <style jsx>{`
        .automation-line {
          stroke: rgba(34, 211, 238, 0.5);
          stroke-width: 1.5;
          stroke-linecap: round;
          animation: flow 4s ease-in-out infinite;
        }
        @keyframes flow {
          0% {
            stroke-opacity: 0.2;
          }
          50% {
            stroke-opacity: 0.8;
          }
          100% {
            stroke-opacity: 0.2;
          }
        }
      `}</style>
    </div>
  );
}
