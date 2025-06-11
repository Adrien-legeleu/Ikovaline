import Link from "next/link";

export const dataAgence = [
  {
    id: "agence-web-massy",
    ville: "Massy",
    intro: `Découvrez notre agence web spécialisée dans la création de sites internet à Massy. Nous accompagnons les entreprises locales dans leur transformation digitale avec des solutions sur-mesure : création de site, référencement SEO, maintenance, et plus encore.`,
    text1: (
      <span>
        Vous êtes une entreprise située à <Link href="#">Massy</Link> ou dans
        les environs ? Nous mettons notre expertise au service de votre
        visibilité en ligne. De la{" "}
        <Link href="#">création de site vitrine</Link> à l’
        <Link href="#">audit SEO</Link>, notre équipe vous aide à développer
        votre présence digitale efficacement.
      </span>
    ),
    services: [
      {
        text: "Création de sites web",
        subtext:
          "Nous concevons des sites web sur-mesure, modernes, rapides et responsives, pensés pour refléter l’identité de votre entreprise et améliorer l’expérience utilisateur sur tous les supports.",
        link: "nos-services/creation-sites-web-vitrine-e-commerce",
      },
      {
        text: "Référencement SEO",
        subtext:
          "Nous optimisons la structure et le contenu de votre site pour qu’il soit mieux positionné sur Google. Attirez plus de visiteurs qualifiés grâce à une stratégie SEO locale et durable.",
        link: "nos-services/seo-referencement-naturel",
      },
      {
        text: "Maintenance et support",
        subtext:
          "Confiez-nous la gestion technique de votre site : mises à jour régulières, correctifs de sécurité, sauvegardes automatiques et assistance en cas de besoin, pour une tranquillité d’esprit totale.",
        link: "nos-services/creation-site-web-sur-mesure",
      },
      {
        text: "Web marketing",
        subtext:
          "Augmentez votre visibilité avec des campagnes digitales efficaces : publicité en ligne (Google Ads, réseaux sociaux), stratégie de contenu, email marketing et analyse des performances.",
        link: "nos-services/gestion-campagnes-sea",
      },
    ],
    objectifs: {
      objectifTitle: "Objectif de notre agence web à Massy",
      text1: `Notre objectif est de proposer aux professionnels de Massy des solutions digitales fiables et évolutives. Que vous soyez commerçant, artisan ou dirigeant d’entreprise, nous vous accompagnons dans la création de votre site internet pour valoriser votre activité.`,
      text2: `Grâce à notre expertise en SEO, nous aidons également les entreprises massicoises à améliorer leur positionnement sur Google et à toucher une audience plus large dans toute l’Essonne. Faites appel à nous pour booster votre visibilité locale.`,
    },
    villesVoisines: ["Villebon", "Évry", "Palaiseau", "Brétigny-sur-Orge"],
    cityAroundText: (
      <span className="text-center">
        Située au cœur de l’Essonne, <Link href="#">Massy</Link> bénéficie d’un
        tissu économique dynamique. Notre agence intervient également dans les
        villes voisines comme{" "}
        {["Villebon", "Évry", "Palaiseau", "Brétigny-sur-Orge"].map(
          (v, i, arr) => (
            <span key={v}>
              <Link href="#">{v}</Link>
              {i < arr.length - 1 && ", "}
            </span>
          )
        )}{" "}
        pour accompagner les professionnels dans leurs projets web.
      </span>
    ),
    metaTitle: "Agence web à Massy - Création de site, SEO, marketing digital",
    metaDescription:
      "Boostez votre entreprise à Massy avec une agence web locale : création de site internet, référencement SEO, webmarketing, accompagnement sur-mesure.",
  },
];
