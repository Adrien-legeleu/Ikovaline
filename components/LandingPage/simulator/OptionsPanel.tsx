'use client';
import { motion, AnimatePresence } from 'framer-motion';
import type {
  CategoryDef,
  MobileSupplement,
  OptionDef,
  SelectionState,
  TierDef,
} from '@/lib/catalog';
import { getVisibleOptions, isOptionSelected } from '@/lib/catalog';
import { TogglePill, RadioGroup, QtyPill } from './OptionPills';

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, filter: 'blur(8px)', y: 8 }}
      animate={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
      transition={{ duration: 0.25 }}
      className="
        rounded-[3rem] p-5 sm:p-6
        bg-white dark:bg-neutral-900
        ring-1 ring-black/[0.03] dark:ring-white/[0.06]
        shadow-[0_28px_64px_rgba(0,0,0,0.06),0_2px_4px_rgba(0,0,0,0.03)]
        space-y-4
      "
    >
      <div className="text-sm font-semibold tracking-[-0.01em] text-neutral-900 dark:text-white">
        {title}
      </div>
      {children}
    </motion.div>
  );
}

export function OptionsPanel({
  category,
  tier,
  mobile,
  sel,
  onSel,
}: {
  category: CategoryDef;
  tier: TierDef;
  mobile: MobileSupplement[];
  sel: SelectionState;
  onSel: (s: SelectionState) => void;
}) {
  const opts = getVisibleOptions(category, tier.id);

  const setToggle = (id: string, v: boolean) => {
    const next = new Set(sel.toggles);
    v ? next.add(id) : next.delete(id);
    onSel({ ...sel, toggles: next });
  };
  const setRadio = (group: string, id?: string) =>
    onSel({ ...sel, radios: { ...sel.radios, [group]: id } });
  const setQty = (id: string, q: number) =>
    onSel({ ...sel, qty: { ...sel.qty, [id]: q } });

  const radiosByGroup: Record<string, OptionDef[]> = {};
  const toggles: OptionDef[] = [];
  const qtys: OptionDef[] = [];

  for (const o of opts) {
    if (o.kind === 'radio' && o.group) {
      radiosByGroup[o.group] = radiosByGroup[o.group]
        ? [...radiosByGroup[o.group], o]
        : [o];
    } else if (o.kind === 'toggle') {
      toggles.push(o);
    } else if (o.kind === 'qty') {
      qtys.push(o);
    }
  }

  const showMobile = category.id === 'ecommerce' || category.id === 'saas';

  return (
    <div className="space-y-6">
      <AnimatePresence initial={false}>
        {Object.keys(radiosByGroup).length ? (
          <Section title="Choix exclusifs (1 sélection)">
            {Object.entries(radiosByGroup).map(([groupId, items], i) => (
              <div key={`${groupId}-${i}`} className="overflow-x-auto pb-1">
                <RadioGroup
                  groupId={groupId}
                  options={items.map((item, j) => ({
                    id: item.id || `radio-${i}-${j}`,
                    label: item.label,
                    price: item.price,
                  }))}
                  value={sel.radios[groupId]}
                  onChange={(id) => setRadio(groupId, id)}
                />
              </div>
            ))}
          </Section>
        ) : null}

        {toggles.length ? (
          <Section title="Options recommandées">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {toggles.map((o, i) => (
                <TogglePill
                  key={o.id || `toggle-${i}`}
                  selected={isOptionSelected(sel, o)}
                  label={o.label}
                  price={o.price}
                  note={o.note}
                  onToggle={() => setToggle(o.id, !sel.toggles.has(o.id))}
                />
              ))}
            </div>
          </Section>
        ) : null}

        {qtys.length ? (
          <Section title="Quantités">
            <div className="space-y-4">
              {qtys.map((o, i) => (
                <QtyPill
                  key={o.id || `qty-${i}`}
                  label={o.label}
                  unitPrice={o.price}
                  note={o.note}
                  qty={Math.max(0, sel.qty[o.id] ?? 0)}
                  onChange={(q) => setQty(o.id, q)}
                />
              ))}
            </div>
          </Section>
        ) : null}

        {showMobile ? (
          <Section title="Application mobile (options cumulables)">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {mobile.map((m, i) => (
                <TogglePill
                  key={m.id || `mobile-${i}`}
                  selected={sel.toggles.has(m.id)}
                  label={m.label}
                  price={m.price}
                  note={m.note}
                  onToggle={() => {
                    const next = new Set(sel.toggles);
                    next.has(m.id) ? next.delete(m.id) : next.add(m.id);
                    onSel({ ...sel, toggles: next });
                  }}
                />
              ))}
            </div>
          </Section>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
