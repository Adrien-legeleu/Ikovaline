import { removeAccents } from "@/components/pageSatellite/CityAround";
import Link from "next/link";

export const dataAgence = [
  {
    id: "agence-web-massy",
    ville: "Massy",
    intro: `Découvrez notre agence web spécialisée dans la création de sites internet à Massy. Nous aidons les entreprises ou indépendants à se développer en ligne grâce à des solutions concrètes : création de site web, référencement SEO, maintenance, et plus encore.`,
    text1: (
      <span>
        Vous êtes une entreprise située à{" "}
        <Link href="/agence-web-massy">Massy</Link> ou dans les environs
        (Essonne , Seine-et-Marne Val d&apos;Oise, Paris ...) ? Nous mettons
        notre expertise au service de votre visibilité en ligne. De la{" "}
        <Link href="nos-services/creation-sites-web-vitrine-e-commerce">
          création de site vitrine
        </Link>{" "}
        à l’
        <Link href="nos-services/seo-referencement-naturel">audit SEO</Link>,
        notre agence web vous aide à vous développez en ligne efficacement à
        Massy.
      </span>
    ),
    services: [
      {
        text: "Création de sites web",
        subtext:
          "Créer un site internet vitrine, e-commerce ou sur-mesure, et développez votre image en ligne grâce à notre agence web basée à Massy , en Essonne.",
        link: "nos-services/creation-sites-web-vitrine-e-commerce",
      },
      {
        text: "Référencement SEO",
        subtext:
          "Gagnez en visibilité et obtenez du trafic en Essonne et partout en France, selon la stratégie adaptée à vos besoins.",
        link: "nos-services/seo-referencement-naturel",
      },
      {
        text: "Maintenance et support",
        subtext:
          "Support 24h/24, céation de site web et maintenance : bénéficiez d'un accompagnement complet avec notre agence web basée en essonne",
        link: "nos-services/creation-site-web-sur-mesure",
      },
      {
        text: "Web marketing",
        subtext:
          "Augmentez votre visibilité avec des campagnes publicitaires efficaces : publicité en ligne (Google Ads, réseaux sociaux), stratégie de contenu, email marketing et analyse des performances.",
        link: "nos-services/gestion-campagnes-sea",
      },
    ],
    objectifs: {
      objectifTitle: "Objectif de notre agence web à Massy",
      text1: `Notre objectif est de vous accompagner tout au long de votre projet, en vous proposant une stratégie adaptée à votre entreprise , comme la création ou la refonte de votre site internet à Massy. Nous mettons un point d'honneur à offir un service complet, allant de la création de site web à sa maintenance et son support, partout en Essonne`,
      text2: `Grâce à notre expertise en création de site web et en stratégie digitale tel que le SEO , SEA, etc,nous vous garantissons des résultats concrets. Notre agence web, implantée à Massy et active partout en Essonne vous accompagnes tout du long de ce projet avec un support 24h/24. Et si les résultats ne sont pas au rendez-vous, vous êtes remboursé.`,
    },
    villesVoisines: [
      "Bailly-Romainvilliers",
      "Massy",
      "Évry",
      "Verrières-le-Buisson",
      "Saclay",
      "Courcouronnes",
      "Villeneuve-Saint-Georges",
      "Yerres",
      "Marcoussis",
      "Vauhallan",
      "Wissous",
      "Palaiseau",
      "Corbeil-Essonnes",
    ],
    cityAroundText: (
      <span className="text-center">
        Nous intervenons également partout en Essonne et aux alentours pour la
        création de site web, que ce soit à{" "}
        {[
          "Bailly-Romainvilliers",
          "Massy",
          "Évry",
          "Verrières-le-Buisson",
          "Saclay",
          "Courcouronnes",
          "Villeneuve-Saint-Georges",
          "Yerres",
          "Marcoussis",
          "Vauhallan",
          "Wissous",
          "Palaiseau",
          "Corbeil-Essonnes",
        ].map((v, i, arr) => (
          <span key={v}>
            <Link href={`/agence-web-${removeAccents(v)}`}>{v}</Link>
            {i < arr.length - 2 ? ", " : i === arr.length - 2 ? " et " : ""}
          </span>
        ))}{" "}
        afin d’accompagner les entreprises et les indépendants dans leur
        stratégie de présence en ligne, quelle qu’elle soit.
      </span>
    ),
    CTATitle: "Passez à l’action maintenant !",
    CTADesc:
      "Attirez plus de clients, augmentez vos ventes, développez votre notoriété. Avec Ikovaline, c’est possible à Massy.",
    CTATextBtn: "Lancez votre projet",
    metaTitle:
      "Agence web à Massy - Création de site web, SEO, marketing digital",
    metaDescription:
      "Boostez votre entreprise à Massy avec une agence web locale : création de site internet, référencement SEO, webmarketing, accompagnement sur-mesure.",
  },
  {
    id: "agence-web-bailly-romainvilliers",
    ville: "Bailly-Romainvilliers",
    intro: `Découvrez notre agence web située à Bailly-Romainvilliers, spécialisée dans la création de sites internet. Nous accompagnons les entreprises et indépendants de la région pour développer leur présence en ligne grâce à des solutions concrètes : création de site web, référencement SEO, maintenance, etc.`,
    text1: (
      <span>
        Vous êtes une entreprise située à{" "}
        <Link href="/agence-web-bailly-romainvilliers">
          Bailly-Romainvilliers
        </Link>{" "}
        ou en Île-de-France ? Notre agence web locale met son expertise au
        service de votre visibilité en ligne. De la{" "}
        <Link href="nos-services/creation-sites-web-vitrine-e-commerce">
          création de site vitrine
        </Link>{" "}
        à l’
        <Link href="nos-services/seo-referencement-naturel">
          optimisation SEO
        </Link>
        , nous vous aidons à développer efficacement votre activité en ligne à
        Bailly-Romainvilliers.
      </span>
    ),
    services: [
      {
        text: "Création de sites web",
        subtext:
          "Créer un site internet vitrine, e-commerce ou sur-mesure, et améliorez votre image en ligne grâce à notre agence web basée à Bailly-Romainvilliers, en Île-de-France.",
        link: "nos-services/creation-sites-web-vitrine-e-commerce",
      },
      {
        text: "Référencement SEO",
        subtext:
          "Boostez votre visibilité locale et nationale avec un référencement naturel sur-mesure, pour attirer du trafic qualifié depuis l’Essonne et toute l’Île-de-France.",
        link: "nos-services/seo-referencement-naturel",
      },
      {
        text: "Maintenance et support",
        subtext:
          "Maintenance technique, support 24h/24 et assistance continue pour votre site web : notre agence locale à Bailly-Romainvilliers assure un suivi complet.",
        link: "nos-services/creation-site-web-sur-mesure",
      },
      {
        text: "Web marketing",
        subtext:
          "Augmentez votre notoriété avec nos campagnes publicitaires ciblées (Google Ads, réseaux sociaux), une stratégie de contenu pertinente et un email marketing efficace.",
        link: "nos-services/gestion-campagnes-sea",
      },
    ],
    objectifs: {
      objectifTitle: "Objectif de notre agence web à Bailly-Romainvilliers",
      text1: `Notre objectif est de vous accompagner de A à Z dans votre projet digital, en vous proposant une stratégie personnalisée pour votre entreprise, comme la création ou la refonte de votre site internet à Bailly-Romainvilliers. Nous proposons un service global, de la conception du site à sa maintenance opérationnelle, partout en Essonne.`,
      text2: `Grâce à notre expertise en développement de site web et en stratégie digitale (SEO, SEA, etc.), nous garantissons des résultats concrets. Notre agence web locale, implantée à Bailly-Romainvilliers et active dans toute l’Essonne, vous suit de près avec un support 24h/24. Et si les résultats ne sont pas au rendez-vous, nous vous remboursons.`,
    },
    villesVoisines: [
      "Bailly-Romainvilliers",
      "Massy",
      "Évry",
      "Verrières-le-Buisson",
      "Saclay",
      "Courcouronnes",
      "Villeneuve-Saint-Georges",
      "Yerres",
      "Marcoussis",
      "Vauhallan",
      "Wissous",
      "Palaiseau",
      "Corbeil-Essonnes",
    ],
    cityAroundText: (
      <span className="text-center">
        Nous intervenons également en Île-de-France, notamment en Essonne et ses
        alentours pour la création de sites web, que ce soit à{" "}
        {[
          "Bailly-Romainvilliers",
          "Massy",
          "Évry",
          "Verrières-le-Buisson",
          "Saclay",
          "Courcouronnes",
          "Villeneuve-Saint-Georges",
          "Yerres",
          "Marcoussis",
          "Vauhallan",
          "Wissous",
          "Palaiseau",
          "Corbeil-Essonnes",
        ].map((v, i, arr) => (
          <span key={v}>
            <Link href={`/agence-web-${removeAccents(v)}`}>{v}</Link>
            {i < arr.length - 2 ? ", " : i === arr.length - 2 ? " et " : ""}
          </span>
        ))}{" "}
        afin d’accompagner les entreprises et indépendants dans leur stratégie
        de présence en ligne.
      </span>
    ),
    CTATitle: "Passez à l’action maintenant !",
    CTADesc:
      "Attirez plus de clients, augmentez vos ventes, développez votre notoriété. Avec Ikovaline, c’est possible à Bailly-Romainvilliers.",
    CTATextBtn: "Lancez votre projet",
    metaTitle:
      "Agence web à Bailly-Romainvilliers - Création de site web, SEO, marketing digital",
    metaDescription:
      "Boostez votre entreprise à Bailly-Romainvilliers avec une agence web locale : création de site internet, référencement SEO, webmarketing, accompagnement sur-mesure.",
  },
  {
    id: "agence-web-evry",
    ville: "Évry",
    intro: `Découvrez notre agence web basée à Évry, spécialisée dans la création de sites internet. Nous aidons les entreprises et indépendants d'Évry et de l'Essonne à développer leur activité en ligne grâce à des solutions concrètes : création de site web, référencement naturel, maintenance, etc.`,
    text1: (
      <span>
        Vous êtes une entreprise située à{" "}
        <Link href="/agence-web-evry">Évry</Link> ou dans l’Essonne ? Notre
        agence web locale vous aide à renforcer votre visibilité en ligne. De la{" "}
        <Link href="nos-services/creation-sites-web-vitrine-e-commerce">
          création de site vitrine
        </Link>{" "}
        à l’<Link href="nos-services/seo-referencement-naturel">audit SEO</Link>
        , nous vous aidons à développer efficacement votre présence sur le web à
        Évry.
      </span>
    ),
    services: [
      {
        text: "Création de sites web",
        subtext:
          "Créer un site internet vitrine, e-commerce ou sur-mesure, et développez votre image en ligne grâce à notre agence web basée à Évry, en Essonne.",
        link: "nos-services/creation-sites-web-vitrine-e-commerce",
      },
      {
        text: "Référencement SEO",
        subtext:
          "Boostez votre visibilité et attirez du trafic qualifié à Évry, en Essonne et au-delà, grâce à notre stratégie SEO locale.",
        link: "nos-services/seo-referencement-naturel",
      },
      {
        text: "Maintenance et support",
        subtext:
          "Assurez la performance de votre site web avec notre maintenance dédiée et un support continu depuis notre agence à Évry.",
        link: "nos-services/creation-site-web-sur-mesure",
      },
      {
        text: "Web marketing",
        subtext:
          "Promevez votre marque localement et nationalement avec nos campagnes Google Ads, social media, stratégie de contenu et emailings ciblés.",
        link: "nos-services/gestion-campagnes-sea",
      },
    ],
    objectifs: {
      objectifTitle: "Objectif de notre agence web à Évry",
      text1: `Notre objectif est de vous accompagner tout au long de votre projet, en vous proposant une stratégie sur-mesure pour votre entreprise, que ce soit la création ou la refonte de votre site internet à Évry. Nous garantissons un accompagnement complet, de la conception du site à sa maintenance, partout en Essonne.`,
      text2: `Grâce à notre expertise en développement web et en marketing digital (SEO, SEA, etc.), nous vous assurons des résultats mesurables. Notre agence web locale, implantée à Évry et active dans tout l'Essonne, vous accompagne avec un support 24h/24. Si les résultats ne sont pas au rendez-vous, nous vous remboursons.`,
    },
    villesVoisines: [
      "Bailly-Romainvilliers",
      "Massy",
      "Évry",
      "Verrières-le-Buisson",
      "Saclay",
      "Courcouronnes",
      "Villeneuve-Saint-Georges",
      "Yerres",
      "Marcoussis",
      "Vauhallan",
      "Wissous",
      "Palaiseau",
      "Corbeil-Essonnes",
    ],
    cityAroundText: (
      <span className="text-center">
        Nous intervenons également partout en Essonne et aux alentours pour la
        création de sites web, que ce soit à{" "}
        {[
          "Bailly-Romainvilliers",
          "Massy",
          "Évry",
          "Verrières-le-Buisson",
          "Saclay",
          "Courcouronnes",
          "Villeneuve-Saint-Georges",
          "Yerres",
          "Marcoussis",
          "Vauhallan",
          "Wissous",
          "Palaiseau",
          "Corbeil-Essonnes",
        ].map((v, i, arr) => (
          <span key={v}>
            <Link href={`/agence-web-${removeAccents(v)}`}>{v}</Link>
            {i < arr.length - 2 ? ", " : i === arr.length - 2 ? " et " : ""}
          </span>
        ))}{" "}
        afin d’accompagner les entreprises et indépendants dans leur stratégie
        de présence en ligne.
      </span>
    ),
    CTATitle: "Passez à l’action maintenant !",
    CTADesc:
      "Attirez plus de clients, augmentez vos ventes, développez votre notoriété. Avec Ikovaline, c’est possible à Évry.",
    CTATextBtn: "Lancez votre projet",
    metaTitle:
      "Agence web à Évry - Création de site web, SEO, marketing digital",
    metaDescription:
      "Boostez votre entreprise à Évry avec une agence web locale : création de site internet, référencement SEO, webmarketing, accompagnement sur-mesure.",
  },
  {
    id: "agence-web-verrieres-le-buisson",
    ville: "Verrières-le-Buisson",
    intro: `Découvrez notre agence web à Verrières-le-Buisson, spécialisée dans la création de sites internet. Nous accompagnons les entreprises et indépendants de Verrières-le-Buisson et de l'Essonne environnante pour développer leur visibilité en ligne grâce à des solutions concrètes : création de site web, SEO, maintenance, etc.`,
    text1: (
      <span>
        Vous êtes une entreprise située à{" "}
        <Link href="/agence-web-verriere-le-buisson">Verrières-le-Buisson</Link>{" "}
        ou dans les environs ? Notre agence web locale est là pour booster votre
        visibilité en ligne. De la{" "}
        <Link href="nos-services/creation-sites-web-vitrine-e-commerce">
          création de site vitrine
        </Link>{" "}
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
        text: "Création de sites web",
        subtext:
          "Créer un site internet vitrine, e-commerce ou sur-mesure, et développez votre image en ligne grâce à notre agence web basée à Verrières-le-Buisson, en Essonne.",
        link: "nos-services/creation-sites-web-vitrine-e-commerce",
      },
      {
        text: "Référencement SEO",
        subtext:
          "Augmentez votre visibilité en Essonne et au-delà avec un référencement naturel adapté à votre activité.",
        link: "nos-services/seo-referencement-naturel",
      },
      {
        text: "Maintenance et support",
        subtext:
          "Maintenance, mises à jour et support continu pour votre site web : notre équipe implantée à Verrières-le-Buisson vous accompagne.",
        link: "nos-services/creation-site-web-sur-mesure",
      },
      {
        text: "Web marketing",
        subtext:
          "Boostez votre communication en ligne avec nos campagnes publicitaires efficaces, le community management et la stratégie de contenu.",
        link: "nos-services/gestion-campagnes-sea",
      },
    ],
    objectifs: {
      objectifTitle: "Objectif de notre agence web à Verrières-le-Buisson",
      text1: `Notre objectif est de vous accompagner à chaque étape de votre projet digital, en proposant une stratégie personnalisée à votre entreprise, qu’il s’agisse de la création ou de la refonte de votre site internet à Verrières-le-Buisson. Nous offrons un service complet, de la conception du site à sa maintenance, partout en Essonne.`,
      text2: `Grâce à notre expertise en création de site web et en stratégies digitales (SEO, SEA, etc.), nous nous engageons à vous fournir des résultats concrets. Notre agence web, implantée à Verrières-le-Buisson et active dans toute l’Essonne, vous soutient avec un support disponible 24h/24. Si les résultats ne répondent pas à vos attentes, nous vous remboursons.`,
    },
    villesVoisines: [
      "Bailly-Romainvilliers",
      "Massy",
      "Évry",
      "Verrières-le-Buisson",
      "Saclay",
      "Courcouronnes",
      "Villeneuve-Saint-Georges",
      "Yerres",
      "Marcoussis",
      "Vauhallan",
      "Wissous",
      "Palaiseau",
      "Corbeil-Essonnes",
    ],
    cityAroundText: (
      <span className="text-center">
        Notre équipe se déplace aussi dans toute l'Essonne et les environs pour
        la création de sites web, que ce soit à{" "}
        {[
          "Bailly-Romainvilliers",
          "Massy",
          "Évry",
          "Verrières-le-Buisson",
          "Saclay",
          "Courcouronnes",
          "Villeneuve-Saint-Georges",
          "Yerres",
          "Marcoussis",
          "Vauhallan",
          "Wissous",
          "Palaiseau",
          "Corbeil-Essonnes",
        ].map((v, i, arr) => (
          <span key={v}>
            <Link href={`/agence-web-${removeAccents(v)}`}>{v}</Link>
            {i < arr.length - 2 ? ", " : i === arr.length - 2 ? " et " : ""}
          </span>
        ))}{" "}
        afin d’accompagner les entreprises et indépendants dans leur stratégie
        de présence en ligne.
      </span>
    ),
    CTATitle: "Passez à l’action maintenant !",
    CTADesc:
      "Attirez plus de clients, augmentez vos ventes, développez votre notoriété. Avec Ikovaline, c’est possible à Verrières-le-Buisson.",
    CTATextBtn: "Lancez votre projet",
    metaTitle:
      "Agence web à Verrières-le-Buisson - Création de site web, SEO, marketing digital",
    metaDescription:
      "Boostez votre entreprise à Verrières-le-Buisson avec une agence web locale : création de site internet, référencement SEO, webmarketing, accompagnement sur-mesure.",
  },
  {
    id: "agence-web-saclay",
    ville: "Saclay",
    intro: `Découvrez notre agence web sur le plateau de Saclay, spécialisée dans la création de sites web. Nous aidons les entreprises et indépendants de Saclay et du nord de l'Essonne à développer leur présence en ligne grâce à des solutions performantes : création de site web, référencement naturel, maintenance, etc.`,
    text1: (
      <span>
        Vous êtes une entreprise située à{" "}
        <Link href="/agence-web-saclay">Saclay</Link> ou dans les communes
        environnantes ? Notre agence web locale est là pour renforcer votre
        visibilité en ligne. De la{" "}
        <Link href="nos-services/creation-sites-web-vitrine-e-commerce">
          création de site vitrine
        </Link>{" "}
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
        text: "Création de sites web",
        subtext:
          "Créer un site internet vitrine, e-commerce ou sur-mesure, et développez votre image en ligne grâce à notre agence web basée à Saclay, en Essonne.",
        link: "nos-services/creation-sites-web-vitrine-e-commerce",
      },
      {
        text: "Référencement SEO",
        subtext:
          "Gagnez en visibilité sur Google et attirez du trafic ciblé à Saclay et en Essonne grâce à notre stratégie SEO locale.",
        link: "nos-services/seo-referencement-naturel",
      },
      {
        text: "Maintenance et support",
        subtext:
          "Maintenance technique et support continu pour votre site web : notre agence locale assure un suivi permanent de vos projets.",
        link: "nos-services/creation-site-web-sur-mesure",
      },
      {
        text: "Web marketing",
        subtext:
          "Accélérez votre croissance avec nos campagnes SEA, publicités sur réseaux sociaux, contenu digital et analyse de performances.",
        link: "nos-services/gestion-campagnes-sea",
      },
    ],
    objectifs: {
      objectifTitle: "Objectif de notre agence web à Saclay",
      text1: `Notre objectif est de vous accompagner à chaque étape de votre projet digital en proposant une stratégie sur mesure pour votre entreprise, qu'il s'agisse de la création ou de la refonte de votre site internet à Saclay. Nous mettons tout en œuvre pour offrir un service global, de la conception du site à sa maintenance, partout en Essonne.`,
      text2: `Forte de son expertise en création de site web et en marketing digital (SEO, SEA, etc.), notre agence vous garantit des résultats tangibles. Implantée à Saclay et active dans tout l'Essonne, notre équipe vous accompagne avec un support disponible 24h/24. Et si les résultats sont en deçà de vos attentes, vous êtes remboursé.`,
    },
    villesVoisines: [
      "Bailly-Romainvilliers",
      "Massy",
      "Évry",
      "Verrières-le-Buisson",
      "Saclay",
      "Courcouronnes",
      "Villeneuve-Saint-Georges",
      "Yerres",
      "Marcoussis",
      "Vauhallan",
      "Wissous",
      "Palaiseau",
      "Corbeil-Essonnes",
    ],
    cityAroundText: (
      <span className="text-center">
        Nous intervenons également partout en Essonne et aux alentours pour la
        création de sites web, que ce soit à{" "}
        {[
          "Bailly-Romainvilliers",
          "Massy",
          "Évry",
          "Verrières-le-Buisson",
          "Saclay",
          "Courcouronnes",
          "Villeneuve-Saint-Georges",
          "Yerres",
          "Marcoussis",
          "Vauhallan",
          "Wissous",
          "Palaiseau",
          "Corbeil-Essonnes",
        ].map((v, i, arr) => (
          <span key={v}>
            <Link href={`/agence-web-${removeAccents(v)}`}>{v}</Link>
            {i < arr.length - 2 ? ", " : i === arr.length - 2 ? " et " : ""}
          </span>
        ))}{" "}
        afin d’accompagner les entreprises et indépendants dans leur stratégie
        de présence en ligne.
      </span>
    ),
    CTATitle: "Passez à l’action maintenant !",
    CTADesc:
      "Attirez plus de clients, augmentez vos ventes, développez votre notoriété. Avec Ikovaline, c’est possible à Saclay.",
    CTATextBtn: "Lancez votre projet",
    metaTitle:
      "Agence web à Saclay - Création de site web, SEO, marketing digital",
    metaDescription:
      "Boostez votre entreprise à Saclay avec une agence web locale : création de site internet, référencement SEO, webmarketing, accompagnement sur-mesure.",
  },
  {
    id: "agence-web-courcouronnes",
    ville: "Courcouronnes",
    intro: `Découvrez notre agence web à Courcouronnes, spécialisée dans la création de sites internet sur mesure. Nous accompagnons les entreprises et indépendants de Courcouronnes et de l'Essonne pour booster leur activité en ligne grâce à des services digitaux : création de site web, référencement, maintenance, etc.`,
    text1: (
      <span>
        Vous êtes une entreprise située à{" "}
        <Link href="/agence-web-courcouronnes">Courcouronnes</Link> ou dans les
        environs (Évry, Essonne) ? Notre équipe est à votre service pour
        améliorer votre visibilité en ligne. De la{" "}
        <Link href="nos-services/creation-sites-web-vitrine-e-commerce">
          création de site vitrine
        </Link>{" "}
        à l'<Link href="nos-services/seo-referencement-naturel">audit SEO</Link>
        , nous vous aidons à développer efficacement votre présence sur le web à
        Courcouronnes.
      </span>
    ),
    services: [
      {
        text: "Création de sites web",
        subtext:
          "Créer un site internet vitrine, e-commerce ou sur-mesure, et développez votre image en ligne grâce à notre agence web basée à Courcouronnes, en Essonne.",
        link: "nos-services/creation-sites-web-vitrine-e-commerce",
      },
      {
        text: "Référencement SEO",
        subtext:
          "Optimisez votre référencement pour attirer des visiteurs qualifiés à Courcouronnes et dans tout le département.",
        link: "nos-services/seo-referencement-naturel",
      },
      {
        text: "Maintenance et support",
        subtext:
          "Maintenance continue et support pour votre site internet : notre agence basée en Essonne veille à son bon fonctionnement et sa sécurité.",
        link: "nos-services/creation-site-web-sur-mesure",
      },
      {
        text: "Web marketing",
        subtext:
          "Dynamisez votre marketing en ligne avec nos campagnes publicitaires (SEA), gestion des réseaux sociaux et campagnes e-mailing personnalisées.",
        link: "nos-services/gestion-campagnes-sea",
      },
    ],
    objectifs: {
      objectifTitle: "Objectif de notre agence web à Courcouronnes",
      text1: `Notre objectif est de vous accompagner tout au long de votre projet digital, en vous proposant une stratégie adaptée à votre entreprise, par exemple la création ou la refonte de votre site internet à Courcouronnes. Nous proposons un service global, de la conception du site à sa maintenance, partout en Essonne.`,
      text2: `Avec notre expertise en développement web et marketing digital (SEO, SEA, etc.), nous vous garantissons des résultats mesurables. Notre agence web, implantée à Courcouronnes et active dans toute l'Essonne, vous suit de près avec un support 24h/24. Si les résultats ne sont pas au rendez-vous, nous vous remboursons.`,
    },
    villesVoisines: [
      "Bailly-Romainvilliers",
      "Massy",
      "Évry",
      "Verrières-le-Buisson",
      "Saclay",
      "Courcouronnes",
      "Villeneuve-Saint-Georges",
      "Yerres",
      "Marcoussis",
      "Vauhallan",
      "Wissous",
      "Palaiseau",
      "Corbeil-Essonnes",
    ],
    cityAroundText: (
      <span className="text-center">
        Nous intervenons également partout en Essonne et aux alentours pour la
        création de sites web, que ce soit à{" "}
        {[
          "Bailly-Romainvilliers",
          "Massy",
          "Évry",
          "Verrières-le-Buisson",
          "Saclay",
          "Courcouronnes",
          "Villeneuve-Saint-Georges",
          "Yerres",
          "Marcoussis",
          "Vauhallan",
          "Wissous",
          "Palaiseau",
          "Corbeil-Essonnes",
        ].map((v, i, arr) => (
          <span key={v}>
            <Link href={`/agence-web-${removeAccents(v)}`}>{v}</Link>
            {i < arr.length - 2 ? ", " : i === arr.length - 2 ? " et " : ""}
          </span>
        ))}{" "}
        afin d’accompagner les entreprises et indépendants dans leur stratégie
        de présence en ligne.
      </span>
    ),
    CTATitle: "Passez à l’action maintenant !",
    CTADesc:
      "Attirez plus de clients, augmentez vos ventes, développez votre notoriété. Avec Ikovaline, c’est possible à Courcouronnes.",
    CTATextBtn: "Lancez votre projet",
    metaTitle:
      "Agence web à Courcouronnes - Création de site web, SEO, marketing digital",
    metaDescription:
      "Boostez votre entreprise à Courcouronnes avec une agence web locale : création de site internet, référencement SEO, webmarketing, accompagnement sur-mesure.",
  },
  {
    id: "agence-web-villeneuve-saint-georges",
    ville: "Villeneuve-Saint-Georges",
    intro: `Découvrez notre agence web à Villeneuve-Saint-Georges, spécialisée dans la création de sites internet professionnels. Nous accompagnons les entreprises et indépendants de Villeneuve-Saint-Georges et des communes voisines pour développer leur présence en ligne via des solutions sur mesure : création de site web, référencement, maintenance, etc.`,
    text1: (
      <span>
        Vous êtes une entreprise située à{" "}
        <Link href="/agence-web-villeneuve-saint-georges">
          Villeneuve-Saint-Georges
        </Link>{" "}
        ou dans les communes voisines ? Notre agence web locale est là pour
        booster votre visibilité en ligne. De la{" "}
        <Link href="nos-services/creation-sites-web-vitrine-e-commerce">
          création de site vitrine
        </Link>{" "}
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
        text: "Création de sites web",
        subtext:
          "Créer un site internet vitrine, e-commerce ou sur-mesure, et développez votre image en ligne grâce à notre agence web basée à Villeneuve-Saint-Georges, en Île-de-France.",
        link: "nos-services/creation-sites-web-vitrine-e-commerce",
      },
      {
        text: "Référencement SEO",
        subtext:
          "Renforcez votre visibilité locale et nationale grâce à un référencement optimisé pour toucher plus de clients.",
        link: "nos-services/seo-referencement-naturel",
      },
      {
        text: "Maintenance et support",
        subtext:
          "Maintenance et support 24h/24 pour votre site web : notre agence assure un service de qualité et une disponibilité permanente.",
        link: "nos-services/creation-site-web-sur-mesure",
      },
      {
        text: "Web marketing",
        subtext:
          "Maximisez votre audience avec nos campagnes publicitaires en ligne (Google Ads, réseaux sociaux), votre stratégie de contenu et votre campagne e-mailing.",
        link: "nos-services/gestion-campagnes-sea",
      },
    ],
    objectifs: {
      objectifTitle: "Objectif de notre agence web à Villeneuve-Saint-Georges",
      text1: `Notre objectif est de vous accompagner dans chaque étape de votre projet digital, en proposant une stratégie adaptée à votre entreprise, comme la création ou la refonte de votre site internet à Villeneuve-Saint-Georges. Nous proposons un accompagnement complet, de la conception du site à son exploitation continue, partout en Essonne.`,
      text2: `Grâce à notre expertise en création de site internet et en stratégie digitale (SEO, SEA, etc.), nous vous garantissons un retour sur investissement concret. Implantée à Villeneuve-Saint-Georges et active dans toute l'Île-de-France, notre agence vous soutient avec un support disponible 24h/24. Et si les résultats ne sont pas au rendez-vous, nous assurons un remboursement.`,
    },
    villesVoisines: [
      "Bailly-Romainvilliers",
      "Massy",
      "Évry",
      "Verrières-le-Buisson",
      "Saclay",
      "Courcouronnes",
      "Villeneuve-Saint-Georges",
      "Yerres",
      "Marcoussis",
      "Vauhallan",
      "Wissous",
      "Palaiseau",
      "Corbeil-Essonnes",
    ],
    cityAroundText: (
      <span className="text-center">
        Nous intervenons également partout en Essonne et aux alentours pour la
        création de sites web, que ce soit à{" "}
        {[
          "Bailly-Romainvilliers",
          "Massy",
          "Évry",
          "Verrières-le-Buisson",
          "Saclay",
          "Courcouronnes",
          "Villeneuve-Saint-Georges",
          "Yerres",
          "Marcoussis",
          "Vauhallan",
          "Wissous",
          "Palaiseau",
          "Corbeil-Essonnes",
        ].map((v, i, arr) => (
          <span key={v}>
            <Link href={`/agence-web-${removeAccents(v)}`}>{v}</Link>
            {i < arr.length - 2 ? ", " : i === arr.length - 2 ? " et " : ""}
          </span>
        ))}{" "}
        afin d’accompagner les entreprises et indépendants dans leur stratégie
        de présence en ligne.
      </span>
    ),
    CTATitle: "Passez à l’action maintenant !",
    CTADesc:
      "Attirez plus de clients, augmentez vos ventes, développez votre notoriété. Avec Ikovaline, c’est possible à Villeneuve-Saint-Georges.",
    CTATextBtn: "Lancez votre projet",
    metaTitle:
      "Agence web à Villeneuve-Saint-Georges - Création de site web, SEO, marketing digital",
    metaDescription:
      "Boostez votre entreprise à Villeneuve-Saint-Georges avec une agence web locale : création de site internet, référencement SEO, webmarketing, accompagnement sur-mesure.",
  },
  {
    id: "agence-web-yerres",
    ville: "Yerres",
    intro: `Découvrez notre agence web à Yerres, spécialisée dans la création de sites internet sur mesure. Nous aidons les entreprises et indépendants de Yerres (Essonne) et de ses environs à développer leur activité en ligne grâce à nos solutions concrètes : création de site web, SEO, maintenance, etc.`,
    text1: (
      <span>
        Vous êtes une entreprise située à{" "}
        <Link href="/agence-web-yerres">Yerres</Link> ou dans les communes
        voisines ? Notre agence web locale est à votre disposition pour
        améliorer votre visibilité en ligne. De la{" "}
        <Link href="nos-services/creation-sites-web-vitrine-e-commerce">
          création de site vitrine
        </Link>{" "}
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
        text: "Création de sites web",
        subtext:
          "Créer un site internet vitrine, e-commerce ou sur-mesure, et développez votre image en ligne grâce à notre agence web basée à Yerres, en Essonne.",
        link: "nos-services/creation-sites-web-vitrine-e-commerce",
      },
      {
        text: "Référencement SEO",
        subtext:
          "Améliorez votre positionnement sur Google pour attirer plus de clients à Yerres et dans toute l’Île-de-France.",
        link: "nos-services/seo-referencement-naturel",
      },
      {
        text: "Maintenance et support",
        subtext:
          "Maintenance et support 24/7 pour votre site web : nous veillons à sa sécurité et à ses performances.",
        link: "nos-services/creation-site-web-sur-mesure",
      },
      {
        text: "Web marketing",
        subtext:
          "Renforcez votre présence en ligne avec des stratégies efficaces : campagnes SEA, community management et email marketing.",
        link: "nos-services/gestion-campagnes-sea",
      },
    ],
    objectifs: {
      objectifTitle: "Objectif de notre agence web à Yerres",
      text1: `Notre objectif est de vous accompagner à chaque étape de votre projet digital, en proposant une stratégie sur mesure pour votre entreprise, comme la création ou la refonte de votre site internet à Yerres. Nous proposons un suivi complet, de la conception du site à sa maintenance, partout en Essonne.`,
      text2: `Grâce à notre savoir-faire en développement web et en marketing digital (SEO, SEA, etc.), nous vous assurons des résultats concrets. Notre agence web locale, implantée à Yerres et active dans toute l’Essonne, vous guide et vous offre un support 24h/24. Si les résultats ne répondent pas à vos attentes, vous êtes remboursé.`,
    },
    villesVoisines: [
      "Bailly-Romainvilliers",
      "Massy",
      "Évry",
      "Verrières-le-Buisson",
      "Saclay",
      "Courcouronnes",
      "Villeneuve-Saint-Georges",
      "Yerres",
      "Marcoussis",
      "Vauhallan",
      "Wissous",
      "Palaiseau",
      "Corbeil-Essonnes",
    ],
    cityAroundText: (
      <span className="text-center">
        Notre agence propose ses services dans toute l'Essonne et ses environs
        pour la création de sites web, que ce soit à{" "}
        {[
          "Bailly-Romainvilliers",
          "Massy",
          "Évry",
          "Verrières-le-Buisson",
          "Saclay",
          "Courcouronnes",
          "Villeneuve-Saint-Georges",
          "Yerres",
          "Marcoussis",
          "Vauhallan",
          "Wissous",
          "Palaiseau",
          "Corbeil-Essonnes",
        ].map((v, i, arr) => (
          <span key={v}>
            <Link href={`/agence-web-${removeAccents(v)}`}>{v}</Link>
            {i < arr.length - 2 ? ", " : i === arr.length - 2 ? " et " : ""}
          </span>
        ))}{" "}
        afin d’accompagner les entreprises et indépendants dans leur stratégie
        de présence en ligne.
      </span>
    ),
    CTATitle: "Passez à l’action maintenant !",
    CTADesc:
      "Attirez plus de clients, augmentez vos ventes, développez votre notoriété. Avec Ikovaline, c’est possible à Yerres.",
    CTATextBtn: "Lancez votre projet",
    metaTitle:
      "Agence web à Yerres - Création de site web, SEO, marketing digital",
    metaDescription:
      "Boostez votre entreprise à Yerres avec une agence web locale : création de site internet, référencement SEO, webmarketing, accompagnement sur-mesure.",
  },
  {
    id: "agence-web-marcoussis",
    ville: "Marcoussis",
    intro: `Découvrez notre agence web à Marcoussis, spécialisée dans la création de sites internet sur mesure. Nous aidons les entreprises et artisans de Marcoussis (sud de l’Essonne) et de ses alentours à développer leur présence en ligne via des solutions personnalisées : création de site web, référencement, maintenance, etc.`,
    text1: (
      <span>
        Vous êtes une entreprise située à{" "}
        <Link href="/agence-web-marcoussis">Marcoussis</Link> ou dans les
        environs ? Notre agence web locale est prête à booster votre visibilité
        en ligne. De la{" "}
        <Link href="nos-services/creation-sites-web-vitrine-e-commerce">
          création de site vitrine
        </Link>{" "}
        à l’<Link href="nos-services/seo-referencement-naturel">audit SEO</Link>
        , nous vous aidons à développer efficacement votre activité sur internet
        à Marcoussis.
      </span>
    ),
    services: [
      {
        text: "Création de sites web",
        subtext:
          "Créer un site internet vitrine, e-commerce ou sur-mesure, et améliorez votre image en ligne grâce à notre agence web basée à Marcoussis, en Essonne.",
        link: "nos-services/creation-sites-web-vitrine-e-commerce",
      },
      {
        text: "Référencement SEO",
        subtext:
          "Attirez des visiteurs qualifiés depuis Marcoussis et toute la région grâce à un référencement optimisé pour votre activité.",
        link: "nos-services/seo-referencement-naturel",
      },
      {
        text: "Maintenance et support",
        subtext:
          "Maintenance proactive et support 24/7 : notre équipe assure la stabilité et la sécurité de votre site web.",
        link: "nos-services/creation-site-web-sur-mesure",
      },
      {
        text: "Web marketing",
        subtext:
          "Dynamisez votre marketing local grâce à nos campagnes publicitaires ciblées (Google Ads, réseaux sociaux), stratégie de contenu et campagnes emailing.",
        link: "nos-services/gestion-campagnes-sea",
      },
    ],
    objectifs: {
      objectifTitle: "Objectif de notre agence web à Marcoussis",
      text1: `Notre objectif est de vous accompagner tout au long de votre projet digital, en vous proposant une stratégie personnalisée adaptée à votre entreprise, notamment pour la création ou la refonte de votre site internet à Marcoussis. Nous garantissons un service complet, du développement du site à sa maintenance opérationnelle, partout en Essonne.`,
      text2: `Grâce à notre expertise en création de site web et en marketing digital (SEO, SEA, etc.), nous nous engageons à fournir des résultats concrets. Notre agence web locale, implantée à Marcoussis et présente dans toute l’Essonne, vous accompagne de près avec un support disponible 24h/24. Et si les résultats ne sont pas au rendez-vous, nous vous remboursons.`,
    },
    villesVoisines: [
      "Bailly-Romainvilliers",
      "Massy",
      "Évry",
      "Verrières-le-Buisson",
      "Saclay",
      "Courcouronnes",
      "Villeneuve-Saint-Georges",
      "Yerres",
      "Marcoussis",
      "Vauhallan",
      "Wissous",
      "Palaiseau",
      "Corbeil-Essonnes",
    ],
    cityAroundText: (
      <span className="text-center">
        Notre agence web locale intervient aussi dans toute l'Essonne et
        alentours pour la création de sites web, que ce soit à{" "}
        {[
          "Bailly-Romainvilliers",
          "Massy",
          "Évry",
          "Verrières-le-Buisson",
          "Saclay",
          "Courcouronnes",
          "Villeneuve-Saint-Georges",
          "Yerres",
          "Marcoussis",
          "Vauhallan",
          "Wissous",
          "Palaiseau",
          "Corbeil-Essonnes",
        ].map((v, i, arr) => (
          <span key={v}>
            <Link href={`/agence-web-${removeAccents(v)}`}>{v}</Link>
            {i < arr.length - 2 ? ", " : i === arr.length - 2 ? " et " : ""}
          </span>
        ))}{" "}
        afin d’accompagner les entreprises et indépendants dans leur stratégie
        de présence en ligne.
      </span>
    ),
    CTATitle: "Passez à l’action maintenant !",
    CTADesc:
      "Attirez plus de clients, augmentez vos ventes, développez votre notoriété. Avec Ikovaline, c’est possible à Marcoussis.",
    CTATextBtn: "Lancez votre projet",
    metaTitle:
      "Agence web à Marcoussis - Création de site web, SEO, marketing digital",
    metaDescription:
      "Boostez votre entreprise à Marcoussis avec une agence web locale : création de site internet, référencement SEO, webmarketing, accompagnement sur-mesure.",
  },
  {
    id: "agence-web-vauhallan",
    ville: "Vauhallan",
    intro: `Découvrez notre agence web à Vauhallan, spécialisée dans la création de sites internet. Nous accompagnons les entreprises et indépendants de Vauhallan (plateau de Saclay) et de ses environs pour développer leur activité en ligne grâce à nos solutions : création de site web, référencement, maintenance, etc.`,
    text1: (
      <span>
        Vous êtes une entreprise située à{" "}
        <Link href="/agence-web-vauhallan">Vauhallan</Link> ou dans les communes
        proches ? Notre agence web locale est prête à renforcer votre visibilité
        en ligne. De la{" "}
        <Link href="nos-services/creation-sites-web-vitrine-e-commerce">
          création de site vitrine
        </Link>{" "}
        à l’<Link href="nos-services/seo-referencement-naturel">audit SEO</Link>
        , nous vous aidons à développer efficacement votre présence sur le web à
        Vauhallan.
      </span>
    ),
    services: [
      {
        text: "Création de sites web",
        subtext:
          "Créer un site internet vitrine, e-commerce ou sur-mesure, et développez votre image en ligne grâce à notre agence web basée à Vauhallan, en Essonne.",
        link: "nos-services/creation-sites-web-vitrine-e-commerce",
      },
      {
        text: "Référencement SEO",
        subtext:
          "Optimisez votre référencement pour attirer des clients de Vauhallan et des communes voisines.",
        link: "nos-services/seo-referencement-naturel",
      },
      {
        text: "Maintenance et support",
        subtext:
          "Maintenance proactive et support 24/7 pour votre site web : nous assurons sa sécurité et sa performance.",
        link: "nos-services/creation-site-web-sur-mesure",
      },
      {
        text: "Web marketing",
        subtext:
          "Développez votre stratégie digitale avec nos campagnes SEA ciblées, gestion des réseaux sociaux, content marketing et email marketing.",
        link: "nos-services/gestion-campagnes-sea",
      },
    ],
    objectifs: {
      objectifTitle: "Objectif de notre agence web à Vauhallan",
      text1: `Notre objectif est de vous accompagner dans chaque étape de votre projet digital, en proposant une stratégie adaptée à votre entreprise, telle que la création ou la refonte de votre site internet à Vauhallan. Nous proposons un service global, du design du site à sa maintenance, partout en Essonne.`,
      text2: `Grâce à notre expertise en création de site web et en marketing digital (SEO, SEA, etc.), nous garantissons des résultats concrets. Notre agence web, implantée à Vauhallan et active dans toute l’Essonne, vous soutient avec un support 24h/24. Si les résultats escomptés ne sont pas atteints, vous êtes remboursé.`,
    },
    villesVoisines: [
      "Bailly-Romainvilliers",
      "Massy",
      "Évry",
      "Verrières-le-Buisson",
      "Saclay",
      "Courcouronnes",
      "Villeneuve-Saint-Georges",
      "Yerres",
      "Marcoussis",
      "Vauhallan",
      "Wissous",
      "Palaiseau",
      "Corbeil-Essonnes",
    ],
    cityAroundText: (
      <span className="text-center">
        Notre équipe se déplace également dans toute l'Essonne et ses alentours
        pour la création de sites web, que ce soit à{" "}
        {[
          "Bailly-Romainvilliers",
          "Massy",
          "Évry",
          "Verrières-le-Buisson",
          "Saclay",
          "Courcouronnes",
          "Villeneuve-Saint-Georges",
          "Yerres",
          "Marcoussis",
          "Vauhallan",
          "Wissous",
          "Palaiseau",
          "Corbeil-Essonnes",
        ].map((v, i, arr) => (
          <span key={v}>
            <Link href={`/agence-web-${removeAccents(v)}`}>{v}</Link>
            {i < arr.length - 2 ? ", " : i === arr.length - 2 ? " et " : ""}
          </span>
        ))}{" "}
        afin d’accompagner les entreprises et indépendants dans leur stratégie
        de présence en ligne.
      </span>
    ),
    CTATitle: "Passez à l’action maintenant !",
    CTADesc:
      "Attirez plus de clients, augmentez vos ventes, développez votre notoriété. Avec Ikovaline, c’est possible à Vauhallan.",
    CTATextBtn: "Lancez votre projet",
    metaTitle:
      "Agence web à Vauhallan - Création de site web, SEO, marketing digital",
    metaDescription:
      "Boostez votre entreprise à Vauhallan avec une agence web locale : création de site internet, référencement SEO, webmarketing, accompagnement sur-mesure.",
  },
  {
    id: "agence-web-wissous",
    ville: "Wissous",
    intro: `Découvrez notre agence web à Wissous, spécialisée dans la création de sites internet professionnels. Nous aidons les entreprises et indépendants de Wissous (Essonne) et de ses environs à développer leur présence en ligne grâce à nos services : création de site web, référencement naturel, maintenance, etc.`,
    text1: (
      <span>
        Vous êtes une entreprise située à{" "}
        <Link href="/agence-web-wissous">Wissous</Link> ou dans les communes
        voisines ? Notre agence web locale est là pour booster votre visibilité
        en ligne. De la{" "}
        <Link href="nos-services/creation-sites-web-vitrine-e-commerce">
          création de site vitrine
        </Link>{" "}
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
        text: "Création de sites web",
        subtext:
          "Créer un site internet vitrine, e-commerce ou sur-mesure, et développez votre image en ligne grâce à notre agence web basée à Wissous, en Essonne.",
        link: "nos-services/creation-sites-web-vitrine-e-commerce",
      },
      {
        text: "Référencement SEO",
        subtext:
          "Accroissez votre visibilité en ligne et attirez des clients depuis Wissous et ses alentours grâce à un référencement optimisé.",
        link: "nos-services/seo-referencement-naturel",
      },
      {
        text: "Maintenance et support",
        subtext:
          "Maintenance et support complet pour votre site web : notre équipe assure un suivi technique 24/7.",
        link: "nos-services/creation-site-web-sur-mesure",
      },
      {
        text: "Web marketing",
        subtext:
          "Augmentez votre notoriété avec nos campagnes publicitaires ciblées, gestion des réseaux sociaux, stratégie de contenu et campagnes emailing.",
        link: "nos-services/gestion-campagnes-sea",
      },
    ],
    objectifs: {
      objectifTitle: "Objectif de notre agence web à Wissous",
      text1: `Notre objectif est de vous accompagner tout au long de votre projet digital, en vous proposant une stratégie personnalisée pour votre entreprise, notamment la création ou la refonte de votre site internet à Wissous. Nous offrons un service complet, du développement du site à sa maintenance, partout en Essonne.`,
      text2: `Grâce à notre expertise en création de site web et en marketing digital (SEO, SEA, etc.), nous vous promettons des résultats tangibles. Notre agence web, implantée à Wissous et active dans toute l’Essonne, vous suit avec un support disponible 24h/24. Et si les résultats ne répondent pas à vos attentes, vous nous remboursons.`,
    },
    villesVoisines: [
      "Bailly-Romainvilliers",
      "Massy",
      "Évry",
      "Verrières-le-Buisson",
      "Saclay",
      "Courcouronnes",
      "Villeneuve-Saint-Georges",
      "Yerres",
      "Marcoussis",
      "Vauhallan",
      "Wissous",
      "Palaiseau",
      "Corbeil-Essonnes",
    ],
    cityAroundText: (
      <span className="text-center">
        Nous intervenons également partout en Essonne et aux alentours pour la
        création de sites web, que ce soit à{" "}
        {[
          "Bailly-Romainvilliers",
          "Massy",
          "Évry",
          "Verrières-le-Buisson",
          "Saclay",
          "Courcouronnes",
          "Villeneuve-Saint-Georges",
          "Yerres",
          "Marcoussis",
          "Vauhallan",
          "Wissous",
          "Palaiseau",
          "Corbeil-Essonnes",
        ].map((v, i, arr) => (
          <span key={v}>
            <Link href={`/agence-web-${removeAccents(v)}`}>{v}</Link>
            {i < arr.length - 2 ? ", " : i === arr.length - 2 ? " et " : ""}
          </span>
        ))}{" "}
        afin d’accompagner les entreprises et indépendants dans leur stratégie
        de présence en ligne.
      </span>
    ),
    CTATitle: "Passez à l’action maintenant !",
    CTADesc:
      "Attirez plus de clients, augmentez vos ventes, développez votre notoriété. Avec Ikovaline, c’est possible à Wissous.",
    CTATextBtn: "Lancez votre projet",
    metaTitle:
      "Agence web à Wissous - Création de site web, SEO, marketing digital",
    metaDescription:
      "Boostez votre entreprise à Wissous avec une agence web locale : création de site internet, référencement SEO, webmarketing, accompagnement sur-mesure.",
  },
  {
    id: "agence-web-palaiseau",
    ville: "Palaiseau",
    intro: `Découvrez notre agence web à Palaiseau, spécialisée dans la création de sites internet professionnels. Nous accompagnons les entreprises et indépendants de Palaiseau et de toute l’Essonne à développer leur présence en ligne via des solutions digitales : création de site web, référencement, maintenance, etc.`,
    text1: (
      <span>
        Vous êtes une entreprise située à{" "}
        <Link href="/agence-web-palaiseau">Palaiseau</Link> ou dans les villes
        voisines ? Notre agence web locale est là pour maximiser votre
        visibilité en ligne. De la{" "}
        <Link href="nos-services/creation-sites-web-vitrine-e-commerce">
          création de site vitrine
        </Link>{" "}
        à l’
        <Link href="nos-services/seo-referencement-naturel">
          optimisation SEO
        </Link>
        , nous vous aidons à développer efficacement votre activité web à
        Palaiseau.
      </span>
    ),
    services: [
      {
        text: "Création de sites web",
        subtext:
          "Créer un site internet vitrine, e-commerce ou sur-mesure, et développez votre image en ligne grâce à notre agence web basée à Palaiseau, en Essonne.",
        link: "nos-services/creation-sites-web-vitrine-e-commerce",
      },
      {
        text: "Référencement SEO",
        subtext:
          "Optimisez votre référencement naturel pour attirer plus de clients à Palaiseau et dans l’Essonne.",
        link: "nos-services/seo-referencement-naturel",
      },
      {
        text: "Maintenance et support",
        subtext:
          "Maintenance et assistance 24/7 pour votre site internet : nous assurons sa sécurité et son bon fonctionnement.",
        link: "nos-services/creation-site-web-sur-mesure",
      },
      {
        text: "Web marketing",
        subtext:
          "Dynamisez votre notoriété avec nos campagnes SEA, gestion de réseaux sociaux, rédaction de contenu et newsletters.",
        link: "nos-services/gestion-campagnes-sea",
      },
    ],
    objectifs: {
      objectifTitle: "Objectif de notre agence web à Palaiseau",
      text1: `Notre objectif est de vous accompagner tout au long de votre projet digital, en proposant une stratégie sur mesure pour votre entreprise, telle que la création ou la refonte de votre site internet à Palaiseau. Nous proposons un service global, de la conception du site à sa maintenance, partout en Essonne.`,
      text2: `Avec notre expertise en développement web et en marketing digital (SEO, SEA, etc.), nous garantissons des résultats concrets. Notre agence web, implantée à Palaiseau et active dans toute l’Essonne, vous accompagne avec un support 24h/24. Et si les résultats escomptés ne sont pas atteints, nous vous remboursons.`,
    },
    villesVoisines: [
      "Bailly-Romainvilliers",
      "Massy",
      "Évry",
      "Verrières-le-Buisson",
      "Saclay",
      "Courcouronnes",
      "Villeneuve-Saint-Georges",
      "Yerres",
      "Marcoussis",
      "Vauhallan",
      "Wissous",
      "Palaiseau",
      "Corbeil-Essonnes",
    ],
    cityAroundText: (
      <span className="text-center">
        Nous intervenons également partout en Essonne et aux alentours pour la
        création de sites web, que ce soit à{" "}
        {[
          "Bailly-Romainvilliers",
          "Massy",
          "Évry",
          "Verrières-le-Buisson",
          "Saclay",
          "Courcouronnes",
          "Villeneuve-Saint-Georges",
          "Yerres",
          "Marcoussis",
          "Vauhallan",
          "Wissous",
          "Palaiseau",
          "Corbeil-Essonnes",
        ].map((v, i, arr) => (
          <span key={v}>
            <Link href={`/agence-web-${removeAccents(v)}`}>{v}</Link>
            {i < arr.length - 2 ? ", " : i === arr.length - 2 ? " et " : ""}
          </span>
        ))}{" "}
        afin d’accompagner les entreprises et indépendants dans leur stratégie
        de présence en ligne.
      </span>
    ),
    CTATitle: "Passez à l’action maintenant !",
    CTADesc:
      "Attirez plus de clients, augmentez vos ventes, développez votre notoriété. Avec Ikovaline, c’est possible à Palaiseau.",
    CTATextBtn: "Lancez votre projet",
    metaTitle:
      "Agence web à Palaiseau - Création de site web, SEO, marketing digital",
    metaDescription:
      "Boostez votre entreprise à Palaiseau avec une agence web locale : création de site internet, référencement SEO, webmarketing, accompagnement sur-mesure.",
  },
  {
    id: "agence-web-corbeil-essonnes",
    ville: "Corbeil-Essonnes",
    intro: `Découvrez notre agence web à Corbeil-Essonnes, spécialisée dans la création de sites internet. Nous accompagnons les entreprises et indépendants de Corbeil-Essonnes et du sud de l'Essonne dans le développement de leur présence en ligne grâce à nos services personnalisés : création de site web, référencement, maintenance, etc.`,
    text1: (
      <span>
        Vous êtes une entreprise située à{" "}
        <Link href="/agence-web-corbeil-essonnes">Corbeil-Essonnes</Link> ou
        dans les environs (Essonne) ? Notre agence web locale est prête à
        renforcer votre visibilité en ligne. De la{" "}
        <Link href="nos-services/creation-sites-web-vitrine-e-commerce">
          création de site vitrine
        </Link>{" "}
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
        text: "Création de sites web",
        subtext:
          "Créer un site internet vitrine, e-commerce ou sur-mesure, et développez votre image en ligne grâce à notre agence web basée à Corbeil-Essonnes, en Essonne.",
        link: "nos-services/creation-sites-web-vitrine-e-commerce",
      },
      {
        text: "Référencement SEO",
        subtext:
          "Optimisez votre positionnement pour attirer davantage de visiteurs à Corbeil-Essonnes et dans la région.",
        link: "nos-services/seo-referencement-naturel",
      },
      {
        text: "Maintenance et support",
        subtext:
          "Maintenance, mises à jour et support 24/7 pour votre site web : notre agence assure son bon fonctionnement.",
        link: "nos-services/creation-site-web-sur-mesure",
      },
      {
        text: "Web marketing",
        subtext:
          "Boostez votre visibilité en ligne avec nos campagnes SEA, annonces sur réseaux sociaux, contenu marketing et emailing.",
        link: "nos-services/gestion-campagnes-sea",
      },
    ],
    objectifs: {
      objectifTitle: "Objectif de notre agence web à Corbeil-Essonnes",
      text1: `Notre objectif est de vous accompagner du début à la fin de votre projet digital, en vous proposant une stratégie sur mesure pour votre entreprise, comme la création ou la refonte de votre site internet à Corbeil-Essonnes. Nous proposons un service global, de la conception du site à sa maintenance opérationnelle, partout en Essonne.`,
      text2: `Grâce à notre expertise en création de site web et en stratégie digitale (SEO, SEA, etc.), nous vous garantissons des résultats mesurables. Notre agence web locale, implantée à Corbeil-Essonnes et active dans tout le sud de l'Essonne, vous accompagne avec un support disponible 24h/24. Si les résultats ne sont pas à la hauteur de vos attentes, vous êtes remboursé.`,
    },
    villesVoisines: [
      "Bailly-Romainvilliers",
      "Massy",
      "Évry",
      "Verrières-le-Buisson",
      "Saclay",
      "Courcouronnes",
      "Villeneuve-Saint-Georges",
      "Yerres",
      "Marcoussis",
      "Vauhallan",
      "Wissous",
      "Palaiseau",
      "Corbeil-Essonnes",
    ],
    cityAroundText: (
      <span className="text-center">
        Nous intervenons également partout en Essonne et aux alentours pour la
        création de sites web, que ce soit à{" "}
        {[
          "Bailly-Romainvilliers",
          "Massy",
          "Évry",
          "Verrières-le-Buisson",
          "Saclay",
          "Courcouronnes",
          "Villeneuve-Saint-Georges",
          "Yerres",
          "Marcoussis",
          "Vauhallan",
          "Wissous",
          "Palaiseau",
          "Corbeil-Essonnes",
        ].map((v, i, arr) => (
          <span key={v}>
            <Link href={`/agence-web-${removeAccents(v)}`}>{v}</Link>
            {i < arr.length - 2 ? ", " : i === arr.length - 2 ? " et " : ""}
          </span>
        ))}{" "}
        afin d’accompagner les entreprises et indépendants dans leur stratégie
        de présence en ligne.
      </span>
    ),
    CTATitle: "Passez à l’action maintenant !",
    CTADesc:
      "Attirez plus de clients, augmentez vos ventes, développez votre notoriété. Avec Ikovaline, c’est possible à Corbeil-Essonnes.",
    CTATextBtn: "Lancez votre projet",
    metaTitle:
      "Agence web à Corbeil-Essonnes - Création de site web, SEO, marketing digital",
    metaDescription:
      "Boostez votre entreprise à Corbeil-Essonnes avec une agence web locale : création de site internet, référencement SEO, webmarketing, accompagnement sur-mesure.",
  },
];
