'use client';

import Image from 'next/image';
import { TracingBeam } from '@/components/ui/tracing-beam';
import ImageHistory1 from '@/public/images/About/team-ikovaline (3).jpg';
import ImageHistory2 from '@/public/images/About/team-ikovaline (4).jpg';
import { Highlight } from '@/components/ui/hero-highlight';
import { motion } from 'framer-motion';
import { IconQuote } from '@tabler/icons-react';

export default function AboutContent() {
  return (
    <TracingBeam className="px-6 my-24">
      <div className="max-w-3xl mx-auto antialiased relative max-lg:px-5">
        {ikovalineContent.map((item, index) => (
          <div key={`content-${index}`} className="mb-20" id={item.id}>
            {/* --- Badge glassy --- */}
            <p
              className={[
                'relative w-fit px-4 py-1 mb-6 rounded-full text-sm font-semibold tracking-wide',
                'backdrop-blur-xl overflow-hidden',
                'bg-[linear-gradient(135deg,rgba(255,255,255,.85),rgba(245,248,252,.35))]',
                'dark:bg-[linear-gradient(135deg,rgba(10,14,20,.9),rgba(10,14,20,.55))]',
                'border border-white/40 dark:border-[rgba(56,130,246,0.25)]',
                'shadow-[0_4px_12px_rgba(6,24,44,.12),inset_0_1px_0_rgba(255,255,255,.5)]',
                'dark:shadow-[0_4px_18px_rgba(2,6,12,.65),inset_0_1px_0_rgba(59,130,246,.12)]',
                'text-neutral-800 dark:text-neutral-100',
              ].join(' ')}
            >
              {/* streak */}
              <span className="pointer-events-none absolute inset-x-2 top-0 h-[3px] rounded-full blur-[4px] bg-white/60 dark:bg-sky-400/10" />
              {/* glow bas */}
              <span className="pointer-events-none absolute -bottom-2 left-1/2 h-3 w-[70%] -translate-x-1/2 rounded-full blur-lg bg-[radial-gradient(ellipse_at_center,rgba(56,189,248,.5),rgba(37,99,235,.35),transparent_70%)]" />
              <span className="relative z-10">{item.badge}</span>
            </p>

            {/* --- Title --- */}
            <h2 className="md:text-5xl xs:text-4xl text-3xl mb-10 text-center font-bold bg-gradient-to-t from-neutral-900 to-neutral-700 dark:from-neutral-100 dark:to-neutral-200 bg-clip-text text-transparent">
              {item.title}
            </h2>

            {/* --- Description --- */}
            <div className="sm:text-lg text-base space-y-6 text-center leading-relaxed text-neutral-700 dark:text-neutral-300">
              {item.description}
            </div>
          </div>
        ))}
      </div>
    </TracingBeam>
  );
}

const ikovalineContent = [
  {
    title: 'Les Origines d’Ikovaline',
    id: 'notre-histoire',
    description: (
      <>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: [20, -5, 0] }}
          transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
          className="leading-8"
        >
          Fondée par <Highlight>Florent</Highlight>, Ikovaline est une start-up
          spécialisée dans le <Highlight>digital</Highlight> et la
          transformation numérique. Née d’une volonté forte d’accompagner les
          entreprises, elle conçoit des solutions sur-mesure pour renforcer leur{' '}
          <Highlight>visibilité</Highlight> et accélérer leur croissance.
        </motion.p>

        <div className="grid sm:grid-cols-2 grid-cols-1 gap-6 my-10">
          <Image
            src={ImageHistory1}
            alt="Équipe Ikovaline en collaboration"
            className="rounded-3xl w-full shadow-2xl aspect-square object-cover"
          />
          <Image
            src={ImageHistory2}
            alt="Réunion de stratégie digitale"
            className="rounded-3xl w-full shadow-2xl max-sm:hidden aspect-square object-cover"
          />
        </div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: [20, -5, 0] }}
          transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
          className="leading-8"
        >
          Ikovaline <Highlight>se distingue</Highlight> par sa mission : aider
          chaque client à franchir un <Highlight>cap</Highlight> stratégique
          grâce à des services innovants, pensés pour des résultats mesurables
          et durables.
        </motion.p>
      </>
    ),
    badge: 'Histoire',
  },
  {
    title: 'Une Vision Ambitieuse',
    id: 'notre-vision',
    description: (
      <>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: [20, -5, 0] }}
          transition={{ duration: 0.6 }}
          className="leading-8"
        >
          Ikovaline porte une vision claire : atteindre un chiffre d’affaires de{' '}
          <Highlight>300 000€</Highlight> d’ici 2026. Cette ambition repose sur
          notre capacité à offrir des services{' '}
          <Highlight>performants</Highlight> et un accompagnement{' '}
          <Highlight>personnalisé</Highlight> pour chaque entreprise.
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: [20, -5, 0] }}
          transition={{ duration: 0.6 }}
          className="leading-8 text-neutral-600 dark:text-neutral-400 italic"
        >
          <IconQuote className="inline-block h-5 w-5 mr-2" stroke={2} />
          Nous croyons que la réussite passe par une stratégie numérique adaptée
          <IconQuote className="inline-block h-5 w-5 ml-2" stroke={2} />
          <span className="ml-2 not-italic font-semibold">
            – Florent Ghizzoni
          </span>
        </motion.p>
      </>
    ),
    badge: 'Vision',
  },
  {
    title: 'Garantie de Résultats',
    id: 'notre-garantie',
    description: (
      <>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: [20, -5, 0] }}
          transition={{ duration: 0.6 }}
          className="leading-8"
        >
          Chez Ikovaline, nous garantissons des <Highlight>résultats</Highlight>{' '}
          concrets grâce à des <Highlight>solutions</Highlight> digitales
          adaptées. Notre garantie de remboursement est cependant encadrée par
          des conditions strictes :
        </motion.p>

        <ul className="mt-6 space-y-3 text-left list-disc list-inside">
          <li>
            Transmission des éléments sous <Highlight>7</Highlight> jours :
            contenus,
            <Highlight>accès</Highlight> et informations nécessaires.
          </li>
          <li>
            Délai légal de demande : <Highlight>30</Highlight> jours après la
            première <Highlight>facture</Highlight>.
          </li>
          <li>
            Participation active aux <Highlight>réunions</Highlight> et
            réception des livrables.
          </li>
          <li>
            Exclusions : absence de <Highlight>collaboration</Highlight>,
            <Highlight>modification</Highlight> de commande ou annulation
            personnelle.
          </li>
        </ul>
      </>
    ),
    badge: 'Garantie',
  },
];
