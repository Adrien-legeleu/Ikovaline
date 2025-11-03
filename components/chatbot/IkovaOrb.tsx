'use client';

import * as React from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import IkovalineLogo from '@/public/images/logo/ikovaline-logo.svg';

type Props = { onClick: () => void; hidden?: boolean };

export default function IkovalineButtonFloating({ onClick, hidden }: Props) {
  const outerRef = React.useRef<HTMLButtonElement>(null);
  const innerRef = React.useRef<HTMLDivElement>(null);

  const rafRef = React.useRef<number>(0);
  const runningRef = React.useRef<boolean>(false);

  const tYRef = React.useRef(0);
  const cYRef = React.useRef(0);
  const tSxRef = React.useRef(1);
  const cSxRef = React.useRef(1);
  const tSyRef = React.useRef(1);
  const cSyRef = React.useRef(1);

  const lastYRef = React.useRef<number>(
    typeof window !== 'undefined' ? window.scrollY : 0
  );
  const startTimeRef = React.useRef<number>(0);

  const lerp = (a: number, b: number, f: number) => a + (b - a) * f;

  const applyTransforms = (outer: HTMLElement, inner: HTMLElement) => {
    outer.style.transform = `translateY(${cYRef.current.toFixed(2)}px)`;
    inner.style.transform = `scale(${cSxRef.current.toFixed(3)}, ${cSyRef.current.toFixed(3)})`;
  };

  const onScroll = () => {
    const nowY = window.scrollY;
    const dy = nowY - lastYRef.current;
    lastYRef.current = nowY;

    const k = Math.max(-16, Math.min(16, -dy / 5));
    tYRef.current = k * 0.6;

    const intensity = Math.min(Math.abs(k) / 16, 1);
    tSxRef.current = 1 + 0.08 * intensity;
    tSyRef.current = 1 - 0.08 * intensity;
  };

  const tick = (now: number) => {
    const outer = outerRef.current;
    const inner = innerRef.current;
    if (!outer || !inner) return;

    // idle wobble ultra-léger
    if (!document.hidden) {
      if (!startTimeRef.current) startTimeRef.current = now;
      const t = (now - startTimeRef.current) / 1000;
      if (Math.abs(tYRef.current) < 0.2)
        tYRef.current = Math.sin(t * 1.5) * 0.35;
      if (Math.abs(tSxRef.current - 1) < 0.003)
        tSxRef.current = 1 + Math.sin(t * 1.2) * 0.005;
      if (Math.abs(tSyRef.current - 1) < 0.003)
        tSyRef.current = 1 - Math.sin(t * 1.2) * 0.005;
    }

    cYRef.current = lerp(cYRef.current, tYRef.current, 0.18);
    cSxRef.current = lerp(cSxRef.current, tSxRef.current, 0.2);
    cSyRef.current = lerp(cSyRef.current, tSyRef.current, 0.2);

    applyTransforms(outer, inner);
    rafRef.current = requestAnimationFrame(tick);
  };

  const startRAF = () => {
    if (runningRef.current) return;
    runningRef.current = true;
    lastYRef.current = window.scrollY;
    tYRef.current = 0;
    tSxRef.current = 1;
    tSyRef.current = 1;
    startTimeRef.current = 0;
    rafRef.current = requestAnimationFrame(tick);
  };

  const stopRAF = () => {
    runningRef.current = false;
    cancelAnimationFrame(rafRef.current);
  };

  const handleVisibility = () => {
    if (document.hidden) stopRAF();
    else startRAF();
  };
  const handleFocus = () => startRAF();
  const handleBlur = () => stopRAF();

  // Mount: wiring de base
  React.useEffect(() => {
    const outer = outerRef.current;
    const inner = innerRef.current;
    if (!outer || !inner) return;

    window.addEventListener('scroll', onScroll, { passive: true });
    document.addEventListener('visibilitychange', handleVisibility);
    window.addEventListener('focus', handleFocus);
    window.addEventListener('blur', handleBlur);

    startRAF();

    return () => {
      stopRAF();
      window.removeEventListener('scroll', onScroll);
      document.removeEventListener('visibilitychange', handleVisibility);
      window.removeEventListener('focus', handleFocus);
      window.removeEventListener('blur', handleBlur);
    };
  }, []);

  // NEW: réagit au toggle `hidden` de la modal sans démonter le composant
  React.useEffect(() => {
    if (hidden) {
      // on fige la position pour éviter un “jump” au re-show
      tYRef.current = 0;
      tSxRef.current = 1;
      tSyRef.current = 1;
      stopRAF();
    } else {
      // re-sync puis relance
      lastYRef.current = window.scrollY;
      startRAF();
    }
  }, [hidden]);

  return (
    <button
      ref={outerRef}
      onClick={onClick}
      aria-label="Ouvrir IkovalineTalk"
      aria-hidden={hidden ? 'true' : 'false'}
      className={cn(
        'fixed bottom-6 right-6 z-[10000000] appearance-none bg-transparent p-0 outline-none',
        // on ne démonte plus : on masque proprement
        hidden
          ? 'opacity-0 pointer-events-none scale-95 transition-all duration-200'
          : 'opacity-100 pointer-events-auto scale-100 transition-all duration-200'
      )}
    >
      <div
        ref={innerRef}
        className={cn(
          'relative flex items-center justify-center w-[64px] h-[64px] rounded-[1.6rem]',
          'bg-white/80 dark:bg-[#0e1116]/80 backdrop-blur-xl',
          'shadow-[0_18px_40px_rgba(0,0,0,0.4)] dark:shadow-[0_20px_40px_rgba(0,0,0,0.9)]'
        )}
      >
        <div className="relative h-12 w-12 flex items-center justify-center">
          <div
            aria-hidden
            className="absolute inset-0 rounded-[1.4rem] animate-[spin_10s_linear_infinite]"
            style={{
              padding: '2px',
              background:
                'conic-gradient(from 160deg, rgba(59,130,246,0.15), rgba(99,102,241,0.35), rgba(59,130,246,0.15))',
              WebkitMask:
                'linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)',
              WebkitMaskComposite: 'xor' as any,
              maskComposite: 'exclude',
              boxShadow:
                '0 0 20px rgba(59,130,246,0.25), inset 0 0 12px rgba(99,102,241,0.15)',
            }}
          />
          <div
            aria-hidden
            className="absolute inset-0 rounded-2xl"
            style={{
              background:
                'radial-gradient(60% 60% at 50% 50%, rgba(59,130,246,0.2), rgba(99,102,241,0.0))',
              filter: 'blur(5px)',
            }}
          />
          <Image
            src={IkovalineLogo}
            alt="Ikovaline"
            className="h-12 w-12 object-contain"
            priority
          />
        </div>
      </div>
    </button>
  );
}
