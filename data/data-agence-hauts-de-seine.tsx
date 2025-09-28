import { removeAccents } from '@/components/pageSatellite/CityAround';
import Link from 'next/link';

const ALL_VILLES_92 = [
  'Boulogne-Billancourt',
  'Neuilly-sur-Seine',
  'Courbevoie',
  'Levallois-Perret',
  'Nanterre',
  'Suresnes',
  'Clamart',
  'Colombes',
  'Montrouge',
  'Asnières-sur-Seine',
  'Malakoff',
  'Gennevilliers',
  'Clichy',
  'Meudon',
  'Puteaux',
  'Bagneux',
  'Issy-les-Moulineaux',
] as const;

export const dataAgenceHautsSeine = [
  // ========= 1) Boulogne-Billancourt =========
  {
    id: 'agence-web-boulogne-billancourt',
    ville: 'Boulogne-Billancourt',
    departement: 'Hauts-de-Seine',

    intro: `Vous recherchez une agence web à Boulogne-Billancourt ? Ikovaline vous accompagne dans la création de site internet, la refonte, le SEO local et le webmarketing. Boostez votre visibilité dans les Hauts-de-Seine grâce à une stratégie digitale performante.`,

    text1: (
      <span>
        Notre <strong>agence web à Boulogne-Billancourt</strong> met à votre
        service son expertise en <strong>création de site</strong>,{' '}
        <strong>refonte</strong>, <strong>SEO</strong> et{' '}
        <strong>campagnes Ads</strong>. Que vous soyez à{' '}
        <Link href="/agence-web-boulogne-billancourt">
          Boulogne-Billancourt
        </Link>{' '}
        ou dans une commune voisine, profitez de solutions sur-mesure pensées
        pour générer des résultats concrets dans le 92.
      </span>
    ),

    services: [
      {
        text: 'Création de sites web',
        subtext:
          'Vitrine ou e-commerce : design moderne, vitesse, responsive et SEO local intégré.',
        link: 'nos-services/creation-sites-web-vitrine-e-commerce',
      },
      {
        text: 'Référencement SEO',
        subtext:
          'Stratégie “métier + ville”, contenus optimisés, netlinking, technique irréprochable.',
        link: 'nos-services/seo-referencement-naturel',
      },
      {
        text: 'Maintenance et support',
        subtext:
          'Sécurité, mises à jour, sauvegardes, monitoring : un site stable et rapide.',
        link: 'nos-services/creation-site-web-sur-mesure',
      },
      {
        text: 'Web marketing',
        subtext:
          'Google Ads, Meta Ads, remarketing, tableaux de bord ROI et optimisation continue.',
        link: 'nos-services/gestion-campagnes-sea',
      },
    ],

    objectifs: {
      objectifTitle:
        'Notre mission à Boulogne-Billancourt : transformer votre site en machine à clients',
      text1:
        'Structurer un entonnoir clair (landing → preuve → conversion) et cibler les requêtes locales à forte intention.',
      text2:
        'Mesurer et itérer : CRO, heatmaps, A/B tests, suivi GA4/CRM pour améliorer durablement le coût par lead.',
    },

    villesVoisines: [...ALL_VILLES_92],

    cityAroundText: (
      <span className="text-center">
        Ikovaline intervient à Boulogne-Billancourt et dans ces communes du 92 :{' '}
        {ALL_VILLES_92.map((v, i, arr) => (
          <span key={v}>
            <Link href={`/agence-web-${removeAccents(v)}`}>{v}</Link>
            {i < arr.length - 2 ? ', ' : i === arr.length - 2 ? ' et ' : ''}
          </span>
        ))}{' '}
        .
      </span>
    ),

    CTATitle: 'Prêt à lancer votre projet web à Boulogne-Billancourt ?',
    CTADesc:
      'Création de site, SEO, Ads, maintenance : on construit un dispositif d’acquisition solide et mesurable.',
    CTATextBtn: 'Lancer mon projet à Boulogne-Billancourt',

    metaTitle:
      'Agence web Boulogne-Billancourt (92) – Création site internet, SEO, SEA – Hauts-de-Seine',
    metaDescription:
      'Ikovaline : sites performants, SEO local et Ads à Boulogne-Billancourt. Refonte, maintenance et reporting ROI pour votre croissance.',
  },

  // ========= 2) Neuilly-sur-Seine =========
  {
    id: 'agence-web-neuilly-sur-seine',
    ville: 'Neuilly-sur-Seine',
    departement: 'Hauts-de-Seine',

    intro: `Agence web à Neuilly-sur-Seine : création/refonte de site internet, SEO local, SEA et contenus pour générer des leads qualifiés dans les Hauts-de-Seine.`,

    text1: (
      <span>
        À <strong>Neuilly-sur-Seine</strong>, Ikovaline conçoit des{' '}
        <strong>sites web</strong> crédibles et rapides, un <strong>SEO</strong>{' '}
        robuste et des <strong>Ads</strong> rentables. Découvrez notre offre :{' '}
        <Link href="/agence-web-neuilly-sur-seine">Neuilly</Link>.
      </span>
    ),

    services: [
      {
        text: 'Création de sites web',
        subtext:
          'Design premium, UX, conversions nettes et Core Web Vitals maîtrisés.',
        link: 'nos-services/creation-sites-web-vitrine-e-commerce',
      },
      {
        text: 'Référencement SEO',
        subtext:
          'Pages locales, sémantique, maillage interne, netlinking ciblé 92.',
        link: 'nos-services/seo-referencement-naturel',
      },
      {
        text: 'Maintenance & support',
        subtext: 'SLA, sécurité, sauvegardes, roadmap d’évolutions continues.',
        link: 'nos-services/creation-site-web-sur-mesure',
      },
      {
        text: 'Web marketing',
        subtext:
          'SEA multi-réseaux, retargeting, brand search, reporting décisionnel.',
        link: 'nos-services/gestion-campagnes-sea',
      },
    ],

    objectifs: {
      objectifTitle:
        'Notre mission à Neuilly : image pro & performance commerciale',
      text1:
        'Aligner proposition de valeur, preuves sociales et offres pour lever les frictions.',
      text2:
        'Suivre les KPIs clés (trafic qualifié, conversion, CPA) et itérer chaque mois.',
    },

    villesVoisines: [...ALL_VILLES_92],

    cityAroundText: (
      <span className="text-center">
        Présents à Neuilly-sur-Seine et dans toutes ces villes du 92 :{' '}
        {ALL_VILLES_92.map((v, i, arr) => (
          <span key={v}>
            <Link href={`/agence-web-${removeAccents(v)}`}>{v}</Link>
            {i < arr.length - 2 ? ', ' : i === arr.length - 2 ? ' et ' : ''}
          </span>
        ))}{' '}
        .
      </span>
    ),

    CTATitle: 'Un site qui convertit à Neuilly-sur-Seine ?',
    CTADesc:
      'Site, SEO, Ads et data : on assemble un mix acquisition adapté à votre marché.',
    CTATextBtn: 'Parler à un expert – Neuilly',

    metaTitle:
      'Agence web Neuilly-sur-Seine (92) – Site, SEO, SEA – Hauts-de-Seine',
    metaDescription:
      'Création/refonte de site, SEO local et Ads à Neuilly-sur-Seine. Ikovaline, partenaire acquisition pour TPE/PME du 92.',
  },

  // ========= 3) Courbevoie =========
  {
    id: 'agence-web-courbevoie',
    ville: 'Courbevoie',
    departement: 'Hauts-de-Seine',

    intro: `Ikovaline, agence web à Courbevoie : création de site internet, refonte, SEO local, SEA et contenus pour accélérer votre acquisition dans le 92.`,

    text1: (
      <span>
        À <strong>Courbevoie</strong>, nous livrons des{' '}
        <strong>sites web</strong> performants et une{' '}
        <strong>stratégie SEO</strong> locale efficace. Plus d’infos :{' '}
        <Link href="/agence-web-courbevoie">notre offre Courbevoie</Link>.
      </span>
    ),

    services: [
      {
        text: 'Création de sites web',
        subtext:
          'Vitrine, e-commerce, landing pages : structure orientée conversion.',
        link: 'nos-services/creation-sites-web-vitrine-e-commerce',
      },
      {
        text: 'Référencement SEO',
        subtext:
          'Intention locale, on-page, technique, maillage, pages “ville + service”.',
        link: 'nos-services/seo-referencement-naturel',
      },
      {
        text: 'Maintenance & support',
        subtext: 'Mises à jour, sécurité, monitoring, améliorations continues.',
        link: 'nos-services/creation-site-web-sur-mesure',
      },
      {
        text: 'Web marketing',
        subtext: 'Google/Meta Ads, retargeting, AB tests, dashboards ROI.',
        link: 'nos-services/gestion-campagnes-sea',
      },
    ],

    objectifs: {
      objectifTitle:
        'Notre mission à Courbevoie : trafic utile & conversions mesurables',
      text1:
        'Positionner vos offres sur les requêtes locales à forte intention commerciale.',
      text2:
        'Optimiser formulaires, devis & réservation, plus suivi analytics propre.',
    },

    villesVoisines: [...ALL_VILLES_92],

    cityAroundText: (
      <span className="text-center">
        Ikovaline intervient à Courbevoie et dans ces villes du 92 :{' '}
        {ALL_VILLES_92.map((v, i, arr) => (
          <span key={v}>
            <Link href={`/agence-web-${removeAccents(v)}`}>{v}</Link>
            {i < arr.length - 2 ? ', ' : i === arr.length - 2 ? ' et ' : ''}
          </span>
        ))}{' '}
        .
      </span>
    ),

    CTATitle: 'Accélérer votre acquisition à Courbevoie',
    CTADesc:
      'Site, SEO, Ads et CRO : on met en place une machine à leads durable.',
    CTATextBtn: 'Démarrer à Courbevoie',

    metaTitle:
      'Agence web Courbevoie (92) – Création site, SEO, SEA – Hauts-de-Seine',
    metaDescription:
      'Sites performants, SEO local et Ads à Courbevoie. Ikovaline : acquisition prévisible, KPIs suivis et CRO.',
  },

  // ========= 4) Levallois-Perret =========
  {
    id: 'agence-web-levallois-perret',
    ville: 'Levallois-Perret',
    departement: 'Hauts-de-Seine',

    intro: `Agence web à Levallois-Perret (92) : création/refonte de site internet, SEO local, SEA et développement de l’acquisition pour entreprises et commerces.`,

    text1: (
      <span>
        À <strong>Levallois-Perret</strong>, Ikovaline conçoit des{' '}
        <strong>sites web</strong> crédibles et orientés conversion, avec un{' '}
        <strong>SEO</strong> local performant et des <strong>Ads</strong>{' '}
        maîtrisés. Découvrir :{' '}
        <Link href="/agence-web-levallois-perret">notre page Levallois</Link>.
      </span>
    ),

    services: [
      {
        text: 'Création de sites web',
        subtext:
          'Branding, UX, performance, CMS maîtrisé pour publier vite et bien.',
        link: 'nos-services/creation-sites-web-vitrine-e-commerce',
      },
      {
        text: 'Référencement SEO',
        subtext:
          'Audit, cocon “ville + service”, contenus, netlinking régional.',
        link: 'nos-services/seo-referencement-naturel',
      },
      {
        text: 'Maintenance & support',
        subtext: 'Uptime, sécurité, correctifs, évolutions planifiées (CWV).',
        link: 'nos-services/creation-site-web-sur-mesure',
      },
      {
        text: 'Web marketing',
        subtext: 'SEA full-funnel, retargeting, email marketing, ROAS.',
        link: 'nos-services/gestion-campagnes-sea',
      },
    ],

    objectifs: {
      objectifTitle:
        'Notre mission à Levallois : acquisition prévisible et rentable',
      text1:
        'Industrialiser les pages services & locales, avec messages orientés bénéfices.',
      text2:
        'Maximiser la conversion par itérations rapides (CRO + tests A/B).',
    },

    villesVoisines: [...ALL_VILLES_92],

    cityAroundText: (
      <span className="text-center">
        Présence à Levallois-Perret et dans tout le 92 :{' '}
        {ALL_VILLES_92.map((v, i, arr) => (
          <span key={v}>
            <Link href={`/agence-web-${removeAccents(v)}`}>{v}</Link>
            {i < arr.length - 2 ? ', ' : i === arr.length - 2 ? ' et ' : ''}
          </span>
        ))}{' '}
        .
      </span>
    ),

    CTATitle: 'Booster votre acquisition à Levallois-Perret',
    CTADesc: 'Site + SEO + Ads + data : on déploie un plan clair et mesurable.',
    CTATextBtn: 'Lancer mon projet à Levallois',

    metaTitle:
      'Agence web Levallois-Perret (92) – Site, SEO, SEA – Hauts-de-Seine',
    metaDescription:
      'Ikovaline : création/refonte, SEO local, Ads et maintenance à Levallois-Perret pour générer plus de demandes.',
  },

  // ========= 5) Nanterre =========
  {
    id: 'agence-web-nanterre',
    ville: 'Nanterre',
    departement: 'Hauts-de-Seine',

    intro: `Ikovaline, agence web à Nanterre : création de site, refonte, SEO local, SEA et contenus. Objectif : un pipeline de demandes qualifiées.`,

    text1: (
      <span>
        À <strong>Nanterre</strong>, nous alignons <strong>site</strong>,{' '}
        <strong>SEO</strong> et <strong>Ads</strong> pour capter une demande
        qualifiée. En savoir plus :{' '}
        <Link href="/agence-web-nanterre">offre Nanterre</Link>.
      </span>
    ),

    services: [
      {
        text: 'Création de sites web',
        subtext:
          'Architecture conversion, preuves, CTA, vitesse & mobile-first.',
        link: 'nos-services/creation-sites-web-vitrine-e-commerce',
      },
      {
        text: 'Référencement SEO',
        subtext: 'Intention locale, on-page, technique, E-E-A-T, netlinking.',
        link: 'nos-services/seo-referencement-naturel',
      },
      {
        text: 'Maintenance & support',
        subtext: 'Sécurité, sauvegardes, monitoring, MCO.',
        link: 'nos-services/creation-site-web-sur-mesure',
      },
      {
        text: 'Web marketing',
        subtext:
          'Google Ads/Meta, retargeting, reporting clair, optimisation CPA.',
        link: 'nos-services/gestion-campagnes-sea',
      },
    ],

    objectifs: {
      objectifTitle:
        'Notre mission à Nanterre : un système acquisition → qualification → conversion',
      text1:
        'Cibler les requêtes locales “service + Nanterre” et requêtes concurrentielles.',
      text2:
        'Mettre en place un suivi data fiable (GA4, events, CRM) pour piloter le ROI.',
    },

    villesVoisines: [...ALL_VILLES_92],

    cityAroundText: (
      <span className="text-center">
        Ikovaline couvre Nanterre et tout le 92 :{' '}
        {ALL_VILLES_92.map((v, i, arr) => (
          <span key={v}>
            <Link href={`/agence-web-${removeAccents(v)}`}>{v}</Link>
            {i < arr.length - 2 ? ', ' : i === arr.length - 2 ? ' et ' : ''}
          </span>
        ))}{' '}
        .
      </span>
    ),

    CTATitle: 'Construire une acquisition solide à Nanterre',
    CTADesc:
      'Création/refonte, SEO, Ads et data : on vise un deal-flow régulier.',
    CTATextBtn: 'Démarrer à Nanterre',

    metaTitle:
      'Agence web Nanterre (92) – Création site, SEO, SEA – Hauts-de-Seine',
    metaDescription:
      'Sites rapides, SEO local, Ads et CRO à Nanterre. Ikovaline, votre partenaire acquisition.',
  },

  // ========= 6) Suresnes =========
  {
    id: 'agence-web-suresnes',
    ville: 'Suresnes',
    departement: 'Hauts-de-Seine',

    intro: `Agence web Suresnes (92) : création de site internet, refonte, SEO local, SEA et optimisation de conversion pour TPE/PME.`,

    text1: (
      <span>
        À <strong>Suresnes</strong>, nous créons des <strong>sites web</strong>{' '}
        rapides et <strong>SEO-ready</strong> avec un plan d’acquisition
        actionnable (contenu + Ads). Voir :{' '}
        <Link href="/agence-web-suresnes">offre Suresnes</Link>.
      </span>
    ),

    services: [
      {
        text: 'Création de sites web',
        subtext: 'Structure ROI : CTA visibles, preuves, formulaires clairs.',
        link: 'nos-services/creation-sites-web-vitrine-e-commerce',
      },
      {
        text: 'Référencement SEO',
        subtext: 'Plan sémantique local, pages “ville + service”, schema.org.',
        link: 'nos-services/seo-referencement-naturel',
      },
      {
        text: 'Maintenance & support',
        subtext: 'Disponibilité, sécurité, correctifs et évolutions continues.',
        link: 'nos-services/creation-site-web-sur-mesure',
      },
      {
        text: 'Web marketing',
        subtext: 'Ads multi-réseaux, retargeting, reporting décisionnel.',
        link: 'nos-services/gestion-campagnes-sea',
      },
    ],

    objectifs: {
      objectifTitle:
        'Notre mission à Suresnes : leads qualifiés & croissance durable',
      text1:
        'Mettre en place un funnel court et rassurant pour maximiser la prise de contact.',
      text2:
        'Optimiser le coût par lead via CRO + itérations sur messages/offres.',
    },

    villesVoisines: [...ALL_VILLES_92],

    cityAroundText: (
      <span className="text-center">
        Présents à Suresnes et dans ces villes des Hauts-de-Seine :{' '}
        {ALL_VILLES_92.map((v, i, arr) => (
          <span key={v}>
            <Link href={`/agence-web-${removeAccents(v)}`}>{v}</Link>
            {i < arr.length - 2 ? ', ' : i === arr.length - 2 ? ' et ' : ''}
          </span>
        ))}{' '}
        .
      </span>
    ),

    CTATitle: 'Générer plus de demandes à Suresnes',
    CTADesc:
      'Site, SEO, Ads : on assemble une stack digitale orientée résultats.',
    CTATextBtn: 'Parler à Ikovaline – Suresnes',

    metaTitle: 'Agence web Suresnes (92) – Site, SEO, SEA – Hauts-de-Seine',
    metaDescription:
      'Ikovaline : création/refonte de site, SEO local, Ads et CRO à Suresnes. Visez une acquisition rentable.',
  },

  // ========= 7) Clamart =========
  {
    id: 'agence-web-clamart',
    ville: 'Clamart',
    departement: 'Hauts-de-Seine',

    intro: `Ikovaline, agence web à Clamart : création de site internet, refonte, SEO local, SEA et maintenance pour un dispositif fiable et performant.`,

    text1: (
      <span>
        Notre <strong>agence web à Clamart</strong> conçoit des sites rapides et
        crédibles, avec une stratégie <strong>SEO</strong> locale efficace.
        Découvrir : <Link href="/agence-web-clamart">offre Clamart</Link>.
      </span>
    ),

    services: [
      {
        text: 'Création de sites web',
        subtext: 'Design soigné, UX claire, mobile-first, conversions nettes.',
        link: 'nos-services/creation-sites-web-vitrine-e-commerce',
      },
      {
        text: 'Référencement SEO',
        subtext:
          'Cocon sémantique, contenus experts, optimisation on-page/technique.',
        link: 'nos-services/seo-referencement-naturel',
      },
      {
        text: 'Maintenance & support',
        subtext: 'SLA, sécurité, backups, monitoring 24/7.',
        link: 'nos-services/creation-site-web-sur-mesure',
      },
      {
        text: 'Web marketing',
        subtext:
          'SEA, social ads, email marketing, analytics et tableaux de bord.',
        link: 'nos-services/gestion-campagnes-sea',
      },
    ],

    objectifs: {
      objectifTitle:
        'Notre mission à Clamart : visibilité locale & conversions',
      text1: 'Rassurer (preuves, avis, FAQ) et simplifier la prise de contact.',
      text2: 'Réduire le CPA par itérations (CRO + data + Ads).',
    },

    villesVoisines: [...ALL_VILLES_92],

    cityAroundText: (
      <span className="text-center">
        Ikovaline couvre Clamart et ces villes du 92 :{' '}
        {ALL_VILLES_92.map((v, i, arr) => (
          <span key={v}>
            <Link href={`/agence-web-${removeAccents(v)}`}>{v}</Link>
            {i < arr.length - 2 ? ', ' : i === arr.length - 2 ? ' et ' : ''}
          </span>
        ))}{' '}
        .
      </span>
    ),

    CTATitle: 'Un site qui performe à Clamart',
    CTADesc:
      'Création/refonte, SEO local, Ads et data : un mix acquisition efficace.',
    CTATextBtn: 'Lancer mon projet à Clamart',

    metaTitle:
      'Agence web Clamart (92) – Création site, SEO, SEA – Hauts-de-Seine',
    metaDescription:
      'Sites rapides, SEO local, Ads et maintenance à Clamart. Ikovaline, partenaire acquisition dans le 92.',
  },

  // ========= 8) Colombes =========
  {
    id: 'agence-web-colombes',
    ville: 'Colombes',
    departement: 'Hauts-de-Seine',

    intro: `Agence web à Colombes (92) : création/refonte de site, SEO local, SEA et contenus pour générer du trafic qualifié et des leads.`,

    text1: (
      <span>
        À <strong>Colombes</strong>, Ikovaline conçoit un dispositif digital
        complet : <strong>site</strong>, <strong>SEO</strong>,{' '}
        <strong>Ads</strong> et <strong>CRO</strong>. Voir :{' '}
        <Link href="/agence-web-colombes">offre Colombes</Link>.
      </span>
    ),

    services: [
      {
        text: 'Création de sites web',
        subtext:
          'Vitrine/e-commerce, pages conversion (devis/RDV), vitesse & UX.',
        link: 'nos-services/creation-sites-web-vitrine-e-commerce',
      },
      {
        text: 'Référencement SEO',
        subtext: 'Plan local, contenus, netlinking régional, rich snippets.',
        link: 'nos-services/seo-referencement-naturel',
      },
      {
        text: 'Maintenance & support',
        subtext: 'Correctifs, mises à jour, performance continue (CWV).',
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
      objectifTitle: 'Notre mission à Colombes : pipeline de demandes',
      text1:
        'Cibler “service + Colombes” et les requêtes transactionnelles du 92.',
      text2:
        'Optimiser le funnel et le suivi analytics pour des décisions data-driven.',
    },

    villesVoisines: [...ALL_VILLES_92],

    cityAroundText: (
      <span className="text-center">
        Intervention à Colombes et dans ces villes des Hauts-de-Seine :{' '}
        {ALL_VILLES_92.map((v, i, arr) => (
          <span key={v}>
            <Link href={`/agence-web-${removeAccents(v)}`}>{v}</Link>
            {i < arr.length - 2 ? ', ' : i === arr.length - 2 ? ' et ' : ''}
          </span>
        ))}{' '}
        .
      </span>
    ),

    CTATitle: 'Déployer une acquisition sérieuse à Colombes',
    CTADesc: 'Site + SEO + Ads + produit digital : un plan clair et mesurable.',
    CTATextBtn: 'Démarrer à Colombes',

    metaTitle:
      'Agence web Colombes (92) – Création site, SEO, SEA – Hauts-de-Seine',
    metaDescription:
      'Ikovaline : sites performants, SEO local, Ads et CRO à Colombes pour une acquisition prévisible.',
  },

  // ========= 9) Montrouge =========
  {
    id: 'agence-web-montrouge',
    ville: 'Montrouge',
    departement: 'Hauts-de-Seine',

    intro: `Ikovaline, agence web à Montrouge : création/refonte de site, SEO local, SEA et maintenance pour artisans, commerces et PME.`,

    text1: (
      <span>
        À <strong>Montrouge</strong>, nous livrons des{' '}
        <strong>sites web</strong> rapides et une stratégie <strong>SEO</strong>{' '}
        locale solide, couplés à des <strong>Ads</strong> rentables. Découvrir :{' '}
        <Link href="/agence-web-montrouge">offre Montrouge</Link>.
      </span>
    ),

    services: [
      {
        text: 'Création de sites web',
        subtext: 'Architecture SEO + conversion, messages orientés bénéfices.',
        link: 'nos-services/creation-sites-web-vitrine-e-commerce',
      },
      {
        text: 'Référencement SEO',
        subtext: 'Ciblage local, on-page, technique, maillage & avis clients.',
        link: 'nos-services/seo-referencement-naturel',
      },
      {
        text: 'Maintenance & support',
        subtext: 'Support réactif, sécurité, sauvegardes, évolutions.',
        link: 'nos-services/creation-site-web-sur-mesure',
      },
      {
        text: 'Web marketing',
        subtext: 'Ads, social, email, ABM léger selon le contexte.',
        link: 'nos-services/gestion-campagnes-sea',
      },
    ],

    objectifs: {
      objectifTitle:
        'Notre mission à Montrouge : transformer le trafic en clients',
      text1:
        'Clarifier l’offre et les preuves pour lever les freins et augmenter le taux de contact.',
      text2:
        'Améliorer la conversion par itérations (CRO + A/B testing + analyse).',
    },

    villesVoisines: [...ALL_VILLES_92],

    cityAroundText: (
      <span className="text-center">
        Ikovaline intervient à Montrouge et dans tout le 92 :{' '}
        {ALL_VILLES_92.map((v, i, arr) => (
          <span key={v}>
            <Link href={`/agence-web-${removeAccents(v)}`}>{v}</Link>
            {i < arr.length - 2 ? ', ' : i === arr.length - 2 ? ' et ' : ''}
          </span>
        ))}{' '}
        .
      </span>
    ),

    CTATitle: 'Prendre de l’avance à Montrouge',
    CTADesc: 'Site + SEO + Ads + data : une stratégie locale qui convertit.',
    CTATextBtn: 'Lancer mon projet à Montrouge',

    metaTitle: 'Agence web Montrouge (92) – Site, SEO, SEA – Hauts-de-Seine',
    metaDescription:
      'Création/refonte, SEO local, Ads et CRO à Montrouge. Ikovaline, votre partenaire acquisition.',
  },

  // ========= 10) Asnières-sur-Seine =========
  {
    id: 'agence-web-asnieres-sur-seine',
    ville: 'Asnières-sur-Seine',
    departement: 'Hauts-de-Seine',

    intro: `Agence web à Asnières-sur-Seine : création de site, refonte, SEO local, SEA et suivi analytics pour un business mesurable.`,

    text1: (
      <span>
        À <strong>Asnières-sur-Seine</strong>, Ikovaline assemble{' '}
        <strong>site</strong>, <strong>SEO</strong> et <strong>Ads</strong> pour
        un maximum d’impact. Voir :{' '}
        <Link href="/agence-web-asnieres-sur-seine">offre Asnières</Link>.
      </span>
    ),

    services: [
      {
        text: 'Création de sites web',
        subtext:
          'Vitesse, UX, crédibilité : un site pensé pour convertir dès le 1er jour.',
        link: 'nos-services/creation-sites-web-vitrine-e-commerce',
      },
      {
        text: 'Référencement SEO',
        subtext:
          'Ciblage “ville + service”, contenus, rich snippets et netlinking.',
        link: 'nos-services/seo-referencement-naturel',
      },
      {
        text: 'Maintenance & support',
        subtext:
          'Sécurité, MCO, correctifs, évolutions, disponibilité maîtrisée.',
        link: 'nos-services/creation-site-web-sur-mesure',
      },
      {
        text: 'Web marketing',
        subtext: 'SEA/Search, Social Ads, retargeting, email nurturing.',
        link: 'nos-services/gestion-campagnes-sea',
      },
    ],

    objectifs: {
      objectifTitle:
        'Notre mission à Asnières : visibilité forte, conversion simple',
      text1:
        'Captez les requêtes locales à forte intention (devis, RDV, commande).',
      text2:
        'Suivi GA4/CRM, entonnoirs & cohortes pour des arbitrages éclairés.',
    },

    villesVoisines: [...ALL_VILLES_92],

    cityAroundText: (
      <span className="text-center">
        Présence à Asnières-sur-Seine et dans ces villes du 92 :{' '}
        {ALL_VILLES_92.map((v, i, arr) => (
          <span key={v}>
            <Link href={`/agence-web-${removeAccents(v)}`}>{v}</Link>
            {i < arr.length - 2 ? ', ' : i === arr.length - 2 ? ' et ' : ''}
          </span>
        ))}{' '}
        .
      </span>
    ),

    CTATitle: 'Un site qui vend à Asnières-sur-Seine',
    CTADesc:
      'Création/refonte, SEO local, Ads et data : on vise des résultats mesurables.',
    CTATextBtn: 'Parler à Ikovaline – Asnières',

    metaTitle:
      'Agence web Asnières-sur-Seine (92) – Site, SEO, SEA – Hauts-de-Seine',
    metaDescription:
      'Ikovaline : sites performants, SEO local et Ads à Asnières-sur-Seine. Développez vos leads dans le 92.',
  },

  // ========= 11) Malakoff =========
  {
    id: 'agence-web-malakoff',
    ville: 'Malakoff',
    departement: 'Hauts-de-Seine',

    intro: `Ikovaline, agence web à Malakoff : création/refonte de site, SEO, Ads et maintenance pour une acquisition durable.`,

    text1: (
      <span>
        À <strong>Malakoff</strong>, nous combinons <strong>site</strong>,{' '}
        <strong>SEO</strong> et <strong>SEA</strong> pour générer des leads
        qualifiés localement. Voir :{' '}
        <Link href="/agence-web-malakoff">offre Malakoff</Link>.
      </span>
    ),

    services: [
      {
        text: 'Création de sites web',
        subtext:
          'Modernes, rapides, responsive et optimisés pour le SEO local du 92.',
        link: 'nos-services/creation-sites-web-vitrine-e-commerce',
      },
      {
        text: 'Référencement SEO',
        subtext: 'Mots-clés, contenu, maillage, technique, avis & GBP.',
        link: 'nos-services/seo-referencement-naturel',
      },
      {
        text: 'Maintenance & support',
        subtext: 'Sécurité, sauvegardes, support réactif et évolutions.',
        link: 'nos-services/creation-site-web-sur-mesure',
      },
      {
        text: 'Web marketing',
        subtext:
          'Campagnes Ads, social, content marketing & marketing automation.',
        link: 'nos-services/gestion-campagnes-sea',
      },
    ],

    objectifs: {
      objectifTitle:
        'Notre mission à Malakoff : baisser le CPL, augmenter la conversion',
      text1:
        'Messages orientés bénéfices, CTA visibles, preuves sociales solides.',
      text2:
        'Tests continus (A/B, heatmaps) et dashboards ROI pour piloter les dépenses.',
    },

    villesVoisines: [...ALL_VILLES_92],

    cityAroundText: (
      <span className="text-center">
        Ikovaline intervient à Malakoff et dans ces villes du 92 :{' '}
        {ALL_VILLES_92.map((v, i, arr) => (
          <span key={v}>
            <Link href={`/agence-web-${removeAccents(v)}`}>{v}</Link>
            {i < arr.length - 2 ? ', ' : i === arr.length - 2 ? ' et ' : ''}
          </span>
        ))}{' '}
        .
      </span>
    ),

    CTATitle: 'Prêt à lancer votre projet web à Malakoff ?',
    CTADesc:
      'Création de site, refonte, SEO, marketing : boostez votre visibilité à Malakoff.',
    CTATextBtn: 'Lancer mon projet à Malakoff',

    metaTitle:
      'Agence web Malakoff (92) – Création site, SEO, SEA – Hauts-de-Seine',
    metaDescription:
      'Ikovaline, agence web à Malakoff : site, SEO local, Ads et CRO pour générer plus de demandes.',
  },

  // ========= 12) Gennevilliers =========
  {
    id: 'agence-web-gennevilliers',
    ville: 'Gennevilliers',
    departement: 'Hauts-de-Seine',

    intro: `Agence web à Gennevilliers : création de site, refonte, SEO local, SEA et CRO pour une croissance mesurable.`,

    text1: (
      <span>
        À <strong>Gennevilliers</strong>, Ikovaline déploie une approche
        business : <strong>site</strong>, <strong>SEO</strong>,{' '}
        <strong>Ads</strong>, <strong>data</strong>. Découvrir :{' '}
        <Link href="/agence-web-gennevilliers">offre Gennevilliers</Link>.
      </span>
    ),

    services: [
      {
        text: 'Création de sites web',
        subtext:
          'Design propre, structure conversion, Core Web Vitals excellents.',
        link: 'nos-services/creation-sites-web-vitrine-e-commerce',
      },
      {
        text: 'Référencement SEO',
        subtext:
          'Intention locale, contenus, maillage, netlinking, rich results.',
        link: 'nos-services/seo-referencement-naturel',
      },
      {
        text: 'Maintenance & support',
        subtext:
          'Monitoring, correctifs, sécurité, performance continue (CWV).',
        link: 'nos-services/creation-site-web-sur-mesure',
      },
      {
        text: 'Web marketing',
        subtext: 'SEA/Search, Social Ads, remarketing, reporting ROI.',
        link: 'nos-services/gestion-campagnes-sea',
      },
    ],

    objectifs: {
      objectifTitle: 'Notre mission à Gennevilliers : une acquisition scalable',
      text1: 'Standardiser les pages “ville + service” et renforcer l’E-E-A-T.',
      text2:
        'Optimiser le CPA via CRO, tests publicitaires et suivi analytics.',
    },

    villesVoisines: [...ALL_VILLES_92],

    cityAroundText: (
      <span className="text-center">
        Présents à Gennevilliers et dans ces villes des Hauts-de-Seine :{' '}
        {ALL_VILLES_92.map((v, i, arr) => (
          <span key={v}>
            <Link href={`/agence-web-${removeAccents(v)}`}>{v}</Link>
            {i < arr.length - 2 ? ', ' : i === arr.length - 2 ? ' et ' : ''}
          </span>
        ))}{' '}
        .
      </span>
    ),

    CTATitle: 'Accélérer votre croissance à Gennevilliers',
    CTADesc:
      'Site + SEO + Ads + CRO : un plan d’acquisition qui s’améliore chaque mois.',
    CTATextBtn: 'Démarrer à Gennevilliers',

    metaTitle:
      'Agence web Gennevilliers (92) – Site, SEO, SEA – Hauts-de-Seine',
    metaDescription:
      'Ikovaline : création/refonte, SEO local, Ads et data à Gennevilliers. Acquisition mesurable et durable.',
  },

  // ========= 13) Clichy =========
  {
    id: 'agence-web-clichy',
    ville: 'Clichy',
    departement: 'Hauts-de-Seine',

    intro: `Ikovaline, agence web à Clichy : création/refonte de site, SEO local, SEA, email & social ads pour développer vos leads.`,

    text1: (
      <span>
        À <strong>Clichy</strong>, nous concevons des <strong>sites web</strong>{' '}
        optimisés <strong>SEO</strong> et des <strong>campagnes Ads</strong>{' '}
        rentables. Voir : <Link href="/agence-web-clichy">offre Clichy</Link>.
      </span>
    ),

    services: [
      {
        text: 'Création de sites web',
        subtext:
          'UX claire, messages orientés bénéfices, CTA visibles, vitesse.',
        link: 'nos-services/creation-sites-web-vitrine-e-commerce',
      },
      {
        text: 'Référencement SEO',
        subtext:
          'Pages locales, on-page/technique, avis et fiche établissement.',
        link: 'nos-services/seo-referencement-naturel',
      },
      {
        text: 'Maintenance & support',
        subtext: 'Sécurité, mises à jour, backups, support réactif.',
        link: 'nos-services/creation-site-web-sur-mesure',
      },
      {
        text: 'Web marketing',
        subtext: 'Google Ads & Meta, retargeting, email marketing, dashboards.',
        link: 'nos-services/gestion-campagnes-sea',
      },
    ],

    objectifs: {
      objectifTitle:
        'Notre mission à Clichy : visibilité locale & demandes entrantes',
      text1:
        'Capter les recherches “création site internet + ville” et “service + Clichy”.',
      text2: 'Optimiser le parcours (mobile-first, preuves, FAQ, offres).',
    },

    villesVoisines: [...ALL_VILLES_92],

    cityAroundText: (
      <span className="text-center">
        Ikovaline opère à Clichy et dans ces villes du 92 :{' '}
        {ALL_VILLES_92.map((v, i, arr) => (
          <span key={v}>
            <Link href={`/agence-web-${removeAccents(v)}`}>{v}</Link>
            {i < arr.length - 2 ? ', ' : i === arr.length - 2 ? ' et ' : ''}
          </span>
        ))}{' '}
        .
      </span>
    ),

    CTATitle: 'Créer un site qui vend à Clichy',
    CTADesc:
      'Site + SEO + Ads : on construit votre moteur d’acquisition local.',
    CTATextBtn: 'Parler à Ikovaline – Clichy',

    metaTitle:
      'Agence web Clichy (92) – Création site, SEO, SEA – Hauts-de-Seine',
    metaDescription:
      'Ikovaline : sites performants, SEO local et Ads à Clichy. Développez votre acquisition dans le 92.',
  },

  // ========= 14) Meudon =========
  {
    id: 'agence-web-meudon',
    ville: 'Meudon',
    departement: 'Hauts-de-Seine',

    intro: `Agence web à Meudon : création/refonte de site internet, SEO local, SEA et produit digital pour une présence qui rassure et qui vend.`,

    text1: (
      <span>
        À <strong>Meudon</strong>, nous allions design premium,{' '}
        <strong>performance</strong> et <strong>SEO</strong>. Découvrez :{' '}
        <Link href="/agence-web-meudon">notre offre Meudon</Link>.
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
          'Contenus experts, maillage interne, pages locales, rich snippets.',
        link: 'nos-services/seo-referencement-naturel',
      },
      {
        text: 'Maintenance & support',
        subtext:
          'Support réactif, sécurité, sauvegardes, roadmap d’améliorations.',
        link: 'nos-services/creation-site-web-sur-mesure',
      },
      {
        text: 'Web marketing',
        subtext:
          'SEA, social ads, email marketing et reporting orienté décisions.',
        link: 'nos-services/gestion-campagnes-sea',
      },
    ],

    objectifs: {
      objectifTitle: 'Notre mission à Meudon : image pro & ROI',
      text1:
        'Élever la perception de marque sans compromettre la performance commerciale.',
      text2: 'Suivi précis (events, entonnoirs, cohortes) et itérations.',
    },

    villesVoisines: [...ALL_VILLES_92],

    cityAroundText: (
      <span className="text-center">
        Présence à Meudon et dans ces villes des Hauts-de-Seine :{' '}
        {ALL_VILLES_92.map((v, i, arr) => (
          <span key={v}>
            <Link href={`/agence-web-${removeAccents(v)}`}>{v}</Link>
            {i < arr.length - 2 ? ', ' : i === arr.length - 2 ? ' et ' : ''}
          </span>
        ))}{' '}
        .
      </span>
    ),

    CTATitle: 'Construire un site haut de gamme à Meudon',
    CTADesc:
      'Site premium, SEO, Ads et produit digital : une présence qui rassure et qui vend.',
    CTATextBtn: 'Parler à Ikovaline – Meudon',

    metaTitle:
      'Agence web Meudon (92) – Site premium, SEO, SEA – Hauts-de-Seine',
    metaDescription:
      'Ikovaline : création/refonte de site, SEO local, Ads et CRO à Meudon. Performance & image de marque.',
  },

  // ========= 15) Puteaux =========
  {
    id: 'agence-web-puteaux',
    ville: 'Puteaux',
    departement: 'Hauts-de-Seine',

    intro: `Ikovaline, agence web à Puteaux : création de site, refonte, SEO local, SEA et analytics. Objectif : un deal-flow régulier.`,

    text1: (
      <span>
        À <strong>Puteaux</strong>, nous capitalisons sur un{' '}
        <strong>site rapide</strong>, un <strong>SEO</strong> local robuste et
        des <strong>Ads</strong> maîtrisés. Voir :{' '}
        <Link href="/agence-web-puteaux">offre Puteaux</Link>.
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
        text: 'Maintenance & support',
        subtext:
          'Monitoring, correctifs, sécurité, performance continue (CWV).',
        link: 'nos-services/creation-site-web-sur-mesure',
      },
      {
        text: 'Web marketing',
        subtext:
          'SEA, social ads, nurturing, dashboards décisionnels (GA4/Looker).',
        link: 'nos-services/gestion-campagnes-sea',
      },
    ],

    objectifs: {
      objectifTitle:
        'Notre mission à Puteaux : des demandes qualifiées en continu',
      text1: 'Aligner SEO, Ads et contenu bas de funnel pour un CPA optimisé.',
      text2:
        'Mettre en place qualification → relance → conversion pour maximiser la LTV.',
    },

    villesVoisines: [...ALL_VILLES_92],

    cityAroundText: (
      <span className="text-center">
        Ikovaline couvre Puteaux et ces villes du 92 :{' '}
        {ALL_VILLES_92.map((v, i, arr) => (
          <span key={v}>
            <Link href={`/agence-web-${removeAccents(v)}`}>{v}</Link>
            {i < arr.length - 2 ? ', ' : i === arr.length - 2 ? ' et ' : ''}
          </span>
        ))}{' '}
        .
      </span>
    ),

    CTATitle: 'Déployer une acquisition sérieuse à Puteaux',
    CTADesc:
      'Création/refonte, SEO local, SEA et data : on vise un pipeline régulier.',
    CTATextBtn: 'Démarrer à Puteaux',

    metaTitle:
      'Agence web Puteaux (92) – Création site, SEO, SEA – Hauts-de-Seine',
    metaDescription:
      'Sites rapides, SEO local, Ads et solutions data à Puteaux. Ikovaline, partenaire acquisition.',
  },

  // ========= 16) Bagneux =========
  {
    id: 'agence-web-bagneux',
    ville: 'Bagneux',
    departement: 'Hauts-de-Seine',

    intro: `Agence web à Bagneux (92) : création de site internet, refonte, SEO local, SEA et maintenance pour une acquisition durable.`,

    text1: (
      <span>
        Notre <strong>agence web à Bagneux</strong> conçoit des sites modernes
        et <strong>SEO-ready</strong>, avec un plan d’acquisition complet. Voir
        : <Link href="/agence-web-bagneux">offre Bagneux</Link>.
      </span>
    ),

    services: [
      {
        text: 'Création de sites web',
        subtext:
          'Modernes, performants, responsive, orientés conversions locales.',
        link: 'nos-services/creation-sites-web-vitrine-e-commerce',
      },
      {
        text: 'Référencement SEO',
        subtext: 'Mots-clés locaux, contenus, netlinking, technique propre.',
        link: 'nos-services/seo-referencement-naturel',
      },
      {
        text: 'Maintenance & support',
        subtext: 'Sécurité, mises à jour, support réactif, sauvegardes, SLA.',
        link: 'nos-services/creation-site-web-sur-mesure',
      },
      {
        text: 'Web marketing',
        subtext:
          'Ads, réseaux sociaux, content marketing et automation selon vos besoins.',
        link: 'nos-services/gestion-campagnes-sea',
      },
    ],

    objectifs: {
      objectifTitle:
        'Notre mission à Bagneux : plus de contacts qualifiés, moins de friction',
      text1:
        'Rendre la prise de contact ultra-simple (CTA, formulaires, offres claires).',
      text2:
        'Faire baisser le CPL via CRO et tests continus (pages, messages, preuves).',
    },

    villesVoisines: [...ALL_VILLES_92],

    cityAroundText: (
      <span className="text-center">
        Intervention à Bagneux et dans ces villes des Hauts-de-Seine :{' '}
        {ALL_VILLES_92.map((v, i, arr) => (
          <span key={v}>
            <Link href={`/agence-web-${removeAccents(v)}`}>{v}</Link>
            {i < arr.length - 2 ? ', ' : i === arr.length - 2 ? ' et ' : ''}
          </span>
        ))}{' '}
        .
      </span>
    ),

    CTATitle: 'Prêt à lancer votre projet web à Bagneux ?',
    CTADesc:
      'Création de site, SEO, Ads : boostez votre visibilité locale à Bagneux.',
    CTATextBtn: 'Lancer mon projet à Bagneux',

    metaTitle:
      'Agence web Bagneux (92) – Création site, SEO, SEA – Hauts-de-Seine',
    metaDescription:
      'Ikovaline : site, SEO local, Ads et maintenance à Bagneux. Visez une acquisition rentable.',
  },

  // ========= 17) Issy-les-Moulineaux =========
  {
    id: 'agence-web-issy-les-moulineaux',
    ville: 'Issy-les-Moulineaux',
    departement: 'Hauts-de-Seine',

    intro: `Ikovaline, agence web à Issy-les-Moulineaux : création/refonte de site internet, SEO local, SEA, contenus et data pour augmenter vos leads.`,

    text1: (
      <span>
        À <strong>Issy-les-Moulineaux</strong>, nous livrons des{' '}
        <strong>sites web</strong> performants, un <strong>SEO</strong> local
        solide et des <strong>Ads</strong> rentables. Découvrir :{' '}
        <Link href="/agence-web-issy-les-moulineaux">offre Issy</Link>.
      </span>
    ),

    services: [
      {
        text: 'Création de sites web',
        subtext:
          'Site vitrine/e-commerce : UX, vitesse, conversions, CWV maîtrisés.',
        link: 'nos-services/creation-sites-web-vitrine-e-commerce',
      },
      {
        text: 'Référencement SEO',
        subtext:
          'Stratégie locale, contenus “métier + ville”, optimisation on-page/technique.',
        link: 'nos-services/seo-referencement-naturel',
      },
      {
        text: 'Maintenance & support',
        subtext:
          'MCO, sécurité, sauvegardes et évolutions sans rupture de service.',
        link: 'nos-services/creation-site-web-sur-mesure',
      },
      {
        text: 'Web marketing',
        subtext:
          'Google/Meta Ads, retargeting, email marketing, dashboards ROI.',
        link: 'nos-services/gestion-campagnes-sea',
      },
    ],

    objectifs: {
      objectifTitle:
        'Notre mission à Issy-les-Moulineaux : transformer votre visibilité en clients',
      text1:
        'Capter l’intention locale et convertir via un parcours simple et rassurant.',
      text2:
        'Piloter avec la donnée (GA4, events, CRM) pour arbitrer budget & messages.',
    },

    villesVoisines: [...ALL_VILLES_92],

    cityAroundText: (
      <span className="text-center">
        Ikovaline intervient à Issy-les-Moulineaux et dans ces villes du 92 :{' '}
        {ALL_VILLES_92.map((v, i, arr) => (
          <span key={v}>
            <Link href={`/agence-web-${removeAccents(v)}`}>{v}</Link>
            {i < arr.length - 2 ? ', ' : i === arr.length - 2 ? ' et ' : ''}
          </span>
        ))}{' '}
        .
      </span>
    ),

    CTATitle: 'Prêt à lancer votre projet web à Issy-les-Moulineaux ?',
    CTADesc:
      'Création/refonte, SEO, Ads, maintenance : cap sur des résultats mesurables.',
    CTATextBtn: 'Lancer mon projet à Issy',

    metaTitle:
      'Agence web Issy-les-Moulineaux (92) – Site, SEO, SEA – Hauts-de-Seine',
    metaDescription:
      'Ikovaline : sites performants, SEO local et Ads à Issy-les-Moulineaux. Développez votre acquisition.',
  },
] as const;
