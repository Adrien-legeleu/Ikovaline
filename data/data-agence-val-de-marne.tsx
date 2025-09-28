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
        'Aligner produit (site/SaaS), SEO local et campagnes pour capter une demande qualifiée à Créteil.',
      text2:
        'Mesurer, tester, itérer : CRO, heatmaps, A/B tests pour améliorer durablement la conversion.',
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
        'Positionner votre activité sur les requêtes locales à intention commerciale.',
      text2:
        'Optimiser le funnel (formulaires, devis, réservation) et le suivi analytics.',
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
        'Captez les requêtes locales à forte intention (devis, rdv, commande).',
      text2:
        'Améliorez le taux de conversion et la LTV via un site rapide et rassurant.',
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
      text1: 'Mettre en place un tunnel clair (landing → preuve → conversion).',
      text2:
        'Suivre les KPIs clés : trafic qualifié, taux de conversion, coût par lead.',
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
        'Rassurer (preuves, avis, réassurance) et simplifier la prise de contact.',
      text2: 'Optimiser le coût par lead par itérations (CRO + data + Ads).',
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
        'Clarifier la proposition de valeur et lever les frictions (preuves, FAQ, CTA).',
      text2: 'Suivi data propre (GA4, events, CRM) pour piloter les décisions.',
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
      text1: 'Industrialiser les pages locales et les pages services.',
      text2: 'Maximiser la conversion par itérations rapides (CRO).',
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
      text1: 'Élever la perception de marque tout en maximisant le ROI.',
      text2: 'Mettre en place un suivi précis (events, entonnoirs, cohortes).',
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
      text1: 'Structurer un système acquisition → qualification → conversion.',
      text2: 'Aligner SEO, Ads et contenu bas de funnel pour un CPA optimisé.',
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
        'Capter les recherches “création site internet + ville” et “service + Choisy”.',
      text2:
        'Optimiser le parcours (mobile-first, preuve sociale, offres, FAQ).',
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
