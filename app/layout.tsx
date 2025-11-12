// app/layout.tsx  (ROOT LAYOUT OBLIGATOIRE)
import type { Metadata } from 'next';
import './globals.css';

import { ThemeProvider } from '@/components/theme.provider';
import { Toaster } from '@/components/ui/toaster';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Analytics } from '@vercel/analytics/next';
import { ScrollManager } from '@/components/ScrollManager';
import LazyExtraStyle from '@/app/LazyExtraStyle';

import Script from 'next/script';
import { Plus_Jakarta_Sans, Poppins } from 'next/font/google';
import Favicon from '@/app/ikovaline-logo.png';
import { Suspense } from 'react';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '600', '700', '800'],
  display: 'swap',
});
const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Ikovaline – Experts en visibilité digitale pour PME et entrepreneurs',
  description:
    'Agence digitale à Bailly-Romainvilliers : SEO, sites web, publicité en ligne. Ikovaline propulse votre visibilité en Essonne et dans toute la France.',
  openGraph: {
    title:
      'Ikovaline – Experts en visibilité digitale pour PME et entrepreneurs',
    description:
      'Start-up étudiante experte en marketing digital, Ikovaline accompagne votre transformation numérique et booste votre visibilité en ligne.',
    url: 'https://ikovaline.com',
    type: 'website',
    images: [
      {
        url: '/images/logo/ikovaline-logo.png',
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
    images: ['/images/logo/ikovaline-logo.png'],
  },
  icons: [{ rel: 'icon', url: Favicon.src }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className={jakarta.className}>
      <head>
        {/* Cookiebot */}
        <Script
          id="Cookiebot"
          src="https://consent.cookiebot.com/uc.js"
          data-cbid="d43f627c-6949-4c51-9d22-db3eeb6957e1"
          data-blockingmode="auto"
          strategy="beforeInteractive"
        />

        {/* Consent Mode v2 — défaut denied */}
        <Script id="gcm-default" strategy="beforeInteractive">{`
          window.dataLayer = window.dataLayer || [];
          function gtag(){ dataLayer.push(arguments); }
          gtag('consent', 'default', {
            ad_storage: 'denied',
            analytics_storage: 'denied',
            ad_user_data: 'denied',
            ad_personalization: 'denied',
            functionality_storage: 'granted',
            security_storage: 'granted'
          });
          gtag('set', 'ads_data_redaction', true);
          window.addEventListener('CookieConsentDeclaration', function() {
            try {
              var c = window.Cookiebot?.consented || {};
              var analyticsGranted = !!c.statistics;
              var marketingGranted  = !!c.marketing;
              gtag('consent', 'update', {
                analytics_storage: analyticsGranted ? 'granted' : 'denied',
                ad_storage:       marketingGranted  ? 'granted' : 'denied',
                ad_user_data:     marketingGranted  ? 'granted' : 'denied',
                ad_personalization: marketingGranted ? 'granted' : 'denied'
              });
            } catch(e){}
          });
        `}</Script>

        {/* Préconnect */}
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

        {/* GTM */}
        <Script
          id="gtm-main"
          strategy="afterInteractive"
        >{`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;
          j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;
          f.parentNode.insertBefore(j,f);
        })(window,document,'script','dataLayer','GTM-NDKCHTFH');`}</Script>

        {/* Ahrefs (bloqué avant consent) */}
        <Script
          id="ahrefs-analytics"
          src="https://analytics.ahrefs.com/analytics.js"
          strategy="afterInteractive"
          type="text/plain"
          data-cookieconsent="statistics"
          data-key="4SH1YnVFNKyaaU3AE50yFg"
        />
      </head>

      <body className="antialiased">
        {/* GTM noscript */}
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

        <SpeedInsights />
        <Analytics />
        <LazyExtraStyle />

        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          {/* ⚠️ PAS de Header/Footer ici */}
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
