'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';
import { cn } from '@/lib/utils';
import { TextAnimate } from '@/components/ui/text-animate';
import ServiceInteractive from '@/components/ServicesPage/servicesComponents/ServiceInteractive';
import CallToAction from '@/components/callToAction/CallToAction';
import { IconRocket, IconTrendingUp } from '@tabler/icons-react';

type NormalizedService = {
  slug: string;
  seoTitle: string;
  seoDescription: string;
  section1Title: string;
  section1Desc: string;
  section2Title: string;
  section2Desc: string;
  section2NumberImportant: string;
  section2TextImportant: string;
  section3Title: string;
  section3Cards: { text: string; subtext: string }[];
  section4Title: string;
  section4Content: Array<{
    title: string;
    description: string | React.ReactNode;
    icon: React.ReactNode;
  }>;
};

export default function ServicePageClient({
  service,
}: {
  service: NormalizedService;
}) {
  return (
    <div className="relative overflow-hidden">
      {/* ====== BACKGROUND STRIPES + NOISE ====== */}
      <Background reduce={false} />

      {/* ====== HERO ====== */}
      <section className="relative z-10 flex min-h-[90svh] flex-col items-center justify-center px-6 pt-28 md:px-10">
        {/* halos doux */}
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
          <span className="absolute -top-40 left-1/2 h-[60rem] w-[60rem] -translate-x-1/2 rounded-full blur-[220px] opacity-30 bg-[radial-gradient(closest-side,var(--tw-sky),transparent_70%)] [--tw-sky:theme(colors.sky.400)] dark:[--tw-sky:theme(colors.sky.500)]" />
          <span className="absolute bottom-0 right-0 h-[46rem] w-[46rem] translate-x-1/3 rounded-full blur-[200px] opacity-25 bg-[radial-gradient(closest-side,var(--tw-blue),transparent_70%)] [--tw-blue:theme(colors.blue.500)] dark:[--tw-blue:theme(colors.blue.600)]" />
        </div>

        <TextAnimate
          animation="blurInUp"
          by="word"
          className="mx-auto max-w-2xl text-center text-base md:text-lg text-neutral-700 dark:text-neutral-300"
        >
          {service.section1Desc}
        </TextAnimate>

        <h1
          className={cn(
            'mt-4 bg-primary to-sky-500',

            'bg-clip-text text-center text-4xl font-extrabold text-transparent sm:text-5xl md:text-6xl'
          )}
        >
          {service.section1Title}
        </h1>

        {/* CTA */}
        <div className="mt-10 flex flex-col items-center gap-3 sm:flex-row">
          <a
            href="/contact"
            className="inline-flex items-center justify-center rounded-3xl px-6 py-3 text-white text-sm font-semibold shadow-[0_10px_30px_-12px_rgba(2,132,199,.6)] bg-primary hover:from-sky-600 hover:to-sky-700 active:scale-[0.99] transition"
          >
            Discuter de votre projet
          </a>
          <a
            href="/nos-services"
            className="inline-flex items-center justify-center rounded-3xl px-6 py-3 text-sm font-semibold border border-neutral-200 bg-white text-neutral-900 hover:bg-neutral-50 active:scale-[0.99] dark:border-neutral-800 dark:bg-neutral-900 dark:text-white dark:hover:bg-neutral-800 transition"
          >
            Voir tous les services
          </a>
        </div>

        {/* Icônes décor */}
        <div className="pointer-events-none absolute left-[6%] top-[18%] hidden sm:block">
          <div className="grid place-items-center h-28 w-28 rounded-[2rem] bg-white/70 dark:bg-neutral-900/70 ring-1 ring-black/5 dark:ring-white/5 shadow-[0_10px_40px_-10px_rgba(2,132,199,.35)]">
            <IconRocket className="h-12 w-12 text-sky-500" stroke={2} />
          </div>
        </div>
        <div className="pointer-events-none absolute right-[8%] bottom-[18%] hidden sm:block">
          <div className="grid place-items-center h-28 w-28 rounded-[2rem] bg-white/70 dark:bg-neutral-900/70 ring-1 ring-black/5 dark:ring-white/5 shadow-[0_10px_40px_-10px_rgba(37,99,235,.35)]">
            <IconTrendingUp className="h-12 w-12 text-blue-500" stroke={2} />
          </div>
        </div>
      </section>

      {/* ====== STAT / ARGUMENT CLÉ ====== */}
      <section className="relative z-10 flex flex-col items-center py-20 px-6 md:px-10">
        <h2 className="mx-auto max-w-3xl text-center text-3xl sm:text-4xl font-bold tracking-tight text-neutral-900 dark:text-white">
          {service.section2Title}
        </h2>
        <p className="mt-4 mx-auto max-w-2xl text-center text-neutral-700 dark:text-neutral-300">
          {service.section2Desc}
        </p>

        <div className="mt-10">
          <div className="rounded-[3rem] border max-w-2xl border-neutral-100 bg-white p-8 text-center shadow-[0_20px_80px_-30px_rgba(2,132,199,.25)] dark:border-neutral-900 dark:bg-neutral-900">
            <div className="text-6xl md:text-7xl font-extrabold leading-none bg-gradient-to-b from-primary to-sky-600 text-transparent bg-clip-text">
              {service.section2NumberImportant}
            </div>
            <div className="mt-2 text-neutral-700 dark:text-neutral-300">
              {service.section2TextImportant}
            </div>
          </div>
        </div>
      </section>

      {/* ====== CARDS ====== */}
      <section className="relative z-10 mx-auto max-w-7xl px-6 md:px-10 py-20">
        <h2 className="text-center text-3xl sm:text-4xl font-bold tracking-tight text-neutral-900 dark:text-white">
          {service.section3Title}
        </h2>

        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {service.section3Cards.map((card, i) => (
            <article
              key={i}
              className="group relative rounded-[3rem] border border-neutral-100 bg-white p-8 shadow-[0_18px_60px_-24px_rgba(2,132,199,.2)] hover:shadow-[0_24px_80px_-24px_rgba(2,132,199,.28)] transition-shadow dark:border-neutral-900 dark:bg-neutral-900"
            >
              <h3 className="text-xl font-bold tracking-tight text-neutral-900 dark:text-white">
                {card.text}
              </h3>
              <p className="mt-3 text-sm leading-6 text-neutral-700 dark:text-neutral-300">
                {card.subtext}
              </p>

              <span
                aria-hidden
                className="pointer-events-none absolute inset-x-6 -bottom-4 h-8 rounded-full blur-2xl bg-[radial-gradient(ellipse_at_center,rgba(2,132,199,.35),transparent_60%)]"
              />
            </article>
          ))}
        </div>
      </section>

      {/* ====== SECTION INTERACTIVE ====== */}
      <ServiceInteractive service={service} />

      {/* ====== CTA FINAL ====== */}
      <CallToAction
        title={
          service.section4Title
            ? "Donnez à votre entreprise l'élan qu'elle mérite."
            : ''
        }
        desc={
          service.section4Title
            ? 'Nos solutions sur-mesure transforment vos ambitions en résultats concrets. Parlons de vos objectifs et voyons comment aller plus loin ensemble.'
            : ''
        }
        textBtn="Discutons de votre projet"
      />
    </div>
  );
}

/* =============================== */
/* BACKGROUND (stripes + noise)    */
/* =============================== */

function Background({ reduce }: { reduce: boolean | null }) {
  const [count, setCount] = useState<number>(0);
  const rafId = useRef<number | null>(null);

  useEffect(() => {
    const calc = () => {
      const stripW = 80;
      const n = Math.ceil(window.innerWidth / stripW);
      setCount(n);
    };
    const onResize = () => {
      if (rafId.current) cancelAnimationFrame(rafId.current);
      rafId.current = requestAnimationFrame(calc);
    };
    calc();
    window.addEventListener('resize', onResize, { passive: true });
    return () => {
      if (rafId.current) cancelAnimationFrame(rafId.current);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return (
    <motion.div
      initial={reduce ? undefined : { opacity: 0 }}
      animate={reduce ? undefined : { opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="absolute inset-0 z-0 flex [mask-image:radial-gradient(circle_at_center,white_0%,black_40%,transparent_90%)]"
      aria-hidden
    >
      {/* voile bleu global */}
      <div className="absolute inset-0 bg-sky-200/30 dark:bg-sky-900/10" />
      {/* bruit */}
      <Noise />
      {/* colonnes */}
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="h-full w-20 bg-gradient-to-r from-white to-neutral-50 border-r border-neutral-200 shadow-[2px_0_0_0_#e5e7eb] dark:from-neutral-950 dark:to-neutral-900 dark:border-neutral-800 dark:shadow-[2px_0_0_0_#262626]"
        />
      ))}
    </motion.div>
  );
}

function Noise() {
  return (
    <div
      className="absolute inset-0 h-full w-full scale-[1.2] opacity-[0.05] [mask-image:radial-gradient(#fff,transparent,75%)] dark:opacity-[0.07]"
      style={{ backgroundImage: 'url(/noise.webp)', backgroundSize: '20%' }}
    />
  );
}
