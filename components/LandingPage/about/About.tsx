"use client";
import Link from "next/link";
import { AnimatedTooltip } from "../../ui/animated-tooltip";
import { Button } from "../../ui/button";
import { TextGenerateEffect } from "../../ui/text-generate-effect";
import Img1 from "@/public/images/About/team-florent-profil.jpg";
import Img2 from "@/public/images/About/team-chiara-profil.jpg";
import Img3 from "@/public/images/About/team-adam-profil.jpg";
import Img4 from "@/public/images/About/team-lea-profil.jpg";
import Img5 from "@/public/images/About/team-lucille-profil.jpg";
import Img6 from "@/public/images/About/team-adrien-profil.png";
import Img7 from "@/public/images/About/team-samuel-profil.jpg";
import Img8 from "@/public/images/About/team-victor-profil.jpg";
import Img9 from "@/public/images/About/team-ronan-profil.jpg";
import Img10 from "@/public/images/About/team-victor-pifferi-profil.jpg";
import Img11 from "@/public/images/About/team-saif-profil.jpg";
import { motion } from "framer-motion";

export default function About() {
  const people1 = [
    {
      id: 1,
      name: "Florent Ghizzoni",
      designation: "PDG Ikovaline",
      image: Img1,
      alt: "Florent Ghizzoni, PDG d'Ikovaline, expert en transformation numérique et marketing digital",
    },
    {
      id: 2,
      name: "Chiara Pinto Perez",
      designation: "Directrice marketing",
      image: Img2,
      alt: "Chiara Pinto Perez, Directrice Marketing d'Ikovaline, experte en stratégie marketing digital",
    },
    {
      id: 3,
      name: "Léa Moura Pinto",
      designation: "Directrice Communication",
      image: Img4,
      alt: "Léa Moura Pinto, Directrice Communication d'Ikovaline, experte en communication digitale",
    },
    {
      id: 4,
      name: "Lucille Legoaec",
      designation: "Directrice R&D Technologique",
      image: Img5,
      alt: "Lucille Legoaec, Directrice R&D d'Ikovaline, experte en innovation numérique et tech",
    },
    {
      id: 5,
      name: "Adrien Legeleux",
      designation: "Directeur Web Développement",
      image: Img6,
      alt: "Adrien Legeleux, Directeur Web Développement d'Ikovaline, expert en solutions web modernes",
    },
  ];

  // People2
  const people2 = [
    {
      id: 1,
      name: "Samuel Garrel",
      designation: "Directeur Web Marketing",
      image: Img7,
      alt: "Samuel Garrel, Directeur Web Marketing d'Ikovaline, expert en stratégie digitale et SEO",
    },
    {
      id: 2,
      name: "Victor Biaujaud",
      designation: "Manager Principal",
      image: Img8,
      alt: "Victor Biaujaud, Manager Principal d'Ikovaline, expert en gestion d'équipe et développement commercial",
    },
    {
      id: 3,
      name: "Ronan Alexandre",
      designation: "Commercial Junior",
      image: Img9,
      alt: "Ronan Alexandre, Commercial Junior d'Ikovaline, expert en développement commercial et marketing digital",
    },
    {
      id: 4,
      name: "Victor Pifferi",
      designation: "Commercial Senior",
      image: Img10,
      alt: "Victor Pifferi, Commercial Senior d'Ikovaline, expert en stratégie commerciale et relation client",
    },
    {
      id: 5,
      name: "Adam Sauneron",
      designation: "Manager Principal",
      image: Img3,
      alt: "Adam Sauneron, Manager Principal d'Ikovaline, expert en développement commercial international",
    },
    {
      id: 6,
      name: "Saif Ul Islam",
      designation: "Google Ads Manager",
      image: Img11,
      alt: "Saif Ul Islam, Google Ads Manager d'Ikovaline, expert en campagnes Google Ads et pub",
    },
  ];

  const words = `
Ikovaline est une start-up innovante spécialisée en stratégie digitale, marketing numérique et gestion de projet. Nous accompagnons les entreprises dans la création, l’optimisation et la promotion de leurs solutions digitales. Grâce à une approche personnalisée axée sur la performance, nous aidons nos clients à améliorer leur visibilité en ligne et à générer une croissance durable.`;

  return (
    <div
      className="py-20 gap-10  max-w-3xl flex flex-col mx-auto relative items-center justify-center"
      id="about"
    >
      <TextGenerateEffect words={words} />
      <div className="space-y-2 ">
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
