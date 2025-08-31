import type { Metadata } from 'next';
import './globals.css';
import { Header } from '@/components/header/Header';
import Footer from '@/components/footer/Footer';
import Favicon from '@/app/ikovaline_logo-favicon.png';
import { ThemeProvider } from '@/components/theme.provider';
import { Toaster } from '@/components/ui/toaster';
import { Poppins } from 'next/font/google';
import Script from 'next/script';
import { SpeedInsights } from '@vercel/speed-insights/next';
import LazyExtraStyle from '@/app/LazyExtraStyle';
import { Analytics } from '@vercel/analytics/next';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '600', '700', '800'],
  display: 'swap', // ✅ important pour éviter les blocages
});

export const metadata: Metadata = {
  title: 'Ikovaline – Experts en visibilité digitale pour PME et entrepreneurs',
  description:
    'Agence digitale à Bailly‑Romainvilliers : SEO, sites web, publicité en ligne. Ikovaline propulse votre visibilité en Essonne et dans toute la France.',
  keywords: [
    'agence digitale Essonne',
    'agence web Bailly‑Romainvilliers',
    'SEO local Essonne',
    'référencement naturel Essonne',
    'création site web Essonne',
    'publicité en ligne Essonne',
    'marketing digital Essonne',
    'consultant SEO Bailly‑Romainvilliers',
    'Google Ads Essonne',
    'agence web Paris',
  ],
  openGraph: {
    title:
      'Ikovaline – Experts en visibilité digitale pour PME et entrepreneurs',
    description:
      'Start-up étudiante experte en marketing digital, Ikovaline accompagne votre transformation numérique et booste votre visibilité en ligne.',
    url: 'https://ikovaline.com',
    type: 'website',
    images: [
      {
        url: '/images/logo/ikovaline_logo.png',
        width: 1200,
        height: 630,
        alt: 'Ikovaline Logo',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ikovaline - Expert Marketing Digital et Transformation',
    description:
      'Boostez votre visibilité avec Ikovaline, start-up étudiante experte en marketing digital et stratégies de transformation numérique.',
    images: ['/images/logo/ikovaline_logo.png'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={`${poppins.className} dark`}>
      <head>
        {/* <Script
          src="/tarteaucitron/tarteaucitron.js"
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
      removeCredit: true,
      useExternalCss: false, // on surcharge via ton globals.css
      showAlertSmall: false,
      cookieslist: false,
      cookieslistEmbed: false,
      highPrivacy: true,
      DenyAllCta: true,
      AcceptAllCta: true,
      showIcon: false,
      alwaysNeedConsent: false,
      readmoreLink: false,
      mandatory: false,
      debug: false
    });

    tarteaucitron.services.rgpdinfo = {
      key: "rgpdinfo",
      type: "other",
      name: "Cookies strictement nécessaires",
      needConsent: true,
      cookies: [],
      js: function () {
        console.log("Consentement donné pour les cookies essentiels.");
      },
      fallback: function () {
        console.log("Consentement refusé.");
      }
    };

    tarteaucitron.job = tarteaucitron.job || [];
    tarteaucitron.job.push("rgpdinfo");
  `}
        </Script> */}

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
        <link rel="canonical" href="https://ikovaline.com/" />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              name: 'Ikovaline',
              url: 'https://ikovaline.com',
              logo: 'https://ikovaline.com/images/logo/ikovaline_logo.png',
              contactPoint: {
                '@type': 'ContactPoint',
                telephone: '+33 7 85 90 22 38',
                contactType: 'customer service',
                areaServed: 'FR',
              },
              sameAs: [
                'https://linkedin.com/company/ikovaline',
                'https://instagram.com/ikovaline',
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
        <SpeedInsights />
        <Analytics />
        <LazyExtraStyle />
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-NDKCHTFH"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          ></iframe>
        </noscript>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
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
