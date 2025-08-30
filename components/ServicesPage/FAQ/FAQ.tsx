'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import React, { isValidElement, ReactNode } from 'react';

/* ---------- helpers locale ---------- */
function useLocale() {
  const pathname = usePathname() || '/';
  const isEN = /^\/en(\/|$)/.test(pathname);
  return { isEN };
}
function localizeHref(href: string, isEN: boolean) {
  if (!isEN) return href;
  if (/^(https?:)?\/\//.test(href)) return href;
  if (/^\/en(\/|$)/.test(href)) return href;
  if (href === '/') return '/en';
  if (href.startsWith('/#')) return `/en${href}`;
  return href.startsWith('/') ? `/en${href}` : `/en/${href}`;
}

/* ---------- dictionnaires ---------- */
type FaqItem = { question: React.ReactNode; answer: React.ReactNode };

export const FAQ_FR: FaqItem[] = [
  {
    question: "Qu'est-ce qu'Ikovaline ?",
    answer:
      'Ikovaline est une start-up spécialisée en marketing digital et transformation numérique. Nous aidons les entreprises à améliorer leur visibilité en ligne, optimiser leur Google Business Profile, gérer leur e-réputation et piloter leurs projets de croissance. Notre force : des solutions sur-mesure pour chaque étape de votre développement.',
  },
  {
    question: 'Comment Ikovaline peut-elle aider mon entreprise ?',
    answer:
      'Grâce à une approche personnalisée, nous vous accompagnons dans votre digitalisation : refonte de site web, SEO/SEA, réseaux sociaux, publicité en ligne, contenu… Notre objectif ? Augmenter votre visibilité, votre trafic et vos résultats commerciaux.',
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
        <li>Optimisation Google Business Profile & e-réputation</li>
        <li>Social media (LinkedIn, TikTok, Instagram…)</li>
        <li>Création de sites vitrine & e-commerce</li>
        <li>Campagnes Google Ads & Social Ads</li>
        <li>
          Consulting en développement commercial, stratégie & gestion de projet
        </li>
      </ul>
    ),
  },
  {
    question: 'Comment débuter avec Ikovaline ?',
    answer: (
      <>
        C’est simple : rendez-vous sur la page{' '}
        <Link href="/contact" className="underline underline-offset-2">
          Contact
        </Link>
        . Nous échangeons sur vos objectifs pour vous proposer une stratégie
        adaptée et un accompagnement efficace.
      </>
    ),
  },
];

const FAQ_EN: FaqItem[] = [
  {
    question: 'What is Ikovaline?',
    answer:
      'Ikovaline is a startup specializing in digital marketing and transformation. We help businesses boost online visibility, optimize their Google Business Profile, manage online reputation, and drive growth projects with tailored solutions for every stage.',
  },
  {
    question: 'How can Ikovaline help my business?',
    answer:
      'With a personalized approach: website redesign, SEO/SEA, social media, online ads, content… Our goal is to increase your visibility, traffic, and commercial results.',
  },
  {
    question: 'What results can I expect when working with Ikovaline?',
    answer:
      'On average, clients see higher online visibility, more qualified traffic, and stronger brand awareness—leading to revenue growth that can reach +70%, depending on the case.',
  },
  {
    question: 'What types of companies do you work with?',
    answer:
      'We work with SMBs, startups, and larger companies across industries—retail, services, industry, tech, healthcare, and more. Every engagement is tailored to your objectives and constraints.',
  },
  {
    question: 'Which services do you offer exactly?',
    answer: (
      <ul className="list-disc pl-5 space-y-2">
        <li>Organic (SEO) & paid search (SEA)</li>
        <li>Google Business Profile optimization & online reputation</li>
        <li>Social media (LinkedIn, TikTok, Instagram…)</li>
        <li>Showcase & e-commerce website creation</li>
        <li>Google Ads & Social Ads campaigns</li>
        <li>Consulting in sales development, strategy & project management</li>
      </ul>
    ),
  },
  {
    question: 'How do we get started with Ikovaline?',
    answer: (
      <>
        Easy—head to the{' '}
        <Link href="/contact" className="underline underline-offset-2">
          Contact
        </Link>{' '}
        page. We’ll discuss your goals and propose a tailored strategy with
        effective support.
      </>
    ),
  },
];

/* ---------- composant ---------- */
export default function FAQ() {
  const { isEN } = useLocale();

  const remap = (node: ReactNode): ReactNode => {
    if (!node) return node;

    if (Array.isArray(node)) {
      return node.map(remap);
    }

    if (isValidElement(node)) {
      if (node.type === Link && node.props?.href) {
        return (
          <Link {...node.props} href={localizeHref(node.props.href, isEN)}>
            {remap(node.props.children)}
          </Link>
        );
      }

      if (node.props?.children) {
        return React.cloneElement(node, {
          children: remap(node.props.children),
        });
      }
    }

    return node;
  };

  const data = (isEN ? FAQ_EN : FAQ_FR).map((item) => ({
    ...item,
    answer: remap(item.answer),
  }));

  const heading = isEN ? (
    <>
      Any questions about our digital services?
      <br /> All the answers here
    </>
  ) : (
    <>
      Une question sur nos services digitaux ?
      <br /> Toutes les réponses ici
    </>
  );

  return (
    <section
      id="faq"
      className="relative mx-auto max-w-5xl px-5 py-20 space-y-12"
    >
      {/* Halo bleu subtil */}
      <span
        aria-hidden
        className="absolute top-20 left-1/2 -translate-x-1/2 h-64 w-64 rounded-full blur-[160px] bg-sky-400/20 dark:bg-sky-600/20"
      />

      <h2 className="mb-12 text-center text-3xl sm:text-4xl font-bold bg-gradient-to-t from-neutral-700 to-neutral-900 dark:from-neutral-200 dark:to-neutral-400 bg-clip-text text-transparent">
        {heading}
      </h2>

      <Accordion type="single" collapsible className="flex flex-col gap-4">
        {data.map((faq, index) => (
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
