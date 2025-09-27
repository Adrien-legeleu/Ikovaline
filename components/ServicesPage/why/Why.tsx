'use client';

import * as React from 'react';
import {
  IconDiscountCheck,
  IconCash,
  IconClock,
  IconMessage2,
  IconUsersGroup,
  IconShieldCheck,
} from '@tabler/icons-react';

type Feature = { title: string; description: string; icon: React.ElementType };

const FEATURES: Feature[] = [
  {
    title: 'Un excellent rapport qualité/prix',
    description:
      'Des services digitaux performants à des tarifs étudiés, accessibles même pour les petites structures.',
    icon: IconDiscountCheck,
  },
  {
    title: 'Garantie de résultat',
    description:
      'Si nos solutions ne répondent pas à vos objectifs, nous vous remboursons intégralement.',
    icon: IconCash,
  },
  {
    title: 'Des résultats rapides et mesurables',
    description:
      'Livraison rapide, indicateurs clairs et impact mesurable à chaque étape.',
    icon: IconClock,
  },
  {
    title: 'Suivi personnalisé & communication fluide',
    description:
      'Un accompagnement transparent avec points réguliers et réponses réactives.',
    icon: IconMessage2,
  },
  {
    title: 'Une équipe engagée et expérimentée',
    description:
      'Des spécialistes passionnés en marketing digital et développement commercial.',
    icon: IconUsersGroup,
  },
  {
    title: 'Confiance et cadre sur-mesure',
    description:
      'Chaque mission est encadrée par un plan d’action clair et une relation de confiance.',
    icon: IconShieldCheck,
  },
];

export default function Why() {
  return (
    <section
      id="pourquoi-nous"
      className="relative py-20"
      aria-labelledby="why-title"
    >
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <span className="absolute -top-24 left-1/3 h-[30rem] w-[30rem] -translate-x-1/2 rounded-full blur-[180px] bg-[radial-gradient(closest-side,#00A8E8,transparent_70%)] opacity-25 dark:opacity-35" />
        <span className="absolute -bottom-20 right-1/4 h-[26rem] w-[26rem] translate-x-1/4 rounded-full blur-[160px] bg-[radial-gradient(closest-side,#2563EB,transparent_70%)] opacity-20 dark:opacity-30" />
      </div>

      <div className="mx-auto max-w-6xl px-6">
        <h2
          id="why-title"
          className="text-center text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight bg-gradient-to-t from-neutral-900 via-neutral-700 to-neutral-500 dark:from-neutral-100 dark:via-neutral-300 dark:to-neutral-400 bg-clip-text text-transparent"
        >
          6 raisons de faire équipe avec Ikovaline
        </h2>

        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {FEATURES.map((f) => (
            <FeatureCard key={f.title} feature={f} />
          ))}
        </div>
      </div>
    </section>
  );
}

function FeatureCard({ feature }: { feature: Feature }) {
  const { title, description, icon: Icon } = feature;
  return (
    <article
      className="relative h-full overflow-hidden rounded-2xl p-7 
                 bg-[linear-gradient(135deg,rgba(255,255,255,.86),rgba(240,245,252,.46))]
                 dark:bg-[linear-gradient(135deg,rgba(10,14,20,.92),rgba(10,14,20,.65))]
                 border border-white/50 dark:border-[rgba(56,130,246,0.20)]
                 shadow-[0_18px_60px_rgba(6,24,44,.12),inset_0_1px_0_rgba(255,255,255,.55)]
                 dark:shadow-[0_18px_60px_rgba(2,6,12,.65),inset_0_1px_0_rgba(59,130,246,.12)]
                 transition-all duration-500"
    >
      <div className="relative z-10 flex items-start gap-3">
        <div className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-white/70 dark:bg-neutral-900/60 border border-white/40 dark:border-white/10 shadow-inner">
          <Icon
            className="h-6 w-6 text-sky-600 dark:text-sky-400"
            aria-hidden
          />
        </div>
        <h3 className="text-lg xl:text-xl font-bold text-neutral-900 dark:text-white">
          {title}
        </h3>
      </div>
      <p className="relative z-10 mt-3 text-neutral-700 dark:text-neutral-300 text-sm xl:text-[15px] leading-relaxed">
        {description}
      </p>
    </article>
  );
}
