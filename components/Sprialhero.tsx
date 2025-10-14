'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { SpiralAnimation } from './ui/sprial-animations';
import { InteractiveRobotSpline } from './interactive-3d-robots';

type Props = {
  title?: string;
  subtitle?: string;
  ctaHref?: string;
  ctaLabel?: string;
  secondaryHref?: string;
  secondaryLabel?: string;
  sceneUrl?: string;
};

export default function SpiralHero({
  title = 'Votre projet démarre maintenant',
  subtitle = "Votre paiement est confirmé. Vous recevez sous peu le récapitulatif et l'accès à votre espace.",
  ctaHref = '/',
  ctaLabel = 'Retour à l’accueil',
  secondaryHref = '/contact',
  secondaryLabel = 'Contacter l’équipe',
  sceneUrl = 'https://prod.spline.design/PyzDhpQ9E5f1E3MT/scene.splinecode',
}: Props) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 700);
    return () => clearTimeout(t);
  }, []);

  return (
    <section className="relative min-h-[100svh] w-full overflow-hidden">
      {/* Spiral light/dark */}
      <SpiralAnimation />

      {/* Robot 3D */}
      <InteractiveRobotSpline
        scene={sceneUrl}
        priority
        className="pointer-events-auto absolute inset-0 -z-0 opacity-90 [mask-image:radial-gradient(70%_50%_at_50%_45%,black,transparent_85%)]"
      />

      {/* Upper copy */}
      <div className="pointer-events-none absolute inset-x-0 top-0 z-10 px-6 pt-20 md:px-10 md:pt-28">
        <div
          className={[
            'mx-auto max-w-4xl text-center transition-all duration-700',
            visible ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0',
          ].join(' ')}
        >
          <span className="inline-flex items-center rounded-full bg-black/5 px-3 py-1 text-xs font-medium text-zinc-700 backdrop-blur dark:bg-white/10 dark:text-white">
            Transaction confirmée
          </span>

          <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-zinc-900 md:text-6xl dark:text-white">
            {title}
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-base/7 text-zinc-700 md:text-lg/8 dark:text-white/80">
            {subtitle}
          </p>
        </div>
      </div>

      {/* Lower copy + CTAs */}
      <div className="pointer-events-auto absolute inset-x-0 bottom-0 z-10 px-6 pb-12 md:px-10 md:pb-16">
        <div
          className={[
            'mx-auto max-w-3xl text-center transition-all duration-700',
            visible ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0',
          ].join(' ')}
        >
          <p className="text-sm text-zinc-700 md:text-base dark:text-zinc-200">
            Vous venez de passer de l’intention à l’action. Gardez l’esprit
            clair : nous orchestrons la suite, étape par étape, jusqu’au
            résultat attendu.
          </p>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
            <Link
              href={ctaHref}
              className="rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-sm ring-1 ring-black/5 transition hover:opacity-95 dark:ring-white/10"
            >
              {ctaLabel}
            </Link>

            <Link
              href={secondaryHref}
              className="rounded-full bg-white/70 px-6 py-3 text-sm font-semibold text-zinc-900 ring-1 ring-black/10 backdrop-blur transition hover:bg-white dark:bg-white/10 dark:text-white dark:ring-white/20 dark:hover:bg-white/15"
            >
              {secondaryLabel}
            </Link>
          </div>

          <div className="mt-6 text-xs text-zinc-500 dark:text-zinc-400">
            Prochaine étape : envoi du récapitulatif et proposition de créneau
            de kick-off.
          </div>
        </div>
      </div>
    </section>
  );
}
