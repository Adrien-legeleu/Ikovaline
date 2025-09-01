'use client';

import Review1 from '@/public/images/logo/frewinglas-logo.png';
import Review2 from '@/public/images/logo/jean-cristophe-Lelandais.jpeg';
import Review3 from '@/public/images/logo/logo-lelandais.png';
import Review4 from '@/public/images/logo/hl-horner-logo.jpg';
import Review5 from '@/public/images/logo/logo-lora.png';
import { useReducedMotion } from 'framer-motion';
import { motion } from 'framer-motion';
import Marquee from '@/components/ui/marquee';
import Image, { StaticImageData } from 'next/image';
import { GlassSticky } from '../impact/CardStack';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import React from 'react';

interface ReviewType {
  name: string;
  role: string;
  text: string;
  image: string | StaticImageData;
}

/* ======================= i18n (FR / EN) ======================= */
const TEXTS = {
  fr: {
    badge: 'Avis clients',
    title: 'Ce que nos clients disent de nous',
    desc: "Découvrez les avis et retours d'expérience de nos clients.",
  },
  en: {
    badge: 'Client reviews',
    title: 'What our clients say about us',
    desc: 'Read feedback and testimonials from our clients.',
  },
} as const;

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
    image: 'https://avatar.vercel.sh/cobalt',
  },
  {
    name: 'L’Art du Bonsaï',
    role: 'Création site web - Contenu visuel - Publicité',
    text: 'Leur travail créatif et stratégique a fait passer notre entreprise à un autre niveau. Nos clients adorent notre nouveau site et visuel !',
    image: 'https://avatar.vercel.sh/cobalt',
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
    image: 'https://avatar.vercel.sh/cobalt',
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
    text: 'Leur approche personnalisée a eu un impact direct sur nos ventes. Ikovaline est un vrai atout pour mon entreprise.',
    image: 'https://avatar.vercel.sh/cobalt',
  },
];

const reviewsEN: ReviewType[] = [
  {
    name: 'L’Ora Fashion Paris',
    role: 'Instagram Optimization - Google Shopping',
    text: 'Thanks to Ikovaline, our online visibility increased significantly. Their Instagram and Google Shopping expertise boosted our sales.',
    image: Review5,
  },
  {
    name: 'L’Émotion',
    role: 'Google Business Profile Management - Consulting',
    text: 'They transformed our online image and provided strategic guidance to grow our business. A very responsive team!',
    image: 'https://avatar.vercel.sh/cobalt',
  },
  {
    name: 'Lelandais Fermetures',
    role: 'Google Business Profile Management - Local leads',
    text: 'Since Ikovaline manages our Google Business Profile, we receive far more relevant local inquiries. Excellent service!',
    image: Review3,
  },
  {
    name: 'Frewinglas',
    role: 'Website Creation - SEO - LinkedIn',
    text: 'The website they built is modern and well-ranked. Our LinkedIn profiles are now effective prospecting tools.',
    image: Review1,
  },
  {
    name: 'Need Money For Shop',
    role: 'Website Creation - Ads - Sales Development',
    text: 'Ikovaline tailored their services to our exact needs. Their marketing approach boosted our ad campaigns.',
    image: 'https://avatar.vercel.sh/cobalt',
  },
  {
    name: 'L’Art du Bonsaï',
    role: 'Website Creation - Visual Content - Advertising',
    text: 'Their creative and strategic work took our business to the next level. Clients love our new site and visuals!',
    image: 'https://avatar.vercel.sh/cobalt',
  },
  {
    name: 'HL CORNER',
    role: 'Website Creation - Local visibility',
    text: 'Huge thanks to Ikovaline for a functional, attractive site. We are now more visible locally.',
    image: Review4,
  },
  {
    name: 'Jardin Auto',
    role: 'Website Creation - Seasonal advertising',
    text: 'Their work helped us generate more sales during peak demand. They handle everything professionally.',
    image: 'https://avatar.vercel.sh/cobalt',
  },
  {
    name: 'Jean-Christophe Lelandais',
    role: 'Marketing support - Recruitment',
    text: 'Ikovaline has been key in structuring our marketing and recruitment needs. Skilled and proactive team.',
    image: Review2,
  },
  {
    name: 'Simon Corbin',
    role: 'Tailored marketing & sales strategies',
    text: 'Their personalized approach had a direct impact on our sales. A real asset for my business.',
    image: 'https://avatar.vercel.sh/cobalt',
  },
];

/* ======================= UI ======================= */
// Avatar bleu royal → azur encodé (OK pour Next/Image)
const BLUE_AVATAR = `data:image/svg+xml;utf8,${encodeURIComponent(
  `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'>
    <defs>
      <linearGradient id='g' x1='0' y1='0' x2='1' y2='1'>
        <stop offset='0%' stop-color='#2563EB'/>
        <stop offset='100%' stop-color='#00A8E8'/>
      </linearGradient>
    </defs>
    <circle cx='50' cy='50' r='50' fill='url(#g)'/>
  </svg>`
)}`;

const ReviewCardBase = ({
  image,
  name,
  role,
  text,
}: {
  image?: string | StaticImageData;
  name: string;
  role: string;
  text: string;
}) => {
  // Sélection de la source finale (logos réels prioritaire, sinon dégradé bleu)
  const src =
    typeof image === 'string'
      ? image.startsWith('https://avatar.vercel.sh')
        ? BLUE_AVATAR
        : image
      : image?.src || BLUE_AVATAR;

  return (
    <GlassSticky className="shadow-none will-change-transform">
      <div className="mb-4 text-base">{text}</div>
      <div className="mt-5 flex items-center gap-2">
        <Image
          width={40}
          height={40}
          src={src}
          alt={name}
          className="h-10 w-10 rounded-full object-cover"
          unoptimized
          loading="lazy"
          decoding="async"
        />
        <div className="ml-2 flex flex-col">
          <div className="font-medium leading-5 tracking-tight">{name}</div>
          <div className="text-xs leading-5 tracking-tight opacity-60">
            {role}
          </div>
        </div>
      </div>
    </GlassSticky>
  );
};
const ReviewCard = React.memo(ReviewCardBase);

function useIsEN() {
  const pathname = usePathname() || '/';
  return /^\/en(\/|$)/.test(pathname);
}

const MarqueeDemoVertical = ({ data }: { data: ReviewType[] }) => {
  const firstColumn = data.slice(0, 3);
  const firstColumnResponsive = data.slice(0, 5);
  const secondColumn = data.slice(3, 6);
  const secondColumnResonsive = data.slice(5, 10);
  const thirdColumn = data.slice(6, 10);

  return (
    <div
      className="relative flex h-[700px] w-full flex-row items-center justify-center overflow-hidden 2xl:h-[600px]"
      style={{ transform: 'translateZ(0)' }}
    >
      <Marquee pauseOnHover vertical className="[--duration:20s] max-lg:hidden">
        {firstColumn.map((review) => (
          <ReviewCard key={review.name} {...review} />
        ))}
      </Marquee>
      <Marquee
        reverse
        pauseOnHover
        vertical
        className="[--duration:20s] max-lg:hidden "
      >
        {secondColumn.map((review) => (
          <ReviewCard key={review.name} {...review} />
        ))}
      </Marquee>
      <Marquee pauseOnHover vertical className="[--duration:20s] max-lg:hidden">
        {thirdColumn.map((review) => (
          <ReviewCard key={review.name} {...review} />
        ))}
      </Marquee>

      {/* md only */}
      <Marquee
        pauseOnHover
        vertical
        className="[--duration:20s] lg:hidden max-sm:hidden"
      >
        {firstColumnResponsive.map((review) => (
          <ReviewCard key={review.name} {...review} />
        ))}
      </Marquee>
      <Marquee
        pauseOnHover
        vertical
        reverse
        className="[--duration:20s] lg:hidden max-sm:hidden"
      >
        {secondColumnResonsive.map((review) => (
          <ReviewCard key={review.name} {...review} />
        ))}
      </Marquee>

      {/* sm only */}
      <Marquee pauseOnHover vertical className="[--duration:20s] sm:hidden">
        {data.map((review) => (
          <ReviewCard key={review.name} {...review} />
        ))}
      </Marquee>

      <div className="pointer-events-none absolute inset-x-0 top-0 h-1/4 bg-gradient-to-b from-background/80 to-transparent sm:from-background"></div>
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-background/80 to-transparent sm:from-background"></div>
    </div>
  );
};

const Review = () => {
  const isEN = useIsEN();
  const reduce = useReducedMotion();
  const t = isEN ? TEXTS.en : TEXTS.fr;
  const data = isEN ? reviewsEN : reviewsFR;

  if (reduce) {
    return (
      <section className="relative my-20 bg-background pt-32">
        <div className="container relative z-10 mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true }}
            className="z-10 mx-auto flex max-w-[540px] flex-col items-center justify-center px-5"
          >
            <motion.div
              className="group relative mx-auto flex items-center justify-center rounded-full px-5 py-2
             shadow-[inset_0_-10px_14px_#8fdfff26,inset_0_2px_6px_#ffffff55,0_6px_20px_rgba(37,99,235,.25)]
             transition-shadow duration-500 ease-out
             hover:shadow-[inset_0_-6px_12px_#8fdfff45,inset_0_2px_6px_#ffffff66,0_10px_28px_rgba(37,99,235,.35)]
             bg-white/70  dark:bg-transparent"
              initial={{ y: -40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
            >
              {/* glow animé (bordure dégradée) */}
              <span
                className={cn(
                  'absolute inset-0 block h-full w-full animate-gradient rounded-[inherit] p-[1px]',
                  'bg-gradient-to-r from-[#5faaff]/60 via-[#42b8fd]/60 to-[#00e0ff]/60 bg-[length:300%_100%]'
                )}
                style={{
                  WebkitMask:
                    'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                  WebkitMaskComposite: 'destination-out',
                  mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                  maskComposite: 'subtract',
                  WebkitClipPath: 'padding-box',
                }}
              />

              <span className="relative z-10 text-sm font-semibold tracking-wide text-sky-700 dark:text-transparent dark:bg-gradient-to-r dark:from-sky-200 dark:via-sky-100 dark:to-blue-200 dark:bg-clip-text">
                {t.badge}
              </span>
            </motion.div>

            <h2 className="z-10 mt-5 text-center text-4xl font-bold tracking-tighter text-neutral-900 dark:text-neutral-200 xl:text-5xl">
              {t.title}
            </h2>
            <p className="mt-5 text-center opacity-75">{t.desc}</p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
            {data.slice(0, 6).map((r) => (
              <ReviewCard key={r.name} {...r} />
            ))}
          </div>
        </div>

        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1 }}
          className="absolute left-1/2 top-32 h-36 w-36 -translate-x-1/2 bg-secondary blur-[110px] md:h-48 md:w-48 md:blur-[150px] z-0"
        />
      </section>
    );
  }
  return (
    <section className="relative my-20 bg-background pt-32">
      <div className="container relative z-10 mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          className="z-10 mx-auto flex max-w-[540px] flex-col items-center justify-center px-5"
        >
          <motion.div
            className="group relative mx-auto flex items-center justify-center rounded-full px-5 py-2
             shadow-[inset_0_-10px_14px_#8fdfff26,inset_0_2px_6px_#ffffff55,0_6px_20px_rgba(37,99,235,.25)]
             transition-shadow duration-500 ease-out
             hover:shadow-[inset_0_-6px_12px_#8fdfff45,inset_0_2px_6px_#ffffff66,0_10px_28px_rgba(37,99,235,.35)]
             bg-white/70  dark:bg-transparent"
            initial={{ y: -40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            {/* glow animé (bordure dégradée) */}
            <span
              className={cn(
                'absolute inset-0 block h-full w-full animate-gradient rounded-[inherit] p-[1px]',
                'bg-gradient-to-r from-[#5faaff]/60 via-[#42b8fd]/60 to-[#00e0ff]/60 bg-[length:300%_100%]'
              )}
              style={{
                WebkitMask:
                  'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                WebkitMaskComposite: 'destination-out',
                mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                maskComposite: 'subtract',
                WebkitClipPath: 'padding-box',
              }}
            />

            <span className="relative z-10 text-sm font-semibold tracking-wide text-sky-700 dark:text-transparent dark:bg-gradient-to-r dark:from-sky-200 dark:via-sky-100 dark:to-blue-200 dark:bg-clip-text">
              {t.badge}
            </span>
          </motion.div>

          <h2 className="z-10 mt-5 text-center text-4xl font-bold tracking-tighter text-neutral-900 dark:text-neutral-200 xl:text-5xl">
            {t.title}
          </h2>
          <p className="mt-5 text-center opacity-75">{t.desc}</p>
        </motion.div>

        <div className="z-10 mt-10 flex max-h-[740px] justify-center gap-6 overflow-hidden [mask-image:linear-gradient(to_bottom,transparent,black_25%,black_75%,transparent)]">
          <MarqueeDemoVertical data={data} />
        </div>
      </div>
    </section>
  );
};

export default Review;
