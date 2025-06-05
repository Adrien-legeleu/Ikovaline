import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Tailwind,
  Text,
} from "@react-email/components";
import * as React from "react";

interface IkovalineEmailProps {
  firstName: string;
  lastName: string;
  buisnessname?: string;
  secteur?: string;
  etude?: string;
  email: string;
  tel: string;
  message: string;
  category: string;
}

const baseUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "";

export const IkovalineEmail = ({
  firstName,
  lastName,
  buisnessname,
  secteur,
  etude,
  email,
  tel,
  message,
  category,
}: IkovalineEmailProps) => (
  <Tailwind
    config={{
      theme: {
        extend: {
          colors: {
            brand: "#007291",
          },
        },
      },
    }}
  >
    <Html>
      <Head />
      <Preview>
        Nouveau message de {firstName} {lastName} ({category})
      </Preview>
      <Body className="bg-white font-sans">
        <Container
          className="mx-auto p-6 bg-center bg-no-repeat"
          style={{
            backgroundImage: `url("${baseUrl}/static/ikovaline-bg.png")`,
          }}
        >
          <Heading className="text-2xl font-bold mt-12 text-center">
            Nouveau message de {firstName} {lastName}
          </Heading>
          <Section className="my-6">
            <Text className="text-xl leading-7">
              <strong>Catégorie :</strong> {category}
            </Text>
            {category === "Entreprise" && (
              <>
                <Text className="text-lg leading-7">
                  <strong>Nom de l'entreprise :</strong>{" "}
                  {buisnessname || "Non spécifié"}
                </Text>
                <Text className="text-lg leading-7">
                  <strong>Secteur :</strong> {secteur || "Non spécifié"}
                </Text>
              </>
            )}
            {category === "Étudiant" && (
              <Text className="text-lg leading-7">
                <strong>Étude :</strong> {etude || "Non spécifié"}
              </Text>
            )}
            <Text className="text-lg leading-7">
              <strong>Prénom :</strong> {firstName}
            </Text>
            <Text className="text-lg leading-7">
              <strong>Nom :</strong> {lastName}
            </Text>
            <Text className="text-lg leading-7">
              <strong>Email :</strong>{" "}
              <Link
                href={`mailto:${email}`}
                className="text-pink-500 hover:underline"
              >
                {email}
              </Link>
            </Text>
            <Text className="text-lg leading-7">
              <strong>Téléphone :</strong>{" "}
              <Link
                href={`tel:${tel}`}
                className="text-pink-500 hover:underline"
              >
                {tel}
              </Link>
            </Text>
          </Section>

          <Section className="my-6">
            <Text className="text-lg leading-7">
              <strong>Message :</strong>
            </Text>
            <Text className="text-lg leading-7">
              {message ? message : "Aucun message fourni"}
            </Text>
          </Section>

          <Hr className="border-t border-gray-300 mt-12" />
          <Img
            src={`${baseUrl}/images/logo/ikovaline_logo.png`}
            width="32"
            height="32"
            alt="Ikovaline Logo Grayscale"
            className="mx-auto mt-5"
          />

          <Text className="text-gray-500 text-sm text-center">
            Ikovaline Start-up
          </Text>
        </Container>
      </Body>
    </Html>
  </Tailwind>
);

export default IkovalineEmail;
