'use client';

import { useRef, useState, useMemo } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import ParallaxProjectItem, { ParallaxProject } from './ParallaxProjectItem';
import type { Project } from '@/data/projects';
import { cn } from '@/lib/utils';

export default function ParallaxProjectsGrid({
  projects,
  className,
  fixedHeight = true,
}: {
  projects: Project[];
  className?: string;
  fixedHeight?: boolean;
}) {
  // on simplifie l’item : titre = juste le nom brand
  const items: ParallaxProject[] = useMemo(
    () =>
      projects.map((p) => ({
        id: p.id,
        titre: p.titre, // ex "Lynelec"
        services: p.services ?? [],
        coverImage: p.coverImage,
        lien: p.lien, // ⬅⬅⬅ IMPORTANT sinon le <a> reçoit undefined et href devient "#"
      })),
    [projects]
  );
  const containerRef = useRef<HTMLDivElement | null>(null);

  // parallax
  const { scrollYProgress } = useScroll(
    fixedHeight
      ? { container: containerRef, offset: ['start start', 'end start'] }
      : undefined
  );

  const yCol1 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const yCol2 = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const yCol3 = useTransform(scrollYProgress, [0, 1], [0, -100]);

  // répartition en 3 colonnes
  const third = Math.ceil(items.length / 3);
  const col1 = items.slice(0, third);
  const col2 = items.slice(third, 2 * third);
  const col3 = items.slice(2 * third);

  // hover global
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const getIsDimmed = (id: string) => hoveredId !== null && hoveredId !== id;

  const getIsActive = (id: string) => hoveredId === id;

  return (
    <div
      ref={containerRef}
      className={cn(
        fixedHeight ? 'h-[44rem] overflow-y-auto' : 'w-full',
        'w-full',
        className
      )}
    >
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 py-16 md:grid-cols-2 md:gap-10 lg:grid-cols-3 ">
        {/* COL 1 */}
        <motion.div style={{ y: yCol1 }} className="grid gap-10">
          {col1.map((p) => (
            <ParallaxProjectItem
              key={p.id}
              project={p}
              isDimmed={getIsDimmed(p.id)}
              isActive={getIsActive(p.id)}
              onHover={() => setHoveredId(p.id)}
              onLeave={() => setHoveredId(null)}
            />
          ))}
        </motion.div>

        {/* COL 2 */}
        <motion.div style={{ y: yCol2 }} className="grid  gap-10">
          {col2.map((p) => (
            <ParallaxProjectItem
              key={p.id}
              project={p}
              isDimmed={getIsDimmed(p.id)}
              isActive={getIsActive(p.id)}
              onHover={() => setHoveredId(p.id)}
              onLeave={() => setHoveredId(null)}
            />
          ))}
        </motion.div>

        {/* COL 3 */}
        <motion.div style={{ y: yCol3 }} className="grid max-md:pt-72 gap-10">
          {col3.map((p) => (
            <ParallaxProjectItem
              key={p.id}
              project={p}
              isDimmed={getIsDimmed(p.id)}
              isActive={getIsActive(p.id)}
              onHover={() => setHoveredId(p.id)}
              onLeave={() => setHoveredId(null)}
            />
          ))}
        </motion.div>
      </div>
    </div>
  );
}
