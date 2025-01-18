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
export default function About() {
  const people1 = [
    {
      id: 1,
      name: "Florent Ghizzoni",
      designation: "PDG Ikovaline",
      image: Img1,
    },
    {
      id: 2,
      name: "Léa Moura Pinto",
      designation: "Directrice Communication",
      image: Img4,
    },
    {
      id: 3,
      name: "Adrien Legeleux",
      designation: "Directeur Web Developpement",
      image: Img6,
    },
    {
      id: 4,
      name: "Lucille Legoaec",
      designation: "Directrice R&D Technologique",
      image: Img5,
    },

    {
      id: 5,
      name: "Chiara Pinto Perez",
      designation: "Directrice marketing",
      image: Img2,
    },
  ];

  const people2 = [
    {
      id: 1,
      name: "Samuel Garrel",
      designation: "Directeur Web Marketing",
      image: Img7,
    },
    {
      id: 2,
      name: "Victor Biaujaud",
      designation: "Manager Principal",
      image: Img8,
    },
    {
      id: 3,
      name: "Ronan Alexandre",
      designation: "Commercial Junior",
      image: Img9,
    },
    {
      id: 4,
      name: "Victor Pifferi",
      designation: "Commercial Senior",
      image: Img10,
    },
    {
      id: 5,
      name: "Adam Sauneron",
      designation: "Manager Principal",
      image: Img3,
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
