import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Politique de confidentialité - Ikovaline",
  description:
    "Découvrez la politique de confidentialité d’Ikovaline : gestion des données personnelles, sécurité, conservation et droits des utilisateurs.",
  openGraph: {
    title: "Politique de confidentialité - Ikovaline",
    description:
      "Toutes les informations sur la façon dont Ikovaline collecte, utilise, protège et conserve vos données personnelles.",
    url: "https://ikovaline.com/politique-confidentialite",
    type: "article",
  },
  twitter: {
    card: "summary",
    title: "Politique de confidentialité - Ikovaline",
    description:
      "Politique de confidentialité d’Ikovaline : traitement des données personnelles, finalités, conservation et droits RGPD.",
  },
};

export default function PrivacyPolicy() {
  return (
    <div className="max-w-4xl mx-auto p-6 bg-white dark:bg-neutral-800 max-lg:mx-2 shadow-md rounded-2xl md:mt-28">
      <h1 className="text-3xl font-bold text-neutral-800 dark:text-neutral-200 mb-4">
        Politique de confidentialité
      </h1>

      <section className="mb-6">
        <h2 className="text-xl font-semibold text-neutral-700 dark:text-neutral-300 mb-2">
          Collecte des données personnelles
        </h2>
        <p className="text-neutral-600 dark:text-neutral-400">
          Nous collectons uniquement les données personnelles strictement
          nécessaires au bon fonctionnement de nos services. Cela peut inclure
          votre nom, adresse e-mail, téléphone, et données de navigation.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold text-neutral-700 dark:text-neutral-300 mb-2">
          Utilisation des données
        </h2>
        <p className="text-neutral-600 dark:text-neutral-400">
          Les données sont utilisées dans le but de vous fournir nos services,
          d’améliorer votre expérience utilisateur, et de vous contacter en cas
          de besoin. Aucune donnée n’est transmise à des tiers sans votre
          consentement.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold text-neutral-700 dark:text-neutral-300 mb-2">
          Conservation des données
        </h2>
        <p className="text-neutral-600 dark:text-neutral-400">
          Les données sont conservées pendant une durée maximale de 3 ans après
          la fin de la relation contractuelle ou le dernier contact émanant de
          votre part.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold text-neutral-700 dark:text-neutral-300 mb-2">
          Sécurité
        </h2>
        <p className="text-neutral-600 dark:text-neutral-400">
          Nous mettons en place toutes les mesures techniques et
          organisationnelles nécessaires pour protéger vos données contre toute
          perte, altération ou accès non autorisé.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold text-neutral-700 dark:text-neutral-300 mb-2">
          Vos droits
        </h2>
        <p className="text-neutral-600 dark:text-neutral-400">
          Conformément au RGPD, vous disposez d’un droit d’accès, de
          rectification, de suppression et d’opposition au traitement de vos
          données. Pour exercer ces droits, contactez-nous à :{" "}
          <a
            href="mailto:contact@ikovaline.com"
            className="text-blue-600 dark:text-blue-400 hover:underline"
          >
            contact@ikovaline.com
          </a>
          .
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-neutral-700 dark:text-neutral-300 mb-2">
          Cookies
        </h2>
        <p className="text-neutral-600 dark:text-neutral-400">
          Pour en savoir plus sur notre politique de cookies, vous pouvez
          consulter notre module de gestion des cookies en bas de page ou
          visiter la section dédiée dans les{" "}
          <a
            href="/mentions-legales"
            className="text-blue-600 dark:text-blue-400 hover:underline"
          >
            mentions légales
          </a>
          .
        </p>
      </section>
    </div>
  );
}
