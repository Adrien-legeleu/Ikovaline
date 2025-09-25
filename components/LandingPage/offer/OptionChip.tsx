// app/(site)/components/OptionChip.tsx
'use client';

import { memo, useCallback, useMemo, useState, startTransition } from 'react';
import { IconInfoCircle, IconSparkles } from '@tabler/icons-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Switch } from '@/components/ui/switch';
import type { OptionId } from '@/lib/offers/pricing';

type Props = {
  id: OptionId;
  label: string;
  price: number;
  highlight?: boolean;
  tooltip?: string[];
  checked: boolean;
  onToggle: (id: OptionId) => void;
};

// fallback immuable hors composant (pas recréé à chaque render)
const FALLBACK: Record<OptionId | string, string[]> = {
  speed: ['Améliore LCP/INP', 'Perf mobile ↑', 'Peut booster les conversions'],
  uxui: ['Parcours simplifié', 'Confiance renforcée', 'Peut ↑ CR'],
  seo: ['Structure & contenu', 'Gains progressifs', 'Trafic organique'],
};

function OptionChipBase({
  id,
  label,
  price,
  highlight,
  tooltip,
  checked,
  onToggle,
}: Props) {
  const [open, setOpen] = useState(false);

  // évite de recalculer quand rien ne change
  const tips = useMemo(
    () => (tooltip?.length ? tooltip : FALLBACK[id] || []).slice(0, 4),
    [tooltip, id]
  );

  // handler stable + transition non bloquante
  const handleToggle = useCallback(() => {
    startTransition(() => onToggle(id));
  }, [id, onToggle]);

  return (
    <div
      className={[
        'group flex w-full items-center justify-between px-4 py-3 transition-all rounded-2xl border shadow-sm hover:shadow-md',
        checked
          ? 'border-primary bg-primary/5 ring-1 ring-primary/20 dark:bg-primary/10'
          : 'border-black/10 hover:border-black/20 dark:border-white/10 dark:hover:border-white/20',
        highlight ? 'border-primary/40 dark:border-primary/50' : '',
        'bg-white dark:bg-neutral-900/60',
      ].join(' ')}
      // important: on ne toggle plus toute la carte (pour éviter double render),
      // on laisse le Switch faire le job. Le clic carte peut OUVRIR infos si tu veux.
      role="group"
      style={{ WebkitTapHighlightColor: 'transparent' }}
    >
      <div className="flex items-center gap-3">
        <div
          className={[
            'size-7 rounded-2xl flex items-center justify-center',
            checked
              ? 'bg-primary text-white'
              : 'bg-black/5 text-black/60 dark:bg-white/10 dark:text-white/70',
          ].join(' ')}
        >
          <IconSparkles className="size-4" />
        </div>
        <div>
          <div className="font-medium text-[15px] text-neutral-900 dark:text-white">
            {label}
          </div>
          <div className="text-xs text-black/60 dark:text-white/60">
            +{price.toLocaleString('fr-FR')}€
          </div>
        </div>
      </div>

      {/* actions à droite */}
      <div className="flex items-center gap-2">
        <TooltipProvider delayDuration={0}>
          <Tooltip>
            <TooltipTrigger asChild>
              <button
                type="button"
                className="p-1 rounded-md text-black/60 hover:text-black focus:outline-none dark:text-white/70 dark:hover:text-white"
                aria-label={`Infos ${label}`}
                onClick={(e) => {
                  e.preventDefault();
                  setOpen(true);
                }}
              >
                <IconInfoCircle className="size-4" />
              </button>
            </TooltipTrigger>
            <TooltipContent
              side="top"
              sideOffset={10}
              className="max-w-xs rounded-2xl border border-black/10 bg-white shadow-lg dark:bg-neutral-900 dark:border-white/10"
            >
              <div className="text-xs font-medium mb-1 text-neutral-900 dark:text-white">
                {label}
              </div>
              <ul className="text-xs space-y-1 text-neutral-700 dark:text-white/70">
                {tips.length ? (
                  tips.map((t, i) => <li key={i}>• {t}</li>)
                ) : (
                  <li>Aperçu rapide indisponible.</li>
                )}
              </ul>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <span />
          </DialogTrigger>
          <DialogContent className="max-w-xs w-4/5 rounded-2xl border border-black/10 bg-white shadow-lg dark:bg-neutral-900 dark:border-white/10">
            <DialogHeader>
              <DialogTitle>{label}</DialogTitle>
            </DialogHeader>
            <div className="text-sm text-black/70 dark:text-white/70 space-y-2">
              <p>Comprend notamment :</p>
              <ul className="list-disc pl-5">
                {tips.length ? (
                  tips.map((t, i) => <li key={i}>{t}</li>)
                ) : (
                  <li>Détails à venir.</li>
                )}
              </ul>
              <p className="text-xs text-black/50 dark:text-white/50 mt-2">
                Impact indicatif selon secteur & concurrence.
              </p>
            </div>
          </DialogContent>
        </Dialog>

        <Switch checked={checked} onCheckedChange={handleToggle} />
      </div>
    </div>
  );
}

// évite les re-renders quand props inchangées
function areEqual(prev: Props, next: Props) {
  return (
    prev.id === next.id &&
    prev.label === next.label &&
    prev.price === next.price &&
    prev.highlight === next.highlight &&
    prev.checked === next.checked &&
    prev.onToggle === next.onToggle && // handler stable requis
    JSON.stringify(prev.tooltip ?? []) === JSON.stringify(next.tooltip ?? [])
  );
}

export default memo(OptionChipBase, areEqual);
