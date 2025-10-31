// components/ClientProject/EditableTitle.tsx
'use client';

import { useEffect, useRef, useState } from 'react';
import { supabase } from '@/lib/SupabaseClient';
import { Check, Pencil } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function EditableTitle({
  projectId,
  initialTitle,
  canEdit,
}: {
  projectId: string;
  initialTitle: string;
  canEdit: boolean;
}) {
  const router = useRouter();
  const [editing, setEditing] = useState(false);
  const [val, setVal] = useState(initialTitle || '');
  const [busy, setBusy] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (editing) inputRef.current?.focus();
  }, [editing]);

  async function save() {
    if (!canEdit) return;
    const next = val.trim() || initialTitle || 'Projet';
    if (next === initialTitle) {
      setEditing(false);
      return;
    }
    setBusy(true);
    try {
      const { error } = await supabase
        .from('projects')
        .update({ title: next })
        .eq('id', projectId);
      if (error) throw error;
      setEditing(false);
      router.refresh();
    } catch (e: any) {
      alert(e?.message ?? 'Impossible de mettre à jour le titre.');
    } finally {
      setBusy(false);
    }
  }

  if (!canEdit) {
    return (
      <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight">
        {val || 'Projet'}
      </h1>
    );
  }

  return (
    <div className="group inline-flex items-center gap-2">
      {editing ? (
        <div className="flex items-center gap-2">
          <input
            ref={inputRef}
            value={val}
            onChange={(e) => setVal(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') save();
              if (e.key === 'Escape') {
                setVal(initialTitle);
                setEditing(false);
              }
            }}
            className="text-2xl sm:text-3xl font-semibold tracking-tight bg-transparent border-b border-primary/40 focus:outline-none"
          />
          <button
            onClick={save}
            disabled={busy}
            className="rounded-lg border px-2 py-1 text-sm hover:bg-black/5 dark:hover:bg-white/10"
            title="Valider"
          >
            <Check className="w-4 h-4" />
          </button>
        </div>
      ) : (
        <>
          <h1
            className="text-2xl sm:text-3xl font-semibold tracking-tight"
            onDoubleClick={() => setEditing(true)}
            title="Double-cliquer pour renommer"
          >
            {val || 'Projet'}
          </h1>
          <button
            onClick={() => setEditing(true)}
            className="opacity-0 group-hover:opacity-100 transition rounded-lg border px-2 py-1 text-xs hover:bg-black/5 dark:hover:bg-white/10"
            title="Renommer"
          >
            <Pencil className="w-3.5 h-3.5" />
          </button>
        </>
      )}
    </div>
  );
}
