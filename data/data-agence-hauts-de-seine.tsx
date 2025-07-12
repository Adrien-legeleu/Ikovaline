import { removeAccents } from '@/components/pageSatellite/CityAround';
import Link from 'next/link';

export const dataAgenceHautsSeine = [
  {
    id: 'agence-web-boulogne-billancourt',
    ville: 'Boulogne-Billancourt',
    departement: 'Hauts-de-Seine',

    intro: `Vous recherchez une agence web à Boulogne-Billancourt pour booster la visibilité de votre entreprise ? Ikovaline est spécialisée dans la création de site internet à Boulogne-Billancourt, la refonte de site vitrine ou e-commerce, et le référencement SEO local. Que vous soyez une PME, un indépendant ou une association basée à Boulogne-Billancourt ou dans les Hauts-de-Seine, nous accompagnons votre projet web de A à Z avec une approche sur-mesure.`,
    text1: (
      <span>
        Notre <strong>agence web à Boulogne-Billancourt</strong> accompagne les
        entrepreneurs et entreprises dans leur transformation digitale. Que vous
        soyez implanté à{' '}
        <Link href="/agence-web-boulogne-billancourt">
          Boulogne-Billancourt
        </Link>
        , à<Link href="/agence-web-neuilly-sur-seine"> Neuilly-sur-Seine</Link>,
        ou à proximité (Issy-les-Moulineaux, Sèvres, Meudon...), confiez-nous
        votre <strong>création de site internet</strong>, votre{' '}
        <strong>refonte de site web</strong> ou votre{' '}
        <strong>référencement SEO à Boulogne-Billancourt</strong>.
        <br />
        Notre équipe locale vous propose un accompagnement complet : audit de
        visibilité, conception UX/UI, développement technique,{' '}
        <Link href="nos-services/seo-referencement-naturel">
          optimisation SEO
        </Link>
        , hébergement, maintenance et webmarketing. Objectif : faire de votre
        site un véritable levier de croissance durable dans les Hauts-de-Seine.
      </span>
    ),
    services: [
      {
        text: 'Création de sites web',
        subtext:
          'Confiez la création de votre site vitrine ou e-commerce à notre agence web à Boulogne-Billancourt. Design sur-mesure, site rapide, sécurisé, mobile-first et pensé pour le référencement naturel local.',
        link: 'nos-services/creation-sites-web-vitrine-e-commerce',
      },
      {
        text: 'Référencement SEO',
        subtext:
          'Boostez votre visibilité sur Google à Boulogne-Billancourt, dans les Hauts-de-Seine et en Île-de-France grâce à une stratégie SEO sur-mesure : contenu, mots-clés, netlinking, technique…',
        link: 'nos-services/seo-referencement-naturel',
      },
      {
        text: 'Maintenance et support',
        subtext:
          'Maintenance technique, mises à jour, sécurité et support réactif : votre site web à Boulogne-Billancourt reste performant et disponible toute l’année.',
        link: 'nos-services/creation-site-web-sur-mesure',
      },
      {
        text: 'Web marketing',
        subtext:
          'Développez votre notoriété à Boulogne-Billancourt avec nos campagnes Google Ads, stratégie social media, content marketing et automatisation.',
        link: 'nos-services/gestion-campagnes-sea',
      },
    ],
    objectifs: {
      objectifTitle:
        'Notre mission à Boulogne-Billancourt : transformer votre site en machine à clients',
      text1: `Notre agence web à Boulogne-Billancourt vous accompagne de la création ou refonte de votre site internet jusqu’à l’optimisation complète de votre visibilité. Nous construisons avec vous une stratégie digitale efficace, alignée sur vos enjeux business et sur les spécificités locales des Hauts-de-Seine.`,
      text2: `Nous intervenons à Boulogne-Billancourt, mais aussi dans tout le département 92. Nos services de création de site internet, refonte, SEO et maintenance sont pensés pour générer plus de leads, plus de clients, plus de chiffre d’affaires. Notre promesse : accompagnement personnalisé, résultats mesurables, remboursement si vous n’êtes pas satisfait.`,
    },
    villesVoisines: [
      'Boulogne-Billancourt',
      'Neuilly-sur-Seine',
      'Courbevoie',
      'Levallois-Perret',
      'Nanterre',
      'Suresnes',
      'Clamart',
      'Colombes',
      'Montrouge',
    ],
    cityAroundText: (
      <span className="text-center">
        Nous proposons nos services de{' '}
        <strong>création de site internet</strong>, <strong>refonte web</strong>{' '}
        et <strong>SEO</strong> non seulement à{' '}
        <Link href="/agence-web-boulogne-billancourt">
          Boulogne-Billancourt
        </Link>
        , mais aussi dans les villes voisines des Hauts-de-Seine :{' '}
        {[
          'Boulogne-Billancourt',
          'Neuilly-sur-Seine',
          'Courbevoie',
          'Levallois-Perret',
          'Nanterre',
          'Suresnes',
          'Clamart',
          'Colombes',
          'Montrouge',
        ].map((v, i, arr) => (
          <span key={v}>
            <Link href={`/agence-web-${removeAccents(v)}`}>{v}</Link>
            {i < arr.length - 2 ? ', ' : i === arr.length - 2 ? ' et ' : ''}
          </span>
        ))}{' '}
        pour aider toutes les entreprises du 92 à réussir leur stratégie
        digitale.
      </span>
    ),
    CTATitle: 'Votre projet web démarre à Boulogne-Billancourt',
    CTADesc:
      'Générez plus de contacts, augmentez votre visibilité à Boulogne-Billancourt et développez votre chiffre d’affaires en ligne avec Ikovaline, votre agence web locale dans le 92.',
    CTATextBtn: 'Lancez votre projet web à Boulogne-Billancourt',
    metaTitle:
      'Agence web Boulogne-Billancourt (92) – Création site internet, SEO, refonte Hauts-de-Seine',
    metaDescription:
      'Besoin d’un site web à Boulogne-Billancourt ? Ikovaline : création, refonte de site internet, SEO local, webmarketing dans les Hauts-de-Seine. Solutions digitales sur-mesure.',
  },
  {
    id: 'agence-web-courbevoie',
    ville: 'Courbevoie',
    departement: 'Hauts-de-Seine',

    intro: `Vous souhaitez créer ou refondre votre site internet à Courbevoie ? Ikovaline est spécialisée dans la création de site web à Courbevoie, la refonte, le SEO local et la maintenance. Profitez d’un accompagnement digital sur-mesure, efficace et axé résultats dans le 92.`,
    text1: (
      <span>
        Notre <strong>agence web à Courbevoie</strong> propose la création, la
        refonte et l’optimisation de votre site internet, ainsi que le
        référencement naturel, le SEA et la maintenance technique.
        <br />
        Que vous soyez basé à{' '}
        <Link href="/agence-web-courbevoie">Courbevoie</Link> ou dans les
        communes proches (La Défense, Neuilly, Puteaux…), profitez d’une
        expertise digitale pour booster votre activité dans les Hauts-de-Seine.
      </span>
    ),
    services: [
      {
        text: 'Création de sites web',
        subtext:
          'Site vitrine, e-commerce, ou sur-mesure : bénéficiez d’un site performant, rapide, SEO-friendly et moderne à Courbevoie.',
        link: 'nos-services/creation-sites-web-vitrine-e-commerce',
      },
      {
        text: 'Référencement SEO',
        subtext:
          'Optimisez votre présence locale à Courbevoie et en Île-de-France avec une stratégie SEO complète (audit, mots-clés, rédaction, netlinking…).',
        link: 'nos-services/seo-referencement-naturel',
      },
      {
        text: 'Maintenance et support',
        subtext:
          'Confiez la maintenance, les mises à jour, la sécurité et le support de votre site à une équipe locale réactive et experte.',
        link: 'nos-services/creation-site-web-sur-mesure',
      },
      {
        text: 'Web marketing',
        subtext:
          'Développez votre notoriété et attirez plus de clients à Courbevoie via Google Ads, social media, marketing de contenu et emailing.',
        link: 'nos-services/gestion-campagnes-sea',
      },
    ],
    objectifs: {
      objectifTitle:
        'Notre objectif à Courbevoie : transformer votre site web en machine à clients',
      text1: `Notre agence web à Courbevoie vous accompagne à chaque étape : de la création à la refonte, du référencement à la stratégie marketing, avec un suivi personnalisé et un engagement sur la performance.`,
      text2: `Nos prestations couvrent Courbevoie et tout le secteur des Hauts-de-Seine (La Défense, Puteaux, Neuilly, Levallois…). Proximité, réactivité et résultats mesurables.`,
    },
    villesVoisines: [
      'Boulogne-Billancourt',
      'Neuilly-sur-Seine',
      'Courbevoie',
      'Levallois-Perret',
      'Nanterre',
      'Suresnes',
      'Clamart',
      'Colombes',
      'Montrouge',
    ],
    cityAroundText: (
      <span className="text-center">
        Notre agence web à Courbevoie intervient aussi dans les villes proches :{' '}
        {[
          'Boulogne-Billancourt',
          'Neuilly-sur-Seine',
          'Courbevoie',
          'Levallois-Perret',
          'Nanterre',
          'Suresnes',
          'Clamart',
          'Colombes',
          'Montrouge',
        ].map((v, i, arr) => (
          <span key={v}>
            <Link href={`/agence-web-${removeAccents(v)}`}>{v}</Link>
            {i < arr.length - 2 ? ', ' : i === arr.length - 2 ? ' et ' : ''}
          </span>
        ))}{' '}
        pour accompagner les entreprises et indépendants du 92 dans leur
        stratégie digitale.
      </span>
    ),
    CTATitle: 'Passez à l’action à Courbevoie !',
    CTADesc:
      'Création de site internet, refonte, SEO, marketing digital… Notre agence web vous accompagne à Courbevoie et dans tout le 92 pour accélérer votre business.',
    CTATextBtn: 'Lancez votre projet web à Courbevoie',
    metaTitle:
      'Agence web à Courbevoie (92) – Création de site internet, SEO, refonte',
    metaDescription:
      'Ikovaline, agence web à Courbevoie : création, refonte de site internet, SEO local et stratégie digitale pour entreprises, commerçants, indépendants et associations à Courbevoie et dans les Hauts-de-Seine.',
  },
  {
    id: 'agence-web-neuilly-sur-seine',
    ville: 'Neuilly-sur-Seine',
    departement: 'Hauts-de-Seine',

    intro: `Vous avez un projet web à Neuilly-sur-Seine et cherchez une agence de confiance ? Ikovaline est spécialisée dans la création de site internet à Neuilly-sur-Seine, la refonte web, le référencement SEO local et le marketing digital. Bénéficiez d’un accompagnement personnalisé, efficace et orienté résultats dans les Hauts-de-Seine (92).`,
    text1: (
      <span>
        Notre <strong>agence web à Neuilly-sur-Seine</strong> accompagne les
        entreprises, commerçants et professions libérales dans leur transition
        numérique. Que vous soyez établi à{' '}
        <Link href="/agence-web-neuilly-sur-seine">Neuilly-sur-Seine</Link>, à
        <Link href="/agence-web-boulogne-billancourt">
          {' '}
          Boulogne-Billancourt
        </Link>
        , ou à proximité (Levallois-Perret, Puteaux, Courbevoie...),
        confiez-nous votre projet de <strong>création de site internet</strong>,
        de <strong>refonte web</strong> ou de{' '}
        <strong>référencement SEO à Neuilly-sur-Seine</strong>.
        <br />
        La particularité de notre équipe locale ? Un accompagnement 360°, de
        l’audit initial au suivi marketing. Conception UX/UI, développement web,{' '}
        <Link href="nos-services/seo-referencement-naturel">
          optimisation SEO
        </Link>
        , hébergement, maintenance : tout est mis en œuvre pour assurer le
        succès de votre site. Notre objectif : faire de votre présence en ligne
        un moteur de croissance pour votre activité à Neuilly-sur-Seine et dans
        tout le 92.
      </span>
    ),
    services: [
      {
        text: 'Création de sites web',
        subtext:
          'Confiez votre projet de site web à notre agence web à Neuilly-sur-Seine. Nous créons un site vitrine ou e-commerce sur-mesure, élégant, sécurisé et optimisé pour un référencement local efficace à Neuilly.',
        link: 'nos-services/creation-sites-web-vitrine-e-commerce',
      },
      {
        text: 'Référencement SEO',
        subtext:
          'Soyez visible sur les moteurs de recherche par vos prospects de Neuilly-sur-Seine et de toute l’Île-de-France. Notre stratégie SEO locale inclut la recherche de mots-clés pertinents, la rédaction de contenus de qualité et l’amélioration de votre popularité en ligne pour vous placer en tête des résultats.',
        link: 'nos-services/seo-referencement-naturel',
      },
      {
        text: 'Maintenance et support',
        subtext:
          'Confiez la maintenance de votre site à une équipe de confiance à Neuilly-sur-Seine. Nous veillons aux mises à jour, à la sécurité et à la résolution rapide des problèmes techniques afin que votre site reste toujours en ligne et performant.',
        link: 'nos-services/creation-site-web-sur-mesure',
      },
      {
        text: 'Web marketing',
        subtext:
          'Attirez plus de clients à Neuilly et dans le 92 grâce à nos campagnes de web marketing. Nous pilotons vos publicités Google Ads, animons vos réseaux sociaux et mettons en place des actions de marketing de contenu pour accroître votre notoriété locale et générer des prospects qualifiés.',
        link: 'nos-services/gestion-campagnes-sea',
      },
    ],
    objectifs: {
      objectifTitle:
        'Notre mission à Neuilly-sur-Seine : transformer votre site en machine à clients',
      text1: `Neuilly-sur-Seine est un secteur exigeant où l’excellence fait la différence. Nous mettons donc un point d’honneur à ce que votre site web devienne votre meilleur commercial. De la conception initiale à la génération de trafic qualifié, nous construisons avec vous une stratégie digitale performante, adaptée aux spécificités de Neuilly et de votre clientèle.`,
      text2: `Basés à Neuilly mais actifs dans tout le département des Hauts-de-Seine, nous vous apportons un regard local et expert. Nos solutions (site web, SEO, marketing) visent toutes un seul objectif : vous offrir un retour sur investissement tangible. Suivi régulier, rapports de performance et adaptation continue des stratégies assurent le succès de votre projet digital.`,
    },
    villesVoisines: [
      'Boulogne-Billancourt',
      'Neuilly-sur-Seine',
      'Courbevoie',
      'Levallois-Perret',
      'Nanterre',
      'Suresnes',
      'Clamart',
      'Colombes',
      'Montrouge',
    ],
    cityAroundText: (
      <span className="text-center">
        Nos experts interviennent à Neuilly-sur-Seine et dans les communes
        voisines du 92 :{' '}
        {[
          'Boulogne-Billancourt',
          'Neuilly-sur-Seine',
          'Courbevoie',
          'Levallois-Perret',
          'Nanterre',
          'Suresnes',
          'Clamart',
          'Colombes',
          'Montrouge',
        ].map((v, i, arr) => (
          <span key={v}>
            <Link href={`/agence-web-${removeAccents(v)}`}>{v}</Link>
            {i < arr.length - 2 ? ', ' : i === arr.length - 2 ? ' et ' : ''}
          </span>
        ))}{' '}
        pour que votre entreprise bénéficie du meilleur du digital.
      </span>
    ),
    CTATitle: 'Concrétisez votre projet web à Neuilly-sur-Seine',
    CTADesc:
      'Attirez plus de clients, augmentez votre visibilité en ligne à Neuilly-sur-Seine et boostez votre chiffre d’affaires grâce à Ikovaline, votre agence web locale dans le 92.',
    CTATextBtn: 'Lancez votre projet web à Neuilly-sur-Seine',
    metaTitle:
      'Agence web Neuilly-sur-Seine (92) – Création site internet, SEO, refonte Hauts-de-Seine',
    metaDescription:
      'Ikovaline, agence web à Neuilly-sur-Seine : création de site internet, refonte web, SEO local et marketing digital pour entreprises exigeantes à Neuilly (92). Site vitrine ou e-commerce sur-mesure, référencement performant, accompagnement complet.',
  },
  {
    id: 'agence-web-levallois-perret',
    ville: 'Levallois-Perret',
    departement: 'Hauts-de-Seine',

    intro: `Vous souhaitez développer votre visibilité en ligne à Levallois-Perret ? Ikovaline, agence web locale, est experte en création de site internet à Levallois-Perret, refonte web, référencement naturel (SEO) et marketing digital. Nous vous accompagnons de A à Z avec des solutions innovantes et adaptées à vos besoins dans les Hauts-de-Seine.`,
    text1: (
      <span>
        Notre <strong>agence web à Levallois-Perret</strong> prend en charge la
        création ou la refonte de votre site internet, le référencement naturel,
        vos campagnes SEA ainsi que la maintenance de votre site web.
        <br />
        Que vous soyez situé à{' '}
        <Link href="/agence-web-levallois-perret">Levallois-Perret</Link> ou
        dans les environs (Neuilly-sur-Seine, Clichy, Asnières-sur-Seine…),
        notre équipe vous aide à développer votre activité en ligne dans les
        Hauts-de-Seine.
      </span>
    ),
    services: [
      {
        text: 'Création de sites web',
        subtext:
          'Offrez-vous un site vitrine ou e-commerce à l’image de votre entreprise de Levallois-Perret : design personnalisé, navigation fluide, sécurité renforcée et optimisé pour le référencement local.',
        link: 'nos-services/creation-sites-web-vitrine-e-commerce',
      },
      {
        text: 'Référencement SEO',
        subtext:
          'Soyez visible en première page de Google à Levallois-Perret et dans toute la région Île-de-France grâce à une stratégie SEO sur-mesure : audit technique, contenus de qualité, netlinking et suivi analytique.',
        link: 'nos-services/seo-referencement-naturel',
      },
      {
        text: 'Maintenance et support',
        subtext:
          'Conservez un site web performant et sécurisé à Levallois-Perret : mises à jour régulières, surveillance sécurité et assistance rapide en cas de besoin.',
        link: 'nos-services/creation-site-web-sur-mesure',
      },
      {
        text: 'Web marketing',
        subtext:
          'Attirez davantage de clients à Levallois-Perret grâce à des campagnes de marketing digital ciblées : Google Ads, réseaux sociaux, marketing de contenu et automatisation d’e-mails.',
        link: 'nos-services/gestion-campagnes-sea',
      },
    ],
    objectifs: {
      objectifTitle:
        'Notre objectif à Levallois-Perret : transformer votre site web en machine à clients',
      text1: `Être présent en ligne ne suffit pas, il faut performer. C’est pourquoi notre agence web à Levallois-Perret vous accompagne de la conception de votre site jusqu’à l’optimisation de votre visibilité, avec une stratégie digitale taillée pour vos objectifs business locaux.`,
      text2: `Basés à Levallois-Perret, nous rayonnons sur tout le département 92. Que ce soit à Levallois ou dans les villes voisines, nous mettons tout en œuvre pour générer plus de trafic, plus de prospects et plus de chiffre d’affaires grâce au digital. Nos maîtres-mots : proximité, réactivité et résultats mesurables.`,
    },
    villesVoisines: [
      'Boulogne-Billancourt',
      'Neuilly-sur-Seine',
      'Courbevoie',
      'Levallois-Perret',
      'Nanterre',
      'Suresnes',
      'Clamart',
      'Colombes',
      'Montrouge',
    ],
    cityAroundText: (
      <span className="text-center">
        Ikovaline est présente à Levallois-Perret, mais aussi dans de nombreuses
        villes des Hauts-de-Seine pour vous accompagner dans vos projets
        numériques :{' '}
        {[
          'Boulogne-Billancourt',
          'Neuilly-sur-Seine',
          'Courbevoie',
          'Levallois-Perret',
          'Nanterre',
          'Suresnes',
          'Clamart',
          'Colombes',
          'Montrouge',
        ].map((v, i, arr) => (
          <span key={v}>
            <Link href={`/agence-web-${removeAccents(v)}`}>{v}</Link>
            {i < arr.length - 2 ? ', ' : i === arr.length - 2 ? ' et ' : ''}
          </span>
        ))}{' '}
        afin d’aider les entreprises du 92 à réussir sur le web.
      </span>
    ),
    CTATitle: 'Votre stratégie digitale prend forme à Levallois-Perret',
    CTADesc:
      'Attirez de nouveaux clients à Levallois-Perret, améliorez votre visibilité sur internet et boostez votre croissance avec Ikovaline, l’agence digitale de proximité dans les Hauts-de-Seine.',
    CTATextBtn: 'Lancez votre projet web à Levallois-Perret',
    metaTitle:
      'Agence web à Levallois-Perret (92) – Création de site internet, SEO, refonte Hauts-de-Seine',
    metaDescription:
      'Ikovaline, agence web à Levallois-Perret : création, refonte de site internet, SEO local, webmarketing. Accélérez votre croissance en ligne à Levallois (92) grâce à des solutions digitales sur-mesure et performantes.',
  },
  {
    id: 'agence-web-nanterre',
    ville: 'Nanterre',
    departement: 'Hauts-de-Seine',

    intro: `Besoin d’un site web professionnel à Nanterre ? Ikovaline est votre partenaire de confiance, spécialisé dans la création de sites internet à Nanterre, la refonte web, le référencement naturel local et la gestion de campagnes publicitaires en ligne. Profitez de solutions digitales innovantes et d’un accompagnement sur-mesure pour les entreprises des Hauts-de-Seine.`,
    text1: (
      <span>
        Notre <strong>agence web à Nanterre</strong> s’adresse aux start-ups,
        PME et grandes entreprises en quête d’une présence en ligne efficace.
        Que votre activité se déroule à{' '}
        <Link href="/agence-web-nanterre">Nanterre</Link>, à
        <Link href="/agence-web-courbevoie"> Courbevoie</Link> ou dans un
        secteur voisin (La Défense, Rueil-Malmaison, Suresnes...), nous
        réalisons votre <strong>site internet sur-mesure</strong>, assurons la{' '}
        <strong>refonte web</strong> et déployons votre{' '}
        <strong>stratégie SEO locale</strong>.
        <br />
        Grâce à notre expertise technique et marketing, nous prenons en main
        votre projet web de bout en bout. Design UX, développement front et
        back-end,{' '}
        <Link href="nos-services/seo-referencement-naturel">
          optimisations SEO
        </Link>
        , contenu, hébergement... rien n’est laissé au hasard. Le tout avec un
        suivi régulier et des ajustements constants pour maximiser vos résultats
        en ligne dans les Hauts-de-Seine.
      </span>
    ),
    services: [
      {
        text: 'Création de sites web',
        subtext:
          'Nous créons pour vous un site vitrine ou e-commerce à Nanterre qui fera la différence : design soigné, expérience utilisateur optimale, site mobile-first et optimisé pour le référencement.',
        link: 'nos-services/creation-sites-web-vitrine-e-commerce',
      },
      {
        text: 'Référencement SEO',
        subtext:
          'Dominez les résultats de recherche à Nanterre et en Île-de-France grâce à un référencement naturel de qualité. Nous définissons les mots-clés stratégiques, créons du contenu pertinent et améliorons la technique de votre site pour un maximum de visibilité locale.',
        link: 'nos-services/seo-referencement-naturel',
      },
      {
        text: 'Maintenance et support',
        subtext:
          'Ne vous souciez plus des aspects techniques : nous assurons la maintenance de votre site à Nanterre. Mises à jour, sauvegardes, protection contre les cybermenaces et assistance rapide : votre site reste toujours opérationnel.',
        link: 'nos-services/creation-site-web-sur-mesure',
      },
      {
        text: 'Web marketing',
        subtext:
          'Augmentez votre notoriété à Nanterre et fidélisez votre clientèle grâce à nos campagnes de web marketing. Publicité Google Ads ciblée, animation des réseaux sociaux, email marketing et stratégie de contenu : nous attirons vers votre site un trafic qualifié et durable.',
        link: 'nos-services/gestion-campagnes-sea',
      },
    ],
    objectifs: {
      objectifTitle:
        'Notre mission à Nanterre : transformer votre site internet en machine à clients',
      text1: `Avoir un beau site ne suffit pas, il doit surtout attirer des clients. Notre agence web à Nanterre met tout en œuvre pour que votre site devienne un outil performant de génération de leads et de ventes. La création ou la refonte de votre site n’est que la première étape : nous travaillons aussi sur votre référencement local, votre présence sur les réseaux sociaux et votre stratégie de contenu afin d’attirer un trafic qualifié depuis Nanterre et les alentours.`,
      text2: `Basés en Île-de-France, nous intervenons bien sûr à Nanterre mais aussi dans toutes les communes du 92. Nos solutions web (création, SEO, refonte, etc.) ont un seul but : vous apporter plus de trafic, plus de prospects et un chiffre d’affaires en hausse. Nous mesurons chaque action et vous garantissons un accompagnement de qualité – satisfait ou remboursé.`,
    },
    villesVoisines: [
      'Boulogne-Billancourt',
      'Neuilly-sur-Seine',
      'Courbevoie',
      'Levallois-Perret',
      'Nanterre',
      'Suresnes',
      'Clamart',
      'Colombes',
      'Montrouge',
    ],
    cityAroundText: (
      <span className="text-center">
        Au-delà de Nanterre, nous sommes présents dans de nombreuses villes du
        92 :{' '}
        {[
          'Boulogne-Billancourt',
          'Neuilly-sur-Seine',
          'Courbevoie',
          'Levallois-Perret',
          'Nanterre',
          'Suresnes',
          'Clamart',
          'Colombes',
          'Montrouge',
        ].map((v, i, arr) => (
          <span key={v}>
            <Link href={`/agence-web-${removeAccents(v)}`}>{v}</Link>
            {i < arr.length - 2 ? ', ' : i === arr.length - 2 ? ' et ' : ''}
          </span>
        ))}{' '}
        pour aider les acteurs locaux des Hauts-de-Seine à réussir en ligne.
      </span>
    ),
    CTATitle: 'Accélérez votre transformation digitale à Nanterre',
    CTADesc:
      'Multipliez les contacts et développez votre activité en ligne à Nanterre grâce à Ikovaline, votre partenaire digital local dans le 92. Création de site web, SEO, refonte ou marketing en ligne : nous mettons tout en œuvre pour la réussite de votre entreprise.',
    CTATextBtn: 'Lancez votre projet web à Nanterre',
    metaTitle:
      'Agence web Nanterre (92) – Création site internet, SEO, refonte Hauts-de-Seine',
    metaDescription:
      'Besoin d’une agence web à Nanterre ? Ikovaline réalise la création ou refonte de votre site internet, le référencement naturel local et vos campagnes digitales. Entreprises et commerces de Nanterre (92), boostez votre présence en ligne avec une agence de proximité.',
  },
  {
    id: 'agence-web-suresnes',
    ville: 'Suresnes',
    departement: 'Hauts-de-Seine',

    intro: `Vous voulez booster votre visibilité à Suresnes et attirer plus de clients grâce au web ? Ikovaline, agence web à Suresnes, est spécialisée dans la création de sites internet, la refonte web, le référencement SEO local et la publicité en ligne. Offrez-vous une présence digitale efficace et sur-mesure pour conquérir votre marché dans les Hauts-de-Seine.`,
    text1: (
      <span>
        Notre <strong>agence web à Suresnes</strong> prend en charge tous vos
        besoins digitaux : création ou refonte de site internet, optimisation
        SEO, gestion de campagnes SEA et maintenance technique.
        <br />
        Que vous exerciez à <Link href="/agence-web-suresnes">Suresnes</Link> ou
        aux alentours (Puteaux, Rueil-Malmaison, Saint-Cloud…), nous déployons
        des solutions digitales performantes pour développer votre activité dans
        les Hauts-de-Seine.
      </span>
    ),
    services: [
      {
        text: 'Création de sites web',
        subtext:
          'Valorisez votre entreprise de Suresnes sur le web avec un site vitrine ou e-commerce sur-mesure. Design moderne, ergonomie mobile, sécurité renforcée et SEO local : votre site fera forte impression.',
        link: 'nos-services/creation-sites-web-vitrine-e-commerce',
      },
      {
        text: 'Référencement SEO',
        subtext:
          'Devenez leader dans les résultats Google à Suresnes et aux environs. Notre expertise SEO locale vous permet de toucher vos clients proches grâce à une stratégie complète : audit, optimisation technique, contenu localisé et netlinking de qualité.',
        link: 'nos-services/seo-referencement-naturel',
      },
      {
        text: 'Maintenance et support',
        subtext:
          'Gardez l’esprit tranquille : notre équipe assure la maintenance de votre site web à Suresnes. Surveillance continue, mises à jour, correctifs et assistance rapide vous garantissent un site toujours disponible et performant.',
        link: 'nos-services/creation-site-web-sur-mesure',
      },
      {
        text: 'Web marketing',
        subtext:
          'Attirez plus de trafic qualifié vers votre site depuis Suresnes et l’Île-de-France grâce à une stratégie web marketing ciblée. Publicité en ligne (Google Ads), réseaux sociaux, campagnes d’e-mailing et content marketing : nous vous aidons à générer des prospects et fidéliser votre clientèle.',
        link: 'nos-services/gestion-campagnes-sea',
      },
    ],
    objectifs: {
      objectifTitle:
        'Notre objectif à Suresnes : transformer votre site web en machine à clients',
      text1: `Être accompagné par une agence locale, c’est bénéficier d’une meilleure réactivité et d’une connaissance du tissu économique. À Suresnes, nous avons à cœur de transformer votre site web en véritable machine à générer des clients. De la définition de votre projet jusqu’à sa mise en ligne, nous travaillons main dans la main pour atteindre vos objectifs.`,
      text2: `Suresnes n’est pas le seul terrain de jeu : nous intervenons dans tout le 92 pour vous aider à capter de nouvelles opportunités. Notre crédo : proximité, transparence et ROI (retour sur investissement) mesurable. Performance et résultats guident chacune de nos actions.`,
    },
    villesVoisines: [
      'Boulogne-Billancourt',
      'Neuilly-sur-Seine',
      'Courbevoie',
      'Levallois-Perret',
      'Nanterre',
      'Suresnes',
      'Clamart',
      'Colombes',
      'Montrouge',
    ],
    cityAroundText: (
      <span className="text-center">
        La présence locale est clé. C’est pourquoi nous intervenons à Suresnes
        mais aussi dans de nombreuses communes des Hauts-de-Seine :{' '}
        {[
          'Boulogne-Billancourt',
          'Neuilly-sur-Seine',
          'Courbevoie',
          'Levallois-Perret',
          'Nanterre',
          'Suresnes',
          'Clamart',
          'Colombes',
          'Montrouge',
        ].map((v, i, arr) => (
          <span key={v}>
            <Link href={`/agence-web-${removeAccents(v)}`}>{v}</Link>
            {i < arr.length - 2 ? ', ' : i === arr.length - 2 ? ' et ' : ''}
          </span>
        ))}{' '}
        afin de propulser votre entreprise du 92 avec le digital.
      </span>
    ),
    CTATitle: 'Faites décoller votre activité en ligne à Suresnes',
    CTADesc:
      'Gagnez en visibilité et en clients à Suresnes grâce à Ikovaline, l’agence web locale qui propulse votre business dans les Hauts-de-Seine. Création de site, SEO, refonte, marketing digital : ensemble, faisons passer votre entreprise au niveau supérieur.',
    CTATextBtn: 'Lancez votre projet web à Suresnes',
    metaTitle:
      'Agence web à Suresnes (92) – Création de site internet, SEO, refonte Hauts-de-Seine',
    metaDescription:
      'Agence web à Suresnes (92), Ikovaline propose création et refonte de sites internet, référencement SEO local et marketing digital. Développez votre visibilité en ligne à Suresnes et dans les Hauts-de-Seine grâce à une équipe locale experte et réactive.',
  },
  {
    id: 'agence-web-clamart',
    ville: 'Clamart',
    departement: 'Hauts-de-Seine',

    intro: `Votre entreprise de Clamart mérite un site web à la hauteur de vos ambitions. Ikovaline, agence web spécialisée en création de site internet à Clamart, refonte, SEO local et webmarketing, vous accompagne de A à Z dans votre projet digital. Bénéficiez d’un site sur-mesure, optimisé et d’une visibilité accrue dans les Hauts-de-Seine.`,
    text1: (
      <span>
        Notre <strong>agence web à Clamart</strong> aide les artisans,
        commerçants et PME à réussir sur internet. Que vous exerciez votre
        activité à <Link href="/agence-web-clamart">Clamart</Link>, à
        <Link href="/agence-web-boulogne-billancourt">
          {' '}
          Boulogne-Billancourt
        </Link>
        , ou dans les environs (Issy-les-Moulineaux, Malakoff, Meudon...), nous
        réalisons votre <strong>site internet sur-mesure</strong>, assurons la{' '}
        <strong>refonte de votre site</strong> et développons votre{' '}
        <strong>référencement SEO local</strong>.
        <br />
        Du conseil initial à la mise en production, nous pilotons tous vos
        projets web. Design UX, développement,{' '}
        <Link href="nos-services/seo-referencement-naturel">SEO onsite</Link>,
        contenus, hébergement et maintenance : chaque détail compte pour faire
        de votre site un succès durable dans le 92.
      </span>
    ),
    services: [
      {
        text: 'Création de sites web',
        subtext:
          'Pour vous, commerçant ou entrepreneur de Clamart, nous créons un site web à votre image qui attire vos clients locaux. Charte graphique soignée, navigation facile, site responsive et optimisé SEO local.',
        link: 'nos-services/creation-sites-web-vitrine-e-commerce',
      },
      {
        text: 'Référencement SEO',
        subtext:
          'Apparaissez en bonne position sur Google auprès des Clamartois et dans toute l’Île-de-France grâce à une stratégie SEO personnalisée. De l’audit au netlinking, nous améliorons chaque aspect du référencement de votre site.',
        link: 'nos-services/seo-referencement-naturel',
      },
      {
        text: 'Maintenance et support',
        subtext:
          'Votre site nécessite une attention continue. Notre service de maintenance à Clamart s’assure que votre site reste toujours en ligne et performant : mises à jour du CMS, sauvegardes régulières, résolution rapide des bugs ou failles de sécurité.',
        link: 'nos-services/creation-site-web-sur-mesure',
      },
      {
        text: 'Web marketing',
        subtext:
          'Ne laissez pas votre site isolé sur la toile : nos experts en web marketing aident votre entreprise de Clamart à gagner en notoriété. Référencement payant (Google Ads), campagnes sur les réseaux sociaux, marketing de contenu... nous attirons vers votre site un public qualifié et intéressé.',
        link: 'nos-services/gestion-campagnes-sea',
      },
    ],
    objectifs: {
      objectifTitle:
        'Notre mission à Clamart : transformer votre site en machine à clients',
      text1: `La réussite de votre projet web est notre priorité. Chez Ikovaline, nous pensons que chaque entreprise de Clamart est unique : nous adaptons donc nos solutions pour répondre précisément à vos besoins. Conseil, design, développement, marketing : nous travaillons à vos côtés dans une démarche collaborative et transparente.`,
      text2: `Au-delà de Clamart, nous accompagnons également des clients dans tout le 92. Notre connaissance du tissu local des Hauts-de-Seine nous permet de déployer des stratégies digitales efficaces, où que vous soyez situé. En choisissant Ikovaline, vous optez pour un partenaire engagé à vos côtés, focalisé sur les résultats concrets (trafic, leads, ventes).`,
    },
    villesVoisines: [
      'Boulogne-Billancourt',
      'Neuilly-sur-Seine',
      'Courbevoie',
      'Levallois-Perret',
      'Nanterre',
      'Suresnes',
      'Clamart',
      'Colombes',
      'Montrouge',
    ],
    cityAroundText: (
      <span className="text-center">
        Nos experts interviennent à Clamart ainsi que dans les communes voisines
        des Hauts-de-Seine :{' '}
        {[
          'Boulogne-Billancourt',
          'Neuilly-sur-Seine',
          'Courbevoie',
          'Levallois-Perret',
          'Nanterre',
          'Suresnes',
          'Clamart',
          'Colombes',
          'Montrouge',
        ].map((v, i, arr) => (
          <span key={v}>
            <Link href={`/agence-web-${removeAccents(v)}`}>{v}</Link>
            {i < arr.length - 2 ? ', ' : i === arr.length - 2 ? ' et ' : ''}
          </span>
        ))}{' '}
        . Quelle que soit votre localisation dans le 92, nous mettons le digital
        au service de votre croissance.
      </span>
    ),
    CTATitle: 'Prêt à booster votre présence en ligne à Clamart ?',
    CTADesc:
      'Confiez votre projet web à Ikovaline et rejoignez nos clients satisfaits à Clamart. Nous mettons en place les leviers digitaux (site internet, SEO, campagnes marketing) pour faire décoller votre chiffre d’affaires en ligne.',
    CTATextBtn: 'Lancez votre projet web à Clamart',
    metaTitle:
      'Agence web Clamart (92) – Création site internet, SEO, refonte Hauts-de-Seine',
    metaDescription:
      'Ikovaline – Agence web à Clamart (92) : création de sites internet sur-mesure, refonte de site, référencement naturel local et webmarketing. Votre partenaire digital de confiance à Clamart pour gagner en visibilité et en clients en ligne.',
  },
  {
    id: 'agence-web-colombes',
    ville: 'Colombes',
    departement: 'Hauts-de-Seine',

    intro: `À la recherche d’une agence web à Colombes pour dynamiser votre activité en ligne ? Ikovaline vous propose des services sur-mesure de création de site internet à Colombes, refonte de site web, référencement naturel (SEO) local et marketing digital. Donnez un coup d’accélérateur à votre visibilité sur le web dans les Hauts-de-Seine grâce à notre expertise locale.`,
    text1: (
      <span>
        Notre <strong>agence web à Colombes</strong> conçoit et optimise votre
        présence en ligne. Nous prenons en charge la création ou la refonte de
        votre site internet, l’amélioration de votre référencement SEO, la
        gestion de vos publicités en ligne (Google Ads) ainsi que la maintenance
        technique de votre site.
        <br />
        Que vous soyez basé à <Link href="/agence-web-colombes">
          Colombes
        </Link>{' '}
        ou dans une commune voisine (Bois-Colombes, Asnières-sur-Seine, La
        Garenne-Colombes…), nous déployons notre savoir-faire digital pour faire
        grandir votre business dans les Hauts-de-Seine.
      </span>
    ),
    services: [
      {
        text: 'Création de sites web',
        subtext:
          'Confiez la création de votre site vitrine ou e-commerce à des professionnels qui connaissent Colombes. Nous réalisons un site web sur-mesure, au design attrayant, performant sur mobile et optimisé pour le SEO local afin de toucher votre clientèle de Colombes et alentours.',
        link: 'nos-services/creation-sites-web-vitrine-e-commerce',
      },
      {
        text: 'Référencement SEO',
        subtext:
          'Sortez du lot sur Google à Colombes et dans le 92 grâce à un travail de référencement naturel pointu. Audit de votre site, optimisation du code, création de contenus locaux et netlinking stratégique : nous boostons votre positionnement et votre trafic.',
        link: 'nos-services/seo-referencement-naturel',
      },
      {
        text: 'Maintenance et support',
        subtext:
          'Ne laissez aucun bug freiner votre activité en ligne à Colombes. Notre service de maintenance gère les mises à jour, la sécurité et l’optimisation continue de votre site web. Bénéficiez d’un support technique réactif qui assure la disponibilité et la rapidité de votre site en permanence.',
        link: 'nos-services/creation-site-web-sur-mesure',
      },
      {
        text: 'Web marketing',
        subtext:
          'Convertissez vos visiteurs en clients grâce à une stratégie web marketing bien pensée. Depuis Colombes, nous pilotons vos campagnes Google Ads, vos réseaux sociaux, vos envois d’e-mails promotionnels et votre calendrier de contenu pour maximiser votre retour sur investissement.',
        link: 'nos-services/gestion-campagnes-sea',
      },
    ],
    objectifs: {
      objectifTitle:
        'Notre objectif à Colombes : transformer votre site web en machine à clients',
      text1: `À Colombes comme ailleurs, la concurrence en ligne est rude. Nous vous aidons à vous démarquer en faisant de votre site un véritable outil de génération de clients. Notre approche personnalisée s’appuie sur vos points forts et sur les attentes de votre marché local pour construire un plan d’action digital efficace.`,
      text2: `La zone géographique ne doit pas être un frein : nous accompagnons des clients partout dans les Hauts-de-Seine, du nord au sud du département. En tant qu’agence web locale, nous comprenons les défis propres à Colombes et aux villes voisines. Notre promesse : une collaboration de confiance, des solutions performantes et des résultats concrets pour votre entreprise.`,
    },
    villesVoisines: [
      'Boulogne-Billancourt',
      'Neuilly-sur-Seine',
      'Courbevoie',
      'Levallois-Perret',
      'Nanterre',
      'Suresnes',
      'Clamart',
      'Colombes',
      'Montrouge',
    ],
    cityAroundText: (
      <span className="text-center">
        Notre présence ne se limite pas à Colombes. Nous étendons nos services
        dans toute la zone des Hauts-de-Seine :{' '}
        {[
          'Boulogne-Billancourt',
          'Neuilly-sur-Seine',
          'Courbevoie',
          'Levallois-Perret',
          'Nanterre',
          'Suresnes',
          'Clamart',
          'Colombes',
          'Montrouge',
        ].map((v, i, arr) => (
          <span key={v}>
            <Link href={`/agence-web-${removeAccents(v)}`}>{v}</Link>
            {i < arr.length - 2 ? ', ' : i === arr.length - 2 ? ' et ' : ''}
          </span>
        ))}{' '}
        L’objectif : accompagner un maximum d’entreprises du 92 dans leur
        réussite en ligne.
      </span>
    ),
    CTATitle: 'Donnez un nouvel élan digital à votre entreprise à Colombes',
    CTADesc:
      'Dépassez vos objectifs en ligne à Colombes en attirant plus de prospects et en augmentant vos ventes avec Ikovaline, votre partenaire web de proximité dans les Hauts-de-Seine.',
    CTATextBtn: 'Lancez votre projet web à Colombes',
    metaTitle:
      'Agence web à Colombes (92) – Création de site internet, SEO, refonte Hauts-de-Seine',
    metaDescription:
      'Ikovaline, agence web à Colombes (92), vous accompagne en création de site web, refonte, SEO local et marketing digital. Attirez plus de clients à Colombes et en Hauts-de-Seine avec un site performant et une stratégie digitale personnalisée.',
  },
  {
    id: 'agence-web-montrouge',
    ville: 'Montrouge',
    departement: 'Hauts-de-Seine',

    intro: `Vous lancez votre activité à Montrouge ou souhaitez accélérer votre croissance grâce au digital ? Ikovaline, agence web active à Montrouge, est experte en création de sites internet, refonte web, référencement naturel (SEO) local et campagnes marketing en ligne. Nous mettons le numérique au service de votre réussite dans les Hauts-de-Seine.`,
    text1: (
      <span>
        Notre <strong>agence web à Montrouge</strong> accompagne les
        entrepreneurs, commerçants et associations dans leur développement en
        ligne. Que votre structure soit située à{' '}
        <Link href="/agence-web-montrouge">Montrouge</Link>, à
        <Link href="/agence-web-neuilly-sur-seine"> Neuilly-sur-Seine</Link> ou
        dans une autre ville des alentours (Malakoff, Bagneux, Paris 14e...),
        nous pilotons votre <strong>projet de site internet</strong>, votre{' '}
        <strong>refonte web</strong> et votre{' '}
        <strong>stratégie de référencement local</strong>.
        <br />
        La réussite de votre projet web est notre priorité. Nous mobilisons
        toutes nos compétences (design UX/UI, développement,{' '}
        <Link href="nos-services/seo-referencement-naturel">SEO local</Link>,
        contenu, marketing) pour faire de votre site un outil rentable et
        performant. Votre succès en ligne à Montrouge et dans l’ensemble du 92
        fait notre fierté.
      </span>
    ),
    services: [
      {
        text: 'Création de sites web',
        subtext:
          'Créons ensemble le site web qui fera briller votre entreprise à Montrouge. Site vitrine élégant ou boutique en ligne complète, nous concevons une plateforme sur-mesure : design professionnel, navigation intuitive, temps de chargement optimisés et référencement local intégré dès la conception.',
        link: 'nos-services/creation-sites-web-vitrine-e-commerce',
      },
      {
        text: 'Référencement SEO',
        subtext:
          'Attirez des visiteurs qualifiés à Montrouge et dans le sud de Paris grâce à notre expertise en SEO local. Nous optimisons votre site pour les recherches pertinentes (votre secteur, vos services, “Montrouge”) et travaillons votre contenu et popularité en ligne pour vous propulser en tête des résultats Google.',
        link: 'nos-services/seo-referencement-naturel',
      },
      {
        text: 'Maintenance et support',
        subtext:
          'Ne laissez pas des problèmes techniques freiner votre présence en ligne. Notre équipe de Montrouge veille sur votre site : mises à jour de sécurité, optimisation continue, correction des erreurs et assistance rapide. Vous gardez ainsi un site fiable, rapide et sécurisé en permanence.',
        link: 'nos-services/creation-site-web-sur-mesure',
      },
      {
        text: 'Web marketing',
        subtext:
          'Faites connaître votre offre à Montrouge et au-delà grâce à des actions de web marketing ciblées. Nous gérons vos budgets publicitaires en ligne, animons vos réseaux sociaux, envoyons des newsletters engageantes et analysons les performances pour un retour sur investissement maximal.',
        link: 'nos-services/gestion-campagnes-sea',
      },
    ],
    objectifs: {
      objectifTitle:
        'Notre mission à Montrouge : transformer votre site internet en machine à clients',
      text1: `Montrouge bénéficie d’un tissu économique dynamique, et nous souhaitons vous y faire une place de choix. Notre équipe adapte ses stratégies en fonction de votre secteur et de votre cible locale afin de maximiser vos conversions. En tant qu’agence de proximité, nous misons sur l’écoute et la collaboration pour faire de votre projet une réussite.`,
      text2: `Ikovaline s’investit aux côtés des entrepreneurs de Montrouge, mais aussi de tout le 92. Que vous touchiez une clientèle locale ou régionale, nous déployons les mêmes méthodes éprouvées pour vous apporter plus de visibilité, de contacts qualifiés et de ventes. Avec nous, pas de jargon ni de fausses promesses : juste des résultats concrets et une relation de confiance.`,
    },
    villesVoisines: [
      'Boulogne-Billancourt',
      'Neuilly-sur-Seine',
      'Courbevoie',
      'Levallois-Perret',
      'Nanterre',
      'Suresnes',
      'Clamart',
      'Colombes',
      'Montrouge',
    ],
    cityAroundText: (
      <span className="text-center">
        Ikovaline s’implique à Montrouge et dans tout le département des
        Hauts-de-Seine :{' '}
        {[
          'Boulogne-Billancourt',
          'Neuilly-sur-Seine',
          'Courbevoie',
          'Levallois-Perret',
          'Nanterre',
          'Suresnes',
          'Clamart',
          'Colombes',
          'Montrouge',
        ].map((v, i, arr) => (
          <span key={v}>
            <Link href={`/agence-web-${removeAccents(v)}`}>{v}</Link>
            {i < arr.length - 2 ? ', ' : i === arr.length - 2 ? ' et ' : ''}
          </span>
        ))}{' '}
        afin d’accompagner la transformation digitale des entreprises du 92.
      </span>
    ),
    CTATitle: 'Libérez le potentiel de votre site web à Montrouge',
    CTADesc:
      'Générez plus de leads et de ventes à Montrouge grâce à Ikovaline, l’agence web locale qui booste votre visibilité et votre croissance dans le 92.',
    CTATextBtn: 'Lancez votre projet web à Montrouge',
    metaTitle:
      'Agence web Montrouge (92) – Création site internet, SEO, refonte Hauts-de-Seine',
    metaDescription:
      'Besoin d’un site web à Montrouge ? Ikovaline, agence digitale locale, est spécialisée en création et refonte de sites internet, référencement SEO local et campagnes webmarketing. Faites décoller votre activité en ligne à Montrouge (92) avec des solutions digitales sur-mesure.',
  },
];
