// components/Projects/ProjectsPageClient.tsx
'use client';

import { PROJECTS_FR } from '@/data/projects';
import ParallaxProjectsGrid from './ParralaxProjectsGrid';

export default function ProjectsPageClient() {
  return (
    <section
      id="projects"
      className="mx-auto max-w-8xl z-10 relative px-5 pt-6 pb-32"
    >
      <header className="mb-10 text-center ">
        <p
          className="inline-block rounded-full px-4 py-1 text-xs font-semibold tracking-wide backdrop-blur-2xl
        bg-[linear-gradient(135deg,rgba(255,255,255,.9),rgba(240,245,252,.55))]
        dark:bg-[linear-gradient(135deg,rgba(10,14,20,.92),rgba(10,14,20,.65))]
        border border-white/50 dark:border-white/10 text-neutral-700 dark:text-neutral-200"
        >
          Sélection Ikovaline
        </p>

        <h1 className="mt-4 text-4xl sm:text-5xl font-extrabold  z-10 pb-2 text-neutral-900 dark:text-neutral-100">
          Nos projets
        </h1>
        <p className="mt-3 text-neutral-700 dark:text-neutral-300">
          Sites premium, SaaS scalables, SEO & automation — pensés pour
          convertir, mesurer et scaler.
        </p>
      </header>
      <ParallaxProjectsGrid
        projects={PROJECTS_FR}
        // fixedHeight=true -> scroll interne (style vitrine)
        // fixedHeight=false -> parallax lié au scroll de page
        fixedHeight={false}
        className="mt-4"
      />
    </section>
  );
}
