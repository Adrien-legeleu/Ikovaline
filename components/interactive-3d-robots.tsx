'use client';

import { Suspense, lazy, useEffect, useState } from 'react';

const Spline = lazy(() => import('@splinetool/react-spline'));

interface InteractiveRobotSplineProps {
  scene: string;
  className?: string;
  priority?: boolean; // if true: mount immediately
}

export function InteractiveRobotSpline({
  scene,
  className,
  priority,
}: InteractiveRobotSplineProps) {
  const [mount, setMount] = useState(!!priority);

  // Lazy-mount when in viewport for perf
  useEffect(() => {
    if (priority) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setMount(true);
            obs.disconnect();
          }
        });
      },
      { rootMargin: '200px' }
    );
    const el = document.getElementById('robot-spline-mount');
    if (el) obs.observe(el);
    return () => obs.disconnect();
  }, [priority]);

  return (
    <div
      id="robot-spline-mount"
      className={className}
      aria-label="Robot 3D interactif"
    >
      {mount ? (
        <Suspense
          fallback={
            <div className="flex h-full w-full items-center justify-center bg-transparent">
              <svg
                className="mr-3 h-5 w-5 animate-spin text-white/70 dark:text-white"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.37 0 0 5.37 0 12h4z"
                />
              </svg>
            </div>
          }
        >
          <Spline scene={scene} className="h-full w-full" />
        </Suspense>
      ) : null}
    </div>
  );
}
