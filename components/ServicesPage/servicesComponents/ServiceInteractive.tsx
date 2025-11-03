'use client';

import { motion, AnimatePresence } from 'motion/react';
import { useEffect, useState } from 'react';

type ServiceInteractiveProps = {
  service: {
    section4Title: string;
    section4Content: Array<{
      title: string;
      description: string | React.ReactNode;
      icon: React.ReactNode;
    }>;
  };
};

export default function ServiceInteractive({
  service,
}: ServiceInteractiveProps) {
  const [valueIdText, setValueIdText] = useState<string>('');

  useEffect(() => {
    if (service?.section4Content?.length) {
      setValueIdText(service.section4Content[0].title.toLowerCase());
    }
  }, [service]);

  return (
    <section className="relative z-10 py-20 px-6 md:px-10">
      <h2 className="text-center text-3xl sm:text-4xl font-extrabold tracking-tight text-neutral-900 dark:text-white">
        {service.section4Title}
      </h2>

      <div className="mt-10 flex flex-col items-center gap-10">
        {/* Pills */}
        <div className="w-full max-w-3xl">
          <ul className="flex flex-wrap items-center justify-center gap-3">
            {service.section4Content.map((value) => {
              const key = value.title.toLowerCase();
              const active = key === valueIdText;
              return (
                <li key={key} className="relative">
                  <button
                    type="button"
                    onClick={() => setValueIdText(key)}
                    className={[
                      'inline-flex items-center gap-2 rounded-3xl px-5 py-2.5 text-sm md:text-[15px] transition border',
                      active
                        ? 'border-primary bg-primary text-white shadow-[0_10px_30px_-12px_rgba(2,132,199,.6)]'
                        : 'border-neutral-100 bg-white text-neutral-900 hover:bg-neutral-50 dark:border-neutral-900 dark:bg-neutral-900 dark:text-white dark:hover:bg-neutral-800',
                    ].join(' ')}
                  >
                    <span className="grid place-items-center">
                      {value.icon}
                    </span>
                    <span className="whitespace-nowrap">{value.title}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Panel */}
        <div className="relative w-full flex justify-center">
          <AnimatePresence mode="wait">
            {service.section4Content.map((value) => {
              const key = value.title.toLowerCase();
              if (key !== valueIdText) return null;

              return (
                <motion.div
                  key={key}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -10, opacity: 0 }}
                  transition={{ type: 'spring', stiffness: 170, damping: 20 }}
                  className="w-full max-w-2xl rounded-[3rem] border border-neutral-100 bg-white p-8 shadow-[0_24px_80px_-24px_rgba(2,132,199,.22)] dark:border-neutral-900 dark:bg-neutral-900"
                >
                  <h3 className="text-lg md:text-xl font-semibold text-neutral-900 dark:text-white">
                    {value.title}
                  </h3>
                  <p className="mt-3 text-sm md:text-base leading-relaxed text-neutral-700 dark:text-neutral-300">
                    {value.description}
                  </p>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
