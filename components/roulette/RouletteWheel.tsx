// file: components/roulette/RouletteWheel.tsx
'use client';

import { useEffect, useMemo, useRef } from 'react';
import { motion } from 'framer-motion';
import { segmentShortLabel } from '@/lib/roulette/segments';

type Weight = { seg: number; label: string; pct: number };

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
        seg: (i + 1) as 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8,
        startAngle: (i * 360) / 8,
        endAngle: ((i + 1) * 360) / 8,
      })),
    []
  );

  // Dessin HiDPI + alternance primary/blanc + typo large
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || weights.length === 0) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const size = 460;
    const cx = size / 2;
    const cy = size / 2;
    const r = size / 2;

    canvas.width = size * dpr;
    canvas.height = size * dpr;
    canvas.style.width = `${size}px`;
    canvas.style.height = `${size}px`;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    ctx.clearRect(0, 0, size, size);

    // Couleur primary récupérée depuis le CSS (ex: "220 90% 56%") → "hsl(220 90% 56%)"
    const root = getComputedStyle(document.documentElement);
    const primaryParts = root.getPropertyValue('--primary').trim();
    const primaryColor = primaryParts ? `hsl(${primaryParts})` : '#2563eb';

    // Anneau externe (métal brossé)
    const ring = ctx.createLinearGradient(0, 0, size, size);
    ring.addColorStop(0, 'rgba(210,210,210,0.55)');
    ring.addColorStop(0.5, 'rgba(255,255,255,0.85)');
    ring.addColorStop(1, 'rgba(185,185,185,0.55)');
    ctx.beginPath();
    ctx.arc(cx, cy, r - 2, 0, Math.PI * 2);
    ctx.lineWidth = 12;
    ctx.strokeStyle = ring;
    ctx.stroke();

    segAngles.forEach(({ seg, startAngle, endAngle }, i) => {
      const start = (startAngle - 90) * (Math.PI / 180);
      const end = (endAngle - 90) * (Math.PI / 180);

      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.arc(cx, cy, r - 14, start, end);
      ctx.closePath();

      // Alternance : pair = primary, impair = blanc/verre
      if (i % 2 === 0) {
        // segment en primary (simple, pas de var() dans la couleur)
        const g = ctx.createLinearGradient(cx - r, cy - r, cx + r, cy + r);
        g.addColorStop(0, primaryColor);
        g.addColorStop(1, 'rgba(255,255,255,0.12)');
        ctx.fillStyle = g;
      } else {
        const g2 = ctx.createRadialGradient(cx, cy, r * 0.25, cx, cy, r);
        g2.addColorStop(0, 'rgba(255,255,255,0.98)');
        g2.addColorStop(1, 'rgba(245,245,245,0.9)');
        ctx.fillStyle = g2;
      }
      ctx.fill();

      // Séparateurs subtils
      ctx.strokeStyle = 'rgba(0,0,0,0.08)';
      ctx.lineWidth = 1.6;
      ctx.stroke();

      // Label court au centre du segment
      const label = segmentShortLabel(seg);
      const mid = (start + end) / 2;
      const tx = cx + Math.cos(mid) * (r * 0.62);
      const ty = cy + Math.sin(mid) * (r * 0.62);

      ctx.save();
      ctx.translate(tx, ty);
      ctx.rotate(mid + Math.PI / 2);
      ctx.font = '800 18px Inter, system-ui, sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';

      // Couleur du texte : blanc sur primary, sombre sur blanc
      ctx.fillStyle = i % 2 === 0 ? 'white' : 'rgba(22,22,22,0.95)';
      ctx.shadowColor =
        i % 2 === 0 ? 'rgba(0,0,0,0.35)' : 'rgba(255,255,255,0.25)';
      ctx.shadowBlur = 6;
      ctx.shadowOffsetY = 2;
      ctx.fillText(label, 0, 0);
      ctx.restore();
    });
  }, [weights, segAngles]);

  // Rotation inertielle + micro-bounce
  useEffect(() => {
    const wheel = wheelRef.current;
    if (!wheel || !targetSeg || !spinning) return;

    const index = targetSeg - 1;
    const degPerSeg = 360 / 8;
    const targetAngle = index * degPerSeg + degPerSeg / 2;
    const base = 360 * 4 - targetAngle; // 4 tours + alignement

    wheel.style.transition = 'none';
    wheel.style.transform = `rotate(0deg)`;

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        wheel.style.transition = 'transform 3.9s cubic-bezier(.16,1,.3,1)';
        wheel.style.transform = `rotate(${base}deg)`;
      });
    });

    const onEnd = () => {
      wheel.style.transition = 'transform 180ms cubic-bezier(.16,1,.3,1)';
      wheel.style.transform = `rotate(${base - 4}deg)`;
      setTimeout(() => {
        wheel.style.transform = `rotate(${base + 3}deg)`;
        setTimeout(() => {
          wheel.style.transform = `rotate(${base}deg)`;
        }, 110);
      }, 110);
      wheel.removeEventListener('transitionend', onEnd);
    };
    wheel.addEventListener('transitionend', onEnd);

    return () => wheel.removeEventListener('transitionend', onEnd);
  }, [targetSeg, spinning]);

  const hasWeights = weights.length > 0;

  return (
    <div className="relative flex items-center justify-center">
      {/* Aiguille */}
      <div className="absolute -top-12 left-1/2 -translate-x-1/2 z-30">
        <motion.div
          animate={{ y: spinning ? [0, -6, 0] : 0 }}
          transition={{
            duration: 0.6,
            repeat: spinning ? Infinity : 0,
            ease: 'easeInOut',
          }}
        >
          <svg
            width="46"
            height="56"
            viewBox="0 0 46 56"
            className="drop-shadow-2xl"
          >
            <path
              d="M23 10 L38 32 L23 27 L8 32 Z"
              fill="white"
              stroke="hsl(var(--primary))"
              strokeWidth="3"
            />
          </svg>
        </motion.div>
      </div>

      {/* Halo pendant spin */}
      <motion.div
        className="absolute inset-0 rounded-full opacity-0 pointer-events-none"
        style={{
          boxShadow:
            '0 0 0 90px hsl(var(--primary) / 0.05), inset 0 0 60px hsl(var(--primary) / 0.12)',
        }}
        animate={{ opacity: spinning ? [0.12, 0.24, 0.12] : 0 }}
        transition={{ duration: 2.2, repeat: spinning ? Infinity : 0 }}
      />

      {/* Roue */}
      <div className="relative">
        <div
          ref={wheelRef}
          className={`relative w-[460px] h-[460px] max-w-[90vw] max-h-[90vw] rounded-full transition-opacity ${
            hasWeights ? 'opacity-100' : 'opacity-40'
          }`}
          style={{
            boxShadow:
              '0 38px 120px -36px rgba(0,0,0,.35), inset 0 2px 12px rgba(0,0,0,.06)',
          }}
          aria-label="Roue Ikovaline"
          role="img"
        >
          <canvas ref={canvasRef} className="w-full h-full rounded-full" />
          {/* Centre verre + logo */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <motion.div
              className="w-40 h-40 rounded-full flex items-center justify-center relative overflow-hidden"
              style={{
                background:
                  'linear-gradient(135deg, rgba(255,255,255,0.98), rgba(255,255,255,0.95))',
                boxShadow:
                  '0 8px 32px rgba(0,0,0,.18), inset 0 2px 10px rgba(0,0,0,.06)',
              }}
              animate={{ scale: spinning ? [1, 1.02, 1] : 1 }}
              transition={{
                duration: 1.2,
                repeat: spinning ? Infinity : 0,
                ease: 'easeInOut',
              }}
            >
              <div className="absolute inset-0 rounded-full bg-neutral-900 opacity-0 dark:opacity-90 transition-opacity" />
              <div className="relative text-5xl font-black text-primary select-none">
                IK
              </div>
            </motion.div>
          </div>
        </div>

        {/* Liseré verre */}
        <div
          className="absolute inset-0 rounded-full pointer-events-none"
          style={{ boxShadow: 'inset 0 0 0 8px rgba(255,255,255,.08)' }}
        />
      </div>
    </div>
  );
}
