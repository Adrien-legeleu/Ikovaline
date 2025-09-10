// components/AboutPage/AboutContent.tsx
'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import {
  IconSparkles,
  IconUsersGroup,
  IconShieldCheck,
} from '@tabler/icons-react';
import { TracingBeam } from '@/components/ui/tracing-beam';
import { Highlighter } from '../magicui/highlighter';
import ImageHistory1 from '@/public/images/About/team-ikovaline (3).jpg';
import ImageHistory2 from '@/public/images/About/team-ikovaline (4).jpg';
import HeroBeamsTeam from '../LandingPage/about/About';

type Block = {
  id: string;
  badge: { label: string; Icon: React.ElementType };
  title: string;
  body: JSX.Element;
};

function SectionBadge({
  Icon,
  label,
}: {
  Icon: React.ElementType;
  label: string;
}) {
  return (
    <span
      className={[
        'relative inline-flex items-center gap-2 rounded-xl px-4 py-1.5 text-xs font-semibold',
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
      id: 'les-origines',
      badge: { label: 'Origines', Icon: IconSparkles },
      title: 'Les Origines d’Ikovaline',
      body: (
        <>
          {/* Paragraphe 1 */}
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-10% 0px' }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="relative leading-8 text-neutral-700 dark:text-neutral-300"
          >
            Fondée par{' '}
            <Highlighter action="highlight" color="#87CEFA" noWrap>
              Florent
            </Highlighter>{' '}
            Ghizzoni, Ikovaline est une start-up spécialisée dans le marketing
            digital et la transformation numérique. Née d&apos;une volonté forte
            d&apos;accompagner les entreprises dans leur croissance, elle
            propose des solutions digitales personnalisées pour améliorer la
            visibilité, le développement commercial et les performances
            globales.
          </motion.p>

          {/* Images + légendes */}
          <div className="my-8 grid grid-cols-1 gap-5 sm:grid-cols-2">
            <figure className="relative">
              <Image
                src={ImageHistory1}
                alt="Équipe Ikovaline en collaboration sur projets de transformation numérique et marketing digital"
                className="aspect-square w-full rounded-3xl object-cover shadow-2xl"
                priority
              />
              <figcaption className="mt-2 text-center text-xs text-neutral-600 dark:text-neutral-400">
                Équipe Ikovaline en collaboration sur projets de transformation
                numérique et marketing digital
              </figcaption>
            </figure>

            <figure className="relative max-sm:hidden">
              <Image
                src={ImageHistory2}
                alt="Équipe Ikovaline en réunion de stratégie digitale"
                className="aspect-square w-full rounded-3xl object-cover shadow-2xl"
              />
              <figcaption className="mt-2 text-center text-xs text-neutral-600 dark:text-neutral-400">
                Équipe Ikovaline en réunion de stratégie digitale
              </figcaption>
            </figure>
          </div>

          {/* Paragraphe 2 */}
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-10% 0px' }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="relative leading-8 text-neutral-700 dark:text-neutral-300"
          >
            Ikovaline se distingue par sa mission : accélérer la digitalisation
            des entreprises avec des services innovants et sur-mesure. Grâce à
            une approche orientée résultats, l&apos;équipe aide chaque client à
            franchir un cap stratégique dans un environnement numérique en
            constante évolution.
          </motion.p>
        </>
      ),
    },
    {
      id: 'team',
      badge: { label: 'notre équipe', Icon: IconUsersGroup },
      title: 'Notre Équipe',
      body: <HeroBeamsTeam />,
    },

    {
      id: 'garantie',
      badge: { label: 'Remboursement garanti', Icon: IconShieldCheck },
      title: 'Garantie de Résultats ou Remboursement',
      body: (
        <>
          {/* Intro garantie */}
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, ease: 'easeOut' }}
            className="relative leading-8 text-neutral-700 dark:text-neutral-300"
          >
            Chez Ikovaline, nous nous engageons à fournir des résultats concrets
            à travers des solutions digitales personnalisées. Toutefois, la
            garantie de remboursement est strictement encadrée par les
            conditions suivantes :
          </motion.p>

          {/* 1 */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            className="relative mt-5 space-y-2"
          >
            <p className="font-semibold">
              1. 📦 Transmission des éléments nécessaires sous{' '}
              <Highlighter action="highlight" color="#87CEFA" noWrap>
                7&nbsp;jours
              </Highlighter>
            </p>
            <p className="text-neutral-700 dark:text-neutral-300">
              Le client s’engage à transmettre dans un délai de 7 jours
              calendaires à compter du paiement de l’acompte :
            </p>
            <ul className="relative list-disc space-y-1 pl-5 text-neutral-700 dark:text-neutral-300">
              <li>
                L’ensemble des contenus nécessaires (textes, images, logos,
                etc.)
              </li>
              <li>
                Les accès aux plateformes, sites, hébergeurs, domaines, CMS,
                analytics, etc.
              </li>
              <li>Toute information utile à la bonne exécution du projet.</li>
            </ul>
            <p className="text-neutral-700 dark:text-neutral-300">
              En cas de manquement ou de délai dépassé, la garantie de
              remboursement est automatiquement annulée.
            </p>
          </motion.div>

          {/* 2 */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            className="relative mt-5 space-y-2"
          >
            <p className="font-semibold">
              2. 🧾 Délai légal de demande de remboursement –{' '}
              <Highlighter action="highlight" color="#87CEFA" noWrap>
                30&nbsp;jours
              </Highlighter>
            </p>
            <p className="text-neutral-700 dark:text-neutral-300">
              Le client dispose d’un délai de 30 jours à compter de la date
              d’émission de la première facture (acompte ou paiement complet)
              pour soumettre par écrit (email recommandé ou recommandé AR) une
              demande formelle de remboursement. Passé ce délai, la demande est
              automatiquement irrecevable.
            </p>
          </motion.div>

          {/* 3 */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            className="relative mt-5 space-y-2"
          >
            <p className="font-semibold">
              3. 📤 Livraison et réception des livrables
            </p>
            <ul className="relative list-disc space-y-1 pl-5 text-neutral-700 dark:text-neutral-300">
              <li>
                Assister aux réunions de restitution ou aux démonstrations
                prévues.
              </li>
              <li>
                Réceptionner les livrables{' '}
                <Highlighter action="highlight" color="#87CEFA" noWrap>
                  finaux
                </Highlighter>{' '}
                dans les délais impartis.
              </li>
              <li>
                Attendre la fin complète de la prestation (transmission finale
                des fichiers, accès, maquettes, etc.) avant toute réclamation.
              </li>
            </ul>
            <p className="text-neutral-700 dark:text-neutral-300">
              Toute tentative de rupture unilatérale ou de refus de réception
              sans motif sérieux annule la garantie.
            </p>
          </motion.div>

          {/* 4 */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            className="relative mt-5 space-y-2"
          >
            <p className="font-semibold">4. 🚫 Exclusions de la garantie</p>
            <ul className="relative list-disc space-y-1 pl-5 text-neutral-700 dark:text-neutral-300">
              <li>
                Objectifs non définis ou non validés conjointement avant le
                lancement du projet.
              </li>
              <li>Retard ou absence de collaboration active du client.</li>
              <li>Modification de la commande en cours de prestation.</li>
              <li>Annulation du projet pour convenance personnelle.</li>
              <li>Livraison bloquée par absence de réponse du client.</li>
            </ul>
          </motion.div>
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

        {blocks.map((b) => (
          <section key={b.id} id={b.id} className="mb-20">
            <div className="mb-5 flex justify-center">
              <SectionBadge Icon={b.badge.Icon} label={b.badge.label} />
            </div>
            {b.id === 'les-origines' ? (
              <h1 className="mx-auto mb-8 pb-2 text-center text-3xl xs:text-4xl md:text-5xl font-extrabold tracking-tight bg-gradient-to-t from-neutral-900 via-neutral-800 to-neutral-600 bg-clip-text text-transparent dark:from-neutral-100 dark:via-neutral-300 dark:to-neutral-400">
                {b.title}
              </h1>
            ) : (
              <h2 className="mx-auto mb-8 pb-2 text-center text-3xl xs:text-4xl md:text-5xl font-extrabold tracking-tight bg-gradient-to-t from-neutral-900 via-neutral-800 to-neutral-600 bg-clip-text text-transparent dark:from-neutral-100 dark:via-neutral-300 dark:to-neutral-400">
                {b.title}
              </h2>
            )}

            <div className="space-y-6 text-center text-base leading-relaxed text-neutral-700 dark:text-neutral-300 sm:text-lg">
              {b.body}
            </div>
          </section>
        ))}
      </div>
    </TracingBeam>
  );
}
