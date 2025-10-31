'use client';

import { cubicBezier, motion } from 'framer-motion';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Gauge } from './Dashboard/Gauge'; // ← ton Gauge existant
import { cn } from '@/lib/utils';

const FM_EASE = cubicBezier(0.16, 1, 0.3, 1);

export function ProjectGaugeCard({
  percent = 72,
  phase = 'Réalisation',
  size = 170,
}: {
  percent?: number;
  phase?: string;
  size?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18, filter: 'blur(10px)' }}
      animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      transition={{ duration: 1, ease: FM_EASE }}
      className="mt-6"
    >
      <Card
        className={cn(
          'relative max-w-sm mx-auto p-6 rounded-[2rem] overflow-hidden',
          'bg-gradient-to-b from-zinc-950 via-black to-zinc-900 text-white',
          'border border-white/10 shadow-[0_10px_40px_rgba(0,0,0,0.35)]'
        )}
      >
        {/* halo doux */}
        <div className="absolute inset-0 rounded-[2rem] ring-1 ring-white/10 pointer-events-none" />

        <CardHeader className="p-0 flex flex-col items-center justify-center text-center mb-4">
          <CardTitle className="text-sm font-medium tracking-widest text-white/80 uppercase">
            Avancement du projet
          </CardTitle>
          <p className="text-xs text-white/50 mt-1">Phase actuelle : {phase}</p>
        </CardHeader>

        <CardContent className="p-0 flex items-center justify-center">
          <div className="relative flex flex-col items-center">
            <Gauge
              value={percent}
              size={size}
              strokeWidth={10}
              primary="hsl(var(--primary))"
              secondary="#1f2937"
              gradient
              glowEffect
              showValue
              showPercentage
              label="Complété"
            />
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
