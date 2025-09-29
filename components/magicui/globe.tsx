'use client';

import createGlobe, { COBEOptions } from 'cobe';
import { useMotionValue, useSpring } from 'motion/react';
import { useEffect, useMemo, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

const MOVEMENT_DAMPING = 1400;

/* Bleu primaire (marqueurs) */
const PRIMARY_COLOR: [number, number, number] = [0 / 255, 174 / 255, 255 / 255];

const DEFAULT_CONFIG: COBEOptions = {
  width: 800,
  height: 800,
  onRender: () => {},
  devicePixelRatio: 2,
  phi: 0,
  theta: 0.3,
  dark: 0,
  diffuse: 0.4,
  mapSamples: 16000,
  mapBrightness: 1.2,
  baseColor: [1, 1, 1],
  markerColor: PRIMARY_COLOR,
  glowColor: [1, 1, 1],
  markers: [
    { location: [48.8566, 2.3522], size: 0.12 }, // Paris
    { location: [51.5074, -0.1278], size: 0.1 }, // Londres
    { location: [25.276987, 55.296249], size: 0.1 }, // Dubaï
    { location: [-4.4419, 15.2663], size: 0.1 }, // Kinshasa
    { location: [46.9481, 7.4474], size: 0.08 }, // Berne
    { location: [45.5019, -73.5674], size: 0.1 }, // Montréal
    { location: [35.6762, 139.6503], size: 0.12 },
    { location: [1.3521, 103.8198], size: 0.11 }, // Singapour
  ],
};

/** Détecte le thème via la classe `dark` sur <html> */
function useIsDark() {
  const [isDark, setIsDark] = useState<boolean>(false);
  useEffect(() => {
    const root = document.documentElement;
    const update = () => setIsDark(root.classList.contains('dark'));
    update();
    const mo = new MutationObserver(update);
    mo.observe(root, { attributes: true, attributeFilter: ['class'] });
    return () => mo.disconnect();
  }, []);
  return isDark;
}

export function Globe({
  className,
  config = DEFAULT_CONFIG,
}: {
  className?: string;
  config?: COBEOptions;
}) {
  const isDark = useIsDark();

  // Options finales, dérivées du thème
  const themedOptions = useMemo<COBEOptions>(() => {
    if (isDark) {
      return {
        ...config,
        // globe vraiment sombre en dark
        dark: 1,
        mapBrightness: 1.9,
        diffuse: 0.35,
        baseColor: [0.3, 0.3, 0.3], // gris quasi noir
        glowColor: [0.1, 0.1, 0.12], // glow discret sombre
        markerColor: config.markerColor ?? PRIMARY_COLOR,
      };
    }
    // light: blanc pur
    return {
      ...config,
      dark: 0,
      mapBrightness: 1.9,
      diffuse: 0.4,
      baseColor: [1, 1, 1],
      glowColor: [1, 1, 1],
      markerColor: config.markerColor ?? PRIMARY_COLOR,
    };
  }, [isDark, config]);

  let phi = 0;
  let width = 0;
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pointerInteracting = useRef<number | null>(null);
  const pointerInteractionMovement = useRef(0);

  const r = useMotionValue(0);
  const rs = useSpring(r, { mass: 1, damping: 30, stiffness: 100 });

  const updatePointerInteraction = (value: number | null) => {
    pointerInteracting.current = value;
    if (canvasRef.current) {
      canvasRef.current.style.cursor = value !== null ? 'grabbing' : 'grab';
    }
  };

  const updateMovement = (clientX: number) => {
    if (pointerInteracting.current !== null) {
      const delta = clientX - pointerInteracting.current;
      pointerInteractionMovement.current = delta;
      r.set(r.get() + delta / MOVEMENT_DAMPING);
    }
  };

  useEffect(() => {
    const onResize = () => {
      if (canvasRef.current) width = canvasRef.current.offsetWidth;
    };
    window.addEventListener('resize', onResize);
    onResize();

    const globe = createGlobe(canvasRef.current!, {
      ...themedOptions,
      width: width * 2,
      height: width * 2,
      onRender: (state) => {
        if (!pointerInteracting.current) phi += 0.005;
        state.phi = phi + rs.get();
        state.width = width * 2;
        state.height = width * 2;
      },
    });

    // fade-in
    requestAnimationFrame(() => {
      if (canvasRef.current) canvasRef.current.style.opacity = '1';
    });

    return () => {
      globe.destroy();
      window.removeEventListener('resize', onResize);
    };
  }, [rs, themedOptions]); // ← recrée le globe si le thème change

  return (
    <div
      className={cn(
        'absolute inset-0 mx-auto aspect-[1/1] w-full max-w-[600px]',
        className
      )}
    >
      {/* Masque de fondu bas : blanc en light, noir en dark */}
      <div className="" />

      <canvas
        ref={canvasRef}
        className="size-full opacity-0 transition-opacity duration-500 [contain:layout_paint_size]"
        onPointerDown={(e) => {
          pointerInteracting.current = e.clientX;
          updatePointerInteraction(e.clientX);
        }}
        onPointerUp={() => updatePointerInteraction(null)}
        onPointerOut={() => updatePointerInteraction(null)}
        onMouseMove={(e) => updateMovement(e.clientX)}
        onTouchMove={(e) =>
          e.touches[0] && updateMovement(e.touches[0].clientX)
        }
      />
    </div>
  );
}
