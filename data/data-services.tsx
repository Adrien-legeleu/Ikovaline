import Image from "next/image";
import { IconShield, IconUsers, IconChartBar } from "@tabler/icons-react";

const dataService = [
  {
    section1Title: "Gestion de votre image en ligne",
    slug: "gestion-de-votre-image-en-ligne",
    section1Desc:
      "Optimisez votre réputation avec une gestion experte de vos avis Google et Google My Business.",
    section1Image: (
      <Image
        className="object-cover w-1/2 relative bottom-20"
        width={1800}
        height={1600}
        src={"/images/services/service-image-en-ligne.png"}
        alt="Image en ligne"
      />
    ),
    section2Title: "Maîtrisez votre e-réputation",
    section2Desc:
      "Nos solutions transforment vos avis en leviers de croissance, renforçant votre crédibilité en ligne.",
    section2NumberImportant: "100+",
    section2TextImportant: "entreprises accompagnées",
    section3Title: "Pourquoi nous choisir ?",
    section3Cards: [
      {
        text: "Impact visuel",
        subtext:
          "Des images retravaillées pour capter l'attention dès le premier regard.",
      },
      {
        text: "SEO intégré",
        subtext:
          "Optimisation avancée pour booster votre référencement local et digital.",
      },
      {
        text: "Crédibilité forte",
        subtext:
          "Une gestion experte qui valorise votre réputation et attire de nouveaux clients.",
      },
    ],
    section4Title: "Nos garanties et engagements",
    section4Content: [
      {
        title: "Sécurité",
        description:
          "Nous garantissons une protection maximale de votre image en ligne.",
        subdesc1: "Protocoles avancés",
        subdesc2: "Veille continue",
        icon: <IconShield className="text-secondary w-6 h-6" />,
      },
      {
        title: "Expertise",
        description:
          "Un accompagnement personnalisé et des conseils stratégiques adaptés.",
        subdesc1: "Support expert",
        subdesc2: "Suivi sur-mesure",
        icon: <IconUsers className="text-secondary w-6 h-6" />,
      },
      {
        title: "Résultats",
        description:
          "Des indicateurs précis pour mesurer l'évolution de votre e-réputation.",
        subdesc1: "Analyses régulières",
        subdesc2: "Optimisation continue",
        icon: <IconChartBar className="text-secondary w-6 h-6" />,
      },
    ],
  },
  {
    section1Title: "Stratégie de contenu & réseaux",
    slug: "strategie-de-contenu-reseaux",
    section1Desc:
      "Créez et diffusez des contenus engageants pour renforcer votre présence sur les réseaux sociaux.",
    section1Image: (
      <Image
        className="object-cover w-1/2 relative bottom-20"
        width={1800}
        height={1600}
        src={"/images/services/service-reseaux.png"}
        alt="Stratégie de contenu"
      />
    ),
    section2Title: "Optimisez votre visibilité",
    section2Desc:
      "Nous élaborons des stratégies sur mesure pour maximiser l'engagement de votre audience digitale.",
    section2NumberImportant: "120+",
    section2TextImportant: "stratégies déployées",
    section3Title: "Nos atouts clés",
    section3Cards: [
      {
        text: "Créativité pure",
        subtext:
          "Des contenus innovants pour se démarquer et captiver votre audience.",
      },
      {
        text: "Plan agile",
        subtext:
          "Calendriers éditoriaux précis pour une communication efficace et régulière.",
      },
      {
        text: "Engagement fort",
        subtext:
          "Techniques éprouvées pour booster l'interaction et la fidélisation client.",
      },
    ],
    section4Title: "Nos garanties et engagements",
    section4Content: [
      {
        title: "Créativité",
        description:
          "Une équipe dédiée à la conception de contenus percutants et innovants.",
        subdesc1: "Idées novatrices",
        subdesc2: "Conception sur-mesure",
        icon: <IconShield className="text-secondary w-6 h-6" />,
      },
      {
        title: "Suivi",
        description:
          "Un accompagnement complet avec analyses et rapports réguliers.",
        subdesc1: "Support constant",
        subdesc2: "Rapports détaillés",
        icon: <IconUsers className="text-secondary w-6 h-6" />,
      },
      {
        title: "Impact",
        description:
          "Des KPI clairs pour mesurer et optimiser l’efficacité de votre stratégie.",
        subdesc1: "Analyses précises",
        subdesc2: "Optimisation continue",
        icon: <IconChartBar className="text-secondary w-6 h-6" />,
      },
    ],
  },
  {
    section1Title: "Création & optimisation de sites web",
    slug: "creation-optimisation-de-sites-web",
    section1Desc:
      "Des sites web modernes et performants, conçus pour attirer et convertir vos visiteurs.",
    section1Image: (
      <Image
        className="object-cover w-1/2 relative bottom-20"
        width={1800}
        height={1600}
        src={"/images/services/service-web.png"}
        alt="Création de site web"
      />
    ),
    section2Title: "Sites sur-mesure",
    section2Desc:
      "Nous créons des sites responsive, optimisés pour le SEO et offrant une UX exceptionnelle.",
    section2NumberImportant: "80+",
    section2TextImportant: "sites développés",
    section3Title: "Atouts essentiels",
    section3Cards: [
      {
        text: "Design moderne",
        subtext:
          "Interfaces épurées et attractives pour séduire vos visiteurs dès l'arrivée.",
      },
      {
        text: "SEO performant",
        subtext:
          "Optimisation technique pointue pour un référencement naturel optimal.",
      },
      {
        text: "UX fluide",
        subtext:
          "Navigation intuitive et temps de chargement réduits pour une expérience premium.",
      },
    ],
    section4Title: "Nos garanties et engagements",
    section4Content: [
      {
        title: "Innovation",
        description:
          "Des concepts visuels créatifs qui valorisent votre image de marque.",
        subdesc1: "Interfaces uniques",
        subdesc2: "Ergonomie étudiée",
        icon: <IconShield className="text-secondary w-6 h-6" />,
      },
      {
        title: "Optimisation",
        description:
          "Techniques avancées pour booster votre visibilité en ligne et vos conversions.",
        subdesc1: "SEO technique",
        subdesc2: "Contenu optimisé",
        icon: <IconChartBar className="text-secondary w-6 h-6" />,
      },
      {
        title: "Accompagnement",
        description:
          "Un suivi personnalisé pour garantir le succès et la pérennité de votre site.",
        subdesc1: "Support constant",
        subdesc2: "Conseils experts",
        icon: <IconUsers className="text-secondary w-6 h-6" />,
      },
    ],
  },
  {
    section1Title: "Rédaction & création de contenu",
    slug: "redaction-creation-de-contenu",
    section1Desc:
      "Des contenus écrits et visuels engageants, optimisés pour renforcer votre marque et améliorer votre SEO.",
    section1Image: (
      <Image
        className="object-cover w-1/2 relative bottom-20"
        width={1800}
        height={1600}
        src={"/images/services/service-contenu.png"}
        alt="Création de contenu"
      />
    ),
    section2Title: "Contenus percutants",
    section2Desc:
      "Nous concevons des articles, vidéos et infographies qui captivent, informent et convertissent.",
    section2NumberImportant: "300+",
    section2TextImportant: "contenus créés",
    section3Title: "Atouts clés",
    section3Cards: [
      {
        text: "Idées fraîches",
        subtext:
          "Concepts innovants pour se démarquer et engager votre audience efficacement.",
      },
      {
        text: "SEO optimisé",
        subtext:
          "Contenus travaillés pour améliorer votre positionnement sur les moteurs de recherche.",
      },
      {
        text: "Engagement fort",
        subtext:
          "Techniques narratives qui incitent à l'action et renforcent la fidélité client.",
      },
    ],
    section4Title: "Nos garanties et engagements",
    section4Content: [
      {
        title: "Créativité",
        description:
          "Des contenus originaux et sur-mesure pour une communication unique.",
        subdesc1: "Approche innovante",
        subdesc2: "Storytelling percutant",
        icon: <IconShield className="text-secondary w-6 h-6" />,
      },
      {
        title: "Optimisation",
        description:
          "Chaque contenu est optimisé pour atteindre vos objectifs SEO et marketing.",
        subdesc1: "Recherche de mots-clés",
        subdesc2: "Structure travaillée",
        icon: <IconChartBar className="text-secondary w-6 h-6" />,
      },
      {
        title: "Engagement",
        description:
          "Nous créons du contenu qui capte l'attention et incite à l'interaction.",
        subdesc1: "Interaction client",
        subdesc2: "Feedback positif",
        icon: <IconUsers className="text-secondary w-6 h-6" />,
      },
    ],
  },
  {
    section1Title: "Audit & suivi analytique",
    slug: "audit-suivi-analytique",
    section1Desc:
      "Analysez vos données pour optimiser vos performances digitales et prendre des décisions éclairées.",
    section1Image: (
      <Image
        className="object-cover w-1/2 relative bottom-20"
        width={1800}
        height={1600}
        src={"/images/services/service-audit.png"}
        alt="Audit analytique"
      />
    ),
    section2Title: "Décisions data",
    section2Desc:
      "Nos audits précis et suivis analytiques vous aident à identifier les leviers de croissance.",
    section2NumberImportant: "50+",
    section2TextImportant: "audits réalisés",
    section3Title: "Avantages clés",
    section3Cards: [
      {
        text: "Data claire",
        subtext:
          "Analyse structurée pour une vision globale et des décisions basées sur les données.",
      },
      {
        text: "KPI précis",
        subtext:
          "Mesurez vos performances grâce à des indicateurs clés pertinents et fiables.",
      },
      {
        text: "Optimisation continue",
        subtext:
          "Recommandations concrètes pour booster votre ROI et améliorer vos actions.",
      },
    ],
    section4Title: "Nos garanties et engagements",
    section4Content: [
      {
        title: "Analyse",
        description:
          "Une étude détaillée pour déceler les opportunités et améliorer vos performances.",
        subdesc1: "Données segmentées",
        subdesc2: "Rapports précis",
        icon: <IconShield className="text-secondary w-6 h-6" />,
      },
      {
        title: "Suivi",
        description:
          "Un accompagnement personnalisé pour suivre l'évolution de vos indicateurs.",
        subdesc1: "Support expert",
        subdesc2: "Conseils réguliers",
        icon: <IconUsers className="text-secondary w-6 h-6" />,
      },
      {
        title: "Impact",
        description:
          "Des outils performants pour mesurer et visualiser l'impact de vos actions.",
        subdesc1: "Tableaux interactifs",
        subdesc2: "Optimisation continue",
        icon: <IconChartBar className="text-secondary w-6 h-6" />,
      },
    ],
  },
  {
    section1Title: "Formation & conseil stratégique",
    slug: "formation-conseil-strategique",
    section1Desc:
      "Développez les compétences de vos équipes et adoptez les meilleures pratiques du marketing digital.",
    section1Image: (
      <Image
        className="object-cover w-1/2 relative bottom-20"
        width={1800}
        height={1600}
        src={"/images/services/service-formation.png"}
        alt="Formation et conseil"
      />
    ),
    section2Title: "Compétences digitales",
    section2Desc:
      "Nos formations et conseils stratégiques vous permettent d'innover et de rester compétitif dans l'environnement numérique.",
    section2NumberImportant: "30+",
    section2TextImportant: "sessions réalisées",
    section3Title: "Atouts forts",
    section3Cards: [
      {
        text: "Expertise pointue",
        subtext:
          "Des formateurs reconnus pour leur savoir-faire et leur expérience terrain.",
      },
      {
        text: "Méthodes agiles",
        subtext:
          "Approches pédagogiques flexibles pour une montée en compétences rapide et efficace.",
      },
      {
        text: "Résultats tangibles",
        subtext:
          "Des formations qui transforment vos équipes et améliorent vos performances.",
      },
    ],
    section4Title: "Nos garanties et engagements",
    section4Content: [
      {
        title: "Formation",
        description:
          "Des sessions sur-mesure adaptées aux besoins spécifiques de votre entreprise.",
        subdesc1: "Programme personnalisé",
        subdesc2: "Experts certifiés",
        icon: <IconShield className="text-secondary w-6 h-6" />,
      },
      {
        title: "Suivi",
        description:
          "Un accompagnement complet avant, pendant et après la formation.",
        subdesc1: "Support constant",
        subdesc2: "Feedback régulier",
        icon: <IconUsers className="text-secondary w-6 h-6" />,
      },
      {
        title: "Impact",
        description:
          "Des outils d'analyse pour mesurer les progrès et optimiser vos actions.",
        subdesc1: "Indicateurs clairs",
        subdesc2: "Rapports détaillés",
        icon: <IconChartBar className="text-secondary w-6 h-6" />,
      },
    ],
  },
  {
    section1Title: "Gestion de partenariats & e-réputation",
    slug: "gestion-de-partenariats-e-reputation",
    section1Desc:
      "Boostez votre notoriété et créez des synergies grâce à des partenariats stratégiques et une gestion experte de votre e-réputation.",
    section1Image: (
      <Image
        className="object-cover w-1/2 relative bottom-20"
        width={1800}
        height={1600}
        src={"/images/services/service-partenariat.png"}
        alt="Partenariats et e-réputation"
      />
    ),
    section2Title: "Alliances stratégiques",
    section2Desc:
      "Nous établissons des partenariats solides pour amplifier votre image de marque et sécuriser votre réputation en ligne.",
    section2NumberImportant: "40+",
    section2TextImportant: "partenariats établis",
    section3Title: "Atouts clés",
    section3Cards: [
      {
        text: "Impact fort",
        subtext:
          "Des partenariats qui renforcent votre crédibilité et élargissent votre audience.",
      },
      {
        text: "Image saine",
        subtext:
          "Gestion proactive pour protéger et valoriser votre réputation en ligne.",
      },
      {
        text: "Croissance rapide",
        subtext:
          "Des synergies efficaces qui stimulent le développement de votre entreprise.",
      },
    ],
    section4Title: "Nos garanties et engagements",
    section4Content: [
      {
        title: "Sécurité",
        description:
          "Nous assurons la protection de votre réputation grâce à des outils avancés.",
        subdesc1: "Surveillance 24/7",
        subdesc2: "Alertes instantanées",
        icon: <IconShield className="text-secondary w-6 h-6" />,
      },
      {
        title: "Accompagnement",
        description:
          "Un suivi personnalisé pour chaque partenariat établi et durable.",
        subdesc1: "Support dédié",
        subdesc2: "Conseils stratégiques",
        icon: <IconUsers className="text-secondary w-6 h-6" />,
      },
      {
        title: "Performance",
        description:
          "Des indicateurs clairs pour mesurer l'impact de vos collaborations.",
        subdesc1: "Analyses régulières",
        subdesc2: "Optimisation continue",
        icon: <IconChartBar className="text-secondary w-6 h-6" />,
      },
    ],
  },
  {
    section1Title: "Email marketing & service client digital",
    slug: "email-marketing-service-client-digital",
    section1Desc:
      "Augmentez votre taux de conversion grâce à des campagnes emailing percutantes et un service client digital réactif.",
    section1Image: (
      <Image
        className="object-cover w-1/2 relative bottom-20"
        width={1800}
        height={1600}
        src={"/images/services/service-email.png"}
        alt="Email marketing"
      />
    ),
    section2Title: "Conversion boost",
    section2Desc:
      "Des campagnes d'emailing personnalisées et un service client digital pour fidéliser et engager votre audience.",
    section2NumberImportant: "70+",
    section2TextImportant: "campagnes réussies",
    section3Title: "Atouts clés",
    section3Cards: [
      {
        text: "Design soigné",
        subtext:
          "Des emails esthétiques et bien structurés pour capter l'attention immédiatement.",
      },
      {
        text: "Auto efficace",
        subtext:
          "Systèmes automatisés assurant un suivi client réactif et personnalisé.",
      },
      {
        text: "ROI élevé",
        subtext:
          "Campagnes optimisées pour maximiser votre retour sur investissement.",
      },
    ],
    section4Title: "Nos garanties et engagements",
    section4Content: [
      {
        title: "Performance",
        description:
          "Des outils avancés pour mesurer et améliorer l'efficacité de vos campagnes.",
        subdesc1: "Suivi précis",
        subdesc2: "Analyses détaillées",
        icon: <IconChartBar className="text-secondary w-6 h-6" />,
      },
      {
        title: "Expertise",
        description:
          "Une équipe dédiée à la conception de campagnes percutantes et performantes.",
        subdesc1: "Stratégies sur-mesure",
        subdesc2: "Optimisation continue",
        icon: <IconUsers className="text-secondary w-6 h-6" />,
      },
      {
        title: "Sécurité",
        description:
          "Protection de vos données et respect des normes RGPD les plus strictes.",
        subdesc1: "Chiffrement avancé",
        subdesc2: "Veille constante",
        icon: <IconShield className="text-secondary w-6 h-6" />,
      },
    ],
  },
  {
    section1Title: "Landing pages & pub locale",
    slug: "landing-pages-pub-locale",
    section1Desc:
      "Attirez des prospects qualifiés avec des landing pages optimisées et des campagnes publicitaires locales ciblées.",
    section1Image: (
      <Image
        className="object-cover w-1/2 relative bottom-20"
        width={1800}
        height={1600}
        src={"/images/services/service-landing.png"}
        alt="Landing pages"
      />
    ),
    section2Title: "Conversion locale",
    section2Desc:
      "Des landing pages sur-mesure et des publicités ciblées pour générer un maximum de leads dans votre zone de chalandise.",
    section2NumberImportant: "90+",
    section2TextImportant: "projets livrés",
    section3Title: "Atouts clés",
    section3Cards: [
      {
        text: "Design épuré",
        subtext:
          "Pages claires et impactantes conçues pour convertir vos visiteurs rapidement.",
      },
      {
        text: "Ciblage précis",
        subtext:
          "Campagnes locales finement ciblées pour toucher directement votre audience.",
      },
      {
        text: "ROI optimal",
        subtext:
          "Stratégies efficaces qui maximisent votre retour sur investissement.",
      },
    ],
    section4Title: "Nos garanties et engagements",
    section4Content: [
      {
        title: "Performance",
        description:
          "Des indicateurs précis pour suivre l'efficacité de vos campagnes publicitaires.",
        subdesc1: "Analyse continue",
        subdesc2: "Optimisation régulière",
        icon: <IconChartBar className="text-secondary w-6 h-6" />,
      },
      {
        title: "Expertise",
        description:
          "Une équipe spécialisée dans la conception de landing pages percutantes et efficaces.",
        subdesc1: "Créativité innovante",
        subdesc2: "Conception sur-mesure",
        icon: <IconUsers className="text-secondary w-6 h-6" />,
      },
      {
        title: "Fiabilité",
        description:
          "Nous garantissons des résultats mesurables et une gestion optimale de vos campagnes.",
        subdesc1: "Suivi constant",
        subdesc2: "Rapports clairs",
        icon: <IconShield className="text-secondary w-6 h-6" />,
      },
    ],
  },
  {
    section1Title: "Campagnes publicitaires en ligne",
    slug: "campagnes-publicitaires-en-ligne",
    section1Desc:
      "Maximisez votre ROI avec des campagnes Google Ads et Social Ads parfaitement ciblées.",
    section1Image: (
      <Image
        className="object-cover w-1/2 relative bottom-20"
        width={1800}
        height={1600}
        src={"/images/services/service-publicite.png"}
        alt="Campagnes publicitaires"
      />
    ),
    section2Title: "Visibilité immédiate",
    section2Desc:
      "Nous créons des campagnes publicitaires performantes pour une visibilité instantanée et mesurable.",
    section2NumberImportant: "110+",
    section2TextImportant: "campagnes lancées",
    section3Title: "Atouts clés",
    section3Cards: [
      {
        text: "Ciblage fin",
        subtext:
          "Des annonces ciblées pour atteindre précisément votre audience et maximiser l'impact.",
      },
      {
        text: "ROI élevé",
        subtext:
          "Optimisation continue pour garantir un retour sur investissement optimal.",
      },
      {
        text: "Créativité forte",
        subtext:
          "Des visuels percutants et des messages accrocheurs pour capter l'attention immédiatement.",
      },
    ],
    section4Title: "Nos garanties et engagements",
    section4Content: [
      {
        title: "Performance",
        description:
          "Des campagnes mesurées avec des outils avancés pour assurer un ROI optimal.",
        subdesc1: "Analyses approfondies",
        subdesc2: "Optimisation régulière",
        icon: <IconChartBar className="text-secondary w-6 h-6" />,
      },
      {
        title: "Expertise",
        description:
          "Une équipe d'experts dédiés à la réussite de vos campagnes publicitaires.",
        subdesc1: "Stratégies éprouvées",
        subdesc2: "Suivi personnalisé",
        icon: <IconUsers className="text-secondary w-6 h-6" />,
      },
      {
        title: "Sécurité",
        description:
          "Protection de vos données et respect strict des normes en vigueur.",
        subdesc1: "Protocoles robustes",
        subdesc2: "Surveillance constante",
        icon: <IconShield className="text-secondary w-6 h-6" />,
      },
    ],
  },
];

export default dataService;
