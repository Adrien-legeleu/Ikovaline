import { removeAccents } from '@/components/pageSatellite/CityAround';
import Link from 'next/link';

export const dataAgence = [
  {
    id: 'agence-web-massy',
    departement: 'Essonne',
    ville: 'Massy',
    intro: `Vous cherchez une agence web en Essonne (Massy) pour une création de site internet, d’app ou de plateforme SaaS qui génère des clients ? Ikovaline conçoit des sites rapides, des applications web performantes et des expériences digitales orientées ROI. Spécialistes du SEO local en Essonne, de la refonte de site vitrine/e-commerce et des stratégies d’acquisition, nous aidons TPE, PME et indépendants de Massy à transformer le web en levier de chiffre d’affaires.`,
    text1: (
      <span>
        Notre <strong>agence web à Massy (Essonne)</strong> combine design, tech
        et SEO pour livrer des <strong>sites web</strong>, <strong>apps</strong>{' '}
        et
        <strong> produits SaaS</strong> qui convertissent. Basés près de{' '}
        <Link href="/agence-web-massy">Massy</Link> (Évry, Palaiseau,
        Verrières-le-Buisson, Saclay…), nous prenons en charge votre{' '}
        <strong>création de site internet</strong>, votre{' '}
        <strong>refonte</strong>, votre <strong>SEO local Essonne</strong> et
        vos campagnes d’acquisition.
        <br />
        Avec Ikovaline, vous bénéficiez d’un accompagnement 100% sur-mesure :
        audit de visibilité, UX/UI, développement (Next.js),{' '}
        <Link href="nos-services/seo-referencement-naturel">
          optimisation SEO
        </Link>
        , hébergement, sécurité et maintenance. Objectif : faire de votre
        présence digitale à Massy un
        <em> actif rentable et durable</em>.
      </span>
    ),
    services: [
      {
        text: 'Création de sites web',
        subtext:
          'Concevez avec Ikovaline un site vitrine ou e-commerce à Massy (Essonne) pensé pour la conversion, prêt pour le SEO et extensible vers une app/SaaS.',
        link: 'nos-services/creation-sites-web-vitrine-e-commerce',
      },
      {
        text: 'Référencement SEO',
        subtext:
          'SEO local Essonne, contenu optimisé et netlinking pour faire remonter votre entreprise de Massy sur Google et capter une demande qualifiée.',
        link: 'nos-services/seo-referencement-naturel',
      },
      {
        text: 'Maintenance et support',
        subtext:
          'Supervision 24/7, mises à jour, sécurité, performance Core Web Vitals : gardez un site/app fiable et rapide avec Ikovaline à Massy.',
        link: 'nos-services/creation-site-web-sur-mesure',
      },
      {
        text: 'Web marketing',
        subtext:
          'Campagnes Google Ads & Social, analytics, contenu et automation : accélérez votre acquisition locale à Massy et en Essonne.',
        link: 'nos-services/gestion-campagnes-sea',
      },
    ],
    objectifs: {
      objectifTitle:
        'Notre mission à Massy : transformer votre site, app ou SaaS en moteur de croissance',
      text1: `De la stratégie à la mise en ligne, Ikovaline orchestre votre création/refonte de site et votre SEO local à Massy. Nous priorisons ce qui impacte votre acquisition et votre conversion, avec un pilotage chiffré.`,
      text2: `Présents en Essonne, nous intervenons sur Massy et alentours pour livrer des résultats concrets (trafic qualifié, leads, ventes). Partenaire fiable et réactif, Ikovaline s’engage sur la performance.`,
    },
    villesVoisines: [
      'Bailly-Romainvilliers',
      'Massy',
      'Évry',
      'Verrières-le-Buisson',
      'Saclay',
      'Courcouronnes',
      'Villeneuve-Saint-Georges',
      'Yerres',
      'Marcoussis',
      'Vauhallan',
      'Wissous',
      'Palaiseau',
      'Corbeil-Essonnes',
    ],
    cityAroundText: (
      <span className="text-center">
        Ikovaline intervient à <Link href="/agence-web-massy">Massy</Link> et
        dans les villes voisines d’Essonne/Île-de-France comme{' '}
        {[
          'Bailly-Romainvilliers',
          'Massy',
          'Évry',
          'Verrières-le-Buisson',
          'Saclay',
          'Courcouronnes',
          'Villeneuve-Saint-Georges',
          'Yerres',
          'Marcoussis',
          'Vauhallan',
          'Wissous',
          'Palaiseau',
          'Corbeil-Essonnes',
        ].map((v, i, arr) => (
          <span key={v}>
            <Link href={`/agence-web-${removeAccents(v)}`}>{v}</Link>
            {i < arr.length - 2 ? ', ' : i === arr.length - 2 ? ' et ' : ''}
          </span>
        ))}{' '}
        pour vos projets de création de site web, d’app et de SaaS en Essonne.
      </span>
    ),
    CTATitle: 'Créons votre site, app ou SaaS à Massy (Essonne)',
    CTADesc:
      'Visibilité locale, performance SEO et conversion : Ikovaline met en place une stratégie digitale mesurable à Massy.',
    CTATextBtn: 'Lancez votre projet web à Massy',
    metaTitle:
      'Agence web Massy (Essonne) – Ikovaline : création de site, app & SaaS, SEO local',
    metaDescription:
      'Ikovaline, agence web à Massy (Essonne) : création/refonte de site internet, apps & SaaS, SEO local, marketing digital, maintenance. Obtenez des résultats concrets.',
  },

  {
    id: 'agence-web-evry',
    departement: 'Essonne',
    ville: 'Évry',
    intro: `Ikovaline, agence web en Essonne à Évry, conçoit des sites internet rapides, des applications web et des produits SaaS alignés sur vos objectifs business. Notre équipe combine UX, tech et SEO local pour générer du trafic qualifié et des leads à Évry et dans tout le territoire essonnien.`,
    text1: (
      <span>
        Vous êtes une entreprise basée à{' '}
        <Link href="/agence-web-evry">Évry</Link> (Essonne) ? Ikovaline vous
        accompagne de A à Z :{' '}
        <Link href="nos-services/creation-sites-web-vitrine-e-commerce">
          création de site vitrine/e-commerce
        </Link>
        , refonte,{' '}
        <Link href="nos-services/seo-referencement-naturel">
          audit & SEO local
        </Link>
        , performance, sécurité, analytics. Notre priorité : transformer votre
        visibilité en revenus avec une approche pragmatique et mesurable.
      </span>
    ),
    services: [
      {
        text: 'Création de sites web',
        subtext:
          'Site vitrine, e-commerce, portail B2B : une base solide pour évoluer vers l’app ou le SaaS, optimisée pour Google et la conversion à Évry.',
        link: 'nos-services/creation-sites-web-vitrine-e-commerce',
      },
      {
        text: 'Référencement SEO',
        subtext:
          'SEO local Essonne (pages, contenu, netlinking) : gagnez des positions sur les requêtes clés à Évry et captez des leads chauds.',
        link: 'nos-services/seo-referencement-naturel',
      },
      {
        text: 'Maintenance et support',
        subtext:
          'MCO, SLA, sauvegardes, sécurité : gardez un site/app robuste et conforme aux exigences de performance.',
        link: 'nos-services/creation-site-web-sur-mesure',
      },
      {
        text: 'Web marketing',
        subtext:
          'SEA (Google Ads), social, contenu et tracking : pilotez l’acquisition d’Évry à tout l’écosystème Essonne.',
        link: 'nos-services/gestion-campagnes-sea',
      },
    ],
    objectifs: {
      objectifTitle: 'Objectif : un canal d’acquisition rentable à Évry',
      text1: `Plan d’action clair, livrables rapides, itérations courtes : Ikovaline structure votre création/refonte et votre SEO pour délivrer un ROI visible à Évry.`,
      text2: `Basés en Essonne, nous intervenons sur tout Évry-Courcouronnes et communes voisines avec un suivi rapproché et des indicateurs partagés.`,
    },
    villesVoisines: [
      'Bailly-Romainvilliers',
      'Massy',
      'Évry',
      'Verrières-le-Buisson',
      'Saclay',
      'Courcouronnes',
      'Villeneuve-Saint-Georges',
      'Yerres',
      'Marcoussis',
      'Vauhallan',
      'Wissous',
      'Palaiseau',
      'Corbeil-Essonnes',
    ],
    cityAroundText: (
      <span className="text-center">
        Nous intervenons partout en Essonne depuis Évry :{' '}
        {[
          'Bailly-Romainvilliers',
          'Massy',
          'Évry',
          'Verrières-le-Buisson',
          'Saclay',
          'Courcouronnes',
          'Villeneuve-Saint-Georges',
          'Yerres',
          'Marcoussis',
          'Vauhallan',
          'Wissous',
          'Palaiseau',
          'Corbeil-Essonnes',
        ].map((v, i, arr) => (
          <span key={v}>
            <Link href={`/agence-web-${removeAccents(v)}`}>{v}</Link>
            {i < arr.length - 2 ? ', ' : i === arr.length - 2 ? ' et ' : ''}
          </span>
        ))}{' '}
        avec des projets de création de site, d’app et de SaaS pilotés par la
        donnée.
      </span>
    ),
    CTATitle: 'Passez à l’action à Évry (Essonne)',
    CTADesc:
      'Création/refonte de site, SEO local et acquisition : Ikovaline aligne votre présence web sur vos objectifs commerciaux.',
    CTATextBtn: 'Lancez votre projet',
    metaTitle:
      'Agence web Évry (Essonne) – Ikovaline : site, app & SaaS, SEO local',
    metaDescription:
      'Ikovaline à Évry : sites internet, apps & SaaS, SEO local Essonne, webmarketing et maintenance. Une approche ROI pour générer des leads qualifiés.',
  },

  {
    id: 'agence-web-verrieres-le-buisson',
    ville: 'Verrières-le-Buisson',
    departement: 'Essonne',
    intro: `À Verrières-le-Buisson (Essonne), Ikovaline crée des sites web rapides, des apps modernes et des produits SaaS évolutifs. Notre spécialité : associer UX, tech et SEO local pour transformer votre visibilité en demandes concrètes.`,
    text1: (
      <span>
        Basée près de{' '}
        <Link href="/agence-web-verriere-le-buisson">Verrières-le-Buisson</Link>
        , notre <strong>agence web Essonne</strong> prend en charge votre{' '}
        <Link href="nos-services/creation-sites-web-vitrine-e-commerce">
          création de site
        </Link>{' '}
        (vitrine/e-commerce), votre{' '}
        <Link href="nos-services/seo-referencement-naturel">SEO local</Link> et
        la performance technique. Résultat : un site/app qui charge vite, se
        positionne mieux et convertit plus.
      </span>
    ),
    services: [
      {
        text: 'Création de sites web',
        subtext:
          'Un site pensé conversion et SEO, extensible vers une app ou un SaaS, dédié aux acteurs de Verrières-le-Buisson et d’Essonne.',
        link: 'nos-services/creation-sites-web-vitrine-e-commerce',
      },
      {
        text: 'Référencement SEO',
        subtext:
          'Stratégie sémantique locale, optimisation on-site, netlinking : gagnez des positions sur Google dans votre zone.',
        link: 'nos-services/seo-referencement-naturel',
      },
      {
        text: 'Maintenance et support',
        subtext:
          'Disponibilité, sécurité, mises à jour et monitoring : votre site/app reste fiable au quotidien.',
        link: 'nos-services/creation-site-web-sur-mesure',
      },
      {
        text: 'Web marketing',
        subtext:
          'SEA et social ads, contenu et reporting : des actions claires, mesurées, alignées sur vos objectifs locaux.',
        link: 'nos-services/gestion-campagnes-sea',
      },
    ],
    objectifs: {
      objectifTitle:
        'Objectif à Verrières-le-Buisson : visibilité utile et leads qualifiés',
      text1: `Ikovaline structure votre projet (site, app, SaaS) avec un plan d’actions SEO local Essonne et une roadmap claire.`,
      text2: `Nous suivons vos indicateurs de trafic, positions et conversions pour piloter une croissance durable en Essonne.`,
    },
    villesVoisines: [
      'Bailly-Romainvilliers',
      'Massy',
      'Évry',
      'Verrières-le-Buisson',
      'Saclay',
      'Courcouronnes',
      'Villeneuve-Saint-Georges',
      'Yerres',
      'Marcoussis',
      'Vauhallan',
      'Wissous',
      'Palaiseau',
      'Corbeil-Essonnes',
    ],
    cityAroundText: (
      <span className="text-center">
        Nous accompagnons aussi les professionnels d’Essonne et alentours :{' '}
        {[
          'Bailly-Romainvilliers',
          'Massy',
          'Évry',
          'Verrières-le-Buisson',
          'Saclay',
          'Courcouronnes',
          'Villeneuve-Saint-Georges',
          'Yerres',
          'Marcoussis',
          'Vauhallan',
          'Wissous',
          'Palaiseau',
          'Corbeil-Essonnes',
        ].map((v, i, arr) => (
          <span key={v}>
            <Link href={`/agence-web-${removeAccents(v)}`}>{v}</Link>
            {i < arr.length - 2 ? ', ' : i === arr.length - 2 ? ' et ' : ''}
          </span>
        ))}{' '}
        pour des projets de création de site, app et SaaS performants.
      </span>
    ),
    CTATitle: 'Passez à l’action maintenant !',
    CTADesc:
      'Plus de visibilité, plus de conversions : Ikovaline, votre agence web Essonne à Verrières-le-Buisson.',
    CTATextBtn: 'Lancez votre projet',
    metaTitle:
      'Agence web Verrières-le-Buisson (Essonne) – Site, app & SaaS, SEO | Ikovaline',
    metaDescription:
      'Création/refonte de site, apps & SaaS, SEO local Essonne. Ikovaline accompagne les pros de Verrières-le-Buisson avec une approche orientée résultats.',
  },

  {
    id: 'agence-web-saclay',
    departement: 'Essonne',
    ville: 'Saclay',
    intro: `Sur le plateau de Saclay (Essonne), Ikovaline accompagne startups, PME et acteurs innovants : sites web performants, apps modernes, produits SaaS scalables et SEO local. Notre promesse : un digital utile qui sert la croissance.`,
    text1: (
      <span>
        À <Link href="/agence-web-saclay">Saclay</Link> et communes voisines,
        notre <strong>agence web Essonne</strong> livre des interfaces rapides
        et accessibles (Core Web Vitals), une architecture SEO propre et des
        contenus pertinents. De la{' '}
        <Link href="nos-services/creation-sites-web-vitrine-e-commerce">
          création de site
        </Link>{' '}
        à l’
        <Link href="nos-services/seo-referencement-naturel">
          optimisation SEO
        </Link>
        , nous bâtissons une base solide pour évoluer vers l’app ou le SaaS.
      </span>
    ),
    services: [
      {
        text: 'Création de sites web',
        subtext:
          'Design, performance, SEO et évolutivité : le socle idéal pour votre app/SaaS à Saclay en Essonne.',
        link: 'nos-services/creation-sites-web-vitrine-e-commerce',
      },
      {
        text: 'Référencement SEO',
        subtext:
          'Devenez la référence locale : structure sémantique, technique, contenu et popularité pilotés sur Saclay.',
        link: 'nos-services/seo-referencement-naturel',
      },
      {
        text: 'Maintenance et support',
        subtext:
          'Nous sécurisons et faisons évoluer votre site/app au rythme de votre activité (MCO, monitoring, backups).',
        link: 'nos-services/creation-site-web-sur-mesure',
      },
      {
        text: 'Web marketing',
        subtext:
          'SEA, social, contenu et analytics : une acquisition lisible et orientée ROI en Essonne.',
        link: 'nos-services/gestion-campagnes-sea',
      },
    ],
    objectifs: {
      objectifTitle: 'Objectif à Saclay : visibilité, performance, conversion',
      text1: `Ikovaline définit un plan d’exécution court-terme (quick wins SEO/UX) et un cap long-terme (autorité, contenus, maillage).`,
      text2: `Résultat : un actif digital qui grandit avec votre entreprise, depuis Saclay vers tout l’écosystème Essonne.`,
    },
    villesVoisines: [
      'Bailly-Romainvilliers',
      'Massy',
      'Évry',
      'Verrières-le-Buisson',
      'Saclay',
      'Courcouronnes',
      'Villeneuve-Saint-Georges',
      'Yerres',
      'Marcoussis',
      'Vauhallan',
      'Wissous',
      'Palaiseau',
      'Corbeil-Essonnes',
    ],
    cityAroundText: (
      <span className="text-center">
        Nous intervenons sur le plateau de Saclay et dans tout le réseau Essonne
        :{' '}
        {[
          'Bailly-Romainvilliers',
          'Massy',
          'Évry',
          'Verrières-le-Buisson',
          'Saclay',
          'Courcouronnes',
          'Villeneuve-Saint-Georges',
          'Yerres',
          'Marcoussis',
          'Vauhallan',
          'Wissous',
          'Palaiseau',
          'Corbeil-Essonnes',
        ].map((v, i, arr) => (
          <span key={v}>
            <Link href={`/agence-web-${removeAccents(v)}`}>{v}</Link>
            {i < arr.length - 2 ? ', ' : i === arr.length - 2 ? ' et ' : ''}
          </span>
        ))}{' '}
        avec des projets site/app/SaaS qui performent.
      </span>
    ),
    CTATitle: 'Passez à l’action maintenant !',
    CTADesc:
      'Ikovaline – agence web Essonne à Saclay : un site rapide, un SEO solide, une acquisition claire.',
    CTATextBtn: 'Lancez votre projet',
    metaTitle:
      'Agence web Saclay (Essonne) – Création de site, app & SaaS, SEO | Ikovaline',
    metaDescription:
      'Ikovaline à Saclay : sites performants, apps et SaaS, SEO local Essonne, webmarketing et maintenance. Croissance pilotée par les données.',
  },

  {
    id: 'agence-web-courcouronnes',
    ville: 'Courcouronnes',
    departement: 'Essonne',
    intro: `Ikovaline accompagne les entreprises de Courcouronnes (Essonne) : création de site internet, refonte, SEO local, apps et SaaS. Notre approche : des livrables soignés, des temps de chargement faibles et un marketing mesurable.`,
    text1: (
      <span>
        Vous êtes à <Link href="/agence-web-courcouronnes">Courcouronnes</Link>{' '}
        ? Nous prenons en charge votre{' '}
        <Link href="nos-services/creation-sites-web-vitrine-e-commerce">
          site vitrine/e-commerce
        </Link>
        , votre{' '}
        <Link href="nos-services/seo-referencement-naturel">SEO local</Link> et
        vos fondations techniques (sécurité, performances, accessibilité) pour
        accroître votre visibilité en Essonne.
      </span>
    ),
    services: [
      {
        text: 'Création de sites web',
        subtext:
          'Un site clair, rapide et évolutif pour Courcouronnes, prêt à devenir une app ou un SaaS selon vos besoins.',
        link: 'nos-services/creation-sites-web-vitrine-e-commerce',
      },
      {
        text: 'Référencement SEO',
        subtext:
          'Captez la demande locale (intention “près de moi”) avec une stratégie SEO Essonne pilotée par les data.',
        link: 'nos-services/seo-referencement-naturel',
      },
      {
        text: 'Maintenance et support',
        subtext:
          'Mises à jour, sécurité et supervision : un socle tranquille pour grandir sans rupture.',
        link: 'nos-services/creation-site-web-sur-mesure',
      },
      {
        text: 'Web marketing',
        subtext:
          'SEA, social, email : mix acquisition + contenus pour activer la croissance locale.',
        link: 'nos-services/gestion-campagnes-sea',
      },
    ],
    objectifs: {
      objectifTitle:
        'Objectif à Courcouronnes : trafic qualifié et conversions',
      text1: `Ikovaline enlève le superflu et concentre l’effort sur les pages et contenus qui convertissent.`,
      text2: `Nous priorisons les quick wins à impact court terme tout en construisant votre autorité en Essonne.`,
    },
    villesVoisines: [
      'Bailly-Romainvilliers',
      'Massy',
      'Évry',
      'Verrières-le-Buisson',
      'Saclay',
      'Courcouronnes',
      'Villeneuve-Saint-Georges',
      'Yerres',
      'Marcoussis',
      'Vauhallan',
      'Wissous',
      'Palaiseau',
      'Corbeil-Essonnes',
    ],
    cityAroundText: (
      <span className="text-center">
        Interventions Essonne et alentours :{' '}
        {[
          'Bailly-Romainvilliers',
          'Massy',
          'Évry',
          'Verrières-le-Buisson',
          'Saclay',
          'Courcouronnes',
          'Villeneuve-Saint-Georges',
          'Yerres',
          'Marcoussis',
          'Vauhallan',
          'Wissous',
          'Palaiseau',
          'Corbeil-Essonnes',
        ].map((v, i, arr) => (
          <span key={v}>
            <Link href={`/agence-web-${removeAccents(v)}`}>{v}</Link>
            {i < arr.length - 2 ? ', ' : i === arr.length - 2 ? ' et ' : ''}
          </span>
        ))}{' '}
        pour vos projets site/app/SaaS avec Ikovaline.
      </span>
    ),
    CTATitle: 'Passez à l’action maintenant !',
    CTADesc:
      'Ikovaline – agence web Essonne : création/refonte, SEO, marketing et maintenance à Courcouronnes.',
    CTATextBtn: 'Lancez votre projet',
    metaTitle:
      'Agence web Courcouronnes (Essonne) – Site, app & SaaS, SEO | Ikovaline',
    metaDescription:
      'Création de site, refonte, apps & SaaS, SEO local Essonne et webmarketing à Courcouronnes. Ikovaline livre des résultats mesurables.',
  },

  {
    id: 'agence-web-villeneuve-saint-georges',
    ville: 'Villeneuve-Saint-Georges',
    departement: 'Essonne',
    intro: `Ikovaline conçoit des sites internet, apps et produits SaaS pour les entreprises de Villeneuve-Saint-Georges et de l’Essonne. Notre promesse : visibilité locale, performance, conversions.`,
    text1: (
      <span>
        À{' '}
        <Link href="/agence-web-villeneuve-saint-georges">
          Villeneuve-Saint-Georges
        </Link>
        , notre <strong>agence web</strong> gère votre{' '}
        <Link href="nos-services/creation-sites-web-vitrine-e-commerce">
          création de site
        </Link>{' '}
        (vitrine/e-commerce), votre{' '}
        <Link href="nos-services/seo-referencement-naturel">SEO</Link> et la
        performance technique (temps de chargement, sécurité, référencement). Un
        socle fiable pour développer une app ou un SaaS.
      </span>
    ),
    services: [
      {
        text: 'Création de sites web',
        subtext:
          'Site moderne, rapide, SEO-ready : une base idéale pour votre croissance digitale locale.',
        link: 'nos-services/creation-sites-web-vitrine-e-commerce',
      },
      {
        text: 'Référencement SEO',
        subtext:
          'Optimisations on-site/off-site, contenu et netlinking : gagnez des positions utiles autour de Villeneuve-Saint-Georges.',
        link: 'nos-services/seo-referencement-naturel',
      },
      {
        text: 'Maintenance et support',
        subtext:
          'Surveillance, mises à jour, sauvegardes : un site/app stable qui tient la charge au quotidien.',
        link: 'nos-services/creation-site-web-sur-mesure',
      },
      {
        text: 'Web marketing',
        subtext:
          'SEA, social, email et contenus pour amplifier votre présence et votre génération de leads.',
        link: 'nos-services/gestion-campagnes-sea',
      },
    ],
    objectifs: {
      objectifTitle:
        'Objectif à Villeneuve-Saint-Georges : une présence web qui vend',
      text1: `Nous structurons vos pages piliers, vos silos SEO et votre tracking pour relier trafic et chiffre d’affaires.`,
      text2: `Approche orientée Essonne/Île-de-France, avec un suivi d’indicateurs partagé et actionnable.`,
    },
    villesVoisines: [
      'Bailly-Romainvilliers',
      'Massy',
      'Évry',
      'Verrières-le-Buisson',
      'Saclay',
      'Courcouronnes',
      'Villeneuve-Saint-Georges',
      'Yerres',
      'Marcoussis',
      'Vauhallan',
      'Wissous',
      'Palaiseau',
      'Corbeil-Essonnes',
    ],
    cityAroundText: (
      <span className="text-center">
        Nous couvrons Villeneuve-Saint-Georges et l’Essonne voisine :{' '}
        {[
          'Bailly-Romainvilliers',
          'Massy',
          'Évry',
          'Verrières-le-Buisson',
          'Saclay',
          'Courcouronnes',
          'Villeneuve-Saint-Georges',
          'Yerres',
          'Marcoussis',
          'Vauhallan',
          'Wissous',
          'Palaiseau',
          'Corbeil-Essonnes',
        ].map((v, i, arr) => (
          <span key={v}>
            <Link href={`/agence-web-${removeAccents(v)}`}>{v}</Link>
            {i < arr.length - 2 ? ', ' : i === arr.length - 2 ? ' et ' : ''}
          </span>
        ))}{' '}
        avec Ikovaline (site, app, SaaS, SEO).
      </span>
    ),
    CTATitle: 'Passez à l’action maintenant !',
    CTADesc:
      'Ikovaline – agence web locale : création de site, SEO, marketing et maintenance.',
    CTATextBtn: 'Lancez votre projet',
    metaTitle:
      'Agence web Villeneuve-Saint-Georges – Site, app & SaaS, SEO | Ikovaline',
    metaDescription:
      'Création/refonte de site, apps & SaaS, SEO local, SEA et maintenance. Ikovaline propulse votre visibilité et vos ventes.',
  },

  {
    id: 'agence-web-yerres',
    ville: 'Yerres',
    departement: 'Essonne',
    intro: `Ikovaline, agence web Essonne à Yerres : création de site internet, apps et SaaS, SEO local et webmarketing. Nous livrons des interfaces belles, rapides et efficaces pour générer des appels et des devis.`,
    text1: (
      <span>
        À <Link href="/agence-web-yerres">Yerres</Link>, nous concevons des
        <strong> sites web</strong> et des <strong>apps</strong> orientés
        conversion : structure claire, contenus pertinents, SEO local Essonne,
        performances soignées. De la{' '}
        <Link href="nos-services/creation-sites-web-vitrine-e-commerce">
          création
        </Link>{' '}
        à l’
        <Link href="nos-services/seo-referencement-naturel">
          optimisation SEO
        </Link>
        , vous progressez étape par étape.
      </span>
    ),
    services: [
      {
        text: 'Création de sites web',
        subtext:
          'Site vitrine/e-commerce extensible vers app/SaaS, avec un focus conversion et Google.',
        link: 'nos-services/creation-sites-web-vitrine-e-commerce',
      },
      {
        text: 'Référencement SEO',
        subtext:
          'Travail sémantique, technique et popularité : grimpez sur les requêtes locales Yerres/Essonne.',
        link: 'nos-services/seo-referencement-naturel',
      },
      {
        text: 'Maintenance et support',
        subtext:
          'Nous sécurisons et maintenons votre site/app pour éviter les pannes et pertes de données.',
        link: 'nos-services/creation-site-web-sur-mesure',
      },
      {
        text: 'Web marketing',
        subtext:
          'Acquisition pilotée (SEA/social), contenu et reporting pour un ROI lisible.',
        link: 'nos-services/gestion-campagnes-sea',
      },
    ],
    objectifs: {
      objectifTitle: 'Objectif à Yerres : capter la demande locale qualifiée',
      text1: `Pages locales, avis, Google Business Profile, contenus utiles : nous construisons un entonnoir simple et efficace.`,
      text2: `Suivi mensuel des KPI pour piloter vos priorités en Essonne.`,
    },
    villesVoisines: [
      'Bailly-Romainvilliers',
      'Massy',
      'Évry',
      'Verrières-le-Buisson',
      'Saclay',
      'Courcouronnes',
      'Villeneuve-Saint-Georges',
      'Yerres',
      'Marcoussis',
      'Vauhallan',
      'Wissous',
      'Palaiseau',
      'Corbeil-Essonnes',
    ],
    cityAroundText: (
      <span className="text-center">
        Interventions à Yerres et autour (Essonne/IDF) :{' '}
        {[
          'Bailly-Romainvilliers',
          'Massy',
          'Évry',
          'Verrières-le-Buisson',
          'Saclay',
          'Courcouronnes',
          'Villeneuve-Saint-Georges',
          'Yerres',
          'Marcoussis',
          'Vauhallan',
          'Wissous',
          'Palaiseau',
          'Corbeil-Essonnes',
        ].map((v, i, arr) => (
          <span key={v}>
            <Link href={`/agence-web-${removeAccents(v)}`}>{v}</Link>
            {i < arr.length - 2 ? ', ' : i === arr.length - 2 ? ' et ' : ''}
          </span>
        ))}{' '}
        avec Ikovaline (site, app, SaaS).
      </span>
    ),
    CTATitle: 'Passez à l’action maintenant !',
    CTADesc:
      'Création/refonte, SEO local et marketing : Ikovaline propulse vos résultats à Yerres.',
    CTATextBtn: 'Lancez votre projet',
    metaTitle:
      'Agence web Yerres (Essonne) – Ikovaline : site, app & SaaS, SEO local',
    metaDescription:
      'Ikovaline à Yerres : sites web performants, apps/SaaS, SEO Essonne, campagnes d’acquisition, maintenance et sécurité.',
  },

  {
    id: 'agence-web-marcoussis',
    departement: 'Essonne',
    ville: 'Marcoussis',
    intro: `À Marcoussis (Essonne), Ikovaline conçoit des sites internet efficaces, des apps web et des produits SaaS adaptés aux artisans, commerçants et PME. Nous mettons le SEO local et la conversion au centre.`,
    text1: (
      <span>
        Entreprise implantée à{' '}
        <Link href="/agence-web-marcoussis">Marcoussis</Link> ? Confiez-nous
        votre{' '}
        <Link href="nos-services/creation-sites-web-vitrine-e-commerce">
          création de site
        </Link>
        , votre{' '}
        <Link href="nos-services/seo-referencement-naturel">audit/SEO</Link> et
        votre maintenance. Notre approche : un site rapide, clair, bien
        positionné en Essonne, qui transforme vos visites en demandes.
      </span>
    ),
    services: [
      {
        text: 'Création de sites web',
        subtext:
          'Site vitrine ou e-commerce prêt pour le SEO et l’évolution vers app/SaaS, pensé pour Marcoussis et l’Essonne.',
        link: 'nos-services/creation-sites-web-vitrine-e-commerce',
      },
      {
        text: 'Référencement SEO',
        subtext:
          'Cocon sémantique local, on-site/technical SEO et netlinking pour capter vos clients autour de Marcoussis.',
        link: 'nos-services/seo-referencement-naturel',
      },
      {
        text: 'Maintenance et support',
        subtext:
          'Protection, mises à jour, backups et supervision : un site serein au quotidien.',
        link: 'nos-services/creation-site-web-sur-mesure',
      },
      {
        text: 'Web marketing',
        subtext:
          'SEA, social, contenus et analytics pour des campagnes rentables et suivies.',
        link: 'nos-services/gestion-campagnes-sea',
      },
    ],
    objectifs: {
      objectifTitle: 'Objectif à Marcoussis : visibilité locale qui convertit',
      text1: `Nous priorisons les pages utiles, les appels à l’action visibles et la preuve sociale (avis, cas).`,
      text2: `Cap sur la croissance durable en Essonne, avec des itérations courtes et mesurées.`,
    },
    villesVoisines: [
      'Bailly-Romainvilliers',
      'Massy',
      'Évry',
      'Verrières-le-Buisson',
      'Saclay',
      'Courcouronnes',
      'Villeneuve-Saint-Georges',
      'Yerres',
      'Marcoussis',
      'Vauhallan',
      'Wissous',
      'Palaiseau',
      'Corbeil-Essonnes',
    ],
    cityAroundText: (
      <span className="text-center">
        Ikovaline intervient en Essonne et alentours depuis Marcoussis :{' '}
        {[
          'Bailly-Romainvilliers',
          'Massy',
          'Évry',
          'Verrières-le-Buisson',
          'Saclay',
          'Courcouronnes',
          'Villeneuve-Saint-Georges',
          'Yerres',
          'Marcoussis',
          'Vauhallan',
          'Wissous',
          'Palaiseau',
          'Corbeil-Essonnes',
        ].map((v, i, arr) => (
          <span key={v}>
            <Link href={`/agence-web-${removeAccents(v)}`}>{v}</Link>
            {i < arr.length - 2 ? ', ' : i === arr.length - 2 ? ' et ' : ''}
          </span>
        ))}{' '}
        création de site, app, SaaS et SEO local.
      </span>
    ),
    CTATitle: 'Passez à l’action maintenant !',
    CTADesc:
      'Ikovaline – votre partenaire web à Marcoussis pour un digital utile et rentable.',
    CTATextBtn: 'Lancez votre projet',
    metaTitle:
      'Agence web Marcoussis (Essonne) – Site, app & SaaS, SEO | Ikovaline',
    metaDescription:
      'Sites, apps & SaaS, SEO local Essonne, SEA et maintenance à Marcoussis. Ikovaline construit votre croissance digitale.',
  },

  {
    id: 'agence-web-vauhallan',
    ville: 'Vauhallan',
    departement: 'Essonne',
    intro: `Ikovaline, agence web Essonne à Vauhallan : création de site internet, app et SaaS, SEO local et marketing. Des fondations techniques solides et des contenus qui performent.`,
    text1: (
      <span>
        À <Link href="/agence-web-vauhallan">Vauhallan</Link>, nous livrons des
        sites/app rapides, accessibles et bien structurés. De la{' '}
        <Link href="nos-services/creation-sites-web-vitrine-e-commerce">
          création de site
        </Link>{' '}
        à l’<Link href="nos-services/seo-referencement-naturel">audit/SEO</Link>
        , Ikovaline pose un socle durable pour votre visibilité en Essonne.
      </span>
    ),
    services: [
      {
        text: 'Création de sites web',
        subtext:
          'Un site soigné, SEO-ready et évolutif (app/SaaS) pour Vauhallan et l’écosystème Essonne.',
        link: 'nos-services/creation-sites-web-vitrine-e-commerce',
      },
      {
        text: 'Référencement SEO',
        subtext:
          'Structure sémantique locale, contenu utile et liens : captez les requêtes pertinentes autour de Vauhallan.',
        link: 'nos-services/seo-referencement-naturel',
      },
      {
        text: 'Maintenance et support',
        subtext:
          'Sécurité, mises à jour, sauvegardes et supervision : votre actif digital reste fiable.',
        link: 'nos-services/creation-site-web-sur-mesure',
      },
      {
        text: 'Web marketing',
        subtext:
          'Publicités (SEA/social), contenu et tracking pour accélérer l’acquisition.',
        link: 'nos-services/gestion-campagnes-sea',
      },
    ],
    objectifs: {
      objectifTitle: 'Objectif à Vauhallan : un site qui travaille pour vous',
      text1: `CTA visibles, pages locales, preuve sociale et SEO technique : nous activons les bons leviers.`,
      text2: `Pilotage mensuel des KPI pour des décisions simples et efficaces en Essonne.`,
    },
    villesVoisines: [
      'Bailly-Romainvilliers',
      'Massy',
      'Évry',
      'Verrières-le-Buisson',
      'Saclay',
      'Courcouronnes',
      'Villeneuve-Saint-Georges',
      'Yerres',
      'Marcoussis',
      'Vauhallan',
      'Wissous',
      'Palaiseau',
      'Corbeil-Essonnes',
    ],
    cityAroundText: (
      <span className="text-center">
        Présents à Vauhallan, nous couvrons l’Essonne voisine :{' '}
        {[
          'Bailly-Romainvilliers',
          'Massy',
          'Évry',
          'Verrières-le-Buisson',
          'Saclay',
          'Courcouronnes',
          'Villeneuve-Saint-Georges',
          'Yerres',
          'Marcoussis',
          'Vauhallan',
          'Wissous',
          'Palaiseau',
          'Corbeil-Essonnes',
        ].map((v, i, arr) => (
          <span key={v}>
            <Link href={`/agence-web-${removeAccents(v)}`}>{v}</Link>
            {i < arr.length - 2 ? ', ' : i === arr.length - 2 ? ' et ' : ''}
          </span>
        ))}{' '}
        avec Ikovaline (site, app, SaaS, SEO).
      </span>
    ),
    CTATitle: 'Passez à l’action maintenant !',
    CTADesc:
      'Ikovaline – agence web Essonne à Vauhallan : un digital clair, rapide et rentable.',
    CTATextBtn: 'Lancez votre projet',
    metaTitle:
      'Agence web Vauhallan (Essonne) – Site, app & SaaS, SEO | Ikovaline',
    metaDescription:
      'Création de site, apps & SaaS, SEO local Essonne et marketing. Ikovaline développe votre visibilité à Vauhallan.',
  },

  {
    id: 'agence-web-wissous',
    ville: 'Wissous',
    departement: 'Essonne',
    intro: `À Wissous (Essonne), Ikovaline réalise des sites web rapides, des apps web et des projets SaaS qui transforment la visibilité en prospects. Notre méthode : UX + SEO + performance.`,
    text1: (
      <span>
        Entreprise basée à <Link href="/agence-web-wissous">Wissous</Link> ?
        Ikovaline conçoit votre{' '}
        <Link href="nos-services/creation-sites-web-vitrine-e-commerce">
          site vitrine/e-commerce
        </Link>
        , assure votre{' '}
        <Link href="nos-services/seo-referencement-naturel">SEO local</Link> et
        votre maintenance pour une croissance sereine en Essonne.
      </span>
    ),
    services: [
      {
        text: 'Création de sites web',
        subtext:
          'Design premium, architecture SEO et vitesse : un socle qui peut évoluer vers l’app/SaaS.',
        link: 'nos-services/creation-sites-web-vitrine-e-commerce',
      },
      {
        text: 'Référencement SEO',
        subtext:
          'Optimisations locales et contenu utile pour ressortir sur Google autour de Wissous et en Essonne.',
        link: 'nos-services/seo-referencement-naturel',
      },
      {
        text: 'Maintenance et support',
        subtext:
          'Sécurité, mises à jour, sauvegardes et monitoring : un site/app qui tient la charge.',
        link: 'nos-services/creation-site-web-sur-mesure',
      },
      {
        text: 'Web marketing',
        subtext:
          'SEA, social, email et analytics : un plan d’acquisition clair et mesurable.',
        link: 'nos-services/gestion-campagnes-sea',
      },
    ],
    objectifs: {
      objectifTitle: 'Objectif à Wissous : plus de visibilité, plus de clients',
      text1: `Pages locales, contenus, avis et tracking : on relie vos efforts à vos résultats.`,
      text2: `Approche Essonne, indicateurs partagés et itérations rapides avec Ikovaline.`,
    },
    villesVoisines: [
      'Bailly-Romainvilliers',
      'Massy',
      'Évry',
      'Verrières-le-Buisson',
      'Saclay',
      'Courcouronnes',
      'Villeneuve-Saint-Georges',
      'Yerres',
      'Marcoussis',
      'Vauhallan',
      'Wissous',
      'Palaiseau',
      'Corbeil-Essonnes',
    ],
    cityAroundText: (
      <span className="text-center">
        Ikovaline opère à Wissous et dans les villes voisines d’Essonne/IDF :{' '}
        {[
          'Bailly-Romainvilliers',
          'Massy',
          'Évry',
          'Verrières-le-Buisson',
          'Saclay',
          'Courcouronnes',
          'Villeneuve-Saint-Georges',
          'Yerres',
          'Marcoussis',
          'Vauhallan',
          'Wissous',
          'Palaiseau',
          'Corbeil-Essonnes',
        ].map((v, i, arr) => (
          <span key={v}>
            <Link href={`/agence-web-${removeAccents(v)}`}>{v}</Link>
            {i < arr.length - 2 ? ', ' : i === arr.length - 2 ? ' et ' : ''}
          </span>
        ))}{' '}
        (site, app, SaaS, SEO local).
      </span>
    ),
    CTATitle: 'Passez à l’action maintenant !',
    CTADesc:
      'Ikovaline – agence web Essonne à Wissous : des projets web qui performent.',
    CTATextBtn: 'Lancez votre projet',
    metaTitle:
      'Agence web Wissous (Essonne) – Site, app & SaaS, SEO | Ikovaline',
    metaDescription:
      'Sites, apps & SaaS, SEO local Essonne, SEA et maintenance à Wissous. Ikovaline accélère votre acquisition.',
  },

  {
    id: 'agence-web-palaiseau',
    ville: 'Palaiseau',
    departement: 'Essonne',
    intro: `Ikovaline, agence web à Palaiseau (Essonne) : création/refonte de site internet, développement d’apps et de SaaS, SEO local et webmarketing. Notre objectif : transformer votre présence en ligne en résultats concrets.`,
    text1: (
      <span>
        Notre <strong>agence web à Palaiseau</strong> conçoit des sites
        vitrines, e-commerce et sur-mesure, avec un focus{' '}
        <Link href="nos-services/seo-referencement-naturel">
          SEO local Essonne
        </Link>
        , performance et conversion. De Palaiseau à Massy, Saclay ou
        Verrières-le-Buisson, nous livrons des projets propres, rapides et
        évolutifs vers l’app/SaaS.
        <br />
        Démarrez avec une{' '}
        <Link href="nos-services/creation-sites-web-vitrine-e-commerce">
          création de site internet
        </Link>{' '}
        robuste et une stratégie de contenus utile : Google vous le rendra.
      </span>
    ),
    services: [
      {
        text: 'Création de sites web',
        subtext:
          'Base solide (design, vitesse, SEO) pour un développement futur en app/SaaS à Palaiseau.',
        link: 'nos-services/creation-sites-web-vitrine-e-commerce',
      },
      {
        text: 'Référencement SEO',
        subtext:
          'Silos locaux, contenu, optimisation technique et popularité : grimpez sur vos requêtes clés.',
        link: 'nos-services/seo-referencement-naturel',
      },
      {
        text: 'Maintenance et support',
        subtext:
          'Sécurité, sauvegardes, supervision et corrections : un site/app fiable jour après jour.',
        link: 'nos-services/creation-site-web-sur-mesure',
      },
      {
        text: 'Web marketing',
        subtext:
          'SEA, social, contenu et reporting pour accélérer votre génération de leads à Palaiseau.',
        link: 'nos-services/gestion-campagnes-sea',
      },
    ],
    objectifs: {
      objectifTitle:
        'Notre objectif à Palaiseau : propulser votre présence digitale',
      text1: `Plan d’exécution clair, priorisation par impact, mesures continues : Ikovaline aligne votre budget sur ce qui compte.`,
      text2: `Résultats recherchés : meilleure visibilité locale, plus de conversions et un actif digital qui dure en Essonne.`,
    },
    villesVoisines: [
      'Bailly-Romainvilliers',
      'Massy',
      'Évry',
      'Verrières-le-Buisson',
      'Saclay',
      'Courcouronnes',
      'Villeneuve-Saint-Georges',
      'Yerres',
      'Marcoussis',
      'Vauhallan',
      'Wissous',
      'Palaiseau',
      'Corbeil-Essonnes',
    ],
    cityAroundText: (
      <span className="text-center">
        Notre <strong>agence web à Palaiseau</strong> intervient en Essonne :{' '}
        {[
          'Bailly-Romainvilliers',
          'Massy',
          'Évry',
          'Verrières-le-Buisson',
          'Saclay',
          'Courcouronnes',
          'Villeneuve-Saint-Georges',
          'Yerres',
          'Marcoussis',
          'Vauhallan',
          'Wissous',
          'Palaiseau',
          'Corbeil-Essonnes',
        ].map((v, i, arr) => (
          <span key={v}>
            <Link href={`/agence-web-${removeAccents(v)}`}>{v}</Link>
            {i < arr.length - 2 ? ', ' : i === arr.length - 2 ? ' et ' : ''}
          </span>
        ))}{' '}
        pour la création de site, l’app, le SaaS et le SEO local.
      </span>
    ),
    CTATitle: 'Passez à l’action à Palaiseau !',
    CTADesc:
      'Ikovaline – création de site, SEO, acquisition et maintenance à Palaiseau.',
    CTATextBtn: 'Lancez votre projet web à Palaiseau',
    metaTitle:
      'Agence web Palaiseau (Essonne) – Ikovaline : site, app & SaaS, SEO',
    metaDescription:
      'Sites rapides, apps & SaaS, SEO local Essonne et campagnes rentables à Palaiseau. Un accompagnement orienté résultats.',
  },

  {
    id: 'agence-web-corbeil-essonnes',
    ville: 'Corbeil-Essonnes',
    departement: 'Essonne',
    intro: `Ikovaline, agence web à Corbeil-Essonnes (Essonne) : création/refonte de site internet, développement d’apps et de SaaS, SEO local et marketing digital. Nous faisons rimer esthétique, vitesse et conversion.`,
    text1: (
      <span>
        À <Link href="/agence-web-corbeil-essonnes">Corbeil-Essonnes</Link>,
        Ikovaline construit des sites/app robustes et évolutifs. De la{' '}
        <Link href="nos-services/creation-sites-web-vitrine-e-commerce">
          création de site
        </Link>{' '}
        à l’
        <Link href="nos-services/seo-referencement-naturel">
          optimisation SEO
        </Link>
        , nous livrons un socle durable pour votre acquisition en Essonne.
      </span>
    ),
    services: [
      {
        text: 'Création de sites web',
        subtext:
          'Un site moderne, rapide et SEO-ready, pensé pour évoluer vers app/SaaS si besoin.',
        link: 'nos-services/creation-sites-web-vitrine-e-commerce',
      },
      {
        text: 'Référencement SEO',
        subtext:
          'SEO local Corbeil-Essonnes/Essonne : structure, contenu, liens et avis pour ressortir sur Google.',
        link: 'nos-services/seo-referencement-naturel',
      },
      {
        text: 'Maintenance et support',
        subtext:
          'Supervision, sécurité, sauvegardes et corrections : stabilité et sérénité au quotidien.',
        link: 'nos-services/creation-site-web-sur-mesure',
      },
      {
        text: 'Web marketing',
        subtext:
          'SEA, social, contenu et analytics : un plan d’acquisition piloté par les données.',
        link: 'nos-services/gestion-campagnes-sea',
      },
    ],
    objectifs: {
      objectifTitle:
        'Objectif à Corbeil-Essonnes : un actif digital qui rapporte',
      text1: `CTA clairs, pages percutantes, contenus utiles : nous alignons votre site et votre SEO sur vos priorités business.`,
      text2: `Indicateurs suivis, décisions éclairées : cap sur la croissance locale en Essonne.`,
    },
    villesVoisines: [
      'Bailly-Romainvilliers',
      'Massy',
      'Évry',
      'Verrières-le-Buisson',
      'Saclay',
      'Courcouronnes',
      'Villeneuve-Saint-Georges',
      'Yerres',
      'Marcoussis',
      'Vauhallan',
      'Wissous',
      'Palaiseau',
      'Corbeil-Essonnes',
    ],
    cityAroundText: (
      <span className="text-center">
        Ikovaline intervient à Corbeil-Essonnes et dans les villes voisines
        d’Essonne/IDF :{' '}
        {[
          'Bailly-Romainvilliers',
          'Massy',
          'Évry',
          'Verrières-le-Buisson',
          'Saclay',
          'Courcouronnes',
          'Villeneuve-Saint-Georges',
          'Yerres',
          'Marcoussis',
          'Vauhallan',
          'Wissous',
          'Palaiseau',
          'Corbeil-Essonnes',
        ].map((v, i, arr) => (
          <span key={v}>
            <Link href={`/agence-web-${removeAccents(v)}`}>{v}</Link>
            {i < arr.length - 2 ? ', ' : i === arr.length - 2 ? ' et ' : ''}
          </span>
        ))}{' '}
        (site, app, SaaS, SEO).
      </span>
    ),
    CTATitle: 'Passez à l’action maintenant !',
    CTADesc:
      'Création/refonte, SEO et acquisition : Ikovaline, votre agence web Essonne à Corbeil-Essonnes.',
    CTATextBtn: 'Lancez votre projet',
    metaTitle:
      'Agence web Corbeil-Essonnes (Essonne) – Site, app & SaaS, SEO | Ikovaline',
    metaDescription:
      'Sites performants, apps/SaaS, SEO local Essonne et campagnes pilotées à Corbeil-Essonnes. Résultats concrets avec Ikovaline.',
  },

  {
    id: 'agence-web-savigny-sur-orge',
    ville: 'Savigny-sur-Orge',
    departement: 'Essonne',
    intro: `À Savigny-sur-Orge (Essonne), Ikovaline conçoit des sites web élégants et rapides, des apps et des SaaS orientés business. Nous vous aidons à gagner des positions sur Google et à transformer vos visites en clients.`,
    text1: (
      <span>
        Notre <strong>agence web à Savigny-sur-Orge</strong> propose des
        solutions sur-mesure :{' '}
        <Link href="nos-services/creation-sites-web-vitrine-e-commerce">
          création de site internet
        </Link>
        , refonte,{' '}
        <Link href="nos-services/seo-referencement-naturel">
          SEO local Essonne
        </Link>
        , sécurité, maintenance, campagnes et reporting. Un accompagnement
        complet pour une présence digitale qui travaille pour vous.
      </span>
    ),
    services: [
      {
        text: 'Création de sites web',
        subtext:
          'Site vitrine/e-commerce pensé conversion et SEO, évolutif vers app/SaaS à Savigny-sur-Orge.',
        link: 'nos-services/creation-sites-web-vitrine-e-commerce',
      },
      {
        text: 'Référencement SEO',
        subtext:
          'Optimisations locales, contenu utile et maillage : captez la demande autour de Savigny et en Essonne.',
        link: 'nos-services/seo-referencement-naturel',
      },
      {
        text: 'Maintenance et support',
        subtext:
          'Mises à jour, sécurité, backups et supervision : gardez un actif digital sain et rapide.',
        link: 'nos-services/creation-site-web-sur-mesure',
      },
      {
        text: 'Web marketing',
        subtext:
          'Google Ads, social, contenu, email : accélérez votre acquisition avec un pilotage chiffré.',
        link: 'nos-services/gestion-campagnes-sea',
      },
    ],
    objectifs: {
      objectifTitle:
        'Notre mission à Savigny-sur-Orge : faire de votre site un levier de croissance',
      text1: `Nous alignons conception, SEO local et preuve sociale pour générer des leads qualifiés.`,
      text2: `Approche Essonne et indicateurs partagés : des décisions rapides et pragmatiques avec Ikovaline.`,
    },
    villesVoisines: [
      'Savigny-sur-Orge',
      'Sainte-Geneviève-des-Bois',
      'Viry-Châtillon',
      'Athis-Mons',
      'Draveil',
      'Massy',
      'Évry',
      'Palaiseau',
      'Verrières-le-Buisson',
      'Wissous',
      'Corbeil-Essonnes',
    ],
    cityAroundText: (
      <span className="text-center">
        Notre <strong>agence web à Savigny-sur-Orge</strong> intervient aussi à{' '}
        {[
          'Sainte-Geneviève-des-Bois',
          'Viry-Châtillon',
          'Athis-Mons',
          'Draveil',
          'Massy',
          'Évry',
          'Palaiseau',
          'Verrières-le-Buisson',
          'Wissous',
          'Corbeil-Essonnes',
        ].map((v, i, arr) => (
          <span key={v}>
            <Link href={`/agence-web-${removeAccents(v)}`}>{v}</Link>
            {i < arr.length - 2 ? ', ' : i === arr.length - 2 ? ' et ' : ''}
          </span>
        ))}{' '}
        pour créer des sites, apps et SaaS performants en Essonne.
      </span>
    ),
    CTATitle: 'Créons votre site internet à Savigny-sur-Orge dès maintenant !',
    CTADesc:
      'Ikovaline : visibilité locale, performance SEO et conversion au service de votre business.',
    CTATextBtn: 'Lancez votre projet web à Savigny-sur-Orge',
    metaTitle:
      'Agence web Savigny-sur-Orge (Essonne) – Site, app & SaaS, SEO | Ikovaline',
    metaDescription:
      'Création/refonte, apps & SaaS, SEO local Essonne et marketing digital à Savigny-sur-Orge. Avec Ikovaline, obtenez des résultats concrets.',
  },

  {
    id: 'agence-web-sainte-genevieve-des-bois',
    ville: 'Sainte-Geneviève-des-Bois',
    departement: 'Essonne',
    intro: `Ikovaline, agence web Essonne à Sainte-Geneviève-des-Bois : sites internet, apps/SaaS, SEO local et acquisition. Nous livrons des projets utiles, mesurables et pérennes.`,
    text1: (
      <span>
        Notre <strong>agence web à Sainte-Geneviève-des-Bois</strong> conçoit
        des sites vitrines/e-commerce orientés performance et conversion. De la{' '}
        <Link href="nos-services/creation-sites-web-vitrine-e-commerce">
          création
        </Link>{' '}
        à la{' '}
        <Link href="nos-services/seo-referencement-naturel">
          stratégie SEO locale
        </Link>
        , Ikovaline structure une progression durable en Essonne.
      </span>
    ),
    services: [
      {
        text: 'Création de sites web',
        subtext:
          'Un site beau, rapide et SEO-ready, prêt à évoluer vers l’app ou le SaaS à Sainte-Geneviève.',
        link: 'nos-services/creation-sites-web-vitrine-e-commerce',
      },
      {
        text: 'Référencement SEO',
        subtext:
          'Travail sémantique local, on-site et netlinking : gagnez des positions durables en Essonne.',
        link: 'nos-services/seo-referencement-naturel',
      },
      {
        text: 'Maintenance et support',
        subtext:
          'Sécurité, mises à jour et supervision : un site fiable qui sert votre croissance.',
        link: 'nos-services/creation-site-web-sur-mesure',
      },
      {
        text: 'Web marketing',
        subtext:
          'SEA/social, contenu et reporting : une acquisition lisible et rentable.',
        link: 'nos-services/gestion-campagnes-sea',
      },
    ],
    objectifs: {
      objectifTitle:
        'Notre objectif à Sainte-Geneviève-des-Bois : un digital qui convertit',
      text1: `Pages locales, avis clients, FAQ et contenus utiles : nous activons les ressorts qui comptent pour Google et vos visiteurs.`,
      text2: `Suivi des KPI et ajustements continus avec Ikovaline (Essonne).`,
    },
    villesVoisines: [
      'Savigny-sur-Orge',
      'Sainte-Geneviève-des-Bois',
      'Viry-Châtillon',
      'Athis-Mons',
      'Draveil',
      'Massy',
      'Évry',
      'Palaiseau',
      'Verrières-le-Buisson',
      'Wissous',
      'Corbeil-Essonnes',
    ],
    cityAroundText: (
      <span className="text-center">
        En plus de <strong>Sainte-Geneviève-des-Bois</strong>, Ikovaline opère à{' '}
        {[
          'Savigny-sur-Orge',
          'Viry-Châtillon',
          'Athis-Mons',
          'Draveil',
          'Massy',
          'Évry',
          'Palaiseau',
          'Verrières-le-Buisson',
          'Wissous',
          'Corbeil-Essonnes',
        ].map((v, i, arr) => (
          <span key={v}>
            <Link href={`/agence-web-${removeAccents(v)}`}>{v}</Link>
            {i < arr.length - 2 ? ', ' : i === arr.length - 2 ? ' et ' : ''}
          </span>
        ))}{' '}
        pour la création de site, l’app, le SaaS et le SEO local en Essonne.
      </span>
    ),
    CTATitle:
      'Vous avez un projet web à Sainte-Geneviève-des-Bois ? Parlons-en !',
    CTADesc:
      'Ikovaline – agence web Essonne : résultats mesurables, livrables soignés, accompagnement réactif.',
    CTATextBtn: 'Lancez votre projet à Sainte-Geneviève-des-Bois',
    metaTitle:
      'Agence web Sainte-Geneviève-des-Bois (Essonne) – Site, app & SaaS, SEO',
    metaDescription:
      'Sites, apps/SaaS, SEO local Essonne et webmarketing à Sainte-Geneviève-des-Bois. Ikovaline aligne design, tech et business.',
  },

  {
    id: 'agence-web-viry-chatillon',
    ville: 'Viry-Châtillon',
    departement: 'Essonne',
    intro: `Ikovaline, agence web à Viry-Châtillon (Essonne), crée des sites internet rapides, des apps et des produits SaaS qui transforment la visibilité en clients. SEO local et performance inclus dès le départ.`,
    text1: (
      <span>
        Notre <strong>agence web à Viry-Châtillon</strong> est experte en{' '}
        <strong>création de site</strong>, <strong>refonte</strong> et{' '}
        <Link href="nos-services/seo-referencement-naturel">SEO local</Link>.
        Nous accompagnons commerçants, artisans, PME et associations pour une
        présence web rentable en Essonne et IDF.
      </span>
    ),
    services: [
      {
        text: 'Création de sites web',
        subtext:
          'Design sur-mesure, vitesse et SEO-ready : un site prêt à évoluer vers app/SaaS à Viry-Châtillon.',
        link: 'nos-services/creation-sites-web-vitrine-e-commerce',
      },
      {
        text: 'Référencement SEO',
        subtext:
          'Cocon local, on-site/technical, netlinking et avis : ressortez sur les recherches proches de vous.',
        link: 'nos-services/seo-referencement-naturel',
      },
      {
        text: 'Maintenance et support',
        subtext:
          'Stabilité, sécurité et supervision 24/7 : un site/app fiable et rapide toute l’année.',
        link: 'nos-services/creation-site-web-sur-mesure',
      },
      {
        text: 'Web marketing',
        subtext:
          'SEA, social, contenu : des campagnes pilotées par les données pour générer des leads.',
        link: 'nos-services/gestion-campagnes-sea',
      },
    ],
    objectifs: {
      objectifTitle:
        'Notre mission à Viry-Châtillon : vous aider à performer en ligne',
      text1: `Roadmap claire, quick wins, contenus utiles et tracking : chaque action sert un objectif précis.`,
      text2: `Accompagnement Essonne avec indicateurs partagés : visibilité, conversions, réputation.`,
    },
    villesVoisines: [
      'Savigny-sur-Orge',
      'Sainte-Geneviève-des-Bois',
      'Viry-Châtillon',
      'Athis-Mons',
      'Draveil',
      'Massy',
      'Évry',
      'Palaiseau',
      'Verrières-le-Buisson',
      'Wissous',
      'Corbeil-Essonnes',
    ],
    cityAroundText: (
      <span className="text-center">
        Notre <strong>agence web à Viry-Châtillon</strong> intervient aussi à{' '}
        {[
          'Savigny-sur-Orge',
          'Sainte-Geneviève-des-Bois',
          'Athis-Mons',
          'Draveil',
          'Massy',
          'Évry',
          'Palaiseau',
          'Verrières-le-Buisson',
          'Wissous',
          'Corbeil-Essonnes',
        ].map((v, i, arr) => (
          <span key={v}>
            <Link href={`/agence-web-${removeAccents(v)}`}>{v}</Link>
            {i < arr.length - 2 ? ', ' : i === arr.length - 2 ? ' et ' : ''}
          </span>
        ))}{' '}
        pour des projets site/app/SaaS et SEO local performants.
      </span>
    ),
    CTATitle: 'Lancez votre site internet à Viry-Châtillon avec Ikovaline !',
    CTADesc:
      'Création/refonte, SEO Essonne, campagnes et maintenance : une approche orientée résultats.',
    CTATextBtn: 'Démarrer mon projet à Viry-Châtillon',
    metaTitle:
      'Agence web Viry-Châtillon (Essonne) – Site, app & SaaS, SEO | Ikovaline',
    metaDescription:
      'Sites rapides, apps/SaaS, SEO local Essonne et webmarketing à Viry-Châtillon. Ikovaline construit votre croissance digitale.',
  },

  {
    id: 'agence-web-athis-mons',
    ville: 'Athis-Mons',
    departement: 'Essonne',
    intro: `Ikovaline, agence web Essonne à Athis-Mons : création de site, refonte, apps/SaaS, SEO local et marketing. Nous concevons des expériences qui chargent vite, rankent mieux et convertissent davantage.`,
    text1: (
      <span>
        À <Link href="/agence-web-athis-mons">Athis-Mons</Link>, Ikovaline
        conçoit des sites UX-first, SEO-ready et techniquement solides. De la{' '}
        <Link href="nos-services/creation-sites-web-vitrine-e-commerce">
          création
        </Link>{' '}
        à l’<Link href="nos-services/seo-referencement-naturel">audit SEO</Link>
        , nous posons des fondations durables pour votre présence en Essonne.
      </span>
    ),
    services: [
      {
        text: 'Création de sites web',
        subtext:
          'Vitrine/e-commerce conçu pour la conversion et l’évolution vers app/SaaS à Athis-Mons.',
        link: 'nos-services/creation-sites-web-vitrine-e-commerce',
      },
      {
        text: 'Référencement SEO',
        subtext:
          'Couverture sémantique locale, technique et popularité : remontez sur les requêtes utiles.',
        link: 'nos-services/seo-referencement-naturel',
      },
      {
        text: 'Maintenance et support',
        subtext:
          'Sécurité, mises à jour, sauvegardes, monitoring : gardez un actif digital sain et prêt à scaler.',
        link: 'nos-services/creation-site-web-sur-mesure',
      },
      {
        text: 'Web marketing',
        subtext:
          'Campagnes d’acquisition (SEA/social), contenu et analytics : un ROI lisible et partageable.',
        link: 'nos-services/gestion-campagnes-sea',
      },
    ],
    objectifs: {
      objectifTitle:
        'Notre mission à Athis-Mons : développer votre visibilité en ligne',
      text1: `Pages locales, contenus utiles, avis et GBP : on active le local pack et les requêtes d’intention.`,
      text2: `Suivi mensuel, décisions simples : croissance progressive en Essonne avec Ikovaline.`,
    },
    villesVoisines: [
      'Savigny-sur-Orge',
      'Sainte-Geneviève-des-Bois',
      'Viry-Châtillon',
      'Athis-Mons',
      'Draveil',
      'Massy',
      'Évry',
      'Palaiseau',
      'Verrières-le-Buisson',
      'Wissous',
      'Corbeil-Essonnes',
    ],
    cityAroundText: (
      <span className="text-center">
        Nous accompagnons Athis-Mons et les villes voisines d’Essonne :{' '}
        {[
          'Savigny-sur-Orge',
          'Sainte-Geneviève-des-Bois',
          'Viry-Châtillon',
          'Athis-Mons',
          'Draveil',
          'Massy',
          'Évry',
          'Palaiseau',
          'Verrières-le-Buisson',
          'Wissous',
          'Corbeil-Essonnes',
        ].map((v, i, arr) => (
          <span key={v}>
            <Link href={`/agence-web-${removeAccents(v)}`}>{v}</Link>
            {i < arr.length - 2 ? ', ' : i === arr.length - 2 ? ' et ' : ''}
          </span>
        ))}{' '}
        (site, app, SaaS, SEO).
      </span>
    ),
    CTATitle: 'Besoin d’un site à Athis-Mons ? Parlons-en !',
    CTADesc:
      'Ikovaline – agence web Essonne : création/refonte, SEO local et marketing performant.',
    CTATextBtn: 'Lancer mon projet web à Athis-Mons',
    metaTitle:
      'Agence web Athis-Mons (Essonne) – Site, app & SaaS, SEO | Ikovaline',
    metaDescription:
      'Création de site, apps/SaaS, SEO local Essonne et campagnes à Athis-Mons. Ikovaline aligne design, tech et business.',
  },

  {
    id: 'agence-web-draveil',
    departement: 'Essonne',
    ville: 'Draveil',
    intro: `Ikovaline, agence web à Draveil (Essonne) : sites internet performants, apps/SaaS, SEO local et stratégie d’acquisition. Nous créons des expériences utiles qui génèrent des demandes.`,
    text1: (
      <span>
        À <Link href="/agence-web-draveil">Draveil</Link>, nous concevons des
        <strong> sites/app</strong> rapides, accessibles et bien référencés. De
        la{' '}
        <Link href="nos-services/creation-sites-web-vitrine-e-commerce">
          création de site
        </Link>{' '}
        à l’
        <Link href="nos-services/seo-referencement-naturel">
          optimisation SEO
        </Link>
        , Ikovaline installe une dynamique de croissance locale en Essonne.
      </span>
    ),
    services: [
      {
        text: 'Création de sites web',
        subtext:
          'Vitrine/e-commerce SEO-ready et prêt à évoluer vers l’app/SaaS pour Draveil et l’Essonne.',
        link: 'nos-services/creation-sites-web-vitrine-e-commerce',
      },
      {
        text: 'Référencement SEO',
        subtext:
          'Structure, contenus, netlinking et avis : remontez sur les requêtes locales qui comptent.',
        link: 'nos-services/seo-referencement-naturel',
      },
      {
        text: 'Maintenance et support',
        subtext:
          'Surveillance, sécurité, sauvegardes et corrections : gardez un site/app stable et performant.',
        link: 'nos-services/creation-site-web-sur-mesure',
      },
      {
        text: 'Web marketing',
        subtext:
          'SEA, social, contenu et reporting : un plan d’acquisition actionnable et mesuré.',
        link: 'nos-services/gestion-campagnes-sea',
      },
    ],
    objectifs: {
      objectifTitle:
        'Notre mission à Draveil : booster votre présence en ligne',
      text1: `Nous activons les fondamentaux (structure, contenus, preuve sociale) et pilotons vos priorités par la donnée.`,
      text2: `Cap sur la croissance durable en Essonne avec Ikovaline.`,
    },
    villesVoisines: [
      'Savigny-sur-Orge',
      'Sainte-Geneviève-des-Bois',
      'Viry-Châtillon',
      'Athis-Mons',
      'Draveil',
      'Massy',
      'Évry',
      'Palaiseau',
      'Verrières-le-Buisson',
      'Wissous',
      'Corbeil-Essonnes',
    ],
    cityAroundText: (
      <span className="text-center">
        Notre <strong>agence web à Draveil</strong> intervient aussi à{' '}
        {[
          'Savigny-sur-Orge',
          'Sainte-Geneviève-des-Bois',
          'Viry-Châtillon',
          'Athis-Mons',
          'Massy',
          'Évry',
          'Palaiseau',
          'Verrières-le-Buisson',
          'Wissous',
          'Corbeil-Essonnes',
        ].map((v, i, arr) => (
          <span key={v}>
            <Link href={`/agence-web-${removeAccents(v)}`}>{v}</Link>
            {i < arr.length - 2 ? ', ' : i === arr.length - 2 ? ' et ' : ''}
          </span>
        ))}{' '}
        pour la création de site, l’app, le SaaS et le SEO local en Essonne.
      </span>
    ),
    CTATitle:
      'Vous avez un projet à Draveil ? Créons votre site dès aujourd’hui',
    CTADesc:
      'Ikovaline – résultats concrets, design soigné, performances mesurées.',
    CTATextBtn: 'Démarrer mon projet web à Draveil',
    metaTitle:
      'Agence web Draveil (Essonne) – Site, app & SaaS, SEO | Ikovaline',
    metaDescription:
      'Création/refonte de site, apps/SaaS, SEO local Essonne et campagnes à Draveil. Ikovaline pilote votre croissance digitale.',
  },
];
