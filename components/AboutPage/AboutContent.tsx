'use client';
import Image from 'next/image';
import { TracingBeam } from '@/components/ui/tracing-beam';
import { Team } from '@/components/AboutPage/Team';
import ImageHistory1 from '@/public/images/About/team-ikovaline (3).jpg';
import ImageHistory2 from '@/public/images/About/team-ikovaline (4).jpg';
import { Highlight } from '@/components/ui/hero-highlight';
import { motion } from 'framer-motion';
import { Cover } from '@/components/ui/cover';
import { IconQuote } from '@tabler/icons-react';

export default function AboutContent() {
  return (
    <TracingBeam className="px-6 my-20 ">
      <div className="max-w-3xl mx-auto antialiased pt-4 relative max-lg:px-5">
        {ikovalineContent.map((item, index) => (
          <div key={`content-${index}`} className="mb-10" id={item.id}>
            <p className="bg-[#2B92C6] text-white rounded-full text-sm w-fit px-4 py-1 mb-4">
              {item.badge}
            </p>
            <h2 className="md:text-5xl xs:text-4xl text-3xl mb-12 text-center font-semibold bg-gradient-to-t from-neutral-300 to-neutral-600 bg-clip-text text-transparent">
              {item.title}
            </h2>
            <div className="sm:text-lg text-base space-y-5 text-center leading-loose prose prose-sm dark:prose-invert">
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
          transition={{ duration: 0.5, ease: [0.4, 0.0, 0.2, 1] }}
          viewport={{ amount: 0.5 }}
          className="leading-9"
        >
          Fondée par <Highlight className="p-2 m-1">Florent Ghizzoni</Highlight>
          , Ikovaline est une start-up spécialisée dans le marketing digital et
          la transformation numérique. Née d&apos;une volonté forte
          d&apos;accompagner les entreprises dans leur croissance, elle propose
          des solutions digitales personnalisées pour améliorer la visibilité,
          le développement commercial et les performances globales.
        </motion.p>

        <div className="grid sm:grid-cols-2 grid-cols-1 gap-8">
          <Image
            src={ImageHistory1}
            alt="Équipe Ikovaline en collaboration sur projets de transformation numérique et marketing digital"
            width={500}
            height={500}
            className="rounded-3xl w-full shadow-xl aspect-square object-cover object-center"
          />
          <Image
            src={ImageHistory2}
            alt="Équipe Ikovaline en réunion de stratégie digitale"
            width={500}
            height={500}
            className="rounded-3xl w-full shadow-xl max-sm:hidden aspect-square object-cover object-bottom"
          />
        </div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: [20, -5, 0] }}
          transition={{ duration: 0.5, ease: [0.4, 0.0, 0.2, 1] }}
          viewport={{ amount: 1 }}
          className="leading-9"
        >
          Ikovaline <Highlight className="p-2 m-1">se distingue</Highlight> par
          sa mission : accélérer la digitalisation des entreprises avec des
          services innovants et sur-mesure. Grâce à une approche orientée
          résultats, l&apos;équipe aide chaque client à franchir un cap
          stratégique dans un environnement numérique en constante évolution.
        </motion.p>
      </>
    ),
    badge: 'Histoire',
  },
  {
    title: 'Une Équipe Passionnée',
    id: 'notre-equipe',
    description: (
      <>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: [20, -5, 0] }}
          transition={{ duration: 0.5, ease: [0.4, 0.0, 0.2, 1] }}
          viewport={{ amount: 1 }}
          className="leading-9"
        >
          Chez Ikovaline, la réussite de nos clients repose sur une équipe
          marketing <Highlight className="p-2 m-1">passionnée</Highlight> et{' '}
          <Highlight className="p-2 m-1">engagée</Highlight>. Experts en
          stratégie digitale, développement commercial et gestion de projet,
          nous créons des solutions personnalisées qui boostent la visibilité en
          ligne et la croissance durable des entreprises.
        </motion.p>

        <Team />

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: [20, -5, 0] }}
          transition={{ duration: 0.5, ease: [0.4, 0.0, 0.2, 1] }}
          viewport={{ amount: 1 }}
          className="leading-9"
        >
          Ensemble, nous partageons une mission : accompagner les professionnels
          dans leur transformation numérique. Notre objectif ? Fournir des
          résultats <Highlight className="p-2 m-1">durables</Highlight> et{' '}
          <Highlight className="p-2 m-1">mesurables</Highlight>, en plaçant
          l&apos;humain au cœur de chaque stratégie.
        </motion.p>
      </>
    ),
    badge: 'Équipe',
  },

  {
    title: 'Une Vision Ambitieuse',
    id: 'notre-vision',
    description: (
      <>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: [20, -5, 0] }}
          transition={{ duration: 0.5, ease: [0.4, 0.0, 0.2, 1] }}
          viewport={{ amount: 1 }}
          className="leading-9"
        >
          Ikovaline porte une vision claire : atteindre un chiffre
          d&apos;`affaires de <Cover>300 000 €</Cover> d&apos;ici 2026. Cette
          ambition s&apos;appuie sur notre capacité à proposer des services
          digitaux <Highlight className="p-2 m-1">performants</Highlight> et à
          offrir un accompagnement{' '}
          <Highlight className="p-2 m-1">personnalisé</Highlight> pour chaque
          entreprise.
        </motion.p>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: [20, -5, 0] }}
          transition={{ duration: 0.5, ease: [0.4, 0.0, 0.2, 1] }}
          viewport={{ amount: 1 }}
          className="leading-8"
        >
          <IconQuote
            stroke={2}
            className="inline-block h-6 w-6 text-neutral-500 align-top"
          />
          <span className="text-neutral-500">
            Nous croyons que la réussite passe par une stratégie numérique
            adaptée
          </span>
          <IconQuote
            stroke={2}
            className="inline-block h-6 w-6 text-neutral-500 align-top"
          />
          <span className="ml-1 block text-neutral-600 font-semibold">
            - Florent Ghizzoni.
          </span>
        </motion.p>
      </>
    ),
    badge: 'Vision',
  },
  {
    title: 'Garantie de Résultats ou Remboursement',
    id: 'notre-garantie',
    description: (
      <>
        <motion.p
          initial={{
            opacity: 1,
            y: 20,
          }}
          whileInView={{
            opacity: 1,
            y: [20, -5, 0],
          }}
          transition={{
            duration: 0.5,
            ease: [0.4, 0.0, 0.2, 1],
          }}
          viewport={{
            amount: 1,
          }}
          className="leading-9"
        >
          Chez Ikovaline, nous nous engageons à fournir des résultats concrets à
          travers des solutions digitales personnalisées. Toutefois, la garantie
          de remboursement est{' '}
          <Highlight className="p-2 m-1">strictement</Highlight> encadrée par
          les conditions suivantes :
          <span className="block mt-4">
            1. 📦 Transmission des éléments nécessaires sous 7 jours
          </span>
          <span>
            Le client s’engage à transmettre dans un délai de 7 jours
            calendaires à compter du paiement de l’acompte : • L’ensemble des
            contenus nécessaires (textes, images, logos, etc.) • Les accès aux
            plateformes, sites, hébergeurs, domaines, CMS, analytics, etc. •
            Toute information utile à la bonne exécution du projet. En cas de
            manquement ou de délai dépassé, la garantie de remboursement est
            automatiquement annulée.
          </span>
          <span className="block mt-4">
            2. 🧾 Délai légal de demande de remboursement – 30 jours
          </span>
          <span>
            Le client dispose d’un délai de 30 jours à compter de la date
            d’émission de la première facture (acompte ou paiement complet) pour
            soumettre par écrit (email recommandé ou recommandé AR) une demande
            formelle de remboursement. Passé ce délai, la demande est
            automatiquement irrecevable.
          </span>
          <span className="block mt-4">
            3. 📤 Livraison et réception des livrables
          </span>
          <span>
            Le client s’engage à : • Assister aux réunions de restitution ou aux
            démonstrations prévues. • Réceptionner les livrables finaux dans les
            délais impartis. • Attendre la fin complète de la prestation
            (transmission finale des fichiers, accès, maquettes, etc.) avant
            toute réclamation. Toute tentative de rupture unilatérale ou de
            refus de réception sans motif sérieux annule la garantie.
          </span>
          <span className="block mt-4">4. 🚫 Exclusions de la garantie</span>
          <span>
            La garantie ne s’applique pas dans les cas suivants : • Objectifs
            non définis ou non validés conjointement avant le lancement du
            projet. • Retard ou absence de collaboration active du client. •
            Modification de la commande en cours de prestation. • Annulation du
            projet pour convenance personnelle. • Livraison bloquée par absence
            de réponse du client.
          </span>
        </motion.p>
      </>
    ),
    badge: 'Remboursement garanti',
  },
];
