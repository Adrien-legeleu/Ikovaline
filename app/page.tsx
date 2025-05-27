import Landing from "@/components/LandingPage/landing/Landing";

const Review = dynamic(() => import("@/components/LandingPage/review/Review"), {
  ssr: true,
});
const Services = dynamic(
  () => import("@/components/LandingPage/servicesSection/Services"),
  {
    ssr: true,
  }
);
const Map = dynamic(() => import("@/components/LandingPage/map/Map"), {
  ssr: true,
});
const Blog = dynamic(
  () => import("@/components/LandingPage/Blog/BlogLanding"),
  {
    ssr: true,
  }
);
const About = dynamic(() => import("@/components/LandingPage/about/About"), {
  ssr: true,
});
const Methodologie = dynamic(
  () =>
    import("@/components/LandingPage/impact/Impact").then((mod) => mod.default),
  { ssr: true }
);

const CallToAction = dynamic(
  () =>
    import("@/components/callToAction/CallToAction").then((mod) => mod.default),
  { ssr: true }
);

import type { Metadata } from "next";
import dynamic from "next/dynamic";
import Head from "next/head";

export const metadata: Metadata = {
  title: "Ikovaline – L’agence digitale qui propulse votre business",
  description:
    "Boostez votre visibilité avec Ikovaline : SEO, publicité, création de sites web, stratégie digitale. Une agence qui propulse votre croissance en ligne.",
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
    <>
      <Head>
        {/* Organization */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Ikovaline",
              url: "https://www.ikovaline.com",
              logo: "https://www.ikovaline.com/images/logo/ikovaline_logo.png",
              contactPoint: {
                "@type": "ContactPoint",
                telephone: "+33 7 85 90 22 38",
                contactType: "customer service",
                areaServed: "FR",
              },
              sameAs: [
                "https://www.linkedin.com/company/ikovaline",
                "https://www.instagram.com/ikovaline",
              ],
            }),
          }}
        />

        {/* WebSite */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "Ikovaline",
              url: "https://www.ikovaline.com",
              potentialAction: {
                "@type": "SearchAction",
                target:
                  "https://www.ikovaline.com/search?q={search_term_string}",
                "query-input": "required name=search_term_string",
              },
            }),
          }}
        />
      </Head>

      <div className="max-w-[1400px] mx-auto">
        <Landing />
        <About />
        <section id="services">
          <Services />
        </section>
        <Map />
        <Methodologie />
        <Review />

        <CallToAction
          title="Améliorez votre visibilité en ligne dès aujourd'hui !"
          desc="Avec Ikovaline, boostez votre stratégie digitale : SEO, site web, campagnes publicitaires et plus. Contactez-nous pour transformer vos objectifs en résultats concrets."
          textBtn="Commencez maintenant !"
        />
        <Blog />
      </div>
    </>
  );
}
