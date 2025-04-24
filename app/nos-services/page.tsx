import { CallToAction } from "@/components/callToAction/CallToAction";
import FAQ from "@/components/ServicesPage/FAQ/FAQ";
import Landing from "@/components/ServicesPage/landing/Landing";
import { Service1 } from "@/components/ServicesPage/servicesComponents/Service1";
import { Service2 } from "@/components/ServicesPage/servicesComponents/Service2";
import Why from "@/components/ServicesPage/why/Why";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Nos Services - Solutions Digitales sur Mesure | Ikovaline",
  description:
    "Découvrez l'ensemble des services proposés par Ikovaline : SEO, publicité, développement web, IA, réseaux sociaux... Une offre complète pour booster votre visibilité.",
  openGraph: {
    title: "Nos Services - Solutions Digitales sur Mesure | Ikovaline",
    description:
      "Découvrez les expertises d'Ikovaline pour accompagner votre transformation digitale : SEO, SEA, création de contenu, sites web, IA et plus encore.",
    url: "https://www.ikovaline.com/nos-services",
    type: "website",
    images: [
      {
        url: "/images/logo/ikovaline_logo.png",
        width: 1200,
        height: 630,
        alt: "Ikovaline Services",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Nos Services - Solutions Digitales sur Mesure | Ikovaline",
    description:
      "Une stratégie sur-mesure avec Ikovaline : visibilité, performance, croissance. Découvrez nos services marketing et digitaux.",
    images: ["/images/logo/ikovaline_logo.png"],
  },
};

export default function Page() {
  return (
    <div>
      <Landing />
      <Service1 />
      <Service2 />
      <Why />
      <CallToAction
        title="Passez à l’action maintenant !"
        desc="Attirez plus de clients, augmentez vos ventes, développez votre notoriété. Avec Ikovaline, c’est possible."
        textBtn="Lancez votre projet"
      />

      <FAQ />
    </div>
  );
}
