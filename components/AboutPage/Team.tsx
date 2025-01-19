import { AnimatedTestimonials } from "../ui/animated-testimonials";
import Img1 from "@/public/images/About/team-florent.jpg";
import Img3 from "@/public/images/About/team-adam.jpg";
import Img2 from "@/public/images/About/team-victor-biauhaud.jpg";
import Img4 from "@/public/images/About/team-ronan.jpg";
import Img5 from "@/public/images/About/team-samuel.jpg";
import Img6 from "@/public/images/About/team-victor-pifferi.jpg";
import Img7 from "@/public/images/About/team-saif.jpg";

export function Team() {
  const testimonials = [
    {
      quote: "",
      name: "Florent Ghizzoni",
      designation: "PDG d'Ikovaline",
      src: Img1,
    },
    {
      quote: "",
      name: "Victor Biaujaud",
      designation: "Manager Principal",
      src: Img2,
    },
    {
      quote: "",
      name: "Adam Sauneron",
      designation: "Responsable Commercial International",
      src: Img3,
    },
    {
      quote: "",
      name: "Ronan Alexandre",
      designation: "Commercial Junior",
      src: Img4,
    },
    {
      quote: "",
      name: "Samuel Garrel",
      designation: "Directeur Web Marketing",
      src: Img5,
    },
    {
      quote: "",
      name: "Victor Pifferi",
      designation: "Commercial Senior",
      src: Img6,
    },
    {
      quote: "",
      name: "Saif Ul Islam",
      designation: "Google Ads Manager",
      src: Img7,
    },
  ];
  return <AnimatedTestimonials testimonials={testimonials} />;
}
