'use client';

import { Moon, SunDim } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useEffect, useState, useRef } from 'react';
import { flushSync } from 'react-dom';
import { cn } from '@/lib/utils';

type Props = {
  className?: string;
};

export const AnimatedThemeToggler = ({ className }: Props) => {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const buttonRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const changeTheme = async () => {
    if (!buttonRef.current || !mounted) return;

    const next = resolvedTheme === 'dark' ? 'light' : 'dark';

    await document.startViewTransition?.(() => {
      flushSync(() => {
        setTheme(next);
      });
    })?.ready;

    // animation optionnelle (sinon tu peux la virer)
    const { top, left, width, height } =
      buttonRef.current.getBoundingClientRect();
    const y = top + height / 2;
    const x = left + width / 2;

    const right = window.innerWidth - left;
    const bottom = window.innerHeight - top;
    const maxRad = Math.hypot(Math.max(left, right), Math.max(top, bottom));

    document.documentElement.animate(
      {
        clipPath: [
          `circle(0px at ${x}px ${y}px)`,
          `circle(${maxRad}px at ${x}px ${y}px)`,
        ],
      },
      {
        duration: 700,
        easing: 'ease-in-out',
        pseudoElement: '::view-transition-new(root)',
      }
    );
  };

  if (!mounted) return null;

  return (
    <button ref={buttonRef} onClick={changeTheme} className={cn(className)}>
      {resolvedTheme === 'dark' ? (
        <SunDim className="h-6 w-6 lg:h-5 lg:w-5 xl:h-6 xl:w-6" />
      ) : (
        <Moon className="h-6 w-6 lg:h-5 lg:w-5 xl:h-6 xl:w-6" />
      )}
    </button>
  );
};
