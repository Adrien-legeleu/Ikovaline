import { motion } from 'framer-motion';

const Shimmer: React.FC<{ className?: string }> = ({ className = '' }) => (
  <span
    className={[
      'relative block overflow-hidden rounded',
      className,
      'before:absolute before:inset-0 before:-translate-x-full',
      'before:bg-[linear-gradient(110deg,transparent,rgba(255,255,255,.35),transparent)]',
      'before:animate-[shimmer_1.8s_infinite]',
    ].join(' ')}
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

function MacWindow({
  children,
  title = 'ikovaline.app',
}: {
  children: React.ReactNode;
  title?: string;
}) {
  return (
    <motion.div
      className="h-full w-full overflow-hidden rounded-2xl bg-white dark:bg-neutral-950 ring-1 ring-black/10 dark:ring-white/10"
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
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
} /* 1) SaaS — Dashboard */
export function SaaSMock() {
  return (
    <MacWindow title="SaaS · Dashboard">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-black/5 to-transparent dark:from-white/5" />

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
              animate={{ scaleX: [0.7, 1, 0.85, 1] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              style={{ transformOrigin: 'left center' }}
            />
          </div>
        ))}
      </div>

      <div className="mt-5 rounded-2xl bg-gradient-to-b from-white to-white/70 p-4 shadow-[0_28px_56px_-28px_rgba(0,0,0,.28)] ring-1 ring-black/5 dark:from-neutral-900 dark:to-neutral-900/60">
        <motion.div
          className="h-40 w-full rounded-lg bg-[linear-gradient(to_right,rgba(0,0,0,.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,.06)_1px,transparent_1px)] bg-[size:28px_28px] dark:bg-[linear-gradient(to_right,rgba(255,255,255,.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,.06)_1px,transparent_1px)]"
          animate={{ backgroundPositionX: ['0px', '28px'] }}
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
            initial={{ opacity: 0, y: 6 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
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
  return (
    <MacWindow title="Apps · Preview">
      <div className="relative grid place-items-center py-2">
        {/* PHONE #1 (devant) */}
        <div className="relative z-10 -rotate-6 -translate-x-1/4">
          <motion.div
            className="h-72 w-40 rounded-[2rem] border border-black/10 bg-white shadow-[0_24px_60px_-28px_rgba(0,0,0,.35)] dark:border-white/10 dark:bg-neutral-900"
            animate={{ y: [-8, 0, -8], rotate: [-1, 0, -1] }}
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

        {/* PHONE #2 (derrière) */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/4 -translate-y-1/3 rotate-6 z-0">
          <motion.div
            className="h-72 w-40 rounded-[2rem] border border-black/10 bg-white shadow-[0_28px_70px_-30px_rgba(0,0,0,.35)] dark:border-white/10 dark:bg-neutral-900"
            animate={{ y: [10, 0, 10], rotate: [1, 0, 1] }}
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

/* 3) Automation/IA — Pipeline clair (refonte animations) */
export function AutomationMock() {
  return (
    <MacWindow title="Automation · Workflow">
      <div className="relative h-64 rounded-xl bg-white dark:bg-neutral-950 ring-1 ring-black/5 dark:ring-white/10">
        {/* Noyau (respire + lueur douce) */}
        <motion.div
          className="absolute left-1/2 top-1/2 h-12 w-12 -translate-x-1/2 -translate-y-1/2 rounded-full bg-neutral-100 ring-2 ring-[hsl(var(--primary)/0.35)] dark:bg-neutral-900 shadow-[0_0_28px_rgba(59,130,246,0.25)]"
          animate={{
            scale: [0.94, 1, 0.94],
            boxShadow: [
              '0 0 18px rgba(59,130,246,0.18)',
              '0 0 28px rgba(59,130,246,0.28)',
              '0 0 18px rgba(59,130,246,0.18)',
            ],
          }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
        />

        {/* Nœuds périphériques (pulse + halo) */}
        {[
          { top: '18%', left: '22%' },
          { top: '18%', left: '78%' },
          { top: '82%', left: '22%' },
          { top: '82%', left: '78%' },
          { top: '50%', left: '12%' },
          { top: '50%', left: '88%' },
        ].map((pos, i) => (
          <motion.div
            key={i}
            className="absolute z-50 h-3.5 w-3.5 !-translate-x-1/2 !-translate-y-1/2 rounded-full bg-primary"
            style={pos as React.CSSProperties}
            animate={{ scale: [0.9, 1.08, 0.9] }}
            transition={{
              duration: 2 + (i % 3) * 0.35,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            <span className="pointer-events-none absolute inset-0 rounded-full blur-[6px]  bg-[hsl(var(--primary)/.85)]" />
          </motion.div>
        ))}

        {/* Lignes courbes + flux de particules qui avancent (bien visible) */}
        <svg
          className="absolute inset-0 h-full w-full"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
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
              {/* ligne de base */}
              <motion.path
                d={d}
                stroke="hsl(var(--primary) / .30)"
                strokeWidth="1.6"
                fill="none"
                strokeLinecap="round"
              />
              {/* point lumineux qui “circule” */}
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
            </g>
          ))}
          {/* glow filter */}
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

        {/* Badges d’étapes (slide-in + stagger) */}
        <div className="absolute bottom-3 left-3 flex flex-wrap gap-2">
          {['Trigger CRM', 'Enrich data', 'Notify Slack'].map((t, i) => (
            <motion.div
              key={t}
              className="rounded-full bg-neutral-50 px-3 py-1 text-[10px] font-semibold text-neutral-700 ring-1 ring-black/10 dark:bg-neutral-900 dark:text-neutral-200 dark:ring-white/10"
              initial={{ opacity: 0, y: 8 }}
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

/* 4) Sites & SEO/GEO — SERP + preview + badge CWV (meilleure animation) */
export function SitesMock() {
  return (
    <MacWindow title="Sites · SEO & GEO">
      <div className="space-y-4">
        {/* SERP card */}
        <div className="rounded-xl border border-neutral-200 bg-white p-4 shadow-[0_18px_40px_-24px_rgba(0,0,0,.22)] dark:border-neutral-800 dark:bg-neutral-900">
          <Shimmer className="h-3 w-44 bg-neutral-200 dark:bg-neutral-700" />
          <div className="mt-2 h-4 w-3/4 rounded bg-neutral-100 dark:bg-neutral-800" />
          <div className="mt-1 h-3 w-1/2 rounded bg-neutral-100 dark:bg-neutral-800" />
          {/* ligne scanner horizontale très légère */}
          <motion.div
            className="mt-3 h-0.5 w-full rounded bg-gradient-to-r from-transparent via-[hsl(var(--primary)/.45)] to-transparent"
            animate={{ opacity: [0.25, 0.7, 0.25] }}
            transition={{ duration: 2.2, repeat: Infinity }}
          />
        </div>

        {/* Preview + colonne droite */}
        <div className="grid grid-cols-3 gap-4">
          {/* hero preview (breathe + shimmer latéral) */}
          <div className="col-span-3 h-20 rounded-xl bg-neutral-100 dark:bg-neutral-800 relative overflow-hidden">
            <motion.div
              className="absolute inset-0"
              animate={{ opacity: [0.7, 1, 0.7] }}
              transition={{
                duration: 2.6,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
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
            />
          </div>

          <div className="col-span-2 space-y-2">
            <Shimmer className="h-3 bg-neutral-200 dark:bg-neutral-700" />
            <Shimmer className="h-3 w-3/4 bg-neutral-200 dark:bg-neutral-700" />
            <motion.div
              className="h-32 rounded-xl bg-neutral-100 dark:bg-neutral-800"
              animate={{ scale: [1, 1.008, 1] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            />
          </div>

          <div className="space-y-2">
            <Shimmer className="h-3 bg-neutral-200 dark:bg-neutral-700" />
            <div className="h-20 rounded-xl bg-neutral-100 dark:bg-neutral-800 relative overflow-hidden">
              {/* skeleton bar qui remonte (simulate LCP attention) */}
              <motion.span
                className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[hsl(var(--primary)/.35)] via-[hsl(var(--primary)/.6)] to-[hsl(var(--primary)/.35)]"
                animate={{ width: ['0%', '100%'] }}
                transition={{
                  duration: 2.8,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />
            </div>
            <Shimmer className="h-8 rounded-xl bg-neutral-200 dark:bg-neutral-700" />
          </div>
        </div>

        {/* Badge CWV (breathing + dot pulse) */}
        <div className="inline-flex items-center gap-2 rounded-full bg-emerald-500/10 px-3 py-1 text-[10px] font-semibold text-emerald-700 ring-1 ring-emerald-500/30 dark:text-emerald-400">
          <motion.span
            className="h-2 w-2 rounded-full bg-emerald-500"
            animate={{ scale: [0.9, 1.25, 0.9] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.span
            animate={{ opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 2.2, repeat: Infinity }}
          >
            Core Web Vitals • OK
          </motion.span>
        </div>
      </div>
    </MacWindow>
  );
}

/* 5) Google My Business — Carte + fiche + avis (animations visibles) */
export function GMBMock() {
  return (
    <MacWindow title="Google Business Profile · Local">
      <div className="space-y-4">
        {/* Mini carte : tuiles qui “scannent” + trajet animé + pin qui pulse */}
        <div className="relative h-28 rounded-xl ring-1 ring-black/10 dark:ring-white/10 overflow-hidden">
          {/* texture tuile */}
          <motion.div
            className="absolute inset-0"
            style={{
              background:
                'repeating-linear-gradient(90deg, rgba(0,0,0,.05) 0 1px, transparent 1px 28px), repeating-linear-gradient(0deg, rgba(0,0,0,.05) 0 1px, transparent 1px 28px)',
            }}
            animate={{ backgroundPositionX: ['0px', '28px'] }}
            transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
          />
          {/* couche foncée mode dark */}
          <div className="absolute inset-0 dark:opacity-100 opacity-0 dark:bg-[conic-gradient(at_30%_40%,#222_0_25%,#333_0_50%,#222_0_75%,#111_0)] transition-opacity" />

          {/* route animée */}
          <svg
            className="absolute inset-0 w-full h-full"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
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
              animate={{ strokeDashoffset: [0, -24] }}
              transition={{ duration: 2.2, repeat: Infinity, ease: 'linear' }}
            />
          </svg>

          {/* pin qui pulse */}
          <motion.div
            className="absolute left-[72%] top-[34%] h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[hsl(var(--primary))] shadow-[0_0_20px_rgba(59,130,246,.55)]"
            animate={{ scale: [0.9, 1.15, 0.9] }}
            transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
          >
            <span className="absolute inset-0 rounded-full blur-[8px] bg-[hsl(var(--primary)/.55)]" />
          </motion.div>
        </div>

        {/* Fiche établissement */}
        <div className="rounded-xl border border-neutral-200 bg-white p-4 shadow-[0_18px_40px_-24px_rgba(0,0,0,.22)] dark:border-neutral-800 dark:bg-neutral-900">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-neutral-200 dark:bg-neutral-700" />
            <div>
              <Shimmer className="h-3 w-40 bg-neutral-200 dark:bg-neutral-700" />
              <div className="mt-2 flex items-center gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <motion.div
                    key={i}
                    className="h-3 w-3 rounded bg-amber-400/80"
                    animate={{
                      scale: [0.92, 1, 0.92],
                      filter: [
                        'drop-shadow(0 0 0px rgba(251,191,36,.0))',
                        'drop-shadow(0 0 6px rgba(251,191,36,.6))',
                        'drop-shadow(0 0 0px rgba(251,191,36,.0))',
                      ],
                    }}
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
              animate={{ opacity: [0.6, 1, 0.6], scale: [0.98, 1, 0.98] }}
              transition={{
                duration: 2.6,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
            <div className="h-16 rounded-lg bg-neutral-100 dark:bg-neutral-800" />
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          <Shimmer className="h-8 w-24 rounded-lg bg-neutral-200 dark:bg-neutral-700" />
          <Shimmer className="h-8 w-24 rounded-lg bg-neutral-200 dark:bg-neutral-700" />
          <Shimmer className="h-8 w-24 rounded-lg bg-neutral-200 dark:bg-neutral-700" />
        </div>
      </div>
    </MacWindow>
  );
}

/* 6) Acquisition — Ads dashboard + table mots-clés */
export function AcquisitionMock() {
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
              <Shimmer className="mt-2 h-6 w-20 bg-neutral-200 dark:bg-neutral-700" />
            </div>
          ))}
        </div>
        {/* graph perf */}
        <motion.div
          className="h-32 rounded-xl bg-[linear-gradient(to_right,rgba(0,0,0,.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,.06)_1px,transparent_1px)] bg-[size:28px_28px] dark:bg-[linear-gradient(to_right,rgba(255,255,255,.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,.06)_1px,transparent_1px)]"
          animate={{ backgroundPositionX: ['0px', '28px'] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
        />
        {/* table mots-clés */}
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
              initial={{ opacity: 0, y: 6 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
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
