'use client';

import * as React from 'react';
import Link from 'next/link';

type FaqItem = { question: React.ReactNode; answer: React.ReactNode };

const FAQ_FR: FaqItem[] = [
  {
    question: 'Quels sont vos horaires d’ouverture ?',
    answer:
      'Nous répondons du lundi au samedi, 9h–18h (CET). En dehors de ces plages, vous pouvez ouvrir un ticket via la page « Contact » et nous revenons vers vous sous 24–48h ouvrées. Pour les urgences (site down, incident critique), indiquez « Urgent » dans l’objet : la prise en charge est prioritaire.',
  },
  {
    question: 'Comment me recommandez-vous ?',
    answer:
      'Nous commençons par un échange de découverte (objectifs, audience, budget). Ensuite, nous réalisons un mini-audit (site, SEO, analytics, parcours) et nous vous remettons des recommandations actionnables : stratégie, arborescence, stack technique (Next.js, Prisma, hébergement), SEO/SEA, planning et KPI. Vous recevez une proposition claire avec jalons, délais et livrables.',
  },
  {
    question: 'Comment puis-je mettre à jour mes informations ?',
    answer: (
      <>
        Depuis votre espace client, rubrique <strong>Profil</strong>. Vous
        pouvez modifier vos coordonnées, facturation et préférences. Pour des
        changements statutaires (raison sociale, TVA), écrivez-nous via la page{' '}
        <Link href="/contact" className="underline underline-offset-2">
          Contact
        </Link>{' '}
        ou{' '}
        <Link href="/support" className="underline underline-offset-2">
          Support
        </Link>
        : nous mettrons à jour vos documents sous 24–48h ouvrées.
      </>
    ),
  },
  {
    question: 'Quels sont vos délais de livraison ?',
    answer:
      'À titre indicatif : site vitrine 2–4 semaines, e-commerce 4–8 semaines, MVP d’application 6–12 semaines. Nous travaillons par sprints avec des jalons (maquettes, développement, QA, mise en ligne). Un mode « express » est possible selon charge et périmètre.',
  },

  {
    question: 'Comment sécurisez-vous mes données ?',
    answer:
      'Conformité RGPD, hébergement européen, chiffrement TLS/HTTPS, sauvegardes automatisées, contrôle d’accès par rôles, journalisation des actions et revues de sécurité régulières. Nous signons un DPA sur demande et appliquons le principe de minimisation des données.',
  },
  {
    question: 'Comment signaler un problème ?',
    answer: (
      <>
        Ouvrez un ticket via{' '}
        <Link href="/contact" className="underline underline-offset-2">
          Support
        </Link>{' '}
        en décrivant le contexte (URL, capture, étape, message d’erreur). Un
        numéro de suivi vous est attribué et un chargé de projet vous répond
        sous 24h ouvrées (priorité si incident bloquant).
      </>
    ),
  },
];

export default function FAQ() {
  return (
    <section
      id="faq"
      className="relative mx-auto max-w-6xl sm:px-6 px-4 py-16 sm:py-20"
    >
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
          Besoin d’aide ? Consultez nos réponses ci-dessous ou contactez-nous
          via{' '}
          <Link href="/contact" className="underline underline-offset-2">
            Contact
          </Link>{' '}
          .
        </p>
      </div>

      {/* Masonry */}
      <div aria-hidden>
        <div
          className="
            sm:columns-2 columns-2 lg:columns-3
            sm:gap-x-5 gap-x-4 lg:gap-x-6
            [column-fill:_balance]
          "
        >
          {FAQ_FR.map((item, i) => (
            <article
              key={i}
              className="sm:mb-5 mb-5 lg:mb-6 break-inside-avoid rounded-2xl bg-white sm:p-6 p-3 shadow-[0_18px_50px_-28px_rgba(0,0,0,.25)] ring-1 ring-black/5 dark:bg-neutral-900 dark:ring-white/10 transition-transform duration-300 will-change-transform hover:-translate-y-0.5"
            >
              <h3 className="sm:text-[17px] text-sm font-semibold text-neutral-900 dark:text-white">
                {item.question}
              </h3>
              <div className="mt-3 sm:text-sm text-xs sm:leading-7 leading-5 text-neutral-700 dark:text-neutral-300">
                {item.answer}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
