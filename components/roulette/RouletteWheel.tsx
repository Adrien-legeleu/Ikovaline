// file: components/roulette/RouletteWheel.tsx
'use client';
import { useEffect, useMemo, useRef, useState } from 'react';
import { motion } from 'framer-motion';

type Weight = { seg: number; label: string; pct: number };

const SEGMENT_COLORS = [
  'linear-gradient(135deg, rgba(255,255,255,0.96), rgba(255,255,255,0.90))',
  'linear-gradient(135deg, rgba(255,255,255,0.90), rgba(255,255,255,0.86))',
  'linear-gradient(135deg, rgba(255,255,255,0.96), rgba(255,255,255,0.90))',
  'linear-gradient(135deg, rgba(255,255,255,0.90), rgba(255,255,255,0.86))',
  'linear-gradient(135deg, rgba(255,255,255,0.96), rgba(255,255,255,0.90))',
  'linear-gradient(135deg, rgba(255,255,255,0.90), rgba(255,255,255,0.86))',
  'linear-gradient(135deg, rgba(255,255,255,0.96), rgba(255,255,255,0.90))',
  'linear-gradient(135deg, rgba(255,255,255,0.90), rgba(255,255,255,0.86))',
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
  const [finalAngle, setFinalAngle] = useState<number>(0);

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

  // Dessin HiDPI + métal/verre
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || weights.length === 0) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const size = 420;
    const cx = size / 2,
      cy = size / 2,
      r = size / 2;

    canvas.width = size * dpr;
    canvas.height = size * dpr;
    canvas.style.width = `${size}px`;
    canvas.style.height = `${size}px`;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    ctx.clearRect(0, 0, size, size);

    // Anneau métal brossé
    const grad = ctx.createLinearGradient(0, 0, size, size);
    grad.addColorStop(0, 'rgba(200,200,200,0.5)');
    grad.addColorStop(0.5, 'rgba(255,255,255,0.7)');
    grad.addColorStop(1, 'rgba(180,180,180,0.5)');
    ctx.beginPath();
    ctx.arc(cx, cy, r - 2, 0, Math.PI * 2);
    ctx.lineWidth = 10;
    ctx.strokeStyle = grad;
    ctx.stroke();

    // Segments
    segAngles.forEach(({ seg, startAngle, endAngle }) => {
      const start = (startAngle - 90) * (Math.PI / 180);
      const end = (endAngle - 90) * (Math.PI / 180);

      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.arc(cx, cy, r - 12, start, end);
      ctx.closePath();

      // Remplissage verre
      const g = ctx.createRadialGradient(cx, cy, r * 0.2, cx, cy, r);
      g.addColorStop(0, 'rgba(255,255,255,0.95)');
      g.addColorStop(1, 'rgba(255,255,255,0.85)');
      ctx.fillStyle = g;
      ctx.fill();

      // Séparateurs
      ctx.strokeStyle = 'rgba(0,0,0,0.06)';
      ctx.lineWidth = 1.5;
      ctx.stroke();

      // Label
      const label = weights.find((x) => x.seg === seg)?.label ?? `Seg ${seg}`;
      const midRad = (start + end) / 2;
      const tx = cx + Math.cos(midRad) * (r * 0.62);
      const ty = cy + Math.sin(midRad) * (r * 0.62);

      ctx.save();
      ctx.translate(tx, ty);
      ctx.rotate(midRad + Math.PI / 2);
      ctx.font = '600 14px Inter, system-ui, sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillStyle = 'rgba(20,20,20,0.9)';
      ctx.fillText(label, 0, 0);
      ctx.restore();
    });
  }, [weights, segAngles]);

  // Rotation inertielle + micro-bounce final
  useEffect(() => {
    const wheel = wheelRef.current;
    if (!wheel || !targetSeg || !spinning) return;

    const index = targetSeg - 1;
    const degPerSeg = 360 / 8;
    const targetAngle = index * degPerSeg + degPerSeg / 2;
    const base = 360 * 4 - targetAngle; // 4 tours + alignement

    // reset
    wheel.style.transition = 'none';
    wheel.style.transform = `rotate(0deg)`;

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        wheel.style.transition = 'transform 3.8s cubic-bezier(.16,1,.3,1)';
        wheel.style.transform = `rotate(${base}deg)`;
        setFinalAngle(base);
      });
    });

    const onEnd = () => {
      // micro-bounce (verre): -4° puis +4° puis settle
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
            width="42"
            height="52"
            viewBox="0 0 42 52"
            className="drop-shadow-2xl"
          >
            <path
              d="M21 10 L34 30 L21 26 L8 30 Z"
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
            '0 0 0 80px hsl(var(--primary) / 0.05), inset 0 0 60px hsl(var(--primary) / 0.12)',
        }}
        animate={{ opacity: spinning ? [0.12, 0.24, 0.12] : 0 }}
        transition={{ duration: 2.2, repeat: spinning ? Infinity : 0 }}
      />

      {/* Roue */}
      <div className="relative">
        <div
          ref={wheelRef}
          className={`relative w-[420px] h-[420px] max-w-[85vw] max-h-[85vw] rounded-full transition-opacity ${hasWeights ? 'opacity-100' : 'opacity-40'}`}
          style={{
            boxShadow:
              '0 36px 120px -34px rgba(0,0,0,.35), inset 0 2px 12px rgba(0,0,0,.06)',
          }}
          aria-label="Roue Ikovaline"
          role="img"
        >
          <canvas ref={canvasRef} className="w-full h-full rounded-full" />

          {/* Centre verre + logo */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <motion.div
              className="w-36 h-36 rounded-full flex items-center justify-center relative overflow-hidden"
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
