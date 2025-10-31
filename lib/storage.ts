// lib/storage.ts
'use client';

import { supabase } from './SupabaseClient';

/**
 * Upload une liste de fichiers vers un bucket Supabase Storage.
 * Buckets attendus:
 *  - 'uploads' (briefs, images, pdf, etc.)
 *  - 'signed-pdfs' (contrats signés PDF)
 *
 * Retourne la liste des paths stockés (à persister en BDD).
 */
export async function uploadFiles(
  bucket: 'uploads' | 'signed-pdfs',
  files: File[],
  /**
   * Préfixe dossier dans le bucket (facultatif).
   * Par défaut: "admin/<timestamp>"
   * Exemple utile :
   *  - 'briefs/...'
   *  - 'contracts/...'
   */
  prefix = `admin/${Date.now()}`
): Promise<string[]> {
  const paths: string[] = [];
  for (const f of files) {
    const safeName = f.name.replace(/[^\w.\-]+/g, '_');
    const path = `${prefix}/${crypto.randomUUID()}-${safeName}`;
    const { error } = await supabase.storage.from(bucket).upload(path, f, {
      cacheControl: '3600',
      upsert: false,
      contentType: f.type || undefined,
    });
    if (!error) {
      paths.push(path);
    } else {
      console.warn(`Upload failed for ${f.name}`, error.message);
    }
  }
  return paths;
}
