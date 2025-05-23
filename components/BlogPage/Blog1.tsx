import Image from "next/image";
import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import CallToAction from "../callToAction/CallToAction";

const faqData = [
  {
    question: "Comment héberger un site web gratuitement ?",
    answer:
      "Via GitHub Pages, Netlify ou Vercel, si vous avez un site statique.",
  },
  {
    question: "Quel est le meilleur hébergeur pour un site vitrine ?",
    answer: " OVH ou o2switch offrent un bon rapport qualité/prix.",
  },
  {
    question: "Combien coûte l’hébergement d’un site ?",
    answer: " Entre 2€ et 15€/mois selon l’offre choisie.",
  },
];

export default function Blog1() {
  return (
    <div className="md:px-20 px-2 py-20 space-y-20">
      <div className="flex flex-col gap-12 jsutify-center items-center">
        <h1 className=" sm:text-4xl lg:text-5xl 2xl:text-6xl text-3xl text-center font-bold bg-gradient-to-t from-neutral-700 to-neutral-900 dark:from-neutral-400 dark:to-neutral-100  bg-clip-text text-transparent">
          Comment héberger un site web en 2025 : guide complet pour débutants
        </h1>
        <p className="text-center lg:text-lg">
          Vous avez créé un site web et vous vous demandez maintenant comment le
          rendre accessible en ligne ? <br /> <br /> Que vous soyez
          entrepreneur, étudiant ou passionné, ce guide vous explique{" "}
          <strong>comment héberger un site web</strong> étape par étape.
          Hébergement mutualisé, cloud, gratuit ou local : découvrez les
          options, leurs avantages, et les pièges à éviter.
        </p>
        <Image
          src={"/blog/blog1/comment-heberger-un-site.jpg"}
          alt="Illustration hébergement web"
          width={600}
          height={400}
          className="rounded-3xl aspect-video w-full object-cover"
        />
      </div>
      <ul className="space-y-24 text-center sm:text-left">
        <li className="space-y-8">
          <h2 className="text-2xl  lg:text-3xl 2xl:text-4xl font-semibold">
            1. Qu’est-ce que l’hébergement web ?
          </h2>
          <p className="lg:text-lg 2xl:text-xl">
            Héberger un site web signifie le stocker sur un serveur connecté à
            Internet, afin que tout le monde puisse y accéder. Ce serveur est
            fourni par un <strong>hébergeur web</strong> comme OVH, Hostinger ou
            Infomaniak.
          </p>
          <p className="lg:text-lg 2xl:text-xl">
            Il existe plusieurs types d’hébergement : <em>mutualisé</em>,{" "}
            <em>VPS</em>, <em>cloud</em>, ou encore <em>gratuit</em> via GitHub
            Pages ou Netlify. Le choix dépend de vos besoins, de la complexité
            de votre site et de votre budget.
          </p>
          <Image
            src="/blog/blog1/types-herbergement-web.png"
            alt="Types d'hébergement"
            width={600}
            height={400}
            className="w-full rounded-3xl shadow-2xl"
          />
        </li>
        <li className="space-y-8">
          <h2 className="text-2xl  lg:text-3xl 2xl:text-4xl font-semibold">
            2. Les étapes pour héberger son site
          </h2>
          <p className="lg:text-lg 2xl:text-xl">
            <strong>A. Acheter un nom de domaine</strong> : choisissez un nom
            simple, professionnel et disponible. Vous pouvez l’acheter chez
            Gandi, OVH ou Ionos.
          </p>
          <p className="lg:text-lg 2xl:text-xl">
            <strong>B. Choisir un hébergeur</strong> : privilégiez un hébergeur
            avec un bon support, un bon uptime et des performances correctes.
            OVH, Infomaniak ou o2switch sont des options fiables.
          </p>
          <p className="lg:text-lg 2xl:text-xl">
            <strong>C. Lier le domaine à l’hébergement</strong> : une fois le
            domaine acheté, vous devez le connecter à votre hébergement via les
            DNS.
          </p>
          <p>
            <strong>D. Envoyer vos fichiers</strong> : utilisez un client FTP
            (comme FileZilla) ou un tableau de bord comme cPanel pour téléverser
            vos fichiers HTML/CSS/JS. Si vous utilisez un générateur statique,
            vous pouvez aussi déployer via GitHub ou Vercel.
          </p>
        </li>
        <CallToAction
          title="Vous avez un projet de site web ?"
          desc="Chez Ikovaline, on ne fait pas que vous expliquer comment héberger un site : on le fait pour vous, avec un site rapide, optimisé et clé en main."
          textBtn="Lancez votre projet maintenant"
        />
        <li className="space-y-8">
          <h2 className="text-2xl  lg:text-3xl 2xl:text-4xl font-semibold">
            3. Solutions d’hébergement populaires
          </h2>
          <p className="lg:text-lg 2xl:text-xl">
            Voici quelques plateformes où vous pouvez héberger votre site web :
          </p>
          <p className="lg:text-lg 2xl:text-xl">
            - <strong>OVHcloud</strong> : leader français, adapté aux sites
            professionnels
            <br />- <strong>GitHub Pages</strong> : hébergement gratuit pour les
            sites statiques
            <br />- <strong>Netlify</strong> : idéal pour les projets modernes,
            compatible avec Next.js
            <br />- <strong>Infomaniak</strong> : bon équilibre performance/prix
            en Suisse/France
          </p>
          <Image
            src="/blog/blog1/plateforme-hebergement.jpg"
            alt="Plateformes d'hébergement populaires"
            width={600}
            height={400}
            className="rounded-3xl shadow-2xl aspect-video w-full"
          />
        </li>
      </ul>
      <div className="space-y-8">
        <h2 className="text-2xl  lg:text-3xl 2xl:text-4xl font-semibold">
          FAQ : réponses aux questions fréquentes
        </h2>
        <Accordion type="single" className="gap-3 flex flex-col" collapsible>
          {faqData.map((faq, index) => (
            <AccordionItem
              value={`item-${index + 1}`}
              key={index}
              className="bg-[#5ad9f230] py-2  shadow-inner  shadow-[#0000000c] dark:shadow-[#e5f8fd1a] px-2 dark:bg-[#141c25]"
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
        <h2 className="text-2xl  lg:text-3xl 2xl:text-4xl font-semibold">
          Conclusion
        </h2>
        <p className="lg:text-lg 2xl:text-xl">
          Héberger un site web n’est pas aussi compliqué qu’il n’y paraît. Avec
          un bon nom de domaine, un hébergeur fiable et un peu de méthode, vous
          pouvez rendre votre projet accessible au monde entier. Besoin d’un
          accompagnement ? L’équipe Ikovaline vous guide de A à Z pour créer,
          héberger et optimiser votre site web professionnel.
        </p>
      </div>
    </div>
  );
}
