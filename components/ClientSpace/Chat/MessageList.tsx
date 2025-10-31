'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { subscribeMessages, RTMessage, onLocalInsert } from '@/lib/realtime';
import Attachment from './Attachment';
import { showLocalNotification } from '@/lib/notifications';
import { supabase } from '@/lib/SupabaseClient';
import ChatBubble from './ChatBubble';

type Msg = RTMessage;
type Role = 'admin' | 'dev' | 'user';
type Mode = 'dev' | 'client';

type ProfileLite = { id: string; full_name: string | null; role: Role };

// petit helper type guard
function notNull<T>(v: T | null | undefined): v is T {
  return v != null;
}

export default function MessageList({
  mode,
  threadId,
  initial,
  projectId,
  currentUserId,
  onArriveOutsideFilter,
  onSeen,
}: {
  mode: Mode;
  threadId: string | null;
  initial: Msg[];
  projectId: string | null;
  currentUserId: string;
  onArriveOutsideFilter?: (m: Msg) => void;
  onSeen?: () => void;
}) {
  const [items, setItems] = useState<Msg[]>(initial);
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(initial.length >= 30);
  const [profiles, setProfiles] = useState<Record<string, ProfileLite>>({});
  const [myRole, setMyRole] = useState<Role>('user');

  const scrollRef = useRef<HTMLDivElement | null>(null);
  const bottomRef = useRef<HTMLDivElement | null>(null);

  // Récupère mon rôle
  useEffect(() => {
    (async () => {
      const { data } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', currentUserId)
        .single();
      if (data?.role) setMyRole(data.role as Role);
    })();
  }, [currentUserId]);

  // Charge profils manquants (nom + rôle)
  async function ensureProfiles(idsRaw: Array<string | null | undefined>) {
    const ids = idsRaw.filter(notNull);
    const missing = ids.filter((id) => !profiles[id]);
    if (!missing.length) return;
    const { data } = await supabase
      .from('profiles')
      .select('id, full_name, role')
      .in('id', missing);
    const map: Record<string, ProfileLite> = {};
    for (const p of data || []) {
      map[p.id] = {
        id: p.id,
        full_name: p.full_name ?? null,
        role: (p.role as Role) ?? 'user',
      };
    }
    setProfiles((prev) => ({ ...prev, ...map }));
  }

  // Init profils
  useEffect(() => {
    const ids = Array.from(
      new Set(initial.map((m) => m.sender_id).filter(notNull))
    );
    void ensureProfiles(ids);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Refetch quand filtre projectId/thread change
  useEffect(() => {
    let cancelled = false;
    (async () => {
      const qs = new URLSearchParams({ limit: '30' });
      if (threadId) qs.set('thread_id', threadId);
      if (projectId) qs.set('project_id', projectId);
      const r = await fetch(`/api/messages?${qs.toString()}`);
      const j = await r.json().catch(() => ({ items: [] }));
      if (cancelled) return;
      const fresh: Msg[] = Array.isArray(j.items) ? j.items : [];
      setItems(fresh);
      setHasMore(fresh.length >= 30);
      const ids = Array.from(
        new Set(fresh.map((m) => m.sender_id).filter(notNull))
      );
      void ensureProfiles(ids);
      requestAnimationFrame(() =>
        bottomRef.current?.scrollIntoView({ behavior: 'auto' })
      );
    })();
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [threadId, projectId]);

  // Echo local (envoi instant)
  useEffect(() => {
    const off = onLocalInsert(({ thread_id, row }) => {
      if (threadId && thread_id !== threadId) return;
      if (projectId && row.project_id !== projectId) return;
      setItems((prev) =>
        prev.some((x) => x.id === row.id) ? prev : [row, ...prev]
      );
      void ensureProfiles([row.sender_id]);
      const el = scrollRef.current;
      if (!el) return;
      const nearBottom = el.scrollHeight - el.scrollTop - el.clientHeight < 120;
      if (nearBottom) {
        requestAnimationFrame(() =>
          bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
        );
      }
    });
    return () => off();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [threadId, projectId]);

  // Realtime (INSERT)
  useEffect(() => {
    const unsub = subscribeMessages(
      threadId ?? projectId ?? 'global',
      (row) => {
        const matches =
          (!threadId || row.thread_id === threadId) &&
          (!projectId || row.project_id === projectId);

        if (matches) {
          setItems((prev) =>
            prev.some((x) => x.id === row.id) ? prev : [row, ...prev]
          );
          void ensureProfiles([row.sender_id]);
          const el = scrollRef.current;
          if (el) {
            const nearBottom =
              el.scrollHeight - el.scrollTop - el.clientHeight < 120;
            if (nearBottom) {
              requestAnimationFrame(() =>
                bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
              );
            }
          }
        } else {
          onArriveOutsideFilter?.(row);
        }

        if (document.hidden) {
          showLocalNotification('Nouveau message', {
            body: row.body ?? 'Pièce jointe',
            data: { url: '/messages' },
          });
        }
      }
    );
    return () => {
      try {
        unsub();
      } catch {}
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [threadId, projectId, onArriveOutsideFilter]);

  // Marque comme lu
  useEffect(() => {
    (async () => {
      await fetch('/api/threads/read', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ thread_id: threadId, project_id: projectId }),
      });
      onSeen?.();
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [threadId, projectId]);

  // Load more
  async function loadMore() {
    if (loadingMore || !hasMore) return;
    setLoadingMore(true);
    try {
      const before = items[items.length - 1]?.created_at ?? undefined;
      const qs = new URLSearchParams({ limit: '30' });
      if (threadId) qs.set('thread_id', threadId);
      if (projectId) qs.set('project_id', projectId);
      if (before) qs.set('before', before);
      const r = await fetch(`/api/messages?${qs.toString()}`);
      const j = await r.json().catch(() => ({ items: [] }));
      const more: Msg[] = Array.isArray(j.items) ? j.items : [];
      setItems((prev) => [...prev, ...more]);
      const ids = Array.from(
        new Set(more.map((m) => m.sender_id).filter(notNull))
      );
      void ensureProfiles(ids);
      setHasMore(more.length >= 30);
    } finally {
      setLoadingMore(false);
    }
  }

  const data = useMemo(
    () =>
      [...items].sort(
        (a, b) =>
          new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
      ),
    [items]
  );

  // Alignement
  function sideFor(msg: Msg): 'left' | 'right' {
    const sender = msg.sender_id ? profiles[msg.sender_id] : undefined;
    const senderRole = sender?.role ?? 'user';
    if (mode === 'dev') {
      return senderRole === 'admin' || senderRole === 'dev' ? 'right' : 'left';
    }
    return msg.sender_id === currentUserId ? 'right' : 'left';
  }

  return (
    <div
      ref={scrollRef}
      className="flex relative z-0 flex-col pb-20 rounded-b-[2rem] h-full overflow-y-auto px-3 pt-2"
      style={{ scrollbarWidth: 'thin' }}
    >
      <div className="flex justify-center py-2 pt-12">
        {hasMore ? (
          <button
            onClick={loadMore}
            className="text-xs underline text-muted-foreground hover:text-foreground/80"
          >
            {loadingMore ? 'Chargement…' : 'Charger plus'}
          </button>
        ) : (
          <span className="text-xs text-muted-foreground">
            Début de la conversation
          </span>
        )}
      </div>

      {data.map((m) => {
        const prof = m.sender_id ? profiles[m.sender_id] : undefined;
        const name = prof?.full_name || 'Utilisateur';
        const side = sideFor(m);

        return (
          <ChatBubble
            key={m.id}
            side={side}
            name={name}
            meta={
              <>
                {new Date(m.created_at).toLocaleString()}
                {m.project_id && (
                  <span
                    className={
                      side === 'right'
                        ? 'px-1.5 py-0.5 rounded-full text-[10px] bg-white/15 text-white/90'
                        : 'px-1.5 py-0.5 rounded-full text-[10px] bg-black/5 dark:bg-white/10 text-foreground/70'
                    }
                    title={`Projet #${m.project_id}`}
                  >
                    #{m.project_id.slice(0, 6)}
                  </span>
                )}
              </>
            }
          >
            {m.body && (
              <div className="whitespace-pre-wrap text-[15px] leading-relaxed">
                {m.body}
              </div>
            )}
            {Array.isArray(m.attachments) && m.attachments.length > 0 && (
              <div className="mt-2 space-y-2">
                {m.attachments.map((att: any, i: number) => (
                  <Attachment key={i} att={att} />
                ))}
              </div>
            )}
          </ChatBubble>
        );
      })}

      <div ref={bottomRef} />
    </div>
  );
}
