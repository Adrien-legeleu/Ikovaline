import { removeAccents } from '@/components/pageSatellite/CityAround';
import Link from 'next/link';

export const dataAgence = [
  {
    id: 'agence-web-massy',
    departement: 'Essonne',

    ville: 'Massy',
    intro: `Vous cherchez une agence web à Massy pour booster votre présence en ligne ? Ikovaline est spécialisée dans la création de site internet à Massy, le référencement SEO local, la refonte de site vitrine ou e-commerce, ainsi que dans la mise en place de stratégies digitales efficaces. Que vous soyez une TPE, PME ou indépendant basé à Massy ou dans le département de l’Essonne, nous mettons tout en œuvre pour assurer la réussite de votre projet web.`,
    text1: (
      <span>
        Notre <strong>agence web à Massy</strong> accompagne les professionnels
        dans leur transformation digitale. Vous êtes une entreprise implantée à{' '}
        <Link href="/agence-web-massy">Massy</Link> ou à proximité (Évry,
        Palaiseau, Verrières-le-Buisson, Saclay…) ? Confiez-nous votre{' '}
        <strong>création de site internet</strong>, votre{' '}
        <strong>refonte de site web</strong>, ou votre{' '}
        <strong>référencement SEO à Massy</strong>.
        <br />
        Grâce à notre expertise locale, nous vous proposons un accompagnement
        100% sur-mesure : audit de visibilité, conception UX/UI, développement
        technique,{' '}
        <Link href="nos-services/seo-referencement-naturel">
          optimisation SEO
        </Link>
        , hébergement et maintenance. À chaque étape, notre objectif est clair :
        faire de votre site un levier de croissance durable à Massy et en
        Essonne.
      </span>
    ),
    services: [
      {
        text: 'Création de sites web',
        subtext:
          'Confiez la création de votre site internet vitrine ou e-commerce à notre agence web basée à Massy. Nous concevons des sites modernes, rapides, et optimisés pour le référencement naturel local.',
        link: 'nos-services/creation-sites-web-vitrine-e-commerce',
      },
      {
        text: 'Référencement SEO',
        subtext:
          'Améliorez votre visibilité en ligne avec une stratégie de référencement SEO ciblée sur Massy, l’Essonne, et vos clients potentiels. Mots-clés, contenu, backlinks, performance technique : on s’occupe de tout.',
        link: 'nos-services/seo-referencement-naturel',
      },
      {
        text: 'Maintenance et support',
        subtext:
          'Maintenance régulière, mises à jour, sauvegardes, sécurité, support 24/7… Votre site web à Massy est entre de bonnes mains avec notre agence digitale locale.',
        link: 'nos-services/creation-site-web-sur-mesure',
      },
      {
        text: 'Web marketing',
        subtext:
          'Développez votre notoriété à Massy et au-delà avec des campagnes Google Ads, réseaux sociaux, stratégie de contenu et marketing automation.',
        link: 'nos-services/gestion-campagnes-sea',
      },
    ],
    objectifs: {
      objectifTitle:
        'Notre mission à Massy : faire de votre site un outil de croissance',
      text1: `Notre agence web à Massy a pour ambition de vous accompagner de A à Z : de la conception de votre site internet à sa mise en ligne, en passant par sa refonte, son optimisation SEO, et sa maintenance. Nous construisons avec vous une stratégie digitale cohérente et alignée sur vos objectifs commerciaux.`,
      text2: `Nous intervenons à Massy mais aussi dans tout le département de l’Essonne. Nos services de création de site web, de refonte de site existant, et de référencement naturel vous assurent une visibilité accrue. Avec Ikovaline, vous bénéficiez d’un partenaire fiable, réactif, et engagé pour vos résultats. Et si vous n’êtes pas satisfait, nous vous remboursons.`,
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
        Nous proposons nos services de création de site internet, de
        référencement SEO, et de refonte web non seulement à{' '}
        <Link href="/agence-web-massy">Massy</Link>, mais aussi dans les villes
        voisines d’Essonne et d’Île-de-France comme{' '}
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
        pour accompagner les entrepreneurs dans leur transformation numérique
        locale.
      </span>
    ),
    CTATitle: 'Créons votre site internet à Massy dès aujourd’hui !',
    CTADesc:
      'Attirez de nouveaux clients, améliorez votre visibilité locale à Massy, et développez votre activité en ligne avec Ikovaline, votre agence web de proximité.',
    CTATextBtn: 'Lancez votre projet web à Massy',
    metaTitle:
      'Agence web à Massy (Essonne) – Création de site internet, SEO, refonte',
    metaDescription:
      'Besoin d’un site web à Massy ? Ikovaline est votre agence digitale locale : création, refonte de site internet, référencement SEO, web marketing en Essonne.',
  },

  {
    id: 'agence-web-evry',
    departement: 'Essonne',

    ville: 'Évry',
    intro: `Découvrez notre agence web basée à Évry, spécialisée dans la création de sites internet. Nous aidons les entreprises et indépendants d'Évry et de l'Essonne à développer leur activité en ligne grâce à des solutions concrètes : création de site web, référencement naturel, maintenance, etc.`,
    text1: (
      <span>
        Vous êtes une entreprise située à{' '}
        <Link href="/agence-web-evry">Évry</Link> ou dans l’Essonne ? Notre
        agence web locale vous aide à renforcer votre visibilité en ligne. De la{' '}
        <Link href="nos-services/creation-sites-web-vitrine-e-commerce">
          création de site vitrine
        </Link>{' '}
        à l’<Link href="nos-services/seo-referencement-naturel">audit SEO</Link>
        , nous vous aidons à développer efficacement votre présence sur le web à
        Évry.
      </span>
    ),
    services: [
      {
        text: 'Création de sites web',
        subtext:
          'Créer un site internet vitrine, e-commerce ou sur-mesure, et développez votre image en ligne grâce à notre agence web basée à Évry, en Essonne.',
        link: 'nos-services/creation-sites-web-vitrine-e-commerce',
      },
      {
        text: 'Référencement SEO',
        subtext:
          'Boostez votre visibilité et attirez du trafic qualifié à Évry, en Essonne et au-delà, grâce à notre stratégie SEO locale.',
        link: 'nos-services/seo-referencement-naturel',
      },
      {
        text: 'Maintenance et support',
        subtext:
          'Assurez la performance de votre site web avec notre maintenance dédiée et un support continu depuis notre agence à Évry.',
        link: 'nos-services/creation-site-web-sur-mesure',
      },
      {
        text: 'Web marketing',
        subtext:
          'Promevez votre marque localement et nationalement avec nos campagnes Google Ads, social media, stratégie de contenu et emailings ciblés.',
        link: 'nos-services/gestion-campagnes-sea',
      },
    ],
    objectifs: {
      objectifTitle: 'Objectif de notre agence web à Évry',
      text1: `Notre objectif est de vous accompagner tout au long de votre projet, en vous proposant une stratégie sur-mesure pour votre entreprise, que ce soit la création ou la refonte de votre site internet à Évry. Nous garantissons un accompagnement complet, de la conception du site à sa maintenance, partout en Essonne.`,
      text2: `Grâce à notre expertise en développement web et en marketing digital (SEO, SEA, etc.), nous vous assurons des résultats mesurables. Notre agence web locale, implantée à Évry et active dans tout l'Essonne, vous accompagne avec un support 24h/24. Si les résultats ne sont pas au rendez-vous, nous vous remboursons.`,
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
        Nous intervenons également partout en Essonne et aux alentours pour la
        création de sites web, que ce soit à{' '}
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
        afin d’accompagner les entreprises et indépendants dans leur stratégie
        de présence en ligne.
      </span>
    ),
    CTATitle: 'Passez à l’action maintenant !',
    CTADesc:
      'Attirez plus de clients, augmentez vos ventes, développez votre notoriété. Avec Ikovaline, c’est possible à Évry.',
    CTATextBtn: 'Lancez votre projet',
    metaTitle:
      'Agence web à Évry - Création de site web, SEO, marketing digital',
    metaDescription:
      'Boostez votre entreprise à Évry avec une agence web locale : création de site internet, référencement SEO, webmarketing, accompagnement sur-mesure.',
  },
  {
    id: 'agence-web-verrieres-le-buisson',
    ville: 'Verrières-le-Buisson',
    departement: 'Essonne',

    intro: `Découvrez notre agence web à Verrières-le-Buisson, spécialisée dans la création de sites internet. Nous accompagnons les entreprises et indépendants de Verrières-le-Buisson et de l'Essonne environnante pour développer leur visibilité en ligne grâce à des solutions concrètes : création de site web, SEO, maintenance, etc.`,
    text1: (
      <span>
        Vous êtes une entreprise située à{' '}
        <Link href="/agence-web-verriere-le-buisson">Verrières-le-Buisson</Link>{' '}
        ou dans les environs ? Notre agence web locale est là pour booster votre
        visibilité en ligne. De la{' '}
        <Link href="nos-services/creation-sites-web-vitrine-e-commerce">
          création de site vitrine
        </Link>{' '}
        à l’
        <Link href="nos-services/seo-referencement-naturel">
          optimisation SEO
        </Link>
        , nous vous aidons à développer efficacement votre activité sur le web à
        Verrières-le-Buisson.
      </span>
    ),
    services: [
      {
        text: 'Création de sites web',
        subtext:
          'Créer un site internet vitrine, e-commerce ou sur-mesure, et développez votre image en ligne grâce à notre agence web basée à Verrières-le-Buisson, en Essonne.',
        link: 'nos-services/creation-sites-web-vitrine-e-commerce',
      },
      {
        text: 'Référencement SEO',
        subtext:
          'Augmentez votre visibilité en Essonne et au-delà avec un référencement naturel adapté à votre activité.',
        link: 'nos-services/seo-referencement-naturel',
      },
      {
        text: 'Maintenance et support',
        subtext:
          'Maintenance, mises à jour et support continu pour votre site web : notre équipe implantée à Verrières-le-Buisson vous accompagne.',
        link: 'nos-services/creation-site-web-sur-mesure',
      },
      {
        text: 'Web marketing',
        subtext:
          'Boostez votre communication en ligne avec nos campagnes publicitaires efficaces, le community management et la stratégie de contenu.',
        link: 'nos-services/gestion-campagnes-sea',
      },
    ],
    objectifs: {
      objectifTitle: 'Objectif de notre agence web à Verrières-le-Buisson',
      text1: `Notre objectif est de vous accompagner à chaque étape de votre projet digital, en proposant une stratégie personnalisée à votre entreprise, qu’il s’agisse de la création ou de la refonte de votre site internet à Verrières-le-Buisson. Nous offrons un service complet, de la conception du site à sa maintenance, partout en Essonne.`,
      text2: `Grâce à notre expertise en création de site web et en stratégies digitales (SEO, SEA, etc.), nous nous engageons à vous fournir des résultats concrets. Notre agence web, implantée à Verrières-le-Buisson et active dans toute l’Essonne, vous soutient avec un support disponible 24h/24. Si les résultats ne répondent pas à vos attentes, nous vous remboursons.`,
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
        Notre équipe se déplace aussi dans toute l'Essonne et les environs pour
        la création de sites web, que ce soit à{' '}
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
        afin d’accompagner les entreprises et indépendants dans leur stratégie
        de présence en ligne.
      </span>
    ),
    CTATitle: 'Passez à l’action maintenant !',
    CTADesc:
      'Attirez plus de clients, augmentez vos ventes, développez votre notoriété. Avec Ikovaline, c’est possible à Verrières-le-Buisson.',
    CTATextBtn: 'Lancez votre projet',
    metaTitle:
      'Agence web à Verrières-le-Buisson - Création de site web, SEO, marketing digital',
    metaDescription:
      'Boostez votre entreprise à Verrières-le-Buisson avec une agence web locale : création de site internet, référencement SEO, webmarketing, accompagnement sur-mesure.',
  },
  {
    id: 'agence-web-saclay',
    departement: 'Essonne',

    ville: 'Saclay',
    intro: `Découvrez notre agence web sur le plateau de Saclay, spécialisée dans la création de sites web. Nous aidons les entreprises et indépendants de Saclay et du nord de l'Essonne à développer leur présence en ligne grâce à des solutions performantes : création de site web, référencement naturel, maintenance, etc.`,
    text1: (
      <span>
        Vous êtes une entreprise située à{' '}
        <Link href="/agence-web-saclay">Saclay</Link> ou dans les communes
        environnantes ? Notre agence web locale est là pour renforcer votre
        visibilité en ligne. De la{' '}
        <Link href="nos-services/creation-sites-web-vitrine-e-commerce">
          création de site vitrine
        </Link>{' '}
        à l’
        <Link href="nos-services/seo-referencement-naturel">
          optimisation SEO
        </Link>
        , nous vous aidons à développer efficacement votre activité sur internet
        à Saclay.
      </span>
    ),
    services: [
      {
        text: 'Création de sites web',
        subtext:
          'Créer un site internet vitrine, e-commerce ou sur-mesure, et développez votre image en ligne grâce à notre agence web basée à Saclay, en Essonne.',
        link: 'nos-services/creation-sites-web-vitrine-e-commerce',
      },
      {
        text: 'Référencement SEO',
        subtext:
          'Gagnez en visibilité sur Google et attirez du trafic ciblé à Saclay et en Essonne grâce à notre stratégie SEO locale.',
        link: 'nos-services/seo-referencement-naturel',
      },
      {
        text: 'Maintenance et support',
        subtext:
          'Maintenance technique et support continu pour votre site web : notre agence locale assure un suivi permanent de vos projets.',
        link: 'nos-services/creation-site-web-sur-mesure',
      },
      {
        text: 'Web marketing',
        subtext:
          'Accélérez votre croissance avec nos campagnes SEA, publicités sur réseaux sociaux, contenu digital et analyse de performances.',
        link: 'nos-services/gestion-campagnes-sea',
      },
    ],
    objectifs: {
      objectifTitle: 'Objectif de notre agence web à Saclay',
      text1: `Notre objectif est de vous accompagner à chaque étape de votre projet digital en proposant une stratégie sur mesure pour votre entreprise, qu'il s'agisse de la création ou de la refonte de votre site internet à Saclay. Nous mettons tout en œuvre pour offrir un service global, de la conception du site à sa maintenance, partout en Essonne.`,
      text2: `Forte de son expertise en création de site web et en marketing digital (SEO, SEA, etc.), notre agence vous garantit des résultats tangibles. Implantée à Saclay et active dans tout l'Essonne, notre équipe vous accompagne avec un support disponible 24h/24. Et si les résultats sont en deçà de vos attentes, vous êtes remboursé.`,
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
        Nous intervenons également partout en Essonne et aux alentours pour la
        création de sites web, que ce soit à{' '}
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
        afin d’accompagner les entreprises et indépendants dans leur stratégie
        de présence en ligne.
      </span>
    ),
    CTATitle: 'Passez à l’action maintenant !',
    CTADesc:
      'Attirez plus de clients, augmentez vos ventes, développez votre notoriété. Avec Ikovaline, c’est possible à Saclay.',
    CTATextBtn: 'Lancez votre projet',
    metaTitle:
      'Agence web à Saclay - Création de site web, SEO, marketing digital',
    metaDescription:
      'Boostez votre entreprise à Saclay avec une agence web locale : création de site internet, référencement SEO, webmarketing, accompagnement sur-mesure.',
  },
  {
    id: 'agence-web-courcouronnes',
    ville: 'Courcouronnes',
    departement: 'Essonne',

    intro: `Découvrez notre agence web à Courcouronnes, spécialisée dans la création de sites internet sur mesure. Nous accompagnons les entreprises et indépendants de Courcouronnes et de l'Essonne pour booster leur activité en ligne grâce à des services digitaux : création de site web, référencement, maintenance, etc.`,
    text1: (
      <span>
        Vous êtes une entreprise située à{' '}
        <Link href="/agence-web-courcouronnes">Courcouronnes</Link> ou dans les
        environs (Évry, Essonne) ? Notre équipe est à votre service pour
        améliorer votre visibilité en ligne. De la{' '}
        <Link href="nos-services/creation-sites-web-vitrine-e-commerce">
          création de site vitrine
        </Link>{' '}
        à l'<Link href="nos-services/seo-referencement-naturel">audit SEO</Link>
        , nous vous aidons à développer efficacement votre présence sur le web à
        Courcouronnes.
      </span>
    ),
    services: [
      {
        text: 'Création de sites web',
        subtext:
          'Créer un site internet vitrine, e-commerce ou sur-mesure, et développez votre image en ligne grâce à notre agence web basée à Courcouronnes, en Essonne.',
        link: 'nos-services/creation-sites-web-vitrine-e-commerce',
      },
      {
        text: 'Référencement SEO',
        subtext:
          'Optimisez votre référencement pour attirer des visiteurs qualifiés à Courcouronnes et dans tout le département.',
        link: 'nos-services/seo-referencement-naturel',
      },
      {
        text: 'Maintenance et support',
        subtext:
          'Maintenance continue et support pour votre site internet : notre agence basée en Essonne veille à son bon fonctionnement et sa sécurité.',
        link: 'nos-services/creation-site-web-sur-mesure',
      },
      {
        text: 'Web marketing',
        subtext:
          'Dynamisez votre marketing en ligne avec nos campagnes publicitaires (SEA), gestion des réseaux sociaux et campagnes e-mailing personnalisées.',
        link: 'nos-services/gestion-campagnes-sea',
      },
    ],
    objectifs: {
      objectifTitle: 'Objectif de notre agence web à Courcouronnes',
      text1: `Notre objectif est de vous accompagner tout au long de votre projet digital, en vous proposant une stratégie adaptée à votre entreprise, par exemple la création ou la refonte de votre site internet à Courcouronnes. Nous proposons un service global, de la conception du site à sa maintenance, partout en Essonne.`,
      text2: `Avec notre expertise en développement web et marketing digital (SEO, SEA, etc.), nous vous garantissons des résultats mesurables. Notre agence web, implantée à Courcouronnes et active dans toute l'Essonne, vous suit de près avec un support 24h/24. Si les résultats ne sont pas au rendez-vous, nous vous remboursons.`,
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
        Nous intervenons également partout en Essonne et aux alentours pour la
        création de sites web, que ce soit à{' '}
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
        afin d’accompagner les entreprises et indépendants dans leur stratégie
        de présence en ligne.
      </span>
    ),
    CTATitle: 'Passez à l’action maintenant !',
    CTADesc:
      'Attirez plus de clients, augmentez vos ventes, développez votre notoriété. Avec Ikovaline, c’est possible à Courcouronnes.',
    CTATextBtn: 'Lancez votre projet',
    metaTitle:
      'Agence web à Courcouronnes - Création de site web, SEO, marketing digital',
    metaDescription:
      'Boostez votre entreprise à Courcouronnes avec une agence web locale : création de site internet, référencement SEO, webmarketing, accompagnement sur-mesure.',
  },
  {
    id: 'agence-web-villeneuve-saint-georges',
    ville: 'Villeneuve-Saint-Georges',
    departement: 'Essonne',

    intro: `Découvrez notre agence web à Villeneuve-Saint-Georges, spécialisée dans la création de sites internet professionnels. Nous accompagnons les entreprises et indépendants de Villeneuve-Saint-Georges et des communes voisines pour développer leur présence en ligne via des solutions sur mesure : création de site web, référencement, maintenance, etc.`,
    text1: (
      <span>
        Vous êtes une entreprise située à{' '}
        <Link href="/agence-web-villeneuve-saint-georges">
          Villeneuve-Saint-Georges
        </Link>{' '}
        ou dans les communes voisines ? Notre agence web locale est là pour
        booster votre visibilité en ligne. De la{' '}
        <Link href="nos-services/creation-sites-web-vitrine-e-commerce">
          création de site vitrine
        </Link>{' '}
        à l’
        <Link href="nos-services/seo-referencement-naturel">
          optimisation SEO
        </Link>
        , nous vous aidons à développer efficacement votre activité sur internet
        à Villeneuve-Saint-Georges.
      </span>
    ),
    services: [
      {
        text: 'Création de sites web',
        subtext:
          'Créer un site internet vitrine, e-commerce ou sur-mesure, et développez votre image en ligne grâce à notre agence web basée à Villeneuve-Saint-Georges, en Île-de-France.',
        link: 'nos-services/creation-sites-web-vitrine-e-commerce',
      },
      {
        text: 'Référencement SEO',
        subtext:
          'Renforcez votre visibilité locale et nationale grâce à un référencement optimisé pour toucher plus de clients.',
        link: 'nos-services/seo-referencement-naturel',
      },
      {
        text: 'Maintenance et support',
        subtext:
          'Maintenance et support 24h/24 pour votre site web : notre agence assure un service de qualité et une disponibilité permanente.',
        link: 'nos-services/creation-site-web-sur-mesure',
      },
      {
        text: 'Web marketing',
        subtext:
          'Maximisez votre audience avec nos campagnes publicitaires en ligne (Google Ads, réseaux sociaux), votre stratégie de contenu et votre campagne e-mailing.',
        link: 'nos-services/gestion-campagnes-sea',
      },
    ],
    objectifs: {
      objectifTitle: 'Objectif de notre agence web à Villeneuve-Saint-Georges',
      text1: `Notre objectif est de vous accompagner dans chaque étape de votre projet digital, en proposant une stratégie adaptée à votre entreprise, comme la création ou la refonte de votre site internet à Villeneuve-Saint-Georges. Nous proposons un accompagnement complet, de la conception du site à son exploitation continue, partout en Essonne.`,
      text2: `Grâce à notre expertise en création de site internet et en stratégie digitale (SEO, SEA, etc.), nous vous garantissons un retour sur investissement concret. Implantée à Villeneuve-Saint-Georges et active dans toute l'Île-de-France, notre agence vous soutient avec un support disponible 24h/24. Et si les résultats ne sont pas au rendez-vous, nous assurons un remboursement.`,
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
        Nous intervenons également partout en Essonne et aux alentours pour la
        création de sites web, que ce soit à{' '}
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
        afin d’accompagner les entreprises et indépendants dans leur stratégie
        de présence en ligne.
      </span>
    ),
    CTATitle: 'Passez à l’action maintenant !',
    CTADesc:
      'Attirez plus de clients, augmentez vos ventes, développez votre notoriété. Avec Ikovaline, c’est possible à Villeneuve-Saint-Georges.',
    CTATextBtn: 'Lancez votre projet',
    metaTitle:
      'Agence web à Villeneuve-Saint-Georges - Création de site web, SEO, marketing digital',
    metaDescription:
      'Boostez votre entreprise à Villeneuve-Saint-Georges avec une agence web locale : création de site internet, référencement SEO, webmarketing, accompagnement sur-mesure.',
  },
  {
    id: 'agence-web-yerres',
    ville: 'Yerres',
    departement: 'Essonne',

    intro: `Découvrez notre agence web à Yerres, spécialisée dans la création de sites internet sur mesure. Nous aidons les entreprises et indépendants de Yerres (Essonne) et de ses environs à développer leur activité en ligne grâce à nos solutions concrètes : création de site web, SEO, maintenance, etc.`,
    text1: (
      <span>
        Vous êtes une entreprise située à{' '}
        <Link href="/agence-web-yerres">Yerres</Link> ou dans les communes
        voisines ? Notre agence web locale est à votre disposition pour
        améliorer votre visibilité en ligne. De la{' '}
        <Link href="nos-services/creation-sites-web-vitrine-e-commerce">
          création de site vitrine
        </Link>{' '}
        à l’
        <Link href="nos-services/seo-referencement-naturel">
          optimisation SEO
        </Link>
        , nous vous aidons à développer efficacement votre présence sur le web à
        Yerres.
      </span>
    ),
    services: [
      {
        text: 'Création de sites web',
        subtext:
          'Créer un site internet vitrine, e-commerce ou sur-mesure, et développez votre image en ligne grâce à notre agence web basée à Yerres, en Essonne.',
        link: 'nos-services/creation-sites-web-vitrine-e-commerce',
      },
      {
        text: 'Référencement SEO',
        subtext:
          'Améliorez votre positionnement sur Google pour attirer plus de clients à Yerres et dans toute l’Île-de-France.',
        link: 'nos-services/seo-referencement-naturel',
      },
      {
        text: 'Maintenance et support',
        subtext:
          'Maintenance et support 24/7 pour votre site web : nous veillons à sa sécurité et à ses performances.',
        link: 'nos-services/creation-site-web-sur-mesure',
      },
      {
        text: 'Web marketing',
        subtext:
          'Renforcez votre présence en ligne avec des stratégies efficaces : campagnes SEA, community management et email marketing.',
        link: 'nos-services/gestion-campagnes-sea',
      },
    ],
    objectifs: {
      objectifTitle: 'Objectif de notre agence web à Yerres',
      text1: `Notre objectif est de vous accompagner à chaque étape de votre projet digital, en proposant une stratégie sur mesure pour votre entreprise, comme la création ou la refonte de votre site internet à Yerres. Nous proposons un suivi complet, de la conception du site à sa maintenance, partout en Essonne.`,
      text2: `Grâce à notre savoir-faire en développement web et en marketing digital (SEO, SEA, etc.), nous vous assurons des résultats concrets. Notre agence web locale, implantée à Yerres et active dans toute l’Essonne, vous guide et vous offre un support 24h/24. Si les résultats ne répondent pas à vos attentes, vous êtes remboursé.`,
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
        Notre agence propose ses services dans toute l'Essonne et ses environs
        pour la création de sites web, que ce soit à{' '}
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
        afin d’accompagner les entreprises et indépendants dans leur stratégie
        de présence en ligne.
      </span>
    ),
    CTATitle: 'Passez à l’action maintenant !',
    CTADesc:
      'Attirez plus de clients, augmentez vos ventes, développez votre notoriété. Avec Ikovaline, c’est possible à Yerres.',
    CTATextBtn: 'Lancez votre projet',
    metaTitle:
      'Agence web à Yerres - Création de site web, SEO, marketing digital',
    metaDescription:
      'Boostez votre entreprise à Yerres avec une agence web locale : création de site internet, référencement SEO, webmarketing, accompagnement sur-mesure.',
  },
  {
    id: 'agence-web-marcoussis',
    departement: 'Essonne',

    ville: 'Marcoussis',
    intro: `Découvrez notre agence web à Marcoussis, spécialisée dans la création de sites internet sur mesure. Nous aidons les entreprises et artisans de Marcoussis (sud de l’Essonne) et de ses alentours à développer leur présence en ligne via des solutions personnalisées : création de site web, référencement, maintenance, etc.`,
    text1: (
      <span>
        Vous êtes une entreprise située à{' '}
        <Link href="/agence-web-marcoussis">Marcoussis</Link> ou dans les
        environs ? Notre agence web locale est prête à booster votre visibilité
        en ligne. De la{' '}
        <Link href="nos-services/creation-sites-web-vitrine-e-commerce">
          création de site vitrine
        </Link>{' '}
        à l’<Link href="nos-services/seo-referencement-naturel">audit SEO</Link>
        , nous vous aidons à développer efficacement votre activité sur internet
        à Marcoussis.
      </span>
    ),
    services: [
      {
        text: 'Création de sites web',
        subtext:
          'Créer un site internet vitrine, e-commerce ou sur-mesure, et améliorez votre image en ligne grâce à notre agence web basée à Marcoussis, en Essonne.',
        link: 'nos-services/creation-sites-web-vitrine-e-commerce',
      },
      {
        text: 'Référencement SEO',
        subtext:
          'Attirez des visiteurs qualifiés depuis Marcoussis et toute la région grâce à un référencement optimisé pour votre activité.',
        link: 'nos-services/seo-referencement-naturel',
      },
      {
        text: 'Maintenance et support',
        subtext:
          'Maintenance proactive et support 24/7 : notre équipe assure la stabilité et la sécurité de votre site web.',
        link: 'nos-services/creation-site-web-sur-mesure',
      },
      {
        text: 'Web marketing',
        subtext:
          'Dynamisez votre marketing local grâce à nos campagnes publicitaires ciblées (Google Ads, réseaux sociaux), stratégie de contenu et campagnes emailing.',
        link: 'nos-services/gestion-campagnes-sea',
      },
    ],
    objectifs: {
      objectifTitle: 'Objectif de notre agence web à Marcoussis',
      text1: `Notre objectif est de vous accompagner tout au long de votre projet digital, en vous proposant une stratégie personnalisée adaptée à votre entreprise, notamment pour la création ou la refonte de votre site internet à Marcoussis. Nous garantissons un service complet, du développement du site à sa maintenance opérationnelle, partout en Essonne.`,
      text2: `Grâce à notre expertise en création de site web et en marketing digital (SEO, SEA, etc.), nous nous engageons à fournir des résultats concrets. Notre agence web locale, implantée à Marcoussis et présente dans toute l’Essonne, vous accompagne de près avec un support disponible 24h/24. Et si les résultats ne sont pas au rendez-vous, nous vous remboursons.`,
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
        Notre agence web locale intervient aussi dans toute l'Essonne et
        alentours pour la création de sites web, que ce soit à{' '}
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
        afin d’accompagner les entreprises et indépendants dans leur stratégie
        de présence en ligne.
      </span>
    ),
    CTATitle: 'Passez à l’action maintenant !',
    CTADesc:
      'Attirez plus de clients, augmentez vos ventes, développez votre notoriété. Avec Ikovaline, c’est possible à Marcoussis.',
    CTATextBtn: 'Lancez votre projet',
    metaTitle:
      'Agence web à Marcoussis - Création de site web, SEO, marketing digital',
    metaDescription:
      'Boostez votre entreprise à Marcoussis avec une agence web locale : création de site internet, référencement SEO, webmarketing, accompagnement sur-mesure.',
  },
  {
    id: 'agence-web-vauhallan',
    ville: 'Vauhallan',
    departement: 'Essonne',

    intro: `Découvrez notre agence web à Vauhallan, spécialisée dans la création de sites internet. Nous accompagnons les entreprises et indépendants de Vauhallan (plateau de Saclay) et de ses environs pour développer leur activité en ligne grâce à nos solutions : création de site web, référencement, maintenance, etc.`,
    text1: (
      <span>
        Vous êtes une entreprise située à{' '}
        <Link href="/agence-web-vauhallan">Vauhallan</Link> ou dans les communes
        proches ? Notre agence web locale est prête à renforcer votre visibilité
        en ligne. De la{' '}
        <Link href="nos-services/creation-sites-web-vitrine-e-commerce">
          création de site vitrine
        </Link>{' '}
        à l’<Link href="nos-services/seo-referencement-naturel">audit SEO</Link>
        , nous vous aidons à développer efficacement votre présence sur le web à
        Vauhallan.
      </span>
    ),
    services: [
      {
        text: 'Création de sites web',
        subtext:
          'Créer un site internet vitrine, e-commerce ou sur-mesure, et développez votre image en ligne grâce à notre agence web basée à Vauhallan, en Essonne.',
        link: 'nos-services/creation-sites-web-vitrine-e-commerce',
      },
      {
        text: 'Référencement SEO',
        subtext:
          'Optimisez votre référencement pour attirer des clients de Vauhallan et des communes voisines.',
        link: 'nos-services/seo-referencement-naturel',
      },
      {
        text: 'Maintenance et support',
        subtext:
          'Maintenance proactive et support 24/7 pour votre site web : nous assurons sa sécurité et sa performance.',
        link: 'nos-services/creation-site-web-sur-mesure',
      },
      {
        text: 'Web marketing',
        subtext:
          'Développez votre stratégie digitale avec nos campagnes SEA ciblées, gestion des réseaux sociaux, content marketing et email marketing.',
        link: 'nos-services/gestion-campagnes-sea',
      },
    ],
    objectifs: {
      objectifTitle: 'Objectif de notre agence web à Vauhallan',
      text1: `Notre objectif est de vous accompagner dans chaque étape de votre projet digital, en proposant une stratégie adaptée à votre entreprise, telle que la création ou la refonte de votre site internet à Vauhallan. Nous proposons un service global, du design du site à sa maintenance, partout en Essonne.`,
      text2: `Grâce à notre expertise en création de site web et en marketing digital (SEO, SEA, etc.), nous garantissons des résultats concrets. Notre agence web, implantée à Vauhallan et active dans toute l’Essonne, vous soutient avec un support 24h/24. Si les résultats escomptés ne sont pas atteints, vous êtes remboursé.`,
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
        Notre équipe se déplace également dans toute l'Essonne et ses alentours
        pour la création de sites web, que ce soit à{' '}
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
        afin d’accompagner les entreprises et indépendants dans leur stratégie
        de présence en ligne.
      </span>
    ),
    CTATitle: 'Passez à l’action maintenant !',
    CTADesc:
      'Attirez plus de clients, augmentez vos ventes, développez votre notoriété. Avec Ikovaline, c’est possible à Vauhallan.',
    CTATextBtn: 'Lancez votre projet',
    metaTitle:
      'Agence web à Vauhallan - Création de site web, SEO, marketing digital',
    metaDescription:
      'Boostez votre entreprise à Vauhallan avec une agence web locale : création de site internet, référencement SEO, webmarketing, accompagnement sur-mesure.',
  },
  {
    id: 'agence-web-wissous',
    ville: 'Wissous',
    departement: 'Essonne',

    intro: `Découvrez notre agence web à Wissous, spécialisée dans la création de sites internet professionnels. Nous aidons les entreprises et indépendants de Wissous (Essonne) et de ses environs à développer leur présence en ligne grâce à nos services : création de site web, référencement naturel, maintenance, etc.`,
    text1: (
      <span>
        Vous êtes une entreprise située à{' '}
        <Link href="/agence-web-wissous">Wissous</Link> ou dans les communes
        voisines ? Notre agence web locale est là pour booster votre visibilité
        en ligne. De la{' '}
        <Link href="nos-services/creation-sites-web-vitrine-e-commerce">
          création de site vitrine
        </Link>{' '}
        à l’
        <Link href="nos-services/seo-referencement-naturel">
          optimisation SEO
        </Link>
        , nous vous aidons à développer efficacement votre activité sur internet
        à Wissous.
      </span>
    ),
    services: [
      {
        text: 'Création de sites web',
        subtext:
          'Créer un site internet vitrine, e-commerce ou sur-mesure, et développez votre image en ligne grâce à notre agence web basée à Wissous, en Essonne.',
        link: 'nos-services/creation-sites-web-vitrine-e-commerce',
      },
      {
        text: 'Référencement SEO',
        subtext:
          'Accroissez votre visibilité en ligne et attirez des clients depuis Wissous et ses alentours grâce à un référencement optimisé.',
        link: 'nos-services/seo-referencement-naturel',
      },
      {
        text: 'Maintenance et support',
        subtext:
          'Maintenance et support complet pour votre site web : notre équipe assure un suivi technique 24/7.',
        link: 'nos-services/creation-site-web-sur-mesure',
      },
      {
        text: 'Web marketing',
        subtext:
          'Augmentez votre notoriété avec nos campagnes publicitaires ciblées, gestion des réseaux sociaux, stratégie de contenu et campagnes emailing.',
        link: 'nos-services/gestion-campagnes-sea',
      },
    ],
    objectifs: {
      objectifTitle: 'Objectif de notre agence web à Wissous',
      text1: `Notre objectif est de vous accompagner tout au long de votre projet digital, en vous proposant une stratégie personnalisée pour votre entreprise, notamment la création ou la refonte de votre site internet à Wissous. Nous offrons un service complet, du développement du site à sa maintenance, partout en Essonne.`,
      text2: `Grâce à notre expertise en création de site web et en marketing digital (SEO, SEA, etc.), nous vous promettons des résultats tangibles. Notre agence web, implantée à Wissous et active dans toute l’Essonne, vous suit avec un support disponible 24h/24. Et si les résultats ne répondent pas à vos attentes, vous nous remboursons.`,
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
        Nous intervenons également partout en Essonne et aux alentours pour la
        création de sites web, que ce soit à{' '}
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
        afin d’accompagner les entreprises et indépendants dans leur stratégie
        de présence en ligne.
      </span>
    ),
    CTATitle: 'Passez à l’action maintenant !',
    CTADesc:
      'Attirez plus de clients, augmentez vos ventes, développez votre notoriété. Avec Ikovaline, c’est possible à Wissous.',
    CTATextBtn: 'Lancez votre projet',
    metaTitle:
      'Agence web à Wissous - Création de site web, SEO, marketing digital',
    metaDescription:
      'Boostez votre entreprise à Wissous avec une agence web locale : création de site internet, référencement SEO, webmarketing, accompagnement sur-mesure.',
  },
  {
    id: 'agence-web-palaiseau',
    ville: 'Palaiseau',
    departement: 'Essonne',

    intro: `Vous êtes à la recherche d’une agence web à Palaiseau pour créer ou refondre votre site internet ? Ikovaline vous accompagne dans tous vos projets digitaux. Nous sommes spécialisés dans la création de site internet à Palaiseau, le référencement SEO local, le web marketing et la maintenance technique. Faites confiance à une agence digitale de proximité pour développer votre visibilité en ligne dans toute l’Essonne.`,
    text1: (
      <span>
        Notre <strong>agence web à Palaiseau</strong> accompagne les entreprises
        locales, entrepreneurs et indépendants dans la création de site vitrine,
        e-commerce ou sur-mesure. Située au cœur de l’Essonne, notre agence vous
        propose des solutions digitales clés en main :{' '}
        <Link href="nos-services/creation-sites-web-vitrine-e-commerce">
          création de site internet
        </Link>
        ,{' '}
        <Link href="nos-services/seo-referencement-naturel">
          référencement SEO
        </Link>{' '}
        local à Palaiseau, campagnes publicitaires, refonte de site web,
        hébergement sécurisé, etc.
        <br />
        Que vous soyez à Palaiseau, Massy, Saclay ou Verrières-le-Buisson, nous
        concevons des sites performants, optimisés pour les moteurs de recherche
        et adaptés aux besoins de votre activité locale.
      </span>
    ),
    services: [
      {
        text: 'Création de sites web',
        subtext:
          'Création de site internet professionnel à Palaiseau : vitrine, e-commerce, ou sur-mesure, notre agence vous propose des solutions performantes, modernes et adaptées à votre secteur.',
        link: 'nos-services/creation-sites-web-vitrine-e-commerce',
      },
      {
        text: 'Référencement SEO',
        subtext:
          'Optimisez votre présence sur Google grâce à une stratégie de référencement SEO local ciblée sur Palaiseau et les alentours. Analyse de mots-clés, rédaction de contenu, netlinking… on s’occupe de tout.',
        link: 'nos-services/seo-referencement-naturel',
      },
      {
        text: 'Maintenance et support',
        subtext:
          'Mises à jour, sécurité, hébergement, sauvegardes : notre agence web à Palaiseau assure la maintenance complète de votre site internet avec un support réactif 7j/7.',
        link: 'nos-services/creation-site-web-sur-mesure',
      },
      {
        text: 'Web marketing',
        subtext:
          'Déployez une stratégie de webmarketing efficace à Palaiseau : Google Ads, réseaux sociaux, emailings, création de contenus, tunnel de conversion, reporting mensuel…',
        link: 'nos-services/gestion-campagnes-sea',
      },
    ],
    objectifs: {
      objectifTitle:
        'Notre objectif à Palaiseau : propulser votre présence digitale',
      text1: `Notre agence web à Palaiseau vous accompagne à chaque étape de votre projet : de la définition de vos besoins à la mise en ligne de votre site internet, en passant par le SEO, les contenus, la performance et l’UX design. Nous proposons un accompagnement sur-mesure à tous les professionnels de Palaiseau et d’Essonne.`,
      text2: `Que ce soit pour la création d’un site web à Palaiseau, la refonte d’un site existant, ou le déploiement d’une stratégie SEO locale, notre équipe d’experts vous garantit des résultats concrets. Chez Ikovaline, nous croyons en une approche orientée résultats, avec un suivi réactif et un service fiable. Et si les résultats ne suivent pas, vous êtes remboursé.`,
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
        Notre <strong>agence web à Palaiseau</strong> intervient dans toute
        l’Essonne et en Île-de-France pour la{' '}
        <strong>création de site internet</strong>, la <strong>refonte</strong>,
        le <strong>SEO local</strong> et la maintenance. Nous travaillons
        également dans les villes voisines comme{' '}
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
        afin de soutenir les entreprises locales dans leur transformation
        digitale.
      </span>
    ),
    CTATitle: 'Passez à l’action à Palaiseau !',
    CTADesc:
      'Vous avez un projet de création de site web à Palaiseau ? Attirez plus de clients, améliorez votre image, soyez visible en ligne avec notre agence digitale locale.',
    CTATextBtn: 'Lancez votre projet web à Palaiseau',
    metaTitle:
      'Agence web à Palaiseau (Essonne) – Création de site internet, SEO, refonte',
    metaDescription:
      'Ikovaline, votre agence web à Palaiseau : création de sites internet, SEO local, refonte de site, web marketing et accompagnement sur-mesure pour les pros en Essonne.',
  },
  {
    id: 'agence-web-corbeil-essonnes',
    ville: 'Corbeil-Essonnes',
    departement: 'Essonne',

    intro: `Découvrez notre agence web à Corbeil-Essonnes, spécialisée dans la création de sites internet. Nous accompagnons les entreprises et indépendants de Corbeil-Essonnes et du sud de l'Essonne dans le développement de leur présence en ligne grâce à nos services personnalisés : création de site web, référencement, maintenance, etc.`,
    text1: (
      <span>
        Vous êtes une entreprise située à{' '}
        <Link href="/agence-web-corbeil-essonnes">Corbeil-Essonnes</Link> ou
        dans les environs (Essonne) ? Notre agence web locale est prête à
        renforcer votre visibilité en ligne. De la{' '}
        <Link href="nos-services/creation-sites-web-vitrine-e-commerce">
          création de site vitrine
        </Link>{' '}
        à l’
        <Link href="nos-services/seo-referencement-naturel">
          optimisation SEO
        </Link>
        , nous vous aidons à développer efficacement votre activité sur internet
        à Corbeil-Essonnes.
      </span>
    ),
    services: [
      {
        text: 'Création de sites web',
        subtext:
          'Créer un site internet vitrine, e-commerce ou sur-mesure, et développez votre image en ligne grâce à notre agence web basée à Corbeil-Essonnes, en Essonne.',
        link: 'nos-services/creation-sites-web-vitrine-e-commerce',
      },
      {
        text: 'Référencement SEO',
        subtext:
          'Optimisez votre positionnement pour attirer davantage de visiteurs à Corbeil-Essonnes et dans la région.',
        link: 'nos-services/seo-referencement-naturel',
      },
      {
        text: 'Maintenance et support',
        subtext:
          'Maintenance, mises à jour et support 24/7 pour votre site web : notre agence assure son bon fonctionnement.',
        link: 'nos-services/creation-site-web-sur-mesure',
      },
      {
        text: 'Web marketing',
        subtext:
          'Boostez votre visibilité en ligne avec nos campagnes SEA, annonces sur réseaux sociaux, contenu marketing et emailing.',
        link: 'nos-services/gestion-campagnes-sea',
      },
    ],
    objectifs: {
      objectifTitle: 'Objectif de notre agence web à Corbeil-Essonnes',
      text1: `Notre objectif est de vous accompagner du début à la fin de votre projet digital, en vous proposant une stratégie sur mesure pour votre entreprise, comme la création ou la refonte de votre site internet à Corbeil-Essonnes. Nous proposons un service global, de la conception du site à sa maintenance opérationnelle, partout en Essonne.`,
      text2: `Grâce à notre expertise en création de site web et en stratégie digitale (SEO, SEA, etc.), nous vous garantissons des résultats mesurables. Notre agence web locale, implantée à Corbeil-Essonnes et active dans tout le sud de l'Essonne, vous accompagne avec un support disponible 24h/24. Si les résultats ne sont pas à la hauteur de vos attentes, vous êtes remboursé.`,
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
        Nous intervenons également partout en Essonne et aux alentours pour la
        création de sites web, que ce soit à{' '}
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
        afin d’accompagner les entreprises et indépendants dans leur stratégie
        de présence en ligne.
      </span>
    ),
    CTATitle: 'Passez à l’action maintenant !',
    CTADesc:
      'Attirez plus de clients, augmentez vos ventes, développez votre notoriété. Avec Ikovaline, c’est possible à Corbeil-Essonnes.',
    CTATextBtn: 'Lancez votre projet',
    metaTitle:
      'Agence web à Corbeil-Essonnes - Création de site web, SEO, marketing digital',
    metaDescription:
      'Boostez votre entreprise à Corbeil-Essonnes avec une agence web locale : création de site internet, référencement SEO, webmarketing, accompagnement sur-mesure.',
  },
  {
    id: 'agence-web-savigny-sur-orge',
    ville: 'Savigny-sur-Orge',
    departement: 'Essonne',

    intro: `Vous cherchez une agence web à Savigny-sur-Orge pour créer votre site internet ou améliorer votre visibilité en ligne ? Ikovaline est spécialisée dans la création de sites web à Savigny-sur-Orge, la refonte de site vitrine ou e-commerce, et le référencement SEO local. Nous accompagnons les professionnels et indépendants en Essonne dans leur transition digitale.`,
    text1: (
      <span>
        Notre <strong>agence web à Savigny-sur-Orge</strong> vous propose des
        solutions performantes et sur-mesure. Que vous ayez besoin d’un site
        vitrine, d’un e-commerce ou d’un site sur-mesure, notre équipe est là
        pour vous. De la{' '}
        <Link href="nos-services/creation-sites-web-vitrine-e-commerce">
          création de site internet
        </Link>{' '}
        à la{' '}
        <Link href="nos-services/seo-referencement-naturel">refonte SEO</Link>,
        nous accompagnons votre développement digital à Savigny-sur-Orge et dans
        toute l’Essonne.
      </span>
    ),
    services: [
      {
        text: 'Création de sites web',
        subtext:
          'Confiez la création de votre site vitrine ou e-commerce à notre agence web à Savigny-sur-Orge. Un design moderne, une navigation fluide, et un site pensé pour Google.',
        link: 'nos-services/creation-sites-web-vitrine-e-commerce',
      },
      {
        text: 'Référencement SEO',
        subtext:
          'Améliorez votre visibilité locale à Savigny-sur-Orge avec une stratégie SEO ciblée : optimisation technique, rédaction web, netlinking, etc.',
        link: 'nos-services/seo-referencement-naturel',
      },
      {
        text: 'Maintenance et support',
        subtext:
          'Gardez votre site à jour, sécurisé et performant grâce à notre service de maintenance continue à Savigny-sur-Orge.',
        link: 'nos-services/creation-site-web-sur-mesure',
      },
      {
        text: 'Web marketing',
        subtext:
          'Développez votre notoriété à Savigny-sur-Orge avec des campagnes Google Ads, gestion des réseaux sociaux, stratégie de contenu, newsletters, etc.',
        link: 'nos-services/gestion-campagnes-sea',
      },
    ],
    objectifs: {
      objectifTitle:
        'Notre mission à Savigny-sur-Orge : faire de votre site web un levier de croissance',
      text1: `Chez Ikovaline, notre agence web à Savigny-sur-Orge vous accompagne de la création de votre site internet jusqu’à son optimisation complète. Notre objectif est de mettre en place une stratégie digitale cohérente et efficace pour développer votre activité dans l’Essonne.`,
      text2: `Qu’il s’agisse de la création de site web à Savigny-sur-Orge, de la refonte d’un site existant, ou du référencement SEO local, nous assurons des résultats mesurables. Notre accompagnement est personnalisé, et si vous n’êtes pas satisfait, nous vous remboursons.`,
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
        Notre <strong>agence web à Savigny-sur-Orge</strong> intervient aussi
        dans les communes proches de l’Essonne comme{' '}
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
        pour aider les entreprises locales à réussir leur transition numérique.
      </span>
    ),
    CTATitle: 'Créons votre site internet à Savigny-sur-Orge dès maintenant !',
    CTADesc:
      'Faites confiance à notre agence web à Savigny-sur-Orge pour booster votre visibilité, générer plus de clients et réussir votre transformation digitale en Essonne.',
    CTATextBtn: 'Lancez votre projet web à Savigny-sur-Orge',
    metaTitle:
      'Agence web à Savigny-sur-Orge – Création de site internet, SEO Essonne',
    metaDescription:
      'Ikovaline, agence web à Savigny-sur-Orge : création de site internet, refonte de site vitrine, SEO local et marketing digital. Solutions sur-mesure pour entreprises en Essonne.',
  },
  {
    id: 'agence-web-sainte-genevieve-des-bois',
    ville: 'Sainte-Geneviève-des-Bois',
    departement: 'Essonne',

    intro: `Vous recherchez une agence web à Sainte-Geneviève-des-Bois pour créer un site internet professionnel ou refondre votre site existant ? Ikovaline accompagne les entreprises et indépendants de l’Essonne dans leur développement digital : création de site web, refonte, SEO local, web marketing, maintenance.`,
    text1: (
      <span>
        Notre <strong>agence web à Sainte-Geneviève-des-Bois</strong> propose
        des services sur-mesure pour booster votre présence en ligne. Que ce
        soit pour la{' '}
        <Link href="nos-services/creation-sites-web-vitrine-e-commerce">
          création d’un site internet
        </Link>{' '}
        moderne, une <strong>refonte de site web</strong> obsolète ou une
        stratégie de{' '}
        <Link href="nos-services/seo-referencement-naturel">
          référencement SEO
        </Link>{' '}
        local, nous sommes à vos côtés à Sainte-Geneviève-des-Bois et dans toute
        l’Essonne.
      </span>
    ),
    services: [
      {
        text: 'Création de sites web',
        subtext:
          'Notre agence web à Sainte-Geneviève-des-Bois conçoit des sites vitrines, e-commerce ou sur-mesure adaptés à votre activité locale et optimisés pour la conversion.',
        link: 'nos-services/creation-sites-web-vitrine-e-commerce',
      },
      {
        text: 'Référencement SEO',
        subtext:
          'Soyez visible localement à Sainte-Geneviève-des-Bois et dans tout l’Essonne grâce à une stratégie SEO efficace : mots-clés, contenu optimisé, netlinking, etc.',
        link: 'nos-services/seo-referencement-naturel',
      },
      {
        text: 'Maintenance et support',
        subtext:
          'Nous assurons la maintenance technique de votre site web, sa sécurité, ses mises à jour et un support réactif pour votre entreprise à Sainte-Geneviève-des-Bois.',
        link: 'nos-services/creation-site-web-sur-mesure',
      },
      {
        text: 'Web marketing',
        subtext:
          'Déployez une stratégie de webmarketing locale avec notre agence : publicité Google Ads, réseaux sociaux, stratégie de contenu et campagnes e-mailing.',
        link: 'nos-services/gestion-campagnes-sea',
      },
    ],
    objectifs: {
      objectifTitle:
        'Notre objectif à Sainte-Geneviève-des-Bois : faire de votre site web un outil rentable',
      text1: `Notre agence web à Sainte-Geneviève-des-Bois vous aide à créer un site internet efficace, visible, et aligné avec vos objectifs business. Nous vous accompagnons dans votre stratégie digitale en Essonne, de la conception à la maintenance continue.`,
      text2: `Que vous souhaitiez créer un site web à Sainte-Geneviève-des-Bois, refondre un site existant ou améliorer votre SEO local, nous proposons un accompagnement sur-mesure et un suivi régulier. Et si les résultats ne sont pas au rendez-vous, nous vous remboursons.`,
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
        En plus de <strong>Sainte-Geneviève-des-Bois</strong>, notre{' '}
        <strong>agence web</strong> intervient dans les communes voisines comme{' '}
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
        afin d’aider les professionnels locaux à réussir leur présence en ligne.
      </span>
    ),
    CTATitle:
      'Vous avez un projet web à Sainte-Geneviève-des-Bois ? Contactez-nous !',
    CTADesc:
      'Création ou refonte de site internet, SEO local, stratégie web : notre agence vous accompagne à Sainte-Geneviève-des-Bois pour générer plus de clients.',
    CTATextBtn: 'Lancez votre projet à Sainte-Geneviève-des-Bois',
    metaTitle:
      'Agence web à Sainte-Geneviève-des-Bois – Création de site internet, SEO Essonne',
    metaDescription:
      'Ikovaline, agence web à Sainte-Geneviève-des-Bois : création de site internet, refonte, référencement SEO local, accompagnement digital pour entreprises en Essonne.',
  },
  {
    id: 'agence-web-viry-chatillon',
    ville: 'Viry-Châtillon',
    departement: 'Essonne',

    intro: `Vous êtes à la recherche d’une agence web à Viry-Châtillon pour créer un site internet professionnel, moderniser votre site actuel ou améliorer votre référencement local ? Ikovaline accompagne les entreprises et indépendants de l’Essonne dans leur stratégie digitale : création de site web, refonte, SEO, web marketing, maintenance.`,
    text1: (
      <span>
        Notre <strong>agence web à Viry-Châtillon</strong> est spécialisée dans
        la <strong>création de site internet</strong>, la{' '}
        <strong>refonte de site web</strong> et le{' '}
        <Link href="nos-services/seo-referencement-naturel">
          référencement SEO local
        </Link>
        . Nous accompagnons les commerçants, artisans, PME, associations et
        indépendants dans leur développement en ligne à Viry-Châtillon et
        partout en Essonne.
        <br />
        Que vous souhaitiez lancer un nouveau site ou repenser votre présence
        web, notre agence vous propose des solutions clés en main adaptées à vos
        objectifs.
      </span>
    ),
    services: [
      {
        text: 'Création de sites web',
        subtext:
          'Confiez à notre agence web la création de votre site vitrine ou e-commerce à Viry-Châtillon. Design sur-mesure, responsive, rapide et bien référencé.',
        link: 'nos-services/creation-sites-web-vitrine-e-commerce',
      },
      {
        text: 'Référencement SEO',
        subtext:
          'Attirez plus de visiteurs et de clients à Viry-Châtillon grâce à notre expertise en SEO local : contenu optimisé, technique, netlinking, Google My Business, etc.',
        link: 'nos-services/seo-referencement-naturel',
      },
      {
        text: 'Maintenance et support',
        subtext:
          'Notre agence web à Viry-Châtillon assure la maintenance de votre site internet : mises à jour, sécurité, sauvegardes et assistance rapide 7j/7.',
        link: 'nos-services/creation-site-web-sur-mesure',
      },
      {
        text: 'Web marketing',
        subtext:
          'Développez votre notoriété et générez des leads avec des campagnes Google Ads, réseaux sociaux, marketing de contenu et stratégie digitale sur-mesure.',
        link: 'nos-services/gestion-campagnes-sea',
      },
    ],
    objectifs: {
      objectifTitle:
        'Notre mission à Viry-Châtillon : vous aider à performer en ligne',
      text1: `Notre agence web à Viry-Châtillon vous accompagne à chaque étape de votre projet digital : conception du site, refonte, stratégie SEO, web marketing. Nous concevons des solutions sur-mesure pour faire de votre présence web un levier de croissance.`,
      text2: `Nous intervenons à Viry-Châtillon et dans tout le département de l’Essonne. Création de site internet, refonte de site web, référencement SEO : faites confiance à une agence locale réactive, experte et orientée résultats. Satisfaction garantie ou remboursée.`,
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
        Notre <strong>agence web à Viry-Châtillon</strong> intervient aussi dans
        les communes proches de l’Essonne comme{' '}
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
        pour aider les professionnels à réussir leur transformation digitale.
      </span>
    ),
    CTATitle: 'Lancez votre site internet à Viry-Châtillon avec Ikovaline !',
    CTADesc:
      'Profitez de notre expertise locale pour créer un site performant, référencé et aligné avec vos objectifs à Viry-Châtillon. Contactez notre agence web dès maintenant.',
    CTATextBtn: 'Démarrer mon projet à Viry-Châtillon',
    metaTitle:
      'Agence web à Viry-Châtillon – Création de site internet, SEO local (Essonne)',
    metaDescription:
      'Besoin d’un site web à Viry-Châtillon ? Ikovaline vous accompagne : création, refonte de site internet, SEO local, stratégie digitale, maintenance web en Essonne.',
  },
  {
    id: 'agence-web-athis-mons',
    ville: 'Athis-Mons',
    departement: 'Essonne',

    intro: `Vous avez besoin d’une agence web à Athis-Mons pour créer un site internet, refondre votre site existant ou améliorer votre visibilité sur Google ? Ikovaline accompagne les entreprises, commerçants et indépendants d’Athis-Mons et de l’Essonne dans leur stratégie digitale : création de site web, refonte, SEO local, web marketing.`,
    text1: (
      <span>
        Notre <strong>agence web à Athis-Mons</strong> est spécialisée dans la{' '}
        <strong>création de site internet</strong>, la{' '}
        <strong>refonte de site web</strong> et le{' '}
        <Link href="nos-services/seo-referencement-naturel">
          référencement naturel
        </Link>{' '}
        local. Nous accompagnons les professionnels de tous secteurs dans leur
        développement numérique à Athis-Mons, avec des solutions sur-mesure,
        adaptées aux enjeux locaux en Essonne.
        <br />
        De la conception à la mise en ligne, nous mettons en œuvre les
        meilleures pratiques UX, SEO et techniques pour maximiser les
        performances de votre site.
      </span>
    ),
    services: [
      {
        text: 'Création de sites web',
        subtext:
          'Création de site vitrine, e-commerce ou sur-mesure à Athis-Mons : design responsive, ergonomie optimisée, SEO-ready… pour un site performant dès le départ.',
        link: 'nos-services/creation-sites-web-vitrine-e-commerce',
      },
      {
        text: 'Référencement SEO',
        subtext:
          'Notre agence web améliore votre positionnement local à Athis-Mons sur Google grâce à une stratégie SEO complète : audit, contenu, technique et popularité.',
        link: 'nos-services/seo-referencement-naturel',
      },
      {
        text: 'Maintenance et support',
        subtext:
          'Assurez la stabilité et la sécurité de votre site web à Athis-Mons avec notre service de maintenance technique et de support réactif.',
        link: 'nos-services/creation-site-web-sur-mesure',
      },
      {
        text: 'Web marketing',
        subtext:
          'Publicité en ligne, stratégie de contenu, gestion des réseaux sociaux et emailings ciblés : développez votre activité avec notre agence web à Athis-Mons.',
        link: 'nos-services/gestion-campagnes-sea',
      },
    ],
    objectifs: {
      objectifTitle:
        'Notre mission à Athis-Mons : développer votre visibilité en ligne',
      text1: `Chez Ikovaline, notre agence web à Athis-Mons vous aide à créer un site web qui convertit : design sur-mesure, performance, référencement local, sécurité, marketing digital. Nous vous accompagnons de A à Z dans votre projet numérique en Essonne.`,
      text2: `Que vous soyez commerçant, artisan ou entrepreneur à Athis-Mons, nous vous proposons un accompagnement complet : création ou refonte de site, stratégie SEO, campagnes marketing. Notre engagement : des résultats mesurables ou vous êtes remboursé.`,
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
        Nous accompagnons les entreprises à Athis-Mons mais aussi dans les
        villes voisines comme{' '}
        {[
          'Savigny-sur-Orge',
          'Sainte-Geneviève-des-Bois',
          'Viry-Châtillon',
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
        pour vous aider à réussir votre projet digital dans toute l’Essonne.
      </span>
    ),
    CTATitle: 'Besoin d’un site internet à Athis-Mons ? Parlons-en !',
    CTADesc:
      'Notre agence web locale vous accompagne dans la création de votre site internet à Athis-Mons, l’optimisation SEO et votre stratégie digitale globale.',
    CTATextBtn: 'Lancer mon projet web à Athis-Mons',
    metaTitle:
      'Agence web à Athis-Mons – Création de site internet, SEO Essonne',
    metaDescription:
      'Ikovaline, agence web à Athis-Mons : création et refonte de site internet, SEO local, maintenance web et stratégie digitale complète. Présence en ligne optimisée en Essonne.',
  },
  {
    id: 'agence-web-draveil',
    departement: 'Essonne',

    ville: 'Draveil',
    intro: `À la recherche d’une agence web à Draveil pour créer ou refondre votre site internet ? Ikovaline vous accompagne dans tous vos projets digitaux : création de site vitrine ou e-commerce, refonte, SEO local, stratégie de visibilité, maintenance web. Basée en Essonne, notre agence digitale est proche de vos besoins.`,
    text1: (
      <span>
        Notre <strong>agence web à Draveil</strong> met à votre service son
        expertise pour concevoir un <strong>site internet</strong> performant,
        visible et rentable. Nous intervenons pour la{' '}
        <Link href="nos-services/creation-sites-web-vitrine-e-commerce">
          création de site web
        </Link>
        , la <strong>refonte de site existant</strong> et le{' '}
        <Link href="nos-services/seo-referencement-naturel">
          référencement SEO
        </Link>{' '}
        local à Draveil et dans l’ensemble de l’Essonne.
        <br />
        Professionnels, commerçants, artisans ou indépendants : notre agence
        vous propose des solutions sur-mesure adaptées à votre activité et à vos
        objectifs de croissance.
      </span>
    ),
    services: [
      {
        text: 'Création de sites web',
        subtext:
          'Notre agence web à Draveil conçoit des sites vitrines ou e-commerce modernes, responsives, rapides et optimisés pour le SEO. Un site qui vous ressemble et qui convertit.',
        link: 'nos-services/creation-sites-web-vitrine-e-commerce',
      },
      {
        text: 'Référencement SEO',
        subtext:
          'Soyez visible à Draveil et en Essonne grâce à notre stratégie SEO locale : analyse de mots-clés, contenus optimisés, SEO technique, netlinking, Google Business Profile.',
        link: 'nos-services/seo-referencement-naturel',
      },
      {
        text: 'Maintenance et support',
        subtext:
          'Nous assurons la maintenance et le support de votre site internet à Draveil : mises à jour, sécurité, surveillance, assistance, sauvegardes automatiques.',
        link: 'nos-services/creation-site-web-sur-mesure',
      },
      {
        text: 'Web marketing',
        subtext:
          'Développez votre notoriété à Draveil avec nos stratégies de webmarketing : Google Ads, réseaux sociaux, campagnes emailing, tunnel de conversion, reporting.',
        link: 'nos-services/gestion-campagnes-sea',
      },
    ],
    objectifs: {
      objectifTitle:
        'Notre mission à Draveil : booster votre présence en ligne',
      text1: `Notre agence web à Draveil vous accompagne dans toutes les étapes de votre projet digital : définition de vos besoins, création ou refonte de site, référencement SEO, marketing digital. Nous construisons une présence en ligne durable et performante pour votre activité.`,
      text2: `Nous intervenons à Draveil et dans toutes les villes d’Essonne pour des projets sur-mesure, adaptés à vos objectifs et à votre marché local. Et parce que nous croyons en l’efficacité de notre méthode, nous vous remboursons si vous n’êtes pas satisfait.`,
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
        Notre <strong>agence web à Draveil</strong> intervient aussi dans les
        communes voisines comme{' '}
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
        afin d’aider les entrepreneurs locaux à réussir leur projet web.
      </span>
    ),
    CTATitle:
      'Vous avez un projet à Draveil ? Créons votre site dès aujourd’hui',
    CTADesc:
      'Notre agence web à Draveil est là pour créer ou refondre votre site internet, améliorer votre SEO local et construire une stratégie digitale performante.',
    CTATextBtn: 'Démarrer mon projet web à Draveil',
    metaTitle:
      'Agence web à Draveil – Création de site internet, SEO, refonte en Essonne',
    metaDescription:
      'Ikovaline, votre agence web à Draveil : création de site vitrine ou e-commerce, refonte de site internet, stratégie SEO locale et web marketing en Essonne.',
  },
];
