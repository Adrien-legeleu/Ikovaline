// components/Projects/ProjectsPageClient.tsx
'use client';

import { usePathname } from 'next/navigation';
import ProjectGrid from '@/components/Projects/ProjectsGrid';
import { PROJECTS_FR, PROJECTS_EN } from '@/data/projects';

export default function ProjectsPageClient() {
  const pathname = usePathname() || '/';
  const isEN = /^\/en(\/|$)/.test(pathname);

  const t = isEN
    ? {
        title: 'Our Projects',
        desc: 'Premium websites, scalable SaaS, SEO & automation — designed to convert, measure, and scale.',
        baseHref: '/en/projects',
        data: PROJECTS_EN,
      }
    : {
        title: 'Nos Projets',
        desc: 'Sites premium, SaaS scalables, SEO & automation — conçus pour convertir, mesurer, et scaler.',
        baseHref: '/projets',
        data: PROJECTS_FR,
      };

  return (
    <section id="projects" className="mx-auto max-w-7xl px-4 pt-10">
      <header className="mb-10 text-center">
        <h1 className="text-4xl sm:text-5xl pb-2 font-bold bg-clip-text text-transparent bg-gradient-to-b from-neutral-900 to-neutral-800 dark:from-neutral-100 dark:to-neutral-200">
          {t.title}
        </h1>
        <p className="mt-3 text-neutral-700 dark:text-neutral-300">{t.desc}</p>
      </header>

      <ProjectGrid projects={t.data} baseHref={t.baseHref} />
    </section>
  );
}
