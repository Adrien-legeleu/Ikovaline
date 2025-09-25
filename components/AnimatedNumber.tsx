'use client';

import { useEffect, useState } from 'react';
import { useMotionValue, useSpring } from 'framer-motion';

export default function AnimatedNumber({
  value,
  decimals = 0,
  format = (n: number) => n.toLocaleString('fr-FR'),
}: {
  value: number;
  decimals?: number;
  format?: (n: number) => string;
}) {
  const mv = useMotionValue(value);
  const spring = useSpring(mv, { stiffness: 220, damping: 26, mass: 0.6 });
  const [disp, setDisp] = useState(value);

  useEffect(() => {
    mv.set(value);
  }, [value]); // eslint-disable-line
  useEffect(() => {
    const u = spring.on('change', (v) => setDisp(v));
    return () => u();
  }, [spring]);

  const rounded = +disp.toFixed(decimals);
  return <span>{format(decimals ? rounded : Math.round(rounded))}</span>;
}
