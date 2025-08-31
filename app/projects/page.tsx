// app/(marketing)/projets/page.tsx
import type { Metadata } from 'next';
import dynamic from 'next/dynamic';
import LightBackdrop from '@/components/ui/lightBackdrop';
import ProjectsPageClient from '@/components/Projects/ProjectsPageClient';

const UnicornBackdrop = dynamic(
  () => import('@/components/ui/unicornBackdrop'),
  { ssr: false }
);

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
    <main className="relative isolate py-20">
      <LightBackdrop />

      {/* locale + contenu via usePathname dans le wrapper client */}
      <ProjectsPageClient />
    </main>
  );
}
