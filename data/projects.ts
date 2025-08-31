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
  coverImage: string; // URL absolue ou chemin local ex: /images/local
  lien?: string;
};

/* =================== VERSION FR =================== */
export const PROJECTS_FR: Project[] = [
  {
    id: 'lynelec-2025',
    titre: 'Création du site Lynelec',
    client: 'Lynelec',
    secteur: 'Grossiste en câbles électriques',
    periode: 'Mai – Septembre 2025',
    services: ['Next.js', 'Tailwind CSS', 'SEO', 'UI/UX'],
    objectif:
      "Donner à Lynelec une présence en ligne professionnelle pour présenter son catalogue et renforcer son image (déjà beaucoup de demandes existantes, l'objectif était surtout la vitrine et la crédibilité).",
    resultat: 'Site moderne et responsive, optimisation SEO en cours',
    coverImage: '/images/lynelec.png',
    lien: 'https://lynelec.vercel.app',
  },
  {
    id: 'teka-somba-2025',
    titre: 'Teka Somba – Marketplace au Congo',
    client: 'Teka Somba',
    secteur: 'Marketplace / Petites annonces',
    periode: 'Août 2025 – en cours',
    services: ['Next.js', 'Prisma', 'Supabase', 'Stripe', 'SEO'],
    objectif:
      "Développer le 'Leboncoin' pour l'Afrique francophone, en commençant par le Congo (Brazzaville & Kinshasa), avec une vision d'expansion long terme.",
    resultat:
      'Plateforme déjà en ligne et utilisée, en amélioration continue avec de nouvelles fonctionnalités premium.',
    coverImage: '/images/tekasomba.png',
    lien: 'https://teka-somba.com/',
  },
  {
    id: 'skillize-2025',
    titre: 'Plateforme Skillize',
    client: 'Skillize',
    secteur: 'EdTech / Freelances IA & automatisation',
    periode: 'Juillet 2025 – en cours',
    services: ['SaaS', 'Design System', 'Multi-tenant', 'RBAC'],
    objectif:
      'Créer une plateforme SaaS permettant aux entreprises de se connecter instantanément aux meilleurs freelances IA & automatisation.',
    resultat: 'MVP en cours, onboarding B2B fluide et scalable',
    coverImage: '/images/skilize.png',
    lien: 'https://skillize.fr/',
  },
  {
    id: 'sophie-deneriez-2025',
    titre: 'Site vitrine & branding – Sophie Dénériaz',
    client: 'Sophie Dénériaz',
    secteur: 'Massothérapie & Bien-être',
    periode: 'Juillet 2025',
    services: ['Site vitrine', 'SEO local', 'Branding'],
    objectif:
      'Développer une image professionnelle pour attirer des clients en Suisse dans les domaines du massage, drainage lymphatique et bien-être.',
    resultat: 'Top 3 Google Maps sur 6 requêtes locales en Suisse',
    coverImage: '/images/sophie.png',
    lien: 'https://sophiedeneriaz.ch/',
  },
];

/* =================== VERSION EN =================== */
export const PROJECTS_EN: Project[] = [
  {
    id: 'lynelec-2025',
    titre: 'Lynelec Website Creation',
    client: 'Lynelec',
    secteur: 'Wholesale Electrical Cables',
    periode: 'May – September 2025',
    services: ['Next.js', 'Tailwind CSS', 'SEO', 'UI/UX'],
    objectif:
      'Provide Lynelec with a strong online presence to showcase its catalog and modernize its brand image (the company already had strong demand, the website was meant as a professional showcase).',
    resultat: 'Modern responsive website launched, SEO optimization ongoing',
    coverImage: '/images/lynelec.png',
    lien: 'https://lynelec.vercel.app',
  },
  {
    id: 'teka-somba-2025',
    titre: 'Teka Somba – African Marketplace',
    client: 'Teka Somba',
    secteur: 'Marketplace / Classifieds',
    periode: 'August 2025 – ongoing',
    services: ['Next.js', 'Prisma', 'Supabase', 'Stripe', 'SEO'],
    objectif:
      "Build the 'Leboncoin' of Francophone Africa, starting with Congo (Brazzaville & Kinshasa), with a long-term vision of expanding to other countries.",
    resultat:
      'Live and growing platform, with continuous improvements and premium features being added.',
    coverImage: '/images/tekasomba.png',
    lien: 'https://teka-somba.com/',
  },
  {
    id: 'skillize-2025',
    titre: 'Skillize SaaS Platform',
    client: 'Skillize',
    secteur: 'EdTech / Freelance AI & Automation',
    periode: 'July 2025 – ongoing',
    services: ['SaaS', 'Design System', 'Multi-tenant', 'RBAC'],
    objectif:
      'Develop a SaaS platform connecting companies instantly with the best AI & automation freelancers.',
    resultat: 'MVP in progress, smooth and scalable B2B onboarding',
    coverImage: '/images/skilize.png',
    lien: 'https://skillize.fr/',
  },
  {
    id: 'sophie-deneriez-2025',
    titre: 'Showcase Website & Branding – Sophie Dénériaz',
    client: 'Sophie Dénériaz',
    secteur: 'Massage Therapy & Wellness',
    periode: 'July 2025',
    services: ['Showcase Website', 'Local SEO', 'Branding'],
    objectif:
      'Create a professional image to attract clients in Switzerland for massage, lymphatic drainage and wellness services.',
    resultat: 'Top 3 Google Maps ranking for 6 local queries in Switzerland',
    coverImage: '/images/sophie.png',
    lien: 'https://sophiedeneriaz.ch/',
  },
];
