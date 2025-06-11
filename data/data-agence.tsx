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
      "Etampes",
      "Ballancourt",
      "Palaiseau",
      "Milly-la-Foret",
      "Evry",
      "Marcoussis",
      "Courcouronnes",
    ],
    cityAroundText: (
      <span className="text-center">
        Nous intervenons également partout en Essonne et aux alentours pour la
        création de site web, que ce soit à{" "}
        {[
          "Etampes",
          "Ballancourt",
          "Palaiseau",
          "Milly-la-Foret",
          "Evry",
          "Marcoussis",
          "Courcouronnes",
        ].map((v, i, arr) => (
          <span key={v}>
            <Link href={`/agence-web-${v.toLocaleLowerCase()}`}>{v}</Link>
            {i < arr.length - 2 ? ", " : i === arr.length - 2 ? " et " : ""}
          </span>
        ))}{" "}
        afin d’accompagner les entreprises et les indépendants dans leur
        stratégie de présence en ligne, quelle qu’elle soit.
      </span>
    ),
    metaTitle:
      "Agence web à Massy - Création de site web, SEO, marketing digital",
    metaDescription:
      "Boostez votre entreprise à Massy avec une agence web locale : création de site internet, référencement SEO, webmarketing, accompagnement sur-mesure.",
  },
];
