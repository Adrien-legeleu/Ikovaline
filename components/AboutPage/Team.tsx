import { AnimatedTestimonials } from "../ui/animated-testimonials";
import Img1 from "@/public/images/About/team-ikovaline (4).jpg";
import Img2 from "@/public/images/About/team-ikovaline (1).jpg";
import Img3 from "@/public/images/About/team-ikovaline (5).jpg";
import Img4 from "@/public/images/About/team-ikovaline (7).jpg";
import Img5 from "@/public/images/About/team-ikovaline (10).jpg";

export function Team() {
  const testimonials = [
    {
      quote:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum voluptatibus ipsum est dolor odit inventore.",
      name: "Florent Ghizzoni",
      designation: "PDG d'Ikovaline",
      src: Img1,
    },
    {
      quote:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum voluptatibus ipsum est dolor odit inventore.",
      name: "Michael Rodriguez",
      designation: "Lorem ipsum dolor sit",
      src: Img2,
    },
    {
      quote:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum voluptatibus ipsum est dolor odit inventore.",
      name: "Emily Watson",
      designation: "Lorem ipsum dolor sit",
      src: Img3,
    },
    {
      quote:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum voluptatibus ipsum est dolor odit inventore.",
      name: "James Kim",
      designation: "Lorem ipsum dolor sit",
      src: Img4,
    },
    {
      quote:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum voluptatibus ipsum est dolor odit inventore.",
      name: "Lisa Thompson",
      designation: "Lorem ipsum dolor sit",
      src: Img5,
    },
  ];
  return <AnimatedTestimonials testimonials={testimonials} />;
}
