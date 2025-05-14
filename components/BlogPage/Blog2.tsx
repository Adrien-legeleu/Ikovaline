import Image from "next/image";
import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { CallToAction } from "../callToAction/CallToAction";

const faqData = [
  {
    question:
      "Quels sont les avantages d’une arborescence claire pour le SEO ?",
    answer:
      "Elle facilite l’indexation par Google, améliore le maillage interne et réduit la profondeur de clics.",
  },
  {
    question: "Quels outils pour créer une arborescence de site web ?",
    answer:
      "Figma, Whimsical, GlooMaps, XMind ou encore Excel sont très utilisés.",
  },
  {
    question: "Combien de niveaux faut-il idéalement ?",
    answer:
      "Pas plus de 3 niveaux pour les pages importantes. L’objectif : tout doit être accessible en 3 clics maximum.",
  },
];

export default function BLog2() {
  return (
    <div className="md:px-20 px-5 py-20 space-y-20">
      <div className="flex flex-col gap-12 jsutify-center items-center">
        <h1 className="sm:text-4xl lg:text-5xl 2xl:text-6xl text-3xl text-center font-bold bg-gradient-to-t from-neutral-700 to-neutral-900 dark:from-neutral-400 dark:to-neutral-100  bg-clip-text text-transparent">
          Arborescence d’un site web : guide complet pour une structure efficace
          et SEO-friendly
        </h1>
        <p className="text-center lg:text-lg">
          L’arborescence d’un site web est la base de toute stratégie SEO et UX.
          Une structure bien pensée facilite la navigation, améliore
          l’indexation et augmente la conversion. Voici comment construire une
          arborescence de site optimale en 2025.
        </p>
        <Image
          src="/blog/blog2/arborescence-site-web-illustration.jpeg"
          alt="Illustration arborescence site web"
          width={600}
          height={400}
          className="rounded-3xl aspect-video w-full object-cover"
        />
      </div>

      <ul className="space-y-24 text-center sm:text-left">
        <li className="space-y-8">
          <h2 className="text-2xl lg:text-3xl 2xl:text-4xl font-semibold">
            1. C’est quoi une arborescence de site web ?
          </h2>
          <p className="lg:text-lg 2xl:text-xl">
            L’arborescence est l’organisation hiérarchique des pages d’un site.
            On la visualise souvent sous forme de schéma en arbre, avec la page
            d’accueil en racine, les catégories en branches, et les sous-pages
            en feuilles.
          </p>
          <p className="lg:text-lg 2xl:text-xl">
            Une bonne arborescence aide Google à explorer ton site, et les
            visiteurs à trouver rapidement l’information recherchée. Elle
            améliore donc à la fois le <strong>SEO</strong> et l’
            <strong>expérience utilisateur</strong>.
          </p>
          <Image
            src="/blog/blog2/schema-arborescence-site-web-hierarchie.png"
            alt="Schéma arborescence site web"
            width={600}
            height={400}
            className="w-full rounded-3xl shadow-2xl"
          />
        </li>

        <li className="space-y-8">
          <h2 className="text-2xl lg:text-3xl 2xl:text-4xl font-semibold">
            2. Comment créer une arborescence efficace ?
          </h2>
          <p className="lg:text-lg 2xl:text-xl">
            Voici les étapes clés pour construire une arborescence optimisée :
          </p>
          <p className="lg:text-lg 2xl:text-xl">
            <strong>A. Définir les objectifs et personas</strong> : votre site
            doit répondre à un besoin clair. Qui visite ? Pourquoi ?
            <br />
            <strong>B. Lister les contenus</strong> : toutes les pages
            nécessaires (accueil, services, blog, contact, mentions…)
            <br />
            <strong>C. Organiser en niveaux</strong> : catégories,
            sous-catégories, pages secondaires
            <br />
            <strong>D. Créer des clusters thématiques</strong> : chaque
            catégorie regroupe des contenus proches liés par le maillage interne
            <br />
            <strong>E. Vérifier la profondeur</strong> : pas plus de 3 clics
            depuis la page d’accueil jusqu’à une page importante
          </p>
        </li>

        <CallToAction
          title="Besoin d’aide pour structurer votre site web ?"
          desc="L'agence web Ikovaline vous accompagne dans la création d’une arborescence claire, logique et optimisée SEO."
          textBtn="Optimiser mon site maintenant"
        />

        <li className="space-y-8">
          <h2 className="text-2xl lg:text-3xl 2xl:text-4xl font-semibold">
            3. Exemples d’arborescence de site web
          </h2>
          <p className="lg:text-lg 2xl:text-xl">
            Voici un exemple d’arborescence pour un site vitrine classique :
          </p>
          <p className="lg:text-lg 2xl:text-xl">
            - Accueil
            <br />- À propos
            <br />- Nos Services
            <br />
            &nbsp;&nbsp;&nbsp;↳ Site vitrine
            <br />
            &nbsp;&nbsp;&nbsp;↳ Référencement naturel (SEO)
            <br />
            &nbsp;&nbsp;&nbsp;↳ Publicité Google Ads
            <br />- Témoignages
            <br />- Contact
            <br />- Mentions légales
          </p>
          <Image
            src="/blog/blog2/exemple-arborescence-site-e-commerce.jpg"
            alt="Exemple d'arborescence site web"
            width={600}
            height={400}
            className="rounded-3xl shadow-2xl aspect-video w-full"
          />
        </li>
      </ul>

      <div className="space-y-8">
        <h2 className="text-2xl lg:text-3xl 2xl:text-4xl font-semibold">
          FAQ : réponses aux questions fréquentes
        </h2>
        <Accordion type="single" className="gap-3 flex flex-col" collapsible>
          {faqData.map((faq, index) => (
            <AccordionItem
              value={`item-${index + 1}`}
              key={index}
              className="bg-[#5ad9f230] py-2 shadow-inner shadow-[#0000000c] dark:shadow-[#e5f8fd1a] px-5 dark:bg-[#141c25]"
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

      <div className="space-y-8">
        <h2 className="text-2xl lg:text-3xl 2xl:text-4xl font-semibold">
          Conclusion
        </h2>
        <p className="lg:text-lg 2xl:text-xl">
          Une arborescence de site web claire, bien pensée et peu profonde est
          un levier puissant pour améliorer votre SEO, l’expérience utilisateur
          et les conversions. Ne la négligez pas : elle structure tout votre
          projet digital. Et si vous souhaitez aller plus loin, Ikovaline vous
          aide à créer une arborescence sur mesure, orientée résultats.
        </p>
      </div>
    </div>
  );
}
