// lib/realtime.ts
'use client';
import { supabase } from '@/lib/SupabaseClient';
// lib/realtime.ts (complément)
import type { RealtimeChannel } from '@supabase/supabase-js';

export type TypingEvent = {
  user_id: string;
  typing: boolean;
  at: number;
};

export type RTMessage = {
  id: string;
  thread_id: string;
  sender_id: string | null;
  project_id: string | null;
  type: 'text' | 'image' | 'file' | 'system';
  body: string | null;
  attachments: any[];
  created_at: string;
};

function normalizeAttachments(raw: any): any[] {
  if (!raw) return [];
  if (Array.isArray(raw)) return raw;
  if (typeof raw === 'string') {
    try {
      const p = JSON.parse(raw);
      return Array.isArray(p) ? p : [];
    } catch {
      return [];
    }
  }
  // parfois c’est un objet unique
  if (typeof raw === 'object') return [raw];
  return [];
}

export function subscribeMessages(
  threadId: string,
  onInsert: (row: RTMessage) => void
) {
  const channel = supabase.channel(`messages:${threadId}`);

  channel.on(
    'postgres_changes',
    {
      event: 'INSERT',
      schema: 'public',
      table: 'messages',
      filter: `thread_id=eq.${threadId}`,
    },
    (payload) => {
      const row = payload.new as RTMessage;
      const safe: RTMessage = {
        ...row,
        attachments: normalizeAttachments((row as any).attachments),
      };
      onInsert(safe);
    }
  );

  let unsubbed = false;
  const start = async () => {
    await supabase.auth.getSession(); // attend la session
    if (unsubbed) return;
    await channel.subscribe();
  };
  start();

  return () => {
    unsubbed = true;
    try {
      supabase.removeChannel(channel);
    } catch {}
  };
}

/**
 * Ouvre un canal realtime "typing:<threadId>" et notifie via onTyping
 * à chaque broadcast 'typing'.
 */
export function typingChannel(
  threadId: string,
  onTyping: (ev: TypingEvent) => void
): RealtimeChannel {
  // clé de présence stable (user id si dispo, sinon anonyme unique)
  const uid =
    (supabase as any)?._auth?.currentSession?.user?.id ||
    `anon-${Math.random().toString(36).slice(2, 9)}`;

  const chan = supabase.channel(`typing:${threadId}`, {
    config: { presence: { key: uid } },
  });

  // on peut écouter 'presence' si besoin (optionnel)
  chan.on('presence', { event: 'sync' }, () => {
    /* noop */
  });

  // écoute les broadcasts 'typing'
  chan.on('broadcast', { event: 'typing' }, ({ payload }) => {
    try {
      const p = payload as TypingEvent;
      if (p && typeof onTyping === 'function') onTyping(p);
    } catch {
      /* ignore */
    }
  });

  // s’abonner (non bloquant)
  chan.subscribe();

  return chan;
}

/**
 * Envoie un broadcast 'typing' sur le canal fourni.
 * Re-déclenche un "typing:false" auto après 2s.
 */
let __typingTimer: any = null;

export function broadcastTyping(
  chan: RealtimeChannel | null | undefined,
  typing: boolean
) {
  if (!chan) return;
  try {
    chan.send({
      type: 'broadcast',
      event: 'typing',
      payload: {
        user_id: (supabase as any)?._auth?.currentSession?.user?.id || 'anon',
        typing,
        at: Date.now(),
      } as TypingEvent,
    });

    // auto-stop au bout de 2s
    if (typing) {
      clearTimeout(__typingTimer);
      __typingTimer = setTimeout(() => {
        try {
          chan.send({
            type: 'broadcast',
            event: 'typing',
            payload: {
              user_id:
                (supabase as any)?._auth?.currentSession?.user?.id || 'anon',
              typing: false,
              at: Date.now(),
            } as TypingEvent,
          });
        } catch {}
      }, 2000);
    }
  } catch {
    // ignore
  }
}

// lib/realtime.ts (compléter le fichier existant)

declare global {
  interface WindowEventMap {
    'chat:local-insert': CustomEvent<{ thread_id: string; row: RTMessage }>;
  }
}

export function emitLocalInsert(thread_id: string, row: RTMessage) {
  if (typeof window === 'undefined') return;
  window.dispatchEvent(
    new CustomEvent('chat:local-insert', { detail: { thread_id, row } })
  );
}

export function onLocalInsert(
  cb: (payload: { thread_id: string; row: RTMessage }) => void
) {
  if (typeof window === 'undefined') return () => {};
  const handler = (e: Event) => {
    cb((e as CustomEvent<{ thread_id: string; row: RTMessage }>).detail);
  };
  window.addEventListener('chat:local-insert', handler);
  return () => window.removeEventListener('chat:local-insert', handler);
}
