import { Blog } from "@/components/BlogPage/Blog";
import Head from "next/head";
import React from "react";

export default function page() {
  return (
    <>
      <Head>
        <title>Blog | Ikovaline – Conseils en marketing digital</title>
        <meta
          name="description"
          content="Découvrez nos articles sur le SEO, la visibilité locale, la création de site web et les meilleures pratiques marketing pour les PME."
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Blog",
              name: "Le blog d’Ikovaline",
              url: "https://www.ikovaline.com/blog",
              description:
                "Conseils en visibilité digitale, SEO local, création web et marketing pour les PME et indépendants.",
            }),
          }}
        />
      </Head>
      <Blog />
    </>
  );
}
