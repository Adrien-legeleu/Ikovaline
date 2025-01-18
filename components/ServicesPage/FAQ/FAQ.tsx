import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqData = [
  {
    question: "Quest-ce qu'Ikovaline ?",
    answer:
      "Ikovaline est une start-up spécialisée dans le marketing digital et la transformation numérique. Nous aidons les entreprises à améliorer leur visibilité en ligne, à optimiser leur présence sur Google My Business, à gérer les avis clients, et à développer des solutions adaptées pour booster leur croissance.",
  },
  {
    question: "Comment Ikovaline peut-elle aider mon entreprise ?",
    answer:
      "Nous offrons des services personnalisés pour accompagner votre entreprise dans sa digitalisation. Cela inclut l'optimisation de votre site web, la gestion de vos campagnes publicitaires, le SEO, la gestion de vos réseaux sociaux, et bien plus. Notre objectif est de vous aider à augmenter votre visibilité et à atteindre vos objectifs commerciaux.",
  },
  {
    question:
      "Quels résultats puis-je attendre en travaillant avec Ikovaline ?",
    answer:
      "En travaillant avec Ikovaline, vous pouvez espérer une amélioration significative de votre visibilité en ligne, un accroissement du trafic sur votre site, une gestion efficace de votre e-réputation, et une augmentation de votre chiffre d'affaires grâce à une stratégie digitale bien ciblée.En fonction des profils, nous garantissons une croissance comprise entre 15% et 70%.",
  },
  {
    question: "Quels types d'entreprises pouvez-vous aider ?",
    answer:
      "Nous travaillons avec des entreprises de toutes tailles et de divers secteurs d’activité. Que vous soyez une PME, une start-up ou une grande entreprise, nous adaptons nos services à vos besoins spécifiques pour vous aider à réussir dans votre transformation numérique.",
  },
  {
    question: "Quels services proposez-vous exactement ?",
    answer:
      "Nous proposons une gamme complète de services digitaux, incluant :\n- Optimisation de la présence sur Google My Business\n- Stratégies SEO et SEM\n- Gestion des réseaux sociaux (Instagram, Facebook, LinkedIn, TikTok)\n- Création et optimisation de sites web (vitrine et e-commerce)\n- Lancement et gestion de campagnes publicitaires (Google Ads, Social Ads)\n- Consulting en développement commercial et stratégie",
  },
  {
    question: "Comment débuter avec Ikovaline ?",
    answer:
      "Commencez par prendre contact avec nous via notre page 'Contact'. Nous discuterons de vos objectifs et déterminerons ensemble la meilleure stratégie pour propulser votre entreprise vers le succès.",
  },
];

export default function FAQ() {
  return (
    <div id="faq" className="max-w-5xl  py-20 space-y-12 mx-auto px-5">
      <h2 className=" sm:text-4xl text-3xl items-center justify-center text-center  mb-12 font-bold bg-gradient-to-t from-neutral-500 to-neutral-800 dark:to-neutral-500 dark:from-neutral-200 bg-clip-text text-transparent">
        Des questions sur notre service ? <br /> Nous avons les réponses !
      </h2>
      <Accordion type="single" className="gap-2 flex flex-col" collapsible>
        {faqData.map((faq, index) => (
          <AccordionItem value={`item-${index + 1}`} key={index}>
            <AccordionTrigger>{faq.question}</AccordionTrigger>
            <AccordionContent>{faq.answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
