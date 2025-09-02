// components/AboutPage/AboutContent.tsx
'use client';

import Image from 'next/image';
import { TracingBeam } from '@/components/ui/tracing-beam';
import ImageHistory1 from '@/public/images/About/team-ikovaline (3).jpg';
import ImageHistory2 from '@/public/images/About/team-ikovaline (4).jpg';
import { motion } from 'framer-motion';
import { IconQuote } from '@tabler/icons-react';
import { usePathname } from 'next/navigation';
import { Highlighter } from '../magicui/highlighter';

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
              Founded by{' '}
              <Highlighter action="highlight" color="#87CEFA">
                Florent
              </Highlighter>
              , Ikovaline is a student-led start-up specializing in{' '}
              <Highlighter action="highlight" color="#87CEFA">
                digital
              </Highlighter>{' '}
              and transformation. Born from a strong will to support businesses,
              it designs tailored solutions to strengthen their{' '}
              <Highlighter action="highlight" color="#87CEFA">
                visibility
              </Highlighter>{' '}
              and accelerate growth.
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
              Ikovaline{' '}
              <Highlighter action="highlight" color="#87CEFA">
                stands out
              </Highlighter>{' '}
              with a clear mission: helping every client reach the next{' '}
              <Highlighter action="highlight" color="#87CEFA">
                milestone
              </Highlighter>{' '}
              through innovative services focused on measurable and lasting
              results.
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
              Ikovaline aims for a turnover of{' '}
              <Highlighter action="highlight" color="#87CEFA">
                €300,000
              </Highlighter>{' '}
              by 2026. This ambition relies on delivering{' '}
              <Highlighter action="highlight" color="#87CEFA">
                high-performance
              </Highlighter>{' '}
              services and{' '}
              <Highlighter action="highlight" color="#87CEFA">
                personalized
              </Highlighter>{' '}
              support for every company.
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
              At Ikovaline, we commit to delivering tangible{' '}
              <Highlighter action="highlight" color="#87CEFA">
                results
              </Highlighter>{' '}
              with tailored digital{' '}
              <Highlighter action="highlight" color="#87CEFA">
                solutions
              </Highlighter>
              . However, the refund guarantee is strictly governed by the
              following conditions:
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
                <Highlighter action="highlight" color="#87CEFA">
                  7 days
                </Highlighter>
              </p>
              <p className="text-neutral-700 dark:text-neutral-300">
                The client must send within 7 calendar days from the
                down-payment:
              </p>
              <ul className="list-disc list-inside space-y-1">
                <li>All necessary content (copy, images, logos, etc.)</li>
                <li>
                  <Highlighter action="highlight" color="#87CEFA">
                    Access
                  </Highlighter>{' '}
                  to platforms, sites, hosts, domains, CMS, analytics, etc.
                </li>
                <li>Any information useful for proper project execution.</li>
              </ul>
              <p className="text-neutral-700 dark:text-neutral-300">
                If missing or late, the refund
                <Highlighter action="highlight" color="#87CEFA">
                  {' '}
                  guarantee
                </Highlighter>{' '}
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
                <Highlighter action="highlight" color="#87CEFA">
                  30 days
                </Highlighter>
              </p>
              <p className="text-neutral-700 dark:text-neutral-300">
                The client has 30 days from the date of the first{' '}
                <Highlighter action="highlight" color="#87CEFA">
                  invoice
                </Highlighter>{' '}
                (deposit or full payment) to submit a
                <Highlighter action="highlight" color="#87CEFA">
                  formal
                </Highlighter>{' '}
                written request (email recommended or registered letter). After
                this period, the request is not admissible.
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
                  Receive the{' '}
                  <Highlighter action="highlight" color="#87CEFA">
                    final
                  </Highlighter>{' '}
                  deliverables within the allotted time.
                </li>
                <li>
                  Wait for the full
                  <Highlighter action="highlight" color="#87CEFA">
                    {' '}
                    completion
                  </Highlighter>{' '}
                  of the service (final transfer of files, accesses, mockups,
                  etc.) before any claim.
                </li>
              </ul>
              <p className="text-neutral-700 dark:text-neutral-300">
                Any attempt at unilateral
                <Highlighter action="highlight" color="#87CEFA">
                  {' '}
                  termination
                </Highlighter>{' '}
                or{' '}
                <Highlighter action="highlight" color="#87CEFA">
                  refusal
                </Highlighter>{' '}
                to receive without serious reason cancels the guarantee.
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
                  <Highlighter action="highlight" color="#87CEFA">
                    Objectives
                  </Highlighter>{' '}
                  not defined or jointly validated before project kick-off.
                </li>
                <li>
                  Delays or lack of active
                  <Highlighter action="highlight" color="#87CEFA">
                    {' '}
                    collaboration
                  </Highlighter>{' '}
                  from the client.
                </li>
                <li>
                  Scope
                  <Highlighter action="highlight" color="#87CEFA">
                    {' '}
                    changes
                  </Highlighter>{' '}
                  during the engagement.
                </li>
                <li>
                  <Highlighter action="highlight" color="#87CEFA">
                    Cancellation
                  </Highlighter>{' '}
                  for convenience.
                </li>
                <li>
                  Delivery blocked by the client’s{' '}
                  <Highlighter action="highlight" color="#87CEFA">
                    no-response
                  </Highlighter>
                  .
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
            Fondée par{' '}
            <Highlighter action="highlight" color="#87CEFA">
              Florent
            </Highlighter>
            , Ikovaline est une start-up spécialisée dans le{' '}
            <Highlighter action="highlight" color="#87CEFA">
              digital
            </Highlighter>{' '}
            et la transformation numérique. Née d’une volonté forte
            d’accompagner les entreprises, elle conçoit des solutions
            sur-mesure pour renforcer leur{' '}
            <Highlighter action="highlight" color="#87CEFA">
              visibilité
            </Highlighter>{' '}
            et accélérer leur croissance.
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
            Ikovaline{' '}
            <Highlighter action="highlight" color="#87CEFA">
              se distingue
            </Highlighter>{' '}
            par sa mission : aider chaque client à franchir un{' '}
            <Highlighter action="highlight" color="#87CEFA">
              cap
            </Highlighter>{' '}
            stratégique grâce à des services innovants, pensés pour des
            résultats mesurables et durables.
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
            de{' '}
            <Highlighter action="highlight" color="#87CEFA">
              300 000€
            </Highlighter>{' '}
            d’ici 2026. Cette ambition repose sur notre capacité à offrir des
            services{' '}
            <Highlighter action="highlight" color="#87CEFA">
              performants
            </Highlighter>{' '}
            et un accompagnement{' '}
            <Highlighter action="highlight" color="#87CEFA">
              personnalisé
            </Highlighter>
            .
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
            <Highlighter action="highlight" color="#87CEFA">
              résultats
            </Highlighter>{' '}
            concrets via des solutions digitales
            <Highlighter action="highlight" color="#87CEFA">
              {' '}
              personnalisées
            </Highlighter>
            . Toutefois, la garantie de remboursement est encadrée par les
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
              <Highlighter action="highlight" color="#87CEFA">
                7 jours
              </Highlighter>
            </p>
            <p className="text-neutral-700 dark:text-neutral-300">
              Contenus,{' '}
              <Highlighter action="highlight" color="#87CEFA">
                accès
              </Highlighter>{' '}
              (sites, hébergeurs, domaines, CMS, analytics, etc.) et
              informations utiles.
            </p>
            <p className="text-neutral-700 dark:text-neutral-300">
              En cas de manquement ou retard, la{' '}
              <Highlighter action="highlight" color="#87CEFA">
                garantie
              </Highlighter>{' '}
              de remboursement est annulée.
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
              2. 🧾 Délai de demande –{' '}
              <Highlighter action="highlight" color="#87CEFA">
                30 jours
              </Highlighter>
            </p>
            <p className="text-neutral-700 dark:text-neutral-300">
              30 jours à compter de la première{' '}
              <Highlighter action="highlight" color="#87CEFA">
                facture
              </Highlighter>{' '}
              pour une demande écrite{' '}
              <Highlighter action="highlight" color="#87CEFA">
                formelle
              </Highlighter>
              . Passé ce délai, la demande est irrecevable.
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
                Réception des livrables
                <Highlighter action="highlight" color="#87CEFA">
                  {' '}
                  finaux
                </Highlighter>{' '}
                dans les délais.
              </li>
              <li>
                Attendre la fin
                <Highlighter action="highlight" color="#87CEFA">
                  {' '}
                  complète
                </Highlighter>{' '}
                de la prestation avant toute réclamation.
              </li>
            </ul>
            <p className="text-neutral-700 dark:text-neutral-300">
              Toute{' '}
              <Highlighter action="highlight" color="#87CEFA">
                rupture
              </Highlighter>{' '}
              unilatérale ou{' '}
              <Highlighter action="highlight" color="#87CEFA">
                refus
              </Highlighter>{' '}
              de réception injustifié annule la garantie.
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
                <Highlighter action="highlight" color="#87CEFA">
                  Objectifs
                </Highlighter>{' '}
                non définis/validés avant le lancement.
              </li>
              <li>
                Manque de{' '}
                <Highlighter action="highlight" color="#87CEFA">
                  collaboration
                </Highlighter>{' '}
                active du client.
              </li>
              <li>
                <Highlighter action="highlight" color="#87CEFA">
                  Modification
                </Highlighter>{' '}
                de commande en cours.
              </li>
              <li>
                <Highlighter action="highlight" color="#87CEFA">
                  Annulation
                </Highlighter>{' '}
                pour convenance personnelle.
              </li>
              <li >
                Livraison bloquée par{' '}
                <Highlighter action="highlight" color="#87CEFA">
                  absence
                </Highlighter>{' '}
                de réponse.
              </li>
            </ul>
          </motion.div>
        </>
      ),
      badge: 'Garantie',
    },
  ];
}
