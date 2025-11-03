// app/api/chatbot/route.ts
import { NextResponse } from 'next/server';
import { LLMLayerClient } from 'llmlayer';
import { CATALOG } from '@/lib/catalog';
import { fetchIkovalineContext } from '@/lib/IkovalineKnowledge';

export const runtime = 'nodejs';
// ↓ Baisse la latence si déployé en Europe
export const preferredRegion = 'fra1';
export const maxDuration = 10;

const apiKey = process.env.LLMLAYER_API_KEY;
const client = new LLMLayerClient({ apiKey });

// === URLs fixes pour le CTA ===
const CONTACT_URL = 'https://ikovaline.com/contact';
const CALENDAR_URL =
  'https://calendly.com/florent-ghizzoni/meeting?month=2025-11';
// sous les const CONTACT_URL / CALENDAR_URL
function detectIntent(msg: string) {
  const m = msg
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');

  // Regroupements robustes (orthographes, tirets, fautes)
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

// === Compactage du catalogue pour réduire tokens ===
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

// === Prompt “closer” vendeur (tableaux & objections inclus) ===
const systemPrompt = `
Tu es **IkovalineTalk**, conseiller projet d’Ikovaline (Paris).
Ta mission: répondre **précisément au sujet posé**, puis poser **au plus 1 question** utile qui fait avancer. 
Tu n'es pas un chatbot généraliste : tu es un **conseiller pro orienté résultat & clarté**.

## Style
- Français pro, calme, précis, empathique.
- Réponses **courtes**: 120–180 mots max (sauf si l’utilisateur demande un détail spécifique).
- Listes courtes (3–5 puces), **pas de blabla**, pas d’auto-justification.
- Pas de tableaux sauf si tu compares 2 offres **et** que l’intention n’est pas WARRANTY/TERMS.
- Si info incertaine → dis-le explicitement et pose **1 question ciblée**.

## Règles d’intention (ne les mentionne pas)
- INTENT = WARRANTY ou TERMS
  1) Réponds d'abord aux **garanties / maintenance / SAV / conditions** demandées.
  2) Donne des bornes réalistes: 
     - période de correction de bugs post-livraison,
     - délais de prise en charge (SLA), canaux support,
     - réversibilité du code & accès (Git, livrables),
     - périmètre de garantie (ce qui est inclus/exclu),
     - ce qui n’est **pas** garanti (ex: SEO instantané).
  3) Termine par **1 question** pour clarifier (durée souhaitée, niveau de SLA, périmètre).
  4) **Aucun pitch d’offre** ni CTA.
- INTENT = PRICING / TIMING / GENERAL / ACQUISITION / TECH / INTEGRATIONS / PRIVACY
  1) Résume le besoin en 1 phrase max (reformulation factuelle).
  2) Recommande **1–2 options max** (catégorie + tier) avec **prix “dès ~…€”** + **délais (jours)**.
  3) Liste **2–3 options** pertinentes max (pas de catalogue).
  4) Donne **1 preuve courte** (ex: 60+ projets, 67+ avis).
  5) Si l’utilisateur évoque budget/projet ou semble intéressé → **CTA compact**.

## CTA compact (affiche-le uniquement si l’utilisateur parle budget/projet ou manifeste un intérêt explicite)
- [📅 RDV 30 min](${CALENDAR_URL})
- [✉️ Nous écrire](${CONTACT_URL})

## Garde-fous
- Jamais de jargon interne, stacks détaillées ou secrets d’infra.
- Pas d’inventions sur des politiques/contrats : reste générique, transparent.
- Si la question sort du périmètre Ikovaline: réponds brièvement puis **1 question** pour recentrer.
- **Une seule question de relance**. Si la personne répond, continue de manière incrémentale.
- Tu peux citer des preuves: 60+ projets, 67+ avis, cas clients (Teka Somba, Lynelec, Skillize).

## Format
- Titres courts, listes brèves, phrases simples.
- 120–180 mots, sauf demande explicite d’approfondir.
- Markdown propre (liens cliquables, emphase sobre).

Retiens: **réponds au sujet exact**, question unique de progression, et propose une offre **uniquement** si l’intention s’y prête.
`;

function buildUserQuery(siteContext: string, message: string, intent: string) {
  return `
[INTENTION DÉTECTÉE] ${intent}

[CONTEXTE SITE IKOVALINE — condensé]
${siteContext}

[CATALOGUE (light)]
${JSON.stringify(SLIM_CATALOG)}

[QUESTION DU VISITEUR]
${message}

Consignes:
- Respecte strictement l'intention détectée.
- Si INTENTION = WARRANTY ou TERMS: ne vends pas, réponds aux garanties/SAV/conditions, 1 question max.
- Sinon: réponds court, 1–2 recommandations max, prix “dès ~…€” + délais, 1 preuve courte, CTA compact seulement si approprié.
`;
}

export async function POST(req: Request) {
  try {
    if (!apiKey) {
      return NextResponse.json(
        { error: 'LLMLAYER_API_KEY manquant (Vercel > Project > Env Vars)' },
        { status: 500 }
      );
    }

    const { message } = await req.json();
    if (typeof message !== 'string' || !message.trim()) {
      return NextResponse.json({ error: 'Message invalide' }, { status: 400 });
    }

    // ⚡ Contexte statique ultra-rapide (pas de scrape live)
    const intent = detectIntent(message);
    const siteContext = await fetchIkovalineContext();
    const query = buildUserQuery(siteContext, message, intent);

    // Timeout court pour éviter les blocages
    const ac = new AbortController();
    const kill = setTimeout(() => ac.abort(), 10000);

    // Modèle recommandé : 4o (ratio qualité/vitesse). Passe à gpt-5 si besoin.
    const llmResponse: any = await client.answer({
      query,
      model: 'openai/gpt-4o',
      system_prompt: systemPrompt,
      response_language: 'fr',
      location: 'fr',
      return_sources: false,
      citations: false,

      temperature: 0.2, // plus déterministe
      max_tokens: 420, // plus court
    });

    clearTimeout(kill);

    const reply = (llmResponse?.answer || '').toString().trim();

    // Fallback court si vide
    if (!reply) {
      const fallback = `
### Recommandation rapide

Pour votre besoin, nous conseillons une **Landing Page – Starter** (dès ~1 090€) ou un **Site Vitrine – Starter** (dès ~2 490€), livraison **7–14 jours** selon options.

### Prochaine étape
- [📅 Réserver un créneau de 30 min](${CALENDAR_URL})
- [✉️ Nous écrire](${CONTACT_URL})
`.trim();
      return NextResponse.json({ reply: fallback });
    }

    return NextResponse.json({ reply });
  } catch (err: any) {
    const apiError = err?.response?.data ?? err;
    const msg = apiError?.message || apiError?.error || 'Erreur serveur';
    const status = apiError?.status || err?.response?.status || 500;
    return NextResponse.json({ error: msg }, { status });
  }
}
