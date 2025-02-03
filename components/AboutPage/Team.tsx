import { AnimatedTestimonials } from "../ui/animated-testimonials";
import Img1 from "@/public/images/About/team-florent.jpg";
import Img3 from "@/public/images/About/team-adam.jpg";
import Img2 from "@/public/images/About/team-victor-biauhaud.jpg";
import Img4 from "@/public/images/About/team-ronan.jpg";
import Img5 from "@/public/images/About/team-samuel.jpg";
import Img6 from "@/public/images/About/team-victor-pifferi.jpg";
import Img7 from "@/public/images/About/team-saif.jpg";

export function Team() {
  // Testimonials
  const testimonials = [
    {
      quote: "",
      name: "Florent Ghizzoni",
      designation: "PDG d'Ikovaline",
      src: Img1,
      alt: "Florent Ghizzoni, PDG d'Ikovaline, expert en transformation numérique et marketing digital",
    },
    {
      quote: "",
      name: "Victor Biaujaud",
      designation: "Manager Principal",
      src: Img2,
      alt: "Victor Biaujaud, Manager Principal d'Ikovaline, expert en marketing digital et e-commerce",
    },
    {
      quote: "",
      name: "Adam Sauneron",
      designation: "Responsable Commercial International",
      src: Img3,
      alt: "Adam Sauneron, Responsable Commercial International d'Ikovaline, expert en développement commercial international",
    },
    {
      quote: "",
      name: "Ronan Alexandre",
      designation: "Commercial Junior",
      src: Img4,
      alt: "Ronan Alexandre, Commercial Junior d'Ikovaline, expert en développement commercial et marketing digital",
    },
    {
      quote: "",
      name: "Samuel Garrel",
      designation: "Directeur Web Marketing",
      src: Img5,
      alt: "Samuel Garrel, Directeur Web Marketing d'Ikovaline, expert en stratégie digitale et SEO",
    },
    {
      quote: "",
      name: "Victor Pifferi",
      designation: "Commercial Senior",
      src: Img6,
      alt: "Victor Pifferi, Commercial Senior d'Ikovaline, expert en développement commercial et campagnes digitales",
    },
    {
      quote: "",
      name: "Saif Ul Islam",
      designation: "Google Ads Manager",
      src: Img7,
      alt: "Saif Ul Islam, Google Ads Manager d'Ikovaline, expert en campagnes publicitaires et marketing digital",
    },
  ];
  return <AnimatedTestimonials testimonials={testimonials} />;
}
