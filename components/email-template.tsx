import Image from "next/image";

interface EmailTemplateProps {
  firstName: string;
  lastName: string;
  email: string;
  tel: string;
  message: string;
  category: string;
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
  firstName,
  lastName,
  email,
  tel,
  message,
  category,
}) => (
  <div className="max-w-2xl font-poppins mx-auto p-6">
    <div className="bg-white shadow-lg rounded-lg p-6">
      {/* Logo Ikovaline */}
      <div className="mb-4">
        <Image
          src="/static/ikovaline_logo.png" // Assure-toi que le logo est dans le dossier public
          alt="Ikovaline"
          className="w-32"
          width={50}
          height={50}
        />
      </div>

      {/* Header */}
      <h1 className="text-2xl font-bold font-poppins text-gray-800">
        Nouveau message reçu de {firstName} {lastName}
      </h1>
      <p className="text-gray-600 mt-2">
        Catégorie : <span className="font-semibold">{category}</span>
      </p>

      {/* Détails du contact */}
      <div className="mt-6 bg-neutral-200 rounded-2xl p-4">
        <h2 className="text-xl font-semibold text-gray-800">
          Détails du client :
        </h2>
        <ul className="mt-2 text-gray-700">
          <li>
            <span className="font-medium">Prénom :</span> {firstName}
          </li>
          <li>
            <span className="font-medium">Nom :</span> {lastName}
          </li>
          <li>
            <span className="font-medium">Email :</span>{" "}
            <a
              href={`mailto:${email}`}
              className="text-blue-600 hover:underline"
            >
              {email}
            </a>
          </li>
          <li>
            <span className="font-medium">Téléphone :</span>{" "}
            <a href={`tel:${tel}`} className="text-blue-600 hover:underline">
              {tel}
            </a>
          </li>
        </ul>
      </div>

      <div className="mt-6">
        <h2 className="text-xl font-semibold text-gray-800">Message :</h2>
        <p className="mt-2 text-gray-700">
          {message ? message : "Aucun message fourni"}
        </p>
      </div>
    </div>
  </div>
);
