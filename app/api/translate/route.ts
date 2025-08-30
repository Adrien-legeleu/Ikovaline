import { NextResponse } from 'next/server';

const DEEPL_ENDPOINT = 'https://api-free.deepl.com/v2/translate'; // Pro: https://api.deepl.com/v2/translate

export async function POST(req: Request) {
  const { texts, sourceLang = 'FR', targetLang = 'EN' } = await req.json();

  if (!process.env.DEEPL_API_KEY) {
    return NextResponse.json(
      { error: 'DEEPL_API_KEY manquant' },
      { status: 500 }
    );
  }
  if (!Array.isArray(texts) || texts.length === 0) {
    return NextResponse.json({ error: 'texts[] requis' }, { status: 400 });
  }

  const body = new URLSearchParams({
    auth_key: process.env.DEEPL_API_KEY!,
    target_lang: targetLang,
    source_lang: sourceLang,
    tag_handling: 'html',
  });
  texts.forEach((t) => body.append('text', t));

  const r = await fetch(DEEPL_ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body,
  });

  if (!r.ok) {
    const err = await r.text();
    return NextResponse.json(
      { error: `DeepL ${r.status}: ${err}` },
      { status: 500 }
    );
  }

  const data = await r.json();
  const translations = (data.translations || []).map((t: any) => t.text);
  return NextResponse.json({ translations });
}
