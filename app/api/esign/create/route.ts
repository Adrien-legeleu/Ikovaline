// /api/esign/create/route.ts
import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function POST(req: Request) {
  try {
    const { submissionId, clientName, clientEmail } = await req.json();

    if (!submissionId) {
      return new NextResponse('Missing submissionId', { status: 400 });
    }

    const token = process.env.ESIGN_TOKEN!;
    const templateId = process.env.ESIGN_TEMPLATE_ID!;
    if (!token || !templateId) {
      return new NextResponse('Missing ESIGN env', { status: 500 });
    }

    // 1. Appel provider pour créer le contrat à signer
    const url = `https://esignatures.com/api/contracts?token=${encodeURIComponent(
      token
    )}`;
    const payload = {
      template_id: templateId,
      signers: [{ name: clientName || 'Client', email: clientEmail }],
    };

    const r = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    const raw = await r.text();
    if (!r.ok) {
      return new NextResponse(raw || 'eSignatures error', {
        status: r.status || 500,
      });
    }

    const j = JSON.parse(raw);
    const signingUrl = j?.data?.contract?.signers?.[0]?.sign_page_url ?? null;
    const contractId = j?.data?.contract?.id ?? null;

    // 2. Sauvegarder dans submissions
    //    - provider_contract_id = l'ID renvoyé par le provider
    //    - contract_status = 'pending' (en attente de signature)
    //    - contract_files = [url brouillon ?] (si t'as un brouillon PDF dispo)
    //
    //    Ici on n'a pas explicitement l'URL du PDF brouillon,
    //    donc on laisse contract_files tel quel pour l'instant.

    if (contractId) {
      const supa = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.SUPABASE_SERVICE_ROLE_KEY!
      );
      await supa
        .from('submissions')
        .update({
          provider_contract_id: contractId,
          contract_status: 'pending', // still waiting for signature
        })
        .eq('id', submissionId);
    }

    // 3. On renvoie l'URL publique où le client signe
    return NextResponse.json({
      ok: true,
      url: signingUrl,
      contractId,
      raw: j,
    });
  } catch (e: any) {
    return new NextResponse(e?.message ?? 'Server error', { status: 500 });
  }
}
