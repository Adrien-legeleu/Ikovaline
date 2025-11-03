'use client';

import * as React from 'react';
import {
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from 'lucide-react';
import { DayButton, DayPicker, getDefaultClassNames } from 'react-day-picker';
import { cn } from '@/lib/utils';

// ────────────────────────────────────────────────────────────
// Calendar
// ────────────────────────────────────────────────────────────
function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  captionLayout = 'label',
  formatters,
  components,
  isAdmin = false,
  ...props
}: React.ComponentProps<typeof DayPicker> & { isAdmin?: boolean }) {
  const defaultClassNames = getDefaultClassNames();

  /**
   * Règle d'activation:
   * - admin => aucune restriction
   * - pas admin => on interdit les dates avant aujourd'hui
   */
  const disabledRule = isAdmin ? undefined : { before: new Date() };

  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      disabled={disabledRule}
      className={cn(
        'bg-background group/calendar w-full rounded-[2rem] p-3 [--cell-size:2rem] [[data-slot=card-content]_&]:bg-transparent [[data-slot=popover-content]_&]:bg-transparent',
        String.raw`rtl:**:[.rdp-button_next>svg]:rotate-180`,
        String.raw`rtl:**:[.rdp-button_previous>svg]:rotate-180`,
        className
      )}
      captionLayout={captionLayout}
      formatters={{
        formatMonthDropdown: (date) =>
          date.toLocaleString('default', { month: 'short' }),
        ...formatters,
      }}
      classNames={{
        root: cn('w-fit', defaultClassNames.root),
        months: cn(
          'relative flex flex-col gap-4 md:flex-row',
          defaultClassNames.months
        ),
        month: cn('flex w-full flex-col gap-4', defaultClassNames.month),
        nav: cn(
          'absolute inset-x-0 top-0 flex w-full items-center justify-between gap-1',
          defaultClassNames.nav
        ),
        button_previous: cn(
          'h-[--cell-size] w-[--cell-size] select-none p-0 aria-disabled:opacity-50',
          defaultClassNames.button_previous
        ),
        button_next: cn(
          'h-[--cell-size] w-[--cell-size] select-none p-0 aria-disabled:opacity-50',
          defaultClassNames.button_next
        ),
        month_caption: cn(
          'flex h-[--cell-size] w-full items-center justify-center px-[--cell-size]',
          defaultClassNames.month_caption
        ),
        dropdowns: cn(
          'flex h-[--cell-size] w-full items-center justify-center gap-1.5 text-sm font-medium',
          defaultClassNames.dropdowns
        ),
        dropdown_root: cn(
          'relative rounded-md',
          defaultClassNames.dropdown_root
        ),
        dropdown: cn('absolute inset-0 opacity-0', defaultClassNames.dropdown),
        caption_label: cn(
          'select-none font-medium',
          captionLayout === 'label'
            ? 'text-sm'
            : '[&>svg]:text-muted-foreground flex h-8 items-center gap-1 rounded-md pl-2 pr-1 text-sm [&>svg]:size-3.5',
          defaultClassNames.caption_label
        ),
        table: 'w-full border-collapse',
        weekdays: cn('flex', defaultClassNames.weekdays),
        weekday: cn(
          'text-muted-foreground flex-1 select-none rounded-md text-[0.8rem] font-normal',
          defaultClassNames.weekday
        ),
        week: cn('mt-2 flex w-full', defaultClassNames.week),
        week_number_header: cn(
          'w-[--cell-size] select-none',
          defaultClassNames.week_number_header
        ),
        week_number: cn(
          'text-muted-foreground select-none text-[0.8rem]',
          defaultClassNames.week_number
        ),

        day: cn(
          'group/day relative aspect-square h-full w-full select-none p-0 text-center',
          defaultClassNames.day
        ),

        range_start: cn('bg-accent', defaultClassNames.range_start),
        range_middle: cn('rounded-none', defaultClassNames.range_middle),
        range_end: cn('bg-accent', defaultClassNames.range_end),

        today: cn(
          '!bg-transparent !text-white font-semibold rounded-[0.85rem] border border-white/10',
          'data-[selected=true]:bg-primary data-[selected=true]:text-white',
          defaultClassNames.today
        ),

        outside: cn(
          'text-muted-foreground aria-selected:text-muted-foreground',
          defaultClassNames.outside
        ),

        // style quand DayPicker marque un jour "disabled"
        disabled: cn(
          'text-muted-foreground opacity-50 cursor-not-allowed',
          defaultClassNames.disabled
        ),

        hidden: cn('invisible', defaultClassNames.hidden),
        ...classNames,
      }}
      components={{
        Root: ({ className, rootRef, ...p }) => (
          <div
            data-slot="calendar"
            ref={rootRef}
            className={cn(className)}
            {...p}
          />
        ),
        Chevron: ({ className, orientation, ...p }) =>
          orientation === 'left' ? (
            <ChevronLeftIcon className={cn('size-4', className)} {...p} />
          ) : orientation === 'right' ? (
            <ChevronRightIcon className={cn('size-4', className)} {...p} />
          ) : (
            <ChevronDownIcon className={cn('size-4', className)} {...p} />
          ),

        // On passe isAdmin ici pour la logique des <button />
        DayButton: (dayButtonProps) => (
          <CalendarDayButton isAdmin={isAdmin} {...dayButtonProps} />
        ),

        WeekNumber: ({ children, ...p }) => (
          <td {...p}>
            <div className="flex size-[--cell-size] items-center justify-center text-center">
              {children}
            </div>
          </td>
        ),
        ...components,
      }}
      {...props}
    />
  );
}

// ────────────────────────────────────────────────────────────
/**
 * Custom Day Button:
 * Avant : on faisait `disabled={modifiers.disabled}`
 * Maintenant :
 *   - si admin => on *ignore* le disabled "date passée".
 *   - mais si le jour est vraiment disabled par autre chose (genre props.disabled custom future),
 *     on le garde.
 *
 * Concrètement:
 * - DayPicker nous passe `modifiers.disabled` si la date match "disabledRule"
 * - Pour un admin, on retire ce flag si c'est UNIQUEMENT parce que la date est passée.
 *
 * On peut approximer : si !isAdmin => on garde le comportement
 *                      si isAdmin => disabled = false
 *
 * (Si tu veux une logique plus fine, on peut analyser le jour par rapport à new Date()).
 */
// ────────────────────────────────────────────────────────────
function CalendarDayButton({
  className,
  day,
  modifiers,
  isAdmin = false,
  ...props
}: React.ComponentProps<typeof DayButton> & { isAdmin?: boolean }) {
  const defaultClassNames = getDefaultClassNames();
  const ref = React.useRef<HTMLButtonElement>(null);

  React.useEffect(() => {
    if (modifiers.focused) ref.current?.focus();
  }, [modifiers.focused]);

  const isSelectedSingle =
    !!modifiers.selected &&
    !modifiers.range_start &&
    !modifiers.range_end &&
    !modifiers.range_middle;

  // si admin => force disabled=false pour les jours passés
  // on considère que "passé" = < aujourd'hui minuit
  const todayMidnight = React.useMemo(() => {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    return d;
  }, []);

  const isInPast = day.date < todayMidnight;

  // disabled calculé:
  // - si pas admin: utilise le disabled natif
  // - si admin:
  //    - si c'est juste parce que c'est une date passée -> pas disabled
  //    - sinon (genre autre restriction future potentielle) -> reste disabled
  const effectiveDisabled = !isAdmin
    ? modifiers.disabled
    : modifiers.disabled && !isInPast
      ? true
      : false;

  return (
    <button
      ref={ref}
      disabled={effectiveDisabled}
      data-day={day.date.toLocaleDateString()}
      data-selected-single={isSelectedSingle || undefined}
      data-range-start={modifiers.range_start || undefined}
      data-range-end={modifiers.range_end || undefined}
      data-range-middle={modifiers.range_middle || undefined}
      className={cn(
        'flex aspect-square h-auto w-full min-w-[--cell-size] flex-col items-center justify-center gap-1',
        'font-normal leading-none select-none rounded-[0.85rem]',
        'text-foreground/90 hover:bg-muted/60 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-transparent',
        'data-[selected-single=true]:bg-primary data-[selected-single=true]:text-white',
        'data-[today=true]:text-white',
        'data-[range-start=true]:bg-primary data-[range-start=true]:text-white',
        'data-[range-end=true]:bg-primary data-[range-end=true]:text-white',
        'data-[range-middle=true]:bg-accent data-[range-middle=true]:text-accent-foreground',
        'focus:outline-none focus-visible:ring-0 transition-colors duration-150 ease-out',
        '[&>span]:text-xs [&>span]:opacity-70',
        defaultClassNames.day,
        className
      )}
      {...props}
    />
  );
}

export { Calendar, CalendarDayButton };
