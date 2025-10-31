'use client';

import AnimatedNumber from '@/components/AnimatedNumber';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

export default function TierCompactMini({
  active,
  name,
  tagline,
  price,
  delayDays,
  bullets,
  ribbon,
  onSelect,
}: {
  active: boolean;
  name: string;
  tagline: string;
  price: number;
  delayDays: number;
  bullets: string[];
  ribbon?: 'popular' | 'new' | 'hot' | 'signature';
  onSelect: () => void;
}) {
  const ribbonText =
    ribbon === 'popular'
      ? 'Le plus choisi'
      : ribbon === 'new'
        ? 'Nouveau'
        : ribbon === 'hot'
          ? 'Populaire'
          : ribbon === 'signature'
            ? 'Signature'
            : undefined;

  return (
    <button
      type="button"
      onClick={onSelect}
      className={cn(
        'relative w-full h-full text-left rounded-[1.4rem] p-4 transition',
        'bg-white/80 dark:bg-neutral-900/70 backdrop-blur-md',
        'shadow-[0_6px_28px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_36px_rgba(0,0,0,0.07)]',
        'focus-visible:outline-none border-none focus-visible:ring-0 focus-visible:shadow-none',
        active
          ? 'bg-primary/10 text-primary '
          : 'hover:bg-black/[0.03] dark:hover:bg-white/[0.07]'
      )}
    >
      {ribbonText ? (
        <Badge
          className={cn(
            'absolute -top-3 left-3 text-white text-[10px] font-medium tracking-wide px-2 py-0.5 rounded-full',
            active ? 'bg-black/90 text-white' : 'bg-black dark:bg-white/10'
          )}
        >
          {ribbonText}
        </Badge>
      ) : null}

      {/* Titre + prix */}
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="text-[15px] font-semibold leading-tight">{name}</div>
          <div className="text-[12px] text-muted-foreground mt-0.5 line-clamp-2">
            {tagline}
          </div>
        </div>
        <div className="text-right shrink-0">
          <div className="text-lg font-bold leading-tight">
            {price === 0 ? (
              'Sur devis'
            ) : (
              <>
                <AnimatedNumber value={price} />€
              </>
            )}
          </div>
          <div className="text-[11px] text-muted-foreground mt-0.5">
            ~ {delayDays} j
          </div>
        </div>
      </div>

      {/* Bullets */}
      <ul className="mt-3 space-y-1.5">
        {bullets.slice(0, 3).map((b, i) => (
          <li
            key={i}
            className="flex items-start gap-2 text-[12.5px] leading-snug"
          >
            <span
              className={cn(
                'mt-[3px] inline-block size-3.5 rounded-full text-[10px] text-center leading-[13px]',
                active
                  ? 'bg-primary/20 text-primary'
                  : 'bg-black/5 dark:bg-white/10 text-muted-foreground/70'
              )}
            >
              ✓
            </span>
            <span className="text-foreground/90 truncate">{b}</span>
          </li>
        ))}
      </ul>
    </button>
  );
}
