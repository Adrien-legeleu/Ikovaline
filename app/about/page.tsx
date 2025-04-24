import React from "react";
import type { Metadata } from "next";
import { CallToAction } from "@/components/callToAction/CallToAction";
import AboutContent from "@/components/AboutPage/AboutContent";

export const metadata: Metadata = {
  title: "À propos d'Ikovaline - Notre Histoire et Équipe",
  description:
    "Découvrez l'histoire, les valeurs et l'équipe passionnée qui se cache derrière Ikovaline, la start-up étudiante experte en marketing digital.",
  openGraph: {
    title: "À propos d'Ikovaline - Notre Histoire et Équipe",
    description:
      "Plongez dans les coulisses d'Ikovaline : notre parcours, notre vision et les personnes qui façonnent l'accompagnement digital de demain.",
    url: "https://www.ikovaline.com/about",
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
    title: "À propos d'Ikovaline - Notre Histoire et Équipe",
    description:
      "Découvrez qui se cache derrière Ikovaline et comment notre équipe vous accompagne dans votre transformation digitale.",
    images: ["/images/logo/ikovaline_logo.png"],
  },
};

export default function Page() {
  return (
    <div className="max-w-[1400px] mx-auto">
      <AboutContent />
      <CallToAction
        title="Faites passer votre activité au niveau supérieur avec Ikovaline"
        desc="Bénéficiez de notre expertise en marketing digital, SEO, publicité et stratégie sur-mesure pour booster votre visibilité et atteindre vos objectifs business."
        textBtn="Contactez-nous dès maintenant !"
      />
    </div>
  );
}
