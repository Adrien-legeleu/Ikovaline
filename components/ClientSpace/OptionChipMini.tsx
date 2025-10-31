'use client';

import { memo, useMemo } from 'react';
import { Switch } from '@/components/ui/switch';
import { IconInfoCircle } from '@tabler/icons-react';
import type { OptionId } from '@/lib/offers/pricing';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

type Props = {
  id: OptionId;
  label: string;
  price: number;
  highlight?: boolean;
  tooltip?: string[];
  checked: boolean;
  onToggle: (id: OptionId) => void;
};

const FALLBACK: Record<string, string[]> = {
  speed: ['INP/LCP meilleurs', 'Perf mobile', 'SEO technique'],
  uxui: ['Parcours plus clair', 'Confiance ↑', 'Peut ↑ conversions'],
  seo: ['On-page & maillage', 'Gains 3–6 mois', 'Trafic organique'],
  analytics: ['KPIs', 'Funnels', 'Attribution'],
};

function OptionChipMiniBase({
  id,
  label,
  price,
  highlight,
  tooltip,
  checked,
  onToggle,
}: Props) {
  const tips = useMemo(
    () => (tooltip?.length ? tooltip : FALLBACK[id] || []).slice(0, 4),
    [tooltip, id]
  );

  return (
    <div
      className={[
        'flex items-center justify-between gap-2 rounded-2xl px-3 py-2 text-sm shadow-sm',
        checked
          ? 'bg-primary/10 ring-1 ring-primary/20'
          : 'bg-white/80 dark:bg-neutral-900/70',
        highlight ? 'ring-1 ring-primary/30' : '',
      ].join(' ')}
    >
      <div className="min-w-0">
        <div className="flex items-center gap-1.5">
          <span className="font-medium">{label}</span>
          <TooltipProvider delayDuration={0}>
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  type="button"
                  className="text-muted-foreground hover:text-foreground"
                  aria-label={`Infos ${label}`}
                >
                  <IconInfoCircle className="size-3.5" />
                </button>
              </TooltipTrigger>
              <TooltipContent className="text-xs max-w-xs rounded-xl">
                <ul className="space-y-1">
                  {tips.length ? (
                    tips.map((t, i) => <li key={i}>• {t}</li>)
                  ) : (
                    <li>Détails bientôt.</li>
                  )}
                </ul>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <div className="text-[11px] text-muted-foreground">
          +{price.toLocaleString('fr-FR')}€
        </div>
      </div>

      <Switch checked={checked} onCheckedChange={() => onToggle(id)} />
    </div>
  );
}

function areEqual(prev: Props, next: Props) {
  return (
    prev.id === next.id &&
    prev.label === next.label &&
    prev.price === next.price &&
    prev.highlight === next.highlight &&
    prev.checked === next.checked &&
    prev.onToggle === next.onToggle &&
    JSON.stringify(prev.tooltip ?? []) === JSON.stringify(next.tooltip ?? [])
  );
}

export default memo(OptionChipMiniBase, areEqual);
