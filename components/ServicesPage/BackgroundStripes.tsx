// components/ui/BackgroundStripes.tsx
'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function BackgroundStripes() {
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
      className="absolute inset-0 z-0 flex"
    >
        <div className='absolute top-0 left-0 bg-gradient-to-b from-white dark:from-black to-transparent w-full h-64'/>
        <div className='absolute bottom-0 left-0 bg-gradient-to-t from-white dark:from-black to-transparent w-full h-96'/>
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
      className="absolute inset-0 h-full w-full scale-[1.2] opacity-[0.06] [mask-image:radial-gradient(#fff,transparent,75%)] dark:opacity-[0.08]"
      style={{ backgroundImage: 'url(/noise.webp)', backgroundSize: '20%' }}
    />
  );
}
