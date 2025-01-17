export default function LegalMentions() {
  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-2xl md:mt-28">
      <h1 className="text-3xl font-bold text-gray-800 mb-4">
        Mentions Légales
      </h1>

      <section className="mb-6">
        <h2 className="text-xl font-semibold text-gray-700 mb-2">
          Éditeur du site
        </h2>
        <p className="text-gray-600">
          Le site <span className="font-medium">Ikovaline</span> est édité par :
          <br />
          <strong>Ikovaline</strong>
          <br />
          Adresse :19 RUE DE LA CHEVRILLE, 77700 BAILLY-ROMAINVILLIERS
          <br />
          Email :{" "}
          <a
            href="mailto:contact@ikovaline.com"
            className="text-blue-600 hover:underline"
          >
            contact@ikovaline.com
          </a>
          <br />
          Téléphone :{" "}
          <a href="tel:+33785902238" className="text-blue-600 hover:underline">
            07 85 90 22 38
          </a>
          <br />
          Numéro SIRET :938 062 239 00018
          <br />
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold text-gray-700 mb-2">
          Hébergement
        </h2>
        <p className="text-gray-600">
          Le site est hébergé par :<br />
          <strong>Hostinger</strong>
          <br />
          Adresse : Hostinger International Ltd., 61 Lordou Vironos Street, 6023
          Larnaca, Chypre
          <br />
          Téléphone :{" "}
          <a href="tel:+35724030194" className="text-blue-600 hover:underline">
            +357 24 03 0194
          </a>
          <br />
          Site web :{" "}
          <a
            href="https://www.hostinger.com"
            className="text-blue-600 hover:underline"
          >
            https://www.hostinger.com
          </a>
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold text-gray-700 mb-2">
          Propriété intellectuelle
        </h2>
        <p className="text-gray-600">
          Tous les contenus présents sur le site{" "}
          <span className="font-medium">Ikovaline</span> (textes, images,
          vidéos, logos, etc.) sont protégés par les lois en vigueur sur la
          propriété intellectuelle. Toute reproduction, distribution,
          modification ou utilisation sans autorisation préalable est
          strictement interdite.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold text-gray-700 mb-2">
          Données personnelles
        </h2>
        <p className="text-gray-600">
          Conformément au Règlement Général sur la Protection des Données
          (RGPD), vous disposez d’un droit d’accès, de rectification et de
          suppression de vos données personnelles. Pour exercer ce droit,
          veuillez nous contacter à l’adresse suivante :{" "}
          <a
            href="mailto:contact@ikovaline.com"
            className="text-blue-600 hover:underline"
          >
            contact@ikovaline.com
          </a>
          .
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold text-gray-700 mb-2">Cookies</h2>
        <p className="text-gray-600">
          Le site <span className="font-medium">Ikovaline</span> utilise des
          cookies pour améliorer votre expérience utilisateur. Vous pouvez
          configurer votre navigateur pour refuser les cookies ou pour être
          averti avant leur installation.
        </p>
      </section>

      <section>
        <h2 className="text-xl font-semibold text-gray-700 mb-2">
          Responsabilité
        </h2>
        <p className="text-gray-600">
          L’éditeur ne peut être tenu responsable en cas de dommages directs ou
          indirects résultant de l’utilisation du site ou de l’impossibilité de
          son utilisation.
        </p>
      </section>
    </div>
  );
}
