// app/(auth)/signup/page.tsx
'use client';

import { Suspense, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, Plus } from 'lucide-react';
import { motion, type Variants } from 'framer-motion';
import { ProjectGaugeCard } from '@/components/ClientSpace/ProgressCard';
import { StarRow } from '@/components/StarClientsGoogle';

/* ================= Animations ================= */
const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];
const fadeUpSoft: Variants = {
  hidden: { opacity: 0, y: 14, filter: 'blur(6px)' },
  show: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.75, ease: EASE },
  },
};
const staggerCol: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.08 } },
};
const slideInPanel: Variants = {
  hidden: { opacity: 0, x: -24, filter: 'blur(10px)' },
  show: {
    opacity: 1,
    x: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.9, ease: EASE },
  },
};
const leftLaurelSrc = '/laurier-gauche.svg';

const rightLaurelSrc = '/laurier-droite.svg';
/* ================= Sous-composant ================= */
function SignupInner() {
  const search = useSearchParams();
  const nextParam = search.get('next') ?? '';
  const nextQS = useMemo(
    () => (nextParam ? `?next=${encodeURIComponent(nextParam)}` : ''),
    [nextParam]
  );

  return (
    <div className="min-h-[100dvh] w-[100dvw] overflow-hidden bg-background text-foreground grid md:grid-cols-2">
      {/* Top bar */}
      <div className="pointer-events-none absolute inset-x-0 top-0 flex items-center justify-between p-4 md:p-8 z-20">
        <div className="pointer-events-auto">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-[1.1rem] px-3 py-2
                       bg-white/60 dark:bg-neutral-900/60 backdrop-blur-xl
                       hover:bg-white/80 dark:hover:bg-neutral-900/80
                       transition shadow-[0_8px_30px_rgba(0,0,0,0.06)]"
            aria-label="Retour"
          >
            <ArrowLeft className="h-5 w-5" />
            <span className="text-sm font-medium">Retour</span>
          </Link>
        </div>

        <div className="pointer-events-auto">
          <Link
            href={`/signin${nextQS}`}
            className="inline-flex items-center gap-2 rounded-[1.1rem] px-4 py-2
                       bg-gradient-to-r from-primary to-blue-500 text-white
                       hover:opacity-90 transition shadow-[0_10px_30px_rgba(59,130,246,0.35)]"
            aria-label="Se connecter"
          >
            <span className="text-sm font-semibold">Se connecter</span>
          </Link>
        </div>
      </div>

      {/* Colonne gauche */}
      <section className="flex items-center justify-center p-6 md:p-10">
        <motion.div
          variants={staggerCol}
          initial="hidden"
          animate="show"
          className="w-full max-w-xl text-center"
        >
          <motion.h1
            variants={fadeUpSoft}
            className="text-[34px] md:text-[42px] font-semibold leading-tight tracking-tight"
          >
            Lancez votre site, sans friction.
          </motion.h1>
          <motion.p
            variants={fadeUpSoft}
            className="mt-3 text-muted-foreground"
          >
            Dites-nous ce que vous voulez atteindre. Nous cadrons, proposons une
            offre claire et activons la production. Validation rapide, pilotage
            transparent, résultats concrets.
          </motion.p>
          <motion.ul
            variants={staggerCol}
            className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm"
          >
            <motion.li
              variants={fadeUpSoft}
              className="rounded-[1.1rem] px-4 py-3 bg-foreground/[0.04] dark:bg-white/10"
            >
              <div className="font-semibold">Clarté</div>
              <div className="text-muted-foreground">
                Offres & délais limpides
              </div>
            </motion.li>
            <motion.li
              variants={fadeUpSoft}
              className="rounded-[1.1rem] px-4 py-3 bg-foreground/[0.04] dark:bg-white/10"
            >
              <div className="font-semibold">Performance</div>
              <div className="text-muted-foreground">UX, SEO, vitesse</div>
            </motion.li>
            <motion.li
              variants={fadeUpSoft}
              className="rounded-[1.1rem] px-4 py-3 bg-foreground/[0.04] dark:bg-white/10"
            >
              <div className="font-semibold">Sérénité</div>
              <div className="text-muted-foreground">
                Signature & paiement sécurisés
              </div>
            </motion.li>
          </motion.ul>
          <motion.div variants={fadeUpSoft} className="mt-7">
            <Link
              href={`/demarrer${nextQS}`}
              className="inline-flex items-center justify-center rounded-[1.1rem] px-8 py-4
                         bg-primary hover:opacity-90 transition text-white font-medium
                         shadow-[0_10px_30px_rgba(59,130,246,0.15)]"
            >
              Commencer
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* Colonne droite */}
      <section className="hidden md:flex items-center p-4 relative overflow-hidden">
        <motion.div
          variants={slideInPanel}
          initial="hidden"
          animate="show"
          className="absolute inset-4 rounded-[2rem] overflow-hidden"
        >
          <div className="relative h-full w-full">
            {/* fond bleu intense et harmonieux */}
            <div
              className="absolute inset-0"
              style={{
                background: `
                radial-gradient(1200px 700px at 10% 0%, rgba(2,132,199,0.45), transparent 65%),
                radial-gradient(1000px 600px at 85% 20%, rgba(56,189,248,0.5), transparent 60%),
                radial-gradient(800px 800px at 70% 110%, rgba(125,211,252,0.45), transparent 55%)
              `,
              }}
            />

            {/* halos animés “Ikovaline” plus vibrants */}
            <motion.div
              className="absolute -top-12 -left-10 h-72 w-72 rounded-full bg-sky-400/50 blur-[90px]"
              animate={{ x: [0, 12, -10, 0], y: [0, -10, 14, 0] }}
              transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
            />
            <motion.div
              className="absolute -bottom-20 -right-14 h-80 w-80 rounded-full bg-sky-500/50 blur-[110px]"
              animate={{ x: [0, -14, 12, 0], y: [0, 14, -10, 0] }}
              transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
            />

            {/* voile blanc doux pour lisibilité */}
            <div className="absolute inset-0 bg-white/30 backdrop-blur-md" />
          </div>
        </motion.div>

        <div className="relative z-10 mx-auto w-full max-w-[560px] px-2 text-center">
          <h2 className="text-slate-800 text-[28px] leading-tight sm:text-[36px] font-semibold mb-4">
            Lancez & propulsez votre projet.
          </h2>
          <div className="z-10 pb-5">
            <a
              target="_blank"
              href="https://www.google.com/search?rlz=1C1CHZN_frFR1084FR1084&q=Ikovaline%20Avis"
              className="flex items-end justify-center gap-2 cursor-pointer"
            >
              <motion.div
                initial={{ opacity: 0, y: 10, filter: 'blur(6px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                transition={{ duration: 1, ease: 'easeInOut', delay: 0.4 }}
                className="mt-4 flex items-center justify-center gap-1 text-slate-700 dark:text-slate-100"
              >
                {/* 🌿 Laurier gauche */}
                <Image
                  src={leftLaurelSrc}
                  alt="laurier gauche"
                  width={46}
                  height={46}
                  className="opacity-90 rotate-12 drop-shadow-[0_0_16px_rgba(44,183,255,0.7)]"
                />

                {/* ⭐ Bloc central */}
                <span className="flex flex-col gap-1 items-center justify-center">
                  <StarRow />
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 }}
                    className="text-xs tracking-wider font-semibold text-gray-700 dark:text-gray-300"
                  >
                    67+ avis
                  </motion.span>
                </span>

                {/* 🌿 Laurier droit */}
                <Image
                  src={rightLaurelSrc}
                  alt="laurier droit"
                  width={46}
                  height={46}
                  className="opacity-85 -rotate-12 drop-shadow-[0_0_16px_rgba(44,183,255,0.7)]"
                />
              </motion.div>
            </a>
          </div>
          <ProjectGaugeCard percent={58} />
        </div>
      </section>
    </div>
  );
}

/* ================= Wrapper avec Suspense ================= */
export default function SignupPageWrapper() {
  return (
    <Suspense
      fallback={
        <div className="p-8 text-center text-muted-foreground">Chargement…</div>
      }
    >
      <SignupInner />
    </Suspense>
  );
}
