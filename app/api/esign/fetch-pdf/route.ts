// /api/esign/fetch-pdf/route.ts
import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

// télécharge le PDF final (signé) depuis le provider
async function downloadSignedPdf(contractId: string, token: string) {
  const url = `https://esignatures.com/api/contracts/${encodeURIComponent(
    contractId
  )}/download?token=${encodeURIComponent(token)}`;

  const res = await fetch(url);
  if (!res.ok) throw new Error(`eSignatures download failed (${res.status})`);

  const blob = await res.arrayBuffer();
  return Buffer.from(blob);
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

    // 1) get provider_contract_id
    const { data: sub, error: e1 } = await supa
      .from('submissions')
      .select('provider_contract_id, signed_contract_files')
      .eq('id', submissionId)
      .single();

    if (e1) return new NextResponse(e1.message, { status: 500 });

    if (!sub?.provider_contract_id) {
      return new NextResponse('Missing provider_contract_id on submission', {
        status: 400,
      });
    }

    // 2) download from provider
    const token = process.env.ESIGN_TOKEN!;
    const pdfBuffer = await downloadSignedPdf(sub.provider_contract_id, token);

    // 3) upload to bucket
    const fileName = `${submissionId}.pdf`;
    const storage = supa.storage.from('signed-pdfs');
    const { error: upErr } = await storage.upload(fileName, pdfBuffer, {
      contentType: 'application/pdf',
      upsert: true,
    });
    if (upErr) return new NextResponse(upErr.message, { status: 500 });

    // 4) public URL
    const { data: pub } = storage.getPublicUrl(fileName);
    const publicUrl = pub.publicUrl;

    // 5) persist : mettre contract_status='signed' + signed_contract_files[0] = publicUrl
    const newFilesArr = Array.isArray(sub.signed_contract_files)
      ? sub.signed_contract_files.slice()
      : [];
    if (publicUrl && !newFilesArr.includes(publicUrl)) {
      newFilesArr.unshift(publicUrl);
    }

    const { error: e2 } = await supa
      .from('submissions')
      .update({
        contract_status: 'signed',
        signed_contract_files: newFilesArr,
      })
      .eq('id', submissionId);

    if (e2) return new NextResponse(e2.message, { status: 500 });

    return NextResponse.json({ ok: true, url: publicUrl });
  } catch (e: any) {
    return new NextResponse(e?.message ?? 'Server error', { status: 500 });
  }
}
