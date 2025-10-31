'use client';

import { motion } from 'framer-motion';
import {
  IconSparkles,
  IconHistory,
  IconLayersIntersect,
  IconGauge,
  IconTargetArrow,
  IconBolt,
  IconFingerprint,
  IconEye,
  IconStar,
} from '@tabler/icons-react';
import { TracingBeam } from '@/components/ui/tracing-beam';
import React from 'react';

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
        'relative inline-flex items-center gap-2 rounded-3xl px-4 py-1.5 text-[10px] font-semibold tracking-wide uppercase',
        'bg-[linear-gradient(135deg,rgba(255,255,255,.9),rgba(240,245,252,.55))] text-sky-700',
        'shadow-[0_12px_32px_rgba(0,168,232,.14),inset_0_1px_0_rgba(255,255,255,.6)]',
        'ring-1 ring-white/60',

        'dark:bg-[linear-gradient(135deg,rgba(10,14,20,.9),rgba(10,14,20,.55))] dark:text-sky-400',
        'dark:shadow-[0_16px_40px_rgba(0,0,0,.8),inset_0_1px_0_rgba(59,130,246,.2)]',
        'dark:ring-[rgba(56,130,246,0.3)]',
      ].join(' ')}
    >
      <Icon className="h-3.5 w-3.5 text-sky-600 dark:text-sky-400" />
      {label}
    </span>
  );
}

/* ===== Card principale de chaque bloc ===== */
function BlockCard({ children }: { children: React.ReactNode }) {
  return (
    <div
      className={[
        'relative mx-auto w-full max-w-2xl rounded-[3rem] p-6 sm:p-8',
        // light mode soft neumorphism
        'bg-white/80 text-neutral-700',
        'shadow-[0_32px_80px_rgba(15,23,42,0.08),_0_2px_2px_rgba(255,255,255,0.6)_inset]',
        'ring-1 ring-white/70',

        // dark mode soft surface
        'dark:bg-[rgba(17,22,31,0.8)] dark:text-neutral-200',
        'dark:shadow-[0_40px_120px_rgba(0,0,0,0.9),_0_1px_0_rgba(255,255,255,0.07)_inset]',
        'dark:ring-[rgba(56,130,246,0.18)]',

        'backdrop-blur-xl',
      ].join(' ')}
    >
      {children}
    </div>
  );
}

/* ===== Sous-card spéciale pour les listes ===== */
function ListCard({ children }: { children: React.ReactNode }) {
  return (
    <div
      className={[
        'relative mx-auto w-full max-w-[38rem] rounded-2xl px-4 py-4 sm:px-5 sm:py-5 text-left',
        // light mode
        'bg-white shadow-[0_20px_60px_rgba(15,23,42,0.06),_0_1px_1px_rgba(255,255,255,0.7)_inset] ring-1 ring-white/70',
        // dark mode
        'dark:bg-[rgba(24,31,44,0.7)] dark:shadow-[0_30px_80px_rgba(0,0,0,0.9),_0_1px_0_rgba(255,255,255,0.06)_inset] dark:ring-[rgba(56,130,246,0.18)]',
        'backdrop-blur-xl',
      ].join(' ')}
    >
      {children}
    </div>
  );
}

/* ===== Bullet custom (unordered) ===== */
function BulletItem({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex items-start gap-3 leading-relaxed text-neutral-800 dark:text-neutral-200">
      <span
        className={[
          'mt-[0.5em] inline-block h-2.5 w-2.5 flex-none rounded-full',
          'bg-primary',
        ].join(' ')}
      />
      <span className="flex-1 text-[15px] leading-relaxed md:text-base">
        {children}
      </span>
    </li>
  );
}

/* ===== Bullet custom numéroté (ordered) ===== */
function NumberItem({
  index,
  children,
}: {
  index: number;
  children: React.ReactNode;
}) {
  const num = index + 1;
  return (
    <li className="flex items-start gap-3 leading-relaxed text-neutral-800 dark:text-neutral-200">
      <span
        className={[
          'mt-[0.25em] inline-flex h-6 w-6 flex-none items-center justify-center rounded-full text-[12px] font-semibold text-white shadow-[0_8px_20px_rgba(56,130,246,0.2)]',
          'bg-primary',
        ].join(' ')}
      >
        {num}
      </span>
      <span className="flex-1 text-[15px] leading-relaxed md:text-base">
        {children}
      </span>
    </li>
  );
}

/* ========= Paragraphe harmonisé ========= */
function Paragraph({ children }: { children: React.ReactNode }) {
  return (
    <motion.p
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="text-[15px] leading-relaxed text-neutral-700 dark:text-neutral-300 md:text-base text-center sm:text-left"
    >
      {children}
    </motion.p>
  );
}

/* ========= Titre section ========= */
function SectionTitle({
  children,
  isMain,
}: {
  children: React.ReactNode;
  isMain?: boolean;
}) {
  return isMain ? (
    <h1 className="mx-auto mb-6 text-center text-3xl xs:text-4xl md:text-5xl font-extrabold tracking-tight bg-gradient-to-t from-neutral-900 via-neutral-800 to-neutral-600 bg-clip-text text-transparent dark:from-neutral-100 dark:via-neutral-300 dark:to-neutral-400">
      {children}
    </h1>
  ) : (
    <h2 className="mx-auto mb-6 text-center text-3xl xs:text-4xl md:text-5xl font-extrabold tracking-tight bg-gradient-to-t from-neutral-900 via-neutral-800 to-neutral-600 bg-clip-text text-transparent dark:from-neutral-100 dark:via-neutral-300 dark:to-neutral-400">
      {children}
    </h2>
  );
}

export default function AboutContent() {
  const blocks: Block[] = [
    /* =========================================
       1. À propos d’Ikovaline (refonte demandée)
       ========================================= */
    {
      id: 'a-propos',
      badge: { label: 'À propos', Icon: IconSparkles },
      title: 'À propos d’Ikovaline',
      body: (
        <>
          <Paragraph>
            Ikovaline est une agence de Développement Web, App & Acquisition
            Digitale basée à Paris.
          </Paragraph>

          <Paragraph>
            Nous concevons des écosystèmes digitaux performants :
          </Paragraph>
          <ListCard>
            <ul className="space-y-4">
              {/* sous-liste pour "sites web / applications / systèmes d’acquisition" */}
              <BulletItem>sites web</BulletItem>
              <BulletItem>applications,</BulletItem>
              <BulletItem>systèmes d’acquisition</BulletItem>
            </ul>
          </ListCard>
          <Paragraph>
            pensés pour une seule chose : faire croître ton business.
          </Paragraph>
        </>
      ),
    },

    /* =========================================
       2. Notre histoire (refonte demandée)
       ========================================= */
    {
      id: 'histoire',
      badge: { label: 'Notre histoire', Icon: IconHistory },
      title: 'Notre histoire',
      body: (
        <>
          <Paragraph>
            Ikovaline est née d’une conviction simple :
            <br />
            <br />
            les entreprises ne manquent pas d’idées, elles manquent d’exécution
            rapide, fiable et rentable.
          </Paragraph>

          <Paragraph>
            Nous avons construit Ikovaline pour changer cette réalité. Pas une
            agence de plus, mais une structure hybride, à mi-chemin entre la
            performance technique et la rigueur business.
          </Paragraph>

          <Paragraph>
            Chaque projet est abordé comme un produit à impact, pas comme une
            commande.
          </Paragraph>

          <ListCard>
            <ul className="space-y-4">
              <BulletItem>
                Nous ne “livrons” pas un site : nous livrons un levier de
                croissance.
              </BulletItem>
              <BulletItem>
                Chaque mission est pilotée comme un produit, avec un objectif
                business clair.
              </BulletItem>
            </ul>
          </ListCard>
        </>
      ),
    },

    /* =========================================
       3. Notre modèle (TU AIMES → on garde le style actuel)
       ========================================= */
    {
      id: 'modele',
      badge: { label: 'Notre modèle', Icon: IconLayersIntersect },
      title: 'Notre modèle',
      body: (
        <>
          <Paragraph>
            Ikovaline repose sur un modèle clair et efficace :
          </Paragraph>

          <ListCard>
            <ul className="space-y-4">
              <BulletItem>
                Une équipe cœur (développeurs, designers, stratèges, marketeurs)
              </BulletItem>
              <BulletItem>
                Un réseau de freelances experts triés et onboardés en interne
              </BulletItem>
              <BulletItem>
                Une méthode de production rapide et précise, avec un délai moyen
                de 30 jours par projet
              </BulletItem>
            </ul>
          </ListCard>

          <Paragraph>
            Ce modèle nous permet d’allier rapidité, exigence et rentabilité
            sans sacrifier la qualité. Chaque mission est gérée comme un
            partenariat long terme, pas comme une simple prestation.
          </Paragraph>
        </>
      ),
    },

    /* =========================================
       4. Nos résultats (TU AIMES)
       ========================================= */
    {
      id: 'resultats',
      badge: { label: 'Nos résultats', Icon: IconGauge },
      title: 'Nos résultats',
      body: (
        <>
          <Paragraph>
            Depuis notre lancement, nous avons accompagné plus de soixante
            projets sur mesure, pour des startups, PME et marques en pleine
            expansion.
          </Paragraph>

          <Paragraph>
            Notre engagement envers la qualité et la délivrabilité nous a valu
            la reconnaissance du marché :
          </Paragraph>

          <ListCard>
            <ul className="space-y-4">
              <BulletItem>
                Bark Partner n°1 en France dans la catégorie agence web
              </BulletItem>
              <BulletItem>Top 10 des agences web à Paris</BulletItem>
            </ul>
          </ListCard>

          <Paragraph>
            Ces distinctions ne sont pas des slogans : elles traduisent la
            confiance de nos clients et la constance de nos résultats.
          </Paragraph>
        </>
      ),
    },

    /* =========================================
       5. Notre promesse (TU AIMES)
       ========================================= */
    {
      id: 'promesse',
      badge: { label: 'Notre promesse', Icon: IconTargetArrow },
      title: 'Notre promesse',
      body: (
        <>
          <Paragraph>
            Chez Ikovaline, nous croyons qu’un projet digital doit être :
          </Paragraph>

          <ListCard>
            <ol className="space-y-4">
              <NumberItem index={0}>
                <strong>Efficace</strong> — il sert un objectif concret,
                mesurable.
              </NumberItem>
              <NumberItem index={1}>
                <strong>Évolutif</strong> — il s’adapte à ta croissance.
              </NumberItem>
              <NumberItem index={2}>
                <strong>Distinctif</strong> — il reflète ton identité et te
                différencie sur ton marché.
              </NumberItem>
            </ol>
          </ListCard>

          <Paragraph>
            Nous livrons des projets qui performent et durent.
          </Paragraph>

          <Paragraph>
            Notre mission est claire :
            <br />
            construire des écosystèmes digitaux qui transforment une présence en
            ligne en croissance réelle.
          </Paragraph>
        </>
      ),
    },

    /* =========================================
       6. Nos expertises (TU AIMES)
       ========================================= */
    {
      id: 'expertises',
      badge: { label: 'Nos expertises', Icon: IconBolt },
      title: 'Nos expertises',
      body: (
        <>
          <ListCard>
            <ul className="space-y-4">
              <BulletItem>
                Développement de sites web sur mesure (vitrines, e-commerce,
                SaaS)
              </BulletItem>
              <BulletItem>
                Création d’applications web et mobiles performantes
              </BulletItem>
              <BulletItem>
                Intégration d’outils d’automatisation et d’IA
              </BulletItem>
              <BulletItem>Référencement SEO / SEA</BulletItem>
              <BulletItem>Stratégies d’acquisition et de conversion</BulletItem>
              <BulletItem>Design UX/UI orienté business</BulletItem>
            </ul>
          </ListCard>
        </>
      ),
    },

    /* =========================================
       7. Notre ADN (TU AIMES)
       ========================================= */
    {
      id: 'adn',
      badge: { label: 'Notre ADN', Icon: IconFingerprint },
      title: 'Notre ADN',
      body: (
        <>
          <ListCard>
            <ul className="space-y-4">
              <BulletItem>
                <strong>Exécution rapide.</strong> Un projet moyen dure 30
                jours, pas 6 mois.
              </BulletItem>
              <BulletItem>
                <strong>Précision technique.</strong> Chaque ligne de code est
                pensée pour performer.
              </BulletItem>
              <BulletItem>
                <strong>Culture du résultat.</strong> Nos clients ne cherchent
                pas un site, ils cherchent un ROI.
              </BulletItem>
              <BulletItem>
                <strong>Équipe humaine.</strong> Pas de jargon, pas de baratin —
                de vrais échanges, de vrais suivis.
              </BulletItem>
            </ul>
          </ListCard>
        </>
      ),
    },

    /* =========================================
       8. Notre vision (refonte demandée)
       ========================================= */
    {
      id: 'vision',
      badge: { label: 'Notre vision', Icon: IconEye },
      title: 'Notre vision',
      body: (
        <>
          <Paragraph>
            Nous voulons bâtir la prochaine génération d’agences digitales
            françaises : indépendantes, ambitieuses, ancrées dans la qualité,
            mais agiles comme une startup.
          </Paragraph>

          <ListCard>
            <ul className="space-y-4">
              <BulletItem>
                Une culture produit : créer ce qui sert vraiment le business.
              </BulletItem>
              <BulletItem>
                Une culture vitesse : livrer en semaines, pas en semestres.
              </BulletItem>
              <BulletItem>
                Une culture justesse : pas “faire plus”, mais faire mieux, plus
                vite, et plus juste.
              </BulletItem>
            </ul>
          </ListCard>
        </>
      ),
    },

    /* =========================================
       9. Notre signature (refonte demandée)
       ========================================= */
    {
      id: 'signature',
      badge: { label: 'Notre signature', Icon: IconStar },
      title: 'Notre signature',
      body: (
        <>
          <Paragraph>
            Ikovaline – Agence Web, App & Acquisition Digitale
          </Paragraph>

          <ListCard>
            <ul className="space-y-4">
              <BulletItem>
                Bark Partner n°1 France dans la catégorie agence web
              </BulletItem>
              <BulletItem>Top 10 des agences web à Paris</BulletItem>
              <BulletItem>
                Nous créons des écosystèmes digitaux performants, rapides et
                rentables.
              </BulletItem>
            </ul>
          </ListCard>
        </>
      ),
    },
  ];

  return (
    <TracingBeam className="my-24 px-6">
      <div className="relative mx-auto max-w-3xl antialiased">
        {/* halos bleus subtilement derrière */}
        <span
          aria-hidden
          className="pointer-events-none absolute -top-16 left-1/2 -z-10 h-[36rem] w-[36rem] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,#00A8E8,transparent_70%)] opacity-25 blur-[200px] dark:opacity-35"
        />
        <span
          aria-hidden
          className="pointer-events-none absolute bottom-0 right-1/4 -z-10 h-[30rem] w-[30rem] translate-x-1/4 rounded-full bg-[radial-gradient(closest-side,#2563EB,transparent_70%)] opacity-20 blur-[180px] dark:opacity-30"
        />

        {blocks.map((b, idx) => (
          <section key={b.id} id={b.id} className="mb-16">
            {/* badge */}
            <div className="mb-4 flex justify-center">
              <SectionBadge Icon={b.badge.Icon} label={b.badge.label} />
            </div>

            {/* titre */}
            <SectionTitle isMain={idx === 0}>{b.title}</SectionTitle>

            {/* card */}
            <div className="flex justify-center">
              <BlockCard>
                <div className="space-y-8 text-center sm:text-left">
                  {b.body}
                </div>
              </BlockCard>
            </div>
          </section>
        ))}
      </div>
    </TracingBeam>
  );
}
