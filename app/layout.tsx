import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/header/Header";
import Footer from "@/components/footer/Footer";
import Favicon from "@/app/ikovaline_logo-favicon.png";
import { ThemeProvider } from "@/components/theme.provider";
import { Toaster } from "@/components/ui/toaster";
import { Poppins } from "next/font/google";
import Script from "next/script";
import LazyExtraStyle from "@/app/LazyExtraStyle";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "600", "700", "800"],
  display: "swap", // ✅ important pour éviter les blocages
});

export const metadata: Metadata = {
  title: "Ikovaline – Experts en visibilité digitale pour PME et entrepreneurs",
  description:
    "Agence digitale à taille humaine, Ikovaline accompagne les PME et indépendants pour améliorer leur présence en ligne : référencement local, création de site web performant, gestion Google Business Profile et stratégie sur-mesure.",
  keywords: [
    "agence digitale PME",
    "visibilité en ligne",
    "création site internet",
    "SEO local",
    "accompagnement digital",
    "Google Business Profile",
    "stratégie web",
    "Ikovaline",
    "croissance digitale",
    "agence marketing numérique",
  ],
  openGraph: {
    title:
      "Ikovaline – Experts en visibilité digitale pour PME et entrepreneurs",
    description:
      "Start-up étudiante experte en marketing digital, Ikovaline accompagne votre transformation numérique et booste votre visibilité en ligne.",
    url: "https://www.ikovaline.com",
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={poppins.className}>
      <head>
        <Script
          src="/tarteaucitron/tarteaucitron.min.js"
          strategy="beforeInteractive"
        />
        <Script
          src="/tarteaucitron/tarteaucitron.services.js"
          strategy="beforeInteractive"
        />
        <Script id="tarteaucitron-init" strategy="afterInteractive">
          {`
  tarteaucitron.init({
    privacyUrl: "/politique-confidentialite",
    orientation: "bottom",
    highPrivacy: true,
    cookieslist: true,
    showAlertSmall: true,
    removeCredit: true,
    acceptAllCta: true,
    denyAllCta: true,
    mandatory: false,
    debug: true
  });

  tarteaucitron.services.rgpdinfo = {
    key: "rgpdinfo",
    type: "other",
    name: "Cookies strictement nécessaires",
    needConsent: true,
    cookies: [],
    js: function () {},
    fallback: function () {}
  };

  tarteaucitron.job = tarteaucitron.job || [];
  tarteaucitron.job.push("rgpdinfo");
`}
        </Script>

        <meta name="next-size-adjust" content="100" />

        <Script
          id="gtm-head"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
      (function(w,d,s,l,i){w[l]=w[l]||[];
      w[l].push({'gtm.start': new Date().getTime(),event:'gtm.js'});
      var f=d.getElementsByTagName(s)[0],
      j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';
      j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;
      f.parentNode.insertBefore(j,f);
      })(window,document,'script','dataLayer','GTM-NDKCHTFH');
    `,
          }}
        />

        <link rel="icon" href={Favicon.src} type="image/png" />
        <link rel="canonical" href="https://www.ikovaline.com/" />

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
        <script
          src="https://analytics.ahrefs.com/analytics.js"
          data-key="4SH1YnVFNKyaaU3AE50yFg"
          async
        ></script>
      </head>
      <body className={`antialiased`}>
        <LazyExtraStyle />
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-NDKCHTFH"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          ></iframe>
        </noscript>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <header>
            <Header />
          </header>
          <main>{children}</main>
          <Toaster />
          <footer>
            <Footer />
          </footer>
        </ThemeProvider>
      </body>
    </html>
  );
}
