'use client';
import { useEffect, useRef, useState } from 'react';
import { supabase } from '@/lib/SupabaseClient';

type Counts = {
  total: number;
  perProject: Record<string, number>;
  threadId: string | null;
};

export function useUnread({
  enabled = true,
  pause = false,
}: { enabled?: boolean; pause?: boolean } = {}) {
  const [data, setData] = useState<Counts>({
    total: 0,
    perProject: {},
    threadId: null,
  });
  const chanRef = useRef<ReturnType<typeof supabase.channel> | null>(null);

  // initial fetch
  useEffect(() => {
    if (!enabled) return;
    let stop = false;
    (async () => {
      const r = await fetch('/api/unread', { cache: 'no-store' });
      const j = await r.json();
      if (!stop) setData(j);
    })();
    return () => {
      stop = true;
    };
  }, [enabled]);

  // realtime: bump on INSERT (when not on /messages page)
  useEffect(() => {
    if (!enabled || !data.threadId) return;
    const ch = supabase.channel(`unread:${data.threadId}`).on(
      'postgres_changes',
      {
        event: 'INSERT',
        schema: 'public',
        table: 'messages',
        filter: `thread_id=eq.${data.threadId}`,
      },
      (payload) => {
        if (pause) return; // we're on the thread page: do not bump
        const pj = payload.new.project_id ?? '__ALL__';
        setData((prev) => ({
          ...prev,
          total: (prev.total ?? 0) + 1,
          perProject: {
            ...prev.perProject,
            [pj]: (prev.perProject[pj] ?? 0) + 1,
          },
        }));
      }
    );
    chanRef.current = ch;
    ch.subscribe();
    return () => {
      try {
        supabase.removeChannel(ch);
      } catch {}
    };
  }, [enabled, data.threadId, pause]);

  // helper to reset after we mark read server-side
  const refetch = async () => {
    const r = await fetch('/api/unread', { cache: 'no-store' });
    const j = await r.json();
    setData(j);
  };

  return { ...data, refetch };
}
