// components/ClientSpace/Chat/Composer.tsx
'use client';

import { useEffect, useRef, useState } from 'react';
import { supabase } from '@/lib/SupabaseClient';
import {
  broadcastTyping,
  typingChannel,
  emitLocalInsert,
} from '@/lib/realtime';
import { Paperclip, Send } from 'lucide-react';
import { motion } from 'framer-motion';

export default function Composer({
  threadId,
  projectId,
  currentUserId,
}: {
  threadId: string;
  projectId: string | null;
  currentUserId?: string | null;
}) {
  const [text, setText] = useState('');
  const [busy, setBusy] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [atts, setAtts] = useState<any[]>([]);
  const chanRef = useRef<any>(null);

  useEffect(() => {
    chanRef.current = typingChannel(threadId, () => {});
    return () => {
      try {
        chanRef.current?.unsubscribe?.();
      } catch {}
    };
  }, [threadId]);

  function onKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      send();
    } else {
      broadcastTyping(chanRef.current, true);
    }
  }

  async function send() {
    if (!text.trim() && atts.length === 0) return;
    setBusy(true);
    try {
      const res = await fetch('/api/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          thread_id: threadId,
          body: text.trim() || null,
          attachments: atts,
          project_id: projectId,
        }),
      });
      const row = await res.json();
      if (!res.ok) throw new Error(row?.error || 'Erreur envoi');

      // Echo local
      emitLocalInsert(threadId, {
        ...row,
        attachments: Array.isArray(row.attachments) ? row.attachments : [],
        sender_id: currentUserId ?? row.sender_id,
      });

      setText('');
      setAtts([]);
    } catch (e: any) {
      alert(e?.message ?? 'Envoi échoué');
    } finally {
      setBusy(false);
    }
  }

  async function handleFiles(files: FileList | null) {
    if (!files || files.length === 0) return;
    setUploading(true);
    try {
      const uploaded: any[] = [];
      for (const file of Array.from(files)) {
        const path = `chat-attachments/${threadId}/${Date.now()}-${file.name}`;
        const { data, error } = await supabase.storage
          .from('chat-attachments')
          .upload(path, file, { upsert: false, cacheControl: '3600' });
        if (error) throw error;
        const { data: pub } = supabase.storage
          .from('chat-attachments')
          .getPublicUrl(data.path);
        const kind = file.type.startsWith('image/') ? 'image' : 'file';
        uploaded.push({
          name: file.name,
          url: pub.publicUrl,
          size: file.size,
          kind,
        });
      }
      setAtts((prev) => [...prev, ...uploaded]);
    } catch (e: any) {
      alert(e?.message ?? 'Upload échoué');
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className="bg-transparent px-3 pb-3">
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25 }}
        className="flex items-center gap-2"
      >
        {/* Attach */}
        <label className="inline-flex items-center justify-center w-11 h-11 z-50 !backdrop-blur-xl rounded-2xl bg-[#e5e5e550] hover:bg-neutral-200 dark:bg-white/10 dark:hover:bg-white/15 cursor-pointer transition">
          <input
            type="file"
            multiple
            className="hidden"
            onChange={(e) => handleFiles(e.target.files)}
          />
          <Paperclip className="w-5 h-5" />
        </label>

        {/* Input glass — sans bordures */}
        <div className="flex-1 rounded-3xl bg-white/80 dark:bg-neutral-800/60 backdrop-blur-3xl shadow-[0_8px_30px_rgba(0,0,0,0.06)]">
          <textarea
            aria-label="Écrire un message"
            className="w-full bg-transparent p-3 text-sm rounded-3xl resize-none outline-none placeholder:text-foreground/50"
            placeholder="Écrire un message…"
            rows={1}
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={onKeyDown}
          />
          {(uploading || atts.length > 0) && (
            <div className="px-3 pb-2 text-xs text-muted-foreground">
              {uploading ? 'Upload…' : `${atts.length} pièce(s) jointe(s)`}
            </div>
          )}
        </div>

        {/* Send */}
        <button
          disabled={busy || (!text.trim() && atts.length === 0)}
          onClick={send}
          className="w-11 h-11 inline-flex items-center justify-center rounded-2xl bg-gradient-to-r backdrop-blur-2xl from-primary to-blue-500 text-white disabled:opacity-80 shadow-[0_10px_30px_rgba(59,130,246,0.35)]"
          title="Envoyer"
        >
          <Send className="w-4 h-4" />
        </button>
      </motion.div>
    </div>
  );
}
