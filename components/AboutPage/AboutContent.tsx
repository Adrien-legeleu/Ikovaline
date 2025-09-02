// components/AboutPage/AboutContent.tsx
'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { IconQuote, IconSparkles, IconTargetArrow, IconShieldCheck } from '@tabler/icons-react';
import { TracingBeam } from '@/components/ui/tracing-beam';
import { Highlighter } from '../magicui/highlighter';
import ImageHistory1 from '@/public/images/About/team-ikovaline (3).jpg';
import ImageHistory2 from '@/public/images/About/team-ikovaline (4).jpg';

type Block = {
  id: string;
  badge: { label: string; Icon: React.ElementType };
  title: string;
  body: JSX.Element;
};

function SectionBadge({ Icon, label }: { Icon: React.ElementType; label: string }) {
  return (
    <span
      className={[
        'relative inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold',
        'backdrop-blur-2xl',
        'bg-[linear-gradient(135deg,rgba(255,255,255,.9),rgba(240,245,252,.55))]',
        'dark:bg-[linear-gradient(135deg,rgba(10,14,20,.92),rgba(10,14,20,.65))]',
        'border border-white/50 dark:border-[rgba(56,130,246,0.22)]',
        'shadow-[0_10px_30px_rgba(0,168,232,.12),inset_0_1px_0_rgba(255,255,255,.5)]',
        'dark:shadow-[0_10px_30px_rgba(0,0,0,.6),inset_0_1px_0_rgba(59,130,246,.14)]',
        'text-neutral-800 dark:text-neutral-100',
      ].join(' ')}
    >
      <Icon className="h-4 w-4 text-sky-600 dark:text-sky-400" />
      {label}
    </span>
  );
}

export default function AboutContent() {
  const blocks: Block[] = [
    {
      id: 'notre-histoire',
      badge: { label: 'Notre histoire', Icon: IconSparkles },
      title: 'D’une idée à une équipe qui livre des résultats',
      body: (
        <>
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-10% 0px' }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="leading-8 text-neutral-700 dark:text-neutral-300"
          >
            Fondée par{' '}
            <Highlighter action="highlight" color="#87CEFA" noWrap>
              Florent
            </Highlighter>
            , Ikovaline est née d’une volonté simple : offrir aux entreprises des
            solutions{' '}
            <Highlighter action="highlight" color="#87CEFA" noWrap>
              digitales
            </Highlighter>{' '}
            concrètes qui renforcent leur{' '}
            <Highlighter action="highlight" color="#87CEFA" noWrap>
              visibilité
            </Highlighter>{' '}
            et accélèrent leur croissance.
          </motion.p>

          <div className="my-8 grid grid-cols-1 gap-5 sm:grid-cols-2">
            <Image
              src={ImageHistory1}
              alt="Équipe Ikovaline au travail"
              className="aspect-square w-full rounded-3xl object-cover shadow-2xl"
              priority
            />
            <Image
              src={ImageHistory2}
              alt="Atelier de stratégie digitale"
              className="aspect-square w-full rounded-3xl object-cover shadow-2xl max-sm:hidden"
            />
          </div>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-10% 0px' }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="leading-8 text-neutral-700 dark:text-neutral-300"
          >
            Notre mission est claire : aider chaque client à franchir un{' '}
            <Highlighter action="highlight" color="#87CEFA" noWrap>
              cap
            </Highlighter>{' '}
            grâce à des services modernes, mesurables et durables.
          </motion.p>
        </>
      ),
    },
    {
      id: 'notre-vision',
      badge: { label: 'Vision', Icon: IconTargetArrow },
      title: 'Ambition, clarté et obsession du résultat',
      body: (
        <>
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-10% 0px' }}
            transition={{ duration: 0.55, ease: 'easeOut' }}
            className="leading-8 text-neutral-700 dark:text-neutral-300"
          >
            Objectif : atteindre{' '}
            <Highlighter action="highlight" color="#87CEFA" noWrap>
              300 000€
            </Highlighter>{' '}
            de chiffre d’affaires d’ici 2026 en livrant des expériences{' '}
            <Highlighter action="highlight" color="#87CEFA" noWrap>
              performantes
            </Highlighter>{' '}
            et des accompagnements{' '}
            <Highlighter action="highlight" color="#87CEFA" noWrap>
              personnalisés
            </Highlighter>
            .
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="leading-8 italic text-neutral-600 dark:text-neutral-400"
          >
            <IconQuote className="mr-2 inline-block h-5 w-5" stroke={2} />
            Nous croyons qu’une stratégie numérique taillée sur-mesure change le
            destin d’une entreprise
            <IconQuote className="ml-2 inline-block h-5 w-5" stroke={2} />
            <span className="not-italic font-semibold"> — Florent Ghizzoni</span>
          </motion.p>
        </>
      ),
    },
    {
      id: 'notre-garantie',
      badge: { label: 'Garantie', Icon: IconShieldCheck },
      title: 'Garantie de résultats — conditions claires',
      body: (
        <>
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, ease: 'easeOut' }}
            className="leading-8 text-neutral-700 dark:text-neutral-300"
          >
            Nous nous engageons sur des{' '}
            <Highlighter action="highlight" color="#87CEFA" noWrap>
              résultats
            </Highlighter>{' '}
            via des solutions{' '}
            <Highlighter action="highlight" color="#87CEFA" noWrap>
              sur-mesure
            </Highlighter>
            . La garantie de remboursement s’applique dans les cas suivants :
          </motion.p>

          <ul className="mt-4 space-y-3 text-neutral-700 dark:text-neutral-300">
            <li>
              1) Envoi des éléments sous{' '}
              <Highlighter action="highlight" color="#87CEFA" noWrap>
                7 jours
              </Highlighter>{' '}
              (contenus, accès, informations utiles).
            </li>
            <li>
              2) Demande formelle sous{' '}
              <Highlighter action="highlight" color="#87CEFA" noWrap>
                30 jours
              </Highlighter>{' '}
              après la première facture.
            </li>
            <li>
              3) Réception des livrables{' '}
              <Highlighter action="highlight" color="#87CEFA" noWrap>
                finaux
              </Highlighter>{' '}
              et participation aux restitutions/démos.
            </li>
          </ul>

          <p className="mt-3 text-neutral-700 dark:text-neutral-300">
            Sont exclus : objectifs non validés, manque de collaboration, changement
            de périmètre, annulation de convenance, ou absence de réponse bloquant
            la livraison.
          </p>
        </>
      ),
    },
  ];

  return (
    <TracingBeam className="my-24 px-6">
      <div className="relative mx-auto max-w-3xl antialiased">
        {/* halos bleus subtils */}
        <span
          aria-hidden
          className="pointer-events-none absolute -top-16 left-1/2 -z-10 h-[36rem] w-[36rem] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,#00A8E8,transparent_70%)] opacity-25 blur-[200px] dark:opacity-35"
        />
        <span
          aria-hidden
          className="pointer-events-none absolute bottom-0 right-1/4 -z-10 h-[30rem] w-[30rem] translate-x-1/4 rounded-full bg-[radial-gradient(closest-side,#2563EB,transparent_70%)] opacity-20 blur-[180px] dark:opacity-30"
        />

        {blocks.map((b, i) => (
          <section key={b.id} id={b.id} className="mb-20">
            {/* Badge */}
            <div className="mb-5 flex justify-center">
              <SectionBadge Icon={b.badge.Icon} label={b.badge.label} />
            </div>

            {/* Titre */}
            <h2 className="mx-auto mb-8 text-center text-3xl xs:text-4xl md:text-5xl font-extrabold tracking-tight bg-gradient-to-t from-neutral-900 via-neutral-800 to-neutral-600 bg-clip-text text-transparent dark:from-neutral-100 dark:via-neutral-300 dark:to-neutral-400">
              {b.title}
            </h2>

            {/* Texte */}
            <div className="space-y-6 text-center text-base sm:text-lg leading-relaxed text-neutral-700 dark:text-neutral-300">
              {b.body}
            </div>
          </section>
        ))}
      </div>
    </TracingBeam>
  );
}
