// components/AboutPage/AboutContent.tsx
'use client';

import Image from 'next/image';
import { TracingBeam } from '@/components/ui/tracing-beam';
import ImageHistory1 from '@/public/images/About/team-ikovaline (3).jpg';
import ImageHistory2 from '@/public/images/About/team-ikovaline (4).jpg';
import { Highlight } from '@/components/ui/hero-highlight';
import { motion } from 'framer-motion';
import { IconQuote } from '@tabler/icons-react';
import { usePathname } from 'next/navigation';

function useLocale() {
  const pathname = usePathname() || '/';
  return { isEN: /^\/en(\/|$)/.test(pathname) };
}

export default function AboutContent() {
  const { isEN } = useLocale();
  const content = getContent(isEN);

  return (
    <TracingBeam className="px-6 my-24">
      <div className="max-w-3xl mx-auto antialiased relative max-lg:px-5">
        {content.map((item, index) => (
          <div key={`content-${index}`} className="mb-20" id={item.id}>
            {/* --- Badge glassy --- */}
            <p
              className={[
                'relative w-fit px-4 py-1 mb-6 rounded-full text-sm font-semibold tracking-wide',
                ' overflow-hidden',
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

function getContent(isEN: boolean) {
  if (isEN) {
    return [
      {
        title: 'Ikovaline’s Origins',
        id: 'notre-histoire',
        description: (
          <>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: [20, -5, 0] }}
              transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
              className="leading-8"
            >
              Founded by <Highlight>Florent</Highlight>, Ikovaline is a
              student-led start-up specializing in{' '}
              <Highlight>digital</Highlight> and transformation. Born from a
              strong will to support businesses, it designs tailored solutions
              to strengthen their <Highlight>visibility</Highlight> and
              accelerate growth.
            </motion.p>

            <div className="grid sm:grid-cols-2 grid-cols-1 gap-6 my-10">
              <Image
                src={ImageHistory1}
                alt="Ikovaline team collaborating"
                className="rounded-3xl w-full shadow-2xl aspect-square object-cover"
              />
              <Image
                src={ImageHistory2}
                alt="Digital strategy workshop"
                className="rounded-3xl w-full shadow-2xl max-sm:hidden aspect-square object-cover"
              />
            </div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: [20, -5, 0] }}
              transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
              className="leading-8"
            >
              Ikovaline <Highlight>stands out</Highlight> with a clear mission:
              helping every client reach the next{' '}
              <Highlight>milestone</Highlight> through innovative services
              focused on measurable and lasting results.
            </motion.p>
          </>
        ),
        badge: 'Story',
      },
      {
        title: 'An Ambitious Vision',
        id: 'notre-vision',
        description: (
          <>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: [20, -5, 0] }}
              transition={{ duration: 0.6 }}
              className="leading-8"
            >
              Ikovaline aims for a turnover of <Highlight>€300,000</Highlight>{' '}
              by 2026. This ambition relies on delivering{' '}
              <Highlight>high-performance</Highlight> services and{' '}
              <Highlight>personalized</Highlight> support for every company.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: [20, -5, 0] }}
              transition={{ duration: 0.6 }}
              className="leading-8 text-neutral-600 dark:text-neutral-400 italic"
            >
              <IconQuote className="inline-block h-5 w-5 mr-2" stroke={2} />
              We believe success comes from a tailored digital strategy
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
        title: 'Results Guarantee',
        id: 'notre-garantie',
        description: (
          <>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-10% 0px -10% 0px' }}
              transition={{ duration: 0.45, ease: [0.2, 0, 0.2, 1] }}
              className="leading-8"
            >
              At Ikovaline, we commit to delivering{' '}
              <Highlight>tangible results</Highlight> with{' '}
              <Highlight>tailored digital solutions</Highlight>. However, the
              refund guarantee is strictly governed by the following conditions:
            </motion.p>

            {/* 1 */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-10% 0px -10% 0px' }}
              transition={{
                delay: 0.05,
                duration: 0.4,
                ease: [0.2, 0, 0.2, 1],
              }}
              className="mt-6 space-y-2"
            >
              <p className="font-semibold">
                1. 📦 Provide required assets within{' '}
                <Highlight>7 days</Highlight>
              </p>
              <p className="text-neutral-700 dark:text-neutral-300">
                The client must send within 7 calendar days from the
                down-payment:
              </p>
              <ul className="list-disc list-inside space-y-1">
                <li>All necessary content (copy, images, logos, etc.)</li>
                <li>
                  <Highlight>Access</Highlight> to platforms, sites, hosts,
                  domains, CMS, analytics, etc.
                </li>
                <li>Any information useful for proper project execution.</li>
              </ul>
              <p className="text-neutral-700 dark:text-neutral-300">
                If missing or late, the <Highlight>refund guarantee</Highlight>{' '}
                is automatically void.
              </p>
            </motion.div>

            {/* 2 */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-10% 0px -10% 0px' }}
              transition={{ delay: 0.1, duration: 0.4, ease: [0.2, 0, 0.2, 1] }}
              className="mt-5 space-y-2"
            >
              <p className="font-semibold">
                2. 🧾 Legal refund request timeframe –{' '}
                <Highlight>30 days</Highlight>
              </p>
              <p className="text-neutral-700 dark:text-neutral-300">
                The client has 30 days from the date of the first{' '}
                <Highlight>invoice</Highlight> (deposit or full payment) to
                submit a<Highlight>formal</Highlight> written request (email
                recommended or registered letter). After this period, the
                request is not admissible.
              </p>
            </motion.div>

            {/* 3 */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-10% 0px -10% 0px' }}
              transition={{
                delay: 0.15,
                duration: 0.4,
                ease: [0.2, 0, 0.2, 1],
              }}
              className="mt-5 space-y-2"
            >
              <p className="font-semibold">3. 📤 Delivery & reception</p>
              <p className="text-neutral-700 dark:text-neutral-300">
                The client agrees to:
              </p>
              <ul className="list-disc list-inside space-y-1">
                <li>Attend restitution meetings or planned demos.</li>
                <li>
                  Receive the <Highlight>final deliverables</Highlight> within
                  the allotted time.
                </li>
                <li>
                  Wait for the <Highlight>full completion</Highlight> of the
                  service (final transfer of files, accesses, mockups, etc.)
                  before any claim.
                </li>
              </ul>
              <p className="text-neutral-700 dark:text-neutral-300">
                Any attempt at <Highlight>unilateral termination</Highlight> or{' '}
                <Highlight>refusal to receive</Highlight> without serious reason
                cancels the guarantee.
              </p>
            </motion.div>

            {/* 4 */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-10% 0px -10% 0px' }}
              transition={{ delay: 0.2, duration: 0.4, ease: [0.2, 0, 0.2, 1] }}
              className="mt-5 space-y-2"
            >
              <p className="font-semibold">4. 🚫 Exclusions</p>
              <ul className="list-disc list-inside space-y-1">
                <li>
                  <Highlight>Objectives</Highlight> not defined or jointly
                  validated before project kick-off.
                </li>
                <li>
                  Delays or lack of <Highlight>active collaboration</Highlight>{' '}
                  from the client.
                </li>
                <li>
                  <Highlight>Scope changes</Highlight> during the engagement.
                </li>
                <li>
                  <Highlight>Cancellation</Highlight> for convenience.
                </li>
                <li>
                  Delivery blocked by the client’s{' '}
                  <Highlight>no-response</Highlight>.
                </li>
              </ul>
            </motion.div>
          </>
        ),
        badge: 'Guarantee',
      },
    ];
  }

  // ——— FR par défaut ———
  return [
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
            Fondée par <Highlight>Florent</Highlight>, Ikovaline est une
            start-up spécialisée dans le <Highlight>digital</Highlight> et la
            transformation numérique. Née d’une volonté forte d’accompagner les
            entreprises, elle conçoit des solutions sur-mesure pour renforcer
            leur <Highlight>visibilité</Highlight> et accélérer leur croissance.
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
            Ikovaline porte une vision claire : atteindre un chiffre d’affaires
            de <Highlight>300 000€</Highlight> d’ici 2026. Cette ambition repose
            sur notre capacité à offrir des services{' '}
            <Highlight>performants</Highlight> et un accompagnement{' '}
            <Highlight>personnalisé</Highlight>.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: [20, -5, 0] }}
            transition={{ duration: 0.6 }}
            className="leading-8 text-neutral-600 dark:text-neutral-400 italic"
          >
            <IconQuote className="inline-block h-5 w-5 mr-2" stroke={2} />
            Nous croyons que la réussite passe par une stratégie numérique
            adaptée
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
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-10% 0px -10% 0px' }}
            transition={{ duration: 0.45, ease: [0.2, 0, 0.2, 1] }}
            className="leading-8"
          >
            Chez Ikovaline, nous nous engageons à fournir des{' '}
            <Highlight>résultats concrets</Highlight> via des{' '}
            <Highlight>solutions digitales personnalisées</Highlight>.
            Toutefois, la garantie de remboursement est encadrée par les
            conditions suivantes :
          </motion.p>

          {/* 1 */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-10% 0px -10% 0px' }}
            transition={{ delay: 0.05, duration: 0.4, ease: [0.2, 0, 0.2, 1] }}
            className="mt-6 space-y-2"
          >
            <p className="font-semibold">
              1. 📦 Transmission des éléments sous{' '}
              <Highlight>7 jours</Highlight>
            </p>
            <p className="text-neutral-700 dark:text-neutral-300">
              Contenus, <Highlight>accès</Highlight> (sites, hébergeurs,
              domaines, CMS, analytics, etc.) et informations utiles.
            </p>
            <p className="text-neutral-700 dark:text-neutral-300">
              En cas de manquement ou retard, la{' '}
              <Highlight>garantie de remboursement</Highlight> est annulée.
            </p>
          </motion.div>

          {/* 2 */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-10% 0px -10% 0px' }}
            transition={{ delay: 0.1, duration: 0.4, ease: [0.2, 0, 0.2, 1] }}
            className="mt-5 space-y-2"
          >
            <p className="font-semibold">
              2. 🧾 Délai de demande – <Highlight>30 jours</Highlight>
            </p>
            <p className="text-neutral-700 dark:text-neutral-300">
              30 jours à compter de la première <Highlight>facture</Highlight>{' '}
              pour une demande écrite formelle. Passé ce délai, la demande est
              irrecevable.
            </p>
          </motion.div>

          {/* 3 */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-10% 0px -10% 0px' }}
            transition={{ delay: 0.15, duration: 0.4, ease: [0.2, 0, 0.2, 1] }}
            className="mt-5 space-y-2"
          >
            <p className="font-semibold">3. 📤 Livraison & réception</p>
            <ul className="list-disc list-inside space-y-1">
              <li>Présence aux restitutions / démonstrations prévues.</li>
              <li>
                Réception des <Highlight>livrables finaux</Highlight> dans les
                délais.
              </li>
              <li>
                Attendre la <Highlight>fin complète</Highlight> de la prestation
                avant toute réclamation.
              </li>
            </ul>
            <p className="text-neutral-700 dark:text-neutral-300">
              Toute <Highlight>rupture unilatérale</Highlight> ou{' '}
              <Highlight>refus de réception</Highlight> injustifié annule la
              garantie.
            </p>
          </motion.div>

          {/* 4 */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-10% 0px -10% 0px' }}
            transition={{ delay: 0.2, duration: 0.4, ease: [0.2, 0, 0.2, 1] }}
            className="mt-5 space-y-2"
          >
            <p className="font-semibold">4. 🚫 Exclusions</p>
            <ul className="list-disc list-inside space-y-1">
              <li>
                <Highlight>Objectifs</Highlight> non définis/validés avant le
                lancement.
              </li>
              <li>
                Manque de <Highlight>collaboration active</Highlight> du client.
              </li>
              <li>
                <Highlight>Modification</Highlight> de commande en cours.
              </li>
              <li>
                <Highlight>Annulation</Highlight> pour convenance personnelle.
              </li>
              <li>
                Livraison bloquée par <Highlight>absence de réponse</Highlight>.
              </li>
            </ul>
          </motion.div>
        </>
      ),
      badge: 'Garantie',
    },
  ];
}
