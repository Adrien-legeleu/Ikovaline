import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqData = [
  {
    question: "Qu'est-ce qu'Ikovaline ?",
    answer:
      "	Ikovaline est une start-up spécialisée en marketing digital et transformation numérique. Nous aidons les entreprises à améliorer leur visibilité en ligne, optimiser leur Google My Business, gérer leur e-réputation et piloter leurs projets de croissance. Notre force : des solutions sur-mesure pour chaque étape de votre développement.",
  },
  {
    question: "Comment Ikovaline peut-elle aider mon entreprise ?",
    answer:
      "Grâce à une approche personnalisée, nous vous accompagnons dans votre digitalisation : refonte de site web, SEO/SEA, réseaux sociaux, publicité en ligne, contenu... Notre objectif ? Augmenter votre visibilité, votre trafic et vos résultats commerciaux.",
  },
  {
    question:
      "Quels résultats puis-je attendre en travaillant avec Ikovaline ?",
    answer:
      "En moyenne, nos clients constatent une hausse de leur visibilité en ligne, un trafic qualifié en progression, et une nette amélioration de leur notoriété. Résultat : une croissance du chiffre d'affaires pouvant atteindre +70% selon les cas.",
  },
  {
    question: "Quels types d'entreprises pouvez-vous aider ?",
    answer:
      "Nous travaillons avec PME, start-up et grandes entreprises de tous secteurs : commerce, services, industrie, tech, santé, etc. Chaque mission est adaptée à vos objectifs et à vos enjeux spécifiques.",
  },
  {
    question: "Quels services proposez-vous exactement ?",
    answer:
      "- Référencement naturel (SEO) & publicitaire (SEA)\n" +
      "- Gestion Google My Business & e-réputation\n" +
      "- Social media (LinkedIn, TikTok, Insta…)\n" +
      "- Création de sites vitrine et e-commerce\n" +
      "- Lancement de campagnes Google Ads & Social Ads\n" +
      "- Consulting en développement commercial, stratégie et gestion de projet",
  },
  {
    question: "Comment débuter avec Ikovaline ?",
    answer:
      "C’est simple : rendez-vous sur la page Contact ! Nous échangeons ensemble sur vos objectifs pour vous proposer une stratégie adaptée et un accompagnement efficace.",
  },
];

export default function FAQ() {
  return (
    <div id="faq" className="max-w-5xl  py-20 space-y-12 mx-auto px-5">
      <h2 className="sm:text-4xl text-3xl items-center justify-center text-center mb-12 font-bold bg-gradient-to-t from-neutral-500 to-neutral-800 dark:to-neutral-500 dark:from-neutral-200 bg-clip-text text-transparent">
        Une question sur nos services digitaux ?<br /> Toutes les réponses ici
      </h2>

      <Accordion type="single" className="gap-3 flex flex-col" collapsible>
        {faqData.map((faq, index) => (
          <AccordionItem
            value={`item-${index + 1}`}
            key={index}
            className="bg-[#5ad9f230] py-2  shadow-inner  shadow-[#0000000c] dark:shadow-[#e5f8fd1a] px-5 dark:bg-[#141c25]"
            style={{ zIndex: index }}
          >
            <AccordionTrigger className="py-4">{faq.question}</AccordionTrigger>
            <AccordionContent>{faq.answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
