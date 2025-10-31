// /api/esign/pull-status/route.ts
import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

// essaie d'inférer une URL PDF à partir de l'URL de signature
function derivePdfUrlFromSignUrl(signUrl?: string | null): string | null {
  if (!signUrl || typeof signUrl !== 'string') return null;
  return signUrl.replace(/\/signed\/?$/i, '');
}

// va chercher l'état du contrat chez le provider
async function getProviderContract(contractId: string, token: string) {
  const url = `https://esignatures.com/api/contracts/${encodeURIComponent(
    contractId
  )}?token=${encodeURIComponent(token)}`;

  const res = await fetch(url, { cache: 'no-store' });
  if (!res.ok) {
    throw new Error(`Provider status failed (${res.status})`);
  }
  const j = await res.json();
  return j;
}

// normalise le statut du provider
function normalizeStatus(j: any): 'pending' | 'signed' | string {
  const raw =
    j?.data?.contract?.status ??
    j?.status ??
    j?.contract?.status ??
    j?.data?.status ??
    '';
  const s = String(raw).toLowerCase();

  if (['signed', 'completed', 'finished'].includes(s)) return 'signed';
  if (['sent', 'pending'].includes(s)) return 'pending';
  return s || 'pending';
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

    // 1. Récupérer l'ID du contrat côté provider
    const { data: sub, error: e0 } = await supa
      .from('submissions')
      .select('provider_contract_id, signed_contract_files')
      .eq('id', submissionId)
      .single();

    if (e0) {
      return new NextResponse(e0.message, { status: 500 });
    }
    if (!sub?.provider_contract_id) {
      return new NextResponse('Missing provider_contract_id on submission', {
        status: 400,
      });
    }

    const token = process.env.ESIGN_TOKEN!;
    if (!token) {
      return new NextResponse('Missing ESIGN_TOKEN', { status: 500 });
    }

    // 2. status provider
    const j = await getProviderContract(sub.provider_contract_id, token);
    const providerStatus = normalizeStatus(j);

    // on essaie d’attraper l’URL de visualisation / signature
    const signUrlFromProvider =
      j?.data?.contract?.signers?.[0]?.sign_page_url ??
      j?.data?.contract?.sign_page_url ??
      j?.contract?.sign_page_url ??
      null;

    const possiblePdfUrl = derivePdfUrlFromSignUrl(signUrlFromProvider);

    // 3. si signé → update DB contract_status='signed' et signed_contract_files[0]
    if (providerStatus === 'signed') {
      const newFilesArr = Array.isArray(sub.signed_contract_files)
        ? sub.signed_contract_files.slice()
        : [];

      if (possiblePdfUrl && !newFilesArr.includes(possiblePdfUrl)) {
        newFilesArr.unshift(possiblePdfUrl); // push en tête
      }

      const { error: e1 } = await supa
        .from('submissions')
        .update({
          contract_status: 'signed',
          signed_contract_files: newFilesArr,
        })
        .eq('id', submissionId);

      if (e1) {
        return new NextResponse(e1.message, { status: 500 });
      }
    }

    return NextResponse.json({
      providerStatus,
      derivedPdfUrl: possiblePdfUrl ?? null,
    });
  } catch (e: any) {
    return new NextResponse(e?.message ?? 'Server error', { status: 500 });
  }
}
