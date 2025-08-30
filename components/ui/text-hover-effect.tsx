'use client';
import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export const TextHoverEffect = ({
  text,
  duration,
}: {
  text: string;
  duration?: number;
}) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const [cursor, setCursor] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);
  const [maskPosition, setMaskPosition] = useState<{ cx: string; cy: string }>({
    cx: '50%',
    cy: '50%',
  });

  useEffect(() => {
    if (!svgRef.current) return;
    const rect = svgRef.current.getBoundingClientRect();
    const cx = ((cursor.x - rect.left) / rect.width) * 100;
    const cy = ((cursor.y - rect.top) / rect.height) * 100;
    setMaskPosition({ cx: `${cx}%`, cy: `${cy}%` });
  }, [cursor]);

  return (
    <svg
      ref={svgRef}
      width="100%"
      height="100%"
      viewBox="0 0 300 100"
      xmlns="http://www.w3.org/2000/svg"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onMouseMove={(e) => setCursor({ x: e.clientX, y: e.clientY })}
      className="select-none"
    >
      <defs>
        {/* Dégradé bleu clair / lumineux */}
        <linearGradient
          id="lightBlueGradient"
          x1="0%"
          y1="0%"
          x2="100%"
          y2="0%"
        >
          <stop offset="0%" stopColor={hovered ? '#3b82f6' : '#2563eb'} />
          <stop offset="40%" stopColor={hovered ? '#60a5fa' : '#3b82f6'} />
          <stop offset="80%" stopColor={hovered ? '#93c5fd' : '#60a5fa'} />
          <stop offset="100%" stopColor={hovered ? '#bfdbfe' : '#93c5fd'} />
        </linearGradient>

        {/* Masque radial (curseur) */}
        <motion.radialGradient
          id="revealMask"
          gradientUnits="userSpaceOnUse"
          r={hovered ? '26%' : '14%'}
          animate={maskPosition}
          transition={{ duration: duration ?? 0.18, ease: 'easeOut' }}
        >
          <stop offset="0%" stopColor="white" />
          <stop offset="100%" stopColor="black" />
        </motion.radialGradient>
        <mask id="textMask">
          <rect
            x="0"
            y="0"
            width="100%"
            height="100%"
            fill="url(#revealMask)"
          />
        </mask>

        {/* Glow néon bleu clair */}
        <filter id="neon-blue" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="2" result="blur1" />
          <feColorMatrix
            in="blur1"
            type="matrix"
            values="0 0 0 0 0   0 0 0 0 0.6   0 0 0 0 1   0 0 0 1 0"
            result="blueSoft"
          />
          <feGaussianBlur in="SourceGraphic" stdDeviation="5" result="blur2" />
          <feColorMatrix
            in="blur2"
            type="matrix"
            values="0 0 0 0 0   0 0 0 0 0.5   0 0 0 0 0.95   0 0 0 1 0"
            result="blueStrong"
          />
          <feMerge>
            <feMergeNode in="blueSoft" />
            <feMergeNode in="blueStrong" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        {/* Glow interne subtil */}
        <filter id="inner-glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="0.5" result="blur" />
          <feComponentTransfer>
            <feFuncA type="linear" slope="0.85" />
          </feComponentTransfer>
          <feBlend in="SourceGraphic" in2="blur" mode="screen" />
        </filter>
      </defs>

      {/* Contour neutre */}
      <text
        x="50%"
        y="50%"
        textAnchor="middle"
        dominantBaseline="middle"
        strokeWidth="0.3"
        className="font-[helvetica] font-bold fill-transparent text-7xl stroke-neutral-200 dark:stroke-neutral-700"
        style={{ opacity: 0.6 }}
      >
        {text}
      </text>

      {/* Animation trait bleu clair */}
      <motion.text
        x="50%"
        y="50%"
        textAnchor="middle"
        dominantBaseline="middle"
        strokeWidth="0.6"
        stroke="#3b82f6" // bleu clair
        className="font-[helvetica] font-bold fill-transparent text-7xl"
        initial={{
          strokeDasharray: 1000,
          strokeDashoffset: 1000,
          opacity: 0.9,
        }}
        animate={{ strokeDashoffset: 0, opacity: 1 }}
        transition={{ duration: 3, ease: 'easeInOut' }}
        filter="url(#neon-blue)"
      >
        {text}
      </motion.text>

      {/* Texte bleu clair révélé par le masque */}
      <text
        x="50%"
        y="50%"
        textAnchor="middle"
        dominantBaseline="middle"
        stroke="url(#lightBlueGradient)"
        strokeWidth="0.8"
        mask="url(#textMask)"
        className="font-[helvetica] font-bold fill-transparent text-7xl"
        filter="url(#inner-glow)"
        style={{ opacity: hovered ? 1 : 0.9 }}
      >
        {text}
      </text>
    </svg>
  );
};
