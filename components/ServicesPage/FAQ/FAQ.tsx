// components/ServicesPage/faq/FAQ.tsx
'use client';

import * as React from 'react';
import Link from 'next/link';

type FaqItem = { question: React.ReactNode; answer: React.ReactNode };

const FAQ_FR: FaqItem[] = [
  {
    question: "Qu'est-ce qu'Ikovaline ?",
    answer:
      'Ikovaline est une start-up spécialisée en marketing digital et transformation numérique. Nous aidons les entreprises à améliorer leur visibilité en ligne, optimiser leur Google Business Profile, gérer leur e-réputation et piloter leurs projets de croissance. Notre force : des solutions sur-mesure pour chaque étape de votre développement.',
  },
  {
    question: 'Comment Ikovaline peut-elle aider mon entreprise ?',
    answer:
      'Grâce à une approche personnalisée, nous vous accompagnons dans votre digitalisation : refonte de site web, SEO/SEA, réseaux sociaux, publicité en ligne, contenu… Objectif : augmenter votre visibilité, votre trafic et vos résultats commerciaux.',
  },
  {
    question: 'Quels résultats puis-je attendre en travaillant avec Ikovaline ?',
    answer:
      "En moyenne, nos clients constatent une hausse de la visibilité en ligne, un trafic qualifié en progression et une meilleure notoriété. Résultat : une croissance du chiffre d’affaires pouvant atteindre +70% selon les cas.",
  },
  {
    question: "Quels types d'entreprises pouvez-vous aider ?",
    answer:
      'Nous travaillons avec PME, start-up et grands comptes, tous secteurs confondus (commerce, services, industrie, tech, santé…). Chaque mission est adaptée à vos objectifs et à vos enjeux.',
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
        <li>Conseil en stratégie, développement commercial & gestion de projet</li>
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
        . Nous échangeons sur vos objectifs et vous proposons une stratégie
        adaptée avec un accompagnement efficace.
      </>
    ),
  },
];

export default function FAQ() {
  return (
    <section id="faq" className="relative mx-auto max-w-6xl sm:px-6 px-2 py-16 sm:py-20">
      {/* halo discret */}
      <span
        aria-hidden
        className="pointer-events-none absolute top-16 left-1/2 -translate-x-1/2 h-64 w-64 rounded-full blur-[160px] bg-sky-400/20 dark:bg-sky-600/20"
      />

      {/* Titre + intro */}
      <div className="mb-8 sm:mb-10">
        <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-neutral-900 dark:text-white">
          Foire aux questions
        </h2>
        <p className="mt-3 max-w-3xl text-[13.5px] leading-6 sm:text-base sm:leading-7 text-neutral-600 dark:text-neutral-300">
          Nous sommes là pour vous aider. Si vous ne trouvez pas la réponse à
          votre question, contactez-nous via la page{' '}
          <Link href="/contact" className="underline underline-offset-2">
            Contact
          </Link>
          .
        </p>
      </div>

      {/* Masonry : 2 colonnes mobile, 3 colonnes desktop */}
      <div
        className="columns-1 xss:columns-2 lg:columns-3
          sm:gap-x-5 gap-x-2 lg:gap-x-6
          [column-fill:_balance]
        "
      >
        {FAQ_FR.map((item, i) => (
          <article
            key={i}
            className="
              mb-5 lg:mb-6 break-inside-avoid rounded-2xl bg-white p-3 sm:p-6
              shadow-[0_18px_50px_-28px_rgba(0,0,0,.25)] ring-1 ring-black/5
              dark:bg-neutral-900 dark:ring-white/10
              transition-transform duration-300 will-change-transform
              hover:-translate-y-0.5
            "
          >
            <h3 className="text-[15px] sm:text-[17px] font-semibold text-neutral-900 dark:text-white">
              {item.question}
            </h3>
            <div className="mt-2 sm:mt-3 text-xs  sm:text-sm leading-6 sm:leading-7 text-neutral-700 dark:text-neutral-300">
              {item.answer}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
