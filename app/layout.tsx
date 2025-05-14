import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/header/Header";
import Footer from "@/components/footer/Footer";
import Favicon from "@/app/ikovaline_logo-favicon.png";
import { ThemeProvider } from "@/components/theme.provider";
import { Toaster } from "@/components/ui/toaster";

export const metadata: Metadata = {
  title: "Ikovaline - L'agence digitale qui propulse votre business !",
  description:
    "Découvrez comment Ikovaline vous aide à booster votre visibilité et votre croissance grâce au SEO, publicité, création de sites web et bien plus.",
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
