// app/(marketing)/projets/page.tsx
import type { Metadata } from 'next';
import ProjectsPageClient from '@/components/Projects/ProjectsPageClient';

export const metadata: Metadata = {
  title: 'Projets — Ikovaline',
  description:
    'Sélection de projets Ikovaline : sites, SaaS, SEO, automation. Résultats concrets et design performant.',
  openGraph: {
    title: 'Projets — Ikovaline',
    description:
      'Sélection de projets Ikovaline : sites, SaaS, SEO, automation. Résultats concrets et design performant.',
    url: 'https://ikovaline.com/projets',
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
      <ProjectsPageClient />
    </main>
  );
}
