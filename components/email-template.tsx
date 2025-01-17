import * as React from "react";

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
  <div className="bg-gray-100 p-6 rounded-lg font-sans">
    <div className="bg-white shadow-md rounded-lg p-6">
      <h1 className="text-2xl font-bold text-gray-800">
        Nouveau message de {firstName} {lastName}
      </h1>
      <p className="text-gray-600 mt-2">
        Catégorie : <span className="font-semibold">{category}</span>
      </p>

      <div className="mt-4">
        <h2 className="text-xl font-semibold text-gray-800">
          Détails du contact :
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
          {message ? message : "aucun message fournit"}
        </p>
      </div>
    </div>
  </div>
);
