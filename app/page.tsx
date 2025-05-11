import { CallToAction } from "@/components/callToAction/CallToAction";
import About from "@/components/LandingPage/about/About";
import Landing from "@/components/LandingPage/landing/Landing";
import { Review } from "@/components/LandingPage/review/Review";
import Services from "@/components/LandingPage/servicesSection/Services";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ikovaline - L'agence digitale qui propulse votre business !",
  description:
    "Découvrez comment Ikovaline vous aide à booster votre visibilité et votre croissance grâce au SEO, publicité, création de sites web et bien plus.",
  keywords: [
    "marketing digital",
    "SEO",
    "publicité en ligne",
    "transformation numérique",
    "stratégies digitales",
    "Ikovaline",
    "site vitrine",
    "site web",
    "agence web",
    "référencement naturel",
  ],
  openGraph: {
    title: "Ikovaline - L'agence web qui propulse votre business !",
    description:
      "Stratégies digitales personnalisées pour les entreprises ambitieuses. SEO, publicité, contenu, IA : faites passer votre croissance au niveau supérieur.",
    url: "https://ikovaline.com",
    type: "website",
    images: [
      {
        url: "/images/logo/ikovaline_logo.png",
        width: 1200,
        height: 630,
        alt: "Ikovaline Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ikovaline - Expert Marketing Digital et Transformation",
    description:
      "Boostez votre visibilité avec Ikovaline, start-up étudiante experte en marketing digital et stratégies de transformation numérique.",
    images: ["/images/logo/ikovaline_logo.png"],
  },
};

export default function Home() {
  return (
    <div className="max-w-[1400px] mx-auto">
      <Landing />
      <About />
      <section id="services">
        <Services />
      </section>
      <CallToAction
        title="Améliorez votre visibilité en ligne dès aujourd'hui !"
        desc="Avec Ikovaline, boostez votre stratégie digitale : SEO, site web, campagnes publicitaires et plus. Contactez-nous pour transformer vos objectifs en résultats concrets."
        textBtn="Commencez maintenant !"
      />

      <Review />
    </div>
  );
}
