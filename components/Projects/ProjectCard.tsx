// components/Projects/ProjectCard.tsx
'use client';

import Image from 'next/image';
import { IconArrowRight } from '@tabler/icons-react';
import { cn } from '@/lib/utils';

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
  hrefDetails?: string;
  className?: string;
};

const BLUR =
  'data:image/svg+xml;utf8,' +
  encodeURIComponent("<svg xmlns='http://www.w3.org/2000/svg' width='24' height='16'></svg>");

export default function ProjectCard({
  titre,
  client,
  secteur,
  periode,
  services,
  resultat,
  coverImage,
  lien,
  hrefDetails,
  className,
}: CardProps) {
  return (
    <article
      className={cn(
        'group relative overflow-hidden rounded-[28px] border',
        'border-white/50 dark:border-white/10',
        'bg-[linear-gradient(135deg,rgba(255,255,255,.9),rgba(240,245,252,.45))] dark:bg-[linear-gradient(135deg,rgba(10,14,20,.92),rgba(10,14,20,.6))]',
        'backdrop-blur-2xl shadow-[0_18px_60px_rgba(6,24,44,.12)] dark:shadow-[0_18px_60px_rgba(0,0,0,.65)]',
        'transition-transform duration-300 hover:-translate-y-1.5',
        className
      )}
    >
      {/* cover */}
      <div className="relative aspect-[16/10] w-full overflow-hidden">
        <Image
          src={coverImage}
          alt={titre}
          fill
          className="object-cover"
          placeholder="blur"
          blurDataURL={BLUR}
          unoptimized
          sizes="(max-width:768px) 100vw, (max-width:1200px) 50vw, 520px"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/30 via-black/0 to-black/0 opacity-70 mix-blend-multiply dark:opacity-80" />
      </div>

      {/* content */}
      <div className="p-6">
        <div className="mb-2 text-[11px] uppercase tracking-wide text-neutral-600 dark:text-neutral-400">
          {client} • {secteur} • {periode}
        </div>

        <h3 className="text-lg sm:text-xl font-semibold text-neutral-900 dark:text-neutral-100">
          {titre}
        </h3>

        {/* tags services */}
        <ul className="mt-3 flex flex-wrap gap-2">
          {services.slice(0, 4).map((s, i) => (
            <li
              key={i}
              className="rounded-full px-3 py-1 text-[11px] font-medium text-neutral-700 dark:text-neutral-200 border border-white/50 dark:border-white/10 bg-white/60 dark:bg-neutral-900/50 backdrop-blur-xl"
            >
              {s}
            </li>
          ))}
        </ul>

        <div className="mt-4 text-sm font-medium text-emerald-700 dark:text-emerald-300">
          {resultat}
        </div>

        <div className="mt-5 flex gap-4">
          {lien && (
            <a
              href={lien}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-medium text-sky-700 dark:text-sky-300"
            >
              Démo <IconArrowRight className="size-4" />
            </a>
          )}

          
        </div>
      </div>
    </article>
  );
}
