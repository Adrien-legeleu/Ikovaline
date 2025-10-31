'use client';

import { useState } from 'react';
import { supabase } from '@/lib/SupabaseClient';
import { IconUpload, IconTrash, IconFile } from '@tabler/icons-react';
import { cn } from '@/lib/utils';

type UploadedFile = {
  file_url: string;
  filename: string;
  path: string;
  mime?: string;
  isImage?: boolean;
};

export default function FileUploader({
  folderKey,
  onUploaded,
  maxFiles = Infinity, // 👈 option ajoutée (illimité par défaut)
}: {
  folderKey: string;
  onUploaded: (rows: UploadedFile[]) => void;
  maxFiles?: number;
}) {
  const [loading, setLoading] = useState(false);
  const [files, setFiles] = useState<UploadedFile[]>([]);

  // ---------- UPLOAD ----------
  async function onPick(e: React.ChangeEvent<HTMLInputElement>) {
    const fList = e.target.files;
    if (!fList?.length) return;

    // Combien peut-on encore ajouter ?
    const remaining = Math.max(0, maxFiles - files.length);
    if (remaining === 0) {
      alert(`Nombre maximum de fichiers atteint (${maxFiles}).`);
      e.target.value = '';
      return;
    }

    // On tronque la sélection si nécessaire
    const selected = Array.from(fList).slice(0, remaining);
    const cut = fList.length - selected.length;
    if (cut > 0) {
      alert(
        `Vous avez sélectionné trop de fichiers. ${selected.length} seront ajoutés (max ${maxFiles}).`
      );
    }

    setLoading(true);
    try {
      const newRows: UploadedFile[] = [];

      for (const f of selected) {
        const path = `${folderKey}/${Date.now()}-${f.name}`;

        const { error: upErr } = await supabase.storage
          .from('uploads')
          .upload(path, f, { upsert: false });
        if (upErr) throw upErr;

        const { data: signed, error: signErr } = await supabase.storage
          .from('uploads')
          .createSignedUrl(path, 60 * 60 * 24 * 30);
        if (signErr) throw signErr;

        newRows.push({
          file_url: signed.signedUrl,
          filename: f.name,
          path,
          mime: f.type,
          isImage: f.type?.startsWith('image/'),
        });
      }

      const merged = [...files, ...newRows];
      setFiles(merged);
      onUploaded(merged);
      e.target.value = '';
    } finally {
      setLoading(false);
    }
  }

  // ---------- DELETE ----------
  async function handleDelete(file: UploadedFile) {
    if (!confirm(`Supprimer ${file.filename} ?`)) return;

    const { error } = await supabase.storage
      .from('uploads')
      .remove([file.path]);
    if (error) {
      alert('Erreur lors de la suppression : ' + error.message);
      return;
    }

    const updated = files.filter((f) => f.path !== file.path);
    setFiles(updated);
    onUploaded(updated);
  }

  return (
    <div className="space-y-3">
      {/* Bouton Upload */}
      <label
        className={cn(
          'inline-flex items-center gap-2 h-11 px-3 rounded-[1.1rem]',
          'bg-black/[0.05] hover:bg-black/[0.08] dark:bg-white/10 dark:hover:bg-white/15',
          'cursor-pointer select-none'
        )}
      >
        {/* multiple seulement si maxFiles !== 1 */}
        <input
          type="file"
          className="hidden"
          multiple={maxFiles !== 1}
          onChange={onPick}
        />
        <IconUpload className="h-5 w-5" />
        {loading ? 'Upload…' : 'Ajouter des fichiers'}
      </label>

      {/* Galerie (flex wrap) */}
      {files.length > 0 && (
        <div className="flex flex-wrap gap-3">
          {files.map((file) => (
            <div
              key={file.path}
              className={cn(
                'group relative overflow-hidden rounded-2xl',
                'w-28 h-28 md:w-32 md:h-32',
                'bg-black/[0.06] dark:bg-white/10',
                'shadow-[0_8px_24px_rgba(0,0,0,0.08)]'
              )}
            >
              {file.isImage ? (
                <img
                  src={file.file_url}
                  alt={file.filename}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              ) : (
                <div className="flex h-full w-full flex-col items-center justify-center p-3 text-center">
                  <IconFile className="h-7 w-7 opacity-70" />
                  <div className="mt-2 line-clamp-2 text-[11px] opacity-80">
                    {file.filename}
                  </div>
                </div>
              )}

              <button
                onClick={() => handleDelete(file)}
                className={cn(
                  'absolute right-2 top-2 rounded-full p-1.5',
                  'bg-white/90 dark:bg-neutral-900/90 backdrop-blur',
                  'shadow-[0_8px_20px_rgba(0,0,0,0.15)]',
                  'opacity-0 group-hover:opacity-100 transition'
                )}
                aria-label={`Supprimer ${file.filename}`}
              >
                <IconTrash className="h-4 w-4 text-red-500" />
              </button>

              <div className="pointer-events-none absolute inset-x-0 bottom-0 translate-y-2 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition p-2">
                <div className="rounded-xl px-2 py-1 text-[10px] truncate bg-black/40 text-white/90 backdrop-blur">
                  {file.filename}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
