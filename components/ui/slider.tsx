// components/ui/slider.tsx
'use client';

import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

type SliderProps = {
  value?: number[];
  defaultValue?: number[];
  min?: number;
  max?: number;
  step?: number;
  disabled?: boolean;
  className?: string;
  onValueChange?: (v: number[]) => void;
  'aria-label'?: string;
};

export function Slider({
  value,
  defaultValue = [0],
  min = 0,
  max = 100,
  step = 1,
  disabled = false,
  className,
  onValueChange,
  'aria-label': ariaLabel = 'slider',
}: SliderProps) {
  const isControlled = Array.isArray(value);
  const [internal, setInternal] = useState<number[]>(value ?? defaultValue);
  const val = isControlled ? (value as number[]) : internal;

  const v = useMemo(() => {
    const raw = val?.[0] ?? min;
    return Math.min(max, Math.max(min, raw));
  }, [val, min, max]);

  useEffect(() => {
    if (isControlled) setInternal(value as number[]);
  }, [isControlled, value]);

  const pct = ((v - min) / (max - min)) * 100;
  const railRef = useRef<HTMLDivElement | null>(null);
  const dragging = useRef(false);

  const toStep = (x: number) => {
    const s = step > 0 ? step : 1;
    const n = Math.round(x / s) * s;
    return Math.min(max, Math.max(min, n));
  };

  const posToValue = (clientX: number) => {
    const el = railRef.current;
    if (!el) return v;
    const rect = el.getBoundingClientRect();
    const t = (clientX - rect.left) / rect.width; // 0..1
    return toStep(min + t * (max - min));
  };

  const commit = useCallback(
    (next: number) => {
      const arr = [next];
      if (!isControlled) setInternal(arr);
      onValueChange?.(arr);
    },
    [isControlled, onValueChange]
  );

  const onPointerDown = (e: React.PointerEvent) => {
    if (disabled) return;
    (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
    dragging.current = true;
    commit(posToValue(e.clientX));
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (!dragging.current || disabled) return;
    commit(posToValue(e.clientX));
  };

  const onPointerUp = (e: React.PointerEvent) => {
    dragging.current = false;
    (e.target as HTMLElement).releasePointerCapture?.(e.pointerId);
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (disabled) return;
    const big = Math.max(step * 10, (max - min) / 10);
    if (e.key === 'ArrowRight' || e.key === 'ArrowUp') commit(toStep(v + step));
    else if (e.key === 'ArrowLeft' || e.key === 'ArrowDown')
      commit(toStep(v - step));
    else if (e.key === 'Home') commit(min);
    else if (e.key === 'End') commit(max);
    else if (e.key === 'PageUp') commit(toStep(v + big));
    else if (e.key === 'PageDown') commit(toStep(v - big));
  };

  return (
    <div className={['select-none', className ?? ''].join(' ')}>
      <div
        ref={railRef}
        className={[
          'relative h-2 rounded-full',
          'bg-black/10 dark:bg-white/10',
          disabled ? 'opacity-50' : 'cursor-pointer',
        ].join(' ')}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
      >
        {/* Track filled */}
        <div
          className="absolute left-0 top-0 h-full rounded-full"
          style={{
            width: `${pct}%`,
            background:
              'linear-gradient(90deg, rgba(44,183,255,.6), rgba(44,183,255,.3))',
          }}
        />
        {/* Thumb */}
        <div
          role="slider"
          aria-label={ariaLabel}
          aria-valuemin={min}
          aria-valuemax={max}
          aria-valuenow={v}
          tabIndex={disabled ? -1 : 0}
          onKeyDown={onKeyDown}
          className={[
            'absolute top-1/2 -translate-y-1/2 translate-x-[-50%]',
            'size-5 rounded-xl shadow-lg backdrop-blur',
            'bg-white dark:bg-neutral-800',
            'ring-2 ring-sky-400/50 focus:outline-none focus:ring-sky-500/60',
            'transition-transform will-change-transform',
          ].join(' ')}
          style={{ left: `${pct}%` }}
        />
      </div>
      {/* Subtle value */}
      <div className="mt-1 text-[11px] text-black/50 dark:text-white/50">
        {v.toLocaleString('fr-FR')}€
      </div>
    </div>
  );
}
