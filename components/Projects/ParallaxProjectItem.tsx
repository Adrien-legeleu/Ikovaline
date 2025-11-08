'use client';

import Image from 'next/image';
import { cn } from '@/lib/utils';

export type ParallaxProject = {
  id: string;
  titre: string; // "Lynelec"
  services: string[]; // ["Site vitrine", "SEO local"]
  coverImage: string; // visuel
  lien?: string; // 'https://...'
};

export default function ParallaxProjectItem({
  project,
  isDimmed,
  isActive,
  onHover,
  onLeave,
  className,
}: {
  project: ParallaxProject;
  isDimmed: boolean;
  isActive: boolean;
  onHover: () => void;
  onLeave: () => void;
  className?: string;
}) {
  const { titre, services, coverImage, lien } = project;

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!lien) {
      e.preventDefault();
      e.stopPropagation();
    }
  };

  return (
    <a
      href={lien ?? '#'}
      target={lien ? '_blank' : undefined}
      rel={lien ? 'noopener noreferrer' : undefined}
      onClick={handleClick}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      aria-disabled={!lien}
      tabIndex={lien ? 0 : -1}
      className={cn(
        'block will-change-transform filter select-none',
        'transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)]',
        lien ? 'cursor-pointer' : 'cursor-default',
        isDimmed
          ? 'opacity-[0.35] brightness-[0.6] scale-[0.98]'
          : isActive
            ? 'opacity-100 brightness-[1] scale-[1.03]'
            : 'opacity-100 brightness-[1] scale-[1]',
        className
      )}
    >
      {/* IMAGE */}
      <div className="relative h-80 w-full">
        <Image
          src={coverImage}
          alt={titre}
          width={500}
          height={500}
          className="h-full w-full rounded-[3rem] object-cover"
          priority={false}
        />
      </div>

      {/* TEXTE */}
      <div className="pt-3 pl-1">
        <div className="text-md sm:text-xl leading-6 font-extrabold tracking-wide dark:text-neutral-100 text-neutral-900">
          {titre}
        </div>

        {services?.length > 0 && (
          <div className="mt-1 text-sm font-extrabold text-neutral-500 dark:text-neutral-400">
            {services.join(', ')}
          </div>
        )}
      </div>
    </a>
  );
}
