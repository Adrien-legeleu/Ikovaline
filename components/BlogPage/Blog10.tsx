import Image from 'next/image';
import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import CallToAction from '../callToAction/CallToAction';
import Link from 'next/link';
import { Button } from '../ui/button';

const faqData = [
  {
    question: 'Est-il difficile de créer un site internet ?',
    answer:
      "La création d'un site internet est une **tâche complexe** qui demande une **attention particulière et des compétences variées**. Ce processus multifactoriel nécessite une **réflexion approfondie**, de l'expérience en programmation, design, et référencement pour garantir une performance technique optimale et une visibilité efficace.\n\nFace à cette complexité et aux nombreux défis comme l'optimisation mobile et le SEO, il est fortement recommandé de solliciter l'aide de **professionnels experts**. Notre équipe est là pour vous accompagner et transformer votre vision en réalité digitale.",
  },
  {
    question: "Combien coûte l'hébergement d'un site Web ?",
    answer:
      "Le coût de l'hébergement d'un site web est **très variable**, allant généralement de **2 à 30 euros par mois**, mais pouvant s'adapter à des besoins spécifiques. Ce prix est influencé par la **qualité et la performance du serveur**, le niveau de sécurité, les fonctionnalités incluses, ainsi que la taille du site et le volume de trafic attendu.\n\nLes tarifs varient également selon le **type d'hébergement choisi** (mutualisé, VPS, dédié, ou cloud). Il est important de considérer les **coûts supplémentaires** comme le nom de domaine ou les certificats SSL pour une estimation complète de votre budget digital.",
  },
  {
    question: 'Combien de temps prend la création ?',
    answer:
      "La durée de création d'un site web est **très variable** et dépend de **nombreux facteurs**, notamment la **taille et la complexité du projet**, le budget alloué et l'implication du client. Le processus général, de l'évaluation des besoins à la mise en ligne, inclut des phases de conception, de développement et de tests rigoureux.\n\nUn site vitrine simple peut être réalisé en quelques semaines, tandis qu'un projet e-commerce complexe ou une application sur mesure peut nécessiter **plusieurs mois de travail**. Pour optimiser les délais, une **vision claire** et la préparation du contenu en amont sont toujours recommandées.",
  },
  {
    question: 'Comment choisir sa bonne agence web ?',
    answer:
      "Pour choisir la bonne agence web, il est essentiel de **clarifier précisément vos besoins et objectifs** marketing. Assurez-vous qu'elle possède l'**expertise technique** requise et consultez ses réalisations pour évaluer sa réputation. La **qualité de son propre site web** est souvent un excellent indicateur de son savoir-faire.\n\nPrivilégiez une agence qui fait preuve d'écoute, de **transparence dans sa communication** et qui propose une méthodologie claire, sans frais cachés. Rappelez-vous que le marketing web est un **investissement stratégique** pour votre visibilité. Notre équipe est là pour vous guider dans cette démarche.",
  },
  {
    question: 'Quel est le rôle du client ?',
    answer:
      "Le rôle du client est **multidimensionnel et essentiel** pour la réussite de la création de son site web. Il doit avant tout **définir clairement ses attentes et objectifs**, fournissant ainsi une feuille de route précise à l'équipe de développement. Cette clarté est le fondement d'un projet réussi.\n\nUne **communication proactive** est également cruciale : le client doit répondre aux questions et fournir les contenus nécessaires en temps voulu. Enfin, il est important de faire preuve de **respect envers l'expertise des professionnels** et d'honorer les engagements financiers pour une collaboration fructueuse. Chez nous, nous croyons en une collaboration transparente et efficace.",
  },
  {
    question:
      'Quelle est la meilleure plateforme pour créer un site internet ?',
    answer:
      "Il n'existe pas de « meilleure » plateforme unique pour créer un site internet, car le choix dépend intrinsèquement de vos **besoins spécifiques**, de votre budget et de votre niveau de compétences. Cependant, **Wix est largement reconnu comme un leader** pour sa polyvalence, son éditeur intuitif par glisser-déposer et ses multiples options de personnalisation.\n\nPour un excellent **rapport qualité-prix et une grande simplicité** d'utilisation, **Hostinger est une alternative très solide**, particulièrement appréciée des débutants. Votre décision finale doit aligner vos attentes en matière de design, de fonctionnalités (e-commerce, blog) et de budget avec les atouts de chaque plateforme. Notre but est de vous aider à choisir la solution la plus adaptée à votre projet.",
  },
  {
    question: 'Quand verrai-je les résultats SEO ?',
    answer:
      "Le référencement naturel (SEO) est une stratégie qui s'envisage sur le **moyen et long terme**. Les premiers résultats tangibles commencent généralement à apparaître après **trois à six mois d'efforts**, mais ce délai peut s'étendre de six à douze mois selon divers facteurs.\n\nLa durée est influencée par la **compétitivité de votre industrie**, le budget alloué, l'historique de votre domaine et la qualité de votre profil de backlinks. Le SEO est une **compétition continue** qui nécessite une optimisation et un entretien constants pour maintenir et améliorer votre visibilité. Nous mettons tout en œuvre pour que votre site rayonne sur les moteurs de recherche.",
  },
];

export default function Blog10() {
  return (
    <div className="md:px-20 z-10 relative bg-transparent py-20 max-w-5xl mx-auto space-y-40">
      {/* INTRO + H1 */}
      <div className="flex flex-col px-2 gap-12 justify-center items-center">
        <h1 className="sm:text-4xl lg:text-5xl 2xl:text-6xl text-3xl text-center font-bold bg-gradient-to-t from-neutral-700 to-neutral-900 dark:from-neutral-400 dark:to-neutral-100 bg-clip-text text-transparent">
          Création site web Paris : agence web Paris digitale
        </h1>
        <p className="text-center lg:text-lg">
          Vous cherchez à créer un site web à Paris mais peinez à trouver une
          solution adaptée à vos besoins ? Notre équipe d&apos;experts en agence
          web Paris vous guide dans la conception de sites internet sur mesure,
          alliant design moderne et stratégies digitales efficaces. Découvrez
          comment une présence en ligne Paris optimisée{' '}
          <strong>
            booste votre visibilité et transforme vos objectifs en succès
          </strong>{' '}
          concrets.
        </p>
        <Button asChild>
          <Link href="/contact">
            Parler à un expert en création de site web
          </Link>
        </Button>
        <Image
          src="/blog/blog10/creation_site_web_paris_couverture.png"
          alt="Création de site web à Paris - couverture"
          width={1000}
          height={1000}
          className="rounded-3xl w-full object-cover"
        />
      </div>

      {/* SOMMAIRE */}
      <ul className="space-y-36 px-2 text-left">
        <li className="space-y-12">
          <h2 className="text-3xl lg:text-4xl 2xl:text-5xl font-semibold">
            Sommaire
          </h2>
          <ol className="list-decimal list-inside lg:text-lg 2xl:text-xl space-y-2">
            <li className="underline">
              <Link href="#services-professionnels-creation-site-web-paris">
                Les services professionnels de création de site web à Paris
              </Link>
            </li>
            <li className="underline">
              <Link href="#importance-site-internet-entreprises-parisiennes">
                L&apos;importance d&apos;un site internet pour les entreprises
                parisiennes
              </Link>
            </li>
            <li className="underline">
              <Link href="#processus-creation-site-web-agence-parisienne">
                Le processus de création d&apos;un site web par une agence
                parisienne
              </Link>
            </li>
            <li className="underline">
              <Link href="#budget-tarifs-creation-site-internet-paris">
                Budget et tarifs pour la création de site internet à Paris
              </Link>
            </li>
          </ol>
        </li>

        {/* SECTION 1 */}
        <li
          className="space-y-12"
          id="services-professionnels-creation-site-web-paris"
        >
          <h2 className="text-3xl lg:text-4xl 2xl:text-5xl font-semibold">
            Les services professionnels de création de site web à Paris
          </h2>

          <h3 className="text-2xl lg:text-3xl 2xl:text-4xl font-semibold">
            L&apos;expertise des agences web parisiennes
          </h3>
          <p className="lg:text-lg 2xl:text-xl">
            Les agences web parisiennes se distinguent par leur savoir-faire en
            création de sites internet. Elles combinent compétences techniques
            et créativité pour répondre aux besoins variés des entreprises
            locales. Leur proximité géographique facilite l&apos;échange et la
            compréhension des particularités du marché parisien.{' '}
            <Link
              href="/agence-web-proximite"
              className="text-blue-600 underline"
              target="_blank"
            >
              Les agences de proximité
            </Link>{' '}
            maîtrisent parfaitement ces spécificités, garantissant des{' '}
            <strong>solutions digitales adaptées</strong>.
          </p>
          <p className="lg:text-lg 2xl:text-xl">
            Les agences parisiennes maîtrisent des technologies variées comme
            WordPress, Shopify ou les frameworks modernes. Elles intègrent des
            solutions innovantes telles que la réalité augmentée. Leur force
            réside dans leur capacité à{' '}
            <strong>
              allier expertise technique et approche personnalisée pour des
              résultats optimaux
            </strong>
            .
          </p>

          <h3 className="text-2xl lg:text-3xl 2xl:text-4xl font-semibold">
            Types de sites internet et solutions digitales
          </h3>
          <p className="lg:text-lg 2xl:text-xl">
            <Link
              href="/nos-services/creation-sites-web-vitrine-e-commerce"
              className="text-blue-600 underline"
              target="_blank"
            >
              Les agences parisiennes proposent des solutions comme les{' '}
              <strong>sites vitrine et e-commerce</strong>
            </Link>
            , adaptées à chaque besoin :
          </p>
          <ul className="list-disc list-inside lg:text-lg 2xl:text-xl space-y-1">
            <li>
              <strong>Sites vitrine</strong> : Idéaux pour une présence en ligne
              indispensable et une communication claire de votre activité à
              Paris
            </li>
            <li>
              <strong>Sites e-commerce</strong> : Solutions digitales
              parisiennes pour la vente en ligne avec intégration de solutions
              de paiement sécurisées
            </li>
            <li>
              <strong>Applications web et mobiles</strong> : Développement sur
              mesure pour des fonctionnalités avancées et une interaction
              utilisateur optimisée
            </li>
            <li>
              <strong>Intranets professionnels</strong> : Plateformes privées
              pour la collaboration et la gestion interne des entreprises
              parisiennes
            </li>
            <li>
              <strong>Solutions personnalisées</strong> : Création de sites
              internet sur mesure avec des CMS comme WordPress, Webflow ou des
              architectures headless
            </li>
          </ul>
          <p className="lg:text-lg 2xl:text-xl">
            Les agences web parisiennes accompagnent les entreprises au-delà de
            la simple création. Elles offrent des services complets incluant
            l&apos;hébergement, le référencement naturel, la gestion de contenu
            et la maintenance technique pour{' '}
            <strong>assurer la pérennité du projet digital</strong>.
          </p>
          <p className="lg:text-lg 2xl:text-xl">
            Les professionnels parisiens utilisent des{' '}
            <strong>technologies éprouvées</strong>. WordPress reste le CMS le
            plus populaire grâce à sa flexibilité. Les frameworks JavaScript
            comme React ou VueJS s&apos;imposent pour l&apos;expérience
            utilisateur. Les CMS headless séduisent pour leur modularité,
            répondant aux attentes croissantes en matière de multi-canal.
          </p>
        </li>

        <Image
          src="/blog/blog10/services_creation_site_web_paris.png"
          alt="Services professionnels de création de site web à Paris"
          width={1000}
          height={1000}
          className="rounded-3xl w-full object-cover"
        />

        {/* SECTION 2 */}
        <li
          className="space-y-12"
          id="importance-site-internet-entreprises-parisiennes"
        >
          <h2 className="text-3xl lg:text-4xl 2xl:text-5xl font-semibold">
            L&apos;importance d&apos;un site internet pour les entreprises
            parisiennes
          </h2>
          <p className="lg:text-lg 2xl:text-xl">
            Les entreprises parisiennes trouvent dans un site internet
            professionnel{' '}
            <strong>
              un levier important pour accroître leur visibilité et leur
              notoriété
            </strong>
            . Dans une métropole aussi concurrentielle, cette vitrine digitale
            24h/24 renforce la crédibilité face à 75% de consommateurs jugeant
            l&apos;entreprise à son interface web. Les 92% d&apos;entreprises
            reconnaissant son utilité confirment son rôle stratégique.
          </p>

          <div className="overflow-auto max-w-full rounded-3xl border bg-white dark:bg-black border-neutral-300 dark:border-neutral-700">
            <table className="w-full text-sm text-left bg-white dark:bg-black">
              <caption className="text-base font-semibold p-4">
                Comparatif des avantages d&apos;un site web professionnel versus
                autres moyens de communication digitale
              </caption>
              <thead className="bg-neutral-100 dark:bg-neutral-800">
                <tr>
                  <th className="px-4 py-2">Aspects</th>
                  <th className="px-4 py-2">Site web professionnel</th>
                  <th className="px-4 py-2">Réseaux sociaux</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-t">
                  <td className="px-4 py-2">Espace numérique</td>
                  <td className="px-4 py-2">
                    Espace dont l&apos;entreprise est propriétaire
                  </td>
                  <td className="px-4 py-2">Espace « loué » à la plateforme</td>
                </tr>
                <tr className="border-t">
                  <td className="px-4 py-2">Contrôle</td>
                  <td className="px-4 py-2">
                    Contrôle total sur le contenu, le design et la collecte de
                    données (RGPD)
                  </td>
                  <td className="px-4 py-2">
                    Contrôle limité, soumis aux règles et algorithmes des
                    plateformes
                  </td>
                </tr>
                <tr className="border-t">
                  <td className="px-4 py-2">Durabilité</td>
                  <td className="px-4 py-2">
                    Construction durable, investissement à long terme
                  </td>
                  <td className="px-4 py-2">
                    Contenu éphémère, nécessite une interaction constante
                  </td>
                </tr>
                <tr className="border-t">
                  <td className="px-4 py-2">Coûts</td>
                  <td className="px-4 py-2">
                    Frais directs (nom de domaine, hébergement, développement)
                  </td>
                  <td className="px-4 py-2">
                    « Apparemment gratuits » mais nécessitent des
                    investissements pour l&apos;impact
                  </td>
                </tr>
                <tr className="border-t">
                  <td className="px-4 py-2">Image de marque</td>
                  <td className="px-4 py-2">
                    Présentation cohérente avec l&apos;identité visuelle de
                    l&apos;entreprise
                  </td>
                  <td className="px-4 py-2">
                    Adaptation aux formats imposés par les plateformes
                  </td>
                </tr>
                <tr className="border-t">
                  <td className="px-4 py-2">Visibilité</td>
                  <td className="px-4 py-2">
                    Visibilité progressive via le référencement naturel
                  </td>
                  <td className="px-4 py-2">
                    Visibilité immédiate à une large audience
                  </td>
                </tr>
                <tr className="border-t">
                  <td className="px-4 py-2">Interaction</td>
                  <td className="px-4 py-2">
                    Interaction via formulaires, chat, newsletter
                  </td>
                  <td className="px-4 py-2">
                    Interaction directe et immédiate avec le public
                  </td>
                </tr>
                <tr className="border-t">
                  <td className="px-4 py-2" colSpan={3}>
                    Le site web sert de plateforme centrale pour les
                    informations fiables et la crédibilité, tandis que les
                    réseaux sociaux renforcent l&apos;engagement et génèrent du
                    trafic vers le site.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <p className="lg:text-lg 2xl:text-xl">
            Un site web optimisé ouvre des perspectives commerciales concrètes
            aux entreprises parisiennes. Il capte les 97% d&apos;internautes
            utilisant la recherche locale,{' '}
            <strong>transforme les visites en leads</strong> grâce à des outils
            comme les formulaires ou les contenus premium.{' '}
            <Link
              href="/agence-web-vauhallan"
              className="text-blue-600 underline"
              target="_blank"
            >
              Les agences locales comme celle de Vauhallan
            </Link>{' '}
            offrent des stratégies digitales complètes pour amplifier cette
            visibilité, convertir les 1 à 3% de visiteurs qualifiés en prospects
            concrets.
          </p>
        </li>

        <Image
          src="/blog/blog10/importance_site_internet_paris.png"
          alt="Importance d'un site internet pour les entreprises parisiennes"
          width={1000}
          height={1000}
          className="rounded-3xl w-full object-cover"
        />

        {/* SECTION 3 */}
        <li
          className="space-y-12"
          id="processus-creation-site-web-agence-parisienne"
        >
          <h2 className="text-3xl lg:text-4xl 2xl:text-5xl font-semibold">
            Le processus de création d&apos;un site web par une agence
            parisienne
          </h2>

          <h3 className="text-2xl lg:text-3xl 2xl:text-4xl font-semibold">
            L&apos;analyse des besoins et stratégie digitale
          </h3>
          <p className="lg:text-lg 2xl:text-xl">
            Le processus débute par une phase d&apos;écoute pour comprendre les
            objectifs du projet. Cette étape permet de définir précisément les
            attentes du client et d&apos;établir une{' '}
            <strong>feuille de route claire</strong> pour toutes les étapes à
            venir.
          </p>
          <p className="lg:text-lg 2xl:text-xl">
            Les agences parisiennes utilisent le cadre SMART pour fixer des
            objectifs mesurables et atteignables. Elles identifient les
            indicateurs clés de performance et étudient le comportement des
            utilisateurs pour élaborer une{' '}
            <strong>
              stratégie digitale alignée avec les besoins business
            </strong>
            .
          </p>

          <h3 className="text-2xl lg:text-3xl 2xl:text-4xl font-semibold">
            Design et expérience utilisateur
          </h3>
          <p className="lg:text-lg 2xl:text-xl">
            Les interfaces sont conçues en priorisant l&apos;expérience
            utilisateur. Les agences parisiennes intègrent des éléments
            d&apos;accessibilité et de navigation intuitive pour{' '}
            <strong>
              garantir une utilisation fluide sur tous les supports
            </strong>
            .
          </p>
          <p className="lg:text-lg 2xl:text-xl">
            Les équipes créatives explorent plusieurs concepts graphiques avant
            de valider la maquette finale.{' '}
            <strong>Le responsive design est systématiquement intégré</strong>,
            sachant que plus de la moitié du trafic web provient désormais des
            appareils mobiles.
          </p>

          <h3 className="text-2xl lg:text-3xl 2xl:text-4xl font-semibold">
            Développement et intégration technique
          </h3>
          <p className="lg:text-lg 2xl:text-xl">
            Les développeurs transforment les maquettes en site fonctionnel en
            combinant langages front-end et back-end. Le code est{' '}
            <strong>
              optimisé pour assurer performance, sécurité et évolutivité
            </strong>{' '}
            sur le long terme.
          </p>
          <p className="lg:text-lg 2xl:text-xl">
            Les développeurs parisiens privilégient des outils éprouvés comme
            WordPress, utilisé par plus de 43% des sites mondiaux, ou des
            solutions personnalisées selon l&apos;ampleur du projet. Chaque
            choix technique répond à un{' '}
            <strong>besoin spécifique du client</strong>.
          </p>

          <h3 className="text-2xl lg:text-3xl 2xl:text-4xl font-semibold">
            Référencement naturel et mise en ligne
          </h3>
          <p className="lg:text-lg 2xl:text-xl">
            Les bonnes pratiques SEO sont appliquées dès la conception du site.
            L&apos;optimisation technique, la structure du contenu et les
            balises méta sont soigneusement configurées pour{' '}
            <strong>
              maximiser la visibilité sur les moteurs de recherche
            </strong>
            .
          </p>
          <p className="lg:text-lg 2xl:text-xl">
            Avant le lancement officiel, les tests vérifient la rapidité, la
            sécurité et la compatibilité mobile.{' '}
            <Link
              href="/refonte-site-web-strategique"
              className="text-blue-600 underline"
              target="_blank"
            >
              <strong>Une refonte stratégique</strong>
            </Link>{' '}
            inclut aussi la vérification de l&apos;indexation par les moteurs de
            recherche et la configuration des outils de suivi de performance.
          </p>
        </li>

        <Image
          src="/blog/blog10/processus_agence_web_paris.png"
          alt="Processus de création d'un site par une agence web à Paris"
          width={1000}
          height={1000}
          className="rounded-3xl w-full object-cover"
        />

        {/* SECTION 4 */}
        <li
          className="space-y-12"
          id="budget-tarifs-creation-site-internet-paris"
        >
          <h2 className="text-3xl lg:text-4xl 2xl:text-5xl font-semibold">
            Budget et tarifs pour la création de site internet à Paris
          </h2>

          <h3 className="text-2xl lg:text-3xl 2xl:text-4xl font-semibold">
            Coûts selon les types de sites web
          </h3>
          <p className="lg:text-lg 2xl:text-xl">
            Les tarifs varient selon le type de site.{' '}
            <strong>Un site vitrine simple débute à 800 €</strong>, un
            e-commerce à 3&nbsp;000&nbsp;€ avec un freelance.
          </p>

          <div className="overflow-auto max-w-full rounded-3xl border bg-white dark:bg-black border-neutral-300 dark:border-neutral-700">
            <table className="w-full text-sm text-left bg-white dark:bg-black">
              <caption className="text-base font-semibold p-4">
                Comparatif des tarifs moyens par type de site web et niveau de
                difficulté à Paris
              </caption>
              <thead className="bg-neutral-100 dark:bg-neutral-800">
                <tr>
                  <th className="px-4 py-2">Type de site</th>
                  <th className="px-4 py-2">Freelance</th>
                  <th className="px-4 py-2">Agence web</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-t">
                  <td className="px-4 py-2">Site vitrine</td>
                  <td className="px-4 py-2">800 € - 3&nbsp;000 €</td>
                  <td className="px-4 py-2">1&nbsp;800 € - 7&nbsp;000 €</td>
                </tr>
                <tr className="border-t">
                  <td className="px-4 py-2">E-commerce</td>
                  <td className="px-4 py-2">3&nbsp;000 € - 10&nbsp;000 €</td>
                  <td className="px-4 py-2">5&nbsp;000 € - 50&nbsp;000 €</td>
                </tr>
                <tr className="border-t">
                  <td className="px-4 py-2">Site sur mesure</td>
                  <td className="px-4 py-2">5&nbsp;000 € - 20&nbsp;000 €</td>
                  <td className="px-4 py-2">10&nbsp;000 € - 100&nbsp;000 €+</td>
                </tr>
                <tr className="border-t">
                  <td className="px-4 py-2">Application web</td>
                  <td className="px-4 py-2">8&nbsp;000 € - 25&nbsp;000 €</td>
                  <td className="px-4 py-2">15&nbsp;000 € - 100&nbsp;000 €+</td>
                </tr>
              </tbody>
            </table>
          </div>

          <p className="lg:text-lg 2xl:text-xl">
            Le prix dépend de la complexité du projet, du nombre de pages et de
            fonctionnalités.{' '}
            <Link
              href="/creation-digital-guide"
              className="text-blue-600 underline"
              target="_blank"
            >
              Ce guide sur les tendances digitales
            </Link>{' '}
            aide à comprendre <strong>comment optimiser son budget</strong> en
            fonction des technologies et des fonctionnalités clés.
          </p>

          <h3 className="text-2xl lg:text-3xl 2xl:text-4xl font-semibold">
            Services inclus dans la création
          </h3>
          <p className="lg:text-lg 2xl:text-xl">
            Un forfait inclut{' '}
            <strong>
              nom de domaine, hébergement, design de base et développement
            </strong>{' '}
            essentiel à la fonctionnalité du site.
          </p>
          <p className="lg:text-lg 2xl:text-xl">
            Les agences parisiennes ajoutent souvent rédaction web,
            photographie, vidéo et formation aux outils. Elles proposent aussi
            stratégie digitale et optimisation pour les moteurs de recherche
            pour <strong>renforcer l&apos;efficacité du site</strong>.
          </p>

          <h3 className="text-2xl lg:text-3xl 2xl:text-4xl font-semibold">
            Maintenance et suivi après lancement
          </h3>
          <p className="lg:text-lg 2xl:text-xl">
            Les agences offrent maintenance technique, mises à jour et sécurité.
            Elles assurent{' '}
            <strong>le bon fonctionnement du site et son évolution</strong>{' '}
            selon les besoins des utilisateurs et les évolutions techniques.
          </p>
          <p className="lg:text-lg 2xl:text-xl">
            Les agences web parisiennes offrent expertise et solutions digitales
            personnalisées pour une présence en ligne impactante. Votre site
            internet, allié stratégique pour rayonner dans la capitale, mérite
            une approche professionnelle.{' '}
            <strong>Confiez votre projet à des experts locaux</strong> et
            transformez votre vision en réalité digitale aujourd’hui.
          </p>
        </li>

        <Image
          src="/blog/blog10/budget_tarifs_site_web_paris.png"
          alt="Budget et tarifs de création de site internet à Paris"
          width={1000}
          height={1000}
          className="rounded-3xl w-full object-cover"
        />
      </ul>

      {/* FAQ */}
      <div className="space-y-12 px-2">
        <h2 className="text-3xl lg:text-4xl 2xl:text-5xl font-semibold">FAQ</h2>
        <Accordion type="single" className="gap-3 flex flex-col" collapsible>
          {faqData.map((faq, index) => (
            <AccordionItem
              value={`item-${index + 1}`}
              key={index}
              className="bg-[#5ad9f230] py-2 shadow-inner shadow-[#0000000c] dark:shadow-[#e5f8fd1a] px-2 dark:bg-[#141c25]"
              style={{ zIndex: index }}
            >
              <AccordionTrigger className="py-4">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent>{faq.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>

      {/* CTA Final */}
      <CallToAction
        title="Besoin d'un site web sur-mesure à Paris ?"
        desc="Notre équipe conçoit des sites performants et élégants, pensés pour vos objectifs business et votre audience parisienne. Passez de l’idée à un site qui génère des résultats."
        textBtn="Démarrer mon projet à Paris"
      />
    </div>
  );
}
