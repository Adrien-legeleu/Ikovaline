'use client';

import { cn } from '@/lib/utils';

export type BubbleSide = 'left' | 'right';

export default function ChatBubble({
  side,
  name,
  children,
  meta,
}: {
  side: BubbleSide;
  name?: string | null;
  children: React.ReactNode;
  meta?: React.ReactNode; // date, tag projet, etc.
}) {
  const isRight = side === 'right';

  return (
    <div className={cn('mb-3 flex', isRight ? 'justify-end' : 'justify-start')}>
      <div className="max-w-[84%]">
        {name && (
          <div
            className={cn(
              'mb-1 text-[11px] opacity-70 px-1',
              isRight ? 'text-right' : 'text-left'
            )}
          >
            {name}
          </div>
        )}
        <div
          className={cn(
            'relative rounded-3xl px-3 py-2 shadow-[0_8px_30px_rgba(0,0,0,0.06)]',
            isRight
              ? 'bg-gradient-to-tr from-primary to-blue-500 text-white'
              : 'bg-white/80 dark:bg-neutral-800/70 backdrop-blur-xl'
          )}
        >
          {children}
          {meta && (
            <div
              className={cn(
                'text-[10px] opacity-80 mt-1 flex items-center gap-2',
                isRight ? 'text-white/85' : 'text-muted-foreground'
              )}
            >
              {meta}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
