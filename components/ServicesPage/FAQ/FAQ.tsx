import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

export const faqData = [
  {
    question: "Qu'est-ce qu'Ikovaline ?",
    answer:
      'Ikovaline est une start-up spécialisée en marketing digital et transformation numérique. Nous aidons les entreprises à améliorer leur visibilité en ligne, optimiser leur Google My Business, gérer leur e-réputation et piloter leurs projets de croissance. Notre force : des solutions sur-mesure pour chaque étape de votre développement.',
  },
  {
    question: 'Comment Ikovaline peut-elle aider mon entreprise ?',
    answer:
      'Grâce à une approche personnalisée, nous vous accompagnons dans votre digitalisation : refonte de site web, SEO/SEA, réseaux sociaux, publicité en ligne, contenu... Notre objectif ? Augmenter votre visibilité, votre trafic et vos résultats commerciaux.',
  },
  {
    question:
      'Quels résultats puis-je attendre en travaillant avec Ikovaline ?',
    answer:
      "En moyenne, nos clients constatent une hausse de leur visibilité en ligne, un trafic qualifié en progression, et une nette amélioration de leur notoriété. Résultat : une croissance du chiffre d'affaires pouvant atteindre +70% selon les cas.",
  },
  {
    question: "Quels types d'entreprises pouvez-vous aider ?",
    answer:
      'Nous travaillons avec PME, start-up et grandes entreprises de tous secteurs : commerce, services, industrie, tech, santé, etc. Chaque mission est adaptée à vos objectifs et à vos enjeux spécifiques.',
  },
  {
    question: 'Quels services proposez-vous exactement ?',
    answer: (
      <ul className="list-disc pl-5 space-y-2">
        <li>Référencement naturel (SEO) & publicitaire (SEA)</li>
        <li>Gestion Google My Business & e-réputation</li>
        <li>Social media (LinkedIn, TikTok, Insta…)</li>
        <li>Création de sites vitrine et e-commerce</li>
        <li>Lancement de campagnes Google Ads & Social Ads</li>
        <li>
          Consulting en développement commercial, stratégie et gestion de projet
        </li>
      </ul>
    ),
  },
  {
    question: 'Comment débuter avec Ikovaline ?',
    answer:
      'C’est simple : rendez-vous sur la page Contact ! Nous échangeons ensemble sur vos objectifs pour vous proposer une stratégie adaptée et un accompagnement efficace.',
  },
];

export default function FAQ() {
  return (
    <section
      id="faq"
      className="relative max-w-5xl mx-auto px-5 py-20 space-y-12"
    >
      {/* Halo bleu subtil derrière le titre */}
      <span
        aria-hidden
        className="absolute top-20 left-1/2 -translate-x-1/2 h-64 w-64 rounded-full blur-[160px] bg-sky-400/20 dark:bg-sky-600/20"
      />

      <h2 className="sm:text-4xl text-3xl text-center mb-12 font-bold bg-gradient-to-t from-neutral-700 to-neutral-900 dark:from-neutral-200 dark:to-neutral-400 bg-clip-text text-transparent">
        Une question sur nos services digitaux ?
        <br /> Toutes les réponses ici
      </h2>

      <Accordion type="single" collapsible className="flex flex-col gap-4">
        {faqData.map((faq, index) => (
          <AccordionItem
            value={`item-${index + 1}`}
            key={index}
            className="relative"
          >
            <AccordionTrigger>{faq.question}</AccordionTrigger>
            <AccordionContent>{faq.answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
}
