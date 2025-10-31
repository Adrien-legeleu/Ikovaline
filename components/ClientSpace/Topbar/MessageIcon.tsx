// components/ClientSpace/Topbar/MessageIcon.tsx
'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { IconMessageDots } from '@tabler/icons-react';
import { useUnread } from '@/components/ClientSpace/hooks/useUnread';
import { cn } from '@/lib/utils';

export default function MessageIcon() {
  const pathname = usePathname();
  const onInbox = pathname?.startsWith('/messages');
  const { total } = useUnread({ enabled: true, pause: onInbox });

  return (
    <Link
      href="/messages"
      aria-label="Messagerie"
      className={cn(
        'relative inline-flex items-center justify-center rounded-2xl p-2 transition',

        'bg-black/5 hover:bg-black/10 dark:bg-white/10 dark:hover:bg-white/15'
      )}
    >
      {onInbox && (
        <span className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 h-1 w-5 bg-primary rounded-full" />
      )}
      <IconMessageDots className="h-6 w-6" />
      {total > 0 && (
        <span className="absolute -top-1.5 -right-1.5 min-w-[18px] h-[18px] px-1 rounded-full text-[10px] leading-[18px] text-white bg-primary text-center shadow-lg">
          {total > 99 ? '99+' : total}
        </span>
      )}
    </Link>
  );
}
