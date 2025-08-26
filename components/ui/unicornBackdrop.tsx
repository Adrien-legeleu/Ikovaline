'use client';

import React, { useEffect, useRef, useState } from 'react';
import UnicornScene from 'unicornstudio-react';
import { cn } from '@/lib/utils';

export default function UnicornBackdrop({ className }: { className?: string }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState({ w: 0, h: 0 });

  useEffect(() => {
    if (!wrapRef.current) return;
    const el = wrapRef.current;
    const ro = new ResizeObserver(() => {
      const r = el.getBoundingClientRect();
      setSize({ w: Math.floor(r.width), h: Math.floor(r.height) });
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  return (
    <div
      ref={wrapRef}
      className={cn('absolute inset-0 -z-10 bg-neutral-950', className)}
    >
      {size.w > 0 && size.h > 0 && (
        <UnicornScene
          production
          projectId="ed7SJMvTJEVxfqzypOOQ"
          width={size.w}
          height={size.h}
        />
      )}
    </div>
  );
}
