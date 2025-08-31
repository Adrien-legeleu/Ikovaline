// components/Projects/ProjectCard.tsx
'use client';

import Image from 'next/image';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { IconArrowRight } from '@tabler/icons-react';

type CardProps = {
  id: string;
  titre: string;
  client: string;
  secteur: string;
  periode: string;
  services: string[];
  resultat: string;
  coverImage: string;
  lien?: string;
  hrefDetails?: string; // vers page /projets (panel ou détails)
  className?: string;
};

const BLUR =
  'data:image/svg+xml;utf8,' +
  encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' width='24' height='16'></svg>`
  );

export default function ProjectCard({
  id,
  titre,
  client,
  secteur,
  periode,
  services,
  resultat,
  coverImage,
  lien,
  hrefDetails = '#',
  className,
}: CardProps) {
  return (
    <div
      className={cn(
        'relative overflow-hidden p-3  rounded-3xl border border-white/30 dark:border-white/10 bg-white/10 dark:bg-neutral-900/10 backdrop-blur-md transition-transform duration-300 hover:scale-[1.01]',
        className
      )}
    >
      <div className="relative aspect-[16/10] w-full overflow-hidden">
        <Image
          src={coverImage}
          alt={titre}
          fill
          className="object-cover rounded-3xl"
          placeholder="blur"
          blurDataURL={BLUR}
          unoptimized
          sizes="(max-width:768px) 100vw, (max-width:1200px) 50vw, 520px"
          priority={false}
        />
      </div>

      <div className="p-6">
        <div className="mb-1 text-xs uppercase tracking-wide text-neutral-600 dark:text-neutral-400">
          {client} • {secteur} • {periode}
        </div>
        <h3 className="text-lg sm:text-xl font-semibold text-neutral-900 dark:text-neutral-100">
          {titre}
        </h3>

        <p className="mt-2 text-sm text-neutral-600 dark:text-neutral-300">
          {services.join(' • ')}
        </p>

        <div className="mt-3 text-sm font-medium text-emerald-700 dark:text-emerald-300">
          {resultat}
        </div>

        <div className="mt-5 flex gap-3">
          {lien && (
            <a
              href={lien}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-medium text-cyan-700 dark:text-cyan-200"
            >
              Demo <IconArrowRight className="size-4" />
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
