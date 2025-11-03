import type { Metadata } from 'next';
import ProjectsPageClient from '@/components/Projects/ProjectsPageClient';
import Glow from '@/components/ui/glow';

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
        className="pointer-events-none absolute h-[50vh] inset-0 opacity-70 dark:opacity-100"
        style={{
          background:
            'repeating-linear-gradient(90deg, hsl(var(--primary) / 0.1) 0 1px, transparent 1px calc(12.5%))',
        }}
      />
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        <Glow
          variant="above"
          className="animate-appear-zoom opacity-0 [animation-delay:1000ms]"
        />
      </div>
      <ProjectsPageClient />
    </main>
  );
}
