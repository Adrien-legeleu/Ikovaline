// components/ClientSpace/Chat/ThreadHeader.tsx
'use client';

import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

type ProjectChip = { id: string; title: string };
type UnreadMap = Record<string, number> & { __ALL__?: number };

export default function ThreadHeader({
  projects,
  activeProjectId,
  onFilter,
  unread,
}: {
  projects: ProjectChip[];
  activeProjectId: string | null;
  onFilter: (id: string | null) => void;
  unread?: UnreadMap;
}) {
  const safeProjects = Array.isArray(projects) ? projects : [];

  return (
    <div className="flex flex-wrap   h-full gap-2">
      <Chip
        label="Tous"
        active={activeProjectId === null}
        onClick={() => onFilter(null)}
        badge={unread?.__ALL__}
      />
      {safeProjects.map((p) => (
        <Chip
          key={p.id}
          label={p.title || 'Projet'}
          active={activeProjectId === p.id}
          onClick={() => onFilter(p.id)}
          badge={unread?.[p.id]}
        />
      ))}
    </div>
  );
}

function Chip({
  label,
  active,
  onClick,
  badge,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
  badge?: number;
}) {
  return (
    <motion.button
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className={cn(
        'relative px-3 py-1.5 rounded-full text-sm truncate max-w-[220px]',
        'backdrop-blur-xl shadow-[0_8px_30px_rgba(0,0,0,0.06)]',
        active
          ? 'bg-gradient-to-r from-primary/20 to-blue-500/20 text-foreground'
          : 'bg-white/55 dark:bg-neutral-800/55 hover:bg-white/70 dark:hover:bg-neutral-800/70'
      )}
      title={label}
    >
      {label}
      {!!badge && (
        <span
          className={cn(
            'absolute -top-2 -right-2 h-5 min-w-[20px] px-1 rounded-full text-[11px] grid place-items-center text-white shadow-lg',
            active ? 'bg-primary' : 'bg-foreground/80'
          )}
        >
          {badge}
        </span>
      )}
    </motion.button>
  );
}
