"use client";

import Review1 from "@/public/images/logo/frewinglas-logo.png";
import Review2 from "@/public/images/logo/jean-cristophe-Lelandais.jpeg";
import Review3 from "@/public/images/logo/logo-lelandais.png";
import Review4 from "@/public/images/logo/hl-horner-logo.jpg";
import Review5 from "@/public/images/logo/logo-lora.png";

import { motion } from "framer-motion";
import Marquee from "@/components/ui/marquee";
import Image, { StaticImageData } from "next/image";

interface ReviewType {
  name: string;
  role: string;
  text: string;
  image: string | StaticImageData;
}

const reviews: ReviewType[] = [
  {
    name: "L’Ora Fashion Paris",
    role: "Optimisation Instagram - Google Shopping",
    text: "Grâce à Ikovaline, nous avons considérablement augmenté notre visibilité en ligne. Leur expertise sur Instagram et Google Shopping a dynamisé nos ventes.",
    image: Review5,
  },
  {
    name: "L’Émotion",
    role: "Gestion Google My Business - Consulting",
    text: "Ils ont transformé notre image en ligne et apporté des conseils stratégiques pour développer notre activité. Une équipe très réactive !",
    image: "https://avatar.vercel.sh/rauchg",
  },
  {
    name: "Lelandais Fermetures",
    role: "Gestion Google My Business - Leads locaux",
    text: "Depuis qu’Ikovaline gère notre Google My Business, nous recevons beaucoup plus de demandes locales pertinentes. Excellent service !",
    image: Review3,
  },
  {
    name: "Frewinglas",
    role: "Création site web - SEO - LinkedIn",
    text: "Le site qu’ils ont créé est moderne et bien référencé. Nos profils LinkedIn sont désormais des outils de prospection efficaces.",
    image: Review1,
  },
  {
    name: "Need Money For Shop",
    role: "Création site web - Publicité - Développement commercial",
    text: "Ikovaline a su adapter ses services à nos besoins précis. Leur approche marketing a boosté nos campagnes publicitaires.",
    image: "https://avatar.vercel.sh/rauchg",
  },
  {
    name: "L’Art du Bonsaï",
    role: "Création site web - Contenu visuel - Publicité",
    text: "Leur travail créatif et stratégique a fait passer notre entreprise à un autre niveau. Nos clients adorent notre nouveau site et visuel !",
    image: "https://avatar.vercel.sh/rauchg",
  },
  {
    name: "HL CORNER",
    role: "Création site web - Visibilité locale",
    text: "Un grand merci à Ikovaline pour notre site fonctionnel et attrayant. Nous sommes désormais plus visibles localement.",
    image: Review4,
  },
  {
    name: "Jardin Auto",
    role: "Création site web - Publicité saisonnière",
    text: "Leur travail nous a permis de générer plus de ventes en période de forte demande. Ils gèrent tout avec professionnalisme.",
    image: "https://avatar.vercel.sh/rauchg",
  },
  {
    name: "Jean-Christophe Lelandais",
    role: "Accompagnement marketing - Recrutement",
    text: "Ikovaline a été un partenaire clé pour structurer nos besoins en marketing et en recrutement. Une équipe compétente et proactive.",
    image: Review2,
  },
  {
    name: "Simon Corbin",
    role: "Stratégies marketing et commerciales sur mesure",
    text: "Leur approche personnalisée a eu un impact direct sur nos ventes. Ikovaline est un vrai atout pour mon entreprise.",
    image: "https://avatar.vercel.sh/rauchg",
  },
];

const firstColumn = reviews.slice(0, 3);
const firstColumnResponsive = reviews.slice(0, 5);
const secondColumn = reviews.slice(3, 6);
const secondColumnResonsive = reviews.slice(5, 10);
const thirdColumn = reviews.slice(6, 10);

const ReviewCard = ({
  image,
  name,
  role,
  text,
}: {
  image: string | StaticImageData;
  name: string;
  role: string;
  text: string;
}) => (
  <div className="p-10 rounded-3xl border shadow-lg shadow-primary/10 max-w-md w-full bg-white dark:bg-neutral-900">
    <div className="mb-4 text-base">{text}</div>
    <div className="flex items-center gap-2 mt-5">
      {typeof image === "string" ? (
        <Image
          width={40}
          height={40}
          src={image}
          alt={name}
          className="h-10 w-10 rounded-full object-cover"
        />
      ) : (
        <Image
          width={40}
          height={40}
          src={image.src}
          alt={name}
          className="h-10 w-10 rounded-full object-cover"
        />
      )}
      <div className="flex flex-col ml-2">
        <div className="font-medium tracking-tight leading-5">{name}</div>
        <div className="leading-5 opacity-60 tracking-tight text-xs">
          {role}
        </div>
      </div>
    </div>
  </div>
);

const MarqueeDemoVertical = () => (
  <div className="relative flex h-[700px] sm:h-[500px] 2xl:h-[600px] w-full flex-row items-center justify-center overflow-hidden">
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
    <Marquee pauseOnHover vertical className="[--duration:20s] sm:hidden">
      {reviews.map((review) => (
        <ReviewCard key={review.name} {...review} />
      ))}
    </Marquee>
    <div className="pointer-events-none absolute inset-x-0 top-0 h-1/4 bg-gradient-to-b from-background"></div>
    <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-background"></div>
  </div>
);

const Review = () => {
  return (
    <section className="bg-background my-20 relative max-sm:overflow-hidden pt-32">
      <div className="container z-10 relative mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          className="flex flex-col z-10 px-5 items-center justify-center max-w-[540px] mx-auto"
        >
          <div className="flex justify-center">
            <div className="border py-1 px-4 rounded-3xl">Avis clients</div>
          </div>
          <h2 className=" text-center text-4xl xl:text-5xl font-bold text-neutral-900 dark:text-neutral-200 z-10 tracking-tighter mt-5">
            Ce que nos clients disent de nous
          </h2>
          <p className="text-center mt-5 opacity-75">
            Découvrez les avis et retours d&apos;expérience de nos clients.
          </p>
        </motion.div>
        <div className="flex justify-center z-10 gap-6 mt-10 [mask-image:linear-gradient(to_bottom,transparent,black_25%,black_75%,transparent)] max-h-[740px] overflow-hidden">
          <MarqueeDemoVertical />
        </div>
      </div>
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1 }}
        className="absolute top-32 left-1/2 md:h-48 h-36 w-36 md:w-48 bg-secondary z-0 blur-[110px] md:blur-[150px]  -translate-x-1/2"
      />
    </section>
  );
};

export default Review;
