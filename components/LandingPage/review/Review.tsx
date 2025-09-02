// components/sections/Review.tsx
'use client';

import Image, { StaticImageData } from 'next/image';
import { useEffect, useMemo, useState } from 'react';

// ---- Sources locales (garde les tiennes si tu veux) ----
import Review1 from '@/public/images/logo/frewinglas-logo.png';
import Review2 from '@/public/images/logo/jean-cristophe-Lelandais.jpeg';
import Review3 from '@/public/images/logo/logo-lelandais.png';
import Review4 from '@/public/images/logo/hl-horner-logo.jpg';
import Review5 from '@/public/images/logo/logo-lora.png';
import StarClientsGoogle from '@/components/StarClientsGoogle';

type ReviewType = {
  name: string;
  role: string;
  text: string;
  image?: string | StaticImageData;
};

// Fallback avatar (dégradé “primary” #2CB7FF)
const BLUE_AVATAR = `data:image/svg+xml;utf8,${encodeURIComponent(
  `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'>
    <defs><linearGradient id='g' x1='0' y1='0' x2='1' y2='1'>
      <stop offset='0%' stop-color='#2CB7FF'/><stop offset='100%' stop-color='#007AFF'/>
    </linearGradient></defs>
    <circle cx='50' cy='50' r='50' fill='url(#g)'/></svg>`
)}`;

/* ---------------------------- Small utilities ---------------------------- */
function useIsMobile(breakpoint = 768) {
  const [isMobile, setIsMobile] = useState(true);
  useEffect(() => {
    const mq = window.matchMedia(`(max-width:${breakpoint - 1}px)`);
    const on = () => setIsMobile(mq.matches);
    on();
    mq.addEventListener('change', on);
    return () => mq.removeEventListener('change', on);
  }, [breakpoint]);
  return isMobile;
}

/* --------------------------------- Card --------------------------------- */
function Card({ r }: { r: ReviewType }) {
  // FIX: si string http -> on garde l’URL, sinon fallback.
  const src: string =
    typeof r.image === 'string'
      ? r.image
      : (r.image as StaticImageData | undefined)?.src ?? BLUE_AVATAR;

  return (
    <article
      className={[
        'group relative mb-6 break-inside-avoid rounded-2xl p-6 transition-transform duration-200 will-change-transform',
        // Lux neutral + ring/shadow adaptés dark
        'bg-white/95 ring-1 ring-black/5 shadow-[0_26px_40px_-24px_rgba(0,0,0,0.16)]',
        'hover:-translate-y-0.5 hover:shadow-[0_30px_44px_-24px_rgba(0,0,0,0.18)]',
        'dark:bg-neutral-900/90 dark:ring-white/10 dark:shadow-[0_46px_80px_-40px_rgba(0,0,0,0.65)]',
      ].join(' ')}
    >
      {/* guillemet discret */}
      <div className="pointer-events-none absolute left-5 top-4 select-none text-4xl leading-none text-neutral-300/80 dark:text-neutral-600/60">
        “
      </div>

      <blockquote className="mt-6 text-xs xs:text-sm leading-6 text-neutral-800 md:text-[15px] md:leading-7 dark:text-neutral-200">
        {r.text}
      </blockquote>

      <footer className="mt-6 flex items-center gap-3">
        <Image
          src={src}
          alt={r.name}
          width={40}
          height={40}
          className="h-8 w-8 rounded-full object-cover md:h-10 md:w-10"
          unoptimized
        />
        <div className="min-w-0">
          <div className="truncate text-[13px] font-semibold text-neutral-900 md:text-sm dark:text-neutral-50">
            {r.name}
          </div>
          <div className="truncate text-[11px] text-neutral-500 md:text-xs dark:text-neutral-400">
            {r.role}
          </div>
        </div>
      </footer>
    </article>
  );
}

/* -------------------------------- Data --------------------------------- */
const reviewsFR: ReviewType[] = [
  {
    name: 'L’Ora Fashion Paris',
    role: 'Optimisation Instagram - Google Shopping',
    text: 'Grâce à Ikovaline, nous avons considérablement augmenté notre visibilité en ligne. Leur expertise sur Instagram et Google Shopping a dynamisé nos ventes.',
    image: Review5,
  },
  {
    name: 'L’Émotion',
    role: 'Gestion Google My Business - Consulting',
    text: 'Ils ont transformé notre image en ligne et apporté des conseils stratégiques pour développer notre activité. Une équipe très réactive !',
    image: 'https://avatar.vercel.sh/cobalt',
  },
  {
    name: 'Lelandais Fermetures',
    role: 'Gestion Google My Business - Leads locaux',
    text: 'Depuis qu’Ikovaline gère notre Google My Business, nous recevons beaucoup plus de demandes locales pertinentes. Excellent service !',
    image: Review3,
  },
  {
    name: 'Frewinglas',
    role: 'Création site web - SEO - LinkedIn',
    text: 'Le site qu’ils ont créé est moderne et bien référencé. Nos profils LinkedIn sont désormais des outils de prospection efficaces.',
    image: Review1,
  },
  {
    name: 'Need Money For Shop',
    role: 'Création site web - Publicité - Développement commercial',
    text: 'Ikovaline a su adapter ses services à nos besoins précis. Leur approche marketing a boosté nos campagnes publicitaires.',
    image: 'https://avatar.vercel.sh/sky',
  },
  {
    name: 'L’Art du Bonsaï',
    role: 'Création site web - Contenu visuel - Publicité',
    text: 'Leur travail créatif et stratégique a fait passer notre entreprise à un autre niveau. Nos clients adorent notre nouveau site et visuel !',
    image: 'https://avatar.vercel.sh/forest',
  },
  {
    name: 'HL CORNER',
    role: 'Création site web - Visibilité locale',
    text: 'Un grand merci à Ikovaline pour notre site fonctionnel et attrayant. Nous sommes désormais plus visibles localement.',
    image: Review4,
  },
  {
    name: 'Jardin Auto',
    role: 'Création site web - Publicité saisonnière',
    text: 'Leur travail nous a permis de générer plus de ventes en période de forte demande. Ils gèrent tout avec professionnalisme.',
    image: 'https://avatar.vercel.sh/sunset',
  },
  {
    name: 'Jean-Christophe Lelandais',
    role: 'Accompagnement marketing - Recrutement',
    text: 'Ikovaline a été un partenaire clé pour structurer nos besoins en marketing et en recrutement. Une équipe compétente et proactive.',
    image: Review2,
  },
  {
    name: 'Simon Corbin',
    role: 'Stratégies marketing et commerciales sur mesure',
    text: 'L’approche personnalisée a eu un impact direct sur nos ventes. Ikovaline est un vrai atout pour mon entreprise.',
    image: 'https://avatar.vercel.sh/coral',
  },

  // --- Nouveaux avis “sobres” ---
  {
    name: 'Manu Arora',
    role: 'Tech Innovator & Entrepreneur',
    text: 'Fantastique. Cela a complètement changé notre façon d’aborder les problèmes et de livrer des solutions.',
  },
  {
    name: 'Bob Smith',
    role: 'Industry Analyst',
    text: 'Absolument révolutionnaire, un vrai game-changer pour notre secteur.',
  },
  {
    name: 'Eva Green',
    role: 'Directrice des opérations',
    text: 'L’efficacité apportée est incomparable. On a réduit nos coûts et amélioré la qualité de notre produit final.',
  },
  {
    name: 'Henry Ford',
    role: 'Operations Analyst',
    text: 'Nous avons gagné d’innombrables heures. Recommandé à tous ceux qui veulent booster l’efficacité.',
  },
  {
    name: 'Cathy Lee',
    role: 'Product Manager',
    text: 'Je ne peux plus imaginer revenir en arrière. C’est devenu indispensable au quotidien.',
  },
];

/* ------------------------------- Component ------------------------------- */
export default function Review() {
  const isMobile = useIsMobile(768);

  // Mobile: 5 items par défaut, desktop: tout
  const INITIAL_MOBILE = 6;
  const [visible, setVisible] = useState(INITIAL_MOBILE);

  useEffect(() => {
    if (!isMobile) setVisible(reviewsFR.length);
    else setVisible((v) => Math.min(v, INITIAL_MOBILE));
  }, [isMobile]);

  const shown = useMemo(
    () => reviewsFR.slice(0, visible),
    [visible]
  );

  const canShowMore = isMobile && visible < reviewsFR.length;

  return (
    <section className="relative mx-auto w-full max-w-7xl px-4  py-16 md:py-24">
      {/* Header */}
      <header className="mx-auto max-w-3xl text-center">
        <span className="inline-flex items-center rounded-full border border-[hsl(var(--primary)/0.25)] px-3 py-1 text-xs font-medium text-[hsl(var(--primary))]">
          Avis clients
        </span>

        <h2 className="mt-4 text-4xl font-extrabold leading-tight tracking-tight text-neutral-900 md:text-6xl dark:text-neutral-100">
          De l’idée à un projet réussi.
        </h2>

        <p className="mx-auto mt-4 max-w-2xl text-[15.5px] leading-7 text-neutral-700 md:text-[17px] dark:text-neutral-300">
          De la stratégie au développement, Ikovaline conçoit des solutions
          digitales sur mesure pour accélérer votre croissance.
        </p>

        <div className="mt-6">
          <a
            href="/contact"
            className="inline-flex items-center justify-center rounded-full bg-[hsl(var(--primary))] px-5 py-3 text-sm font-semibold text-white shadow-[0_12px_26px_-12px_rgba(44,183,255,.70)] transition hover:brightness-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--primary))]/50 active:brightness-90"
          >
            Nous contacter
          </a>
        </div>
      </header>

      {/* Masonry responsive
          - Mobile: 2 colonnes (compact), 5 items + bouton "Voir plus"
          - ≥ md: 3→4 colonnes, tout afficher
      */}
     <div className='z-50 relative py-10'>
       <StarClientsGoogle/>
      <div
        className={[
          'mt-4 z-50 columns-2 gap-4',            // 2 colonnes même sur mobile
          'sm:gap-6 relative',
          'md:columns-3 lg:columns-4',         // plus de colonnes au-dessus
        ].join(' ')}
      >
        {shown.map((r, i) => (
          <Card key={`${r.name}-${i}`} r={r} />
        ))}
        <div className='absolute -bottom-10 left-0 h-32 w-full bg-gradient-to-t from-white z-10 from-50% dark:from-black to-transparent'/>
      </div>
     </div>

      {/* CTA "Voir plus / Voir moins" (mobile only) */}
      {isMobile && (
        <div className="mt-6 flex justify-center">
          {canShowMore ? (
            <button
              type="button"
              onClick={() => setVisible((v) => Math.min(v + 6, reviewsFR.length))}
              className="rounded-full border border-neutral-100 bg-white px-4 py-2 text-sm font-medium text-neutral-800 shadow-sm transition   dark:border-neutral-900 dark:bg-neutral-900 dark:text-neutral-100"
            >
              Voir plus
            </button>
          ) : reviewsFR.length > INITIAL_MOBILE ? (
            <button
              type="button"
              onClick={() => setVisible(INITIAL_MOBILE)}
              className="rounded-full border border-neutral-100 bg-white px-4 py-2 text-sm font-medium text-neutral-800 shadow-sm transition   dark:border-neutral-900 dark:bg-neutral-900 dark:text-neutral-100 "
            >
              Voir moins
            </button>
          ) : null}
        </div>
      )}
    </section>
  );
}
