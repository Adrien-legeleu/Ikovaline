import Link from "next/link";
import { AnimatedTooltip } from "../../ui/animated-tooltip";
import { Button } from "../../ui/button";
import { TextGenerateEffect } from "../../ui/text-generate-effect";
import Img1 from "@/public/images/About/team-florent-profil.jpg";
import Img2 from "@/public/images/About/team-chiara-profil.jpg";
import Img3 from "@/public/images/About/team-adam-profil.jpg";
import Img4 from "@/public/images/About/team-lea-profil.jpg";
import Img5 from "@/public/images/About/team-lucille-profil.jpg";
import Img6 from "@/public/images/About/team-adrien-profil.jpg";
import Img7 from "@/public/images/About/team-samuel-profil.jpg";
import Img8 from "@/public/images/About/team-victor-profil.jpg";
import Img9 from "@/public/images/About/team-ronan-profil.jpg";
import Img10 from "@/public/images/About/team-victor-pifferi-profil.jpg";
import Img11 from "@/public/images/About/team-saif-profil.jpg";

export default function About() {
  const people1 = [
    {
      id: 1,
      name: "Florent Ghizzoni",
      designation: "PDG Ikovaline",
      image: Img1,
      alt: "Florent Ghizzoni, PDG d'Ikovaline, expert en stratégie numérique et transformation digitale",
    },
    {
      id: 2,
      name: "Chiara Pinto Perez",
      designation: "Directrice marketing",
      image: Img2,
      alt: "Chiara Pinto Perez, Directrice marketing chez Ikovaline, spécialiste en stratégie de marketing digital",
    },
    {
      id: 3,
      name: "Léa Moura Pinto",
      designation: "Directrice Communication",
      image: Img4,
      alt: "Léa Moura Pinto, Directrice Communication chez Ikovaline, experte en communication et stratégie digitale",
    },
    {
      id: 4,
      name: "Lucille Legoaec",
      designation: "Directrice R&D Technologique",
      image: Img5,
      alt: "Lucille Legoaec, Directrice R&D Technologique chez Ikovaline, experte en innovation numérique et développement technologique",
    },
    {
      id: 5,
      name: "Adrien Legeleux",
      designation: "Directeur Web Développement",
      image: Img6,
      alt: "Adrien Legeleux, Directeur Web Développement chez Ikovaline, spécialiste du développement de solutions web modernes",
    },
  ];

  const people2 = [
    {
      id: 1,
      name: "Samuel Garrel",
      designation: "Directeur Web Marketing",
      image: Img7,
      alt: "Samuel Garrel, Directeur Web Marketing chez Ikovaline, expert en stratégie digitale et SEO",
    },
    {
      id: 2,
      name: "Victor Biaujaud",
      designation: "Manager Principal",
      image: Img8,
      alt: "Victor Biaujaud, Manager Principal chez Ikovaline, spécialiste en gestion d'équipe et stratégie de développement commercial",
    },
    {
      id: 3,
      name: "Ronan Alexandre",
      designation: "Commercial Junior",
      image: Img9,
      alt: "Ronan Alexandre, Commercial Junior chez Ikovaline, spécialiste du développement commercial et marketing digital",
    },
    {
      id: 4,
      name: "Victor Pifferi",
      designation: "Commercial Senior",
      image: Img10,
      alt: "Victor Pifferi, Commercial Senior chez Ikovaline, expert en stratégie commerciale et gestion de relations clients",
    },
    {
      id: 5,
      name: "Adam Sauneron",
      designation: "Manager Principal",
      image: Img3,
      alt: "Adam Sauneron, Manager Principal chez Ikovaline, expert en développement commercial et stratégie internationale",
    },
    {
      id: 6,
      name: "Saif Ul Islam",
      designation: "Google Ads Manager",
      image: Img11,
      alt: "Saif Ul Islam, Google Ads Manager chez Ikovaline, expert en gestion de campagnes Google Ads et stratégie publicitaire",
    },
  ];

  const words = `
Ikovaline est une start-up étudiante spécialisée en marketing digital. Nous accompagnons les entreprises dans le renforcement de leur image et de leur visibilité en ligne. Grâce à une approche créative et sur mesure, nous aidons nos clients à atteindre leurs objectifs avec efficacité.
`;

  return (
    <div
      className="py-20 gap-5 flex flex-col max-w-3xl mx-auto items-center justify-center"
      id="about"
    >
      <TextGenerateEffect words={words} />
      <div className="space-y-2">
        <div className="flex sm:flex-row items-center justify-center  gap-2  w-full">
          <AnimatedTooltip items={people1} />
        </div>
        <div className="flex sm:flex-row items-center justify-center   w-full">
          <AnimatedTooltip items={people2} />
        </div>
      </div>
      <Link href={"/about"}>
        <Button variant={"secondary"}>En savoir plus</Button>
      </Link>
    </div>
  );
}
