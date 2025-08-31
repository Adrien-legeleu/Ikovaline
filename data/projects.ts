// data/projects.ts
export type Project = {
  id: string;
  titre: string;
  client: string;
  secteur: string;
  periode: string;
  services: string[];
  objectif: string;
  resultat: string;
  coverImage: string; // URL absolue ou /images/local
  lien?: string;
};

export const PROJECTS_FR: Project[] = [
  {
    id: 'lynelec-2025',
    titre: 'Refonte du site Lynelec',
    client: 'Lynelec',
    secteur: 'Distribution de câbles',
    periode: 'Juin – Août 2025',
    services: ['Création de site', 'SEO', 'UI/UX'],
    objectif: "Moderniser l'image et augmenter les demandes de devis",
    resultat: '×3 demandes de devis en 2 mois',
    coverImage: '/images/lynelec.png',
    lien: 'https://lynelec.vercel.app',
  },
  {
    id: 'teka-somba-2025',
    titre: 'Lancement e-commerce Teka Somba',
    client: 'Teka Somba',
    secteur: 'Artisanat & Culture',
    periode: 'Mars – Mai 2025',
    services: ['E-commerce', 'Rédaction SEO', 'CRM'],
    objectif: 'Passer de la vente locale à une boutique en ligne scalable',
    resultat: '+180% de CA sur 6 semaines',
    coverImage: '/images/tekasomba.png',
    lien: 'https://teka-somba.com/',
  },
  {
    id: 'skillize-2025',
    titre: 'Plateforme SaaS Skillize',
    client: 'Skillize',
    secteur: 'EdTech / RH',
    periode: 'Janvier – Avril 2025',
    services: ['SaaS', 'Design System', 'RBAC', 'Multi-tenant'],
    objectif: 'Onboarding B2B fluide et suivi des compétences',
    resultat: 'Time-to-value réduit de 45%',
    coverImage: '/images/skilize.png',
    lien: 'https://skillize.fr/',
  },
  {
    id: 'sophie-deneriez-2025',
    titre: 'Site vitrine & brand content',
    client: 'Sophie Deneriez',
    secteur: 'Coaching & Bien-être',
    periode: 'Avril – Mai 2025',
    services: ['Site vitrine', 'SEO local', 'Branding'],
    objectif: 'Générer des prises de rendez-vous qualifiées',
    resultat: 'Top 3 Google Maps sur 6 requêtes locales',
    coverImage: '/images/sophie.png',
    lien: 'https://sophiedeneriaz.ch/',
  },
];

export const PROJECTS_EN: Project[] = [
  {
    id: 'lynelec-2025',
    titre: 'Lynelec Website Redesign',
    client: 'Lynelec',
    secteur: 'Cable Distribution',
    periode: 'June – August 2025',
    services: ['Website Build', 'SEO', 'UI/UX'],
    objectif: 'Modernize the brand image and increase quote requests',
    resultat: '3× quote requests in 2 months',
    coverImage: '/images/lynelec.png',
    lien: 'https://lynelec.vercel.app',
  },
  {
    id: 'teka-somba-2025',
    titre: 'Teka Somba E-commerce Launch',
    client: 'Teka Somba',
    secteur: 'Crafts & Culture',
    periode: 'March – May 2025',
    services: ['E-commerce', 'SEO Copywriting', 'CRM'],
    objectif: 'Scale from local sales to a robust online shop',
    resultat: '+180% revenue in 6 weeks',
    coverImage: '/images/tekasomba.png',
    lien: 'https://teka-somba.com/',
  },
  {
    id: 'skillize-2025',
    titre: 'Skillize SaaS Platform',
    client: 'Skillize',
    secteur: 'EdTech / HR',
    periode: 'January – April 2025',
    services: ['SaaS', 'Design System', 'RBAC', 'Multi-tenant'],
    objectif: 'Smooth B2B onboarding and skills tracking',
    resultat: 'Time-to-value reduced by 45%',
    coverImage: '/images/skilize.png',
    lien: 'https://skillize.fr/',
  },
  {
    id: 'sophie-deneriez-2025',
    titre: 'Showcase Website & Brand Content',
    client: 'Sophie Deneriez',
    secteur: 'Coaching & Wellness',
    periode: 'April – May 2025',
    services: ['Showcase site', 'Local SEO', 'Branding'],
    objectif: 'Generate qualified bookings',
    resultat: 'Top 3 on Google Maps for 6 local queries',
    coverImage: '/images/sophie.png',
    lien: 'https://sophiedeneriaz.ch/',
  },
];
