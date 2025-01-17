import { cn } from "@/lib/utils";
import Marquee from "@/components/ui/marquee";
import Review1 from "@/public/images/logo/frewinglas-logo.png";
import Review2 from "@/public/images/logo/jean-cristophe-Lelandais.jpeg";
import Review3 from "@/public/images/logo/logo-lelandais.png";
import Review4 from "@/public/images/logo/hl-horner-logo.jpg";
import Review5 from "@/public/images/logo/logo-lora.png";
import Image, { StaticImageData } from "next/image";

const reviews = [
  {
    name: "L’Ora Fashion Paris",
    username: "Optimisation Instagram - Google Shopping",
    body: "Grâce à Ikovaline, nous avons considérablement augmenté notre visibilité en ligne. Leur expertise sur Instagram et Google Shopping a dynamisé nos ventes.",
    img: Review5,
  },
  {
    name: "L’Émotion",
    username: "Gestion Google My Business - Consulting",
    body: "Ils ont transformé notre image en ligne et apporté des conseils stratégiques pour développer notre activité. Une équipe très réactive !",
    img: "https://avatar.vercel.sh/rauchg",
  },
  {
    name: "Lelandais Fermetures",
    username: "Gestion Google My Business - Leads locaux",
    body: "Depuis qu’Ikovaline gère notre Google My Business, nous recevons beaucoup plus de demandes locales pertinentes. Excellent service !",
    img: Review3,
  },
  {
    name: "Frewinglas",
    username: "Création site web - SEO - LinkedIn",
    body: "Le site qu’ils ont créé est moderne et bien référencé. Nos profils LinkedIn sont désormais des outils de prospection efficaces.",
    img: Review1,
  },
  {
    name: "Need Money For Shop",
    username: "Création site web - Publicité - Développement commercial",
    body: "Ikovaline a su adapter ses services à nos besoins précis. Leur approche marketing a boosté nos campagnes publicitaires.",
    img: "https://avatar.vercel.sh/rauchg",
  },
  {
    name: "L’Art du Bonsaï",
    username: "Création site web - Contenu visuel - Publicité",
    body: "Leur travail créatif et stratégique a fait passer notre entreprise à un autre niveau. Nos clients adorent notre nouveau site et visuel !",
    img: "https://avatar.vercel.sh/rauchg",
  },
  {
    name: "HL CORNER",
    username: "Création site web - Visibilité locale",
    body: "Un grand merci à Ikovaline pour notre site fonctionnel et attrayant. Nous sommes désormais plus visibles localement.",
    img: Review4,
  },
  {
    name: "Jardin Auto",
    username: "Création site web - Publicité saisonnière",
    body: "Leur travail nous a permis de générer plus de ventes en période de forte demande. Ils gèrent tout avec professionnalisme.",
    img: "https://avatar.vercel.sh/rauchg",
  },
  {
    name: "Jean-Christophe Lelandais",
    username: "Accompagnement marketing - Recrutement",
    body: "Ikovaline a été un partenaire clé pour structurer nos besoins en marketing et en recrutement. Une équipe compétente et proactive.",
    img: Review2,
  },
  {
    name: "Simon Corbin",
    username: "Stratégies marketing et commerciales sur mesure",
    body: "Leur approche personnalisée a eu un impact direct sur nos ventes. Ikovaline est un vrai atout pour mon entreprise.",
    img: "https://avatar.vercel.sh/rauchg",
  },
];

const firstRow = reviews.slice(0, reviews.length / 2);
const secondRow = reviews.slice(reviews.length / 2);

const ReviewCard = ({
  img,
  name,
  username,
  body,
}: {
  img: string | StaticImageData;
  name: string;
  username: string;
  body: string;
}) => {
  return (
    <figure
      className={cn(
        "relative w-96 cursor-pointer overflow-hidden flex flex-col justify-between bg-gray-50 dark:bg-neutral-800 rounded-xl  p-8"
        // light styles
        // "border-gray-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05]",
        // // dark styles
        // "dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]"
      )}
    >
      <blockquote className="mb-5 dark:text-neutral-300 font-semibold max-sm:text-sm">
        &ldquo;{body}&ldquo;
      </blockquote>
      <div className="flex flex-row items-center gap-2">
        <Image
          className="rounded-full"
          width="40"
          height="40"
          alt="logo entreprise"
          src={img}
        />
        <div className="flex flex-col">
          <figcaption className="text-sm font-medium text-gray-600 dark:text-neutral-300">
            {name}
          </figcaption>
          <p className="text-xs font-medium text-foreground">{username}</p>
        </div>
      </div>
    </figure>
  );
};

export function Review() {
  return (
    <div className="py-20 space-y-10" id="review">
      <h2 className="sm:text-4xl text-3xl max-sm:px-5 text-center font-semibold bg-gradient-to-t from-neutral-400 to-neutral-700 bg-clip-text text-transparent">
        Ce que nos clients disent sur nous !
      </h2>
      <div className="relative flex sm:h-[500px] h-[400px]  w-full flex-col items-center justify-center overflow-hidden rounded-lg  bg-background ">
        <Marquee pauseOnHover className="[--duration:20s] flex-1">
          {firstRow.map((review) => (
            <ReviewCard key={review.username} {...review} />
          ))}
        </Marquee>
        <Marquee reverse pauseOnHover className="[--duration:20s] flex-1">
          {secondRow.map((review) => (
            <ReviewCard key={review.username} {...review} />
          ))}
        </Marquee>
        <div className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-white dark:from-background"></div>
        <div className="pointer-events-none absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-white dark:from-background"></div>
      </div>
    </div>
  );
}
