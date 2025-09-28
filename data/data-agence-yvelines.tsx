import { removeAccents } from '@/components/pageSatellite/CityAround';
import Link from 'next/link';

const ALL_VILLES_78 = [
  'Versailles',
  'Vélizy-Villacoublay',
  'Saint-Germain-en-Laye',
  'Poissy',
  'Les Mureaux',
  'Saint-Quentin-en-Yvelines',
  'Montigny-le-Bretonneux',
  'Guyancourt',
  'Trappes',
  'Élancourt',
  'Plaisir',
  'Maurepas',
  'Mantes-la-Jolie',
  'Sartrouville',
  'Conflans-Sainte-Honorine',
  'Rambouillet',
  // Tu peux en ajouter d'autres librement :
  // 'Le Chesnay-Rocquencourt', 'Chatou', 'Houilles', 'Maisons-Laffitte', 'Carrières-sur-Seine', 'Coignières'
] as const;

type Ville78 = (typeof ALL_VILLES_78)[number];

export const dataAgenceYvelines = [
  // 1) Versailles
  {
    id: 'agence-web-versailles',
    ville: 'Versailles' as Ville78,
    departement: 'Yvelines',
    intro: `Ikovaline, agence web à Versailles (78) : création de site internet premium, refonte, SEO local, SEA et produits digitaux (SaaS/app) pour projets ≥ 10 000 €.`,
    text1: (
      <span>
        Notre <strong>agence web à Versailles</strong> conçoit des{' '}
        <strong>sites corporate</strong>, e-commerce et{' '}
        <strong>MVP SaaS</strong> orientés acquisition. Basés à{' '}
        <Link href="/agence-web-versailles">Versailles</Link> et dans tout le{' '}
        <strong>78</strong>, nous alignons <strong>création de site web</strong>
        , <strong>SEO</strong> et <strong>SEA</strong> pour des leads qualifiés.
      </span>
    ),
    services: [
      {
        text: 'Création de sites web',
        subtext:
          'Corporate, e-commerce, portail B2B : design premium, performance, conversion.',
        link: 'nos-services/creation-sites-web-vitrine-e-commerce',
      },
      {
        text: 'Référencement SEO',
        subtext:
          'SEO local 78 : sémantique “métier + ville”, on-page, technique, netlinking.',
        link: 'nos-services/seo-referencement-naturel',
      },
      {
        text: 'Maintenance et support',
        subtext:
          'Sécurité, mises à jour, backups, supervision 24/7 pour une disponibilité maximale.',
        link: 'nos-services/creation-site-web-sur-mesure',
      },
      {
        text: 'Web marketing (SEA/Ads)',
        subtext: 'Google/Meta Ads, tracking GA4, dashboards ROI, CRO continu.',
        link: 'nos-services/gestion-campagnes-sea',
      },
    ],
    objectifs: {
      objectifTitle:
        'Notre mission à Versailles : pipeline de demandes hautement qualifiées',
      text1:
        'Captez les recherches à forte intention (“création site internet Versailles”, “agence web 78”).',
      text2:
        'Optimisez le funnel (preuves, CTA, formulaires, devis) et vos KPIs (CPL/ROAS).',
    },
    villesVoisines: [...ALL_VILLES_78],
    cityAroundText: (
      <span className="text-center">
        Ikovaline intervient à Versailles et dans ces villes des Yvelines :{' '}
        {ALL_VILLES_78.map((v, i, arr) => (
          <span key={v}>
            <Link href={`/agence-web-${removeAccents(v)}`}>{v}</Link>
            {i < arr.length - 2 ? ', ' : i === arr.length - 2 ? ' et ' : ''}
          </span>
        ))}{' '}
        .
      </span>
    ),
    CTATitle: 'Projet digital premium à Versailles (≥ 10k€) ?',
    CTADesc: 'Site + SEO + Ads + SaaS : on bâtit votre moteur d’acquisition.',
    CTATextBtn: 'Démarrer à Versailles',
    metaTitle:
      'Agence web Versailles (78) – Création de site, SEO, SEA, SaaS – Budget ≥10k€',
    metaDescription:
      'Ikovaline à Versailles : sites corporate, e-commerce, SEO local, Ads et produits digitaux (SaaS). Ciblez des clients à forte valeur en Yvelines.',
  },

  // 2) Vélizy-Villacoublay
  {
    id: 'agence-web-velizy-villacoublay',
    ville: 'Vélizy-Villacoublay' as Ville78,
    departement: 'Yvelines',
    intro: `Agence web à Vélizy-Villacoublay (78) : création/refonte de site, SEO, SEA, développement digital (SaaS/app) pour ETI/PME — budgets à partir de 10 000 €.`,
    text1: (
      <span>
        À <strong>Vélizy-Villacoublay</strong>, nous livrons des{' '}
        <strong>sites web</strong> rapides, brandés et{' '}
        <strong>SEO-ready</strong>. Découvrez :{' '}
        <Link href="/agence-web-velizy-villacoublay">notre offre Vélizy</Link>.
      </span>
    ),
    services: [
      {
        text: 'Création de sites web',
        subtext: 'Corporate/e-com, UX claire, performance CWV, RGPD.',
        link: 'nos-services/creation-sites-web-vitrine-e-commerce',
      },
      {
        text: 'Référencement SEO',
        subtext:
          'Stratégie locale 78, contenus piliers, schema.org, netlinking.',
        link: 'nos-services/seo-referencement-naturel',
      },
      {
        text: 'Maintenance et support',
        subtext: 'MCO, sécurité, SLA, amélioration continue.',
        link: 'nos-services/creation-site-web-sur-mesure',
      },
      {
        text: 'Web marketing',
        subtext: 'SEA B2B/B2C, retargeting, reporting C-level.',
        link: 'nos-services/gestion-campagnes-sea',
      },
    ],
    objectifs: {
      objectifTitle:
        'Notre mission à Vélizy : un dispositif digital orienté MQL/SQL',
      text1:
        'Structurer la génération de leads qualifiés (ABM léger, contenus BOFU).',
      text2: 'Industrialiser la conversion avec tests A/B et dashboards.',
    },
    villesVoisines: [...ALL_VILLES_78],
    cityAroundText: (
      <span className="text-center">
        Présents à Vélizy-Villacoublay et dans ces villes des Yvelines :{' '}
        {ALL_VILLES_78.map((v, i, arr) => (
          <span key={v}>
            <Link href={`/agence-web-${removeAccents(v)}`}>{v}</Link>
            {i < arr.length - 2 ? ', ' : i === arr.length - 2 ? ' et ' : ''}
          </span>
        ))}{' '}
        .
      </span>
    ),
    CTATitle: 'Accélérer votre acquisition à Vélizy',
    CTADesc: 'Site + SEO + Ads + data : un plan mesurable et scalable.',
    CTATextBtn: 'Parler à un expert – Vélizy',
    metaTitle:
      'Agence web Vélizy-Villacoublay (78) – Site, SEO, SEA, SaaS – Budget ≥10k€',
    metaDescription:
      'Sites performants, SEO/SEA et produits digitaux à Vélizy-Villacoublay. Ikovaline – acquisition haut de gamme en Yvelines.',
  },

  // 3) Saint-Germain-en-Laye
  {
    id: 'agence-web-saint-germain-en-laye',
    ville: 'Saint-Germain-en-Laye' as Ville78,
    departement: 'Yvelines',
    intro: `Ikovaline, agence digitale à Saint-Germain-en-Laye (78) : création site web premium, SEO local, SEA, SaaS — pour marques et professions libérales exigeantes.`,
    text1: (
      <span>
        À <strong>Saint-Germain-en-Laye</strong>, nous allions{' '}
        <strong>image de marque</strong> et <strong>performance</strong>. Voir :{' '}
        <Link href="/agence-web-saint-germain-en-laye">
          notre offre Saint-Germain
        </Link>
        .
      </span>
    ),
    services: [
      {
        text: 'Création de sites web',
        subtext: 'Design haut de gamme, crédibilité, conversion.',
        link: 'nos-services/creation-sites-web-vitrine-e-commerce',
      },
      {
        text: 'Référencement SEO',
        subtext: 'Ciblage “ville + service”, contenus experts, E-E-A-T.',
        link: 'nos-services/seo-referencement-naturel',
      },
      {
        text: 'Maintenance et support',
        subtext: 'Surveillance, sécurité, évolutions continues.',
        link: 'nos-services/creation-site-web-sur-mesure',
      },
      {
        text: 'Web marketing',
        subtext: 'SEA premium, retargeting, email et automation.',
        link: 'nos-services/gestion-campagnes-sea',
      },
    ],
    objectifs: {
      objectifTitle: 'Notre mission à Saint-Germain : image forte, ROI mesuré',
      text1:
        'Élever la perception de marque tout en maximisant le taux de conversion.',
      text2: 'Suivi GA4 propre, events, entonnoirs, cohortes.',
    },
    villesVoisines: [...ALL_VILLES_78],
    cityAroundText: (
      <span className="text-center">
        Ikovaline couvre Saint-Germain-en-Laye et ces villes du 78 :{' '}
        {ALL_VILLES_78.map((v, i, arr) => (
          <span key={v}>
            <Link href={`/agence-web-${removeAccents(v)}`}>{v}</Link>
            {i < arr.length - 2 ? ', ' : i === arr.length - 2 ? ' et ' : ''}
          </span>
        ))}{' '}
        .
      </span>
    ),
    CTATitle: 'Un site premium qui convertit à Saint-Germain',
    CTADesc: 'Site + SEO + Ads + SaaS : dispositif complet, orienté résultats.',
    CTATextBtn: 'Démarrer à Saint-Germain-en-Laye',
    metaTitle: 'Agence web Saint-Germain-en-Laye (78) – Site, SEO, SEA, SaaS',
    metaDescription:
      'Création de site premium, SEO local et Ads à Saint-Germain-en-Laye. Ikovaline – acquisition à haute valeur.',
  },

  // 4) Poissy
  {
    id: 'agence-web-poissy',
    ville: 'Poissy' as Ville78,
    departement: 'Yvelines',
    intro: `Agence web Poissy (78) : création/refonte de site internet, SEO local, SEA, SaaS pour industrie/auto/services — budgets ≥ 10 000 €.`,
    text1: (
      <span>
        À <strong>Poissy</strong>, nous structurons une présence digitale{' '}
        <strong>ROIste</strong> pour ETI/PME. Voir :{' '}
        <Link href="/agence-web-poissy">notre offre Poissy</Link>.
      </span>
    ),
    services: [
      {
        text: 'Création de sites web',
        subtext: 'Corporate/e-com, performances techniques, conversion.',
        link: 'nos-services/creation-sites-web-vitrine-e-commerce',
      },
      {
        text: 'Référencement SEO',
        subtext:
          'Stratégie locale, contenu “métier + Poissy”, netlinking ciblé.',
        link: 'nos-services/seo-referencement-naturel',
      },
      {
        text: 'Maintenance et support',
        subtext: 'SLA, sécurité, backups, roadmap d’évolutions.',
        link: 'nos-services/creation-site-web-sur-mesure',
      },
      {
        text: 'Web marketing',
        subtext: 'SEA industrielle/B2B, tracking, dashboards.',
        link: 'nos-services/gestion-campagnes-sea',
      },
    ],
    objectifs: {
      objectifTitle:
        'Notre mission à Poissy : pipeline qualifié pour les équipes sales',
      text1: 'Optimiser le MQL → SQL par contenus BOFU et ABM léger.',
      text2: 'Réduire le CPA via CRO et itérations rapides.',
    },
    villesVoisines: [...ALL_VILLES_78],
    cityAroundText: (
      <span className="text-center">
        Présents à Poissy et dans ces villes des Yvelines :{' '}
        {ALL_VILLES_78.map((v, i, arr) => (
          <span key={v}>
            <Link href={`/agence-web-${removeAccents(v)}`}>{v}</Link>
            {i < arr.length - 2 ? ', ' : i === arr.length - 2 ? ' et ' : ''}
          </span>
        ))}{' '}
        .
      </span>
    ),
    CTATitle: 'Booster votre acquisition à Poissy',
    CTADesc: 'Site + SEO + Ads + data : un plan clair et mesurable.',
    CTATextBtn: 'Parler à Ikovaline – Poissy',
    metaTitle: 'Agence web Poissy (78) – Création site, SEO, SEA, SaaS',
    metaDescription:
      'Ikovaline à Poissy : sites performants, SEO local, Ads et produits digitaux. Générer des leads à forte valeur.',
  },

  // 5) Les Mureaux
  {
    id: 'agence-web-les-mureaux',
    ville: 'Les Mureaux' as Ville78,
    departement: 'Yvelines',
    intro: `Ikovaline, agence web aux Mureaux (78) : site, SEO, SEA, SaaS pour aéronautique/industrie & services — tickets à partir de 10 000 €.`,
    text1: (
      <span>
        À <strong>Les Mureaux</strong>, nous alignons <strong>site</strong>,{' '}
        <strong>SEO</strong> et <strong>Ads</strong> sur des objectifs business
        concrets. <Link href="/agence-web-les-mureaux">Découvrir l’offre</Link>.
      </span>
    ),
    services: [
      {
        text: 'Création de sites web',
        subtext: 'Corporate, portail client, e-com B2B, MVP SaaS.',
        link: 'nos-services/creation-sites-web-vitrine-e-commerce',
      },
      {
        text: 'Référencement SEO',
        subtext:
          'Sémantique locale 78, on-page, technique, netlinking régional.',
        link: 'nos-services/seo-referencement-naturel',
      },
      {
        text: 'Maintenance et support',
        subtext: 'MCO, sécurité, CI/CD, disponibilité.',
        link: 'nos-services/creation-site-web-sur-mesure',
      },
      {
        text: 'Web marketing',
        subtext: 'SEA, retargeting, email nurturing, KPIs sales-ready.',
        link: 'nos-services/gestion-campagnes-sea',
      },
    ],
    objectifs: {
      objectifTitle: 'Notre mission aux Mureaux : leads qualifiés & conversion',
      text1:
        'Captez la demande locale (requêtes commerciales) et rassurez (preuves).',
      text2: 'CRO et tests A/B pour maximiser la valeur par visiteur.',
    },
    villesVoisines: [...ALL_VILLES_78],
    cityAroundText: (
      <span className="text-center">
        Ikovaline opère aux Mureaux et dans ces villes du 78 :{' '}
        {ALL_VILLES_78.map((v, i, arr) => (
          <span key={v}>
            <Link href={`/agence-web-${removeAccents(v)}`}>{v}</Link>
            {i < arr.length - 2 ? ', ' : i === arr.length - 2 ? ' et ' : ''}
          </span>
        ))}{' '}
        .
      </span>
    ),
    CTATitle: 'Structurer votre acquisition aux Mureaux',
    CTADesc: 'Site + SEO + Ads + SaaS : une stack digitale robuste.',
    CTATextBtn: 'Démarrer aux Mureaux',
    metaTitle: 'Agence web Les Mureaux (78) – Site, SEO, SEA, SaaS',
    metaDescription:
      'Sites performants, SEO local et Ads aux Mureaux. Ikovaline : acquisition B2B à forte valeur.',
  },

  // 6) Saint-Quentin-en-Yvelines
  {
    id: 'agence-web-saint-quentin-en-yvelines',
    ville: 'Saint-Quentin-en-Yvelines' as Ville78,
    departement: 'Yvelines',
    intro: `Agence web Saint-Quentin-en-Yvelines (78) : création site, refonte, SEO, SEA, SaaS pour pôles tertiaires/tech — budgets ≥ 10 000 €.`,
    text1: (
      <span>
        À <strong>Saint-Quentin-en-Yvelines</strong>, nous déployons des{' '}
        <strong>sites</strong> et <strong>produits digitaux</strong> qui
        convertissent.{' '}
        <Link href="/agence-web-saint-quentin-en-yvelines">
          Voir l’offre SQY
        </Link>
        .
      </span>
    ),
    services: [
      {
        text: 'Création de sites web',
        subtext: 'Corporate/e-com/portal, UX data-driven, conversion.',
        link: 'nos-services/creation-sites-web-vitrine-e-commerce',
      },
      {
        text: 'Référencement SEO',
        subtext: 'Intention “service + ville”, contenu, technique, liens.',
        link: 'nos-services/seo-referencement-naturel',
      },
      {
        text: 'Maintenance et support',
        subtext: 'Sécurité, SLA, monitoring, amélioration continue.',
        link: 'nos-services/creation-site-web-sur-mesure',
      },
      {
        text: 'Web marketing',
        subtext: 'SEA, LinkedIn Ads (B2B), nurturing, dashboards.',
        link: 'nos-services/gestion-campagnes-sea',
      },
    ],
    objectifs: {
      objectifTitle: 'Notre mission à SQY : MQL/SQL prédictibles',
      text1: 'ABM léger, pages BOFU, pages “ville + service”.',
      text2: 'CRO et experiments pour un CPA compétitif.',
    },
    villesVoisines: [...ALL_VILLES_78],
    cityAroundText: (
      <span className="text-center">
        Présents à SQY et dans ces villes des Yvelines :{' '}
        {ALL_VILLES_78.map((v, i, arr) => (
          <span key={v}>
            <Link href={`/agence-web-${removeAccents(v)}`}>{v}</Link>
            {i < arr.length - 2 ? ', ' : i === arr.length - 2 ? ' et ' : ''}
          </span>
        ))}{' '}
        .
      </span>
    ),
    CTATitle: 'Installer une acquisition solide à SQY',
    CTADesc: 'Stack : Site + SEO + Ads + SaaS + Data. Focus résultats.',
    CTATextBtn: 'Parler à Ikovaline – SQY',
    metaTitle:
      'Agence web Saint-Quentin-en-Yvelines (78) – Site, SEO, SEA, SaaS',
    metaDescription:
      'Création/refonte, SEO local, Ads et produit digital à SQY. Ikovaline – leads B2B de qualité.',
  },

  // 7) Montigny-le-Bretonneux
  {
    id: 'agence-web-montigny-le-bretonneux',
    ville: 'Montigny-le-Bretonneux' as Ville78,
    departement: 'Yvelines',
    intro: `Ikovaline, agence web à Montigny-le-Bretonneux (78) : création site, SEO, SEA, SaaS pour PME/ETI — budget ≥ 10k€.`,
    text1: (
      <span>
        Notre <strong>agence web à Montigny</strong> conçoit des sites et
        funnels orientés ROI :{' '}
        <Link href="/agence-web-montigny-le-bretonneux">
          Montigny-le-Bretonneux
        </Link>{' '}
        et SQY.
      </span>
    ),
    services: [
      {
        text: 'Création de sites web',
        subtext: 'Structure SEO, UX, preuves sociales, conversion.',
        link: 'nos-services/creation-sites-web-vitrine-e-commerce',
      },
      {
        text: 'Référencement SEO',
        subtext: 'Pages “ville + service”, maillage, technique propre.',
        link: 'nos-services/seo-referencement-naturel',
      },
      {
        text: 'Maintenance et support',
        subtext: 'Mises à jour, sécurité, monitoring et évolutions.',
        link: 'nos-services/creation-site-web-sur-mesure',
      },
      {
        text: 'Web marketing',
        subtext: 'SEA performante, retargeting, KPIs clairs.',
        link: 'nos-services/gestion-campagnes-sea',
      },
    ],
    objectifs: {
      objectifTitle: 'Notre mission à Montigny : trafic utile & conversion',
      text1: 'Prioriser la qualité du trafic et la valeur par visiteur.',
      text2: 'Tester et itérer (A/B) pour améliorer le taux de conversion.',
    },
    villesVoisines: [...ALL_VILLES_78],
    cityAroundText: (
      <span className="text-center">
        Présence à Montigny-le-Bretonneux et dans ces villes du 78 :{' '}
        {ALL_VILLES_78.map((v, i, arr) => (
          <span key={v}>
            <Link href={`/agence-web-${removeAccents(v)}`}>{v}</Link>
            {i < arr.length - 2 ? ', ' : i === arr.length - 2 ? ' et ' : ''}
          </span>
        ))}{' '}
        .
      </span>
    ),
    CTATitle: 'Booster à Montigny-le-Bretonneux',
    CTADesc: 'Site + SEO + Ads + data : tout pour convertir.',
    CTATextBtn: 'Démarrer à Montigny',
    metaTitle: 'Agence web Montigny-le-Bretonneux (78) – Site, SEO, SEA, SaaS',
    metaDescription:
      'Sites rapides, SEO local et Ads à Montigny-le-Bretonneux. Acquisition premium en Yvelines.',
  },

  // 8) Guyancourt
  {
    id: 'agence-web-guyancourt',
    ville: 'Guyancourt' as Ville78,
    departement: 'Yvelines',
    intro: `Agence web Guyancourt (78) : création/refonte site, SEO local, SEA, SaaS pour entreprises tech/tertiaire — budget ≥ 10k€.`,
    text1: (
      <span>
        À <strong>Guyancourt</strong>, on conçoit des dispositifs digitaux qui
        génèrent des leads.{' '}
        <Link href="/agence-web-guyancourt">Voir l’offre Guyancourt</Link>.
      </span>
    ),
    services: [
      {
        text: 'Création de sites web',
        subtext: 'Corporate, e-com, landing, portail B2B.',
        link: 'nos-services/creation-sites-web-vitrine-e-commerce',
      },
      {
        text: 'Référencement SEO',
        subtext: 'Intentions locales, contenu, on-page, technique.',
        link: 'nos-services/seo-referencement-naturel',
      },
      {
        text: 'Maintenance et support',
        subtext: 'Sécurité, supervision, SLA, évolutions.',
        link: 'nos-services/creation-site-web-sur-mesure',
      },
      {
        text: 'Web marketing',
        subtext: 'SEA/LinkedIn Ads, nurturing, dashboards ROI.',
        link: 'nos-services/gestion-campagnes-sea',
      },
    ],
    objectifs: {
      objectifTitle:
        'Notre mission à Guyancourt : leads qualifiés & sales-ready',
      text1: 'Aligner contenus BOFU et ciblage pour un pipeline sain.',
      text2: 'CRO et tests pour un CPA maîtrisé.',
    },
    villesVoisines: [...ALL_VILLES_78],
    cityAroundText: (
      <span className="text-center">
        Ikovaline intervient à Guyancourt et dans ces villes du 78 :{' '}
        {ALL_VILLES_78.map((v, i, arr) => (
          <span key={v}>
            <Link href={`/agence-web-${removeAccents(v)}`}>{v}</Link>
            {i < arr.length - 2 ? ', ' : i === arr.length - 2 ? ' et ' : ''}
          </span>
        ))}{' '}
        .
      </span>
    ),
    CTATitle: 'Déployer votre acquisition à Guyancourt',
    CTADesc: 'Site + SEO + Ads + SaaS : une stack prête à scaler.',
    CTATextBtn: 'Parler à Ikovaline – Guyancourt',
    metaTitle: 'Agence web Guyancourt (78) – Site, SEO, SEA, SaaS',
    metaDescription:
      'Création de site, SEO local, SEA et produit digital à Guyancourt. Leads B2B qualifiés.',
  },

  // 9) Trappes
  {
    id: 'agence-web-trappes',
    ville: 'Trappes' as Ville78,
    departement: 'Yvelines',
    intro: `Ikovaline, agence web à Trappes (78) : site, SEO, SEA, SaaS pour PME/ETI — budget ≥ 10 000 €.`,
    text1: (
      <span>
        À <strong>Trappes</strong>, nous mettons en place un tunnel
        d’acquisition efficace.{' '}
        <Link href="/agence-web-trappes">Découvrir l’offre Trappes</Link>.
      </span>
    ),
    services: [
      {
        text: 'Création de sites web',
        subtext: 'UX claire, vitesses rapides, conversion.',
        link: 'nos-services/creation-sites-web-vitrine-e-commerce',
      },
      {
        text: 'Référencement SEO',
        subtext: 'Requêtes locales, contenus, technique, netlinking 78.',
        link: 'nos-services/seo-referencement-naturel',
      },
      {
        text: 'Maintenance et support',
        subtext: 'MCO, sécurité, backups, monitoring 24/7.',
        link: 'nos-services/creation-site-web-sur-mesure',
      },
      {
        text: 'Web marketing',
        subtext: 'SEA, retargeting, reporting décisionnel.',
        link: 'nos-services/gestion-campagnes-sea',
      },
    ],
    objectifs: {
      objectifTitle: 'Notre mission à Trappes : croissance durable',
      text1: 'Capter le trafic utile et augmenter la valeur par visiteur.',
      text2: 'Iterer (CRO) pour améliorer taux de conversion et CPA.',
    },
    villesVoisines: [...ALL_VILLES_78],
    cityAroundText: (
      <span className="text-center">
        Présents à Trappes et dans ces villes des Yvelines :{' '}
        {ALL_VILLES_78.map((v, i, arr) => (
          <span key={v}>
            <Link href={`/agence-web-${removeAccents(v)}`}>{v}</Link>
            {i < arr.length - 2 ? ', ' : i === arr.length - 2 ? ' et ' : ''}
          </span>
        ))}{' '}
        .
      </span>
    ),
    CTATitle: 'Booster votre visibilité à Trappes',
    CTADesc: 'Site + SEO + Ads : mise en place rapide, résultats mesurables.',
    CTATextBtn: 'Démarrer à Trappes',
    metaTitle: 'Agence web Trappes (78) – Création site, SEO, SEA, SaaS',
    metaDescription:
      'Sites performants, SEO local et Ads à Trappes. Ikovaline – acquisition Yvelines.',
  },

  // 10) Élancourt
  {
    id: 'agence-web-elancourt',
    ville: 'Élancourt' as Ville78,
    departement: 'Yvelines',
    intro: `Agence web Élancourt (78) : création/refonte de site, SEO local, SEA, SaaS — projets ≥ 10k€.`,
    text1: (
      <span>
        À <strong>Élancourt</strong>, nous créons des écosystèmes digitaux qui
        vendent : <Link href="/agence-web-elancourt">voir l’offre</Link>.
      </span>
    ),
    services: [
      {
        text: 'Création de sites web',
        subtext: 'Architecture SEO, UX, contenus, conversion.',
        link: 'nos-services/creation-sites-web-vitrine-e-commerce',
      },
      {
        text: 'Référencement SEO',
        subtext: 'Ciblage “service + ville”, optimisation, maillage.',
        link: 'nos-services/seo-referencement-naturel',
      },
      {
        text: 'Maintenance et support',
        subtext: 'Sécurité, mises à jour, SLA, évolutions.',
        link: 'nos-services/creation-site-web-sur-mesure',
      },
      {
        text: 'Web marketing',
        subtext: 'SEA locale, social ads, nurturing, KPIs.',
        link: 'nos-services/gestion-campagnes-sea',
      },
    ],
    objectifs: {
      objectifTitle: 'Notre mission à Élancourt : plus de leads qualifiés',
      text1: 'Simplifier le tunnel (CTA nets, formulaires courts).',
      text2: 'CRO en continu pour maximiser les conversions.',
    },
    villesVoisines: [...ALL_VILLES_78],
    cityAroundText: (
      <span className="text-center">
        Ikovaline intervient à Élancourt et sur ces villes des Yvelines :{' '}
        {ALL_VILLES_78.map((v, i, arr) => (
          <span key={v}>
            <Link href={`/agence-web-${removeAccents(v)}`}>{v}</Link>
            {i < arr.length - 2 ? ', ' : i === arr.length - 2 ? ' et ' : ''}
          </span>
        ))}{' '}
        .
      </span>
    ),
    CTATitle: 'Déployer votre acquisition à Élancourt',
    CTADesc: 'Site + SEO + Ads + SaaS : tout pour scaler.',
    CTATextBtn: 'Parler à Ikovaline – Élancourt',
    metaTitle: 'Agence web Élancourt (78) – Site, SEO, SEA, SaaS',
    metaDescription:
      'Ikovaline à Élancourt : sites rapides, SEO local, Ads. Leads à forte valeur en Yvelines.',
  },

  // 11) Plaisir
  {
    id: 'agence-web-plaisir',
    ville: 'Plaisir' as Ville78,
    departement: 'Yvelines',
    intro: `Ikovaline, agence web à Plaisir (78) : création de site, SEO local, SEA et SaaS — budgets ≥ 10 000 €.`,
    text1: (
      <span>
        À <strong>Plaisir</strong>, nous livrons des <strong>sites</strong> et{' '}
        <strong>campagnes</strong> qui génèrent des demandes.{' '}
        <Link href="/agence-web-plaisir">Voir l’offre Plaisir</Link>.
      </span>
    ),
    services: [
      {
        text: 'Création de sites web',
        subtext: 'Corporate/e-com, UX claire, performance.',
        link: 'nos-services/creation-sites-web-vitrine-e-commerce',
      },
      {
        text: 'Référencement SEO',
        subtext: 'Sémantique locale, contenu BOFU, technique propre.',
        link: 'nos-services/seo-referencement-naturel',
      },
      {
        text: 'Maintenance et support',
        subtext: 'Sécurité, mises à jour, supervision, évolutions.',
        link: 'nos-services/creation-site-web-sur-mesure',
      },
      {
        text: 'Web marketing',
        subtext: 'SEA, retargeting, email marketing, dashboards.',
        link: 'nos-services/gestion-campagnes-sea',
      },
    ],
    objectifs: {
      objectifTitle: 'Notre mission à Plaisir : acquisition rentable',
      text1: 'Visibilité utile sur Google (local pack + organique).',
      text2: 'Optimisation continue des taux de conversion.',
    },
    villesVoisines: [...ALL_VILLES_78],
    cityAroundText: (
      <span className="text-center">
        Présents à Plaisir et dans ces villes du 78 :{' '}
        {ALL_VILLES_78.map((v, i, arr) => (
          <span key={v}>
            <Link href={`/agence-web-${removeAccents(v)}`}>{v}</Link>
            {i < arr.length - 2 ? ', ' : i === arr.length - 2 ? ' et ' : ''}
          </span>
        ))}{' '}
        .
      </span>
    ),
    CTATitle: 'Booster votre pipeline à Plaisir',
    CTADesc: 'Site + SEO + Ads + data, piloté par les résultats.',
    CTATextBtn: 'Démarrer à Plaisir',
    metaTitle: 'Agence web Plaisir (78) – Création site, SEO, SEA, SaaS',
    metaDescription:
      'Sites performants et SEO local à Plaisir. Ikovaline – acquisition haut de gamme.',
  },

  // 12) Maurepas
  {
    id: 'agence-web-maurepas',
    ville: 'Maurepas' as Ville78,
    departement: 'Yvelines',
    intro: `Agence web Maurepas (78) : création/refonte de site, SEO, SEA, SaaS — projets ≥ 10k€.`,
    text1: (
      <span>
        À <strong>Maurepas</strong>, on conçoit des sites et des campagnes
        orientés conversion.{' '}
        <Link href="/agence-web-maurepas">Voir l’offre Maurepas</Link>.
      </span>
    ),
    services: [
      {
        text: 'Création de sites web',
        subtext: 'UX, contenus, performance, conversion.',
        link: 'nos-services/creation-sites-web-vitrine-e-commerce',
      },
      {
        text: 'Référencement SEO',
        subtext: 'Requêtes locales “service + Maurepas”, on-page, netlinking.',
        link: 'nos-services/seo-referencement-naturel',
      },
      {
        text: 'Maintenance et support',
        subtext: 'MCO, sécurité, supervision, évolutions.',
        link: 'nos-services/creation-site-web-sur-mesure',
      },
      {
        text: 'Web marketing',
        subtext: 'SEA ciblée, social ads, KPIs ROI.',
        link: 'nos-services/gestion-campagnes-sea',
      },
    ],
    objectifs: {
      objectifTitle: 'Notre mission à Maurepas : leads qualifiés et mesurables',
      text1: 'Créer des parcours simples et rassurants.',
      text2: 'A/B testing et CRO pour améliorer les résultats.',
    },
    villesVoisines: [...ALL_VILLES_78],
    cityAroundText: (
      <span className="text-center">
        Ikovaline intervient à Maurepas et dans ces villes des Yvelines :{' '}
        {ALL_VILLES_78.map((v, i, arr) => (
          <span key={v}>
            <Link href={`/agence-web-${removeAccents(v)}`}>{v}</Link>
            {i < arr.length - 2 ? ', ' : i === arr.length - 2 ? ' et ' : ''}
          </span>
        ))}{' '}
        .
      </span>
    ),
    CTATitle: 'Accélérer votre visibilité à Maurepas',
    CTADesc: 'Site + SEO + Ads + SaaS : une base solide pour scaler.',
    CTATextBtn: 'Parler à Ikovaline – Maurepas',
    metaTitle: 'Agence web Maurepas (78) – Site, SEO, SEA, SaaS',
    metaDescription:
      'Création site, SEO local, Ads à Maurepas. Ikovaline – acquisition Yvelines.',
  },

  // 13) Mantes-la-Jolie
  {
    id: 'agence-web-mantes-la-jolie',
    ville: 'Mantes-la-Jolie' as Ville78,
    departement: 'Yvelines',
    intro: `Ikovaline, agence web à Mantes-la-Jolie (78) : site, SEO local, SEA et SaaS — pour artisans, services, industrie (budget ≥ 10k€).`,
    text1: (
      <span>
        À <strong>Mantes-la-Jolie</strong>, nous mettons en place un dispositif
        complet :{' '}
        <Link href="/agence-web-mantes-la-jolie">voir l’offre Mantes</Link>.
      </span>
    ),
    services: [
      {
        text: 'Création de sites web',
        subtext: 'Vitrine/e-com, UX claire, conversion.',
        link: 'nos-services/creation-sites-web-vitrine-e-commerce',
      },
      {
        text: 'Référencement SEO',
        subtext: 'Ciblage local, pages “ville + service”, avis/GBP.',
        link: 'nos-services/seo-referencement-naturel',
      },
      {
        text: 'Maintenance et support',
        subtext: 'Sécurité, backups, supervision et évolutions.',
        link: 'nos-services/creation-site-web-sur-mesure',
      },
      {
        text: 'Web marketing',
        subtext: 'SEA locale, retargeting, email marketing.',
        link: 'nos-services/gestion-campagnes-sea',
      },
    ],
    objectifs: {
      objectifTitle:
        'Notre mission à Mantes-la-Jolie : plus de demandes entrantes',
      text1: 'Aligner le site, le SEO et les Ads sur les parcours clients.',
      text2: 'Mesurer, tester et itérer en continu.',
    },
    villesVoisines: [...ALL_VILLES_78],
    cityAroundText: (
      <span className="text-center">
        Présents à Mantes-la-Jolie et dans ces villes du 78 :{' '}
        {ALL_VILLES_78.map((v, i, arr) => (
          <span key={v}>
            <Link href={`/agence-web-${removeAccents(v)}`}>{v}</Link>
            {i < arr.length - 2 ? ', ' : i === arr.length - 2 ? ' et ' : ''}
          </span>
        ))}{' '}
        .
      </span>
    ),
    CTATitle: 'Développer votre acquisition à Mantes',
    CTADesc: 'Site + SEO + Ads : un trio gagnant pour générer des leads.',
    CTATextBtn: 'Démarrer à Mantes-la-Jolie',
    metaTitle:
      'Agence web Mantes-la-Jolie (78) – Création site, SEO, SEA, SaaS',
    metaDescription:
      'Sites rapides, SEO local et Ads à Mantes-la-Jolie. Ikovaline – leads qualifiés.',
  },

  // 14) Sartrouville
  {
    id: 'agence-web-sartrouville',
    ville: 'Sartrouville' as Ville78,
    departement: 'Yvelines',
    intro: `Agence web Sartrouville (78) : création/refonte site, SEO local, SEA, SaaS — budgets ≥ 10k€.`,
    text1: (
      <span>
        À <strong>Sartrouville</strong>, nous concevons des sites performants et
        un SEO local solide.{' '}
        <Link href="/agence-web-sartrouville">Voir l’offre Sartrouville</Link>.
      </span>
    ),
    services: [
      {
        text: 'Création de sites web',
        subtext: 'Architecture, UX, contenus, conversion.',
        link: 'nos-services/creation-sites-web-vitrine-e-commerce',
      },
      {
        text: 'Référencement SEO',
        subtext: 'Requêtes “service + ville”, on-page, technique, liens.',
        link: 'nos-services/seo-referencement-naturel',
      },
      {
        text: 'Maintenance et support',
        subtext: 'SLA, sécurité, supervision 24/7, évolutions.',
        link: 'nos-services/creation-site-web-sur-mesure',
      },
      {
        text: 'Web marketing',
        subtext: 'SEA locale, social ads, reporting clair.',
        link: 'nos-services/gestion-campagnes-sea',
      },
    ],
    objectifs: {
      objectifTitle: 'Notre mission à Sartrouville : acquisition prévisible',
      text1: 'Industrialiser les pages locales/services qui performent.',
      text2: 'Optimiser le CPA par tests et itérations rapides.',
    },
    villesVoisines: [...ALL_VILLES_78],
    cityAroundText: (
      <span className="text-center">
        Ikovaline couvre Sartrouville et ces villes du 78 :{' '}
        {ALL_VILLES_78.map((v, i, arr) => (
          <span key={v}>
            <Link href={`/agence-web-${removeAccents(v)}`}>{v}</Link>
            {i < arr.length - 2 ? ', ' : i === arr.length - 2 ? ' et ' : ''}
          </span>
        ))}{' '}
        .
      </span>
    ),
    CTATitle: 'Générer des leads à Sartrouville',
    CTADesc: 'Site + SEO + Ads : tout pour accélérer.',
    CTATextBtn: 'Parler à Ikovaline – Sartrouville',
    metaTitle: 'Agence web Sartrouville (78) – Site, SEO, SEA, SaaS',
    metaDescription:
      'Création de site, SEO local et Ads à Sartrouville. Ikovaline – acquisition Yvelines.',
  },

  // 15) Conflans-Sainte-Honorine
  {
    id: 'agence-web-conflans-sainte-honorine',
    ville: 'Conflans-Sainte-Honorine' as Ville78,
    departement: 'Yvelines',
    intro: `Ikovaline, agence web à Conflans-Sainte-Honorine (78) : site, SEO local, SEA, SaaS — projets ≥ 10k€.`,
    text1: (
      <span>
        À <strong>Conflans</strong>, nous créons des sites crédibles et
        optimisés pour la conversion.{' '}
        <Link href="/agence-web-conflans-sainte-honorine">
          Voir l’offre Conflans
        </Link>
        .
      </span>
    ),
    services: [
      {
        text: 'Création de sites web',
        subtext: 'Vitrine/e-com, UX, perf, conversion.',
        link: 'nos-services/creation-sites-web-vitrine-e-commerce',
      },
      {
        text: 'Référencement SEO',
        subtext: 'Local pack, contenu “ville + service”, technique.',
        link: 'nos-services/seo-referencement-naturel',
      },
      {
        text: 'Maintenance et support',
        subtext: 'Sécurité, backups, surveillance, évolutions.',
        link: 'nos-services/creation-site-web-sur-mesure',
      },
      {
        text: 'Web marketing',
        subtext: 'SEA, social ads, email marketing, dashboards.',
        link: 'nos-services/gestion-campagnes-sea',
      },
    ],
    objectifs: {
      objectifTitle: 'Notre mission à Conflans : demandes entrantes régulières',
      text1: 'Cartographier les intentions locales à forte valeur.',
      text2: 'Améliorer en continu les taux de conversion.',
    },
    villesVoisines: [...ALL_VILLES_78],
    cityAroundText: (
      <span className="text-center">
        Présents à Conflans-Sainte-Honorine et dans ces villes du 78 :{' '}
        {ALL_VILLES_78.map((v, i, arr) => (
          <span key={v}>
            <Link href={`/agence-web-${removeAccents(v)}`}>{v}</Link>
            {i < arr.length - 2 ? ', ' : i === arr.length - 2 ? ' et ' : ''}
          </span>
        ))}{' '}
        .
      </span>
    ),
    CTATitle: 'Déployer votre acquisition à Conflans',
    CTADesc: 'Site + SEO + Ads + SaaS : un moteur de croissance.',
    CTATextBtn: 'Démarrer à Conflans',
    metaTitle:
      'Agence web Conflans-Sainte-Honorine (78) – Site, SEO, SEA, SaaS',
    metaDescription:
      'Sites rapides, SEO local, Ads à Conflans-Sainte-Honorine. Leads qualifiés en Yvelines.',
  },

  // 16) Rambouillet
  {
    id: 'agence-web-rambouillet',
    ville: 'Rambouillet' as Ville78,
    departement: 'Yvelines',
    intro: `Agence web Rambouillet (78) : création de site, SEO, SEA, SaaS — budgets ≥ 10k€ pour PME/ETI, santé, tourisme, services.`,
    text1: (
      <span>
        À <strong>Rambouillet</strong>, nous construisons des sites solides et
        un SEO local durable.{' '}
        <Link href="/agence-web-rambouillet">Voir l’offre Rambouillet</Link>.
      </span>
    ),
    services: [
      {
        text: 'Création de sites web',
        subtext: 'Corporate/e-com, UX, contenus, conversion.',
        link: 'nos-services/creation-sites-web-vitrine-e-commerce',
      },
      {
        text: 'Référencement SEO',
        subtext: 'Intentions locales, on-page, technique, maillage.',
        link: 'nos-services/seo-referencement-naturel',
      },
      {
        text: 'Maintenance et support',
        subtext: 'MCO, sécurité, supervision 24/7, évolutions.',
        link: 'nos-services/creation-site-web-sur-mesure',
      },
      {
        text: 'Web marketing',
        subtext: 'SEA, social ads, email, tracking ROAS/CPA.',
        link: 'nos-services/gestion-campagnes-sea',
      },
    ],
    objectifs: {
      objectifTitle: 'Notre mission à Rambouillet : visibilité utile & ROI',
      text1: 'Captez la demande qualifiée (requêtes commerciales locales).',
      text2: 'Optimisez la conversion et la LTV avec une approche data.',
    },
    villesVoisines: [...ALL_VILLES_78],
    cityAroundText: (
      <span className="text-center">
        Ikovaline intervient à Rambouillet et dans ces villes du 78 :{' '}
        {ALL_VILLES_78.map((v, i, arr) => (
          <span key={v}>
            <Link href={`/agence-web-${removeAccents(v)}`}>{v}</Link>
            {i < arr.length - 2 ? ', ' : i === arr.length - 2 ? ' et ' : ''}
          </span>
        ))}{' '}
        .
      </span>
    ),
    CTATitle: 'Lancer un projet digital à Rambouillet',
    CTADesc: 'Site + SEO + Ads + SaaS : un kit complet, orienté résultats.',
    CTATextBtn: 'Parler à Ikovaline – Rambouillet',
    metaTitle: 'Agence web Rambouillet (78) – Création site, SEO, SEA, SaaS',
    metaDescription:
      'Sites performants, SEO local et Ads à Rambouillet. Acquisition premium en Yvelines.',
  },
] as const;
