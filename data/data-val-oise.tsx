import { removeAccents } from '@/components/pageSatellite/CityAround';
import Link from 'next/link';

export const dataAgenceValOise = [
  {
    id: 'agence-web-argenteuil',
    departement: 'Val-d’Oise',
    ville: 'Argenteuil',
    intro: `Ikovaline, agence web en Val-d’Oise (Argenteuil), crée des sites internet rapides, des apps web et des produits SaaS qui transforment votre visibilité en clients. Notre équipe combine UX, tech et SEO local pour générer du trafic qualifié sur Argenteuil et l’ensemble du 95.`,
    text1: (
      <span>
        Basée près d’
        <Link href="/agence-web-argenteuil">Argenteuil</Link>, notre{' '}
        <strong>agence web Val-d’Oise</strong> prend en charge votre{' '}
        <Link href="nos-services/creation-sites-web-vitrine-e-commerce">
          création de site vitrine/e-commerce
        </Link>
        , vos refontes, votre{' '}
        <Link href="nos-services/seo-referencement-naturel">
          SEO local Val-d’Oise
        </Link>{' '}
        et vos campagnes d’acquisition. Architecture claire, contenus utiles,
        performance (Core Web Vitals) : Ikovaline livre des bases solides pour
        évoluer vers l’<strong>app</strong> ou le <strong>SaaS</strong>.
      </span>
    ),
    services: [
      {
        text: 'Création de sites web',
        subtext:
          'Site moderne et SEO-ready à Argenteuil (Val-d’Oise), pensé conversion et extensible vers une app/SaaS.',
        link: 'nos-services/creation-sites-web-vitrine-e-commerce',
      },
      {
        text: 'Référencement SEO',
        subtext:
          'SEO local 95 : sémantique, on-site technique, netlinking et avis pour ressortir sur Argenteuil et alentours.',
        link: 'nos-services/seo-referencement-naturel',
      },
      {
        text: 'Maintenance et support',
        subtext:
          'Sécurité, mises à jour, sauvegardes et monitoring 24/7 : un site/app fiable qui charge vite à Argenteuil.',
        link: 'nos-services/creation-site-web-sur-mesure',
      },
      {
        text: 'Web marketing',
        subtext:
          'Google Ads, social, contenu et analytics : accélérez votre acquisition locale en Val-d’Oise.',
        link: 'nos-services/gestion-campagnes-sea',
      },
    ],
    objectifs: {
      objectifTitle: 'Objectif à Argenteuil : visibilité locale qui convertit',
      text1: `Roadmap claire, quick wins SEO/UX et indicateurs partagés : Ikovaline relie trafic, leads et chiffre d’affaires.`,
      text2: `Couverture Val-d’Oise (95), maillage interne et contenus locaux : nous construisons un actif digital durable à Argenteuil.`,
    },
    villesVoisines: [
      'Argenteuil',
      'Cergy',
      'Sarcelles',
      'Garges-lès-Gonesse',
      'Goussainville',
      'Gonesse',
      'Villiers-le-Bel',
      'Bezons',
      'Franconville',
      'Herblay-sur-Seine',
      'Saint-Ouen-l’Aumône',
      'Pontoise',
    ],
    cityAroundText: (
      <span className="text-center">
        Ikovaline intervient à{' '}
        <Link href="/agence-web-argenteuil">Argenteuil</Link> et dans les villes
        du Val-d’Oise comme{' '}
        {[
          'Argenteuil',
          'Cergy',
          'Sarcelles',
          'Garges-lès-Gonesse',
          'Goussainville',
          'Gonesse',
          'Villiers-le-Bel',
          'Bezons',
          'Franconville',
          'Herblay-sur-Seine',
          'Saint-Ouen-l’Aumône',
          'Pontoise',
        ].map((v, i, arr) => (
          <span key={v}>
            <Link href={`/agence-web-${removeAccents(v)}`}>{v}</Link>
            {i < arr.length - 2 ? ', ' : i === arr.length - 2 ? ' et ' : ''}
          </span>
        ))}{' '}
        pour vos projets de création de site web, d’app et de SaaS en
        Val-d’Oise.
      </span>
    ),
    CTATitle: 'Créons votre site, app ou SaaS à Argenteuil (Val-d’Oise)',
    CTADesc:
      'Visibilité locale, SEO et conversion : Ikovaline met en place une stratégie digitale mesurable à Argenteuil.',
    CTATextBtn: 'Lancer mon projet à Argenteuil',
    metaTitle:
      'Agence web Argenteuil (Val-d’Oise) – Ikovaline : création de site, app & SaaS, SEO local',
    metaDescription:
      'Ikovaline à Argenteuil (95) : création/refonte de site, apps & SaaS, SEO local, SEA et maintenance. Croissance pilotée par les données en Val-d’Oise.',
  },

  {
    id: 'agence-web-cergy',
    departement: 'Val-d’Oise',
    ville: 'Cergy',
    intro: `À Cergy (Val-d’Oise), Ikovaline conçoit des sites performants, des applications web et des produits SaaS scalables. Notre spécialité : associer UX, technique et SEO local pour générer des demandes qualifiées dans l’agglomération de Cergy-Pontoise.`,
    text1: (
      <span>
        À <Link href="/agence-web-cergy">Cergy</Link> et Cergy-Pontoise, notre{' '}
        <strong>agence web 95</strong> assure la{' '}
        <Link href="nos-services/creation-sites-web-vitrine-e-commerce">
          création de site
        </Link>
        , la refonte, le{' '}
        <Link href="nos-services/seo-referencement-naturel">
          référencement local
        </Link>{' '}
        et l’acquisition. Nous livrons des bases propres (vitesse,
        accessibilité, architecture SEO) prêtes à évoluer vers l’
        <strong>app</strong> ou le <strong>SaaS</strong>.
      </span>
    ),
    services: [
      {
        text: 'Création de sites web',
        subtext:
          'Vitrine/e-commerce conçu pour la conversion et le SEO local à Cergy, évolutif vers app/SaaS.',
        link: 'nos-services/creation-sites-web-vitrine-e-commerce',
      },
      {
        text: 'Référencement SEO',
        subtext:
          'Cocon sémantique Cergy-Pontoise, on-site/technique et liens : grimpez sur les requêtes locales 95.',
        link: 'nos-services/seo-referencement-naturel',
      },
      {
        text: 'Maintenance et support',
        subtext:
          'MCO, sécurité, sauvegardes et supervision : un site/app stable pour croître sereinement à Cergy.',
        link: 'nos-services/creation-site-web-sur-mesure',
      },
      {
        text: 'Web marketing',
        subtext:
          'SEA, social, contenu et analytics : un plan d’acquisition actionnable et mesuré en Val-d’Oise.',
        link: 'nos-services/gestion-campagnes-sea',
      },
    ],
    objectifs: {
      objectifTitle:
        'Objectif à Cergy : trafic qualifié et conversions mesurables',
      text1: `Nous priorisons les quick wins (structure, contenus, preuve sociale) et alignons les KPI sur vos objectifs.`,
      text2: `Maillage local Cergy-Pontoise et pages villes 95 : Ikovaline bâtit une autorité durable en Val-d’Oise.`,
    },
    villesVoisines: [
      'Argenteuil',
      'Cergy',
      'Sarcelles',
      'Garges-lès-Gonesse',
      'Goussainville',
      'Gonesse',
      'Villiers-le-Bel',
      'Bezons',
      'Franconville',
      'Herblay-sur-Seine',
      'Saint-Ouen-l’Aumône',
      'Pontoise',
    ],
    cityAroundText: (
      <span className="text-center">
        Nous intervenons à Cergy et dans tout le Val-d’Oise :{' '}
        {[
          'Argenteuil',
          'Cergy',
          'Sarcelles',
          'Garges-lès-Gonesse',
          'Goussainville',
          'Gonesse',
          'Villiers-le-Bel',
          'Bezons',
          'Franconville',
          'Herblay-sur-Seine',
          'Saint-Ouen-l’Aumône',
          'Pontoise',
        ].map((v, i, arr) => (
          <span key={v}>
            <Link href={`/agence-web-${removeAccents(v)}`}>{v}</Link>
            {i < arr.length - 2 ? ', ' : i === arr.length - 2 ? ' et ' : ''}
          </span>
        ))}{' '}
        pour des projets site/app/SaaS et SEO local performants.
      </span>
    ),
    CTATitle: 'Lancez votre projet à Cergy (Val-d’Oise)',
    CTADesc:
      'Sites rapides, SEO local 95 et acquisition pilotée : Ikovaline propulse votre visibilité à Cergy.',
    CTATextBtn: 'Démarrer mon projet à Cergy',
    metaTitle:
      'Agence web Cergy (Val-d’Oise) – Ikovaline : site, app & SaaS, SEO local',
    metaDescription:
      'Création/refonte de site, apps & SaaS, SEO local Val-d’Oise et SEA à Cergy. Ikovaline aligne design, tech et business.',
  },

  {
    id: 'agence-web-sarcelles',
    departement: 'Val-d’Oise',
    ville: 'Sarcelles',
    intro: `Ikovaline, agence web à Sarcelles (Val-d’Oise), crée des sites internet rapides, des apps et des produits SaaS orientés ROI. Notre méthode : UX + SEO local + performance pour générer des demandes qualifiées à Sarcelles et dans le 95.`,
    text1: (
      <span>
        À <Link href="/agence-web-sarcelles">Sarcelles</Link>, nous livrons des
        <strong> sites/app</strong> accessibles, SEO-ready et mesurables.
        <Link href="nos-services/creation-sites-web-vitrine-e-commerce">
          {' '}
          Création
        </Link>
        , refonte,{' '}
        <Link href="nos-services/seo-referencement-naturel">audit & SEO</Link>,
        contenus, netlinking : Ikovaline pose des fondations solides en
        Val-d’Oise.
      </span>
    ),
    services: [
      {
        text: 'Création de sites web',
        subtext:
          'Site vitrine/e-commerce pensé conversion et Google pour Sarcelles, extensible en app/SaaS.',
        link: 'nos-services/creation-sites-web-vitrine-e-commerce',
      },
      {
        text: 'Référencement SEO',
        subtext:
          'Sémantique locale, technique et popularité : gagnez des positions utiles sur Sarcelles et alentours 95.',
        link: 'nos-services/seo-referencement-naturel',
      },
      {
        text: 'Maintenance et support',
        subtext:
          'Sécurité, mises à jour, backups et monitoring : gardez un actif digital fiable au quotidien.',
        link: 'nos-services/creation-site-web-sur-mesure',
      },
      {
        text: 'Web marketing',
        subtext:
          'SEA/social, contenu et analytics : un plan d’acquisition clair et rentable en Val-d’Oise.',
        link: 'nos-services/gestion-campagnes-sea',
      },
    ],
    objectifs: {
      objectifTitle: 'Objectif à Sarcelles : un canal d’acquisition rentable',
      text1: `Silos locaux, preuves sociales et FAQ : nous activons les ressorts qui comptent pour Google et vos visiteurs.`,
      text2: `Pilotage mensuel des KPI et itérations courtes : cap sur la croissance à Sarcelles (95).`,
    },
    villesVoisines: [
      'Argenteuil',
      'Cergy',
      'Sarcelles',
      'Garges-lès-Gonesse',
      'Goussainville',
      'Gonesse',
      'Villiers-le-Bel',
      'Bezons',
      'Franconville',
      'Herblay-sur-Seine',
      'Saint-Ouen-l’Aumône',
      'Pontoise',
    ],
    cityAroundText: (
      <span className="text-center">
        Depuis Sarcelles, Ikovaline couvre tout le Val-d’Oise :{' '}
        {[
          'Argenteuil',
          'Cergy',
          'Sarcelles',
          'Garges-lès-Gonesse',
          'Goussainville',
          'Gonesse',
          'Villiers-le-Bel',
          'Bezons',
          'Franconville',
          'Herblay-sur-Seine',
          'Saint-Ouen-l’Aumône',
          'Pontoise',
        ].map((v, i, arr) => (
          <span key={v}>
            <Link href={`/agence-web-${removeAccents(v)}`}>{v}</Link>
            {i < arr.length - 2 ? ', ' : i === arr.length - 2 ? ' et ' : ''}
          </span>
        ))}{' '}
        pour des projets site/app/SaaS et SEO local.
      </span>
    ),
    CTATitle: 'Passez à l’action à Sarcelles (95)',
    CTADesc:
      'Création/refonte, SEO local et campagnes : Ikovaline structure votre croissance digitale à Sarcelles.',
    CTATextBtn: 'Lancer mon projet à Sarcelles',
    metaTitle:
      'Agence web Sarcelles (Val-d’Oise) – Site, app & SaaS, SEO local | Ikovaline',
    metaDescription:
      'Sites performants, apps/SaaS, SEO local Val-d’Oise et SEA à Sarcelles. Ikovaline livre des résultats concrets.',
  },

  {
    id: 'agence-web-garges-les-gonesse',
    departement: 'Val-d’Oise',
    ville: 'Garges-lès-Gonesse',
    intro: `À Garges-lès-Gonesse (Val-d’Oise), Ikovaline conçoit des sites web rapides, des apps et des SaaS orientés business. Nous mettons le SEO local et la conversion au centre pour capter la demande de proximité.`,
    text1: (
      <span>
        Entreprise basée à{' '}
        <Link href="/agence-web-garges-les-gonesse">Garges-lès-Gonesse</Link>?
        Ikovaline gère votre{' '}
        <Link href="nos-services/creation-sites-web-vitrine-e-commerce">
          création/refonte de site
        </Link>
        , votre{' '}
        <Link href="nos-services/seo-referencement-naturel">SEO 95</Link> et la
        performance technique (vitesse, accessibilité, sécurité). Un socle prêt
        à évoluer vers l’<strong>app</strong> ou le <strong>SaaS</strong>.
      </span>
    ),
    services: [
      {
        text: 'Création de sites web',
        subtext:
          'Design propre, vitesse et architecture SEO : votre site prêt pour Google à Garges-lès-Gonesse.',
        link: 'nos-services/creation-sites-web-vitrine-e-commerce',
      },
      {
        text: 'Référencement SEO',
        subtext:
          'Cocon local, on-site/technique, netlinking et avis : remontez sur les requêtes proches de vous en Val-d’Oise.',
        link: 'nos-services/seo-referencement-naturel',
      },
      {
        text: 'Maintenance et support',
        subtext:
          'Surveillance, mises à jour et sauvegardes : un actif digital stable qui tient la charge.',
        link: 'nos-services/creation-site-web-sur-mesure',
      },
      {
        text: 'Web marketing',
        subtext:
          'SEA, social, contenu et analytics pour accélérer l’acquisition locale autour de Garges-lès-Gonesse.',
        link: 'nos-services/gestion-campagnes-sea',
      },
    ],
    objectifs: {
      objectifTitle:
        'Objectif à Garges-lès-Gonesse : plus de leads, moins de friction',
      text1: `Nous simplifions l’entonnoir : pages locales, CTA visibles, preuves sociales, FAQ.`,
      text2: `Pilotage mensuel des KPI pour prioriser ce qui impacte vraiment votre business en Val-d’Oise.`,
    },
    villesVoisines: [
      'Argenteuil',
      'Cergy',
      'Sarcelles',
      'Garges-lès-Gonesse',
      'Goussainville',
      'Gonesse',
      'Villiers-le-Bel',
      'Bezons',
      'Franconville',
      'Herblay-sur-Seine',
      'Saint-Ouen-l’Aumône',
      'Pontoise',
    ],
    cityAroundText: (
      <span className="text-center">
        Interventions à Garges-lès-Gonesse et dans tout le Val-d’Oise :{' '}
        {[
          'Argenteuil',
          'Cergy',
          'Sarcelles',
          'Garges-lès-Gonesse',
          'Goussainville',
          'Gonesse',
          'Villiers-le-Bel',
          'Bezons',
          'Franconville',
          'Herblay-sur-Seine',
          'Saint-Ouen-l’Aumône',
          'Pontoise',
        ].map((v, i, arr) => (
          <span key={v}>
            <Link href={`/agence-web-${removeAccents(v)}`}>{v}</Link>
            {i < arr.length - 2 ? ', ' : i === arr.length - 2 ? ' et ' : ''}
          </span>
        ))}{' '}
        (site, app, SaaS, SEO local).
      </span>
    ),
    CTATitle: 'Créons votre site/app à Garges-lès-Gonesse (Val-d’Oise)',
    CTADesc:
      'Ikovaline : SEO local, performance et conversion au service de votre croissance.',
    CTATextBtn: 'Démarrer mon projet à Garges-lès-Gonesse',
    metaTitle:
      'Agence web Garges-lès-Gonesse (Val-d’Oise) – Site, app & SaaS, SEO | Ikovaline',
    metaDescription:
      'Création/refonte de site, apps & SaaS, SEO local 95 et SEA à Garges-lès-Gonesse. Ikovaline livre des résultats mesurables.',
  },

  {
    id: 'agence-web-goussainville',
    departement: 'Val-d’Oise',
    ville: 'Goussainville',
    intro: `Ikovaline accompagne les entreprises de Goussainville (Val-d’Oise) : création de site internet, refonte, SEO local, apps et SaaS. Des livrables soignés, des temps de chargement faibles et un marketing mesurable.`,
    text1: (
      <span>
        À <Link href="/agence-web-goussainville">Goussainville</Link>, nous
        concevons des sites/app SEO-first, accessibles et rapides. De la{' '}
        <Link href="nos-services/creation-sites-web-vitrine-e-commerce">
          création
        </Link>{' '}
        à l’
        <Link href="nos-services/seo-referencement-naturel">
          optimisation SEO
        </Link>
        , Ikovaline installe un socle durable pour capter la demande locale en
        Val-d’Oise (Roissy, Plaine de France…).
      </span>
    ),
    services: [
      {
        text: 'Création de sites web',
        subtext:
          'Vitrine/e-commerce prêt pour le SEO et l’évolution vers app/SaaS à Goussainville (95).',
        link: 'nos-services/creation-sites-web-vitrine-e-commerce',
      },
      {
        text: 'Référencement SEO',
        subtext:
          'Ciblage sémantique local, on-site et liens : remontez sur les requêtes proches de vos clients.',
        link: 'nos-services/seo-referencement-naturel',
      },
      {
        text: 'Maintenance et support',
        subtext:
          'Sécurité, mises à jour, sauvegardes et monitoring : un actif digital serein au quotidien.',
        link: 'nos-services/creation-site-web-sur-mesure',
      },
      {
        text: 'Web marketing',
        subtext:
          'SEA/social, contenu et analytics pour des campagnes rentables à Goussainville et environs.',
        link: 'nos-services/gestion-campagnes-sea',
      },
    ],
    objectifs: {
      objectifTitle:
        'Objectif à Goussainville : capter la demande locale qualifiée',
      text1: `Pages locales, Google Business Profile, avis et contenus : on active le local pack et l’intention “près de moi”.`,
      text2: `Suivi mensuel et décisions simples : Ikovaline pilote votre croissance en Val-d’Oise.`,
    },
    villesVoisines: [
      'Argenteuil',
      'Cergy',
      'Sarcelles',
      'Garges-lès-Gonesse',
      'Goussainville',
      'Gonesse',
      'Villiers-le-Bel',
      'Bezons',
      'Franconville',
      'Herblay-sur-Seine',
      'Saint-Ouen-l’Aumône',
      'Pontoise',
    ],
    cityAroundText: (
      <span className="text-center">
        Ikovaline opère à Goussainville et dans tout le 95 :{' '}
        {[
          'Argenteuil',
          'Cergy',
          'Sarcelles',
          'Garges-lès-Gonesse',
          'Goussainville',
          'Gonesse',
          'Villiers-le-Bel',
          'Bezons',
          'Franconville',
          'Herblay-sur-Seine',
          'Saint-Ouen-l’Aumône',
          'Pontoise',
        ].map((v, i, arr) => (
          <span key={v}>
            <Link href={`/agence-web-${removeAccents(v)}`}>{v}</Link>
            {i < arr.length - 2 ? ', ' : i === arr.length - 2 ? ' et ' : ''}
          </span>
        ))}{' '}
        (création de site, app, SaaS, SEO Val-d’Oise).
      </span>
    ),
    CTATitle: 'Passez à l’action à Goussainville (95)',
    CTADesc:
      'Ikovaline – création/refonte, SEO et acquisition : un plan clair et mesurable.',
    CTATextBtn: 'Lancer mon projet à Goussainville',
    metaTitle:
      'Agence web Goussainville (Val-d’Oise) – Site, app & SaaS, SEO local',
    metaDescription:
      'Sites rapides, apps/SaaS, SEO local 95 et SEA à Goussainville. Ikovaline aligne design, tech et business.',
  },

  {
    id: 'agence-web-gonesse',
    departement: 'Val-d’Oise',
    ville: 'Gonesse',
    intro: `À Gonesse (Val-d’Oise), Ikovaline crée des sites web performants, des apps et des SaaS orientés conversion. Nous relions UX, technique et SEO local pour générer des leads concrets.`,
    text1: (
      <span>
        Notre <strong>agence web à Gonesse</strong> prend en charge votre{' '}
        <Link href="nos-services/creation-sites-web-vitrine-e-commerce">
          site vitrine/e-commerce
        </Link>
        , votre{' '}
        <Link href="nos-services/seo-referencement-naturel">SEO local 95</Link>{' '}
        et vos campagnes d’acquisition. Vitesse, accessibilité, architecture
        SEO, contenus : un socle prêt à évoluer vers l’<strong>app</strong> ou
        le <strong>SaaS</strong>.
      </span>
    ),
    services: [
      {
        text: 'Création de sites web',
        subtext:
          'Un site clair, rapide et SEO-ready pour Gonesse, pensé pour la conversion et l’évolutivité.',
        link: 'nos-services/creation-sites-web-vitrine-e-commerce',
      },
      {
        text: 'Référencement SEO',
        subtext:
          'Analyse mots-clés locale, on-site/technique, netlinking : captez la demande Val-d’Oise.',
        link: 'nos-services/seo-referencement-naturel',
      },
      {
        text: 'Maintenance et support',
        subtext:
          'Sécurité, mises à jour, sauvegardes et supervision 24/7 : fiabilité au quotidien à Gonesse.',
        link: 'nos-services/creation-site-web-sur-mesure',
      },
      {
        text: 'Web marketing',
        subtext:
          'Ads, social et contenu : un mix acquisition mesuré pour accélérer votre visibilité locale.',
        link: 'nos-services/gestion-campagnes-sea',
      },
    ],
    objectifs: {
      objectifTitle: 'Objectif à Gonesse : visibilité utile et ROI',
      text1: `Nous activons ce qui compte vraiment : pages locales, CTA, preuves, FAQ, tracking.`,
      text2: `Itérations courtes, décisions chiffrées : une croissance maîtrisée en Val-d’Oise.`,
    },
    villesVoisines: [
      'Argenteuil',
      'Cergy',
      'Sarcelles',
      'Garges-lès-Gonesse',
      'Goussainville',
      'Gonesse',
      'Villiers-le-Bel',
      'Bezons',
      'Franconville',
      'Herblay-sur-Seine',
      'Saint-Ouen-l’Aumône',
      'Pontoise',
    ],
    cityAroundText: (
      <span className="text-center">
        Présents à Gonesse, nous couvrons aussi ces villes du Val-d’Oise :{' '}
        {[
          'Argenteuil',
          'Cergy',
          'Sarcelles',
          'Garges-lès-Gonesse',
          'Goussainville',
          'Gonesse',
          'Villiers-le-Bel',
          'Bezons',
          'Franconville',
          'Herblay-sur-Seine',
          'Saint-Ouen-l’Aumône',
          'Pontoise',
        ].map((v, i, arr) => (
          <span key={v}>
            <Link href={`/agence-web-${removeAccents(v)}`}>{v}</Link>
            {i < arr.length - 2 ? ', ' : i === arr.length - 2 ? ' et ' : ''}
          </span>
        ))}{' '}
        (site, app, SaaS, SEO 95).
      </span>
    ),
    CTATitle: 'Passez à l’action à Gonesse (Val-d’Oise)',
    CTADesc:
      'Ikovaline – un digital utile : création/refonte, SEO local, campagnes et maintenance.',
    CTATextBtn: 'Lancer mon projet à Gonesse',
    metaTitle:
      'Agence web Gonesse (Val-d’Oise) – Ikovaline : site, app & SaaS, SEO',
    metaDescription:
      'Sites performants, apps/SaaS, SEO local Val-d’Oise et SEA à Gonesse. Résultats concrets avec Ikovaline.',
  },

  {
    id: 'agence-web-villiers-le-bel',
    departement: 'Val-d’Oise',
    ville: 'Villiers-le-Bel',
    intro: `Ikovaline, agence web à Villiers-le-Bel (Val-d’Oise), crée des sites, apps et SaaS qui transforment la visibilité en prospects. Focus : SEO local, vitesse et conversion.`,
    text1: (
      <span>
        À <Link href="/agence-web-villiers-le-bel">Villiers-le-Bel</Link>,
        Ikovaline conçoit des interfaces rapides et propres :{' '}
        <Link href="nos-services/creation-sites-web-vitrine-e-commerce">
          création de site
        </Link>
        , refonte,{' '}
        <Link href="nos-services/seo-referencement-naturel">
          stratégie SEO Val-d’Oise
        </Link>
        , contenus et netlinking. Objectif : capter la demande locale 95.
      </span>
    ),
    services: [
      {
        text: 'Création de sites web',
        subtext:
          'Vitrine/e-commerce pensé conversion et SEO pour Villiers-le-Bel, prêt à évoluer en app/SaaS.',
        link: 'nos-services/creation-sites-web-vitrine-e-commerce',
      },
      {
        text: 'Référencement SEO',
        subtext:
          'Sémantique locale, on-site, netlinking : remontez sur les requêtes proches de vos clients 95.',
        link: 'nos-services/seo-referencement-naturel',
      },
      {
        text: 'Maintenance et support',
        subtext:
          'Sécurité, mises à jour, sauvegardes et monitoring : un site/app fiable jour après jour.',
        link: 'nos-services/creation-site-web-sur-mesure',
      },
      {
        text: 'Web marketing',
        subtext:
          'Google Ads, social, contenu et analytics : un mix acquisition lisible et mesurable.',
        link: 'nos-services/gestion-campagnes-sea',
      },
    ],
    objectifs: {
      objectifTitle:
        'Objectif à Villiers-le-Bel : leads qualifiés, budget maîtrisé',
      text1: `Nous alignons pages locales, CTA et preuve sociale avec un tracking propre.`,
      text2: `Décisions chiffrées et itérations courtes : une croissance durable en Val-d’Oise.`,
    },
    villesVoisines: [
      'Argenteuil',
      'Cergy',
      'Sarcelles',
      'Garges-lès-Gonesse',
      'Goussainville',
      'Gonesse',
      'Villiers-le-Bel',
      'Bezons',
      'Franconville',
      'Herblay-sur-Seine',
      'Saint-Ouen-l’Aumône',
      'Pontoise',
    ],
    cityAroundText: (
      <span className="text-center">
        Nous intervenons à Villiers-le-Bel et dans ces villes 95 :{' '}
        {[
          'Argenteuil',
          'Cergy',
          'Sarcelles',
          'Garges-lès-Gonesse',
          'Goussainville',
          'Gonesse',
          'Villiers-le-Bel',
          'Bezons',
          'Franconville',
          'Herblay-sur-Seine',
          'Saint-Ouen-l’Aumône',
          'Pontoise',
        ].map((v, i, arr) => (
          <span key={v}>
            <Link href={`/agence-web-${removeAccents(v)}`}>{v}</Link>
            {i < arr.length - 2 ? ', ' : i === arr.length - 2 ? ' et ' : ''}
          </span>
        ))}{' '}
        (création de site, app, SaaS, SEO).
      </span>
    ),
    CTATitle: 'Votre site qui performe à Villiers-le-Bel (Val-d’Oise)',
    CTADesc:
      'Ikovaline – résultats concrets : visibilité locale, SEO, conversion et maintenance.',
    CTATextBtn: 'Démarrer mon projet à Villiers-le-Bel',
    metaTitle:
      'Agence web Villiers-le-Bel (Val-d’Oise) – Site, app & SaaS, SEO | Ikovaline',
    metaDescription:
      'Création/refonte de site, apps/SaaS, SEO local Val-d’Oise et SEA à Villiers-le-Bel. Ikovaline pilote votre croissance.',
  },

  {
    id: 'agence-web-bezons',
    departement: 'Val-d’Oise',
    ville: 'Bezons',
    intro: `À Bezons (Val-d’Oise), Ikovaline crée des sites internet élégants et rapides, des apps et des SaaS orientés business. Nous vous aidons à gagner des positions sur Google et à transformer vos visites en clients.`,
    text1: (
      <span>
        Notre <strong>agence web à Bezons</strong> propose un accompagnement
        complet :{' '}
        <Link href="nos-services/creation-sites-web-vitrine-e-commerce">
          création de site
        </Link>
        , refonte,{' '}
        <Link href="nos-services/seo-referencement-naturel">
          SEO local Val-d’Oise
        </Link>
        , sécurité, maintenance et campagnes. Ikovaline livre un digital utile,
        mesurable et pérenne.
      </span>
    ),
    services: [
      {
        text: 'Création de sites web',
        subtext:
          'Site vitrine/e-commerce pensé conversion et SEO, prêt pour une évolution app/SaaS à Bezons (95).',
        link: 'nos-services/creation-sites-web-vitrine-e-commerce',
      },
      {
        text: 'Référencement SEO',
        subtext:
          'Optimisations locales, contenu et maillage : captez la demande autour de Bezons et du Val-d’Oise.',
        link: 'nos-services/seo-referencement-naturel',
      },
      {
        text: 'Maintenance et support',
        subtext:
          'Mises à jour, sécurité, sauvegardes et supervision : gardez un actif digital sain et rapide.',
        link: 'nos-services/creation-site-web-sur-mesure',
      },
      {
        text: 'Web marketing',
        subtext:
          'SEA/social, contenu et reporting : une acquisition lisible et rentable en 95.',
        link: 'nos-services/gestion-campagnes-sea',
      },
    ],
    objectifs: {
      objectifTitle:
        'Notre mission à Bezons : faire de votre site un levier de croissance',
      text1: `Nous alignons conception, SEO local et preuve sociale pour générer des leads qualifiés.`,
      text2: `Indicateurs suivis, décisions pragmatiques : cap sur la croissance locale en Val-d’Oise.`,
    },
    villesVoisines: [
      'Argenteuil',
      'Cergy',
      'Sarcelles',
      'Garges-lès-Gonesse',
      'Goussainville',
      'Gonesse',
      'Villiers-le-Bel',
      'Bezons',
      'Franconville',
      'Herblay-sur-Seine',
      'Saint-Ouen-l’Aumône',
      'Pontoise',
    ],
    cityAroundText: (
      <span className="text-center">
        Notre <strong>agence web à Bezons</strong> intervient aussi à{' '}
        {[
          'Argenteuil',
          'Cergy',
          'Sarcelles',
          'Garges-lès-Gonesse',
          'Goussainville',
          'Gonesse',
          'Villiers-le-Bel',
          'Bezons',
          'Franconville',
          'Herblay-sur-Seine',
          'Saint-Ouen-l’Aumône',
          'Pontoise',
        ].map((v, i, arr) => (
          <span key={v}>
            <Link href={`/agence-web-${removeAccents(v)}`}>{v}</Link>
            {i < arr.length - 2 ? ', ' : i === arr.length - 2 ? ' et ' : ''}
          </span>
        ))}{' '}
        pour créer des sites, apps et SaaS performants en Val-d’Oise.
      </span>
    ),
    CTATitle: 'Créez votre site à Bezons (Val-d’Oise) avec Ikovaline',
    CTADesc:
      'Visibilité locale, performance SEO et conversion : un accompagnement orienté résultats.',
    CTATextBtn: 'Lancer mon projet à Bezons',
    metaTitle:
      'Agence web Bezons (Val-d’Oise) – Site, app & SaaS, SEO | Ikovaline',
    metaDescription:
      'Création/refonte, apps/SaaS, SEO local Val-d’Oise et SEA à Bezons. Ikovaline livre des résultats concrets.',
  },

  {
    id: 'agence-web-franconville',
    departement: 'Val-d’Oise',
    ville: 'Franconville',
    intro: `Ikovaline, agence web à Franconville (Val-d’Oise), conçoit des sites internet rapides, des apps et des SaaS orientés ROI. Notre promesse : un digital utile qui génère des leads qualifiés.`,
    text1: (
      <span>
        À <Link href="/agence-web-franconville">Franconville</Link>, nous
        livrons des sites/app SEO-first, accessibles et performants. De la{' '}
        <Link href="nos-services/creation-sites-web-vitrine-e-commerce">
          création
        </Link>{' '}
        à l’
        <Link href="nos-services/seo-referencement-naturel">
          optimisation SEO
        </Link>
        , Ikovaline installe une dynamique de croissance locale en 95.
      </span>
    ),
    services: [
      {
        text: 'Création de sites web',
        subtext:
          'Vitrine/e-commerce SEO-ready et prêt à évoluer vers l’app/SaaS pour Franconville et le Val-d’Oise.',
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
          'Surveillance, sécurité, sauvegardes et corrections : gardez un site/app stable et rapide.',
        link: 'nos-services/creation-site-web-sur-mesure',
      },
      {
        text: 'Web marketing',
        subtext:
          'SEA, social, contenu et reporting : un plan d’acquisition actionnable et mesuré en 95.',
        link: 'nos-services/gestion-campagnes-sea',
      },
    ],
    objectifs: {
      objectifTitle:
        'Notre mission à Franconville : booster votre présence en ligne',
      text1: `Nous activons les fondamentaux (structure, contenus, preuve sociale) et pilotons vos priorités par la donnée.`,
      text2: `Cap sur la croissance durable en Val-d’Oise avec Ikovaline.`,
    },
    villesVoisines: [
      'Argenteuil',
      'Cergy',
      'Sarcelles',
      'Garges-lès-Gonesse',
      'Goussainville',
      'Gonesse',
      'Villiers-le-Bel',
      'Bezons',
      'Franconville',
      'Herblay-sur-Seine',
      'Saint-Ouen-l’Aumône',
      'Pontoise',
    ],
    cityAroundText: (
      <span className="text-center">
        Notre <strong>agence web à Franconville</strong> intervient aussi à{' '}
        {[
          'Argenteuil',
          'Cergy',
          'Sarcelles',
          'Garges-lès-Gonesse',
          'Goussainville',
          'Gonesse',
          'Villiers-le-Bel',
          'Bezons',
          'Franconville',
          'Herblay-sur-Seine',
          'Saint-Ouen-l’Aumône',
          'Pontoise',
        ].map((v, i, arr) => (
          <span key={v}>
            <Link href={`/agence-web-${removeAccents(v)}`}>{v}</Link>
            {i < arr.length - 2 ? ', ' : i === arr.length - 2 ? ' et ' : ''}
          </span>
        ))}{' '}
        afin d’aider les entreprises locales à réussir leur projet web en 95.
      </span>
    ),
    CTATitle:
      'Vous avez un projet à Franconville ? Créons votre site dès aujourd’hui',
    CTADesc:
      'Ikovaline – résultats concrets, design soigné, performances mesurées.',
    CTATextBtn: 'Démarrer mon projet à Franconville',
    metaTitle:
      'Agence web Franconville (Val-d’Oise) – Site, app & SaaS, SEO | Ikovaline',
    metaDescription:
      'Création/refonte de site, apps/SaaS, SEO local Val-d’Oise et SEA à Franconville. Ikovaline pilote votre croissance digitale.',
  },

  {
    id: 'agence-web-herblay-sur-seine',
    departement: 'Val-d’Oise',
    ville: 'Herblay-sur-Seine',
    intro: `À Herblay-sur-Seine (Val-d’Oise), Ikovaline crée des sites rapides, des apps modernes et des SaaS évolutifs. Notre approche : UX, technique et SEO local alignés sur vos objectifs business.`,
    text1: (
      <span>
        Basée près d’
        <Link href="/agence-web-herblay-sur-seine">Herblay-sur-Seine</Link>,
        notre <strong>agence web 95</strong> prend en charge votre{' '}
        <Link href="nos-services/creation-sites-web-vitrine-e-commerce">
          création de site
        </Link>
        , votre{' '}
        <Link href="nos-services/seo-referencement-naturel">
          référencement local
        </Link>{' '}
        et la performance technique (Core Web Vitals). Résultat : un site/app
        qui charge vite, ranke mieux et convertit davantage.
      </span>
    ),
    services: [
      {
        text: 'Création de sites web',
        subtext:
          'Un site pensé conversion et SEO, extensible vers app/SaaS, dédié aux acteurs d’Herblay-sur-Seine (95).',
        link: 'nos-services/creation-sites-web-vitrine-e-commerce',
      },
      {
        text: 'Référencement SEO',
        subtext:
          'Stratégie sémantique locale, optimisation on-site et netlinking : gagnez des positions utiles en Val-d’Oise.',
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
          'SEA/social, contenu et reporting : des actions claires, mesurées, alignées sur vos objectifs locaux.',
        link: 'nos-services/gestion-campagnes-sea',
      },
    ],
    objectifs: {
      objectifTitle: 'Objectif à Herblay-sur-Seine : visibilité et conversions',
      text1: `Plan d’actions court-terme (quick wins SEO/UX) + cap long-terme (autorité, contenus, maillage).`,
      text2: `Un actif digital qui grandit avec vous, d’Herblay-sur-Seine vers tout le Val-d’Oise.`,
    },
    villesVoisines: [
      'Argenteuil',
      'Cergy',
      'Sarcelles',
      'Garges-lès-Gonesse',
      'Goussainville',
      'Gonesse',
      'Villiers-le-Bel',
      'Bezons',
      'Franconville',
      'Herblay-sur-Seine',
      'Saint-Ouen-l’Aumône',
      'Pontoise',
    ],
    cityAroundText: (
      <span className="text-center">
        Nous accompagnons Herblay-sur-Seine et les villes voisines du 95 :{' '}
        {[
          'Argenteuil',
          'Cergy',
          'Sarcelles',
          'Garges-lès-Gonesse',
          'Goussainville',
          'Gonesse',
          'Villiers-le-Bel',
          'Bezons',
          'Franconville',
          'Herblay-sur-Seine',
          'Saint-Ouen-l’Aumône',
          'Pontoise',
        ].map((v, i, arr) => (
          <span key={v}>
            <Link href={`/agence-web-${removeAccents(v)}`}>{v}</Link>
            {i < arr.length - 2 ? ', ' : i === arr.length - 2 ? ' et ' : ''}
          </span>
        ))}{' '}
        (création de site, app, SaaS, SEO local).
      </span>
    ),
    CTATitle: 'Passez à l’action à Herblay-sur-Seine (Val-d’Oise)',
    CTADesc:
      'Ikovaline – agence web 95 : un site rapide, un SEO solide, une acquisition claire.',
    CTATextBtn: 'Lancer mon projet à Herblay-sur-Seine',
    metaTitle:
      'Agence web Herblay-sur-Seine (Val-d’Oise) – Site, app & SaaS, SEO | Ikovaline',
    metaDescription:
      'Sites performants, apps/SaaS, SEO local 95 et SEA à Herblay-sur-Seine. Croissance pilotée par les données.',
  },

  {
    id: 'agence-web-saint-ouen-l-aumone',
    departement: 'Val-d’Oise',
    ville: 'Saint-Ouen-l’Aumône',
    intro: `Ikovaline, agence web à Saint-Ouen-l’Aumône (Val-d’Oise), crée des sites internet, des apps web et des SaaS qui transforment votre visibilité en prospects. Focus : SEO local, performance, conversion.`,
    text1: (
      <span>
        À{' '}
        <Link href="/agence-web-saint-ouen-l-aumone">Saint-Ouen-l’Aumône</Link>,
        nous livrons des sites/app rapides, accessibles et bien structurés :
        <Link href="nos-services/creation-sites-web-vitrine-e-commerce">
          {' '}
          création/refonte
        </Link>
        ,{' '}
        <Link href="nos-services/seo-referencement-naturel">
          stratégie SEO locale
        </Link>
        , contenus et netlinking. Objectif : capter la demande Cergy-Pontoise.
      </span>
    ),
    services: [
      {
        text: 'Création de sites web',
        subtext:
          'Vitrine/e-commerce SEO-ready pour Saint-Ouen-l’Aumône, prêt à évoluer vers app/SaaS.',
        link: 'nos-services/creation-sites-web-vitrine-e-commerce',
      },
      {
        text: 'Référencement SEO',
        subtext:
          'Silos locaux, on-site, netlinking et avis : gagnez des positions durables sur le 95.',
        link: 'nos-services/seo-referencement-naturel',
      },
      {
        text: 'Maintenance et support',
        subtext:
          'Sécurité, mises à jour, sauvegardes et supervision : un actif fiable au quotidien.',
        link: 'nos-services/creation-site-web-sur-mesure',
      },
      {
        text: 'Web marketing',
        subtext:
          'Campagnes Ads/social, contenu et analytics : une acquisition lisible et mesurable.',
        link: 'nos-services/gestion-campagnes-sea',
      },
    ],
    objectifs: {
      objectifTitle:
        'Objectif à Saint-Ouen-l’Aumône : plus de visibilité, plus de clients',
      text1: `Pages locales, CTA visibles, avis et FAQ : nous activons les bons leviers SEO & conversion.`,
      text2: `Suivi mensuel et décisions pragmatiques : Ikovaline pilote votre croissance en Val-d’Oise.`,
    },
    villesVoisines: [
      'Argenteuil',
      'Cergy',
      'Sarcelles',
      'Garges-lès-Gonesse',
      'Goussainville',
      'Gonesse',
      'Villiers-le-Bel',
      'Bezons',
      'Franconville',
      'Herblay-sur-Seine',
      'Saint-Ouen-l’Aumône',
      'Pontoise',
    ],
    cityAroundText: (
      <span className="text-center">
        Nous intervenons à Saint-Ouen-l’Aumône et autour (95) :{' '}
        {[
          'Argenteuil',
          'Cergy',
          'Sarcelles',
          'Garges-lès-Gonesse',
          'Goussainville',
          'Gonesse',
          'Villiers-le-Bel',
          'Bezons',
          'Franconville',
          'Herblay-sur-Seine',
          'Saint-Ouen-l’Aumône',
          'Pontoise',
        ].map((v, i, arr) => (
          <span key={v}>
            <Link href={`/agence-web-${removeAccents(v)}`}>{v}</Link>
            {i < arr.length - 2 ? ', ' : i === arr.length - 2 ? ' et ' : ''}
          </span>
        ))}{' '}
        (site, app, SaaS, SEO local).
      </span>
    ),
    CTATitle: 'Un site qui performe à Saint-Ouen-l’Aumône (Val-d’Oise)',
    CTADesc:
      'Ikovaline – création/refonte, SEO et campagnes : un plan clair et mesurable.',
    CTATextBtn: 'Lancer mon projet à Saint-Ouen-l’Aumône',
    metaTitle:
      'Agence web Saint-Ouen-l’Aumône (Val-d’Oise) – Site, app & SaaS, SEO',
    metaDescription:
      'Sites rapides, apps/SaaS, SEO local 95 et SEA à Saint-Ouen-l’Aumône. Ikovaline aligne design, tech et business.',
  },

  {
    id: 'agence-web-pontoise',
    departement: 'Val-d’Oise',
    ville: 'Pontoise',
    intro: `Ikovaline, agence web à Pontoise (Val-d’Oise), conçoit des sites internet performants, des apps/SaaS et des stratégies SEO locales. Objectif : transformer votre présence digitale en demandes concrètes.`,
    text1: (
      <span>
        À <Link href="/agence-web-pontoise">Pontoise</Link>, nous livrons des
        <strong> sites/app</strong> rapides, bien référencés et orientés
        conversion. De la{' '}
        <Link href="nos-services/creation-sites-web-vitrine-e-commerce">
          création
        </Link>{' '}
        à l’
        <Link href="nos-services/seo-referencement-naturel">
          optimisation SEO
        </Link>
        , Ikovaline installe une dynamique de croissance locale Cergy-Pontoise.
      </span>
    ),
    services: [
      {
        text: 'Création de sites web',
        subtext:
          'Vitrine/e-commerce SEO-ready, prêt à évoluer vers l’app/SaaS pour Pontoise et le Val-d’Oise.',
        link: 'nos-services/creation-sites-web-vitrine-e-commerce',
      },
      {
        text: 'Référencement SEO',
        subtext:
          'Structure, contenus, netlinking et avis : remontez sur les requêtes locales clés en 95.',
        link: 'nos-services/seo-referencement-naturel',
      },
      {
        text: 'Maintenance et support',
        subtext:
          'Surveillance, sécurité, sauvegardes et corrections : gardez un site/app stable et performant à Pontoise.',
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
        'Notre mission à Pontoise : booster votre présence en ligne',
      text1: `Nous activons les fondamentaux SEO/UX et pilotons vos priorités par la donnée.`,
      text2: `Cap sur la croissance durable en Val-d’Oise avec Ikovaline.`,
    },
    villesVoisines: [
      'Argenteuil',
      'Cergy',
      'Sarcelles',
      'Garges-lès-Gonesse',
      'Goussainville',
      'Gonesse',
      'Villiers-le-Bel',
      'Bezons',
      'Franconville',
      'Herblay-sur-Seine',
      'Saint-Ouen-l’Aumône',
      'Pontoise',
    ],
    cityAroundText: (
      <span className="text-center">
        Notre <strong>agence web à Pontoise</strong> intervient aussi à{' '}
        {[
          'Argenteuil',
          'Cergy',
          'Sarcelles',
          'Garges-lès-Gonesse',
          'Goussainville',
          'Gonesse',
          'Villiers-le-Bel',
          'Bezons',
          'Franconville',
          'Herblay-sur-Seine',
          'Saint-Ouen-l’Aumône',
          'Pontoise',
        ].map((v, i, arr) => (
          <span key={v}>
            <Link href={`/agence-web-${removeAccents(v)}`}>{v}</Link>
            {i < arr.length - 2 ? ', ' : i === arr.length - 2 ? ' et ' : ''}
          </span>
        ))}{' '}
        afin de soutenir les entreprises locales en Val-d’Oise.
      </span>
    ),
    CTATitle: 'Passez à l’action à Pontoise (Val-d’Oise) !',
    CTADesc:
      'Ikovaline – création de site, SEO, acquisition et maintenance : une approche orientée résultats.',
    CTATextBtn: 'Lancer mon projet web à Pontoise',
    metaTitle:
      'Agence web Pontoise (Val-d’Oise) – Ikovaline : site, app & SaaS, SEO',
    metaDescription:
      'Sites rapides, apps/SaaS, SEO local Val-d’Oise et campagnes rentables à Pontoise. Un accompagnement orienté ROI.',
  },
];
