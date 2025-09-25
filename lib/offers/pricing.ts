// lib/offers/pricing.ts
export type OfferTierId = 'essential' | 'boost' | 'luxe';

export type OptionId =
  | 'admin'
  | 'ssl'
  | 'backups'
  | 'speed'
  | 'analytics'
  | 'support12'
  | 'seo'
  | 'uxui'
  | 'landing'
  | 'social';

export type OfferTier = {
  id: OfferTierId;
  name: string;
  tagline: string;
  basePrice: number; // TTC pour Essentiel et Boost; 0 => "Sur devis" pour Luxe côté UI
  baseDelayDays: number;
  bullets: string[];
  ribbon?: 'popular' | 'new' | 'hot' | 'signature';
  description?: string;
  maintenance?: string;
  showConfigurator?: boolean;
};

export type OptionDef = {
  id: OptionId;
  label: string;
  price: number;
  highlight?: boolean;
  short?: string;
  impact: {
    trafficPct?: [number, number];
    convPct?: [number, number];
  };
  tooltip?: string[];
};

export const OFFER_TIERS: OfferTier[] = [
  {
    id: 'essential',
    name: 'Essentiel',
    tagline: 'Socle pro, prêt à être trouvé',
    basePrice: 1200,
    baseDelayDays: 10,
    bullets: [
      '1–5 pages responsives (Home, Services, À-propos, Contact…)',
      'Design propre + sécurité (SSL), accessibilité & RGPD de base',
      'Formulaire de contact + redirection e-mail',
      'Réseaux sociaux (liens/OG), suivi basique (pixels/tags)',
      'Hébergement + domaine (configuration incluse)',
      'Mini-stratégie web (structure, CTA, pages clés)',
    ],
    description:
      'Présence crédible rapidement : identité claire, pages essentielles et fondations techniques saines pour évoluer ensuite.',
    maintenance:
      'Maintenance conseillée : 500€/an ou 42€/mois (MÀJ, sauvegardes, petites retouches).',
    showConfigurator: false,
  },
  {
    id: 'boost',
    name: 'Boost',
    tagline: 'Accélérer la croissance et les conversions',
    basePrice: 4000,
    baseDelayDays: 30,
    bullets: [
      'Tout Essentiel + 5–10 pages (+1 500€ indicatif)',
      'Support 12 mois (+1 000€) & formation',
      'Formulaires pro (devis, RDV, étapes) (+300€)',
      'Maintenance 1 an incluse puis ~1 000€/an HT',
      'Stratégie web/SEO initiale incluse (maillage, contenus cibles)',
    ],
    description:
      'Plus de pages orientées SEO, parcours mieux cadrés, mesure et optimisation continue pour convertir davantage.',
    ribbon: 'popular',
    showConfigurator: true,
  },
  {
    id: 'luxe',
    name: 'Sur-Mesure Luxe',
    tagline: 'Haute couture digitale (brand, 3D, motion, e-commerce…)',
    basePrice: 0, // 👈 affichage "Sur devis" en UI
    baseDelayDays: 90,
    bullets: [
      'Ateliers, mindmap avancée & prototype hi-fi',
      'UX/UI premium, motion design, 3D & vidéos 4K',
      'Copywriting expert & narration de marque',
      'Parcours omnicanal (site, e-mail, social, CRM)',
      'E-commerce, paiements multi-systèmes, B2B/B2C',
      'AR/VR, espace VIP, intégrations spécifiques',
    ],
    description:
      'Projet signature totalement personnalisé : identité, expérience, contenus et intégrations complexes. Co-conception et itérations jusqu’à l’excellence.',
    maintenance: 'Maintenance & évolutions : sur devis (selon périmètre/SLAs).',
    ribbon: 'signature',
    showConfigurator: false,
  },
];

export const OPTION_DEFS: OptionDef[] = [
  {
    id: 'admin',
    label: 'Espace Admin',
    price: 1500,
    short: 'Gérez votre contenu',
    impact: { convPct: [2, 6] },
    tooltip: ['CMS simple', 'Rôles & permissions', 'Catalogue/actus'],
  },
  {
    id: 'ssl',
    label: 'SSL avancé',
    price: 250,
    short: 'Confiance & SEO tech',
    impact: { trafficPct: [0, 1], convPct: [1, 2] },
    tooltip: ['HSTS/PFS', 'Best practices'],
  },
  {
    id: 'backups',
    label: 'Sauvegardes',
    price: 50,
    short: 'Restauration rapide',
    impact: { convPct: [0, 1] },
    tooltip: ['Snapshots auto', 'Rétention', 'PRA'],
  },
  {
    id: 'speed',
    label: 'Optimisation vitesse',
    price: 150,
    highlight: true,
    short: 'INP/LCP meilleurs',
    impact: { trafficPct: [1, 4], convPct: [3, 12] },
    tooltip: ['Images/CDN', 'Code-split', 'Lighthouse'],
  },
  {
    id: 'analytics',
    label: 'Analytics détaillés',
    price: 200,
    short: 'Pilotage data-driven',
    impact: { convPct: [1, 4] },
    tooltip: ['Dashboard KPI', 'Funnels', 'Attribution'],
  },
  {
    id: 'support12',
    label: 'Support 12 mois',
    price: 1000,
    short: 'Accompagnement',
    impact: { trafficPct: [0, 2], convPct: [1, 4] },
    tooltip: ['Priorité tickets', 'Évolutions légères'],
  },
  {
    id: 'seo',
    label: 'SEO inclus',
    price: 2000,
    highlight: true,
    short: 'Visibilité durable',
    impact: { trafficPct: [20, 80], convPct: [2, 8] },
    tooltip: ['On-page', 'Maillage', '3–6 mois'],
  },
  {
    id: 'uxui',
    label: 'UX/UI poussées',
    price: 2000,
    highlight: true,
    short: 'Confiance/Parcours',
    impact: { trafficPct: [0, 4], convPct: [10, 35] },
    tooltip: ['Parcours', 'Preuves', 'Micro-interactions'],
  },
  {
    id: 'landing',
    label: 'Landing pub',
    price: 500,
    short: 'Perf paid-ads',
    impact: { trafficPct: [4, 20], convPct: [3, 12] },
    tooltip: ['Headline', 'Above-the-fold', 'A/B test'],
  },
  {
    id: 'social',
    label: 'Intégration réseaux',
    price: 50,
    short: 'Comptes & flux',
    impact: { trafficPct: [1, 4], convPct: [0, 2] },
    tooltip: ['OG/Twitter cards', 'Pixel/Tag'],
  },
];
