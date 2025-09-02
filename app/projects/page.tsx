// app/(marketing)/projets/page.tsx
import type { Metadata } from 'next';
import ProjectsPageClient from '@/components/Projects/ProjectsPageClient';
import BackgroundStripes from '@/components/ServicesPage/BackgroundStripes';

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
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <BackgroundStripes />
      </div>
      <ProjectsPageClient />
    </main>
  );
}
