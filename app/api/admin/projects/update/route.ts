// app/api/admin/projects/update/route.ts
import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY!;

if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
  console.error('❌ Missing Supabase env vars for admin update route');
}

const supabaseAdmin = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
  auth: { persistSession: false },
});

function isValidEmail(s: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test((s ?? '').trim());
}

// ✅ Colonnes réelles
const ALLOWED_COLS = new Set([
  'owner_user_id',
  'client_email',
  'title',
  'description',
  'industry',
  'offer_category',
  'offer_tier',
  'offer_price',
  'selected_options',
  'total_sold',
  'currency',
  'maintenance_type',
  'maintenance_start',
  'maintenance_end',
  'wants_ads',
  'ads_budget',
  'brief_files',
  'signed_contract_files',
  'billing_status',
  'payment_total',
  'payment_captured',
  'payment_installments',
  'payment_currency',
  'status',
  'progress',
  'risk_level',
  'priority',
  'start_at',
  'deadline',
  'urls',
  'repo_url',
  'extra', // JSONB
]);

export async function PATCH(req: Request) {
  try {
    const body = await req.json();
    const { id, extra, ...cols } = body ?? {};

    if (!id) {
      return NextResponse.json(
        { ok: false, error: 'id required' },
        { status: 400 }
      );
    }

    if (cols.client_email && !isValidEmail(cols.client_email)) {
      return NextResponse.json(
        { ok: false, error: 'invalid email' },
        { status: 400 }
      );
    }

    // 🔒 Filtrage strict
    const filteredCols: Record<string, any> = {};
    for (const [k, v] of Object.entries(cols)) {
      if (ALLOWED_COLS.has(k) && v !== undefined) filteredCols[k] = v;
    }

    // 🔄 Merge JSONB extra si fourni
    if (extra && typeof extra === 'object') {
      const { data: current, error: curErr } = await supabaseAdmin
        .from('projects')
        .select('extra')
        .eq('id', id)
        .single();

      if (curErr) {
        console.error('projects.select current.extra error', curErr);
        return NextResponse.json(
          { ok: false, error: 'read failed' },
          { status: 500 }
        );
      }
      filteredCols.extra = { ...(current?.extra ?? {}), ...extra };
    }

    // 🧹 Clean undefined
    for (const k of Object.keys(filteredCols)) {
      if (filteredCols[k] === undefined) delete filteredCols[k];
    }

    // ✅ Update
    const { data, error } = await supabaseAdmin
      .from('projects')
      .update(filteredCols)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('projects.update error', error);
      return NextResponse.json(
        { ok: false, error: error.message ?? 'update failed' },
        { status: 500 }
      );
    }

    return NextResponse.json({ ok: true, project: data });
  } catch (e: any) {
    console.error('unexpected', e);
    return NextResponse.json(
      { ok: false, error: e?.message ?? 'unexpected' },
      { status: 500 }
    );
  }
}
