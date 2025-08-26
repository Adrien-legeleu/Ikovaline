'use client';

import { motion } from 'framer-motion';
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
    <section className="relative overflow-hidden py-20">
      {/* halo de fond */}
      <div aria-hidden className="absolute inset-0 -z-10">
        <span className="absolute top-0 left-1/2 h-[28rem] w-[28rem] -translate-x-1/2 rounded-full blur-[160px] bg-[radial-gradient(closest-side,#00A8E8,transparent_70%)] opacity-25 dark:opacity-35" />
      </div>

      <div className="relative md:px-10 px-5">
        <h2
          className="text-3xl sm:text-4xl font-extrabold text-center
                       bg-gradient-to-t from-neutral-900 via-neutral-700 to-neutral-500
                       dark:from-neutral-100 dark:via-neutral-300 dark:to-neutral-400
                       bg-clip-text text-transparent"
        >
          {service.section4Title}
        </h2>

        <div className="mt-12 flex flex-col items-center gap-10">
          {/* Segmented glassy */}
          <div
            className="relative rounded-full p-2 backdrop-blur-xl
                       bg-[linear-gradient(135deg,rgba(255,255,255,.70),rgba(240,245,252,.30))]
                       dark:bg-[linear-gradient(135deg,rgba(10,14,20,.85),rgba(10,14,20,.55))]
                       border border-white/45 dark:border-[rgba(56,130,246,0.18)]
                       shadow-[0_18px_60px_rgba(6,24,44,.10)] dark:shadow-[0_18px_60px_rgba(2,6,12,.65)]"
          >
            <ul className="relative flex flex-wrap items-center justify-center gap-2">
              {service.section4Content.map((value) => {
                const active = value.title.toLowerCase() === valueIdText;
                return (
                  <li key={value.title} className="relative">
                    {active && (
                      <motion.div
                        layoutId="liq-capsule"
                        transition={{
                          type: 'spring',
                          stiffness: 520,
                          damping: 42,
                        }}
                        className="absolute inset-0 rounded-full overflow-hidden
                                   border border-white/60 dark:border-white/10
                                   shadow-[inset_0_1px_0_rgba(255,255,255,.65),0_12px_42px_rgba(37,99,235,.30)]"
                        style={{
                          background:
                            'linear-gradient(135deg, rgba(255,255,255,.82), rgba(255,255,255,.30))',
                          WebkitBackdropFilter: 'blur(12px)',
                          backdropFilter: 'blur(12px)',
                        }}
                      />
                    )}
                    <button
                      type="button"
                      onClick={() => setValueIdText(value.title.toLowerCase())}
                      className={[
                        'relative z-10 px-5 py-2 rounded-full flex items-center gap-2',
                        active
                          ? 'text-sky-700 dark:text-sky-300 font-semibold'
                          : 'text-neutral-700 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-neutral-100',
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

          {/* Panneau contenu glassy */}
          <div className="relative">
            {service.section4Content.map(
              (value) =>
                valueIdText === value.title.toLowerCase() && (
                  <motion.div
                    key={value.title}
                    initial={{ x: 120, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: -40, opacity: 0 }}
                    transition={{ type: 'spring', stiffness: 150, damping: 16 }}
                    className="w-full max-w-md rounded-[26px] p-6 backdrop-blur-2xl
                               bg-[linear-gradient(135deg,rgba(255,255,255,.86),rgba(240,245,252,.46))]
                               dark:bg-[linear-gradient(135deg,rgba(10,14,20,.92),rgba(10,14,20,.65))]
                               border border-white/50 dark:border-[rgba(56,130,246,0.20)]
                               shadow-[0_18px_60px_rgba(6,24,44,.12),inset_0_1px_0_rgba(255,255,255,.55)]
                               dark:shadow-[0_18px_60px_rgba(2,6,12,.65),inset_0_1px_0_rgba(59,130,246,.12)]"
                  >
                    <h3 className="text-lg md:text-xl font-semibold text-neutral-900 dark:text-white">
                      {value.title}
                    </h3>
                    <p className="mt-2 text-sm md:text-base text-neutral-700 dark:text-neutral-300">
                      {value.description}
                    </p>

                    {/* points lumineux à gauche/droite (repères) */}
                    <span className="absolute top-1/2 -left-2 h-3 w-3 -translate-y-1/2 rounded-full bg-white dark:bg-black border-2 border-black dark:border-neutral-300" />
                    <span className="absolute top-1/2 -right-2 h-3 w-3 -translate-y-1/2 rounded-full bg-white dark:bg-black border-2 border-black dark:border-neutral-300" />
                  </motion.div>
                )
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
