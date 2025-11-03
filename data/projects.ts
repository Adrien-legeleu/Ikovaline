export type Project = {
  id: string;
  titre: string; // affiché sous l'image ("Lynelec", "Teka Somba", ...)
  services: string[]; // affiché sous le titre ("Marketplace", "Stripe", etc.)
  coverImage: string; // mockup / screenshot
  lien?: string; // URL publique du projet (ouvre _blank)
};

/* =================== VERSION FR =================== */
export const PROJECTS_FR: Project[] = [
  {
    id: 'lynelec-2025',
    titre: 'Lynelec',
    services: ['Site vitrine B2B', 'SEO', 'Catalogue produits'],
    coverImage: '/images/lynelec.vercel.app_(Nest Hub Max).png',
    lien: 'https://lynelec.vercel.app',
  },
  {
    id: 'teka-somba-2025',
    titre: 'Teka Somba',
    services: ['Marketplace', 'Paiement Stripe', 'Annonces géolocalisées'],
    coverImage: '/images/tekasomba.png',
    lien: 'https://teka-somba.com/',
  },
  {
    id: 'skillize-2025',
    titre: 'Skillize',
    services: ['SaaS', 'Multi-tenant', 'Onboarding B2B'],
    coverImage: '/images/skilize.png',
    lien: 'https://skillize.fr/',
  },
  {
    id: 'sophie-deneriaz-2025',
    titre: 'Sophie Dénériaz',
    services: ['Branding', 'SEO local', 'Site bien-être'],
    coverImage: '/images/sophie.png',
    lien: 'https://sophiedeneriaz.ch/',
  },
  {
    id: 'ty-klouyou-2025',
    titre: 'Ty Klouyou',
    services: ['Site hébergement', 'Immersif mobile'],
    coverImage: '/images/villa-tyklouyou.netlify.app_(Nest Hub Max).png',
    lien: 'https://villa-tyklouyou.netlify.app/',
  },
  {
    id: 'sturmayr-2025',
    titre: 'STURMAYR',
    services: ['Prise de rdv', 'UI/UX salon', 'Vitrine haut de gamme'],
    coverImage: '/images/sturmayr.netlify.app_(Nest Hub Max).png',
    lien: 'https://sturmayr.netlify.app/',
  },
  {
    id: 'or-lumiere-2025',
    titre: 'Or & Lumière',
    services: ['E-commerce', 'Luxe', 'Mise en avant produits'],
    coverImage: '/images/orlumiere.netlify.app_(Nest Hub Max).png',
    lien: 'https://orlumiere.netlify.app/',
  },
  {
    id: 'sushi-food-2025',
    titre: 'Sushi Food',
    services: ['Resto', 'Réservation', 'Identité visuelle'],
    coverImage: '/images/sushifood.netlify.app_(Nest Hub Max).png',
    lien: 'https://sushifood.netlify.app/',
  },

  /* ======== NOUVEAUX PROJETS IMPORTÉS / CAPTURES ======== */

  {
    id: 'artea-audit',
    titre: 'Artea Audit',
    services: ['Site vitrine', 'Cabinet', 'Confiance / crédibilité'],
    coverImage: '/images/artea-audit.com_(Nest Hub Max).png',
    lien: 'https://artea-audit.com', // mets-le si t’en as un public
  },
  {
    id: 'inovaya',
    titre: 'Inovaya',
    services: ['Site corporate', 'Tech', 'Innovation'],
    coverImage: '/images/inovaya.com_(Nest Hub Max).png',
    lien: 'https://inovaya.com',
  },

  {
    id: 'musee-plaisance',
    titre: 'Musée de la Plaisance',
    services: ['Site culturel', 'Patrimoine', 'Événements'],
    coverImage: '/images/museedelaplaisance.com_(Nest Hub Max).png',
    lien: 'https://museedelaplaisance.com',
  },
  {
    id: 'or-lumiere-alt',
    titre: 'Or & Lumière (alt)',
    services: ['E-commerce bijoux', 'UI claire', 'Focus produit'],
    coverImage: '/images/orlumiere.netlify.app_(Nest Hub Max).png',
    lien: 'https://orlumiere.netlify.app/',
  },
  {
    id: 'qwerio',
    titre: 'Qwerio',
    services: ['Plateforme web', 'Produit digital'],
    coverImage: '/images/qwerio.net_(Nest Hub Max) (2).png',
    lien: 'https://qwerio.net',
  },
  {
    id: 'restauran-tony',
    titre: 'Restaurant Onyx',
    services: ['Resto haut de gamme', 'Réservation', 'Carte en ligne'],
    coverImage: '/images/restaurantonyx.com_(Nest Hub Max).png',
    lien: 'https://restaurantonyx.com',
  },
  {
    id: 'laurence-equilbey',
    titre: 'Laurence Equilbey',
    services: ['Site artiste', 'Direction artistique'],
    coverImage: '/images/www.laurenceequilbey.com_(Nest Hub Max).png',
    lien: 'https://www.laurenceequilbey.com',
  },
  {
    id: 'signitic',
    titre: 'Signitic',
    services: ['SaaS', 'Produit digital', 'Identité'],
    coverImage: '/images/www.signitic.com_fr(Nest Hub Max).png',
    lien: 'https://www.signitic.com',
  },
  {
    id: 'transcure-bio',
    titre: 'Transcure Bioservices',
    services: ['Biotech', 'Site pro', 'Crédibilité scientifique'],
    coverImage: '/images/www.transcurebioservices.com_fr_(Nest Hub Max).png',
    lien: 'https://www.transcurebioservices.com',
  },
];
