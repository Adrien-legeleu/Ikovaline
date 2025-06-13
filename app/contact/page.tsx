import ContactMainPage from "@/components/ContactPage/ContactMainPage";
import Head from "next/head";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact - Ikovaline | Discutons de votre projet digital",
  description:
    "Besoin d'un accompagnement digital sur mesure ? Contactez Ikovaline, votre partenaire en marketing numérique pour entreprises et étudiants.",
  openGraph: {
    title: "Contactez Ikovaline | Conseil et solutions digitales",
    description:
      "Prenez contact avec notre équipe pour booster votre visibilité, améliorer votre stratégie ou rejoindre une aventure étudiante passionnante.",
    url: "https://ikovaline.com/contact",
    type: "website",
  },
};

export default function Page() {
  return (
    <>
      <Head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "ContactPage",
              name: "Page de contact - Ikovaline",
              url: "https://ikovaline.com/contact",
              about: {
                "@type": "Organization",
                name: "Ikovaline",
                url: "https://ikovaline.com",
                logo: "https://ikovaline.com/images/logo/ikovaline_logo.png",
                contactPoint: {
                  "@type": "ContactPoint",
                  telephone: "+33 7 85 90 22 38",
                  contactType: "customer service",
                  areaServed: "FR",
                },
              },
              description:
                "Contactez-nous pour discuter de votre stratégie digitale, obtenir un devis ou en savoir plus sur nos services.",
            }),
          }}
        />

        <link rel="canonical" href="https://ikovaline.com/contact" />
        <meta name="robots" content="index, follow" />
      </Head>
      <ContactMainPage />
    </>
  );
}
