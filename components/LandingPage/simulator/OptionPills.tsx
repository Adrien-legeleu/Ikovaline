'use client';

import { useCallback } from 'react';
import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';

/* =========================================================================
   Icône check dans un rond
   ========================================================================= */

function CheckBadge({ active }: { active: boolean }) {
  // active = l'option est sélectionnée
  // style :
  // - quand actif → fond blanc, icône primary
  // - quand inactif → fond transparent + bord
  return (
    <span
      className={cn(
        'flex h-5 w-5 shrink-0 items-center justify-center rounded-md  text-[10px] font-semibold transition-all',
        active
          ? 'bg-white text-primary'
          : 'bg-transparent text-neutral-400 border border-neutral-300 dark:border-neutral-700'
      )}
    >
      {active ? <Check className="h-3.5 w-3.5" /> : null}
    </span>
  );
}

/* =========================================================================
   TogglePill
   ========================================================================= */

export function TogglePill({
  selected,
  label,
  price,
  note,
  onToggle,
}: {
  selected: boolean;
  label: string;
  price: number;
  note?: string;
  onToggle: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className={cn(
        'w-full text-left rounded-3xl px-4 py-4 flex items-start gap-3 transition-all',
        'ring-1 ring-inset text-sm',
        selected
          ? 'bg-primary text-white ring-primary shadow-[0_20px_40px_rgba(0,123,255,0.28)]'
          : 'bg-white dark:bg-neutral-900 ring-black/[0.07] dark:ring-white/[0.08] text-neutral-900 dark:text-white hover:bg-neutral-50 dark:hover:bg-neutral-800'
      )}
    >
      {/* check badge */}
      <CheckBadge active={selected} />

      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between gap-3">
          <span className="font-semibold leading-tight truncate">{label}</span>
          <span
            className={cn(
              'text-xs font-semibold shrink-0 rounded-full px-2 py-1 leading-none',
              selected
                ? 'bg-white text-primary'
                : 'bg-neutral-100 text-neutral-700 dark:bg-neutral-800 dark:text-neutral-200'
            )}
          >
            +{price.toLocaleString('fr-FR')}€
          </span>
        </div>
        {note ? (
          <p
            className={cn(
              'text-[11px] leading-snug mt-1',
              selected
                ? 'text-white/80'
                : 'text-neutral-500 dark:text-neutral-400'
            )}
          >
            {note}
          </p>
        ) : null}
      </div>
    </button>
  );
}

/* =========================================================================
   RadioGroup
   ========================================================================= */

export function RadioGroup({
  groupId,
  options,
  value,
  onChange,
}: {
  groupId: string;
  options: { id: string; label: string; price: number }[];
  value?: string;
  onChange: (id: string) => void;
}) {
  return (
    <div className="flex flex-col gap-3">
      {options.map((opt) => {
        const active = opt.id === value;
        return (
          <button
            key={opt.id}
            type="button"
            onClick={() => onChange(opt.id)}
            className={cn(
              'w-full rounded-full px-4 py-4 flex items-start gap-3 text-left text-sm transition-all ring-1 ring-inset',
              active
                ? 'bg-primary text-white ring-primary shadow-[0_20px_40px_rgba(0,123,255,0.28)]'
                : 'bg-white dark:bg-neutral-900 ring-black/[0.07] dark:ring-white/[0.08] text-neutral-900 dark:text-white hover:bg-neutral-50 dark:hover:bg-neutral-800'
            )}
          >
            {/* check badge */}
            <CheckBadge active={active} />

            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-3">
                <span className="font-semibold leading-tight truncate">
                  {opt.label}
                </span>
                <span
                  className={cn(
                    'text-xs font-semibold shrink-0 rounded-full px-2 py-1 leading-none',
                    active
                      ? 'bg-white text-primary'
                      : 'bg-neutral-100 text-neutral-700 dark:bg-neutral-800 dark:text-neutral-200'
                  )}
                >
                  +{opt.price.toLocaleString('fr-FR')}€
                </span>
              </div>
              {/* Pour rester cohérent visuellement avec TogglePill qui peut avoir une note,
                  ici pas de note, donc pas de sous-texte.
               */}
            </div>
          </button>
        );
      })}
    </div>
  );
}

/* =========================================================================
   QtyPill
   ========================================================================= */

export function QtyPill({
  label,
  unitPrice,
  note,
  qty,
  onChange,
}: {
  label: string;
  unitPrice: number;
  note?: string;
  qty: number;
  onChange: (q: number) => void;
}) {
  const inc = useCallback(() => onChange(qty + 1), [qty, onChange]);
  const dec = useCallback(
    () => onChange(Math.max(0, qty - 1)),
    [qty, onChange]
  );

  const active = qty > 0;
  const totalPrice = unitPrice * qty;

  return (
    <div
      className={cn(
        'w-full rounded-full px-4 py-4 flex flex-col gap-3 transition-all ring-1 ring-inset',
        active
          ? 'bg-primary text-white ring-primary shadow-[0_20px_40px_rgba(0,123,255,0.28)]'
          : 'bg-white dark:bg-neutral-900 ring-black/[0.07] dark:ring-white/[0.08] text-neutral-900 dark:text-white'
      )}
    >
      <div className="flex items-start gap-3">
        {/* check badge */}
        <CheckBadge active={active} />

        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-3">
            <span className="font-semibold leading-tight truncate">
              {label}
            </span>

            {/* Prix total si actif, sinon prix unitaire */}
            <span
              className={cn(
                'text-xs font-semibold shrink-0 rounded-full px-2 py-1 leading-none',
                active
                  ? 'bg-white text-primary'
                  : 'bg-neutral-100 text-neutral-700 dark:bg-neutral-800 dark:text-neutral-200'
              )}
            >
              {active
                ? `+${totalPrice.toLocaleString('fr-FR')}€`
                : `+${unitPrice.toLocaleString('fr-FR')}€ /u`}
            </span>
          </div>

          {note ? (
            <p
              className={cn(
                'text-[11px] leading-snug mt-1',
                active
                  ? 'text-white/80'
                  : 'text-neutral-500 dark:text-neutral-400'
              )}
            >
              {note}
            </p>
          ) : null}
        </div>
      </div>

      {/* stepper quantité */}
      <div className="flex items-center justify-end gap-2 pl-8">
        <button
          type="button"
          onClick={dec}
          className={cn(
            'h-9 w-9 flex items-center justify-center rounded-full text-sm font-medium transition-all ring-1 ring-inset',
            active
              ? 'bg-white text-primary ring-white/0 hover:opacity-90'
              : 'bg-neutral-100 text-neutral-700 ring-black/[0.07] dark:bg-neutral-800 dark:text-neutral-200 dark:ring-white/[0.08] hover:bg-neutral-200/70 dark:hover:bg-neutral-700'
          )}
        >
          –
        </button>
        <div
          className={cn(
            'min-w-[2rem] text-center text-sm font-semibold',
            active ? 'text-white' : 'text-neutral-900 dark:text-white'
          )}
        >
          {qty}
        </div>
        <button
          type="button"
          onClick={inc}
          className={cn(
            'h-9 w-9 flex items-center justify-center rounded-full text-sm font-medium transition-all ring-1 ring-inset',
            active
              ? 'bg-white text-primary ring-white/0 hover:opacity-90'
              : 'bg-neutral-100 text-neutral-700 ring-black/[0.07] dark:bg-neutral-800 dark:text-neutral-200 dark:ring-white/[0.08] hover:bg-neutral-200/70 dark:hover:bg-neutral-700'
          )}
        >
          +
        </button>
      </div>
    </div>
  );
}
