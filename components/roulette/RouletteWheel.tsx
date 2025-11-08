// components/roulette/RouletteWheel.tsx
'use client';

import { useEffect, useMemo, useRef } from 'react';
import { motion } from 'framer-motion';

type Weight = { seg: number; label: string; pct: number };

// Couleurs pour chaque segment (alternance de teintes primary)
const SEGMENT_COLORS = [
  'hsl(var(--primary) / 0.95)', // seg 1 - Jackpot
  'hsl(var(--primary) / 0.75)', // seg 2
  'hsl(var(--primary) / 0.55)', // seg 3
  'hsl(var(--primary) / 0.35)', // seg 4
  'hsl(var(--primary) / 0.95)', // seg 5
  'hsl(var(--primary) / 0.75)', // seg 6
  'hsl(var(--primary) / 0.55)', // seg 7
  'hsl(var(--primary) / 0.35)', // seg 8
];

export function RouletteWheel({
  weights,
  targetSeg,
  spinning,
}: {
  weights: Weight[];
  targetSeg: number | null;
  spinning: boolean;
}) {
  const wheelRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const segAngles = useMemo(
    () =>
      Array.from({ length: 8 }, (_, i) => ({
        seg: i + 1,
        startAngle: (i * 360) / 8,
        endAngle: ((i + 1) * 360) / 8,
        centerAngle: (i * 360) / 8 + 22.5,
      })),
    []
  );

  // Dessiner la roue sur canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || weights.length === 0) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const size = 400;
    const centerX = size / 2;
    const centerY = size / 2;
    const radius = size / 2;

    canvas.width = size;
    canvas.height = size;

    // Effacer
    ctx.clearRect(0, 0, size, size);

    // Dessiner chaque segment
    segAngles.forEach(({ seg, startAngle, endAngle }) => {
      const w = weights.find((x) => x.seg === seg);
      const label = w?.label ?? `Seg ${seg}`;

      // Convertir en radians
      const startRad = (startAngle - 90) * (Math.PI / 180);
      const endRad = (endAngle - 90) * (Math.PI / 180);

      // Dessiner le segment
      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.arc(centerX, centerY, radius, startRad, endRad);
      ctx.closePath();

      // Remplir avec couleur
      ctx.fillStyle = SEGMENT_COLORS[seg - 1];
      ctx.fill();

      // Bordure blanche fine
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
      ctx.lineWidth = 2;
      ctx.stroke();

      // Texte
      const textAngle = (startAngle + endAngle) / 2;
      const textRad = (textAngle - 90) * (Math.PI / 180);
      const textRadius = radius * 0.7;
      const textX = centerX + Math.cos(textRad) * textRadius;
      const textY = centerY + Math.sin(textRad) * textRadius;

      ctx.save();
      ctx.translate(textX, textY);
      ctx.rotate(textRad + Math.PI / 2);

      ctx.fillStyle = 'white';
      ctx.font = 'bold 16px Inter, sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';

      // Ombre pour lisibilité
      ctx.shadowColor = 'rgba(0, 0, 0, 0.5)';
      ctx.shadowBlur = 4;
      ctx.shadowOffsetX = 0;
      ctx.shadowOffsetY = 2;

      ctx.fillText(label, 0, 0);

      ctx.restore();
    });
  }, [weights, segAngles]);

  // Animation de rotation
  useEffect(() => {
    const wheel = wheelRef.current;
    if (!wheel || !targetSeg) return;

    const index = targetSeg - 1;
    const degPerSeg = 360 / 8;
    // 5 tours complets + position du segment
    const stopDeg = 360 * 5 + index * degPerSeg + degPerSeg / 2;

    wheel.style.transition = 'none';
    wheel.style.transform = `rotate(0deg)`;

    requestAnimationFrame(() => {
      wheel.style.transition = 'transform 4s cubic-bezier(0.25, 0.1, 0.25, 1)';
      wheel.style.transform = `rotate(${stopDeg}deg)`;
    });
  }, [targetSeg]);

  return (
    <div className="relative flex items-center justify-center">
      {/* Aiguille fixe */}
      <div className="absolute -top-12 left-1/2 -translate-x-1/2 z-30">
        <motion.div
          animate={{
            y: spinning ? [0, -8, 0] : 0,
          }}
          transition={{
            duration: 0.6,
            repeat: spinning ? Infinity : 0,
            ease: 'easeInOut',
          }}
        >
          <svg width="40" height="48" viewBox="0 0 40 48" fill="none">
            <path
              d="M20 8 L32 28 L20 24 L8 28 Z"
              fill="white"
              stroke="hsl(var(--primary))"
              strokeWidth="3"
              filter="drop-shadow(0 4px 12px rgba(0, 0, 0, 0.3))"
            />
          </svg>
        </motion.div>
      </div>

      {/* Glow animé */}
      <motion.div
        className="absolute inset-0 rounded-full blur-3xl opacity-20 pointer-events-none"
        style={{ background: 'hsl(var(--primary))' }}
        animate={{
          scale: spinning ? [1, 1.2, 1] : 1,
          opacity: spinning ? [0.2, 0.4, 0.2] : 0.2,
        }}
        transition={{ duration: 2, repeat: spinning ? Infinity : 0 }}
      />

      {/* Roue */}
      <div className="relative">
        <div
          ref={wheelRef}
          className="relative w-[400px] h-[400px] max-w-[85vw] max-h-[85vw] rounded-full"
          style={{
            boxShadow: '0 30px 90px -20px rgba(0, 0, 0, 0.3)',
          }}
        >
          {/* Canvas pour dessiner les segments */}
          <canvas ref={canvasRef} className="w-full h-full rounded-full" />

          {/* Centre avec logo */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <motion.div
              className="w-32 h-32 rounded-full flex items-center justify-center"
              style={{
                background:
                  'linear-gradient(135deg, rgba(255, 255, 255, 0.98) 0%, rgba(255, 255, 255, 0.95) 100%)',
                boxShadow:
                  '0 8px 32px rgba(0, 0, 0, 0.15), inset 0 2px 10px rgba(0, 0, 0, 0.05)',
              }}
              animate={{
                boxShadow: spinning
                  ? [
                      '0 8px 32px rgba(0, 0, 0, 0.15), inset 0 2px 10px rgba(0, 0, 0, 0.05)',
                      '0 12px 40px rgba(0, 0, 0, 0.25), inset 0 4px 16px rgba(0, 0, 0, 0.08)',
                      '0 8px 32px rgba(0, 0, 0, 0.15), inset 0 2px 10px rgba(0, 0, 0, 0.05)',
                    ]
                  : '0 8px 32px rgba(0, 0, 0, 0.15), inset 0 2px 10px rgba(0, 0, 0, 0.05)',
              }}
              transition={{ duration: 1.5, repeat: spinning ? Infinity : 0 }}
            >
              {/* Dark overlay for dark mode */}
              <div className="absolute inset-0 rounded-full bg-neutral-900 opacity-0 dark:opacity-90 transition-opacity" />

              <motion.div
                className="relative text-5xl font-black text-primary"
                animate={{
                  scale: spinning ? [1, 1.05, 1] : 1,
                }}
                transition={{
                  duration: 0.8,
                  repeat: spinning ? Infinity : 0,
                  ease: 'easeInOut',
                }}
              >
                IK
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Bordure décorative */}
        <div
          className="absolute inset-0 rounded-full pointer-events-none"
          style={{
            boxShadow: 'inset 0 0 0 8px rgba(255, 255, 255, 0.1)',
          }}
        />
      </div>

      {/* Particules pendant rotation */}
      {spinning && (
        <div className="absolute inset-0 pointer-events-none">
          {Array.from({ length: 24 }).map((_, i) => {
            const angle = (i * 360) / 24;
            const delay = (i * 0.8) / 24;

            return (
              <motion.div
                key={i}
                className="absolute top-1/2 left-1/2"
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: '50%',
                  background: `hsl(var(--primary) / ${0.8 - (i % 3) * 0.2})`,
                }}
                initial={{
                  x: 0,
                  y: 0,
                  opacity: 0,
                  scale: 0,
                }}
                animate={{
                  x: Math.cos((angle * Math.PI) / 180) * 240,
                  y: Math.sin((angle * Math.PI) / 180) * 240,
                  opacity: [0, 1, 0],
                  scale: [0, 1.5, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay,
                  ease: [0.22, 1, 0.36, 1],
                }}
              />
            );
          })}
        </div>
      )}

      {/* Ring tournant pendant rotation */}
      {spinning && (
        <motion.div
          className="absolute inset-0 rounded-full pointer-events-none"
          style={{
            border: '3px solid hsl(var(--primary) / 0.3)',
          }}
          animate={{
            rotate: 360,
            scale: [1, 1.05, 1],
          }}
          transition={{
            rotate: { duration: 3, repeat: Infinity, ease: 'linear' },
            scale: { duration: 1.5, repeat: Infinity, ease: 'easeInOut' },
          }}
        />
      )}
    </div>
  );
}
