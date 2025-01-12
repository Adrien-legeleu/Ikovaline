import { AnimatedTestimonials } from "../ui/animated-testimonials";
import ImageHistory from "@/public/images/About/ikovaline-about.jpeg";

export function Team() {
  const testimonials = [
    {
      quote:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum voluptatibus ipsum est dolor odit inventore.",
      name: "Sarah Chen",
      designation: "Lorem ipsum dolor sit",
      src: ImageHistory,
    },
    {
      quote:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum voluptatibus ipsum est dolor odit inventore.",
      name: "Michael Rodriguez",
      designation: "Lorem ipsum dolor sit",
      src: ImageHistory,
    },
    {
      quote:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum voluptatibus ipsum est dolor odit inventore.",
      name: "Emily Watson",
      designation: "Lorem ipsum dolor sit",
      src: ImageHistory,
    },
    {
      quote:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum voluptatibus ipsum est dolor odit inventore.",
      name: "James Kim",
      designation: "Lorem ipsum dolor sit",
      src: ImageHistory,
    },
    {
      quote:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum voluptatibus ipsum est dolor odit inventore.",
      name: "Lisa Thompson",
      designation: "Lorem ipsum dolor sit",
      src: ImageHistory,
    },
  ];
  return <AnimatedTestimonials testimonials={testimonials} />;
}
