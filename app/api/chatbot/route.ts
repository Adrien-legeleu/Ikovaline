// app/api/chatbot/route.ts
import { NextResponse } from 'next/server';
import { LLMLayerClient } from 'llmlayer';
import { CATALOG } from '@/lib/catalog';
import { fetchIkovalineContext } from '@/lib/IkovalineKnowledge';

export const runtime = 'nodejs';
// Important: donne de l'air au serverless
export const maxDuration = 60;
export const preferredRegion = 'fra1';
export const dynamic = 'force-dynamic';

const CONTACT_URL = 'https://ikovaline.com/contact';
const CALENDAR_URL =
  'https://calendly.com/florent-ghizzoni/meeting?month=2025-11';

// ————— Utils —————
const apiKey = process.env.LLMLAYER_API_KEY;
const client = new LLMLayerClient({ apiKey });

function detectIntent(msg: string) {
  const m = msg
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
  const RE = {
    warranty:
      /(garanti|garantie|sav|mainten|support|bug|correct|retour|retract|rembours|penalit|sla|astreinte|assistance|incident|ticket|hotline|disponibilite)/i,
    pricing:
      /(prix|tarif|budget|cout|co[uû]t|combien|devis|grille|facturation|facture|ht|ttc)/i,
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
      name: cat.name,
      tagline: cat.tagline,
      hasAdsBudget: cat.hasAdsBudget,
      tiers: cat.tiers.map((t) => ({
        id: t.id,
        name: t.name,
        price: t.price,
        baseDelayDays: t.baseDelayDays,
      })),
      options: cat.options.slice(0, 6).map((o) => ({
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

// Prend n’importe quelle forme de réponse du SDK
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

// Petit helper de timeout (pour le contexte uniquement)
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

export async function POST(req: Request) {
  try {
    if (!apiKey) {
      return NextResponse.json(
        {
          error:
            'LLMLAYER_API_KEY manquant (Vercel > Project > Env Vars, Production & Preview)',
        },
        { status: 500 }
      );
    }

    let payload: any;
    try {
      payload = await req.json();
    } catch {
      return NextResponse.json({ error: 'JSON invalide' }, { status: 400 });
    }
    const message: string = (payload?.message ?? '').toString();
    if (!message.trim()) {
      return NextResponse.json({ error: 'Message invalide' }, { status: 400 });
    }

    const intent = detectIntent(message);

    // Contexte: on limite à 1500ms et on fallback si ça traîne
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

    const query = buildUserQuery(siteContext, message, intent);

    // Appel LLM (laisse le runtime gérer jusqu’à 60s)
    const llmResponse: any = await client.answer({
      query,
      model: 'openai/gpt-4o', // garde 4o (pas mini)
      system_prompt: systemPrompt,
      response_language: 'fr',
      location: 'fr',
      return_sources: false,
      citations: false,
      temperature: 0.2,
      max_tokens: 420,
    });

    const reply = pickReply(llmResponse)?.trim();

    if (!reply) {
      const fallback = [
        '### Reco rapide',
        '• **Landing Page – Starter** dès ~1 090€ (livraison 7–10 j)',
        '• **Site Vitrine – Starter** dès ~2 490€ (livraison 10–14 j)',
        '',
        '### Suite',
        `- [📅 RDV 30 min](${CALENDAR_URL})`,
        `- [✉️ Nous écrire](${CONTACT_URL})`,
      ].join('\n');
      return NextResponse.json({ reply: fallback });
    }

    return NextResponse.json({ reply });
  } catch (err: any) {
    // Normalise l’erreur pour éviter le HTML Next en prod
    const msg =
      err?.message ||
      err?.response?.data?.message ||
      err?.response?.data?.error ||
      'Erreur serveur';
    const status = err?.response?.status || 500;

    // Log minimal (éviter d’exposer clé)
    console.error('Chatbot API error:', {
      status,
      msg: String(msg).slice(0, 500),
    });

    // 504 sur timeouts
    if (/abort|timeout/i.test(String(msg))) {
      return NextResponse.json(
        { error: 'Délai dépassé (réessaie dans un instant)' },
        { status: 504 }
      );
    }
    return NextResponse.json({ error: msg }, { status });
  }
}
