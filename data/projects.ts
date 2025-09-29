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
  {
    id: 'ty-klouyou-2025',
    titre: 'Site vitrine – Ty Klouyou',
    client: 'Ty Klouyou',
    secteur: 'Tourisme & Locations saisonnières',
    periode: 'Septembre 2025',
    services: ['Next.js', 'Design UI', 'Optimisation mobile'],
    objectif:
      'Créer un site vitrine moderne et immersif pour valoriser la localisation et faciliter la recherche des visiteurs.',
    resultat:
      'Site responsive avec identité visuelle forte et mise en avant du territoire de Saint-Gildas de Rhuys.',
    coverImage: '/images/villa-tyklouyou.netlify.app_(Nest Hub Max).png',
    lien: 'https://villa-tyklouyou.netlify.app/',
  },
  {
    id: 'sturmayr-2025',
    titre: 'Site vitrine – STURMAYR Coiffure',
    client: 'STURMAYR',
    secteur: 'Coiffure & Beauté',
    periode: 'Septembre 2025',
    services: ['Site vitrine', 'Réservation en ligne', 'UI/UX'],
    objectif:
      'Développer une plateforme en ligne pour présenter les services coiffure et permettre une prise de rendez-vous simple et rapide.',
    resultat: 'Site élégant avec prise de rendez-vous intégrée.',
    coverImage: '/images/sturmayr.netlify.app_(Nest Hub Max).png',
    lien: 'https://sturmayr.netlify.app/',
  },
  {
    id: 'or-lumiere-2025',
    titre: 'Site e-commerce – Or & Lumière',
    client: 'Or & Lumière',
    secteur: 'Bijouterie & Joaillerie',
    periode: 'Septembre 2025',
    services: ['E-commerce', 'Design UI', 'SEO'],
    objectif:
      'Concevoir un site élégant pour mettre en valeur les collections de bijoux et encourager les ventes en ligne.',
    resultat: 'Expérience utilisateur raffinée, mise en avant des produits.',
    coverImage: '/images/orlumiere.netlify.app_(Nest Hub Max).png',
    lien: 'https://orlumiere.netlify.app/',
  },
  {
    id: 'sushi-food-2025',
    titre: 'Site vitrine – Sushi Food',
    client: 'Sushi Food',
    secteur: 'Restauration / Sushi',
    periode: 'Septembre 2025',
    services: ['Site vitrine', 'Design UI', 'Réservation'],
    objectif:
      'Mettre en avant la gastronomie japonaise et faciliter les réservations en ligne.',
    resultat: 'Site moderne, immersif et optimisé pour le mobile.',
    coverImage: '/images/sushifood.netlify.app_(Nest Hub Max).png',
    lien: 'https://sushifood.netlify.app/',
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
  {
    id: 'ty-klouyou-2025',
    titre: 'Showcase Website – Ty Klouyou',
    client: 'Ty Klouyou',
    secteur: 'Tourism & Seasonal Rentals',
    periode: 'September 2025',
    services: ['Next.js', 'UI Design', 'Mobile Optimization'],
    objectif:
      'Design a modern showcase website to highlight the location and simplify visitor search.',
    resultat:
      'Responsive site with strong branding, showcasing Saint-Gildas de Rhuys.',
    coverImage: '/images/tyklouyou.png',
  },
  {
    id: 'sturmayr-2025',
    titre: 'Showcase Website – STURMAYR Hair Salon',
    client: 'STURMAYR',
    secteur: 'Hairdressing & Beauty',
    periode: 'September 2025',
    services: ['Showcase Website', 'Online Booking', 'UI/UX'],
    objectif:
      'Build a website to present hairdressing services and enable easy online booking.',
    resultat: 'Elegant website with integrated booking system.',
    coverImage: '/images/sturmayr.png',
  },
  {
    id: 'or-lumiere-2025',
    titre: 'E-commerce Website – Or & Lumière',
    client: 'Or & Lumière',
    secteur: 'Jewelry & Fine Jewelry',
    periode: 'September 2025',
    services: ['E-commerce', 'UI Design', 'SEO'],
    objectif:
      'Create an elegant website to showcase jewelry collections and boost online sales.',
    resultat: 'Refined user experience, product-focused showcase.',
    coverImage: '/images/orlumiere.png',
  },
  {
    id: 'sushi-food-2025',
    titre: 'Showcase Website – Sushi Food',
    client: 'Sushi Food',
    secteur: 'Restaurant / Sushi',
    periode: 'September 2025',
    services: ['Showcase Website', 'UI Design', 'Reservation'],
    objectif: 'Highlight Japanese gastronomy and simplify online reservations.',
    resultat: 'Modern, immersive, mobile-optimized site.',
    coverImage: '/images/sushifood.png',
  },
];
