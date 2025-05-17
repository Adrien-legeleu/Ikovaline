import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/header/Header";
import Footer from "@/components/footer/Footer";
import Favicon from "@/app/ikovaline_logo-favicon.png";
import { ThemeProvider } from "@/components/theme.provider";
import { Toaster } from "@/components/ui/toaster";

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
        {/* <SmoothCursor /> */}
      </body>
    </html>
  );
}
