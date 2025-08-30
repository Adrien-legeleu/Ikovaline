'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

type ServiceInteractiveProps = {
  service: {
    section4Title: string;
    section4Content: Array<{
      title: string;
      description: string;
      icon: React.ReactNode;
    }>;
  };
};

export default function ServiceInteractive({
  service,
}: ServiceInteractiveProps) {
  const [valueIdText, setValueIdText] = useState('');

  useEffect(() => {
    if (service?.section4Content?.length) {
      setValueIdText(service.section4Content[0].title.toLowerCase());
    }
  }, [service]);

  return (
    <section className="relative overflow-hidden py-24">
      {/* Halos bleus généreux */}
      <div aria-hidden className="absolute inset-0 -z-10">
        <span className="absolute top-0 left-1/2 h-[40rem] w-[40rem] -translate-x-1/2 rounded-full blur-[240px] bg-[radial-gradient(closest-side,#00A8E8,transparent_70%)] opacity-35 dark:opacity-45" />
        <span className="absolute bottom-0 right-1/4 h-[36rem] w-[36rem] translate-x-1/4 rounded-full blur-[220px] bg-[radial-gradient(closest-side,#2563EB,transparent_70%)] opacity-30 dark:opacity-40" />
      </div>

      <div className="relative px-5 md:px-10">
        {/* Titre dégradé bleu punchy */}
        <h2
          className="text-center text-3xl sm:text-4xl font-extrabold
                     bg-gradient-to-r from-sky-700 via-sky-600 to-sky-500
                     dark:from-sky-300 dark:via-sky-400 dark:to-sky-500
                     bg-clip-text text-transparent"
        >
          {service.section4Title}
        </h2>

        <div className="mt-12 flex flex-col items-center gap-12">
          {/* Segmented control — capsule liquid */}
          <div
            className="relative rounded-3xl p-3  backdrop-blur-2xl backdrop-saturate-150
                       bg-[linear-gradient(135deg,rgba(255,255,255,.86),rgba(240,245,252,.35))]
                       dark:bg-[linear-gradient(135deg,rgba(8,12,18,.34),rgba(8,12,18,.18))]
                       border border-white/60 dark:border-[rgba(56,130,246,0.22)]
                       shadow-[0_20px_70px_rgba(0,168,232,.18),inset_0_1px_0_rgba(255,255,255,.55)]
                       dark:shadow-[0_20px_70px_rgba(0,0,0,.65),inset_0_1px_0_rgba(59,130,246,.12)]"
          >
            <ul className="relative flex flex-wrap items-center justify-center gap-3">
              {service.section4Content.map((value) => {
                const key = value.title.toLowerCase();
                const active = key === valueIdText;
                return (
                  <li key={key} className="relative ">
                    {active && (
                      <motion.span
                        layoutId="liq-capsule"
                        transition={{
                          type: 'spring',
                          stiffness: 520,
                          damping: 40,
                        }}
                        className="absolute w-full inset-0 rounded-3xl overflow-hidden
                                   border border-sky-400/50 dark:border-sky-300/20
                                   shadow-[inset_0_1px_0_rgba(255,255,255,.36),0_0_36px_rgba(0,168,232,.15)]"
                      />
                    )}
                    <button
                      type="button"
                      onClick={() => setValueIdText(key)}
                      className={[
                        'relative z-10  px-6 py-3 rounded-full flex items-center gap-2 text-sm md:text-[15px] transition',
                        active
                          ? 'text-sky-700 dark:text-sky-300 font-semibold'
                          : 'text-neutral-700 hover:text-neutral-900 dark:text-neutral-300 dark:hover:text-neutral-100',
                      ].join(' ')}
                    >
                      {value.icon}
                      <span className="whitespace-nowrap">{value.title}</span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Panneau contenu — liquid glass */}
          <div className="relative w-full flex justify-center">
            <AnimatePresence mode="wait">
              {service.section4Content.map((value) => {
                const key = value.title.toLowerCase();
                if (key !== valueIdText) return null;

                return (
                  <motion.div
                    key={key}
                    initial={{ y: 40, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -20, opacity: 0 }}
                    transition={{ type: 'spring', stiffness: 150, damping: 18 }}
                    className="relative w-full max-w-md overflow-hidden rounded-[28px] p-8
                               backdrop-blur-2xl backdrop-saturate-150
                               bg-[linear-gradient(135deg,rgba(255,255,255,.92),rgba(240,245,252,.48))]
                               dark:bg-[linear-gradient(135deg,rgba(8,12,18,.95),rgba(8,12,18,.62))]
                               border border-white/60 dark:border-[rgba(56,130,246,0.24)]
                               shadow-[0_24px_80px_rgba(0,168,232,.22),inset_0_1px_0_rgba(255,255,255,.55)]
                               dark:shadow-[0_24px_80px_rgba(0,0,0,.68),inset_0_1px_0_rgba(59,130,246,.12)]"
                  >
                    {/* Rim conique light/dark */}
                    <span
                      aria-hidden
                      className="pointer-events-none absolute inset-0 rounded-[28px] block dark:hidden"
                      style={{
                        border: '1px solid transparent',
                        backgroundImage:
                          'linear-gradient(135deg,rgba(255,255,255,.95),rgba(245,248,252,.52)),' +
                          'conic-gradient(from 210deg,rgba(255,255,255,.90),rgba(0,168,232,.30),rgba(255,255,255,.55),rgba(37,99,235,.22),rgba(255,255,255,.90))',
                        backgroundClip: 'padding-box,border-box',
                        opacity: 0.95,
                      }}
                    />
                    <span
                      aria-hidden
                      className="pointer-events-none absolute inset-0 hidden rounded-[28px] dark:block"
                      style={{
                        border: '1px solid transparent',
                        backgroundImage:
                          'linear-gradient(135deg,rgba(8,12,18,.96),rgba(8,12,18,.60)),' +
                          'conic-gradient(from 210deg,rgba(0,168,232,.24),rgba(37,99,235,.18),rgba(0,168,232,.24))',
                        backgroundClip: 'padding-box,border-box',
                        opacity: 0.9,
                      }}
                    />

                    <h3 className="relative z-10 text-lg md:text-xl font-semibold text-neutral-900 dark:text-white">
                      {value.title}
                    </h3>
                    <p className="relative z-10 mt-3 text-sm md:text-base leading-relaxed text-neutral-700 dark:text-neutral-300">
                      {value.description}
                    </p>

                    {/* reflets + glow bas */}
                    <span className="pointer-events-none absolute left-6 right-6 top-2 h-6 rounded-full blur-[12px] bg-white/70 dark:bg-sky-400/10" />
                    <span className="pointer-events-none absolute -bottom-4 left-1/2 h-12 w-3/4 -translate-x-1/2 rounded-full blur-3xl bg-[radial-gradient(ellipse_at_center,rgba(0,168,232,.45),rgba(37,99,235,.30),transparent_70%)]" />
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
