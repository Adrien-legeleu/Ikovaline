/**
 * RouletteWheel - Composant de la roulette avec animation
 *
 * Convention d'angle :
 * - 0° = haut (12h)
 * - Rotation sens horaire
 * - La flèche est fixe en haut
 * - On fait tourner la roue, pas la flèche
 *
 * La roue affiche les segments selon leurs pourcentages
 * L'animation applique une rotation finale calculée par le backend
 */

'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import type { RouletteSegment } from '@/lib/roulette/types';

interface RouletteWheelProps {
  segments: RouletteSegment[];
  finalRotation?: number;
  isSpinning: boolean;
  onSpinComplete?: () => void;
}

export function RouletteWheel({
  segments,
  finalRotation,
  isSpinning,
  onSpinComplete,
}: RouletteWheelProps) {
  const wheelRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [currentRotation, setCurrentRotation] = useState(0);

  // Dessiner la roue sur le canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || segments.length === 0) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const size = 400;
    const cx = size / 2;
    const cy = size / 2;
    const radius = size / 2 - 20;

    // Configuration du canvas pour HiDPI
    canvas.width = size * dpr;
    canvas.height = size * dpr;
    canvas.style.width = `${size}px`;
    canvas.style.height = `${size}px`;
    ctx.scale(dpr, dpr);

    // Effacer le canvas
    ctx.clearRect(0, 0, size, size);

    // Dessiner chaque segment
    segments.forEach((segment) => {
      // Convertir les angles (notre convention : 0° = haut)
      // Canvas utilise 0° = droite, donc on soustrait 90°
      const startRad = ((segment.start_angle - 90) * Math.PI) / 180;
      const endRad = ((segment.end_angle - 90) * Math.PI) / 180;

      // Dessiner le segment
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.arc(cx, cy, radius, startRad, endRad);
      ctx.closePath();

      // Couleur de fond
      ctx.fillStyle = segment.color;
      ctx.fill();

      // Bordure
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
      ctx.lineWidth = 2;
      ctx.stroke();

      // Texte du segment
      const midAngle = (segment.start_angle + segment.end_angle) / 2;
      const midRad = ((midAngle - 90) * Math.PI) / 180;
      const textRadius = radius * 0.7;
      const textX = cx + Math.cos(midRad) * textRadius;
      const textY = cy + Math.sin(midRad) * textRadius;

      ctx.save();
      ctx.translate(textX, textY);
      ctx.rotate(midRad + Math.PI / 2);

      // Icône
      if (segment.icon) {
        ctx.font = '24px system-ui';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(segment.icon, 0, -15);
      }

      // Label
      ctx.font = 'bold 14px system-ui';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillStyle = segment.text_color;
      ctx.fillText(segment.label, 0, 5);

      // Valeur
      ctx.font = '12px system-ui';
      ctx.fillText(segment.value, 0, 20);

      ctx.restore();
    });

    // Cercle central
    ctx.beginPath();
    ctx.arc(cx, cy, 60, 0, Math.PI * 2);
    ctx.fillStyle = 'white';
    ctx.fill();
    ctx.strokeStyle = 'rgba(0, 0, 0, 0.1)';
    ctx.lineWidth = 2;
    ctx.stroke();

    // Logo au centre
    ctx.font = 'bold 20px system-ui';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = '#3B82F6'; // blue-600
    ctx.fillText('IK', cx, cy);

  }, [segments]);

  // Animation de rotation
  useEffect(() => {
    if (!isSpinning || finalRotation === undefined || !wheelRef.current) return;

    const wheel = wheelRef.current;

    // Reset
    wheel.style.transition = 'none';
    wheel.style.transform = `rotate(${currentRotation}deg)`;

    // Forcer un reflow pour s'assurer que le reset est appliqué
    void wheel.offsetHeight;

    // Démarrer l'animation
    requestAnimationFrame(() => {
      wheel.style.transition = 'transform 4s cubic-bezier(0.25, 0.1, 0.25, 1)';
      wheel.style.transform = `rotate(${finalRotation}deg)`;
      setCurrentRotation(finalRotation);
    });

    // Callback quand l'animation est terminée
    const handleTransitionEnd = () => {
      // Petit bounce pour plus de dynamisme
      wheel.style.transition = 'transform 0.2s ease-out';
      wheel.style.transform = `rotate(${finalRotation - 5}deg)`;

      setTimeout(() => {
        wheel.style.transition = 'transform 0.3s ease-out';
        wheel.style.transform = `rotate(${finalRotation}deg)`;

        setTimeout(() => {
          onSpinComplete?.();
        }, 300);
      }, 200);
    };

    wheel.addEventListener('transitionend', handleTransitionEnd, { once: true });

    return () => {
      wheel.removeEventListener('transitionend', handleTransitionEnd);
    };
  }, [isSpinning, finalRotation, currentRotation, onSpinComplete]);

  return (
    <div className="relative flex items-center justify-center">
      {/* Flèche (fixe en haut) */}
      <div className="absolute -top-8 left-1/2 -translate-x-1/2 z-20">
        <motion.div
          animate={{
            y: isSpinning ? [0, -8, 0] : 0,
          }}
          transition={{
            duration: 0.5,
            repeat: isSpinning ? Infinity : 0,
            ease: 'easeInOut',
          }}
        >
          <svg width="40" height="50" viewBox="0 0 40 50" className="drop-shadow-lg">
            <defs>
              <linearGradient id="arrowGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#EF4444" />
                <stop offset="100%" stopColor="#DC2626" />
              </linearGradient>
            </defs>
            <path
              d="M 20 5 L 35 25 L 20 20 L 5 25 Z"
              fill="url(#arrowGradient)"
              stroke="white"
              strokeWidth="2"
            />
          </svg>
        </motion.div>
      </div>

      {/* Glow effect pendant le spin */}
      {isSpinning && (
        <motion.div
          className="absolute inset-0 rounded-full blur-2xl"
          style={{
            background: 'radial-gradient(circle, rgba(59, 130, 246, 0.3) 0%, transparent 70%)',
          }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.5, 0.8, 0.5],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      )}

      {/* Roue */}
      <div className="relative">
        <div
          ref={wheelRef}
          className="relative w-[400px] h-[400px] rounded-full shadow-2xl"
          style={{
            boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3), inset 0 0 30px rgba(255, 255, 255, 0.1)',
          }}
        >
          <canvas
            ref={canvasRef}
            className="w-full h-full rounded-full"
          />
        </div>

        {/* Bordure décorative */}
        <div
          className="absolute inset-0 rounded-full pointer-events-none"
          style={{
            boxShadow: 'inset 0 0 0 8px rgba(255, 255, 255, 0.2)',
          }}
        />
      </div>

      {/* Message si pas de segments */}
      {segments.length === 0 && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center p-6 bg-white/90 rounded-xl shadow-lg">
            <p className="text-sm text-neutral-600">
              Configurez vos points pour voir la roulette
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
