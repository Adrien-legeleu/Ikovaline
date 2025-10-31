// /api/esign/status/route.ts
import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

// On définit le shape minimal qu'on lit
type SubmissionSignatureRow = {
  contract_status: string | null;
  signed_contract_files: string[] | null;
};

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const submissionId = searchParams.get('submissionId');

    if (!submissionId) {
      return new NextResponse('Missing submissionId', { status: 400 });
    }

    const supa = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    // on ne donne PLUS de generic à .select() parce que ça crée l'enfer
    const { data, error } = await supa
      .from('submissions')
      .select('contract_status, signed_contract_files')
      .eq('id', submissionId)
      .single();

    if (error) {
      return new NextResponse(error.message, { status: 500 });
    }
    if (!data) {
      return new NextResponse('Submission not found', { status: 404 });
    }

    // 👉 ICI on cast proprement la réponse brute en ce qu'on veut lire
    const row = data as SubmissionSignatureRow;

    // signed_contract_files = text[] en DB
    const signedFiles = Array.isArray(row.signed_contract_files)
      ? row.signed_contract_files
      : [];

    const signedFileUrl = signedFiles.length > 0 ? signedFiles[0] : null;

    // contract_status = 'pending' | 'signed' | ...
    const status = row.contract_status ?? 'pending';

    return NextResponse.json({
      status,
      signedPdfPublicUrl: signedFileUrl,
    });
  } catch (e: any) {
    return new NextResponse(e?.message ?? 'Server error', { status: 500 });
  }
}
