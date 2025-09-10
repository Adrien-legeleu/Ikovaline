// components/Projects/ProjectsPageClient.tsx
'use client';

import ProjectsGrid from '@/components/Projects/ProjectsGrid';
import { PROJECTS_FR } from '@/data/projects';

export default function ProjectsPageClient() {
  return (
    <section id="projects" className="mx-auto max-w-7xl px-5 pt-6">
      <header className="mb-10 text-center">
        <p
          className="inline-block rounded-full px-4 py-1 text-xs font-semibold tracking-wide backdrop-blur-2xl
        bg-[linear-gradient(135deg,rgba(255,255,255,.9),rgba(240,245,252,.55))]
        dark:bg-[linear-gradient(135deg,rgba(10,14,20,.92),rgba(10,14,20,.65))]
        border border-white/50 dark:border-white/10 text-neutral-700 dark:text-neutral-200"
        >
          Sélection Ikovaline
        </p>

        <h1 className="mt-4 text-4xl sm:text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-b from-neutral-900 to-neutral-700 dark:from-neutral-100 dark:to-neutral-300">
          Nos projets
        </h1>
        <p className="mt-3 text-neutral-700 dark:text-neutral-300">
          Sites premium, SaaS scalables, SEO & automation — pensés pour
          convertir, mesurer et scaler.
        </p>
      </header>

      <ProjectsGrid projects={PROJECTS_FR} baseHref="/projects" />
    </section>
  );
}
