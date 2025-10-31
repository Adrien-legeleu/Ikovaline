import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export async function POST(req: Request) {
  try {
    const bodyText = await req.text();
    let payload: any = null;
    try {
      payload = JSON.parse(bodyText);
    } catch {
      payload = { raw: bodyText };
    }

    console.log('[eSignatures:webhook] payload', payload);

    // À adapter selon le payload final d’eSignatures
    const submissionId: string | undefined =
      payload?.submissionId ||
      payload?.metadata?.submissionId ||
      payload?.contract?.reference ||
      payload?.contract_id ||
      payload?.data?.contract?.reference;

    const contractStatus: string | undefined =
      payload?.data?.contract?.status || payload?.contract?.status;

    const signedPdfUrl: string | null =
      payload?.data?.contract?.signed_pdf_url ||
      payload?.contract?.signed_pdf_url ||
      null;

    const supa = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    let publicPdfUrl: string | null = null;

    if (signedPdfUrl && submissionId) {
      // Télécharge et pousse dans Supabase Storage (uploads/agreements/<id>.pdf)
      try {
        const fileResp = await fetch(signedPdfUrl);
        if (fileResp.ok) {
          const arrBuf = await fileResp.arrayBuffer();
          const bytes = new Uint8Array(arrBuf);
          const path = `agreements/${submissionId}.pdf`;
          const { error: upErr } = await supa.storage
            .from('uploads')
            .upload(path, bytes, {
              contentType: 'application/pdf',
              upsert: true,
            });
          if (!upErr) {
            publicPdfUrl = supa.storage.from('uploads').getPublicUrl(path)
              .data.publicUrl;
          }
        }
      } catch (e) {
        console.error('[eSignatures:webhook] PDF fetch error', e);
      }
    }

    if (submissionId) {
      await supa
        .from('submissions')
        .update({
          status:
            contractStatus === 'completed'
              ? 'signed'
              : (contractStatus ?? 'signed'),
          signed_pdf_url: publicPdfUrl ?? signedPdfUrl ?? null,
        })
        .eq('id', submissionId);
    }

    return NextResponse.json({ ok: true });
  } catch (e: any) {
    console.error('[eSignatures:webhook] Exception', e);
    return new NextResponse('Webhook error', { status: 500 });
  }
}
