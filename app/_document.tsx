// app/_document.tsx
import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="fr">
      <Head>
        {/* ✅ Correction W3C : ajout d'un content pour éviter l'erreur */}
        <meta name="next-size-adjust" content="100" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
