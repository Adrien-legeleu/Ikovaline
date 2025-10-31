// /api/esign/mark-signed/route.ts
import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

// réutilise la même helper que fetch-pdf
async function downloadSignedPdf(contractId: string, token: string) {
  const url = `https://esignatures.com/api/contracts/${encodeURIComponent(
    contractId
  )}/download?token=${encodeURIComponent(token)}`;

  const res = await fetch(url);
  if (!res.ok) throw new Error(`eSignatures download failed (${res.status})`);

  const ab = await res.arrayBuffer();
  return Buffer.from(ab);
}

export async function POST(req: Request) {
  try {
    const { submissionId } = await req.json();
    if (!submissionId) {
      return new NextResponse('Missing submissionId', { status: 400 });
    }

    const supa = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    // 1) lire provider_contract_id + signed_contract_files
    const { data: sub, error: e0 } = await supa
      .from('submissions')
      .select('provider_contract_id, signed_contract_files')
      .eq('id', submissionId)
      .single();
    if (e0) return new NextResponse(e0.message, { status: 500 });

    // 2) on marque directement "signed" côté DB
    const baseUpdate: any = {
      contract_status: 'signed',
    };

    // 3) si on peut, on va chercher le PDF final tout de suite
    let publicUrl: string | null = null;
    if (sub?.provider_contract_id) {
      try {
        const token = process.env.ESIGN_TOKEN!;
        const pdf = await downloadSignedPdf(sub.provider_contract_id, token);

        const fileName = `${submissionId}.pdf`;
        const storage = supa.storage.from('signed-pdfs');
        const { error: upErr } = await storage.upload(fileName, pdf, {
          contentType: 'application/pdf',
          upsert: true,
        });
        if (upErr) throw upErr;

        const { data: pub } = storage.getPublicUrl(fileName);
        publicUrl = pub.publicUrl;

        const newFilesArr = Array.isArray(sub.signed_contract_files)
          ? sub.signed_contract_files.slice()
          : [];
        if (publicUrl && !newFilesArr.includes(publicUrl)) {
          newFilesArr.unshift(publicUrl);
        }

        baseUpdate.signed_contract_files = newFilesArr;
      } catch (pdfErr) {
        console.warn('[mark-signed] PDF fetch/upload failed:', pdfErr);
      }
    }

    // 4) push update final
    const { error: e1 } = await supa
      .from('submissions')
      .update(baseUpdate)
      .eq('id', submissionId);
    if (e1) return new NextResponse(e1.message, { status: 500 });

    return NextResponse.json({
      ok: true,
      signedPdfPublicUrl: publicUrl,
    });
  } catch (e: any) {
    return new NextResponse(e?.message ?? 'Server error', { status: 500 });
  }
}
