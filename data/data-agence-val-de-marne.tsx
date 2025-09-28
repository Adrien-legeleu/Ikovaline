// dataAgenceValDeMarne.tsx
import { removeAccents } from '@/components/pageSatellite/CityAround';
import Link from 'next/link';

const ALL_VILLES_94 = [
  'Créteil',
  'Vitry-sur-Seine',
  'Ivry-sur-Seine',
  'Villejuif',
  'Maisons-Alfort',
  'Saint-Maur-des-Fossés',
  'Champigny-sur-Marne',
  'Nogent-sur-Marne',
  'Charenton-le-Pont',
  'Choisy-le-Roi',
] as const;

type Ville94 = (typeof ALL_VILLES_94)[number];

export const dataAgenceValDeMarne = [
  // 1) Créteil
  {
    id: 'agence-web-creteil',
    ville: 'Créteil' as Ville94,
    departement: 'Val-de-Marne',

    intro: `Ikovaline, agence web à Créteil (94) : création de site internet, refonte, SEO local, SEA, et produits digitaux (SaaS, marketplace, app web) pour TPE/PME du Val-de-Marne.`,

    text1: (
      <span>
        Notre <strong>agence web à Créteil</strong> conçoit des{' '}
        <strong>sites internet</strong> performants et des produits{' '}
        <strong>digitaux</strong> (SaaS, marketplaces, apps web) orientés
        acquisition. Présents à <Link href="/agence-web-creteil">Créteil</Link>{' '}
        et dans tout le <strong>Val-de-Marne (94)</strong>, nous alignons{' '}
        <strong>création de site web</strong>, <strong>SEO local</strong>,{' '}
        <strong>SEA</strong> et contenus pour transformer le trafic en clients.
      </span>
    ),

    services: [
      {
        text: 'Création de sites web',
        subtext:
          'Site vitrine, e-commerce ou MVP SaaS : design propre, vitesse, conversion et SEO ready pour le 94.',
        link: 'nos-services/creation-sites-web-vitrine-e-commerce',
      },
      {
        text: 'Référencement SEO',
        subtext:
          'SEO local Val-de-Marne : mots-clés, on-page, contenu, maillage, pages “ville” et netlinking.',
        link: 'nos-services/seo-referencement-naturel',
      },
      {
        text: 'Maintenance et support',
        subtext:
          'Sécurité, mises à jour, sauvegardes et monitoring pour un site stable à Créteil et alentours.',
        link: 'nos-services/creation-site-web-sur-mesure',
      },
      {
        text: 'Web marketing (SEA/Ads)',
        subtext:
          'Google Ads, Meta Ads, tracking, tableaux de bord ROI et optimisation continue.',
        link: 'nos-services/gestion-campagnes-sea',
      },
    ],

    objectifs: {
      objectifTitle:
        'Notre mission à Créteil : un dispositif digital qui génère des clients',
      text1:
        'Concevoir un écosystème cohérent qui relie votre site, votre référencement local et vos campagnes payantes afin de capter la demande autour de Créteil. Nous structurons vos pages “service + ville”, clarifions votre proposition de valeur, intégrons des preuves (avis, certifications, cas clients) et installons des CTA visibles à chaque étape. L’objectif est simple : augmenter la part de trafic qualifié et raccourcir le temps entre la découverte et la prise de contact.',
      text2:
        'Mettre la data au cœur des décisions : configuration GA4 + GSC, évènements clés (clics, formulaires, appels), tableaux de bord par canal, et itérations rapides (A/B tests sur titres, sections de preuve, offres d’essai). Nous suivons des KPIs concrets (taux de conversion, coût par lead, panier moyen, LTV) et optimisons en continu les performances (Core Web Vitals, SEO technique, entonnoirs). Résultat : une acquisition durable, prédictible et rentable sur Créteil et le 94.',
    },

    villesVoisines: [...ALL_VILLES_94],

    cityAroundText: (
      <span className="text-center">
        Ikovaline intervient à Créteil et dans ces villes du Val-de-Marne :{' '}
        {ALL_VILLES_94.map((v, i, arr) => (
          <span key={v}>
            <Link href={`/agence-web-${removeAccents(v)}`}>{v}</Link>
            {i < arr.length - 2 ? ', ' : i === arr.length - 2 ? ' et ' : ''}
          </span>
        ))}{' '}
        .
      </span>
    ),

    CTATitle: 'Besoin d’un site ou d’un SaaS à Créteil (94) ?',
    CTADesc:
      'Création de site web, SEO local, SEA et produit digital : on construit un levier d’acquisition durable.',
    CTATextBtn: 'Lancer mon projet à Créteil',

    metaTitle:
      'Agence web Créteil (94) – Création de site internet, SEO, SEA, SaaS – Val-de-Marne',
    metaDescription:
      'Ikovaline, agence web à Créteil : sites vitrines & e-commerce, refonte, SEO local, SEA et produits digitaux (SaaS/marketplace). Accélérez votre acquisition en 94.',
  },

  // 2) Vitry-sur-Seine
  {
    id: 'agence-web-vitry-sur-seine',
    ville: 'Vitry-sur-Seine' as Ville94,
    departement: 'Val-de-Marne',

    intro: `Agence web à Vitry-sur-Seine (94) : création de site internet, refonte, SEO local, campagnes SEA et conception de produits digitaux (SaaS, app web) pour les entreprises du Val-de-Marne.`,

    text1: (
      <span>
        À <strong>Vitry-sur-Seine</strong>, nous livrons des{' '}
        <strong>sites web</strong> et <strong>solutions digitales</strong>{' '}
        orientés business :{' '}
        <Link href="/agence-web-vitry-sur-seine">Vitry</Link> et communes
        voisines. UX, performance et contenu SEO pour générer des leads &
        ventes.
      </span>
    ),

    services: [
      {
        text: 'Création de sites web',
        subtext:
          'Vitrine, e-commerce, landing, blog… architecture orientée conversion et Core Web Vitals.',
        link: 'nos-services/creation-sites-web-vitrine-e-commerce',
      },
      {
        text: 'Référencement SEO',
        subtext:
          'Plan sémantique local, contenus “métier + ville”, optimisation technique et netlinking régional.',
        link: 'nos-services/seo-referencement-naturel',
      },
      {
        text: 'Maintenance et support',
        subtext: 'MCO, sécurité, sauvegardes, évolutions continues.',
        link: 'nos-services/creation-site-web-sur-mesure',
      },
      {
        text: 'Web marketing',
        subtext:
          'SEA multi-réseaux (Google/Meta), tracking propre, ROAS & CPA maîtrisés.',
        link: 'nos-services/gestion-campagnes-sea',
      },
    ],

    objectifs: {
      objectifTitle:
        'Notre mission à Vitry : trafic utile et conversions mesurables',
      text1:
        'Multiplier les points d’entrée qualifiés sur Vitry : pages locales, articles à intention commerciale, landing pages pour campagnes, et optimisation de Google Business Profile. Nous cartographions les intentions (informationnelles vs transactionnelles), priorisons les mots-clés “rapides” à ranker et créons des offres claires (diagnostic, devis en 24h, audit gratuit) pour déclencher la prise de contact.',
      text2:
        'Mesurer pour améliorer : heatmaps, enregistrements de sessions, formulaires “step-by-step” et tests A/B sur les sections critiques (héros, social proof, FAQ). Nous alimentons un tableau de bord (GA4 + Looker/Datastudio) pour suivre CPA, taux de conversion par canal et valeur par lead. Les enseignements guident les itérations SEO/SEA et les corrections UX jusqu’à obtenir un funnel stable et scalable à Vitry-sur-Seine.',
    },

    villesVoisines: [...ALL_VILLES_94],

    cityAroundText: (
      <span className="text-center">
        Présents à Vitry-sur-Seine et dans ces villes du 94 :{' '}
        {ALL_VILLES_94.map((v, i, arr) => (
          <span key={v}>
            <Link href={`/agence-web-${removeAccents(v)}`}>{v}</Link>
            {i < arr.length - 2 ? ', ' : i === arr.length - 2 ? ' et ' : ''}
          </span>
        ))}{' '}
        .
      </span>
    ),

    CTATitle: 'Prêt à accélérer à Vitry-sur-Seine ?',
    CTADesc:
      'Site, SEO local, SEA et produit digital : on assemble un mix acquisition performant.',
    CTATextBtn: 'Démarrer à Vitry-sur-Seine',

    metaTitle:
      'Agence web Vitry-sur-Seine (94) – Création site internet, SEO, SEA, SaaS',
    metaDescription:
      'Ikovaline : sites performants, SEO local & Ads à Vitry-sur-Seine. Conception produit digital (SaaS/app). Développez vos leads dans le Val-de-Marne.',
  },

  // 3) Ivry-sur-Seine
  {
    id: 'agence-web-ivry-sur-seine',
    ville: 'Ivry-sur-Seine' as Ville94,
    departement: 'Val-de-Marne',

    intro: `Ikovaline, agence web à Ivry-sur-Seine : création/refonte de site internet, SEO local, SEA et développement de produits digitaux (SaaS, marketplace) pour TPE/PME en 94.`,

    text1: (
      <span>
        Notre <strong>agence digitale</strong> accompagne startups, commerces et
        PME à <Link href="/agence-web-ivry-sur-seine">Ivry-sur-Seine</Link> :
        <strong> création de site web</strong>, <strong>SEO</strong>,{' '}
        <strong>Ads</strong> et MVP <strong>SaaS</strong> orientés résultats.
      </span>
    ),

    services: [
      {
        text: 'Création de sites web',
        subtext:
          'Branding, UX, performance et CMS maîtrisé pour publier vite et bien.',
        link: 'nos-services/creation-sites-web-vitrine-e-commerce',
      },
      {
        text: 'Référencement SEO',
        subtext:
          'Audit, plan editoral, pages locales “Ivry + métier”, optimisation on-page/technique.',
        link: 'nos-services/seo-referencement-naturel',
      },
      {
        text: 'Maintenance et support',
        subtext: 'Correctifs, mises à jour, sécurité, monitoring 24/7.',
        link: 'nos-services/creation-site-web-sur-mesure',
      },
      {
        text: 'Web marketing',
        subtext:
          'Campagnes d’acquisition full-funnel, remarketing et reporting clair.',
        link: 'nos-services/gestion-campagnes-sea',
      },
    ],

    objectifs: {
      objectifTitle:
        'Notre mission à Ivry-sur-Seine : visibilité forte, conversion simple',
      text1:
        'Faire émerger votre marque sur les requêtes locales à forte intention (devis, réservation, appel). Nous mettons en avant vos différenciants (expertise, délais, garanties) et simplifions le parcours : prise de RDV en ligne, devis instantané, chat pro, numéro cliquable. Chaque page est pensée pour rassurer (avis, références, labels) et guider vers l’action.',
      text2:
        'Optimiser la performance business dans la durée : suivi de cohorte des leads, qualification CRM, boucles d’amélioration entre SEO/SEA et contenus. Nous travaillons la vitesse (CWV), l’accessibilité et la sémantique pour stabiliser le ranking, tout en testant des leviers d’upsell/cross-sell (packs, offres saisonnières). Objectif : plus de conversions utiles et une LTV en hausse à Ivry.',
    },

    villesVoisines: [...ALL_VILLES_94],

    cityAroundText: (
      <span className="text-center">
        Ikovaline opère à Ivry-sur-Seine et dans tout le Val-de-Marne :{' '}
        {ALL_VILLES_94.map((v, i, arr) => (
          <span key={v}>
            <Link href={`/agence-web-${removeAccents(v)}`}>{v}</Link>
            {i < arr.length - 2 ? ', ' : i === arr.length - 2 ? ' et ' : ''}
          </span>
        ))}{' '}
        .
      </span>
    ),

    CTATitle: 'Un site qui convertit à Ivry-sur-Seine ?',
    CTADesc:
      'Site, SEO, Ads, MVP SaaS : on assemble une stack digitale adaptée à votre marché.',
    CTATextBtn: 'Lancer mon projet à Ivry',

    metaTitle:
      'Agence web Ivry-sur-Seine (94) – Création site internet, SEO, SEA, SaaS',
    metaDescription:
      'Création/refonte de site, SEO local et Ads à Ivry-sur-Seine. Ikovaline conçoit aussi des MVP SaaS/marketplaces pour accélérer votre acquisition.',
  },

  // 4) Villejuif
  {
    id: 'agence-web-villejuif',
    ville: 'Villejuif' as Ville94,
    departement: 'Val-de-Marne',

    intro: `Agence web Villejuif (94) : création site internet, refonte, SEO local, SEA, et développement digital (SaaS/app) pour artisans, commerces et PME.`,

    text1: (
      <span>
        À <strong>Villejuif</strong>, nous livrons des{' '}
        <strong>sites web</strong> rapides et un <strong>SEO local</strong>{' '}
        solide. Ciblage <Link href="/agence-web-villejuif">Villejuif</Link> et
        communes du 94, avec un plan d’acquisition actionnable (Ads + contenu).
      </span>
    ),

    services: [
      {
        text: 'Création de sites web',
        subtext:
          'Vitrine/e-commerce : structure orientée ROI (CTA, preuves, formulaires).',
        link: 'nos-services/creation-sites-web-vitrine-e-commerce',
      },
      {
        text: 'Référencement SEO',
        subtext:
          'Briefs éditoriaux locaux, optimisation sémantique et technique, netlinking 94.',
        link: 'nos-services/seo-referencement-naturel',
      },
      {
        text: 'Maintenance et support',
        subtext:
          'Uptime, sécurité, correctifs, évolutions : un site fiable au quotidien.',
        link: 'nos-services/creation-site-web-sur-mesure',
      },
      {
        text: 'Web marketing',
        subtext:
          'Google/Meta Ads, retargeting et tableaux de bord décisionnels.',
        link: 'nos-services/gestion-campagnes-sea',
      },
    ],

    objectifs: {
      objectifTitle:
        'Notre mission à Villejuif : leads qualifiés et croissance durable',
      text1:
        'Construire un tunnel limpide de la découverte à la prise de contact : section héros orientée bénéfices, éléments de réassurance (avis, garanties), FAQ anti-freins et CTA récurrents. Nous créons des aimants à leads (ebooks, checklists, simulateurs) adaptés au tissu local et mettons en place un nurturing léger (emails, retargeting) pour convertir les hésitants.',
      text2:
        'Piloter les performances comme un P&L marketing : coût par session utile, coût par lead, taux de signature et valeur moyenne. Nous synchronisons analytics et CRM pour mesurer la qualité des demandes, automatisons les relances (email/SMS) et priorisons les chantiers à plus fort ROI (pages locales gagnantes, ads gagnantes, optimisations CRO). Objectif : une croissance maîtrisée à Villejuif.',
    },

    villesVoisines: [...ALL_VILLES_94],

    cityAroundText: (
      <span className="text-center">
        Présents à Villejuif et dans ces villes du Val-de-Marne :{' '}
        {ALL_VILLES_94.map((v, i, arr) => (
          <span key={v}>
            <Link href={`/agence-web-${removeAccents(v)}`}>{v}</Link>
            {i < arr.length - 2 ? ', ' : i === arr.length - 2 ? ' et ' : ''}
          </span>
        ))}{' '}
        .
      </span>
    ),

    CTATitle: 'Générer plus de demandes à Villejuif',
    CTADesc:
      'Création/refonte, SEO local, SEA et produit digital : on vise des résultats mesurables.',
    CTATextBtn: 'Parler à un expert Ikovaline',

    metaTitle:
      'Agence web Villejuif (94) – Site, SEO, SEA, création SaaS – Val-de-Marne',
    metaDescription:
      'Ikovaline : création de site internet, SEO local, Ads et produits digitaux (SaaS/app) à Villejuif. Visez une acquisition rentable en 94.',
  },

  // 5) Maisons-Alfort
  {
    id: 'agence-web-maisons-alfort',
    ville: 'Maisons-Alfort' as Ville94,
    departement: 'Val-de-Marne',

    intro: `Ikovaline, agence digitale à Maisons-Alfort (94) : création de site web, refonte, SEO local, SEA et MVP SaaS pour développer votre acquisition dans le Val-de-Marne.`,

    text1: (
      <span>
        Notre <strong>agence web à Maisons-Alfort</strong> conçoit des sites
        crédibles, rapides et <strong>SEO-ready</strong>. Présence locale à{' '}
        <Link href="/agence-web-maisons-alfort">Maisons-Alfort</Link> et
        rayonnement 94 pour capter une demande qualifiée (devis, RDV,
        commandes).
      </span>
    ),

    services: [
      {
        text: 'Création de sites web',
        subtext:
          'Design premium, performance, CMS maîtrisé, conversions nettes.',
        link: 'nos-services/creation-sites-web-vitrine-e-commerce',
      },
      {
        text: 'Référencement SEO',
        subtext:
          'Pages “ville + service”, cocon sémantique, technique propre et E-E-A-T.',
        link: 'nos-services/seo-referencement-naturel',
      },
      {
        text: 'Maintenance et support',
        subtext: 'SLA, sécurité, backups, évolutions planifiées.',
        link: 'nos-services/creation-site-web-sur-mesure',
      },
      {
        text: 'Web marketing',
        subtext:
          'SEA locale (Google/Meta), retargeting, reporting ROI mensuel.',
        link: 'nos-services/gestion-campagnes-sea',
      },
    ],

    objectifs: {
      objectifTitle:
        'Notre mission à Maisons-Alfort : visibilité locale et conversions',
      text1:
        'Déployer une stratégie “confiance + clarté” : identité visuelle lisible, messages orientés résultats, preuves sociales fortes et pages locales qui répondent aux attentes des habitants et entreprises. Nous simplifions les formulaires, proposons des rendez-vous express et des offres d’appel pour réduire la friction et augmenter la prise de contact.',
      text2:
        'Industrialiser l’optimisation : sprint CRO mensuel (hypothèse → test → décision), suivi des appels et des formulaires dans le CRM, scoring des leads, et arbitrages budgétaires SEO/SEA en fonction du CPA réel. En parallèle, nous consolidons la technique (vitesse, sécurité, uptime) pour assurer une expérience fluide et des positions stables sur le long terme à Maisons-Alfort.',
    },

    villesVoisines: [...ALL_VILLES_94],

    cityAroundText: (
      <span className="text-center">
        Ikovaline couvre Maisons-Alfort et ces villes du 94 :{' '}
        {ALL_VILLES_94.map((v, i, arr) => (
          <span key={v}>
            <Link href={`/agence-web-${removeAccents(v)}`}>{v}</Link>
            {i < arr.length - 2 ? ', ' : i === arr.length - 2 ? ' et ' : ''}
          </span>
        ))}{' '}
        .
      </span>
    ),

    CTATitle: 'Un site qui performe à Maisons-Alfort',
    CTADesc:
      'Création de site, SEO local, Ads et MVP SaaS : un mix acquisition pensé pour votre marché.',
    CTATextBtn: 'Lancer mon projet à Maisons-Alfort',

    metaTitle:
      'Agence web Maisons-Alfort (94) – Création site internet, SEO, SEA, SaaS',
    metaDescription:
      'Sites rapides, SEO local, Ads et produits digitaux à Maisons-Alfort. Ikovaline, votre partenaire acquisition en Val-de-Marne.',
  },

  // 6) Saint-Maur-des-Fossés
  {
    id: 'agence-web-saint-maur-des-fosses',
    ville: 'Saint-Maur-des-Fossés' as Ville94,
    departement: 'Val-de-Marne',

    intro: `Agence web à Saint-Maur-des-Fossés (94) : création/refonte de site internet, SEO local, SEA et développement digital (SaaS, app web) pour les pros du Val-de-Marne.`,

    text1: (
      <span>
        À <strong>Saint-Maur-des-Fossés</strong>, nous alignons{' '}
        <strong>création de site web</strong>, <strong>SEO</strong> et{' '}
        <strong>SEA</strong> pour générer des demandes qualifiées. Découvrir :{' '}
        <Link href="/agence-web-saint-maur-des-fosses">
          notre offre Saint-Maur
        </Link>
        .
      </span>
    ),

    services: [
      {
        text: 'Création de sites web',
        subtext:
          'UX claire, mobile-first, vitesse, pages conversion (devis/RDV).',
        link: 'nos-services/creation-sites-web-vitrine-e-commerce',
      },
      {
        text: 'Référencement SEO',
        subtext:
          'Stratégie locale “ville + métier”, schema.org, fiche établissement, avis.',
        link: 'nos-services/seo-referencement-naturel',
      },
      {
        text: 'Maintenance et support',
        subtext:
          'Disponibilité, sécurité, évolutions fonctionnelles continues.',
        link: 'nos-services/creation-site-web-sur-mesure',
      },
      {
        text: 'Web marketing',
        subtext: 'Campagnes Google Ads & Meta, ciblage local et retargeting.',
        link: 'nos-services/gestion-campagnes-sea',
      },
    ],

    objectifs: {
      objectifTitle:
        'Notre mission à Saint-Maur : un parcours simple qui convertit',
      text1:
        'Clarifier le message et lever les doutes : structure de page en entonnoir (problème → bénéfices → preuve → action), sections “avant/après”, garanties, et comparatifs. Nous adaptons le ton et les offres aux quartiers et aux usages locaux (services à domicile, B2B, retail), pour un ressenti de proximité et une conversion naturelle.',
      text2:
        'Outiller la prise de décision : instrumentation GA4 propre, micro-conversions suivies (scroll, clics CTA, téléchargements), tableaux de bord hebdos, et rituels d’itération. Nous optimisons la vitesse, le maillage interne et le netlinking, tout en orchestrant Ads et SEO pour maximiser la présence sur les requêtes clés de Saint-Maur-des-Fossés.',
    },

    villesVoisines: [...ALL_VILLES_94],

    cityAroundText: (
      <span className="text-center">
        Intervention à Saint-Maur-des-Fossés et dans ces villes :{' '}
        {ALL_VILLES_94.map((v, i, arr) => (
          <span key={v}>
            <Link href={`/agence-web-${removeAccents(v)}`}>{v}</Link>
            {i < arr.length - 2 ? ', ' : i === arr.length - 2 ? ' et ' : ''}
          </span>
        ))}{' '}
        .
      </span>
    ),

    CTATitle: 'Objectif : plus de leads à Saint-Maur',
    CTADesc:
      'Site + SEO + Ads + data : on installe une machine à convertir, mesurée et scalable.',
    CTATextBtn: 'Parler à Ikovaline – Saint-Maur',

    metaTitle:
      'Agence web Saint-Maur-des-Fossés (94) – Site, SEO, SEA, SaaS – Val-de-Marne',
    metaDescription:
      'Ikovaline : création/refonte de site, SEO local, Ads et produit digital à Saint-Maur-des-Fossés. Développez vos demandes entrantes.',
  },

  // 7) Champigny-sur-Marne
  {
    id: 'agence-web-champigny-sur-marne',
    ville: 'Champigny-sur-Marne' as Ville94,
    departement: 'Val-de-Marne',

    intro: `Agence web à Champigny-sur-Marne (94) : création de site internet, refonte, SEO local, SEA et solutions digitales (SaaS, app web) pour TPE/PME.`,

    text1: (
      <span>
        À <strong>Champigny-sur-Marne</strong>, nous concevons des{' '}
        <strong>sites web</strong> efficaces et un <strong>SEO local</strong>{' '}
        robuste. Voir :{' '}
        <Link href="/agence-web-champigny-sur-marne">
          notre offre Champigny
        </Link>
        .
      </span>
    ),

    services: [
      {
        text: 'Création de sites web',
        subtext:
          'Architecture SEO, contenus, preuves sociales et entonnoir de conversion.',
        link: 'nos-services/creation-sites-web-vitrine-e-commerce',
      },
      {
        text: 'Référencement SEO',
        subtext:
          'Ciblage local, cocon “ville + service”, optimisation technique, netlinking.',
        link: 'nos-services/seo-referencement-naturel',
      },
      {
        text: 'Maintenance et support',
        subtext: 'Mises à jour, sécurité, monitoring, évolutions.',
        link: 'nos-services/creation-site-web-sur-mesure',
      },
      {
        text: 'Web marketing',
        subtext:
          'SEA B2B/B2C, tracking conversions, ROAS & CPA suivis mensuellement.',
        link: 'nos-services/gestion-campagnes-sea',
      },
    ],

    objectifs: {
      objectifTitle:
        'Notre mission à Champigny : acquisition prévisible et rentable',
      text1:
        'Standardiser ce qui marche : gabarits de pages locales/services, librairie de sections “preuves” (avis, réalisations, logos), et offres testées. Nous concentrons l’effort sur les requêtes à forte intention et déployons un calendrier éditorial pour occuper progressivement tout le champ sémantique de Champigny et alentours.',
      text2:
        'Mettre en place un cycle d’amélioration continue : revues mensuelles des KPIs (trafic qualifié, taux de conversion, coût par lead), tests CRO en continu (titres, visuels, ordonnancement des blocs), optimisation des annonces et des audiences. L’objectif est d’obtenir un pipeline stable de demandes pertinentes avec un CPA sous contrôle.',
    },

    villesVoisines: [...ALL_VILLES_94],

    cityAroundText: (
      <span className="text-center">
        Ikovaline opère à Champigny-sur-Marne et dans ces villes du 94 :{' '}
        {ALL_VILLES_94.map((v, i, arr) => (
          <span key={v}>
            <Link href={`/agence-web-${removeAccents(v)}`}>{v}</Link>
            {i < arr.length - 2 ? ', ' : i === arr.length - 2 ? ' et ' : ''}
          </span>
        ))}{' '}
        .
      </span>
    ),

    CTATitle: 'Booster votre acquisition à Champigny',
    CTADesc:
      'Site + SEO + Ads + produit digital : on déploie un plan clair et mesurable.',
    CTATextBtn: 'Démarrer à Champigny',

    metaTitle:
      'Agence web Champigny-sur-Marne (94) – Création site, SEO, SEA, SaaS',
    metaDescription:
      'Sites performants, SEO local et Ads à Champigny-sur-Marne. Ikovaline, partenaire digital des entreprises du Val-de-Marne.',
  },

  // 8) Nogent-sur-Marne
  {
    id: 'agence-web-nogent-sur-marne',
    ville: 'Nogent-sur-Marne' as Ville94,
    departement: 'Val-de-Marne',

    intro: `Ikovaline, agence web à Nogent-sur-Marne (94) : création/refonte de site internet, SEO local, SEA et conception de produits digitaux (SaaS, app web) pour les pros exigeants.`,

    text1: (
      <span>
        À <strong>Nogent-sur-Marne</strong>, nous allions design premium,{' '}
        <strong>performance</strong> et <strong>SEO</strong>. Découvrez :{' '}
        <Link href="/agence-web-nogent-sur-marne">notre offre Nogent</Link>.
      </span>
    ),

    services: [
      {
        text: 'Création de sites web',
        subtext:
          'Design soigné, crédibilité, UX et tunnel de conversion sans friction.',
        link: 'nos-services/creation-sites-web-vitrine-e-commerce',
      },
      {
        text: 'Référencement SEO',
        subtext:
          'Contenus experts, maillage interne, rich snippets et pages locales.',
        link: 'nos-services/seo-referencement-naturel',
      },
      {
        text: 'Maintenance et support',
        subtext:
          'Support réactif, sécurité, sauvegardes, roadmap d’améliorations.',
        link: 'nos-services/creation-site-web-sur-mesure',
      },
      {
        text: 'Web marketing',
        subtext: 'SEA haut de gamme, retargeting, social ads, email marketing.',
        link: 'nos-services/gestion-campagnes-sea',
      },
    ],

    objectifs: {
      objectifTitle:
        'Notre mission à Nogent : image pro et performance commerciale',
      text1:
        'Aligner perception de marque et génération de chiffre d’affaires : identité visuelle exigeante, lignes éditoriales soignées, cas clients chiffrés et pages services à haute valeur. Nous travaillons la preuve (labels, presse, témoignages vidéo) et des offres packagées premium pour élever le panier moyen.',
      text2:
        'Objectiver la performance : suivi des conversions multi-touch, analyse des sources haut de funnel vs bas de funnel, et réallocation budgétaire vers les combinaisons page+mot-clé+annonce qui délivrent le meilleur ROAS. Nous optimisons la vitesse, la qualité mobile et l’accessibilité pour sécuriser le SEO et maximiser la conversion sur Nogent-sur-Marne.',
    },

    villesVoisines: [...ALL_VILLES_94],

    cityAroundText: (
      <span className="text-center">
        Présence à Nogent-sur-Marne et dans ces villes du Val-de-Marne :{' '}
        {ALL_VILLES_94.map((v, i, arr) => (
          <span key={v}>
            <Link href={`/agence-web-${removeAccents(v)}`}>{v}</Link>
            {i < arr.length - 2 ? ', ' : i === arr.length - 2 ? ' et ' : ''}
          </span>
        ))}{' '}
        .
      </span>
    ),

    CTATitle: 'Construire un site haut de gamme à Nogent',
    CTADesc:
      'Site premium, SEO, Ads et produit digital : une présence qui vend et qui rassure.',
    CTATextBtn: 'Parler à Ikovaline – Nogent',

    metaTitle:
      'Agence web Nogent-sur-Marne (94) – Site premium, SEO, SEA, SaaS',
    metaDescription:
      'Ikovaline : création/refonte de site haut de gamme, SEO local et Ads à Nogent-sur-Marne. Conception de produits digitaux (SaaS/app).',
  },

  // 9) Charenton-le-Pont
  {
    id: 'agence-web-charenton-le-pont',
    ville: 'Charenton-le-Pont' as Ville94,
    departement: 'Val-de-Marne',

    intro: `Agence web à Charenton-le-Pont (94) : création de site internet, refonte, SEO local, SEA et développement digital (SaaS, app web) pour entreprises proches de Paris.`,

    text1: (
      <span>
        À <strong>Charenton-le-Pont</strong>, nous capitalisons sur la proximité
        parisienne pour un <strong>SEO local</strong> et des{' '}
        <strong>Ads</strong> performants. Voir :{' '}
        <Link href="/agence-web-charenton-le-pont">notre offre Charenton</Link>.
      </span>
    ),

    services: [
      {
        text: 'Création de sites web',
        subtext:
          'Landing B2B/B2C, e-commerce, blog : structure data-driven orientée MQL/SQL.',
        link: 'nos-services/creation-sites-web-vitrine-e-commerce',
      },
      {
        text: 'Référencement SEO',
        subtext:
          'Recherche d’intentions, contenus “ville+service”, technique, netlinking.',
        link: 'nos-services/seo-referencement-naturel',
      },
      {
        text: 'Maintenance et support',
        subtext:
          'Monitoring, correctifs, sécurité, performance continue (CWV).',
        link: 'nos-services/creation-site-web-sur-mesure',
      },
      {
        text: 'Web marketing',
        subtext:
          'SEA, social ads, ABM léger, nurturing, dashboards décisionnels.',
        link: 'nos-services/gestion-campagnes-sea',
      },
    ],

    objectifs: {
      objectifTitle:
        'Notre mission à Charenton : pipeline de demandes qualifiées',
      text1:
        'Structurer une mécanique claire acquisition → qualification → conversion : ciblage des décideurs, messages par persona, pages d’atterrissage dédiées, et formulaires intelligents (progressifs, contextualisés). Nous connectons les canaux (SEO/SEA/LinkedIn/Email) pour multiplier les points de contact et nourrir votre pipeline.',
      text2:
        'Mettre en musique la data : scoring des leads dans le CRM, SLAs marketing-vente, reporting hebdo sur le coût/opportunité et le taux de closing. Nous ajustons enchères, audiences et contenus bas de funnel pour diminuer le CPA et accélérer la vélocité commerciale à Charenton-le-Pont, tout en consolidant les fondamentaux SEO.',
    },

    villesVoisines: [...ALL_VILLES_94],

    cityAroundText: (
      <span className="text-center">
        Ikovaline couvre Charenton-le-Pont et ces villes du 94 :{' '}
        {ALL_VILLES_94.map((v, i, arr) => (
          <span key={v}>
            <Link href={`/agence-web-${removeAccents(v)}`}>{v}</Link>
            {i < arr.length - 2 ? ', ' : i === arr.length - 2 ? ' et ' : ''}
          </span>
        ))}{' '}
        .
      </span>
    ),

    CTATitle: 'Déployer une acquisition sérieuse à Charenton',
    CTADesc:
      'Création/refonte, SEO local, SEA et produit digital : on vise un deal-flow régulier.',
    CTATextBtn: 'Démarrer à Charenton-le-Pont',

    metaTitle:
      'Agence web Charenton-le-Pont (94) – Création site, SEO, SEA, SaaS',
    metaDescription:
      'Sites rapides, SEO local, Ads et solutions digitales (SaaS/app) à Charenton-le-Pont. Ikovaline, partenaire acquisition en Val-de-Marne.',
  },

  // 10) Choisy-le-Roi
  {
    id: 'agence-web-choisy-le-roi',
    ville: 'Choisy-le-Roi' as Ville94,
    departement: 'Val-de-Marne',

    intro: `Ikovaline, agence web à Choisy-le-Roi (94) : création de site internet, refonte, SEO local, SEA et produits digitaux (SaaS, app web) pour booster votre visibilité.`,

    text1: (
      <span>
        À <strong>Choisy-le-Roi</strong>, nous concevons des{' '}
        <strong>sites web</strong> optimisés <strong>SEO</strong> et des{' '}
        <strong>campagnes Ads</strong> rentables. Découvrir :{' '}
        <Link href="/agence-web-choisy-le-roi">notre offre Choisy-le-Roi</Link>.
      </span>
    ),

    services: [
      {
        text: 'Création de sites web',
        subtext:
          'Vitrine/e-commerce, UX claire, messages orientés bénéfices et CTA visibles.',
        link: 'nos-services/creation-sites-web-vitrine-e-commerce',
      },
      {
        text: 'Référencement SEO',
        subtext:
          'Pages locales, optimisation on-page/technique, contenu ciblé 94, avis et GBP.',
        link: 'nos-services/seo-referencement-naturel',
      },
      {
        text: 'Maintenance et support',
        subtext: 'Sécurité, mises à jour, backups, support réactif 7/7.',
        link: 'nos-services/creation-site-web-sur-mesure',
      },
      {
        text: 'Web marketing',
        subtext:
          'Google Ads & Meta, retargeting, email marketing, reporting exploitable.',
        link: 'nos-services/gestion-campagnes-sea',
      },
    ],

    objectifs: {
      objectifTitle:
        'Notre mission à Choisy-le-Roi : visibilité locale et demandes entrantes',
      text1:
        'Captez les recherches locales “service + Choisy-le-Roi” avec des pages dédiées, des offres claires (devis en 24h, diagnostic) et une présence soignée sur Google Business Profile. Nous optimisons la lisibilité mobile, la hiérarchie des informations, et la réassurance pour encourager les appels et formulaires depuis Choisy et les communes limitrophes.',
      text2:
        'Transformer l’intérêt en rendez-vous : suivi fin des micro-conversions (clic téléphone, WhatsApp, email), campagnes de retargeting, emailing de relance, et tests A/B sur tarifs/packaging. Nous monitorons la qualité des leads dans le CRM, ajustons SEO/SEA en conséquence, et consolidons la performance technique (vitesse, sécurité) pour des résultats fiables et reproductibles.',
    },

    villesVoisines: [...ALL_VILLES_94],

    cityAroundText: (
      <span className="text-center">
        Intervention à Choisy-le-Roi et dans ces villes du Val-de-Marne :{' '}
        {ALL_VILLES_94.map((v, i, arr) => (
          <span key={v}>
            <Link href={`/agence-web-${removeAccents(v)}`}>{v}</Link>
            {i < arr.length - 2 ? ', ' : i === arr.length - 2 ? ' et ' : ''}
          </span>
        ))}{' '}
        .
      </span>
    ),

    CTATitle: 'Créer un site qui vend à Choisy-le-Roi',
    CTADesc:
      'Site + SEO + Ads + produit digital : on construit votre moteur d’acquisition local.',
    CTATextBtn: 'Parler à Ikovaline – Choisy',

    metaTitle:
      'Agence web Choisy-le-Roi (94) – Création site internet, SEO, SEA, SaaS',
    metaDescription:
      'Ikovaline : sites performants, SEO local et Ads à Choisy-le-Roi. Développez votre acquisition en Val-de-Marne avec des solutions digitales (SaaS/app).',
  },
] as const;
