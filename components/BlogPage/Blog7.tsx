import Image from "next/image";
import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import CallToAction from "../callToAction/CallToAction";
import Link from "next/link";
import { Button } from "../ui/button";

const faqData = [
  {
    question: "Comment fonctionne concrètement le SEA ?",
    answer:
      "Le SEA, ou publicité sur les moteurs de recherche, permet aux entreprises d'acheter des espaces publicitaires sur les pages de résultats. Lorsqu'un utilisateur recherche des mots-clés pertinents, les annonces de l'entreprise peuvent apparaître en haut ou en bas de la page, signalées comme \"Annonces\" ou \"Sponsorisées\". Le SEA repose sur un système d'enchères où les annonceurs enchérissent sur des mots-clés. Le montant de l'enchère, combiné au score de qualité attribué par le moteur de recherche, détermine le positionnement de l'annonce. Lorsqu'un utilisateur clique sur l'annonce, l'annonceur paie un coût par clic (CPC). Le SEA permet un ciblage précis, offrant des résultats rapides et mesurables.",
  },
  {
    question: "Comment mesurer le succès d'une agence SEA ?",
    answer:
      "Le succès d'une agence SEA se mesure en évaluant la performance des campagnes publicitaires qu'elle gère, en suivant des indicateurs clés de performance (KPIs). Les KPIs stratégiques à surveiller incluent la visibilité (impressions, taux de clics), l'engagement (nombre de clics, taux de rebond) et les conversions (taux de conversion, coût par acquisition, retour sur investissement publicitaire). En analysant ces KPIs, il est possible d'évaluer l'efficacité des campagnes et d'identifier les axes d'amélioration. Une agence SEA performante est capable d'optimiser les campagnes pour améliorer la visibilité, l'engagement et les conversions, tout en maîtrisant les coûts.",
  },
  {
    question: "Quels sont les pièges à éviter avec le SEA ?",
    answer:
      "Parmi les pièges à éviter en SEA, il est crucial de ne pas négliger la recherche de mots-clés, car une recherche incomplète peut gaspiller le budget. Il est également important de soigner la qualité de l'annonce et d'optimiser la page de destination pour la conversion. Un suivi insuffisant des performances empêche l'optimisation des campagnes. Il faut également éviter de cibler une audience trop large, ignorer les extensions d'annonces, ou ne pas optimiser pour le mobile. De plus, il est essentiel d'effectuer des tests A/B, de maintenir la cohérence entre les mots-clés, les annonces et les pages de destination, et d'optimiser les enchères pour garantir l'efficacité de la campagne.",
  },
  {
    question: "SEA : quels outils d'analyse sont indispensables ?",
    answer:
      "Pour une agence SEA, plusieurs outils d'analyse sont indispensables. Le Google Keyword Planner permet de réaliser une étude de mots-clés et d'analyser leur volume de recherche. Semrush est une plateforme complète pour le marketing en ligne, incluant des outils d'analyse de mots-clés et de suivi de positionnement. Looker Studio (anciennement Google Data Studio) est un outil de visualisation de données qui permet de créer des tableaux de bord personnalisés pour suivre les performances des campagnes. Enfin, Google Analytics 4 (GA4) est essentiel pour suivre le comportement des utilisateurs sur un site web et mesurer les conversions.",
  },
];

export default function Blog7() {
  return (
    <div className="md:px-20 z-10 relative bg-transparent py-20 max-w-5xl mx-auto space-y-40">
      {/* INTRO + H1 */}
      <div className="flex flex-col px-2 gap-12 justify-center items-center">
        <h1 className="sm:text-4xl lg:text-5xl 2xl:text-6xl text-3xl text-center font-bold bg-gradient-to-t from-neutral-700 to-neutral-900 dark:from-neutral-400 dark:to-neutral-100 bg-clip-text text-transparent">
          Agence SEA : Campagnes Google Ads optimisées
        </h1>
        <p className="text-center lg:text-lg">
          Vous peinez à générer un trafic qualifié malgré vos efforts de
          visibilité en ligne ? Une agence SEA, spécialisée dans les campagnes
          Google Ads et le référencement payant, vous offre les clés pour
          amplifier votre présence sur les moteurs de recherche. Découvrez
          comment ces experts transforment votre stratégie digitale en{" "}
          <strong>résultats concrets</strong>, depuis la création de campagnes
          ciblées jusqu&apos;à l&apos;optimisation de votre budget, avec des
          méthodes éprouvées pour maximiser votre retour sur investissement.
        </p>
        <Link href="/contact">
          <Button>Discuter avec un expert SEA</Button>
        </Link>
        <Image
          src="/blog/blog7/agence-sea-google-ads.png"
          alt="Illustration campagne SEA Google Ads"
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
          <p className="lg:text-lg 2xl:text-xl">
            Voici les grandes étapes abordées dans ce guide SEA :
          </p>
          <ol className="list-decimal list-inside lg:text-lg 2xl:text-xl space-y-2">
            <li className="underline">
              <Link href="#definition-role-agence-sea">
                Comprendre le rôle d&apos;une agence SEA dans votre stratégie
                digitale
              </Link>
            </li>
            <li className="underline">
              <Link href="#choisir-agence-sea">
                Comment choisir la meilleure agence SEA pour votre entreprise
              </Link>
            </li>
            <li className="underline">
              <Link href="#strategies-sea-efficaces">
                Les stratégies SEA efficaces déployées par les agences
                spécialisées
              </Link>
            </li>
            <li className="underline">
              <Link href="#sea-pour-differents-secteurs">
                Comment le SEA s&apos;adapte à différents secteurs
                d&apos;activité
              </Link>
            </li>
          </ol>
        </li>
        <li className="space-y-12" id="definition-role-agence-sea">
          <h2 className="text-3xl lg:text-4xl 2xl:text-5xl font-semibold">
            Comprendre le rôle d&apos;une agence SEA dans votre stratégie
            digitale
          </h2>

          <h3 className="text-2xl lg:text-3xl 2xl:text-4xl font-semibold">
            Qu&apos;est-ce que le SEA et pourquoi est-il essentiel
            aujourd&apos;hui?
          </h3>
          <p className="lg:text-lg 2xl:text-xl">
            Le SEA, ou Search Engine Advertising, désigne la publicité payante
            sur les moteurs de recherche. Cette stratégie digitale permet aux
            entreprises d&apos;acheter des espaces publicitaires pour apparaître
            en tête des résultats de recherche. Contrairement au référencement
            naturel, le SEA offre une
            <strong> visibilité immédiate</strong>, idéale pour les lancements
            de produits ou les campagnes à court terme.{" "}
            <a
              href="https://www.ikovaline.com/"
              className="text-blue-600 underline"
              target="_blank"
            >
              Découvrez comment une agence SEA comme Ikovaline
            </a>{" "}
            peut transformer votre stratégie digitale.
          </p>

          <h3 className="text-2xl lg:text-3xl 2xl:text-4xl font-semibold">
            Différence entre le SEA et le SEO (référencement naturel) et comment
            ils se complètent
          </h3>
          <p className="lg:text-lg 2xl:text-xl">
            Le SEO vise à améliorer naturellement son classement dans les
            résultats de recherche, tandis que le SEA permet d&apos;acheter de
            la visibilité immédiatement. Ces deux approches sont complémentaires
            : le SEA génère du trafic rapidement,
            <strong> le SEO construit une présence pérenne</strong>. Ensemble,
            ils maximisent la visibilité d&apos;une entreprise sur les moteurs
            de recherche. Le SEA teste des mots-clés pour nourrir le SEO, qui
            capitalise ensuite sur les enseignements obtenus.
          </p>

          <h3 className="text-2xl lg:text-3xl 2xl:text-4xl font-semibold">
            Les services proposés par une agence SEA professionnelle
          </h3>
          <p className="lg:text-lg 2xl:text-xl">
            Une agence SEA gère l&apos;intégralité de vos campagnes
            publicitaires sur Google Ads, Microsoft Advertising et autres
            plateformes. Elle{" "}
            <strong>
              optimise vos annonces, améliore votre score de qualité
            </strong>{" "}
            et maximise votre retour sur investissement.{" "}
            <a
              href="https://www.ikovaline.com/nos-services"
              className="text-blue-600 underline"
              target="_blank"
            >
              Explorez les services SEA sur mesure
            </a>{" "}
            pour structurer vos campagnes.
          </p>
          <ul className="list-disc list-inside lg:text-lg 2xl:text-xl space-y-2">
            <li>
              <strong>Gérer des campagnes Google Ads</strong> pour une
              visibilité immédiate sur les moteurs de recherche
            </li>
            <li>
              Créer des <strong>campagnes shopping</strong> pour booster les
              ventes en ligne et optimiser les flux produits
            </li>
            <li>
              <strong>Annonces display ciblées</strong> pour renforcer la
              notoriété de marque sur le web
            </li>
            <li>
              <strong>Stratégies de remarketing</strong> pour fidéliser les
              visiteurs et augmenter les conversions
            </li>
            <li>
              <strong>Concevoir des campagnes vidéo</strong> sur YouTube pour
              captiver l&apos;audience avec un contenu engageant
            </li>
          </ul>
          <CallToAction
            title="Transformez chaque euro investi en résultats concrets"
            desc="Notre équipe SEA certifiée maximise votre budget publicitaire grâce à des stratégies Google Ads sur mesure. Lancez des campagnes qui convertissent."
            textBtn="Planifier une session stratégique"
          />

          <h3 className="text-2xl lg:text-3xl 2xl:text-4xl font-semibold">
            L&apos;approche stratégique d&apos;une agence SEA pour développer
            des campagnes performantes
          </h3>
          <p className="lg:text-lg 2xl:text-xl">
            Une agence SEA conçoit des campagnes personnalisées en étroite
            collaboration avec les clients. Elle identifie les cibles,
            sélectionne les mots-clés pertinents et construit des groupes
            d&apos;annonces thématiques. Les experts optimisent les enchères,
            ajustent le ciblage géographique et démographique, et perfectionnent
            les annonces pour maximiser les taux de clics. L&apos;accompagnement
            inclut un suivi en temps réel et des ajustements
            <strong> continus pour garantir des performances optimales</strong>.
          </p>

          <h3 className="text-2xl lg:text-3xl 2xl:text-4xl font-semibold">
            Les avantages concrets de faire appel à une agence SEA
          </h3>
          <p className="lg:text-lg 2xl:text-xl">
            Confier ses campagnes SEA à une agence certifiée apporte un avantage
            compétitif décisif. Les experts maîtrisent les subtilités des
            plateformes et <strong>optimisent chaque euro dépensé</strong>. Leur
            expertise réduit le coût par clic, améliore la qualité des annonces
            et maximise les conversions. Cette externalisation libère du temps
            pour se concentrer sur son cœur de métier tout en bénéficiant de
            résultats mesurables.
          </p>

          <h3 className="text-2xl lg:text-3xl 2xl:text-4xl font-semibold">
            Démonstration du retour sur investissement (ROI) qu&apos;une agence
            SEA peut générer
          </h3>
          <p className="lg:text-lg 2xl:text-xl">
            Une agence SEA professionnelle transforme votre budget en levier de
            croissance mesurable. Grâce à son expertise en acquisition de trafic
            qualifié et en optimisation des taux de conversion, elle{" "}
            <strong>maximise votre retour sur investissement</strong>. Les
            indicateurs clés comme le ROI, le taux de conversion et le coût par
            acquisition deviennent des leviers d&apos;amélioration continue.
            Vous bénéficiez d&apos;une visibilité renforcée et d&apos;une
            performance commerciale optimisée.
          </p>

          <h3 className="text-2xl lg:text-3xl 2xl:text-4xl font-semibold">
            Comment une agence SEA optimise vos campagnes Google Ads
          </h3>
          <p className="lg:text-lg 2xl:text-xl">
            Les agences SEA utilisent des{" "}
            <strong>
              techniques d&apos;optimisation avancées pour améliorer les
              performances
            </strong>
            des campagnes Google Ads. Elles mettent en place un suivi précis des
            conversions, affinent les enchères en fonction des objectifs, et
            optimisent les extensions d&apos;annonces.
          </p>

          <div className="overflow-auto max-w-full rounded-3xl border bg-white dark:bg-black border-neutral-300 dark:border-neutral-700">
            <table className="w-full text-sm text-left bg-white dark:bg-black">
              <caption className="text-base font-semibold p-4">
                Comparaison des principales métriques de performance SEA avant
                et après l&apos;intervention d&apos;une agence spécialisée
              </caption>
              <thead className="bg-neutral-100 dark:bg-neutral-800">
                <tr>
                  <th className="px-4 py-2">Métrique</th>
                  <th className="px-4 py-2">Avant intervention agence</th>
                  <th className="px-4 py-2">
                    Après optimisation par agence SEA
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-t">
                  <td className="px-4 py-2">Coût par acquisition (CPA)</td>
                  <td className="px-4 py-2">Moyenne : 45€</td>
                  <td className="px-4 py-2">
                    Réduction moyenne de 30% (ex: 31,50€)
                  </td>
                </tr>
                <tr className="border-t">
                  <td className="px-4 py-2">Taux de conversion</td>
                  <td className="px-4 py-2">Moyenne : 2,5%</td>
                  <td className="px-4 py-2">
                    Amélioration moyenne de 15% (ex: 2,875%)
                  </td>
                </tr>
                <tr className="border-t">
                  <td className="px-4 py-2">Taux de clics (CTR)</td>
                  <td className="px-4 py-2">Moyenne : 1,8%</td>
                  <td className="px-4 py-2">
                    Amélioration moyenne de 40% (ex: 2,52%)
                  </td>
                </tr>
                <tr className="border-t">
                  <td className="px-4 py-2">
                    Retour sur dépenses publicitaires (ROAS)
                  </td>
                  <td className="px-4 py-2">Moyenne : 3,2x</td>
                  <td className="px-4 py-2">
                    Amélioration moyenne de 50% (ex: 4,8x)
                  </td>
                </tr>
                <tr className="border-t">
                  <td className="px-4 py-2">Score de qualité Google Ads</td>
                  <td className="px-4 py-2">Moyenne : 6/10</td>
                  <td className="px-4 py-2">Amélioration moyenne à 8/10</td>
                </tr>
                <tr className="border-t">
                  <td className="px-4 py-2">Chiffre d&apos;affaires généré</td>
                  <td className="px-4 py-2">Base 100</td>
                  <td className="px-4 py-2">+70% d&apos;augmentation</td>
                </tr>
                <tr className="border-t">
                  <td className="px-4 py-2">Trafic qualifié</td>
                  <td className="px-4 py-2">Base 100</td>
                  <td className="px-4 py-2">+55% d&apos;augmentation</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3 className="text-2xl lg:text-3xl 2xl:text-4xl font-semibold">
            Le processus d&apos;analyse data et de reporting transparent
          </h3>
          <p className="lg:text-lg 2xl:text-xl">
            Les agences SEA établissent un suivi transparent de vos campagnes
            avec des rapports personnalisés. Elles analysent les données en
            profondeur pour identifier les leviers d&apos;amélioration et
            partagent régulièrement les résultats obtenus. Ces retours détaillés
            expliquent les décisions stratégiques prises et justifient les
            optimisations. Cette approche collaborative permet aux clients de
            comprendre l&apos;impact de chaque action et d&apos;
            <strong>aligner les objectifs marketing</strong> avec la réalité des
            performances.
          </p>
        </li>
        <Image
          src="/blog/blog7/role-agence-sea.png"
          alt="Rôle d'une agence SEA dans la stratégie digitale"
          width={1000}
          height={1000}
          className="rounded-3xl w-full object-cover"
        />
        <li className="space-y-12" id="choisir-agence-sea">
          <h2 className="text-3xl lg:text-4xl 2xl:text-5xl font-semibold">
            Comment choisir la meilleure agence SEA pour votre entreprise
          </h2>

          <h3 className="text-2xl lg:text-3xl 2xl:text-4xl font-semibold">
            Les critères essentiels pour sélectionner une agence SEA performante
          </h3>
          <p className="lg:text-lg 2xl:text-xl">
            La certification Google Partner Premier constitue un critère
            important pour identifier une
            <strong> agence SEA compétente</strong>. Ce label atteste de la
            maîtrise des outils Google Ads et garantit un accompagnement de
            qualité.{" "}
            <a
              href="https://www.ikovaline.com/contact"
              className="text-blue-600 underline"
              target="_blank"
            >
              Contactez notre agence certifiée
            </a>{" "}
            pour bénéficier d&apos;une expertise reconnue.
          </p>

          <ul className="list-disc list-inside lg:text-lg 2xl:text-xl space-y-2">
            <li>
              <strong>Quels indicateurs de performance</strong> avez-vous
              améliorés pour des clients similaires à mon secteur?
            </li>
            <li>
              Pouvez-vous fournir des <strong>études de cas détaillant</strong>{" "}
              vos méthodologies et résultats obtenus?
            </li>
            <li>
              Comment structurez-vous vos campagnes pour{" "}
              <strong>optimiser le retour</strong> sur investissement?
            </li>
            <li>
              <strong>Quels outils d&apos;analyse</strong> utilisez-vous pour
              mesurer et améliorer les performances?
            </li>
            <li>
              <strong>Audits réguliers</strong> pour ajuster les stratégies
              selon l&apos;évolution des objectifs?
            </li>
          </ul>

          <p className="lg:text-lg 2xl:text-xl">
            Les agences SEA proposent des modèles tarifaires variés adaptés aux
            besoins spécifiques : forfait mensuel pour une prestation encadrée,
            rémunération sur performance pour un alignement des objectifs ou
            frais de gestion calculés sur le budget média pour une transparence
            totale. Le modèle choisi
            <strong> dépendra de votre secteur</strong>, de vos ambitions et de
            votre marge de manœuvre budgétaire. Une PME privilégiera souvent un
            forfait prévisible, tandis qu&apos;une grande entreprise optera pour
            une rémunération liée aux résultats.
          </p>

          <h3 className="text-2xl lg:text-3xl 2xl:text-4xl font-semibold">
            L&apos;importance de l&apos;expertise sectorielle et des études de
            cas
          </h3>
          <p className="lg:text-lg 2xl:text-xl">
            Une agence SEA possédant une expertise sectorielle spécifique
            <strong> comprend les enjeux de votre marché</strong> et adapte les
            stratégies aux comportements de vos clients. Cette connaissance du
            secteur affine le choix des mots-clés, le ciblage publicitaire et
            l&apos;élaboration d&apos;annonces pertinentes.
          </p>
          <p className="lg:text-lg 2xl:text-xl">
            <strong>Les études de cas</strong> constituent des preuves sociales
            tangibles de la capacité d&apos;une agence à générer des résultats
            concrets. Lors de l&apos;analyse, concentrez-vous sur les
            indicateurs clés : augmentation du trafic qualifié, réduction du
            coût par acquisition et amélioration du taux de conversion. Vérifiez
            la pertinence des études en comparant la structure, les objectifs et
            les défis similaires à votre situation. Les témoignages clients et
            les données chiffrées renforcent la crédibilité des résultats
            présentés.
          </p>
        </li>
        <Image
          src="/blog/blog7/comment-choisir-la-meilleure-agence-sea.png"
          alt="  Comment choisir la meilleure agence SEA"
          width={1000}
          height={1000}
          className="rounded-3xl w-full object-cover"
        />
        <li className="space-y-12" id="strategies-sea-efficaces">
          <h2 className="text-3xl lg:text-4xl 2xl:text-5xl font-semibold">
            Les stratégies SEA efficaces déployées par les agences spécialisées
          </h2>

          <h3 className="text-2xl lg:text-3xl 2xl:text-4xl font-semibold">
            L&apos;importance de la recherche de mots-clés et du ciblage
            d&apos;audience
          </h3>
          <p className="lg:text-lg 2xl:text-xl">
            Les agences SEA utilisent Google Keyword Planner et d&apos;autres
            outils pour identifier les mots-clés pertinents. Elles analysent le
            volume de recherche, la concurrence et le coût par clic pour
            <strong> maximiser la performance des campagnes</strong>{" "}
            publicitaires.
          </p>
          <p className="lg:text-lg 2xl:text-xl">
            Les experts en SEA segmentent les audiences par localisation, âge,
            sexe et comportement d&apos;achat.
            <strong> Ils utilisent le remarketing</strong> pour cibler les
            visiteurs et optimisent les segments d&apos;audience à partir des
            données de recherche.
          </p>

          <h3 className="text-2xl lg:text-3xl 2xl:text-4xl font-semibold">
            La création d&apos;annonces performantes et l&apos;optimisation des
            landing pages
          </h3>
          <p className="lg:text-lg 2xl:text-xl">
            Les agences SEA conçoivent des <strong>annonces percutantes</strong>{" "}
            avec des titres accrocheurs et des appels à l&apos;action clairs.
            Elles testent régulièrement les formats pour identifier les
            combinaisons les plus efficaces.
          </p>
          <p className="lg:text-lg 2xl:text-xl">
            Les experts en SEA optimisent les landing pages pour aligner le
            message publicitaire avec le contenu. Ils{" "}
            <strong>simplifient les formulaires, améliorent le design</strong>{" "}
            et effectuent des tests A/B pour identifier les améliorations
            possibles.
          </p>
        </li>
        <Image
          src="/blog/blog7/strategies-efficaces.png"
          alt="Stratégies SEA efficaces"
          width={1000}
          height={1000}
          className="rounded-3xl w-full object-cover"
        />
        <li className="space-y-12" id="sea-pour-differents-secteurs">
          <h2 className="text-3xl lg:text-4xl 2xl:text-5xl font-semibold">
            Comment le SEA s&apos;adapte à différents secteurs d&apos;activité
          </h2>

          <h3 className="text-2xl lg:text-3xl 2xl:text-4xl font-semibold">
            Les spécificités du SEA pour le e-commerce et la vente en ligne
          </h3>
          <p className="lg:text-lg 2xl:text-xl">
            Le SEA s&apos;adapte parfaitement aux besoins du commerce
            électronique grâce à des outils comme Google Shopping et les
            annonces dynamiques. Ces formats visuels et automatisés permettent
            de mettre en avant les produits avec leurs images, prix et
            caractéristiques,{" "}
            <strong>augmentant ainsi les taux de conversion</strong>.{" "}
            <a
              href="https://www.ikovaline.com/nos-services"
              target="_blank"
              className="text-blue-600 underline"
            >
              Découvrez nos solutions SEA pour e-commerce
            </a>{" "}
            optimisées.
          </p>
          <p className="lg:text-lg 2xl:text-xl">
            Les agences SEA optimisent les campagnes e-commerce en suivant le
            parcours d&apos;achat et en personnalisant les annonces via le
            remarketing dynamique. Elles intègrent les flux produits pour une
            mise à jour en temps réel et ajustent les enchères selon la marge et
            les périodes commerciales. Ces stratégies ciblent les produits les
            plus rentables et adaptent les budgets aux saisons commerciales pour
            un <strong>ROI maximal</strong>.
          </p>
          <p className="lg:text-lg 2xl:text-xl">
            L&apos;expertise d&apos;une agence SEA spécialisée{" "}
            <strong>
              transforme vos campagnes Google Ads en leviers de croissance
            </strong>
            , optimisant visibilité et budget. En choisissant des experts
            certifiés, vous ciblez un trafic qualifié et maximisez votre retour
            sur investissement. Agissez dès maintenant : une stratégie sur
            mesure booste votre présence online et garantit des résultats
            durables.
          </p>
        </li>
        <Image
          src="/blog/blog7/strategies-sea-adaptees.png"
          alt="Stratégies SEA adaptées aux secteurs d'activité"
          width={1000}
          height={1000}
          className="rounded-3xl w-full object-cover"
        />
      </ul>
      <div className="space-y-12 px-2">
        <h2 className="text-3xl lg:text-4xl 2xl:text-5xl font-semibold">
          FAQ : réponses aux questions fréquentes
        </h2>
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
      <CallToAction
        title="Maximisez vos résultats SEA avec Ikovaline"
        desc="Nos experts SEA vous accompagnent pour structurer, optimiser et rentabiliser vos campagnes Google Ads. Prenez rendez-vous pour révéler tout votre potentiel publicitaire."
        textBtn="Réserver un appel"
      />
    </div>
  );
}
