/*
  File: lib/catalog/index.ts
  Purpose: Single source of truth for categories, tiers, options (+ calculators)
*/

export type CategoryId =
  | 'landing'
  | 'vitrine'
  | 'ecommerce'
  | 'funnel'
  | 'saas';
export type TierId = 'starter' | 'pro' | 'premium' | 'ultra';
export type OptionKind = 'toggle' | 'radio' | 'qty';

export type OptionDef = {
  id: string;
  label: string;
  price: number; // TTC
  kind: OptionKind;
  group?: string; // for radio grouping (e.g., "videoHero")
  visibleForTiers?: TierId[]; // if omitted => visible for all tiers in the category
  delayDays?: number; // extra effort
  impact?: { trafficPct?: [number, number]; convPct?: [number, number] };
  note?: string; // short tooltip / micro narrative hook
};

export type TierDef = {
  id: TierId;
  name: string;
  price: number; // base price TTC
  baseDelayDays: number;
  includes: string[]; // bullets
};

export type CategoryDef = {
  id: CategoryId;
  name: string;
  tagline: string;
  mockupHue: number; // for gradient hues (nice visuals per category)
  hasAdsBudget: boolean; // show budget slider in estimator
  tiers: TierDef[];
  options: OptionDef[]; // contextual options for this category
};

export type MobileSupplement = OptionDef & { scope: 'mobile' };

// ------------------------
// Catalog Data (faithful to your sheet)
// ------------------------

const landing: CategoryDef = {
  id: 'landing',
  name: 'Landing Page',
  tagline: 'Conversion immédiate, design premium',
  mockupHue: 200,
  hasAdsBudget: true,
  tiers: [
    {
      id: 'starter',
      name: 'Starter',
      price: 1090,
      baseDelayDays: 7,
      includes: [
        '1 page complète responsive',
        'Design premium',
        'Hébergement inclus',
      ],
    },
    {
      id: 'pro',
      name: 'Pro',
      price: 2290,
      baseDelayDays: 5,
      includes: [
        'Sections dynamiques',
        'CMS',
        'Design animé',
        'Optimisation conversion',
      ],
    },
  ],
  options: [
    /* ------------------ Options communes aux deux offres ------------------ */
    {
      id: 'landing_multilingue',
      label: 'Multilingue',
      price: 200,
      kind: 'toggle',
      visibleForTiers: ['starter', 'pro'],
      delayDays: 2,
      impact: { trafficPct: [2, 6] },
      note: 'FR/EN recommandé si 2 marchés',
    },
    {
      id: 'landing_reseaux',
      label: 'Mise en avant sur nos réseaux',
      price: 90,
      kind: 'toggle',
      visibleForTiers: ['starter', 'pro'],
      delayDays: 0,
      note: 'Post Instagram + Story LinkedIn Ikovaline avec visuel et mention client',
    },
    {
      id: 'landing_kitcom',
      label: 'Kit communication lancement',
      price: 70,
      kind: 'toggle',
      visibleForTiers: ['starter', 'pro'],
      delayDays: 1,
      note: '3 visuels + 1 texte post prêts à publier sur ses réseaux',
    },
    {
      id: 'landing_fasttrack',
      label: 'Accès prioritaire / Fast-track production',
      price: 250,
      kind: 'toggle',
      visibleForTiers: ['starter', 'pro'],
      delayDays: -3,
      note: 'Livraison prioritaire – projet traité en avance',
    },

    /* ------------------ Starter spécifiques ------------------ */
    {
      id: 'landing_maint6',
      label: 'Maintenance 6 mois',
      price: 190,
      kind: 'toggle',
      visibleForTiers: ['starter'],
      delayDays: 0,
      note: 'Mises à jour et petites corrections incluses',
    },

    /* ------------------ Pro spécifiques ------------------ */
    {
      id: 'landing_video_pro',
      label: 'Vidéo Hero pro 30s',
      price: 1090,
      kind: 'radio',
      group: 'videoHero',
      visibleForTiers: ['pro'],
      delayDays: 4,
      impact: { convPct: [2, 6] },
      note: 'Impact immédiat sur le haut de page',
    },
    {
      id: 'landing_video_client',
      label: 'Intégration vidéo fournie',
      price: 50,
      kind: 'radio',
      group: 'videoHero',
      visibleForTiers: ['pro'],
      delayDays: 0,
      note: 'On intègre votre vidéo existante proprement',
    },
    {
      id: 'landing_ab',
      label: 'A/B testing conversion',
      price: 300,
      kind: 'toggle',
      visibleForTiers: ['pro'],
      delayDays: 3,
      impact: { convPct: [3, 8] },
      note: 'Itérations ciblées → taux de conversion augmenté',
    },
    {
      id: 'landing_api',
      label: 'Intégration API (CRM / newsletter)',
      price: 250,
      kind: 'toggle',
      visibleForTiers: ['pro'],
      delayDays: 2,
      note: 'Reliez vos outils favoris (CRM, emailing, etc.)',
    },
    {
      id: 'landing_maint12',
      label: 'Maintenance annuelle',
      price: 290,
      kind: 'toggle',
      visibleForTiers: ['pro'],
      delayDays: 0,
      note: 'Suivi et maintenance technique sur 12 mois',
    },
  ],
};
const vitrine: CategoryDef = {
  id: 'vitrine',
  name: 'Site Vitrine',
  tagline: 'Présence forte, crédibilité & SEO',
  mockupHue: 280,
  hasAdsBudget: true,
  tiers: [
    {
      id: 'starter',
      name: 'Starter (5 pages)',
      price: 2490,
      baseDelayDays: 14,
      includes: [
        '5 pages (Accueil, À propos, Services, Contact, Mentions)',
        'SEO basique',
      ],
    },
    {
      id: 'premium',
      name: 'Premium (10 pages)',
      price: 5490,
      baseDelayDays: 21,
      includes: [
        'CMS intégré',
        'Design dynamique',
        'SEO optimisé',
        'Hébergement inclus',
      ],
    },
    {
      id: 'ultra',
      name: 'Ultra (illimité)',
      price: 10990,
      baseDelayDays: 35,
      includes: [
        'UX/UI sur mesure',
        'Animations avancées',
        'Intégrations API',
        'Top performances',
        'Espace admin',
        'Multisite / sous-domaines',
        'Optimisation Core Web Vitals',
      ],
    },
  ],
  options: [
    /* ============================== STARTER ============================== */
    {
      id: 'vitrine_multi',
      label: 'Multilingue',
      price: 350,
      kind: 'toggle',
      visibleForTiers: ['starter'],
      delayDays: 3,
      impact: { trafficPct: [3, 8] },
      note: 'FR/EN ou autre combinaison',
    },
    {
      id: 'vitrine_maint12_starter',
      label: 'Maintenance 12 mois',
      price: 500,
      kind: 'toggle',
      visibleForTiers: ['starter'],
      delayDays: 0,
      note: 'Mises à jour techniques, sécurité, petites corrections',
    },
    {
      id: 'vitrine_reseaux',
      label: 'Mise en avant sur nos réseaux',
      price: 90,
      kind: 'toggle',
      visibleForTiers: ['starter', 'premium', 'ultra'],
      delayDays: 0,
      note: 'Post Instagram + Story LinkedIn Ikovaline avec visuel du site et mention du client',
    },
    {
      id: 'vitrine_kitcom',
      label: 'Kit communication lancement',
      price: 70,
      kind: 'toggle',
      visibleForTiers: ['starter', 'premium', 'ultra'],
      delayDays: 1,
      note: '3 visuels + 1 texte post prêts à publier sur vos réseaux',
    },
    {
      id: 'vitrine_fasttrack',
      label: 'Accès prioritaire / Fast-track production',
      price: 250,
      kind: 'toggle',
      visibleForTiers: ['starter', 'premium', 'ultra'],
      delayDays: -3,
      note: 'Livraison prioritaire — projet traité en avance',
    },

    /* ============================== PREMIUM ============================== */
    {
      id: 'vitrine_brand',
      label: 'Refonte identité visuelle',
      price: 650,
      kind: 'toggle',
      visibleForTiers: ['starter', 'premium'],
      delayDays: 4,
      impact: { convPct: [2, 6] },
      note: 'Logo, palette, typographies',
    },
    {
      id: 'vitrine_ssl_pro',
      label: 'Sécurisation SSL pro',
      price: 190,
      kind: 'toggle',
      visibleForTiers: ['premium'],
      delayDays: 0,
      note: 'Certificat et configuration renforcée',
    },
    {
      id: 'vitrine_maint12_premium',
      label: 'Maintenance 12 mois',
      price: 790,
      kind: 'toggle',
      visibleForTiers: ['premium'],
      delayDays: 0,
      note: 'Espace admin, multisite/sous-domaines, Core Web Vitals, suivi technique',
    },

    /* ============================== ULTRA ============================== */
    {
      id: 'vitrine_anim3d',
      label: 'Animation 3D / vidéo interactive',
      price: 800,
      kind: 'toggle',
      visibleForTiers: ['ultra'],
      delayDays: 5,
      impact: { convPct: [2, 6] },
      note: 'Expérience immersive premium',
    },
    {
      id: 'vitrine_maint_ultra',
      label: 'Maintenance Premium',
      price: 1090,
      kind: 'toggle',
      visibleForTiers: ['ultra'],
      delayDays: 0,
      note: 'Support prioritaire & mises à jour continues',
    },
  ],
};

const ecommerce: CategoryDef = {
  id: 'ecommerce',
  name: 'E-commerce',
  tagline: 'Vendre en ligne avec confiance et vitesse',
  mockupHue: 160,
  hasAdsBudget: true,
  tiers: [
    {
      id: 'starter',
      name: 'Starter (20 produits)',
      price: 4990,
      baseDelayDays: 21,
      includes: ['Stripe/PayPal', 'Panier', 'Stock basique'],
    },
    {
      id: 'premium',
      name: 'Premium (100 produits)',
      price: 7990,
      baseDelayDays: 28,
      includes: ['Dashboard complet', 'SEO & analytics'],
    },
    {
      id: 'ultra',
      name: 'Ultra (+ sur-mesure)',
      price: 15990,
      baseDelayDays: 45,
      includes: [
        'Tunnel de vente avancé',
        'Animations haut de gamme',
        'Sécurité renforcée',
      ],
    },
  ],
  options: [
    /* ============================== STARTER ============================== */
    {
      id: 'ecom_ship',
      label: 'Livraison automatisée',
      price: 550,
      kind: 'toggle',
      visibleForTiers: ['starter'],
      delayDays: 3,
      note: 'Calcul auto des frais, choix transporteur au checkout, emails de suivi',
    },
    {
      id: 'ecom_email',
      label: 'Email marketing',
      price: 300,
      kind: 'toggle',
      visibleForTiers: ['starter'],
      delayDays: 2,
      impact: { convPct: [1, 3] },
      note: 'Relance panier abandonné + emails post-achat',
    },
    {
      id: 'ecom_maint12',
      label: 'Maintenance 12 mois',
      price: 890,
      kind: 'toggle',
      visibleForTiers: ['starter'],
      delayDays: 0,
      note: 'Mises à jour techniques, sécurité, corrections',
    },

    /* ==================== OPTIONS COMMUNES (visibilité / launch) ==================== */
    {
      id: 'ecom_reseaux',
      label: 'Mise en avant sur nos réseaux',
      price: 90,
      kind: 'toggle',
      visibleForTiers: ['starter', 'premium', 'ultra'],
      delayDays: 0,
      note: 'Post Instagram + Story LinkedIn Ikovaline avec visuel du shop',
    },
    {
      id: 'ecom_kitcom',
      label: 'Kit communication lancement',
      price: 70,
      kind: 'toggle',
      visibleForTiers: ['starter', 'premium', 'ultra'],
      delayDays: 1,
      note: '3 visuels + 1 texte post prêts à publier “La boutique est en ligne”',
    },
    {
      id: 'ecom_fasttrack',
      label: 'Accès prioritaire / Fast-track production',
      price: 250,
      kind: 'toggle',
      visibleForTiers: ['starter', 'premium', 'ultra'],
      delayDays: -3,
      note: 'Projet prioritaire — livraison plus rapide',
    },

    /* ============================== PREMIUM ============================== */
    {
      id: 'ecom_crm',
      label: 'CRM / ERP connecté',
      price: 600,
      kind: 'toggle',
      visibleForTiers: ['premium'],
      delayDays: 4,
      note: "On pousse automatiquement les commandes dans l'outil interne du client",
    },
    {
      id: 'ecom_auto_marketing',
      label: 'Automatisation marketing',
      price: 500,
      kind: 'toggle',
      visibleForTiers: ['premium'],
      delayDays: 3,
      note: 'Scénarios panier abandonné, réductions ciblées, suivi client',
    },
    {
      id: 'ecom_maint_ann',
      label: 'Maintenance annuelle',
      price: 1500,
      kind: 'toggle',
      visibleForTiers: ['premium'],
      delayDays: 0,
      note: 'Support technique continu, évolutions fonctionnelles, suivi business',
    },

    /* ============================== ULTRA ============================== */
    {
      id: 'ecom_maint_ultra',
      label: 'Maintenance Premium',
      price: 3090,
      kind: 'toggle',
      visibleForTiers: ['ultra'],
      delayDays: 0,
      note: 'Headless Shopify/Next.js, tunnel IA, chatbot support 24/7, SEO/SEA acquisition, support prioritaire',
    },
  ],
};

const funnel: CategoryDef = {
  id: 'funnel',
  name: 'Tunnel de Vente',
  tagline: 'Du clic au paiement, sans friction',
  mockupHue: 20,
  hasAdsBudget: true,
  tiers: [
    {
      id: 'starter',
      name: 'Starter',
      price: 1990,
      baseDelayDays: 10,
      includes: [
        'Landing + page de paiement',
        'Intégration Stripe',
        'Responsive',
        'Séquence email auto incluse',
        'Page post-achat incluse',
        'Upsell automatique inclus',
      ],
    },
    {
      id: 'premium',
      name: 'Premium',
      price: 3990,
      baseDelayDays: 18,
      includes: [
        'Funnel complet (capture → paiement → remerciement)',
        'CRM inclus',
        'Upsell & downsell logiques inclus',
        'Analytics conversion inclus',
        'Publicité Meta/Google configurée incluse',
      ],
    },
    {
      id: 'ultra',
      name: 'Ultra',
      price: 5990,
      baseDelayDays: 24,
      includes: [
        'Tunnel multi-offres',
        'Tracking avancé',
        'Animations personnalisées',
        'Funnel IA personnalisé inclus',
        'Séquence 5 emails incluse',
      ],
    },
  ],
  options: [
    /* ========================= STARTER ========================= */
    {
      id: 'fun_maint_starter',
      label: 'Maintenance',
      price: 690,
      kind: 'toggle',
      visibleForTiers: ['starter'],
      delayDays: 0,
      note: 'Mises à jour, corrections et accompagnement post-lancement (12 mois)',
    },

    /* ========================= PREMIUM ========================= */
    {
      id: 'fun_email_auto',
      label: 'Email automation CRM',
      price: 400,
      kind: 'toggle',
      visibleForTiers: ['premium'],
      delayDays: 2,
      note: 'Envoi automatique d’emails selon le comportement des visiteurs (achat, clic, abandon panier)',
    },
    {
      id: 'fun_maint_premium',
      label: 'Maintenance annuelle',
      price: 1090,
      kind: 'toggle',
      visibleForTiers: ['premium'],
      delayDays: 0,
      note: 'Suivi technique, mises à jour fonctionnelles et assistance sur 12 mois',
    },

    /* ========================= ULTRA ========================= */
    {
      id: 'fun_ab_adv',
      label: 'A/B testing avancé',
      price: 400,
      kind: 'toggle',
      visibleForTiers: ['ultra'],
      delayDays: 3,
      note: 'Test de plusieurs variantes du tunnel pour maximiser la conversion',
    },
    {
      id: 'fun_webhooks',
      label: 'Webhook / API CRM externe',
      price: 300,
      kind: 'toggle',
      visibleForTiers: ['ultra'],
      delayDays: 2,
      note: 'Connexion automatique aux CRM externes (HubSpot, Airtable, etc.)',
    },
    {
      id: 'fun_maint_ultra',
      label: 'Maintenance Premium',
      price: 1590,
      kind: 'toggle',
      visibleForTiers: ['ultra'],
      delayDays: 0,
      note: 'Accompagnement prioritaire, évolutions continues et support technique complet',
    },

    /* ========================= COMMUNES (visibilité / lancement) ========================= */
    {
      id: 'fun_reseaux',
      label: 'Mise en avant sur nos réseaux',
      price: 90,
      kind: 'toggle',
      visibleForTiers: ['starter', 'premium', 'ultra'],
      delayDays: 0,
      note: 'Post Instagram + Story LinkedIn Ikovaline avec visuel du tunnel et mention client',
    },
    {
      id: 'fun_kitcom',
      label: 'Kit communication lancement',
      price: 70,
      kind: 'toggle',
      visibleForTiers: ['starter', 'premium', 'ultra'],
      delayDays: 1,
      note: '3 visuels + 1 texte post prêts à publier pour annoncer le lancement',
    },
    {
      id: 'fun_fasttrack',
      label: 'Accès prioritaire / Fast-track production',
      price: 250,
      kind: 'toggle',
      visibleForTiers: ['starter', 'premium', 'ultra'],
      delayDays: -3,
      note: 'Priorité de production et livraison accélérée du tunnel de vente',
    },
  ],
};

const saas: CategoryDef = {
  id: 'saas',
  name: 'Application / SaaS',
  tagline: 'Produit digital, prêt à scaler',
  mockupHue: 320,
  hasAdsBudget: true,
  tiers: [
    {
      id: 'starter',
      name: 'Starter',
      price: 8990,
      baseDelayDays: 30,
      includes: [
        'Authentification utilisateur',
        'Paiements Stripe intégrés (one-shot ou abonnement)',
        'Dashboard principal',
        'Base de données Supabase connectée',
        'Design Next.js responsive',
      ],
    },
    {
      id: 'premium',
      name: 'Premium',
      price: 14990,
      baseDelayDays: 45,
      includes: [
        'Auth avec rôles & permissions',
        'Dashboard pro avec analytics',
        'Webhooks avancés (paiement, CRM, automatisations)',
        'Abonnements récurrents (Stripe Billing)',
        'Notifications temps réel',
        'Intégration API externe (CRM / ERP / outil interne)',
      ],
    },
    {
      id: 'ultra',
      name: 'Ultra',
      price: 24990,
      baseDelayDays: 75,
      includes: [
        'Multi-tenant (multi-comptes / multi-entreprises)',
        'Back-office complet',
        'Webhooks & API internes intégrés',
        'Dashboard analytics personnalisé',
        'Développement full sur mesure prêt à scaler',
      ],
    },
  ],
  options: [
    /* ============================== STARTER ============================== */
    {
      id: 'saas_admin_plus',
      label: 'Espace admin étendu',
      price: 490,
      kind: 'toggle',
      visibleForTiers: ['starter'],
      delayDays: 3,
      note: 'Gestion avancée des utilisateurs, rôles et contenus',
    },
    {
      id: 'saas_doc',
      label: 'Documentation technique',
      price: 200,
      kind: 'toggle',
      visibleForTiers: ['starter'],
      delayDays: 1,
      note: 'Livret technique + endpoints / logique d’accès',
    },
    {
      id: 'saas_maint_starter',
      label: 'Maintenance annuelle',
      price: 2180,
      kind: 'toggle',
      visibleForTiers: ['starter'],
      delayDays: 0,
      note: 'Suivi technique, correctifs et mises à jour pendant 12 mois',
    },

    /* ============================== PREMIUM ============================== */
    {
      id: 'saas_mobile_addon',
      label: 'App mobile iOS / Android',
      price: 2490,
      kind: 'toggle',
      visibleForTiers: ['premium'],
      delayDays: 10,
      note: 'Version mobile connectée à votre back-end SaaS',
    },
    {
      id: 'saas_branding',
      label: 'Branding digital complet',
      price: 400,
      kind: 'toggle',
      visibleForTiers: ['premium'],
      delayDays: 3,
      note: 'Pack d’identité digitale cohérente (icônes, couleurs, assets réseaux). Hors logo/police.',
    },
    {
      id: 'saas_maint_premium',
      label: 'Maintenance annuelle',
      price: 3180,
      kind: 'toggle',
      visibleForTiers: ['premium'],
      delayDays: 0,
      note: 'Évolutions fonctionnelles, support prioritaire, sécurité continue (12 mois)',
    },

    /* ============================== ULTRA ============================== */
    {
      id: 'saas_mobile_full',
      label: 'App mobile complète (iOS + Android)',
      price: 3990,
      kind: 'toggle',
      visibleForTiers: ['ultra'],
      delayDays: 15,
      note: 'Application mobile complète reliée au SaaS',
    },
    {
      id: 'saas_maint_ultra',
      label: 'Maintenance Premium',
      price: 4980,
      kind: 'toggle',
      visibleForTiers: ['ultra'],
      delayDays: 0,
      note: 'Support prioritaire, sécurité renforcée, monitoring et évolutions en continu',
    },

    /* ============================== COMMUNES ============================== */
    {
      id: 'saas_reseaux',
      label: 'Mise en avant sur nos réseaux',
      price: 90,
      kind: 'toggle',
      visibleForTiers: ['starter', 'premium', 'ultra'],
      delayDays: 0,
      note: 'Post Instagram + Story LinkedIn Ikovaline avec visuel du produit',
    },
    {
      id: 'saas_kitcom',
      label: 'Kit communication lancement',
      price: 70,
      kind: 'toggle',
      visibleForTiers: ['starter', 'premium', 'ultra'],
      delayDays: 1,
      note: '3 visuels + 1 texte prêt à publier pour annoncer le lancement',
    },
    {
      id: 'saas_fasttrack',
      label: 'Accès prioritaire / Fast-track production',
      price: 250,
      kind: 'toggle',
      visibleForTiers: ['starter', 'premium', 'ultra'],
      delayDays: -5,
      note: 'Priorité de production et livraison accélérée',
    },
  ],
};

export const mobileSupplements: MobileSupplement[] = [
  {
    scope: 'mobile',
    id: 'sup_pwa',
    label: 'Web-App (PWA)',
    price: 490,
    kind: 'toggle',
    delayDays: 2,
    note: 'Installation + manifest + offline light',
  },
  {
    scope: 'mobile',
    id: 'sup_ios',
    label: 'App iOS',
    price: 1490,
    kind: 'toggle',
    delayDays: 7,
  },
  {
    scope: 'mobile',
    id: 'sup_android',
    label: 'App Android',
    price: 1490,
    kind: 'toggle',
    delayDays: 7,
  },
  {
    scope: 'mobile',
    id: 'sup_duo_std',
    label: 'Duo iOS + Android ',
    price: 2490,
    kind: 'toggle',
    delayDays: 12,
  },
];

export const CATALOG: Record<CategoryId, CategoryDef> = {
  landing,
  vitrine,
  ecommerce,
  funnel,
  saas,
};

// ------------------------
// Selection state helpers
// ------------------------
export type SelectionState = {
  toggles: Set<string>;
  radios: Record<string, string | undefined>; // group -> optionId
  qty: Record<string, number | undefined>; // optionId -> qty (>=1)
};

export const emptySelection = (): SelectionState => ({
  toggles: new Set(),
  radios: {},
  qty: {},
});

export function isOptionVisibleForTier(opt: OptionDef, tier: TierId) {
  return !opt.visibleForTiers || opt.visibleForTiers.includes(tier);
}

export function getVisibleOptions(cat: CategoryDef, tier: TierId) {
  return cat.options.filter((o) => isOptionVisibleForTier(o, tier));
}

export function isOptionSelected(sel: SelectionState, opt: OptionDef): boolean {
  if (opt.kind === 'toggle') return sel.toggles.has(opt.id);
  if (opt.kind === 'radio' && opt.group)
    return sel.radios[opt.group] === opt.id;
  if (opt.kind === 'qty') return (sel.qty[opt.id] ?? 0) > 0;
  return false;
}

// ------------------------
// Pricing & delay calculations
// ------------------------
export function calcTotals(
  cat: CategoryDef,
  tier: TierDef,
  sel: SelectionState,
  includeMobile: MobileSupplement[],
  adsBudget: number
) {
  const optsVisible = getVisibleOptions(cat, tier.id);
  let optionsTotal = 0;
  let delayExtra = 0;

  const add = (opt: OptionDef, qty = 1) => {
    optionsTotal += opt.price * qty;
    delayExtra += opt.delayDays ? opt.delayDays * qty : 0;
  };

  // category options
  for (const o of optsVisible) {
    if (o.kind === 'toggle' && sel.toggles.has(o.id)) add(o);
    if (o.kind === 'radio' && o.group && sel.radios[o.group] === o.id) add(o);
    if (o.kind === 'qty') {
      const q = Math.max(0, sel.qty[o.id] ?? 0);
      if (q > 0) add(o, q);
    }
  }

  // mobile supplements
  for (const m of includeMobile) {
    if (m.kind === 'toggle' && sel.toggles.has(m.id)) add(m);
    if (m.kind === 'radio' && m.group && sel.radios[m.group] === m.id) add(m);
    if (m.kind === 'qty') {
      const q = Math.max(0, sel.qty[m.id] ?? 0);
      if (q > 0) add(m, q);
    }
  }

  const base = tier.price;
  const grandTotal = base + optionsTotal;
  const delayDays = tier.baseDelayDays + delayExtra;

  return { base, optionsTotal, grandTotal, delayDays };
}

// ------------------------
// KPI calculations (simple but credible)
// ------------------------
export type KPI = {
  traffic: [number, number];
  convRate: [number, number];
  leads: [number, number];
};

const clamp = (n: number, a: number, b: number) => Math.max(a, Math.min(b, n));

export function computeKPI(
  catId: CategoryId,
  tier: TierDef,
  sel: SelectionState,
  adsBudget: number
): KPI {
  // Baselines by category
  let traffic: [number, number];
  let conv: [number, number];

  switch (catId) {
    case 'landing':
      traffic = [150, 600];
      conv = [1.5, 3.0];
      break;
    case 'vitrine':
      traffic = [200, 600];
      conv = [0.8, 2.0];
      break;
    case 'ecommerce':
      traffic = [300, 1000];
      conv = [1.0, 3.0];
      break;
    case 'funnel':
      traffic = [120, 400];
      conv = [2.0, 8.0];
      break;
    case 'saas':
      traffic = [150, 500];
      conv = [0.5, 2.0];
      break;
    default:
      traffic = [150, 500];
      conv = [1.0, 2.0];
  }

  // Options impact (conv/traffic) from category options
  const applyImpact = (opt: OptionDef, qty = 1) => {
    if (!opt.impact) return;
    const { trafficPct, convPct } = opt.impact;
    if (trafficPct) {
      traffic = [
        Math.round(traffic[0] * (1 + (trafficPct[0] / 100) * qty)),
        Math.round(traffic[1] * (1 + (trafficPct[1] / 100) * qty)),
      ];
    }
    if (convPct) {
      conv = [
        +(conv[0] * (1 + (convPct[0] / 100) * qty)).toFixed(2),
        +(conv[1] * (1 + (convPct[1] / 100) * qty)).toFixed(2),
      ];
    }
  };

  const cat = CATALOG[catId];
  const opts = getVisibleOptions(cat, tier.id);

  for (const o of opts) {
    if (o.kind === 'toggle' && sel.toggles.has(o.id)) applyImpact(o);
    if (o.kind === 'radio' && o.group && sel.radios[o.group] === o.id)
      applyImpact(o);
    if (o.kind === 'qty') {
      const q = Math.max(0, sel.qty[o.id] ?? 0);
      if (q > 0) applyImpact(o, q);
    }
  }

  // Ads budget influence for categories where it matters
  if (CATALOG[catId].hasAdsBudget && adsBudget > 0) {
    const minAdd = Math.round(adsBudget / 3);
    const maxAdd = Math.round(adsBudget / 1);
    traffic = [traffic[0] + minAdd, traffic[1] + maxAdd];
  }

  // Clamp sensible ranges per category
  const convMinMax: Record<CategoryId, [number, number]> = {
    landing: [0.8, 4.5],
    vitrine: [0.6, 3.0],
    ecommerce: [0.8, 4.0],
    funnel: [2.0, 10.0],
    saas: [0.3, 3.0],
  } as const;
  const [cmin, cmax] = convMinMax[catId];
  conv = [
    clamp(+conv[0].toFixed(2), cmin, cmax),
    clamp(+conv[1].toFixed(2), cmin, cmax),
  ];

  const leads: [number, number] = [
    Math.round((traffic[0] * conv[0]) / 100),
    Math.round((traffic[1] * conv[1]) / 100),
  ];

  return { traffic, convRate: conv, leads };
}

// Micro-narrative generator
export function narrative(catId: CategoryId, sel: SelectionState): string[] {
  const lines: string[] = [];
  const has = (id: string) =>
    sel.toggles.has(id) || Object.values(sel.radios).includes(id);

  if (catId === 'landing') {
    if (has('landing_ab'))
      lines.push(
        'A/B testing : itérations ciblées → meilleur taux de conversion.'
      );
    if (has('landing_seo_full'))
      lines.push(
        'SEO complet : base saine, visibilité qui progresse mois après mois.'
      );
    if (has('landing_multi'))
      lines.push('Multilingue : pertinent si vous ciblez au moins 2 marchés.');
  }
  if (catId === 'vitrine') {
    if (has('vitrine_blog'))
      lines.push(
        'Blog SEO : trafic organique durable, intention utilisateur plus forte.'
      );
    if (has('vitrine_brand'))
      lines.push(
        'Refonte identité : crédibilité et cohérence, impact conversion.'
      );
  }
  if (catId === 'ecommerce') {
    if (has('ecom_upsell'))
      lines.push('Upsell/Cross-sell : panier moyen ↑ et LTV plus élevée.');
    if (has('ecom_seo'))
      lines.push('SEO e-commerce : fiches produits + catégories structurées.');
  }
  if (catId === 'funnel') {
    if (has('fun_copy'))
      lines.push(
        'Copywriting : promesse claire, bénéfices concrets, objections levées.'
      );
    if (has('fun_ads_setup'))
      lines.push('Campagnes configurées : trafic qualifié dès le J1.');
  }
  if (catId === 'saas') {
    if (has('saas_realtime'))
      lines.push('Temps réel : rétention et valeur perçue ↑.');
    if (has('saas_doc'))
      lines.push('Doc technique : handover plus fluide pour vos équipes.');
  }

  return lines;
}
