// components/ServicesPage/servicesComponents/Background.tsx
'use client';

import { useEffect, useState } from 'react';
import { motion } from 'motion/react';

export function Background() {
  const [strips, setStrips] = useState<number[]>([]);

  useEffect(() => {
    const calc = () => {
      const stripW = 80;
      const n = Math.ceil(window.innerWidth / stripW);
      setStrips(Array.from({ length: n }, (_, i) => i));
    };
    calc();
    window.addEventListener('resize', calc);
    return () => window.removeEventListener('resize', calc);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="absolute inset-0 z-0 flex [mask-image:radial-gradient(circle_at_center,white_0%,white_32%,transparent_70%)]"
    >
      <Noise />
      {strips.map((i) => (
        <div
          key={i}
          className="h-full w-20 bg-gradient-to-r from-slate-100 to-white dark:from-neutral-900 dark:to-neutral-950"
        />
      ))}
    </motion.div>
  );
}

function Noise() {
  return (
    <div
      className="absolute inset-0 h-full w-full scale-[1.2] opacity-[0.05] [mask-image:radial-gradient(#fff,transparent,75%)] dark:opacity-[0.07]"
      style={{ backgroundImage: 'url(/noise.webp)', backgroundSize: '20%' }}
    />
  );
}
