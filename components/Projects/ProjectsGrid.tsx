// components/Projects/ProjectGrid.tsx
'use client';

import * as React from 'react';
import ProjectCard from './ProjectCard';
import type { Project } from '@/data/projects';

export default function ProjectGrid({
  projects,
  baseHref = '/projets',
}: {
  projects: Project[];
  baseHref?: string;
}) {
  // ultra-light filters (optionnels)
  const [service, setService] = React.useState<string>('all');
  const [secteur, setSecteur] = React.useState<string>('all');

  const servicesList = React.useMemo(() => {
    const s = new Set<string>();
    projects.forEach((p) => p.services.forEach((x) => s.add(x)));
    return Array.from(s);
  }, [projects]);

  const secteursList = React.useMemo(() => {
    const s = new Set<string>();
    projects.forEach((p) => s.add(p.secteur));
    return Array.from(s);
  }, [projects]);

  const filtered = projects.filter((p) => {
    const okService = service === 'all' || p.services.includes(service);
    const okSecteur = secteur === 'all' || p.secteur === secteur;
    return okService && okSecteur;
  });

  return (
    <div className="space-y-6">
      {/* Filtres légers */}

      {/* Grille */}
      <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 xl:grid-cols-3">
        {filtered.map((p) => (
          <ProjectCard
            key={p.id}
            id={p.id}
            titre={p.titre}
            client={p.client}
            secteur={p.secteur}
            periode={p.periode}
            services={p.services}
            resultat={p.resultat}
            coverImage={p.coverImage}
            lien={p.lien}
            hrefDetails={`${baseHref}#${p.id}`}
          />
        ))}
      </div>
    </div>
  );
}
