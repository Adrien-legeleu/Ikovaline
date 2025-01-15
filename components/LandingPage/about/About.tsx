import Link from "next/link";
import { AnimatedTooltip } from "../../ui/animated-tooltip";
import { Button } from "../../ui/button";
import { TextGenerateEffect } from "../../ui/text-generate-effect";
import Img1 from "@/public/images/About/team-ikovaline (4).jpg";
import Img2 from "@/public/images/About/team-ikovaline (1).jpg";
import Img3 from "@/public/images/About/team-ikovaline (5).jpg";
import Img4 from "@/public/images/About/team-ikovaline (7).jpg";
import Img5 from "@/public/images/About/team-ikovaline (10).jpg";
export default function About() {
  const people = [
    {
      id: 1,
      name: "Florent Ghizzoni",
      designation: "PDG Ikovaline",
      image: Img1,
    },
    {
      id: 2,
      name: "Robert Johnson",
      designation: "Product Manager",
      image: Img2,
    },
    {
      id: 3,
      name: "Jane Smith",
      designation: "Data Scientist",
      image: Img3,
    },
    {
      id: 4,
      name: "Emily Davis",
      designation: "UX Designer",
      image: Img4,
    },
    {
      id: 5,
      name: "Tyler Durden",
      designation: "Soap Developer",
      image: Img5,
    },
    {
      id: 6,
      name: "Dora",
      designation: "The Explorer",
      image: Img5,
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
      <div className="flex flex-row items-center justify-center  w-full">
        <AnimatedTooltip items={people} />
      </div>
      <Link href={"/about"}>
        <Button variant={"secondary"}>En savoir plus</Button>
      </Link>
    </div>
  );
}
