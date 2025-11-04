// app/api/chatbot/route.ts
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { createClient } from '@supabase/supabase-js';
import { LLMLayerClient } from 'llmlayer';
import { createHash, randomUUID } from 'crypto';
import { CATALOG } from '@/lib/catalog';
import { fetchIkovalineContext } from '@/lib/IkovalineKnowledge';

export const runtime = 'nodejs';
export const maxDuration = 60;
export const preferredRegion = 'fra1';
export const dynamic = 'force-dynamic';

const CONTACT_URL = 'https://ikovaline.com/contact';
const CALENDAR_URL =
  'https://calendly.com/florent-ghizzoni/meeting?month=2025-11';

const apiKey = process.env.LLMLAYER_API_KEY!;
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY! // service role pour écrire malgré RLS
);
const client = new LLMLayerClient({ apiKey });

// =========== Utils ===========
function detectIntent(msg: string) {
  const m = msg
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
  const RE = {
    warranty:
      /(garanti|garantie|sav|mainten|support|bug|correct|retour|retract|rembours|penalit|sla|astreinte|assistance|incident|ticket|hotline|disponibilite)/i,
    pricing:
      /(prix|tarif|budget|co[uû]t|combien|devis|grille|facturation|facture|ht|ttc)/i,
    timing:
      /(delai|deadline|livraison|temps|planning|quand|calendrier|roadmap|chrono)/i,
    terms:
      /(cgv|cgu|contrat|conditions|paiement|acompte|echeance|penalite|propriete|licence|cession|reversibilite|confidentialite|penalites?)/i,
    acquisition:
      /(seo|ads|sea|acquisition|google\s?ads|shopping|gmb|google\s?business|local)/i,
    tech: /(tech|stack|hebergement|heberge|securite|rgpd|gdpr|performance|core\s?web\s?vitals|devops|scalabilite|scalable|infra)/i,
    integrations:
      /(integration|stripe|crm|zapier|make|n8n|erp|api|webhook|shopify|wordpress|prestashop|notion|slack)/i,
    privacy:
      /(donnees|donnee|donnes|data|rgpd|gdpr|dpo|privacy|confidentiel|confidentialite|cnil|cookies?)/i,
  };
  if (RE.warranty.test(m)) return 'WARRANTY';
  if (RE.terms.test(m)) return 'TERMS';
  if (RE.pricing.test(m)) return 'PRICING';
  if (RE.timing.test(m)) return 'TIMING';
  if (RE.acquisition.test(m)) return 'ACQUISITION';
  if (RE.tech.test(m)) return 'TECH';
  if (RE.integrations.test(m)) return 'INTEGRATIONS';
  if (RE.privacy.test(m)) return 'PRIVACY';
  return 'GENERAL';
}

function buildSlimCatalog() {
  const out: any = {};
  for (const [catId, cat] of Object.entries(CATALOG)) {
    out[catId] = {
      name: (cat as any).name,
      tagline: (cat as any).tagline,
      hasAdsBudget: (cat as any).hasAdsBudget,
      tiers: (cat as any).tiers.map((t: any) => ({
        id: t.id,
        name: t.name,
        price: t.price,
        baseDelayDays: t.baseDelayDays,
      })),
      options: (cat as any).options.slice(0, 6).map((o: any) => ({
        id: o.id,
        label: o.label,
        price: o.price,
        kind: o.kind,
        delayDays: o.delayDays ?? 0,
      })),
    };
  }
  return out;
}
const SLIM_CATALOG = buildSlimCatalog();

const systemPrompt = `
Tu es IkovalineTalk, conseiller projet d’Ikovaline (Paris).
Objectif: répondre précisément au sujet posé, puis poser au plus 1 question utile.
Style court (120–180 mots), listes 3–5 puces, pas de blabla.
Si INTENT = WARRANTY/TERMS: seulement garanties/SAV/conditions, 1 question, aucun pitch.
Sinon: 1–2 reco max avec prix "dès ~…€" + délai (jours), 1 preuve courte. CTA compact seulement si intérêt.
Preuves possibles: 20+ projets, 67+ avis, cas clients (Teka Somba, Lynelec, Skillize).
CTA: [📅 RDV 30 min](${CALENDAR_URL}) — [✉️ Nous écrire](${CONTACT_URL})
`;

function buildUserQuery(siteContext: string, message: string, intent: string) {
  return `
[INTENTION DÉTECTÉE] ${intent}
[CONTEXTE IKOVALINE]
${siteContext}
[CATALOGUE (light)]
${JSON.stringify(SLIM_CATALOG)}
[QUESTION DU VISITEUR]
${message}
Règles: respecter l'intention; si WARRANTY/TERMS => pas de vente; sinon réponse courte, 1–2 reco prix+délais, 1 preuve; CTA compact si intérêt.`;
}

function pickReply(r: any): string {
  if (!r) return '';
  if (typeof r === 'string') return r;
  return (
    r.answer ??
    r.output ??
    r.text ??
    r.content ??
    r?.choices?.[0]?.message?.content ??
    ''
  );
}

function withTimeout<T>(
  p: Promise<T>,
  ms: number,
  label = 'timeout'
): Promise<T> {
  return new Promise((resolve, reject) => {
    const t = setTimeout(() => reject(new Error(label)), ms);
    p.then((v) => {
      clearTimeout(t);
      resolve(v);
    }).catch((e) => {
      clearTimeout(t);
      reject(e);
    });
  });
}

function redactPII(t: string) {
  return (t || '')
    .replace(/\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b/gi, '[email]')
    .replace(/\b(\+?\d{1,3}[\s.-]?)?(\d{2}[\s.-]?){4}\d{2}\b/g, '[phone]');
}

function getOrCreateAnonId(): { value: string; isNew: boolean } {
  const jar = cookies();
  const existing = jar.get('ikova_chat_sid')?.value;
  if (existing) return { value: existing, isNew: false };
  return { value: randomUUID(), isNew: true };
}

function hashAnon(v: string) {
  const salt = process.env.ANON_SALT || '';
  return createHash('sha256')
    .update(v + salt)
    .digest('hex')
    .slice(0, 32);
}

// =========== Route ===========
export async function POST(req: Request) {
  try {
    if (!apiKey) {
      return NextResponse.json(
        { error: 'LLMLAYER_API_KEY manquant (Vercel > Env Vars)' },
        { status: 500 }
      );
    }

    let payload: any;
    try {
      payload = await req.json();
    } catch {
      return NextResponse.json({ error: 'JSON invalide' }, { status: 400 });
    }

    // ------ MODE FEEDBACK (même route) ------
    if (payload?.feedback) {
      const { messageId, rating, tags, comment } = payload.feedback as {
        messageId?: string;
        rating?: number;
        tags?: string[];
        comment?: string;
      };

      if (!messageId || (rating !== 1 && rating !== -1)) {
        return NextResponse.json(
          { error: 'Feedback invalide' },
          { status: 400 }
        );
      }

      const { error: fiErr } = await supabase.from('chat_feedback').insert({
        message_id: messageId,
        rating,
        tags: Array.isArray(tags) ? tags : null,
        comment: comment ? String(comment).slice(0, 2000) : null,
      });

      if (fiErr) {
        return NextResponse.json({ error: fiErr.message }, { status: 500 });
      }
      return NextResponse.json({ ok: true });
    }

    // ------ MODE CHAT ------
    const rawMessage: string = (payload?.message ?? '').toString();
    if (!rawMessage.trim()) {
      return NextResponse.json({ error: 'Message invalide' }, { status: 400 });
    }

    const locale = (payload?.locale ?? 'fr-FR').toString();
    const pagePath = (payload?.pagePath ?? '').toString();
    const referrer = (payload?.referrer ?? '').toString();
    const abBucket = (payload?.abBucket ?? '').toString();
    const promptVersion = (payload?.promptVersion ?? '').toString();
    let sessionId: string | undefined = payload?.sessionId || undefined;

    const intent = detectIntent(rawMessage);

    // Contexte limité à 1500 ms
    let siteContext = '';
    try {
      siteContext = await withTimeout(
        fetchIkovalineContext(),
        1500,
        'context-timeout'
      );
    } catch {
      siteContext =
        'Infos clés: agence web Next.js/React, 20+ projets, 67+ avis, cas clients (Teka Somba, Lynelec, Skillize).';
    }

    const { value: anonCookie, isNew } = getOrCreateAnonId();
    const anon_id = hashAnon(anonCookie);

    // Session
    if (!sessionId) {
      const { data: s, error: se } = await supabase
        .from('chat_sessions')
        .insert({
          anon_id,
          consent: true,
          locale,
          referrer,
          page_path: pagePath,
          ab_bucket: abBucket || null,
          prompt_version: promptVersion || null,
        })
        .select('id')
        .single();
      if (se) throw se;
      sessionId = s.id as string;
    } else {
      await supabase
        .from('chat_sessions')
        .update({
          last_seen: new Date().toISOString(),
          locale,
          page_path: pagePath,
        })
        .eq('id', sessionId);
    }

    // Log user message (redacté)
    const user_text = redactPII(rawMessage).slice(0, 8000);
    const { error: muErr } = await supabase.from('chat_messages').insert({
      session_id: sessionId,
      role: 'user',
      content: user_text,
    });
    if (muErr) throw muErr;

    // Prompt & LLM
    const query = buildUserQuery(siteContext, user_text, intent);
    const started = Date.now();
    let llmResponse: any;
    let modelUsed = 'openai/gpt-4o';

    try {
      // Endpoint "answer" (LLMLayer)
      llmResponse = await client.answer({
        query,
        model: modelUsed,
        system_prompt: systemPrompt,
        response_language: 'fr',
        location: 'fr',
        return_sources: false,
        citations: false,
        temperature: 0.2,
        max_tokens: 420,
      });
    } catch {
      // Fallback chat-compatible
      // @ts-ignore
      llmResponse = await client.chat.completions.create({
        model: modelUsed,
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: query },
        ],
        temperature: 0.2,
        max_tokens: 420,
      });
    }

    const latency_ms = Date.now() - started;
    const reply = (pickReply(llmResponse) || '').trim();

    // Usage (si dispo)
    const usage = llmResponse?.usage || llmResponse?.choices?.[0]?.usage || {};
    const tokens_in = usage.prompt_tokens ?? usage.input_tokens ?? null;
    const tokens_out = usage.completion_tokens ?? usage.output_tokens ?? null;
    const finish_reason =
      llmResponse?.choices?.[0]?.finish_reason ??
      llmResponse?.finish_reason ??
      null;

    // Log assistant + récupérer l'id
    const { data: inserted, error: maErr } = await supabase
      .from('chat_messages')
      .insert({
        session_id: sessionId,
        role: 'assistant',
        content: reply || '…',
        model: modelUsed,
        latency_ms,
        tokens_in,
        tokens_out,
        finish_reason,
      })
      .select('id')
      .single();
    if (maErr) throw maErr;

    // Réponse
    const res = NextResponse.json({
      reply: reply || fallbackReply(),
      sessionId,
      assistantMessageId: inserted?.id,
    });

    // Cookie de session anonyme (minuscule pour sameSite)
    if (isNew) {
      res.cookies.set('ikova_chat_sid', anonCookie, {
        httpOnly: true,
        sameSite: 'lax',
        maxAge: 60 * 60 * 24 * 180, // 180 jours
        path: '/',
      });
    }
    return res;
  } catch (err: any) {
    const msg =
      err?.message ||
      err?.response?.data?.message ||
      err?.response?.data?.error ||
      'Erreur serveur';
    const status = err?.response?.status || 500;

    console.error('Chatbot API error:', {
      status,
      msg: String(msg).slice(0, 500),
    });

    if (/abort|timeout/i.test(String(msg))) {
      return NextResponse.json(
        { error: 'Délai dépassé (réessaie dans un instant)' },
        { status: 504 }
      );
    }
    return NextResponse.json({ error: msg }, { status });
  }
}

function fallbackReply() {
  return [
    '### Reco rapide',
    '• **Landing Page – Starter** dès ~1 090€ (livraison 7–10 j)',
    '• **Site Vitrine – Starter** dès ~2 490€ (livraison 10–14 j)',
    '',
    `- [📅 RDV 30 min](${CALENDAR_URL}) — [✉️ Nous écrire](${CONTACT_URL})`,
  ].join('\n');
}
