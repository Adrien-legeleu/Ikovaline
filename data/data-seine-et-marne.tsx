import { removeAccents } from '@/components/pageSatellite/CityAround';
import Link from 'next/link';

const ALL_VILLES_77 = [
  'Serris',
  'Chessy',
  'Bussy-Saint-Georges',
  'Montévrain',
  'Bailly-Romainvilliers',
  'Lagny-sur-Marne',
  'Torcy',
  'Lognes',
  'Champs-sur-Marne',
  'Meaux',
];

type Ville77 = (typeof ALL_VILLES_77)[number];

export const dataAgenceSeineEtMarne = [
  // 1) Serris
  {
    id: 'agence-web-serris',
    ville: 'Serris' as Ville77,
    departement: 'Seine-et-Marne',

    intro: `Vous recherchez une agence web à Serris (Val d’Europe) ? Ikovaline conçoit des sites vitrines et e-commerce, gère la refonte, le SEO local et vos campagnes marketing pour booster votre visibilité en Seine-et-Marne (77).`,

    text1: (
      <span>
        Notre <strong>agence web à Serris</strong> accompagne commerçants,
        artisans et entreprises du Val d’Europe : création de site internet,
        refonte, SEO local et webmarketing orientés résultats. Basés à{' '}
        <Link href="/agence-web-serris">Serris</Link> et autour, nous déployons
        des solutions sur-mesure qui transforment votre trafic en clients.
      </span>
    ),

    services: [
      {
        text: 'Création de sites web',
        subtext:
          'Site vitrine ou e-commerce : des sites modernes, rapides, Responsive et optimisés SEO local pour Serris et le Val d’Europe.',
        link: 'nos-services/creation-sites-web-vitrine-e-commerce',
      },
      {
        text: 'Référencement SEO',
        subtext:
          'Augmentez votre visibilité à Serris et en Seine-et-Marne grâce à une stratégie complète : mots-clés, contenu, technique et netlinking.',
        link: 'nos-services/seo-referencement-naturel',
      },
      {
        text: 'Maintenance et support',
        subtext:
          'Sécurité, mises à jour, sauvegardes et support réactif pour un site toujours opérationnel à Serris.',
        link: 'nos-services/creation-site-web-sur-mesure',
      },
      {
        text: 'Web marketing',
        subtext:
          'Campagnes Google Ads & Social Ads, content et automation pour activer durablement votre acquisition au Val d’Europe.',
        link: 'nos-services/gestion-campagnes-sea',
      },
    ],

    objectifs: {
      objectifTitle:
        'Notre mission à Serris : transformer votre visibilité en clients',
      text1:
        'Nous aidons les entreprises de Serris à générer plus de demandes : site performant, SEO local solide et leviers d’acquisition ciblés.',
      text2:
        'Notre approche data-driven priorise des leads qualifiés et des ventes mesurables, alignées sur vos objectifs business.',
    },

    villesVoisines: [...ALL_VILLES_77],

    cityAroundText: (
      <span className="text-center">
        Ikovaline intervient à Serris et dans les villes suivantes en
        Seine-et-Marne :{' '}
        {ALL_VILLES_77.map((v, i, arr) => (
          <span key={v}>
            <Link href={`/agence-web-${removeAccents(v)}`}>{v}</Link>
            {i < arr.length - 2 ? ', ' : i === arr.length - 2 ? ' et ' : ''}
          </span>
        ))}{' '}
        .
      </span>
    ),

    CTATitle: 'Prêt à lancer votre projet web à Serris (Val d’Europe) ?',
    CTADesc:
      'Création de site, refonte, SEO, marketing… développez votre acquisition à Serris avec Ikovaline.',
    CTATextBtn: 'Lancez votre projet web à Serris',

    metaTitle:
      'Agence web Serris (77) – Création de site internet, SEO, refonte – Val d’Europe',
    metaDescription:
      'Ikovaline, agence web à Serris : sites vitrines & e-commerce, refonte, SEO local et webmarketing. Accélérez votre croissance en Seine-et-Marne.',
  },

  // 2) Chessy
  {
    id: 'agence-web-chessy',
    ville: 'Chessy' as Ville77,
    departement: 'Seine-et-Marne',

    intro: `Besoin d’une agence web à Chessy (Disneyland Paris) ? Ikovaline crée/refond des sites performants, optimise votre SEO local et gère vos campagnes d’acquisition pour capter une clientèle locale et touristique.`,

    text1: (
      <span>
        Notre <strong>agence web à Chessy</strong> accompagne hôtels,
        restaurants, boutiques et services liés au tourisme :{' '}
        <Link href="/agence-web-chessy">Chessy</Link> et tout le pôle Disneyland
        Paris. Objectif : des sites qui convertissent et un trafic qualifié.
      </span>
    ),

    services: [
      {
        text: 'Création de sites web',
        subtext:
          'Sites rapides, SEO-ready et orientés conversion pour les acteurs du tourisme et du retail à Chessy.',
        link: 'nos-services/creation-sites-web-vitrine-e-commerce',
      },
      {
        text: 'Référencement SEO',
        subtext:
          'Apparaissez dans les recherches locales (hébergement, restauration, loisirs) avec un SEO adapté à Chessy.',
        link: 'nos-services/seo-referencement-naturel',
      },
      {
        text: 'Maintenance et support',
        subtext:
          'Un site stable et sécurisé pour répondre aux pics d’audience touristiques.',
        link: 'nos-services/creation-site-web-sur-mesure',
      },
      {
        text: 'Web marketing',
        subtext:
          'Google Ads, Meta Ads, contenu et avis clients pour maximiser la réservation en direct.',
        link: 'nos-services/gestion-campagnes-sea',
      },
    ],

    objectifs: {
      objectifTitle:
        'Notre mission à Chessy : capter et convertir la demande locale & touristique',
      text1:
        'Concevoir des parcours qui transforment les visites en réservations et commandes.',
      text2:
        'Piloter vos leviers d’acquisition avec un suivi précis (ROAS, CPA, revenu).',
    },

    villesVoisines: [...ALL_VILLES_77],

    cityAroundText: (
      <span className="text-center">
        Ikovaline intervient à Chessy et dans les villes suivantes du 77 :{' '}
        {ALL_VILLES_77.map((v, i, arr) => (
          <span key={v}>
            <Link href={`/agence-web-${removeAccents(v)}`}>{v}</Link>
            {i < arr.length - 2 ? ', ' : i === arr.length - 2 ? ' et ' : ''}
          </span>
        ))}{' '}
        .
      </span>
    ),

    CTATitle: 'Envie de booster vos réservations à Chessy ?',
    CTADesc:
      'Sites optimisés, SEO, Ads : on aligne votre présence digitale sur la demande locale et touristique.',
    CTATextBtn: 'Lancer mon projet à Chessy',

    metaTitle:
      'Agence web Chessy (77) – Création site internet, SEO, refonte – Disneyland Paris',
    metaDescription:
      'Ikovaline, agence web à Chessy : sites performants, SEO local, Ads pour hôtels, restaurants et commerces. Développez vos réservations en direct.',
  },

  // 3) Bussy-Saint-Georges
  {
    id: 'agence-web-bussy-saint-georges',
    ville: 'Bussy-Saint-Georges' as Ville77,
    departement: 'Seine-et-Marne',

    intro: `À Bussy-Saint-Georges, Ikovaline conçoit des sites vitrines/e-commerce, gère les refontes, le SEO local et vos campagnes SEA pour attirer un public qualifié (TPE/PME, retail, services).`,

    text1: (
      <span>
        Notre <strong>agence web à Bussy-Saint-Georges</strong> accompagne les
        entreprises locales :{' '}
        <Link href="/agence-web-bussy-saint-georges">Bussy-Saint-Georges</Link>{' '}
        et son bassin dynamique le long de l’A4/RER A. Des solutions digitales
        concrètes pour générer des leads et des ventes.
      </span>
    ),

    services: [
      {
        text: 'Création de sites web',
        subtext:
          'Sites modernes, structurés pour le SEO et orientés conversion (formulaire, prise de RDV, panier).',
        link: 'nos-services/creation-sites-web-vitrine-e-commerce',
      },
      {
        text: 'Référencement SEO',
        subtext:
          'Positionnez-vous sur les requêtes locales et sectorielles à Bussy et alentours.',
        link: 'nos-services/seo-referencement-naturel',
      },
      {
        text: 'Maintenance et support',
        subtext:
          'Surveillance, mises à jour, corrections et évolutions : un site robuste au quotidien.',
        link: 'nos-services/creation-site-web-sur-mesure',
      },
      {
        text: 'Web marketing',
        subtext:
          'SEA/Ads, social, contenu et email pour activer durablement votre acquisition.',
        link: 'nos-services/gestion-campagnes-sea',
      },
    ],

    objectifs: {
      objectifTitle:
        'Notre mission à Bussy-Saint-Georges : performance & acquisition locale',
      text1:
        'Vos objectifs business pilotent la stratégie : trafic qualifié, conversions, fidélisation.',
      text2:
        'Nous mesurons et optimisons en continu (analytics, heatmaps, A/B testing).',
    },

    villesVoisines: [...ALL_VILLES_77],

    cityAroundText: (
      <span className="text-center">
        Présents à Bussy-Saint-Georges et dans ces villes du 77 :{' '}
        {ALL_VILLES_77.map((v, i, arr) => (
          <span key={v}>
            <Link href={`/agence-web-${removeAccents(v)}`}>{v}</Link>
            {i < arr.length - 2 ? ', ' : i === arr.length - 2 ? ' et ' : ''}
          </span>
        ))}{' '}
        .
      </span>
    ),

    CTATitle: 'Prêt à accélérer votre acquisition à Bussy-Saint-Georges ?',
    CTADesc:
      'Création/refonte, SEO local, Ads : on structure une présence digitale qui convertit.',
    CTATextBtn: 'Démarrer à Bussy-Saint-Georges',

    metaTitle:
      'Agence web Bussy-Saint-Georges (77) – Création site internet, SEO, refonte',
    metaDescription:
      'Ikovaline : sites vitrines/e-commerce, SEO, SEA à Bussy-Saint-Georges. Attirez un trafic qualifié et convertissez-le en clients.',
  },

  // 4) Montévrain
  {
    id: 'agence-web-montevrain',
    ville: 'Montévrain' as Ville77,
    departement: 'Seine-et-Marne',

    intro: `Ikovaline, agence web à Montévrain : création/refonte de sites, SEO local et campagnes Ads pour professionnels de santé, services, retail et indépendants.`,

    text1: (
      <span>
        Notre <strong>agence web à Montévrain</strong> conçoit des{' '}
        <Link href="/agence-web-montevrain">sites efficaces</Link> et des
        stratégies d’acquisition adaptées à votre activité : prise de RDV,
        génération de leads, e-commerce local.
      </span>
    ),

    services: [
      {
        text: 'Création de sites web',
        subtext:
          'UX claire, vitesse de chargement, SEO technique : un socle solide pour performer localement.',
        link: 'nos-services/creation-sites-web-vitrine-e-commerce',
      },
      {
        text: 'Référencement SEO',
        subtext:
          'Captez les intentions autour de Montévrain (requêtes locales, avis, knowledge panels).',
        link: 'nos-services/seo-referencement-naturel',
      },
      {
        text: 'Maintenance et support',
        subtext:
          'Sécurité, up-time, sauvegardes et évolutions fonctionnelles en continu.',
        link: 'nos-services/creation-site-web-sur-mesure',
      },
      {
        text: 'Web marketing',
        subtext:
          'SEA/Ads, social & contenus pour activer durablement la visibilité locale.',
        link: 'nos-services/gestion-campagnes-sea',
      },
    ],

    objectifs: {
      objectifTitle:
        'Notre mission à Montévrain : visibilité utile & conversions',
      text1:
        'Créer une expérience qui répond aux attentes locales (mobile-first, preuve sociale).',
      text2:
        'Optimiser chaque étape du tunnel (landing, tunnel de réservation, panier).',
    },

    villesVoisines: [...ALL_VILLES_77],

    cityAroundText: (
      <span className="text-center">
        Ikovaline opère à Montévrain et sur tout ce réseau local :{' '}
        {ALL_VILLES_77.map((v, i, arr) => (
          <span key={v}>
            <Link href={`/agence-web-${removeAccents(v)}`}>{v}</Link>
            {i < arr.length - 2 ? ', ' : i === arr.length - 2 ? ' et ' : ''}
          </span>
        ))}{' '}
        .
      </span>
    ),

    CTATitle: 'Un site qui convertit à Montévrain ?',
    CTADesc:
      'On conçoit et on pilote : création/refonte, SEO, Ads. Vous suivez les résultats.',
    CTATextBtn: 'Lancer mon projet à Montévrain',

    metaTitle:
      'Agence web Montévrain (77) – Création site internet, SEO, refonte',
    metaDescription:
      'Ikovaline : sites performants, SEO local et SEA à Montévrain. Développez vos leads et vos ventes.',
  },

  // 5) Bailly-Romainvilliers
  {
    id: 'agence-web-bailly-romainvilliers',
    ville: 'Bailly-Romainvilliers' as Ville77,
    departement: 'Seine-et-Marne',

    intro: `À Bailly-Romainvilliers, Ikovaline construit des sites rapides et crédibles, optimise votre SEO local et vos campagnes Ads pour capter la demande (tourisme, services, artisans).`,

    text1: (
      <span>
        Notre <strong>agence web à Bailly-Romainvilliers</strong> aide hôtels,
        restaurants, artisans et indépendants à convertir plus de visiteurs en
        clients autour de{' '}
        <Link href="/agence-web-bailly-romainvilliers">
          Bailly-Romainvilliers
        </Link>
        .
      </span>
    ),

    services: [
      {
        text: 'Création de sites web',
        subtext:
          'Design propre, rassurant, orienté conversion (CTA clairs, avis, preuves).',
        link: 'nos-services/creation-sites-web-vitrine-e-commerce',
      },
      {
        text: 'Référencement SEO',
        subtext:
          'Captez la demande locale : fiche établissement, contenus ciblés, maillage interne.',
        link: 'nos-services/seo-referencement-naturel',
      },
      {
        text: 'Maintenance et support',
        subtext:
          'Nous sécurisons et maintenons votre site pour garantir sa disponibilité.',
        link: 'nos-services/creation-site-web-sur-mesure',
      },
      {
        text: 'Web marketing',
        subtext:
          'SEA & Social Ads, tracking des conversions, reporting clair et actionnable.',
        link: 'nos-services/gestion-campagnes-sea',
      },
    ],

    objectifs: {
      objectifTitle:
        'Notre mission à Bailly-Romainvilliers : une présence web qui vend',
      text1: 'Allier image pro, référencement local et campagnes rentables.',
      text2:
        'Livrer un dispositif mesurable avec des objectifs chiffrés et suivis.',
    },

    villesVoisines: [...ALL_VILLES_77],

    cityAroundText: (
      <span className="text-center">
        Présents à Bailly-Romainvilliers et dans ces 9 autres villes :{' '}
        {ALL_VILLES_77.map((v, i, arr) => (
          <span key={v}>
            <Link href={`/agence-web-${removeAccents(v)}`}>{v}</Link>
            {i < arr.length - 2 ? ', ' : i === arr.length - 2 ? ' et ' : ''}
          </span>
        ))}{' '}
        .
      </span>
    ),

    CTATitle: 'Besoin d’un site qui performe à Bailly-Romainvilliers ?',
    CTADesc:
      'Ikovaline conçoit, référence et promeut votre site pour générer des clients.',
    CTATextBtn: 'Démarrer à Bailly-Romainvilliers',

    metaTitle:
      'Agence web Bailly-Romainvilliers (77) – Création site internet, SEO',
    metaDescription:
      'Sites crédibles, SEO local & Ads à Bailly-Romainvilliers. Ikovaline, votre partenaire acquisition en Seine-et-Marne.',
  },

  // 6) Lagny-sur-Marne
  {
    id: 'agence-web-lagny-sur-marne',
    ville: 'Lagny-sur-Marne' as Ville77,
    departement: 'Seine-et-Marne',

    intro: `Ikovaline, agence web à Lagny-sur-Marne : création/refonte de site, SEO local et campagnes Ads pour commerces, professions libérales et services.`,

    text1: (
      <span>
        À <strong>Lagny-sur-Marne</strong>, nous concevons des sites{' '}
        <Link href="/agence-web-lagny-sur-marne">clairs et persuasifs</Link> et
        des stratégies SEO/Ads qui amènent de vraies demandes.
      </span>
    ),

    services: [
      {
        text: 'Création de sites web',
        subtext:
          'UX lisible, formulaires performants, prise de RDV, tunnel de vente fluide.',
        link: 'nos-services/creation-sites-web-vitrine-e-commerce',
      },
      {
        text: 'Référencement SEO',
        subtext:
          'Requêtes locales, contenus utiles, maillage et technique propres à Lagny.',
        link: 'nos-services/seo-referencement-naturel',
      },
      {
        text: 'Maintenance et support',
        subtext: 'Mises à jour, sécurité, monitoring et évolutions continues.',
        link: 'nos-services/creation-site-web-sur-mesure',
      },
      {
        text: 'Web marketing',
        subtext:
          'Campagnes SEA et Social Ads pour booster rapidement votre visibilité.',
        link: 'nos-services/gestion-campagnes-sea',
      },
    ],

    objectifs: {
      objectifTitle:
        'Notre mission à Lagny-sur-Marne : faire croître vos demandes',
      text1:
        'Aligner le site, le SEO et les Ads sur vos parcours clients réels.',
      text2: 'Analyser, tester et itérer pour améliorer le taux de conversion.',
    },

    villesVoisines: [...ALL_VILLES_77],

    cityAroundText: (
      <span className="text-center">
        Ikovaline intervient à Lagny-sur-Marne et dans ces villes :{' '}
        {ALL_VILLES_77.map((v, i, arr) => (
          <span key={v}>
            <Link href={`/agence-web-${removeAccents(v)}`}>{v}</Link>
            {i < arr.length - 2 ? ', ' : i === arr.length - 2 ? ' et ' : ''}
          </span>
        ))}{' '}
        .
      </span>
    ),

    CTATitle: 'Objectif : plus de leads à Lagny-sur-Marne',
    CTADesc:
      'On construit un dispositif complet (site + SEO + Ads) pour accélérer.',
    CTATextBtn: 'Parler à un expert Ikovaline',

    metaTitle: 'Agence web Lagny-sur-Marne (77) – Création site, SEO, refonte',
    metaDescription:
      'Ikovaline : sites performants, SEO local et Ads à Lagny-sur-Marne. Générez plus de contacts qualifiés.',
  },

  // 7) Torcy
  {
    id: 'agence-web-torcy',
    ville: 'Torcy' as Ville77,
    departement: 'Seine-et-Marne',

    intro: `Agence web à Torcy : création/refonte de site, SEO local, Google Ads & Social Ads pour commerces et services au cœur de Marne-la-Vallée.`,

    text1: (
      <span>
        À <strong>Torcy</strong>, nous créons des sites rapides et alignés
        business, et des stratégies d’acquisition efficaces. Découvrez :{' '}
        <Link href="/agence-web-torcy">notre offre Torcy</Link>.
      </span>
    ),

    services: [
      {
        text: 'Création de sites web',
        subtext: 'Landing pages, e-commerce, blog : structure orientée ROI.',
        link: 'nos-services/creation-sites-web-vitrine-e-commerce',
      },
      {
        text: 'Référencement SEO',
        subtext:
          'Mots-clés locaux, contenus, pages services/villes et technique maîtrisée.',
        link: 'nos-services/seo-referencement-naturel',
      },
      {
        text: 'Maintenance et support',
        subtext:
          'Monitoring, correctifs, évolutions : votre site reste fiable et à jour.',
        link: 'nos-services/creation-site-web-sur-mesure',
      },
      {
        text: 'Web marketing',
        subtext:
          'SEA & Social Ads pour activer le volume rapidement, avec suivi des KPIs.',
        link: 'nos-services/gestion-campagnes-sea',
      },
    ],

    objectifs: {
      objectifTitle:
        'Notre mission à Torcy : délivrer du trafic utile et des conversions',
      text1: 'On privilégie la qualité du trafic et la valeur par visiteur.',
      text2: 'Tableaux de bord clairs pour piloter vos décisions marketing.',
    },

    villesVoisines: [...ALL_VILLES_77],

    cityAroundText: (
      <span className="text-center">
        Nous opérons à Torcy et dans ce réseau local :{' '}
        {ALL_VILLES_77.map((v, i, arr) => (
          <span key={v}>
            <Link href={`/agence-web-${removeAccents(v)}`}>{v}</Link>
            {i < arr.length - 2 ? ', ' : i === arr.length - 2 ? ' et ' : ''}
          </span>
        ))}{' '}
        .
      </span>
    ),

    CTATitle: 'Vous voulez accélérer à Torcy ?',
    CTADesc:
      'On s’occupe de la création/refonte, du SEO et des Ads — focus sur vos résultats.',
    CTATextBtn: 'Discuter de mon projet à Torcy',

    metaTitle: 'Agence web Torcy (77) – Site, SEO, SEA',
    metaDescription:
      'Ikovaline à Torcy : sites performants, SEO local et campagnes Ads pour générer des clients rapidement.',
  },

  // 8) Lognes
  {
    id: 'agence-web-lognes',
    ville: 'Lognes' as Ville77,
    departement: 'Seine-et-Marne',

    intro: `Ikovaline, agence web à Lognes : sites vitrines/e-commerce, refonte, SEO et campagnes Ads pour le tissu tertiaire et tech de Marne-la-Vallée.`,

    text1: (
      <span>
        Notre <strong>agence web à Lognes</strong> aligne votre site et votre
        acquisition sur vos objectifs :{' '}
        <Link href="/agence-web-lognes">Lognes</Link> et les zones d’activités
        voisines (A4/RER A).
      </span>
    ),

    services: [
      {
        text: 'Création de sites web',
        subtext:
          'Architecture claire, performance Core Web Vitals, conformité RGPD.',
        link: 'nos-services/creation-sites-web-vitrine-e-commerce',
      },
      {
        text: 'Référencement SEO',
        subtext:
          'Cocon sémantique, maillage interne, pages locales et optimisation on-page.',
        link: 'nos-services/seo-referencement-naturel',
      },
      {
        text: 'Maintenance et support',
        subtext:
          'Support réactif, sécurité, sauvegardes et évolutions produit.',
        link: 'nos-services/creation-site-web-sur-mesure',
      },
      {
        text: 'Web marketing',
        subtext: 'SEA B2B/B2C, remarketing, contenus experts et nurturing.',
        link: 'nos-services/gestion-campagnes-sea',
      },
    ],

    objectifs: {
      objectifTitle:
        'Notre mission à Lognes : un dispositif digital robuste et rentable',
      text1: 'Allier excellence technique et marketing pragmatique.',
      text2: 'Mettre en place des KPIs clairs : MQL/SQL, coût par lead, ROAS.',
    },

    villesVoisines: [...ALL_VILLES_77],

    cityAroundText: (
      <span className="text-center">
        Ikovaline couvre Lognes et les villes suivantes :{' '}
        {ALL_VILLES_77.map((v, i, arr) => (
          <span key={v}>
            <Link href={`/agence-web-${removeAccents(v)}`}>{v}</Link>
            {i < arr.length - 2 ? ', ' : i === arr.length - 2 ? ' et ' : ''}
          </span>
        ))}{' '}
        .
      </span>
    ),

    CTATitle: 'Structurer votre acquisition à Lognes',
    CTADesc: 'Site + SEO + Ads : une approche complète, mesurée et pilotée.',
    CTATextBtn: 'Parler à Ikovaline – Lognes',

    metaTitle: 'Agence web Lognes (77) – Création site, SEO, Ads',
    metaDescription:
      'Sites rapides, SEO local et Ads à Lognes. Ikovaline, partenaire digital des entreprises de Marne-la-Vallée.',
  },

  // 9) Champs-sur-Marne
  {
    id: 'agence-web-champs-sur-marne',
    ville: 'Champs-sur-Marne' as Ville77,
    departement: 'Seine-et-Marne',

    intro: `À Champs-sur-Marne (Cité Descartes), Ikovaline accompagne innovation, services et éducation : sites performants, SEO local et SEA.`,

    text1: (
      <span>
        Notre <strong>agence web à Champs-sur-Marne</strong> conçoit des sites
        et des funnels d’acquisition adaptés aux enjeux d’innovation :{' '}
        <Link href="/agence-web-champs-sur-marne">Champs-sur-Marne</Link> et
        l’écosystème Descartes.
      </span>
    ),

    services: [
      {
        text: 'Création de sites web',
        subtext:
          'Positionnement clair, narration produit, pages conversion (demo/essai).',
        link: 'nos-services/creation-sites-web-vitrine-e-commerce',
      },
      {
        text: 'Référencement SEO',
        subtext: 'SEO technique propre, contenus piliers et landing locales.',
        link: 'nos-services/seo-referencement-naturel',
      },
      {
        text: 'Maintenance et support',
        subtext:
          'MCO : sécurité, performances, CI/CD et améliorations continues.',
        link: 'nos-services/creation-site-web-sur-mesure',
      },
      {
        text: 'Web marketing',
        subtext:
          'SEA, LinkedIn Ads, content et email pour générer des leads qualifiés.',
        link: 'nos-services/gestion-campagnes-sea',
      },
    ],

    objectifs: {
      objectifTitle:
        'Notre mission à Champs-sur-Marne : un tunnel acquisition maîtrisé',
      text1:
        'Clarifier la proposition de valeur et lever les frictions de conversion.',
      text2: 'Mettre en place un suivi data propre pour itérer précisément.',
    },

    villesVoisines: [...ALL_VILLES_77],

    cityAroundText: (
      <span className="text-center">
        Intervention à Champs-sur-Marne et dans ces villes :{' '}
        {ALL_VILLES_77.map((v, i, arr) => (
          <span key={v}>
            <Link href={`/agence-web-${removeAccents(v)}`}>{v}</Link>
            {i < arr.length - 2 ? ', ' : i === arr.length - 2 ? ' et ' : ''}
          </span>
        ))}{' '}
        .
      </span>
    ),

    CTATitle: 'Mettre votre produit en lumière à Champs-sur-Marne',
    CTADesc:
      'Site, SEO, Ads : un pipeline marketing complet, orienté résultats.',
    CTATextBtn: 'Démarrer à Champs-sur-Marne',

    metaTitle:
      'Agence web Champs-sur-Marne (77) – Site, SEO, SEA – Cité Descartes',
    metaDescription:
      'Ikovaline : sites performants, SEO/SEA pour l’innovation et les services à Champs-sur-Marne.',
  },

  // 10) Meaux
  {
    id: 'agence-web-meaux',
    ville: 'Meaux' as Ville77,
    departement: 'Seine-et-Marne',

    intro: `Ikovaline, agence web à Meaux : création/refonte de sites, SEO local et Ads pour commerces, industrie légère, services et professions libérales.`,

    text1: (
      <span>
        À <strong>Meaux</strong>, nous aidons les entreprises à structurer une
        présence digitale efficace et mesurable :{' '}
        <Link href="/agence-web-meaux">Meaux</Link> et son bassin d’emploi.
      </span>
    ),

    services: [
      {
        text: 'Création de sites web',
        subtext:
          'Des sites rapides, crédibles, orientés contact et vente (formulaires, devis, réservation).',
        link: 'nos-services/creation-sites-web-vitrine-e-commerce',
      },
      {
        text: 'Référencement SEO',
        subtext:
          'Stratégie locale (pages “ville”, contenus métiers, avis) pour capter la demande sur Meaux.',
        link: 'nos-services/seo-referencement-naturel',
      },
      {
        text: 'Maintenance et support',
        subtext:
          'Un site toujours opérationnel pour soutenir l’activité commerciale.',
        link: 'nos-services/creation-site-web-sur-mesure',
      },
      {
        text: 'Web marketing',
        subtext:
          'Campagnes SEA et Social Ads rentables, pilotées par les bons indicateurs.',
        link: 'nos-services/gestion-campagnes-sea',
      },
    ],

    objectifs: {
      objectifTitle:
        'Notre mission à Meaux : des résultats tangibles pour votre activité',
      text1:
        'Augmenter vos demandes entrantes et la part de clients récurrents.',
      text2: 'Assurer une croissance durable par l’amélioration continue.',
    },

    villesVoisines: [...ALL_VILLES_77],

    cityAroundText: (
      <span className="text-center">
        Ikovaline intervient à Meaux et dans les villes suivantes :{' '}
        {ALL_VILLES_77.map((v, i, arr) => (
          <span key={v}>
            <Link href={`/agence-web-${removeAccents(v)}`}>{v}</Link>
            {i < arr.length - 2 ? ', ' : i === arr.length - 2 ? ' et ' : ''}
          </span>
        ))}{' '}
        .
      </span>
    ),

    CTATitle: 'Un site qui performe à Meaux',
    CTADesc:
      'Création/refonte, SEO local, SEA : on déploie un plan clair, mesuré et évolutif.',
    CTATextBtn: 'Parler à Ikovaline – Meaux',

    metaTitle: 'Agence web Meaux (77) – Création site, SEO, Ads',
    metaDescription:
      'Sites rapides, SEO local et SEA à Meaux. Ikovaline – votre agence web en Seine-et-Marne.',
  },
] as const;
