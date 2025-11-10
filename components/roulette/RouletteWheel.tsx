// file: components/roulette/RouletteWheel.tsx
'use client';
import { useEffect, useMemo, useRef, useState } from 'react';
import { motion } from 'framer-motion';

type Weight = { seg: number; label: string; pct: number };

/**
 * Couleurs par type de segment (design premium clair)
 * - Jackpot : doré / premium
 * - Gros bons d'achat : vert
 * - Réductions : bleu
 * - Petit -5% : gris/bleu doux
 */
const getSegmentColor = (seg: number): string => {
  switch (seg) {
    case 1: // Jackpot 50%
      return 'linear-gradient(135deg, rgba(255, 223, 130, 0.95), rgba(255, 193, 70, 0.90))'; // Doré
    case 2: // -20%
      return 'linear-gradient(135deg, rgba(147, 197, 253, 0.92), rgba(96, 165, 250, 0.88))'; // Bleu clair
    case 3: // -10%
      return 'linear-gradient(135deg, rgba(191, 219, 254, 0.90), rgba(147, 197, 253, 0.85))'; // Bleu très clair
    case 4: // -150€
      return 'linear-gradient(135deg, rgba(134, 239, 172, 0.95), rgba(74, 222, 128, 0.90))'; // Vert clair
    case 5: // -100€
      return 'linear-gradient(135deg, rgba(167, 243, 208, 0.92), rgba(110, 231, 183, 0.88))'; // Vert menthe
    case 6: // -75€
      return 'linear-gradient(135deg, rgba(196, 245, 217, 0.90), rgba(134, 239, 172, 0.85))'; // Vert pâle
    case 7: // -50€
      return 'linear-gradient(135deg, rgba(209, 250, 229, 0.90), rgba(167, 243, 208, 0.85))'; // Vert très pâle
    case 8: // -5%
      return 'linear-gradient(135deg, rgba(226, 232, 240, 0.90), rgba(203, 213, 225, 0.85))'; // Gris-bleu doux
    default:
      return 'linear-gradient(135deg, rgba(255,255,255,0.95), rgba(255,255,255,0.90))';
  }
};

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

  /**
   * Calcul des angles PROPORTIONNELS aux probabilités
   * ⚠️ FILTRE les segments avec pct <= 0 (ne doivent PAS apparaître sur la roue)
   */
  const segAngles = useMemo(() => {
    // Filtrer les segments actifs (pct > 0)
    const activeWeights = weights.filter((w) => w.pct > 0);

    if (activeWeights.length === 0) {
      // Cas d'erreur : aucun segment actif → afficher 8 segments égaux
      return Array.from({ length: 8 }, (_, i) => ({
        seg: i + 1,
        startAngle: (i * 360) / 8,
        endAngle: ((i + 1) * 360) / 8,
        centerAngle: (i * 360) / 8 + 22.5,
        pct: 12.5,
      }));
    }

    // Calcul des angles proportionnels
    let currentAngle = 0;
    const totalPct = activeWeights.reduce((sum, w) => sum + w.pct, 0);

    return activeWeights.map((w) => {
      const angleSize = (w.pct / totalPct) * 360;
      const result = {
        seg: w.seg,
        startAngle: currentAngle,
        endAngle: currentAngle + angleSize,
        centerAngle: currentAngle + angleSize / 2,
        pct: w.pct,
      };
      currentAngle += angleSize;
      return result;
    });
  }, [weights]);

  // Dessin HiDPI avec couleurs différenciées et segments proportionnels
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || segAngles.length === 0) return;
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

    // Anneau métal brossé (bordure extérieure)
    const grad = ctx.createLinearGradient(0, 0, size, size);
    grad.addColorStop(0, 'rgba(200,200,200,0.5)');
    grad.addColorStop(0.5, 'rgba(255,255,255,0.7)');
    grad.addColorStop(1, 'rgba(180,180,180,0.5)');
    ctx.beginPath();
    ctx.arc(cx, cy, r - 2, 0, Math.PI * 2);
    ctx.lineWidth = 10;
    ctx.strokeStyle = grad;
    ctx.stroke();

    // Dessiner chaque segment PROPORTIONNELLEMENT
    segAngles.forEach(({ seg, startAngle, endAngle }) => {
      const start = (startAngle - 90) * (Math.PI / 180);
      const end = (endAngle - 90) * (Math.PI / 180);

      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.arc(cx, cy, r - 12, start, end);
      ctx.closePath();

      // Couleur différenciée par type de segment
      const colorGradient = getSegmentColor(seg);
      // Parser le gradient pour créer un radial gradient
      // Pour simplifier, on utilise des couleurs solides basées sur le segment
      const colors = extractColorsFromGradient(colorGradient);
      const g = ctx.createRadialGradient(cx, cy, r * 0.2, cx, cy, r);
      g.addColorStop(0, colors[0]);
      g.addColorStop(1, colors[1]);
      ctx.fillStyle = g;
      ctx.fill();

      // Séparateurs (bordures entre segments)
      ctx.strokeStyle = 'rgba(0,0,0,0.12)';
      ctx.lineWidth = 2;
      ctx.stroke();

      // Label
      const label = weights.find((x) => x.seg === seg)?.label ?? `Seg ${seg}`;
      const midRad = (start + end) / 2;
      const tx = cx + Math.cos(midRad) * (r * 0.62);
      const ty = cy + Math.sin(midRad) * (r * 0.62);

      ctx.save();
      ctx.translate(tx, ty);
      ctx.rotate(midRad + Math.PI / 2);

      // Taille de police adaptée à la taille du segment
      const angleDiff = endAngle - startAngle;
      const fontSize = angleDiff > 30 ? 14 : angleDiff > 15 ? 12 : 10;

      ctx.font = `600 ${fontSize}px Inter, system-ui, sans-serif`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillStyle = 'rgba(20,20,20,0.95)';
      ctx.fillText(label, 0, 0);
      ctx.restore();
    });
  }, [weights, segAngles]);

  /**
   * Extrait les couleurs d'un gradient linear-gradient CSS
   */
  function extractColorsFromGradient(gradient: string): [string, string] {
    const match = gradient.match(/rgba?\([^)]+\)/g);
    if (match && match.length >= 2) {
      return [match[0], match[1]];
    }
    return ['rgba(255,255,255,0.95)', 'rgba(255,255,255,0.85)'];
  }

  // Rotation inertielle + micro-bounce final (avec angles PROPORTIONNELS)
  useEffect(() => {
    const wheel = wheelRef.current;
    if (!wheel || !targetSeg || !spinning) return;

    // Trouver le segment cible dans segAngles
    const targetSegment = segAngles.find((s) => s.seg === targetSeg);
    if (!targetSegment) {
      console.warn('Target segment not found:', targetSeg);
      return;
    }

    // Angle cible = milieu du segment (centerAngle)
    const targetAngle = targetSegment.centerAngle;
    const base = 360 * 4 - targetAngle; // 4 tours + alignement au centre du segment

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
  }, [targetSeg, spinning, segAngles]);

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
