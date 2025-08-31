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
  return (
    <div className="space-y-6">
      {/* Filtres légers */}

      {/* Grille */}
      <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 xl:grid-cols-3">
        {projects.map((p) => (
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
