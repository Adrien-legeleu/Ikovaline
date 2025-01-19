import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/header/Header";
import Footer from "@/components/footer/Footer";
import Favicon from "@/app/ikovaline_logo-favicon.png";
import { ThemeProvider } from "@/components/theme.provider";
import { Toaster } from "@/components/ui/toaster";

export const metadata: Metadata = {
  title:
    "Ikovaline - Votre Partenaire en Marketing Digital et Transformation Numérique",
  description:
    "Ikovaline, la start-up étudiante spécialisée en marketing digital, vous accompagne dans votre transformation numérique : SEO, gestion Google My Business, publicité en ligne et plus encore. Boostez votre visibilité et votre croissance avec des solutions personnalisées.",
  keywords: [
    "marketing digital",
    "transformation numérique",
    "SEO",
    "publicité en ligne",
    "gestion Google My Business",
    "création de contenu",
    "Ikovaline",
    "site web",
  ],
  openGraph: {
    title: "Ikovaline - Votre Partenaire en Marketing Digital",
    description:
      "Spécialistes du marketing digital et de la transformation numérique, nous aidons les entreprises à améliorer leur visibilité en ligne.",
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
    title: "Ikovaline - Votre Partenaire en Marketing Digital",
    description:
      "Boostez votre visibilité en ligne et votre croissance avec Ikovaline, spécialiste du marketing digital.",
    images: ["/images/logo/ikovaline_logo.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <head>
        <link rel="icon" href={Favicon.src} type="image/png" />
        <link rel="canonical" href="https://www.ikovaline.com/" />
      </head>
      <body className={`antialiased`}>
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
