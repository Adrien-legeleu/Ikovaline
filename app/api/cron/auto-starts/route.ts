import { NextResponse } from 'next/server';

export async function GET() {
  const res = await fetch(
    'https://tuqqaeedcrgjtotdobdc.supabase.co/functions/v1/auto-start-projects',
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY}`,
        'Content-Type': 'application/json',
      },
    }
  );

  const text = await res.text();
  return NextResponse.json({ ok: res.ok, message: text });
}
