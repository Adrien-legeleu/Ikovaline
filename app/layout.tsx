// app/layout.tsx
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
import { ScrollManager } from '@/components/ScrollManager';
import { Suspense } from 'react';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '600', '700', '800'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Ikovaline – Experts en visibilité digitale pour PME et entrepreneurs',
  description:
    'Agence digitale à Bailly-Romainvilliers : SEO, sites web, publicité en ligne. Ikovaline propulse votre visibilité en Essonne et dans toute la France.',
  keywords: [
    'agence digitale Essonne',
    'agence web Bailly-Romainvilliers',
    'SEO local Essonne',
    'référencement naturel Essonne',
    'création site web Essonne',
    'publicité en ligne Essonne',
    'marketing digital Essonne',
    'consultant SEO Bailly-Romainvilliers',
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
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr" className={poppins.className}>
      <head>
        {/* Préconnect pour accélérer LCP / DNS */}
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="preconnect" href="https://www.google-analytics.com" />
        <link rel="preconnect" href="https://analytics.ahrefs.com" />
        <link rel="preconnect" href="https://cdn.vercel-insights.com" />

        {/* Icône */}
        <link rel="icon" href={Favicon.src} type="image/png" />

        {/* JSON-LD (non bloquant) */}
        <Script
          id="org-schema"
          type="application/ld+json"
          strategy="afterInteractive"
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

        {/* GTM (non bloquant) */}
        <Script id="gtm-main" strategy="afterInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;
            j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;
            f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','GTM-NDKCHTFH');`}
        </Script>

        {/* Ahrefs analytics (async, non bloquant) */}
        <Script
          id="ahrefs-analytics"
          src="https://analytics.ahrefs.com/analytics.js"
          strategy="afterInteractive"
          async
          data-key="4SH1YnVFNKyaaU3AE50yFg"
        />
      </head>

      <body className="antialiased">
        {/* GTM noscript au tout début du body */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-NDKCHTFH"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>

        <Suspense fallback={null}>
          <ScrollManager />
        </Suspense>

        {/* Vercel perf + analytics (non bloquants) */}
        <SpeedInsights />
        <Analytics />

        {/* Styles complémentaires non critiques */}
        <LazyExtraStyle />

        <ThemeProvider
          attribute="class"
          defaultTheme="light"
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
