import type { Metadata } from 'next';
import ProjectsPageClient from '@/components/Projects/ProjectsPageClient';

export const metadata: Metadata = {
  title: 'Projets, Ikovaline',
  description:
    'Sélection de projets Ikovaline : sites, SaaS, SEO, automation. Résultats concrets et design performant.',
  openGraph: {
    title: 'Projets — Ikovaline',
    description:
      'Sélection de projets Ikovaline : sites, SaaS, SEO, automation. Résultats concrets et design performant.',
    url: 'https://ikovaline.com/projects',
    type: 'website',
  },
};

export default function PageProjets() {
  return (
    <main className="relative isolate py-20 ">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-100"
        style={{
          background:
            'repeating-linear-gradient(90deg, hsl(var(--primary) / 0.1) 0 1px, transparent 1px calc(12.5%))',
        }}
      />
      <div className="absolute top-0 left-0 bg-gradient-to-b from-white dark:from-black to-transparent w-full h-32" />
      <div className="absolute bottom-0 left-0 bg-gradient-to-t from-white dark:from-black to-transparent w-full h-32" />
      <ProjectsPageClient />
    </main>
  );
}
